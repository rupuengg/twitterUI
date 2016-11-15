;
(function(ng) {
    'use strict';

    ng.module('twitterUI')
        .controller('tweetsController', [
            '$scope',
            '$log',
            'TweetsDAO',
            '$interval',
            function($scope, $log, TweetsDAO, $interval) {
                var self = this,
                    latest;

                self.tweets = [];
                
                self.createTweet = function(tweet) { 
                    TweetsDAO
                        .createTweet(tweet)
                        .then(function(newTweet) {
                            self.tweets.push(newTweet);
                        })
                        .catch($log.error);
                };

                function _getAll() {
                    TweetsDAO
                        .getAll()
                        .then(function(tweets) {
                            
                            self.tweets = tweets.filter(function(tweets) {
                                return !(tweets.subject.indexOf('Loose') >= 0 || tweets.subject.indexOf('Jobs') >= 0);
                            });
                            if (self.tweets.length)
                                latest = self.tweets[0].tweetedAt;
                        })
                        .catch($log.error);
                }

                self.deleteTweet = function(id) {
                    TweetsDAO
                        .deleteTweet(id)
                        .then(function() {
                            _getAll();
                        })
                        .catch($log.error);
                };

                function getTweetsBeyond(date) {
                    TweetsDAO.getTweetsBeyond(date)
                        .then(function(tweets) {
                            self.tweets = tweets.concat(self.tweets);
                        })
                        .catch($log.error);
                }

                _getAll();

                var promise = $interval(getTweetsBeyond, 10 * 60 * 1000, 0, true, latest);

                $scope.$on('$destroy', function() {
                    $interval.cancel(promise);
                });

            
            }
        ]);
}(window.angular));