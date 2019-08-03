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
  //订单详情
  orderDetail(){
    wx.request({
      url: api.orderDetail(this.data.orderid),
      success:res=>{
        console.log(res)
        this.setData({
          orderDetail:res.data.datas
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id: options.id,
      orderid: options.orderId
    })
    this.orderDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.avtiveDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //清除定时器
    console.log('清除定时器')
    clearInterval(this.data.intervalId)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //清除定时器
    console.log('清除定时器')
    clearInterval(this.data.intervalId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})