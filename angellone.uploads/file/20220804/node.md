## Node.js



#### fs模块

```js
const fs =  require('fs')

fs.readFile(path, [options], callback) // 用来读取指定文件中的内容
	path //必选参数 文件的路径
    options // 可选参数 表示使用什么编码格式来读取文件
    callback // 必选参数 读取文件后的回调

fs.writeFile(file, data[, options], cb) // 用来向指定的文件种写入内容（只能创建文件不能创建路径，多次调用会被覆盖
	file // 指定的文件路径
    data // 写入的内容
    options // 格式 - 默认是utf-8
    cb // 回调
```



#### 路径模块

node提供的path路径快捷 

​	__dirname: 当前文件的所在文件夹

​	__filename: 当前文件的所在位置包括文件名

**path路径拼接**

```js
const path = require('path')
/**
	path.join()方法，可以把多个路径片段拼接成一个完整的路径
	../会抵消一层路径
*/
path.join('/a', '/b/c', '../', './d', '/e') // 输出\a\b\d\e

path.basename(path[, .ext]) // 获取路径中的最后一部分通常用来获取文件名（path路径，ext文件的扩展名-如果传了.ext就只返回文件名）

path.extname(path) // 获取路径中最后的扩展名

// 匹配style和script标签的正则
const regScript = /<script>[\s\S]*<\/script>/
const regStyle = /<style>[\s\S]*<\/style>/ // \s表示空白字符 \S表示非空白字符 *标识匹配任意次(这两个正则可以把html文件内的style和script模块分离出来)
```



#### http模块

```js
1、导入 
const http = require('http')
2、创建web服务器实例
const server = http.createServer()
3、为服务器实例绑定request事件 // 使用服务器实例的.on()方法。只要有客户端请求我们的服务器就会触发request事件，从而触发回调
/**
	req 请求对象，包含了与客户端相关的数据和属性 例
	req.url 客户端请求的url地址
	req.method 客户端请求的类型
	
	res 相应对象 他包含了与服务器相关的数据和属性
	res.end()方法 是向客户端发送指定的内容 并结束这次请求的处理过程
	res.end()方法向客户端发送中文时会出现乱码 需要添加请求头
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
*/
server.on('request', (req, res) => {
    console.log('someone visit our web server.')
})
4、启动服务器 // 80为开启的端口号
server.listen(80, ()=>{
    log('http server running at http://127.0.0.1')
})
```



### 模块化

​	模块作用域：与函数作用域类似 自定义模块中定义的变量、方法等，只能在当前模块内被访问

​	导入自定义模块(自己写的js)时：

```js
const test = require('./test')
/**
	导入的对象test需要在test.js文件内导出 否则为{}
	导出方法 module.exports = {...} / module.exoprts.key=value
	注:如果同时存在上面两种导出方法，接收到只有{...} k=v会被覆盖
	   require()模块引入时，得到的永远都是module.exports指向的对象
*/

/**
	node遵循的时commonJs模块化规范
	每个模块内部 module变量代替当前模块；module变量是一个对象，他的exports属性是对外的接口(module.exports);加载模块时，其实加载的就是module.exports属性。require()方法用于加载模块
*/
```



#### npm包

node的第三方模块(插件)又叫包。

​	nrm：是为了方便的切换下包的镜像源

```js
npm i nrm -g
nrm ls // 查看所有可用的镜像源
nrm use taobao // 将下包的镜像源切换为’淘taobao‘镜像
```

​	i5ting_toc：是一个可以把md文档转换为html页面的小工具

```js
npm i i5ting_toc -g
i5ting_toc -f md文件路径 -o // -o 直接打开
```

​	NPM开发包 三个文件package.json(写包的信息) index.js(包的代码)  README.md(包的说明)

```json
// package.json文件
{
  "name": "itheima-dstools", // 包名
  "version": "1.0.0", // 包的版本号
  "main": "index.js", // 包的起始文件
  "description": "提供了格式化时间、HTMLEscape相关的功能", // 搜索到包时的详细说明
  "keywords": [ // 搜索包的关键字
    "itheima",
    "dataFormat",
    "escape",
    "dushuai"
  ],
  "license": "ISC" // 包遵循的ISC标准
}
```

​	npm包发布命令 在当前包文件夹下 npm publish

​	删除 npm unpublish 包名 --force(只能删除72小时的包)

#### 模块的加载机制

​	优先从缓存中加载，模块在第一次加载后会被缓存，意味着多次调用require()不会导致模块的代码被执行多次。优先从缓存中加载，从而提高模块的加载效率

​	内置模块的加载优先级最高

​	自定义模块的加载机制：如果省略了文件的扩展名，node会自动补全后缀 1、按照确切的文件名加载，2、补全.js 3、补全.json 4、补全.node 5、加载失败报错



### Express

​	基于node.js的web框架

```js
// npm i express (express起服务器跟node内置http类似)
const express = require('express')
const app = express()
app.listen(80, () => {
    log('http server running at http://127.0.0.1')
})
```



#### Express使用

