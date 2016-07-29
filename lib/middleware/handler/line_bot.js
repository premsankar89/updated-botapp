var handleBot = require('./bot.js').handleBot;

// Line Token and Bot
if (!process.env.Line_ChannelID) {
	console.log('Error: Specify Line_ChannelID in environment');
	process.exit(1);
}

if (!process.env.Line_ChannelSecret) {
	console.log('Error: Specify Line_ChannelSecret in environment');
	process.exit(1);
}

if (!process.env.Line_ACL) {
	console.log('Error: Specify Line_ACL in environment');
	process.exit(1);
}

if (!process.env.Line_To) {
	console.log('Error: Specify Line_To in environment');
	process.exit(1);
}

if (!process.env.Line_Event) {
	console.log('Error: Specify Line_Event in environment');
	process.exit(1);
}

module.exports = {
	createWebhookEndpoints : function setEndPoint(app) {
		app.post('/line', function (req, res) {
			var msg = {
				'text' : req.body.result[0].content.text,
				'from' : req.body.result[0].content.from
			};
			handleBot("Line", Line_Bot, msg);
			res.end();
		});
	}
}
var Line_Bot = {};
console.log("Line bot live");

module.exports.Line_Bot = Line_Bot;