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
		if (player == 5){
			games = games.concat(fivePlayerGames);
		}else if (player <= 4 && player >= 3){
			games = games.concat(fivePlayerGames);
			games = games.concat(fourPlayerGames);
		}else if (player <= 2 && player > 0){
			games = games.concat(fivePlayerGames);
			games = games.concat(fourPlayerGames);
			games = games.concat(twoPlayerGames);
		} else {
			throw Exception("There is no game for so many persons");
		}
		let choosenGame = games[getRandomInt(games.length)];
		if (choosenGame == ('CSGO')){
			choosenGame += " "+ csgoMaps[getRandomInt(csgoMaps.length)];
		}
		msg.reply.text(choosenGame);
	} catch (err){
    	return msg.reply.text('unexpected error parsing string to int' + player + " "+ err);
	}

});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

bot.start();