let a = "abcdcba";
let b = "awdsav";
let c = "bcadabc";

// 判断回文
function isPalindromicNum(str) {
  if (typeof str === "string") {
    // 是字符串
    // console.log(str.split("").reverse().join(""));
    return str === str.split("").reverse().join("");
  }
}

// 判断同字母异序
function isHeterotopic(str1, str2) {
  let res1 = str1.split("").sort((a, b) => a < b).join("");
  let res2 = str2.split("").sort((a, b) => a < b).join("");
  return res1 === res2;
}


console.log(isPalindromicNum(b));

console.log(isHeterotopic(a, b));
