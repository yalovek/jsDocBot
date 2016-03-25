const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.js').config;
const token = config.token;
const bot = new TelegramBot(token, {
	polling: true
});
const jsdoc = require('./jsdoc/jsdoc.js').jsdoc;

bot.on('message', (msg) => {
	const fromId = msg.chat.id;
	const array = jsdoc.filter(function (obj) {
		return new RegExp(msg.text).test(obj.name);
	});
	const res = array.reduce(function (result, obj, key) {
		result += key + 1 + '. '
			+ '\tНазвание: ' + obj.name + '\n'
			+ '\tТип: ' + obj.type + '\n'
			+ '\tОписание: ' + obj.title + '\n'
			+ '\tВозвращает: ' + obj.return + '\n'
			+ '\tПуть: ' + obj.path + '\n\n';

		return result;
	}, '');

	bot.sendMessage(fromId, res);
});
