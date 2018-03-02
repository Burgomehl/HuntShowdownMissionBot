const TeleBot = require('telebot');
const bot = new TeleBot({
    token: process.env.TELEGRAM_TOKEN, // Required. Telegram Bot API token.
    webhook: { // Optional. Use webhook instead of polling.
        url: process.env.APP_URL, // HTTPS url to send updates to.
        port: process.env.PORT // Server port.
    }
});

const missions = ['Spinne am Tag',
                  'Spinne in der Nacht',
                  'Butcher am Tag',
                  'Butcher in der Nacht'];

bot.on(['/next'], (msg) => msg.reply.text(missions[getRandomInt(missions.length)]));

bot.on(/^\/game (.+)$/, (msg, props) => {
    const player = parseInt(props.match[1]);
	try {
		switch (player) {
			case 1:
				return getGame(msg, 4);
			case 2:
				return getGame(msg, 4);
			case 3:
				return getGame(msg, 3);
			case 4:
				return getGame(msg, 3);
			case 5:
				return msg.reply.text('CSGO');
			default:
				return msg.reply.text('wrong message must be a number between 1 and 5');
		}
	} catch (err){
    	return msg.reply.text('unexpected error parsing string to int' + player + " "+ err);
	}

});

function getGame(msg, value){
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