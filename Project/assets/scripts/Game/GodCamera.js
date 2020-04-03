/*
 * 上帝视角相机控制脚本
 */

// 可以使用键盘方向键控制相机移动，仅调试和设计地图时使用

cc.Class({
  extends: cc.Component,

  properties: {
    goToWhereX: 0,
    goToWhereY: 0,
    toWhereY: 0,
    toWhereX: 0
  },

  // 添加键盘控制事件
  onLoad: function () {
    var self = this
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: function (keyCode, event) {
        switch (keyCode) {
          case cc.macro.KEY.a:
          case cc.macro.KEY.left:
            self.toWhereX = -10
            break
          case cc.macro.KEY.d:
          case cc.macro.KEY.right:
            self.goToWhereX = 10
            break
          case cc.macro.KEY.w:
          case cc.macro.KEY.up:
            self.goToWhereY = 10
            break
          case cc.macro.KEY.s:
          case cc.macro.KEY.down:
            self.toWhereY = -10
            break
        }
      },
      onKeyReleased: function (keyCode, event) {
        switch (keyCode) {
          case cc.macro.KEY.a:
          case cc.macro.KEY.left:
            self.toWhereX = 0
            break
          case cc.macro.KEY.d:
          case cc.macro.KEY.right:
            self.goToWhereX = 0
            break
          case cc.macro.KEY.w:
          case cc.macro.KEY.up:
            self.goToWhereY = 0
            break
          case cc.macro.KEY.s:
          case cc.macro.KEY.down:
            self.toWhereY = 0
            break
        }
      }
    }, self.node)
  },

  goToLeft () {
    this.node.runAction(cc.moveBy(0.25, cc.v2(this.toWhereX, 0)))
  },

  goToRight () {
    this.node.runAction(cc.moveBy(0.25, cc.v2(this.goToWhereX, 0)))
  },

  goToUp () {
    this.node.runAction(cc.moveBy(0.25, cc.v2(0, this.goToWhereY)))
  },

  goToBottom () {
    this.node.runAction(cc.moveBy(0.25, cc.v2(0, this.toWhereY)))
  },

  // 系统调用的更新函数
  update (dt) {
    this.goToLeft()
    this.goToRight()
    this.goToUp()
    this.goToBottom()
  }
})
