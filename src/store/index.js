//在webpack配置中声明的node环境变量,根据NODE_ENV加载不同的模块
//ES6语法不支持在if中写import语句,所以这里采用了CommonJS的模块引入方法require
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./store.prod')
} else {
    module.exports = require('./store.dev')
}
