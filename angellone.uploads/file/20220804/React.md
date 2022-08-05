## 	React



#### jsx的语法规则

​	1、定义虚拟DOM时，不要写引号

​	2、标签混入js表达式时要用{}

​	3、样式类名指定不要用class 要用className

​	4、内联样式要用style={{key:value}}的形式并且驼峰，第一个{}表示为表达式 第二个{}表示style的写法为一个对象

​	5、只有一个根标签(看起来跟vue2类似)

​	6、标签必须闭合（废话）

​	7、标签首字母规则：

​		小写：将转换为html标签(span)

​		大写：react就去渲染对应组件(Span)

**补充注意点**

​	js语句和js表达式区分

​	表达式：一个表达式会产生一个值，可以放在任何需要值的地方 例如：a,a+b,demo(1),arr.map(),fun test(){}等

​	语句：if(){}、for(){}、switch()...等

```js
<script type="text/javascript" src="./js/react.development.js"></script>
<script type="text/javascript" src="./js/react-dom.development.js"></script>
<script type="text/javascript" src="./js/babel.min.js"></script>
<script type="text/babel"> // 必须用babel解析
    const myId = 'idname',mydata = 'Hello React',list = ['react','vue','angular']
    const VDOM = ( // 创建一个虚拟DOM
      <div>
        <h1 className='title' id={myId.toLocaleLowerCase()} style={{background:'#000'}}>{mydata}</h1>
        <h1 id={myId.toLocaleUpperCase()}>
          {list.map(ii => {
            return <div key={index}>{ii}</div>
          })}
        </h1>
      </div>
    )
    ReactDOM.render(VDOM, document.getElementById('test')) // 引入了之后默认添加ReactDOM.rander方法 渲染页面使用 只能渲染一次 多次渲染为覆盖
 </script>
```



### 组件

#### 函数式组件

```react
function MyComponent() {
    console.log(this) // 此处this为undefined 因为babel编译后开启了严格模式
    return <h2 style={{background:'red'}}>我是用函数定义的组件</h2>
}
ReactDOM.render(<MyComponent />, document.getElementById('test'))
/**
	执行这个ReactDOM.render(<MyComponent />, document.getElementById('test'))之后
	1、React解析组件标签，找到MyComponent组件
	2、发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM呈现
*/
```

#### 类的巩固

```react
class Person { // 创建一个Person类
    constructor(name,age) { // 类的构造器方法
        this.name = name // 构造器中的this是类的实例对象
        this.age = age
    }
    spaek() { // 一般方法 放在类的原型对象上 供实例使用，通过Person实例调用speak方法时，this就指向调用的实例对象
        console.log(`我叫${this.name},年龄是${this.age}`);
    }
}
const a = new Person('张三',18)
a.spaek() // 我叫张三,年龄是18

class Student extends Person{ // 继承于Person
    constructor(name,age,grade){
        super(name,age) // 继承父类的两个变量
        this.grade = grade
        this.school = '武船' // 往后所有继承Student的类都会有这个属性
    }
    spaek() { // 重写从父类继承的方法 如果不重写会直接使用父类的speak的方法
        console.log(`我叫${this.name},年龄是${this.age},在读${this.grade}`)
    }
    study(){
        log('我很努力学习')
    }
}
const a = new Student('李四',18,'初中')
a.spaek() // 我叫李四,年龄是18,在读初中
a.study() // 我很努力学习

/**
	总结：
	1、类中的构造器不是必须写的，要对实例进行一些初始化的操作，如添加指定属性时才写
	2、如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的
	3、类中所定义的方法，都是放在了类的原型对象上，供实例使用
*/
```

#### 类式组件

```react
class MyComponent2 extends React.Component { // 创建类式组件 继承自react的component
    super(props)
    this.state = {isHot: true}
    // 改变this.changeWeather this的指向并生成一个函数赋值给changeWeather，不改变this的话 
    this.changeWeather = this.changeWeather.bind(this)
    render() { // render是放在MyComponent2的实例对象上的 功实例使用，这里面的this指向的是MyComponent2组件实例对象
        return <h2 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '寒冷'}</h2>
        // onClick也可以直接在里面改this指向onClick={this.changeWeather.bind(this)}即可
    }
    changeWeather() {
        /**
       * changeWeather放在 whather的原型对象上 由于changeWeather是作为onClick的回调所以不是通过实例对象调用的是直接调用
       * 类中方法默认开启了局部的严格模式，所以changeWeather中的this会是undefined
      */
        const { isHot } = this.state
        this.setState({isHot: !isHot}) // this.setState是react提供的方法 改变状态必须通过他来改且更改是一种合并
    }
}
ReactDOM.render(<MyComponent2 />, document.getElementById('test'))
/**
	执行这个ReactDOM.render(<MyComponent2 />, document.getElementById('test'))之后
	1、React解析组件标签，找到MyComponent组件
	2、发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用原型上的render方法
	3、将render返回的虚拟DOM转为真实DOM呈现
*/
// class内更简单的方法 不用写constructor直接在class上赋值
state = {isHot: true}
changeWeather = () => { // 是用箭头函数 使用了箭头函数没有this的机制 自动找调用它的实例上的this
    const { isHot } = this.state
    this.setState({isHot: !isHot})
}
```

#### 给类组件传递参数

