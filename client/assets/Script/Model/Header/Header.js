
cc.Class({
    extends: cc.Component,

    properties: {
        avatar: cc.Sprite,
        nodeUsers: cc.Node,
		nodeUsers1: cc.Node,
        nodeGuest: cc.Node,
        exp: cc.Node,
        userName: cc.Label,
        vip:      cc.Label,
        userRed:  cc.Label,
        maskFull: 0,
    },
    onLoad () {
        if (cc.RedT.IS_LOGIN)
            this.isSignIn();
        else
            this.isSignOut();
    },
    isSignIn: function() {
        this.nodeUsers.active = true;
		this.nodeUsers1.active = true;
        this.nodeGuest.active = false;
    },
    isSignOut: function() {
        this.userName.string = this.userRed.string = '';
        this.nodeUsers.active = false;
		this.nodeUsers1.active = false;
        this.nodeGuest.active = true;
    },
    level: function(level){
        this.vip.string = "VIP"+level;
    },
    updateEXP: function(ht, next){
        this.exp.width = ht/next*this.maskFull;
    },
    reset: function(){
        this.level(cc.RedT.user.level);
        this.updateEXP(cc.RedT.user.vipHT, cc.RedT.user.vipNext);
    },
});
