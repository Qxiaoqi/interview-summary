function getUrlParam(sUrl, sKey) {
  var keyStr = sUrl.split("?")[1];
  keyStr = keyStr.split("#")[0];
  var paramStr = keyStr.split("&");
  var paramArr = [];
  var target = [];
  for (var i in paramStr) {
    console.log(paramStr[i]);
    var key = paramStr[i].split("=")[0];
    var value = paramStr[i].split("=")[1];
    var obj = {
      key: key,
      value: value
    };
    paramArr.push(obj);
  }
  for (var i in paramArr) {
    if (paramArr[i].key === sKey) {
      target.push(paramArr[i].value);
    }
  }
  if (target.length === 1) {
    target = target[1];
  }
  return target;
}

var url = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe";

var res = getUrlParam(url, "key");
console.log(res);