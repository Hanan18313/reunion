// pages/locationManage/locationManage.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    location:'请选择位置',
    latitude:'',
    longitude:'',
    markers: [{
      iconPath: "../../images/center-location.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50,
    }],
  },
  getLocation:function(){
    var that = this
    wx.chooseLocation({
      success: function(res) {
       // console.log(res)
        that.setData({
          'location':res.name,
          'markers[0].latitude':res.latitude,
          'markers[0].longitude':res.longitude,
          longitude:res.longitude,
          latitude:res.latitude
        })
       // console.log(res)
      },
    })
  },
  submit:function(){
    var that = this
    var params = {
      location: that.data.location,
      lat: that.data.markers[0].latitude,
      lon: that.data.markers[0].longitude,
      id:1
    }
    wx.showLoading({
      title: '加载中...',
    })
  //  console.log(that.data)
   // console.log(params)
    if(that.data.latitude){
      Req.putReq(urlList.updateMeetingInfo, params, function (res) {
        wx.hideLoading()
    //    console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              detal: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else{
      wx.showToast({
        title: '请先选择位置',
        icon:'none',
        duration:1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = ''
    Req.getReq(urlList.getMeetingInfo,data,function(res){
      if(res.code == 200){
        that.setData({
          "markers[0].latitude":res.data.lat,
          "markers[0].longitude":res.data.lon,
          location:res.data.location
        })
      }
   //   console.log(res)
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
    return {
      title: '毕业30周年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})