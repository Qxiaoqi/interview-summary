function shallowCopy(sourceObj) {
  if (typeof sourceObj === "object") {
    // 数组和对象
    let targetObj = Array.isArray(sourceObj) ? [] : {};

    for (let key in sourceObj) {
      if (sourceObj.hasOwnProperty(key)) {
        // 把继承的去掉
        targetObj[key] = sourceObj[key];
      }
    }
    return targetObj; 
  }
}

function shallowCopyES6(sourceObj) {
  if (typeof sourceObj === "object") {
    // 数组和对象
    let targetObj = Object.assign({}, sourceObj);
    return targetObj; 
  }
}


let test1 = {
  a: {
    ori: 1
  },
  b: 2
}

let test2 = [1, 2, 3];

// let target = shallowCopy(test1);
let target = shallowCopyES6(test1);
console.log("target:", target);
target.a.ori = 5;
console.log("target:", target);
console.log("test1:", test2);

// console.log(typeof [])
// let a = [1, 4, 6];
// console.log(a.hasOwnProperty(0));
