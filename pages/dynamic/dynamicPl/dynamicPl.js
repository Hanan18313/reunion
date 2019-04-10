// pages/dynamic/dynamicPl/dynamicPl.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js');
var page = undefined
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    doommData:doommList,
    animationData:[],
    swiper:[
      '../../../images/cs1.png',
      '../../../images/signIn.png',
      '../../../images/mine.png',
      '../../../images/portrait.png'
    ],
    showDiscussBtn: true,
    discussInputHight: 0,
    focus:false,
    inputDanmu:''
  },

  bindbt: function () {
    doommList.push(new Doomm("你是我的小苹果", Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
    this.setData({
      doommData: doommList
    })
  },
  bindInputDanmu: function (e) {
    that.data.inputDanmu = e.detail.value
  },
  //发送弹幕
  sendDanmu: function () {
    doommList.push(new Doomm(that.data.inputDanmu, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
    that.setData({
      inputDanmu: '',
      doommData:doommList
    })
  },

  //获取聚焦弹起键盘
  bindFocus: function (e) {
    var that = this
    that.setData({
      discussInputHight: e.detail.value + 100
    })
  },

  //失去焦点时触发
  bindBlur: function (e) {
    var that = this
    that.setData({
      discussInputHight: 50,
     // showDiscussBtn: false
    })
  },
  //保存图片到相册
  saveImageToPhotoAlbum:function(e){
    console.log(e)
    wx.getImageInfo({
      src: '../../../images/active.png',
      success:function(res){
        console.log(res)
      }
    })
    wx.saveImageToPhotosAlbum({
      filePath: '',
      success:function(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this
    that = this
    // for(let i = 0; i < 50; i++){
    //   doommList.push(new Doomm("你是我的小苹果,", Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
    // }
    setInterval(() => {
      for(let i = 0; i < 3; i++){
        doommList.push(new Doomm("你是我的小苹果,", Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
      }
    },2000)
    // this.setData({
    //   doommData: doommList
    // })
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
    var animation = wx.createAnimation({
      duration:3000,
      timingFunction:'ease'
    })
    that.animation = animation
    animation.scale(2,2).rotate(45).step()
    that.setData({
      animationData:animation.export()
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

  }
})


var doommList = [];
var i = 0;//用做唯一的wx:key
class Doomm {
  constructor(text, top, time, color) {
    this.text = text;
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