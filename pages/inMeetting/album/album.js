// pages/inMeetting/album/album.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js')
var py = require('../../../utils/pinyin.js')

var that = undefined
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //isIphoneX: app.globalData.model,
    page: 1,
    pageSize: 200,
    dataArr: [],
    status: false,
    user_name: [],
    committee: false,
    options: [{
      text: '',
      type: ''
    },{
      text:'',
      type:''
    },{
      text:'',
      type:''
    },{
      text: '全部',
      type: 'radio',
      options: [{
        text: '全部',
      },
      {
        text: '一班',
      },
      {
        text: '二班',
      },
      {
        text: '三班',
      },
      {
        text: '其他',
      }]
    }],
    tabs:['全部','我的收藏','我'],
    tabsIndex:0
  },
//导航
handleChange:function(e){
  that.setData({
    tabsIndex:e.detail.value
  })
  let params = {}
  Req.getReq(urlList.getMyCollection,params,function(res){
   // console.log(res)
    if(res.code == 200){
      that.setData({
        collectionList:res.data
      })
    }
  })

},
  editAddress:function(e){
   // console.log(e)
    var userId = e.currentTarget.dataset.userid
    var info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '../signIn/signIn?userId='+userId+'&info='+info,
    })
  },


  //编辑
  edit: function (e) {
   // console.log(e)
    let userId = e.currentTarget.dataset.userid
    wx.navigateTo({
      url: '../../personEdit/personEdit?userId='+userId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = app.globalData.openId
    that = this
    var arr = []
    let params = {
      page: that.data.page,
      pageSize: that.data.pageSize,
      filter: {
        classroom: 0
      }
    }
    // var obj = ''
    // let storeName = new Array(26);
    // const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    // words.forEach((item, index) => {
    //   storeName[index] = {
    //     key: item,
    //     list: []
    //   }
    // })
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getUserList, params, function (res) {
      wx.hideLoading()
      if (res.code == 200) {
        // var dataArr = that.data.dataArr
        // dataArr.push(res.data)
        // res.data.forEach((item) => {
        //   let firstName = py.chineseToPinYin(item.userName).charAt(0)
        //   let index = words.indexOf(firstName);
        //   storeName[index].list.push({
        //     name: item.userName,
        //     key: firstName,
        //     userId: item.userId,
        //     phoneCn: item.phoneCn,
        //     isSign: item.isSign,
        //     payState: item.payState,
        //     committee: that.data.committee
        //   })
        // })
        // that.data.user_name = storeName
        that.setData({
          userList: res.data
        })
      }
    })
    Req.getReq(urlList.getUserInfoByOpenId,params,function(res){
     // console.log(res)
      if(res.code == 200){
        that.setData({
          userInfo:res.data
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
    let params = {}
    Req.getReq(urlList.getMyCollection, params, function (res) {
     // console.log(res)
      if (res.code == 200) {
        that.setData({
          collectionList: res.data
        })
      }
    })
    //获取我的信息
    Req.getReq(urlList.getUserInfoByOpenId, params, function (res) {
      // console.log(res)
      if (res.code == 200) {
        that.setData({
          userInfo: res.data
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
      title: '毕业30年庆',
      path: '/pages/index/index',
      imageUrl: '../../../images/tp.png'
    }
  }
})