// uniqueInteger.counter = 0;

// function uniqueInteger() {
//   return uniqueInteger.counter++;
// }

// let a = uniqueInteger();
// console.log(uniqueInteger.counter);
// // console.log(a);
// let b = uniqueInteger();
// console.log(uniqueInteger.counter);
// // console.log(b);
// let c = uniqueInteger();
// console.log(uniqueInteger.counter);
// // console.log(c);


// 闭包对比
let uniqueIntegerNew = (function() {
  let count = 0;
  return function() {
    return count++;
  }
})();

let aa = uniqueIntegerNew();
console.log(aa);
let bb = uniqueIntegerNew();
console.log(bb);
let cc = uniqueIntegerNew();
console.log(cc);
