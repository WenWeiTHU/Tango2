/*
 * 一次性动画
 */
cc.Class({
  extends: cc.Component,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {},

  // 动画仅播放及销毁节点,减少内存占用
  start () {
    this.animation = this.node.getComponent(cc.Animation)
    this.animation.on('finished', this.onFinished, this)
  },

  onFinished: function () {
    this.node.destroy()
  }
})
