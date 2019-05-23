// const urlList = require('./base.js')
// var socketOpen = false;
// var socketQueue = []
// const header = {
//   'Content-Type': "application/json"
// }
// function connect(user, func) {
//   wx.connectSocket({
//     url: urlList.socketUrl,
//     header: { 'content-type': 'application/json' },
//     success: function (res) {
//       console.log('信道连接成功~')
//     },
//     fail: function () {
//       console.log('信道连接失败~')
//     }
//   })
//   wx.onSocketOpen(function (res) {
//     socketOpen = true
//     // wx.showToast({
//     //   title: '信道已开通~',
//     //   icon: "success",
//     //   duration: 2000
//     // })
//     //接受服务器消息
//     wx.onSocketMessage(func);//func回调可以拿到服务器返回的数据
//   });
//   wx.onSocketError(function (res) {
//     console.log(res)
//     wx.showToast({
//       title: '信道连接失败，请检查！',
//       icon: "none",
//       duration: 2000
//     })
//   })
// }

// //发送消息
// function send(msg) {
//   if (socketOpen) {
//     wx.sendSocketMessage({
//       data: msg
//     })
//   } else {
//     socketQueue.push(msg)
//   }
// }
// module.exports = {
//   connect: connect,
//   send: send
// }
