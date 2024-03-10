const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");


const postRoutes = require("./routes/post");
const { adminRoutes } = require("./routes/admin");

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

app.use(postRoutes);
app.use("/admin", adminRoutes);

app.listen(8080);
