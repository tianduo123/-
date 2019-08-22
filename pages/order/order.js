// pages/order/order.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty: '',
    page: 0, //当前页码
    size: 100, //每页加载的订单数量
  },
  //选择订单状态
  select(e) {
    if (e.currentTarget.dataset.status == 4) {
      console.log('全部')
    } else if (e.currentTarget.dataset.status == 0) {
      console.log('待付款')
    } else if (e.currentTarget.dataset.status == 1) {
      console.log('待核销')
    } else if (e.currentTarget.dataset.status == 2) {
      console.log('已完成')
    } else {
      console.log('已失效')
    }
    this.setData({
      isSelect: e.currentTarget.dataset.status
    })
    wx.showLoading({
      title: '查询中',
      success:res=>{
        setTimeout(()=>{
          this.orderList()
          wx.hideLoading()
        },1000)
      }
    })
  },
  //订单列表
  orderList() {
    wx.request({
      url: api.orderList(this.data.page, this.data.size, app.globalData.openid, this.data.isSelect),
      success: res => {
        console.log(res)
        if (res.data.status == 1) {
          //获取订单列表成功
          this.setData({
            orderList: res.data.datas
          })
        } else {
          //获取订单列表失败
          this.setData({
            orderList: ''
          })
        }
      }
    })
  },
  //订单详情
  orderDetail(e) {
    console.log(e)
    if (e.currentTarget.dataset.status == 0) {
      wx.navigateTo({
        url: `../orderDetail/orderDetail?id=${e.currentTarget.dataset.id}&bh=${e.currentTarget.dataset.bh}&time=${e.currentTarget.dataset.time}`,
      })
    } else {
      console.log('带核销、已完成、已失效')
      wx.navigateTo({
        url: `../orderDetail2/orderDetail2?id=${e.currentTarget.dataset.id}&orderId=${e.currentTarget.dataset.orderid}`,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      isSelect: options.status,
      imgUrl: api.BASE_IMG
    })
    wx.showLoading({
      title: '查询中',
      success:res=>{
        setTimeout(()=>{
          this.orderList()
          wx.hideLoading()
        },1000)
      }
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
    this.orderList()
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
      this.orderList()
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
   */
  // onShareAppMessage: function() {

  // }
})