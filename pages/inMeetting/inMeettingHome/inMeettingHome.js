// pages/home/home.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js')
const socket = require('../../../utils/socket.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    grids: [
      {
        name:'签到名单',
        imgUrl:'../../../images/isSignIn.png',
        url:'../inMeettingSignList/inMeettingSignList'
      },
      {
        name:'相册',
        imgUrl:'../../../images/album.png',
        url:'../album/album'
      }
    ],
    visible:true,
    swiper: [
      '../../../images/cs1.png',
      '../../../images/portrait.png'
    ],
    autoPlay:true,
    imgAutoPlay:false,
    interval:3000,
    duration:500,
    circular:true,
    noticeInterval:4000,
    noticeDuration:400,
    noticeCircular:false,
    vertical:true,
    checkBtn:false,
    checkMsg:false,
    scrollY:true,
    scrollTop:0,
    intervalState:false,
    scanNotice:undefined
  },
  person: function (e) {
    wx.navigateTo({
      url: '../../person/person',
    })
  },
  notice: function (e) {
    var userId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../notice/notice?userId=' + userId,
    })
  },
  signList: function () {
    wx.navigateTo({
      url: '../signList/signList',
    })
  },

  handleClose:function(e){
    that.setData({
      visible:e.detail.value
    })
  },
  //更多
  moreAlbum:function(){
    wx.navigateTo({
      url: '../moreAlbum/moreAlbum',
    })
  },

  //跳转指定图片
  assignPicture:function(e){
    console.log(e)
    var imgId = e.currentTarget.dataset.imgid
    var senderOpenId = e.currentTarget.dataset.senderopenid
    wx.navigateTo({
      url: '../assignPicture/assignPicture?imgId='+imgId+'&senderOpenId='+senderOpenId,
    })
  },
  //签到
  signIn:function(){
    var that = this
    wx.showToast({
      title: '签到成功',
      icon:'success',
      duration:2000
    })
    setTimeout(() => {
      that.setData({
        visible:true
      })
    },2000)
  },
  //扫码签到

  scanCode:function(){
    var that = this
    var openId = app.globalData.openId
    wx.scanCode({
      onlyFromCamera:false,
      scanType:'qrCode',
      success:function(res){
        console.log(res)
        wx.showLoading({
          title: '加载中...',
        })
        wx.request({
          url: res.result,
          method:'PUT',
          header:{
            'Content-Type':'application/json',
            'openid':openId
          },
          success:function(res){
            //wx.hideLoading()
            console.log(res)
            if(res.data.code == 200){
              wx.showToast({
                title: '签到成功',
                icon:'sucess',
                duration:4000
              })
              setTimeout(() => {
                that.setData({
                  checkBtn:false,
                  checkMsg:true
                })
              },2000)
            }else if(res.data.code == -12018){
              wx.showToast({
                title: '您已签到，请勿再次签到',
                icon:'none',
                duration:2000
              })
            }else{
              wx.showToast({
                title: '您未预约报名，签到失败',
                icon:'none',
                duration:2000
              })
            }
          }
        })
      }
    })
  },

  //签到列表
  checkList:function(){
    wx.navigateTo({
      url: '../checkList/checkList',
    })
  },


  Fun_ScanNotice:function(){
    var that = this
    that.data.intervalState = true
    that.data.scanNotice = setInterval(param => {
      let params = {}
      Req.getReq(urlList.getDiscussAndLikeNotice, params, function (res) {
        for(let i = 0; i < res.data.length; i++){
          res.data[i].sendTime = format.formatDate(format.getLocalDate(res.data[i].sendTime))
        }
        that.setData({
          noticeList:res.data.reverse(),
        //  scrollTop:1000000
        })
      })
    },10000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    var openid = app.globalData.openId
    prom.wxPromisify(wx.request)({
      url:urlList.getMeetingInfo,
      method:'GET',
      header:{
        'Content-Type':'application/json',
        'openid':openid
      },
      success:function(res){
        if (res.code == 200) {
          wx.hideLoading();
          that.setData({
            meetingInfo: res.data,
            startDate: util.formatTime(format.getLocalDate(res.data.startDate)),
            endDate: util.formatTime(format.getLocalDate(res.data.endDate)),
            "markers[0].latitude": res.data.lat,
            "markers[0].longitude": res.data.lon,
            location: res.data.location
          })
        }
      }
    }).then(function(res){
      var data = ''
      wx.showLoading({
        title: '加载中...',
      })
      Req.getReq(urlList.getUserInfoByOpenId, data, function (res) {
      // console.log(res)
        if (res.code == 200) {
          wx.hideLoading();
          that.setData({
            userInfo: res.data
          })
        }
      })
    })
    console.log(that.data.intervalState)
    if(that.data.intervalState){
      clearInterval(that.data.scanNotice)
      that.data.intervalState = false
    }else{
      that.Fun_ScanNotice()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var data = ''
    Req.getReq(urlList.getMeetingInfo, data, function (res) {
      if (res.code == 200) {
        that.setData({
          meetingInfo: res.data,
          startDate: util.formatTime(format.getLocalDate(res.data.startDate)),
          endDate: util.formatTime(format.getLocalDate(res.data.endDate)),
          "markers[0].latitude": res.data.lat,
          "markers[0].longitude": res.data.lon,
          location: res.data.location
        })
      }
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
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'openId': openid
      },
      complete: function (res) {
        if (res.data.code == -12005) {
          that.setData({
            show_org: false
          })
        } else {
          that.setData({
            show_org: true
          })
        }
      }
    }).then(function (res) {
      // var params = {}
      // Req.getReq(urlList.getDiscussAndLikeNotice, params, function (res) {
      //   if (res.code == 200) {
      //     for(let i = 0; i < res.data.length; i++){
      //       res.data[i].sendTime = format.formatDate(format.getLocalDate(res.data[i].sendTime))
      //     }
      //     that.setData({
      //       noticeList:res.data.reverse()
      //     })
      //   }
      // })
      // var data = ''
      // Req.getReq(urlList.getMeetingInfo, data, function (res) {
      //   wx.showLoading({
      //     title: '加载中...',
      //   })
      //   if (res.code == 200) {
      //     wx.hideLoading();
      //     that.setData({
      //       meetingInfo: res.data,
      //       startDate: util.formatTime(format.getLocalDate(res.data.startDate)),
      //       endDate: util.formatTime(format.getLocalDate(res.data.endDate)),
      //       "markers[0].latitude": res.data.lat,
      //       "markers[0].longitude": res.data.lon,
      //       location: res.data.location
      //     })
      //   }
      // })
    }).then(function (res) {
      let params = {}
      Req.getReq(urlList.getCheckInfoByOpenId,params,function(res){
        console.log(res.data)
        if(res.code == 200){
          if(res.data){
            if (res.data.isCheck == 1) {
              that.setData({
                checkMsg: true
              })
            } else {
              that.setData({
                checkBtn: true,
              })
            }
          }else{
            that.setData({
              checkBtn: true,
            })
          }
        }
      })
    }).then(function(res){
      let params = {}
      Req.getReq(urlList.getMostLikeImages,params,function(res){
        if(res.code == 200){
          for(let i = 0; i < res.data.length; i++){
            res.data[i].imgUrl = urlList.imgUrl + res.data[i].imgUrl
          }
          that.setData({
            displayImages:res.data
          })
        }
      })
    })
//通知中心
    let params = {}
    Req.getReq(urlList.getDiscussAndLikeNotice, params, function (res) {
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].sendTime = format.formatDate(format.getLocalDate(res.data[i].sendTime))
      }
      that.setData({
        noticeList: res.data.reverse(),
        scrollTop: 1000000
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  //  this.Fun_ScanNotice('stop')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // this.Fun_ScanNotice('stop')
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
      imageUrl: '../../../images/tp.png'
    }
  }
})