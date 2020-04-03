(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/PauseMenu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c97547u30RIOKGjKzxiYhjP', 'PauseMenu', __filename);
// scripts/Game/PauseMenu.js

'use strict';

/*
 * 暂停菜单脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    ContinueBtn: {
      type: cc.Button,
      default: null
    },
    HomeBtn: {
      type: cc.Button,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
  start: function start() {
    // 绑定两个按钮的回调函数
    this.ContinueBtn.node.on('click', this.Continue, this);
    this.HomeBtn.node.on('click', function () {
      var sceneName = cc.director._loadingScene;
      if (sceneName !== 'beginMenu') {
        cc.director.loadScene('beginMenu');
      }
    }, this);
  },


  /*
     * 恢复函数
     * 功能：当继续游戏时，将父节点的stateChange设为真，
     *      使得父节点在更新中进行恢复
     */
  Continue: function Continue() {
    var s = this.node.parent.parent;
    s._components[1].stateChange = true;
    this.node.destroy();
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
        //# sourceMappingURL=PauseMenu.js.map
        