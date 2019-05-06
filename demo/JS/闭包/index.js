
// let add = (function() {
//   let count = 0;
//   console.log("1:", count);
//   return function() {
//     return console.log("2:", count++);
//   }
// })();

// add();
// add();
// add();


let add = (function() {
  let count = 0;
  return function() {
    return count++;
  }
})();

let a = add();
let b = add();

console.log(a, b);