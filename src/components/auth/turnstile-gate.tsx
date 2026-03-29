"use client";

import { useEffect, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";
import { isTurnstileConfigured } from "@/lib/turnstile-config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type TurnstileGateProps = {
  onVerified: () => void;
  className?: string;
};

/**
 * When `VITE_TURNSTILE_SITE_KEY` is unset, calls `onVerified` once (dev / no CAPTCHA).
 */
export function TurnstileGate({ onVerified, className }: TurnstileGateProps) {
  const { t } = useI18n();
  const configured = isTurnstileConfigured();
  const [done, setDone] = useState(false);
  const [serverVerifyFailed, setServerVerifyFailed] = useState(false);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  useEffect(() => {
    if (!configured) {
      onVerified();
    }
  }, [configured, onVerified]);

  if (!configured) {
    return null;
  }

  if (done) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2 py-2", className)}>
      <div className="flex justify-center">
        <Turnstile
          siteKey={siteKey!}
          onSuccess={async (token) => {
            setServerVerifyFailed(false);
            const ok = await verifyTurnstileToken(token);
            if (ok) {
              setDone(true);
              onVerified();
            } else {
              setServerVerifyFailed(true);
            }
          }}
        />
      </div>
      {serverVerifyFailed ? (
        <Alert variant="destructive">
          <AlertDescription>{t.signIn.turnstileVerifyFailed}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
