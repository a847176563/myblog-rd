const router = require("koa-router")();
const blog = require('../controllers/blogController')
const { verifyToken } = require("../auth");

router.prefix("/blog");

router.get("/list", blog.listBlog);



router.get("/detail", blog.getBlogDetail)

router.post('/write', blog.writeBlog);

module.exports = router;