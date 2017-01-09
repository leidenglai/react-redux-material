var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
        'webpack-hot-middleware/client',
  './src/index.js'
    ],
  output: {
    path: path.join(__dirname, 'webpack-output'),
    filename: 'bundle.js',
    publicPath: '/webpack-output/'
  },
  plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
  module: {
    loaders: [
      { test: /.js$/, loader: 'babel', exclude: /node_modules/, include: __dirname },
      { test: /\.css$/, loaders: ["style", "css"] },
      // LESS
      { test: /\.less$/, loader: 'style!css!less' },
      {
        test: /\.(png|jpg)$/,
        loaders: ['file?name=[name]-[hash].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 1, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
      }
    ]
  },
};