"use strict";

const TweetsDAO = require('../dao/tweets-dao');

module.exports = class TweetsController {
  static getAll(req, res) {
      TweetsDAO
        .getAll()
        .then(todos => res.status(200).json(todos))
        .catch(error => res.status(400).json(error));
  }

  static createTweets(req, res) {
      let _todo = req.body;

      TweetsDAO
        .createTodo(_todo)
        .then(todo => res.status(201).json(todo))
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
