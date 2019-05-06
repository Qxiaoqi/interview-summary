function inheritPrototype(SuperType, SubType) {
  SubType.prototype = Object.create(SuperType.prototype);
  SubType.prototype.constructor = SubType;
}

function SuperType(name) {
  this.name = name;
  this.colors = ["blue", "red"];
  console.log("Super执行");
}

SuperType.prototype.getName = function() {
  console.log("getName:", this.name);
}

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
  console.log("Sub执行");
}

inheritPrototype(SuperType, SubType);

SubType.prototype.getAge = function() {
  console.log("age:", this.age);
}

var test1 = new SubType("xiao", 20);
var test2 = new SubType("da", 30);


test1.colors.push("black");

console.log(test1.age);
console.log(test2.age);

console.log(test1.colors);
console.log(test2.colors);
