var tmpPlayer = require("Player");
cc.Class({
    extends: cc.Component,

    properties: {
        isUsed: false,

        isStanding: false,
        isDowned: false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // },

    start () {

    },

    // update (dt) {
    // },

    onCollisionEnter: function(other, self) {
        this.isUsed = true;
    },

    onCollisionStay: function (other, self) {
        this.isStanding = true;
    },

    onCollisionExit: function (other, self) {
        this.isStanding = false;
        // cc.log("end end");
        this.scheduleOnce(function(){
            this.stairIsUsed();
        },0.5);
    },

    stairIsUsed: function() {
        var goAction = cc.moveBy(1.0,cc.p(0,-600));
        this.node.runAction(goAction);
        setTimeout(() => {
            if (cc.isValid(this.node)) {
                this.node.destroy();
            }
        },1200);
    },

    gameIsOver: function () {
        if (this.isTouched == false) {
            var goAction = cc.moveBy(0.2,cc.p(0,-600));
            this.node.runAction(goAction);
            this.scheduleOnce(function(){
                cc.director.loadScene("OverGame")
            },0.2);
        }
    },
});