```js
/**
	监听GET、POST请求，通过app.get()、app.post()
		url:请求url
		req:请求对象 包含了与请求相关的属性和方法
        res:相应对象 包含了与相应相关的属性和方法
    在监听的回调内 调用res.send() 向客户端相应数据
    通过req.query可以拿到get请求的k=y参数
    通过req.params可以拿到请求中的动态参数(比如说删除接口后面带的id接口 ‘/user/:id’ :后的id为动态参数 /:后的动态参数可以多个)
    通过req.body可以接收到客户端发过来的请求体数据
*/ 
app.get('url', function(req, res) {...})
app.post('url', function(req, res) {...})

/**
	express.static(‘filename’)，创建一个静态资源服务器，可以把filename下的文件对外访问
	express.static()可调用多次 暴露多个静态目录 访问时，按暴露的顺序访问
	在托管静态资源路径之前，可以挂载路径前缀['filename']，在访问时就需要通过/前缀访问
*/
app.use(['filename', ] express.static('filename'))
```

#### nodemon插件热加载

npm i nodemon -g

运行项目时通过 nodemon 项目名 来启动

#### Express路由

​	在express中 路由指的是客户端的请求和服务器处理函数之间的映射关系

```js
// 路由分3部分组成，请求类型METHOD、url地址PATH、处理函数HANDLER
app.METHOD(PATH, HANDLER) // 路由最简单的使用 挂载在app上
```

#### 模块化路由

```javascript
/**
	为了方便对路由进行模块化管理，不建议直接挂载在app上，推荐抽离为单独的路由模块
	创建对应的.js文件，调用express.Router()函数创建路由对象，向路由对象上挂载具体的路由，使用module.exports向外共享，使用app.use()注册
*/
	const express = require('express')
    const router = express.Router()
    router.get(...) // 在router上挂载请求
    module.exports = router
               
	// 主页面引入router.js文件
    const router = require(...)
	app.use(['/api', ] router) // 在app上注册 也可统一添加前缀名 这样请求的时候都需要添加/api
```



#### 中间件

​	Express中间件，本质上就是一个function处理函数。中间件一般注册在路由之前

```js
app.get('/', function(req, res, next){
    // 调用next() 表示把流转关系转交给下一个中间件或路由
    next() // 中间件函数的形参中，必须包含next函数，而路由处理函数中只包含req和res
})
// 定义全局生效的中间件函数
const mw = (req,res,next)=>{...next()} // 中间件函数
app.use(mw) // 全局生效
/**
	多个中间件之间，共享同一份req和res。这样我们可以在上游的中间件中，统一为req或res对象添加自定义的属性或方法，供下游的中间件或路由使用，多次定义中间件 按顺序执行
	局部中间件：不使用app.use()定义的叫局部中间件
	定义多个局部中间件时 - 可依次写，也可写成一个数组
*/
app.get('/', mw, ()=>{}) // 这样使用的mw中间件叫局部中间件 在请求中使用
```

#### 中间件的分类

1、应用级别的中间件

​		绑定到app实例上的中间件就是应用级别的

2、路由级别的

​		绑定在Express.Router()实例上的，就是路由级别的，绑定在touter实例上

3、错误级别的

```js
/**
	专门用来捕获整个项目中发生的异常错误，防止项目异常崩溃。错误路由中间件要注册在所有路由之后
	必须要四个形参err、req、res、next
*/
app.use(function(err,req,res,next){ // 错误级别的中间件
    res.send('Error' + err.message) // 向客户端相应错误相关内容 从而项目不崩溃
})
```

4、Express内置的

​	1、express.static 快速托管静态资源的内置中间件 html、css等

​	2、express.json 解析json格式的请求体数据 4.16+

```js
// 在请求之前配置 app.use(express.json()) 配置解析application/json
// 在默认情况下 如果不配置解析表单的中间件 通过req.body拿请求体数据时为undefined
```

​	3、express.urlencoded 解析URL-encoded格式的请求体数据 4.16+

```js
// 在请求之前配置 配置解析application/x-www.form-urlencoded
app.use(express.urlencoded({ extended: false }))
```

5、第三方的

就是第三方开发的 需要npm下载的包，比如之前的body-parser中间件，使用时先安装、再导入、再调用app.use()注册使用 

#### 自定义中间件

```js
/**
	挂载中间件在app.use上
	再 使用querystring模块解析请求体数据(node内置)，专门用来处理查询字符串 通过模块的parse()函数解析
*/
const qs = require('querystring')
app.use((req,res,next)=>{
    let str = '' // 新建变量 为了拿到请求的所有的参数
    req.on('data', (chunk)=>{ // 内置on('data')方法 可以拿到所有的参数(chunk)
        str += chunk
    })
    req.on('end', ()=>{ // 内置on[end]方法，在这里对参数进行处理
        log(str)
		const body = qs.parse(str) // 引入之后在'end'内使用
        req.body = body // 然后挂载req上(上下游中间件及路由 共享同一份req和res 所以直接挂载在req.body上)
        next() // 放行才能执行后面的逻辑
    })
})
```



### 接口

​	跟上面写的路由方法一致

```js
const express = require('express')
const router = express.Router()
router.get('/api', (req, res) =>{
    const query = req.query // 拿到的是get请求的k=v键值对
    res.send({ // 向客户端相应数据 简单的接口
        status: 0, // 0成功 1失败
        msg: '请求成功',
        data: query // 相应的数据
    })
})
// 定义post接口的时候 就需要先配置中间件app.use(express.urlencoded({extended:false}))
```



#### 跨域 CORS

​	使用cors解决跨域(jsonp跨域有缺陷只支持get请求)

​	CORS(Cross-Origin Resource Sharing, 跨域资源共享)由一系列HTTP响应头组成，这些HTTP相应头决定浏览器是否阻止前端JS代码跨域获取资源

