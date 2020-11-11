module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.module.rules.push({
      test: /\.html$/i,
      loader: "html-loader",
    });

    // Important: return the modified config
    return config;
  },
};
