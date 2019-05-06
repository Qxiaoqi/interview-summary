String.prototype.myTrim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}

let test = "   daw  dawdaw   ";

console.log(test.myTrim());
