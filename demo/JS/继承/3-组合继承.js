// 组合继承
function SuperType(x) {
  this.x = x;
  this.colors = ["red", "blue"];
  console.log("Super执行");
}

SuperType.prototype.getSuperValue = function() {
  return this.x;
}

function SubType(x, y) {
  SuperType.call(this, x);
  this.y = y;
  console.log("Sub执行");
}

SubType.prototype = new SuperType();
// SubType.prototype = Object.create(SuperType.prototype);
// 重写constructor属性，指向自己的构造函数
SubType.prototype.constructor = SubType;

SubType.prototype.getSubValue = function() {
  return this.y;
}

let test1 = new SubType(1, 2);
let test2 = new SubType(3, 4);

test1.colors.push("black");


console.log(test1.colors);
console.log(test2.colors);

console.log(test1.x);
console.log(test2.x);

console.log(test1.y);
console.log(test2.y);
