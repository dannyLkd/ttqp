
require("pomelo")


var HallLoginFrame = function () {}

module.exports = HallLoginFrame;
//guest login on gate
HallLoginFrame.gateGuestLogin = function(host, port,callback) {
    var site = {
        host:host,
        port:port,
        log:true
    }
    pomelo.init(site, function () {
        pomelo.request('gate.gateHandler.queryEntry', {}, function(data) {
            //pomelo.disconnect();
            if(data.code !== 0) {
                cc.log(data.error);//错误会在这里返回
                return;
            }
            //GlobalUserItem.setSite(data.host, data.port);//保存返回的地址和端口
            GlobalUserItem.host = data.host;
            GlobalUserItem.port = data.port;
            console.log("data.host----------------",data.host);
            console.log("data.port----------------",data.port)
            cc.director.loadScene('LoadingScene');
        });
    });
}

HallLoginFrame.onLoginSuccess = function(data, callback) {
    pomelo.userinfo = data['data']['userinfo'];
    pomelo.connector = data['data']['localConnector'];
    // pomelo.connector = data['data']['remoteConnector'];
    var token = data['data']['token'];
    if (token) {
        pomelo.token = token;
        cc.sys.localStorage.setItem('token', pomelo.token);
    }
    pomelo.disconnect();
    if (typeof callback === 'function') {
        callback(data);
    }
}