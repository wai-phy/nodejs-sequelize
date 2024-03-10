const express = require("express");
const path = require("path");

const router = express.Router();

const posts = [];

router.get("/create", (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "create-post.html"));
  res.render("create",{title : "Create"})
});

router.post("/", (req, res) => {
  const { title, description } = req.body;
  console.log(`title is ${title} & description is ${description}`);
  posts.push({
    title,
    description,
  });
  console.log(posts)
  res.redirect("/");
});

module.exports = { adminRoutes: router, posts };
