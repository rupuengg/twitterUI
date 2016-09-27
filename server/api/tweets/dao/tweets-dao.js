"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const tweetsSchema = require('../model/tweets-model');
const _ = require('lodash');

tweetsSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Todo
          .find(_query)
          .exec((err, todos) => {
              err ? reject(err)
                  : resolve(todos);
          });
      });
}

tweetsSchema.statics.createTweets = (todo) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(todo))
          return reject(new TypeError('Todo is not a valid object.'));

      let _todo = new Todo(todo);

      _todo.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

tweetsSchema.statics.deleteTweets = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Todo
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Tweets  = mongoose.model('Tweets', tweetsSchema);

module.exports = Tweets;
