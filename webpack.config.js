const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './main/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: 1,
              import: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['main/common/styles', 'main/components'],
              sourceMap: true,
            },
          },
          {
          loader: "postcss-loader",
          options: {
            ident: 'postcss',
            plugins: [require('autoprefixer')],
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './main/index.html',
      filename: 'index.html',
    }),
],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: './dist'
  },
};
