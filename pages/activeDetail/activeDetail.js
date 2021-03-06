// pages/avtiveDetail/activeDetail.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    d: '',
    h: '',
    m: '',
    s: '',
    imgUrl: '',
    isHasAuthorization: false,
  },
  //用户授权
  getUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        isHasAuthorization: true
      })
      app.globalData.userInfo = e.detail.userInfo
      wx.request({
        url: api.saveUserInfo(app.globalData.openid, e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl),
        success: (res) => {
          // console.log(res)
          if (res.data.status == 1) {
            console.log('授权成功')
          } else {
            console.log('授权失败')
          }
        }
      })
    }
  },
  //活动商家列表
  shopList() {
    wx.request({
      url: api.shopList(this.data.id),
      success: res => {
        console.log(res)
        var arr = res.data.info
        var newArr = []
        for (var i = 0; i < arr.length; i += 8) {
          newArr.push(arr.slice(i, i + 8))
        }
        console.log(newArr)
        this.setData({
          newArr: newArr,
          tjArr: newArr[0]
        })
      }
    })
  },
  //活动商家详情
  toShopDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: `../shopDetail/shopDetail?shop_id=${e.currentTarget.dataset.id}`,
    })
  },
  //净水器活动
  toWater() {
    console.log('去净水器详情')
    wx.navigateTo({
      url: '../youhuiDetail/youhuiDetail?id=7',
    })
  },
  //打开活动规则
  openRule() {
    this.setData({
      isShow: true
    })
  },
  //关闭活动规则
  closeRule() {
    this.setData({
      isShow: false
    })
  },
  //积分排行
  rankList() {
    wx.request({
      url: api.rankList(),
      success: res => {
        console.log('积分排行榜', res)
        if (res.data.status == 1) {
          this.setData({
            rankList: res.data.info
          })
        } else {
          console.log('获取排行信息失败')
        }

      }
    })
  },
  //排行榜疑问
  question() {
    wx.showToast({
      title: '佣金前十名会进入排行榜哦！',
      icon: 'none'
    })
  },
  //倒计时函数
  djs() {
    this.setData({
      intervalId: setInterval(() => {
        var djs = new Date(this.data.endTime).getTime() - new Date().getTime()
        var d = parseInt(djs / 1000 / 60 / 60 / 24)
        var h = parseInt((djs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var m = parseInt((djs % (1000 * 60 * 60)) / (1000 * 60))
        var s = parseInt((djs % (1000 * 60)) / 1000)
        // console.log(d+'天'+h + '小时' + m + '分钟' + s + '秒')

        this.setData({
          d,
          h,
          m,
          s
        })
        if (djs < 0) {
          //活动已结束
          console.log('清除定时器')
          clearInterval(this.data.intervalId)
          this.setData({
            isEnd: true,
            d: '',
            h: '',
            m: '',
            s: ''
          })
        }
      }, 1000)
    })
  },
  //活动详情
  avtiveDetail() {
    wx.request({
      url: api.activeDetail(this.data.id, app.globalData.openid),
      success: res => {
        console.log(res)
        this.setData({
          detail: res.data.datas,
          endTime: res.data.datas.end_time.replace(/\-/g, '/'),
          isLike: res.data.datas.is_collect,
          danmuList: res.data.success
        })
        this.djs()
      }
    })
  },
  //下单
  pay() {
    wx.request({
      url: api.makeOrder(),
      data: {
        openid: app.globalData.openid,
        ord_goods: this.data.detail.title,
        activity_id: this.data.detail.id,
        nickname: app.globalData.userInfo.nickName,
        headimage: app.globalData.userInfo.avatarUrl,
        ord_price: this.data.detail.price,
        tuijian: this.data.tuijian
      },
      success: res => {
        wx.showLoading({
          title: '创建订单中',
        })
        console.log(res)
        if (res.data.status == 1) {
          setTimeout(() => {
            wx.hideLoading()
            wx.navigateTo({
              url: `../orderDetail/orderDetail?id=${res.data.datas.activity_id}&time=${res.data.datas.add_time}&bh=${res.data.datas.ord_bh}`,
            })
          }, 1000)
        } else if (res.data.status == 0) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '后台发生了一个未知错误',
              icon: 'none'
            })
          }, 1000)
        } else if (res.data.status == 2) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '发生了一个未知错误',
              icon: 'none'
            })
          }, 1000)
        } else if (res.data.status == 3) {
          setTimeout(() => {
            wx.hideLoading()
            // wx.showToast({
            //   title: '该活动您有未支付的订单哦，快去支付吧',
            //   icon: 'none'
            // })
            wx.showModal({
              title: '提示',
              content: '该活动您已下单是否跳转到订单页?',
              success:re=>{
                if(re.confirm){
                  console.log('用户点击确定,跳转到订单页')
                  wx.navigateTo({
                    url: `../orderDetail/orderDetail?id=${res.data.activity_id}&orderid=${res.data.id}&bh=${res.data.ord_bh}`,
                  })
                }else{
                  console.log('用户点击取消')
                }
              }
            })
          }, 1000)
        } else if (res.data.status == 4) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '该活动还未开始哦',
              icon: 'none'
            })
          }, 1000)
        } else if (res.data.status == 6) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '该活动您已参加过，不能重复参加哦',
              icon: 'none'
            })
          }, 1000)
        } else if (res.data.status == 5) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '活动已结束',
              icon: 'none'
            })
          }, 1000)
        } else if (res.data.status == 7) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '系统繁忙，请稍后再试',
              icon: 'none'
            })
          }, 1000)
        } else {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '程序升级中,请稍后再试',
              icon: 'none'
            })
          }, 1000)
        }
      }
    })
  },
  //收藏
  like() {
    console.log('收藏')
    wx.request({
      url: api.like(app.globalData.openid, this.data.id),
      success: res => {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '收藏成功',
          })
          this.setData({
            isLike: 1
          })
        } else if (res.data.status == 0) {
          wx.showToast({
            title: '取消收藏成功',
          })
          this.setData({
            isLike: 0
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log(app.globalData.userInfo)
    //判断用户是否授权
    if (app.globalData.userInfo) {
      this.setData({
        isHasAuthorization: true
      })
    } else {
      console.log('用户未授权')
    }
    //判断有没有推荐人
    wx.getStorage({
      key: 'tuijianid',
      success: (res) => {
        console.log('有推荐人', res)
        this.setData({
          tuijian: res.data
        })
      },
      fail: () => {
        console.log('没有推荐人')
        this.setData({
          tuijian: ''
        })
      }
    })
    this.setData({
      id: options.id,
      imgUrl: api.BASE_IMG
    })
    this.shopList()
    this.rankList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.avtiveDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    //清除定时器
    console.log('清除定时器')
    clearInterval(this.data.intervalId)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //清除定时器
    console.log('清除定时器')
    clearInterval(this.data.intervalId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //刷新活动详情、商家详情、积分榜
    wx.showLoading({
      title: '正在刷新',
    })
    setTimeout(() => {
      this.avtiveDetail() //刷新活动详情
      this.shopList() //刷新合作商家列表
      this.rankList() //刷新积分排行榜
      wx.hideLoading() //隐藏Loading框
      wx.stopPullDownRefresh() //停止下拉效果
    }, 1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})