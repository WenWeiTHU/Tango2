(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9edacm/KdxNBJfVQ66kry1A', 'Game', __filename);
// scripts/Game/Game.js

'use strict';

/*
 * 关卡模式控制脚本
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
    },
    SupplyPrefab: {
      default: null,
      type: cc.Prefab
    },
    ShieldSupplyPrefab: {
      default: null,
      type: cc.Prefab
    },
    PauseMenuPrefab: {
      default: null,
      type: cc.Prefab
    },
    EnemyPrefab: {
      type: cc.Prefab,
      default: null
    },
    StaticEnemyPrefab: {
      type: cc.Prefab,
      default: null
    },
    TrackEnemyPrefab: {
      type: cc.Prefab,
      default: null
    },
    SpinEnemyPrefab: {
      type: cc.Prefab,
      default: null
    },
    SwingEnemyPrefab: {
      type: cc.Prefab,
      default: null
    },
    CopterEnemyPrefab: {
      type: cc.Prefab,
      default: null
    },
    BatteryPrefab: {
      type: cc.Prefab,
      default: null
    },
    BulletPrefab: {
      type: cc.Prefab,
      default: null
    },
    MapVPrefab: {
      type: cc.Prefab,
      default: null
    },
    MapHPrefab: {
      type: cc.Prefab,
      default: null
    },
    Explode1: {
      type: cc.AudioSource,
      default: null
    },
    pauseBtn: {
      type: cc.Button,
      default: null
    },
    MapCamera: {
      type: cc.Camera,
      default: null
    },
    MainCamera: {
      type: cc.Camera,
      default: null
    },
    Target: {
      type: cc.Node,
      default: null
    },
    srcX: 0, // 相机移动初始位置
    srcY: 0,
    dstX: 0, // 相机移动最终位置
    dstY: 0,
    cameraSpeed: 0, // 相机移动速度
    ratio: 0, // 相机放缩比
    stateChange: false // 暂停状态记录
  },

  /*
     * 游戏结束函数
     * 功能：执行游戏结束的动作，设置定时器缩小相机焦距，
     *      并且准备定时加载场景，将游戏状态设成结束
     */
  GameOver: function GameOver() {
    var _this = this;

    this.schedule(function () {
      _this.MainCamera.zoomRatio -= 0.008;
    }, 0.001);

    this.scheduleOnce(function () {
      cc.director.loadScene('Transition');
    }, 2);

    this.end = true;
  },

  /*
     * 初始化函数
     * 功能：初始化脚本所需的设定
     */
  onLoad: function onLoad() {
    // 设置暂停按钮的回调函数
    this.pauseBtn.node.on('click', this.pauseScene, this);

    // 设置各个游戏对象的zIndex，确保显示层级的正确
    for (var i = 0; i < this.node.children.length; ++i) {
      switch (this.node.children[i].name) {
        case 'player1':
          {
            this.node.children[i].zIndex = 100;
            break;
          }
        case 'player2':
          {
            this.node.children[i].zIndex = 100;
            break;
          }
        case 'stickLeft':
        case 'stickRight':
          {
            this.node.children[i].zIndex = 101;
            break;
          }
        case 'bg':
          {
            this.node.children[i].zIndex = -100;
            break;
          }
      }
    }
    this.node.sortAllChildren();
  },
  start: function start() {
    // 将游戏结束状态参数设成假
    this.end = false;

    // 将游戏状态改变变量设成假
    this.stateChange = false;

    // 设定全景相机的移动
    this.cameraMove(this.srcX, this.srcY, this.dstX, this.dstY, this.ratio);
  },


  /*
     * 暂停函数
     * 功能：暂停/恢复当前场景，并设置其每一个子节点的运行状态
     */
  pauseScene: function pauseScene() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        // 遍历Canvas的每一个子节点，将其设为活跃/不活跃状态
        switch (child.name) {
          case 'Enemy':
          case 'Map':
          case 'player1':
          case 'player2':
          case 'bullet':
          case 'bind':
            {
              // 普通对象直接根据暂停还是恢复来设置活跃状态
              child.active = this.pause;
              break;
            }
          case 'target':
            {
              // 将暂停前的target活跃状态记录，并在恢复时进行恢复
              if (!this.pause) {
                this.targetExist = child.active;
                child.active = false;
              } else {
                child.active = this.targetExist;
              }
              break;
            }
          case 'UI':
            {
              /*
                         * 以下函数有些繁琐，目的是为了记录护盾对象
                         * 的存在状态，并在恢复时进行恢复。同时，由于
                         * 护盾本身存在寿命，所以我们对恢复后的寿命给
                         * 出一个统计的平均数——2.5s
                         */
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = child.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var grandSon = _step2.value;

                  if (grandSon.group !== 'Shield') {
                    grandSon.active = this.pause;
                  } else {
                    if (!this.pause) {
                      grandSon.exist = grandSon.active;
                      grandSon.active = false;
                      if (grandSon.timeID) {
                        clearTimeout(grandSon.timeID);
                        grandSon.timeID = undefined;
                      }
                    } else {
                      grandSon.active = grandSon.exist;
                      grandSon.exist = false;
                      if (grandSon.active) {
                        if (grandSon.name === 'shieldLeft') {
                          grandSon.timeID = setTimeout(function () {
                            this.active = false;
                          }.bind(this.node.getChildByName('UI').getChildByName('shieldLeft')), 2500);
                        } else {
                          grandSon.timeID = setTimeout(function () {
                            this.active = false;
                          }.bind(this.node.getChildByName('UI').getChildByName('shieldRight')), 2500);
                        }
                      }
                    }
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              break;
            }
        }
      }

      // 修改场景的暂停状态
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.pause = !this.pause;

    if (this.pause) {
      // 如果当前操作是要暂停此场景
      // 则要显示一个暂停菜单
      var Menu = cc.instantiate(this.PauseMenuPrefab);
      Menu.x = 0;
      Menu.y = 0;
      Menu.group = 'UI';
      this.node.getChildByName('UI').active = true;
      this.node.getChildByName('UI').addChild(Menu);
    }
  },


  /*
     * 相机移动功能
     * 功能：定时缩放相机的焦距和移动相机的焦点，
     *      使得玩家在开场前可以总览地图全局面貌
     */
  cameraMove: function cameraMove(srcx, srcy, dstx, dsty, initRatio) {
    this.MapCamera.node.x = srcx;
    this.MapCamera.node.y = srcy;

    var x = dstx - srcx;
    var y = dsty - srcy;

    this.scheduleOnce(function () {
      this.schedule(function () {
        if (this.MapCamera.zoomRatio > 1) {
          this.MapCamera.node.active = false;
        } else {
          this.MapCamera.zoomRatio += this.cameraSpeed;
          this.MapCamera.node.x += x * this.cameraSpeed / (1 - initRatio);
          this.MapCamera.node.y += y * this.cameraSpeed / (1 - initRatio);
        }
      }, 0.0001);
    }, 0.8);
  },


  // 系统调用的更新函数
  update: function update(dt) {
    if (this.end) {
      // 如果检测到游戏已经结束，则停止更新
      return;
    }

    if (this.stateChange && !this.end) {
      // 如果检测到游戏状态发生改变（从子部件处设此变量为真），
      // 则调用暂停函数，并恢复stateChange变量为假
      this.pauseScene();
      this.stateChange = false;
    }

    if (this.Player1.getComponent('Player').Dead && !this.end) {
      // 如果检测到玩家死亡，则游戏结束，并且立即返回
      this.GameOver();
      return;
    }
    if (this.Player2.getComponent('Player').Dead && !this.end) {
      this.GameOver();
      return;
    }

    if (this.Target.getComponent('Target').win && !this.end) {
      // 如果检测到玩家通关，则游戏结束
      var stageName = cc.director.getScene().name;
      if (stageName === 'Stage12') {
        // 如果当前是最后一关，则调用结束字幕
        cc.director.loadScene('End');
        return;
      }
      // 否则进入正常的游戏结束函数
      this.GameOver();
    }
  }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        