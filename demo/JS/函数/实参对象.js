// ES5写法
// function max(/*……*/) {
//   let max = arguments[0];
//   for (let i = 0; i < arguments.length; i++) {
//     if (arguments[i] > max) {
//       max = arguments[i];
//     }
//   }
//   return max;
// }

// ES6写法
function max(...values) {
  let max = values[0];
  for (let i = 0; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }
  return max;
}

let largest = max(1, 10, 100, 50, 200);
console.log(largest);
