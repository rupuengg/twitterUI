;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .config([
      '$locationProvider',
      function($locationProvider) {
        $locationProvider.html5Mode(true);
      }
    ]);
}(window.angular));
