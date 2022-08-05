```javascript
let	=> 只能在作用域内部调用
var	=> 可在整个函数内调用
```





### @符

vue项目中 输入@匹配./src目录切有联想功能

创建jsconfig.json文件 写下面代码

{

 "compilerOptions": {

  "baseUrl": "./",

  "paths": {

   "@/*": ["./src/*"]

  }

 },

 "include": ["src/**/*"]

}





简单搭建node服务器，调试打包的（html+css+js）文件

![image-20210905133423335](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20210905133423335.png)





```js
var i = 0;
```



```html
<link rel='stylesheet' herf=''/>
```





### MOCK

mock 模拟数据 - 练习

![image-20211207153119821](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211207153119821.png)

mock 封装一个获取query键值对的方法getQuery

![image-20211207150150569](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211207150150569.png)



获取信息

![image-20211207151317551](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211207151317551.png)



添加

![image-20211207152936719](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211207152936719.png)



删除

![image-20211207153012648](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211207153012648.png)





### history

const router = new VueRouter({

 mode: "history",

 base: process.env.BASE_URL,

 routes,

});





### nprogress组件的使用

nprogress是请求时显示的进度条 

引入全局 - 引入到封装请求文件内(import nprogress from 'nprogress')，切引入css样式(import 'nprogress/nprogress.css') - 在请求和响应拦截器内使用

请求拦截器为请求开始：

​	请求开始 进度条开始出现 nprogress.start()

相应拦截器为请求结束：

​	请求开始 进度条结束 nprogress.done()

**进度条的颜色样式可在css文件内更改**





### Vuex模块化开发

创建不同的组件相应使用的vuex仓库

![image-20211222105032930](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211222105032930.png)

统一引入在index.js内 然后注册

![image-20211222105116642](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211222105116642.png)





### 封装的请求

![image-20211222105504512](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211222105504512.png)





### 解决跨域

在vueconfig.js文件内devServer代理跨域 target为目标域名

![image-20211222105840122](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211222105840122.png)





### 通过vuex发送请求

​	在组件内通过**store.dispatch('方法名')**触发vuex的action，执行异步操作发送请求 拿到数据存放在vuex内

操作action

![image-20211222112707619](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211222112707619.png)

借用mutations存放请求拿到的数据在state中

![image-20211222112829297](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211222112829297.png)

存放在vuex内之后 在要使用的组件内引入并使用mapState拿到vuex内的数据

![image-20211222113028916](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20211222113028916.png)





### 动态加载路由

首先在登录成功时 执行动态加载路由的方法

且在app.vue中 也执行动态加载路由方法(防止刷新页面 router从新加载 加载不到动态添加的路由)

![image-20220107171303127](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220107171303127.png)



### 从新加载页面

window.location.reload（） // 从新加载页面



### 封装复用的自定义数据

通过 export 创建自定义的数据方法

![image-20220113120920060](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220113120920060.png)

把创建的方法引入在同文件下将要暴露的index文件内 * as name（取出所有数据 name(别名)是一个对象

![image-20220113120911777](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220113120911777.png)

将此文件加载在入口文件main.js上 即可使用

 

### 路由拦截

另一种进行路由拦截的方式

![image-20220113121350694](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220113121350694.png)

在该模块的vuex内 添加获取方法和存放用户的身份  且退出也在此处执行

![image-20220113121811065](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220113121811065.png)





### 第二种动态加载路由

当后端返回没有路由信息时 需要自己在router内自定义

并在路由拦截内动态加载 --- 路由拦截判断完身份之后 进行动态加载路由的操作 从vuex内取到数据

![image-20220113122743340](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220113122743340.png)

相应模块vuex内进行路由筛选的操作 加载相应身份的对应路由

![image-20220113122634047](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220113122634047.png)

<img src="C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220113122914478.png" alt="image-20220113122914478" style="zoom:200%;" />





### 子组件内动态加载el-button

