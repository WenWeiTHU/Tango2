(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Blast.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7d477qknA5DgI+EhWaPfKNE', 'Blast', __filename);
// scripts/Game/Blast.js

'use strict';

/*
 * 一次性动画
 */
cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {},


  // 动画仅播放及销毁节点,减少内存占用
  start: function start() {
    this.animation = this.node.getComponent(cc.Animation);
    this.animation.on('finished', this.onFinished, this);
  },


  onFinished: function onFinished() {
    this.node.destroy();
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
        //# sourceMappingURL=Blast.js.map
        