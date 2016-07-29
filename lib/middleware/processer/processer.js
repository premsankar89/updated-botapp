/*
THIS MIDDLEWARE OPTION JUST PROCESSES THE INPUT THROUGH
CONVERSATION THEN GIVES THE RESPONSE BACK TO THE USER
 */

var initCloudant = require('cloudant');

var botdb;
var cloudant = initCloudant(process.env.CLOUDANT_URL);
cloudant.db.destroy('botdb', function (err) {
	cloudant.db.create('botdb', function () {
		botdb = cloudant.db.use('botdb');
	});
});

//ADDS THE CONVERSATION RESPONSE TO THE MESSAGE OBJECT
module.exports = function (conversation, workspace) {
	var middleware = {};

	middleware.before = function (payload, callback) {
		callback(payload);
	};

	middleware.receive = function (bot, message, next) {
		if (message.text && message.user) {
			var id = message.user;
			botdb.get(id, function (err, data) {
				var payload = {
					workspace_id : workspace,
					input : {
						"text" : message.text
					}
				};
				if (data != undefined) {
					payload.context = data.data.context;
				} else {
					payload.context = {};
				}

				middleware.before(payload, function (payload) {
					//send payload to the conversation service
					conversation.message(payload, function (err, watsonData) {
						if (err) {
							next(err);
						} else {
							message.watsonData = watsonData;
							if (watsonData.context) {
								var id = message.user;
								botdb.get(id, function (err, data) {
									if (data == undefined) {
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
											next();
										});
									} else {
										next();
									}
								});
							}
						}
					});
				});

			});
		}
	};

	//ENSURES THE CONVERSATION RESPONSE HAS BEEN ADDED TO THE MESSAGE OBJECT
	middleware.hears = function (tests, message) {
		if (message.watsonData) {
			return true;
		} else {
			return false;
		}
	};

	return middleware;
};