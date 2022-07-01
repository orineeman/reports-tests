/** @type {import('next').NextConfig} */
const {
  DB_USER,
  DB_HOST,
  DB_PASS,
  DB_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
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
  },
};

module.exports = nextConfig;
