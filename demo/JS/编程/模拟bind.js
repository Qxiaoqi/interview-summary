function test(y) {
  return this.x + y;
}

let o = {
  x: 1
}

let g = test.bind(o);

console.log(g(2));

// 实现bind
function bindFun(f, o) {
  let self = this;
  // console.log("test:", arguments);
  return function() {
    return f.apply(o, arguments);
  }
}

// 即test.bindFun(o) 即返回一个this指向o的函数
let g1 = bindFun(test, o);

console.log(g1(2));

