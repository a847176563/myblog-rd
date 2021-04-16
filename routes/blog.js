const router = require("koa-router")();
const blog = require('../controllers/blogController')
const { verifyToken } = require("../auth");

router.prefix("/blog");

router.get("/list", blog.listBlog);



router.get("/detail", blog.getBlogDetail)
router.post("/revise",blog.revise)
router.post('/write', blog.writeBlog);
router.post('/delete', blog.delete);

module.exports = router;