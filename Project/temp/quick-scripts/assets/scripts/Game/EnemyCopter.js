(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/EnemyCopter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '393c3v/8d1GU75sOTmfQXWr', 'EnemyCopter', __filename);
// scripts/Game/EnemyCopter.js

'use strict';

/*
 * 直升机敌人脚本
 */

cc.Class({
  extends: require('EnemySpin'),

  properties: {
    BulletPrefab: {
      type: cc.Prefab,
      default: null
    },
    Body: {
      type: cc.Node,
      default: null
    },
    Fly: {
      type: cc.Node,
      default: null
    },
    shootTime: 3, // 射击时间间隔
    shootInterval: 0.3, // 连发子弹射击间隔
    shootNum: 3, // 射击数
    bulletSpeed: 100, // 子弹速度
    flyRotationUpdate: 15 // 旋翼自转速度
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  /*
     * 发射子弹函数
     * 功能：间隔一段较短的时间发射多颗子弹
     */
  shoot: function shoot() {
    this.schedule(this.createBullet, this.shootInterval, this.shootNum - 1);
  },

  /*
     * 创造子弹函数
     * 功能：根据给定参数实例化一颗子弹，并且将其添加到本节点的父节点中
     */
  createBullet: function createBullet() {
    // 对象和主角的位差向量
    var dir = cc.v2(this.Player.x - this.node.x, this.Player.y - this.node.y);

    // 构造新子弹，并设置参数
    var newBullet = cc.instantiate(this.BulletPrefab);
    var bulletSetting = newBullet.getComponent('Bullet');

    // 计算角度
    var r = Math.atan2(dir.y, dir.x);
    var degree = r * 180 / Math.PI;
    newBullet.rotation = 450 - degree;

    // 设置参数
    newBullet.x = this.node.x;
    newBullet.y = this.node.y;
    bulletSetting.direction = dir;
    bulletSetting.speed = this.bulletSpeed;

    // 添加到父节点中
    this.node.parent.parent.addChild(newBullet);
    this.node.parent.sortAllChildren();
  },

  /*
     * 初始化函数
     * 功能：初始化脚本运行所需的参数
     */
  start: function start() {
    this.angle = 0;
    this.circulateDir = 1;
    this.flyDegree = 0;
    this.schedule(this.shoot, this.shootTime);
  },


  /*
     * 调整旋转角度函数
     * 功能：调整对象的旋转角度，使其一直面向主角
     */
  face: function face() {
    this.angle += this.circulateDir * this.circulateUpdate;
    this.angle = this.angle > 360 ? this.angle - 360 : this.angle;

    this.node.rotation = this.angle + 180;

    this.node.x = this.centerX + this.radius * Math.sin(this.angle * Math.PI / 180);
    this.node.y = this.centerY + this.radius * Math.cos(this.angle * Math.PI / 180);
  },


  /*
     * 更新飞行角度
     * 功能：改变飞机的飞行角度，使得其绕着主角飞行
     */
  updateFlyDegree: function updateFlyDegree(dt) {
    this.flyDegree += this.circulateDir * this.flyRotationUpdate / Math.PI;
    this.flyDegree = this.flyDegree > 360 ? this.flyDegree - 360 : this.flyDegree;
    this.Fly.rotation = this.flyDegree;

    this.dir = cc.v2(this.Player.x - this.centerX, this.Player.y - this.centerY);
    this.distance = this.dir.mag();

    this.centerX += this.dir.x / this.distance * this.centerSpeed * dt;
    this.centerY += this.dir.y / this.distance * this.centerSpeed * dt;
  },


  // 系统调用的更新函数
  update: function update(dt) {
    this.updateFlyDegree(dt);
    this.face();
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
        //# sourceMappingURL=EnemyCopter.js.map
        