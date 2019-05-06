// 注意字符串和数值比大小时,会先转成数值，比如'-5'转成-5
let arr = [1, 10, 11, -1,'-5',12, 13, 14, 15, 2, 3, 4, 7, 8, 9];
// if ('-5' > -6) {
//   console.log(111);
// } else {
//   console.log(222);
// }

let max = Math.max(...arr);
let min = Math.min(...arr);

let res = max - min;
console.log(res);

// ES5写法
(function numberOperation(arr) {
  if (Array.isArray(arr)) {
    console.log(Math.max.apply(null, arr) - Math.min.apply(null, arr));
  } else {
    console.log("不是数组");
  }
})(arr);