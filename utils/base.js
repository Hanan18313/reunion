//var baseUrl = "http://localhost:8090/reunion"
//var baseUrl = 'http://192.168.50.230:8090/mp'
var baseUrl = 'https://os.langjie.com/mp'
var urlList = {
  imgUrl:'https://os.langjie.com',
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
  addOrganizer: baseUrl +'/addOrganizer', //添加组委会成员
  removeOrganizer: baseUrl +'/removeOrganizer',//删除组委会成员
  getSignInfoByOpenId: baseUrl +'/getSignInfoByOpenId',//根据openid获取报名信息
  getSignInfoByUserId: baseUrl +'/getSignInfoByUserId',//根据userid获取报名信息
  updateSignInfo: baseUrl +'/updateSignInfo',//跟新参会信息
  paySub:baseUrl+'/paySub',//用户缴费申请
  addMeetingNews: baseUrl +'/addMeetingNews',//发布会议新闻
  topMeetingNews: baseUrl +'/topMeetingNews',//置顶会议新闻
  delMeetingNews: baseUrl +'/delMeetingNews',//删除会议新闻
  editMeetingNews: baseUrl +'/editMeetingNews',//修改会议标题或信息
  meetingSignOut: baseUrl +'/meetingSignOut',//取消报名
  meetingScheduleList: baseUrl +'/meetingScheduleList',//获取日程安排,
  addMeetingSchedule: baseUrl +'/addMeetingSchedule',//新增日程安排
  updateMeetingSchedule: baseUrl +'/updateMeetingSchedule',//修改日程安排
  delMeetingSchedule: baseUrl +'/delMeetingSchedule',//删除日程安排
  getAtSelfMessage: baseUrl +'/getAtSelfMessage',//查看@我的消息
  updateSignInfoByOrganizer: baseUrl +'/updateSignInfoByOrganizer',//组委会录入房间号和接站联系电话
  payEffective: baseUrl +'/payEffective',//汇款已提交 -> 确认收费
  payInvalid: baseUrl +'/payInvalid',//会狂已提交 -> 未收费
  getAtSelfMessage: baseUrl +'/getAtSelfMessage',//查看@我的消息
  addMsg: baseUrl +'/addMsg',//发布消息,
  getSignInfoList: baseUrl +'/getSignInfoList',//获取所有签到信息
}
module.exports = urlList