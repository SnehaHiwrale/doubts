const blog = require("../controllers/Blog.contoller")

const router = require("express").Router()

router
    .get("/", blog.getBlog)
    .post("/create", blog.createBlog)
    .patch("/update/:bid", blog.updateBlog)
    .delete("/delete/:bid", blog.deleteBlog)
module.exports = router