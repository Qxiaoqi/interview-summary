let par = [{age:5,name:'张三'},{age:3,name:'李四'},{age:15,name:'王五'},{age:1,name:'随便'}];

// 年龄小到大排序

// let res = par.sort((a, b) => {
//   return a.age - b.age;
// })

let res = par.sort((a, b) => {
  return a.age - b.age;
})

console.log(res);