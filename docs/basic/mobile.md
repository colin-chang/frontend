# 移动Web开发

## 1. 移动端特点
PC端屏幕大一般开发网页都会固定版心居中，而移动端屏幕较小，一般网页宽度都是100%铺满屏幕。

现在主流移动设备屏幕物理分辨率都比较高，但一般情况下为了看上去体验更好，都会通过软件层面调整设备的逻辑分辨率。下面是一些常见设备的分辨率。

![常见设备分辨率](https://s2.loli.net/2023/05/03/YEHxN73CsqQdtO8.jpg)

目前开发中设计师出图多参照iPhone6/7/8分辨率。但为了兼容更高分辨率的，一般开发中设计师多会提供二倍图或多倍图。

:::tip viewport
在使用vscode等开发工具创建网页时自动在在head标签中加入类似`<meta name="viewport" content="width=device-width, initial-scale=1.0">`的一行代码，这就是我们常说的视口。它的作用是设置网页宽度与设备逻辑分辨率相同，如果不设置，移动端网页宽度则默认为980px。

`width=device-width`表示视口宽度 = 设备宽度,`initial-scale=1.0`表示缩放1倍（不缩放）。
:::

## 2. Flex布局
`Flex`布局模型是一种浏览器提倡的布局模型，它提供了强大的空间分布和对齐能力适合结构化的布局，与浮动布局相比，`Flex`布局网页更加简单灵活，也可以避免浮动带来的脱标问题，`Flex`布局也称弹性布局。

`Flex`布局是Html5的新增的内容，PC网站开发中如果不考虑老旧浏览器的兼容性问题也可以使用，与PC不同的是主流移动设备更新迭代较快，浏览器版本都比较高，几乎都支持`Flex`布局方式，故而`Flex`布局在移动Web开发中使用较多。

:::tip 流式布局
流式布局也称百分比布局，主要特定是元素高度固定，宽度自适应的。在移动互联网早期使用较多，目前开发更多追求宽高都自适应，流式布局已经较少使用。
:::

### 2.1 Flex布局模型
![Flex布局模型构成](https://s2.loli.net/2023/05/03/OBRxaIhWqcJzZfK.jpg))

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

### 2.5 弹性盒子换行与行对齐方式。
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