// pages/detailNews/detailNews.js
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
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(options.newsId)
    var that = this
    var imgArr = []
    var newsId = options.newsId
    that.data.newsId = newsId
   // console.log(newsId)
    let params = ''
    Req.getReq(urlList.meetingNewsList, params, function (res) {
      console.log(res)
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].id == newsId) {
            if (res.data[i].img.split(',').length > 1) {
              for (let j = 0; j < res.data[i].img.split(',').length; j++) {
                imgArr.push(urlList.imgUrl + res.data[i].img.split(',')[j])
              }
            } else {
              res.data[i].img = urlList.imgUrl + res.data[i].img
            }
            res.data[i].sendTime ='发布时间：'+ format.formatDate(res.data[i].sendTime)
            console.log(imgArr)
            that.setData({
              newsInfo: res.data[i],
              imgArr:imgArr
            })
          }
        }
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