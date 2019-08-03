// pages/storeLogin/storeLogin.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60,
    msg: '获取验证码',
    phone: '',
    code: ''
  },
  //倒计时函数
  djs() {
    var intervalId = setInterval(() => {
      this.setData({
        time: this.data.time - 1
      })
      // console.log(this.data.time)
      if (this.data.time < 0) {
        clearInterval(intervalId)
        this.setData({
          sendCode: false,
          time: 5
        })
      }
    }, 1000)
  },
  //获取用户输入手机号
  getPhone(e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  //获取用户输入验证码
  getCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取验证码
  sendCode() {
    console.log('发送验证码')
    wx.request({
      url: api.storeLogin(),
      data: {
        phone: this.data.phone
      },
      method: 'POST',
      success: res => {
        // console.log(res)
        if (res.data.status == 2) {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none'
          })
        } else if (res.data.status == 0) {
          wx.showToast({
            title: '当前手机号未开通商家权限哦',
            icon: 'none'
          })
        } else {
          //将商家id与活动id存入缓存
          wx.setStorage({
            key: 'shop_id',
            data: res.data.datas.id
          })
          wx.setStorage({
            key: 'active_id',
            data: res.data.datas.activity_id,
          })

          this.setData({
            shop_id:res.data.datas.id,
            active_id:res.data.datas.activity_id
          })
          wx.request({
            url: api.getCode(),
            data: {
              phone: this.data.phone
            },
            method: 'POST',
            success: res => {
              console.log(res)
              wx.showToast({
                title: '已发送',
                icon: 'none'
              })
              this.setData({
                sendCode: true,
                serverCode: res.data.code
              })
              this.djs()
            }
          })
        }
      }
    })
  },
  //登录
  login() {
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (!this.data.code) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none'
      })
    } else if (this.data.code != this.data.serverCode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
    } else {
      // console.log('登录成功')
      wx.showLoading({
        title: '正在登录',
      })
      setTimeout(() => {
        wx.hideLoading()
        wx.navigateTo({
          url: `../store/store?shopId=${this.data.shop_id}&activeId=${this.data.active_id}`,
          success: () => {
            this.setData({
              phone: '',
              code: ''
            })
            //登录成功后将商家信息存入缓存，每次点击商家入口先判断有没有缓存
              //有缓存 --> 直接跳转到商家订单页
              //没有缓存 --> 跳转到商家登录页
            wx.setStorage({
              key: 'isLogin',
              data: true,
            })
          }
        })
      }, 1000)
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