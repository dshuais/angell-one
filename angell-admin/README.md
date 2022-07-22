## koa
使用koa框架搭建server
建议使用npm安装配置，本地启动:npm run dev，部署之后在服务端使用npm run start启动即可

### .env
全局环境变量

### scr 所有的业务代码都在这里
#### app.js
入口文件 在这里起服务

#### app
index 所有的引入依赖都统一在这里引入
errHandler 统一处理错误方法 设置status和ctx.body

#### config
配置环境变量 使用dotenv插件 .env内的环境变量统一从从这里导出
... = require('../config/config.default') || ... = process.env 都可导出

#### constants
全局的常量统一处理 例如 错误的code和msg消息

#### controller
书写业务代码的地方 路由接口的处理方法

#### db
数据库的实例化 连接的数据库

#### middleware
业务代码 拆分的各个中间件

#### modal
数据库表的每个实例化modal

#### router
业务代码 写接口路由的地方

#### service
业务代码 操作数据库的代码 函数

#### uploads
上传图片和文件的存放位置 并且默认暴露