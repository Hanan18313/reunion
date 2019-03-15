// pages/notice/notice.js
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
    page:1,
    pageSize:20,
    loading: false,
    loading_done: false,
    dataArr:[],
    userId:''
  },
  upper:function(e){
    var that = this
    that.data.page++
    var params = {
      page:that.data.page,
      pageSize:that.data.pageSize,
      replyState: 2,
      userId: that.data.userId,
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
          dataArr.push(res.data)
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
      console.log(res)
    })
  },
  sortObj:function sortObj(obj) {
    var arr = [];
    for(var i in obj) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.userId)
    var that = this
    var userId = options.userId
    that.data.userId = userId
    var arr = []
    var params = {
      page:that.data.page,
      pageSize:that.data.pageSize,
      replyState:2,
      userId:userId,
      scrollTop:0
    }
    Req.getReq(urlList.getAtSelfMessage,params,function(res){
      if(res.code == 200){
        var arr = []
        var dataArr = that.data.dataArr
        dataArr.push(res.data.reverse())
        if(res.data.length > 0){
          for(let i = 0; i < res.data.length; i++){
            res.data[i].sendTime = format.formatDate(res.data[i].sendTime)
          }
        }
        that.setData({
          notice: res.data,
          scrollTop:10000*res.data.length
        })
      }
     // console.log(res)
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
      title: '毕业30年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})