```react
class StudentInfo extends React.Component {
    static propTypes = { // react的propTypes方法 限制porps接收到的数据的数据类型和必填项
        // 使用prop-type插件引入的PropTypes方法 可以给数据定义类型和是否必传
        name: PropTypes.string.isRequired,
        sex: PropTypes.string, 
        age: PropTypes.number,
        speak: PropTypes.func // func用来声明是function类型
    }
    static defaultProps = { // react的defaultProps方法 给props接收到的参数声明默认值
        sex: '男', age: 19
	}
    render() {
        const {name,age,sex} = this.props // 通过组件传递过来的参数都在this.props上
        return ...
    }
}

const info = {name:'杜帅'}
function speak() { console.log('speak') }
ReactDOM.render(<StudentInfo {...info} speak={speak}/>，document.getElementById('test'))
```

### Ref的三种使用方法

```react
{// Ref可以帮助用户拿到当前的节点信息 DOM 跟vue里的ref差不多 只是使用方式不同 }
1、string字符串方式，该方法不推荐 因为虽然方便简单但是消耗性能
render(){
    return {
        ...<input ref='input1' ..> // 定义ref 定义了之后在constructor内可以直接this.refs.input拿到 拿到的是定义ref上的标签 例如input框 通过this.refs.input1拿到的就是input框的实例
    }
}
            
2、回调函数方法,该方式是使用最多的，但是在组件更新时当前ref会被附两次值 一次为null清空 一次为当前实例对象(无关紧要 官方说的)
render(){
    return {
        ...<input ref={currentNode => this.input1 = currentNode} ..> // 回调函数接收到的c就是当前的input实例
    }
}
            
3、createRef() API的方式，官方最推荐 但是麻烦，使用时先在constructor内定义好要赋值的ref数据 input1 = React.createRef()
// React.createRef()调用后可以返回一个容器，该容器存储ref所标识的节点，该容器是专人专用的 每要用一次就要定义一个createRef()
render(){
    return {
        ...<input ref={this.input1} ..> // 这样就直接把该节点的实例给了已定义好的input1
    }
}
{// 使用的时候 直接 this.input1.current 可以拿到当前节点DOM
```

**番外**

```react
{/**
	通过onXxx属性指定事件处理函数(注意区分大小写)
        1、React使用的是自定义(合成)事件，而不是原生的DOM事件 ———— 为了更好地兼容性
        2、React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ———— 为了高效
	通过event.target可以得到发生事件的DOM元素对象(就是我上面形容的input的实例) ———— 不要过度使用ref 会消耗性能
*/}
func = (event) => {
    log(event.target)
}
```



### 非受控组件

​	页面中所有的输入类DOM(input、select...)，现用现取就属于非受控组件

```react
{// 在form表单的onSubmit提交事件时 通过event.preventDefault()阻止表单提交
```

### 受控组件

​	输入类的DOM，通过输入的时候把值维护到状态state里 用的时候直接取state里的值，这种方式叫受控组件(类似vue的双向数据绑定) 使用受控组件就可以避开使用ref，省略掉ref对性能会更好

```react
<input onChange={this.saveUsername} type="text" placeholder='账号'/> {// 通过onChange拿到当前DOM 并指定回调
saveUsername = e => { // 在回调内拿到event 把当前DOM的value赋值给state里面
    this.setState({username:e.target.value}) // 使用时要先在state内定义这个变量
}
```



### 高阶函数

​	概念：两个条件满足任意一个就称之为高阶函数。常见的高阶函数有Promise、setTimeout、arr.map()等

​	1、若A函数，接收到的参数是一个函数，A就是高阶

​	2、A函数，调用的返回值依然是一个函数，A就是高阶

```react
// 在受控组件内就可以使用高阶函数 对输入类DOM的绑定之进行统一处理 也可以使用箭头函数同时传递username和event
state = {username: void 0} // 把数据都放在状态state内
saveFormData = (type) => { // 这就是定义一个高阶函数 => 返回值为一个函数 type是函数传的的username
    return e => { // e 是当前节点
        this.setState({[type]:e.target.value})
    }
}
<input onChange={this.saveFormData('username')} type="text" placeholder='账号'/>
```



### 函数的柯里化

​	通过函数调用继续放回函数的方式，实现多次接收参数最后统一处理的函数编码形式

```js
fun(a){ // 这就是函数柯里化的写法
    return (b) => {
        return (c) => {
            return a+b+c
        }
    }
}
fun(1)(2)(3) // 6
```



### React的生命周期钩子(旧)

```react
1、初始化阶段：由ReactDOM.render()触发 --- 初次渲染
        1、constructor() // 类的构造器
        2、componentWillMount() // 将要挂载的钩子
        3、render() // 初始化 ==> 常用 渲染的页面 不用没页面
        4、componentDidMount() // 组件挂在完毕的钩子 ==> 常用，一般在这里做初始化操作：开启定时器、发请求、订阅消息
2、更新阶段：由this.setState()或父组件render触发
		0、componentWillReceiveProps() // 组件将要接收新的props的钩子 在父给子传值的时候触发 接收到一个props(注意props是最新的值 默认第一次不会触发) （从这里向下是第一条更新线
		1、shouldComponentUpdate() // 控制组件更新的‘阀门’ 必须有返回值...(){return true} true表示允许更新 false表示不允许更新，不写这个钩子表示默认允许 （从这里向下是第二条更新线
		2、componentWillUpdate() // 将要更新的钩子 （从这里向下是第三条更新线,从这里更新是通过forceUpdate()触发
		3、render()
		4、componentDidUpdate() // 更新完毕的钩子
3、卸载阶段：由ReactDOM.unmountComponentAtNode()触发
		1、componentWillUnmount() // 组件将要卸载的钩子 ==> 常用 在这里做一些收尾的工作：关闭定时器，取消订阅等
```



### React的生命周期钩子(新)

