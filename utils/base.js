//var baseUrl = "http://localhost:8090/reunion"
//var baseUrl = 'http://192.168.50.230:8090/mp'
var baseUrl = 'https://os.langjie.com/mp'
var urlList = {
  getOpenId: baseUrl +'/getOpenId', //获取openid
  checkUserByName:baseUrl+'/checkUserByName',//根据姓名判断访问者身份
  getUserInfoByOpenId:baseUrl+'/getUserInfoByOpenId',//根据openid获取用户信息
  getMeetingInfo:baseUrl+'/getMeetingInfo',//获取会议基本信息
  getOrganizerList: baseUrl +'/getOrganizerList', //获取组委会成员
  checkIsOrganizer: baseUrl +'/checkIsOrganizer', //是否为组委会成员
  meetingNewsList: baseUrl +'/meetingNewsList', //获取会议新闻
  updateUserInfoByOpenId: baseUrl +'/updateUserInfoByOpenId',//根据openid更新个人信息
  getUserList: baseUrl +"/getUserList",//获取同学录
  getUserInfoByUserId:baseUrl+'/getUserInfoByUserId',//根据userid获取用户信息
  meetingSignIn:baseUrl+'/meetingSignIn',//参加会议
  getSignInfoByOpenId:baseUrl+'/getSignInfoByOpenId',//
  uploadImgForMeetingNews: baseUrl +'/uploadImgForMeetingNews',//上传图片
  signPersonNum: baseUrl +'/signPersonNum',//报名人数以及第几个报名
  updateMeetingInfo: baseUrl +'/updateMeetingInfo',//更新会议信息
}
module.exports = urlList