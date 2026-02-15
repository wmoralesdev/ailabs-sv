"use client";

import { useSignIn, useSignUp } from "@clerk/tanstack-react-start";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";

export type SignInStep = "initial" | "otp";
type OAuthStrategy = "oauth_google" | "oauth_github";
type EmailOtpFlow = "signIn" | "signUp";

interface UseCustomSignInFormOptions {
  onStepChange?: (step: SignInStep) => void;
  returnTo?: string;
}

export function useCustomSignInForm({
  onStepChange,
  returnTo,
}: UseCustomSignInFormOptions) {
  const { t } = useI18n();
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const isLoaded = isSignInLoaded && isSignUpLoaded;

  const signInSchema = z
    .object({
      email: z
        .string()
        .trim()
        .min(1, t.signIn.emailRequired)
        .email(t.signIn.emailInvalid),
      code: z.string(),
      step: z.enum(["initial", "otp"]),
      flow: z.enum(["signIn", "signUp"]),
    })
    .superRefine((value, ctx) => {
      if (value.step !== "otp") {
        return;
      }

      if (value.code.length !== 6) {
        ctx.addIssue({
          code: "custom",
          path: ["code"],
          message: t.signIn.codeLength,
        });
      }
    });

  const form = useForm({
    defaultValues: {
      email: "",
      code: "",
      step: "initial" as SignInStep,
      flow: "signIn" as EmailOtpFlow,
    },
    validators: {
      onSubmit: signInSchema,
      onDynamic: (): string | undefined => undefined,
    },
    onSubmit: async ({ value }) => {
      clearErrors();

      if (!signIn || !signUp) {
        return;
      }

      if (value.step === "initial") {
        try {
          const { supportedFirstFactors } = await signIn.create({
            identifier: value.email,
          });

          const emailCodeFactor = supportedFirstFactors?.find(
            (factor) => factor.strategy === "email_code"
          );

          if (emailCodeFactor && "emailAddressId" in emailCodeFactor) {
            await signIn.prepareFirstFactor({
              strategy: "email_code",
              emailAddressId: emailCodeFactor.emailAddressId,
            });
            form.setFieldValue("step", "otp");
            onStepChange?.("otp");
            return;
          }

          setFormError(t.signIn.authMethodUnavailable);
        } catch (err) {
          const anyErr = err as any;
          const errorsRaw = Array.isArray(anyErr?.errors)
            ? anyErr.errors
            : Array.isArray(anyErr?.response?.errors)
              ? anyErr.response.errors
              : undefined;
          const errors = Array.isArray(errorsRaw)
            ? errorsRaw.map((e: any) => ({ code: e?.code }))
            : undefined;

          const identifierNotFound = errors?.some(
            (e) => e?.code === "form_identifier_not_found"
          );

          // If the email doesn't exist yet, automatically start sign-up with email OTP.
          if (identifierNotFound) {
            try {
              await signUp.create({
                emailAddress: value.email,
              });

              await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
              });

              form.setFieldValue("flow", "signUp");
              form.setFieldValue("step", "otp");
              onStepChange?.("otp");
              return;
            } catch {
              // Sign-up also failed; fall through to generic error.
            }
          }

          setEmailError(t.signIn.sendCodeError);
        }
        return;
      }

      try {
        if (value.flow === "signUp") {
          const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code: value.code,
          });

          if ((signUpAttempt as any).status === "complete") {
            await setActive({
              session: (signUpAttempt as any).createdSessionId,
            });
            return;
          }

          setFormError(t.signIn.signInIncomplete);
          return;
        }

        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: value.code,
        });

        if (signInAttempt.status === "complete") {
          await setActive({
            session: signInAttempt.createdSessionId,
          });
          return;
        }

        setFormError(t.signIn.signInIncomplete);
      } catch {
        setCodeError(t.signIn.invalidCodeError);
      }
    },
  });

  const setEmailError = (message: string) => {
    form.setFieldMeta("email", (prev) => ({
      ...prev,
      isTouched: true,
      errors: [{ message }],
    }));
  };

  const setCodeError = (message: string) => {
    form.setFieldMeta("code", (prev) => ({
      ...prev,
      isTouched: true,
      errors: [{ message }],
    }));
  };

  const setFormError = (message: string) => {
    form.setErrorMap({
      ...form.state.errorMap,
      onDynamic: message,
    });
  };

  const clearErrors = () => {
    form.setFieldMeta("email", (prev) => ({ ...prev, errors: [] }));
    form.setFieldMeta("code", (prev) => ({ ...prev, errors: [] }));
    form.setErrorMap({
      ...form.state.errorMap,
      onDynamic: undefined,
    });
  };

  const signInWithOAuth = async (strategy: OAuthStrategy) => {
    if (!signIn) {
      return;
    }

    clearErrors();
    try {
      const redirectUrlComplete = returnTo
        ? `/sign-in?returnTo=${encodeURIComponent(returnTo)}`
        : "/sign-in";

      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete,
      });
    } catch {
      setFormError(t.signIn.oauthError);
    }
  };

  const handleCancel = () => {
    form.setFieldValue("step", "initial");
    form.resetField("code");
    clearErrors();
    onStepChange?.("initial");
  };

  return {
    form,
    isLoaded,
    signInWithOAuth,
    handleCancel,
  };
}
