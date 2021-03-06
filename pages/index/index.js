//index.js
//获取应用实例
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var format = require('../../utils/formatDate.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getUserInfo_btn:true,
    bindinput_name:'',
    show:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindinput_name:function(e){
    var that = this
    that.setData({
      'bindinput_name':e.detail.value
    })
  },
  onLoad: function () {
    wx.authorize({
      scope: 'scope.userLocation',
    })
    // 登录
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: urlList.getOpenId,
            method: 'GET',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            complete: function (res) {
            //  console.log(res)
              Req.header.openId = res.data.data
              //Req.header.openId = 123
              
              app.globalData.openId = res.data.data
              if(res.data.data){
                // wx.showLoading({
                //   title: '加载中...',
                // })
                // wx.request({
                //   url: urlList.getUserInfoByOpenId,
                //   method:'GET',
                //   header:{
                //     'Content-Type':'application/json',
                //     'openId':res.data.data
                //   },
                //   success:function(res){
                //     wx.hideLoading()
                //     if (res.code == 200) {
                //       wx.hideLoading();
                //       that.setData({
                //         show: false
                //       })
                //       wx.redirectTo({
                //         url: '../home/home',
                //       })
                //     } else {
                //       wx.hideLoading();
                //       that.setData({
                //         show: true
                //       })
                //     }
                //   }
                // })
                var data = ''
                wx.showLoading({
                  title: '加载中...',
                })
                Req.getReq(urlList.getUserInfoByOpenId,data,function(res){
                  // var pretime = new Date('2019-06-07 09:00:00')
                  // wx.setStorageSync('preTime', pretime)
                  if(res.code == 200){
                    wx.hideLoading();
                    that.setData({
                      show:false
                    })
                    // wx.redirectTo({
                    //   url: '../home/home',
                    // })
                    // wx.redirectTo({
                    //   url: '../inMeetting/inMeettingHome/inMeettingHome',
                    // })
                    //var preTime = wx.getStorageSync('preTime')
                  //  console.log(format.formatDate(preTime))
                    let params = {}
                    Req.getReq(urlList.getMeetingInfo,params,function(res){
                    //  console.log(res)
                      if(res.code == 200){
                        // if (preTime) {
                        //   if (format.formatDate(preTime) > format.formatDate(res.data.startDate)){
                        //     wx.redirectTo({
                        //       url: '../inMeetting/inMeettingHome/inMeettingHome',
                        //     })
                        //   }else{
                        //     wx.redirectTo({
                        //       url: '../home/home',
                        //     })
                        //   }
                        // }else{
                        if (format.formatDate(format.getLocalDate(res.data.startDate)) < format.formatDate(format.getLocalDate(res.data.stateDate))){
                            wx.redirectTo({
                              url: '../inMeetting/album/album',
                            })
                          }else{
                            wx.redirectTo({
                              url: '../home/home',
                            })
                          }
                       // }
                      }
                    })
                  }else{
                    wx.hideLoading();
                    that.setData({
                      show:true
                    })
                  }
                })
              }
              // if (that.openidCallback) {
              //   that.openidCallback(res.data.data)
              // } else {
              //   console.log('获取失败')
              // }
              // if(res.data.openid){
              //   req.header.Openid = res.data.openid
              // }
            }
          })
        }
      }
    })
    var openid = ''
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if(app.globalData.openId && app.globalData.openId != ''){
      openid = app.globalData.openid
    }else{
      app.openidCallback = openidCallback =>{
        if(openidCallback != ''){
          openid = openidCallback
          this.openid = openid
        }
      }
    }
  },
  getUserInfo: function(e) {
    var that = this
  //  console.log(that.data.userInfo)
   // console.log(e)
    var url = urlList.checkUserByName
    var params = {
      "userName":that.data.bindinput_name,
      // "portrait":app.globalData.userInfo.avatarUrl
      'portrait':e.detail.userInfo.avatarUrl
    }
    if(e.detail.userInfo){
      if(params.userName){
        Req.postReq(url, params, function (res) {
          console.log(res)
          if (res.code == 200) {
            wx.showToast({
              title: '验证成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '../inMeeting/album/album',
              })
            }, 2000)
          } else if (res.code == -12003) {
            wx.showToast({
              title: '不存在该用户信息,验证失败',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showModal({
              title: '信息验证失败',
              content: '请联系金国峰电话：18621892125',
              success: function (res) {
                if (res.confirm) {
                  wx.makePhoneCall({
                    phoneNumber: '18621892125',
                  })
                  // wx.navigateTo({
                  //   url: '../complain/complain',
                  // })
                } else if (res.cancel) {
                  console.log('点击取消')
                }
              }
            })
          }
        })
      }else{
        wx.showToast({
          title: '姓名不能为空',
          icon:'none',
          duration:1500
        })
      }
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
