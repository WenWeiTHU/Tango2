(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/StageControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '296b5wxLzBECpOazYXescOJ', 'StageControl', __filename);
// scripts/Game/StageControl.js

"use strict";

/*
 * 关卡模式目标点控制脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      type: cc.Node,
      default: null
    },
    targetX: 0,
    targetY: 0
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start: function start() {
    this.target.active = false;
    this.showTarget = false;
  },


  // 当所有敌人被消灭时目标点才会出现
  update: function update(dt) {
    if (this.node.children.length === 0 && !this.showTarget) {
      this.target.active = true;
      this.showTarget = true;
    }
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
        //# sourceMappingURL=StageControl.js.map
        