const Post = require("../models/post");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  req.user.createPost({
    title,
    description,
    imgUrl: photo,
  })
    .then((result) => {
      console.log(result);
      console.log("New Post Create");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePost = (req, res) => {
  res.render("create", { title: "Create" });
};

exports.getPosts = (req, res) => {
  Post.findAll({ order: [["title", "DESC"]] })
    .then((posts) => {
      res.render("home", { title: "Home Page", postArr: posts });
    })
    .catch((err) => console.log(err));
};

exports.getPost = (req, res) => {
  const id = Number(req.params.id);
  Post.findByPk(id)
    .then((post) => res.render("details", { title: "Detail Page", post: post }))
    .catch((err) => console.log(err));
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((post) => {
      if (!post) {
        res.redirect("/");
      }
      return post.destroy();
    })
    .then((result) => {
      console.log("Post deleted!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getOldPost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((post) => {
      res.render("edit", { title: `${post.title}`, post });
    })
    .catch((err) => console.log(err));
};


exports.updatePost = (req, res)=>{
  const {title, description, imgUrl, id}  = req.body;
  Post.findByPk(id).then((post)=>{
    (post.title = title),
    (post.description = description),
    (post.imgUrl = imgUrl);
    post.save();
    res.redirect("/");
  }).then((result)=>{
    console.log(`Post Id is ${id} is updated successfully`)
  }).catch((err)=>console.log(err))
}