var handleBot = require('./bot.js').handleBot;

// Spark Token and Bot
if (!process.env.SPARK_AUTH) {
	console.log('Error: Specify SPARK_AUTH in environment');
	process.exit(1);
}

module.exports = {
	createWebhookEndpoints : function setEndPoint(app) {
		app.post('/spark', function (req, res) {
			var msg = {
				'text' : req.body.text,
				'from' : req.body.roomId
			};
			if (req.body.text.indexOf('It looks like a nice drive ') > -1 ||
				req.body.text.indexOf("I'm doing good. I'm here to help you") > -1) {
				//Dont call Bot reply
			} else {
				handleBot("Spark", Spark_Bot, msg);
			}
			res.end();
		});
	}
}
var Spark_Bot = {};
console.log("Spark bot live");

module.exports.Spark_Bot = Spark_Bot;