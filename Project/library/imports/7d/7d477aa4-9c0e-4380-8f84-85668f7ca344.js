"use strict";
cc._RF.push(module, '7d477qknA5DgI+EhWaPfKNE', 'Blast');
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