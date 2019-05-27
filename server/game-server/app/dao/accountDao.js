var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
//var Account = require('../domain/account');
var utils = require('../util/utils');
var crypto = require('../util/crypto');


var accountDao = module.exports;


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
function isUserExist(account,callback){
    callback = callback == null? nop:callback;
    if(account == null){
        callback(false);
        return;
    }
	var sql = 'select userid from t_users where account = ?';
	var args = [account];
	console.log("args----------------------------",args);
	pomelo.app.get('dbclient').query(sql, args, function(err, res) {
		if (err) {
			logger.error('get bag by playerId for bagDao failed! ' + err.stack);
			utils.invokeCallback(callback, err, null);
		} else {
			if (res && res.length === 1) {
				var result = res[0];
				//var bag = new Bag({ id: result.id, itemCount: result.itemCount, items: JSON.parse(result.items) });
				callback(true);
			} else {
				// logger.error('bag not exist');
				// utils.invokeCallback(callback, new Error(' bag not exist '), null);
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
accountDao.createUser = function(account, name,coins,gems,sex,headimg,callback) {
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
    name = crypto.toBase64(name);
    var userId = generateUserId();	
	//var sql = 'insert into Bag (playerId, items, itemCount) values (?, ?, ?)';
	var sql = 'insert into t_users(userid,account,name,coins,gems,sex,headimg) VALUES(?, ?,?,?,?,?,?)';
	var args = [userId, account, name,coins,gems,sex,headimg];
	isUserExist(account,function(ret){
		if(!ret){
			pomelo.app.get('dbclient').insert(sql, args, function(err, res) {
				if (err) {
					logger.error('create bag for bagDao failed! ' + err.stack);
					//utils.invokeCallback(callback, err, null);
					callback(true)
				} else {
					//var bag = new Bag({id: res.insertId});
					//utils.invokeCallback(callback, null, bag);
					callback(false)
				}
			});
		}
		else{
			
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

