// pages/scheduleAdd/scheduleAdd.js
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
    scheduleTitle:'',
    scheduleContent:'',
    scheduleContentLength:0,
    beginTime: {
      type: String, 	// 开始时间
      value: '09:00'
    },
    endTime: {
      type: String,	// 结束时间
      value: '21:00'
    },
    timeGap: {
      type: Number,	// 单位时间(min)
      value: 60
    },
    show: {
      type: Boolean, 	// 显示或隐藏遮罩
      value: false
    },
    showOverdue: {      // 显示或隐藏过期时间
      type: Boolean,
      value: true
    },
    themeColor: {       // 主题颜色
      type: String,
      value: '#ffd00a'
    },
    startTime:'',
    endTime:'',
    show:false,
    inputTime:''
  },
  // _yybindhide:function(e){
  //   console.log(e)
  // },
  _yybindchange:function(e){
    var that = this
    if(that.data.inputTime == 'startTime'){
      that.setData({
        startTime: e.detail.date,
        "startTime": e.detail.date,
      })
    }else{
      that.setData({
        endTime: e.detail.date,
        "endTime": e.detail.date,
      })
    } 
  },
  inputStartTime:function(e){
    var that = this
    that.setData({
      show:true,
      'inputTime':e.currentTarget.dataset.name
    })
  },
  inputEndTime(e){
    var that = this
    that.setData({
      show:true,
      'inputTime': e.currentTarget.dataset.name
    })
  },
  scheduleTitle:function(e){
    var that = this
    that.data.scheduleTitle = e.detail.value
  },
  scheduleContent:function(e){
    var that = this
    that.setData({
      scheduleContentLength:e.detail.value.length,
      "scheduleContent":e.detail.value
    })
  },
  submit:function(e){
    var that = this
    if(that.data.scheduleTitle && that.data.scheduleContent && that.data.startTime && that.data.endTime){
      var params = {
        setTime:that.data.startTime,
        endTime:that.data.endTime,
        content:that.data.scheduleContent,
        title:that.data.scheduleTitle
      }
      Req.postReq(urlList.addMeetingSchedule,params,function(res){
        if(res.code == 200){
          wx.showToast({
            title: '新建日程成功',
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
            title: '时间冲突，新建日程失败',
            icon:'none',
            duration:2000
          })
        }
      })
    }else{
      wx.showToast({
        title: '请完善日程信息',
        icon:'none',
        duration:2000
      })
    }
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
    return {
      title: '毕业30周年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})