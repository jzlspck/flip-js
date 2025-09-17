class p {
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
const r = /* @__PURE__ */ new WeakSet();
class l extends p {
  constructor(t, e = 300, i = []) {
    if (r.has(t))
      throw new Error("Element has been registered");
    r.add(t), super(), this.isRunning = !1, this.el = t, this.animateOption = e, this.otherStyleKeys = i, this.init();
  }
  getRect() {
    const t = getComputedStyle(this.el), e = t.transform;
    this.el.style.transform = "none";
    const i = this.el.getBoundingClientRect();
    this.el.style.transform = e;
    const s = i.top, n = i.left, o = {};
    for (const a of this.otherStyleKeys)
      a !== "transform" && (o[a] = t[a]);
    return {
      top: s,
      left: n,
      transform: e === "none" ? "" : e,
      styles: o
    };
  }
  init() {
    this.firstRect = this.getRect();
  }
  last() {
    this.lastRect = this.getRect();
  }
  invert() {
    const { left: t, top: e, transform: i, styles: s } = this.firstRect, { left: n, top: o, transform: a, styles: h } = this.lastRect, m = t - n, c = e - o;
    this.firstAnimateKeyframe = {
      ...s,
      transform: `translateX(${m}px) translateY(${c}px) ${i}`
    }, this.lastAnimateKeyframe = {
      ...h,
      transform: a
    };
  }
  play(t) {
    if (!r.has(this.el))
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
    this.animation && this.animation.cancel(), r.delete(this.el), this.el = this.animateOption = this.otherStyleKeys = this.firstRect = this.lastRect = this.firstAnimateKeyframe = this.lastAnimateKeyframe = this.animation = void 0;
  }
}
class u {
  constructor(t, e, i = []) {
    if (this.flips = [], t instanceof HTMLElement)
      this.flips = [new l(t, e, i)];
    else if (t instanceof NodeList || t instanceof HTMLCollection || Array.isArray(t))
      new Set(Array.from(t)).forEach((n) => {
        this.flips.push(new l(n, e, i));
      });
    else
      throw new Error("FlipFactory: el must be HTMLElement or HTMLElement[] or NodeList or HTMLCollection");
  }
  animate(t, e) {
    if (typeof t == "function")
      this.flips.forEach((i) => i.animate(t, e));
    else
      return new Promise((i) => {
        Promise.all(this.flips.map((s) => s.animate(t))).then(() => i());
      });
  }
  pause() {
    this.flips.forEach((t) => t.pause());
  }
  resume() {
    this.flips.forEach((t) => t.resume());
  }
  destroy() {
    this.flips.forEach((t) => t.destroy()), this.flips = [];
  }
}
export {
  u as Flip
};
