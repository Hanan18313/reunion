// pages/addCommittee/addCommittee.js
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
    page: 1,
    pageSize: 200,
    dataArr: [],
    status: false,
    user_name: [],
    loading: false,
    loading_done: false,
    checked:false,
    disabled:false,
    current:[],
    currentId:[],
    current_name:[],
    data_arr:[],
    submit_dis:true
  },
  lower: function (e) {
    var that = this
    var dis = that.data.disabled
    var chc = that.data.checked
    var data_arr = that.data.data_arr.toString()
    //var lowDataArr = data_arr.split(',')
    var onDataArr = that.uniq(data_arr.split(','))
   // console.log(onDataArr)
   // console.log(lowDataArr)
    that.data.page++
    var params = {
      page: that.data.page,
      pageSize: that.data.pageSize
    }
    let storeName = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeName[index] = {
        key: item,
        list: []
      }
    })
    Req.getReq(urlList.getUserList, params, function (res) {
      if (res.data.length > 0) {
        var dataArr = that.data.dataArr
        dataArr.push(res.data)
        var res_arr = [].concat.apply([], dataArr)
        res_arr.forEach((item) => {
          for (let i = 0; i < onDataArr.length;i++){
          // for (let i in onDataArr) {
            //console.log(onDataArr)
            if (onDataArr[i] == item.userId) {
              dis = true;
              chc = true;
              break;
            } else {
              dis = false;
              chc = false
            }
          }
          // console.log(item.userName)
          // console.log(py.chineseToPinYin(item.userName).charAt(0))
          //let firstName = item.userName.substring(0,1);
          let firstName = py.chineseToPinYin(item.userName).charAt(0)
          let index = words.indexOf(firstName);
          // console.log(firstName)
          // console.log(storeName)
          // console.log(item.userName)
          // console.log(firstName)
          if (dis==true){
           // console.log(item.userId);
          }
          storeName[index].list.push({
            name: item.userName,
            key: firstName,
            userId: item.userId,
            phoneCn: item.phoneCn,
            isSign: item.isSign,
            payState: item.payState,
            dis: dis,
            chc: chc
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
  },
  // handleCommitteeChange({detail = {}}){
  //   console.log(detail)
  //   var that = this
  //   const index = this.data.current.indexOf(detail.value);
  //   index === -1 ? this.data.current.push(detail.value) : this.data.current.splice(index, 1);
  //   this.setData({
  //     current: this.data.current
  //   });
  // },
  handleCommitteeChange:function(e){
    var that = this
    var index = that.data.current.indexOf(e.detail.value);
    index === -1 ? that.data.current.push(e.detail.value) : that.data.current.splice(index, 1);
    var stu_id = that.data.currentId.indexOf(e.target.dataset.id);
    stu_id === -1 ? that.data.currentId.push(e.target.dataset.id) : that.data.currentId.splice(index ,1)
    that.setData({
      current:that.data.current
    })
    // console.log(that.data.current.length)
    // console.log(that.data.currentId)
    if(that.data.current.length > 0){
      that.setData({
        submit_dis:false
      })
    }else{
      that.setData({
        submit_dis:true
      })
    }
  },
  add:function(){
    var that = this
    var arr = []
    var userId = that.data.currentId
   // console.log(userId)
    for(let i in userId){
      var obj = {}
      obj.userId = userId[i]
      arr.push(obj)
    }
    let params = {
      organizerArr:arr
    }
    Req.postReq(urlList.addOrganizer,params,function(res){
    //  console.log(res)
      if(res.code == 200){
        wx.showToast({
          title: '新增成功',
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
          title: '新增失败',
          icon:'none',
          duration:2000
        })
      }
    })
  },
  /*
  * 速度最快， 占空间最多（空间换时间）
  *
  * 该方法执行的速度比其他任何方法都快， 就是占用的内存大一些。
  * 现思路：新建一js对象以及新数组，遍历传入数组时，判断值是否为js对象的键，
  * 不是的话给对象新增该键并放入新数组。
  * 注意点：判断是否为js对象键时，会自动对传入的键执行“toString()”，
  * 不同的键可能会被误认为一样，例如n[val]-- n[1]、n["1"]；
  * 解决上述问题还是得调用“indexOf”。*/
  uniq:function(array){
    var temp = {}, r =[], len = array.length, val, type;
    for(var i = 0; i<len; i++) {
    val = array[i];
    type = typeof val;
    if (!temp[val]) {
      temp[val] = [type];
      r.push(val);
    } else if (temp[val].indexOf(type) < 0) {
      temp[val].push(type);
      r.push(val);
    }
  }
  return r;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data_arr = that.data.data_arr
    data_arr.push(options.data_arr)
    var onDataArr = that.uniq(options.data_arr.split(','))
    var arr = []
    var dis = that.data.disabled
    var chc = that.data.checked
    let params = {
      page: that.data.page,
      pageSize: that.data.pageSize
    }
    let storeName = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeName[index] = {
        key: item,
        list: []
      }
    })
    wx.showLoading({
      title: '加载中...',
    })
    Req.getReq(urlList.getUserList, params, function (res) {
      wx.hideLoading()
      if (res.code == 200) {
        var dataArr = that.data.dataArr
        dataArr.push(res.data)
        res.data.forEach((item) => {
          //  console.log(item)
          //  console.log(data_arr)
          // for(let i = 0; i < that.data.currentId.length; i ++){
          //   if(item.userId == that.data.currentId[i]){
          //     dis = true
          //   }else{
          //     dis = false
          //   }
          // }
          for (let i = 0; i < onDataArr.length; i++) {
            // for (let i in onDataArr) {
            //console.log(onDataArr)
            if (onDataArr[i] == item.userId) {
              dis = true;
              chc = true;
              break;
            } else {
              dis = false;
              chc = false
            }
          }
          let firstName = py.chineseToPinYin(item.userName).charAt(0)
          let index = words.indexOf(firstName);
          storeName[index].list.push({
            name: item.userName,
            key: firstName,
            userId: item.userId,
            phoneCn: item.phoneCn,
            isSign: item.isSign,
            dis:dis,
            chc:chc
          })
        })
        that.data.user_name = storeName
        that.setData({
          userList: that.data.user_name,
          loading: true,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     var that = this
    // var data = ''
    // Req.getReq(urlList.getOrganizerList, data, function (res) {
    //  // console.log(res.data)
    //   var name_arr = []
    //   var userId_arr = []
    //   if (res.code == 200) {
    //     for(let i = 0; i< res.data.length; i++){
    //       name_arr.push(res.data[i].userName)
    //       userId_arr.push(res.data[i].userId)
    //     }
    //     that.setData({
    //       current:name_arr,
    //       'currentId':userId_arr,
    //       currentId:userId_arr
    //     })
    //   }
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