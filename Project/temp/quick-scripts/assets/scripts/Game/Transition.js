(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Transition.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e58f5MzD3NFWYT0lyPOuI2/', 'Transition', __filename);
// scripts/Game/Transition.js

'use strict';

/*
 * 过渡界面脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    continueBtn: {
      type: cc.Button,
      default: null
    },
    homeBtn: {
      type: cc.Button,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:
  // 按钮回调绑定
  onLoad: function onLoad() {
    this.homeBtn.node.on('click', this.loadBeginMenu, this);
    this.continueBtn.node.on('click', this.loadContinue, this);
    var sceneName = cc.director.getScene().name;
    if (sceneName === 'Transition_INF') {
      var score = cc.sys.localStorage.getItem('SurviveScore');
      this.node.getChildByName('Score').getComponent(cc.Label).string = 'SurvivalTime: ' + score + 's';
      this.node.getChildByName('rankBtn').on('click', function () {
        cc.director.loadScene('Ranking');
      }, this);
    }
  },


  // 加载开始界面
  loadBeginMenu: function loadBeginMenu() {
    cc.director.loadScene('beginMenu');
  },


  // 加载继续界面
  // 若过关，则直接进入下一关卡
  // 若失败，则继续本关
  loadContinue: function loadContinue() {
    var s = cc.sys.localStorage.getItem('lastStage');
    s = JSON.parse(s);
    if (s.Stage === 'Infinity War') {
      cc.director.loadScene('Infinity War');
      return;
    }
    var temp = Number(s.Stage.slice(s.Stage.length - 2));
    var sceneID = isNaN(temp) ? Number(s.Stage[s.Stage.length - 1]) : temp;
    sceneID = s.Win ? sceneID + 1 : sceneID;
    var newSceneName = 'Stage' + String(sceneID);
    var sceneName = cc.director._loadingScene;
    if (sceneName !== newSceneName) {
      cc.director.loadScene(newSceneName);
    }
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
        //# sourceMappingURL=Transition.js.map
        