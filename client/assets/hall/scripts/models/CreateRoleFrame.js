require('pomelo')

var CreateRoleFrame = function() {};

module.exports = CreateRoleFrame;

CreateRoleFrame.gateCreateRole = function(host, port,callback) {
    var site = {
        host:host,
        port:port,
        log:true
    }
    pomelo.init(site, function () {
        pomelo.request('gate.gateHandler.createRole', {}, function(data) {
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
