/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: {
    extensions: ["js", "ts"],
    fallback: {
      child_process: false,
    },
    node: {
      child_process: "empty",
    },
    browsers: {
      child_process: false,
    },
  },
};

module.exports = nextConfig;
