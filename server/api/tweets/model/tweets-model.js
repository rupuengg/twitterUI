"use strict";

const mongoose = require('mongoose');

const _tweetSchema = {
	tweetId : String,
	hashTagArray:[],
	userMentionedNames:[],
	popularTag : {
		name : String,
		count : Number
	},
	name : String,
	userLocation : String,
	screenName : String,
	text : String,
	tweetedAt : String,
	followerCount : Number,
	subject : String
}

module.exports = mongoose.Schema(_tweetSchema);
