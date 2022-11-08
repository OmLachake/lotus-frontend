/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.node = {
        dgram: "empty",
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty",
      };

      config.plugins.push(new webpack.IgnorePlugin(/^(stripe)$/));
      config.plugins.push(
        new webpack.IgnorePlugin({
          checkResource(resource, context) {
            // If I am including something from my backend directory, I am sure that this shouldn't be included in my frontend bundle
            if (
              resource.includes("/backend/") &&
              !context.includes("node_modules")
            ) {
              return true;
            }
            return false;
          },
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
