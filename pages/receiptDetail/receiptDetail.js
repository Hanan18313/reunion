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
    userId:'',
    messageId:'',
    payState:'',
    appendTextLength:0,
    disReceiptBtn:true,
    hotelRoomnNumber:'',
    pickUpPhone:'',
    payDisabled:false
  },
  bindPayChange:function(e){
    var that = this
 //   console.log(e)
    that.data.payState = (that.data.payObject[e.detail.value]).name
 //   console.log(that.data.payState)
    that.setData({
      payIndex:e.detail.value,
      'payState': (that.data.payObject[e.detail.value]).name
    })  
  },
  appendText:function(e){
    var that = this
    that.setData({
      appendTextLength:e.detail.value.length
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var userId = options.userId
    var messageId = options.messageId
    that.data.userId = userId
    that.data.messageId = messageId
    var params = {
      userId:userId
    }
    Req.getReq(urlList.getSignInfoByUserId,params,function(res){
      if(res.code == 200){
      //  console.log(res.data.expectedArrivalTime)
        if(res.data){
          res.data.expectedArrivalTime = format.formatDate(res.data.expectedArrivalTime)
          if (res.data.expectedArrivalTime == '1970-1-1 08:00:00' || res.data.expectedArrivalTime == null) {
            res.data.expectedArrivalTime = ''
          }
          if(res.data.needPickUp == 0){
            res.data.needPickUp = '否'
          }else{
            res.data.needPickUp = '是'
          }
          if(res.data.needSingleRoom == 0){
            res.data.needSingleRoom = '否'
          }else{
            res.data.needSingleRoom = '是'
          }
          if(res.data.payState == '确认缴费'){
            that.setData({
              payDisabled:true
            })
          }else{
            that.setData({
              payDisabled:false
            })
          }
        }
        that.data.hotelRoomnNumber = res.data.hotelRoom
        that.data.pickUpPhone = res.data.pickUpPhone
        that.setData({
          detailReceipt: res.data,
          family: '成人' + res.data.adultNum + '人,' + '儿童' + res.data.kidsNum + '人',
        })
      }
    //  console.log(res)
    })
  },
  pay:function(){
    var that = this
 //   console.log(that.data.payState)
    var params = {
      userId:that.data.userId,
      messageSubId:that.data.replyId
    }
    if (that.data.payState == '确认缴费') {
      Req.putReq(urlList.payEffective, params, function (res) {
    //    console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '汇款认证已提交',
            icon: 'success',
            duration: 2000
          })
        } else if (res.code == -12013) {
          wx.showToast({
            title: '已验证，请勿再次操作',
            icon: 'none',
            duration: 2000
          })
        } else{
          wx.showToast({
            title: '已验证，请勿再次操作',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      Req.putReq(urlList.payInvalid, params, function (res) {
     //   console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '汇款认证已提交',
            icon: 'success',
            duration: 2000
          })
        }else if(res.code == -12014){
          wx.showToast({
            title: '请勿重新提交',
            icon:'none',
            duration:2000
          })
        }else {
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  //确认缴费
  payEffective:function(){
    var that = this
    var messageId = that.data.messageId
    var userId = that.data.userId
    let params = {
      userId:userId,
      messageSubId:messageId
    }
    Req.putReq(urlList.payEffective,params,function(res){
      if(res.code ==200){
        wx.showToast({
          title: '操作成功',
          icon:'success',
          duration:1500
        })
        setTimeout(() => {
          wx.navigateBack({
            detal:1
          })
        },1500)
      }else{
        wx.showToast({
          title: '操作失败',
          icon:'none',
          duration:1500
        })
      }
    })
  },

  //未缴费
  payInvalid:function(){
    var that = this
    var messageId = that.data.messageId
    var userId = that.data.userId
    let params = {
      userId: userId,
      messageSubId: messageId
    }
    console.log(params)
    Req.putReq(urlList.payInvalid, params, function (res) {
      console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(() => {
          wx.navigateBack({
            detal: 1
          })
        }, 1500)
      } else {
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

//
  bindInputRoomNumber:function(e){
  //  console.log(e.detail.value)
    var that = this
    if(e.detail.value == that.data.hotelRoomnNumber){
      that.setData({
        disReceiptBtn:true
      })
    }else{
      that.setData({
        disReceiptBtn:false
      })
    }
  },
  bindInputPickUpPhone:function(e){
    var that = this
    if (e.detail.value == that.data.pickUpPhone) {
      that.setData({
        disReceiptBtn: true
      })
    } else {
      that.setData({
        disReceiptBtn: false
      })
    }
  },
  formSubmit:function(e){
 //   console.log(e)
    var that = this
 //   console.log(that.data.userId)
    var openid = app.globalData.openId
 //  prom.wxPromisify(wx.request)({
      // url:urlList.addMsg,
      // method:'POST',
      // data:{
      //   content:e.detail.value.appendText,
      //   receiverStr:that.data.userId
      // },
      // header:{
      //   'Content-Type':'application/json',
      //   'openId':openid
      // },
      // success:function(res){
      //   console.log(res)
      // }
 //  }).then(function(res){
      var params = {
        userId: that.data.userId,
        messageSubId:that.data.messageId,
        hotelRoom: e.detail.value.hotelRoom,
        pickUpPhone: e.detail.value.pickUpPhone
      }
      if (params.userId || params.hotelRoom || params.pickUpPhone) {
        Req.putReq(urlList.updateSignInfoByOrganizer, params, function (res) {
    //      console.log(res)
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
    //})
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