// 原型链继承
// 即重写原型对象
function SuperType() {
  this.x = "1";
  this.colors = ["red", "blue"];
  console.log("Super执行");
}

SuperType.prototype.getSuperValue = function() {
  return this.x;
}

function SubType() {
  this.y = "2";
  console.log("Sub执行");
}


SubType.prototype = new SuperType();
// SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;

// 注意此处，需要在将父类赋值给prototype后定义
SubType.prototype.getSubValue = function() {
  return this.y;
}

let test1 = new SubType();
let test2 = new SubType();
let test3 = Object.create(SubType.prototype);

// 非引用则不会
test1.x = "#";
// 多个实例对引用类型的改动，会反映到整个链
// 引用传递（Array，Function，Object）
// test1.colors.push("black");
// 重新赋值，会创建新的引用地址
// test1.colors = ["111"];

console.log(test1.x);
console.log(test2.x);
console.log(test3.x);


console.log(test1.colors);
console.log(test2.colors);
console.log(test3.colors);


