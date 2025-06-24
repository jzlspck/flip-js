class m {
  animate() {
    this.last(), this.invert(), this.play();
  }
}
const o = /* @__PURE__ */ new Set();
class y extends m {
  constructor(t, s = 300, e = []) {
    if (o.has(t))
      throw new Error("Element has been registered");
    o.add(t), super(), this.isRunning = !1, this.el = t, this.animateOption = s, this.otherStyleKeys = e, this.init();
  }
  getRect() {
    const t = getComputedStyle(this.el), s = t.transform;
    this.el.style.transform = "none";
    const e = this.el.getBoundingClientRect();
    this.el.style.transform = s;
    const r = e.top, a = e.left, i = {};
    for (const n of this.otherStyleKeys)
      n !== "transform" && (i[n] = t[n]);
    return {
      top: r,
      left: a,
      transform: s === "none" ? "" : s,
      styles: i
    };
  }
  init() {
    this.firstRect = this.getRect();
  }
  last() {
    this.lastRect = this.getRect();
  }
  invert() {
    const { left: t, top: s, transform: e, styles: r } = this.firstRect, { left: a, top: i, transform: n, styles: f } = this.lastRect, h = t - a, c = s - i;
    this.firstAnimateKeyframe = {
      ...r,
      transform: `translateX(${h}px) translateY(${c}px) ${e}`
    }, this.lastAnimateKeyframe = {
      ...f,
      transform: n
    };
  }
  play() {
    if (this.isRunning)
      return;
    this.isRunning = !0, this.el.animate([
      this.firstAnimateKeyframe,
      this.lastAnimateKeyframe
    ], this.animateOption).addEventListener("finish", () => {
      this.isRunning = !1, o.delete(this.el);
    });
  }
}
export {
  y as Flip
};
