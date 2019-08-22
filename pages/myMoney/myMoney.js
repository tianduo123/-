// pages/myMoney/myMoney.js
let api = require('../../request/api.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect: 0,
    page: 0,
    size: 100
  },
  //选择分类
  select(e) {
    this.setData({
      isSelect: e.currentTarget.dataset.status
    })
    wx.showLoading({
      title: '查询中',
    })
    setTimeout(()=>{
      if (this.data.isSelect == 0) {
        this.getRecord()
        wx.hideLoading()
      } else if (this.data.isSelect == 1) {
        this.outRecord()
        wx.hideLoading()
      }
    }, 1000)
  },
  //佣金获取记录
  getRecord() {
    wx.request({
      url: api.getRecord(app.globalData.openid, this.data.page, this.data.size),
      success: res => {
        console.log('佣金获取记录',res)
        if(res.data.status==1){
          console.log('获取成功')
          this.setData({
            getRecord: res.data.info,
            isEmpty:false
          })
        }else{
          console.log('获取失败')
          this.setData({
            isEmpty:true
          })
        }

      }
    })
  },
  //积分提现记录
  outRecord() {
    wx.request({
      url: api.outRecord(app.globalData.openid, this.data.page, this.data.size),
      success: res => {
        console.log(res)
        if(res.data.status==1){
          console.log('获取成功')
          this.setData({
            outRecord: res.data.info,
            isEmpty:false
          })
        }else{
          console.log('获取失败')
          this.setData({
            isEmpty:true
          })
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getRecord()
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '正在刷新',
    })
    setTimeout(()=>{
      if (this.data.isSelect == 0){
        this.getRecord()
      }else{
        this.outRecord()
      }
      wx.hideLoading()
      wx.stopPullDownRefresh()      
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
  //  */
  // onShareAppMessage: function() {

  // }
})