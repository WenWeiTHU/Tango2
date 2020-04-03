/*
 * 排行榜脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    First: {
      type: cc.Label,
      default: null
    },
    Second: {
      type: cc.Label,
      default: null
    },
    Third: {
      type: cc.Label,
      default: null
    },
    BackBtn: {
      type: cc.Button,
      default: null
    }
  },

  /*
     * 初始化函数
     * 功能：初始化脚本所需设定
     */
  onLoad () {
    this.showRank()
    this.BackBtn.node.on('click', () => {
      cc.director.loadScene('Transition_INF')
    }, this)
  },

  start () {

  },

  /*
     * 展示排行函数
     * 功能：计算和展示排名
     */
  showRank () {
    var scores = JSON.parse(cc.sys.localStorage.getItem('ranking'))
    if (scores.length < 1) {
      this.First.string = 'There is no ranking yet!'
      this.Second.active = false
      this.Third.active = false
      return
    }
    this.First.string = '1st: ' + scores[0].score + 's'
    if (scores.length < 2) {
      this.Second.string = 'Oh! There is only one records'
      this.Third.string = ''
      return
    }
    this.Second.string = '2nd: ' + scores[1].score + 's'
    if (scores.length < 3) {
      this.Third.string = 'Oh! There are only two records!'
      return
    }
    this.Third.string = '3rd: ' + scores[2].score + 's'
  }

  // update (dt) {},
})
