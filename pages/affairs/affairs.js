// pages/receiptDetail/receiptDetail.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var format = require('../../utils/formatDate.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    userId: '',
    payArray: ['未缴费', '确认缴费'],
    payObject: [
      {
        id: 0,
        name: '未缴费'
      },
      {
        id: 1,
        name: '确认缴费'
      }
    ],
    payIndex: 0,
    payState: '未缴费'
  },
  bindPayChange: function (e) {
    var that = this
    console.log(e)
    that.data.payState = (that.data.payObject[e.detail.value]).name
    console.log(that.data.payState)
    that.setData({
      payIndex: e.detail.value,
      'payState': (that.data.payObject[e.detail.value]).name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userId = options.userId
    that.data.userId = userId
    var params = {
      userId: userId
    }
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getSignInfoByUserId, params, function (res) {
      wx.hideLoading()
    //  console.log(res)
      if (res.code == 200) {
        res.data.expectedArrivalTime = format.formatDate(format.getLocalDate(res.data.expectedArrivalTime))
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
          if(res.data.expectedArrivalTime == '1970-1-1 08:00:00'){
            res.data.expectedArrivalTime = ''
          }
          if(res.data.isJoinParty == 1){
            res.data.isJoinParty = '参加'
          }else{
            res.data.isJoinParty = '不参加'
          }
        }
        that.setData({
          detailReceipt: res.data,
          family: '成人' + res.data.adultNum + '人,' + '儿童' + res.data.kidsNum + '人',
          'payState': res.data.payState
        })
      }
    })
  },
  pay: function () {
    var that = this
   // console.log(that.data.payState)
    var params = {
      userId: that.data.userId
    }
    if (that.data.payState == '确认缴费') {
      Req.putReq(urlList.payEffective, params, function (res) {
      //  console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '汇款认证已提交',
            icon: 'success',
            duration: 2000
          })
        } else if (res.code == -12013) {
          wx.showToast({
            title: '请勿重新提交',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      Req.putReq(urlList.payInvalid, params, function (res) {
      //  console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '汇款认证已提交',
            icon: 'success',
            duration: 2000
          })
        } else if (res.code == -12014) {
          wx.showToast({
            title: '请勿重新提交',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  formSubmit: function (e) {
    var that = this
    var params = {
      userId: that.data.userId,
      hotelRoom: e.detail.value.hotelRoom,
      pickUpPhone: e.detail.value.pickUpPhone
    }
    if (params.userId && params.hotelRoom && params.pickUpPhone) {
      Req.putReq(urlList.updateSignInfoByOrganizer, params, function (res) {
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
    } else {
      wx.showToast({
        title: '请输入房间号或接站电话',
        icon: 'none',
        duration: 2000
      })
    }
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

  onShareAppMessage: function () {
    return {
      title: '毕业30年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})