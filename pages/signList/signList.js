// pages/signList/signList.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var py = require('../../utils/pinyin.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    page:1,
    pageSize:200,
    dataArr:[],
    roomTotal:0,
    familyTotal:0,
    pickTotal:0
  },
  onChange:function(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var arr = []
    let params = {
      page: that.data.page,
      pageSize: that.data.pageSize
    }
    Req.getReq(urlList.getSignInfoList, params, function (res) {
      //console.log(res)
      if (res.code == 200) {
        for(let i = 0; i < res.data.length; i++){
          Object.defineProperty(res.data[i],'familyNum',{
            enumerable: true,
            writable:true,
            value:0
          })
          if(res.data[i].needPickUp == 1){
            that.data.pickTotal++
          }
          if(res.data[i].needSingleRoom == 1){
            that.data.roomTotal++
          }
          // if(res.data[i].adultNum != 0 || res.data[i].kidsNum != 0){
          //   res.data[i].adultNum = Number(res.data[i].adultNum) + Number(res.data[i].kidsNum)
          // }
         // res.data[i].familyNum = Number(res.data[i].adultNum) + Number(res.data[i].kidsNum)
          that.data.familyTotal += Number(res.data[i].adultNum)+Number(res.data[i].kidsNum)
        }
        console.log(res.data)
        that.setData({
          signList:res.data,
          roomTotal:that.data.roomTotal,
          pickTotal:that.data.pickTotal,
          familyTotal:that.data.familyTotal
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
      title: '毕业30周年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})