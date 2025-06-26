import { Flip } from "./flip";
import { IAnimateFunc, IAnimateOption } from "./interface";

class FlipFactory implements IAnimateFunc {
    flips?: Flip[];
  constructor(
    el: HTMLElement | HTMLElement[] | NodeList,
    animateOption: IAnimateOption,
    otherStyleKeys: string[] = []
  ) {
    if (Array.isArray(el)) {
      this.flips = el.map(item => new Flip(item, animateOption, otherStyleKeys));
    } else {
      this.flips = [new Flip(el, animateOption, otherStyleKeys)];
    }
  }
  animate(animateOption?: IAnimateOption): Promise<void>;
  animate(callback: () => void, animateOption?: IAnimateOption): void;
  animate(callback?: unknown, animateOption?: unknown): void | Promise<void> {
      
  }
}
