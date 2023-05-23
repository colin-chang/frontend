# CSS3 查缺补漏

## 1. 文字文本
### 1.1 字体粗细和倾斜
`font-weight`属性用于控制字体粗细，默认提供了`normal`（400）和`bold`（700）两个关键字，亦或者直接设置[100,900]的纯数字。除了加粗之外，也可以是字体变细。需要注意的是，不是所有字体都提供了九种粗细，因此部分取值页面中无变化。

`font-style`属性用于控制字体是否倾斜。取值为`normal`和`italic`。设置`normal`也可以使`<em>`标签的内容显示无非倾斜。
### 1.2 字体系列
#### 1.2.1 font-family
`font-family`属性用于设置字体。

`具体字体1,具体字体2,具体字体3,具体字体4,...,字体系列`。

可以设置多个，渲染规则为从左往右按照顺序查找，如果电脑中未安装该字体，则显示下一个字体，如果都不支持，此时会根据操作系统，显示最后字体系列的默认字体。如果字体名称中存在多个单词，推荐使用引号包裹，最后一项**字体系列不需要引号包裹**。

#### 1.2.2 字体系列
常见字体系列有以下三种：
* 无衬线字体（`sans-serif`）
  1. 特点：文字笔画粗细均匀，并且首尾无装饰
  2. 场景：网页中大多采用无衬线字体
  3. 常见该系列字体：黑体、Arial
* 衬线字体（`serif`）
  1. 特点：文字笔画粗细不均，并且首尾有笔锋装饰
  2. 场景：报刊书籍中应用广泛
  3. 常见该系列字体：宋体、Times New Roman
* 等宽字体（`monospace`）
  1. 特点：每个字母或文字的宽度相等
  2. 场景：一般用于程序代码编写，有利于代码的阅读和编写
  3. 常见该系列字体：Consolas、fira code

