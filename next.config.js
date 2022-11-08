/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      target: "node",
      dllplugins: {
        defaults: {
          exclude: ["stripe"],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
