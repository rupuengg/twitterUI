// app/model/user.js
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define schema for user model
var _userSchema = mongoose.Schema({
	local : {
		email : String,
		password : String
	},
	twitter : {
		id : String,
		token : String,
		displayName : String,
		username : String
	}
});

// checking if password is valid using bcrypt
_userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

// this method hashes the password and sets the users password
_userSchema.methods.hashPassword = function(password){
	var user = this;

	// hash the password
	bcrypt.hash(password, null, null, function(err, hash){
		if(err) return err;

		user.local.password = hash;
	});
};

module.exports = mongoose.model('User', _userSchema);