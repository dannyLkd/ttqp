require("pomelo-client");

var CreateRoleFrame = function() {};

module.exports = CreateRoleFrame;


CreateRoleFrame.queryEntry = function(uid,callback){
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
            console.log("data.host----------------",data.host);
            console.log("data.port----------------",data.port)            
			callback(data.host, data.port);
		});
	});    
};


CreateRoleFrame.createRole = function(username) {
    this.queryEntry(username, function(host, port) {
        var site = {
            host: host,
            port: port,
            log: true
        };
        pomelo.init(site, function() {
            var route = "connector.entryHandler.entry";
            pomelo.request(route, {username: username,}, function(data) {
                if(data.error) {
                    //showError(DUPLICATE_ERROR);
                    return;
                }
                console.log("1111111111",data.msg);
                cc.director.loadScene('LoadingScene');
            }); 
        });
    });

    // var site = {
    //     host: "127.0.0.1",
    //     port: "3010",
    // log: true
    // };   
    // pomelo.init(site, function () {
    //     pomelo.request('connector.entryHandler.enter', {username: "东东"}, function(data) {
    //         //pomelo.disconnect();
    //         if(data.code !== 0) {
    //             cc.log(data.error);//错误会在这里返回
    //             return;
    //         }
    //         //GlobalUserItem.setSite(data.host, data.port);//保存返回的地址和端口
    //         GlobalUserItem.host = data.host;
    //         GlobalUserItem.port = data.port;
    //         console.log("data.host----------------",data.host);
    //         console.log("data.port----------------",data.port)
    //         cc.director.loadScene('LoadingScene');
    //     });
    // });
}
