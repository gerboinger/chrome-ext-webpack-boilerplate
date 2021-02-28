const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

const config = {
   stats: {
      errorDetails: true
   },
   mode: 'development',
   devtool: 'inline-source-map',
   entry: {
      background: path.join(__dirname, 'src', 'background.js'),
      popup: path.join(__dirname, 'src', 'popup.js'),
      options: path.join(__dirname, 'src', 'options.js'),
   },
   output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js'
   },
   devServer: {
      writeToDisk: true
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/
         },
         {
            test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]'
                  }
               }
            ],
            exclude: /node_modules/
         },
         {
            test: /\.html$/,
            use: ['html-loader'],
            exclude: /node_modules/
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         filename: 'popup.html',
         chunks: ['popup']
      }),
      new HtmlWebpackPlugin({
         filename: 'options.html',
         chunks: ['options']
      }),
      new CopyWebpackPlugin({
         patterns: [
            {from: path.join(__dirname, 'src/manifest.json'), to: path.join(__dirname, 'dist/manifest.json')}
         ]
      })
   ]
};

module.exports = config;