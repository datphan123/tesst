
let HU         = require('../../../Models/HU');

let Candy_red  = require('../../../Models/Candy/Candy_red');
let Candy_user = require('../../../Models/Candy/Candy_user');

let UserInfo   = require('../../../Models/UserInfo');

function onSelectBox(client, box){
	box = box>>0;
	if (void 0 !== client.Candy &&
		client.Candy.bonus !== null &&
		client.Candy.bonusL > 0)
	{
		var index = box-1;
		if (void 0 !== client.Candy.bonus[index]) {
			if (!client.Candy.bonus[index].isOpen) {
				client.Candy.bonusL -= 1;
				client.Candy.bonus[index].isOpen = true;

				var bet = client.Candy.bonus[index].bet;
				client.Candy.bonusWin += bet;
				client.red({candy:{bonus:{bonus: client.Candy.bonusL, box: index, bet: bet}}});
				if (!client.Candy.bonusL) {
					var betWin = client.Candy.bonusWin*client.Candy.bonusX;

					var uInfo    = {};
					var gInfo    = {};
					var huUpdate = {};

					huUpdate.redWin = betWin;
					uInfo.red       = betWin;
					uInfo.redWin    = betWin;
					uInfo.totall    = betWin;

					gInfo.win       = betWin;
					gInfo.totall    = betWin;
					Candy_red.updateOne({'_id': client.Candy.id}, {$inc:{win:betWin}}).exec();

					client.Candy.bonus    = null;
					client.Candy.bonusWin = 0;
					client.Candy.bonusX   = 0;

					UserInfo.findOneAndUpdate({id:client.UID}, {$inc:uInfo}, function(err, user){
						setTimeout(function(){
							client.red({candy:{bonus:{win: betWin}}, user:{red:user.red*1+betWin}});
						}, 700);
					});
					HU.updateOne({game:'candy', type:client.Candy.bet}, {$inc:huUpdate}).exec();
					Candy_user.updateOne({'uid':client.UID}, {$inc:gInfo}).exec();
				}
			}
		}
	}
}

module.exports = function(client, data){
	if (void 0 !== data.box) {
		onSelectBox(client, data.box);
	}
};
