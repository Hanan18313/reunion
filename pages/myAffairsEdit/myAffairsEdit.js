// pages/myAffairs/myAffairs.js
const app = getApp()
var Req = require('../../utils/Req.js')
var urlList = require('../../utils/base.js')
var prom = require('../../utils/prom.js')
var util = require('../../utils/util.js')
var formatDate = require('../../utils/formatDate.js')
import Dialog from '../../style/vant/dialog/dialog'
// var Dialog  = require('../../style/vant/dialog/dialog.js')


const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = 2018; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.model,
    fruit: [{
      id: 1,
      name: '飞机',
    }, {
      id: 2,
      name: '火车'
    }, {
      id: 3,
      name: '自驾'
    }],
    transport: '自驾',
    current: '自驾',
    position: 'right',
    checked: false,
    disabled: false,
    takeFamily: false,
    needSingleRoom: false,
    isJoinParty:false,
    adultArray: ['0', '1', '2', '3', '4'],
    adultObj: [],
    kidObj: [],
    adultIndex: 0,
    kidArray: ['0', '1', '2', '3', '4'],
    kidIndex: 0,
    needPickUpAir: false,
    needPickUpTrain: false,
    pay: true,
    payBtn: true,
    payMsg: '如已缴费请进行验证',
    beginTime: {
      type: String, 	// 开始时间
      value: '08:00'
    },
    endTime: {
      type: String,	// 结束时间
      value: '23:00'
    },
    timeGap: {
      type: Number,	// 单位时间(min)
      value: 30
    },
    show: {
      type: Boolean, 	// 显示或隐藏遮罩
      value: false
    },
    showOverdue: {      // 显示或隐藏过期时间
      type: Boolean,
      value: true
    },
    themeColor: {       // 主题颜色
      type: String,
      value: '#ffd00a'
    },
    show: false,
    inputTime: '',
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [1, 5, 6, 0, 0],
    choose_year: '',
  },
  handleFruitChange({ detail = {} }) {
    var that = this
    that.setData({
      current: detail.value,
      transport: detail.value
    });
  },
  needSingleRoom: function (e) {
    var that = this
    that.setData({
      needSingleRoom: e.detail.value
    })
  },
  isJoinParty:function(e){
    var that = this
    that.setData({
      isJoinParty:e.detail.value
    })
  },
  family: function (e) {
    var that = this
    that.setData({
      takeFamily: e.detail.value
    })
  },
  bindAdultChange: function (e) {
    var that = this
    that.setData({
      adultIndex: e.detail.value
    })
  },
  bindKidChange: function (e) {
    var that = this
    that.setData({
      kidIndex: e.detail.value
    })
  },
  _yybindchange: function (e) {
    var that = this
    console.log(e.detail.date)
    // console.log(e.detail.date)
    // console.log(formatDate.formatDate(e.detail.date))
    // that.setData({
    //   airTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
    //   "airTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
    // })
   // console.log(that.data.inputTime)
    if (that.data.inputTime == 'airTime') {
      that.setData({
        // expectedArrivalAirTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        // "expectedArrivalAirTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        expectedArrivalAirTime:e.detail.date,
        "expectedArrivalAirTime": e.detail.date
      })
    } else if(that.data.inputTime == 'trainTime') {
      that.setData({
        // expectedArrivalTrainTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        // "expectedArrivalTrainTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        expectedArrivalTrainTime:e.detail.date,
        "expectedArrivalTrainTime": e.detail.date
      })
    }else{
      that.setData({
        // expectedArrivalSelfTime: formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        // "expectedArrivalSelfTime": formatDate.formatDate(e.detail.year + '-' + e.detail.month + '-' + e.detail.day + ' ' + e.detail.time),
        expectedArrivalSelfTime: e.detail.date,
        "expectedArrivalSelfTime": e.detail.date
      })
    }
  },
  inputTime: function (e) {
    console.log(e)
    var that = this
    that.setData({
      show: true,
      'inputTime': e.currentTarget.dataset.name
    })
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this
    var obj = {}
    if (that.data.transport == "飞机") {
      obj.transportation = that.data.transport
      obj.transportationNo = e.detail.value.air_no
      obj.destination = e.detail.value.air_station
      obj.expectedArrivalTime = that.data.expectedArrivalAirTime
      obj.needPickUp = that.data.needPickUpAir
      obj.isJoinParty = that.data.isJoinParty
    } else if (that.data.transport == "火车") {
      obj.transportation = that.data.transport
      obj.transportationNo = e.detail.value.train_no
      obj.destination = e.detail.value.train_station
      obj.expectedArrivalTime = that.data.expectedArrivalTrainTime,
      obj.needPickUp = that.data.needPickUpTrain,
      obj.isJoinParty = that.data.isJoinParty
    } else {
      obj.expectedArrivalTime = that.data.expectedArrivalSelfTime,
      obj.transportation = that.data.transport
      obj.transportationNo = ''
      obj.destination = ''
      obj.needPickUp = false
      obj.isJoinParty = that.data.isJoinParty
    }
    if (that.data.takeFamily) {
      obj.adultNum = Number(that.data.adultIndex),
      obj.kidsNum = Number(that.data.kidIndex)
    } else {
      obj.adultNum = 0,
      obj.kidsNum = 0
    }
    obj.needSingleRoom = that.data.needSingleRoom;
    if(obj.expectedArrivalTime){
      Req.putReq(urlList.updateSignInfo, obj, function (res) {
        // console.log(res)
        if (res.code == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              detal: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else{
      wx.showToast({
        title: '请确认到达时间',
        icon:'none',
        duration:1500
      })
    }
  },
  needPickUpAir: function (e) {
    var that = this
    that.setData({
      needPickUpAir: e.detail.value
    })
  },
  needPickUpTrain: function (e) {
    var that = this
    that.setData({
      needPickUpTrain: e.detail.value
    })
  },
  // paySub: function (e) {
  //   var that = this
  //   var payRem = ''
  //   wx.showActionSheet({
  //     itemList: ['支付宝方式付款', '微信方式付款', '其他方式'],
  //     success: function (res) {
  //       console.log(res)
  //       if (res.tapIndex == 0) {
  //         payRem = "支付宝付款"
  //       } else if (res.tapIndex == 1) {
  //         payRem = "微信付款"
  //       } else {
  //         payRem = "其他方式"
  //       }
  //       var params = {
  //         payRem: payRem
  //       }
  //       Req.putReq(urlList.paySub, params, function (res) {
  //         console.log(res)
  //       })
  //     }
  //   })
  // },


  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })

    var that = this
    var params = ''
    Req.getReq(urlList.getSignInfoByOpenId, params, function (res) {
     // console.log(res)
      if (res.code == 200) {
        res.data.expectedArrivalTime = formatDate.formatDate(formatDate.getLocalDate(res.data.expectedArrivalTime))
        console.log(res.data)
        if (res.data.adultNum || res.data.kidsNum) {
          that.setData({
            takeFamily: true,
            adultIndex: res.data.adultNum,
            kidIndex: res.data.kidsNum
          })
        }
        if (res.data.transportation == '飞机') {
          let needPickUpAir = false
          if(res.data.needPickUp == 1){
            needPickUpAir = true
          }else{
            needPickUpAir = false
          }
          that.setData({
            air_station: res.data.destination,
            air_no: res.data.transportationNo,
            expectedArrivalAirTime: res.data.expectedArrivalTime,
            needPickUpAir: needPickUpAir,
          })
        } else if (res.data.transportation == '火车') {
          let needPickUpTrain = false
          if(res.data.needPickUp == 1){
            needPickUpTrain = true
          }else{
            needPickUpTrain = false
          }
          that.setData({
            train_station: res.data.destination,
            train_no: res.data.transportationNo,
            expectedArrivalTrainTime: res.data.expectedArrivalTime,
            needPickUpTrain: needPickUpTrain
          })
        } else {
          that.setData({
            expectedArrivalSelfTime: res.data.expectedArrivalTime
          })
        }
        that.setData({
          needSingleRoom: res.data.needSingleRoom,
          transport: res.data.transportation,
          current: res.data.transportation,
          isJoinParty: res.data.isJoinParty
        })
      //  console.log(res.data.transportation)
      }
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
    return {
      title: '毕业30年庆',
      path: '/pages/index/index',
      imageUrl: '../../images/tp.png'
    }
  }
})