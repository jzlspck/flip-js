import { Flip } from "./flip";
import { IAnimateFunc, IAnimateOption, IAnimationMethods } from "./interface";

class FlipFactory implements IAnimateFunc, IAnimationMethods {
  flips?: Flip[] = [];
  constructor(
    el: HTMLElement | HTMLElement[] | NodeList | HTMLCollection | Element[],
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
  animate(param1?: IAnimateOption | (() => void), param2?: IAnimateOption): void | Promise<void> {
    if (typeof param1 === "function") {
      this.flips.forEach(flip => flip.animate(param1, param2));
    } else {
      return new Promise(resolve => {
        Promise.all(this.flips.map(flip => flip.animate(param1))).then(() => resolve());
      });
    }
  }

  pause(): void {
    this.flips.forEach(flip => flip.pause());
  }

  resume(): void {
    this.flips.forEach(flip => flip.resume());
  }
}

export {
  FlipFactory as Flip
}
