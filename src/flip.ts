import { FlipProcedure } from "./flip-procedure";
import type { IAnimateOption, IGetRect, IRect } from "./interface";

/**
 * 记录所有被注册的元素 每个元素只能被同时注册一次
 */
const ElSet = new Set<HTMLElement>();

export class Flip extends FlipProcedure implements IGetRect {
  private el: HTMLElement;
  private animateOption: IAnimateOption;
  private otherStyleKeys: string[];
  private firstRect?: IRect;
  private lastRect?: IRect;
  private firstAnimateKeyframe?: Keyframe;
  private lastAnimateKeyframe?: Keyframe;
  private isRunning: boolean = false;
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
  getRect(): IRect {
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
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    const animation = this.el.animate([
      this.firstAnimateKeyframe!,
      this.lastAnimateKeyframe!
    ], this.animateOption);

    animation.addEventListener('finish', () => {
      this.isRunning = false;
      ElSet.delete(this.el);
      onFinish();
    });
  }
}
