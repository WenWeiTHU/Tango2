(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/EnemySwing.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3cbb76JyBtC14/Hlo9NPPC0', 'EnemySwing', __filename);
// scripts/Game/EnemySwing.js

'use strict';

/*
 * 摆动敌人脚本
 */

cc.Class({
  extends: require('Enemy'),

  properties: {
    swingDuration: 0, // 摆动周期
    rotateDuration: 0, // 旋转周期
    targetPosX: 0, // 目标点位置
    targetPosY: 0
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
  start: function start() {
    cc.director.getCollisionManager().enabled = true;

    this.swingAction = this.setSwingAction();
    this.node.runAction(this.swingAction);
  },


  /*
     * 设置摆动行为函数
     * 功能：给对象设定一个按目标位置摆动的行为
     */
  setSwingAction: function setSwingAction() {
    if (this.targetPosX === 0) {
      this.targetPosX = 1;
    }
    this.node.rotation = 90 - 180 * Math.atan(this.targetPosY / this.targetPosX) / Math.PI;

    var swingUp = cc.moveBy(this.swingDuration, cc.v2(this.targetPosX, this.targetPosY)).easing(cc.easeCubicActionInOut());
    var rotate = cc.rotateBy(this.rotateDuration, 180);
    var swingDown = cc.moveBy(this.swingDuration, cc.v2(-this.targetPosX, -this.targetPosY)).easing(cc.easeCubicActionInOut());
    // 不断重复
    return cc.repeatForever(cc.sequence(swingUp, rotate, swingDown, rotate));
  }

  // update (dt) {},

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
        //# sourceMappingURL=EnemySwing.js.map
        