// pages/shopDetail/shopDetail.js
let app = getApp
let api = require('../../request/api.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  //商家详情
  shopDetail(){
    wx.request({
      url: api.shopDetail(this.data.shopId),
      success:res=>{
        console.log(res)
        if(res.data.status==1){
          this.setData({
            shopDetail: res.data.info,
            shopLon: res.data.info.jingweidu.split(',')[1],
            shopLat:res.data.info.jingweidu.split(',')[0],
            banner: JSON.parse(res.data.info.turn_image)
          })
          console.log(this.data.banner)
          this.setData({
            markers: [
              {
                latitude: this.data.shopLat,
                longitude: this.data.shopLon,
                title: '商家的位置',
              }
            ]
          })
          console.log(this.data.latitude, this.data.longitude)
          var article = this.data.shopDetail.rule;
          WxParse.wxParse('article', 'html', article, this, 5);
        }else{
          wx.showToast({
            title: '获取商家信息失败',
            icon:'none'
          })
        }
      }
    })
  },
  //打电话
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.shopDetail.phone,
    })
  },
  //导航
  navigate(){
    console.log('导航')
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success:res=>{
        wx.openLocation({
          latitude: parseFloat(this.data.shopLat),
          longitude: parseFloat(this.data.shopLon),
          scale: 18,
          name: this.data.shopDetail.name,
          address:this.data.shopDetail.address
        })
      },
      fail:res=>{
        console.log(res),
        wx.showModal({
          title: '导航功能需要打开位置信息',
          content: '是否开启位置信息',
          success:res=>{
            if(res.confirm){
              wx.openSetting({
                success:res=>{
                  console.log(res)
                  if (res.authSetting["scope.userLocation"]) {
                    console.log('用户开启定位')
                    // wx.getLocation({
                    //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                    //       success: res => {
                    //         const latitude = res.latitude
                    //         const longitude = res.longitude
                    //         wx.openLocation({
                    //           latitude,
                    //           longitude,
                    //           scale: 18,
                    //           name: this.data.shopDetail.name
                    //         })
                    //       },
                    // })
                  }
                }
              })
            }else{
              console.log('用户拒绝，打开位置信息失败')
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      shopId:options.shop_id,
      imgUrl: api.BASE_IMG
    })
    this.shopDetail()
    // //获取用户当前位置信息
    // wx.getLocation({
    //   type:'gcj02',
    //   success:res=>{
    //     console.log(res)
    //     this.setData({
    //       userLat:res.latitude,
    //       userLon:res.longitude,
    //     })
    //   },
    //   fail:res=>{
    //     console.log(res)
    //   }
    // })
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
      this.shopDetail()
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
  onShareAppMessage: function () {

  }
})