/*
 * 主相机运行脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    Player1: {
      type: cc.Node,
      default: null
    },
    Player2: {
      type: cc.Node,
      default: null
    }
  },

  start () {

  },

  /*
     * 更新位置函数
     * 功能：将相机的中心锁定在两个角色的中间点
     */
  updatePos () {
    this.node.x = (this.Player1.x + this.Player2.x) / 2
    this.node.y = (this.Player1.y + this.Player2.y) / 2
  },

  update (dt) {
    this.updatePos()
  }
})
