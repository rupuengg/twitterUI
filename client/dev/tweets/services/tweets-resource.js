;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .factory('TweetsResource', [
      '$resource',
      function($resource) {
        var _url = '/api/tweets/:id';
        var _params = {}; 
        var _actions = {
          tweetsBeyond:{
            method:'GET',
            isArray:true
          }
        };

        return $resource(_url, _params, _actions);
      }
    ]);

}(window.angular));
