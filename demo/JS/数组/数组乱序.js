// 方法一
let arr = [1,2,3,4,5,'6',7,'8','a','b','z'];
let res = [];

for (let i = 0, len = arr.length; i < len; i++) {
  // 范围0-10
  let random = Math.floor(Math.random() * arr.length);

  res.push(arr[random]);
  arr.splice(random, 1);
}

console.log(res);
// console.log({id: 1, value: 2});

// 方法二
let arr2 = [1,2,3,4,5,'6',7,'8','a','b','z'];

let res2 = arr2.sort(function() {
  return Math.random() > 0.5 ? -1 : 1;
})

console.log(res2);