```react
1、初始化阶段：由ReactDOM.render()触发 --- 初次渲染
        1、constructor() // 类的构造器
        2、static getDerivedStateFromProps() // 若state的值任何时候都取决于props，那么就是用它 可以接收到(props,state)两个值 返回值是返回一个对象更新state
        3、render() // 初始化 ==> 常用 渲染的页面 不用没页面
        4、componentDidMount() // 组件挂载完毕的钩子 ==> 常用，一般在这里做初始化操作：开启定时器、发请求、订阅消息
2、更新阶段：由this.setState()或父组件render触发
		1、static getDerivedStateFromProps()
		2、shouldComponentUpdate() // 控制组件更新的‘阀门’ 必须有返回值...(){return true} true表示允许更新 false表示不允许更新，不写这个钩子表示默认允许 （从这里向下是第二条更新线
		3、render()
		4、getSnapshotBeforeUpdate()
		5、componentDidUpdate() // 更新完毕的钩子
3、卸载阶段：由ReactDOM.unmountComponentAtNode()触发
		1、componentWillUnmount() // 组件将要卸载的钩子 ==> 常用 在这里做一些收尾的工作：关闭定时器，取消订阅等

/**
	在新版内即将废弃三个钩子：暂时只是改名了(以后可能会彻底废弃)
		1、componentWillMount() ==> UNSAFE_componentWillMount()
		2、componentWillReceiveProps ==> UNSAFE_componentWillReceiveProps()
		3、componentWillUpdate() ==> UNSAFE_componentWillUpdate()
*/
```



### React/Vue的key的作用？为什么最好不要使用index为key

​	1、虚拟DOM中key的作用：

​		(1) 简单说：key是虚拟DOM对象的标识，在更新显示时key起着及其重要的作用

​		(2) 详细说：当状态中数据发生改变时，react会根据**新数据**生成**新的虚拟DOM**，随后react进行新虚拟DOM和旧虚拟DOM的diff比较

​			a.旧虚拟dom中找到了于新虚拟dom相同的key；若虚拟dom中内容没变，直接使用之前的真实dom；若虚拟dom中内容变了，则生成新的真实dom  （diff查找的过程是深层次的递归查询的）

​			b.旧虚拟dom中未找到相同的key；创建新的真实dom

​	2、用index作为key可能会引发的问题：

​		(1) 若对数据进行逆序添加、删除等破坏顺序的操作会产生没有必要的真实dom更新，页面效果虽然没问题，但是效率低

​		(2) 如果结构中包含输入类的dom 会产生错位 界面就会有大问题

​		(3) 如果不存在逆序添加、删除等破坏顺序的操作 用index作为key也可以



### react脚手架

```react
create-react-app demo
```



#### react脚手架配置请求代理

##### 方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

##### 方法二

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```js
   const { createProxyMiddleware } = require('http-proxy-middleware') // 不用下载 react自动npm了
   
   module.exports = function(app) {
     app.use(
       createProxyMiddleware('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       createProxyMiddleware('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。



### 兄弟组件之间通信 pubsub-js订阅预发布模式

```react
// yarn add pubsub-js 下载包
import Pubsub from 'pubsub-js' // 引入

const name = Pubsub.subscribe('delete', fun(_,data){}) // 订阅delete事件 回调接收到两个参数 1.订阅名 2.发布者发布的数据data
Pubsub.publish('delete', data) // 发布消息 发布给delete事件
Pubsub.unsubscribe(name) // 取消订阅事件 在组件销毁的时候取消 name为订阅事件赋给的变量名
```



### 除了xhr(XmlHttpRequest)还有什么发送请求的方式 fetch

​	使用xhr方式的请求有 jquery axios

​	除了xhr形式的 还有 fetch 发送请求的方式，浏览器的原生函数(老版本浏览器可能会不支持)

```react
// 使用fetch发送请求 默认为直接发get请求
fetch(url).then(response => { // fetch发送第一次请求发送的是是否连接到服务器
    console.log('连接服务器成功', response)
    return response.json() // 如果成功会有一个.json()的回调 返回的也是一个promise 使用链式调用
}, err => { console.log('连接服务器失败', err) })
   .then(res => { // 链式调用then拿到的才是真正需要的请求的数据
    console.log('请求成功', res)
},err => { console.log('请求失败', err) })

// 优化fetch发送请求 通过async await发送请求 并通过try catch来捕获异常
try {
    const response = await fetch(url)
    const { items: users } = await response.json()
    console.log('请求成功', users)
} catch ({ message: err }) {
    console.log('请求失败', err)
}


