// pages/youhuiDetail/youhuiDetail.js
let app = getApp()
let api = require('../../request/api.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  youhui() {
    wx.request({
      url: api.youhui(),
      success: res => {
        console.log(res)
        this.setData({
          detail: res.data.datas[1]
        })
        var article = JSON.parse(this.data.detail.content);
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    })
  },
  youhui2() {
    wx.request({
      url: api.youhui(),
      success: res => {
        console.log(res)
        this.setData({
          detail: res.data.datas[0]
        })
        var article = JSON.parse(this.data.detail.content);
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id==7){
      this.youhui()
    }else if(options.id==8){
      this.youhui2()
    }

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  onShareAppMessage: function () {

  }
})