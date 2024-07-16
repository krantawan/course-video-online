/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SECRET_KEY: process.env.API_SECRET_KEY,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
