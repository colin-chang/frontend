# 移动Web开发

## 1. 移动端特点

PC端屏幕大一般开发网页都会固定版心居中，而移动端屏幕较小，一般网页宽度都是100%铺满屏幕。

现在主流移动设备屏幕物理分辨率都比较高，但一般情况下为了看上去体验更好，都会通过软件层面调整设备的逻辑分辨率。下面是一些常见设备的分辨率。

![常见设备分辨率](https://s2.loli.net/2023/08/15/2Y6CdKJgZOG3m45.jpg)

目前开发中设计师出图多参照iPhone6/7/8分辨率。但为了兼容更高分辨率的，一般开发中设计师多会提供二倍图或多倍图。

:::warning viewport
在使用vscode等开发工具创建网页时自动在在head标签中加入类似`<meta name="viewport" content="width=device-width, initial-scale=1.0">`的一行代码，这就是我们常说的视口。它的作用是设置网页宽度与设备逻辑分辨率相同，如果不设置，移动端网页宽度则默认为980px。

`width=device-width`表示视口宽度 = 设备宽度,`initial-scale=1.0`表示缩放1倍（不缩放）。
:::

## 2. Flex布局

`Flex`布局模型是一种浏览器提倡的布局模型，它提供了强大的空间分布和对齐能力适合结构化的布局，与浮动布局相比，`Flex`布局网页更加简单灵活，也可以避免浮动带来的脱标问题，`Flex`布局也称弹性布局。

`Flex`布局是Html5的新增的内容，PC网站开发中如果不考虑老旧浏览器的兼容性问题也可以使用，与PC不同的是主流移动设备更新迭代较快，浏览器版本都比较高，几乎都支持`Flex`布局方式，故而`Flex`布局在移动Web开发中使用较多。

:::warning 流式布局
流式布局也称百分比布局，主要特定是元素高度固定，宽度自适应的。在移动互联网早期使用较多，目前开发更多追求宽高都自适应，流式布局已经较少使用。
:::

### 2.1 Flex布局模型

![Flex布局模型构成](https://s2.loli.net/2023/08/15/GWgDylv6tqueXY3.jpg)

`Flex`布局，需要给父级(**直接父级**)元素添加`display:flex`，此时元素称之为弹性容器(`flex container`)，子元素称之为弹性盒子(`flex item`)。弹性盒子会默认情况下自动挤压或拉伸后展示在一行。

默认水平方向称为主轴(`main axis`)垂直方向称为交叉轴/侧轴(`cross axis`)。

`float`布局中，如果子元素超过了父容器的宽度则会自动折行，而`Flex`布局中如果弹性盒子总宽度超出了弹性容器会自动挤压到弹性容器能容纳的最大宽度。

### 2.2 对齐方式

使用`float`布局将元素横向排列后，需要通过`margin/padding`来调解盒子之间的间距和对齐方式，而`Flex`布局中则默认提供了多种实用的对齐方式来灵活实现弹性盒子的布局。

#### 2.2.1 主轴对齐方式

使用`justify-content`属性可以设置弹性容器的主轴对齐方式。

属性值|作用
:-|:-
`flex-start`|默认值，起点开始依次排列(左对齐)
`flex-end`|终点开始依次排列(右对齐)
`center`|沿主轴居中排列(居中对齐)
`space-around`|弹性盒子沿主轴均匀排列，空白间距均分在弹性盒子两侧
`space-between`|弹性盒子沿主轴均匀排列，空白间距均分在相邻盒子之间
`space-evenly`|弹性盒子沿主轴均匀排列，弹性盒子与容器之间间距相等

弹性盒子不设宽度则默认宽度为内容宽度。

#### 2.2.2 交叉轴对齐方式

使用`align-items`属性可以设置**弹性容器**的交叉轴对齐方式。

除了可以整体设置弹性容器的交叉轴对齐方式外，也可以通过单独给**弹性盒子**添加`align-self`属性控制其自身在交叉轴的对齐方式，取值内容与`align-items`相同。

属性值|作用
:-|:-
`flex-start`|(弹性盒子固定高度)默认值，起点开始依次排列(顶对齐)
`flex-end`|终点开始依次排列(底对齐)
`center`|沿侧轴居中排列(居中对齐)
`stretch`|(弹性盒子无固定高度)默认值，弹性盒子沿着主轴线被拉伸至铺满容器

弹性盒子不设高度则默认会拉伸填满弹性容器。

### 2.3 主轴方向

主轴默认在水平方向，我们可以通过设置`flex-direction`来修改主轴方向，使`flex`弹性容器内元素按指定方向排列，如纵向排列。
当修改了主轴方向后，交叉轴会自动跟着改变，始终保持与主轴垂直。

属性值|效果
:-|:-
`row`|水平方向，从左向右（默认）
`column`|垂直方向，从上向下
`row-reverse`|水平方向，从右向左
`column-reverse`|垂直方向，从下向上

### 2.4 弹性伸缩比

弹性伸缩比用来控制弹性盒子的主轴方向的尺寸。

设置弹性盒子的`flex`属性(正整数值)，可以让设置`flex`属性的所有弹性盒子按照`flex`值设定的比例均分弹性容器剩余(去掉固定宽度和间距的损耗)的尺寸并铺满弹性容器。`flex`值表示占用父级剩余尺寸的份数。

如弹性容器宽度360，第一个盒子固定100宽度,每个盒子左右间距共20，另外两个盒子`flex`分别设为1和2，那么后面两个盒子会按照1:2均分剩余的240宽度，即第二个盒子宽度80，最后一个盒子160。

#### 案例：订单确认页面布局

<iframe src="https://frontend-demo.a-nomad.com/flex_xtx/index.html" style="margin-top:20px;width:375px;height:667px;border:1px solid #ccc;" scrolling="no" />

```html{3-4,8,11,14,24-26}
<style>
    .user-info {
        display: flex;
        align-items: center;
        padding: 15px 0 15px 11px;
    }
    .user-info .user{
        flex: 1;
    }
    .user-info .user .contact {
        display: flex;
    }
    .user-info .edit {
        /* 未标明尺寸的手指可点击区域一般设为44x44（经验值，保证手指可覆盖） */
        width: 44px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        color: #808080;
    }
    .payment {
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
<div class="main">
    <div class="pannel user-info">
        <div class="location">
            <i class="iconfont icon-round_location_fill"></i>
        </div>
        <div class="user">
            <div class="contact">
                <h5>林丽</h5>
                <p>18500667882</p>
            </div>
            <div class="address">北京市 海淀区 中关村软件园 信息科技大厦1号
                楼410#
            </div>
        </div>
        <div class="edit">
            <i class="iconfont icon-youjiantou"></i>
        </div>
    </div>
</div>
<div class="payment">
    <div class="money">
        合计: <span class="text-danger">￥<i>266.00</i></span>
    </div>
    <div class="pay">
        <a href="#">去支付</a>
    </div>
</div>
```

### 2.5 弹性盒子换行与行对齐方式

弹性盒子可以自动挤压或拉伸，默认情况下，所有弹性盒子都在一行显示。可以通过`flex-wrap`来设置其换行方式。当设置为`wrap`时，弹性容器中一行放不下子元素后会自动折行，与`float`效果类似。

属性值|效果
:-|:-
`wrap`|换行
`nowrap`|不换行（默认）

当弹性盒子换行显示时，多行之间会存在间距，可以使用`align-content`属性来调整行对齐方式，其取值与`justify-content`基本相同，这里不在赘述。

### 2.6 文字省略

正常情况下要使溢出文字显示省略号设置如下样式即可：

```css
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```

但如果文字所在父级是一个`flex`弹性盒子，弹性盒子的内容会被不换行的文字撑开，此时要显式设定父级宽度才能使`overflow:hidden`生效，一般情况下我们可以设定`width:0`,同时设置`flex`属性让父级自动选择宽度。

```html{15-16}
<style>
    .container {
        display: flex;
        align-items: center;
        width: 300px;
    }

    .container .pic {
        width: 120px;
        height: 120px;
        background-color: pink;
    }

    .container .content {
        flex: 1;
        width: 0;
    }

    .container .content p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
<div class="container">
    <div class="pic">123</div>
    <div class="content">
        <h4>不能说的秘密</h4>
        <p>你说把爱渐渐放下会走更远，又何必去改变已错过的时间</p>
    </div>
</div>
```

## 3. 移动适配

移动适配的主要目标是根据不同屏幕分辨率对网页元素进行等比例的尺寸调整，以达到近乎一致的浏览体验。

一般在PC端网站开发中最常用的单位就像素(px),像素是一个绝对单位，不论什么屏幕一像素的大小是固定的，因此无法使用其进行移动适配，但是因为PC分辨率一般较高，且大多PC站设计都采用版心居中的方式，不同分辨率通常表现为版心两侧留白的大小不同。

移动开发适配需要借助一些相对尺寸单位，来实现开发中设置相同尺寸但在实际浏览过程中会根据用户使用设备分辨率来展示为不同的尺寸。目前常用的解决方案有`rem`和`vw/vh`两种，前者出现较早有大量企业使用，后者出现较晚但使用更加简便，很多企业逐步由`rem`方案转为`vw/vh`方案，B站的手机站就采用了`vw`方案进行移动适配。

### 3.1 rem方案

`rem`是一种相对于根字号（html标签的字体大小）的尺寸单位，**`1rem=1HTML字号大小`**。

我们在开发过程为元素设置相同的`rem`尺寸，借助`rem`相对单位的特性，我们只需要根据不同分辨率设置不同的网页根字号大小就可以实现元素动态物理尺寸来达到移动适配效果。

#### 3.1.1 rem换算

一般情况下在`rem`布局方案中，我们通常将网页分成10等份，**根字号设置视口宽度的1/10**即可，如视口尺寸375px，那根字号通常设为37.5px，此时1rem=37.5px。

实际开发中，多数设计稿是基于375px的2倍图，开发中我们只需要在设计稿查看工具（如PxCook等）中预览设计稿时设为2倍图模式，视口宽度就会显示为375px，此时元素尺寸都是基于375px视口宽度的且单位是像素，此时1rem=37.5px，我们只需要将元素像素尺寸除以37.5就可以得到其`rem`尺寸了。

**rem尺寸 = px尺寸/(视口宽度 * 1/10) = px尺寸/根字号**。

#### 3.1.2 媒体查询

css中媒体查询可以监测不同分辨率来设置不同样式，`rem`方案就是借助媒体查询设置不同根字号大小来实现移动适配的，在响应式布局中也大量使用媒体查询来进行样式调整。

媒体查询使用非常简单，简化语法结构如下：

```css
/* 语法 */
@media(媒体特性){
    选择器{
        CSS属性
    }
}

/* 示例 */
@media(width:375px){
    html{
        font-size:37.5px;
    }
}
```

以上示例表示当浏览器视口宽度为375px时将网页根字号设置为37.5px。

#### 3.1.3 flexible

了解了以上原理后，我们只需要根据不同视口宽度设置对应媒体查询就可以实现`rem方案`了，但视口宽度是不确定，我们无法为每一种视口宽度都写一个媒体查询，这就需要借助js来动态侦测视口宽度并调整对应根字号大小，目前主流的方案是使用手淘项目组开源的[flexible js](https://github.com/amfe/lib-flexible)，其功能就是根据不同的视口宽度给网页中html根节点设置不同的`font-size`。

`flexible js`使用方式非常简单，安装并引入js文件即可，这里就不再赘述了。

#### 3.1.4 Less

在采用`rem`方案时，我们总是要将设计稿的像素尺寸除以根字号才能得到rem尺寸，但css并不支持数据计算，每次手动计算是不实际的，我们可以借助Less/Sass等CSS扩展库实现，这里我们采用相对简单的Less。

Less是一个CSS预处理器,它扩充了 CSS 语言, 使 CSS 具备一定的逻辑性、计算能力，甚至可以使用很多类似js的用法，less文件开发完成后会编译成css供调用者使用。

less功能非常强大，这里我们不展开讲解了，如有需要可以到[Less中文网](https://less.bootcss.com/)系统学习，只记录些许常用的注意事项。

* 单行注释不会编译到最终css文件中，但块注释会。
* less 4.0及之后版本计算除法需要放到小括号中或使用`./`。如 `width:(100/37.5rem);`
* `&`符号表示当前选择器，并不会生成后代选择器，通常配合伪类或伪元素使用。
* 在less文件第一行添加: `// out: false`可以禁用当前less文件导出。`// out: 目录或文件`则可以将当前less文件导出到指定目录下或导出为指定文件名。

#### 案例：订单确认页面布局rem版

下面我们使用rem方案来重构一下 [2.4章节中的案例](#案例-订单确认页面布局)。

```less{1,5,16-17,19}
@rootFontSize: 37.5rem;
.user-info {
    display: flex;
    align-items: center;
    padding: (15/@rootFontSize) 0 (15/@rootFontSize) (11/@rootFontSize);

    .user {
        flex: 1;
    
        .contact {
            display: flex;
        }
    }

    .edit {
        width: (44/@rootFontSize);
        height: (44/@rootFontSize);
        text-align: center;
        line-height: (44/@rootFontSize);
        color: #808080;
    }
}
.payment {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

```html{1}
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<div class="main">
    <div class="pannel user-info">
        <div class="location">
            <i class="iconfont icon-round_location_fill"></i>
        </div>
        <div class="user">
            <div class="contact">
                <h5>林丽</h5>
                <p>18500667882</p>
            </div>
            <div class="address">北京市 海淀区 中关村软件园 信息科技大厦1号
                楼410#
            </div>
        </div>
        <div class="edit">
            <i class="iconfont icon-youjiantou"></i>
        </div>
    </div>
</div>
<div class="payment">
    <div class="money">
        合计: <span class="text-danger">￥<i>266.00</i></span>
    </div>
    <div class="pay">
        <a href="#">去支付</a>
    </div>
</div>
<script src="./js/index.min.js"></script>
```

### 3.2 vw/vh方案

`vw/vh`方案与`rem`方案非常类似，`vw/vh`也是相对单位，不过它是相对于视口的尺寸，`vw`相对于视口宽度，`vh`则是相对于视口高度。

一般情况下在`vw/vh`布局方案中，`vw/vh`尺寸是当前视口宽度/高度的1/100，如视口尺寸 (375 x 667)px，，此时1rem=37.5px。此时1vw=3.75px,1vh=6.67px。如果设计稿宽度是375px，我们只需要将元素像素尺寸除以3.75就可以得到其`vw`尺寸，`vh`计算也是同理。

开发中可以使用`vw`和`vh`，但不建议混用，因为有设全面屏设备存在刘海屏，混用会导致盒子变形，一般设计稿宽度多采用固定宽度，建议直接使用`vw`即可。

视口宽高是由浏览器自动检测的，不需要我们使用媒体查询或者引入其它库来计算，因此使用起来比`rem`更加简便。

案例：订单确认页面布局vw版

```less{1,5,16-17,19}
@vw: 3.75vw;
.user-info {
    display: flex;
    align-items: center;
    padding: (15/@vw) 0 (15/@vw) (11/@vw);

    .user {
        flex: 1;
    
        .contact {
            display: flex;
        }
    }

    .edit {
        width: (44/@vw);
        height: (44/@vw);
        text-align: center;
        line-height: (44/@vw);
        color: #808080;
    }
}
.payment {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

```html
<div class="main">
    <div class="pannel user-info">
        <div class="location">
            <i class="iconfont icon-round_location_fill"></i>
        </div>
        <div class="user">
            <div class="contact">
                <h5>林丽</h5>
                <p>18500667882</p>
            </div>
            <div class="address">北京市 海淀区 中关村软件园 信息科技大厦1号
                楼410#
            </div>
        </div>
        <div class="edit">
            <i class="iconfont icon-youjiantou"></i>
        </div>
    </div>
</div>
<div class="payment">
    <div class="money">
        合计: <span class="text-danger">￥<i>266.00</i></span>
    </div>
    <div class="pay">
        <a href="#">去支付</a>
    </div>
</div>
```

## 4. 响应式

除了专门开发手机站做移动适配外，一些内容较少的网站（如企业站等）可以直接选择做响应式。响应式就是根据不同的视口尺寸改变网页内容的布局方式，将相同的内容展示在不同尺寸的设备屏幕上。

### 4.1 媒体查询

既然要适配不同的视口尺寸，就自然会用到媒体查询，我们在[rem方案](#_3-1-2-媒体查询)中简单介绍过了媒体查询的基本用法，这里我们做一单简单的补充以满足响应式布局要求。

响应是布局并不会为每个尺寸的视口都调整不同的内容布局方式，而是在不同视口区间范围内展示不同的布局方式。常见的视口划分如下：

视口宽度区间|设备屏幕
:-|:-
[,576)|超小屏
[576,768)|小屏幕
[768,992)|中等屏
[992,1200)|大屏
[1200,)|超大屏

我们可以根据以上屏幕尺寸区间来书写不同媒体查询：

```css
@media(max-width:576px){
    ...
}
@media(max-width:768px){
    ...
}
@media(max-width:992px){
    ...
}
@media(max-width:1200px){
    ...
}
@media(min-width:1200px){
    ...
}
```

因为css具有层叠写，后面书写的媒体查询会层叠前面的，因此以上媒体查询必须按顺序书写。

媒体查询完整写入为：`@media 关键词 媒体类型 and 媒体特性）{ CSS代码 }`

* 关键词包含 `and/only/not`
* 媒体类型是用来区分设备类型的，如屏幕设备、打印设备等，其中手机、电脑、平板都属于屏幕设备。

    类型名称|值|描述
    :-|:-|:-
    屏幕|`screen`|带屏幕的设备
    打印预览|`print`|打印预览模式
    阅读器|`speech`|屏幕阅读模式
    不区分类型|`all`|默认值，包括以上3种情形

* 媒体特性主要用来描述媒体类型的具体特征，如当前屏幕的宽高、分辨率、横屏或竖屏等

    特性名称|属性|值  
    :-|:-|:-
    视口的宽和高|`width/height`|数值
    视口最大宽或高|`max-width/max-height`|数值
    视口最小宽或高|`min-width/min-height`|数值
    屏幕方向|`orientation`|`portrait`:竖屏,`landscape`: 横屏

除了定义在css中，媒体查询还可以使用外链引入，语法如下:
`<link rel="stylesheet" media="逻辑符 媒体类型 and (媒体特性)" href="xx.css">`

```html
<!-- 根据视口宽度引用不同css文件 -->
<link rel="stylesheet" media="(max-width:768px)" href="small.css">
<link rel="stylesheet" media="(max-width:992px)" href="medium.css">
```

### 4.2 Bootstrap

在响应式开发中我们并不会手动书写大量的媒体查询，通常我们会借助于类似于Bootstrap等流行的响应式框架来进行快速开发，其使用方式也非常简单，这里不做详述了，有需要的效果版可以参阅[Bootstrap中文网](https://www.bootcss.com/)学习。
