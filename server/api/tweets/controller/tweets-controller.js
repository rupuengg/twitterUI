"use strict";

const TweetsDAO = require('../dao/tweets-dao');

module.exports = class TweetsController {
  static getAll(req, res) {
      TweetsDAO
        .getAll()
        .then(tweets => res.status(200).json(tweets))
        .catch(error => res.status(400).json(error));
  }

  static getTweetedAfter(req, res) {
      TweetsDAO
        .getTweetedAfter(req.body)
        .then(tweets => res.status(200).json(tweets))
        .catch(error => res.status(400).json(error));
  }

  static createTweets(req, res) {
      let _tweet = req.body;

      TweetsDAO
        .createTodo(_tweet)
        .then(tweet => res.status(201).json(tweet))
        .catch(error => res.status(400).json(error));
  }

  static deleteTweets(req, res) {
    let _id = req.params.id;

    TodoDAO
      .deleteTodo(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
