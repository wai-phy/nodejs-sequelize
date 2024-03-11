const express = require("express");
const path = require("path");

const router = express.Router();
const postController = require("../controllers/post")

router.get("/create", postController.renderCreatePost);

router.post("/",postController.createPost );

module.exports = router;
