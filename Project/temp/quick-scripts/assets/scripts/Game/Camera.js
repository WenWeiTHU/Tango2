(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Camera.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '051161RPolNUJ4zdAWAnLRm', 'Camera', __filename);
// scripts/Game/Camera.js

"use strict";

/*
 * 主相机运行脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    Player1: {
      type: cc.Node,
      default: null
    },
    Player2: {
      type: cc.Node,
      default: null
    }
  },

  start: function start() {},


  /*
     * 更新位置函数
     * 功能：将相机的中心锁定在两个角色的中间点
     */
  updatePos: function updatePos() {
    this.node.x = (this.Player1.x + this.Player2.x) / 2;
    this.node.y = (this.Player1.y + this.Player2.y) / 2;
  },
  update: function update(dt) {
    this.updatePos();
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
        //# sourceMappingURL=Camera.js.map
        