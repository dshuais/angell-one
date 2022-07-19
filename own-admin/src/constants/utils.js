
/**
 * 保留小数点几位数, 自动补零, 四舍五入
 * @param num: 数值
 * @param digit: 小数点后位数
 * @returns string
 * Object.is()是es6引入的、用于判断两个或者多个数据是否全等的方法。很重要的一个特点是Object.is(NaN,NaN)的结果是true  这里是判断这个值是否为数字 如果不为数字则 方法parseFloat 方法就不能转换 这里就会 显示为true
 * Number.EPSILON  可以用来设置“能够接受的误差范围”。比如，误差范围设为 2 的-50 次方（即Number.EPSILON * Math.pow(2, 2)），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。 这里是设置最小误差值 
 * Math.pow  原始方法 这里是求 10的多少次方
 */
function myFixed(num, digit) {
  if (Object.is(parseFloat(num), NaN)) {
    return console.error(`传入的 ${num} 不是个数字`)
  }
  num = parseFloat(num)
  return (Math.round((num + Number.EPSILON) * Math.pow(10, digit)) / Math.pow(10, digit)).toFixed(digit)
}

/**
 * 生成随机数
 * @param min 随机数的最小范围
 * @param max 随机数的最大范围
*/
function randomNum(min, max) {
  const num = Math.floor(Math.random() * (max - min) + min)
  return num
}

/**
 * 通过生成随机数 生成随机rgb颜色值
 * @param min 随机rgb颜色值的最小范围
 * @param max 随机rgb颜色值的最大范围
*/
function randomColor(min, max) {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

module.exports = {
  myFixed, randomNum, randomColor,
}