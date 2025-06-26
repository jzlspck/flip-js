
/**
 * 位置状态信息
 */
export interface IRect {
  left: number;
  top: number;
  transform: string;
  styles: { [key: string]: string }
}

export interface IGetRect {
  getRect(): IRect;
}

export type IAnimateOption = KeyframeAnimationOptions | number;

export interface IAnimateFunc {
  animate(animateOption?: IAnimateOption): Promise<void>;
  animate(callback: () => void, animateOption?: IAnimateOption): void;
}