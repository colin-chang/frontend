# Node.js 基础

## 1. 初识Node
我们之所以可以在浏览器中运行js代码是因为浏览器提供了JavaScript解析引擎，如Chrome的V8引擎，Firefox的OdinMonkey等，解析引擎可以将开发者提供的js代码进行解析为可执行代码后执行。

在浏览器客户端js开发过程中我们常常可以操作DOM/BOM等，是因为这些都是浏览器内置的相关的API供开发者调用。

![JavaScript运行环境](https://s2.loli.net/2023/05/28/JLyNQnkmH7XtFAx.png)

我们发现js运行只需要有一个js解析引擎，同时配合的特定的API就行可以进行特定环境下js开发了。js解析引擎+内置 的组合我们一般称之为js的运行环境。浏览器就是我们最常见的js运行环境之一，而Node.js则是另一个常见的js运行环境。

基于 Node.js 提供的基础API，很多强大的工具和框架层出不穷。
* [Express](http://www.expressjs.com.cn/) 框架，可以快速构建 Web 应用
* [Electron](https://electronjs.org/) 框架,构建跨平台的桌面应用
* [restify](http://restify.com/) 框架，快速构建 API 接口项目

Node.js安装和使用非常简单，直接在[官网](https://nodejs.org/en)下载需要版本安装，在终端中使用 `node js-file`即可使用Node.js运行一个js文件。

## 2. 内置模块
### 2.1 fs 模块
`fs`模块是Node.js官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。

* `fs.readFile(path[,options],callback)` 方法，用来读取指定文件中的内容
* `fs.writeFile(file,data[,options],callback)` 方法，用来向指定的文件中覆盖式写入内容。可以创建文件但不能创建路径。
  
```js{1-2,5,13}
const fs = require('fs') //导入模块
const filename = `${__dirname}/hello.txt` //__dirname 代表当前可执行js文件所在目录

//写文件 
fs.writeFile(filename, 'Hello Node.js', err => {
    if (err)
        return console.log(err.message)

    console.log('successful')
})

//读文件
fs.readFile(filename, 'utf8', (err, data) => {
    if (err)
        return console.log(err.message)

    console.log(data)
})
```
### 2.2 path 模块
`path`模块中提供了用来处理路径相关的内容。

`path`方法|作用
:-|:-
`join([...paths])`| 拼接路径
`basename(path[,ext])`|获取文件名 
`extname(path)`|获取文件扩展名  

```js{1-5}
const path = require('path')
const fullName = path.join(__dirname, 'files', 'hello.txt') //路径拼接
const filename = path.basename(fullName) // hello.txt
const filenameWithoutExt = path.basename(fullName,'.txt') // hello
const ext = path.extname(fullName) // .txt
```

### 2.3 http 模块
借助于`http`模块，我们可以快速实现要给简易的Web服务器。
```js{1,4,7-10,13}
const http = require('http')

//1. 创建服务器
const server = http.createServer()

//2. 监听客户端请求
server.on('request', (req, res) => {
    const resStr = `request ${req.url} with ${req.method} method`
    res.end(resStr)
})

//3. 启动服务器
server.listen(80, () => console.log('server listen on http://127.0.0.1'))
```

## 3. 模块化
Node.js中的模块与Python中非常类似，每个独立的js文件都是一个模块。

```js{2,5,8}
//加载内置模块
const fs = require('fs')

//加载第三方模块
const moment = require('moment')

//加载自定义模块
const custom = require('./custom.js')
```

### 3.1 模块作用域
和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。