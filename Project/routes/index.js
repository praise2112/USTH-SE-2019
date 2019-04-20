var express = require('express');
var router = express.Router();
var passport = require("passport");
var csrf = require("csurf");  // to avoid your session from being stolen
var User     = require("../models/user");
var Cart = require("../models/cart");
var Order = require("../models/order");
var Food = require("../models/food");
var middleware = require("../middleware/index");

var csrfProtection = csrf();
router.use(csrfProtection); // telling express that all the route here should be protected by csrf protection


/* GET home page. */
router.get('/', function(req, res) {
  req.session.oldUrl = req.url;
  Food.find({},(err, allfood)=>{
    if(err){
      console.log(err);
    }else{
      // shopping cart
      if(!req.session.cart){  // if cart is empty
        return res.render("home",{foods: allfood, cartfoods: null, toggleModal:res.locals.toggleModal, page: "home"});
      }
      var cart = new Cart(req.session.cart);
      var toggle = req.session.toggleModal;
      req.session.toggleModal = false;
      return res.render("home",{foods: allfood, cartfoods:cart.generateArray(), totalCost: cart.totalCost, toggleModal:toggle ,page: "home"});
    }
  });
  // res.render('home', { page: "home" });
});

//show login form and register form
router.get("/login", function(req, res){
  res.render("login", {page: 'login',csrfToken: req.csrfToken()});
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: 'Welcome to Pizza Paradise!'
    }), function(req, res){
      if(req.session.oldUrl){ // if there is an old url present in the session
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      }else{
        res.redirect( "/");
      }
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
      return res.render("login", {error: err.message});
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
      if(req.session.oldUrl){ // if there is an old url present in the session
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
       }else{
        res.redirect( "/");
      }
    });
  });
});

// logout route
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "See you later!");
  res.redirect("/");
});



// add to cart route
router.get('/add-to-cart/:idd', function(req, res, next) {
  var foodId = req.params.idd;
  var cart = new Cart(req.session.cart ? req.session.cart : {}) ;    //  if a cart is already in session pass that otherwise pass an empty object
  Food.findById(foodId, function (err, food) {
    if (err){
      console.log(err);
      return res.redirect("/")
    }
    cart.add(food, food.id);
    req.session.oldPosition = "/#"+foodId;
    req.session.cart = cart;
    console.log(req.session.cart);
    console.log(req.session.oldPosition);
    res.redirect("/foods/oldPosition")
  })
});

//reduce an item in cart
router.get("/reduce/:id",function (req, res, next) {
  var foodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {}) ;    //  if a cart is already in session pass that otherwise pass an empty object
  cart.reduceByOne(foodId);
  var oldUrl = req.session.oldUrl;
  req.session.oldUrl = null;
  req.session.cart = cart;
  req.session.toggleModal = true;
  console.log(req.session.toggleModal+ " from reduce from cart route");
  // res.redirect(oldUrl);
  console.log(req.session.cart);
   res.redirect("/foods");
});
router.get("/increase/:id",function (req, res, next) {
  var foodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {}) ;    //  if a cart is already in session pass that otherwise pass an empty object
  cart.increaseByOne(foodId);
  var oldUrl = req.session.oldUrl;
  req.session.oldUrl = null;
  req.session.cart = cart;
  req.session.toggleModal = true;
  console.log(req.session.toggleModal+ " from reduce from cart route");
  // res.redirect(oldUrl);
  console.log(req.session.cart);
   res.redirect("/foods");
});

// remove item from cart route
router.get('/remove/:id', function(req, res, next) {
  var foodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(foodId);
  req.session.cart = cart;
  req.session.toggleModal = true;
  console.log(req.session.toggleModal+ " from remove from cart route");
  console.log(req.session.cart);

  res.redirect("/foods");
});

//checkout
router.get("/checkout",middleware.isLoggedIn,function (req, res, next) {
  if(!req.session.cart){  // if cart is empty
    return res.redirect("/");
  }
  var cart = new Cart(req.session.cart);
  //var errMsg = req.flash("error")[0];
  req.session.toggleCheckout = true;
  res.redirect("/foods")
});

// CHECKOUT PROCESS
router.put("/checkout/:iddd", function (req, res, next) {

  if(!req.session.cart){  // if cart is empty
    return res.redirect("/");
  }
  var cart = new Cart(req.session.cart);

  User.findByIdAndUpdate(req.params.iddd, req.body.user, (err, updatedUser)=>{
    if(err){

      req.flash("error", "Unable to update user");
      return res.redirect("/foods");
    }
  });
  var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.user.address,
      name: req.user.username,
    });
  order.save(function (err, result) {
      if (err){
        console.log(err);
        req.flash("error", "Something went wrong");
        return res.redirect("/");
      }
      req.flash("success", "Food will be delivered soon");
      req.session.cart = null;
      res.redirect("/");
    });

});

// ORDERS ROUTE
router.get("/orders",middleware.isLoggedIn,function (req, res, next) {
  //retrieve order data for user
  Order.find({user: req.user}, function (err, orders) {
    if(err){
      console.log(err);
      return res.render("/");
    }
    var cart;
    orders.forEach(function (order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    console.log(orders);
    res.render("order",{orders: orders, page:"orders"});
  });
});





module.exports = router;
