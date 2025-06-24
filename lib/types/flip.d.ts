import { FlipProcedure } from "./flip-procedure";
import type { IAnimateOption, IGetRect, IRect } from "./interface";
export declare class Flip extends FlipProcedure implements IGetRect {
    private el;
    private animateOption;
    private otherStyleKeys;
    private firstRect?;
    private lastRect?;
    private firstAnimateKeyframe?;
    private lastAnimateKeyframe?;
    private isRunning;
    constructor(el: HTMLElement, animateOption?: IAnimateOption, otherStyleKeys?: string[]);
    getRect(): IRect;
    init(): void;
    last(): void;
    invert(): void;
    play(): void;
}
