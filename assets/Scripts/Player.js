cc.Class({
    extends: cc.Component,

    properties: {
        isTouched:true,

        score:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.parent.on(cc.Node.EventType.TOUCH_END,function(event){
            this.isTouched = false;
            var manager = cc.director.getCollisionManager();
            if (manager.enabled == false) {
                manager.enabled = true;
            }
            this.scheduleOnce(function(){
                this.checkIsFailed();
            },0.15);
        },this)

        cc.director.preloadScene("OverGame");
    },

    start () {
        
    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {
        // cc.log('on collision enter');
        this.isTouched = true;

        //把分数存储到本地
        this.score++;
        cc.sys.localStorage.setItem("score",this.score);

        //获取在Canvas上的分数label来更新分数
        var scoreLabel = cc.find("Canvas/scoreLabel").getComponent(cc.Label);
        if (scoreLabel) {
            scoreLabel.string = this.score;
        }
    },

    onCollisionStay: function (other, self) {
        // cc.log('on collision stay');
    },

    onCollisionExit: function (other, self) {
        // cc.log('on collision exit');
    },

    checkIsFailed: function () {
        if (this.isTouched == false) {
            cc.log("fail");
            var goAction = cc.moveBy(0.2,cc.p(0,-600));
            this.node.runAction(goAction);
            this.scheduleOnce(function(){
                cc.director.loadScene("OverGame")
            },0.2);
        }
    },
});