// post请求
fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
}).then(function(data) {
    console.log(data)
}).catch(function(e) {
    console.log(e)
})
```



### React-Router-Dom react的路由

```react
// yarn add react-router-dom
/**
	相关api 内置组件
	1.	<BrowserRouter> history模式的路由(一个项目要用一种模式包裹起来 不然会产生不是同一个router的问题)
    2.	<HashRouter> hash模式的路由
    3.	<Route> 注册路由 <Route path='/home' component={home} /> path是路由 component是路由组件
    4.	<Redirect>
    5.	<Link> react中靠路由链接实现路由切换组件 link上的to='/home'属性是要去的路由(a标签) target='_blank' 新开标签
    6.	<NavLink> 跟Link一样 只是多了个点击的属性 可以通过 activeClassName='xx'给当前标签添加class默认添加active class
    7.	<Switch> 当多个路由时 如果路由内的path相同的时候可能会同时展示多个,因为route的匹配是从上到下 如果route多的话会造成效率问题 在外层包裹<Switch>标签可以让route只匹配一个就不再匹配
    其他
    1.	history对象
    2.	match对象
    3.	withRouter函数
*/
```

#### 路由组件和一般组件的区别

```react
// 一般组件接收参数时 在this.props内接收 还有一个另外自动维护的参数是一般组件标签标签体内数据自动放在this.props.children内
// 路由组件为多层级时/a/b/c 刷新页面会样式丢失 解决方法:1、把引入样式的相对路径./...的点去掉改为/... 2、把点改为%PUBLIC_URL% 3、使用hash模式路由
/**
	写法不同：一般组件 <Demo /> 路由组件<Route path='/demo' component={Demo} />
	一般组件放在components内 路由组件放在pages内 跟vue views一样 概念也类似
	接收到的props不同 一般组件 写组件标签时传递了什么就能收到什么
		路由组件 接收到三个固定的属性：
			history: go(n)、goBack()、goForward()、push(path,state)、replace(path,state)
			location: pathname: '/demo'、search: '' 、 state: undefined
			match: params: {} 、 path: '/demo' 、 url: '/demo'
*/
```

#### 路由的严格匹配

```react
/** <MyNavLink to='/about'>About</MyNavLink>  <Route path='/about' component={About} />
	1、react默认使用的是模糊匹配(输入的路径(link内to的路径)必须要包含匹配的路径(route内的path路径) 且顺序要一致)
	2、开启严格匹配 <Route exact={true} path='/about' component={About} />
	3、严格匹配不能随便开启，需要时再开 否则会造成无法继续匹配二级路由
*/
<Route exact={true} path='/about' component={About} /> // exact可简写
```

#### Redirect 默认路由重定向的的使用

```react
/**
	一般写在所有路由注册的最下方，当所有路由都无法匹配到的时候 跳转到redirect指定的路由
*/
<Route path='/about' component={About} />
<Route path='/home' component={Home} />
<Redirect to='/about' /> // 也可以指定一个页面刚进入的时候默认路由
```

#### 向路由传递参数

```react
/**
	1、params参数
		路由链接(携带参数): <NavLink to={`/home/${id}/${name}`}>Home</NavLink> 直接拼在路由后面
		注册路由(声明接收): <Route path='/home/:id/:name' component={Home} /> 向params内添加id和name参数
		接收参数(在路由页面): this.props.match.params (直接就是一个对象 参数是声明接收时的参数名)
	2、search参数
		路由链接(携带参数): <NavLink to={`/home?id=${id}&name=${name}`}>Home</NavLink> 跟get请求时相似 ?k=v&形式
		注册路由(声明接收): <Route path='/home' component={Home} /> 无需声明 正常注册
		接收参数(在路由页面): this.props.location.search (拿到的是一个?id=id&name=name的urlencoded编码字符串)
		备注: 解析search这个字符串需要借用querystring解析(react默认已经引入了) import qs from 'qs'(qs语法跟JSON一样)
	3、state参数
		路由链接(携带参数): <NavLink to={{pathname:'/home', state:{id,name}}} /> 跟vue的路由跳转类似吧 state是参数
		注册路由(声明接收): <Route path='/home' component={Home} /> 无需声明 正常注册
		接收参数(在路由页面): this.props.location.state (拿到的是一个{id,name})
		备注: BrowserRouter模式下刷新的话参数也不会丢失(HashRouter会丢失),vue路由跳转并使用params参数时刷新就会丢失
*/
```

#### 编程式路由导航

```react
// 借助this.props.history对象上的API操作路由跳转前进后退等
	// push和replace两种跳转方式第一个参数用法跟传递路由的方式一样 三种方式params、search、state
	this.props.history.push('/home', state) // 跳转到指定路径(会留下历史记录) 可携带state参数{}
	this.props.history.replace('/home',state) // 跳转到指定路径(会清除上一次历史记录) 可携带state
	this.props.history.goBack() // 后退一个 vue也有这个属性
	this.props.history.goForward() // 前进一个
	this.props.history.go(n) // 前进或者后退n个 负数为后退
