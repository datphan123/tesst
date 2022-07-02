
cc.Class({
    extends: cc.Component,

    properties: {
        header: {
            default: null,
            type: cc.Node,
        },
        head: {
            default: null,
            type: cc.Node,
        },
        body: {
            default: null,
            type: cc.Node,
        },
        RutBank: {
            default: null,
            type: cc.Node,
        },
		ChuyenRed: {
            default: null,
            type: cc.Node,
        },
        MuaTheCao: {
            default: null,
            type: cc.Node,
        },
    },
    init(){
        this.RutBank     = this.RutBank.getComponent('bankRut');
		this.ChuyenRed     = this.ChuyenRed.getComponent('ChuyenRed');
        this.MuaTheCao  = this.MuaTheCao.getComponent('shopMuaTheCao');

        this.MuaTheCao.init();
        this.RutBank.init();
		this.ChuyenRed.init();

        this.heade = this.header;

        Promise.all(this.header.children.map(function(obj) {
            return obj.getComponent('itemContentMenu');
        }))
        .then(result => {
            this.header = result;
        });
    },
    onEnable: function () {
        this.head.active = true;
        this.body.active = false;
		this.heade.active = false;
	},
    onSelectHead: function(event, name){
        this.head.active = false;
        this.heade.active = true;
        this.body.active = true;
		Promise.all(this.header.map(function(header) {
			if (header.node.name == name) {
				header.select();
			}else{
				header.unselect();
			}
		}));
		Promise.all(this.body.children.map(function(body) {
			if (body.name == name) {
				body.active = true;
			}else{
				body.active = false;
			}
		}));
	},
});