​	浏览器的同源安全策略默认会阻止网页’跨域‘获取资源，但如果接口服务器配置了CORS相关的HTTP响应头，就可以解除浏览器的跨越访问限制

CORS的注意事项：1、CORS主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了CORS的接口。2、兼容性(IE10+、Chrome4+、FireFox3.5+以上)

```js
1. 安装 npm i cors
2. 导入 const cors = require('cors')
3. 在路由之前配置中间件 app.use(cors())
```

#### 	**CORS响应头**

```js
/**
	Access-Control-Allow-Origin 响应头 可接受固定的url也可为*(*代表没有限制)
	Origin 参数指定了允许访问该资源的外域URL，如果只允许http://baidu.com的请求则写
	res.setHeader('Access-Control-Allow-Origin', 'http://baidu.com')
*/
	res.setHeader('Access-Control-Allow-Origin', <Origin> | *)
              
/**
	默认情况下 CORS仅支持客户端向服务器发送以下9个请求头(Accept、Accept-Language、Content-Language、DRP、Downlink、Save-Data、Viewport-Width、Width、Content-Type(值仅限于text/plain、multipart/form-data、application/x-www-form-urlencoded三者之一))
	Access-Control-Allow-Headers 如果需要发送额外的请求头 就要在服务器端 用...来对额外的相应头声明
*/
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header') // 表示允许客户端向服务器发送Content-Type和X-Custom-Header请求头

/**
	默认情况下 CORS仅支持客户端发起GET POST HEAD请求，如果要发送PUT DELETE等请求需要通过
	Access-Control-Allow-Methods 来指明允许的HTTP方法
*/
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE' | *) // *表示所有
```



#### CORS请求分类

根据请求方式和请求头不同 可分为两大类：简单请求和预检请求

​	**简单请求**

​		满足以下两个条件就属于简单请求：1、请求方式是GET、POST、HEAD三者之一的。2、HTTP头部信息不超过默认9种请求头的

​	**预检请求**(在浏览器与服务器正式通信之前，浏览器会先发送OPTION请求进行预检，以获知服务器是否允许该实际请求，这一次OPTION请求称为预检请求。服务器预检成功后，才会发送真正的请求，并且携带真实数据)

​		符合任意一条的请求就属于预检请求：1、请求方式是默认三种方式之外的。2、请求头中包含自定义头部字段。3、向服务器发送了application/json格式的数据。



**区别**：简单请求只会发送一次请求；预检请求会发生两次，OPTION预检请求成功之后才会发起真正的请求。



#### JSONP接口

​	jsonp：浏览器端通过<script>标签的res属性，请求服务器上的数据，同时返回一个函数的调用，这种请求数据的方式叫jsonp

​	特点：1、jsonp不属于真正的Ajax请求，因为它没有使用XMLHttpRequest这个对象。1、jsonp仅支持GET请求，不支持POST、PUT、DELETE等请求

```js
// 如果项目配置了CORS跨域资源共享，为了防止冲突，必须在配置CORS中间件之前声明jsonp接口，否则jsonp接口会被处理成开启的CORS的接口（想要发送jsonp请求 要配置请求头dateType为jsonp(）
app.get('/api/jsonp', (req, res)=>{ // 必须配置在cors中间件之前
    const funcName = req.query.callback // 1 获取到客户端发过来的回调的名字
    const data = {name:'zs',age: 22} // 2 得到要通过jsonp形式发送给客户端的数据
    const scriptStr = `${funcName}(${JSON.stringify(data)})` // 拼接一个函数调用的字符串
    res.send(scriptStr) // 响应数据给客户端的<script>标签进行解析执行
})
app.use(cors()) // 处理跨域
```



### MySQL

#### 数据库分类

​	最常见的有MySQ(免费收费)L、Oracle(收费)、SQL Server(收费)、Mongodb(免费收费)

​	前三种属于传统型数据库，又叫关系型数据库或SQL数据库

​	第四种属于新型数据库，又叫非关系型数据库或NoSQL数据库，在一定程度上弥补了传统型数据库的缺陷



#### mysql数据类型

```js
// 数据类型
int // 整数
varchar(len) // 字符串
tinyint(1) // 布尔值
text // 大型文本
// 字段特殊标识
PK(Primary Key) // 主键唯一标识
NN(Not Null) // 值不允许为空
UQ(Unique) // 值唯一
AI(Auto Increment) // 值自动增长
```



#### SQL

