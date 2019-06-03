// pages/inMeetting/moreAlbum/moreAlbum.js
const app = getApp()
var Req = require('../../../utils/Req.js')
var urlList = require('../../../utils/base.js')
var prom = require('../../../utils/prom.js')
var util = require('../../../utils/util.js')
var format = require('../../../utils/formatDate.js')
var that = undefined
var page = undefined

Page({

  /**
   * 页面的初始数据
   */
  data: {
    button_type:"primary",
    switch:false,
    doommData: doommList,
    vertical:true,
    page:1,
    pageSize:5,
    DataSource:[],
    showDiscussBtn: false,
    discussInputHight: 0,
    focus: false,
    inputDanmu: '',
    imgId:'',
    imgSenderOpenId:'',
    imgName: '',
    files: [],
    isOnshow:true,
    btnBottom:2,
    scrollTop:0,
    scrollY:true
  },

  //
  discuss:function(e){
    console.log(e)
    var imgId = e.currentTarget.dataset.id 
    var imgSenderOpenId = e.currentTarget.dataset.sendid
    that.data.imgId = imgId,
    that.data.imgSenderOpenId = imgSenderOpenId
    that.setData({
      showDiscussBtn:true,
      focus:true,
      btnBottom: -100,
    })
  },
  //获取聚焦弹起键盘
  bindFocus: function (e) {
    that.setData({
      discussInputHight: e.detail.value + 100,
    })
  },

  //失去焦点时触发
  bindBlur: function (e) {
    that.setData({
      discussInputHight: 50,
      showDiscussBtn: false,
      btnBottom:2
    })
  },

  //
  bindInputDanmu:function(e){
    that.data.inputDanmu = e.detail.value
  },
  //
  sendDanmu:function(){
    this.animation.translate(-1000).step()
    this.animation.left(1000).step()
    this.animation.duration = 5000
    this.animation.width = 200
    this.setData({
      animation: this.animation.export(),
      showInputDanmu: that.data.inputDanmu,
      color: getRandomColor(),
      showDiscussBtn: false,
      imgId: that.data.imgId,
    })
    setTimeout(() => {
      this.animation.rotate(0, 0)
        .scale(1)
        .translate(0, 0)
        .skew(0, 0)
        .step({ duration: 0 })
      this.setData({ animation: this.animation.export() })
    }, 6000)

   // const sendInputDanmu = []
    let params = {
      album_id:that.data.imgId,
      content:that.data.inputDanmu,
      senderOpenId:that.data.imgSenderOpenId
    }
    Req.postReq(urlList.discussToImages,params,function(res){
     // console.log(res)
      that.setData({
        inputDanmu: ''
      })
      if(res.code == 200){
        // setTimeout(() =>{
        //   sendInputDanmu.push(new Doomm(that.data.inputDanmu, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 20), 0, getRandomColor()))
        //  // console.log(sendInputDanmu[0])
        //   that.setData({
        //     showDiscussBtn:false,
        //     sendInputDanmu: sendInputDanmu[0],
        //     imgId: that.data.imgId,
        //     inputDanmu: ''
        //   })
        // },0)
      }else if(res.code == -12001){
        wx.showToast({
          title: '请输入内容',
          icon:'none',
          duration:2000
        })
      } else {
        wx.showToast({
          title: '发送失败，请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


  onChange:function(e){
    var imgId = e.target.dataset.id 
    var dataSource = that.data.DataSource
    for(let i = 0; i < dataSource.length; i++){
      wx.setStorageSync(String(dataSource[i].id), dataSource[i].closeDanmu)
      if(dataSource[i].id == imgId){
        if(dataSource[i].closeDanmu == false){
          dataSource[i].closeDanmu = true
          wx.setStorageSync(String(dataSource[i].id), true)
        }else{
          wx.setStorageSync(String(dataSource[i].id), false)
          dataSource[i].closeDanmu = false
        }
      }
    }
    that.setData({
      imagesList: that.data.DataSource,
      scrollY:1000000
    })
  },

  //打开关闭弹幕


//图片预加载
imagesPreLoad:function(){
  var imgArr = that.data.DataSource
  that.data.page++
  let params = {
    page:that.data.page,
    pageSize:that.data.pageSize
  }
  Req.getReq(urlList.getImagesDiscussInfo, params, function (res) {
    //  console.log(res)
    if (res.code == 200) {
      for (let i = 0; i < res.data.length; i++) {
        Object.defineProperty(res.data[i], 'danmuList', {
          enumerable: true,
          writable: true,
          value: []
        })
        Object.defineProperty(res.data[i], 'isLikeTotal', {
          writable: true,
          enumerable: true,
          value: 0
        })
        Object.defineProperty(res.data[i], 'imgUrlArr', {
          writable: true,
          enumerable: true,
          value: []
        })
        if (res.data[i].imgUrl.split(',').length > 1) {
         for (let k = 0; k < res.data[i].imgUrl.split(',').length; k++) {
           res.data[i].imgUrlArr.push(urlList.imgUrl + res.data[i].imgUrl.split(',')[k])
         }
        }else{
          res.data[i].imgUrl = urlList.imgUrl + res.data[i].imgUrl
        }
        res.data[i].imgSendTime = format.formatDate(res.data[i].imgSendTime)
        for (let j = 0; j < res.data[i].Discusses.length; j++) {
          // doommList.push(new Doomm(res.data[i].Discusses[j].content, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
          res.data[i].danmuList.push(new Doomm(res.data[i].Discusses[j].content, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 20), Math.ceil(Math.random()*10), getRandomColor()))
          if(res.data[i].Discusses[j].isLike == 1){
            res.data[i].isLikeTotal++
          }
        }
        if (res.data[i].closeDanmu == 1) {
          res.data[i].closeDanmu = true
        } else {
          res.data[i].closeDanmu = false
        }
      }
    //  console.log(that.data.DataSource)
      imgArr.push(res.data)
      imgArr = [].concat.apply([],imgArr)
      that.data.DataSource = imgArr
      //console.log(that.data.DataSource)
      // console.log(that.data.DataSource)
        new Promise((resolve,reject) => {
          wx.getStorageInfo({
            success: function (res) {
              for (let i = 0; i < that.data.DataSource.length; i++) {
                for (let j = 0; j < res.keys.length; j++) {
                  if (String(that.data.DataSource[i].id) == res.keys[j]) {
                    that.data.DataSource[i].closeDanmu = wx.getStorageSync(res.keys[j])
                  }
                }
              }
              resolve()
            },
            fail:function(){
              reject()
            }
          })
        }).then(() => {
          that.setData({
            imagesList: that.data.DataSource,
            scrollTop: 1000000,
          })
        })
        setTimeout(() => {
          
        },200)
      if(res.data.length > 0){
        that.imagesPreLoad()
      }
    }
  })
},

//点赞
giveLike:function(e){
  console.log(e)
  const imgId = e.currentTarget.dataset.imgid;
  const senderOpenId = e.currentTarget.dataset.senderopenid
  let params = {
    album_id:imgId,
    isLike:1,
    senderOpenId:senderOpenId
  }
  Req.postReq(urlList.giveLikeToImages,params,function(res){
   // console.log(res)
    if(res.code == 200){
      const dataSource = that.data.DataSource
      for (let i = 0; i < dataSource.length; i++) {
        if(dataSource[i].id == imgId){
          dataSource[i].Discusses.push(res.data)
          dataSource[i].isLikeTotal+=1
        }
      }
      that.setData({
        imagesList:dataSource
      })
      wx.showToast({
        title: '点赞成功',
        icon:'success',
        duration:2000
      })
    }else if(res.code == -12017){
      wx.showToast({
        title: '请勿重复点赞',
        icon:'none',
        duration:2000
      })
    }else{
      wx.showToast({
        title: '点赞失败，请检查网络',
        icon:'none',
        duration:2000
      })
    }
  })
},
//上传图片
uploadImages:function(){
  // wx.navigateTo({
  //   url: '../createAlbum/createAlbum',
  // })
  wx.redirectTo({
    url: '../createAlbum/createAlbum',
  })
},

//预览图片
  previewImage:function(e){
    console.log(e)
    that.data.isOnshow = false
    var imgArr = []
    for(let i = 0; i < that.data.DataSource.length; i++){
      if(e.currentTarget.dataset.imgid == that.data.DataSource[i].id){
        if(that.data.DataSource[i].imgUrlArr.length == 0){
          imgArr.push(that.data.DataSource[i].imgUrl)
          //console.log(imgArr)
          wx.previewImage({
            urls:imgArr
          })
        }else{
          wx.previewImage({
            current:e.currentTarget.id,
            urls: that.data.DataSource[i].imgUrlArr,
          })
        }
      }
    }
    // wx.previewImage({
    //   current: e.currentTarget.id, // 当前显示图片的http链接
    //   urls: that.data.files // 需要预览的图片http链接列表
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    page = this
    let params = {
      page: that.data.page,
      pageSize: that.data.pageSize
    }
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getImagesDiscussInfo, params, function (res) {
      //console.log(res)
      wx.hideLoading()
      if (res.code == 200) {
        for (let i = 0; i < res.data.length; i++) {
          Object.defineProperty(res.data[i], 'danmuList', {
            enumerable: true,
            writable: true,
            value: []
          })
          Object.defineProperty(res.data[i], 'isLikeTotal', {
            writable: true,
            enumerable: true,
            value: 0
          })
          Object.defineProperty(res.data[i], 'imgUrlArr', {
            enumerable: true,
            writable: true,
            value: []
          })
          if (res.data[i].imgUrl.split(',').length > 1) {
            for (let k = 0; k < res.data[i].imgUrl.split(',').length; k++) {
              //res.data[i].imgUrl.split(',')[k] = urlList.imgUrl + res.data[i].imgUrl.split(',')[k]
              res.data[i].imgUrlArr.push(urlList.imgUrl + res.data[i].imgUrl.split(',')[k])
            }
          } else {
            res.data[i].imgUrl = urlList.imgUrl + res.data[i].imgUrl
          }
          // res.data[i].imgUrl = urlList.imgUrl + res.data[i].imgUrl
          res.data[i].imgSendTime = format.formatDate(res.data[i].imgSendTime)
          for (let j = 0; j < res.data[i].Discusses.length; j++) {
            // doommList.push(new Doomm(res.data[i].Discusses[j].content, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
            res.data[i].danmuList.push(new Doomm(res.data[i].Discusses[j].content, Math.ceil(Math.random() * 100), Math.ceil((Math.random()+0.5) * 10), Math.ceil(Math.random()*10), getRandomColor()))
            if (res.data[i].Discusses[j].isLike == 1) {
              res.data[i].isLikeTotal++
            }
          }
          if (res.data[i].closeDanmu == 1) {
            res.data[i].closeDanmu = true
          } else {
            res.data[i].closeDanmu = false
          }
        }
        that.data.DataSource = res.data
        if (res.data.length > 0) {
          that.imagesPreLoad()
        }
        // that.setData({
        //   imagesList: res.data,
        //   scrollTop:1000000
        // })
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that.animation = wx.createAnimation({
      duration: 8000,
      timingFunction: 'linear',
    })
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
    that.data.page = 1
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    that.data.page = 1
    that.data.isOnshow = true
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
var doommList = [];
var i = 0;//用做唯一的wx:key
class Doomm {
  constructor(text, top, time,delay, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.delay = delay;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);//动画完成，从列表中移除这项
      page.setData({
        doommData: doommList
      })
    }, this.time * 2000)//定时器动画完成后执行。
  }
}
// function getRandomColor() {
//   let rgb = []
//   for (let i = 0; i < 3; ++i) {
//     let color = Math.floor(Math.random() * 256).toString(16)
//     console.log(color)
//     color = color.length == 1 ? '0' + color : color
//     rgb.push(color)
//   }
//   return '#' + rgb.join('')
// }
function getRandomColor(){
  var colorArr = []
  var color = ['#0091ea','#ffff8d','#0d47a1','#9fa8da']
  var RandomColor = ''
  var randomCode = Math.floor(Math.random()*10)
  //console.log(randomCode)
  if (0 <= randomCode && randomCode <= 2){
    randomCode = 0
    RandomColor = color[randomCode]
  } else if (3 <= randomCode && randomCode <= 5){
    randomCode = 1
    RandomColor = color[randomCode]
  } else if (6 <= randomCode && randomCode <= 8){
    randomCode = 2
    RandomColor = color[randomCode]
  }else{
    RandomColor = color[3]
  }
  return RandomColor
}

