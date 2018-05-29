var tmpPlayer = require("Player");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // },

    start () {

    },

    // update (dt) {
    // },

    onCollisionExit: function (other, self) {
        this.scheduleOnce(function(){
            this.stairIsUsed();
        },1.0);
    },

    stairIsUsed: function() {
        var goAction = cc.moveBy(1.0,cc.p(0,-600));
        this.node.runAction(goAction);
    }
});
