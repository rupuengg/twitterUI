const StaticDispatcher = require('../commons/static/index');

// auth/routes.js
module.exports.init = function(router, passport){
	// route for home page
	router.route('/').get(function(req, res){
		StaticDispatcher.sendIndex(req, res);
	});

	// route for showing the profile page
	router.route('/profile').get(isLoggedIn, function(req, res){
		var response = {
			success:true,
			user:{
				name:JSON.stringify(req.user.twitter.username),
				picture:JSON.stringify(req.user.twitter.picture)	
			}
		};
		console.log('res',response);
		res.render('index.html',response);
		
	});

	// route for logging out
	router.route('/logout').get(function(req, res){
		req.logout();
		res.redirect('/');
	});

	// route for twitter authentication and login
	router.route('/auth/twitter').get(passport.authenticate('twitter', { scope : 'email' }));

    // handle the callback after twitter has authenticated the user
    router.route('/auth/twitter/callback').get(
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    // send to twitter to do the authentication
    router.route('/connect/twitter').get(passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    router.route('/connect/twitter/callback').get(
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // twitter --------------------------------
    router.route('/unlink/twitter').get(isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
	// if user is authenticated in the session, carry on
	if(req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}