const mongoose = require("mongoose");

const Post = require("./models/Post");

mongoose.connect("mongodb://127.0.0.1/nodeblog_test_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

 Post.findByIdAndDelete("5e924fb085d78724183f53b3", (error, post) => {
console.log(error, post);
});

// Post.find({
//   title: "post basligi",
// });

//  Post.create(
//   {
//      title: "post basligi",
//    },
//    (error, post) => {
//      console.log(error, post);
//    }
//  );

// Post.create(
//   {
//     title: "post basligi 2",
//   },
//   (error, post) => {
//     console.log(error, post);
//   }
// );
