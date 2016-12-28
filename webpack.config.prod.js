var path = require('path');
var webpack = require('webpack');
var cdn = "http://static.socialshops.com/ops";

module.exports = {
  devtool: 'source-map',
  entry: [
        './index.js'
    ],
  output: {
    path: path.join(__dirname, 'webpack-output'),
    filename: 'bundle.js',
    publicPath: '/webpack-output/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },
      {
        test: /\.less$/,
        loaders: ["style", "css", "less"]
      },
      {
        test: /\.(png|jpg)$/,
        loaders: ['file?name=[name].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 1, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
      }
    ]
  },
};