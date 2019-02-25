function formatDate(time) {
  var date = new Date(time);
  var year = date.getFullYear(),
    month = date.getMonth() + 1,//月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  if (hour == 0 && min == 0 && sec == 0) {
    var newDate = year + '-' +
      month + '-' +
      day;
    return newDate;
  } else {
    var newTime = year + '-' +
      month + '-' +
      day + ' ' +
      hour + ':' +
      min + ':' +
      sec;
    return newTime;
  }
}
function formatDateEn(date) {
  var date = new Date(date);
  var year = date.getFullYear(),
    month = date.getMonth() + 1,//月份是从0开始的
    day = date.getDate();
  var newTime = year + '年' +
    month + '月' +
    day +'日';
  return newTime;
}
function formatDateInt(date) {
  var date = new Date(date);
  var year = date.getFullYear(),
    month = date.getMonth() + 1,//月份是从0开始的
    day = date.getDate();
    var newTime = year + '-' +
      month + '-' +
      day;
    return newTime;
}
function formatTimeInt(time) {
  var date = new Date(time);
  var hour = date.getHours(),
      min = date.getMinutes();
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
    var newTime = hour + ':' + min;
    return newTime;
}
module.exports = {
  formatDate:formatDate,
  formatDateInt:formatDateInt,
  formatTimeInt:formatTimeInt,
  formatDateEn:formatDateEn
}