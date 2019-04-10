// pages/payChange/payChange.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    userId:'',
    payDisabled:false,
    payState:''
  },

  //确认缴费
  payEffective:function(){
    if(that.data.payState == '未缴费'){
      let params = {
        userId: that.data.userId
      }
      Req.putReq(urlList.originzerPayEffective, params, function (res) {
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
    }else if(that.data.payState == '汇款已递交'){
      let params = {
        userId:that.data.userId
      }
      Req.putReq(urlList.payEffective,params,function(res){
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
    }
  },
  //未收到缴费
  payInvalid:function(){
    let params = {
      userId:that.data.userId
    }
    Req.putReq(urlList.payInvalid,params,function(res){
      if(res.code == 200){
        wx.showToast({
          title: '操作成功',
          icon:'success',
          duration:1500
        })
        setTimeout(() =>{
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    that = this
    that.data.userId = options.userId
   
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
    let params = {
      userId: that.data.userId
    }
    Req.getReq(urlList.getSignInfoByUserId, params, function (res) {
      console.log(res)
      if (res.code == 200) {
        that.data.payState = res.data.payState
        if(res.data.payState == '确认缴费'){
          that.setData({
            payDisabled:true
          })
        }else{
          that.setData({
            payDisabled:false
          })
        }
        that.setData({
          payInfo: res.data
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