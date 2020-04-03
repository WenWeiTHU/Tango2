"use strict";
cc._RF.push(module, 'e338da91QdLCJwj9NWUz5Rd', 'Target');
// scripts/Game/Target.js

'use strict';

/*
 * 目标点自身运动控制脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    bonus: {
      type: cc.AudioSource,
      default: null
    },
    win: false
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    cc.director.getCollisionManager().enabled = true;
  },
  start: function start() {},
  onCollisionEnter: function onCollisionEnter(other, self) {
    if (other.node.group === 'Player') {
      this.bonus.play();
      // 加载场景
      this.writeResult();
      this.win = true;
    }
  },


  // 将游戏存档信息写入本地存储
  writeResult: function writeResult() {
    var sceneName = cc.director.getScene().name;
    var data = {
      Stage: sceneName,
      Win: true
    };
    cc.sys.localStorage.setItem('lastStage', JSON.stringify(data));
    var temp = Number(sceneName.slice(sceneName.length - 2));
    var number = isNaN(temp) ? Number(sceneName[sceneName.length - 1]) + 1 : temp + 1;
    sceneName = 'Stage' + String(number);
    cc.sys.localStorage.setItem(sceneName, true);
  },


  // 自身运动(旋转)更新
  update: function update(dt) {
    this.node.rotation += 1;
  }
});

cc._RF.pop();