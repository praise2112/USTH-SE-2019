var express         = require("express"),
    app             = express(),
    http            = require('http'),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    flash           = require('connect-flash'),
    mongoose        = require('mongoose'),
    session         = require('express-session'),
    passport        = require("passport"),  // login and SignUp authentication
    LocalStrategy   = require("passport-local"),     // login and SignUp authentication
    cookieParser    = require("cookie-parser"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");     // user model

//cofigure dotenv
var dotenv = require('dotenv').config({path: path.join(__dirname, '.env')}); // for env variables

//router setup
var indexRoutes = require('./routes/index');
// var usersRouter = require('./routes/users');

//setup db
mongoose.set("useCreateIndex", true);
mongoose.connect('mongodb://localhost:27017/projectdb', { useNewUrlParser: true });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(methodOverride("_method"));     // for authentication
app.use(cookieParser('secret'));        // for authentication


//  PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "One again Rusty wins the cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// making a middleware for all routes on the page to get current user, error or success
// this are global variables(can be accessed from any file)
app.use(async function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success =  req.flash("success");
    next();
});

//router config
app.use('/', indexRoutes);
// app.use('/users', usersRouter);

app.listen(3000, function(){
    console.log("Sever started at port 3000");
});


module.exports = app;