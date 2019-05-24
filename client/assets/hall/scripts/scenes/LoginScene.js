var HallLoginFrame = require("HallLoginFrame");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        //console.log("global----------------",$G.gCData.gLastUpdateInvite);
     },

    start () {

    },

    onBtnGuestLoginClicked:function(){
        cc.director.loadScene('CreateRole');
        // HallLoginFrame.gateGuestLogin(AppDF.HOST, AppDF.PORT, function (data) {
        //     cc.director.loadScene('LoadingScene');
        // });        
    }
    // update (dt) {},
});
