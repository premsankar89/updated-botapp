var watson = require('./watson/watson');
var conversation = watson.conversation;
var workspace = watson.workspace;

//ROUTES THE TWO OPTIONS
module.exports.processer = require('./middleware/processer/processer')(conversation, workspace);
module.exports.handler = function (app, services) {
	require('./middleware/handler/app')(app, services);
};