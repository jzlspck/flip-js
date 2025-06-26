import { Flip } from "./flip";
import { IAnimateFunc, IAnimateOption } from "./interface";

class FlipFactory implements IAnimateFunc {
  flips?: Flip[] = [];
  constructor(
    el: HTMLElement | HTMLElement[] | NodeList | HTMLCollection,
    animateOption: IAnimateOption,
    otherStyleKeys: string[] = []
  ) {
    if (el instanceof HTMLElement) {
      this.flips = [new Flip(el, animateOption, otherStyleKeys)];
    } else if (
      el instanceof NodeList ||
      el instanceof HTMLCollection ||
      Array.isArray(el)
    ) {
      for (const item of el) {
        this.flips.push(new Flip((item as HTMLElement), animateOption, otherStyleKeys));
      }
    } else {
      throw new Error("FlipFactory: el must be HTMLElement or HTMLElement[] or NodeList or HTMLCollection");
    }
  }

  animate(animateOption?: IAnimateOption): Promise<void>;
  animate(callback: () => void, animateOption?: IAnimateOption): void;
  animate(callback?: unknown, animateOption?: unknown): void | Promise<void> {
    
  }
}
