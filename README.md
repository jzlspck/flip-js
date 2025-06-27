# flip-js

#### 介绍
基于 FLIP 动画思想，处理元素结构变化的动画，并且同时处理元素样式变化引起的动画

![demo](./demo.gif)

动画只要三步：
1. 记录起始状态
2. 自由改变元素结构和样式，移动元素到要去的地方
3. 执行动画

#### 安装教程

```
npm install fan-flip-js
```

#### 使用说明

1.  引入 flip-js

```js
import { Flip } from 'fan-flip-js';
```

2.  创建 Flip 实例

```js
const flip = new Flip(el[, animateOptionsOrDuration][, otherStyleKeys]);
```

  - 第一个参数 `el` 是必传的，用于指定要动画的元素。可以是单个元素，也可以是元素组成的数组，或者 NodeList 等。
  - 第二个参数 `animateOptionsOrDuration` 是可选的，用于指定动画的配置
    - 如果是对象，那么可以指定 `duration`、`easing`、`delay` 等属性
    - 如果是数字，那么会作为 `duration` 属性的值
  - 第三个参数 `otherStyleKeys` 是可选的，用于指定除了 `transform` 以外的其他样式属性，这些属性也会参与动画。

  > 需要注意的是，传入的 key 对应的样式必须支持过渡/动画。例如 display 和背景渐变颜色目前还不支持过渡。背景渐变颜色的实现需要使用最新的 Houdini API 中的 CSS property 才能实现，这就属于另一块知识了。

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

调用 animate 方法时，可以传入参数，支持 Promise 和回调函数两种方式实现动画结束后的回调。

当第一次动画结束后，下一次调用 animate 方法时也可以传入 `animateOption`，用于指定本次动画的配置。

  - `animate(animateOption?: IAnimateOption): Promise<void>;`
  - `animate(callback: () => void, animateOption?: IAnimateOption): void;`

5. destroy 方法，销毁实例。当不再需要动画时，调用该方法销毁实例，释放内存。**这一步是必要的，为了保证一个 DOM 元素同时只能创建一个 Flip 实例，也保证了动画的正确执行和防止内存泄漏。**

```js
flip.destroy();
```

除此之外，Flip 实例还提供了以下方法：

  - `pause` 方法，暂停动画
  - `resume` 方法，恢复动画

#### 示例

这是上面 demo 的代码

```js
import { Flip } from "./flip";

const btn = document.querySelector('button')!;
const ul = document.querySelector('ul')!;
const lis = Array.from(ul.children);
btn.addEventListener('click', function() {

  const flip = new Flip(lis as HTMLElement[], 1000, ['backgroundColor', 'width']);
  lis.sort(() => Math.random() - 0.5).forEach((item) => {
    (item as HTMLElement).style.backgroundColor = getRandomColor();
    (item as HTMLElement).style.width = getRandomNumber(100, 300) + 'px';
    ul.appendChild(item);
  });

  await flip.animate();
  console.log('Animation finished');
  flip.destroy();
});

function getRandomColor() {
  return '#' + Math.random().toString(16).substring(2, 8);
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

也支持同时包含其他复杂 transform 变化（旋转，缩放）的动画，例如：

![demo2](./demo2.gif)