​	在v-for之后 @click="_click(item.methodName)"

​	在methods中

```javascript
_click(func, row) { // 直接访问父组件对应的@click事件 ()内传参
	this.$parent[func](row)
}
```



### 遍历对象的方法

```js
Object.getOwnPropertyNames(obj).forEach(key => {
	console.log(key, obj[key])
})

for(let i in obj) // i, obj[i]
// 经常会问for in和for of --- for in用来遍历对象 for of用来遍历数组的

object.keys(obj) // 返回键名 返回一个数组
object.values(obj) // 返回键值 数组
object.entries(obj) // 返回键值对 组成的数组
Object.getOwnPropertyNames(obj) // 返回 数组键名

Reflect.ownKeys(obj).forEach(key=>{
	console.log(key,obj[key])
})

// for in和object.keys等的四个方法 只会遍历到常规属性的键名 无法遍历到Symbol类型的键名 es6新增了个Object.getOwnPropertySymbols()方法 可以遍历Symbol类型的键名和 Reflect.ownKeys()方法 可以遍历到所有类型的键名
	使用
  obj = { Symbol('a'):1, a: 2 }
  Object.getOwnPropertySymbols(obj) // 返回数组 [ Symbol('a') ]
	Reflect.ownKeys(obj) // 返回所有的键名
```



### 新的数组去重的方法

```js
1、Array.from(new Set(arr)) // new Set(arr)去重之后返回的是个对象

2、[...new Set(arr)]

两种方法也可将set类型数组或对象转换为数组 也可对字符串进行去重

Array.from(new Set('aaabbbccc')).join('') // abc
```



### 若依前端框架的Editor组件自动获取焦点的问题

```js
const* editor = *this*.$refs.editor;
*this*.Quill = new Quill(editor, *this*.options);
*this*.Quill.enable(false) *// 取消引用editor自动获取焦点
setTimeout(() => { // 切记在一秒后恢复
	this.Quill.enable(true)
}, 1000)
在组件内 init函数new Quill后，把enable改为false
禁用quill的写入功能 一秒后恢复  实现 取消引用editor自动获取焦点
```



### 若依的dicts的使用(数据字典)

```js
// 使用 查询的数据字典以对象形式传入对应的字典名
dicts: ["sys_business_type", "sys_jineleixing", "sys_teamGrade_type"]
// 返回数据类型为 [{value，label}]形式


// dict-tag 若依封装的tag标签的使用
<dict-tag :options="dict.type.sys_business_type" :value="scope.row.businessType" />
```



### element-form表单回车默认提交事件的问题

当el-form表单内只有一个el-input输入框时 使用@keyup.enter.native事件 会使表单产生默认提交事件

解决办法：在el-form上添加@submit.native.prevent(阻止表单默认提交)



### NEW DATE时时间格式的问题

```js
new Date().toISOString().replace(/T.*$/, '') // 获取iso的当前时间(默认就为yy-mm-dd格式)
```



### 数组方法

```js
// 数组AT方法 (es2022)
arr.at(-1) // 可拿到arr的最后一位

// 快速拿到数组内对象的某一个字段
arr.map(({name}) => name) // 返回值为新数组

// 快速去除数组内数据的引号['a','b','c']
arr.map(Number) // [a,b,c]

// 找到数组中只出现了一次的数 两种方法 推荐第二种
function uniqerNumber(nums) {
    1、var result = 0
    for (var i = 0; i < nums.lenght; i++) {
        result = result ^ nums[i]
    }
    return result
    
    2、nums.reduce((a,b)=>a^b, 0) // 默认取零
}

// 取数组的值得对应index(思路技巧吧属于是)
const lsit = [a,b,c,d]
let index = 0
for(i = 0; i < 100; i++) {
    1、index = (index - 1) % list.length
    
    2、index++
    if(index >= list.length) index = 0
}


// 判断是否是数组的方式
1、arr instanceof constructor // 返回布尔值
2、Object.prototype.toString.call() // 返回[object xxx]
3、arr.__proto__ === Array.prototype() // 通过原型链判断返回布尔值
4、Array.isArray() // ES6新方法 返回布尔值
5、Array.prototype.isPrototypeOf(arr) // 返回布尔值
```



