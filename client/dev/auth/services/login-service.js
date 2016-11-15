;(function(ng){
	'use strict';
	ng.module('twitterUI').service('loginService',function($window,$location,$http){

		var url = 'auth/twitter';
		this.login = function(){
			$location.path(url);
			$window.location.href=$location.absUrl();
		};

		this.logout = function(){
			$http.get("https://localhost:3333/logout").then(function(){
				console.log('logged out');
			});
		}
	});
}(window.angular));