(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/EnemyTrack.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7c961iUFC1FSI1h+RDFBujU', 'EnemyTrack', __filename);
// scripts/Game/EnemyTrack.js

'use strict';

/*
 * 追踪敌人脚本
 */

cc.Class({
  extends: require('Enemy'),

  properties: {
    Player: {
      type: cc.Node,
      default: null
    },
    maxSpeed: 400, // 最大速度
    iniAccel: 0.01 // 追踪初始加速度
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
  start: function start() {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true;

    // 设置初速度为0
    this.speedX = 0;
    this.speedY = 0;
  },


  /*
     * 追踪位置函数
     * 功能：计算出对象与主角的方向，然后更新对象的速度和位置
     */
  track: function track(dt) {
    this.dir = cc.v2(this.Player.x - this.node.x, this.Player.y - this.node.y);

    this.distance = this.dir.mag();

    if (Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2)) < this.maxSpeed) {
      this.speedX += this.iniAccel * dt;
      this.speedY += this.iniAccel * dt;
    }

    this.node.x += this.speedX * this.dir.x / this.distance;
    this.node.y += this.speedY * this.dir.y / this.distance;
  },
  update: function update(dt) {
    this.rotate();
    this.track(dt);
  }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=EnemyTrack.js.map
        