"use strict";
cc._RF.push(module, '524904tOl1MkpZxJh0gBsbN', 'Supply');
// scripts/Game/Supply.js

"use strict";

/*
 * 补给脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    existTime: 5
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
  },


  // 碰到则消失
  onCollisionEnter: function onCollisionEnter(other, self) {
    // 消失动画
    this.node.active = false;
  },


  // 补给只能存在一定时长
  start: function start() {
    var _this = this;

    setTimeout(function () {
      _this.node.destroy();
    }, this.existTime * 1000);

    this.node.runAction(cc.fadeOut(this.existTime));
  }

  // update (dt) {},

});

cc._RF.pop();