(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Bullet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c00c3kiHjdLYINupJ4EFQ34', 'Bullet', __filename);
// scripts/Game/Bullet.js

'use strict';

/*
 * 子弹运行脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    direction: 0,
    speed: 0, // 子弹速度
    BulletBreakPrefab: {
      type: cc.Prefab,
      default: null
    }
  },

  /*
     * 初始化函数
     * 功能：初始化子弹运行所需要的设置
     */
  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
    this.setDirection();
  },
  start: function start() {},


  /*
     * 设置方向函数
     * 功能：设置子弹飞行的方向
     */
  setDirection: function setDirection() {
    if (this.direction === 0) {
      return;
    }
    this.directionX = this.direction.x / this.direction.mag();
    this.directionY = this.direction.y / this.direction.mag();
  },


  /*
     * 碰撞函数
     * 功能：发生碰撞时调用，当发生碰撞时，产生一个动画效果，并销毁节点本身
     */
  onCollisionEnter: function onCollisionEnter(other, self) {
    // 实例化动画并设置其参数
    var blast = cc.instantiate(this.BulletBreakPrefab);
    this.node.parent.addChild(blast);
    blast.setPosition(this.node.x, this.node.y);
    var animComponent = blast.getComponent(cc.Animation);
    animComponent.play('bulletBreak');

    // 销毁自身节点
    this.node.destroy();
  },


  /*
     * 更新位置函数
     * 功能：根据方向和时间更新节点的下一个位置
     */
  updatePos: function updatePos(dt) {
    this.node.x += this.speed * this.directionX * dt;
    this.node.y += this.speed * this.directionY * dt;
  },


  // 每帧更新时系统调用的更新函数
  update: function update(dt) {
    this.updatePos(dt);
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
        //# sourceMappingURL=Bullet.js.map
        