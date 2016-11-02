;(function(ng){
	'use strict';
	ng.module('twitterUI').service('loginService',function($window){

		var url = 'https://localhost:3333/auth/twitter';
		this.login = function(){
			$window.location.href=url;
		};
	});
}(window.angular));