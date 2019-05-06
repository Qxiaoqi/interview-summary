let a = ["ant", "Bug", "cat", "Dog"];
// a.sort(function(s, t) {
//   let a = s.toLowerCase();
//   let b = t.toLowerCase();
//   return a - b;
// })

a.sort((s, t) => {
  let a = s.toLowerCase();
  let b = t.toLowerCase();
  return a - b;
})


console.log(a);