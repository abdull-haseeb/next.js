module.exports =
  ({ enabled = true, openAnalyzer = true } = {}) =>
  (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        if (enabled && !options.isServer) {
          const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer,
              reportFilename: !options.nextRuntime
                ? `./analyze/client.html`
                : `../${options.nextRuntime === 'nodejs' ? '../' : ''}analyze/${
                    options.nextRuntime
                  }.html`,
              generateStatsFile: true,
            })
          )
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }
        return config
      },
    })
  }