```

#### withRouter方法的使用

```react
/**
	上面所说的编程式路由导航的方法 只在路由组件内可用 
	要想在一般组件内也使用的话需要用到withRouter 这样就在一般组件内可以使用路由组件的那几个方法和API
*/
import {withRouter,Component} from 'react-router-dom'
// 在导出class组件时不要直接默认导出了 在最后单独导出
class Home extends Component .... // 一般组件
export default withRouter(Home) // 使用withRouter解析一下 withRouter(Home)返回值为一个新组件并导出
```

#### BrowserRouter与HashRouter两种路由模式的区别

​	1、底层原理不一样：

​			BrowserRouter使用的是H5的history API，不兼容ie9以下版本

​			HashRouter使用的是URL的哈希值

​	2、path表现形式不一样：

​			BrowserRouter的路径中正常显示,例如localhost:3000/home

​			HashRouter的路径中会有一个#，例如localhost:3000/#/home

​	3、刷新后对路由state参数的影响：

​			BrowserRouter没有影响，因为state保存在history对象中，HashRouter刷新后会丢失state(刚好解释上面所说传递路由state参数HashRouter刷新丢失的结论)

​	4、虽然hash模式用的少 但是它可以解决一些路径错误的问题(正如上面所说的**路由组件和一般组件的区别**内 刷新样式丢失的问题)



### Redux

​	状态管理仓库 跟vuex类似

![image-20220709114957044](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220709114957044.png)

#### redux的三个核心概念

1、action 动作的对象，包含两个属性{type:标识属性,字符串,起个名字,data:{数据属性 值类型随意 为可选属性}}

2、reducer 用于初始化状态，加工状态，加工时 根据旧的state和action 产生新的state的纯函数

3、store 将state、action、reducer联系在一起的对象，

```react
import {createStore} from 'redux'
import reducer from './reducers'
const store = createStore(reducer)
// store的功能api
getState() // 得到state
dispatch(action) // 分发action 触发reducer调用 产生新的state(跟vuex很像)
subscribe(listener) // 注册监听，当产生新的state时，自动调用
```

#### redux的简单使用

​	不方便记笔记 就把代码贴出来根据需求更改

```react
/**
	yarn add redux
	1、src下创建-redux --store.js --count_reducer.js --constant.js --count_action.js
	2、--store.js内
		import { createStore, applyMiddleware } from "redux"
        import thunk from "redux-thunk" 开启异步的redux-thunk插件 使用applyMiddleware中间件来调用
        import countReducer from "./count_reducre"
        export default createStore(countReducer, applyMiddleware(thunk))
扩展：createStore官方提示已弃用 是为了迁移到Redux Toolkit 解决这个问题 可以legacy_createStore as createStore这样写
		import { legacy_createStore as createStore, applyMiddleware } from "redux"
        
	3、--count_reducer.js内
		import { INCREMENT, DECREMENT } from './constant' 统一管理的变量
        const initState = 0 state的默认值 初始第一次为undefined所以给默认值
        export default function countReducer(preState = initState, action) {
          const { type, data } = action action内就是上面说的为一个对象 内有type和data
          switch (type) { 对type进行判断 执行相应的操作
            case INCREMENT:
              return preState + data
            default:
              return preState
          }
        }
        
     4、--constant.js内对所有常量进行管理 方便统一修改
     	export const INCREMENT = 'increment'
     	
     5、--count_action.js内统一设置action (跟vuex状态管理很像)
     	export const createIncrementAction = data => ({ type: INCREMENT, data })直接返回一个object对象是同步操作
     	export const createIncrementAsyncAction = (data, time) => { 返回一个函数为异步操作 可以在里面发请求
          return (dispatch) => { 在返回的函数内可以拿到操作reducer的api dispatch
            setTimeout(_ => {
              dispatch(createIncrementAction(data))
            }, time)
          }
        }
     	
     6、-index.js内通过store.subscribe检测store内的data的变化，一旦变化就重新渲染<app/>(感觉整体重新渲染会性能不好)
     	import store from './redux/store'
     	store.subscribe(_ => {
          root.render(
            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>
          )
        })
*/
```



### react-redux

​	react自己封装的redux

![react-redux模型图](F:\dushuai\react\尚硅谷React全家桶教程（天禹老师主讲）\react全家桶资料\react全家桶资料\02_原理图\react-redux模型图.png)

```react
/**
	如图所示 react-redux不允许直接在组件内操作redux，需要给组件(ui组件)再包裹一层组件(容器组件) 容器组件的包裹跟func和class定义组件的方式不同 具体定义如下
	src下创建 -containers --Count ---index.jsx(这就是容器组件，创建了他之后 在引入ui组件的地方就需要更改引入内容 改成这个组件)
*/
--Count/index.jsx
	import CountUI from "../../components/Count" // ui组件
	import { connect } from "react-redux" // connect用于连接ui组件和redux
	
    // mapStateToProps函数返回一个对象 返回的对象数据在ui组件内通过this.props接收 用于传递状态
    const mapStateToProps = (state) => {return { count: state }}
    // mapDispatchToProps 返回的对象方法在ui组件内通过this.props接收 用于传递方法
    const mapDispatchToProps = (dispatch) => {
        return {jia: number => dispatch(createIncrementAction(number)),}
    }
    { // mapDispatchToProps的简写方式 直接传递函数名 点到为止 react-redux自动帮忙dispatch
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction
      }
	// 使用connect()()创建并暴露一个Count的容器组件
	export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
// 如上所示 那么在需要引入components/Count组件的地方就需要改为containers/Count(意思为引入ui组件的容器组件)
/**
补充：优化 (使用了react-redux后)
	1、不需要再去index.jsx内通过store.subscribe检测data的变化然后重新渲染了(解决上面的疑惑)
	2、不需要再在App.jsx文件内向组件一个个的传递store了 直接在index.js内 import { Provider } from 'react-redux'和引入store
		<Provider store={store}> react-redux推出了Provider可以使用它包裹着App 给它传递store之后它自动给所有的组件添加上store
          <App />
        </Provider>
	3、为了避免文件过多 不用把ui组件和容器组件分开写 可以把ui组件和容器写在一起 -connainers --Count ---index.jsx
		先定义好一个ui组件不暴露，再引入connect生成一个容器组件connect(..,..)(UI组件名)
*/
```

#### 模块化react-redux

​	redux文件夹下创建单独的-action,-reducers文件夹 存放不同的action和redures文件 每个文件只处理一个组件的事情 做到模块化

```react
// 使用模块化 在redux主文件store.js内 要使用combineReducers方法进行对reducers文件挂载 combineReducers接收的是个对象
-store.js (通过require.context方法加载-reducers文件夹下的所有文件并统一为一个对象。这是便捷方法)
	import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux"
	const reducersFiles = require.context('./reducers', true, /\.js$/),
      reducersAll = reducersFiles.keys().reduce((reduces, reducersPath) => {
        const reducesName = reducersPath.replace(/^\.\/(.*)\.\w+$/, '$1'),
          value = reducersFiles(reducersPath)
        reduces[reducesName] = value.default
        return reduces
      }, {}) // 这样统一处理之后 生成的对象格式{key(文件名):value(reducers默认暴露的方法)}
	export default createStore(combineReducers(reducersAll), applyMiddleware(thunk))//挂载(别忘了applyMiddleware(thunk)是处理异步的)

