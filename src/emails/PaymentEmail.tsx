import {
  Body, Container, Head, Heading, Html,
  Link, Preview, Section, Text, Hr, Button,
} from "@react-email/components";

interface PaymentEmailProps {
  name?: string;
  planName: string;
  amount: number;
  invoiceUrl?: string;
}

export function PaymentEmail({
  name = "draugs",
  planName,
  amount,
  invoiceUrl,
}: PaymentEmailProps) {
  return (
    <Html lang="lv">
      <Head />
      <Preview>{`Maksājums apstiprināts — ${planName} €${amount}/mēn`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={{ marginBottom: "24px" }}>
            <Text style={logo}>⚡ Chademy</Text>
          </Section>

          {/* Success banner */}
          <Section style={successBanner}>
            <Text style={checkmark}>✓</Text>
            <Heading style={h1}>Maksājums apstiprināts!</Heading>
            <Text style={subText}>Sveiks, {name}. Tavs abonements ir aktīvs.</Text>
          </Section>

          <Hr style={divider} />

          {/* Order details */}
          <Section style={detailsBox}>
            <Heading style={h2}>Pasūtījuma informācija</Heading>

            <Section style={row}>
              <Text style={label}>Plāns</Text>
              <Text style={value}>{planName}</Text>
            </Section>
            <Section style={row}>
              <Text style={label}>Summa</Text>
              <Text style={valueGreen}>{`€${amount}/mēnesī`}</Text>
            </Section>
            <Section style={row}>
              <Text style={label}>Statuss</Text>
              <Text style={valueGreen}>Aktīvs ✓</Text>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* CTA */}
          <Section style={{ textAlign: "center" as const }}>
            <Text style={ctaText}>Vari sākt mācīties uzreiz:</Text>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
              style={button}
            >
              Atvērt kursus →
            </Button>

            {invoiceUrl && (
              <Text style={invoiceText}>
                <Link href={invoiceUrl} style={link}>Lejupielādēt rēķinu</Link>
              </Text>
            )}
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section>
            <Text style={footer}>
              Abonementa pārvaldība pieejama{" "}
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/abonemets`}
                style={link}
              >
                šeit
              </Link>
            </Text>
            <Text style={footer}>
              Jautājumi? Raksti uz{" "}
              <Link href="mailto:info@chademy.lv" style={link}>info@chademy.lv</Link>
            </Text>
            <Text style={footer}>© 2025 Chademy · Latvija</Text>
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

const logo = {
  fontSize: "22px",
  fontWeight: "900",
  color: "#00ff88",
  margin: "0",
};

const successBanner = {
  backgroundColor: "rgba(0,255,136,0.06)",
  border: "1px solid rgba(0,255,136,0.25)",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
};

const checkmark = {
  fontSize: "32px",
  color: "#00ff88",
  margin: "0 0 8px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "900",
  color: "#ffffff",
  margin: "0 0 8px",
};

const h2 = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0 0 16px",
};

const subText = {
  fontSize: "14px",
  color: "#9ca3af",
  margin: "0",
};

const divider = {
  borderColor: "rgba(255,255,255,0.07)",
  margin: "24px 0",
};

const detailsBox = {
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "10px",
  padding: "16px 20px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const label = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "0",
};

const value = {
  fontSize: "13px",
  color: "#e5e7eb",
  fontWeight: "600",
  margin: "0",
};

const valueGreen = {
  ...value,
  color: "#00ff88",
};

const ctaText = {
  fontSize: "14px",
  color: "#9ca3af",
  margin: "0 0 16px",
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

const invoiceText = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "16px 0 0",
};

const footer = {
  fontSize: "12px",
  color: "#4b5563",
  textAlign: "center" as const,
  margin: "4px 0",
};

const link = { color: "#00ff88" };
