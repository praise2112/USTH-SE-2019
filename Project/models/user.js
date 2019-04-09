var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
var bcrypt = require('bcrypt');


//Create table
var UserSchema = new mongoose.Schema({
	//Data goes here
	username : {
		type: String,
	},
	email : { 
		type: String, 
		required: true,
		unique: true
	},
	password: { 
		type: String, 
	},
	isAdmin: {type: Boolean, default: false},

	favorites: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'pizzas'
	}],
});

// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// Bcrypt password function when saving
// UserSchema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash){
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });

//Pre-create favourite food function
// UserSchema.methods.favorite = function(id){
//   if(this.favorites.indexOf(id) === -1){
//     this.favorites.push(id);
//   }
//   return this.save();
// };
//
// UserSchema.methods.unfavorite = function(id){
//   this.favorites.remove(id);
//   return this.save();
// };

UserSchema.plugin(passportLocalMongoose);	// using passport validation
module.exports = mongoose.model('User',UserSchema);
