// pages/newsEdit/newsEdit.js
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
    isTop:false,
    newsId:'',
    disabled:false,
    loading:false
  },
  bindTopChange:function(e){
    var that = this
  //  console.log(e)
    that.setData({
      isTop:e.detail.value
    })
    let params = {
      id:that.data.newsId,
      isTop:e.detail.value
    }
    Req.putReq(urlList.topMeetingNews,params,function(res){
      if(res.code == 200){
        wx.showToast({
          title: '操作成功',
          icon:'success',
          duration:1500
        })
      }else{
        wx.showToast({
          title: '操作失败',
          icon:'none',
          duration:1500
        })
      }
    })
  },
  del:function(e){
   // console.log(e)
    var that = this
    var newsId = e.currentTarget.dataset.id
    let params = {
      id:newsId
    }
    that.setData({
      disabled:true,
      loading:true
    })
    Req.deleteReq(urlList.delMeetingNews,params,function(res){
    //  console.log(res)
      that.setData({
        disabled:false,
        loading:false
      })
      if(res.code == 200){
        wx.showToast({
          title: '删除成功',
          icon:'success',
          duration:2000
        })
        setTimeout(() =>{
          wx.navigateBack({
            detal:1
          })
        },2000)
      }else{
        wx.showToast({
          title: '删除失败',
          icon:'none',
          duration:2000
        })
      }
    })
  },
  formSubmit:function(e){
  //  console.log(e)
    var that = this
    var params = {
      id:that.data.newsId,
      content:e.detail.value.content,
      title:e.detail.value.title
    }
    if(params.content && params.title){
      Req.putReq(urlList.editMeetingNews,params,function(res){
        if(res.code == 200){
          wx.showToast({
            title: '提交成功',
            icon:'success',
            duration:2000
          })
          setTimeout(() =>{
            wx.navigateBack({
              delta: 1,
            })
          },2000)
        }else{
          wx.showToast({
            title: '提交失败',
            icon:'none',
            duration:2000
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var newsId = options.newsId
    that.data.newsId = newsId
   // console.log(newsId)
    let params = ''
    Req.getReq(urlList.meetingNewsList,params,function(res){
   //   console.log(res)
      if(res.data){
        for (let i = 0; i < res.data.length; i++) { 
          if(res.data[i].id == newsId){
            res.data[i].img = urlList.imgUrl+res.data[i].img
            that.setData({
              newsInfo:res.data[i]
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