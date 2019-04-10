// pages/receiptNotice/receiptNotice.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var format = require('../../utils/formatDate.js')

var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    msgList: [],
    height: 0,
    scrollY: true,
    scrollTop:0,
    current:0,
    userId:'',
    unDealNotice:[],
    hasDealNotice:[],
    page:1,
    unDealStartPage:1,
    hasDealStartPage:1,
    pageSize:1000
  },
  swipeCheckX: 35, //激活检测滑动的阈值
  swipeCheckState: 0, //0未激活 1激活
  maxMoveLeft: 185, //消息列表项最大左滑距离
  correctMoveLeft: 175, //显示菜单时的左滑距离
  thresholdMoveLeft: 75,//左滑阈值，超过则显示菜单
  lastShowMsgId: '', //记录上次显示菜单的消息id
  moveX: 0,  //记录平移距离
  showState: 0, //0 未显示菜单 1显示菜单
  touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
  swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动

//directToPersonReceipt
  directToPersonReceipt:function(e){
  //  console.log(e)
    var userId = e.currentTarget.dataset.userid
    var messageId = e.currentTarget.dataset.messageid
    wx.navigateTo({
      url: '../receiptDetail/receiptDetail?userId='+userId+'&messageId='+messageId,
    })
  },
//选择处理类型
  handleChange:function(e){
    console.log(e)
    that.setData({
      current:e.detail.key
    })
    //未处理
    if(e.detail.key == 0){
      that.getDealNotice(e.detail.key)
      // let params = {
      //   page: 1,
      //   pageSize: 50,
      //   replyState: 2,
      //   userId: userId,
      //   hasDeal: e.detail.key
      // }
      // Req.getReq(urlList.getAtSelfMessage,params,function(res){
      //   console.log(res)
      // })
    }else{
      that.getDealNotice(e.detail.key)
    }
  },

