var LoginFrame = require("LoginFrame");

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
        if(!cc.sys.isNative || cc.sys.os == cc.sys.OS_WINDOWS){
            cc.find('Canvas/btn_guest_login').active = true;
            cc.find('Canvas/btn_weixin_login').active = false;
        }
        else{
            cc.find('Canvas/btn_guest_login').active = false;
            cc.find('Canvas/btn_weixin_login').active = true;
        }        
     },

    start () {
        var userId = cc.sys.localStorage.getItem("userId");
        if(userId)
        {
            console.log("登录用户ID是-------",userId);
            LoginFrame.onAuthLogin(userId); 
        }
    },

    onBtnGuestLoginClicked:function(){
        //cc.director.loadScene('CreateRole');
        LoginFrame.onGuestLogin("游客");        
    }
    // update (dt) {},
});
