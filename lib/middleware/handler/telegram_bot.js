var handleBot = require('./bot.js').handleBot;
var TelegramBot = require('node-telegram-bot-api');

// Telegram Token and Bot
if (!process.env.TELEGRAM_TOKEN) {
	console.log('Error: Specify TELEGRAM_TOKEN in environment');
	process.exit(1);
}

var TE_Bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
		polling : true
	});
console.log("Telegram bot live");
TE_Bot.on('message', function (msg) {
	console.log("Telegram message received");
	handleBot("Telegram", TE_Bot, msg);
});

module.exports.TE_Bot = TE_Bot;