![常见字体系对比图](https://s2.loli.net/2023/04/27/yrpfsERmCQ1U7vO.jpg)

**一般网页中设置字体，最后一项会默认设置一个非衬线字体系列`sans-serif`**。

#### 1.2.3 复合属性
`font : style weight size/line-height family;`
只能省略前两个，如果省略了相当于设置了默认值。

### 1.3 缩进与装饰
#### 1.3.1 文字缩进
`text-indent`属性控制文字缩进，单位`px`或`em`（推荐）。
`1em` = 当前标签的`font-size`的动态大小。文字缩进两个字，那直接设置`text-indent:2em;`即可。

#### 1.3.2 文本修饰
`text-decoration`属性用于控制文字装饰线，可选属性如下。

属性值|效果
:-|:-
`none`|无装饰线
`underline`|下划线
`overline`|上划线
`line-through`|删除线

#### 1.3.3 文字阴影
`text-shadow`属性用于控制文字阴影效果。可选属性如下。
属性值|效果
:-|:-
`h-shadow`|必须，水平偏移量。允许负值
`v-shadow`|必须，垂直偏移量。允许负值
`blur`|可选，模糊度
`color`|可选，阴影颜色

### 1.4 行高
`line-height`属性用于控制一行的上下行间距，设置数字+`px`表示行高为具体高度，如果不带单位直接设置数字则表示当前标签字号的倍数（可以为小数）。

![行高示意图](https://s2.loli.net/2023/04/27/3REYZ6g5dalV8yN.jpg)

文字在一行中是默认纵向居中，上下间距等分，那么**如果要让当行文本纵向居中可以设置文字父元素的高度为行高**。网页精准布局时，会设置 `line-height:1` 可以取消上下间距。

## 2. 背景
### 2.1 background-repeat
`background-repeat`属性用于控制标签背景平铺规则。

取值|效果
:-|:-
`repeat`|（默认值）水平和垂直方向都平铺
`no-repeat`|不平铺
`repeat-x`|横向平铺
`repeat-y`|纵向平铺

### 2.2 background-position
`background-position`属性用于控制标签背景位置。语法如下：
`background-position：水平方向位置 垂直方向位置;`

![background-position](https://s2.loli.net/2023/04/27/z9r3fUhvkWiQyRt.jpg)

方位名词取值和坐标取值可以混使用，第一个取值表示水平，第二个取值表示垂直。坐标是负值，表示反方向位置。

### 2.3 background-size
`background-size`属性用于控制背景图片尺寸，即缩放背景图片。语法如下：`background-size:宽度 高度;`
取值|效果
:-|:-
数字+px|简单方便，常用
百分比|相对于当前盒子自身的宽高百分比
`contain`|包含，将背景图片等比例缩放，直到不会超出盒子的最大
`cover`|覆盖，将背景图片等比例缩放，直到刚好填满整个盒子没有空白

实际开发中一般盒子的比例与背景图比例是相同的，此时`contain`和`cover`效果一致。

### 2.4 渐变(background-image)
`background-image`有两种常见用法，出了指定`url`设置背景图片外，还可以使用`linear-gradient`设定背景渐变色。常见渐变包括线性渐变和径向渐变两种。

#### 2.4.1 线性渐变
线性渐变常用于给元素添加背景色，改善盒子中内容显示效果，案例见[华为2D变换案例](#_10-1-5-华为2d变换案例)

完整语法为：`background-image: linear-gradient(渐变方向,颜色1 终点位置,颜色2 终点位置, ...)`。

* 渐变方向为可选参数。取值可以为`to 方位名词`或`角度数`。
* 终点位置为可选参数，取值为百分比。

```css{2,5}
/*背景色从右上角45度开始向左下角渐变，颜色从黑色变为透明，其中黑色占比40%*/
background-image: linear-gradient(45deg,black 40%,transparent);

/*背景色从透明线性渐变到粉色然后再渐变到红色*/
background-image: linear-gradient(transparent,pink,red)
```

#### 2.4.2 径向渐变
径向渐变常用与给元素添加高光效果。

完整语法为：`background-image: radial-gradient( 半径 at 圆心位置, 颜色1 终点位置, 颜色2 终点位置, ...);`。
* 半径是2条，则为椭圆
* 圆心位置取值：像素单位数值 / 百分比 / 方位名词

##### 案例：高光按钮

<iframe src="https://frontend-demo.a-nomad.com/gradient/index.html" style="margin-top:20px;width:500px;height:150px;border:0" scrolling="no" />

```html{11-15,31-33,37-39}
<style>
    .container {
        width: 500px;
    }

    .ball {
        float: left;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-image: radial-gradient(
                /* 75+30两条渐变半径都从盒子中心点向外镜像渐变 */
                75px 30px at center center,
                blue,
                skyblue);
    }

    button {
        float: left;
        display: block;
        margin: 10px 15px;
        border: 0;
        border-radius: 5px;
        width: 120px;
        height: 40px;
        background-color:olivedrab;
        color: white;
    }

    .btn_linear {
        background-image: linear-gradient(to right,
                rgba(255, 255, 255, 0.3),
                transparent);
    }

    .btn_radial {
        background-image: radial-gradient(70px at 10px 10px,
                rgba(255, 255, 255, 0.3),
                transparent);
    }
</style>

<div class="container">
    <div class="ball"></div>
    <button>普通按钮</button>
    <button class="btn_linear">线性高光</button>
    <button class="btn_radial">径向高光</button>
</div>
```

### 2.5 background
背景相关属性的连写形式：`background：color image repeat position/size`。四个属性顺序没有强制要求，但建议顺序如上，可以按照需求省略。

### 2.6 精灵图
浏览器访问一个网站时，同一张图一般会加载一次后缓存在本地，多次使用时也不会重新加载。以此原理，我们经常将项目中相关的小图标合并为一张大图，并作为背景图使用在不同的位置，此称之为精灵图。精灵图不会总体图标尺寸，但可以减少网页发送网络请求的次数，减轻服务器的压力，提高页面加载速度。

使用精灵图步骤如下：
* 创建一个盒子
* 测量精灵图中要使用的图标尺寸并将小图片的宽高设置给盒子
* 将精灵图设置为盒子的背景图片
* 测量小图片左上角坐标，分别取负值设置给盒子的`background-position:x y`


## 3. 选择器

CSS选择器非常丰富，时间开发中使用最多的是 `类选择器+后代选择器`的组合，组合层级并不是越多越好，一个选择器中 **类选择器的个数推荐不超过3个**。

* 后代选择器
  
    `选择器1 选择器2`。根据 HTML 标签的嵌套关系，选择父元素所有层级的后代中满足条件的元素
    `section p`表示选中`section`标签中的所有层级的`p`标签。

* 子代选择器
  
    `选择器1 > 选择器2`。根据 HTML 标签的嵌套关系，选择父元素**直接子元素**中满足条件的标签。
    `section > p`表示选中`section`标签中的第一级的`p`标签。

* 并集选择器

    `选择器1 , 选择器2`。同时选择多组标签，设置相同的样式。并集选择器中的每组选择器可以是基础选择器或者复合选择器。并集选择器中的每组选择器通常一行写一个，提高代码的可读性

* 交集选择器
  
    `选择器1选择器2`。选中页面中同时满足多个选择器的标签。交集选择器中的选择器之间是紧挨着的，没有东西分隔。交集选择器中如果有标签选择器，**标签选择器必须写在最前面**。

* 伪类选择器

    `元素:hover`。选中鼠标悬停在元素上的状态并设置样式。任何标签都可以通过CSS伪类选择器设置鼠标悬停状态的样式。如果是超链接，则还有如下表所示的伪类选择器。
    
    选择器|说明
    :-|:-
    `a:link`|选中`a`链接 未访问过的状态
    `a:visited`|选中`a`链接访问之后 的状态
    `a:hover`|选中鼠标悬停的状态
    `a:active`|选中鼠标按下的状态

    如果需要同时实现以上四种伪类状态效果，需要按照 `LVHA` 顺序书写。

    `input:focus`用于选中元素获取焦点时状态，表单控件获取焦点时默认会显示外部轮廓线

* 结构伪类选择器

    选择器|说明
    :-|:-
    `E:first-child`|匹配父元素中第一个子元素，并且是E元素
    `E:last-child`|匹配父元素中最后一个子元素，并且是E元素
    `E:nth-child(n)`|匹配父元素中第n个子元素，并且是E元素
    `E:nth-last-child(n)`|匹配父元素中倒数第n个子元素，并且是E元素
    `E:nth-of-type(n)`|只在父元素的同类型(E)子元素范围中，匹配第n个

    结构伪类选择器中`n`可以是数字表示第几个，也可以是公式
    工时|功能
    :-|:-
    `2n`、`even`|偶数
    `2n+1`、`2n-1`、`odd`|奇数
    `3n`|3的倍数个元素（3,6,9...）
    `-n+5`|找到前五个
    `n+5`|第五个之后所有元素

* 属性选择器
  
  通过元素上的HTML属性来选择元素，常用于选择`input`标签

    选择器|说明
    :-|:-
    `E[attr]`|选择具有`attr`属性的E元素
    `E[attr="val"]`|选择具有`attr`属性并且属性值等于`val`的E元素

## 4. 盒模型
*  盒尺寸
  
    每个盒子的宽高设置的是内容区域的尺寸，实际尺寸则是`内容+padding+border`。如果要设置宽高为实际盒子尺寸可以手动减去`border`和`padding`的尺寸，或者使用CSS3的`box-sizing:border-box;`启用内减模式即可。
  
* 清除默认内外边距
  
  浏览器会默认给部分标签设置默认的`margin`和`padding`。`body`标签默认有`margin：8px`。`p`标签默认有上下的`margin`。`ul`标签默认由上下的`margin`和`padding-left`。
  ```css{1-4}
  * {
    margin:0;
    padding:0;
  }
  ```

* 边距计算
  * 正常情况。水平布局的盒子，左右的`margin`正常，互不影响。最终两者距离为左右`margin`的和
  * 合并现象。垂直布局的块级元素，上下的`margin`会合并。最终两者距离为`margin`的最大值。
  * 塌陷现象。互相嵌套的块级元素，子元素的`margin-top`会作用在父元素上。导致父元素一起往下移动。解决方法如下：
    * 给父元素设置`border-top` 或者 `padding-top`（分隔父子元素的`margin-top`）
    * 给父元素设置`overflow：hidden`
    * 转换成行内块元素
    * 设置浮动
  * 行内元素的`margin`和`padding`无效情况无法修改其垂直位置。如果要修改其垂直位置可以通过修改其显示模式或者设置行高。

* 盒子阴影
  
  `box-shadow`属性用于控制盒子阴影效果。参数及左右如下表：

    参数|作用
    :-|:-
    `h-shadow`|必须，水平偏移量。允许负值
    `v-shadow`|必须，垂直偏移量。允许负值
    `blur`|可选，模糊度
    `spread`|可选，阴影扩大
    `color`|可选，阴影颜色
    `inset`|可选，将阴影改为内部阴影

* 边框三角形

  将盒子宽高设置为0，仅保留边框就会得到四个三角形。可以通过修改边框宽度来得到不同形状的三角形，然后设置透明度将不需要的三角形隐藏。

## 5. 浮动
### 5.1 标准流
标准流又称文档流，是浏览器在渲染显示网页内容时默认采用的一套排版规则，规定了应该以何种方式排列元素。标准流排版规则：
1. 块级元素：从上往下，垂直布局，独占一行。
2. 行内元素 或 行内块元素：从左往右，水平布局，空间不够自动折行

### 5.2 浮动
* 浮动元素会脱离标准流（简称：脱标），在标准流中不占位置相当于从地面飘到了空中。
* 浮动元素比标准流高半个级别，可以覆盖标准流中的元素
* 浮动找浮动，下一个浮动元素会在上一个浮动元素后面左右浮动
* 浮动元素有特殊的显示效果
  * 一行可以显示多个
  * 可以设置宽高
  * 浮动元素是顶部对齐

### 5.3 清除浮动
标准流中父元素没有设置高度，如果子元素浮动后脱标不占位置，此时子元素不能撑开标准流的块级父元素，那么下方标椎流元素就会被渲染到当前浮动元素的下方而被当前浮动内容遮盖。如果需要父元素有高度，从而不影响其他网页元素的布局，那就需要清除浮动。

清除浮动有以下常用方式：
* 设置父元素高度
  * 优点：简单粗暴，方便
  * 缺点：有些布局中不能固定父元素高度。如：新闻列表，滚动加载内容的页面等。
* 额外标签法
  * 操作:在父元素内容的最后添加任意块级元素,给添加的块级元素设置`clear:both`
  * 缺点：会在页面中添加额外的标签，会让页面的HTML结构变得复杂
* 单伪元素清除法
  * 操作:用伪元素替代了额外标签。原理与额外标签法一致，只是不在HTML中声明实体标签而已。
  * 优点：项目中使用，直接给标签加类即可清除浮动
  ```css{1-4}
  .clearfix::after{
    content:'';
    display:block;
    clear:both;
    /* 以下代码为了解决低版本浏览器兼容性 */
    height:0;
    visibility:hidden;
  }
  ```
* 双伪元素清除法
  * 作用：在单伪元素清除法的基础上，通过修改元素的显示模式来避免了外边距塌陷问题。
  ```css{4,7}  
  .clearfix::before,
  .clearfix::after{
    content:'';
    display:table;
  }
  .clearfix::after{
    clear:both;
    height:0;
    visibility:hidden;
  }
  ```
  * 优点：项目中使用，直接给标签加类即可清除浮动，同时解决外边距塌陷问题。
* 给父元素设置`overflow : hidden`
  * 操作：直接给父元素设置 `overflow : hidden`
  * 优点：方便

## 6. 定位
### 6.1 网页常见布局方式
* 标准流
  
  块级元素独占一行 → 垂直布局。行内元素/行内块元素一行显示多个 → 水平布局
* 浮动
  
  可以让原本垂直布局的 块级元素变成水平布局
* 定位

  可以让元素自由的摆放在网页的任意位置，一般用于盒子之间的层叠情况。

### 6.2 定位应用场景
* 可以解决盒子与盒子之间的层叠问题

  定位之后的元素层级最高，可以层叠在其他盒子上面
* 可以让盒子始终固定在屏幕中的某个位置

### 6.3 定位类型
定位中如果水平方向同时设置了`left`和`right`，则以`left`为准，如果垂直方向同时设置了`top`和`bottom`，则以`top`为准。

#### 6.3.1 静态定位
`position:static;`静态定位就是标准流，不能通过方位属性进行移动。
#### 6.3.2 相对定位
`position:relative;`自恋型定位，相对于自己之前的位置进行移动。在页面中占位置 → 没有脱标。一般用于元素小范围的元素位置移动。

#### 6.3.3 绝对定位
`position:absolute;`拼爹型定位，相对于非静态定位的父元素进行定位移动。首先就近逐层寻找已经定位（相对或绝对定位均可，实际开发中父级常用相对定位，“子绝父相”）的父级元素，如果有则以父级为基准进行定位，如果没有则默认相对于浏览器可视区域进行移动，在页面中不占位置 → 已经脱标。会改变元素的显示模式为`inline-block`。

#### 6.3.4 固定定位
`position:fixed;`死心眼型定位，相对于浏览器进行定位移动，一般用于让元素固定在屏幕中的某个位置。在页面中不占位置 → 已经脱标。会改变元素的显示模式为`inline-block`。

定位方式|属性值|相对移动基准|是否占位
:-|:-|:-|:-
静态定位|`static`|不能通过方位属性移动|占位置
相对定位|`relative`|相对于自己原来的位置|占位置
绝对地位|`absolute`|相对于最近的且有定位的祖先元素移动|不占位置（脱标）
固定定位|`fixed`|相对于浏览器可视区域|不占位置（脱标）

### 6.4 元素层级
* 不同布局方式元素的层级关系：`标准流 < 浮动 < 定位`。
* 不同定位之间的层级关系：相对、绝对、固定默认层级相同。写在下面的元素层级更高，会覆盖上面的元素，“后来居上”。
* `z-index`可以改变**定位**元素的层级，数字（整数）越大，层级越高，默认值是0。可以在不修改元素书写顺序的情况下改变层级，**必须配合定位才有效**。

## 7. 装饰
### 7.1 基线
浏览器文字类型元素排版中存在用于对齐的基线（baseline）,如下图所示。
![baseline](https://s2.loli.net/2023/04/30/Tq6mivnLQcNuhKs.jpg)

**浏览器在渲染行内或行内块元素是会自动按照文字去处理，文字默认是纵向基线对齐的**。

基于基线对齐时，如果元素上下有超出基线的内容，会在元素顶部或底部出现细微的缝隙，元素纵向对齐出现基线对齐的缝隙一般都可以通过下面讲到的垂直对齐来解决。

### 7.2 垂直对齐
我们可以通过`vertical-align`属性来定义垂直对齐方式，其取值与效果如下表：
属性值|效果
:-|:-
`baseline`|默认，基线对齐
`top`|顶部对齐
`middle`|居中对齐
`bottom`|底部对齐

一般`vertical-algin`用于解决如下问题：
* 文本框和表单按钮无法对齐问题（`vertical-align:middle`）
* `input`和`img`无法对齐问题
* `div`中的文本框，文本框无法贴顶问题（`vertical-align:top`）
* `div`不设高度由`img`标签撑开，此时`img`标签下面会存在额外间隙问题（`vertical-align:middle`或`display:block`）
* 使用`line-height`让`img`标签垂直居中问题(父级设置行高同时图片设置`vertical-align:middle`)

### 7.3 光标类型
`cursor`属性用于设置鼠标光标在元素上时显示的样式。常见属性值如下表：
属性值|效果
:-|:-
`default`|默认值，通常是箭头
`pointer`|小手效果，提示用户可以点击
`text`|工字型，提示用户可以选择文字
`move`|十字光标，提示用户可以移动

### 7.4 边框圆角
`border-radius`属性用于设置盒子边框圆角，取值单位可以是`px`或者百分比。赋值规则：从左上角开始赋值，然后顺时针赋值，没有赋值的看对角！

画一个正圆（如圆形头像）。设置盒子宽高相同（正方形），同时设置圆角为盒子高度的50%。
胶囊按钮。盒子是矩形，同时设置圆角为盒子高度的50%。

圆角最大值为50%，因为50%时已经形成了一个圆，无法角度再大也无效了。

### 7.5 overflow
`overflow`用于控制内容溢出部分的显示效果。可选属性值如下表：
属性值|效果
:-|:-
`visible`|默认值，溢出部分可见
`hidden`|溢出部分隐藏
`scroll`|无论是否溢出，都显示滚动条
`auto`|根据是否溢出，自动显示或隐藏滚动条

### 7.6 元素隐藏
让某元素本身在屏幕中不可见。如：鼠标悬浮之后元素隐藏。隐藏元素一般可以使用`visibility：hidden`或者`display：none`两种方式实现，区别在于隐藏元素后，前者仍然会占位置，而后者则不占位置，故而后者使用较多。

### 7.7 元素整体透明度
`opacity`属性用于控制某元素整体（包括内容）一起变透明。属性值：0~1之间的数字，1表示完全不透明，0表示我完全透明。

## 8. 其它样式
* 行内元素

    行内元素不能设置宽高，设置了也不会起作用。除非修改显示模式我块级方式。**浏览器渲染行内元素或者行内块元素时，如果标签换行书写会产生一个空格的距离。解决方案是使用浮动。**
    
* 居中显示
  
  ![居中显示方法汇总](https://s2.loli.net/2023/04/27/KwBFYAxur2i9gVs.jpg)
  * `img`标签垂直居中需要设置`vertical-align:middle;`
  * 绝对定位的盒子居中需要首先设置其`left`和`top`为50%。然后`margin-left`和设置为宽度的一半，`margin-top`设置为高度的一半即可，或者使用CSS3的位移属性设置`transform:translate(50%,50%)`，表示水平和垂直各移动到50%的位置。

* CSS继承

  子元素有默认继承父元素样式的特点。如果元素有浏览器默认样式，此时继承性依然存在，但是优先显示浏览器的默认样式，如`a`标签的`color`，`h`系列标签的`font-size`都会优先被浏览器默认样式覆盖。

* CSS优先级

  不同选择器具有不同的优先级，优先级高的选择器样式会覆盖优先级低选择器样式。`继承 < 通配符选择器 < 标签选择器 < 类选择器 < id选择器 < 行内样式 < !important`。!important写在属性值的后面，分号的前面！`!important`不能提升继承的优先级。

  如果是复合选择器，此时需要通过权重叠加计算方法，判断最终哪个选择器优先级最高会生效。
  ![CSS权重叠加计算](https://s2.loli.net/2023/04/27/FJobGlZEROqPwgN.jpg)

  先比较第一级数字，如果比较出来了，之后的统统不看。如果第一级数字相同，此时再去比较第二级数字，如果比较出来了，之后的统统不看。如果最终所有数字都相同，表示优先级相同，则比较层叠性（谁写在下面，谁说了算!）

* 伪元素
  
  由 CSS 模拟出的实际并不存在的标签效果，一般用于创建一些装饰性的不重要的内容，比如文字前的小图标等。最常用的伪元素是`::before`/`::after`，分别代表在元素最前和最后添加一个伪元素。
  
  伪元素默认是行内元素，**必须设置`content`属性设置元素内容才能生效**。伪元素也是标签，所以可以使用常见的css样式进行设置。

  ```css{5,6}
    /* 将li标签的小圆点替换为天蓝色小箭头 */
    ul{
        list-style: none;
    }
    li::before{
        content: ">";
        color: skyblue;
        margin-right: 10px;
    }
  ```
  `::placeholder`伪元素用于选择一个表单元素的占位文本，它允许开发者和设计师自定义占位文本的样式。例如，可以使用 `::placeholder` 伪元素来改变 `input` 元素的占位符文本的颜色、字体大小等样式。


* CSS书写顺序
  
  CSS建议采用如下顺序书写，更加规范且浏览器渲染效率更高。
  
  1. 布局控制： `display float position`
  2. 盒子模型： `margin border padding width height background` 
  3. 文字样式： `text-align`等

  顺序|类别|属性
  :-|:-|:-
  1|布局属性|`display`/`position`/`float`/`clear`/`visibility`/`overflow`
  2|盒子模型+背景|`margin`/`border`/`padding`/`width`/`height`/`background`
  3|文本内容展性|`color`/`font`/`text-decoration`/`text-align`/`line-height`
  4|点缀属性|`cursor`/`border-radius`/`text-shadow`/`box-shadow`
   
* 导航/banner
  
  * 一般主导航结构都会使用`ul>li>a`的格式，而不是直接使用`a`标签，否则会降低浏览器渲染效率，但是版权栏部分不涉及SEO等问题，可以直接使用`a`即可。
  * `banner`中轮播图效果，多张轮播图一般也使用`ul>li>a`的格式，而轮播图的小圆点则一般使用`ol>li`。

* Logo SEO

  一般情况下为了SEO，我们会使用`h1>a+链接文字(字号为0)+logo背景图`的结果来定义logo部分。
  ```css{5,8}
  .logo h1 a{
    display:block;
    width:270px;
    height:70px;
    background-image:url('../images/logo.png')
    background-size:cover;
    /*隐藏logo文字内容，但对搜索引擎可见，有利于SEO*/
    font-size:0;
  }                            
  ```

* 表格边框合并

  通过设置`border-collapse:collapse;`可以让相邻表格边框进行合并，得到细线边框效果

* 表单自动完成

  默认情况下浏览器会自动记录`form`标签中录入的内容并在辅助自动填写表单，可以设置`form`的`autocomplete="off"`来关闭此功能，避免数据泄露。

* favicon
  
  一般情况下我们会在网站根目录下放置一个名为`favicon.ico`的文件，然后通过如下代码引入网页，此图标会显示在网页标题栏最左侧。
  ```html{1}
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  ```

* html高度

  默认情况下`html`和`body`标签的宽度都是浏览器窗口100%宽度，高度是0，如果要高度也设置成100%，需要将`html`和`body`高度分别设置100%才可以。

## 9. 过渡(transition)
`transition`属性可以元素的样式慢慢的变化，常配合`hover`使用，增强网页交互体验。

参数与取值如下表：

参数|取值
:-|:-
过渡的属性|`all`：所有能过渡的属性都过渡; 具体属性名如：`width`,只有`width`有过渡
过渡的时长|数字+s（秒）


使用步骤如下：
* 默认状态 和 `hover`状态样式不同，才能有过渡效果。
* `transition`属性给需要过渡的**元素本身**加

```css
/* 鼠标悬浮时实现宽度和背景色过渡变化效果 */
.box{
  width:100px;
  backgroud-color:red;
  /* transition:width 1s,backgroud-color 2s */
  transition: all 1s;
}
.box:hover{
  width:120px;
  backgroud-color:pink;
}
```

## 10. 转换(transform)
`transform`属性可以控制元素的转换（位移、旋转、缩放等）。实际开发中常用额转为为2D平面转换，当然少数情况下
也会使用3D转换。
### 10.1 平面转换
#### 10.1.1 位移(translate)
使用`translate`可以实现元素位移效果。

语法为：`transform: translate(水平移动距离, 垂直移动距离);`

取值为像素单位或者百分比（相对于元素自身尺寸），数值正负均可。如果只给出一个值, 表示x轴方向移动距离。单独设置某个方向的移动距离：`translateX()` & `translateY()`。

##### 案例1：使用`translate`快速实现绝对定位元素的居中效果
<iframe src="https://frontend-demo.a-nomad.com/transform_translate_centering/index.html" style="margin-top:20px;width:360px;height:270px;border:0" scrolling="no" />

```html{10,19}
<style>
  .father {
      position: relative;
      width: 360px;
      height: 270px;
      background-color: pink;
  }

  .son {
      position: absolute;
      left: 50%;
      top: 50%;

      /* 通过边距计算 实现绝对定位元素居中
      margin-left: -100px;
      margin-top: -75px; */

      /*通过位移 快速实现绝对定位元素居中*/
      transform: translate(-50%, -50%);

      width: 120px;
      height: 90px;
      background-color: skyblue;
  }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

##### 案例2：双开门效果
<iframe src="https://frontend-demo.a-nomad.com/transform_translate_open_door/index.html" style="margin-top:20px;width:100%;height:325px;border:0" scrolling="no" />

```html{21,28-30,32-34}
<style>
    .container {
        margin: 0 auto;
        width: 740px;
        height: 325px;
        background-image: url(./images/bg.jpg);
        background-size: cover;
        overflow: hidden;
    }

    .container::before,
    .container::after {
        float: left;

        content: '';
        width: 50%;
        height: 100%;
        background-color: #ccc;
        background-image: url(./images/fm.jpg);
        background-size: cover;
        transition: all .5s;
    }

    .container::after {
        background-position: right 0;
    }

    .container:hover::before {
        transform: translate(-100%);
    }

    .container:hover::after {
        transform: translate(100%);
    }
</style>
<div class="container"></div>
```

#### 10.1.2 旋转（rotate）
使用`translate`可以实现元素旋转效果。

语法为：`transform: rotate(角度)`;

取值为正, 则顺时针旋转。取值为负, 则逆时针旋转。角度单位是`deg`。

使用`transform-origin:原点水平位置 原点垂直位置;`属性改变转换原点，默认圆点是盒子中心点。取值可以是方位名词（`left、top、right、bottom、center`）或像素单位数值或者百分比（参照盒子自身尺寸计算）。

##### 案例1：风车旋转

<iframe src="https://frontend-demo.a-nomad.com/transform_rotate_windmill/index.html" style="width:200px;height:200px;border:0" scrolling="no" />

```html{5,8}
<style>
    img {
        width: 200px;
        height: 200px;
        transition: all 1s;
    }
    img:hover{
        transform: rotate(360deg);
    }
</style>
<img src="./images/windmill.png">
```

##### 案例2：多重转换-轮胎滚动

<iframe src="https://frontend-demo.a-nomad.com/transform_tire_rolling/index.html" style="margin-top:20px;width:100%;height:180px;border:0;overflow: hidden;" scrolling="no" />

```html{8,10-13}
<style>
    .container {
        width: 740px;
        height: 180px;
    }
    .container img{
        height: 180px;
        transition: all .6s;
    }
    .container:hover img{
        /* 旋转会改变网页元素的坐标轴向，先写旋转，则后面的转换效果的轴向以旋转后的轴向为准，会影响转换结果，所以一般会将旋转放在最后 */
        transform: translate(560px) rotate(356.5deg);
    }
</style>
<div class="container">
    <img src="./images/tyre.png">
</div>
```
**旋转会改变网页元素的坐标轴向**，先写旋转，则后面的转换效果的轴向以旋转后的轴向为准，会影响转换结果，所以一般会将旋转放在最后。


#### 10.1.3 缩放(scale)
使用`scale`可以实现元素缩放效果。

语法为：`transform:scale(x轴缩放倍数, y轴缩放倍数);`，一般情况下, 只为`scale`设置一个值, 表示x轴和y轴等比例缩放，`scale`值大于1表示放大, `scale`值小于1表示缩小。

通过过渡修改元素尺寸也可以实现缩放效果，但是以元素左上角为中心点的无法修改，常见的缩放效果都是基于元素中心的，所以通过`scale`实现缩放更加理想和方便。

##### 案例：和平精英效果

<iframe src="https://frontend-demo.a-nomad.com/transform_scale/index.html" style="width:300px;height:221px;border:0" scrolling="no" />

```html{17-18,21-22,31-34}
<style>
    li {
        list-style: none;
        width: 300px;
    }

    .picture {
        position: relative;
        overflow: hidden;
    }

    .picture img {
        display: block;
        width: 300px;
    }

    .picture::after {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(5);
        transition: all .3s;

        content: '';
        width: 58px;
        height: 58px;
        background-image: url(./images/play.png);
        opacity: 0;
    }

    .game:hover .picture::after {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
</style>
<ul>
    <li class="game">
        <div class="picture"><img src="./images/party.jpg"></div>
        <h3>【和平精英】“初火”音乐概念片：四圣觉醒......</h3>
    </li>
</ul>
```

#### 10.1.4 倾斜(skew)
使用`skew`可以实现元素倾斜效果。语法为：`transform:skew(角度);`角度单位是`deg`。

##### 案例：倾斜效果

<iframe src="https://frontend-demo.a-nomad.com/transform_skew/index.html" style="width:360px;height:528px;border:0" scrolling="no" />

```html{25}
<style>
    .pic {
        position: relative;
        overflow: hidden;
        width: 360px;
        background-color: blue;
    }

    .pic img {
        display: block;
        width: 100%;
        height: 528px;
    }

    .pic::after {
        position: absolute;
        left: 50%;
        top: 50%;
        content: '';
        width: 300px;
        height: 528px;
        background-image: linear-gradient(white,transparent);
        opacity: 0.5;

        transform: translate(-60%,-50%) skew(-25deg);
    }
</style>

<div>
    <div class="pic"><img src="./images/gem.jpg" alt="gem"></div>
</div>
```


#### 10.1.5 华为2D变换案例

<iframe src="https://frontend-demo.a-nomad.com/transform_huawei/index.html" style="margin-top:20px;width:100%;height:169px;border:0" scrolling="no" />

```html{32-33,51-55,57-59,61-63,65-67}
<style>
    li {
        position: relative;
        float: left;

        margin-right: 10px;
        list-style: none;
    }

    li a {
        color: white;
    }

    .picture {
        height: 169px;
        overflow: hidden;
        background-color: red;
    }

    .picture img {
        width: 240px;
    }

    .picture::after {
        position: absolute;
        left: 0;
        top: 0;

        content: '';
        width: 240px;
        height: 169px;
        background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
        opacity: 0;
    }

    .desc {
        position: absolute;
        bottom: -45px;
        padding: 20px;
    }

    .desc h4 {
        font-size: 13px;
    }

    .desc p {
        font-size: 11px;
        margin-top: 20px;
    }

    .desc,
    .picture img,
    .picture::after {
        transition: all .3s;
    }

    li:hover .desc {
        transform: translateY(-40px);
    }

    li:hover .picture img {
        transform: scale(1.2);
    }

    li:hover .picture::after {
        opacity: 1;
    }
</style>
<ul>
    <li>
        <a href="#">
            <div class="picture"><img src="./images/huawei1.jpeg"></div>
            <div class="desc">
                <h4>产品</h4>
                <h5>OceanStor Pacific 海量存储斩获2021 Interop金奖</h5>
                <p>了解更多 &gt;</p>
            </div>
        </a>
    </li>
    <li>
        <a href="#">
            <div class="picture"><img src="./images/huawei2.jpeg"></div>
            <div class="desc">
                <h4>行业洞察</h4>
                <h5>迈向智能世界2030</h5>
                <p>了解更多 &gt;</p>
            </div>
        </a>
    </li>
    <li>
        <a href="#">
            <div class="picture"><img src="./images/huawei3.jpeg"></div>
            <div class="desc">
                <h4>《ICT新视界》刊首语</h4>
                <h5>笃行致远，共建幸福智慧城市</h5>
                <p>了解更多 &gt;</p>
            </div>
        </a>
    </li>
</ul>
```

### 10.2 空间转换
除了常用的平面转为，使用`transform`属性也可以实现元素在空间内的位移、旋转、缩放等效果。空间转换也叫3D转换。空间是从坐标轴角度定义的，x 、y 、z三条坐标轴构成了一个立体空间，z轴位置与视线方向相同。

![空间坐标系](https://s2.loli.net/2023/05/02/ZvdFlzNoyOa37Wj.jpg)

#### 10.2.1 空间位移
`transform: translate3d(x, y, z);`或`transform: translateZ(值);`两种方式都可以实现元素在z轴上的位移。

正常情况下我们正对屏幕，相当于面对z轴俯视的角度。所以沿z轴位移的元素并不能看出有任何变化，但我们可以给**元素父级**添加`perspective`属性来开启透视效果，透视效果可以为元素添加**近大远小**的视觉效果，并不会改变元素实际大小。`perspective`取值为像素单位，建议数值在`800-1200`之间比较符合人眼的真实体验，这个数值称为透视距离也称为视距，表示人的眼睛到屏幕的距离。

<iframe src="https://frontend-demo.a-nomad.com/transform_translatez/index.html" style="width:200px;height:200px;border:0" scrolling="no" />

```html{3,10,13-14}
<style>
    body{
        perspective: 1000px;
    }
    div {
        margin: 50px auto;
        width: 100px;
        height: 100px;
        background-color: skyblue;
        transition: all .5s;
    }
    div:hover{
        /* transform: translateZ(150px); */
        transform:translate3d(25px,50px,75px);
    }
</style>
<body>
    <div></div>
</body>
```

#### 10.2.2 空间旋转
`transform: rotate3d(x, y, z, 角度);`或`transform: rotateZ(值);`两种方式都可以实现元素在z轴上的旋转。

默认情况下使用`rotate`只提供一个值时就是沿着z轴旋转的，不同轴向的旋转方向可以根据左手法则判断。手握坐标轴，手指弯曲的方向就是旋转方向，大拇指指向的就是该轴的正向。

![空间旋转之左手法则](https://s2.loli.net/2023/05/02/P7WLEnqRcsbCF4h.jpg)

<iframe src="https://frontend-demo.a-nomad.com/transform_rotate_3d/index.html" style="width:100%;height:250px;border:0" scrolling="no" />

```html{3,14,18,22}
<style>
  div {
      transform-style: preserve-3d;
  }

  img {
      margin-top: 50px;
      margin-right: 20px;
      width: 200px;
      transition: all .5s;
  }

  div:hover .x {
      transform: rotateX(60deg);
  }

  div:hover .y {
      transform: rotateY(60deg);
  }

  div:hover .z {
      transform: rotateZ(60deg);
  }
</style>
<div>
  <img class="x" src="./images/hero.jpeg">
  <img class="y" src="./images/hero.jpeg">
  <img class="z" src="./images/hero.jpeg">
</div>
```

#### 10.2.3 空间缩放
`transform: scale3d(x, y, z);`或`transform: scaleZ(值);`两种方式都可以实现元素在z轴上的放大缩小。
开发中空间缩放使用较少。

#### 10.2.4 立体呈现
`perspective`属性只能增加近大远小的透视效果，并不能呈现立体图形。在父元素添加`transform-style: preserve-3d;`则可以是子元素出于真正的3D空间，借助于次可以通过CSS展现3D图像。

##### 案例：立方体
<iframe src="https://frontend-demo.a-nomad.com/transform_style/index.html" style="width:300px;height:320px;border:0" scrolling="no" />

```html{4-5,11,25,30,35,40,45,50,55}
<style>
    .cube {
        position: relative;
        transform: rotateX(-20deg) rotateY(30deg);
        transform-style: preserve-3d;
        margin: 60px;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        transition: all 3s;
    }

    .cube div {
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        height: 200px;
        color: red;
        opacity: 0.8;
    }

    .front {
        transform: translateZ(100px);
        background-color: greenyellow;
    }

    .back {
        transform: translateZ(-100px);
        background-color: green;
    }

    .left {
        transform: translateX(-100px) rotateY(-90deg);
        background-color: orange;
    }

    .right {
        transform: translateX(100px) rotateY(-90deg);
        background-color: yellow;
    }

    .top {
        transform: translateY(-100px) rotateX(90deg);
        background-color: skyblue;
    }

    .bottom {
        transform: translateY(100px) rotateX(90deg);
        background-color: blue;
    }

    body:hover .cube {
        transform: rotateX(-30deg) rotateY(225deg);
    }
</style>
<div class="cube">
    <div class="front">前</div>
    <div class="back">后</div>
    <div class="left">左</div>
    <div class="right">右</div>
    <div class="top">上</div>
    <div class="bottom">下</div>
</div>
```


#### 10.2.5 3D导航案例

<iframe src="https://frontend-demo.a-nomad.com/transform_3d_nav/index.html" style="width:300px;height:50px;border:0" scrolling="no" />

```html{17-20,35,40,44}
<style>
    ul {
        margin-top: 10px;
        width: 300px;
        height: 40px;
        list-style: none;
    }

    li {
        position: relative;
        float: left;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;

        transition: all .5s;
        transform-style: preserve-3d;
        /* 临时旋转，方便在编码过程中3D视角看到效果 */
        /* transform: rotateX(-20deg) rotateY(30deg); */
    }

    li a {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: white;
    }

    li a:first-child {
        background-color: green;
        transform: translateZ(20px);
    }

    li a:last-child {
        background-color: orange;
        transform: rotateX(90deg) translateZ(20px);
    }

    li:hover {
        transform: rotateX(-90deg);
    }
</style>
<ul>
    <li>
        <a href="#">首页</a>
        <a href="#">Index</a>
    </li>
    <li>
        <a href="#">登录</a>
        <a href="#">SignIn</a>
    </li>
    <li>
        <a href="#">注册</a>
        <a href="#">SignUp</a>
    </li>
</ul>
```
![3dnav.jpg](https://s2.loli.net/2023/05/02/pVcsIFaM2j4w7Gh.jpg)

**空间旋转是中心点3D对象的中心点**，所以以上案例中所有超链接都要位移到距离中心点相同的距离，旋转效果才会自然。

## 11. 动画
通过`transition`属性的过渡效果配合元素`hover`等状态可以实现简单的动画效果，此时动画效果只能两个状态之间切换，如果要实现更精准的动画效果，如多个动画状态、时长控制、速度控制、延迟执行、重复多次、多方向、结束效果、自动触发等就需要借助于`animation`属性来实现动画效果。

### 11.1 基本使用
实现动画要通过`定义动画`和`使用动画`两个步骤。
* 定义动画。定义动画有如下两种语法。前者定义了动画的起始和结束两种状态，开发中较为常用。后者则可以定义动画任意进度过程的状态。如果动画的起始状态与元素的默认状态相同则可以直接省略起始状态的代码。
  
  ```css
  @keyframes 动画名称{
    from {}
    to {}
  }

  @keyframes 动画名称{
    0% {}
    30% {}
    ...
    100%{}
  }
  ```
* 使用动画。动画名称和时长是必要参数，其它均为可选参数，取值不分先后顺序。如果有2个时间值，第一个时间表示动画时长，第二个时间表示延迟时间

  ```css
  animation：动画名称 动画时长 速度曲线 延迟时间 重复次数 动画方向 执行完毕时状态;
  ```

### 11.2 动画属性
`animation`除了可以使用上面提到的复合写法外，也可以拆分成不同动画属性来写，效果一致。下标展示了常用的动画属性。

属性|作用|取值
:-|:-|:-
`animation-name`|动画名称|
`animation-duration`|动画时长|数字(单位s)
`animation-delay`|延迟时间|数字(单位s)
`animation-fill-mode`|动画完毕状态|`backwards`:起始状态，`forwards`:结束状态
`animation-timing-function`|速度曲线|`linear`:线性过渡`,`ease`:平滑过渡(默认值),`ease-in`:由慢到快,`ease-out`:由快到慢,`ease-in-out`:由慢到快再到慢
`animation-iteration-count`|重复次数|`infinite`:无限循环,正整数表示多少次
`animation-direction`|是否反向运动|`normal`为正向方向（默认值），`alternate`为正反向交替运动。
`animation-play-state`|动画播放状态|`running`表示正在播放（默认值），`paused`为暂停，通常配合：`hover`使用

### 11.3 逐帧动画
逐帧动画一般都会配合精灵图实现，实现步骤如下：
* 准备显示区域。设置盒子背景图为当前精灵图，尺寸是一张小图的尺寸。
* 定义动画。改变背景图的位置（移动的距离就是精灵图的宽度）
* 使用动画。添加速度曲线steps(N)，N与精灵图上小图个数相同。添加无限重复效果

#### 案例：精灵图逐帧动画

<iframe src="https://frontend-demo.a-nomad.com/animation_steps/index.html" style="width:100%;height:140px;border:0" scrolling="no" />

```html{2-11,17-19}
<style>
    @keyframes run{
        to{
            background-position: -1680px 0px;
        }
    }
    @keyframes move{
        to{
            transform: translateX(560px);
        }
    }
    div{
        width: 140px;
        height: 140px;
        background-image: url(./images/bg.png);

        animation: 
            run 1s steps(12) infinite,
            move 3s linear forwards;
    }
</style>
<div></div>
```
#### 案例：钟表效果

<iframe src="https://frontend-demo.a-nomad.com/animation_clock/index.html" style="margin-top:20px;width:210px;height:210px;border:0" scrolling="no" />

```html{78,90-94}
<style>
    .clock {
        position: relative;
        border: 5px solid black;
        border-radius: 50%;
        width: 200px;
        height: 200px;
    }

    .clock div {
        position: absolute;
        left: 50%;
        top: 50%;
    }

    .line {
        width: 100%;
        height: 3px;
        background-color: #ccc;
        transform: translate(-50%, -50%);
    }

    .line:nth-child(2) {
        transform: translate(-50%, -50%) rotate(30deg);
    }

    .line:nth-child(3) {
        transform: translate(-50%, -50%) rotate(60deg);
    }

    .line:nth-child(4) {
        transform: translate(-50%, -50%) rotate(90deg);
    }

    .line:nth-child(5) {
        transform: translate(-50%, -50%) rotate(120deg);
    }

    .line:nth-child(6) {
        transform: translate(-50%, -50%) rotate(150deg);
    }

    .mask {
        transform: translate(-50%, -50%);

        width: 140px;
        height: 140px;
        border-radius: 50%;
        background-color: white;

    }

    .hour,
    .minute,
    .second {
        transform-origin: left center;
    }

    .hour {
        width: 40px;
        height: 6px;
        background-color: #000;
        transform: translateY(-50%) rotate(-45deg);
    }

    .minute {
        width: 50px;
        height: 6px;
        background-color: #000;
        transform: translateY(-50%);
    }

    .second {
        width: 60px;
        height: 2px;
        background-color: red;
        transform: translateY(-50%);
        animation: clock 60s steps(60) infinite;
    }

    .screw {
        border-radius: 50%;
        transform: translate(-50%, -50%);

        width: 12px;
        height: 12px;
        background-color: black;
    }

    @keyframes clock{
        to{
            transform: translateY(-50%) rotate(360deg);
        }
    }
</style>
    <!-- 表盘 -->
<div class="clock">
    <!-- 刻度线 -->
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>

    <!-- 遮罩层 -->
    <div class="mask"></div>

    <!-- 表针 -->
    <div class="hour"></div>
    <div class="minute"></div>
    <div class="second"></div>

    <!-- 螺丝 -->
    <div class="screw"></div>
</div>
```


### 11.4 动画案例
#### 案例：跑马灯

<iframe src="https://frontend-demo.a-nomad.com/animation_marquee/index.html" style="margin-top:20px;width:610px;height:112.5px;border:0" scrolling="no" />

```html{9-11,16,27-31}
<style>
    .container {
        border: 5px solid skyblue;
        width: 600px;
        height: 112.5px;
        overflow: hidden;
    }

    .container:hover ul {
        animation-play-state: paused;
    }

    ul {
        list-style: none;
        width: 2000px;
        animation: marquee 5s infinite linear;
    }

    .container li {
        float: left;
    }

    .container img {
        width: 200px;
    }

    @keyframes marquee {
        to {
            transform: translate(-1400px);
        }
    }
</style>

<div class="container">
    <ul>
        <li><img src="./images/1.jpg" alt="" /></li>
        <li><img src="./images/2.jpg" alt="" /></li>
        <li><img src="./images/3.jpg" alt="" /></li>
        <li><img src="./images/4.jpg" alt="" /></li>
        <li><img src="./images/5.jpg" alt="" /></li>
        <li><img src="./images/6.jpg" alt="" /></li>
        <li><img src="./images/7.jpg" alt="" /></li>

        <!-- 第567移动的时候,显示区域不能留白 -->
        <li><img src="./images/1.jpg" alt="" /></li>
        <li><img src="./images/2.jpg" alt="" /></li>
        <li><img src="./images/3.jpg" alt="" /></li>
    </ul>
</div>
```

#### 案例：旅游网站

[案例效果](https://frontend-demo.a-nomad.com/animation_travel/index.html)

```html{7-8,10,15,27,33,39,47,62,74,79,84,89,93-97,99-103,105-121,123,127}
<style>
    * {
        margin: 0;
        padding: 0;
    }

    html,
    body,
    .container {
        height: 100%;
    }

    .container {
        position: relative;
        background: url(./images/bg.jpg) no-repeat center 0/cover;
    }

    .cloud img {
        position: absolute;
        left: 50%;
    }

    .cloud img:first-child {
        top: 40px;
        margin-left: -260px;

        animation: cloud 1s infinite alternate linear;
    }

    .cloud img:nth-child(2) {
        top: 100px;
        margin-left: 380px;
        animation: cloud 1s .3s infinite alternate linear;
    }

    .cloud img:last-child {
        top: 160px;
        margin-left: -560px;
        animation: cloud 1s .6s infinite alternate linear;
    }

    .balloon {
        position: absolute;
        left: 50%;
        top: 20%;
        margin-left: -500px;
        animation: balloon 1s alternate infinite linear;
    }

    .giraffe {
        position: absolute;
        left: 50%;
        margin-left: 200px;
        top: 20%;
    }

    .text {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: text 1s forwards;
    }

    .landmark img {
        position: absolute;
        left: 50%;
        bottom: 70px;
        width: 100px;
    }

    .landmark img:nth-child(1) {
        margin-left: -450px;
        animation: landmark 0.8s infinite alternate;
    }

    .landmark img:nth-child(2) {
        margin-left: -200px;
        animation: landmark 0.8s 0.2s infinite alternate;
    }

    .landmark img:nth-child(3) {
        margin-left: 45px;
        animation: landmark 0.8s 0.4s infinite alternate;
    }

    .landmark img:nth-child(4) {
        margin-left: 280px;
        animation: landmark 0.8s 0.6s infinite alternate;
    }


    @keyframes cloud {
        to {
            transform: translate(50px);
        }
    }

    @keyframes balloon {
        to {
            transform: translateY(40px);
        }
    }

    @keyframes text {
        20% {
            transform: translate(-50%, -50%) scale(0);
        }

        40% {
            transform: translate(-50%, -50%) scale(1.4);
        }

        70% {
            transform: translate(-50%, -50%) scale(0.8);
        }

        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes landmark {
        to {
            transform: translateY(-30px);
        }
    }
</style>
<div class="container">
    <!-- 白云 -->
    <div class="cloud">
        <img src="images/yun1.png" />
        <img src="images/yun2.png" />
        <img src="images/yun3.png" />
    </div>

    <!-- 热气球 -->
    <div class="balloon">
        <img src="images/san.png" />
    </div>

    <!-- 长颈鹿 -->
    <div class="giraffe">
        <img src="images/lu.png" />
    </div>

    <!-- 文字 -->
    <div class="text">
        <img src="images/font1.png" />
    </div>

    <!-- 跳动文字 -->
    <div class="landmark">
        <img src="images/1.png" />
        <img src="images/2.png" />
        <img src="images/3.png" />
        <img src="images/4.png" />
    </div>
</div>
```