
var BrowserUtil = require('BrowserUtil');
var helper      = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        head: {
			default: null,
			type: cc.Node,
		},
		header: {
			default: null,
			type: cc.Node,
		},
		body: {
			default: null,
			type: cc.Node,
		},
	},
    init() {
        this.heade = this.header;
		Promise.all(this.header.children.map(function(obj) {
			return obj.getComponent('itemContentMenu');
		}))
		.then(result => {
			this.header = result;
		});
    },
    onEnable: function () {
      //  this.head.active = true;
		//this.heade.active = false;
	},
	onDisable: function () {
		//cc.RedT.inGame.header.node.active = true;
	},
    onSelectHead: function(event, name){
        //this.head.active = false;
       // this.heade.active = true;
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