```sql
/**	
	查询数据(select)、插入数据(insert into)、更新数据(update)、删除数据(delete)
	额外的4种语法 where条件、and和or运算符、order by排序、count(*)函数
	sql语句中的关键字对大小写不敏感，例如SELECT == select
*/
SELECT * FROM 表名称 -- 从form后指定的表中 查询出所有的数据，*表示表中所有列
SELECT 列名称 FROM 表名称 -- 查询出指定列(字段)的数据(如果查多个列 多个列名称用逗号分隔)
SELECT * FROM 表名 WHERE name LIKE '%查询参数%' -- 模糊查询 LIKE '%1%'左右百分号从左右边查 两个百分号代表在name整个字段随意位置查
SELECT * FROM 表名 LIMIT 50 OFFSET 0 -- 分页查询 limit每页的条数 offset查询开始的位置(size * num + size)
SELECT * FROM 表名,表名1 -- 多表查询(笛卡尔查询) 数据量是相乘的慎用 
SELECT * FROM 表1 INNER JOIN 表2 ON 表1.某字段 = 表2.某字段 -- 联表查询 比如:可以查询到user表内用户classId对应的班级表内的某个班级 一并查出来
SELECT * FROM 表1 a INNER JOIN 表2 b ON a.某字段 = b.某字段 -- 联表查询 (a,b)给表起别名 方便书写
-- 同样的起别名的方式还可以在查询的某字段后面使用 比如 select users.name userName from... 就是查users表内的name字段并起别名为userName

INSERT INTO 表名 (列1，列2...) VALUES (值1，值2...) -- 向表内插入数据 列为字段

UPDATE 表名称 SET 字段 = 新值 WHERE 字段 = 某值 -- set指定列对应的新值 where指定更新的条件(例：UPDATE users SET password = 456 WHERE username = '杜帅' 把杜帅的密码改为456) 如果要同时改变多个字段 字段 = 新值 之间用逗号分隔(username=‘2’,password=888)

DELETE FROM 表名 WHERE 字段 = 值 -- 一定要加WHERE条件 否则会删掉整张表

... WHERE ... -- where用于限定选择的标准，在select、update、delete、语句中都可用where子句来限定选择的标准(=等于 <>|!=不等于 >大于 <小于 >=大于等于 <=小于等于 BETWEEN某个范围内 LIKE搜索某种模式)
and or -- 可以在WHERE子语句中把两个或多个条件结合起来 and表示必须同时满足多个条件相当于js的&&，or表示只要任意一个条件满足即可，相当于js的||运算符
order by -- 对数据进行排序 默认为升序，也可使用关键字排序(ASC升序DESC降序)。也可多重排序 多个排序规则用逗号分隔，排序规则后都可加不同的排序关键字
select count(*) as total from 表名 / count(*) -- 用于返回查询结果的总数据条数(as关键字是给列起别名为total) count(*)是查总条数
as -- 可给任何查询出来的数据起别名 在查询字段名的后面as 别名
in -- IN 操作符允许在WHERE子句中规定多个值 where id in (1,2,3) 查id为1或2或3的数据

-- 在mysql库内表添加create_time 和 update_time字段 并设置自动加载当前时间
#新增表 koa_goods 中的 create_time 列 
ALTER TABLE koa_goods ADD create_time timestamp not null default CURRENT_TIMESTAMP COMMENT '创建时间'  -- CURRENT_TIMESTAMP是默认值

#新增表 koa_goods 中的 update_time 列 
ALTER TABLE koa_goods ADD update_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP COMMENT '更新时间' -- CURRENT_TIMESTAMP为默认值并且选中根据当前时间戳更新
```

```sql
-- 查询
-- select username, password, status from users
-- select * from users where status != 1 and id > 2
-- select * from users where status != 1 or id >= 1
-- select * from users where status != 1 or id >= 1 order by status -- dese降序 asc升序
-- select count(*) as total from users where status != 1 and id > 2
-- select username as name, password as pass from users
-- SELECT * FROM 表名 WHERE name LIKE '%杜%'
select 1

-- 添加
-- INSERT INTO users (username, password) VALUES ('王77', 123456)
-- INSERT INTO users SET ...

-- 修改
-- UPDATE users SET password = 456789 WHERE username = '杜帅'
-- UPDATE users SET password = 123456, status = 1 WHERE id = 1
-- update ev_article_cate set ? where id = ?

-- 删除
-- DELETE FROM users WHERE id >=  6
```



#### SQL的联表查询

```sql
SELECT * FROM 表1 INNER JOIN 表2 ON 表1.某字段 = 表2.某字段 -- 联表查询 比如:可以查询到user表内用户classId对应的班级表内的某个班级 一并查出来
SELECT * FROM 表1 a INNER JOIN 表2 b ON a.某字段 = b.某字段 -- 联表查询 (a,b)给表起别名 方便书写
-- 同样的起别名的方式还可以在查询的某字段后面使用 比如 select users.name userName from... 就是查users表内的name字段并起别名为userName

联表查询关键字的 inner join 解释
inner join -- 只查询查得到条件的 (默认)
left join -- 查询满足条件的 一并也展示表1内没查到的
right join -- 查询满足条件的 一并也展示表2内没查到的
full join -- 查询满足条件的 一并也展示都没有查到的数据
```



#### 外键查询

```js
/**
	把数据库改成innoDB类型
*/
外键的约束 CASCADE 在父表上的更新和删除操作 会同步更新和删除掉子表的匹配记录(匹配记录是对应的外键)
SET NULL 在父表上的更新和删除操作 将子表的匹配记录的列设为null(注意子表的外键列不能设置not null)
NO ACTION 如果子表中有匹配的记录 则不允许父表对应候选键进行更新或删除操作
RESTRICT 同NO ACTION 都是立即检查外键约束
```



#### 在node内操作mysql

