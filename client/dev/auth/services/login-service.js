;(function(ng){
	'use strict';
	ng.module('twitterUI').service('loginService',function($window,$location,$http){

		var url = 'auth/twitter';
		var logout = 'https://localhost:3333/logout';
		this.login = function(){
			$location.path(url);
			$window.location.href=$location.absUrl();
		};

		this.logout = function(){
			$window.location.href=logout;
		}
	});
}(window.angular));