### 检测数据类型的方法

```js
1、typeof 用来检测一下基本的数据类型 (正则、[]、{}、null结果都为object)
		typeof [] // object

2、A instanceof B  检测当前实例A是否隶属于B类
		[] instanceof Array // true

3、constructor 构造函数
		[].constructor.name // Array
		[].constructor  // ƒ Array() { [native code] }

4、hasOwnProperty 检测当前属性是否为对象的私有属性
		obj.hasOwnproperty('属性名')

5、is Array 判断是否为数组
		Array.isArray([]) // true

6、valueOf 可以看到数据最本质的内容
		‘123’.valueOf() // 123

7、Object.prototype.toString   最好的办法 对象原型链判断方法
		Object.prototype.toString.call([]) // '[object Array]'
```



### 两个变量的交换(不借助第三个变量)

```js
let a = 6
let b = 5
// 不借助第三个变量完成交换
a = a + b
b = a - b
a = a - b

a = a ^ b
b = a ^ b
a = a ^ b

[b, a] = [a, b]
```



### 链式表达式 a?.b?.c(?.  ?:  ??  ??=)

```js
// ?.针对嵌套数据类型 a:{b:{c:10}}
a?.b?.c //  10 没有返回undefined
 
// ?? 空值合并操作符 当左侧的操作数为nul或者undefined时，返回其右侧操作数，否则返回左侧操作数
const a = null
a ?? '默认值' // 默认值
/**
	与 || 不同的是 ||逻辑操作符在左侧为假值时返回右侧操作数
	扩展：
	obj || {} 等价于 if(obj === 0 || obj === "" || obj === false || obj === null || obj === undefined){a = {}} else {a = obj}
	&& 逻辑操作符 在左侧为真值时返回右侧操作数
*/

// ??= 空赋值运算符  仅在左侧是null或undefined时对其赋值
const a = 0  a ??= 1 // 0
const a = null | undefined  a ??= 1 // 1
```



### 不使用循环和标准库函数进行数据累加

```js
/**
 	方案：使用递归f(x) = f(x - 1) + x
 	@param i i如果大于或者等于nums的长度？0：拿到nums对应key值+=当前key加上一位
 	return 0位开始就是累加所有
*/
function sum(nums) {
    function f(i) {
        return i >= nums.length ? 0 : nums[i] + f(i + 1)
    }
    return f(0)
}
f([1,2,3]) // 6
```



### 判断对象上是否有某个属性 （in关键字等

```js
let obj = { x: 1 };
1、!== 方法
    obj.x !== undefined;   // true 有x属性
    obj.y !== undefined;   // false ⽆y属性
    obj.toString !== undefined;   // true 从Object继承toString属性

2、in运算符
	'x' in obj;             // true
  'y' in obj;             // false
  'toString' in obj;      // true 继承属性

3、对象的hasOwnProperty()方法
    let a = 'a';
    let b = 'bc';
    obj.hasOwnProperty('x');               // true 包含
    obj.hasOwnProperty('y');               // false 不包含
    obj.hasOwnProperty('toString');        // false 继承属性
    obj.hasOwnProperty(a + b);             // true 判断的是属性abc

4、propertylsEnumerable()方法
    let obj = Object.create({x: 1}); // 通过create()创建⼀个继承了X属性的对象obj
    obj.propertyIsEnumerable('x');  // false x是继承属性
    obj.y = 1;  // 给obj添加⼀个⾃有可枚举属性y
    obj.propertyIsEnumerable('y'); // true
    Object.prototype.propertyIsEnumerable('toString'); // false 不可枚举

	Object.getOwnPropertyNames(obj).length === 0 // 判断为空数组

5、object.keys()方法
    let arr = Object.keys(obj);
    arr.includes('x');  // true
    arr.includes('test');  //false

	Object.keys(obj).length === 0 // 判断为空数组

```



