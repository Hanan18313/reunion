// pages/myAffairs/myAffairs.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var formatDate = require('../../utils/formatDate.js')
import Dialog from '../../style/vant/dialog/dialog'
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
    transport: '自驾',
    current: '自驾',
    position: 'right',
    checked: false,
    disabled: false,
    takeFamily: false,
    needSingleRoom: false,
    adultArray: ['0', '1', '2', '3', '4'],
    adultObj: [],
    kidObj: [],
    adultIndex: 0,
    kidArray: ['0', '1', '2', '3', '4'],
    kidIndex: 0,
    needPickUpAir: false,
    needPickUpTrain: false,
    pay: true,
    payBtn: true,
    payMsg: '如已缴费请进行验证',
    beginTime: {
      type: String, 	// 开始时间
      value: '08:00'
    },
    endTime: {
      type: String,	// 结束时间
      value: '23:00'
    },
    timeGap: {
      type: Number,	// 单位时间(min)
      value: 60
    },
    show: {
      type: Boolean, 	// 显示或隐藏遮罩
      value: false
    },
    showOverdue: {      // 显示或隐藏过期时间
      type: Boolean,
      value: true
    },
    themeColor: {       // 主题颜色
      type: String,
      value: '#ffd00a'
    },
    show: false,
    inputTime: ''
  },
  handleFruitChange({ detail = {} }) {
    var that = this
    that.setData({
      current: detail.value,
      transport: detail.value
    });
  },
  needSingleRoom: function (e) {
    var that = this
    that.setData({
      needSingleRoom: e.detail.value
    })
  },
  family: function (e) {
    var that = this
    that.setData({
      takeFamily: e.detail.value
    })
  },
  bindAdultChange: function (e) {
    var that = this
    that.setData({
      adultIndex: e.detail.value
    })
  },
  bindKidChange: function (e) {
    var that = this
    that.setData({
      kidIndex: e.detail.value
    })
  },
  _yybindchange: function (e) {
    var that = this
    console.log(e.detail.date)
    console.log(formatDate.formatDate(e.detail.date))
    // that.setData({
    //   airTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
    //   "airTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
    // })
   // console.log(that.data.inputTime)
    if (that.data.inputTime == 'airTime') {
      that.setData({
        // expectedArrivalAirTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        // "expectedArrivalAirTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        expectedArrivalAirTime:formatDate.formatDate(e.detail.date),
        "expectedArrivalAirTime": formatDate.formatDate(e.detail.date)
      })
    } else if(that.data.inputTime == 'trainTime') {
      that.setData({
        // expectedArrivalTrainTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        // "expectedArrivalTrainTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        expectedArrivalTrainTime:formatDate.formatDate(e.detail.date),
        "expectedArrivalTrainTime": formatDate.formatDate(e.detail.date)
      })
    }else{
      that.setData({
        // expectedArrivalSelfTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        // "expectedArrivalSelfTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        expectedArrivalSelfTime: formatDate.formatDate(e.detail.date),
        "expectedArrivalSelfTime": formatDate.formatDate(e.detail.date)
      })
    }
  },
  inputTime: function (e) {
    console.log(e)
    var that = this
    that.setData({
      show: true,
      'inputTime': e.currentTarget.dataset.name
    })
  },
  formSubmit: function (e) {
    var that = this
    var obj = {}
    if (that.data.transport == "飞机") {
      obj.transportation = that.data.transport
      obj.transportationNo = e.detail.value.air_no
      obj.destination = e.detail.value.air_station
      obj.expectedArrivalTime = e.detail.value.air_time
      obj.needPickUp = that.data.needPickUpAir
    } else if (that.data.transport == "火车") {
      obj.transportation = that.data.transport
      obj.transportationNo = e.detail.value.train_no
      obj.destination = e.detail.value.train_station
      obj.expectedArrivalTime = e.detail.value.train_time,
      obj.needPickUp = that.data.needPickUpTrain
    } else {
      obj.expectedArrivalTime = e.detail.value.self_time,
      obj.transportation = that.data.transport
      obj.transportationNo = ''
      obj.destination = ''
      obj.needPickUp = false
    }
    if (that.data.takeFamily) {
      obj.adultNum = Number(that.data.adultIndex),
      obj.kidsNum = Number(that.data.kidIndex)
    } else {
      obj.adultNum = 0,
      obj.kidsNum = 0
    }
    obj.needSingleRoom = that.data.needSingleRoom,
    console.log(obj)
    Req.putReq(urlList.updateSignInfo, obj, function (res) {
     // console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() =>{
          wx.navigateBack({
            detal:1
          })
        },2000)
      } else {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  needPickUpAir: function (e) {
    var that = this
    that.setData({
      needPickUpAir: e.detail.value
    })
  },
  needPickUpTrain: function (e) {
    var that = this
    that.setData({
      needPickUpTrain: e.detail.value
    })
  },
  // paySub: function (e) {
  //   var that = this
  //   var payRem = ''
  //   wx.showActionSheet({
  //     itemList: ['支付宝方式付款', '微信方式付款', '其他方式'],
  //     success: function (res) {
  //       console.log(res)
  //       if (res.tapIndex == 0) {
  //         payRem = "支付宝付款"
  //       } else if (res.tapIndex == 1) {
  //         payRem = "微信付款"
  //       } else {
  //         payRem = "其他方式"
  //       }
  //       var params = {
  //         payRem: payRem
  //       }
  //       Req.putReq(urlList.paySub, params, function (res) {
  //         console.log(res)
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var params = ''
    Req.getReq(urlList.getSignInfoByOpenId, params, function (res) {
     // console.log(res)
      if (res.code == 200) {
        res.data.expectedArrivalTime = formatDate.formatDate(res.data.expectedArrivalTime)
       // console.log(res.data)
        if (res.data.adultNum || res.data.kidsNum) {
          that.setData({
            takeFamily: true,
            adultIndex: res.data.adultNum,
            kidIndex: res.data.kidsNum
          })
        }
        if (res.data.transportation == '飞机') {
          that.setData({
            air_station: res.data.destination,
            air_no: res.data.transportationNo,
            expectedArrivalAirTime: res.data.expectedArrivalTime,
            needPickUpAir: true
          })
        } else if (res.data.transportation == '火车') {
          that.setData({
            train_station: res.data.destination,
            train_no: res.data.transportationNo,
            expectedArrivalTrainTime: res.data.expectedArrivalTime,
            needPickUpTrain: true
          })
        } else {
          that.setData({
            expectedArrivalSelfTime: res.data.expectedArrivalTime
          })
        }
        that.setData({
          needSingleRoom: res.data.needSingleRoom,
          transport: res.data.transportation,
          current: res.data.transportation,
        })
      //  console.log(res.data.transportation)
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
      title: '毕业30周年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})