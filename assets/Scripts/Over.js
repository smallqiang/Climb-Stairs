cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:{
            default:null,
            type:cc.Label
        },

        button:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var score = cc.sys.localStorage.getItem("score");
        if (score) {
            this.scoreLabel.string = "最终得分："+score;
        }

        cc.director.preloadScene("GameScene");
        this.button.on("touchstart",function(){
            cc.sys.localStorage.removeItem("score");
            cc.director.loadScene("GameScene")
        });
    },

    start () {

    },

    // update (dt) {},
});
