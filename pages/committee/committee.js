// pages/committee/committee.js
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
    showCs:false,
    openid_list: ['ofdKW5PAGwcwesG6uLgCskknYIP4', 'ofdKW5Gkk4ciHQx0InqFOSwvRVOo', 'ofdKW5CqvPoob9F2HUPcgQ2tHGGQ','ofdKW5NI2OhWFWZAHJjyeFNRF3rk']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var params = ''
    var openid = app.globalData.openId
    var openidList = that.data.openid_list
    var even = openidList.find(function(elment){
      if(elment == openid){
        return true
      }else{
        return false
      }
    })
    if (even == undefined){
      that.setData({
        showCS:false
      })
    }else{
      that.setData({
        showCS:true
      })
    }
    Req.getReq(urlList.getUserInfoByOpenId,params,function(res){
      if(res.code == 200){
        that.setData({
          userInfo:res.data
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
    return {
      title: '毕业30年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})