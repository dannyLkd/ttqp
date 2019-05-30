var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
//var Account = require('../domain/account');
var utils = require('../util/utils');
var crypto = require('../util/crypto');
var User = require('../domain/user');

var userDao = module.exports;

function generateUserId() {
    var Id = "";
    for (var i = 0; i < 6; ++i) {
        if (i > 0) {
            Id += Math.floor(Math.random() * 10);
        } else {
            Id += Math.floor(Math.random() * 9) + 1;
        }
    }
    return Id;
}

function isUserExist(userid,callback){
    callback = callback == null? nop:callback;
    if(userid == null){
        callback(false);
        return;
    }
	var sql = 'select * from t_users where userid = "'+ userid +'"';
	//var args = [account];
	//console.log("args----------------------------",args);
	pomelo.app.get('dbclient').query(sql,function(err, res, fields) {
		if (err) {
			// logger.error('get bag by playerId for bagDao failed! ' + err.stack);
			// utils.invokeCallback(callback, err, null);
			callback(false);
		} else {
			if (res && res.length === 1) {
				var result = res[0];
				//var bag = new Bag({ id: result.id, itemCount: result.itemCount, items: JSON.parse(result.items) });
				console.log("已经有数据了---------------------");
				callback(true);
				//utils.invokeCallback(callback, new Error(' bag not exist '), false);
			} else {
				// logger.error('bag not exist');
				//utils.invokeCallback(callback, new Error(' bag not exist '), false);
				console.log("没有数据---------------------");
				callback(false);
			}
		}
	});	

};
/**
 * Create createUser
 *
 * @param {Number} playerId Player Id
 * @param {function} callback Call back function
 */
userDao.createUser = function(account, name,coins,gems,sex,headimg,callback) {
    if(account == null || name == null || coins==null || gems==null){
        callback(false);
        return;
	}
    if(headimg){
        headimg = '"' + headimg + '"';
    }
    else{
        headimg = 'null';
    }
	//name = crypto.toBase64(name);	
	var userId = generateUserId();
	var guestAccount = account + userId;
    var sql = 'INSERT INTO t_users(userId,account,name,coins,gems,sex,headimg) VALUES("'+ userId+'","'+ guestAccount+'","'+ name+'",'+ coins +','+ gems +','+ sex +','+ null +')';
    //sql = sql.format(userId,account,name,coins,gems,sex,headimg);
    console.log(sql);
	isUserExist(userId,function(ret){
		if(!ret){
			pomelo.app.get('dbclient').query(sql, function(err,  rows, fields) {
				if (err) {
					logger.error('create User for userDao failed! ' + err.stack);
					utils.invokeCallback(callback, err, null);
				} else {
					var user = new User({
						userId: userId,
						account: account,
						name: name,
						coins: coins,
						gems:gems,
						sex:sex,
						headimg:headimg
					});
					utils.invokeCallback(callback, null, user);
				}
			});
		}
		else{
			
		}
	});

	
};

userDao.getUserByUid = function(uid, callback) {
	var sql = 'select * from t_users where userId = "' + uid + '"';
	pomelo.app.get('dbclient').query(sql, function(err,  rows, fields) {
		if (err) {
			logger.error('get User  failed! ' + err.stack);
			utils.invokeCallback(callback, err, null);
		} else {
			if(!rows || rows.length <= 0) {
				utils.invokeCallback(callback, null, []);
				return;
			} else {
				utils.invokeCallback(callback, null, rows[0]);
			}			
		}
	});	
};
// /**
//  * Find bag by playerId 
//  * 
//  * @param {Number} playerId Player id.
//  * @param {function} cb Call back function.
//  */
// bagDao.getBagByPlayerId = function(playerId, cb) {
// 	var sql = 'select * from Bag where playerId = ?';
// 	var args = [playerId];

// 	pomelo.app.get('dbclient').query(sql, args, function(err, res) {
// 		if (err) {
// 			logger.error('get bag by playerId for bagDao failed! ' + err.stack);
// 			utils.invokeCallback(cb, err, null);
// 		} else {
// 			if (res && res.length === 1) {
// 				var result = res[0];
// 				var bag = new Bag({ id: result.id, itemCount: result.itemCount, items: JSON.parse(result.items) });
// 				cb(null, bag);
// 			} else {
// 				logger.error('bag not exist');
// 				utils.invokeCallback(cb, new Error(' bag not exist '), null);
// 			}
// 		}
// 	});
// };

// /**
//  * Update bag
//  * @param {Object} bag Bag object.
//  * @param {function} cb Call back function.
//  */
// bagDao.update = function(bag, cb) {
// 	var sql = 'update Bag set items = ? where id = ?';
// 	var items = bag.items;
// 	if (typeof items !== 'string') {
// 		items = JSON.stringify(items);
// 	}
	
// 	var args = [items, bag.id];

// 	pomelo.app.get('dbclient').query(sql, args, function(err, res) {
// 		if (err) {
// 			logger.error('write mysql failed!　' + sql + ' ' + JSON.stringify(bag));
// 		}
		
// 		utils.invokeCallback(cb, !!err);
// 	});
// };

// /**
//  * Destroy a bag
//  * 
//  * @param {number} playerId
//  * @param {function} cb
//  */
// bagDao.destroy = function(playerId, cb) {
// 	var sql = 'delete from Bag where playerId = ?';
// 	var args = [playerId];

// 	pomelo.app.dbclinet.query(sql, args, function(err, res) {
// 		utils.invokeCallback(cb, err, res);
// 	});
// };

