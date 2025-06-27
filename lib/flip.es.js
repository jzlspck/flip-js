class c {
  /**
   * 动画结束之后调用回调函数,支持两种风格调用方式。Promise 和 callback
   */
  runAnimate(t) {
    const e = (i) => {
      this.last(), this.invert(), this.play(i);
    };
    if (t && typeof t == "function")
      e(t);
    else
      return new Promise(e);
  }
}
const o = /* @__PURE__ */ new WeakSet();
class y extends c {
  constructor(t, e = 300, i = []) {
    if (o.has(t))
      throw new Error("Element has been registered");
    o.add(t), super(), this.isRunning = !1, this.el = t, this.animateOption = e, this.otherStyleKeys = i, this.init();
  }
  getRect() {
    const t = getComputedStyle(this.el), e = t.transform;
    this.el.style.transform = "none";
    const i = this.el.getBoundingClientRect();
    this.el.style.transform = e;
    const s = i.top, r = i.left, a = {};
    for (const n of this.otherStyleKeys)
      n !== "transform" && (a[n] = t[n]);
    return {
      top: s,
      left: r,
      transform: e === "none" ? "" : e,
      styles: a
    };
  }
  init() {
    this.firstRect = this.getRect();
  }
  last() {
    this.lastRect = this.getRect();
  }
  invert() {
    const { left: t, top: e, transform: i, styles: s } = this.firstRect, { left: r, top: a, transform: n, styles: l } = this.lastRect, f = t - r, m = e - a;
    this.firstAnimateKeyframe = {
      ...s,
      transform: `translateX(${f}px) translateY(${m}px) ${i}`
    }, this.lastAnimateKeyframe = {
      ...l,
      transform: n
    };
  }
  play(t) {
    if (!o.has(this.el))
      throw new Error("Flip instance has been destroyed");
    if (this.isRunning)
      return;
    this.isRunning = !0;
    const e = this.el.animate([
      this.firstAnimateKeyframe,
      this.lastAnimateKeyframe
    ], this.animateOption);
    this.animation = e, e.addEventListener("finish", () => {
      this.isRunning = !1, t(), this.firstRect = this.lastRect, this.lastRect = void 0, this.firstAnimateKeyframe = void 0, this.lastAnimateKeyframe = void 0, this.animation = void 0;
    });
  }
  animate(t, e) {
    const [i, s] = this.animateFuncParamsMerge(t, e);
    return i && (this.animateOption = i), super.runAnimate(s);
  }
  /**
   * animate 函数参数归一化
   */
  animateFuncParamsMerge(t, e) {
    if (typeof t == "function")
      return [e, t];
    if (t && (typeof t == "number" || typeof t == "object"))
      return [t, void 0];
    if (t)
      throw new Error("Invalid animate params");
    return [void 0, void 0];
  }
  pause() {
    this.animation && this.animation.pause();
  }
  resume() {
    this.animation && this.animation.play();
  }
  destroy() {
    this.animation && this.animation.cancel(), o.delete(this.el), this.el = this.animateOption = this.otherStyleKeys = this.firstRect = this.lastRect = this.firstAnimateKeyframe = this.lastAnimateKeyframe = this.animation = void 0;
  }
}
export {
  y as Flip
};
