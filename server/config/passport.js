// config/passport.js

// Load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// load up the user model
var User = require('../auth/models/user');

// load the auth configurations
var configAuth = require('./auth');

module.exports = function(passport){
	// used to serilalize the user for session
	passport.serilalizeUser(function(user, done){
		done(null, user.id);
	});

	// used to deserilalize the user
	passport.deserilalize(function(id, done){
		User.findById('id', function(err, user){
			done(err, user);
		});
	});

	
	// ==================================================================
	// Twitter===========================================================
	// ==================================================================

	passport.use(new TwitterStrategy({
		consumerKey:configAuth.twitterAuth.consumerKey,
		consumerSecret:configAuth.twitterAuth.consumerSecret,
		callbackURL:configAuth.twitterAuth.callbackURL;
	}, function(token, tokenSecret, profile, done){
		// make the code asynchronous
		// User.findOne won't fire until we have all our data back from twitter
		process.nextTick(function(){
			User.findOne({'twitter.id':profile.id}, function(err, user){
				// if there is an error, stop everything and return that ie an error connecting to database
				if(err) return err;

				// if the user is found than log them in
				if(user){
					return user;
				}else{
					var newUser = new User();

					// set all of the user data that we need
					newUser.twitter.id = profile.id;
					newUser.twitter.token = token;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile.displayName;

					// save our user into the database
					newUser.save(function(err){
						if(err) return err;

						return newUser;
					});
				}
			});
		});
	}))
};