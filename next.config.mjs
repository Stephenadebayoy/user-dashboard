/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    domains: ["via.placeholder.com"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.externals = [
      ...(Array.isArray(config.externals) ? config.externals : []),
      { canvas: "commonjs canvas" },
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };

    config.ignoreWarnings = [
      {
        module: /node_modules\/node-fetch\/lib\/index\.js/,
      },
    ];

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    if (process.env.NODE_ENV === "production") {
      console.log = function () {};
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: true,
      },
    ];
  },

  swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
};

export default nextConfig;
