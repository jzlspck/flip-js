import { FlipProcedure } from "./flip-procedure";
import type { IAnimateOption, IRect, IAnimateFunc, IAnimationMethods } from "./interface";

/**
 * 记录所有被注册的元素 每个元素只能被同时注册一次
 */
const ElSet = new WeakSet<HTMLElement>();

export class Flip extends FlipProcedure implements IAnimateFunc, IAnimationMethods {
  private el: HTMLElement;
  private animateOption: IAnimateOption;
  private otherStyleKeys: string[];
  private firstRect?: IRect;
  private lastRect?: IRect;
  private firstAnimateKeyframe?: Keyframe;
  private lastAnimateKeyframe?: Keyframe;
  private isRunning: boolean = false;
  private animation: Animation;
  constructor(
    el: HTMLElement,
    animateOption: IAnimateOption = 300,
    otherStyleKeys: string[] = []
  ) {
    if (ElSet.has(el)) {
      throw new Error('Element has been registered');
    }
    ElSet.add(el);
    super();
    this.el = el;
    this.animateOption = animateOption;
    this.otherStyleKeys = otherStyleKeys;
    this.init();
  }
  private getRect(): IRect {
    const style = getComputedStyle(this.el);
    const transform = style.transform;
    // 先将元素的 transform 置为 none
    this.el.style.transform = 'none';
    // 得到变换前的位置值
    const rect = this.el.getBoundingClientRect();
    // 恢复元素的 transform 值
    this.el.style.transform = transform;
    
    const top = rect.top;
    const left = rect.left;
    // 记录其他需要动画的样式
    const styles = {} as { [key: string]: string };
    for (const key of this.otherStyleKeys) {
      if (key === 'transform') {
        continue;
      }
      styles[key] = style[key as any];
    }

    return {
      top,
      left,
      transform: transform === 'none' ? '' : transform,
      styles
    }
  }
  init(): void {
    this.firstRect = this.getRect();
  }
  last(): void {
    this.lastRect = this.getRect();
  }
  invert(): void {
    const { left, top, transform, styles } = this.firstRect!;
    const { left: lastLeft, top: lastTop, transform: lastTransform, styles: lastStyles } = this.lastRect!;
    const diffX = left - lastLeft;
    const diffY = top - lastTop;

    this.firstAnimateKeyframe = {
      ...styles,
      transform: `translateX(${diffX}px) translateY(${diffY}px) ${transform}`
    }
    this.lastAnimateKeyframe = {
      ...lastStyles,
      transform: lastTransform
    }
  }
  play(onFinish: () => void): void {
    if (!ElSet.has(this.el)) {
      throw new Error('Flip instance has been destroyed');
    }
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    const animation = this.el.animate([
      this.firstAnimateKeyframe!,
      this.lastAnimateKeyframe!
    ], this.animateOption);

    this.animation = animation;

    animation.addEventListener('finish', () => {
      this.isRunning = false;
      // 动画结束的回调
      onFinish();
      // 清空数据，更新 firstRect 用于下一次动画
      this.firstRect = this.lastRect;
      this.lastRect = undefined;
      this.firstAnimateKeyframe = undefined;
      this.lastAnimateKeyframe = undefined;
    });
  }

  /**
   * animate 方法
   */
  animate(animateOption?: IAnimateOption): Promise<void>;
  animate(callback: () => void, animateOption?: IAnimateOption): void;
  animate(params1?: IAnimateOption | (() => void), params2?: IAnimateOption): void | Promise<void> {
    const [animateOption, callback] = this.animateFuncParamsMerge(params1, params2);
    // 如果有新的配置项，更新配置
    if (animateOption) {
      this.animateOption = animateOption;
    }
    return super.runAnimate(callback);
  }
  /**
   * animate 函数参数归一化
   */
  private animateFuncParamsMerge(params1?: IAnimateOption | (() => void), params2?: IAnimateOption): [IAnimateOption | undefined, (() => void) | undefined] {
    if (typeof params1 === 'function') {
      const callback = params1;
      const animateOption = params2;
      return [animateOption, callback];
    } else if (!!params1 && (typeof(params1) === 'number' || typeof(params1) === 'object')) {
      const animateOption = params1;
      return [animateOption, undefined];
    } else if (!params1) {
      return [undefined, undefined];
    } else {
      throw new Error('Invalid animate params');
    }
  }

  pause(): void {
    if (this.animation) {
      this.animation.pause();
    }
  }

  resume(): void {
    if (this.animation) {
      this.animation.play();
    }
  }

  destroy(): void {
    if (this.animation) {
      this.animation.cancel();
    }
    ElSet.delete(this.el);
    this.el =
    this.animateOption =
    this.otherStyleKeys =
    this.firstRect =
    this.lastRect =
    this.firstAnimateKeyframe =
    this.lastAnimateKeyframe =
    this.animation = undefined;
  }
}
