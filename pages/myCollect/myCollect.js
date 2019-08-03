// pages/myCollect/myCollect.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:'',
    page:0,
    size:10,
    imgUrl:''
  },
  //我的收藏
  myLike(){
    wx.request({
      url: api.myLike(app.globalData.openid,this.data.page,this.data.size),
      success:res=>{
        console.log(res)
        if(res.data.status==1){
          this.setData({
            collectList:res.data.info
          })
        }else{
          console.log('暂无收藏')
        }
      }
    })
  },
  //收藏详情
  toDetail(e){
    wx.navigateTo({
      url: `../activeDetail/activeDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //逛一逛
  shopping(){
    wx.showLoading({
      title: '跳转中...',
    })
    setTimeout(()=>{
      wx.reLaunch({
        url: '/pages/index/index',
        success: () => {
          wx.hideLoading()
        }
      })
    },1000)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myLike()
    this.setData({
      imgUrl: api.BASE_IMG
    })
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
    wx.showLoading({
      title: '正在刷新',
    })
    setTimeout(()=>{
      this.myLike()
      wx.hideLoading()
      wx.stopPullDownRefresh()
    },1000)
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