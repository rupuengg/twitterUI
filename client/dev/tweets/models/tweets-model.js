;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .factory('Tweets', [function() {
      var Tweet = function(tweet) {
        this.todoTitle = null;
        this.todoDescription = null;
        ng.extend(this, tweet);
      };

      return Tweet;
    }]);

}(window.angular));
