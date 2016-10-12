const StaticDispatcher = require('../commons/static/index');

// auth/routes.js
module.exports = function(app, passport){
	// route for home page
	app.get('/', function(req, res){
		StaticDispatcher.sendIndex(req, res);
		// res.render(StaticDispatcher.sendIndex);
	});

	// route for login form
	// route for processing the login form
	// route for signup form
	// route for processing the signup form

	// route for showing the profile page
	app.get('/profile', isLoggedIn, function(req, res){
		// StaticDispatcher.sendIndex(req, res);
		res.render('profile.html', {
			user:req.user // get the user out of session and pass to template
		});
	});

	// route for logging out
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	// route for twitter authentication and login
	app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
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