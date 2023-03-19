require('dotenv').config()
const express = require("express");
const dbConnection = require("./databaseConfig/databaseConnection.js");

const passport = require("passport");
const passportLocal = require("./middleware/passport-local-strategy.js");
var cookieParser = require("cookie-parser");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const indexRouter = require("./routes/index.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customFlash = require("./middleware/flashMiddleware.js");

const app = express();
//databse connection
dbConnection();
//to parse json data
app.use(express.json());
// to parse usl encoded data
app.use(express.urlencoded({ extended: true }));

//setting up to access my static file public
app.use(express.static("public"));

//set up view engine

//setting up layout configuration 
app.use(expressLayout);

//setting up view engine as ejs
app.set("view engine", "ejs");
//giving the path of my views folder
app.set("views", path.join(__dirname, "views"));

//after the view i need to do express-session
app.use(
  session({
    name: "placement",
    secret: "abcde",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },

    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://gurpreetsingh:Shalu%401999@cluster0.apn6ahn.mongodb.net/?retryWrites=true&w=majority",
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);

//initializing passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//initializing flash
app.use(flash());
app.use(customFlash.setFlash);

app.use("/v1", indexRouter);

app.listen(4000, () => {
  console.log("server is running fine");
});
