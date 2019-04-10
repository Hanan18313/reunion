// pages/inMeetting/mineAlbum/mineAlbum.js
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
    // isIphoneX: app.globalData.model,
    page:1,
    pageSize:10,
    imgName: '',
    files: [],
    cHeight:0,
    cWidth:0,
    vertical:true,
    //previousMargin:'400px',
    nextMargin:'100rpx',
    DataSource:[]
  },

  createAlbum:function(){
    wx.navigateTo({
      url: '../createAlbum/createAlbum',
    })
  },
//删除图片
deleteImg:function(e){
  const imgId = e.currentTarget.dataset.id;
  var dataSource = [];
  dataSource = that.data.DataSource;
  // const dataSource = that.data.DataSource
  let params = {
    id:imgId
  }
  Req.deleteReq(urlList.deleteImagesInfo,params,function(res){
    if(res.code == 200){
      for(let i = 0; i < dataSource.length; i++){
        if(dataSource[i].id == imgId){
          dataSource.splice(i,1)
        }
      }
      console.log(dataSource)
      that.setData({
        albumList:dataSource
      })
      wx.showToast({
        title: '删除成功',
        icon:'success',
        duration:2000
      })
    }
  })
},

//图片预览
previewImage:function(e){
  console.log(e)
  var imgId = e.currentTarget.dataset.imgid;
  var imgArr = []
  for(let i = 0; i < that.data.DataSource.length; i++){
    if (imgId == that.data.DataSource[i].id){
      if(that.data.DataSource[i].imgUrlArr.length == 0){
        imgArr.push(that.data.DataSource[i].imgUrl)
        wx.previewImage({
          urls:imgArr
        })
      }else{
        wx.previewImage({
          urls: that.data.DataSource[i].imgUrlArr,
          current:e.currentTarget.id
        })
      }
    }
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
      page: that.data.page,
      pageSize: that.data.pageSize
    }
    Req.getReq(urlList.getMineImagesInfo, params, function (res) {
      console.log(res)
      if (res.code == 200) {
        if(res.data.length > 0){
          for (let i = 0; i < res.data.length; i++) {
            Object.defineProperty(res.data[i], 'imgUrlArr', {
              writable: true,
              enumerable: true,
              value: []
            })
            Object.defineProperty(res.data[i],'isLikeTotal',{
              writable:true,
              enumerable:true,
              value:0
            })
            if (res.data[i].imgUrl.split(',').length > 1) {
              for (let j = 0; j < res.data[i].imgUrl.split(',').length; j++) {
                res.data[i].imgUrlArr.push(urlList.imgUrl + res.data[i].imgUrl.split(',')[j])
              }
            } else {
              res.data[i].imgUrl = urlList.imgUrl + res.data[i].imgUrl
            }
            for (let j = 0; j < res.data[i].Discusses.length; j++) {
              if (res.data[i].Discusses[j].isLike == 1) {
                res.data[i].isLikeTotal++
              }
            }
          }
          that.data.DataSource = res.data
          that.setData({
            albumList: res.data
          })
        }else{
          wx.showToast({
            title: '您暂没有上传图片',
            icon:'none',
            duration:2000
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