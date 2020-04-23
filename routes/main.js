const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require("../models/Post");

router.get("/about", (req, res) => {
  res.render("site/about");
});
router.get("/", (req, res) => {
  res.render("site/index");
});

//databasedeki postları çektim..
router.get("/blog", (req, res) => {
  Post.find({}, (error, post) => {
    console.log(error, post);
  });
  res.render("site/blog");
});

router.get("/contact", (req, res) => {
  res.render("site/contact");
});



module.exports = router;