```js
const mysql = require('mysql') // 引入
const db = mysql.createPool({ // 建立与mysql数据库的连接
    host: '127.0.0.1' // 数据库的ip地址
    port: '7788' // 数据库端口 默认3306
    user: 'root' // 登陆数据库的账户
    password: 'admin123' // 登录数据库的密码
    database: '数据库名' // 指定操作的哪个数据库
})
db.query('select 1', (err,results) => { // 测试mysql模块能否正常工作
    if(err) return console.log(err)
    log(results) // 如果打印出[RowDataPacket {'1' : 1}]就是正常
})

/**
	在node的接口里面发送db.query操作数据库
	db.query操作数据库时sql语句内可以用？占位符，占位符填充在query的第二个数组参数内的数据，数组内的数据依次填充？占位符
*/
 // 查询数据
router.get('/list', (req, res) => {
  const q = req.query
  const sqlStr = `select * from users where username = ? and password = ?`
  db.query(sqlStr, [q.username, q.password], (err, results) => {
    if (err) return console.log('数据库连接错误', err)
    console.log(results)
    data = results
    res.send({
      code: 200,
      msg: '成功',
      data: results
    })
  })
})

/**
	添加数据
	添加数据时 sql语句可以缩写不用写具体的字段，如果数据对象的每个属性和数据表的字段一一对应，就可以用快速方式 INSERT INTO users SET ? , {username: 111, password: 111}的方式传递
*/
router.post('/list', (req, res) => {
  const data = req.body
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [data.username, data.password], (err, results) => {
    if (err) return console.log('数据库操作失败', err)
    if (results.affectedRows === 1) // 操作数据库添加数据时 只有返回results参数的affectedRows==1时 就为操作成功(affectedRows是当前受影响的行数 一行受影响就是插入了一行)
      res.send({
        code: 200,
        msg: '添加成功',
      })
  })
})

/**
	修改数据
	也可以用快捷方式 如果数据对象的每个属性和数据表的字段一一对应，就可以用快速方式 UPDATE users SET ? WHERE id = ? , [{username: 111, password: 111}, 6]的方式传递(SET后面的?要传对象)
*/
UPDATE users SET password = ?, status = ? WHERE id = ?
UPDATE users SET ? WHERE id = ?
    
/**
	删除数据
	假删除(标记删除)，修改数据的status字段的状态
*/
DELETE FROM users WHERE id >=  ?
```



#### mysql表内存储表情

​	想要在表内存储表情的话 需要对数据库字符集设置为utf8mb4，排序规则设置为utf8mb4_general_ci

​	对应存储表情的表和该字段也要设置相应字符集和排序规则



### 身份认证

#### session中间件认证

```js
// npm install express-session
const session = require('express-session')
app.use(session({ // 配置session中间件
    secret: 'ds' // secret为任意字符串
    resave: false // 固定写法
    saveUninitialized: true // 固定
}))
/**
	当配置了session中间件之后，即可通过req.session来访问session对象 从而存储用户的信息
	清空session session.destroy() 调用它只会当前用户对应的session不会清空别的用户的
*/ 
```



#### JWT

​	jwt由三部分组成，分别是Header(头部)、Payload(有效荷载)、Signature(签名)，三者之间用.分隔

```js
/**
	1.Header.Payload.Signature
	其中payload部分才是真正的用户信息，是经过用户信息加密之后生成的
	Header和Signature是安全性相关的，只是为了保护token的安全
	2.jwt相关的包 npm install jsonwebtoken express-jwt
	jsonwebtoken 用于生成jwt字符串
	express-jwt用于将jwt字符串解析还原成json对象
	3.为了保证jwt字符串的安全，我们需要专门定义一个用于加密解密的secret密钥(const secretKey = '字符串')
*/
const jwt = require('jsonwebtoken')
// 参数1：用户的信息对象，2.加密的密钥，3.配置对象，可以配置有限期(expiresIn)
jwt.sign({username:username}, secretKey, { expiresIn: '30s' }) // 生成token
/**
	对jwt解密 - 通过express-jwt中间件，将token解析成json
	expressJWT({secret:secretKey}) 是用来解析token的中间件
	unless({path:[/^\/api\//]}) 用来指定哪些接口不需要访问权限(当前正则是/api/的接口都不需要权限)
	credentialsRequired: true 不是必须也能成功
*/
const { expressjwt } = require('express-jwt')
app.use(expressjwt({secret:secretKey,algorithms: ['HS256'],credentialsRequired: true}).unless({path:[/^\/api\//]})) // 解析完的用户信息 存在req.auth对象内 为token加密的对象

/**
	处理没有token或者token失效的相应 在错误级中间件内 如果err.name==UnauthorizedError就是token问题
	if (err.name == 'UnauthorizedError') return res.send({ code: 401, msg: '无效的token' })
*/
```



### 项目

#### bcryptjs加密密码

​	往数据库内存放密码时需要进行加密存储，使用 bcryptjs

```js
/**
	npm i bcryptjs
	好处：加密之后的密码，无法被逆向破解
		 同一明文密码多次加密，得到的加密结果各不相同，保证了安全性
*/
const bcrypt = require('bcryptjs')
password = bcrypt.hashSync(password, 10) // 调用bcryptjs的hashSync方法 接收两个参数(明文密码，长度，返回值为加密后的字符串) 10 加盐 加盐加密

/**
	用户输入密码和库中密码解析
	bcrypt.compareSync(1,2) 第一个参数是用户输入的密码 第二个参数是库中加密之后的数据
	返回值 true说明一致 false说明不一致
*/
bcrypt.compareSync(userinfo.password, results[0].password)

/**
	统一处理错误的res 在注册路由之前 注册一个全局中间件 定义一个处理错误res.send的方法
	定义最好放在所有的注册之前 以防bug
*/
app.use((req, res, next) => {
  res.reject = (err, code = 400) => {
    res.send({
      code,
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
}) // 使用 res.reject('....')
```



#### 使用插件统一表单验证

