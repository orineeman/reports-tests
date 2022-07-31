/** @type {import('next').NextConfig} */
const {
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXT_PABLIC_ADMIN_PASS,
  NEXT_PABLIC_EMAIL,
  EMAIL_PASSWORD,
  NEXTAUTH_SECRET,
  // NEXTAUTH_URL,
} = process.env;
const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_USER,
    DB_HOST,
    DB_PASS,
    DB_NAME,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NEXT_PABLIC_ADMIN_PASS,
    NEXT_PABLIC_EMAIL,
    EMAIL_PASSWORD,
    NEXTAUTH_SECRET,
    // NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
