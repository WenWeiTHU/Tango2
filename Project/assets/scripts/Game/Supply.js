/*
 * 补给脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    existTime: 5
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.director.getCollisionManager().enabled = true
  },

  // 碰到则消失
  onCollisionEnter (other, self) {
    // 消失动画
    this.node.active = false
  },

  // 补给只能存在一定时长
  start () {
    setTimeout(() => {
      this.node.destroy()
    }, this.existTime * 1000)

    this.node.runAction(cc.fadeOut(this.existTime))
  }

  // update (dt) {},
})
