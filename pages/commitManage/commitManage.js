// pages/commitManage/commitManage.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    show:false,
    data_arr:[]
  },
  onClose:function(){
    var that = this
    that.setData({
      show:false
    })
  },
  add:function(){
    var that = this
    wx.navigateTo({
      url: '../addCommittee/addCommittee?data_arr='+that.data.data_arr,
    })
  },
  del:function(e){
    var that = this
    var userId = e.currentTarget.dataset.id
    var userName = e.currentTarget.dataset.name
    wx.showModal({
      title: '提示',
      content: '是否将'+userName+'从组委会移除?',
      confirmText:'确定',
      confirmColor:'#e52c23',
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '加载中...',
          })
          var params = {
            userId:userId
          }
          Req.deleteReq(urlList.removeOrganizer,params,function(res){
           // console.log(res)
            if(res.code == 200){
             // var that = this
              var data = ''
              var data_arr = that.data.data_arr
              Req.getReq(urlList.getOrganizerList, data, function (res) {
                if(res.code == 200){
                  wx.hideLoading()
                  wx.showToast({
                    title: '移除成功',
                    icon: 'success',
                    duration: 1500
                  })
                  setTimeout(() => {
                    that.setData({
                      OrganizerList: res.data
                    })
                  }, 1500)
                } else {
                  wx.showToast({
                    title: '移除失败',
                    icon: 'none',
                    duration: 1500
                  })
                }
              })
              // wx.showToast({
              //   title: '移除成功',
              //   icon:'success',
              //   duration:1500
              // })
            }else{
              wx.showToast({
                title: '移除失败',
                icon:'none',
                duration:1500
              })
            }
          })
        }else if(res.cancel){
        //  console.log(0)
        }
      }
    })
  },
  group:function(e){
    wx.navigateTo({
      url: '../jobCommittee/jobCommittee',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var data = ''
    var data_arr = that.data.data_arr
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getOrganizerList, data, function (res) {
  //    console.log(res.data)
      wx.hideLoading()
      if (res.code == 200) {
        if(res.data.length > 0){
          for (let i in res.data) {
            data_arr.push(res.data[i].userId)
          }
        }
        that.setData({
          OrganizerList: res.data
        })
      }else{
        wx.showToast({
          title: '加载失败',
          icon:'none',
          duration:1500
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
      imageUrl: '../../images/tp.png'
    }
  }
})