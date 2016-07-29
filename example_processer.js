
/*
THIS EXAMPLE SHOWS HOW THE USER CAN HAVE THE MIDDLEWARE JUST
PROCESS THE DATA THROUGH CONVERSATION AND GIVE IT BACK TO THE
CONTROLLER
 */

require('dotenv').config({
	silent : true
});

var Botkit = require('botkit');
var watsonMiddleware = require('./lib/index').processer;

var controller = Botkit.slackbot({
		debug : false
	});

//Called before the payload to conversation is sent
watsonMiddleware.before = function (payload, callback) {
	console.log("HIT BEFORE");
	callback(payload);
}

var bot = controller.spawn({
		token : process.env.SLACK_TOKEN
	}).startRTM();

controller.middleware.receive.use(watsonMiddleware.receive);

controller.hears(['.*'], 'direct_message,direct_mention,mention', watsonMiddleware.hears, function (bot, message) {
	bot.reply(message, 'Hello!');
});