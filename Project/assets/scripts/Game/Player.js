/*
 * 主角脚本
 */

cc.Class({
  extends: cc.Component,

  properties: {
    life: 3, // 主角生命
    shield: 3, // 主角护盾数
    immortalDuration: 2, // 碰撞后的短暂无敌时间
    speed: 5, // 主角速度
    Dead: false,
    BlastPrefab: {
      type: cc.Prefab,
      default: null
    },
    // 音效
    PlayerHit: {
      type: cc.AudioSource,
      default: null
    },
    Death: {
      type: cc.AudioSource,
      default: null
    },
    Bonus: {
      type: cc.AudioSource,
      default: null
    },
    LifeLabel: {
      type: cc.Label,
      default: null
    },
    ShieldLabel: {
      type: cc.Label,
      default: null
    }

  },

  // LIFE-CYCLE CALLBACKS:
  onLoad () {
    // 开启碰撞检测
    cc.director.getCollisionManager().enabled = true
  },

  start () {
    this.blastName = 'blast' + this.node.name[6]
    this.immortal = false
    this.collideMap = false
    this.lifeLabel = this.LifeLabel.getComponent(cc.Label)
    this.lifeLabel.string = this.life
    this.shieldLabel = this.ShieldLabel.getComponent(cc.Label)
    this.shieldLabel.string = this.shield
  },

  /*
     * 角色的碰撞事件
     */
  onCollisionEnter (other, self) {
    // 获取碰撞对象的类型
    var group = other.node.group
    switch (group) {
      case 'Map': {
        // 当碰到的是地图边界时
        this.collideMap = true
        this.mapCollision(other)
        break
      }
      case 'Enemy': {
        // 当碰到了敌人时
        this.enemyCollision(other)
        break
      }
      case 'Supply': {
        // 当碰到了补给
        if (other.node._name === 'supply') {
          this.life++
        } else if (other.node._name === 'shieldSupply') {
          this.shield++
        }
        this.Bonus.play()
        break
      }
      case 'Bullet': {
        // 当碰到了子弹
        var blast = cc.instantiate(this.BlastPrefab)
        this.node.parent.addChild(blast)
        blast.setPosition(this.node.x, this.node.y)
        var animComponent = blast.getComponent(cc.Animation)
        animComponent.play(this.blastName)

        this.PlayerHit.play()

        this.lostLife()
        break
      }
      default: {
        // Others
        break
      }
    }
  },

  onCollisionStay (other, self) {
    // 获取碰撞对象的类型
    var group = other.node.group
    switch (group) {
      case 'Map': {
        // 当碰到的是地图边界时
        this.collideMap = true
        this.mapCollision(other)
        break
      }
      default: {
        // Others
        break
      }
    }
  },

  onCollisionExit (other, self) {
    var group = other.node.group
    switch (group) {
      case 'Map': {
        // 当碰到的是地图边界时
        this.collideMap = false
        break
      }
      default: {
        // Others
        break
      }
    }
  },

  // 根据主角当前状态确定是否扣血
  lostLife () {
    // 若刚损失一条命，处于暂时无敌状态
    if (!this.immortal) {
      this.life--
      this.immortal = true
      if (this.life < 0) {
        this.life = 0
        this.GameOver()
        return
      }

      // 主角死亡闪烁表示处于无敌状态
      var action = cc.sequence(cc.fadeOut(0.125), cc.fadeIn(0.125)).repeat(this.immortalDuration / 0.25)
      this.node.runAction(action)

      setTimeout(function () {
        this.immortal = false
      }.bind(this), 1000 * this.immortalDuration)
    }
  },

  GameOver () {
    var sceneName = cc.director.getScene().name
    var data = {
      Stage: sceneName,
      Win: false
    }
    cc.sys.localStorage.setItem('lastStage', JSON.stringify(data))
    this.Dead = true
  },

  /*
     * 与地图的碰撞事件
     */
  mapCollision (objMap) {
    var name = objMap.node._name
    // 直接回弹
    switch (name) {
      case 'mapV': {
        if (objMap.node.x < this.node.x) {
          this.node.x = this.node.x + this.speed + 1
        } else if (objMap.node.x > this.node.x) {
          this.node.x = this.node.x - this.speed - 1
        }

        break
      }
      case 'mapH': {
        if (objMap.node.y < this.node.y) {
          this.node.y = this.node.y + this.speed + 1
        } else if (objMap.node.y > this.node.y) {
          this.node.y = this.node.y - this.speed - 1
        }
      }
    }
  },

  /*
     * 与敌人的碰撞事件
     */
  enemyCollision (objEnemy) {
    var name = objEnemy.node.name
    switch (name) {
      // 直接回弹
      case 'battery': {
        this.speedX = -this.speedX
        this.speedY = -this.speedY
        break
      }
      // 生命减少
      case 'enemy':
      case 'enemy_static':
      case 'enemy_spin':
      case 'enemy_swing':
      case 'enemy_copter':
      case 'enemy_track': {
        var blast = cc.instantiate(this.BlastPrefab)
        this.node.parent.addChild(blast)
        blast.setPosition(this.node.x, this.node.y)

        var animComponent = blast.getComponent(cc.Animation)
        animComponent.play(this.blastName)

        this.PlayerHit.play()

        this.lostLife()
        break
      }
    }
  },

  update (dt) {
    // 生命值更新
    this.lifeLabel.string = this.life
    this.shieldLabel.string = this.shield
  }
})
