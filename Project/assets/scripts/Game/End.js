/*
 * 通关场景的脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    MainCamera: {
      type: cc.Camera,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  start () {
    this.end = false
  },

  // 通关场景自定义的相机移动
  update (dt) {
    if (this.MainCamera.node.y >= -3770) {
      this.MainCamera.node.y -= 1
    } else if (!this.end && this.MainCamera.node.y < -3770) {
      this.end = true
      this.scheduleOnce(() => {
        cc.director.loadScene('beginMenu')
      }, 3)
    }
  }
})
