// pages/newsAdd/newsAdd.js
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
    openId: app.globalData.openId,
    imgName:'',
    files:[],
    disabled:false,
    loading:false
  },
  chooseImage: function (e) {
    var that = this
    // that.showActionSheet()
    wx.showActionSheet({
      itemList: ['拍照', '从手机选择'],
      success: function (res) {
        if (res.tapIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              that.setData({
                files:that.data.files.concat(res.tempFilePaths)
              })
              var openId = app.globalData.openId
              var tempFilePath = res.tempFilePaths
          //    console.log(tempFilePath)
              wx.showLoading({
                title: '上传图片...',
              })
              wx.uploadFile({
                url: urlList.uploadImgForMeetingNews,
                filePath: tempFilePath[0],
                name: 'file',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'openId': openId
                },
                success: function (res) {
                  var val = JSON.parse(res.data)
            //      console.log(JSON.parse(res.data))
                  wx.hideLoading()
                  if (JSON.parse(res.data).msg == '上传成功') {
              //      console.log(JSON.parse(res.data).data)
                    that.data.imgName = JSON.parse(res.data).data[0]
                    wx.showToast({
                      title: '上传成功',
                      icon: 'success',
                      duration: 1500
                    })
                  } else {
                    wx.showToast({
                      title: '上传失败',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                }
              })
            },
          })
        } else {


        }
      },
      // fail: function (res) {
      //   wx.hideLoading()
      //   wx.showToast({
      //     title: '上传失败，请检查网络',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
    })
  },
  chooseImage: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['从相册选取', '拍照'],
      itemColor: '#1531AE',
      success: function () { },
      fail: function () { },
      complete: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImages('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImages('camera')
          }
        }
      }
    })
  },
  chooseWxImages: function (type) {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        // console.log(that.data)
        // console.log(res)
        that.setData({
          // tempFliePaths: res.tempFilePaths,
          files: that.data.files.concat(res.tempFilePaths)
        })
        // console.log('res:' + res.tempFilePaths)
        var openId = app.globalData.openId
        var tempFilePath = res.tempFilePaths
    //    console.log(tempFilePath)
        wx.showLoading({
          title: '上传图片...',
        })
        wx.uploadFile({
          url: urlList.uploadImgForMeetingNews,
          filePath: tempFilePath[0],
          name: 'file',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'openId': openId
          },
          success: function (res) {
            var val = JSON.parse(res.data)
            console.log(JSON.parse(res.data))
            wx.hideLoading()
            if (JSON.parse(res.data).msg == '上传成功') {
       //       console.log(JSON.parse(res.data).data)
              that.data.imgName = JSON.parse(res.data).data[0]
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1500
              })
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 1500
              })
            }
          }
        })
      },
    })
  },

  //预览
  previewImage: function (e) {
    var that = this
  //  console.log(e)
  //  console.log(this)
    wx.previewImage({
      // current : e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.files // 需要预览的图片http链接列表
    })
  },
  formSubmit:function(e){
    var that = this
 //   console.log(that.data.imgName)
 //   console.log(e)
    if(that.data.imgName){
      if(e.detail.value.title && e.detail.value.content){
        let params = {
          title:e.detail.value.title,
          content:e.detail.value.content,
          img:that.data.imgName
        }
        that.setData({
          loading:true,
          disabled:true
        })
        Req.postReq(urlList.addMeetingNews,params,function(res){
      //    console.log(res)
          that.setData({
            loading: false,
            disabled: false
          })
          if(res.code == 200){
            wx.showToast({
              title: '提交成功',
              icon:'success',
              duration:2000
            })
            setTimeout(() =>{
              wx.navigateBack({
                detal:1
              })
            },2000)
          }else{
            wx.showToast({
              title: '提交失败',
              icon:'none',
              duration:2000
            })
          }
        })
      }else{
        wx.showToast({
          title: '标题或内容不能为空',
          icon:'none',
          duration:2000
        })
      }
    }else{
      wx.showToast({
        title: '请先上传图片',
        icon:'none',
        duration:2000
      })
    }
    // if(){}
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