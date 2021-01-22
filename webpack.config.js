const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'
  const entryPath = isDev ? './demo/index.js' : './src/smallchart.js'
  const plugins = isDev ? [
    new HtmlWebpackPlugin({
      template: './demo/index.html'
    }),
  ] : []
  return {
    entry: {
      index: entryPath,
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './demo',
    },
    plugins: plugins,
    output: {
      filename: 'smallchart.js',
      path: path.resolve(__dirname, 'lib'),
      library: 'smallchart',
      libraryTarget: 'umd'
    }
  }
}
