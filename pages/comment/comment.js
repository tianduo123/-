// pages/comment/comment.js
let api = require('../../request/api.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: '',
    num: 0
  },
  //获取用户意见
  getUserComment(e) {
    console.log(e)
    this.setData({
      num: e.detail.value.length,
      val: e.detail.value
    })
  },
  //提交建议
  submit() {
    if (this.data.val.trim() && this.data.val.trim().length >= 10) {
      wx.showLoading({
        title: '提交中',
        success: () => {
          setTimeout(() => {
            wx.request({
              url: api.comment(),
              data:{
                content:this.data.val.trim(),
                openid:app.globalData.openid
              },
              method:'POST',
              success:res=>{
                console.log(res)
                if(res.data.status==1){
                  wx.showToast({
                    title: '提交成功',
                  })
                }else{
                  wx.showToast({
                    title: '提交失败，请重试',
                    icon:'none'
                  })
                }
              }
            })
            wx.hideLoading()
            this.setData({
              val: '',
              num: 0
            })
          }, 1000)
        }
      })
    } else if (this.data.val.trim().length > 0 && this.data.val.trim().length < 10) {
      wx.showToast({
        title: '请输入10个字以上哦',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请输入您的宝贵意见',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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