/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      target: "node",
    });

    return config;
  },
};

module.exports = nextConfig;
