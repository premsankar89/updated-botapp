var Botkit = require('botkit');
var handleBot = require('./bot').handleBot;

// Slack Controller & Bot
var SL_Controller = Botkit.slackbot({
		debug : false
	});
var SL_Bot = SL_Controller.spawn({
		token : process.env.SLACK_TOKEN
	});

// Slack Bot is live
console.log("Slack Bot is live");

// Slack Botkit Dialog
SL_Controller.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
	console.log("Slack message received");
	handleBot("Slack", bot, message);
});

module.exports.SL_Bot = SL_Bot;
module.exports.SL_Controller = SL_Controller;