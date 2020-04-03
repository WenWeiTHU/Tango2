/*
 * 追踪敌人脚本
 */

cc.Class({
  extends: require('Enemy'),

  properties: {
    Player: {
      type: cc.Node,
      default: null
    },
    maxSpeed: 400, // 最大速度
    iniAccel: 0.01 // 追踪初始加速度
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
  start () {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true

    // 设置初速度为0
    this.speedX = 0
    this.speedY = 0
  },

  /*
     * 追踪位置函数
     * 功能：计算出对象与主角的方向，然后更新对象的速度和位置
     */
  track (dt) {
    this.dir = cc.v2(this.Player.x - this.node.x, this.Player.y - this.node.y)

    this.distance = this.dir.mag()

    if (Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2)) < this.maxSpeed) {
      this.speedX += this.iniAccel * dt
      this.speedY += this.iniAccel * dt
    }

    this.node.x += this.speedX * this.dir.x / this.distance
    this.node.y += this.speedY * this.dir.y / this.distance
  },

  update (dt) {
    this.rotate()
    this.track(dt)
  }
})
