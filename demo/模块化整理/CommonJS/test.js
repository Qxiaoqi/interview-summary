var lib = require('./lib');

function add() {
  lib.counter.count++;
}

function getCount() {
  console.log("test", lib.counter.count);
}

module.exports = {
  add,
  getCount
}
// lib.counter.incCounter();
// console.log(lib.counter.count);