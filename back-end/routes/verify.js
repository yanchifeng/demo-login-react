var express = require('express');
var router = express.Router();
var client = require('../client');
var svgCaptcha = require('svg-captcha');

function createToken(leng) {
 leng = leng==undefined?32:leng	//如果没设置token长度自动为32位
 //预设随机字符串
 let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789'
 let token = ''
 //以长度单位进行循环
 for(let i=0;i<leng;++i){
     token+=chars.charAt(Math.floor(Math.random()*chars.length))
 }
 return token;	///返回之前使用md5加密一下
};

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body, 'req')
    var captcha = svgCaptcha.create({});
    //此时text生成的就是随机的四位数验证码 真正的验证码
    let text = captcha.text;
    //console.log(captcha);
    //在生成一个随机的key用来做这个验证码的标识
    let keyId = createToken(48);
    //console.log(keyId);
    //把这个生成的key和captcha.data这个生成的图片返回给前端
    let temp = {
        keyId: keyId,
        captcha: captcha.data,
    }
    //将其存到Redis这个数据库中 并且设置60s后从这个数据库删除

    client.set(keyId, text, 'EX', 60) //60秒后验证码过期知道

    //检查一下如果是不是存进去了
    client.get(keyId, function (err, v) {
        //console.log("图形验证码的值存入redis，值为：", v);
        if (err) {
            res.statusCode = 500;
            res.send({
                code: 0,
                msg: "请稍后重试"
            })
        } else {
            res.send({
                code: 1,
                data: temp,
                message: '验证码'
            });
        }
    })
});

module.exports = router;