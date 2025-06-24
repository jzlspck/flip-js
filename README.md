# flip-js

#### 介绍
基于 FLIP 动画思想，处理元素结构变化的动画，并且同时处理元素样式变化引起的动画

![demo](./demo.gif)

#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  引入 flip-js

```js
import { Flip } from 'flip-js';
```

2.  创建 Flip 实例

```js
const flip = new Flip(el[, animateOptionsOrDuration][, otherStyleKeys]);
```

  - 第一个参数 `el` 是必传的，用于指定要动画的元素
  - 第二个参数 `animateOptionsOrDuration` 是可选的，用于指定动画的配置
    - 如果是对象，那么可以指定 `duration`、`easing`、`delay` 等属性
    - 如果是数字，那么会作为 `duration` 属性的值
  - 第三个参数 `otherStyleKeys` 是可选的，用于指定除了 `transform` 以外的其他样式属性，这些属性也会参与动画。需要注意的是，传入的 key 对应的样式必须支持过渡/动画。例如背景渐变颜色目前还不支持过渡

3.  自由改变元素结构，和各种 CSS 样式

```js
// 改变元素结构
parentEl.appendChild(el);

// 改变元素样式
el.style.width = '200px';
el.style.backgroundColor = 'red';
```

4.  调用实例的 animate 方法，执行动画

```js
flip.animate();
```

#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
