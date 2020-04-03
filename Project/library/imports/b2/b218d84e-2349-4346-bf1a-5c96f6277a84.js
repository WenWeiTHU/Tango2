"use strict";
cc._RF.push(module, 'b218dhOI0lDRr8aXJb2J3qE', 'Enemy');
// scripts/Game/Enemy.js

'use strict';

/*
 * 普通敌机脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    accel: 0, // 敌机加速度
    speedX: 0, // 敌机X方向速度
    speedY: 0, // 敌机Y方向速度
    rotationUpdate: 20, // 敌机自转时长
    BlastPrefab: {
      type: cc.Prefab,
      default: null
    },
    Explode: {
      type: cc.AudioSource,
      default: null
    }
  },

  /*
     * 自转函数
     * 功能：更新对象的旋转角度，使其发生旋转
     */
  rotate: function rotate() {
    var newDegree = this.node.rotation + this.rotationUpdate / Math.PI;
    this.node.rotation = newDegree > 360 ? newDegree - 360 : newDegree;
  },


  // LIFE-CYCLE CALLBACKS:

  /*
     * 初始化函数
     * 功能：初始化脚本运行所需的参数
     */
  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
  },
  start: function start() {},


  /*
     * 碰撞函数
     * 功能：在发生碰撞时对对象进行处理
     */
  onCollisionEnter: function onCollisionEnter(other, self) {
    // 直接回弹
    if (other.node.group === 'Map') {
      this.speedX *= -1;
      this.speedY *= -1;
    } else {
      // 碰撞主角,链接,护盾则爆炸
      this.Explode.play();

      var blast = cc.instantiate(this.BlastPrefab);

      this.node.parent.addChild(blast);
      blast.setPosition(this.node.x, this.node.y);
      var animComponent = blast.getComponent(cc.Animation);
      animComponent.play('blast3');
      this.node.destroy();
    }
  },


  /*
     * 更新位置函数
     * 根据 X 轴和 Y 轴的分速度来更新对象的位置
     */
  updatePos: function updatePos(dt) {
    this.node.x += this.speedX * dt;
    this.node.y += this.speedY * dt;
  },


  // 位置更新
  update: function update(dt) {
    this.rotate();
    this.updatePos(dt);
  }
});

cc._RF.pop();