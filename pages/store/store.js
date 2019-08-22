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
    size:100,
    hasOrder: true,
    userval:''
  },
  //获取用户输入
  getUserval(e){
    // console.log(e)
    this.setData({
      userval:e.detail.value
    })
  },
  //搜索订单
  search(){
    wx.request({
      url: api.storeOrder(this.data.activeId, this.data.shopId, this.data.page, this.data.size, this.data.userval),
      success:res=>{
        console.log(res)
        //清空用户输入
        this.setData({
          userval:''
        })
        wx.showLoading({
          title: '查询中',
        })
        setTimeout(()=>{
          if (res.data.status == 0) {
            //获取失败，暂无订单、
            wx.showToast({
              title: '很抱歉,没有查到相关订单',
              icon: 'none'
            })
          } else {
            wx.hideLoading()
            this.setData({
              notComplete: res.data.datas.no,
              complete: res.data.datas.yes
            })
          }
        },1000)
      }
    })
  },
  //商家所有订单
  storeOrder(){
    wx.request({
      url: api.storeOrder(this.data.activeId,this.data.shopId,this.data.page,this.data.size,''),
      success:res=>{
        console.log('活动id',this.data.activeId, '店铺id',this.data.shopId,this.data.page, this.data.size)
        console.log(res)
        if(res.data.status==1){
          this.setData({
            notComplete: res.data.datas.no,
            complete: res.data.datas.yes
          })
        }else{
          //该商家暂无订单
          this.setData({
            hasOrder:false
          })
        }
      }
    })
  },
  //选择分类
  select(e) {
    console.log(e)
    wx.showLoading({
      title: '查询中请稍后',
    })
    setTimeout(()=>{
      this.setData({
        isSelect: e.currentTarget.dataset.status
      })
      this.storeOrder()
      wx.hideLoading()
    },1000)
 
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
                url: api.hexiao(this.data.order_bh, this.data.activeId, this.data.shopId),
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
      shopId: options.shopId,
      activeId: options.activeId,
      imgUrl: api.BASE_IMG
    })
    wx.getStorage({
      key: 'shop_id',
      success: (res) => {
        console.log('这是缓存中的shop_id',res)
        this.setData({
          shopId: res.data
        })
      },
    })
    wx.getStorage({
      key: 'active_id',
      success: (res) => {
        console.log('这是缓存中的actice_id',res)
        this.setData({
          activeId: res.data
        })
      },
    })
    wx.showLoading({
      title: '正在查询',
    })
    setTimeout(()=>{
      wx.hideLoading()
      this.storeOrder()
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
    // this.storeOrder()
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
      this.storeOrder()
      wx.hideLoading()
      wx.stopPullDownRefresh()
      this.setData({
        userval:''
      })
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