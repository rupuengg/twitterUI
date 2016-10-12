;(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'auth/index.html'
          })
          .when('/auth/twitter', {

          })
          .when('/profile', {
            templateUrl: 'auth/profile.html'
          })
          .when('/tweets', {
            templateUrl: 'tweets/templates/tweets.html',
            controller: 'TweetsController',
            controllerAs: 'tweetsCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
}(window.angular));
