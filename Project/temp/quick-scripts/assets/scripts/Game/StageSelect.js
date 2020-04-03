(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/StageSelect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd7c65wxCEBAo7og+WCzqKVY', 'StageSelect', __filename);
// scripts/Game/StageSelect.js

'use strict';

/*
 * 选关场景界面脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    Stage1Btn: {
      type: cc.Button,
      default: null
    },
    Stage2Btn: {
      type: cc.Button,
      default: null
    },
    Stage3Btn: {
      type: cc.Button,
      default: null
    },
    Stage4Btn: {
      type: cc.Button,
      default: null
    },
    Stage5Btn: {
      type: cc.Button,
      default: null
    },
    Stage6Btn: {
      type: cc.Button,
      default: null
    },
    Stage7Btn: {
      type: cc.Button,
      default: null
    },
    Stage8Btn: {
      type: cc.Button,
      default: null
    },
    Stage9Btn: {
      type: cc.Button,
      default: null
    },
    Stage10Btn: {
      type: cc.Button,
      default: null
    },
    Stage11Btn: {
      type: cc.Button,
      default: null
    },
    Stage12Btn: {
      type: cc.Button,
      default: null
    },
    BackBtn: {
      type: cc.Button,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start: function start() {
    // 微信开发者工具不支持eval函数，对每个按钮手动绑定
    this.Stage1Btn.node.on('click', this.loadScene(1), this);
    this.Stage2Btn.node.on('click', this.loadScene(2), this);
    this.Stage3Btn.node.on('click', this.loadScene(3), this);
    this.Stage4Btn.node.on('click', this.loadScene(4), this);
    this.Stage5Btn.node.on('click', this.loadScene(5), this);
    this.Stage6Btn.node.on('click', this.loadScene(6), this);
    this.Stage7Btn.node.on('click', this.loadScene(7), this);
    this.Stage8Btn.node.on('click', this.loadScene(8), this);
    this.Stage9Btn.node.on('click', this.loadScene(9), this);
    this.Stage10Btn.node.on('click', this.loadScene(10), this);
    this.Stage11Btn.node.on('click', this.loadScene(11), this);
    this.Stage12Btn.node.on('click', this.loadScene(12), this);
    this.BackBtn.node.on('click', function () {
      cc.director.loadScene('beginMenu');
    }, this);

    var i;
    for (i = 1; i < 13; ++i) {
      var key = 'Stage' + String(i);
      var result = JSON.parse(cc.sys.localStorage.getItem(key));
      if (!result) {
        var btns = this['Stage' + String(i) + 'Btn'].getComponents(cc.Button);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = btns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var btn = _step.value;

            btn.interactable = false;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  },


  // 加载界面
  loadScene: function loadScene(i) {
    return function () {
      var sceneName = cc.director._loadingScene;
      if (sceneName !== 'Stage' + String(i)) {
        cc.director.loadScene('Stage' + String(i));
      }
    };
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
        //# sourceMappingURL=StageSelect.js.map
        