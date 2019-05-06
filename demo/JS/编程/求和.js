function partial(fn, str1, str2) {
  var result = function(str) {
    return fn(str1, str2, true) + str;
  }
  
  return result;
}

var sayIt = function(greeting, name, punctuation) {     
  return greeting + ', ' + name + (punctuation || '!'); 
};  

let a = partial(sayIt, 'Hello', 'Ellie')('!!!');

console.log(a);