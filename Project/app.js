var express = require("express");
var app = express();
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var session = require('express-session');

//setup db
mongoose.connect('mongodb://localhost:27017/projectdb', { useNewUrlParser: true });

//router setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(flash()); 

app.listen(3000, function(){
    console.log("Sever started at port 3000");
})

//router config
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;