const formatTime = date => {
  var date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTimeS = date => {
  var date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  //return [year, month, day].map(formatNumber).join('/')
   return [year, month, day].map(formatNumber).join('-')
}
const uniq = array => {
  var temp = []
  for (var i in array) {
    if (temp.indexOf(array[i] == -1)) {
      temp.push(array[i])
    }
  }
  return temp
}
module.exports = {
  formatTimeS:formatTimeS,
  formatTime:formatTime,
  uniq:uniq
}















const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
