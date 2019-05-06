let obj = {
  a: {
    name: 1
  },
  b: 2,
  fun() {
    console.log("test");
  }
}

// 很low的方法，不能拷贝function()
function deepCopy(sourceObj) {
  return JSON.parse(JSON.stringify(sourceObj));
}

// 递归
function deepCopyRecursive(sourceObj) {
  if (typeof sourceObj === "object") {
    let targetObj = Array.isArray(sourceObj) === true ? [] : {};

    for (let key in sourceObj) {
      if (sourceObj.hasOwnProperty(key)) {
        // 不是继承属性
        if (typeof sourceObj[key] === "object") {
          // 如果遍历的目标属性还是object的话，递归执行
          targetObj[key] = deepCopyRecursive(sourceObj[key]);
        } else {
          // 不是对象的话，直接复制即可
          targetObj[key] = sourceObj[key];
        }
      }
    }
    return targetObj;
  }
  return "目标不是对象或数组"
}

// let targetObj = deepCopy(obj);
let targetObj = deepCopyRecursive(obj);

console.log(targetObj);

targetObj.a.name = 3;

console.log(targetObj);
console.log(obj);
