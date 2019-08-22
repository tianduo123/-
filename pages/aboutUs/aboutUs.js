// pages/aboutUs/aboutUs.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'qrcode',
      success:(res)=>{
        console.log(res)
        if(res.data){
          this.setData({
            qrcode:res.data
          })
        }
      },
    })
    setTimeout(()=>{
      if(this.data.qrcode){
        console.log('缓存中存在推荐码')
      }else{
        wx.showLoading({
          title: '推荐码生成中...',
        })
        console.log('缓存中没有推荐码')
        wx.request({
          url: api.makeCode(app.globalData.openid, app.globalData.userInfo.avatarUrl),
          success: res => {
            console.log(res)
            if (res.statusCode==200) {
              wx.hideLoading()
              this.setData({
                qrcode: res.data
              })
              //将二维码存到缓存
              wx.setStorage({
                key: 'qrcode',
                data: this.data.qrcode,
              })
            } else {
              wx.showToast({
                title: '推荐码生成失败，请稍后再试',
                icon: 'none'
              })
            }
          }
        })
      }

    },1000)

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
  // onShareAppMessage: function () {

  // }
})