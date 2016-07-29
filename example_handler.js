/*
THIS EXAMPLE SHOWS HOW A USER CAN HAVE THE MIDDLEWARE HANDLE
EVERYTHING.
 */

// Load Node variables
var express = require('express');
var bodyParser = require("body-parser");
var dotenv = require('dotenv');
var path = require('path');
global.appRoot = path.resolve(__dirname);
dotenv.load();

// Create an Express app
var app = express();
var http = require('http').Server(app);

// Set environment port (Bluemix)
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({
		extended : false
	}));
app.use(bodyParser.json());

// serve the files out of ./public as our main files
app.use(express.static('./public'));

// Bots token stuff
var tbot;
var telegram_token;
var conv_username;
var conv_password;
var conv_workspace_id;
var groupme_bot_id;
var spark_auth;
var microsoft_app_id;
var microsoft_app_pswd;
var line_cid;
var line_csecret;
var line_acl;
var conversation;
var connector;
var msbot;
var groupme_callback = 'https://api.groupme.com/v3/bots/post';
var spark_webhook = 'https://api.ciscospark.com/v1/messages';
var line_webhook = 'https://trialbot-api.line.me/v1/events';
var line_event = '138311608800106203';
var line_to = '1383378250';
var ctype = "application/json";

//Define which services you want enabled
var services = {
	facebook : true,
	slack : true,
	twilio : true,
	telegram : true,
	groupme : true,
	line : true,
	spark : true
};

//Called before the request to conversation is sent
var before = function (payload, callback) {
	console.log("HIT BEFORE");
	callback(payload);
};

//Called after the request to conversation is sent
var after = function (response, callback) {
	console.log("HIT AFTER");
	callback(response);
}

app.beforeCallback = before;
app.afterCallback = after;

//Configure all token info here
app.post('/configure', function (req, res) {
	//@sputhana add logging here
	//Configure Conversation
	process.env.CONVERSATION_USERNAME = req.body.conv_username;
	process.env.CONVERSATION_PASSWORD = req.body.conv_password;
	process.env.WORKSPACE_ID = req.body.conv_workspace_id;
	process.env.CONVERSATION_URL = req.body.conv_url;
	//Configure Facebook
	process.env.PAGE_TOKEN = req.body.fb_page_token;
	process.env.VERIFY_TOKEN = req.body.fb_verify_token;
	//Configure Telegram
	process.env.TELEGRAM_TOKEN = req.body.telegram_token;
	//Configure Slack
	process.env.SLACK_TOKEN = req.body.slack_token;
	//Configure Twilio
	process.env.TWILIO_IPM_SERVICE_SID = req.body.tw_ipm_service_id;
	process.env.TWILIO_API_SECRET = req.body.tw_api_secret;
	process.env.TWILIO_API_KEY = req.body.tw_api_key;
	process.env.TWILIO_AUTH_TOKEN = req.body.tw_auth_token
	process.env.TWILIO_ACCOUNT_SID = req.body.tw_acc_sid
	//Configure Line
	process.env.Line_ChannelID = req.body.channel_id;
	process.env.Line_ChannelSecret = req.body.channel_secret;
	process.env.Line_ACL = req.body.user_acl;
	process.env.Line_Event = "138311608800106203"
	process.env.Line_To = 1383378250
	//Configure Microsoft App
	process.env.MS_APP_ID = req.body.microsoft_app_id;
	process.env.MS_APP_PASSWORD = req.body.microsoft_app_pswd;
	//Configure Group Me
	process.env.GROUPME_TOKEN = req.body.groupme_bot_id;
	//Configure Spark
	process.env.SPARK_AUTH = req.body.spark_auth;
	// Required Node routes
	require('./lib/index').handler(app, services, before);
	res.send("ok");
});

// Listen on the specified port
http.listen(app.get('port'), function () {
	console.log('Client server listening on port ' + app.get('port'));
})