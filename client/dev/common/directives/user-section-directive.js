;(function(ng){
	'use strict';
	ng.module('twitterUI').directive('userSection',function(){
		return {
			restrict : 'E',
			replace:true,
			templateUrl : '/common/templates/user-section.html',
			link:function(scope,el,attr){
				scope.headerCtrl.name = attr.name;
				scope.headerCtrl.picture = attr.picture;
			},
			controller:function(loginService){
				var self = this;
				self.logout = function(){
					loginService.logout();
				}
			},
			controllerAs : 'headerCtrl'
		};
	});
}(window.angular));