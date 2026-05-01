import {
  Body, Container, Head, Heading, Html, Img,
  Link, Preview, Section, Text, Hr, Button,
} from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
}

export function WelcomeEmail({ name = "draugs" }: WelcomeEmailProps) {
  return (
    <Html lang="lv">
      <Head />
      <Preview>Laipni lūgts Chademy! Tava AI apmācība sākas šodien.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Text style={logo}>⚡ Chademy</Text>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Heading style={h1}>Sveiks, {name}! 🎉</Heading>
            <Text style={heroText}>
              Paldies, ka pievienojies Chademy — Latvijas vadošajai AI prasmju platformai.
              Tu esi soli tuvāk tam, lai sāktu pelnīt ar mākslīgo intelektu.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Steps */}
          <Section>
            <Heading style={h2}>Ko darīt tālāk:</Heading>

            <Section style={step}>
              <Text style={stepNumber}>01</Text>
              <Text style={stepText}>
                <strong>Izvēlies savu plānu</strong> — Satura Speciālists, Digitālais Speciālists vai AI Aģentu Eksperts.
              </Text>
            </Section>

            <Section style={step}>
              <Text style={stepNumber}>02</Text>
              <Text style={stepText}>
                <strong>Atver pirmo lekciju</strong> — sāc ar ievadu un iegūsti pirmo praktisku instrumentu.
              </Text>
            </Section>

            <Section style={step}>
              <Text style={stepNumber}>03</Text>
              <Text style={stepText}>
                <strong>Izveido portfolio</strong> — ar mūsu veidnēm tu vari uzrādīt darbus klientiem jau nedēļas laikā.
              </Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* CTA */}
          <Section style={{ textAlign: "center" as const }}>
            <Button href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`} style={button}>
              Doties uz platformu →
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              Ja ir jautājumi — atraksti uz{" "}
              <Link href="mailto:info@chademy.lv" style={link}>info@chademy.lv</Link>
            </Text>
            <Text style={footer}>
              © 2025 Chademy · Latvija
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#05080F",
  fontFamily: "'Inter', -apple-system, sans-serif",
};

const container = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "32px 16px",
};

const logoSection = { marginBottom: "24px" };

const logo = {
  fontSize: "22px",
  fontWeight: "900",
  color: "#00ff88",
  margin: "0",
};

const heroSection = {
  backgroundColor: "rgba(0,255,136,0.06)",
  border: "1px solid rgba(0,255,136,0.2)",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
};

const h1 = {
  fontSize: "26px",
  fontWeight: "900",
  color: "#ffffff",
  margin: "0 0 12px",
};

const h2 = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0 0 16px",
};

const heroText = {
  fontSize: "15px",
  color: "#9ca3af",
  lineHeight: "1.6",
  margin: "0",
};

const divider = {
  borderColor: "rgba(255,255,255,0.07)",
  margin: "24px 0",
};

const step = {
  display: "flex",
  marginBottom: "16px",
};

const stepNumber = {
  fontSize: "13px",
  fontWeight: "900",
  color: "#00ff88",
  margin: "0 12px 0 0",
  minWidth: "24px",
};

const stepText = {
  fontSize: "14px",
  color: "#d1d5db",
  lineHeight: "1.6",
  margin: "0",
};

const button = {
  backgroundColor: "#00ff88",
  color: "#000000",
  padding: "14px 32px",
  borderRadius: "10px",
  fontWeight: "700",
  fontSize: "15px",
  textDecoration: "none",
  display: "inline-block",
};

const footer = {
  fontSize: "12px",
  color: "#4b5563",
  textAlign: "center" as const,
  margin: "4px 0",
};

const link = { color: "#00ff88" };
