// pages/home/home.js
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
    show_org:false,
    show_btn:true,
    markers: [{
      iconPath: "../../images/center-location.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50,
    }],
  },
  moreNews:function(){
    wx.navigateTo({
      url: '../moreNews/moreNews',
    })
  },
  detailNews:function(){
    wx.navigateTo({
      url: '../detailNews/detailNews',
    })
  },
  person:function(e){
    wx.navigateTo({
      url: '../person/person',
    })
  },
  signIn:function(e){
    var that = this
    var data
    that.setData({
      loading:true,
      disabled:true
    })
    Req.postReq(urlList.meetingSignIn,data,function(res){
      if(res.code == 200){
        wx.showToast({
          title: '报名成功',
          icon:'success',
          duration:2000
        })
        that.setData({
          show_btn:false
        })
      }else{
        wx.showToast({
          title: '报名失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = app.globalData.openId
    prom.wxPromisify(wx.request)({
      url:urlList.getSignInfoByOpenId,
      method:'GET',
      header:{
        'Content-Type':'application/json',
        'openId':openid
      },
      complete:function(res){
        // console.log(res)
        if(res.data.data == null){
          that.setData({
            show_btn:true
          })
        }else{
          that.setData({
            show_btn:false
          })
        }
      }
    }).then(function(res){
      var data = ''
      Req.getReq(urlList.getUserInfoByOpenId, data, function (res) {
        wx.showLoading({
          title: '加载中...',
        })
        if (res.code == 200) {
          wx.hideLoading();
          that.setData({
            userInfo: res.data
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var data
    Req.getReq(urlList.signPersonNum,data,function(res){
      if(res.code == 200){
        that.setData({
          total:res.data.count,
          ranking:res.data.site
        })
      }
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var openid = app.globalData.openId
    prom.wxPromisify(wx.request)({
      url: urlList.checkIsOrganizer,
      method:'GET',
      header:{
        'Content-Type':'application/json',
        'openId':openid
      },
      complete:function(res){
        wx.hideLoading();
        if(res.data.code == -12005){
          that.setData({
            show_org:false
          })
        }else{
          that.setData({
            show_org:true
          })
        }
      }
    }).then(function(res){
      var data
      Req.getReq(urlList.getMeetingInfo,data,function (res) {
        wx.showLoading({
          title: '加载中...',
        })
        if (res.code == 200) {
          wx.hideLoading();
          that.setData({
            meetingInfo: res.data,
            startDate:util.formatTime(res.data.startDate),
            endDate:util.formatTime(res.data.endDate),
            "markers[0].latitude": res.data.lat,
            "markers[0].longitude": res.data.lon,
            location: res.data.location
          })
        }
      })
    }).then(function(res){
      var data
      Req.getReq(urlList.meetingNewsList,data,function(res){
        wx.showLoading({
          title: '加载中...',
        })
        if(res.code == 200){
          wx.hideLoading();
          for(let i in res.data){
            if(res.data[i].isTop == 1){
              that.setData({
                news_info:res.data[i]
              })
            }
          }
        }
      })
    })
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