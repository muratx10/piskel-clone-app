const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sass = require('sass');
const CopyPlugin = require('copy-webpack-plugin');

const conf = {
  entry: {
    index: './src/index.js',
    app: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    watchContentBase: true,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images',
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: 'bundle.css',
      sourceMap: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/screens/startScreen/index.html',
      title: 'Simple Piskel Clone',
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/screens/appScreen/app.html',
      title: 'Simple Piskel Clone',
      filename: 'app.html',
      chunks: ['app'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CopyPlugin([
      {
        from: './src/library/gif.worker.js',
        to: './gif.worker.js',
        toType: 'file',
      },
    ]),
    new CopyPlugin([
      {
        from: './src/library/gif.js',
        to: './gif.js',
        toType: 'file',
      },
    ]),
  ],
};

module.exports = (env, options) => {
  conf.devtool = options.mode === 'production'
    ? false
    : 'source-map';
  return conf;
};
