const model = require("../models/blogModels")

module.exports = {
    async welcome(ctx) {
        let results = await model.getBlogs();
        let loginUser = ctx.session.loginUser;

        console.log(results);
        //报错Malicious Path 原因： index前加了斜线
        await ctx.render('index', {
            blogs: results,
            user: loginUser,

        });
    }, async getBlogDetail(ctx) {
        
        let { blogId } = ctx.query;
        console.log(blogId);
        let results = await model.getBlogById(blogId);
        console.log(results);
        if (results.length > 0) {
            let { blog_id, title, content, post_time } = results[0]
            blogDtl = { blog_id, title, content, post_time }

            blogDtl.comments = []
            for (let i = 0; i < results.length; i++) {
                let obj = results[i];
                blogDtl.comments.push({
                    comm_id: obj.comm_id,
                    comm_content: obj.comm_content,
                    comm_post_time: obj.comm_post_time,
                    username: obj.username
                });
            }
            ctx.body = {
                state: "success",
                blogDetails: results,
            };


        }
    }, async write(ctx) {
        //接收表单数据
        try {
            var user_id = ctx.session.userId;

            let user = ctx.request.body;
            user.user_id = user_id;
            // console.log('write' ,userId);
            console.log(user);

            let results = await model.saveBlogData(user);
            if (results.insertId) {//判断insertId是否有正常直
                // await ctx.render('login');
                console.log('文章上传成功');
                ctx.redirect("/")
            } else {
                await ctx.render('error');
            }
        } catch (err) {
            console.log(err);
        }

        // }
    }, async discuss(ctx) {
        //接收表单数据
        var { blogId } = ctx.params;
        // console.log(ctx.request.body);
        // var user_id = ctx.session.userId;
        // let user = ctx.request.body;
        // user.user_id = user_id;
        // user.blog_id = blogId;

        
        console.log();
        let results = await model.getBlogById(blogId);
        if (results.insertId) {//判断insertId是否有正常直
            // await ctx.render('login');
            console.log('评论');
            ctx.redirect("/")
        } else {
            await ctx.render('error');
        }
        //}
    }, writeBlog: async function (ctx) {
        let { title, content, userId } = ctx.request.body;
        let results = await model.saveBlogData(title, content, userId);
        if (results.insertId > 0) {
          ctx.body = {
            state: "success",
          };
        } else {
          ctx.body = {
            state: "fail",
          };
        }
      },
      listBlog: async (ctx, next) => {
        try {
          let results = await model.getBlogs();
          if (results.length > 0) {
            ctx.body = {
              state: "success",
              blogs: results,
            };
          } else {
            ctx.body = {
              state: "fail",
            };
          }
        }catch(err){
          ctx.status = 500;
          console.log(err);
        }
      },

};
