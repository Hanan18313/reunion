// pages/receiptNotice/receiptNotice.js
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
    page: 1,
    pageSize: 100,
    loading: false,
    loading_done: false,
    dataArr: [],
    userId:'',
    current:0,
    visible: false,
    actions:[
      {
        name:'进入会务',
        color:'green'
      },
      {
        name:'标记已阅',
        color:'red'
      },
      {
        name:'取消',
      }
    ]

  },
  handleChange:function(e){
    var that = this
    that.data.page = 1
    that.setData({
      current: e.detail.key
    })
    if(e.detail.key == 0){
      var params = {
        page: that.data.page,
        pageSize: that.data.pageSize,
        replyState: 2,
        userId: that.data.userId,
        // scrollTop: 0,
        hasDeal: 0
      }
      wx.showLoading({
        title: '加载中...',
      })
      Req.getReq(urlList.getAtSelfMessage, params, function (res) {
        wx.hideLoading()
        if (res.code == 200) {
          var arr = []
          var dataArr = that.data.dataArr
          dataArr.push(res.data.reverse())
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].sendTime = format.formatDate(res.data[i].sendTime)
            }
          }
          that.setData({
            notice: res.data,
            // scrollTop: 10000 * res.data.length
          })
        }
        // console.log(res)
      })
    }else{
      var params = {
        page: that.data.page,
        pageSize: that.data.pageSize,
        replyState: 2,
        userId: that.data.userId,
        scrollTop: 0,
        hasDeal: 1
      }
      wx.showLoading({
        title: '加载中...',
      })
      Req.getReq(urlList.getAtSelfMessage, params, function (res) {
        wx.hideLoading()
        if (res.code == 200) {
          var arr = []
          var dataArr = that.data.dataArr
          dataArr.push(res.data.reverse())
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].sendTime = format.formatDate(res.data[i].sendTime)
            }
          }
          that.setData({
            notice: res.data,
            // scrollTop: 10000 * res.data.length
          })
        }
        // console.log(res)
      })
    }
  },
  upper: function (e) {
    var that = this
    that.data.page++
    if(that.data.current == 0){
      var params = {
        page: that.data.page,
        pageSize: that.data.pageSize,
        replyState: 2,
        userId: that.data.userId,
        hasDeal:0
      }
      that.setData({
        loading: true,
        loading_done: false
      })
      Req.getReq(urlList.getAtSelfMessage, params, function (res) {
        if (res.code == 200) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].sendTime = format.formatDate(res.data[i].sendTime)
            }
            var dataArr = that.data.dataArr
            res.data.reverse()
            dataArr.unshift(res.data)
            var res_arr = [].concat.apply([], dataArr)
            that.setData({
              notice: res_arr,
              //  scrollTop: 10000 * res.data.length,
              loading: false,
              loading_done: true
            })
          } else {
            that.setData({
              loading_done: true,
              loading: false
            })
          }
        }
      })
    }else{
      var params = {
        page: that.data.page,
        pageSize: that.data.pageSize,
        replyState: 2,
        userId: that.data.userId,
        hasDeal:1
      }
      that.setData({
        loading: true,
        loading_done: false
      })
      Req.getReq(urlList.getAtSelfMessage, params, function (res) {
        if (res.code == 200) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].sendTime = format.formatDate(res.data[i].sendTime)
            }
            var dataArr = that.data.dataArr
            res.data.reverse()
            dataArr.unshift(res.data)
            var res_arr = [].concat.apply([], dataArr)
            that.setData({
              notice: res_arr,
              //  scrollTop: 10000 * res.data.length,
              loading: false,
              loading_done: true
            })
          } else {
            that.setData({
              loading_done: true,
              loading: false
            })
          }
        }
      })
    }
  },
  sortObj: function sortObj(obj) {
    var arr = [];
    for (var i in obj) {
      arr.push([obj[i], i]);
    };
    arr.reverse();
    var len = arr.length;
    var obj = {};
    for (var i = 0; i < len; i++) {
      obj[arr[i][1]] = arr[i][0];
    }
    return obj;
  },
  goUserAffairs:function(e){
    var that = this
    var userId = e.currentTarget.dataset.id
    that.data.userId = userId
    console.log(e)
    // wx.navigateTo({
    //   url: '../receiptDetail/receiptDetail?userId='+userId,
    // })
    that.setData({
      visible:true
    })
  },
  handleClick:function(e){
    var that = this
    var userId = that.data.userId
    that.setData({
      visible:false
    })
    const index = e.detail.index
    if(index === 0){
      console.log('会务')
      wx.navigateTo({
        url: '../receiptDetail/receiptDetail?userId='+userId,
      })
    }else if(index === 1){
      console.log('已阅')
    }else{
      console.log('取消')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.userId){
      var that = this
      var userId = options.userId
      var openId = app.globalData.openId
      that.data.userId = userId
      var arr = []
      var params = {
        page: that.data.page,
        pageSize: that.data.pageSize,
        replyState: 2,
        userId: userId,
        scrollTop: 0,
        hasDeal:0
      }
      wx.showLoading({
        title: '加载中...',
      })
      Req.getReq(urlList.getAtSelfMessage, params, function (res) {
        wx.hideLoading()
        if (res.code == 200) {
          console.log(res)
          var arr = []
          var dataArr = that.data.dataArr
          dataArr.push(res.data.reverse())
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].sendTime = format.formatDate(res.data[i].sendTime)
            }
          }
          that.setData({
            notice: res.data,
            scrollTop: 10000 * res.data.length,
            openId:openId
          })
        }
        // console.log(res)
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