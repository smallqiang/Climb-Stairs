cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default:null,
            type:cc.Node
        },

        stair:{
            default:null,
            type:cc.Prefab
        },

        scoreLabel:{
            default:null,
            type:cc.Label
        },

        nodeView: {
            default:null,
            type:cc.Node
        },

        score:0,

        stairCount:0,
        otherStairCount:3000,

        moveDuration:0.2,
        moveDuration2:0.1,

        stairWidth:121,
        stairHeight:117,

        preStairX:0,
        preStairY:0,
        continuous:0,

        otherStairs:[cc.Prefab],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;

        //以下代码为显示物理碰撞的范围
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        this.player.setPosition(0,-300);

        this.setInputControl();

        for(var i=0;i<8;i++)
        {
            this.newStair();
        }

        this.player.zIndex = 1;
        this.scoreLabel.node.zIndex = 1;
    },

    setInputControl: function() {
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            let location = event.touch.getLocation();
            let locationX = location.x;
            if (locationX > this.node.width/2) {
                this.playerMoveRight();
            } else {
                this.playerMoveLeft();
            }

            this.newStairUpToDown();
        },this)
    },

    playerMoveLeft: function() {
        //角色跳跃的效果
        var goL1 = cc.moveTo(this.moveDuration2,cc.p(this.player.getPositionX(),this.player.getPositionY()+this.stairHeight));
        var goL2 = cc.moveTo(this.moveDuration2,cc.p(this.player.getPositionX(),this.player.getPositionY()));
        var sque = cc.sequence(goL1,goL2);
        this.player.runAction(sque);
        this.player.setScaleX(1);

        var goAction = cc.moveBy(0.2,cc.p(60,-100));
        this.nodeView.runAction(goAction);
    },

    playerMoveRight: function() {
        //角色跳跃的效果
        var goR1 = cc.moveTo(this.moveDuration2,cc.p(this.player.getPositionX(),this.player.getPositionY()+this.stairHeight));
        var goR2 = cc.moveTo(this.moveDuration2,cc.p(this.player.getPositionX(),this.player.getPositionY()));
        var sque = cc.sequence(goR1,goR2);
        this.player.runAction(sque);
        this.player.setScaleX(-1);

        var goAction = cc.moveBy(0.2,cc.p(-60,-100));
        this.nodeView.runAction(goAction);
    },

    start () {

    },

    // update (dt) {},

    //台阶生成
    newStair: function() {
        this.stairCount +=1;
        var newStair = cc.instantiate(this.stair);
        this.nodeView.addChild(newStair,-1);

        var randD = cc.random0To1();

        var stairPosition = this.stairPosition(randD)
        newStair.setPosition(stairPosition);
    },

    //台阶生成带上动画效果
    newStairUpToDown: function() {
        this.stairCount +=1;
        var newStair = cc.instantiate(this.stair);
        this.nodeView.addChild(newStair,-999);

        var randD = cc.random0To1();

        var stairPosition = this.stairPosition(randD)
        newStair.setPosition(cc.p(stairPosition.x,stairPosition.y+100));
        var goAction = cc.moveTo(this.moveDuration2,stairPosition);
        newStair.runAction(goAction);
    },

    newOtherStair: function(isLeft,position) {
        if (this.stairCount == 1) {
            return;
        }

        var hasOther = false;
        var randD = cc.random0To1();

        //生成障碍台阶的概率
        if (randD <= 0.8) {

        } else {
            hasOther = true;
        }

        if (hasOther) {
            var count = Math.ceil(Math.random() * 2) - 1;

            var newStair = cc.instantiate(this.otherStairs[count]);

            this.otherStairCount--;

            this.nodeView.addChild(newStair,this.otherStairCount);

            //如果生成的台阶在左，那障碍就在右
            if (isLeft) {
                newStair.setPosition(this.preStairX+this.stairWidth/2+10,position.y+20);
            } else {
                newStair.setPosition(this.preStairX-this.stairWidth/2-10,position.y+20);
            }
        }
    },

    stairPosition: function(randD) {
        var randX = 0;
        var randY = 0;
        var isLeft = true;
        if (randD <= 0.5) {

        } else {
            isLeft = false;
        }

        if (this.stairCount == 1) {
            randX = this.player.getPositionX();
            randY = this.player.getPositionY() - 60;
        } else {
            if (isLeft) {
                randX = this.preStairX - this.stairWidth/2;
            } else {
                randX = this.preStairX + this.stairWidth/2;
                if (this.stairCount == 2) {
                    this.player.setScaleX(-1);
                }
            }
            randY = this.preStairY + 100;
        }

        var position = cc.p(randX,randY);
        this.newOtherStair(isLeft,position);

        this.preStairX = randX;
        this.preStairY = randY;

        return position;
    },
});
