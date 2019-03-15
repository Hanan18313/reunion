// pages/scheduleAdd/scheduleAdd.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var formatDate = require('../../utils/formatDate.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    scheduleId:'',
    scheduleTitle: '',
    scheduleContent: '',
    scheduleContentLength: 0,
    scheduleArr:[],
    beginTime: {
      type: String, 	// 开始时间
      value: '06:00'
    },
    endTime: {
      type: String,	// 结束时间
      value: '22:00'
    },
    timeGap: {
      type: Number,	// 单位时间(min)
      value: 30
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
    startTime: '',
    endTime: '',
    show: false,
    inputTime: ''
  },
  // _yybindhide:function(e){
  //   console.log(e)
  // },
  _yybindchange: function (e) {
    var that = this
 //   console.log(e.detail)
 //   console.log()
    if (that.data.inputTime == 'startTime') {
      that.setData({
        startTime: e.detail.date,
        "startTime": e.detail.date,
      })
    } else {
      that.setData({
        endTime: e.detail.date,
        "endTime": e.detail.date,
      })
    }
  },
  inputStartTime: function (e) {
    var that = this
    that.setData({
      show: true,
      'inputTime': e.currentTarget.dataset.name
    })
  },
  inputEndTime(e) {
    var that = this
    that.setData({
      show: true,
      'inputTime': e.currentTarget.dataset.name
    })
  },
  scheduleTitle: function (e) {
    // console.log(e)
    // if(e.detail.value.length >= 8){}
    var that = this
    that.data.scheduleTitle = e.detail.value
  },
  scheduleContent: function (e) {
    var that = this
    that.setData({
      scheduleContentLength: e.detail.value.length,
      "scheduleContent": e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this
    console.log(that.data.endTime)
    console.log(that.data.startTime)
    if (e.detail.value.scheduleTitle && e.detail.value.scheduleContent) {
      var obj = {
        id: that.data.scheduleId
      }
      Req.deleteReq(urlList.delMeetingSchedule,obj,function(res){
   //     console.log(res)
        if(res.code == 200){
          var params = {
            setTime: that.data.startTime,
            endTime: that.data.endTime,
            content: e.detail.value.scheduleContent,
            title: e.detail.value.scheduleTitle,
          }
          Req.postReq(urlList.addMeetingSchedule, params, function (res) {
            if (res.code == 200) {
              wx.showToast({
                title: '修改成功',
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
                title: '修改失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }else{
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请完善日程信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options)
    var that = this
    var scheduleId = options.scheduleId
    that.data.scheduleId = options.scheduleId
    var params = ''
    Req.getReq(urlList.meetingScheduleList,params,function(res){
      if(res.data.length > 0){
      //  console.log(res.data)
        var res_arr = [].concat.apply([], res.data)
        for(let i = 0; i < res_arr.length; i++){
          if(res_arr[i].id == scheduleId){
           
            res_arr[i].setTime = formatDate.formatDate(formatDate.getLocalDate(res_arr[i].setTime))
            res_arr[i].endTime = formatDate.formatDate(formatDate.getLocalDate(res_arr[i].endTime))
            that.data.scheduleArr = res_arr[i]
            console.log(that.data.scheduleArr)
   //         console.log(res.data[i])
          }
        }
        that.setData({
          scheduleInfo:that.data.scheduleArr,
          scheduleContentLength:that.data.scheduleArr.content.length,
          startTime:that.data.scheduleArr.setTime,
          endTime:that.data.scheduleArr.endTime
        })
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
      title: '毕业30年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})