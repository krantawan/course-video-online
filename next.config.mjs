/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SECRET_KEY: process.env.API_SECRET_KEY,
  },
};

export default nextConfig;
