module.exports = {
  publicRuntimeConfig: {
    env: process.env.NODE_ENV,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
};
