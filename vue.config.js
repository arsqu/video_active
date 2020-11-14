"use strict"

const CompressionWebpackPlugin = require("compression-webpack-plugin")

const externals = {
  Vue: "Vue",
  VueRouter: "VueRouter",
  Axios: "axios"
}

const isProd = process.env.NODE_ENV === "production"
const pubPath = `/${process.env.VUE_APP_BACK_PORT}/`

const devServer = {
  // host: "192.168.31.25",
  host: "0.0.0.0",
  port: process.env.VUE_APP_PORT,
  https: false,
  open: false,
  historyApiFallback: {
    verbose: true,
    rewrites: [
      // { from: /^\/.*/, to: '/index.html' }
      { from: new RegExp(`/${pubPath}(.*?)`), to: '/index.html' }
    ]
  },
  proxy: {
    '/api': {
      target: `http://192.168.31.76:${process.env.VUE_APP_BACK_PORT}`,
      changeOrigin: true,
      pathRewrite: {
        // '^/api': ''
        '^/video/api': '/video'
      }
    }
  }
}

const vueConfig = {
  publicPath: `${process.env.VUE_APP_PUBLIC_PATH}/`,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  chainWebpack(config) {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'slapchat'
        return args
      })
    config.externals(externals)
    config.resolve.alias
      .set("@locales", "@/locales")
      .set("@store", "@/store")
      .set("@views", "@/views")
      .set("@router", "@/router")
      .set("@assets", "@/assets")
      .set("@components", "@/components")
      .set("@util", "@/util")
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    },
    i18n: {
      // locale: 'en',
      // fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  productionSourceMap: false,
  configureWebpack(config) {
    // htmlwebpack
    if (isProd) {
      // 版本号
      // /?version=${process.env.VUE_APP_VERSION}
      const fileName = `js/[name].[contenthash:8].js`
      config.output.filename = fileName
      config.output.chunkFilename = fileName
      // gzip
      const plugins = [
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")"),
          filename: '[path][base].gz[query]',
          threshold: 10240
          // deleteOriginalAssets:false
        })
      ]
      config.plugins = [...config.plugins, ...plugins]
      // 删除注释和console输出
      var tersetOptions = config.optimization.minimizer[0].options.terserOptions
      tersetOptions.compress = {
        drop_console: true,
        warnings: false,
        collapse_vars: false,
        reduce_vars: false,
        pure_funcs: ["console.log"]
      }
      tersetOptions.output = {
        comments: false
      }
    }
    config.optimization.splitChunks.cacheGroups = {
      ui: {
        name: "chunk-ui",
        test: /[\\/]node_modules[\\/](cube-ui)[\\/]/,
        priority: -5,
        chunks: "initial"
      },
      vendors: {
        name: "chunk-vendors",
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: "all"
      },
      common: {
        name: "chunk-common",
        minChunks: 2,
        reuseExistingChunk: true,
        priority: -20,
        chunks: "initial"
      }
    }
  },
  devServer
}

module.exports = vueConfig
