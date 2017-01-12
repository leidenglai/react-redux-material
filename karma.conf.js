// karma.conf.js
var webpackCfg = require('./webpack.config.dev');

module.exports = function(config) {
  config.set({
    basePath: '',
    // 测试所用平台
    browsers: ['PhantomJS'],
    // 测试文件
    files: [
      'test/test_index.js'
    ],
    // karma 服务器的监听端口
    port: 3030,
    captureTimeout: 60000,
    // 使用的测试框架
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {}
    },
    // 只运行一次
    singleRun: true,
    // 测试日志格式
    reporters: ['mocha', 'coverage'],
    // 输出日志为彩色
    colors: true,
    // 自动监测测试文件内容
    autoWatch: false,
    preprocessors: {
      'test/test_index.js': ['webpack', 'sourcemap']
    },
    // `webpack` 配置
    webpack: webpackCfg,
    // 不显示 `webpack` 打包日志信息
    webpackServer: {
      noInfo: true
    },
    // karma 插件
    plugins: [
      'karma-coverage',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-mocha-reporter'
    ],
    coverageReporter: {
      reporters: [
        { type: 'text-summary', dir: 'coverage', subdir: '.' }
      ]
    }
  });
};