// pages/mapRouter/mapRouter.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
let plugin = requirePlugin("myPlugin")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    routeInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var params = ''
    Req.getReq(urlList.getMeetingInfo,params,function(res){
     console.log(res.data.location)
      if(res.code == 200){
        wx.getLocation({
          success: function(_res) {
        //    console.log(_res)
            var routeInfo = {
              startLat: _res.latitude,    //起点纬度 选填
              startLng: _res.longitude,    //起点经度 选填
              startName: "我的位置",   // 起点名称 选填
              endLat: res.data.lat,    // 终点纬度必传
              endLng: res.data.lon,  //终点经度 必传
              endName: res.data.location,  //终点名称 必传
              mode: 'car'  //算路方式 选填
            }
            that.setData({
              routeInfo: routeInfo,
              'routeInfo': routeInfo
            })
          },
        })
      }
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

  }
})