//获取未处理方法
getDealNotice:function(dealClass){
  var userId = that.data.userId
  var openId = app.globalData.openId
  that.pixelRatio = app.data.deviceInfo.pixelRatio;
  var windowHeight = app.data.deviceInfo.windowHeight;
  var height = windowHeight;
  let params = {
    page: that.data.page,
    pageSize: that.data.pageSize,
    replyState: 2,
    userId: userId,
    hasDeal: dealClass
  }
  wx.showLoading({
    title: '加载中...',
  })
  Req.getReq(urlList.getAtSelfMessage, params, function (res) {
    if (res.code == 200) {
      wx.hideLoading()
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {
        Object.defineProperty(res.data[i], 'sliderId', {
          enumerable: true,
          writable: true,
          value: ''
        }),
          Object.defineProperty(res.data[i], 'messageId', {
            enumerable: true,
            writable: true,
            value: ''
          })
        res.data[i].sliderId = 'id-' + i + 1
        res.data[i].sendTime = format.formatDate(format.getLocalDate(res.data[i].sendTime))
        for (let j = 0; j < res.data[i].MessageSubs.length; j++) {
          if (res.data[i].MessageSubs[j].receiverOpenId == openId) {
            res.data[i].messageId = res.data[i].MessageSubs[j].id
          }
        }
      }
      if(dealClass == 0){
        that.data.unDealNotice = res.data
      }else{
        that.data.hasDealNotice = res.data
      }
     // console.log(res.data)
      that.data.msgList = res.data.reverse()
      that.setData({
        msgList: that.data.msgList,
      //  height: 93,
        scrollTop: 1000000
      })
    }
  })
},
//上拉加载
  // unDealUpper:function(){
  //   var openId = app.globalData.openId
  //   // that.getDealNotice(that.data.current)
  //   if(that.data.current == 0){
  //     that.data.unDealStartPage++
  //     let params = {
  //       page:that.data.unDealStartPage,
  //       pageSize:that.data.pageSize,
  //       userId:that.data.userId,
  //       replyState: 2,
  //       hasDeal:that.data.current
  //     }
  //     Req.getReq(urlList.getAtSelfMessage,params,function(res){
  //       if(res.code == 200){
  //         if(res.data.length > 0){
  //           for (let i = 0; i < res.data.length; i++) {
  //             Object.defineProperty(res.data[i], 'sliderId', {
  //               enumerable: true,
  //               writable: true,
  //               value: ''
  //             }),
  //               Object.defineProperty(res.data[i], 'messageId', {
  //                 enumerable: true,
  //                 writable: true,
  //                 value: ''
  //               })
  //             res.data[i].sliderId = 'id-' + i + 1
  //             res.data[i].sendTime = format.formatDate(format.getLocalDate(res.data[i].sendTime))
  //             for (let j = 0; j < res.data[i].MessageSubs.length; j++) {
  //               if (res.data[i].MessageSubs[j].receiverOpenId == openId) {
  //                 res.data[i].messageId = res.data[i].MessageSubs[j].id
  //               }
  //             }
  //           }
  //           res.data.reverse()
  //           that.data.unDealNotice.unshift(res.data)
  //           that.data.unDealNotice = [].concat.apply([], that.data.unDealNotice)
  //           that.setData({
  //             msgList: that.data.unDealNotice,
  //             // height: 93,
  //           }) 
  //         }else{

  //         }
  //       }
  //     })
  //   }
  // },
  onLoad: function (options) {
    that = this
    var userId = options.userId
    that.data.userId = userId
    
    // for (var i = 0; i < 30; i++) {
    //   var msg = {};
    //   msg.userName = '' + '用户' + i + 1;
    //   msg.msgText = '您有新的消息'
    //   msg.id = 'id-' + i + 1;
    //   msg.headerImg = '../../res/img/head.png';
    //   that.data.msgList.push(msg);
    // }
    // console.log(that.data.msgList)
    // that.setData({ msgList: that.data.msgList, height: height });
  },

  ontouchstart: function (e) {
    console.log(e)
    if (that.showState === 1) {
      that.touchStartState = 1;
      that.showState = 0;
      that.moveX = 0;
      that.translateXMsgItem(that.lastShowMsgId, 0, 200);
      that.lastShowMsgId = "";
      return;
    }
    that.firstTouchX = e.touches[0].clientX;
    that.firstTouchY = e.touches[0].clientY;
    if (that.firstTouchX > that.swipeCheckX) {
      that.swipeCheckState = 1;
    }
    that.lastMoveTime = e.timeStamp;
  },

  ontouchmove: function (e) {
    console.log(e.currentTarget.id)
    if (that.swipeCheckState === 0) {
      return;
    }
    //当开始触摸时有菜单显示时，不处理滑动操作
    if (that.touchStartState === 1) {
      return;
    }
    var moveX = e.touches[0].clientX - that.firstTouchX;
    var moveY = e.touches[0].clientY - that.firstTouchY;
    //已触发垂直滑动，由scroll-view处理滑动操作
    if (that.swipeDirection === 2) {
      return;
    }
    //未触发滑动方向
    if (that.swipeDirection === 0) {
      console.log(Math.abs(moveY));
      //触发垂直操作
      if (Math.abs(moveY) > 4) {
        that.swipeDirection = 2;

        return;
      }
      //触发水平操作
      if (Math.abs(moveX) > 4) {
        that.swipeDirection = 1;
        that.setData({ scrollY: false });
      }
      else {
        return;
      }

    }
    //禁用垂直滚动
    // if (that.data.scrollY) {
    //   that.setData({scrollY:false});
    // }

    that.lastMoveTime = e.timeStamp;
    //处理边界情况
    if (moveX > 0) {
      moveX = 0;
    }
    //检测最大左滑距离
    if (moveX < -that.maxMoveLeft) {
      moveX = -that.maxMoveLeft;
    }
    that.moveX = moveX;
    that.translateXMsgItem(e.currentTarget.id, moveX, 0);
  },
  ontouchend: function (e) {
    that.swipeCheckState = 0;
    var swipeDirection = that.swipeDirection;
    that.swipeDirection = 0;
    if (that.touchStartState === 1) {
      that.touchStartState = 0;
      that.setData({ scrollY: true });
      return;
    }
    //垂直滚动，忽略
    if (swipeDirection !== 1) {
      return;
    }
    if (that.moveX === 0) {
      that.showState = 0;
      //不显示菜单状态下,激活垂直滚动
      that.setData({ scrollY: true });
      return;
    }
    if (that.moveX === that.correctMoveLeft) {
      that.showState = 1;
      that.lastShowMsgId = e.currentTarget.id;
      return;
    }
    if (that.moveX < -that.thresholdMoveLeft) {
      that.moveX = -that.correctMoveLeft;
      that.showState = 1;
      that.lastShowMsgId = e.currentTarget.id;
    }
    else {
      that.moveX = 0;
      that.showState = 0;
      //不显示菜单,激活垂直滚动
      that.setData({ scrollY: true });
    }
    that.translateXMsgItem(e.currentTarget.id, that.moveX, 500);
    //that.translateXMsgItem(e.currentTarget.id, 0, 0);
  },
  onDeleteMsgTap: function (e) {
    console.log(e)
    var messageId = e.currentTarget.dataset.messageid
   //var msgId = e.currentTarget.dataset.msgid
    let params = {
      id:messageId,
      replyContent:'已阅'
    }
    Req.putReq(urlList.replyMsg,params,function(res){
      console.log(res)
      if(res.code == 200){
        wx.showToast({
          title: '操作成功',
          icon:'success',
          duration:1000
        })
        setTimeout(() => {
          that.deleteMsgItem(e);
        }, 1000)
      }else{
        wx.showToast({
          title: '操作失败',
          icon:'none',
          duration:1000
        })
      }
    })
  },
  onDeleteMsgLongtap: function (e) {
    console.log(e);
  },
  onMarkMsgTap: function (e) {
    console.log(e);
  },
  onMarkMsgLongtap: function (e) {
    console.log(e);
  },
  getItemIndex: function (id) {
    var msgList = that.data.msgList;
    for (var i = 0; i < msgList.length; i++) {
      if (msgList[i].sliderId === id) {
        return i;
      }
    }
    return -1;
  },
  deleteMsgItem: function (e) {
    var animation = wx.createAnimation({ duration: 200 });
    animation.height(0).opacity(0).step();
    that.animationMsgWrapItem(e.currentTarget.id, animation);
    var s = that;
    setTimeout(function () {
      var index = s.getItemIndex(e.currentTarget.id);
      s.data.msgList.splice(index, 1);
      s.setData({ msgList: s.data.msgList });
    }, 200);
    that.showState = 0;
    that.setData({ scrollY: true });
  },
  translateXMsgItem: function (id, x, duration) {
    var animation = wx.createAnimation({ duration: duration });
    animation.translateX(x).step();
    that.animationMsgItem(id, animation);
  },
  animationMsgItem: function (id, animation) {
    var index = that.getItemIndex(id);
    var param = {};
    var indexString = 'msgList[' + index + '].animation';
    param[indexString] = animation.export();
    that.setData(param);
  },
  animationMsgWrapItem: function (id, animation) {
    var index = that.getItemIndex(id);
    var param = {};
    var indexString = 'msgList[' + index + '].wrapAnimation';
    param[indexString] = animation.export();
    that.setData(param);
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
    var dealClass = 0
    that.getDealNotice(dealClass)
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