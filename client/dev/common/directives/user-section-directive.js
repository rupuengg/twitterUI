;(function(ng){
	'use strict';
	ng.module('twitterUI').directive('userSection',function(){
		return {
			restrict : 'E',
			replace:true,
			templateUrl : '/common/templates/user-section.html',
			controller:function(loginService,$window){
				var self = this;
				self.name = $window.user?$window.user.name:undefined;
				self.picture = $window.user?$window.user.picture:undefined;
				self.showUser = $window.success;
				self.logout = function(){
					loginService.logout();
				}
			},
			controllerAs : 'headerCtrl'
		};
	});
}(window.angular));