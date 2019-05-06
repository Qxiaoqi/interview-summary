let testArr = [1,6,8,3,7,9,2,7,2,4,4,3,3,1,5,3];

Array.prototype.newFun = function() {
  //从前往后搜索，以及从后往前搜索
  // 如果返回索引相同的话，则说明是重复
  // console.log(this);
  let res = [];
  this.forEach((item, index) => {
    if (this.indexOf(item) !== this.lastIndexOf(item)) {
      // 找到了重复数字
      if (res.indexOf(item) === -1) {
        // 说明在结果数组里没找到
        res.push(item);
      }
    } 
  })
  return res;
}

console.log(testArr.newFun().sort((a, b) => a - b));
