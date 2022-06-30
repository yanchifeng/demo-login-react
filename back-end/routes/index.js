var express = require('express');
var router = express.Router();
const Users = require('../models/role');
var client = require('../client');
var connection = require('../connection');
var JSEncrypt = require('jsencrypt');

/* GET home page. */
/* GET users listing. */
router.post('/', function (req, res, next) {
  let userID = req.body.name
  let { keyId, code, password } = req.body;
  //接到登录请求后先检验这个图片验证码是不是存在或者不正确 
  client.get(keyId, (err, succ) => {
      if (err) {
               console.log(err);
               res.statusCode = 500;
               res.send({
               code: 0,
               msg: "验证码已过期"
           })
           return false;
      } else {
           //console.log(code.toUpperCase() === succ.toUpperCase())
           console.log(succ)
               if (succ) {
                   if (code.toUpperCase() === succ.toUpperCase()) {
                       //根据用户名去数据库查询这个人是不是存在数据库
                       //如果存在的话 在对密码进行解密处理
                      //  const $sql = `select * from user where userID="${userID}"`;
                      //  connection.query($sql, (err, results) => {
                        console.log(userID, 'userID');
                        Users.findOne({userID}, (err, results) => {
                          console.log(err)
                           if (err) {
                               res.statusCode = 500;
                               res.send({
                                   code: 0,
                                   msg: "登录失败，请稍后再试"
                               })
                           } else {
                            console.log(results, 'results')
                               if (results) {
                                   //console.log(results)
                                   //取出这个密码来进行解密 然后与传过来的密码进行比较 看是否密码一样
                                   var decrypt = new JSEncrypt();
                                   //存放key
                                   decrypt.setPrivateKey('MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCV5ztx/nuinMLNPGuxJaafJzPRBWD2MD2zIgNfJqa3RwDKlOGsunMWAIDptMahFOnl+NTN1DVn8/I3ovsEnTURhAF2nosRGSoI1PJI/V+6ugHW2WzGaLqW9gAV8leAAEmIC/v7mlkaKUO0e8kMB24BkPZIqODh61CibtuQCNXQYLAmdbpWQBSKWBX7HBeEwOmOTOA0DqB0pUmO4XifT1/BE7hjdufKls5gtvSSzTdAfViSEmCUS/o2sWmdTLWoUiTMrCCzSJ5nepdbnJiZL8jdktyaxDtG60KYmirBOB9eh1QZPEoKMiZ75N6pwmZ0dzzgSWEi6TfScIWphyV6Fp7zAgMBAAECggEAGk+WyIBhVP5s1rcnM9Wm9EJePu7RwQRgoAN1Ugsnsf2dbvFI1xd2wcLe3aZkQru3/ix5tZLsuM1Bk3Bg3MN3IBbqZtaXFC41iY1O5W7Lkau6TOqmxAB3161gAHojz4y9W0q3NMc3onbhslkTxa+8KDw4bjJuHlk+MvSARzy1wrghDB6QbdJIPzV19dGggez/ICf6UrCgdmQuJAbFdHnoEK83qFSbBz5aljwWnMWTWvMJ0vN4SJXjiLwNMrOyKPkaeMulYFL2avFNeHhj/vzJL5R1bYWyFJ3mFQpSBVGUDfZoeCp5hDbwU6ERe2pjagPgsD2S72IhAEwKrlXUlemDQQKBgQDHA3gKdE47IlNrsqEmPiJHHoXY3Ix+4GPWT513DqwAAgxc0Sd/iFqHrxwAP7ZgohU4Eln/fCd9CsrOLqT9e3EETOjfSxFQjxC/RmcKkg4fXZZCXryx81OpjdTRT4v2mbpA0Hm/Kb4s0tT03vHrPeMOffiKefK0NQnbZfFvpQzk0wKBgQDA08WGesbUJKidTV0AjYNZQjJgXpYoRwneERxQiu7Ofxsc0oKbsYv5rZtKp7LjVkTyXUj8yhzJObVKm3qtoj8qvRhVMUhyPAiJJjFh+gcybV39jyvuq0zCv9n0ytuCfTfvPZEe/bsGCzhv71wuHNhxrkQ3St37APgf6wrzo+WJYQKBgEFoF3TAItH2hxo3PBVYiGV9V5odaiNs1gMiaWsurELYaX2709JrWu2LFJXUWrlJq9Wg2mlIQaYr/NlkpR8WCd/S8xooDsm+K0/h8I2d0PxoArFPd464nP91uMMN9L8YaQlSOyEjs/gBVrIf77xTu6MQrbW9PJITeGjeCUqbITC3AoGAXPX7dTC9qEqgC23fl0Oh/iceuD0BcRuGU0u2ddH0/RJkFMob80luLQmYIy6j3Fub06hLZqtdo1kx4G0CgLEGeOk+0Nt4jLIKf2wtRInQbGwzculSCbcFw6HQRuaBWvBZRfpNez5hqrFAHR6tNwHrCyszceCjEb5O4LxkxD7QiyECgYEAhujdPXQQcn7CqpY61ivxy03LCz4lW3R8xSJMtm1BY+iBp6P2GbgdKpbSXiTSr/Y3//8DwccLf47xc7Otcw6Yz+tcen88UxqHrI1myHltFNYkrbQ692PtszO8n3fta5bCPr8RY2ON3+uGYSHIDGyixAdxRQxkQPwMD0CFntHA2EA=');
                                   password = password.replace(/%2B/g, "+")
                                   //此时就能把传过来的密码解密了
                                   password = decrypt.decrypt(password);
                                   //在把数据库的数据解密出来进行比对
                                   results.password = results.password.replace(/%2B/g, "+")
                                   let mysqlpassword = decrypt.decrypt(results.password)
                                   //console.log(mysqlpassword,"密码是什么")
                                   //比较下两个密码 看是否一样
                                   if (password === mysqlpassword) {
                                       res.send({
                                           code: 1,
                                           token: results.token,
                                           msg: "登陆成功"
                                       })
                                   } else {
                                       res.send({
                                           code: 0,
                                           msg: "密码输入错误"
                                       })
                                   }
                               } else {
                                   //该用户没有在数据库中
                                   res.send({
                                       code: 0,
                                       msg: "该用户还没注册，请去注册页面进行注册"
                                   })
                               }
                           }
                       })
                   } else {
                       res.statusCode = 500;
                       res.send({
                           code: 0,
                           msg: "验证码输入错误"
                       })
                   }
               } else {
                   res.send({
                       code: 0,
                       msg: "验证码已过期"
                   })
               }
   
               console.log(succ, "===");
           }
  });
})
module.exports = router;
