// pages/person/person.js
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
    input_disabled:true,
    oper_show:true,
    auto_focus:false,
    region: ['中国', '美国', '加拿大', '澳洲', '日本', '欧洲', '港澳台'],
    regionArray:[
      {
        id:0,
        name:'中国'
      },
      {
        id:1,
        name:'美国'
      },
      {
        id:2,
        name:'加拿大'
      },
      {
        id:3,
        name:'澳洲'
      },
      {
        id:4,
        name:'日本'
      },
      {
        id:5,
        name:'欧洲'
      },
      {
        id: 6,
        name: '港澳台'
      }
    ],
    regionIndex:0,
    account:['微信','QQ','FaceBook','Twitter','E-mail'],
    accountArray:[
      {
        id:0,
        name:'微信'
      },
      {
        id:1,
        name:'QQ'
      },
      {
        id:2,
        name:'FaceBook'
      },
      {
        id:3,
        name:'Twitter'
      },
      {
        id:4,
        name:'E-mail'
      }
    ],
    accountIndex:0,
    userInfo:[],
    showAffairs_btn:false
  },
  edit:function(){
    var that = this
    // that.setData({
    //   input_disabled:false,
    //   oper_show:false,
    //   auto_focus:true
    // })
    wx.navigateTo({
      url: '../personEdit/personEdit',
    })
  },
  
  bindAcccountChange:function(e){
    var that = this
    that.setData({
      accountIndex:e.detail.value,
      "userInfo.socialMedia":(that.data.accountArray[e.detail.value]).name
    })
  },
  bindRegionChange:function(e){
  //  console.log(e)
    var that = this
    that.setData({
      regionIndex: e.detail.value,
      "userInfo.country": (that.data.regionArray[e.detail.value]).name
    })
  },
  bindInput_pro:function(e){
    var that = this
    that.setData({
      "userInfo.pro":e.detail.value,
    })
  },
  bindInput_phoneCn:function(e){
    var that = this
    that.setData({
      "userInfo.phoneCn":e.detail.value
    })
  },
  bindInput_socialMediaAccount:function(e){
    var that = this
    that.setData({
      "userInfo.socialMediaAccount":e.detail.value
    })
  },
  bindInput_company:function(e){
    var that = this
    that.setData({
      "userInfo.company":e.detail.value
    })
  },
  myAffairs:function(e){
    wx.navigateTo({
      url: '../myAffairs/myAffairs',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this
    // var data
    // Req.getReq(urlList.getUserInfoByOpenId,data,function(res){
    //   console.log(res)
    //   if(res.code == 200){
    //     that.setData({
    //       userInfo:res.data,
    //       "userInfo":res.data,
    //       regionIndex: that.data.region.indexOf(res.data.country),
    //       accountIndex:that.data.account.indexOf(res.data.socialMedia)
    //     })
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
    var that = this
    var openId = app.globalData.openId
    var data = {}
    prom.wxPromisify(wx.request)({
      url: urlList.getUserInfoByOpenId,
      method:'GET',
      header:{
        'Content-Type':'application/json',
        'openId':openId
      },
      success:function(res){
        if (res.code == 200) {
          that.setData({
            userInfo: res.data,
            "userInfo": res.data,
            regionIndex: that.data.region.indexOf(res.data.country),
            accountIndex: that.data.account.indexOf(res.data.socialMedia)
          })
        }
      }
    }).then(function(res){
      wx.showLoading({
        title: '加载中...',
      })
      Req.getReq(urlList.getSignInfoByOpenId, data, function (res) {
        //  console.log(res)
        wx.hideLoading()
        if (res.data != null) {
          if (res.data.isSign == 0) {
            that.setData({
              showAffairs_btn: false
            })
          } else {
            that.setData({
              showAffairs_btn: true
            })
          }
        } else {
          that.setData({
            showAffairs_btn: false
          })
        }
      })
    }).then(function(res){
      var data = {}
      Req.getReq(urlList.getUserInfoByOpenId, data, function (res) {
        console.log(res)
        if (res.code == 200) {
          that.setData({
            userInfo: res.data,
            "userInfo": res.data,
            regionIndex: that.data.region.indexOf(res.data.country),
            accountIndex: that.data.account.indexOf(res.data.socialMedia)
          })
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
    return {
      title: '毕业30周年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})