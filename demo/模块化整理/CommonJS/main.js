var lib = require('./lib');
var test = require('./test');

test.getCount();
test.add();
test.getCount();


console.log("main", lib.counter.count);
lib.counter.count++;
lib.counter.incCounter();
console.log("main", lib.counter.count);

test.getCount();

