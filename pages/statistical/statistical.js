// pages/statistical/statistical.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts-min.js')
var format = require('../../utils/formatDate.js')
var that = undefined
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    payEffective:0,
    payInvalid:0,
    payPresent:0,
    arrangeHotel:0,
    selfSelectHotel:0,
    singleHotel:0,
    singelOrArrangeHotel:0,
    airPlane:0,
    train:0,
    selfDriving:0,
    tabsItem:['住宿统计','出行方式统计','T恤统计'],
    hotelRoom:true,
    transport:false,
    tshirt:false,
    WS: 0,
    WM: 0,
    WL: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
    XXXL: 0,
    SelectArr: []
  },
handleChange:function(e){
  if(e.detail.value == 0){
    new wxCharts({
      canvasId: 'roomCanvas',
      type: 'column',
      categories: ['组委会安排', '单间', '自选合住人', '保留单间，接受安排'],
      series: [{
        name: '住宿情况',
        data: [that.data.arrangeHotel, that.data.singleHotel, that.data.selfSelectHotel, that.data.singelOrArrangeHotel],
      }],
      width: 360,
      height: 200,
      dataLabel: true
    })
    that.setData({
      hotelRoom:true,
      transport:false,
      tshirt:false
    })
  }else if(e.detail.value == 1){
    new wxCharts({
      canvasId: 'transportCanvas',
      type: 'column',
      categories: ['自驾', '飞机', '火车'],
      series: [{
        name: '出行方式',
        data: [that.data.selfDriving, that.data.airPlane, that.data.train],
      }],
      width: 360,
      height: 200,
      dataLabel: true
    })
    that.setData({
      transport:true,
      hotelRoom:false,
      tshirt:false
    })
  }else if(e.detail.value == 2){
    new wxCharts({
      canvasId: 'lineCanvas',
      type: 'column',
      categories: ['WS', 'WM', 'WL', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      series: [{
        name: 'T恤各尺码件数',
        data: that.data.SelectArr,
        format: function (val) {
          return val.toFixed(0) + '件';
        }
      }],
      yAxis: {
        title: '数量 (件)',
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0,
        max: 30,
      },
      width: 360,
      height: 200
    });
    that.setData({
      transport: false,
      hotelRoom: false,
      tshirt: true
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let params = {}
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getSignInfoList,params,function(res){
      console.log(res)
      wx.hideLoading()
      if(res.code == 200){
        for(let i = 0; i < res.data.length; i++){
          //缴费选择
          if(res.data[i].payState == '确认缴费'){
            that.data.payEffective++
          }else if(res.data[i].payState == '未缴费'){
            that.data.payInvalid++
          }else{
            that.data.payPresent++
          }
          //住宿选择
          if(res.data[i].needSingleRoom == '0'){
            that.data.arrangeHotel++
          }else if(res.data[i].needSingleRoom == '1'){
            that.data.singleHotel++
          }else if(res.data[i].needSingleRoom == '2'){
            that.data.selfSelectHotel++
          }else if(res.data[i].needSingleRoom == '3'){
            that.data.singelOrArrangeHotel++
          }


          //出行选择
          if(res.data[i].transportation == '自驾'){
            that.data.selfDriving++
          }else if(res.data[i].transportation == '火车'){
            that.data.train++
          }else if(res.data[i].transportation == '飞机'){
            that.data.airPlane++
          }
         // res.data[i].expectedArrivalTime = format.formatDate(res.data[i].expectedArrivalTime)
          if (res.data[i].expectedArrivalTime != null && format.formatDate(res.data[i].expectedArrivalTime) != '1970-1-1 08:00:00' && res.data[i].expectedArrivalTime != '') {
            res.data[i].expectedArrivalTime = format.formatDate(format.getLocalDate(res.data[i].expectedArrivalTime))
          } else {
            res.data[i].expectedArrivalTime = ''
          }
          
          if (res.data[i].TshirtSize == 'WS') {
            that.data.WS++
          } else if (res.data[i].TshirtSize == "WM") {
            that.data.WM++
          } else if (res.data[i].TshirtSize == 'WL') {
            that.data.WL++
          } else if (res.data[i].TshirtSize == 'S') {
            that.data.S++
          } else if (res.data[i].TshirtSize == 'M') {
            that.data.M++
          } else if (res.data[i].TshirtSize == 'L') {
            that.data.L++
          } else if (res.data[i].TshirtSize == 'XL') {
            that.data.XL++
          } else if (res.data[i].TshirtSize == 'XXL') {
            that.data.XXL++
          } else if (res.data[i].TshirtSize == 'XXXL') {
            that.data.XXXL++
          }
        }
        that.data.SelectArr.push(that.data.WS, that.data.WM, that.data.WL, that.data.S, that.data.M, that.data.L, that.data.XL, that.data.XXL, that.data.XXXL)
        that.setData({
          hotelRoomList: res.data
        })
        new wxCharts({
          canvasId: 'roomCanvas',
          type: 'column',
          categories: ['组委会安排', '单间', '自选合住人', '保留单间，接受安排'],
          series: [{
            name: '住宿情况',
            data: [that.data.arrangeHotel, that.data.singleHotel, that.data.selfSelectHotel, that.data.singelOrArrangeHotel],
          }],
          width: 360,
          height: 200,
          dataLabel: true
        })

        new wxCharts({
          canvasId: 'payCanvas',
          type: 'column',
          categories:['已缴费','未缴费','已递交'],
          series: [{
            name: '缴费情况',
            data: [that.data.payEffective,that.data.payInvalid,that.data.payPresent],
          }],
          width: 360,
          height: 200,
          dataLabel: true
        });
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