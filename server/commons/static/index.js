"use strict";

const fs = require('fs');

module.exports = class StaticDispatcher {
    static sendIndex(req, res) {
      var _root = process.cwd();

      //res.type('.html');

     // fs.createReadStream(_root + '/client/dev/index.html').pipe(res);
     var success = Boolean(req.session.passport && req.session.passport.user);	
      res.render('index.html',{success:success});
    }
}
