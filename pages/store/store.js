// pages/store/store.js
let api = require('../../request/api.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelect: 0,
    page:0,
    size:5
  },
  //商家所有订单
  storeOrder(){
    wx.request({
      url: api.storeOrder(1,3,this.data.page,this.data.size),
      success:res=>{
        console.log(res)
        this.setData({
          notComplete:res.data.datas.no,
          complete:res.data.datas.yes
        })
      }
    })
  },
  //选择分类
  select(e) {
    console.log(e)
    this.setData({
      isSelect: e.currentTarget.dataset.status
    })
    this.storeOrder()
  },
  //核销订单
  hexiao(e){
    console.log(e)
    this.setData({
      order_bh:e.currentTarget.dataset.bh
    })
    wx.showModal({
      title: '订单核销',
      content: '确定核销该订单吗?核销后不可撤回',
      success:(res)=>{
        if(res.confirm){
          wx.showLoading({
            title: '正在核销',
            success:()=>{
              wx.request({
                url: api.hexiao(this.data.order_bh,1,3),
                success:res=>{
                  console.log(res)
                  if(res.data.status==1){
                    setTimeout(() => {
                      wx.hideLoading()
                      wx.showToast({
                        title: '核销成功',
                      })
                      this.storeOrder()
                    }, 1000)
                  }
                }
              })
            }
          })
        }else{
          console.log('取消核销')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      shopId:options.shopId,
      activeId:options.activeId,
      imgUrl: api.BASE_IMG
    })
    this.storeOrder()
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