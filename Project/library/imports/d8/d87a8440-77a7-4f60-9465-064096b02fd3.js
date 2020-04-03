"use strict";
cc._RF.push(module, 'd87a8RAd6dPYJRlBkCWsC/T', 'Shield');
// scripts/Game/Shield.js

"use strict";

/*
 * 护盾脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true;
  },
  start: function start() {}

  // update (dt) {},

});

cc._RF.pop();