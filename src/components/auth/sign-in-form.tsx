"use client";

import { useForm } from "@tanstack/react-form";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { z } from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { Google } from "@/components/ui/svgs/google";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

const codeSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 digits").max(8, "Code must be at most 8 digits"),
  email: z.string().email(),
});

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"email" | "code">("email");
  const [pendingEmail, setPendingEmail] = useState("");

  const emailForm = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: emailSchema },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.set("email", value.email);
      await signIn("resend-otp", formData);
      setPendingEmail(value.email);
      setStep("code");
    },
  });

  const codeForm = useForm({
    defaultValues: { code: "", email: pendingEmail },
    validators: { onSubmit: codeSchema },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.set("code", value.code);
      formData.set("email", pendingEmail);
      await signIn("resend-otp", formData);
    },
  });

  if (step === "code") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium">Check your email</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter the code we sent to {pendingEmail}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            codeForm.setFieldValue("email", pendingEmail);
            codeForm.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <codeForm.Field
              name="code"
              validators={{ onSubmit: codeSchema.shape.code }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Code</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="00000000"
                      autoComplete="one-time-code"
                      className="h-10 rounded-lg text-sm"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <input type="hidden" name="email" value={pendingEmail} />
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={codeForm.state.isSubmitting}
              className="h-10 flex-1 rounded-lg"
            >
              {codeForm.state.isSubmitting ? "Verifying…" : "Continue"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("email")}
              className="h-10 rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-center text-sm text-muted-foreground">
        We&apos;ll send you a one-time code to sign in.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          emailForm.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup>
          <emailForm.Field
            name="email"
            validators={{ onSubmit: emailSchema.shape.email }}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-10 rounded-lg text-sm"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Button
          type="submit"
          disabled={emailForm.state.isSubmitting}
          className="h-10 w-full rounded-lg"
        >
          {emailForm.state.isSubmitting ? "Sending…" : "Send code"}
        </Button>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="h-10 flex-1 rounded-lg"
          onClick={async () => {
            const result = await signIn("google");
            if (result.redirect) {
              window.location.href = result.redirect.href;
            }
          }}
        >
          <Google aria-hidden className="size-5 shrink-0" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10 flex-1 rounded-lg"
          onClick={async () => {
            const result = await signIn("github");
            if (result.redirect) {
              window.location.href = result.redirect.href;
            }
          }}
        >
          <GithubIcon className="size-5" />
          GitHub
        </Button>
      </div>
    </div>
  );
}
