// pages/addCommittee/addCommittee.js
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
    inputShowed: false,
    inputVal: "",
    page: 1,
    pageSize: 20,
    dataArr: [],
    status: false,
    user_name: [],
    loading: false,
    loading_done: false,
    current:[],
  },
  lower: function (e) {
    var that = this
    that.data.page++
    console.log(that.data.page)
    var params = {
      page: that.data.page,
      pageSize: that.data.pageSize
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
      if (res.data.length > 0) {
        var dataArr = that.data.dataArr
        dataArr.push(res.data)
        var res_arr = [].concat.apply([], dataArr)
        res_arr.forEach((item) => {
          // console.log(item.userName)
          // console.log(py.chineseToPinYin(item.userName).charAt(0))
          //let firstName = item.userName.substring(0,1);
          let firstName = py.chineseToPinYin(item.userName).charAt(0)
          let index = words.indexOf(firstName);
          // console.log(firstName)
          // console.log(storeName)
          // console.log(item.userName)
          // console.log(firstName)
          storeName[index].list.push({
            name: item.userName,
            key: firstName,
            userId: item.userId,
            phoneCn: item.phoneCn,
            isSign: item.isSign,
            payState: item.payState
          })
        })
        that.data.user_name = storeName
        that.setData({
          userList: that.data.user_name,
          loading: true,
          loading_done: false
        })
      } else {
        that.setData({
          loading_done: true,
          loading: false
        })
      }
    })
  },
  handleCommitteeChange({detail = {}}){
    var that = this
    const index = this.data.current.indexOf(detail.value);
    index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
    this.setData({
      current: this.data.current
    });
    console.log(detail)
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
        var dataArr = that.data.dataArr
        dataArr.push(res.data)
        res.data.forEach((item) => {
          console.log(item)
          // console.log(item.userName)
          // console.log(py.chineseToPinYin(item.userName).charAt(0))
          //let firstName = item.userName.substring(0,1);
          let firstName = py.chineseToPinYin(item.userName).charAt(0)
          let index = words.indexOf(firstName);
          // console.log(firstName)
          // console.log(storeName)
          // console.log(item.userName)
          // console.log(firstName)
          storeName[index].list.push({
            name: item.userName,
            key: firstName,
            userId: item.userId,
            phoneCn: item.phoneCn,
            isSign: item.isSign
          })
        })
        that.data.user_name = storeName
        that.setData({
          userList: that.data.user_name,
          loading: true,
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

  }
})