"use strict";

const fs = require('fs');

module.exports = class StaticDispatcher {
    static sendIndex(req, res) {
    res.type('html');	
    var response = {
			success:Boolean(req.session.passport && req.session.passport.user),
			name:req.user && JSON.stringify(req.user.twitter.username),
			picture:req.user && JSON.stringify(req.user.twitter.picture)
		};
      res.render('index.html',response);
    }
}
