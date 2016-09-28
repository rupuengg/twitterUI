;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .controller('TweetsController', [
      '$log',
      'Tweets',
      'TweetsDAO',
      '$interval',
      function($log, Tweets, TweetsDAO,$interval) {
        var self = this;

        self.tweet = new Tweets();
        self.tweets = [];
        self.previous = [];
        self.new_tweets = [];
        self.prevLength = 0;
        console.log(self);

        self.createTodo = function(tweet) {
          TweetsDAO
            .createTodo(tweet)
            .then(function(newTweet) {
              self.tweets.push(newTweet);
              self.tweet = new Tweet();
            })
            .catch($log.error);
        };

        function _getAll() {
          return TweetsDAO
            .getAll()
            .then(function(tweets) {
              self.tweets = tweets;
              if(self.previous.length == 0){
                set_prev_tweets();
                self.prevLength = self.tweets.length;
              }
              self.new_tweets = [];
              if(self.tweets.length > self.prevLength){
                for(var a in self.tweets){
                  if(self.previous.indexOf(self.tweets[a].tweetId) < 0){
                    self.new_tweets.push(self.tweets[a].tweetId);
                  }
                }
                set_prev_tweets();
                self.prevLength = self.tweets.length;
              }
              console.log(self);
              return self.tweets;
            })
            .catch($log.error);
        }

        self.deleteTodo = function(id) {
          TweetsDAO
            .deleteTodo(id)
            .then(function() {
              return _getAll();
            })
            .catch($log.error);
        };

        function set_prev_tweets(){
          if(self.previous.length > 0) self.previous = [];
          for(var a in self.tweets){
            self.previous.push(self.tweets[a].tweetId);
          }
        }

        _getAll();
        // $interval(_getAll, 10000);        

        return self;
      }
    ]);
}(window.angular));
