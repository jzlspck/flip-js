import { FlipProcedure } from "./flip-procedure";
import type { IAnimateOption, IAnimateFunc, IAnimationMethods } from "./interface";
export declare class Flip extends FlipProcedure implements IAnimateFunc, IAnimationMethods {
    private el;
    private animateOption;
    private otherStyleKeys;
    private firstRect?;
    private lastRect?;
    private firstAnimateKeyframe?;
    private lastAnimateKeyframe?;
    private isRunning;
    private animation;
    constructor(el: HTMLElement, animateOption?: IAnimateOption, otherStyleKeys?: string[]);
    private getRect;
    init(): void;
    last(): void;
    invert(): void;
    play(onFinish: () => void): void;
    /**
     * animate 方法
     */
    animate(animateOption?: IAnimateOption): Promise<void>;
    animate(callback: () => void, animateOption?: IAnimateOption): void;
    /**
     * animate 函数参数归一化
     */
    private animateFuncParamsMerge;
    pause(): void;
    resume(): void;
    destroy(): void;
}
