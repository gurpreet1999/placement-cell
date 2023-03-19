const express = require("express");
const passport = require("passport");

const {
  signin,
  signup,
  logout,
  showSignInPage,
  showSignUpPage,
  showDashboardPage,
  verifyy,
} = require("../controllers/employerController.js");

const employerRoute = express.Router();

//employer routes

employerRoute.get("/", showSignInPage);
employerRoute.get("/signup", showSignUpPage);
employerRoute.get("/dashboard", showDashboardPage);

employerRoute.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/v1/signup",
  }),
  signin
);
employerRoute.post("/createuser", signup);

employerRoute.get("/logoutuser", logout);

module.exports = employerRoute;
