import { Section, Text } from "@react-email/components";
import { EmailLayout } from "./components/email-layout";

type OtpLocale = "es" | "en";

export type OtpEmailProps = {
  token: string;
  locale?: OtpLocale;
};

const copyByLocale: Record<
  OtpLocale,
  {
    preview: string;
    heading: string;
    message: string;
    securityNotice: string;
  }
> = {
  es: {
    preview: "Ingresa el código para continuar.",
    heading: "Verifica tu acceso",
    message:
      "Hemos recibido una solicitud de inicio de sesión. Ingresa el siguiente código en la ventana donde comenzaste el proceso.",
    securityNotice:
      "Si no intentaste iniciar sesión, puedes ignorar este correo. El código estará activo por 15 minutos.",
  },
  en: {
    preview: "Enter the code to continue.",
    heading: "Verify your sign-in",
    message:
      "We received a sign-in request. Enter the code below in the browser window where you started the process.",
    securityNotice:
      "If you did not request this sign-in, you can safely ignore this email. The code remains active for 15 minutes.",
  },
};

export function OtpEmail({ token = "15595307", locale = "es" }: OtpEmailProps) {
  const copy = copyByLocale[locale];

  return (
    <EmailLayout previewText={copy.preview}>
      {/* Heading */}
      <Text style={styles.heading}>{copy.heading}</Text>

      {/* Context message */}
      <Text style={styles.message}>{copy.message}</Text>

      {/* Code block */}
      <Section style={styles.codeContainer}>
        <Text style={styles.code}>{token}</Text>
      </Section>

      {/* Security notice */}
      <Text style={styles.securityNotice}>{copy.securityNotice}</Text>
    </EmailLayout>
  );
}

export default OtpEmail;

const styles = {
  heading: {
    margin: "0 0 16px",
    fontSize: "24px",
    lineHeight: "1.3",
    fontWeight: "600",
    color: "#0f0f0f",
    textAlign: "center" as const,
  },
  message: {
    margin: "0 0 24px",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#374151",
    textAlign: "center" as const,
  },
  codeContainer: {
    backgroundColor: "#f5f5f0",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center" as const,
    border: "1px solid #e5e5e5",
    margin: "0 0 24px",
  },
  code: {
    margin: "0",
    fontSize: "36px",
    fontWeight: "700",
    letterSpacing: "0.2em",
    color: "#7c3aed",
    fontFamily: "monospace",
  },
  securityNotice: {
    margin: "0",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#6b7280",
    textAlign: "center" as const,
  },
};
