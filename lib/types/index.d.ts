import { Flip } from "./flip";
import { IAnimateFunc, IAnimateOption, IAnimationMethods } from "./interface";
declare class FlipFactory implements IAnimateFunc, IAnimationMethods {
    flips?: Flip[];
    constructor(el: HTMLElement | HTMLElement[] | NodeList | HTMLCollection | Element[], animateOption: IAnimateOption, otherStyleKeys?: string[]);
    animate(animateOption?: IAnimateOption): Promise<void>;
    animate(callback: () => void, animateOption?: IAnimateOption): void;
    pause(): void;
    resume(): void;
    destroy(): void;
}
export { FlipFactory as Flip };
