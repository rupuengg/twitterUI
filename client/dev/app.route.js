;
(function(ng) {
  'use strict';

  ng.module('twitterUI')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'auth/templates/login.html',
                controller: 'loginController',
                controllerAs: 'loginCtrl'
            })
            .state('tweets', {
                url: '/tweets',
                templateUrl: 'tweets/templates/tweets.html',
                controller: 'tweetsController',
                controllerAs: 'tweetsCtrl'
            });
    })
    .run(function($state,$window){
      ($window.success)?$state.go('tweets'):$state.go('login');
    });
}(window.angular));

