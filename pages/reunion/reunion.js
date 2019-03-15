// pages/reunion/reunion.js
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
    page:1,
    pageSize:20,
    dataArr:[],
    status:false,
    user_name:[],
    committee:false,
    loading:false,
    loading_done:false,
    tags:[
      {
        name:'已报名',
        color:"green"
      },
      {
        name:'已缴费',
        color:'blue'
      }
    ],
    current:0
  },
  handleChange:function(e){
    console.log(e)
    var that = this
    if(e.detail.key == 0){
      var arr = []
      let params = {
        page: that.data.page,
        pageSize: that.data.pageSize,
        filter: {
          classroom: 0
        }
      }
      var obj = ''
      let storeName = new Array(26);
      const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
      words.forEach((item, index) => {
        storeName[index] = {
          key: item,
          list: []
        }
      })
      Req.getReq(urlList.getUserList, params, function (res) {
     //   console.log(res.data)
        Req.getReq(urlList.getOrganizerList, obj, function (val) {
          if (res.code == 200) {
            var dataArr = that.data.dataArr
            dataArr.push(res.data)
            res.data.forEach((item) => {
              // console.log(item.userName)
              // console.log(py.chineseToPinYin(item.userName).charAt(0))
              //let firstName = item.userName.substring(0,1);
              let firstName = py.chineseToPinYin(item.userName).charAt(0)
              let index = words.indexOf(firstName);
              // console.log(firstName)
              // console.log(storeName)
              // console.log(item.userName)
              // console.log(firstName)
              for (let i = 0; i < val.data.length; i++) {
                if (val.data[i].userId == item.userId) {
                  that.data.committee = true;
                  break;
                } else {
                  that.data.committee = false
                }
              }
              storeName[index].list.push({
                name: item.userName,
                key: firstName,
                userId: item.userId,
                phoneCn: item.phoneCn,
                isSign: item.isSign,
                payState: item.payState,
                committee: that.data.committee
              })
            })
            that.data.user_name = storeName
            that.setData({
              userList: that.data.user_name,
              loading: true,
            })
          }
        })
      })
    }else{
      let params = {
        filter: {
          classroom: e.detail.key
        },
        page: that.data.page,
        pageSize: 100
      }
      wx.showLoading({
        title: '加载中...',
      })
      Req.getReq(urlList.getUserList, params, function (res) {
        wx.hideLoading()
        if(res.code == 200){
          that.setData({
            userlist:res.data
          })
        }
      })
    }
    that.setData({
      current: e.detail.key
    })
  },
  lower:function(e){
    var that = this
    that.data.page++
    var params = {
      page:that.data.page,
      pageSize:that.data.pageSize
    }
    var obj = ''
    let storeName = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeName[index] = {
        key: item,
        list: []
      }
    })
    Req.getReq(urlList.getUserList, params, function (res) {
      Req.getReq(urlList.getOrganizerList,obj,function(val){
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
            for (let i = 0; i < val.data.length; i++) {
              if (val.data[i].userId == item.userId) {
                that.data.committee = true;
                break;
              } else {
                that.data.committee = false
              }
            }
            storeName[index].list.push({
              name: item.userName,
              key: firstName,
              userId: item.userId,
              phoneCn: item.phoneCn,
              isSign: item.isSign,
              payState: item.payState,
              committee: that.data.committee
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
    })
  },
  onChange(e){
  },
  detail(e){
   // console.log(e)
    var userId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detailUser/detailUser?userId='+userId,
    })
  },
  call:function(e){
    var phoneNumber = e._relatedInfo.anchorTargetText
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var arr = []
    let params = {
      page:that.data.page,
      pageSize:that.data.pageSize,
      filter:{
        classroom:0
      }
    }
    var obj = ''
    let storeName = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item,index) =>{
      storeName[index] = {
        key:item,
        list:[]
      }
    })
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getUserList,params,function(res){
     // console.log(res.data)
      Req.getReq(urlList.getOrganizerList,obj,function(val){
        wx.hideLoading()
        if (res.code == 200) {
          var dataArr = that.data.dataArr
          dataArr.push(res.data)
          res.data.forEach((item) => {
            // console.log(item.userName)
            // console.log(py.chineseToPinYin(item.userName).charAt(0))
            //let firstName = item.userName.substring(0,1);
            let firstName = py.chineseToPinYin(item.userName).charAt(0)
            let index = words.indexOf(firstName);
            // console.log(firstName)
            // console.log(storeName)
            // console.log(item.userName)
            // console.log(firstName)
            for(let i = 0 ; i < val.data.length; i++){
              if(val.data[i].userId == item.userId){
                that.data.committee = true;
                break;
              }else{
                that.data.committee = false
              }
            }
            storeName[index].list.push({
              name: item.userName,
              key: firstName,
              userId: item.userId,
              phoneCn: item.phoneCn,
              isSign: item.isSign,
              payState: item.payState,
              committee:that.data.committee
            })
          })
          that.data.user_name = storeName
          that.setData({
            userList: that.data.user_name,
            loading: true,
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let storeCity = new Array(26);
    // const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    // words.forEach((item, index) => {
    //   storeCity[index] = {
    //     key: item,
    //     list: []
    //   }
    // })
    // cities.forEach((item) => {
    //   let firstName = item.pinyin.substring(0, 1);
    //   let index = words.indexOf(firstName);
    //   storeCity[index].list.push({
    //     name: item.name,
    //     key: firstName
    //   });
    // })
    // this.data.cities = storeCity;
    // this.setData({
    //   cities: this.data.cities
    // })
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