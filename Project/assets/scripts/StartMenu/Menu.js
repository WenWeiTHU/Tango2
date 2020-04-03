/*
 * 开始菜单脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    player1: {
      type: cc.Node,
      default: null
    },
    player2: {
      type: cc.Node,
      default: null
    },
    startBtn: {
      type: cc.Button,
      default: null
    },
    helpBtn: {
      type: cc.Button,
      default: null
    },
    bindR: {
      type: cc.Node,
      default: null
    },
    bindL: {
      type: cc.Node,
      default: null
    },
    enemyStatic: {
      type: cc.Node,
      default: null
    },
    enemySpin: {
      type: cc.Node,
      default: null
    },
    BlastPrefab1: {
      type: cc.Prefab,
      default: null
    },
    BlastPrefab2: {
      type: cc.Prefab,
      default: null
    },
    enemySwing1: {
      type: cc.Node,
      default: null
    },
    enemySwing2: {
      type: cc.Node,
      default: null
    },
    bgm: {
      type: cc.AudioClip,
      default: null
    }
  },

  /*
     * 初始化函数
     * 功能：初始化脚本所需设定
     */
  onLoad () {
    if (!cc.audioEngine.isMusicPlaying()) {
      cc.audioEngine.playMusic(this.bgm, true)
    }
    this.setBtn()
    this.setLocalStorage()
    this.initUI()
  },

  /*
     * 检查本地储存函数
     * 功能：检查本地储存，并设定本地储存
     */
  setLocalStorage () {
    if (cc.sys.localStorage.length <= 1) {
      cc.sys.localStorage.setItem('Stage1', true)
      for (var i = 2; i < 13; ++i) {
        cc.sys.localStorage.setItem('Stage' + String(i), false)
      }
      cc.sys.localStorage.setItem('highestScore', 0)
      cc.sys.localStorage.setItem('ranking', JSON.stringify([]))
    }
    var test = cc.sys.localStorage.getItem('ranking')
    if (test === null || test === '') {
      cc.sys.localStorage.setItem('ranking', JSON.stringify([]))
    }
  },

  /*
     * 初始化UI函数
     * 功能：初始化开始界面中的动画UI
     */
  initUI () {
    this.spinDegree = 0

    var bindAnimComponent = this.bindR.getComponent(cc.Animation)
    var bindAnimState = bindAnimComponent.play('bindAnim2')
    bindAnimState.wrapMode = cc.WrapMode.Loop

    var bindAnimComponent2 = this.bindL.getComponent(cc.Animation)
    var bindAnimState2 = bindAnimComponent2.play('bindAnim2')
    bindAnimState2.wrapMode = cc.WrapMode.Loop

    var swingRight = cc.moveBy(2.0, cc.v2(this.enemySwing2.x - this.enemySwing1.x, 0)).easing(cc.easeCubicActionInOut())
    var rotate1 = cc.rotateBy(1.0, 180)
    var rotate2 = cc.rotateBy(1.0, -180)
    var swingLeft = cc.moveBy(2.0, cc.v2(this.enemySwing1.x - this.enemySwing2.x, 0)).easing(cc.easeCubicActionInOut())
    // 不断重复
    this.enemySwing1.runAction(cc.repeatForever(cc.sequence(swingRight, rotate1, swingLeft, rotate2)))
    this.enemySwing2.runAction(cc.repeatForever(cc.sequence(swingLeft, rotate2, swingRight, rotate1)))

    this.schedule(this.explosion, 3)
  },

  /*
     * 初始化按键函数
     * 功能：初始化按钮的回调函数
     */
  setBtn () {
    this.startBtn.node.on('click', function () {
      var sceneName = cc.director._loadingScene
      if (sceneName !== 'Selection') {
        cc.director.loadScene('Selection')
      }
    }, this)
    this.helpBtn.node.on('click', function () {
      var sceneName = cc.director._loadingScene
      if (sceneName !== 'Help') {
        cc.director.loadScene('Help')
      }
    }, this)
  },

  /*
     * 开始函数
     * 功能：当开始按键被按下时，加载下一个场景
     */
  startClick () {
    var sceneName = cc.director.getScene().name
    if (sceneName !== 'Selection') {
      cc.director.loadScene('Selection')
    }
  },

  /*
     * 爆炸函数
     * 功能：设置动画中的爆炸效果
     */
  explosion () {
    const blast = cc.instantiate(this.BlastPrefab1)
    this.node.addChild(blast)
    blast.setPosition(this.player1.x, this.player1.y)
    const animComponent = blast.getComponent(cc.Animation)
    animComponent.play('blast1')

    const blast2 = cc.instantiate(this.BlastPrefab2)
    this.node.addChild(blast2)
    blast2.setPosition(this.player2.x, this.player2.y)
    const animComponent2 = blast2.getComponent(cc.Animation)
    animComponent2.play('blast2')
  },

  start () {},

  /*
     * 更新旋转函数
     * 功能：使UI动画中的对象发生旋转
     */
  updateRotatation () {
    var newDegree = this.enemyStatic.rotation + (10 / Math.PI)
    this.enemyStatic.rotation = newDegree > 360 ? newDegree - 360 : newDegree
    this.enemySpin.rotation = newDegree > 360 ? newDegree - 360 : newDegree

    this.spinDegree += 0.3
    this.spinDegree = this.spinDegree > 360 ? this.spinDegree - 360 : this.spinDegree
    this.enemySpin.x = this.enemyStatic.x + 135 * Math.sin(this.spinDegree * Math.PI / 180)
    this.enemySpin.y = this.enemyStatic.y + 135 * Math.cos(this.spinDegree * Math.PI / 180)
  },

  // 系统调用的更新函数
  update (dt) {
    this.updateRotatation()
  }
})
