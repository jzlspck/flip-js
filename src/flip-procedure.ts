
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
  abstract play(onFinish: () => void): void;
  /**
   * 动画结束之后调用,支持两种风格调用方式。Promise 和 callback
   */
  animate(callback?: () => void): Promise<void> | void {
    const _animate = (fn: () => void) => {
      this.last();
      this.invert();
      this.play(fn);
    }
    if (callback && typeof callback === 'function') {
      _animate(callback);
    } else {
     return new Promise<void>(_animate);
    }
  }
}
