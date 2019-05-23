//var baseUrl = "http://localhost:8090/"
//var baseUrl = 'http://192.168.50.80:5656/mp'
var baseUrl = 'https://mp.langjie.com/mp'
//var baseUrl = 'http://192.168.50.80:7090/mp'
var urlList = {
  imgUrl:'https://mp.langjie.com',
  //socketUrl:'ws://192.168.50.80:3001',
  //imgUrl:'http://192.168.50.80:5656',
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
  payInvalid: baseUrl +'/payInvalid',//汇款已提交 -> 未收费
  originzerPayEffective: baseUrl +'/originzerPayEffective',//未缴费 -> 确认缴费
  getAtSelfMessage: baseUrl +'/getAtSelfMessage',//查看@我的消息
  addMsg: baseUrl +'/addMsg',//发布消息,
  getSignInfoList: baseUrl +'/getSignInfoList',//获取所有签到信息
  replyMsg:baseUrl+'/replyMsg',//回复消息,
  addReplyMsg: baseUrl +'/addReplyMsg',//添加回复消息
  getTshirtSize: baseUrl +'/getTshirtSize',//获取T恤尺寸

  setPreTime:baseUrl+'/setPreTime', //设置预设时间

  /***********************************会议中模块*************************************** */
  meetingCheck:baseUrl+'/meetingCheck',//会中当天签到
  getCheckInfoByOpenId:baseUrl+'/getCheckInfoByOpenId',//根据openid获取个人签到信息
  getCheckList:baseUrl+'/getCheckList',//获取签到列表
  getDiscussAndLikeNotice:baseUrl+'/getDiscussAndLikeNotice',//获取评论点赞消息
  getMineImagesInfo:baseUrl+'/getMineImagesInfo',//获取我上传的图片列表
  getImagesDiscussInfo:baseUrl+'/getImagesDiscussInfo',//获取照片列表（附带评论和赞）
  addImagesInfo: baseUrl +'/addImagesInfo',//添加图片信息
  deleteImagesInfo:baseUrl+'/deleteImagesInfo',//删除图片
  discussToImages:baseUrl+'/discussToImages',//评论（弹幕）
  giveLikeToImages:baseUrl+'/giveLikeToImages',//点赞
  getMostLikeImages: baseUrl +'/getMostLikeImages',//展示点赞最多的图片
  getAssignPicture:baseUrl+'/getAssignPicture',//获取指定图片
}
module.exports = urlList