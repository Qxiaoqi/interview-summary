var str1 = "asd ehe  rjr";
var str2 = "d  erregrnt eruk";
var str3 = "rth sthst ar   gae";

function dealFun(str) {
  // 先在最后加上一个空格
  str += " ";
  // 转成数组
  arr = str.split("");
  var targetArr = [];
  var temp = "";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== " ") {
      temp += arr[i];
    } else if (arr[i+1] !== " "){
      // 如果检测到空格，而且下一位不是空格，则将其组合push
      targetArr.push(temp);
      temp = "";
    }
  }
  console.log(targetArr);
}

dealFun(str1);
dealFun(str2);
dealFun(str3);
