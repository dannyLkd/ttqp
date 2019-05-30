var Code = require('../../../../../shared/code');
var dispatcher = require('../../../util/dispatcher');

/**
 * Gate handler that dispatch user to connectors.
 */
module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

//var handler = Handler.prototype;

Handler.prototype.queryEntry = function(msg, session, next) {
	var uid = msg.uid;
	if(!uid) {
		next(null, {code: Code.FAIL});
		return;
	}
	// get all connectors
	var connectors = this.app.getServersByType('connector');
	if(!connectors || connectors.length === 0) {
		next(null, {
			code: Code.GATE.FA_NO_SERVER_AVAILABLE
		});
		return;
	}	
	// select connector
	var res = dispatcher.dispatch(uid, connectors);
    next(null, {
        code: Code.OK,
        host: res.host,
        port: res.clientPort
    });
};

// handler.prototype.guestLogin = function (msg, session, next) {
// 	var sqlHelper = this.app.get('sqlHelper');//获取全局mysql client
// 	sqlHelper.guestLogin(function (err, userinfo) {
// 		console.log(userinfo);
// 		var tokenString = new UToken(userinfo.userid).encrypt();
// 		if (err) {
// 			//失败
// 			next(null, {
// 				code: -101,
// 				msg: '游客登录失败，请重试'
// 			});
// 		} else {
// 			// get all connectors
// 			var connectors = this.app.getServersByType('connector');
// 			if (!connectors || connectors.length === 0) {
// 				var response = new GMResponse(-103, '没有找到connector');
// 				next(null, response);
// 				return;
// 			}
// 			// here we just start `ONE` connector server, so we return the connectors[0] 
// 			var res = connectors[0];
// 			var data = {
// 				userinfo: userinfo,
// 				token: tokenString,
// 				localConnector: { host: res.host, port: res.clientPort },
// 				remoteConnector: { host: '39.108.83.192', port: res.clientPort },
// 			};
// 			var response = new GMResponse(1, 'ok', data);
// 			next(null, response);
// 		}
// 	}.bind(this));
// 	console.log("有玩家登陆服务器了------------------------");
// }