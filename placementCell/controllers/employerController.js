const EMPLOYERMODEL = require("../models/employerModel.js");
const jwt = require("jsonwebtoken");
const STUDENT = require("../models/studentModel.js");
const INTERVIEW = require("../models/interviewModel.js");

let token;


//to show signIn page to user
const showSignInPage = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/v1/dashboard");
      }

  return res.render("employerSignIn", {
    title: "Placement cell | Sign In",
  });
};
//to show signUp page to user
const showSignUpPage = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/v1/dashboard");
      }
  return res.render("employerSignUp", {
    title: "Placement cell | Sign Up",
  });
};

//functionality to sign in the user
const signin = async (req, res) => {

    req.flash("success", "Logged in successfully");
  return res.redirect("/v1/dashboard")
 
};

//signup functionality ...creating user in database
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
 if(!name,  !email, !password){
    req.flash("error", "all field are required ");
    return res.redirect("back");
 }

let employe=EMPLOYERMODEL.findOne({ email:email })

if(employe){
    req.flash("error", "user already exist with email id ");
    return res.redirect("back");
}


    const employer = await EMPLOYERMODEL.create({
      name: name,
      email: email,
      password: password,
    });

if(employer){
    req.flash("success", "Account created!");
    return res.redirect("/");
}
} catch (err) {
    consle.log(err);
  }
}

//logout functionality
function logout(req, res) {
    req.logout((err) => {
        if (err) {
          return next(err);
        }

  req.flash("success", "Logged out successfully!");
    return res.redirect("/v1/");
})
}



//to  show dashboard page
async function showDashboardPage(req, res) {


  try {
    if (req.isAuthenticated()) {
    let students = await STUDENT.find({}).populate("interviews");
    let interviews = await INTERVIEW.find({}).populate("students.student");

    return res.render("dashboardPage", {
      title: "Dashboard",
      all_students: students,
      all_interviews: interviews,
    });
  
    }
    else{
        req.flash("error", "Logged in to access this page");
        return res.redirect("/v1/");
    }

  } catch (err) {

    return res.redirect("back");
  }

}





module.exports = {
  showDashboardPage,
  signin,
  signup,
  
  logout,
  showSignInPage,
  showSignUpPage,
  
};