### 运算符的优先级

![image-20220616134801499](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220616134801499.png)



### 两个循环嵌套时 结束其中一个循环

```js
outerLoop: for(var i = 0; i < 10; i++) { // 给外层循环起名字
    for (var j = 0; j < 10; j++){
        break outerLoop // 结束外层循环
    }
}
```



### es6解构、剔除方法

```js
...arr // 解构
const {pwd, ...res} = userinfo // 把userinfo的数据解构到res内 并剔除pwd

const {pwd, ...res:data} = userinfo // 把userinfo的数据解构到data内 并剔除pwd

arr = {a:{b:{c:1}}}
const {a:{b:{c:data}}} = arr // 把c从arr内连续解构赋值出来，并改名为data
```



### Object.is 方法

```js
// 只有两个数完全相等时才会返回true 否则都为false 并且判断两个NaN为true(改版的===)
Object.is(NaN, NaN) // true
object.is(unll, undefined) // false
object.is(+0, -0) // false
```



### 导出的方法

```js
// 在写请求接口的时候 加上responseType: 'blob'
1、
selectOutstandingAllExcel(data).then((res) => { // 请求函数名和参数
    console.log(res)
    const link = document.createElement("a")
    let blob = new Blob([res], { type: "application/vnd.ms-excel" })
    link.style.display = "none"
    link.href = URL.createObjectURL(blob)
    let num = "" // 生成随机数字 用于起名
    for (let i = 0; i < 10; i++) {
        num += Math.ceil(Math.random() * 10)
    }
    link.setAttribute("download", "业绩详情表_" + num + ".xlsx") // 下载的文件的名字
    document.body.appendChild(link) // 向body内添加一个下载连接a标签
    link.click() // 手动让他触发
    document.body.removeChild(link) // 清除渲染在body上的a标签
})

2、
// 使用 npm i file-saver 插件
import { saveAs } from 'file-saver'
saveAs(text, name, opts) { // 定义一个通过插件拿到的saveAs的方法的统一方法
	saveAs(text, name, opts)
}
/**
   * 封装一个导出excel类型文件的方法
   * @param data 接收到的是通过responseType: 'blob'请求到的二进制文件
   * @param name 导出的文件名
   调用 this.$download.excel(response, '跟进列表')(已挂载全局的用法)
  */
excel(data, name) {
    for (let i = 0; i < 10; i++) {
        name += Math.ceil(Math.random() * 10)
    }
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
    this.saveAs(blob, name + '.xlsx') // saveAs的第一个参数是解析的blob文件 第二个是文件名(不加扩展 会自动推断)
},
```



### CSS设置全屏灰色

```css
filter: grayscale(1); // 1是灰度的深度 0是正常 1是灰
```



### CSS修改默认的滚动条样式

```css
/*滚动条样式*/
::-webkit-scrollbar {
    width: 4px;
    // height: 4px;
}
/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    background: rgba(0, 0, 0, .2);
}
/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    border-radius: 0;
    background: rgba(0, 0, 0, .1);
}
/* 光标移到滚动滑块上样式颜色变深 */
::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, .3);
}
/*定义两端按钮的样式*/
::-webkit-scrollbar-button {
    // background-color: cyan;
}
/*定义右下角汇合处的样式*/
::-webkit-scrollbar-corner {
    // background: khaki;
}
```



### vue的子页面/父页面方法互调

```js
// 子页面调父页面的方法
this.$parent[func | data] // 在这里有父页面全部的方法和data数据

// 父页面调子页面
<child res='child' />
this.$refs.child[func | data] // 可以拿到子页面的方法和data数据

/** 
	官方原话
	指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中
*/

// 还有一种provide/inject方法 父亲给子孙传递
父页面 provide: {foo: [this.func || data]}, // 使用provide方法暴露出去方法或数据
子页面 inject: ['name'] // 子页面通过inject接收 接收完了之后就可以直接调用
this.name // 直接使用
```



