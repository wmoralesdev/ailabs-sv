"use client";

import type { SignInStep } from "@/components/auth/use-custom-sign-in-form";
import { useCustomSignInForm } from "@/components/auth/use-custom-sign-in-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { GithubDark } from "@/components/ui/svgs/github-dark";
import { GithubLight } from "@/components/ui/svgs/github-light";
import { Google } from "@/components/ui/svgs/google";
import { useI18n } from "@/lib/i18n";

export type { SignInStep } from "@/components/auth/use-custom-sign-in-form";

interface CustomSignInProps {
  onStepChange?: (step: SignInStep) => void;
  returnTo?: string;
}

export function CustomSignIn({ onStepChange, returnTo }: CustomSignInProps) {
  const { t } = useI18n();
  const { form, isLoaded, signInWithOAuth, handleCancel } = useCustomSignInForm({
    onStepChange,
    returnTo,
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Subscribe
          selector={(state) => state.errorMap.onDynamic}
          children={(submitError) =>
            submitError ? (
              <Alert variant="destructive">
                <AlertDescription>{String(submitError)}</AlertDescription>
              </Alert>
            ) : null
          }
        />

        {form.state.values.step === "otp" ? (
          <>
            <p className="text-center text-sm text-muted-foreground">
              {t.signIn.checkEmailDescription}{" "}
              <span className="font-medium text-foreground">
                {form.state.values.email}
              </span>
            </p>

            <FieldGroup>
              <form.Field
                name="code"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex justify-center">
                        <InputOTP
                          id={field.name}
                          maxLength={6}
                          value={field.state.value}
                          onChange={field.handleChange}
                          disabled={form.state.isSubmitting}
                          aria-invalid={isInvalid}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <div className="flex gap-3">
              <form.Subscribe
                selector={(state) => ({
                  code: state.values.code,
                  isSubmitting: state.isSubmitting,
                })}
                children={({ code, isSubmitting }) => {
                  const isDisabled = isSubmitting || code.length < 6;

                  return (
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isDisabled}
                      loading={isSubmitting}
                    >
                      {isSubmitting ? t.signIn.verifying : t.signIn.continue}
                    </Button>
                  );
                }}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={form.state.isSubmitting}
              >
                {t.signIn.cancel}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center text-sm text-muted-foreground">
              {t.signIn.emailDescription}
            </p>

            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>{t.signIn.emailLabel}</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder={t.signIn.emailPlaceholder}
                        disabled={form.state.isSubmitting}
                        aria-invalid={isInvalid}
                      />
                      {!!isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <form.Subscribe
              selector={(state) => ({
                email: state.values.email,
                isSubmitting: state.isSubmitting,
              })}
              children={({ email, isSubmitting }) => {
                const isDisabled = isSubmitting || email.trim().length === 0;

                return (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isDisabled}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? t.signIn.sending : t.signIn.sendCode}
                  </Button>
                );
              }}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {t.signIn.orContinueWith}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => signInWithOAuth("oauth_google")}
                disabled={form.state.isSubmitting}
                className="w-full"
              >
                <Google className="mr-2 size-4" aria-hidden />
                {t.signIn.google}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => signInWithOAuth("oauth_github")}
                disabled={form.state.isSubmitting}
                className="w-full"
              >
                <span className="mr-2 inline-flex shrink-0">
                  <GithubLight className="size-4 dark:hidden" aria-hidden />
                  <GithubDark className="hidden size-4 dark:block" aria-hidden />
                </span>
                {t.signIn.github}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
