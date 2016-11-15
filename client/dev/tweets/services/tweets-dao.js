;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .factory('TweetsDAO', [
      '$q',
      'TweetsResource',
      function($q, TweetsResource) {
        var TweetDAO = function() {};

        TweetDAO.prototype.getAll = function() {
          var _onSuccess = function(tweets) {
            // do something with the response from the server, like extending a model or something

            return tweets; // this will be returned as a resolved promise
          };

          var _onError = function(error) {
            // do something with the error, like making it more readable or something
            return $q.reject(error); // this will be returned as a rejected promise
          };

          return TweetsResource
            .query()
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TweetDAO.prototype.createTweet = function(tweet) {
          if (!ng.isObject(tweet) || !(tweet instanceof Tweet) || !tweet.isValid()) {
            return $q.reject(new TypeError('Invalid tweet to be created.'));
          }

          var _onSuccess = function(tweet) {
            return new Tweet(tweet);
          };

          var _onError = function(error) {
            return $q.reject(error);
          };

          return TweetResource
            .save(tweet)
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TweetDAO.prototype.deleteTweet = function(id) {
          if (!ng.isString(id)) {
            return $q.reject(new TypeError('Invalid id for deletion.'));
          }

          var _onSuccess = function() {
            return;
          };

          var _onError = function(error) {
            return $q.reject(error);
          };

          return TweetResource
            .delete({
              id: id
            })
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TweetDAO.prototype.getTweetsBeyond = function(date){
           var _onSuccess = function(tweets) {
            // do something with the response from the server, like extending a model or something

            return tweets; // this will be returned as a resolved promise
          };

          var _onError = function(error) {
            // do something with the error, like making it more readable or something
            return $q.reject(error); // this will be returned as a rejected promise
          };

          return TweetsResource
            .tweetsBeyond({id:date})
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        return new TweetDAO();
      }
    ]);

}(window.angular));
