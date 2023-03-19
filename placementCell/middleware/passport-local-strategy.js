const passport=require("passport")
const EMPLOYERMODEL = require("../models/employerModel")
const LocalStrategy=require("passport-local").Strategy


//setting up passport configuration

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback: true, // allows to set first argument as req
},
async function(req,email,password,done){
    //finds the user and create identity
    try{
console.log("hii")
 let employer=await EMPLOYERMODEL.findOne({email:email})


 if (!employer) {
    req.flash("error", "Invalid Username or Password");
    return done(null, false);
  }



 const isPasswordCorrect = await employer.comparePassword(password);


if(!isPasswordCorrect){
    req.flash("error", "Invalid Username or Password");
return done(null,false)


}

return done(null,employer)


}
catch(err){
    req.flash("error", err);
    return done(err);

}
}

))



//serailizing the user to decide which key is to be kept in the cookie

passport.serializeUser(function(user,done){
    done(null,user._id)
})



//desearializing the user from key in the cookie

passport.deserializeUser(async function(id,done){
    try{
        let employe= await EMPLOYERMODEL.findById(id)
        return done(null,employe)
    }
   

    catch(err){
return done(err)
    }
})




passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signid in
    return res.redirect("/v1/")
}


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contain the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user
    }
    next()
}




module.exports=passport