### 取vuex内数据的方法

```js
1、this.$store.getters.name // 全部暴露在getters内的数据可以这样拿到
2、this.$store.state.user.name // 未暴露在getters内的数据
3、
/**
	引入vuex的mapGetters方法 import { mapGetters } from 'vuex'
	在计算属性computed内 ...mapGetters(['name'])
*/
```



### pc端使用copy方法

```js
/**
	引入插件 import VueClipboard from 'vue-clipboard2'
	Vue.use(VueClipboard) // 挂载copy插件
	1、挂载之后自动创建三个自定义指令
	v-clipboard:copy="imgUrl" v-clipboard:success="onCopy" v-clipboard:error="onError"
	imgUrl copy源
	onCopy Copied的回调
	onError  Can not copy的回调
	2、给全局挂载了一个$copyText的方法 只要把要copy的数据传给他就可 then调用
*/
this.$copyText(this.imgUrl).then(res => {
    this.$modal.msgSuccess('Copied')
}, err => {
    this.$modal.msgError('Can not copy')
})

// 扩展 uni的copy方法 使用uni.setClipboardData的api
Vue.prototype.$copy = function(msg) { // 把copy方法挂载在全局
	uni.setClipboardData({
		data: msg, //要被复制的内容
		success: () => { //复制成功的回调函数
			uni.showToast({ //提示
				title: '复制成功'
			})
		}
	});
}
```



### 获取滚动条距离顶部和左边的高度距离

``` js
function getPageScrollTop(){ // 距离顶部
    let a = document
    return a.documentElment.scrollTop || a.body.scrollTop
}

function getPageScrollLeft(){ // 距离左侧
    let a = document
    return a.documentElment.scrollLeft || a.body.scrollLeft
}
```



### requestAnimationFrame处理动画帧卡顿新方法

1、屏幕刷新频率：屏幕每秒出现图像的次数。普通笔记本为60Hz

2、动画原理：计算机每16.7ms刷新⼀次，由于⼈眼的视觉停留，所以看起来是流畅的移动。

3、setTimeout：通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象；原因是：1、settimeout任务被放⼊异步队列，只有当主线程任务执⾏完后才会执⾏队列中的任务，因此实际执⾏时间总是⽐设定时间要晚；2、settimeout的固定时间间隔不⼀定与屏幕刷新时间相同，会引起丢帧。

4、requestAnimationFrame：优势：由系统决定回调函数的执⾏时机。60Hz的刷新频率，那么每次刷新的间隔中会执⾏⼀次回调函数，不会引起丢帧，不会卡顿(HTML5提供的专门用于请求动画的api  请求动画帧)

```js
var progress = 0
function render() { //回调函数
    progress += 1; //修改图像的位置
    if (progress < 100) { //在动画没有结束前，递归渲染
        window.requestAnimationFrame(render)
    }
}
//第⼀帧渲染
window.requestAnimationFrame(render)
```

### 闭合标签 #region #endregin

```js
// #region 下面的内容可以统一折叠起来
	.....
// #endregion
```

### 让页面滚动更平滑

```css
scroll-behavior: smooth; // css属性 可以让页面的滚动跟动画一样平滑
```

### 正则表达式

```js
// 数字格式化 一串数字每三位加一个分号 1000000 ==> 1,000,000
const reg = /(?=\B(\d{3})+$)/g
num.replace(/(?=\B(\d{3})+$)/g, ',') // 1,000,000
```



### vue内props和data的优先级

```
源码内的执行顺序为
	props ==> methods ==> data ==> computed ==> watch
```



### 算法面试题 函数柯里化

