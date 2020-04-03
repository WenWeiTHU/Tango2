(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Bind.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8f66bR/MmZDG4FlE3MUNlKT', 'Bind', __filename);
// scripts/Game/Bind.js

'use strict';

/*
 * 主角链接的脚本
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

  // LIFE-CYCLE CALLBACKS:

  // 初始化碰撞动画
  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
    var animComponent = this.getComponent(cc.Animation);
    var animState = animComponent.play('bindAnim2');
    animState.wrapMode = cc.WrapMode.Loop;
  },


  // 初始化长度与角度
  start: function start() {
    this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
    var r = Math.atan2(this.dir.y, this.dir.x);
    var degree = r * 180 / Math.PI;
    degree = 360 - degree + 90;
    this.node.rotation = degree;

    this.node.height = this.dir.mag();
    this.node.x = this.Player2.x;
    this.node.y = this.Player2.y;
  },


  // 根据两主角位置,更新长度与角度
  update: function update(dt) {
    this.dir = cc.v2(this.Player1.x - this.Player2.x, this.Player1.y - this.Player2.y);
    var r = Math.atan2(this.dir.y, this.dir.x);
    var degree = r * 180 / Math.PI;
    degree = 360 - degree + 90;
    this.node.rotation = degree;

    this.node.height = this.dir.mag();

    var collider = this.node._components[3];
    collider.points[2].y = this.node.height;
    collider.points[3].y = this.node.height;

    this.node.x = this.Player2.x;
    this.node.y = this.Player2.y;
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
        //# sourceMappingURL=Bind.js.map
        