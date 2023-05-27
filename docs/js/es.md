# JavaScript 查缺补漏

## 1. JavaScript 组成

![js组成](https://s2.loli.net/2023/05/06/b8ihmMYKTFWtEJX.jpg)

* ECMAScript

    ECMAScript是JavaScript的规格，JavaScript是ECMAScript的一种实现。在日常场合，这两个词是可以互换的。JavaScript的创造者Netscape公司，将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准，后来ECMA发布文件的第一版(ECMA-262)，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript.
* Web APIs:
  * DOM 操作HTML文档结构，比如对页面元素进行移动、大小、添加删除等操作
  * 操作浏览器，比如页面弹窗，检测窗口宽度、存储数据到浏览器等

## 2. JavaScript结束符
JavaScript结束符是英文分号，可写可不写。换行符（回车）会被识别成结束符 ,所以一个完整的语句，不要手动换行。因此在实际开发中有许多人主张书写 JavaScript 代码时省略结束符，但为了风格统一，要写结束符就每句都写，要么每句都不写。VUE等js库源码全都采用了无结束符的写法。

```js{1}
<script>
    let name= prompt("what's your name?")  //接收用户输入
    alert(`Hi ${name}`)
</script>
```


* **多个立即执行函数要用`;`隔开，要不然会报错**。
```js{1}
(function(){console.log(123)})();
(function(){console.log(456)})()
```
* **数组开头且前面还有其它语句时，必须使用分号**，如数组解构
```js{1}
const name = 'Colin';//分号必须
[1,2,3].map(item => console.log(item))
```

## 3. let与var
js早起版本中声明变量多使用`var`关键字，新版本中都推荐使用`let`关键字声明变量，`const`关键字声明常量，如果变量值不需要修改则优先使用`const`,语义化更好。

`let`关键字解决了`var`关键字存在的诸如如下的一些问题：
* 变量先使用后声明
* 变量重复声明
* 比如变量提升、全局变量、没有块级作用域等

ES6中变量必须先声明后使用，不存在变量名提升和函数名提升，只有函数声明会提升。

## 4. 数据类型
![js数据类型](https://s2.loli.net/2023/05/06/x12pHbY4iNAsL3r.jpg)

基本数据类型是值传递，引用类型是地址传递。

* `undefined` 表示没有赋值,`null`表示赋值了，但是内容为空。
* `NaN`(Not a Number)表示非数字、`Infinity`则表示数字类型的无穷。`isNaN()`判断是否是非数字和`isFinite()`判断是否有穷尽


### 4.1 特殊运算符

#### 4.1.1 相等运算符
相等运算符,在 js 中等于和不等于有两种形式:

| 运算符       | 作用                                      |
| :----------- | :---------------------------------------- |
| `=`和`!=`    | 只看结果是否相同(存在变量隐式转换的问题） |
| `===`和`!==` | 看类型和结果是否都一致                    |

**一般没有特殊需求时使用三个等号方式**。`undefined`和`null`变量用`==`相等，用`===`则不相等。`NaN`不等于任何值，包括它本身

#### 4.1.2 展开运算符
展开运算符用于展开数组，常用于求数组最大值(最小值)、合并数组等
```js{2-3,7}
const arr = [1,5,3,8,2]
Math.max(...arr)
Math.min(...arr)

const arr1 = [4,6,7]
//合并数组
const arr0 = [...arr,...arr1]
```

### 4.2 `in` 和 `instanceof`
在写类库的时候，或方法框架的时候经常需要判断一个变 量是什么类型的对象或判断这个对象是否具有某个成员， 此时可以使用 `in` 和 `instanceof` 运算符。

```js{4,5,11,15}
//in运算符用于检查对象是否具有指定成员 
//语法:boolean 成员名符串 in 对象
const o = { name: "Colin", gender: "男", say: function () { } }
alert("say" in o)
alert("age" in o)
alert(!!o.age) //也可以转换为 boolean 判断是否具有此属性

//判断对象是否是某个类型的实例，类似C#中的is运算符 
//语法:boolean 对象 instanceof 构造函数
const arr = [123, "abc", true]
alert(arr instanceof Array)
//instanceof运算符同样适用于自定义类型
const Person = function () { }//Person对象构造函数
const p = new Person()
alert(p instanceof Student)
```

### 4.3 数字类型
数字类型在做小数运算的时候会存在精度问题，一般情况下我们会将小数转为整数计算。

```js{2,4}
const price0 = 0.1+0.2 // 0.30000000000000004`
const price1 = (0.1*100+0.2*100)/100 //0.3

1.234.toFixed(2) // 四舍五入保留两位小数 1.23
```

## 5. 数组
js 中的数组类似于C#当中的数组/`ArrayList`/`HashTable`的超强综合体。

* 无需预先定制数组长度，会自动根据长度自动调整
* 在 js 中不存在多维数组也没有规定数组的类型，我们可以用数组作为数组的元素模拟多维数组。
* js 中数组中可以存放任意类型的元素，数组的下标也可以是任意的数据类型
* 数组使用非数字下标时，不仅可以使用索引方式访问数组成员，还可以直接以"数 组名.成员下标"的方式方法，在把数组当做`Dictionary`时，这种用法很常用
  ```js{1-2}
  var dict = new Array()
  dict["人"] = "ren"
  alert(dict["人"])
  alert(dict.人)
  ```
* 在一定程度上数组和对象没有本质的区别。对象是一堆键值对的集合，对象的键不能是负数 (对象的键如果是自然数，对象属性只能通过索引方式访问，不能通过`对象名.属性名`的方式访问)，值可以是任意数据。数组也是一堆键值对的集合，数组的键可以是任意数据类型，值也可以是任意数据类型。对象通过字面值方式声明比较方便，数组通过字面值声明时，默认是数字索引的下标。如果把数组当做字典使用，必须通过`new Array`的方式声明。

### 5.1 CRUD
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

### 5.2 遍历方法
| 实例方法  | 作用     | 说明                                       |
| :-------- | :------- | :----------------------------------------- |
| `forEach` | 遍历数组 | 遍历数组并不返回值，常用于查找打印数组元素 |
| `map`     | 迭代数组 | 遍历数组并进行数据处理，完成后返回新的数组 |
| `filter`  | 过滤数组 | 筛选出数组中符合规则的数据并返回新的数组   |
| `reduce`  | 累积器   | 返回累计处理结果，常用于求和等             |

js中可以通过数组的`forEach`、`map`或`filter`方法迭代数组，三者的语法基本相同，区别在于`forEach`仅遍历数组不返回内容，而`map`处理后会返回新的数组，`filter`则会筛选出数组中符合规则的数据并返回新的数组。三者类似于C#中`foreach`、`select`和`where`Linq方法。

```js{2,8}
const ages = [17,22,24]
const newAges = ages.map((item,index) => {
  console.log(item) // 18 22 24
  console.log(index) // 0 1 2
  return item+1
}) // [19,23,25]

const adults = ages.filter(age=>age>=18) // [22,24]
```

`reduce`函数返回函数累计处理的结果，经常用于求和等。语法为`arr.reduce(function(累计值,当前元素){},起始值)`
* 如果有起始值，则以起始值为准开始累计， 累计值 = 起始值，如果没有起始值， 则累计值以数组的第一个数组元素作为起始值开始累计
* 后面每次遍历就会用后面的数组元素 累计到 累计值 里面

```js{2}
const arr = [{name:'Colin',score:100},{name:'Robin',score:90},{name:'Sean',score:80}]
const total = arr.reduce((prev,current) => prev + current.score,0) // 270
```

### 5.3 常用方法
| 静态成员       | 作用                                                                                                    |
| :------------- | :------------------------------------------------------------------------------------------------------ |
| `find()`       | 返回数组中满足提供的测试函数的第一个元素的值,否则返回`undefined`。类似于C#中`FirstOrDefault() Linq`方法 |
| `findIndex()`  | 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1                         |
| `every()`      | 测试一个数组内的所有元素是否都能通过指定函数的测试。类似于C#中`All() Linq`方法                          |
| `some()`       | 测试数组中是否至少有一个元素通过了由提供的函数实现的测试。类似于C#中`Any() Linq`方法                    |
| `concat()`     | 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组                                      |
| `includes()`   | 用来判断一个数组是否包含一个指定的值                                                                    |
| `Array.from()` | 从可迭代或类数组对象创建一个新的浅拷贝的数组实例。一般可将伪数组转为真数组                              |


```js{2-3}
const arr = [5, 12, 8, 130, 44]
const val = arr.find(e => e > 10) // 12
const index = arr.findIndex(e => e >10) // 1
```

## 6. 对象
### 6.1 构造函数
对象创建有三种常用方式：字面量方式，`new Object`方式，构造函数方式。
```js{1,2,7}
const o1 = {name:'Page'}
const o2 = new Object({{name:'Page'}})

function Pig(name){
  this.name = name
}
const o3 = new Pig('Page')
```

构造函数技术上仍是常规函数，虽无强制要求，但一般具有如下特征：
* 大驼峰命名
* 只使用`new`操作符来执行
* 函数没有`return`语句，会将自身创建的对象返回
* `this`指向自身对象

构造函数执行过程如下：
1. `new`关键字 创建空对象
2. 将`this`指向新对象
3. 执行函数体，将属性扩展给当前对象
4. 返回当前对象

### 6.2 实例成员与静态成员
通过构造函数创建的对象的属性或方法称为实例成员，而构造函数自身的属性或方法则称为静态成员。类似于Python中的实例成员和类成员。静态成员方法中的`this`指向的是构造函数本身。

```js{2-3}
const date = new Date()
const localTime = date.toLocaleString() //实例方法
Date.now() //静态成员
```
### 6.3 包装对象
`number/string/bool`等基本数据类型都有对应的构造函数（包装类型），通过构造函数创建的对象称为包装对象，包装对象不仅具有和基本类型一样的值，还包含类型相关的方法与属性。就如同 C#当中 int 与 Int32,string 与 String 的关系。包装类型与基本类型用法一致，但是基本类型的扩充

```js{1}
let num=new Number(123)//使用 new 关键字创建包装类型

let num=10
num.toString() //num 在内存中临时创建一个 Number 对象，并执行 toString()方法， 将结果返回，同时释放这这个包装对象
```

* 所有包装类型的变量都是对象，哪怕其中没有值，仍然是一个空对象， 其 typeof 的值是都是 Object，所有的非 null 的对象转布尔都是 true
* 工作机制(瞬时创建、瞬时调用、瞬时释放)

普通的 `string`,`number`,`boolean` 变量都是 值类型，包装对象则是引用类型。值类型与应用类型作为参数传递时使用差异的。在js中也有堆栈的概念。值类型直接存储在栈中，引用类型则在存储在堆中。参数传递时传递的是栈中存储的内容(将栈中存储的内容拷贝一份作为参数传递)，值类型直接将本身复制一份进行传递，所以在函数内容修改与变量本身没有任何关系。

引用类型变量传递的则是变量存储在栈中的堆地址引用，所以所以在函数内部操作的与外部是同一个对象。在函数内部我们通过`对象名.属性名`的方式访问变量在堆中存储的内容，修改后外部也生效，但如果我们在函数内部直接给形参变量赋值的话，相当于把形参变量(指针)指向了新的地址，操作的不再是实参的地址，外部变量依然指向原来的堆地址，所以没有变化。

### 6.4 Object

| 静态成员 | 作用           |
| :------- | :------------- |
| `keys`   | 对象所有键     |
| `values` | 对象所有值     |
| `assign` | 常用于对象拷贝 |

```js{2,4}
const person = {name:'Colin',age:18}
Object.values.join('/') // Colin/18

Object.assign(person,{gender:'Male'}) // 将对象拷贝(扩展)到person对象中
```

## 7. 日期
`Date`对象封装了时间相关的操作。
```js
const now = new Date();//获取当前时间 
alert(now.toLocaleDateString());//获取日期
alert(now.toLocaleTimeString());//获取时间 
```

| 方法            | 作用                     | 说明                 |
| :-------------- | :----------------------- | :------------------- |
| `getFullYear()` | 获得年份                 | 获取四位年份         |
| `getMonth()`    | 获得月份                 | 取值为 0 ~ 11        |
| `getDate()`     | 获取今天是月份中的每几天 | 不同月份取值也不相同 |
| `getDay()`      | 获取星期几               | 取值为 0 ~ 6         |
| `getHours()`    | 获取小时                 | 取值为 0 ~ 23        |
| `getMinutes()`  | 获取分钟                 | 取值为 0 ~ 59        |
| `getSeconds()`  | 获取秒                   | 取值为 0 ~ 59        |

获取时间戳可以使用如下三种方式，前两种方式可以获得任意时间戳，最后一种方式只能获取当前时间戳。
```js{2,4-5}
const date = new Date()
console.log(date.getTime())

console.log(+new Date())
console.log(Date.now())
```

## 8. JavaScript执行机制
JavaScript是单线程的，如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞。为了解决这个问题，利用多核 CPU 的计算能力，HTML5 提出`Web Worker`标准，允许JavaScript脚本创建多个线程，于是，JS中出现了同步和异步。

同步任务都在主线程上执行，形成一个执行栈。

JS的异步是通过回调函数实现的,异步任务相关添加到任务队列中（任务队列也称为消息队列）。一般而言，异步任务有以下三种类型:
* 普通事件，如 `click`、`resize`等
* 资源加载，如 `load`、`error`等
* 定时器，包括 `setInterval`、`setTimeout`等

JavaScript首先会执行执行栈中的同步任务，异步任务则会入队到任务队中。一旦执行栈中所有同步任务执行完毕，系统就会依此检查任务队列中的异步任务，如果有可以被执行的异步任务就会移入到执行栈中开始执行。主线程不断的重复获得任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环(`event loop`)。

异步任务队列是通过浏览器来实现的多线程效果，js仍然是单线程的。

```js
//因为时间循环机制的存在，如下代码输出内容为 1 3 2

console.log(1)
setTimeout(function(){
  console.log(2)
},0)
console.log(3)
```

## 9. 作用域
作用域（`scope`）规定了变量能够被访问的“范围”，离开了这个“范围”变量便不能被访问。js中作用域分为局部作用域和全局作用域。

### 9.1 局部作用域
局部作用域分为函数作用域和块作用域。

在函数内部声明的变量只能在函数内部被访问，外部无法直接访问。函数的参数也是函数内部的局部变量，不同函数内部声明的变量无法互相访问，函数执行完毕后，函数内部的变量实际被清空了。

在 JavaScript 中使用 `{ }` 包裹的代码称为代码块，代码块内部声明的变量外部将【有可能】无法被访问。通过`var`声明的变量没有块级作用域，可以在`{ }`外被访问，已不推荐使用。

### 9.2 全局作用域
`<script>` 标签 和 js 文件 的【最外层】就是所谓的全局作用域，在此声明的变量在函数内部也可以被访问。 全局作用域中声明的变量，任何其它作用域都可以访问。

* 为 `window` 对象动态添加的属性默认也是全局的，不推荐！
* 函数中未使用任何关键字声明的变量为全局变量，不推荐！！！
* 尽可能少的声明全局变量，防止全局变量被污染

### 9.3 作用域链
作用域链本质上是底层的变量查找机制。在函数被执行时，会优先查找当前函数作用域中查找变量，如果当前作用域查找不到则会依次逐级查找父级作用域直到全局作用域。嵌套关系的作用域串联起来形成了作用域链，子作用域能够访问父作用域，父级作用域无法访问子级作用域。

```js
//全局作用域
let a = 10,b = 20,c = 30
//函数作用域
function f(){
  let a = 11,b = 21
  //函数作用域
  function g(){
    a = 12
    console.log(a)
    console.log(b)
    console.log(c)
  }
  g()
}
f()

// 输出结果为 12 21 30
```

### 9.4 GC
垃圾回收机制(`Garbage Collection`) 简称 `GC`，JS中内存的分配和回收都是自动完成的，内存在不使用的时候会被垃圾回收器自动回收。

当我们声明变量、函数、对象的时候，系统会自动为他们分配内存，使用变量、函数等过程就会进行内存读写，使用完毕，由垃圾回收自动回收不再使用的内存。一般情况下局部变量的值, 不用了, 会被自动回收掉，但**全局变量一般会在关闭页面时才回收

常见的浏览器垃圾回收算法有 `引用计数法` 和 `标记清除法`。

#### 9.4.1  引用计数法
IE采用的引用计数算法, 它会跟踪记录被变量引用的次数，如果被引用了一次，那么就记录次数1,如果减少一个引用就减1，如果引用次数是0 ，则释放内存。引用计数存在一个致命的问题，嵌套引用（循环引用）。如果两个对象相互引用，尽管他们已不再使用，垃圾回收器不会进行回收，导致内存泄露。

```js{4-5}
//循环引用示例
function fc(){
  let o1={},o2={}
  o1.a = o2
  o2.a = o1
}
fn()
```

#### 9.4.2 标记清除法
现代的浏览器已经不再使用引用计数算法了，大多是基于标记清除算法的某些改进算法，总体思想都是一致的。标记清除算法将“不再使用的对象”定义为“无法达到的对象”。就是从根部（在JS中就是全局对象）出发定时扫描内存中的对象。凡是能从根部到达的对象，都是还需要使用的。那些无法由根部出发触及到的对象被标记为不再使用，稍后进行回收。以上循环引用示例中的对象无法送根部访问到，所以会自动清除。

### 9.5 闭包
一个函数对周围状态的引用捆绑在一起，内层函数中访问到其外层函数的作用域，这称之为闭包。可以简单理解为 闭包 = 内层函数 + 外层函数的变量。

```js{4,6-8}
// 闭包示例
function outer(){
  // 外层变量
  let i=1
  //内层函数
  return function(){
    console.log(i)
  }
}
const fn =outer()
fn()
```

闭包作用是，封闭内部数据，外部也可以访问函数操作内部的变量。类似于属性对于私有字段的封装。

```js{3-7}
// 闭包数据私有化示例 只能通过闭包修改计数器值，避免计数器被外部直接进行非法篡改
function counter(){
  let cnt=0
  return function(){
    cnt++
    console.log(cnt)
  }
}
const cnter=counter()
cnter()
```

## 10. 函数进阶

函数可以在声明前被调用，称为函数提升。函数提升出现在相同作用域当中，但函数表达式不存在提升的现象。
### 10.1 动态函数
js中函数作为一种数据类型，所有的函数都派生自`Function`。

`var func = new Function(arg1, arg2, ..., argN, body);`

最后一个参数是函数体内容，前面是参数列表，参数列表，如果没有参数可以参数列表可以省略不写。所有 参数均以字符串形式进行传递。

```js{1}
var fn = new Function("x","y", "alert(x+y)")
fn(1,2)
```
`Function`允许我们将函数定义以字符串的形式作为参数进行传递，这样我们就可以在某些情况下拼接函数定义的字符串，然后丢给`Function`，这样就可以动态的创建 一个函数，非常灵活。

### 10.2 函数参数
#### 10.2.1 arguments
在 js 中，可以给函数传递任意多个参数。定义函数的参数列表，只是显示可以使用的参数列表而已，真正的参数都交给了函数的 `arguments` ,`arguments` 对象是函数的参数列表对象集合。所有的函数参数列表不管是否在函数定义时是否声明，都可以通过`arguments`拿到，无参时`arguments.length=0`

```js {3-4}
function sum(){
  let sum = 0
  for(let index in arguments)
    sum += arguments[index]
  return sum
}
sum(1,2,3)
```

在定义功能函数给用户使用时，我们还是显式的声明函数的参数列表，这样在函数调用时可以提醒用户传递什么参数，传递几个参数， 更加友好，提高函数的可读性和可用性。

#### 10.2.2 剩余参数
js剩余参数可以接收除了显示声明参数外的其它剩余参数，与Python中`*args`非常类似。剩余参数形参名字没有要求。

```js{2,4}
// 剩余参数语法示例
function fn(a,...args){
  console.log(a) // 1
  console.log(args) // [2,3]
}
fn(1,2,3)
```

```js {2,10}
// 剩余参数示例
function sum(...args){
  let sum = 0
  for(let index in args)
    sum += args[index]
  return sum
}
sum(1,2,3)

function(a,...args){
  console.log(a)
  console.log(args)
}
```

### 10.3 箭头函数
js中箭头函数语法与C#中Lambda表达式基本一致。箭头函数可以简化匿名函数使用且不绑定`this`。

箭头函数没有`arguments`动态参数，但是有剩余参数`..args`

```js{3,6,10}
// 箭头函数示例
const link = document.querySelector('a')
link.addEventListener('click',e => e.preventDefault)

// 箭头函数返回字面量
const fn = name => ({name:name})
fn('Colin') // {name: 'Colin'}

// 箭头函数使用剩余参数
const calc = (...args)=> {
  let sum = 0
  for(let index in args)
    sum += args[index]
  return sum
}
calc(1,2,3)
```

js中每一个新函数根据它是被如何调用的来定义这个函数的`this`值,箭头函数不会创建自己的`this`,它只会从自己的作用域链的上一层沿用`this`。

```js{3}
const user = {
  name: 'Colin',
  sayhi:()=> console.log(`hi ${this}`) // this 指向window而不是user
}
user.sayhi()
```

事件回调函数使用箭头函数时，`this`为全局的`window`，因此DOM事件回调函数为了简便，特别是需要用到`this`时不太推荐使用箭头函数。

## 11. 解构赋值
解构赋值是一种快速为变量赋值的简洁语法，本质上仍然是为变量赋值。
### 11.1 数组解构
数组解构是将数组的单元值快速批量赋值给一系列变量的简洁语法。变量的顺序对应数组单元值的位置依次进行赋值操作。

```js{1}
const [a,b,c] = [1,2,3]
console.log(a)
console.log(b)
console.log(c)
```

js中数组解构语法非常类似于python中元组，可以方便的交换两个变量的值。

```py{9}
# python交换变量
a = 1
b = 2
a, b = b, a

//js交换变量
let a = 1
let b = 2; // 此处分号必须
[a, b] = [b, a]
```

* 变量的数量大于单元值数量时，多余的变量将被赋值为`undefined`
* 为了避免`undefined`的情况，可以为变量指定默认值
* 利用剩余参数解决变量少单元值多的情况，剩余参数返回的还是一个数组
* 可以忽略某些单元值
* 支持多维数组解构

```js{1-5}
const [a,b,c] = ['Apple','Huawei'] //c为undefined
const [a='Phone',b='Phone'] = ['Apple'] //a:'Apple' b:'Phone',单元值为undefined时默认参数才生效
const [a,b,...args] = ['Apple','Huawei','Xiaomi','Vivo'] //args为['Xiaomi','Vivo']
const [a,,c] = ['Apple','Huawei','Xiaomi'] //忽略第二个单元值
const [a,b] = ['Apple',['Xiaomi','Vivo']] // b为['Xiaomi','Vivo']
```

### 11.2 对象解构
对象解构是将对象属性和方法快速批量赋值给一系列变量的简洁语法。对象属性的值将被赋值给与属性名相同的变量。

```js{5}
const person = {
  name:'Colin',
  age:18
}
const {name,age} = person
console.log(name,age)
```

* 对象中找不到与变量名一致的属性时变量值为`undefined`
* 可以从一个对象中提取变量并同时修改新的变量名

```js{5}
const person = {
  name:'Colin',
  age:18
}
const {name:username,age,gender} = person //name重命名为username ,gender 为 undefined
console.log(username,age)
```

数组对象解构，结合数组和对象解构语法即可。
```js{2}
const pigs=[{name:'Page',age:3}]
const [{name,age}]=pigs
```

多级对象解构需要限定属性名，实际开发中常在函数形参位置结构对象并获取需要字段。
```js{9,13}
const person = {
  name:'Colin',
  age:18,
  info:{
    height:175,
    weight:68
  }
}
const {name,info:{height,weight}} = person
console.log(name,height,weight)

//在函数形参位置进行对象解构，只结构需要的参数即可
const getBmi=({info:{height,weight}}) => weight/Math.pow(height/100,2)
getBmi(person)
```

## 11. 原型
对象的构造函数中声明的实例成员在不同实例对象中是各自独立的，不同实例保存着各自的实例属性用于存储的数据是合理的，但对象中的函数在不同实例中逻辑是功能逻辑是一致的却在不同实例之间各自存储会造成不必要的内存开销。我们可以通过原型对象来解决此问题。
### 11.1 原型对象
Js中每一个构造函数都有一个`prototype`属性指向另一个对象，我们称之为原型对象。在原型对象上挂载的函数可以在不同实例之间共享且不会被多次创建。与构造函数相同，原型对象中的`this`也指向实例化的对象。

```js{2-4}
// 给数组对象扩展求和方法
Array.prototype.sum = function(){
  return this.reduce((prev,current)=>prev+current,0)
}

[1,2,3].sum() // 6
```

### 11.2 constructor
每个原型对象中都有一个`constructor`属性，该属性指向当前原型对象所属的构造函数。如果要为原型对象扩展多个方法，可以采用对象形式赋值，但这样会覆盖构造函数原型对象中的原有的内容，此时我们可以在修改后的原型对象中添加`constrcutor`属性并指向原来的构造函数。

```js{6}
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype = {
    constructor: Person,
    sing: function(){console.log(`${this.name} is singing`)},
    dance:function(){console.log(`${this.name} is dancing`)}
}
const person = new Person('Colin')
person.sing()
person.dance()
```

### 11.3 对象原型
js中每个对象都一个`__proto__`属性指向其构造函数的`prototype`。对象可以直接调用其构造函数原型的方法就是因为对象原型的存在。

`__proto__`是js非标准属性，在浏览器中可能显示为`[[prototype]]`。

```js{2}
const p = new Person()
p.__proto__ === Person.prototype // true
```

### 11.4 原型继承
我们可以将同类对象相同的成员声明在一个对象中，让子类原型指向该对象即可实现继承。

如果我们要将多个不同类型的原型指向一个普通对象，那么任一类型修改原型后都会影响到其它使用同个原型对象的类型。如果既要实现继承相同的结构，又要各自原型对象互相对立，我们可以考虑将原型对象指向一个构造函数的实例。

```js{8,10-11,16-18}
//父类
function People(name) {
    this.name = name
    this.selfIntroduce = function () { console.log(`my name is ${this.name}`) }
}
// 子类
function Worker(name) {
    this.name = name // 重写父类属性
}
Worker.prototype = new People('Worker') // 指定父类
Worker.prototype.constrcutror = Worker

// 子类
function Student() {
}
Student.prototype = new People('Student')
Student.prototype.constrcutror = Student
Student.prototype.study = function () { console.log(`${this.name} is studying`) } //子类扩展方法

let people = new Worker('Robin')
people.selfIntroduce()
people = new Student()
people.study()
```

### 11.5 原型链
原型链与对象作用域链类似，都是一种查找规则。

js中当使用一个对象的成员时，会首先在当前对象中查找，如果没有则查找该对象的原型`__proto__`（相当于父类），原型对象中没有则继续查找原型对象的原型（父类的父类），依此类推直到找到Object的原型为`null`,依然没有则报错，找到则正常访问。这种按照原型逐层查找对象成员的方式称为原型链。