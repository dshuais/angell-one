## typescript

 npm i typescript -g

##### 编译为js文件

tsc ts文件名.ts

##### 解决ts和js冲突

tsc --init

##### 自动编译

tsc --watch

##### 发生错误不自动编译

tsc --noEmitOnError --watch





##### 类型别名 -> 声明

```
type Point = {a: number, b: string}  // type 方式声明(let pt:number = 1)

interface Point {a: number, b: string}  // 接口方式声明

使用 -> function fn(pt: Point) {}
```



##### 扩展

 把已定义的类型扩展到另已变量

```
接口扩展 --- interface Animal {name: Lstring}

​					insterface Bear extends Animal { homey: boolean }  // 这样Bear内将有name和homey两个变量

​	extends // 接口的扩展 类似于class的继承

type扩展 --- type Animal = {name: Lstring}

​					type Bear = Animal & { homey: boolean }  // 这样Bear内将有name和homey两个变量
```



已定义的类型内新加属性

​		接口类型 可直接再次声明 即可合并两次声明

​		type类型 无法再次声明合并



##### 类型断言

返回某种类型的HTMLElement

```
const myCanvas = document.getElementById('main_cavas') as HTMLCanvasElement 或

const myCanvas = <HTMLCanvasElement>document.getElementById('main_cavas')
```



##### 文字类型

即 可以随意定义当前变量类型 --- let count: 1 = 1 (因为定义为1 所以只能为1 -> string number boolean都可)

问题 function fn(url: string, method: 'GET' | 'POST' | 'GUESS'){}    const req = {url: 'http...', method: 'GET'}   fn(req.url, req.method)

​	在函数内使用req时 会报错 因为自动识别req.method类型为string. 所以可使用类型断言的方式

 	1. 在使用的fn()内 或 声明req.method时 写 as ‘GET’
 	2. 在定义的req对象后添加 as const 即固定url和method类型



##### null和undefined

​	一个方法在变量后面加！ 可判断不是null或不是undefined (console.log(x!.toFixed(2)) 保留两位小数的时候 判断变量不是n和u的时候执行 ---> *没试过*)



##### 枚举

```
enum Direction {
	up = 1,
	down,
	left,
	right
}
log(Direction.up) // 1 (Direction.down 自动识别为2 依次排序)
```

**附：定义变量时 名称后面加？ 代表可不传入**(function fn(x? : null | number))



##### bigInt和symbol

定义bigint和symbol类型

```
const x: bigInt = BigInt(100)
const x: bigInt = 100n  // es2020以上

const y: symbol = Symbol('y')
const z: symbol = Symbol('y') // y === z false永远不会相等
```



##### typeOf类型缩小

​	在函数内if通过typeof进行判断筛选不同类型做不同事情 typeof判断叫做类型缩小

还有的类型缩小方式：真值缩小、等值缩小、in操作符缩小、instance操作符缩小、分配缩小

​	控制流分析：在function fn(){} 内 定义变量并指定类型  在一次又一次操作赋值之后 变量类型会变化



##### 类型谓词

​	function fn(pat:..): pet is XXX {}  在函数后指定返回的值 使用与传入变量名相同的pet is 指定类型 - 的方式使用类型谓词



##### never类型与穷尽性检查

​	never标识一个不应该存在的状态

```
interface a { kind: 'a' a: number }
interface b { kind: 'b' b: number }
interface c { kind: 'c' c: number }
type d = a | b | c
function fn(aa: d){
	switch(aa.kind){
		case 'a':
		case 'b':
		case 'c':
		default : return const _exhaustiveCheck: never = a  // 这个时候的default就是一个不存在的状态
	}
}
```



##### 函数 调用签名 构造签名

```
type fn = {
	a: string;
	(someArr: number): boolean
}
fn(fn: fn){ fn() } // 调用签名

class Ctor {
	s: string
	constructor(s: string) {
		this.s = s
	}
}
type fn1 = {
	a: string;
	new (someArr: number): Ctor
}
fn(fn: fn1){ new fn() } // 调用构造签名
```



##### 泛型函数

```
function fn<Type>(arr: Typ[]): Type | undefined { return arr[0] }
fn(['a', 'b', 'c']) // string
fn([1, 2, 3]) // number
fn([]) // undefined
当在定义函数的时候 使用<xxx> 定义了泛型类型 函数会自动去识别是什么类型

```









































## VUE3

### vue3中的数据劫持方法

```js
const a = {
	get(target, prop) {
        const result = Reflect.get(target, prop)
        return result
    }
    set(target, prop, value) {
        const result = Reflect.set(target, prop, value)
        return result
    }
	deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop)
        return result
    }
}
```



### 组合式api

#### shallowReactive和reactive

shallowReactive是浅的数据劫持、监视、响应式

reactive是深层次的

#### shallowReadonly和readonly

shallowReadonly是浅的只读 (浅层次依旧可修改和删除嵌套的数据)

readonly是深层次只读

#### shallowRef和ref

shallowRef 浅

ref 深

#### isRef, isReactive, isReadonly, isProxy判断是否为响应对象

isRef  判断是否为ref的对象

isReactive  判断是否为reactive的对象

isReadonly  判断是否为readonly的对象

isProxy  判断是否为reactive或readonly的对象

```js
用法  console.log(isRef(ref({}))) ==> true
```















### Teleport 瞬移标签

通过标签的to属性 可以把teleprot标签内的html元素移动到指定的html标签下

```js
用法：
<Teleport to="body">
	<div>数据</div>
</Teleport>
```



### Suspense标签 解决异步组件加载空白期的问题

动态加载组件的方法:

​	vue2: const component = () => import('./component.vue')

​	vue3: const component = () => defineAsyncComponent(import('./component.vue'))

​	vue3通过defineAsyncComponent的方法动态加载组件

Suspense的用法：

```js
<Suspense>
    <template #default>
    	<component />
    </template>
    <template v-solt:fallback>
        loading.... // 在异步组件未加载完成时，展示加载loading...
    </template>
</Suspense>
当组件内返回promise async await then catch都为异步组件
```























## vue3+ts模板pure-admin的路由参数表

![image-20220529223430864](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220529223430864.png)





