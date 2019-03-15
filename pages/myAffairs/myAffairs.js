// pages/myAffairs/myAffairs.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var format = require('../../utils/formatDate.js')
// var Dialog  = require('../../style/vant/dialog/dialog.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    fruit: [{
      id: 1,
      name: '飞机',
    }, {
      id: 2,
      name: '火车'
    }, {
      id: 3,
      name: '自驾'
    }],
    transport:'自驾',
    current: '自驾',
    position: 'right',
    checked: false,
    disabled: false,
    takeFamily:false,
    needSingleRoom:false,
    adultArray:['','1','2','3','4'],
    adultObj:[],
    kidObj:[],
    adultIndex:0,
    kidArray:['','1','2','3','4'],
    kidIndex:0,
    needPickUpAir:false,
    needPickUpTrain:false,
    payMsgShow:false,
    payBtn:false,
    payMsg:'如已缴费请进行验证',
    showAffairs_btn:false
  },
  myAffairsEdit:function(){
    wx.navigateTo({
      url: '../myAffairsEdit/myAffairsEdit',
    })
  },
  handleFruitChange({ detail = {} }) {
    var that = this
    that.setData({
      current: detail.value,
      transport:detail.value
    });
  },
  needSingleRoom:function(e){
    var that = this
    that.setData({
      needSingleRoom:e.detail.value
    })
  },
  family:function(e){
    var that = this
    that.setData({
      takeFamily:e.detail.value
    })
  },
  bindAdultChange:function(e){
    var that = this
    that.setData({
      adultIndex:e.detail.value
    })
  },
  bindKidChange:function(e){
    var that = this
    that.setData({
      kidIndex:e.detail.value
    })
  },
  formSubmit:function(e){
    var that = this
    var obj = {}
    if(that.data.transport == "飞机"){
      obj.transportation = that.data.transport
      obj.transportationNo = e.detail.value.air_no
      obj.destination = e.detail.value.air_station
      obj.expectedArrivalTime = e.detail.value.air_time
      obj.needPickUp = that.data.needPickUpAir
    }else if(that.data.transport == "火车"){
      obj.transportation = that.data.transport
      obj.transportationNo = e.detail.value.train_no
      obj.destination = e.detail.value.train_station
      obj.expectedArrivalTime = e.detail.value.train_time,
      obj.needPickUp = that.data.needPickUpTrain
    }else{
      obj.expectedArrivalTime = e.detail.value.self_time,
      obj.transportation = ''
      obj.transportationNo = ''
      obj.destination = ''
      obj.needPickUp = false
    }
    if(that.data.takeFamily){
      obj.adultNum = Number(that.data.adultIndex),
      obj.kidsNum = Number(that.data.kidIndex)
    }else{
      obj.adultNum = 0,
      obj.kidsNum = 0
    }
      obj.needSingleRoom = that.data.needSingleRoom,
    console.log(obj)
    Req.putReq(urlList.updateSignInfo,obj,function(res){
      console.log(res)
      if(res.code == 200){
        wx.showToast({
          title: '提交成功',
          icon:'success',
          duration:2000
        })
      }else{
        wx.showToast({
          title: '提交失败',
          icon:'none',
          duration:2000
        })
      }
    })
  },
  needPickUpAir:function(e){
    var that = this
    that.setData({
      needPickUpAir:e.detail.value
    })
  },
  needPickUpTrain:function(e){
    var that = this
    that.setData({
      needPickUpTrain:e.detail.value
    })
  },
  paySub:function(e){
   // console.log(e)
    var that = this
    var payRem = ''
    wx.showActionSheet({
      itemList: ['支付宝付款','微信付款','其他方式'],
      success:function(res){
        console.log(res)
        if(res.tapIndex == 0){
          payRem = "支付宝付款"
        }else if(res.tapIndex == 1){
          payRem = "微信付款"
        }else{
          payRem = "其他方式"
        }
        var params = {
          payRem:payRem
        }
      //  console.log(params)
        Req.putReq(urlList.paySub,params,function(res){
        //  console.log(res)
          if(res.code == 200){
            that.setData({
              payBtn:false,
              payMsgShow:true,
              payMsg:'缴费认证中...'
            })
            wx.showToast({
              title: '操作成功',
              icon:'success',
              duration:2000
            })
          }else{
            wx.showToast({
              title: '操作失败',
              icon:'none',
              duration:2000
            })
          }
        })
      }
    })
  },
  appendText:function(e){
    var that = this
    var userId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../appendText/appendText?userId'+userId,
    })
  },
  signOut: function () {
    var that = this
    var params = ''
    Req.putReq(urlList.meetingSignOut, params, function (res) {
      if (res.code == 200) {
        wx.showToast({
          title: '取消报名成功',
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
          title: '操作失败',
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
    var data
    Req.getReq(urlList.getSignInfoByOpenId, data, function (res) {
      //  console.log(res)
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
    var params = ''
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getSignInfoByOpenId, params, function (res) {
     // console.log(res)
     wx.hideLoading()
      if (res.code == 200) {
        res.data.expectedArrivalTime = format.formatDate(format.getLocalDate(res.data.expectedArrivalTime))
        if (res.data.adultNum || res.data.kidsNum) {
          that.setData({
            takeFamily: true,
            adultIndex: res.data.adultNum,
            kidIndex: res.data.kidsNum
          })
        }
        // if(res.data.transportation == '飞机'){
        //   that.setData({
        //     air_station: res.data.destination,
        //     air_no: res.data.transportationNo,
        //     expectedArrivalTime:res.data.expectedArrivalTime,
        //     needPickUpAir:true
        //   })
        // }else if(res.data.transportation == '火车'){
        //   that.setData({
        //     train_station: res.data.destination,
        //     train_no: res.data.train_no,
        //     expectedArrivalTime:res.data.expectedArrivalTime,
        //     needPickUpTrain:true
        //   })
        // }else{
        //   that.setData({
        //     expectedArrivalTime:res.data.expectedArrivalTime
        //   })
        // }
        if (res.data.payState == '汇款已递交') {
          that.setData({
            payMsg: "缴费认证中...",
            payMsgShow: true,
            payBtn:false
          })
        } else if (res.data.payState == '确认缴费') {
          that.setData({
            payMsg: '通过缴费认证',
            payBtn: false,
            payMsgShow:true
          })
        } else {
          that.setData({
            payMsgShow: false,
            payBtn:true
          })
        }
        if (res.data) {
          if (res.data.needPickUp == 0) {
            res.data.needPickUp = '否'
          } else {
            res.data.needPickUp = '是'
          }
          if (res.data.needSingleRoom == 0) {
            res.data.needSingleRoom = '否'
          } else {
            res.data.needSingleRoom = '是'
          }
        }
        that.setData({
          detailReceipt: res.data,
          family: '成人' + res.data.adultNum + '人,' + '儿童' + res.data.kidsNum + '人'
        })
      }
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
      title: '毕业30年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})