import { AuthenticateWithRedirectCallback } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in_/sso-callback")({
  component: SSOCallback,
});

function SSOCallback() {
  return (
    <AuthenticateWithRedirectCallback
      signInForceRedirectUrl="/sign-in"
      signUpForceRedirectUrl="/sign-in"
    />
  );
}
