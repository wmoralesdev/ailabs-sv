import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

type EmailLayoutProps = {
  children: ReactNode;
  previewText: string;
};

const SOCIAL_LINKS = {
  website: "https://ailabs.sv",
  whatsapp: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
  github: "https://github.com/ailabs-sv",
  twitter: "https://twitter.com/ailabs_sv",
  linkedin: "https://linkedin.com/company/ailabs-sv",
};

export function EmailLayout({ children, previewText }: EmailLayoutProps) {
  return (
    <Html lang="es">
      <Head>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');`}
        </style>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header with brand */}
          <Section style={styles.header}>
            <Text style={styles.brandText}>
              <span style={styles.brandAi}>Ai</span>
              <span style={styles.brandSlash}> /</span>
              <span style={styles.brandLabs}>abs</span>
            </Text>
          </Section>

          {/* Main content */}
          <Section style={styles.content}>{children}</Section>

          <Hr style={styles.divider} />

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.tagline}>
              <span style={styles.brandAi}>Ai</span>
              <span style={styles.brandSlash}> /</span>
              <span style={styles.brandLabs}>abs</span>
            </Text>

            {/* Social links */}
            <Section style={styles.socialLinks}>
              <Link href={SOCIAL_LINKS.website} style={styles.socialLink}>
                Web
              </Link>
              <Text style={styles.socialSeparator}>·</Text>
              <Link href={SOCIAL_LINKS.whatsapp} style={styles.socialLink}>
                WhatsApp
              </Link>
              <Text style={styles.socialSeparator}>·</Text>
              <Link href={SOCIAL_LINKS.github} style={styles.socialLink}>
                GitHub
              </Link>
              <Text style={styles.socialSeparator}>·</Text>
              <Link href={SOCIAL_LINKS.twitter} style={styles.socialLink}>
                X
              </Link>
              <Text style={styles.socialSeparator}>·</Text>
              <Link href={SOCIAL_LINKS.linkedin} style={styles.socialLink}>
                LinkedIn
              </Link>
            </Section>

            <Text style={styles.copyright}>
              © {new Date().getFullYear()} Ai /abs — San Salvador, El Salvador
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: "0",
    padding: "0",
    backgroundColor: "#f5f5f0",
    fontFamily:
      "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  container: {
    maxWidth: "480px",
    margin: "40px auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  header: {
    padding: "40px 32px 24px",
    textAlign: "center" as const,
  },
  brandText: {
    margin: "0",
    fontSize: "24px",
    lineHeight: "1.2",
    fontWeight: "700",
    color: "#0f0f0f",
    letterSpacing: "-0.02em",
  },
  brandAi: {
    color: "#7c3aed",
  },
  brandSlash: {
    color: "#9ca3af",
  },
  brandLabs: {
    color: "#0f0f0f",
  },
  content: {
    padding: "0 32px 32px",
  },
  divider: {
    borderColor: "#e5e5e5",
    borderWidth: "1px",
    margin: "0",
  },
  footer: {
    padding: "24px 32px",
    textAlign: "center" as const,
    backgroundColor: "#fafaf9",
  },
  tagline: {
    margin: "0 0 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#0f0f0f",
  },
  socialLinks: {
    margin: "0 0 16px",
    textAlign: "center" as const,
  },
  socialLink: {
    color: "#7c3aed",
    fontSize: "13px",
    textDecoration: "none",
  },
  socialSeparator: {
    display: "inline",
    margin: "0 8px",
    color: "#d1d5db",
    fontSize: "13px",
  },
  copyright: {
    margin: "0",
    fontSize: "12px",
    lineHeight: "1.5",
    color: "#9ca3af",
  },
};
