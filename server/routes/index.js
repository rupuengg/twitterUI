"use strict";

// const TodoRoutes = require('../api/todo/routes/todo-routes');
const TweetRoutes = require('../api/tweets/routes/tweets-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
   static init(app, router) {
     // TodoRoutes.init(router);
     TweetRoutes.init(router);
     
     router
       .route('*')
       .get(StaticDispatcher.sendIndex);
     

     app.use('/', router);
   }
}
