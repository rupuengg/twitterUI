;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .factory('TweetsDAO', [
      '$q',
      'Tweets',
      'TweetsResource',
      function($q, Tweets, TweetsResource) {
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

        TweetDAO.prototype.createTodo = function(todo) {
          if (!ng.isObject(todo) || !(todo instanceof Tweet) || !todo.isValid()) {
            return $q.reject(new TypeError('Invalid todo to be created.'));
          }

          var _onSuccess = function(todo) {
            return new Tweet(todo);
          };

          var _onError = function(error) {
            return $q.reject(error);
          };

          return TweetResource
            .save(todo)
            .$promise
            .then(_onSuccess)
            .catch(_onError);
        };

        TweetDAO.prototype.deleteTodo = function(id) {
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

        return new TweetDAO();
      }
    ]);

}(window.angular));
