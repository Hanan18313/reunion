// pages/inMeetting/assignPicture/assignPicture.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js')
var that = undefined
var page = undefined
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    isLikeTotal:0,
    imgId:'',
    senderOpenId:'',
    dataSource:[],
    showDiscussBtn: false,
    discussInputHight: 0,
    focus: false,
    inputDanmu: '',
    showAssignPicture:false
  },

//点赞
giveLike:function(){
  let params = {
    album_id:that.data.imgId,
    isLike:1,
    senderOpenId:that.data.senderOpenId
  }
  Req.postReq(urlList.giveLikeToImages,params,function(res){
    console.log(res)
    if(res.code == 200){
      that.data.dataSource.Discusses.push(res.data);
      that.data.isLikeTotal++;
      wx.showToast({
        title: '点赞成功!',
        icon:'success',
        duration:1500
      })
      that.setData({
        assignPicture:that.data.dataSource,
        isLikeTotal:that.data.isLikeTotal
      })
    }else if(res.code == -12017){
      wx.showToast({
        title: '请勿重复点赞',
        icon:'none',
        duration:1500
      })
    } else {
      wx.showToast({
        title: '点赞失败，请检查网络',
        icon: 'none',
        duration: 1500
      })
    }
  })
},


  //
  discuss: function (e) {
    that.setData({
      showDiscussBtn: true,
      focus: true,
      btnBottom: 20,
    })
  },
  //获取聚焦弹起键盘
  bindFocus: function (e) {
    that.setData({
      discussInputHight: e.detail.value + 100,
    })
  },

  //失去焦点时触发
  bindBlur: function (e) {
    that.setData({
      discussInputHight: 50,
      showDiscussBtn: false,
      btnBottom: 2
    })
  },

  //
  bindInputDanmu: function (e) {
    that.data.inputDanmu = e.detail.value
  },


  //弹幕开关
  onChange: function (e) {
    console.log(e)
    wx.setStorageSync(String(e.currentTarget.dataset.id), e.detail.value)
    var dataSource = that.data.dataSource
    console.log(dataSource)
    dataSource.closeDanmu = e.detail.value
    that.setData({
      assignPicture: dataSource,
    })
  },

//发送弹幕

sendDanmu:function(){
  const sendInputDanmu = []
  let params = {
    album_id:that.data.imgId,
    content:that.data.inputDanmu,
    senderOpenId:that.data.senderOpenId
  }
  Req.postReq(urlList.discussToImages,params,function(res){
    if (res.code == 200) {
      wx.showToast({
        title: '评论成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        sendInputDanmu.push(new Doomm(that.data.inputDanmu, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 20), 0, getRandomColor()))
        // console.log(sendInputDanmu[0])
        that.setData({
          showDiscussBtn: false,
          sendInputDanmu: sendInputDanmu[0],
          imgId: that.data.imgId,
          inputDanmu: ''
        })
      }, 3000)
    } else if (res.code == -12001) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '发送失败，请检查网络',
        icon: 'none',
        duration: 2000
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    page = this
    var imgId = options.imgId;
    var senderOpenId = options.senderOpenId;
    that.data.imgId = imgId;
    that.data.senderOpenId = senderOpenId
    let params = {
      imgId:imgId
    }
    Req.postReq(urlList.getAssignPicture,params,function(res){
      console.log(res)
      if(res.code == 200){
        if(res.data){
          that.data.dataSource = res.data
          res.data.imgUrl = urlList.imgUrl + res.data.imgUrl
          res.data.closeDanmu = wx.getStorageSync(String(that.data.imgId))
          Object.defineProperty(res.data, 'danmuList', {
            writable: true,
            enumerable: true,
            value: []
          })
          for (let i = 0; i < res.data.Discusses.length; i++) {
            if (res.data.Discusses[i].isLike == '1') {
              that.data.isLikeTotal++
            }
            res.data.danmuList.push(new Doomm(res.data.Discusses[i].content, Math.ceil(Math.random() * 100), Math.ceil((Math.random() + 0.5) * 10), Math.ceil(Math.random() * 10), getRandomColor()))
          }
          that.setData({
            assignPicture: res.data,
            isLikeTotal: that.data.isLikeTotal
          })
        }else{
          that.setData({
            showAssignPicture:true
          })
          wx.showToast({
            title: '该图片不存在，或已被删除',
            icon:'none',
            duration:2000
          })
        }
      }
    })
    console.log(imgId)
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
  constructor(text, top, time, delay, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.delay = delay;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);//动画完成，从列表中移除这项
      page.setData({
        doommData: doommList
      })
    }, this.time * 2000)//定时器动画完成后执行。
  }
}
// function getRandomColor() {
//   let rgb = []
//   for (let i = 0; i < 3; ++i) {
//     let color = Math.floor(Math.random() * 256).toString(16)
//     console.log(color)
//     color = color.length == 1 ? '0' + color : color
//     rgb.push(color)
//   }
//   return '#' + rgb.join('')
// }
function getRandomColor() {
  var colorArr = []
  var color = ['#0091ea', '#a1887f', '#0d47a1', '#ffea00']
  var RandomColor = ''
  var randomCode = Math.floor(Math.random() * 10)
  //console.log(randomCode)
  if (0 <= randomCode && randomCode <= 2) {
    randomCode = 0
    RandomColor = color[randomCode]
  } else if (3 <= randomCode && randomCode <= 5) {
    randomCode = 1
    RandomColor = color[randomCode]
  } else if (6 <= randomCode && randomCode <= 8) {
    randomCode = 2
    RandomColor = color[randomCode]
  } else {
    RandomColor = color[3]
  }
  return RandomColor
}