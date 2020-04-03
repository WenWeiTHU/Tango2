"use strict";
cc._RF.push(module, '52d80sgBtBOJrfnG4jrFhvu', 'Load');
// scripts/Game/Load.js

'use strict';

/*
 * 加载界面脚本，主要用于分包加载
 */

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start: function start() {
    cc.loader.downloader.loadSubpackage('res', function (err) {
      if (err) {
        return console.error(err);
      }
      cc.director.loadScene('beginMenu');
    });
  }

  // update (dt) {},

});

cc._RF.pop();