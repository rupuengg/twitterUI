;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .factory('Tweets', [function() {
      var Tweet = function(tweet) {
        this.todoTitle = null;
        this.todoDescription = null;
        ng.extend(this, tweet);
      };

      // var MIN_ACCEPTED_LENGTH = 5;

      // Tweet.prototype.isValid = function() {
      //   var _isDefined = ng.isDefined(this.todoTitle);
      //   var _isString = ng.isString(this.todoTitle);
      //   var _isBigEnough = (_isDefined && _isString) ? this.todoTitle.length >= MIN_ACCEPTED_LENGTH : false;

      //   if(_isDefined && _isString && _isBigEnough){
      //     return _isDefined && _isString && _isBigEnough;
      //   }else{
      //     var _isDefined = ng.isDefined(this.todoDescription);
      //     var _isString = ng.isString(this.todoDescription);
      //     var _isBigEnough = (_isDefined && _isString) ? this.todoDescription.length >= MIN_ACCEPTED_LENGTH : false;

      //     return _isDefined && _isString && _isBigEnough;
      //   }
      // };

      return Tweet;
    }]);

}(window.angular));
