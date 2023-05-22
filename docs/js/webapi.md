# Web APIs
## 1. Dom
### 1.1 属性样式
* 获取Dom元素的常用方式
  ```js
  // 返回CSS选择器匹配的第一个元素,如果没有匹配到，则返回null
  document.querySelector('css选择器')

  // 返回parentNode中CSS选择器匹配的NodeList对象集合(伪数组)，
  parentNode.querySelectorAll('css选择器')
  ```
* 操作元素属性

  可以直接通过`对象.属性=值`的方式修改元素标准属性。html5中约定了使用`data-`开头的为自定义属性，Dom对象使用`dataset`来获取。
  ```js{2-4}
  const pic = document.querySelector('img')
  pic.src = '/new_pic.jpg'
  pic.title = 'a new picture'
  pic.dataset.id = '1'
  ```

* style属性
  ```js{2-3}
  const box = document.querySelector('.box')
  box.style.width ='200px'
  box.style.margin = '0 auto'
  ```

* class属性
  * 指定`className`，使用新值覆盖旧值
  * 通过`classList`属性操作`class`（推荐）
  
  ```js{3-6}
  const item = document.querySelector('.active')
  
  item.className = '' //清空所有class
  item.classList.remove('active')
  item.classList.add('active')
  item.classList.toggle('active')
  item.classList.contains('active') //判断是否包含指定类名
  ```

* 表单操作
  ```js{2,6-7,10}
  const txt = document.querySelector('.txt')
  txt.value = 'this is a text box'
  txt.name = 'txt'

  const ck = document.querySelector('.ck')
  ck.disabled = false
  ck.checked=true

  const opt=document.querySelector('.activeOption')
  opt.selected=false
  ```

### 1.2 节点操作
`Dom`中每一个内容都称之为节点(`Node`)，常见的节点类型包括 元素节点、属性节点、文本节点等。

