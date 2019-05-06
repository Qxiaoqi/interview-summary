Function.prototype.myBind = function(o, ...args) {
  const self = this;
  return function() {
    console.log(arguments);
    const _args = Array.prototype.slice.call(arguments);
    console.log(_args);
    return self.apply(o, args.concat(_args));
  }
}

Function.prototype.myApply = function(o) {
  o.fn = this;
  let result;
  if (arguments[1]) {
    result = o.fn(...arguments[1]);
  } else {
    result = o.fn();
  }
  delete o.fn;
  return result;
}

function test(y) {
  return this.x + y;
}

let o = {
  x: 1
}

let g = test.myBind(o, 2);

console.log(g(3));
