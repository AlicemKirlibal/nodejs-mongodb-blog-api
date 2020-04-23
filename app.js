const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const hostname = "127.0.0.1";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");

mongoose.connect("mongodb://127.0.0.1/nodeblog_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//session ile kullanılacığını yazdım
const MongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "testotesto",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
//flash-message middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

app.use(express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Display Link  middleware
app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next();
});

const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
const contact = require("./routes/contact");

app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);
app.use("/contact", contact);

app.listen(port, hostname, () => {
  console.log(`Server is okay,http://${hostname}:${port}/`);
});