![Dom节点](https://s2.loli.net/2023/05/09/LrbI2EBlDKeW9Jf.jpg)

浏览器的`Dom API`允许我们通过节点之间的关系进行一些列节点操作（CRUD）。

语法|作用
:-|:-
`node.parentNode`|查找父节点，没有则为null
`node.children`|查找当前节点所有元素子节点
`node.childNodes`|查找当前节点所有子节点（含文本节点、注释节点等）
`node.nextElementSibling`|查找当前节点下一个元素兄弟节点
`node.previousElementSibling`|查找当前节点上一个元素兄弟节点
`document.createElement('tagName')`|创建元素节点
`node.appendChild(element)`|附加子节点
`node.insertBefore(element,index)`|插入子节点
`node.cloneNode(boolen)`|克隆节点，参数为true代表克隆包含后代节点，默认为false
`node.removeChild(node)`|删除子节点


### 1.3 事件监听
`EventTarget.addEventListener('事件类型',事件处理函数)`可以将指定的监听器注册到`EventTarget`上，当该对象触发指定的事件时，指定的回调函数就会被执行。它允许为一个事件添加多个监听器，相比于`onXYZ`属性绑定来说，它提供了一种更精细的手段来控制 `listener`的触发阶段。

```js
const btn= document.querySelector('a')
btn.addEventListener('click',function(e){
    console.log('clicked')
    e.stopPropagation() //阻止事件冒泡
    e.preventDefault() //阻止元素默认行为，当前可以阻止链接跳转
})
```

事件类型|触发条件
:-|:-
`click`|鼠标点击
`mouseenter`|鼠标经过
`mouseleave`|鼠标离开
`focus`|表单获得焦点
`blur`|表单时区焦点
`keydown`|按键按下
`keyup`|按键弹起
`input`|表单输入
`load`|元素加载完毕，用于window对象表示整个页面资源全部加载完毕
`DOMContentLoaded`|一般用于`document`对象,表示HTML文档被完全加载和解析完成（css和图像等未必加载）


鼠标经过/离开可以使用`mouseover/mouseout`或`mouseenter/mouseleave`两组事件，但前者会有冒泡效果，后者则没有，所以更推荐使用后者。

在事件处理函数的参数拿到事件对象，事件对象中包含了当前事件的一些基本内容，如事件类型(`type`),光标相对于浏览器窗口的坐标(`clientX/ClientY`)，光标相对于当前DOM元素左上角的坐标(`offsetX/offsetY`)，用户按键(`key`)等。调用事件对象的`stopPropagation()`方法可以阻止事件冒泡，`preventDefault()`方法则可以阻止元素默认行为的发生，如阻止超链接跳转等。

使用`EventTarget.removeEventListener('事件类型',事件处理函数)`则可以解绑事件。解绑事件需要指定回调函数名称，如果注册事件时使用了匿名函数，则无法解绑。

当一个父元素中有很多子元素，需要为每一个子元素分别注册事件时，因为时间冒泡的原因，子元素的事件会自动冒泡到父元素同名事件中，我们可以直接将事件注册给父元素，然后在父元素的事件对象中通过其`target`属性获得真正触发事件的元素，这称之为**事件委托**。

```js
const ul = document.querySelector('ul')
ul.addEventListener('click', function (e) {
    console.log(e.target.innerText)
})
``` 

### 1.4 scroll / resize

页面元素滚动时会触发`scroll`事件，一般我们会注册`window`对象的`scroll`事件来监听页面元素的滚动。

我们可以通过元素的`scrollLeft/scrollTop`来获取元素滚动被卷进去的左侧和顶部的尺寸。整个页面滚动时滚动的对象并不是`window`和`document`而是`html`标签，我们可以通过`document.documentElement`来获取html元素。除了直接赋值`scrollTop`属性外，我们也可以调用`window.scrollTo(x,y)`来将页面滚动下指定的位置，如`window.scrollTo(0,0)`可以将页面滚动到顶部。

```js
document.documentElement.scrollTop = 200 //赋值时为数字类型且不带单位
// window.scrollTo(0,200)
window.addEventListener('scroll', function (e) {
    console.log(`页面向上滚动了${document.documentElement.scrollTop} px`)
})
```

我们可以借助于`offsetTop`和`scrollTop`来实现电梯导航，即点击特定元素滚动(通过`scrollTop`实现)到页面中指定位置(通过目前元素`offsetTop`确定坐标)。

除了滚动，常见的页面尺寸事件还有`resize`，该事件会在窗口尺寸改变的时候触发。

获取或设置元素尺寸相关的内容如下表：
属性|作用|说明
:-|:-|:-
`scrollLeft/scrollTop`|滚动卷去的左侧和顶部|配合页面滚动来用，可读写
`clientwidth/clientHeight`|获得元素宽度和高度|不含`border`,`margin`,滚动条,用于js获取元素大小，只读属性
`offsetWidth/offsetHeight`|获得元素宽度和高度|含`border`,`padding`,滚动条等，只读
`offsetLeft/offsetTop`|获取元素距离最近一级包含定位的父级元素的左/上距离|获取元素位置的时候使用，只读属性
`getBoundingClientRect`|获取元素相对于视口的大小和位置


`flexible.js`的核心代码就是监听了`window`对象的`resize`事件，在窗口尺寸变化时，获取`html`元素的`clientWidth`然后动态计算根字号尺寸。

```js
function setFontSize() {
    const html = document.documentElement
    html.style.fontSize = `${html.clientWidth / 10}px`
}
window.addEventListener('resize',setFontSize)
```


### 1.5 移动端事件
移动端一般是触屏设备，最常使用的操作是`touch`事件，`touch`对象代表一个触摸点，触摸点可能是手指、触控笔等。

touch事件|说明
:-|:-
`touchstart`|手指等开始触摸DOM元素时触发
`touchend`|手指等离开DOM元素时触发
`touchmove`|手指在DOM元素上滑动

以上事件仅在触屏设备上有效。

### 1.6 重绘和回流
浏览器进行界面渲染会经过如下步骤：
* 解析（`Parser`）HTML，生成DOM树(`DOM Tree`)
* 同时解析（`Parser`） CSS，生成样式规则 (`Style Rules`)
* 根据DOM树和样式规则，生成渲染树(`Render Tree`) 
* 进行布局 `Layout`(回流/重排):根据生成的渲染树，得到节点的几何信息（位置，大小） 
* 进行绘制 `Painting`(重绘): 根据计算和获取的信息进行整个页面的绘制 
* `Display`: 展示在页面上

当 `Render Tree` 中部分或者全部元素的尺寸、结构、布局等发生改变时，浏览器就会重新渲染部分或全部文档的过程称为回流。节点(元素)的样式的改变并不影响它在文档流中的位置和文档布局时就不会导致回流，但会进行重绘。**重绘不一定引起回流，而回流一定会引起重绘。**

会导致回流（重排）的操作：
* 页面的首次刷新
* 浏览器的窗口大小发生改变
* 元素的大小或位置发生改变
* 改变字体的大小
* 内容的变化（如：`input`框的输入，图片的大小）
* 激活css伪类（如：`:hover`）
* 脚本操作`DOM`（添加或者删除可见的`DOM`元素）

简单理解影响到布局了，就会有回流。

案例：电商放大图效果

<iframe src="https://frontend-demo.a-nomad.com/webapi/index.html" style="width:100%;height:640px;border:0" scrolling="no" />

## 2. Bom
`BOM(Browser Object Model)` 是浏览器对象模型。

![Bom](https://s2.loli.net/2023/05/09/83NVUu6dkKrGw2z.jpg)

`window`对象是一个全局对象，也可以说是JavaScript中的顶级对象,基本BOM的属性和方法都属于`window`对象,但`window`对象下的属性和方法调用的时候可以省略`window`。

### 2.1 location / navigator / histroy
`location` 对象拆分并保存了 URL 地址的各个组成部分，下表是其常用内容。
属性/方法|作用
:-|:-
`href`|获取完整的 URL 地址，对其赋值时用于地址的跳转
`search`|获取地址中携带的参数，`?`后面部分
`hash`|获取地址中的啥希值，`#`后面部分
`reload()`|用来刷新当前页面，传入参数`true`时表示强制刷新

`navigator`对象记录了浏览器自身的相关信息。
```js
// 检测 userAgent（浏览器信息）
!(function () { 
    const userAgent = navigator.userAgent 
    // 验证是否为Android或iPhone 
    const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/) 
    const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)

  // 如果是Android或iPhone，则跳转至移动站点 
    if (android || iphone) { 
      location.href = 'https://a-nomad.com'
    } 
  })()
```

`history`对象与浏览器地址栏的操作相对应，如前进、后退、历史记 录等，其常用方法如下：

方法|作用
:-|:-
`back()`|后退
`forward()`|前进
`go()`|前进或后退，参数如果是1则前进一个页面，如果是-1则后退一个页面

### 2.2 本地存储
Web开发中为了满足各种各样的需求，会经常性在本地存储部分数据，HTML5规范提出了下面的相关解决方案。

* 客户端存储保存在本地浏览器中
* 读写方便
* 存储容量受限。 `sessionStorage`和`localStorage`约5M左右
* 数据安全性较差。应避免敏感数据暴露在客户端。

`localStorage`可以将数据永久存储在本地(用户的电脑), 除非手动删除，否则关闭页面也会存在。`sessionStorage` 类似 `localStorage` ，但其区别在于存储在 `localStorage` 的数据可以长期保留,而当页面会话结束——也就是说，当页面被关闭时，存储在`sessionStorage`的数据会被清除。

```js
// 存储数据
localStorage.setItem('key', 'value')
// 读取数据
localStorage.getItem('key')
// 删除数据
localStorage.removeItem('key')
// 移除所有
localStorage.clear()
```

`localStorage`和`sessionStorage`中的键值对总是以字符串的形式存储。 (需要注意，和 js 对象相比，键值对总是以字符串的形式存储意味着数值类型会自动转化为字符串类型)。如果要存储复杂对象，需要先将对象json序列化后再存储。

```js
// 存储对象
const person ={name:'Colin',age:18}
sessionStorage.setItem('person',JSON.stringify(person))
const p = JSON.parse(sessionStorage.getItem('person'))
```
