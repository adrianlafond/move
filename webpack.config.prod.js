const devConfig = require('./webpack.config');

module.exports = {
  ...devConfig,
  mode: 'production',
  devtool: 'cheap-module-source-map',
};
