var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Pizaa Paradiseeeee' });
});

router.get('/login',function(req, res){
  res.render('logIn', {});
});

module.exports = router;
