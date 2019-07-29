//index.js
//获取应用实例
let app = getApp()
let api  = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['省', '市', '县'],
    isHasAuthorization:false,
    page: 0,
    size: 3,
    address: 0
  },
  //用户授权
  getUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        isHasAuthorization:true
      })
      app.globalData.userInfo = e.detail.userInfo
      wx.request({
        url: api.saveUserInfo(app.globalData.openid, e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl) ,
        success:(res)=>{
          console.log(res)
          if(res.data.status==1){
            console.log('授权成功')
          }else{
            console.log('授权失败')
          }
        }
      })
    }
  },
  //选择活动地区
  bindRegionChange(e) {
    console.log(e)
    this.setData({
      region: e.detail.value,
      address:e.detail.value[0]+','+e.detail.value[1]+','+e.detail.value[2]
    })
    wx.showLoading({
      title: '获取中',
      success:()=>{
        setTimeout(()=>{
          wx.hideLoading()
          this.getActiveList(this.data.page, this.data.size, this.data.address)
        },1000)
      }
    })
  },
  //活动列表
  getActiveList(){
    wx.request({
      url: api.activeList(this.data.page,this.data.size,this.data.address),
      success:res=>{
        console.log(res)
        if(res.data.status==1){
          this.setData({
            activeList: res.data.datas
          })
        }else{
          console.log('查询失败')
          this.setData({
            activeList:''
          })
        }
  
      }
    })
  },
  //参加活动
  join(){
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../activeDetail/activeDetail',
      })
    }else{
      console.log('用户未授权')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgUrl:api.BASE_IMG
    })
    this.getActiveList()
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
  onShareAppMessage: function() {

  }
})