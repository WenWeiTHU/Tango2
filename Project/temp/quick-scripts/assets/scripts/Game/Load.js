(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Load.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '52d80sgBtBOJrfnG4jrFhvu', 'Load', __filename);
// scripts/Game/Load.js

'use strict';

/*
 * 加载界面脚本，主要用于分包加载
 */

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start: function start() {
    cc.loader.downloader.loadSubpackage('res', function (err) {
      if (err) {
        return console.error(err);
      }
      cc.director.loadScene('beginMenu');
    });
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
        //# sourceMappingURL=Load.js.map
        