const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); //modeli(veri tabaniyla modellerim konusur) import ettim..
const path = require("path");

router.get("/new", (req, res) => {
  if (req.session.userId) {
    return res.render("site/addpost");
  }

  res.redirect("/users/login");
});

router.post("/test", (req, res) => {
  Post.create(req.body), //postu database e kaydettim
    res.redirect("/new");
});
module.exports = router;
