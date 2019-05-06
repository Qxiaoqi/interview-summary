var data = new Date();

var time = 1551603423365; //23:17

data = data.getTime();

function dealFun(time) {
  // 获取当前时间
  var curTime = new Date().getTime();
  var diffTime = parseInt((curTime - time) / 1000, 10); // 相差秒数
  var oneMin = 60;
  var oneHour = 60 * oneMin;
  var oneDay = 24 * oneHour;
  var oneWeek = 7 * oneDay;
  
  if (diffTime < oneMin) {
    return "刚刚";
  } else if (diffTime < oneHour) {
    var resTime = Math.floor(diffTime / oneMin);
    return resTime + "分钟前";
  } else if (diffTime < oneDay) {
    var resTime = Math.floor(diffTime / oneHour);
    return resTime + "小时前";
  } else if (diffTime < oneWeek) {
    var resTime = Math.floor(diffTime / oneDay);
    return resTime + "天前";
  } else {
    return new Date(time);
  }

  // console.log(time);
  // console.log(curTime);
  // console.log(diffTime);
}


var res = dealFun(time);
console.log(res);
