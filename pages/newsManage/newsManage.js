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
  addNews:function(){
    wx.navigateTo({
      url: '../newsAdd/newsAdd',
    })
  },
  editNews:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../newsEdit/newsEdit?newsId='+e.currentTarget.dataset.id,
    })
  },
  deleteNews:function(e){
    var that = this
    var newsId = e.currentTarget.dataset.id
    var params = {
      id:newsId
    }
    Req.deleteReq(urlList.delMeetingNews,params,function(res){
      if(res.code == 200){
        wx.showToast({
          title: '删除成功',
          icon:'success',
          duration:2000
        })
      }else{
        wx.showToast({
          title: '删除失败',
          icon:'none',
          duration:2000
        })
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
    var that = this
    var params = ''
    Req.getReq(urlList.meetingNewsList, params, function (res) {
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].img = urlList.imgUrl + res.data[i].img
          res.data[i].sendTime = util.formatTime(res.data[i].sendTime)
          // if (res.data[i].isTop == 0) {
          //   res.data[i].isTop = '未置顶'
          // } else {
          //   res.data[i].isTop = '已置顶'
          // }
        }
        that.setData({
          newsList: res.data
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
      title: '毕业30周年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})