```js
npm i joi @escook/express-joi // joi(定义验证规则) @escook/express-joi(中间件 实现对表单自动验证)
/**
	定义规则
     * string() 值必须是字符串
     * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
     * min(length) 最小长度
     * max(length) 最大长度
     * required() 值是必填项，不能为 undefined
     * pattern(正则表达式) 值必须符合正则表达式的规则
*/ 
const joi = require('@hapi/joi')
const id = joi.number().integer().min(1).required() // id
const username = joi.string().alphanum().min(1).max(10).required() // 用户名
const password = joi.string().pattern(/^[\S]{6,12}$/).required() // 密码
const nickname = joi.string() // .required() // 昵称
const email = joi.string().email() // .required() // 邮箱
const avatar = joi.string().dataUri().required() // 头像
exports.reg_login_schema = { // 注册验证规则对象 想要验证什么内的数据自行定义
  body: { // 表示需要对 req.body 中的数据进行验证(post的data值)
    username,
    password,
  },
  query: {}, // req.query (get的k=v值)
  params: {} // req.params (:id 类型的动态参数)
}
// 修改密码的验证规则
// 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
// 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
// 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
exports.reg_updatePassword_schema = { // 修改密码 单独的
  body: { 
      oldPassword: password, // 原密码 按照密码规则
      newPassword: joi.not(joi.ref('oldPassword')).concat(password) // joi.not(joi.ref('aa'))不能跟aa输入的的值相同
  }
}


/**
	使用
	1. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
    2. 数据验证通过后，会把这次请求流转给后面的路由处理函数
	3. 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
*/
const expressJoi = require('@escook/express-joi') // 引入中间件@escook/express-joi
const { reg_login_schema } = require('../schema/user') // 引入定义的规则对象
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser) // 使用中间件

/**
	定义全局错误中间件 在路由注册的最后
*/
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) return res.reject(err) // 捕获joi表单验证的错误
  res.reject(err, 500) // 未知错误 稍后处理
})
```

#### 修改密码

```js
/**
	修改密码接口1、先查询用户是否存在 2、再判断两次密码是否相同 3、再修改密码
*/
exports.updatePassword = (req, res) => {
  const sql = 'SELECT * FROM ev_users WHERE id = ?'
  db.query(sql, req.auth.id, (err, results) => { // 1、先查询用户是否存在
    if (err) return res.fail(err, 500) // 执行sql失败
    if (results.length !== 1) return res.fail('用户不存在')
    if (!bcrypt.compareSync(req.body.oldPassword, results[0].password)) return res.fail('原密码错误') // 2、再判断两次密码是否相同
    const sql = 'UPDATE ev_users SET password = ? WHERE id = ?'
    db.query(sql, [bcrypt.hashSync(req.body.newPassword, 10), req.auth.id], (err, results) => { // 3、再修改密码
      if (err) return res.fail(err, 500) // 执行sql失败
      if (results.affectedRows !== 1) return res.fail('更新密码失败') // sql执行成功 但受影响的行数不等于1
      res.success('更新密码成功')
    })
  })
}
```



#### multer解析formdata格式

```js
// npm i multer
const multer = require('multer') // 解析formdata格式表单数据的包
const path = require('path') // path处理路径的核心模块
const upload = multer({ dest: path.join(__dirname, '../uploads') }) // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径

/**
 * upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
 * 将文件类型的数据，解析并挂载到 req.file 属性中
 * 将文本类型的数据，解析并挂载到 req.body 属性中
*/
router.post('/addArticle', upload.single('cover_img'),expressJoi(reg_addArticles_schema), addArticle)
```



### KOA

​	express原班人马打造的node框架 更小更轻量 使用方法跟express基本一致

```js
// npm i koa
const koa = require('koa')
const app = new koa()
app.use((ctx, next) => { // 中间件接收 ctx = context上下文
  // ctx.response.body = '<h1>hello word</h1>'
})
app.listen(9527, () => { // 起服务
  console.log('http server running at http://127.0.0.1:9527')
})
```

​	ctx可以访问到的对象 常用的ctx.req ctx.res等

![image-20220614180857964](C:\Users\11378\AppData\Roaming\Typora\typora-user-images\image-20220614180857964.png)

#### koa和express对比

1、koa不提供内置的中间件；不提供路由 把路由的库分离出来了(koa/router)、

2、context对象：这次请求的上下文 作为koa的第一个参数，同时ctx上也挂在了request和response

3、异步流程控制：express采用callback来处理异步，koa1采用generator，koa2采用async/await。generator和async..使用同步的写法来处理异步，明显要好于cb和promise

4、中间件模型：express基于connect中间件，线性模型。koa中间件采用洋葱模型，对于每一个中间件在完成了一些事情后，可以优雅的将控制权传递给下一个中间件，并能够等待它完成后，当后续的中间件完成处理后，控制权又回到了自己。



#### router路由

```js
/**
	koa分离了router 需要引入 npm i koa-router
	router.prefix('/api') 统一给路由加前缀
	router.redirect('/', '/home') 路由重定向 把/重定向到/home (重定向只能到一个get的接口)
*/
const Router = require('koa-router')
const router = new Router()
const userRouter = require('./router/user')
// router.post(...).get(...).put(...).del(...) // 路由可以链式的书写
router.prefix('/api')
router.use('/user', userRouter.routes(), userRouter.allowedMethods()) // 使用模块化拆分的时候
app.use(router.routes()).use(router.allowedMethods()) // 注册路由 allowedMethods()表示当请求方式错误时会给客户端提示
```



#### 静态资源

