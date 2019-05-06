// 借用父类构造函数实现，复制父类实例给子类（不使用原型）
function SuperType() {
  this.x = "1";
  this.colors = ["red", "blue"];
  console.log("Super执行");
}

SuperType.prototype.getSuperValue = function() {
  return this.x;
}

function SubType() {
  SuperType.call(this);
  this.y = "2";
  console.log("Sub执行");
}

SubType.prototype.getSubValue = function() {
  return this.y;
}

let test1 = new SubType();
let test2 = new SubType();


// 改动一个子实例引用并不会引起其它实例的改变
// 因为不同子实例是不同的副本
test1.colors.push("black");


console.log(test1.colors);
console.log(test2.colors);
