var Code = require('../../../../../shared/code');
var accountDao = require('../../../dao/accountDao');
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

	var self = this;


//	session.on('closed', onUserLeave.bind(null, self.app));

	// //put user into channel
	// self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), rid, true, function(users){
	// 	next(null, {
	// 		users:users
	// 	});
	// });

	var account = "guest_" + msg.username;
	var sign = crypto.md5(account + req.ip + Code.ACCOUNT_PRI_KEY);
	var ret = {
		code: Code.OK,
		account:account,
		sign:sign
	}

	// var sessionService = self.app.get('sessionService');

	// //duplicate log in
	// if( !! sessionService.getByUid(uid)) {
	// 	next(null, {
	// 		code: Code.FAIL,
	// 		error: true
	// 	});
	// 	return;
	// }
	
	// session.bind(uid);
	// session.set('uid', uid);
	// session.push('uid', function(err) {
	// 	if(err) {
	// 		console.error('set rid for session service failed! error is : %j', err.stack);
	// 	}
	// });

	// send(res,ret);


  next(null, {code: 200, msg: 'game server is ok.'});
};


Handler.prototype.createUser= function(msg, session, next) {
	var coins = 1000;
	var gems = 21;		
	var self = this;
	var account = "guest_" + msg.username;
	var sign = crypto.md5(account + msg.ip + Code.ACCOUNT_PRI_KEY);
	accountDao.createUser(account,msg.username,coins,gems,1,"",next);
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
