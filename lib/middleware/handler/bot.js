/*
HANDLES SENDING REQUESTS TO CONVERSATIONS
AND RESPONDING TO THE USER
 */

//LOAD WATSON & CLOUDANT
var initCloudant = require('cloudant');
var request = require('request');
var watson = require('../../watson/watson');
var conversation = watson.conversation;
var workspace = watson.workspace;

var botdb;
var cloudant = initCloudant(process.env.CLOUDANT_URL);
cloudant.db.destroy('botdb', function (err) {
	cloudant.db.create('botdb', function () {
		botdb = cloudant.db.use('botdb');
	});
});

var before = function (payload, callback) {
	callback(payload);
}

var after = function (response, callback) {
	callback(response);
}
//HANDLES SENDING A REQUEST TO CONVERSATION & GETTING THE RESPONSE
function handleBot(service, bot, message) {
	console.log("Message = " + JSON.stringify(message, null, ' '));
	if (!bot.before)
		bot.before = before;
	if (!bot.after)
		bot.after = after;
	if ((message.text && message.user) || (message.text && message.from)) {
		var id = message.user ? message.user : message.from;
		//Check if context exists in cloudant
		botdb.get(id, function (err, data) {
			var payload = {
				workspace_id : workspace,
				input : {
					"text" : message.text
				},
			};
			if (data != undefined && data.data != undefined) {
				payload.context = data.data.context;
			} else {
				payload.context = {};
			}
			bot.before(payload, function (payload) {
				conversation.message(payload, function (err, watsonData) {
					if (err)
						return err;
					//Keep context maintained in cloudant

					// TODO: Include city in the response in Conversation not here!
					watsonData.city = payload.city;

					botdb.get(id, function (err, data) {
						if (data === undefined) {
							var context = watsonData.context;
							var cloudantPayload = {
								_id : id,
								data : {
									context : context
								}
							};
							botdb.insert(cloudantPayload, function (err, body, header) {
								if (err) {
									return err;
								}
							});
						}
					});
					bot.after(watsonData, function (watsonData) {
						//Pass response to the reply function

						// TODO: Fix response text!
						botReply(service, bot, message, watsonData.output.text[0]);
					});
				});
			});
		});
	}
}

//HANDLES REPLYING TO MULTIPLE SDKS
function botReply(service, bot, message, response) {
	if (service === "Telegram") {
		var fromId = message.from.id;
		bot.sendMessage(fromId, response);
	} else if (service === "Groupme") {
		var data = {
			'bot_id' : process.env.GROUPME_TOKEN,
			'text' : response
		};
		request({
			url : 'https://api.groupme.com/v3/bots/post',
			method : "POST",
			json : true,
			headers : {
				"content-type" : 'application/json'
			},
			body : data
		}, function (err, res, body) {});
	} else if (service === "Spark") {
		var data = {
			'roomId' : message.from,
			'text' : response
		};
		request({
			url : 'https://api.ciscospark.com/v1/messages',
			method : "POST",
			json : true,
			headers : {
				"content-type" : 'application/json',
				"Authorization" : process.env.SPARK_AUTH
			},
			body : data
		}, function (err, res, body) {});

	} else if (service === "Line") {
		var data = {
			"to" : [message.from],
			"toChannel" : process.env.Line_To, //Default
			"eventType" : process.env.Line_Event, //Default
			"content" : {
				"contentType" : 1,
				"toType" : 1,
				"text" : response
			}
		};
		request({
			url : 'https://trialbot-api.line.me/v1/events',
			method : "POST",
			json : true,
			headers : {
				"X-Line-ChannelID" : process.env.Line_ChannelID,
				"X-Line-ChannelSecret" : process.env.Line_ChannelSecret,
				"X-Line-Trusted-User-With-ACL" : process.env.Line_ACL,
				"content-type" : 'application/json',
			},
			body : data
		}, function (err, res, body) {});
	} else { // Botkit
		bot.reply(message, response);
	}
}

module.exports.handleBot = handleBot;