"use strict";

const fs = require('fs');

module.exports = class StaticDispatcher {
    static sendIndex(req, res) {
    res.type('html');	
    var response = {
			success:Boolean(req.session.passport && req.session.passport.user),
			user:{
				name:req.user ? JSON.stringify(req.user.twitter.username):'false',
				picture:req.user ? JSON.stringify(req.user.twitter.picture):'false'
			}
		};
      res.render('index.html',response);
    }
}
