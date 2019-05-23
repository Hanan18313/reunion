// pages/Tshirt/Tshirt.js
var wxCharts = require('../../utils/wxcharts-min.js')
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var py = require('../../utils/pinyin.js')
var that = undefined
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    WS:0,
    WM:0,
    WL:0,
    S:0,
    M:0,
    L:0,
    XL:0,
    XXL:0,
    XXXL:0,
    SelectArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let WS = 0, WM = 0, WL = 0, S = 0, M = 0, L = 0, XL = 0, XXL = 0, XXXL = 0
    let params = {}
    const sizeArr = []
    Req.getReq(urlList.getTshirtSize,params,function(res){
      if(res.code == 200){
        new Promise((resolve,reject) => {
          for (let i = 0; i < res.data.length; i++) {
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
          sizeArr.push(that.data.WS, that.data.WM, that.data.WL, that.data.S, that.data.M, that.data.L, that.data.XL, that.data.XXL, that.data.XXXL)
          resolve(sizeArr)
        }).then(result => {
          new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: ['WS', 'WM', 'WL', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            series: [{
              name: 'T恤各尺码件数',
              data:result,
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
            height: 260
          });
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let params = {}
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getTshirtSize,params,function(res){
      console.log(res)
      wx.hideLoading()
      if(res.code == 200){
        // for(let i = 0; i < res.data.length; i++){
        //   if(res.data[i].TshirtSize == '' || res.data[i].TshirtSize == '未选择' || res.data[i].TshirtSize == null){
        //     that.data.notSelectArr.push(res.data[i])
        //   }
        // }
        // that.setData({
        //   notSelectList:that.data.notSelectArr
        // })
        that.setData({
          notSelectList:res.data
        })
      }
    })
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