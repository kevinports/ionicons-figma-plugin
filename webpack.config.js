const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
  watch: true,

  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    ui: './src/ui.tsx',
    plugin: './src/plugin.ts'
  },

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

      { test: /\.css$/, loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },

      { test: /\.(png|jpg|gif|webp|zip)$/, loader: [{ loader: 'url-loader' }] },

      { test: /\.svg$/, loader: [{ loader: 'svg-inline-loader' }] },
    ]
  },

  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: 'node_modules/ionicons/dist/svg/*.svg',
    //     to: 'svg',
    //     flatten: true
    //   }]
    // }),
    new HtmlWebpackInlineSourcePlugin()
  ]
});