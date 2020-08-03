module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/notes": { page: "/notes" },
      "/profile": { page: "/profile" },
    };
  },
  publicRuntimeConfig: {
    env: process.env.NODE_ENV,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
};
