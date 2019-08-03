// pages/me/me.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/icon/avatar.svg',
    nickName: '点击登录'
  },
  //用户授权
  getUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.request({
        url: api.saveUserInfo(app.globalData.openid, e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl),
        success: (res) => {
          console.log(res)
          if (res.data.status == 1) {
            console.log('授权成功')
          } else {
            console.log('授权失败')
          }
        }
      })
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      })
    }
  },
  //判断用户是否授权函数
  hasAuthorization(){
    if(app.globalData.userInfo){
      return true
    }else{
      return false
    }
  },
  //去订单页
  toOrder(e) {
    if (this.hasAuthorization()) {
      // console.log(e)
      wx.navigateTo({
        url: `../order/order?status=${e.currentTarget.dataset.status}`,
      })
    } else {
      console.log('用户未授权')
    }

  },
  //我的积分
  myJf(){
    wx.request({
      url: api.myJf(app.globalData.openid),
      success:res=>{
        console.log(res)
        if(res.data.status==1){
          this.setData({
            jf:res.data.info
          })
        }else{
          this.setData({
            jf:''
          })
        }
      }
    })
  },
  //我的积分列表
  myMoney(){
    if(this.hasAuthorization()){
      wx.navigateTo({
        url: '../myMoney/myMoney',
      })
    }else{
      console.log('用户未授权')
    }
  },
  //关于积分
  aboutJf(){
    if(this.hasAuthorization()){
      this.setData({
        isShow:true
      })
    }else{
      console.log('用户未授权')
    }
  },
  //关闭积分
  closeRule(){
    this.setData({
      isShow:false
    })
  },
  //佣金提现
  // getMoney() {
  //   if (this.hasAuthorization()) {
  //     wx.showModal({
  //       title: '佣金提现',
  //       content: '确定将佣金全部提现吗?',
  //       success: (res) => {
  //         if (res.confirm) {
  //           wx.showLoading({
  //             title: '提现请求中',
  //           })
  //           setTimeout(() => {
  //             wx.hideLoading()
  //             wx.showToast({
  //               title: '提现成功,预计2小时到账',
  //               icon: 'none'
  //             })
  //           }, 1000)
  //         } else {
  //           console.log('取消提现')
  //         }
  //       }
  //     })
  //   } else {
  //     console.log('用户未授权')
  //   }

  // },
  //我的收藏
  myCollect(){
    if(this.hasAuthorization()){
      wx.navigateTo({
        url: '../myCollect/myCollect',
      })
    }else{
      console.log('用户未授权')
    }
  },
  //商家入口
  store(){
    if(this.hasAuthorization()){
      /*
        通过缓存判断该商家有没有登录过
          --> 登录过直接跳转到商家订单页
          --> 没登录过跳转到商家登录页
       */
      wx.getStorage({
        key: 'isLogin',
        success:(res)=>{
          console.log(res)
            console.log('跳转到商家订单页')
            wx.getStorage({
              key: 'shop_id',
              success:(res)=>{
                console.log(res)
                this.setData({
                  shop_id:res.data
                })
              },
            })
            wx.getStorage({
              key: 'active_id',
              success:(res)=>{
                this.setData({
                  active_id:res.data
                })
              },
            })
            wx.navigateTo({
              url: `../store/store?shopId=${this.data.shop_id}&activeId=${this.data.active_id}`,
            })
        },
        fail:res=>{
          console.log('没有isLogin缓存')
          wx.navigateTo({
            url: '../storeLogin/storeLogin',
          })
        }
      })

    }else{
      console.log('用户未授权')
    }
  },
  //投诉反馈
  comment(){
    if(this.hasAuthorization()){
      wx.navigateTo({
        url: '../comment/comment',
      })
    }else{
      console.log('用户未授权')
    }
  },
  //我的推荐码
  aboutUs(){
    if(this.hasAuthorization()){
      wx.navigateTo({
        url: '../aboutUs/aboutUs',
      })
    }else{
      console.log('用户未授权')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.myJf()
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
    if(this.hasAuthorization()){
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName
      })
    }else{
      console.log('用户未授权')
    }
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