```js
/**
	已知如下代码，请实现 add 函数，到达返回值与注释匹配的预期
  add(1)(2)(3).finish();                // 6
  add(1, 2, 3)(4).finish();             // 10
  add(1)(2)(3)(4, 5).finish();          // 15
  add(2, 6)(1).finish();                // 9
  var adding = add(1, 2)(3)
  setTimeout(() => {
    adding(4)(5, 6).finish();           // 21
  }, 1000)
*/

方法1：完美解决 通过bind、柯里化、arg、reduce方法执行
	function add(...arg) {
      console.log('arg', arg);
      add.__proto__.finish = () => {
        let res = arg.reduce((prev, cur) => prev += cur, 0)
        console.log(res)
      }
      return add.bind(this,...arg)
    }
方法2：只能解决浅层次一次回调一个参数add(1)(2)(3)这种
	function add2(num) {
      let sum = 0
      sum = num
      function fn(n) {
        sum += n
        return fn
      }
      fn.finish = function() {
        console.log(sum)
      }
      return fn
    }

// 另一个函数柯里化的例子
function add() {
  let args = Array.prototype.slice.call(arguments) // [1] => [1,2,3,4]
  const _addr = function() {
    args.push(...arguments) // 将后续参数push到args数组内
    return _addr
  }
  _addr.toString = fucntion() {
    return args.reduce((a,b) => a + b)
  }
  return _addr
}
add(1)(2)(3)(4) // 10
```



### 阶乘和尾递归优化写法

```js
// 尾递归 --- 函数内调用自身 成为递归。如果尾调用自身 成为尾递归
// 普通写法 -- 通过普通的递归写法 这样写会保存n个调用记录 复杂度O(n)
	function factorial(n) {
    if(n === 1) return 1
    return n * factorial(n - 1)
  }
	factorial(5) // 120
// 尾递归优化写法 通过尾递归的方式 把上一次计算的值存储下来 使用尾调用之后只保留一个调用记录 复杂度O(1)
	function factorial(n, total = 1) {
    if(n === 1) return 1
    return factorial(n-1, n * total)
  }
	factorial(5) // 120
```

### 斐波那契数列和尾递归优化写法

```js
// 数列从第3项开始，每一项都等于前两项之和 1，1，2，3，5，8，13，21，34，55，89...
// 数学的计算方法 F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)
// 普通写法 这样写会保存n个调用记录 复杂度O(n)
	function fibonacci(n) {
    if(n <= 1) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
  }
	fibonacci(10) // 89
	fibonacci(100) // 超时
// 尾递归优化  使用尾调用之后只保留一个调用记录 复杂度O(1)
	function fibonacci(n, ac1 = 1, ac2 = 1) {
    if(n <= 1) return 1
    return fibonacci(n - 1, ac2, ac1 + ac2)
  }
	fibonacci(100) // 57.....
	fibonacci(1000) // 7.0...e+28
```



### 方法：列表转树形结构

```js
const list = [....] // 数组对象的列表
const transListToTreeData = (data, rootValue) => { // data =>list rootValue根节点的值
  const arr = [] // 定义一个接收树形数据的数组 将之返回
  data.forEach(item => {
    if(item.pid === rootValue) {
      arr.push(item)
      const children = transListToTreeData(data, item.id) // 子节点
      children.length && (item.children = children)
    }
  })
  return arr
}
transListToTreeData(list, 0) // 遍历树形一定要有rootValue代表从这里开始遍历
```



## uniapp

```js
/**
	setScreenBrightness({value: 0最暗 1最亮}) 设置屏幕亮度
	getScreenBrightness({succ...}) 获取当前屏幕亮度
	setKeepScreenOn({see...true}) 保持屏幕常亮
	setNavigationBarTitle({title:...}) 在页面从新设置当前页面标题
*/



"navigationStyle": "custom", // 隐藏顶部导航栏
"navigationBarRightButton": { "hide": true } // 隐藏右上角小胶囊(有问题)


uni.setNavigationBarTitle({title:...}) // 在页面动态修改页面标题
uni.requestPayment() // 支付
```



































