var Code = require('../../../../../shared/code');
var userDao = require('../../../dao/userDao');
var crypto = require('../../../util/crypto');
module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
	//var self = this;
	var account = "guest_" + msg.username;
	var sign = crypto.md5(account + req.ip + Code.ACCOUNT_PRI_KEY);
	var ret = {
		code: Code.OK,
		account:account,
		sign:sign
	}
  	next(null, {code: 200, msg: 'game server is ok.'});
};


Handler.prototype.createUser= function(msg, session, next) {
	//var self = this;
	var coins = 1000;
	var gems = 21;		
	var account = "guest_";
	//var sign = crypto.md5(account + msg.ip + Code.ACCOUNT_PRI_KEY);
	userDao.createUser(account,msg.username,coins,gems,1,"",next);
}

Handler.prototype.authLogin= function(msg, session, next) {
	userDao.getUserByUid(msg.userId,next);
}


/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};
