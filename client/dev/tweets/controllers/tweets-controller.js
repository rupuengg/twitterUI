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
                self.lastTweetDate = null;
                self.busy = TweetsDAO.loading;
                self.createTweet = function(tweet) { 
                    TweetsDAO
                        .createTweet(tweet)
                        .then(function(newTweet) {
                            self.tweets.push(newTweet);
                        })
                        .catch($log.error);
                };

                self.loadTweets = function (date) {
                    let tweetPromise = TweetsDAO.getTweetsBeyond(date);
                    if(!tweetPromise)
                        return;
                        tweetPromise.then(function(tweets) {
                            self.tweets = tweets.concat(self.tweets);
                            /*self.tweets = tweets.filter(function(tweets) {
                                return !(tweets.subject.indexOf('Loose') >= 0 || tweets.subject.indexOf('Jobs') >= 0);
                            });*/
                            if (self.tweets.length){
                                latest = self.tweets[0].tweetedAt;
                                self.lastTweetDate = self.tweets[self.tweets.length-1].tweetedAt;
                            }
                            self.busy = TweetsDAO.loading;
                        })
                        .catch($log.error);
                };

                self.deleteTweet = function(id) {
                    TweetsDAO
                        .deleteTweet(id)
                        .then(function() {
                            _getAll();
                        })
                        .catch($log.error);
                };

                

                var promise = $interval(self.loadTweets, 10 * 60 * 1000, 0, true, latest);

                $scope.$on('$destroy', function() {
                    $interval.cancel(promise);
                });

            
            }
        ]);
}(window.angular));