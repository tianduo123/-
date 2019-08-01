// pages/orderDetail/orderDetail.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
            isEnd: true
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
          endTime: res.data.datas.end_time.replace(/\-/g, '/')
        })
        this.djs()
      }
    })
  },
  //立即支付
  pay() {
    wx.request({
      url: api.pay(this.data.bh, app.globalData.openid, this.data.detail.price),
      success: res => {
        console.log(res)
        if (res.data.status == 2) {
          wx.showToast({
            title: '活动还没开始',
            icon: 'none'
          })
        } else if (res.data.status == 0) {
          wx.showToast({
            title: '该订单已经支付过',
            icon: 'none'
          })
        } else if (res.data.status == 3) {
          wx.showModal({
            title: '提示',
            content: '活动已结束，请浏览其他活动吧',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.showLoading({
                  title: '跳转中',
                  success: () => {
                    setTimeout(() => {
                      wx.hideLoading()
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }, 1000)
                  }
                })
              }
            }
          })
        } else {
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: 'prepay_id=' + res.data.prepayid,
            signType: 'MD5',
            paySign: res.data.sign,
            success: res => {
              console.log(res)
              wx.showToast({
                title: '支付成功',
                success: res => {
                  wx.showLoading({
                    title: '跳转中',
                    success: () => {
                      setTimeout(() => {
                        wx.hideLoading()
                        wx.switchTab({
                          url: '../index/index',
                        })
                      }, 1000)
                    }
                  })
                }
              })
            },
            fail: res => {
              console.log(res)
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })
            }
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
    this.setData({
      id: options.id,
      time: options.time,
      bh: options.bh
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})