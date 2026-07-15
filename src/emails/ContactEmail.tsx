import {
  Body, Container, Head, Heading, Html,
  Preview, Section, Text, Hr,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
  locale?: string;
}

/** Iekšēja vēstule komandai, kad kāds aizpilda /kontakti formu. */
export function ContactEmail({ name, email, message, locale }: ContactEmailProps) {
  return (
    <Html lang="lv">
      <Head />
      <Preview>{`Jauna ziņa no ${name} (${email})`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ marginBottom: "24px" }}>
            <Text style={logo}>⚡ Chademy</Text>
          </Section>

          <Section>
            <Heading style={h1}>Jauna ziņa no kontaktu formas</Heading>

            <Text style={meta}>
              <strong style={label}>Vārds:</strong> {name}
            </Text>
            <Text style={meta}>
              <strong style={label}>E-pasts:</strong> {email}
            </Text>
            {locale && (
              <Text style={meta}>
                <strong style={label}>Valoda:</strong> {locale.toUpperCase()}
              </Text>
            )}
          </Section>

          <Hr style={divider} />

          <Section>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            Atbildi tieši uz šo vēstuli — tā aizies uz {email}.
          </Text>
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
  fontSize: "20px",
  fontWeight: "700",
  color: "#FFFFFF",
  margin: "0",
};

const h1 = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#FFFFFF",
  letterSpacing: "-0.02em",
  margin: "0 0 20px",
};

const meta = {
  fontSize: "14px",
  color: "#C7CEDB",
  lineHeight: "1.6",
  margin: "0 0 6px",
};

const label = { color: "#8B93A7" };

const divider = {
  borderColor: "#1C2230",
  margin: "24px 0",
};

const messageText = {
  fontSize: "15px",
  color: "#E6EAF2",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap" as const,
  margin: "0",
};

const footer = {
  fontSize: "12px",
  color: "#8B93A7",
  lineHeight: "1.5",
  margin: "0",
};
