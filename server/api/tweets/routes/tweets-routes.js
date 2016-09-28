"use strict";

const TweetsController = require('../controller/tweets-controller');

module.exports = class TweetsRoutes {
    static init(router) {
      router
        .route('/api/tweets')
        .get(TweetsController.getAll)
        .post(TweetsController.createTweets);

      router
        .route('/api/tweets/:id')
        .delete(TweetsController.deleteTweets);

      router
        .route('/api/tweets/:date')
        .delete(TweetsController.getTweetedAfter);  
    }
}
