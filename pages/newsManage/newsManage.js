// pages/newsManage/newsManage.js
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
    openId:app.globalData.openId
  },
  chooseImage:function(e){
    var that = this
    that.showActionSheet()
  },
  showActionSheet:function(e){
    
    wx.showActionSheet({
      itemList: ['拍照','从手机选择'],
      success:function(res){
        if(res.tapIndex == 1){
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              var that = this
              var openId = app.globalData.openId
              var tempFilePath = res.tempFilePaths
              console.log(tempFilePath)
              wx.uploadFile({
                url: urlList.uploadImgForMeetingNews,
                filePath: tempFilePath[0],
                name: 'images',
                header:{
                  'Content-Type':'multipart/form-data',
                  'openId':openId
                },
                success:function(res){
                  console.log(res)
                }
              })
            },
          })
        }else{
  
        }
      },
      fail:function(res){
        console.log(222)
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})