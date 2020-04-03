/*
 * 护盾脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true
  },

  start () {

  }

  // update (dt) {},
})
