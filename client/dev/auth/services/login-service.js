;(function(ng){
	'use strict';
	ng.module('twitterUI').service('loginService',function($http){

		var url = 'https://localhost:3333/auth/twitter';
		this.login = function(){
			return $http.get(url,function(response){
				console.log(response);
				return response;
			});
		}
	});
}(window.angular));