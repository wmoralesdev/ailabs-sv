import { AuthenticateWithRedirectCallback } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { seoCopyEs } from "@/content/seo-copy";
import { buildSeoMeta } from "@/lib/seo-meta";

export const Route = createFileRoute("/sign-in_/sso-callback")({
  head: () => {
    const { meta, links } = buildSeoMeta({
      path: "/sign-in_/sso-callback",
      title: seoCopyEs.ssoCallback.title,
      description: seoCopyEs.ssoCallback.description,
      noIndex: true,
    });
    return { meta, links };
  },
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
