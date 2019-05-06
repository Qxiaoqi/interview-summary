for(var i=0;i<10;i++){
  setTimeout((function(i){
   return function(){
      console.log(i);
   }
  })(i),1000);
}

// for(var i = 0; i < 10; i++){
//   setTimeout(function(){
//     console.log(i);
//   },1000);
// }

// for(let i = 0; i < 10; i++){
//   setTimeout(function(){
//     console.log(i);
//   },1000);
// }