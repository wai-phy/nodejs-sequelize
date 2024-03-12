const express = require("express");
const path = require("path");

const router = express.Router();

const postController = require("../controllers/post");

router.get("/", postController.getPosts);
router.get("/post/:id", postController.getPost);

module.exports = router;
