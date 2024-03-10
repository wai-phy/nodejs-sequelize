const express = require("express");
const path = require("path");
const { posts } = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  // console.log(posts);
  // res.sendFile(path.join(__dirname, "..", "views", "home-page.html"));
  res.render("home",{title : "Hello La",postArr : posts});
});

router.get("/post", (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "post-page.html"));
  res.render("post");
});

module.exports = router;
