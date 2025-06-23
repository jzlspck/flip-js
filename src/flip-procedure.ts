
/**
 * FLIP 动画流程 first last invert play
 */
export abstract class FlipProcedure {
  /**
   * 1. first 记录初始位置状态
   */
  abstract init(): void;
  /**
   * 2. last 记录最后位置状态
   */
  abstract last(): void;
  /**
   * 3. invert 回退到起始位置
   */
  abstract invert(): void;
  /**
   * 4. play 执行动画
   */
  abstract play(): void;
  animate(): void {
    this.last();
    this.invert();
    this.play();
  }
}
