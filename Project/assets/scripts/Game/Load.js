/*
 * 加载界面脚本，主要用于分包加载
 */

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {
    cc.loader.downloader.loadSubpackage('res', function (err) {
      if (err) {
        return console.error(err)
      }
      cc.director.loadScene('beginMenu')
    })
  }

  // update (dt) {},
})
