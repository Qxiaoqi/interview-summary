let arr = ['2018-03-05', '2013-06-12','2019-03-12','2018-03-05','2014-02-22'];

let res = [...new Set(arr)].sort((a, b) => {
  // 不能相减，因为字符串不能减
  // return a - b;
  return a < b ? -1 : 1;
});
console.log(res);

