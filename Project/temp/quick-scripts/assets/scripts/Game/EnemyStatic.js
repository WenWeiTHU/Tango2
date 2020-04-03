(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/EnemyStatic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd909Jflt1JhZR9GN43odra', 'EnemyStatic', __filename);
// scripts/Game/EnemyStatic.js

'use strict';

/*
 * 静态自爆型敌人脚本
 */

cc.Class({
  extends: require('Enemy'),

  properties: {
    shootNum: 8, // 自爆时子弹发射数
    BulletPrefab: {
      type: cc.Prefab,
      default: null
    },
    bulletSpeed: 60 // 子弹射速
  },

  // LIFE-CYCLE CALLBACKS:

  /*
     * 初始化函数
     * 功能：初始化脚本运行所需的设定
     */
  onLoad: function onLoad() {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true;
  },


  /*
     * 碰撞函数
     * 功能：对象被碰撞时调用此函数
     */
  onCollisionEnter: function onCollisionEnter(other, self) {
    if (other.node.group === 'Bind' || other.node.group === 'Player' || other.node.group === 'Shield') {
      // 如果被链接、主角或者护盾撞击，则该对象发生爆炸
      for (var i = 0; i < 360; i += 360 / this.shootNum) {
        // 构造新子弹，并设置参数
        var newBullet = cc.instantiate(this.BulletPrefab);
        var bulletSetting = newBullet.getComponent('Bullet');

        newBullet.rotation = 90 - i;

        newBullet.x = this.node.x;
        newBullet.y = this.node.y;
        bulletSetting.direction = cc.v2(Math.cos(i * Math.PI / 180), Math.sin(i * Math.PI / 180));
        bulletSetting.speed = this.bulletSpeed;

        this.node.parent.parent.addChild(newBullet);
      }
      this.explode();
    }
  },


  /*
     * 爆炸函数
     * 功能：产生爆炸动画并销毁自身
     */
  explode: function explode() {
    this.Explode.play();
    var blast = cc.instantiate(this.BlastPrefab);

    this.node.parent.addChild(blast);
    blast.setPosition(this.node.x, this.node.y);

    var animComponent = blast.getComponent(cc.Animation);
    animComponent.play('blast3');

    this.node.destroy();
    this.node.parent.sortAllChildren();
  },
  start: function start() {},


  // 系统调用的更新函数
  update: function update(dt) {
    this.rotate();
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
        //# sourceMappingURL=EnemyStatic.js.map
        