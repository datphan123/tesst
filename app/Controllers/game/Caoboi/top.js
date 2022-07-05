
var Caoboi_red = require('../../../Models/Caoboi/Caoboi_red');
var UserInfo  = require('../../../Models/UserInfo');

module.exports = function(client, data){
		Caoboi_red.find({type:{$gte:2}}, 'name win bet time type', {sort:{'_id':-1}, limit: 100}, function(err, result) {
			Promise.all(result.map(function(obj){
				obj = obj._doc;
				delete obj.__v;
				delete obj._id;
				return obj;
			}))
			.then(function(arrayOfResults) {
				client.red({Caoboi:{top:arrayOfResults}});
			})
		});
};
