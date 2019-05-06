// 时间戳格式化
var da = 1402233166999;
da = new Date(da);
var year = da.getFullYear();
var month = da.getMonth() + 1;

console.log(year + "年" + month + "月");

// 将指定日期转换为“年月日”格式


// Date.prototype.format = function (fmt) {
//   var o = {
//     "y+": this.getFullYear(),
//     "M+": this.getMonth() + 1,                 //月份
//     "d+": this.getDate()                    //日
//   };
//   for (var k in o) {
//     if (new RegExp("(" + k + ")").test(fmt)){
//       if(k == "y+"){
//         fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
//       }
//       else{
//         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//       }
//     }
//   }
//   return fmt;
// }

// Date.prototype.format = function(fmt) {
//   var o = {
//     "y+": this.getFullYear(), //年
//     "M+": this.getMonth() + 1, //月
//     "d+": this.getDay() //日
//   }
//   for (var k in o) {
//     if (new RegExp("(" + k + ")").test(fmt)) {
//       if (k == "y+") {
//         // 替换年
//         fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
//       } else {
//         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//       }
//     }
//   }
//   return fmt;
// }

Date.prototype.format = function(fmt) {
  var o = {
    "y+": this.getFullYear(),
    "M+": this.getMonth() + 1,
    "d+": this.getDay()
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      if (k == "y+") {
        fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}

var oldTime = (new Date("2012/12/25 20:11:11")).getTime();
var curTime = new Date(oldTime).format("yyyy-MM-dd");


console.log(oldTime);
console.log(curTime);