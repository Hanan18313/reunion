// pages/dynamic/dynamicPl/dynamicPl.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js');
var page = undefined
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    doommData:doommList,
    input_bottom:80
  },

  bindbt: function () {
    doommList.push(new Doomm("你是我的小苹果", Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
    this.setData({
      doommData: doommList
    })
  },


  // 获取到焦点
  focus: function (e) {
    this.setData({
      input_bottom: 430
    })
  },

  // 失去焦点
  no_focus: function (e) {
    this.setData({
      input_bottom: 80
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this
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

  }
})


var doommList = [];
var i = 0;//用做唯一的wx:key
class Doomm {
  constructor(text, top, time, color) {
    this.text = text + i;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);//动画完成，从列表中移除这项
      page.setData({
        doommData: doommList
      })
    }, this.time * 1000)//定时器动画完成后执行。
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}