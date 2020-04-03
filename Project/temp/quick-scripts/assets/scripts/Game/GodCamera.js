(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/GodCamera.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '92507I+gfRMCoQ0idinpph1', 'GodCamera', __filename);
// scripts/Game/GodCamera.js

"use strict";

/*
 * 上帝视角相机控制脚本
 */

// 可以使用键盘方向键控制相机移动，仅调试和设计地图时使用

cc.Class({
  extends: cc.Component,

  properties: {
    goToWhereX: 0,
    goToWhereY: 0,
    toWhereY: 0,
    toWhereX: 0
  },

  // 添加键盘控制事件
  onLoad: function onLoad() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: function onKeyPressed(keyCode, event) {
        switch (keyCode) {
          case cc.macro.KEY.a:
          case cc.macro.KEY.left:
            self.toWhereX = -10;
            break;
          case cc.macro.KEY.d:
          case cc.macro.KEY.right:
            self.goToWhereX = 10;
            break;
          case cc.macro.KEY.w:
          case cc.macro.KEY.up:
            self.goToWhereY = 10;
            break;
          case cc.macro.KEY.s:
          case cc.macro.KEY.down:
            self.toWhereY = -10;
            break;
        }
      },
      onKeyReleased: function onKeyReleased(keyCode, event) {
        switch (keyCode) {
          case cc.macro.KEY.a:
          case cc.macro.KEY.left:
            self.toWhereX = 0;
            break;
          case cc.macro.KEY.d:
          case cc.macro.KEY.right:
            self.goToWhereX = 0;
            break;
          case cc.macro.KEY.w:
          case cc.macro.KEY.up:
            self.goToWhereY = 0;
            break;
          case cc.macro.KEY.s:
          case cc.macro.KEY.down:
            self.toWhereY = 0;
            break;
        }
      }
    }, self.node);
  },

  goToLeft: function goToLeft() {
    this.node.runAction(cc.moveBy(0.25, cc.v2(this.toWhereX, 0)));
  },
  goToRight: function goToRight() {
    this.node.runAction(cc.moveBy(0.25, cc.v2(this.goToWhereX, 0)));
  },
  goToUp: function goToUp() {
    this.node.runAction(cc.moveBy(0.25, cc.v2(0, this.goToWhereY)));
  },
  goToBottom: function goToBottom() {
    this.node.runAction(cc.moveBy(0.25, cc.v2(0, this.toWhereY)));
  },


  // 系统调用的更新函数
  update: function update(dt) {
    this.goToLeft();
    this.goToRight();
    this.goToUp();
    this.goToBottom();
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
        //# sourceMappingURL=GodCamera.js.map
        