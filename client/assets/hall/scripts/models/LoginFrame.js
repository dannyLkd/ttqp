
require("pomelo")


var LoginFrame = function () {}

module.exports = LoginFrame;
//guest login on 
LoginFrame.queryEntry = function(uid,callback) {
    var route = 'gate.gateHandler.queryEntry';
	pomelo.init({
        host: AppDF.HOST,
        port: AppDF.PORT,
        log: true
	}, function() {
		pomelo.request(route, {
			uid: uid
		}, function(data) {
			pomelo.disconnect();
			if(data.code === 500) {
				//showError(LOGIN_ERROR);
				return;
            }
            GlobalUserItem.host = data.host;
            GlobalUserItem.port = data.port;
            // console.log("data.host----------------",data.host);
            // console.log("data.port----------------",data.port)            
			callback(data.host, data.port);
		});
	}); 
}

LoginFrame.onGuestLogin = function(username) {
    this.queryEntry(username, function(host, port) {
        var site = {
            host: host,
            port: port,
            log: true
        };
        pomelo.init(site, function() {
            var route = "connector.entryHandler.createUser";
            pomelo.request(route, {username: username,ip: GlobalUserItem.host}, function(data) {
                if(data.error) {
                    //showError(DUPLICATE_ERROR);
                    return;
                }
                console.log("1111111111----",data.userId);
                cc.sys.localStorage.setItem('userId', data.userId);
                cc.director.loadScene('HallScene');
            }); 
        });
    });
}

LoginFrame.onAuthLogin = function(userId) {
    this.queryEntry(userId, function(host, port) {
        var site = {
            host: host,
            port: port,
            log: true
        };
        pomelo.init(site, function() {
            var route = "connector.entryHandler.authLogin";
            pomelo.request(route, {userId: userId}, function(data) {
                if(data.error) {
                    //showError(DUPLICATE_ERROR);
                    return;
                }
                console.log("1111111111----",data);
                cc.director.loadScene('HallScene');
            }); 
        });
    });
}