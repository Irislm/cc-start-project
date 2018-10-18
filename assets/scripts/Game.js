// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab,
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node,
        },
        player: {
            default: null,
            type: cc.Node,
        },
        scoreDisplay: {
            default: null,
            type: cc.Label,
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip,
        }
    },

    onLoad () {
        this.groundY = this.ground.y + this.ground.height/2;
        this.timer = 0;
        this.spawnNewStar();
        this.score = 0;
    },

    start () {

    },

    update (dt) {
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },

    spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('Star').game = this;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition() {
        var randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },

    gainScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('gameOver');
    }
});
