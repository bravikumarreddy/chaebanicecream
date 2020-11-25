const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  var config = {
    entry: ['react-hot-loader/patch', './src/index.js'],
    mode: 'production',

    output: {
      path: path.resolve(__dirname, './docs'),
      filename: 'main.js',
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        favicon: './assets/logo.png',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['react-hot-loader/babel'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
  };
  if (env.development) {
    config.devServer = {
      contentBase: './dist',
      hot: true,
    };
    config.devtool = 'inline-source-map';
    config.mode = 'development';
  }
  return config;
};
