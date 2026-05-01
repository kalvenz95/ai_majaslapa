/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Neļauj ielādēt lapā esošos resursus citos domēnos (clickjacking aizsardzība)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Neļauj pārlūkam uzminēt satura tipu
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer politika
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Strict Transport Security (HTTPS only pēc pirmā apmeklējuma)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // XSS aizsardzība
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "*.clerk.accounts.dev" },
      { protocol: "https", hostname: "i.ytimg.com" },   // YouTube thumbnails
      { protocol: "https", hostname: "vimeo.com" },
      { protocol: "https", hostname: "*.vimeocdn.com" },
    ],
  },

  // Stripe webhook — prasa raw body
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

module.exports = nextConfig;
