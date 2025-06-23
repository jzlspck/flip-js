import { FlipProcedure } from "./flip-procedure";
import type { IAnimateOption, IGetRect, IRect } from "./interface";

export class Flip extends FlipProcedure implements IGetRect {
  private el: HTMLElement;
  private animateOption: IAnimateOption;
  private otherStyleKeys: string[];
  private firstRect?: IRect;
  private lastRect?: IRect;
  private firstAnimateKeyframe?: Keyframe;
  private lastAnimateKeyframe?: Keyframe;
  constructor(
    el: HTMLElement,
    animateOption: IAnimateOption = 300,
    otherStyleKeys: string[] = []
  ) {
    super();
    this.el = el;
    this.animateOption = animateOption;
    this.otherStyleKeys = otherStyleKeys;
    this.init();
  }
  getRect(): IRect {
    const rect = this.el.getBoundingClientRect();
    let top = rect.top;
    let left = rect.left;
    const style = getComputedStyle(this.el);
    const transform = style.transform;
    // 记录其他需要动画的样式
    const styles = {} as { [key: string]: string };
    for (const key of this.otherStyleKeys) {
      styles[key] = style[key as any];
    }
    if (transform !== 'none') {
      // transform 的值为 matrix(a, b, c, d, e, f)
      // 求出矩阵变换前的坐标
      const { left: originLeft, top: originTop } = this.getOriginRectByMatrix(transform, left, top);

      left = originLeft;
      top = originTop;
    }

    return {
      top,
      left,
      transform: transform === 'none' ? '' : transform,
      styles
    }
  }
  getOriginRectByMatrix(transform: string, left: number, top: number): {
    left: number;
    top: number;
  } {
    console.log(transform, left, top);
    const matrix = transform.slice(7, -1).split(',').map(Number);
    const a = matrix[0];
    const b = matrix[1];
    const c = matrix[2];
    const d = matrix[3];
    const e = matrix[4];
    const f = matrix[5];
    console.log(matrix);
    const dividend = a * d - b * c;
    const x = (d * (left - e) - c * (top - f)) / dividend;
    const y = (a * (top - f) - b * (left - e)) / dividend;
    console.log(x, y);
    return {
      left: x,
      top: y
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
  play(): void {
    this.el.animate([
      this.firstAnimateKeyframe!,
      this.lastAnimateKeyframe!
    ], this.animateOption);
  }
}
