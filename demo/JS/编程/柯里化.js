function curryIt(fn) {
  // 指明形参个数
  // var len = fn.length;
  // console.log(len);

  return function a(ap) {
    return function b(bp) {
      return function c(cp) {
        console.log(ap);
        console.log(bp);
        console.log(cp);
        return fn.call(null, ap, bp, cp);
      }
    }
  }
}

var fn = function (a, b, c) {
  return a + b + c;
}; 
var res = curryIt(fn)(1)(2)(3);
console.log(res);