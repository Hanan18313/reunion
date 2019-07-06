// pages/InMeetting/signIn/signIn.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js')
var that = undefined
// import Dialog from '../../../style/vant/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    region: ['中国', '美国', '加拿大', '澳洲', '日本', '欧洲', '港澳台'],
    regionArray: [
      {
        id: 0,
        name: '中国'
      },
      {
        id: 1,
        name: '美国'
      },
      {
        id: 2,
        name: '加拿大'
      },
      {
        id: 3,
        name: '澳洲'
      },
      {
        id: 4,
        name: '日本'
      },
      {
        id: 5,
        name: '欧洲'
      },
      {
        id: 6,
        name: '港澳台'
      }
    ],
    regionIndex: 0,
    account: ['微信', 'QQ', 'FaceBook', 'Twitter', 'E-mail'],
    accountArray: [
      {
        id: 0,
        name: '微信'
      },
      {
        id: 1,
        name: 'QQ'
      },
      {
        id: 2,
        name: 'FaceBook'
      },
      {
        id: 3,
        name: 'Twitter'
      },
      {
        id: 4,
        name: 'E-mail'
      }
    ],
    accountIndex: 0,
    userInfo: [],
    openid:'',
    showEdit:false,
    dataSource:[],
    collection:false
  },
  //编辑
  edit:function(){
    wx.navigateTo({
      url: '../../personEdit/personEdit?userId='+that.data.userId,
    })
  },
//拨打电话
callPhone:function(){
  if(that.data.dataSource.phoneCn){
    wx.makePhoneCall({
      phoneNumber: that.data.dataSource.phoneCn,
    })
  }else{
    wx.showToast({
      title: '该联系人电话不完善',
      icon:'none',
      duration:2000
    })
  }
},
saveContacts:function(){
  wx.addPhoneContact({
    firstName: that.data.dataSource.userName,
    mobilePhoneNumber:that.data.dataSource.phoneCn,
    addressCountry:that.data.dataSource.country,
    organization:that.data.dataSource.company,
    email:that.data.dataSource.socialMediaAccount
  })
},

//加入收藏
addCollection(){
  let params = {
    userId:that.data.userId
  }
  Req.postReq(urlList.addMyCollection,params,function(res){
    if(res.code == 200){
      that.setData({
        collection:true
      })
      wx.showToast({
        title: '操作成功',
        icon:'success',
        duration:2000
      })
    }else{
      wx.showToast({
        title: '已收藏，请勿重复操作',
        icon:'none',
        duration:2000
      })
    }
  })
},
removeCollection:function(){
  let params = {
    userId:that.data.userId
  }
  Req.deleteReq(urlList.removeMyCollection,params,function(res){
    if(res.code == 200){
      that.setData({
        collection:false
      })
      wx.showToast({
        title: '操作成功',
        icon: 'success',
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
    that.data.userId = options.userId
    if(options.info == 'info'){
      that.setData({
        showEdit:true
      })
    }else{
      that.setData({
        showEdit:false
      })
    }
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
    let params = {
      userId:that.data.userId
    }
    Req.getReq(urlList.getUserInfoByUserId, params, function (res) {
      if (res.code == 200) {
        that.data.openid = res.data.openId
        that.data.dataSource = res.data
        that.setData({
          userInfo: res.data,
          "userInfo": res.data,
          regionIndex: that.data.region.indexOf(res.data.country),
          accountIndex: that.data.account.indexOf(res.data.socialMedia)
        })
      }
    })
    let param1 = {
      userId:that.data.userId
    }
  //  console.log(param1)
    Req.getReq(urlList.getCollection,param1,function(res){
      console.log(res)
      if(res.code == 200){
        if(res.data){
          that.setData({
            collection:true
          })
        }else{
          that.setData({
            collection:false
          })
        }
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
      path: 'pages/index/index',
      imageUrl: '../../../images/tp.png'
    }
  }
})