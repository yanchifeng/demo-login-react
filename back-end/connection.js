var mongoose = require('mongoose');

// 链接数据库
var connection = mongoose.connect('mongodb://127.0.0.1:27017/role', { useNewUrlParser: true }, (err, res) => {
  if (!err) {
    console.log("数据库创建连接成功！")
  }
})

// 监听连接成功(回调)
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})
// 连接异常
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err)
})
// 连接断开
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected')
})

module.exports=connection;