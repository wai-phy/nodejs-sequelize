const express = require("express");
const path = require("path");

const router = express.Router();
const postController = require("../controllers/post")

router.get("/create", postController.renderCreatePost);

router.post("/",postController.createPost );
//admin/post/id
router.post("/post/:id", postController.deletePost);

router.get('/post-edit/:id', postController.getOldPost);
router.post('/post-edit', postController.updatePost);

module.exports = router;
