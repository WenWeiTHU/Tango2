"use strict";
cc._RF.push(module, 'ad735tfp8hJar9OkRuTB6K8', 'Map');
// scripts/Game/Map.js

"use strict";

/*
 * 地图脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  /*
     * 初始化函数
     * 功能：初始化脚本所需设定
     */
  onLoad: function onLoad() {
    // 开启碰撞检测
    this.collidManager = cc.director.getCollisionManager();
    this.collidManager.enabled = true;
  },
  onCollisionEnter: function onCollisionEnter(other, self) {},
  start: function start() {}

  // update (dt) {},

});

cc._RF.pop();