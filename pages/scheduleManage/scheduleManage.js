// pages/scheduleManage/scheduleManage.js
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
    startDate:'',
    endDate:'',
    scheduleList:[]
  },
  bindStartDateChange(e){
    var that = this
    that.setData({
      startDate:e.detail.value,
      "startDate": e.detail.value
    })
  },
  bindEndDateChange(e){
    var that = this
    that.setData({
      endDate:e.detail.value,
      "endDate": e.detail.value
    })
  },
  addSchedule:function(){
    wx.navigateTo({
      url: '../scheduleAdd/scheduleAdd',
    })
  },
  submit:function(){
    var that = this
    if(that.data.startDate && that.data.endDate){
      var params = {
        startDate:that.data.startDate,
        endDate:that.data.endDate,
        id:1
      }
      Req.putReq(urlList.updateMeetingInfo,params,function(res){
    //    console.log(res)
        if(res.code == 200){
          wx.showToast({
            title: '更新成功',
            icon:'success',
            duration:2000
          })
        }else{
          wx.showToast({
            title: '更新失败',
            icon:'none',
            duration:2000
          })
        }
      })
    }else{
      wx.showToast({
        title: '请完善日期信息',
        icon:'none',
        duration:2000
      })
    }
  },
  detailSchedule:function(e){
    var shceduleId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../scheduleEdit/scheduleEdit?scheduleId='+shceduleId,
    })
  },
  deleteSchedule:function(e){
    var that = this
    var scheduleId = e.currentTarget.dataset.id
    var params = {
      id:scheduleId
    }
    for(let i = 0; i < that.data.scheduleList.length; i++){
      if(scheduleId == that.data.scheduleList[i].id){
        that.data.scheduleList.splice(i,1)
      }
    }
    Req.deleteReq(urlList.delMeetingSchedule,params,function(res){
      if(res.code == 200){
        that.setData({
          scheduleList:that.data.scheduleList
        })
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
    var that = this
    var  params = ''
    Req.getReq(urlList.getMeetingInfo,params,function(res){
      if(res.data){
        that.setData({
          startDate: util.formatTime(formatDate.getLocalDate(res.data.startDate)),
          endDate: util.formatTime(formatDate.getLocalDate(res.data.endDate))
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
    var that = this
    var params = ''
    Req.getReq(urlList.meetingScheduleList, params, function (res) {
      if(res.code == 200){
        if(res.data.length > 0){
          var res_arr = [].concat.apply([], res.data)
          for(let i = 0; i < res_arr.length; i++){
            res_arr[i].setTime = formatDate.formatDate(formatDate.getLocalDate(res_arr[i].setTime))
            res_arr[i].endTime = formatDate.formatDate(formatDate.getLocalDate(res_arr[i].endTime))
          }
          console.log(res_arr)
          that.setData({
            scheduleList:res_arr
          })
        }
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