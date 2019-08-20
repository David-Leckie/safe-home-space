module.exports = {
  use: [
    [
      '@neutrinojs/vue',
      {
        html: {
          title: 'SAFE Home Page'
        }
      }
    ],
    /*[
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          // enable CSS Modules
          modules: true,
          // customize generated class names
          localIdentName: '[local]_[hash:base64:8]'
        }
      }
    ],*/
    (neutrino) => {
      // Override the default development source map of 'cheap-module-eval-source-map'
      // to one that doesn't use `eval` (reduces incremental build performance).
      neutrino.config.devtool('cheap-module-source-map');
    }
  ]
};
