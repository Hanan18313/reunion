// pages/signList/signList.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var py = require('../../utils/pinyin.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    page:1,
    pageSize:200,
    dataArr:[]
  },
  onChange:function(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var arr = []
    let params = {
      page: that.data.page,
      pageSize: that.data.pageSize
    }
    Req.getReq(urlList.getUserList, params, function (res) {
      if (res.code == 200) {
        console.log(res)
        if(res.data.length > 0){
          for(let i = 0; i < res.data.length; i++){
            if(res.data[i].isSign == 1){
              arr.push(res.data[i])
            }
          }
        }
      }
      console.log(arr)
      that.setData({
        signList:arr
      })
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