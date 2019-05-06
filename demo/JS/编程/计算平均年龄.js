// 总人数,平均年龄,离职率,N年后 168 26 0.40 78
var W = 168,
    Y = 26,
    x = 0.40,
    N = 78;

// 初始化平均年龄
var aveAge = Y;
while (N > 0) {
  N--;
  aveAge = (W * (1 - x) * (aveAge + 1) + 21 * (W * x)) / W;
}
aveAge = Math.ceil(aveAge);

console.log(aveAge)