// 模块化之后需要在每个容器组件内的connect中声明好数据从哪里接收 state => ({ count: state.count(文件名) })
```



### 纯函数和高阶函数

纯函数：

​	1、一类特别的函数：只要是同样的输入(实参),必定得到同样的输出(返回)

​	2、必须遵守以下一些约束：不得改写参数数据；不会产生任何副作用，例如网络请求，输入和输出设备；不能调用Date.now()或者Math.random()等不纯的方法

​	3、redux和reducer函数必须是一个纯函数



### redux的开发者工具

```react
// 安装了之后要再项目里继续引入插件
yarn add redux-devtools-extension
-redux --store.js
	import {composeWithDevTools} from 'redex-devtools-extension'
	const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk))) // 开发者工具为第二个参数调用 如果第二个参数配置了异步 那就包裹着异步
```



### react的使用扩展

```react
---setState
/** setState更新状态的两种写法 我们上面都是只写的一种 直接传入个数组 this.setState({a:a+1})
	其实setState可以接收两个参数 第一个是对象或者返回一个对象的函数，第二个参数是一个回调 在回调内可以拿到最新的state的状态
	声明：setState()方法是异步的 在改变之后去手动看state内的状态的话 看到的还是更新前的，在下一次更新的时候才可以看到上一次更新的值
*/
1、setState(stateChange, [callback]) --对象类型的setState
	stateChange是状态改变的对象 callback是回调，它在状态更新完毕，界面也更新后(render后)才被调用
2、setState(updater, [callback]) --函数类型的setState
	updater为可以返回stateChange对象的函数，并且它可以接收到两个值(state,props)=>{}; callback回调
/** 总结：1、对象形式的setState是函数式setState的简写方式(语法糖)
2、如果新状态不依赖于原状态，使用对象方式；如果依赖，最好使用函数方式；如果需要在setState()执行后获取最新的状态数据使用cb
*/
    
    
---lazyLoad 路由的懒加载
/**
	1、通过react的lazy函数配合import()函数动态加载路由组件 路由组件代码会被分开打包
	2、使用懒加载路由可能会造成 点击跳转之后页面还没加载回来，所以会报错 需要使用<Suspense/>指定一个loading页面 在未路由未加载完后展示loading组件
*/
const Login = lazy(()=>import('@/pages/Login')) // 懒加载
import Loading from '@/pages/Loading' // 注意 loading页面不可使用懒加载
<Suspense fallback={Loading}>
<Switch>
    <Route path='/xxx' component={xxx} />
    <Redirect to='/login' />
