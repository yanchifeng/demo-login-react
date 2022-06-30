
const redis = require('ioredis')
const client = redis.createClient();
//如果没有启动redis,会报错，启动redis方法，在cd到redis的安装目录，执行redis-server.exe redis.windows.conf
client.on("error", function (err) {
    console.log("Error " + err);
});


module.exports=client;