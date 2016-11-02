;(function(ng){
	'use strict';
	ng.module('twitterUI').controller('loginController',function(loginService){
		var self = this;
		console.log('login ctrl');
		self.login=function(){
			loginService.login();
		};
	});
}(window.angular));