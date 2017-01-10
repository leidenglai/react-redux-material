var path = require('path');
var webpack = require('webpack');
var cdn = "http://static.socialshops.com/ops";

module.exports = {
  devtool: 'source-map',
  entry: [
        './src/index.js'
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
        loaders: ['file?name=[name]-[hash].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 1, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
      }
    ]
  },
  resolve: {
    alias: {
      actions: path.join(__dirname, "src/actions"),
      components: path.join(__dirname, "src/components"),
      constants: path.join(__dirname, "src/constants"),
      containers: path.join(__dirname, "src/containers"),
      middleware: path.join(__dirname, "src/middleware"),
      actions: path.join(__dirname, "src/actions"),
      reducers: path.join(__dirname, "src/reducers"),
      static: path.join(__dirname, "src/static")
    }
  }
};