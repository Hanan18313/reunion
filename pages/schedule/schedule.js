// pages/scheduleManage/scheduleManage.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var formatDate = require('../../utils/formatDate.js')
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    startDate: '',
    endDate: '',
    scheduleList: [],
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串
    demo5_days_style: [],
    days:[],
    tagMonth:[]
  },
  uniq: function (array) {
    var temp = {}, r = [], len = array.length, val, type;
    for (var i = 0; i < len; i++) {
      val = array[i];
      type = typeof val;
      if (!temp[val]) {
        temp[val] = [type];
        r.push(val);
      } else if (temp[val].indexOf(type) < 0) {
        temp[val].push(type);
        r.push(val);
      }
    }
    return r;
  },
  // dateChange:function(e){
  // //  console.log(e)
  //   var that = this
  //   const days_count = new Date(this.data.year, this.data.month, 0).getDate();
  //   let demo5_days_style = new Array;
  //   new Promise((resolve,reject) =>{
  //     resolve()
  //   }).then(() =>{
  //     for (let i = 0; i < that.data.days.length; i++) {
  //       console.log(that.data.days[i])
  //       demo5_days_style.push({ month: 'current', day: that.data.days[i], color: 'white', background: '#b49eeb' });
  //     }
  //   }).then(() =>{
  //     that.setData({
  //       demo5_days_style:demo5_days_style
  //     })
  //   })

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var params = ''
    // console.log(days_count)
    // for (let i = 1; i <= days_count; i++) {
    //   const date = new Date(this.data.year, this.data.month - 1, i);
    //   if (date.getDay() == 0) {
    //     demo5_days_style.push({
    //       month: 'current', day: i, color: '#f488cd'
    //     });
    //   } else {
    //     demo5_days_style.push({
    //       month: 'current', day: i, color: '#a18ada'
    //     });
    //   }
    // }
      // that.data.days = that.uniq(date)
    Req.getReq(urlList.getMeetingInfo, params, function (res) {
      if (res.data) {
        that.setData({
          startDate: util.formatTime(res.data.startDate),
          endDate: util.formatTime(res.data.endDate),
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
    var dateArr = []
    var timeArr = []
    var day = []
    var month = []
    Req.getReq(urlList.meetingScheduleList, params, function (res) {
      if (res.code == 200) {
       // console.log(res.data)
        if(res.data.length > 0){
          for(let i = 0; i < res.data.length; i++){
            for(let j = 0; j < res.data[i].length; j++){
              day.push(new Date(res.data[i][j].setTime).getDate())
              month.push(new Date(res.data[i][j].setTime).getMonth()+1)
              Object.defineProperty(res.data[i][j],'date',{
                value: formatDate.formatDateEn(res.data[i][j].setTime),
                enumerable:true
               // value: formatDate.formatTimeInt(res.data[i][j].setTime)
              })
              Object.defineProperty(res.data[i][j], 'STime', {
                value: formatDate.formatTimeInt(res.data[i][j].setTime),
                enumerable:true
                // value: formatDate.formatTimeInt(res.data[i][j].setTime)
              })
              Object.defineProperty(res.data[i][j], 'ETime', {
                value: formatDate.formatTimeInt(res.data[i][j].endTime),
                enumerable: true
                // value: formatDate.formatTimeInt(res.data[i][j].setTime)
              })
              res.data[i][j].setTime = formatDate.formatDate(res.data[i][j].setTime)
              res.data[i][j].endTime = formatDate.formatDate(res.data[i][j].endTime)
            //  var dateFormat = new Date(res.data[i][j].date)
            }
          }
        }
        that.data.days = that.uniq(day)
        that.data.tagMonth = that.uniq(month)
        that.setData({
          scheduleList:res.data,
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