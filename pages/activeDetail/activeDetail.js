// pages/avtiveDetail/activeDetail.js
let app = getApp()
let api = require('../../request/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    d: '',
    h: '',
    m: '',
    s: '',
    imgUrl:'',
    isHasAuthorization:false
  },
  //用户授权
  getUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        isHasAuthorization: true
      })
      app.globalData.userInfo = e.detail.userInfo
      wx.request({
        url: api.saveUserInfo(app.globalData.openid, e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl),
        success: (res) => {
          // console.log(res)
          if (res.data.status == 1) {
            console.log('授权成功')
          } else {
            console.log('授权失败')
          }
        }
      })
    }
  },
  //活动商家列表
  shopList(){
    wx.request({
      url: api.shopList(this.data.id),
      success:res=>{
        console.log(res)
        var arr = res.data.info
        var newArr = []
        for(var i=0;i<arr.length;i+=8){
          newArr.push(arr.slice(i,i+8))
        }
        console.log(newArr)
        this.setData({
          newArr:newArr
        })
      }
    })
  },
  //活动商家详情
  toShopDetail(e){
    console.log(e)
    wx.navigateTo({
      url: `../shopDetail/shopDetail?shop_id=${e.currentTarget.dataset.id}`,
    })
  },
  //打开活动规则
  openRule() {
    this.setData({
      isShow: true
    })
  },
  //关闭活动规则
  closeRule() {
    this.setData({
      isShow: false
    })
  },
  //排行榜疑问
  question() {
    wx.showToast({
      title: '佣金前十名会进入排行榜哦！',
      icon: 'none'
    })
  },
  //倒计时函数
  djs() {
    this.setData({
      intervalId: setInterval(() => {
        var djs = new Date(this.data.endTime).getTime() - new Date().getTime()
        var d = parseInt(djs / 1000 / 60 / 60 / 24)
        var h = parseInt((djs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var m = parseInt((djs % (1000 * 60 * 60)) / (1000 * 60))
        var s = parseInt((djs % (1000 * 60)) / 1000)
        // console.log(d+'天'+h + '小时' + m + '分钟' + s + '秒')

        this.setData({
          d,
          h,
          m,
          s
        })
        if(djs<0){
          //活动已结束
          console.log('清除定时器')
          clearInterval(this.data.intervalId)
          this.setData({
            isEnd:true,
            d: '',
            h: '',
            m: '',
            s: ''
          })
        }
      }, 1000)
    })
  },
  //活动详情
  avtiveDetail() {
    wx.request({
      url: api.activeDetail(this.data.id, app.globalData.openid),
      success: res => {
        console.log(res)
        this.setData({
          detail: res.data.datas,
          endTime: res.data.datas.end_time.replace(/\-/g, '/'),
          isLike: res.data.datas.is_collect
        })
        this.djs()
      }
    })
  },
  //下单
  pay() {
    wx.request({
      url: api.makeOrder(),
      data: {
        openid: app.globalData.openid,
        ord_goods: this.data.detail.title,
        activity_id: this.data.detail.id,
        nickname: app.globalData.userInfo.nickName,
        headimage: app.globalData.userInfo.avatarUrl,
        ord_price: this.data.detail.price,
        tuijian: app.globalData.shareUserId
      },
      success: res => {
        wx.showLoading({
          title: '创建订单中',
        })
        console.log(res)
        if (res.data.status == 1) {
          setTimeout(() => {
            wx.hideLoading()
            wx.navigateTo({
              url: `../orderDetail/orderDetail?id=${res.data.datas.activity_id}&time=${res.data.datas.add_time}&bh=${res.data.datas.ord_bh}`,
            })
          }, 1000)
        }
        else if (res.data.status == 0 || res.data.status == 2) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '发生了一个未知错误',
              icon: 'none'
            })
          }, 1000)
        }
        else if (res.data.status == 3) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '该活动您有未支付的订单哦，快去支付吧',
              icon: 'none'
            })
          }, 1000)
        }
        else if (res.data.status == 4) {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '该活动还未开始哦',
              icon: 'none'
            })
          }, 1000)
        }
        else {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '活动已结束',
              icon: 'none'
            })
          }, 1000)
        }
      }
    })
  },
  //收藏
  like(){
    console.log('收藏')
    wx.request({
      url: api.like(app.globalData.openid,this.data.id),
      success:res=>{
        console.log(res)
        if(res.data.status==1){
          wx.showToast({
            title: '收藏成功',
          })
          this.setData({
            isLike:1
          })
        }else if(res.data.status==0){
          wx.showToast({
            title: '取消收藏成功',
          })
          this.setData({
            isLike:0
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log(app.globalData.userInfo)
    if(app.globalData.userInfo){
      this.setData({
        isHasAuthorization:true
      })
    }else{
      console.log('用户未授权')
    }
    this.setData({
      id: options.id,
      imgUrl: api.BASE_IMG
    })
    this.shopList()
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
    this.avtiveDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    //清除定时器
    console.log('清除定时器')
    clearInterval(this.data.intervalId)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //清除定时器
    console.log('清除定时器')
    clearInterval(this.data.intervalId)
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