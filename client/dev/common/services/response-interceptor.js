;
(function(ng) {
	'use strict';
    ng.module('twitterUI').config(function($httpProvider) {
        $httpProvider.interceptors.push(function($q, $location) {
            return {
                response: function(response) {
                	return response || $q.when(response);
                },
                responseError: function(response) {
                    if (response.status === 401) 
                    return $q.reject(response);
                }
            };
        });
    });
})(window.angular);