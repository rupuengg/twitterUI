;(function(ng){
	'use strict';
	ng.module('twitterUI').controller('loginController',function(loginService){
		var self = this;

		self.login=function(){
			loginService.login().then(function(response){
				console.log('response',response);
			});
		};
	});
}(window.angular));