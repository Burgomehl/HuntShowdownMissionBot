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
				  
const fivePlayerGames = ['CSGO'];
const fourPlayerGames = ['Depth', 'PUBG'];
const twoPlayerGames = ['Hunt'];

const csgoMaps = ['Train','Dust2','Office','Canals','Dust','Cobbelstone','Mirage','Cache','Inferno','Agency','Nuke','Overpass'];

bot.on(['/next'], (msg) => msg.reply.text(missions[getRandomInt(missions.length)]));

bot.on(['/csgoMap'], (msg) => msg.reply.text(csgoMaps[getRandomInt(csgoMaps.length)]));

bot.on(/^\/game (.+)$/, (msg, props) => {
    const player = parseInt(props.match[1]);
	let games = [];
	try {
		if (player <= 5){
			games = games.concat(fivePlayerGames);
		}
		if (player <= 4){
			games = games.concat(fourPlayerGames);
		}
		if (player <= 2){
			games = games.concat(twoPlayerGames);
		}
		let choosenGame = games[getRandomInt(games.length)];
		if (choosenGame == 'CSGO'){
			return msg.reply.text(choosenGame + " " + csgoMaps[getRandomInt(csgoMaps.length)]);
		} else if (choosenGame == 'Hunt'){
			return msg.reply.text(choosenGame + " " + missions[getRandomInt(missions.length)]);
		}
		return msg.reply.text(choosenGame);
	} catch (err){
    	return msg.reply.text('unexpected error parsing string to int' + player + " "+ err);
	}

});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

bot.start();