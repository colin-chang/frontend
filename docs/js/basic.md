# JavaScript 查缺补漏

![js组成](https://s2.loli.net/2023/05/06/b8ihmMYKTFWtEJX.jpg)

* ECMAScript

    ECMAScript是JavaScript的规格，JavaScript是ECMAScript的一种实现。在日常场合，这两个词是可以互换的。JavaScript的创造者Netscape公司，将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准，后来ECMA发布文件的第一版(ECMA-262)，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript.
* Web APIs:
  * DOM 操作HTML文档结构，比如对页面元素进行移动、大小、添加删除等操作
  * 操作浏览器，比如页面弹窗，检测窗口宽度、存储数据到浏览器等

## 1. ECMAScript

### 1.1 JavaScript结束符
JavaScript结束符是英文分号，可写可不写。换行符（回车）会被识别成结束符 ,所以一个完整的语句，不要手动换行。因此在实际开发中有许多人主张书写 JavaScript 代码时省略结束符，但为了风格统一，要写结束符就每句都写，要么每句都不写。VUE等js库源码全都采用了无结束符的写法。

```js
<script>
    let name= prompt("what's your name?")
    alert(`Hi ${name}`)
</script>
```

**多个立即执行函数要用`;`隔开，要不然会报错**。
```js
(function(){console.log(123)})();
(function(){console.log(456)})()
```

### 1.2 let与var
js早起版本中声明变量多使用`var`关键字，新版本中都推荐使用`let`关键字声明变量，`const`关键字声明常量，如果变量值不需要修改则优先使用`const`,语义化更好。

`let`关键字解决了`var`关键字存在的诸如如下的一些问题：
* 变量先使用后声明
* 变量重复声明
* 比如变量提升、全局变量、没有块级作用域等

ES6中变量必须先声明后使用，不存在变量名提升和函数名提升，只有函数声明会提升。

### 1.3 数据类型
![js数据类型](https://s2.loli.net/2023/05/06/x12pHbY4iNAsL3r.jpg)

基本数据类型是值传递，引用类型是地址传递。

* `undefined` 表示没有赋值,`null`表示赋值了，但是内容为空。
* `NaN`(Not a Number)表示非数字、`Infinity`则表示数字类型的无穷。`isNaN()`判断是否是非数字和`isFinite()`判断是否有穷尽


#### 1.3.1 相等运算符
相等运算符,在 js 中等于和不等于有两种形式:

运算符|作用
:-|:-
`=`和`!=`|只看结果是否相同(存在变量隐式转换的问题）
`===`和`!==`|看类型和结果是否都一致

**一般没有特殊需求时使用三个等号方式**。`undefined`和`null`变量用`==`相等，用`===`则不相等。`NaN`不等于任何值，包括它本身

#### 1.3.2 `in` 和 `instanceof`
在写类库的时候，或方法框架的时候经常需要判断一个变 量是什么类型的对象或判断这个对象是否具有某个成员， 此时可以使用 `in` 和 `instanceof` 运算符。

```js
//in运算符用于检查对象是否具有指定成员 
//语法:boolean 成员名符串 in 对象; 
var o = { name: "Colin", gender: "男", say: function () { } }
alert("say" in o)
alert("age" in o)
alert(!!o.age) //也可以转换为 boolean 判断是否具有此属性

//判断对象是否是某个类型的实例，类似C#中的is运算符 
//语法:boolean 对象 instanceof 构造函数;
var arr = [123, "abc", true]
alert(arr instanceof Array)
//instanceof运算符同样适用于自定义类型
var Person = function () { }//Person对象构造函数
var p = new Person()
alert(p instanceof Student)
```

### 1.4 包装对象
`number/string/bool`等基本数据类型都有对应的包装对象(wrapper)，包装对象不仅具有和基本类型一样的值， 还包含相关的方法与属性。 就如同 C#当中 int 与 Int32,string 与 String 的关系。包装类型与基本类型用法一致，但是基本类型的扩充

```js
let num=new Number(123)//使用 new 关键字创建包装类型

let num=10
num.toString() //num 在内存中临时创建一个 Number 对象，并执行 toString()方法， 将结果返回，同时释放这这个包装对象
```

* 所有包装类型的变量都是对象， 哪怕其中没有值，仍然是一个空对象， 其 typeof 的值是都是 Object，所有的非 null 的对象转布尔都是 true
* 工作机制(瞬时创建、瞬时调用、瞬时释放)

普通的 string,number,boolean 变量都是 值类型，包装对象则是引用类型。值类型与应用类型作为参数传递时使用差异的。在js中也有堆栈的概念。值类型直接存储在栈中，引用类型则在存储在堆中。参数传递时传递的是栈中存储的内容(将栈中存储的内容拷贝一份作为参数传递)，值类型直接将本身复制一份进行传递，所以在函数内容修改与变量本身没有任何关系。 

引用类型变量传递的则是变量存储在栈中的堆地址引用，所以所以在函数内部操作的与外部是同一个对象。在函数内部我们通过`对象名.属性名`的方式访问变量在堆中存储的内容，修改后外部也生效，但如果我们在函数内部直接给形参变量赋值的话，相当于把形参变量(指针)指向了新的地址，操作的不再是实参的地址，外部变量依然指向原来的堆地址，所以没有变化。

### 1.5 数组
js 中的数组类似于C#当中的数组/`ArrayList`/`HashTable`的超强综合体。

* 无需预先定制数组长度，会自动根据长度自动调整
* 在 js 中不存在多维数组也没有规定数组的类型，我们可以用数组作为数组的元素模拟多维数组。
* js 中数组中可以存放任意类型的元素，数组的下标也可以是任意的数据类型
* 数组使用非数字下标时，不仅可以使用索引方式访问数组成员，还可以直接以"数 组名.成员下标"的方式方法，在把数组当做`Dictionary`时，这种用法很常用
  ```js
  var dict = new Array();
  dict["人"] = "ren"
  alert(dict["人"])
  alert(dict.人)
  ```
* 在一定程度上数组和对象没有本质的区别。对象是一堆键值对的集合，对象的键不能是负数 (对象的键如果是自然数，对象属性只能通过索引方式访问，不能通过`对象名.属性名`的方式访问)，值可以是任意数据。数组也是一堆键值对的集合，数组的键可以是任意数据类型，值也可以是任意数据类型。对象通过字面值方式声明比较方便，数组通过字面值声明时，默认是数字索引的下标。如果把数组当做字典使用，必须通过`new Array`的方式声明。

* 在js中可以为数组的`length`随意的赋值，可以扩充数组或者移除数组元素没有赋值的元素默认为`undefined`
* `splice()` 方法用于插入、删除或替换数组的元素。如果有`element`参数则在删除的位置插入`element`元素，如果指定的删除长度为0，则变成单纯的数组插入操作。 使用`splice()`删除数组元素时会把数组的索引和值一同删除，数组长度跟随变化，推荐使用`splice()`方法替代`delete()`
  * 语法:`arrayObject.splice(index,howmany,element1,.....,elementX)`
  * `index`必需参数。规定从何处添加/删除元素。该参数是开始插入和（或）删除的数 组元素的下标，必须是数字。
  * `howmany`必需参数。规定应该删除多少元素。必须是数字，但可以是 "0"。如果未 规定此参数，则删除从`index`开始到原数组结尾的所有元素。
  * `elementX` 可选参数。规定要添加到数组的新元素。从`index`所指的下标处开始插入。
       
* `push()`用于压栈一个或多个元素，并返回数组新的长度。
* `unshift()`用于入队一个或多个元素，并返回数组新的长度。
* `pop()`用于出栈一个元素，如果数组已经为空，则返回`undefined`值。
* `shift()`用于出队一个元素,如果数组已经为空，则返回`undefined`值。

## 2. Web APIs
### 2.1 Dom
#### 2.1.1 属性样式
* 获取Dom元素的常用方式
  ```js
  // 返回CSS选择器匹配的第一个元素,如果没有匹配到，则返回null
  document.querySelector('css选择器')

  // 返回parentNode中CSS选择器匹配的NodeList对象集合(伪数组)，
  parentNode.querySelectorAll(css选择器);
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

#### 2.1.2 事件监听
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
`load`|元素加载完毕，用于windows对象表示整个页面资源全部加载完毕
`DOMContentLoaded`|一般用于`document`对象,表示HTML文档被完全加载和解析完成（css和图像等未必加载）
`scroll`|元素滚动

鼠标经过/离开可以使用`mouseover/mouseout`或`mouseenter/mouseleave`两组事件，但前者会有冒泡效果，后者则没有，所以更推荐使用后者。

在事件处理函数的参数拿到事件对象，事件对象中包含了当前事件的一些基本内容，如事件类型(`type`),光标相对于浏览器窗口的坐标(`clientX/ClientY`)，光标相对于当前DOM元素左上角的坐标(`offsetX/offsetY`)，用户按键(`key`)等。调用事件对象的`stopPropagation()`方法可以阻止事件冒泡，`preventDefault()`方法则可以阻止元素默认行为的发生，如阻止超链接跳转等。

使用`EventTarget.removeEventListener('事件类型',事件处理函数)`则可以解绑事件。解绑事件需要指定回调函数名称，如果注册事件时使用了匿名函数，则无法解绑。

当一个父元素中有很多子元素，需要为每一个子元素分别注册事件时，因为时间冒泡的原因，子元素的事件会自动冒泡到父元素同名事件中，我们可以直接将事件注册给父元素，然后在父元素的事件对象中通过其`target`属性获得真正触发事件的元素，这称之为**事件委托**。

```js
const ul = document.querySelector('ul')
ul.addEventListener('click', function (e) {
    console.log(e.target.innerText);
})
``` 