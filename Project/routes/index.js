var express = require('express');
var router = express.Router();
var passport = require("passport");
var User     = require("../models/user");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { page: "home" });
});

//show login form and register form
router.get("/login", function(req, res){
  res.render("login", {page: 'login'});
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: 'Welcome to Pizza Paradise!'
    }), function(req, res){
});

// handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  if(req.body.adminCode === 'secretcode123') {
    newUser.isAdmin = true;
  }

  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      console.log("password::::::::::::::::"+req.body.password);

      return res.render("login", {error: err.message});
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      res.redirect("/");
    });
  });
});

// logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "See you later!");
  res.redirect("/");
});



//route for posting new user data
// router.post('/register', function (req, res, next) {
//   // confirm that user typed same password twice
//   if (req.body.password !== req.body.confirmpw) {
//     var err = new Error('Passwords do not match.');
//     err.status = 400;
//     return next(err);
//   }
//   else {
//     var user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.save(function(err) {
//       if (err) res.send(err)
//       res.json({ message: 'Post saved'})
//     })
//   }
// });


module.exports = router;
