"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const tweetsSchema = require('../model/tweets-model');
const _ = require('lodash');

tweetsSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {"subject" : "Testing Tweets:Strict match"};

        Tweets
          .find(_query)
          .sort({tweetedAt:-1})
          .limit(10)
          .exec((err, tweets) => {
              err ? reject(err)
                  : resolve(tweets);
          });
      });
}

tweetsSchema.statics.getTweetedAfter = function(date){
    return new Promise((resolve, reject) => {
      
          date = new Date(date);
          let _query = {"subject" : "Testing Tweets:Strict match","tweetedAt":{$gt:date}};
        
        Tweets
          .find(_query)
          .sort({'tweetedAt':-1})
          .limit(10)
          .exec((err, tweets) => {
              err ? reject(err)
                  : resolve(tweets);
          });
      });
}

tweetsSchema.statics.createTweets = (tweet) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(tweet))
          return reject(new TypeError('Tweets is not a valid object.'));

      let _tweet = new Tweets(tweet);

      _tweet.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

tweetsSchema.statics.deleteTweets = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Tweets
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Tweets  = mongoose.model('Tweet', tweetsSchema);

module.exports = Tweets;
