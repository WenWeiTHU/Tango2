"use strict";
cc._RF.push(module, '78ffbwEWy9HaoK5OBR3krnG', 'Selection');
// scripts/Game/Selection.js

'use strict';

/*
 * 选择界面脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    SurviveBtn: {
      type: cc.Button,
      default: null
    },
    BattleBtn: {
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

  // 绑定回调函数
  start: function start() {
    this.SurviveBtn.node.on('click', this.loadSurviveScene, this);
    this.BattleBtn.node.on('click', this.loadStageSelectScene, this);
    this.HomeBtn.node.on('click', this.loadHomeScene, this);
  },
  loadSurviveScene: function loadSurviveScene() {
    var sceneName = cc.director._loadingScene;
    if (sceneName !== 'Infinity War') {
      cc.director.loadScene('Infinity War');
    }
  },
  loadStageSelectScene: function loadStageSelectScene() {
    var sceneName = cc.director._loadingScene;
    if (sceneName !== 'StageSelect') {
      cc.director.loadScene('StageSelect');
    }
  },
  loadHomeScene: function loadHomeScene() {
    var sceneName = cc.director._loadingScene;
    if (sceneName !== 'beginMenu') {
      cc.director.loadScene('beginMenu');
    }
  }
  // update (dt) {},

});

cc._RF.pop();