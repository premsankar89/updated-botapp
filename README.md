# watson-botkit-middleware

# Installation

1) Use the UI to specify the credentials for various bots in Facebook, Slack, Telegram, Line, Microsoft, Cisco Spark, GroupMe and Twilio. See the below link for sections on where you can get the credentials required by each Botkit instance.

* [Facebook](https://github.com/howdyai/botkit/blob/master/readme-facebook.md#getting-started)
* [Slack](https://github.com/howdyai/botkit/blob/master/readme-slack.md#getting-started)
* [Twilio](https://github.com/howdyai/botkit/blob/master/readme-twilioipm.md#getting-started)
* [Line](https://developers.line.me/bot-api/api-reference)
* [Telegram](https://core.telegram.org/bots/api)
* [Spark] (https://developer.ciscospark.com/getting-started.html)
* [GroupMe] (https://dev.groupme.com/docs/v3)
* [Microsoft] (https://docs.botframework.com/en-us/)

2) Configure the `bot.js` file with your own bot handling code. Watson Conversation is already implemented for you. If you would like to use a separate bot messgaing service (wit.ai, converse.ai), you can add the middleware to each bot instance that you'd like for that service to use, and configure it with the single `bot.js` file.

3)# deploy-Bots
attempt to get Bots working

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy)