```js
// koa的静态资源也是分离了出去 需要引入 npm i koa-static
const path = require('path')
const static = require('koa-static')
app.use(static(path.join(__dirname, 'public'))) // 当前文件夹下public文件夹下的资源为静态资源
```



#### 请求参数

​	跟express类似，只是koa是通过ctx来访问

```js
/**
	ctx.query拿到get请求的k=v的数据对象 ctx.querystring拿到get请求的k=v的字符串(多个键值对的话用&符分隔)
	如果要访问post的body参数，需要下载插件npm i koa-bodyparser (app.use(bodyParser()))可以把ctx的formdata数据解析到ctx.request.body中
*/
```



#### ejs模板

```js
// npm i koa-views 和 npm i ejs
const views = require('koa-views')
// 注册模板 跟注册静态资源类似
app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'})) // {extension: 'ejs'}调用ejs引擎去解析模板

/**
	在重定向的或者想要展示的路由内使用ctx.render('home') 自动去解析views文件夹下的home.ejs文件 
	{ username: 'dushuai' }可以往模板内传递数据 必须使用异步 否则模板还没解析完就展示会报错
*/ 
router.get('/', async (ctx, next) => {
  await ctx.render('home', { username: 'dushuai' })
})
```



#### cookie和session

​	cookies：koa提供了从上下文直接读取、写入cookies的方法

```js
ctx.cookies.get(name, [options]) // 读取上下文请求中的cookies
ctx.cookies.set(name, value, [options]) // 在上下文中写入cookies
```

​	session：需要引入插件npm i koa-session-minimal，适用于koa的session中间件 提供存储介质的读写接口

```js
const session = require('koa-session-minimal')
app.use(session({
    key: 'session_id',
    cookie:{
        maxAge: 1000 * 60
    }
}))
ctx.session.name = {...} // 向session内存数据 通过ctx.session.name就可访问
ctx.session.date = Date.now() // 只要访问就会更新session存放时间 重新开始计时(道理就是从新往session内存一点会变化的东西Date.now()当前时间戳一直会变)
```



#### JWT

```js
/**
	跟在express内使用jsonwebtoken一样 npm i jsonwebtoken
*/
const jwt = require(...)
const secretKey = 'dushuai *~* key' // key 自定义
// 可以封装一个生成和解析jwt的方法
const JWT = {
    generate(value, expires){ // 生成token
    	// 参数1：用户的信息对象，2.加密的密钥，3.配置对象，可以配置有限期(expiresIn)
        return jwt.sign(value,secretKey, {expiresIn: expires})
    },
    verify(token){ // 解析token
        try{
            return jwt.verify(token, secretKey)
        } catch {
            return false
        }
    }
  }
```



#### 上传文件

```js
// npm i @koa/multer multer 用来解析formdata格式表单数据的包
const multer = require('@koa/multer')
const upload = multer({dest: 'public/uploads/'}) // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
router.post('...', upload.single('avatar'), (ctx)=>....) // upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据的文件类型
```



#### koa连接数据库

```js
// npm i mysql2
const mysql2 = require('mysql2')
app.get('/',async ctx =>{
    const config = getDBConfig() // 定义的连接数据库的数据
    const promisePool = mysql2.createPool(config).promise() // 实例化连接数据库
    let users = awiat promisePool.query('sql语句',[参数]) // 查询数据库
    log(users)
})
function getDBConfig() { // 连接数据库参数
    return {
        host: '127.0.0.1',
        port: 7788,
        users: 'root'
        password: 'admin123'
        database: '连接的数据库'
        connectionLimit: 1 // 允许连接的最大数
    }
}
```



#### websocket

```js
/**
	websocket并不是一个全新的协议 而是利用http协议来建立连接，首先 websocket连接必须由浏览器发起
*/
GET ws://localhost:3000/ws/chat HTTP/1.1  --// get请求地址不是类似path 而是ws://开头的
Host: localhost // 
Upgrade: websocket // 表示这个连接将要被转换为WebSocket连接
Connection: Upgrade // 表示这个连接将要被转换为WebSocket连接
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string // 用于标识这个连接 并非用于加密数据
Sec-WebSocket-Version: 13 // 指定的websocket的协议版本
// 随后 服务器如果接受该请求 就会返回以下相应
HTTP/1.1 101 Switching Protocols // 相应101表示本次连接的http协议即将被更改 更改后协议就是Upgrade: websocket指定的websocket连接
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string

// 业务代码 - 服务器
const WebSocket = require('ws')
WebSocketServer = WebSocket.WebSocketServer
const wss = new WebSocketServer({port:8080})
wss.on('connection', function connetion(ws) {
    ws.on('message', function message(data, isBinary) { // 监听客户端发来的信息 并且转发到所有已连接的用户 除了自己 实现聊天室的样子
        wss.clients.forEach(function each(client) { // 对所有已连接的用户遍历
            if(client != ws && client.readyState === WebSocket.OPEN) { // ！=ws除了自己  client.readyState === WebSocket.OPEN已连接在线
                client.send(data, {binary:isBinary}) // 发送消息
            }
        })
    })
    ws.send('欢迎加入聊天室') // 连接成功时发送到客户端的信息
})

// 客户端
var ws = new WebSocket('ws://localhost:8080') // 浏览器自带了websocket的模块
ws.onopen = () =>{ // 监听连接的方法
    log('连接成功 开启心跳')
}
ws.onmessage = mesObj => { // 监听服务器发送的数据 信息在obj.data中
    log(msgObj.data)
}
ws.onerror = _=>{ // 监听错误的状态
    log('error')
}
```



