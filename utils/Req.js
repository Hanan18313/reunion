
var rootUrl = require('./base.js')
var app = getApp()
var header = {
  'Accept':'application/json',
  'Content-Type':'application/json',
  'openId': null
}
function getReq(url,data,cb){
  // wx.showLoading({
  //   title: '加载中...',
  // })
  wx.request({
    url: url,
    method:'GET',
    data:data,
    header:header,
    success:function(res){
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail:function(){
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel:false
      })
      return typeof cb == "function" && ca(false)
    }
  })
}
function postReq(url,data,cb) {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    method: 'POST',
    data:data,
    header: header,
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && ca(false)
    }
  })
}
function deleteReq(url,data, cb) {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    method: 'DELETE',
    data:data,
    header: header,
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && ca(false)
    }
  })
}

function putReq(url, data, cb) {
  wx.showLoading({
    title: '加载中...',
  })
  wx.request({
    url: url,
    method: 'PUT',
    data:data,
    header: header,
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && ca(false)
    }
  })
}
module.exports = {
  getReq:getReq,
  postReq:postReq,
  putReq:putReq,
  deleteReq:deleteReq,
  header:header
}