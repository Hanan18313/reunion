// pages/receiptManage/receiptManage.js
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
    pageSize:20,
    isSignArr:[]
  },
  detailReceipt:function(e){
    var that = this
    var userId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../receiptDetail/receiptDetail?userId='+userId,
    })
  },
  onChange:function(e){
 //   console.log(e)
    var that = this
    that.setData({
      current:e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var arr = []
    let params = {
      page: that.data.page,
      pageSize: 200
    }
    let storeName = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeName[index] = {
        key: item,
        list: []
      }
    })
    Req.getReq(urlList.getUserList, params, function (res) {
      if (res.code == 200) {
        // var dataArr = that.data.dataArr
        // dataArr.push(res.data)
        res.data.forEach((item) => {
          let firstName = py.chineseToPinYin(item.userName).charAt(0)
          let index = words.indexOf(firstName);
         // console.log(item)
          if(item.isSign == 1){
            storeName[index].list.push({
              name: item.userName,
              key: firstName,
              userId: item.userId,
              phoneCn: item.phoneCn,
              isSign: item.isSign
            })
          }
        })
        that.data.user_name = storeName
        that.setData({
          userList: that.data.user_name,
         // loading: true,
        })
      }
    })
    // var that = this
    // var params = {
    //   page:that.data.page,
    //   pageSize:200
    // }
    // Req.getReq(urlList.getUserList,params,function(res){
    //   console.log(res)
    //   if(res.data.length > 0){
    //     for(let i = 0; i < res.data.length; i++){
    //       if(res.data[i].isSign == 1){
    //         that.isSignArr.push(res.data[i])
    //       }
    //     }
    //     that.setData({
    //       isSign:isSignArr
    //     })
    //   }
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
    var that = this
    var params = ''
    Req.getReq(urlList.getAtSelfMessage,params,function(res){
   //   console.log(res)
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