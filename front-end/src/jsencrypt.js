 //此模块是根据jsencrypt封装一个加密过程
 
 import JSEncrypt from 'jsencrypt'
 
 export function jsEncrypt(str) {
   //实例这个方法
   let encrypt = new JSEncrypt();
   //根据一款软件 随机生成一段key值  这个key值是两个相互的 前后端各有一个 然后我们根据这个key值可以进行加密解密处理
   let key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlec7cf57opzCzTxrsSWmnycz0QVg9jA9syIDXyamt0cAypThrLpzFgCA6bTGoRTp5fjUzdQ1Z/PyN6L7BJ01EYQBdp6LERkqCNTySP1furoB1tlsxmi6lvYAFfJXgABJiAv7+5pZGilDtHvJDAduAZD2SKjg4etQom7bkAjV0GCwJnW6VkAUilgV+xwXhMDpjkzgNA6gdKVJjuF4n09fwRO4Y3bnypbOYLb0ks03QH1YkhJglEv6NrFpnUy1qFIkzKwgs0ieZ3qXW5yYmS/I3ZLcmsQ7RutCmJoqwTgfXodUGTxKCjIme+TeqcJmdHc84ElhIuk30nCFqYclehae8wIDAQAB`   //将这个key值传给这个方法  然后后端调用这个方法传入另一个相对的key就会进行解密   
   encrypt.setPublicKey(key);   //进行加密   
   let data = encrypt.encrypt(str);   //因为+号可能有其他不好的影响 我们用%2b替换一下这个+号   
   let code = encodeURI(data).replace(/\+/g, '%2B')   //将加密后的字符串返回
   return code
 }
 
 //解密函数  
 export function decode(pwd) {
   var decrypt = new JSEncrypt();
   //存放key
   decrypt.setPrivateKey('MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCV5ztx/nuinMLNPGuxJaafJzPRBWD2MD2zIgNfJqa3RwDKlOGsunMWAIDptMahFOnl+NTN1DVn8/I3ovsEnTURhAF2nosRGSoI1PJI/V+6ugHW2WzGaLqW9gAV8leAAEmIC/v7mlkaKUO0e8kMB24BkPZIqODh61CibtuQCNXQYLAmdbpWQBSKWBX7HBeEwOmOTOA0DqB0pUmO4XifT1/BE7hjdufKls5gtvSSzTdAfViSEmCUS/o2sWmdTLWoUiTMrCCzSJ5nepdbnJiZL8jdktyaxDtG60KYmirBOB9eh1QZPEoKMiZ75N6pwmZ0dzzgSWEi6TfScIWphyV6Fp7zAgMBAAECggEAGk+WyIBhVP5s1rcnM9Wm9EJePu7RwQRgoAN1Ugsnsf2dbvFI1xd2wcLe3aZkQru3/ix5tZLsuM1Bk3Bg3MN3IBbqZtaXFC41iY1O5W7Lkau6TOqmxAB3161gAHojz4y9W0q3NMc3onbhslkTxa+8KDw4bjJuHlk+MvSARzy1wrghDB6QbdJIPzV19dGggez/ICf6UrCgdmQuJAbFdHnoEK83qFSbBz5aljwWnMWTWvMJ0vN4SJXjiLwNMrOyKPkaeMulYFL2avFNeHhj/vzJL5R1bYWyFJ3mFQpSBVGUDfZoeCp5hDbwU6ERe2pjagPgsD2S72IhAEwKrlXUlemDQQKBgQDHA3gKdE47IlNrsqEmPiJHHoXY3Ix+4GPWT513DqwAAgxc0Sd/iFqHrxwAP7ZgohU4Eln/fCd9CsrOLqT9e3EETOjfSxFQjxC/RmcKkg4fXZZCXryx81OpjdTRT4v2mbpA0Hm/Kb4s0tT03vHrPeMOffiKefK0NQnbZfFvpQzk0wKBgQDA08WGesbUJKidTV0AjYNZQjJgXpYoRwneERxQiu7Ofxsc0oKbsYv5rZtKp7LjVkTyXUj8yhzJObVKm3qtoj8qvRhVMUhyPAiJJjFh+gcybV39jyvuq0zCv9n0ytuCfTfvPZEe/bsGCzhv71wuHNhxrkQ3St37APgf6wrzo+WJYQKBgEFoF3TAItH2hxo3PBVYiGV9V5odaiNs1gMiaWsurELYaX2709JrWu2LFJXUWrlJq9Wg2mlIQaYr/NlkpR8WCd/S8xooDsm+K0/h8I2d0PxoArFPd464nP91uMMN9L8YaQlSOyEjs/gBVrIf77xTu6MQrbW9PJITeGjeCUqbITC3AoGAXPX7dTC9qEqgC23fl0Oh/iceuD0BcRuGU0u2ddH0/RJkFMob80luLQmYIy6j3Fub06hLZqtdo1kx4G0CgLEGeOk+0Nt4jLIKf2wtRInQbGwzculSCbcFw6HQRuaBWvBZRfpNez5hqrFAHR6tNwHrCyszceCjEb5O4LxkxD7QiyECgYEAhujdPXQQcn7CqpY61ivxy03LCz4lW3R8xSJMtm1BY+iBp6P2GbgdKpbSXiTSr/Y3//8DwccLf47xc7Otcw6Yz+tcen88UxqHrI1myHltFNYkrbQ692PtszO8n3fta5bCPr8RY2ON3+uGYSHIDGyixAdxRQxkQPwMD0CFntHA2EA=');
   pwd = pwd.replace(/%2B/g, "+")
   pwd = decrypt.decrypt(pwd);
   return pwd;
 }
