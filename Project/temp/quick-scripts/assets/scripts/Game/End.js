(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/End.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8619b2w5m5Mno3OEL8fsLfp', 'End', __filename);
// scripts/Game/End.js

'use strict';

/*
 * 通关场景的脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    MainCamera: {
      type: cc.Camera,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  start: function start() {
    this.end = false;
  },


  // 通关场景自定义的相机移动
  update: function update(dt) {
    if (this.MainCamera.node.y >= -3770) {
      this.MainCamera.node.y -= 1;
    } else if (!this.end && this.MainCamera.node.y < -3770) {
      this.end = true;
      this.scheduleOnce(function () {
        cc.director.loadScene('beginMenu');
      }, 3);
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
        //# sourceMappingURL=End.js.map
        