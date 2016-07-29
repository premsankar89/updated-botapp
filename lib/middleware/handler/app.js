module.exports = function (app, services) {

	//CHECKS IF THE DEVELOPER WANTS THESE SERVICES TO BE USED
	if (services.facebook) {
		var Facebook = require('./fb_bot');
		Facebook.FB_Controller.before = app.beforeCallback;
		Facebook.FB_Controller.after = app.afterCallback;
		Facebook.FB_Controller.createWebhookEndpoints(app, Facebook.FB_Bot);
	}

	if (services.slack) {
		var Slack = require('./slack_bot');
		Slack.SL_Bot.before = app.beforeCallback;
		Slack.SL_Bot.after = app.afterCallback;
		Slack.SL_Bot.startRTM();
	}

	if (services.twilio) {
		var Twilio = require('./twilio_bot');
		Twilio.TW_Controller.before = app.beforeCallback;
		Twilio.TW_Controller.after = app.afterCallback;
		Twilio.TW_Controller.createWebhookEndpoints(app, Twilio.TW_Bot);
	}

	if (services.telegram) {
		var Telegram = require('./telegram_bot');
		Telegram.before = app.beforeCallback;
		Telegram.after = app.afterCallback;
	}

	if (services.groupme) {
		var Groupme = require('./groupme_bot');
		Groupme.before = app.beforeCallback;
		Groupme.after = app.afterCallback;
		Groupme.createWebhookEndpoints(app);
	}

	if (services.line) {
		var Line = require('./line_bot');
		Line.before = app.beforeCallback;
		Line.after = app.afterCallback;
		Line.createWebhookEndpoints(app);
	}

	if (services.spark) {
		var Spark = require('./spark_bot');
		Spark.before = app.beforeCallback;
		Spark.after = app.afterCallback;
		Spark.createWebhookEndpoints(app);
	}
};