module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/login": { page: "/login"},
      "/notes": { page: "/notes" },
    };
  },
  publicRuntimeConfig: {
    env: process.env.NODE_ENV,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
};