</Switch>
</Suspense>
```

### 扩展Hooks

​	hooks是为了在函数组件内也可以使用state以及其他的react特性

#### 三个常见的hooks

```react
State Hook: React.useState()
Effect Hook: React.useEffect()
Ref Hook: React.useRef()
```

##### State Hook

```react
//state hook让函数组件也可以有state状态 并进行状态的读写操作
const [count, setCount] = React.useState(initValue) // count是一个状态，setCount是操作这个状态的函数 initValue是初始化的默认值
setCount()的两种写法：1、setCount(newVlue) 参数是非函数值 直接指定新的状态值 内部用其覆盖原来的状态值
2、setCount(value => newValue) 参数未函数，接收原本的状态值，返回新的状态值 可在这里进行一些操作
```

##### Effect Hook

```react
//effect hook可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子,可以使用生命周期钩子就可以进行一些ajax请求、订阅发布、手动更改真实DOM等)
useEffect(()=>{ // ([]包裹的为可选参数)
    [return ()=>{}]
},[[stateValue]])
/** 语法说明
[stateValue] 1相当于相当于componentDidMount()钩子 2、3相当于componentDidUpdate()钩子
	1、如果指定的是[](空数组),回调函数只会在第一次render()后执行 	  
	2、不传会在每次render()后执行
	3、[stateValue]数组内传入指定的state状态，就在当前传入状态render()后执行
	
return ()=>{} 相当于componentWillUnmount()钩子
	在组件卸载前执行 在此做一些收尾工作
*/
所以可以把 useEffect Hook 看做如下三个函数的组合
componentDidMount()
componentDidUpdate()
componentWillUnmount() 
```

##### Ref Hook

```react
// ref hook可以在函数组件中存储/查找组件内的标签或任意其他数据
const refContainer = useRef() // 保存标签对象 功能跟React.createRef()一样
<input type="text" ref={refContainer} /> // 取值时refContainer.current.value
```

### 扩展Fragment

 空标签 不解析，跟vue的<template/>标签和uni的<block/>一样

```react
<Fragment [key={..}]><Fragment> {// 它可以接收一个key值 用于遍历的时候使用
<></>
```



### 扩展Context

​	是一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

```react
const {createContext} from 'react'

1、const MyContext = createContext() // 创建Context容器对象
2、// 渲染子组件时，外面包裹MyContext.Provider标签(也可以从MyContext上把Provider标签结构出来直接用<Provider>包裹也可以),然后通过value属性给后代组件传递数据(只能用value传递)
<MyContext.Provider value={数据}>
      <子组件 />
</MyContext.Provider>
3、后代组件读取数据时 两种读取方法
(1)适用于类组件的方法
	static contextType = MyContext // 先声明接收context
//接收后通过Provider value传递的数据就在this.context内
(2)函数组件和类组件都适用 (因为函数组件没有this 也写不了static 所以用这种)
// 在书写组件内使用<MyContext.Consumer> 或解构的 <Consumer> 在内部使用一个回调 回调可以接收到传过来的vaule值
<div>我爷爷的名字叫:
    <Consumer>
    	{({ name, age }) => `${name},年龄为${age}`}
	</Consumer>
</div>

// 不过在应用开发中一般不用context, 一般都用它的封装react插件
```



### 扩展优化 class组件时使用PureComponent

```react
/** 使用PureComponent的原因	
	1、只要执行setState()即使不改变状态数据，组件也会重新render() --> 效率低
	2、当前组件重新render()时，就会自动重新render()子组件，即使子组件没有用到任何父组件的数据 --> 效率低
使用了PureComponent之后
	只有当组件的state或props数据发生改变时才重新render()
*/
方法1：自己重写shouldComponentUpdate()生命周期钩子 在里面比较新旧的state或props变化 有变化就返回true否则false
方法2：使用PureComponent，它底层重写了shouldComponentUpdate()生命周期钩子，只有state或props数据有变化才返回true(常用)
	注意:只是进行state和props数据的浅比较，如果只是数据对象内部数据变了 会返回false的(不要直接修改state数据,要产生新数据)
	
```



### 扩展lazyLoad路由懒加载

```react
// 通过react的lazy函数配个import函数动态加载路由组件 => 路由组件和代码会分开打包
const login = lazy(()=>import('@/pages/Login'))

// 通过<Suspense>指定在加载得到路由打包文件前显示一个自定义的loading页面
<Suspense fallback={<h1>loading.....</h1>}>
  <Switch>
  	<Route path="/xxx" component={Xxxx}/>
    <Redirect to="/login"/>
  </Switch>
</Suspense>
```



### render props

##### 如何向组件内部动态传入带内容的结构(标签)?

```react
vue中：
	使用slot插槽技术，在父组件引用子组件时传入内容 在子组件内定义<slot></slot>插槽 也有具名插槽
		父组件 <child>我子组件child内展示</child>
		子组件 <slot></slot>
		具名插槽:父组件<template v-slot:header>...</>  子组件<slot name='header'></slot>
react中：
	两种方法children props:通过组件标签体传入接口；render props:通过组件标签属性传入结构，而且可以携带数据，一般使用render函数命名
	children props： 如果B组件需要A组件内的数据, ==> 做不到 
    	父组件：<A>
                <B>xxx<B/>
               <A/>
		子组件内：{this.props.children}
	render props：
		父组件：<A render={(data) => <C data={data}></C>}></A> {// 父组件内使用方法回调的方式把孙组件C传给子组件A并可以接收到子A传递的数据
		子A组件: {this.props.render(内部state数据)} {// 子组件内接收父组件的props的render函数返回的内容 并把数据带去
		孙C组件: 读取A组件传入的数据显示 {this.props.data} {// 就是父传子的方法
```

### 扩展 错误边界

```react
/** 错误边界(Error boundary):用来捕获后代组件错误，渲染出备用页面
	只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中的错误
	使用方式:getDerivedStateFromError配合componentDidCatch
*/
static getDerivedStateFromError(error){ // 生命周期函数，一旦后代组件报错 就会触发
    console.log(error)
    return {hasError:true} // 在render之前触发 返回一个新的state
}
componentDidCatch(error,info){
    log(error,info) // 统计页面的错误，发送请求到后台去
}
```



### 组件间通信的方式总结

```react
1、props：---父子组件使用
	(1)children props
	(2)render props
2、消息订阅-发布(pubsub-js插件) ---兄弟组件、祖孙组件
	pubs-sub、event等
3、集中式管理 ---兄弟组件、祖孙组件
	redux、dva等
4、context ---祖孙组件(开发用的少，封装插件用的多)
	生成消费者模式
```





### React Routet 6

##### `<Routes />和<Route />`

```react
/**
	1、V6版本移除了先前的<Switch/>，引入了新的替代者<Routes/>
	2、<Routes/>和<Route/>要配合使用，且必须要用<Routes>包裹<Route>
	3、<Route/>相当于一个if语句，如果其路径与当前URL匹配，则呈现其对应的组件
	4、<Route caseSensitive>属性用于指定：匹配时是否区分大小写(默认为false)
	5、当URL发生变化时，</Routes>都会查看其所有子<Route/>元素以找到最佳匹配并呈现组件
	6、<Route/>也可以嵌套使用，且可配合useRoutes()配置 路由表，但需要通过<Outlet/>组件来渲染其子路由
*/
<Routes>
    /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
    <Route path="/login" element={<Login />}></Route>

		/*用于定义嵌套路由，home是一级路由，对应的路径/home*/
    <Route path="home" element={<Home />}>
       /*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
      <Route path="test1" element={<Test/>}></Route>
      <Route path="test2" element={<Test2/>}></Route>
	</Route>
	
		//Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
    <Route path="users">
       <Route path="xxx" element={<Demo />} />
    </Route>
</Routes>

扩展`<NavLink/>`携带参数跳转的方法
import { NavLink } from 'react-router-dom'
// 携带params参数跳转 需要在路由<Route/>或路由表内改path为path: 'msg/:id/:title/:content'接收
<NavLink to={`/home/message/msg/${mess.id}/${mess.title}/${mess.content}`}>11</NavLink>
// 携带search参数跳转 不需要改path
<NavLink to={`/home/message/msg?id=${mess.id}&title=${mess.title}&content=${mess.content}`}>11</NavLink>
// 携带state参数 也不需要改path(跟V5有区别)
<NavLink to='msg' state={mess}>11</NavLink>

该三种方式跳转路由的解析方法在下面的Hooks扩展内
```

##### useRoutes() 配置路由表

```react
-routes --index.js
export default [ // 路由表 --- 越来越有vue的味道了
  { path: '/about', element: <About /> },
  { path: '/home', element: <Home />,
  children: [ // 路由的嵌套写法 跟vue一样(后续路由的path直接写名字就可 例如/home/news)
      { path: 'news', element: <News /> },
      {
        path: 'message', element: <Message />,
        children: [ // 多级嵌套(例如/home/message/msg)
          // { path: 'msg/:id/:title/:content', element: <Msg /> }
          { path: 'msg', element: <Msg /> }
        ]
      }
   ]},
  { path: '/', element: <Navigate to='/about' /> }
]

-App.jsx
import {  useRoutes } from 'react-router-dom'
const element = useRoutes(routes) // useRoutes()的路由表
<div> // 使用的时候直接{element}渲染就可
      {element}
</div>
```



##### `<NavLink />`

```react
// 作用与<Link/>类似，作用上面V5说过 说说自定义样式
<NavLink
    to="login"
    className={({ isActive })=>{//className可以接收一个回调(参数为一个对象内一个isActive ture选中) 返回值为classname
        console.log('home', isActive)
        return isActive ? 'base one' : 'base'
    }}
>login</NavLink>

/*
	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
*/
<NavLink to="home" end >home</NavLink>
```

##### `<Navigate/>`

```react
只要`<Navigate>`组件被渲染，就会修改路径，切换视图 `replace`属性用于控制跳转模式（push 或 replace，默认是push
import React,{useState} from 'react'
import {Navigate} from 'react-router-dom'
export default function Home() {
	const [sum,setSum] = useState(1)
	return (
		<div>
			<h3>我是Home的内容</h3>
			{/* 根据sum的值决定是否切换视图 */}
			{sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
			<button onClick={()=>setSum(2)}>点我将sum变为2</button>
		</div>
	)
}

<Route path='/' element={<Navigate to='/about' />} /> // 可以在在<Routes/>内规定/路径的指向
```

##### `<Outlet/>`

```react
// <Outlet/>产生嵌套时，渲染其对应的后续路由，就跟vue的<router-link/>类似 (路由嵌套的方式和代码在上面useRoutes配置路由表)
import {NavLink,Outlet} from 'react-router-dom'
...
<Outlet /> // 在将要路由呈现的地方写这个
```



### 新增的Hooks

##### 1、useRoutes()

​	根据路由表动态创建`<Routes/>`和`<Route/>` (方法在上面写了)

##### 2、useNavigate()

```react
/**跟上面的<Navigate/>不一样 <Navigate/>是重定向 useNavigate()是用来实现编程式导航
	
*/
import {useNavigate} from 'react-router-dom'
const navigate = useNavigate()
navigate('msg', { // 携带state参数式跳转
    replace: false, // replace方式跳转，默认就是false
    state: { ...mess } // 跳转携带state参数
})
// 携带query参数形式跳转
navigate(`msg/${mess.id}/${mess.title}/${mess.content}`)
// 携带search参数形式跳转
navigate(`msg?id=${mess.id}&title=${mess.title}&content=${mess.content}`)
```

##### 3、useParams()

```react
// 用来解析路由携带的params参数 类似于V5中的match.params
import { useParams } from 'react-router-dom'
const { id, title, content } = useParams() // 直接调用使用 返回一个对象
```

##### 4、useSearchParams()

```react
// 用于读取和修改当前位置的 URL 中的查询字符串 用来解析路由携带的search参数 
import { useSearchParams } from 'react-router-dom'
const [search, setSearch] = useSearchParams() // 跟useRef的写法相似 search内可以拿到参数 setSearch修改参数的函数
const id = search.get('id') // search的使用需要去调用 并传递对应的key值
```

##### 5、useLocation()

```react
// 获取当前 location 信息 主要用于解析路由携带的state参数
// 也可以解析search参数,不过解析search拿到的是search:"?id=3&title=message003"值
import { useLocation } from 'react-router-dom'
const { state: { id, title, content } } = useLocation() // 直接调用,返回一个对象 取对象内的state对象
```

##### 6、useMatch()

```react
// 返回当前匹配信息 可以用来解析params参数的路由
import { useMatch } from 'react-router-dom'
// 调用并传递一个路由path为参数 返回一个对象 取对象内的params对象参数
const { params: { id, title, content } } = useMatch('/home/message/msg/:id/:title/:content')
```

##### 7、useInRouterContext()

​	作用：如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false

##### 8、useNavigationType()

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 备注：`POP`是指在浏览器中直接打开了这个路由组件（刷新页面）。

##### 9、useOutlet()

```react
// 用来呈现当前组件中渲染的嵌套路由
const result = useOutlet()
console.log(result)
// 如果嵌套路由没有挂载,则result为null
// 如果嵌套路由已经挂载,则展示嵌套的路由对象
```

##### 10、useResolvedPath()

```react
// 给定一个 URL值，解析其中的：path、search、hash值
import { useResolvedPath } from 'react-router-dom'
console.log(useResolvedPath('?a=1&b=2'))
```



### 总结Router6三种路由跳转方式的解析方式

1、params参数

​		使用useParams()、useMatch()两种方式都可以解析 

2、search参数

​		使用useSearchParams()、useLocttion()两种方法，不过useLocation()解析的search是一个字符串还需要处理

3、state参数

​		使用useLocation()方式解析 参数在{...state:{}}内











































































































