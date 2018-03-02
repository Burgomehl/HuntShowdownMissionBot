const TeleBot = require('telebot');
const bot = new TeleBot({
    token: process.env.TELEGRAM_TOKEN, // Required. Telegram Bot API token.
    webhook: { // Optional. Use webhook instead of polling.
        url: process.env.APP_URL, // HTTPS url to send updates to.
        port: process.env.PORT // Server port.
    }
});

bot.on(['/next'], (msg) => {
	let r = getRandomInt(4);
	switch (r) {
		case 0:
			return msg.reply.text('Spinne am Tag');
		case 1:
			return msg.reply.text('Spinne in der Nacht');
		case 2:
			return msg.reply.text('Butcher am Tag');
		case 3:
			return msg.reply.text('Butcher in der Nacht');
		default:
			return msg.reply.text('Bug');
	}
	
});

bot.on(/^\/game (.+)$/, (msg, props) => {
	const player = props.match[1];
	switch (player){
		case 1:
			return getGame(3);
		case 2:
			return getGame(3);
		case 3:
			return getGame(2);
		case 4:
			return getGame(2);
		case 5:
            return msg.reply.text('CSGO');
		default:
            return msg.reply.text('wrong message must be a number between 1 and 5');
	}

});

function getGame(value){
    let r = getRandomInt(value);
    switch (r){
        case 0:
            return msg.reply.text('PUBG');
        case 1:
            return msg.reply.text('Depth');
        case 2:
            return msg.reply.text('CSGO');
        case 3:
            return msg.reply.text('Hunt');
        default:
            return msg.reply.text('Bug');
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

bot.start();