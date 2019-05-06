let Person = {
  name: "xiao",
  age: 20
}

function inheritObject(proto) {
  function f() {}
  f.prototype = proto;
  return new f();
}

let person1 = inheritObject(Person);
let person2 = inheritObject(Person);

Person.age = 10;

console.log(person1.age);
console.log(person2.age);
