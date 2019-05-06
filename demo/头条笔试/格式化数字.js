let number1 = 412315.6789;
let number2 = "2345.6789";
// 方案一，toLocaleString
function method1(num) {
  num = parseFloat(num);
  return num.toLocaleString();
}

// 方案二，正则表达式
function method2(num) {
  num = String(num);
  num0 = num.split(".")[0];
  num1 = num.split(".")[1];
  num0 = num0.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  num = num0 + "." + num1;
  return num;
}

// 方案三，反转reverse
function method3(num) {
  num = String(num);
  num0 = num.split(".")[0];
  num1 = num.split(".")[1];
  num0 = num0.split("").reverse();
  let res = "";
  for (let i = 0; i < num0.length; i++) {
    res += num0[i] + ((i + 1) % 3 === 0 && (i + 1) !== num0.length ? "," : "");
  }
  res = res.split("").reverse().join("") + "." + num1;
  return res;
}


let res1 = method1(number1);
let res2 = method2(number1);
let res3 = method3(number1);


console.log(res1);
console.log(res2);
console.log(res3);