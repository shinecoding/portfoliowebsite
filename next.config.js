/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVICE_ID: "service_rpjgf4s",
    TEMPLATE_ID: "template_i01g56a",
    PUBLIC_KEY: "C1IRWSqvebfD2f3tM"
  },
  // Keep links shared before the project was renamed working.
  async redirects() {
    return [
      { source: '/work/snapquest', destination: '/work/fintech-habit-app', permanent: true },
    ]
  },
}

module.exports = nextConfig
