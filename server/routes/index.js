"use strict";

const TweetRoutes = require('../api/tweets/routes/tweets-routes');
const AuthRoutes = require('../auth/routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
   static init(app, router,passport) {
     TweetRoutes.init(router);
     AuthRoutes.init(router,passport);
     
     router
       .route('*')
       .get(StaticDispatcher.sendIndex);
     

     app.use('/', router);
   }
}
