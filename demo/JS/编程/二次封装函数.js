function partialUsingArguments(fn) {
  var args1 = Array.prototype.slice.call(arguments, 1);
  console.log(args1);
  var result = function() {
    var args2 = Array.prototype.slice.call(arguments);
    console.log("args2");

    var paramArr = args1.concat(args2);
    console.log(paramArr);
    return fn.apply(null, paramArr);
  }

  return result;
}

