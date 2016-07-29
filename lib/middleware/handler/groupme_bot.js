var handleBot = require('./bot.js').handleBot;

// Telegram Token and Bot
if (!process.env.GROUPME_TOKEN) {
	console.log('Error: Specify GROUPME_TOKEN in environment');
	process.exit(1);
}

module.exports = {
	createWebhookEndpoints : function setEndPoint(app) {
		app.post('/groupme', function (req, res) {
			var msg = {
				'text' : req.body.text,
				'from' : req.body.sender_id
			};
			var stype = req.body.sender_type;
			if (stype === 'bot') {
				//Dont call Bot reply
			} else {
				handleBot("Groupme", GE_Bot, msg);
				// Send the input to the conversation service
			}
			res.end();
		});
	}
}
var GE_Bot = {};
console.log("GroupMe bot live");

module.exports.GE_Bot = GE_Bot;