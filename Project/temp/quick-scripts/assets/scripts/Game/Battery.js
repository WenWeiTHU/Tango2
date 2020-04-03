(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Battery.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '79fddd2NzRP5oudh+AU9zUE', 'Battery', __filename);
// scripts/Game/Battery.js

'use strict';

/*
 * 炮台类敌人的脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    rotationUpdate: 0, // 自身旋转更新
    bulletSpeed: 0, // 子弹射速
    shootNum: 2, // 每次发射数目
    Player1: {
      type: cc.Node,
      default: null
    },
    Player2: {
      type: cc.Node,
      default: null
    },
    BulletPrefab: {
      type: cc.Prefab,
      default: null
    },
    Orbit: {
      type: cc.AudioSource,
      default: null
    },
    shootTime: 2 // 发射时间间隔
  },

  /*
     * 初始化函数
     */
  onLoad: function onLoad() {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true;

    // 随机选取一个主角作为发射子弹的目标
    this.target = Math.random() > 0.5 ? this.Player1 : this.Player2;

    // 设置间隔一定时间发射子弹
    this.schedule(this.shoot, this.shootTime);
  },
  start: function start() {},


  /*
     * 发射函数
     * 功能：朝主角方向发射若干颗成一定角度的子弹
     */
  shoot: function shoot() {
    this.Orbit.play();

    // 从炮台到目标位置的向量
    var dir = cc.v2(this.target.x - this.node.x, this.target.y - this.node.y);

    // 计算参数
    var r = Math.atan2(this.dir.y, this.dir.x);
    var degreeCenter = r * 180 / Math.PI;

    // 生成正对主角的那颗子弹
    this.createBullet(this.node.x, this.node.y, dir, -1, degreeCenter, this.bulletSpeed);

    // 下面两个循环生成和主角有一定角度的子弹
    for (var i = 1; i < this.shootNum; i++) {
      var degree = r * 180 / Math.PI + 5 * i;
      this.createBullet(this.node.x, this.node.y, cc.v2(Math.cos(degree * Math.PI / 180), Math.sin(degree * Math.PI / 180)), -1, degree, this.bulletSpeed);
    }

    for (var _i = 1; _i < this.shootNum; _i++) {
      var _degree = r * 180 / Math.PI - 5 * _i;
      this.createBullet(this.node.x, this.node.y, cc.v2(Math.cos(_degree * Math.PI / 180), Math.sin(_degree * Math.PI / 180)), -1, _degree, this.bulletSpeed);
    }

    // 将父节点中的所有子节点按照zIndex排序，以保证显示层级的正确
    this.node.parent.sortAllChildren();
  },


  /*
     * 产生子弹函数
     * 功能：按照给定的参数实例化一个子弹对象，并加入到父节点中
     */
  createBullet: function createBullet(x, y, direction, zIndex, rotation, speed) {
    var newBullet = cc.instantiate(this.BulletPrefab);
    var bulletSetting = newBullet.getComponent('Bullet');
    newBullet.rotation = 450 - rotation;
    newBullet.x = x;
    newBullet.y = y;
    newBullet.zIndex = zIndex;
    bulletSetting.direction = direction;
    bulletSetting.speed = speed;
    this.node.parent.addChild(newBullet);
  },


  /*
     * 调整炮台角度参数
     * 功能：旋转炮台，使得其能够对准主角
     */
  rotateToPlayer: function rotateToPlayer() {
    this.dir = cc.v2(this.target.x - this.node.x, this.target.y - this.node.y);
    var r = Math.atan2(this.dir.y, this.dir.x);
    var degree = r * 180 / Math.PI;
    degree = 360 - degree + 90;
    this.node.rotation = degree;
  },


  // 系统更新函数
  update: function update(dt) {
    this.rotateToPlayer();
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
        //# sourceMappingURL=Battery.js.map
        