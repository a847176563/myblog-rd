const model = require("../models/userModels")
const {createToken} = require('../auth')

module.exports = {
    login: async function (ctx, next) {
        // 1. 接数据
        let { username, password } = ctx.request.body;
        // 2. 验证
    
        // 3. 连数据库
        let results = await model.getUserByNameAndPwd(username, password);
        // 4. 根据数据库操作的结果，返回相应的信息
        if (results.length > 0) {
          // 登录成功
          // 生成token
          let payload = {
            userId: Math.random(),
            username,
          };
          var token = createToken(payload);
          ctx.body = {
            state: "success",
            token,
            user: results[0]
          };
        } else {
          ctx.body = {
            state: "fail"
          }
        }
      },
      regist: async function (ctx) {
        //接收表单数据
        console.log(ctx.request.body);
        let { username, password, nickname } = ctx.request.body;
        //安全验证
        if (username.trim().length == 0) {
            ctx.body={
                state: "fail",
            }  
        } else {
            //连接数据库
            let results = await model.saveUserData({ username, password, nickname });
            if (results.insertId) {//判断insertId是否有正常直
                // await ctx.render('login');
                ctx.body = {
                    state: "success"
                  }
            } else {
                ctx.body = {
                    state: "fail"
                  }
            }
        }
    }, async checkUser(ctx) {

        let { username } = ctx.query;
        //安全验证
        //连接数据库

        let userData = await model.getUserDataByName(username);
        console.log(userData);
        if (userData.length > 0) {
            //重定向 重新回到指定路由 不允许传送数据
            ctx.body = "fail"

        } else {
            ctx.body = "success"
        }
    }
}