### KOA新学习



#### dotenv环境变量插件

​	介绍一个插件 dotenv  npm i dotenv (在根目录下创建.env文件)

```js
// src/config/config.defalut.js 在别的页面直接引入这个文件就可以使用环境变量的数据
const dotenv = require('dotenv')
dotenv.config() // 可以拿到当前环境变量 .env内定义的数据
module.exports = process.env // 环境变量内定义的数据都在process.env内 整个导出
```



#### koa-body插件

​	解析接口收到body数据 解析到ctx.request.body内,这个中间件还可以解析上传的文件

```js
const KoaBody = require('koa-body')
app.use(KoaBody()) // 在注册路由的上面

app.use(KoaBody({
  multipart: true, // 开启上传
  formidable: {
    // uploadDir不能使用相对路径 因为他相对于process.cwd() 并不是相对于当前文件夹
    uploadDir: path.join(__dirname, '../uploads'),
    keepExtensions: true, // 保留扩展名
  }
}))
// 上传之后需要把上传到的服务器文件夹默认暴露出去
const KoaStatic = require('koa-static') // 引入暴露默认资源的插件
app.use(KoaStatic(path.join(__dirname, '../uploads')))//在开启上传的中间件下 默认暴露的静态资源
```



#### koa2中使用mysql2

```js
const mysql = require('mysql2')
const { MYSQL_HOST, MYSQL_PROT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env
const db = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PROT,
  user: MYSQL_USER,
  password: MYSQL_PWD,
  database: MYSQL_DB,
  waitForConnections: true, // 等待连接
  connectionLimit: 10, // 连接限制
  queueLimit: 0 // 队列限制
}).promise() // .promise() 开启异步 使用 Promise 包装器
module.exports = db // 在别的页面就跟express内使用一样 但是使用async await

const db = require('../db/db')
const [res] = await db.query(sql, username) // 取返回对象的第一位 返回数据是一个大数组 第一位数组是查询到的数据 第二位不知道
```

 

#### JWT

```js
// 使用方法跟上面介绍一样 
const jwt = require('jsonwebtoken'),TOKEN_SECRETKEY = '...字符串'
// res是生成token所要包含的数据
const token = jwt.sign(res, TOKEN_SECRETKEY, { expiresIn: '10h' }) // 生成token
const user = jwt.verify(token, TOKEN_SECRETKEY) // 解析token 包含了生成token时内的数据

注:koa2内 请求所带的token放在ctx.request.header内 通过以下方法解析到token
const { authorization } = ctx.request.header
const token = authorization.replace('Bearer ', '')
```



#### 统一加载router文件夹下面的所有路由文件并挂载

```js
const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
// node内fs模块的readdirSync方法可以拿到指定文件夹下的所有文件 再统一挂载
fs.readdirSync(__dirname).forEach(file => { // file是每个js文件的文件名
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(`/${file.split('.')[0]}`, r.routes(), r.allowedMethods()) // 统一挂载
  }
})
```



#### 向数据库内添加自动加载的创建时间和更新时间

```sql
-- 在mysql库内表添加create_time 和 update_time字段 并设置自动加载当前时间
#新增表 koa_goods 中的 create_time 列 
ALTER TABLE koa_goods ADD create_time timestamp not null default CURRENT_TIMESTAMP COMMENT '创建时间'  -- CURRENT_TIMESTAMP是默认值

#新增表 koa_goods 中的 update_time 列 
ALTER TABLE koa_goods ADD update_time timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP COMMENT '更新时间' -- CURRENT_TIMESTAMP为默认值并且选中根据当前时间戳更新

-- 问题：当要向前端返回时 时间格式为2018-12-14T06:53:05.000Z类型
-- 方法：在连接数据库的时候 加入属性dateStrings: true 可以强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回
```



#### koa2统一处理错误的插件 (koa-json-error)

```js
// npm i koa-json-error
const error = require('koa-json-error')
// 这个插件接收到的err有三个参数 status错误值 message错误信息 stack错误详情
app.use(error({
    format: (err) => { // 开发环境时 返回的数据 完全自定义
        return {code:err.status, mag: err.message, result: err.stack}
    },
    postFormat: (err,obj)=>{ // 生产环境时 obj是开发环境返回的东西
        const {result, ...rest} = obj
        return process.env.NODE_ENV == 'production' ? rest : obj // 生产环境就不返回result了
    }
}))

// 触发 再要进行错误处理的地方写
ctx.throw(400, '参数格式不对') // 两个参数 400就对应status 文字就对应message
```



#### 解决history模式下刷新not found的问题

```js
// 使用koa2-connect-history-api-fallback插件
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
app.use(historyApiFallback({ whiteList: ['/*'] })) // 一定要在暴露静态资源的前面挂载
// { whiteList: ['/*'] } 白名单 因为connect-history-api-fallback插件默认会将所有的get请求都指向index.html,添加白名单 白名单内的接口不会指向index.html 只让/指向 （/*只要带了前缀的接口）
```



### nginx配置的问题

```nginx
# 反向代理 需要添加上代理头和指向的地址
location ^~/prod-api/ {
    proxy_pass http://ds.dshuais.com/;
}

# 发布一个history的项目的时候 可能会刷新就404 在默认配置里加
root /www/wwwroot/www.dshuais.com/;
try_files $uri $uri/ /index.html;
```











