// pages/inMeetting/createAlbum/createAlbum.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js')
var that = undefined
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgName: [],
    files: [],
    cHeight: 0,
    cWidth: 0,
    bindInputText:''
  },

  //上传图片

  chooseImage: function (e) {
    //  var that = this
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

  //删除上传图片
  trashImages:function(){
    that.data.files = []
    that.data.imgName = []
    that.setData({
      files:that.data.files,
    })
  },

  chooseWxImages: function (type) {
    //  var that = this
    wx.chooseImage({
      count:1,
      sizeType: ['compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res)
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        })
        var openId = app.globalData.openId;
        var tempFilePath = res.tempFilePaths;
        const _p = []
        tempFilePath.forEach((items,index) =>{
          _p[index] = new Promise((resolve, reject) => {
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
                //  that.data.imgName = JSON.parse(res.data).data[0]
                  that.data.imgName.push(JSON.parse(res.data).data[0])
                  wx.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 1500
                  })
                  resolve()
                } else {
                  wx.hideLoading()
                  wx.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 1500
                  })
                  reject()
                }
              },
              fail: function () {
                wx.hideLoading()
                wx.showToast({
                  title: '上传失败',
                  icon: 'none',
                  duration: 2000
                })
                resolve()
              },
            })
          }) 
        })
      },
    })
  },

  //预览
  previewImage: function (e) {
    var that = this
    console.log(that.data.files)
    //  console.log(this)
    wx.previewImage({
      current : e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.files // 需要预览的图片http链接列表
    })
  },
  bindInputText:function(e){
    that.data.bindInputText = e.detail.value
  },
  // 新增图片信息
  createAlbum:function(){
    console.log(that.data.imgName)
    var imgName = that.data.imgName.toString()
    let params = {
      title:that.data.bindInputText,
      imgUrl:imgName
    }
    Req.postReq(urlList.addImagesInfo,params,function(res){
      if(res.code == 200){
        wx.showToast({
          title: '操作成功',
          icon:'success',
          duration:2000
        })
        console.log(res)
        let imgId = res.data.id
        let uploader = res.data.uploader
        setTimeout(() =>{
          // wx.navigateBack({
          //   detal:1
          // })
          wx.redirectTo({
            url: '../moreAlbum/moreAlbum',
          })
        },2000)
      }else{
        wx.showToast({
          title: '操作失败，请重试',
          icon:'none',
          duration:2000
        })
      }
    })
  },
  //
  goback:function(){
    wx.redirectTo({
      url: '../moreAlbum/moreAlbum',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.hideTabBar({
      animation:false
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
    return{
      title:'毕业30年庆',
      path:'pages/index/index',
      imageUrl:'../../../images/tp.png'
    }
  }
})