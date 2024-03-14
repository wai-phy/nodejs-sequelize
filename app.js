const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const sequelize = require("./utils/database");

const Post = require("./models/post");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const postRoutes = require("./routes/post");
const adminRoute = require("./routes/admin");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", (req, res, next) => {
  console.log("This is middleware home");
  next();
});

app.use("/admin", (req, res, next) => {
  console.log("This is middleware admin");
  next();
});

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log(user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use(postRoutes);
app.use("/admin", adminRoute);

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Hefefoe", email: "waitr.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
