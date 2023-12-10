var Mx = Object.defineProperty
var Nx = (t, e, r) => (e in t ? Mx(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r))
var li = (t, e, r) => (Nx(t, typeof e != 'symbol' ? e + '' : e, r), r)
;(function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) o(l)
  new MutationObserver((l) => {
    for (const u of l)
      if (u.type === 'childList')
        for (const f of u.addedNodes) f.tagName === 'LINK' && f.rel === 'modulepreload' && o(f)
  }).observe(document, { childList: !0, subtree: !0 })
  function r(l) {
    const u = {}
    return (
      l.integrity && (u.integrity = l.integrity),
      l.referrerPolicy && (u.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === 'use-credentials'
        ? (u.credentials = 'include')
        : l.crossOrigin === 'anonymous'
          ? (u.credentials = 'omit')
          : (u.credentials = 'same-origin'),
      u
    )
  }
  function o(l) {
    if (l.ep) return
    l.ep = !0
    const u = r(l)
    fetch(l.href, u)
  }
})()
function Xf(t, e) {
  const r = Object.create(null),
    o = t.split(',')
  for (let l = 0; l < o.length; l++) r[o[l]] = !0
  return e ? (l) => !!r[l.toLowerCase()] : (l) => !!r[l]
}
const xe = {},
  Io = [],
  er = () => {},
  Px = () => !1,
  Ox = /^on[^a-z]/,
  pc = (t) => Ox.test(t),
  Yf = (t) => t.startsWith('onUpdate:'),
  Oe = Object.assign,
  Zf = (t, e) => {
    const r = t.indexOf(e)
    r > -1 && t.splice(r, 1)
  },
  $x = Object.prototype.hasOwnProperty,
  se = (t, e) => $x.call(t, e),
  Rt = Array.isArray,
  Fo = (t) => gc(t) === '[object Map]',
  fm = (t) => gc(t) === '[object Set]',
  Wt = (t) => typeof t == 'function',
  ze = (t) => typeof t == 'string',
  Jf = (t) => typeof t == 'symbol',
  be = (t) => t !== null && typeof t == 'object',
  hm = (t) => be(t) && Wt(t.then) && Wt(t.catch),
  dm = Object.prototype.toString,
  gc = (t) => dm.call(t),
  Dx = (t) => gc(t).slice(8, -1),
  pm = (t) => gc(t) === '[object Object]',
  Qf = (t) => ze(t) && t !== 'NaN' && t[0] !== '-' && '' + parseInt(t, 10) === t,
  Ml = Xf(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  vc = (t) => {
    const e = Object.create(null)
    return (r) => e[r] || (e[r] = t(r))
  },
  Rx = /-(\w)/g,
  yr = vc((t) => t.replace(Rx, (e, r) => (r ? r.toUpperCase() : ''))),
  zx = /\B([A-Z])/g,
  io = vc((t) => t.replace(zx, '-$1').toLowerCase()),
  mc = vc((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  Du = vc((t) => (t ? `on${mc(t)}` : '')),
  oa = (t, e) => !Object.is(t, e),
  Nl = (t, e) => {
    for (let r = 0; r < t.length; r++) t[r](e)
  },
  Bl = (t, e, r) => {
    Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: r })
  },
  rf = (t) => {
    const e = parseFloat(t)
    return isNaN(e) ? t : e
  },
  gm = (t) => {
    const e = ze(t) ? Number(t) : NaN
    return isNaN(e) ? t : e
  }
let Yp
const of = () =>
  Yp ||
  (Yp =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function En(t) {
  if (Rt(t)) {
    const e = {}
    for (let r = 0; r < t.length; r++) {
      const o = t[r],
        l = ze(o) ? Hx(o) : En(o)
      if (l) for (const u in l) e[u] = l[u]
    }
    return e
  } else {
    if (ze(t)) return t
    if (be(t)) return t
  }
}
const Ix = /;(?![^(]*\))/g,
  Fx = /:([^]+)/,
  qx = /\/\*[^]*?\*\//g
function Hx(t) {
  const e = {}
  return (
    t
      .replace(qx, '')
      .split(Ix)
      .forEach((r) => {
        if (r) {
          const o = r.split(Fx)
          o.length > 1 && (e[o[0].trim()] = o[1].trim())
        }
      }),
    e
  )
}
function ve(t) {
  let e = ''
  if (ze(t)) e = t
  else if (Rt(t))
    for (let r = 0; r < t.length; r++) {
      const o = ve(t[r])
      o && (e += o + ' ')
    }
  else if (be(t)) for (const r in t) t[r] && (e += r + ' ')
  return e.trim()
}
const Bx = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Wx = Xf(Bx)
function vm(t) {
  return !!t || t === ''
}
const te = (t) =>
    ze(t)
      ? t
      : t == null
        ? ''
        : Rt(t) || (be(t) && (t.toString === dm || !Wt(t.toString)))
          ? JSON.stringify(t, mm, 2)
          : String(t),
  mm = (t, e) =>
    e && e.__v_isRef
      ? mm(t, e.value)
      : Fo(e)
        ? { [`Map(${e.size})`]: [...e.entries()].reduce((r, [o, l]) => ((r[`${o} =>`] = l), r), {}) }
        : fm(e)
          ? { [`Set(${e.size})`]: [...e.values()] }
          : be(e) && !Rt(e) && !pm(e)
            ? String(e)
            : e
let $n
class Ux {
  constructor(e = !1) {
    ;(this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = $n),
      !e && $n && (this.index = ($n.scopes || ($n.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(e) {
    if (this._active) {
      const r = $n
      try {
        return ($n = this), e()
      } finally {
        $n = r
      }
    }
  }
  on() {
    $n = this
  }
  off() {
    $n = this.parent
  }
  stop(e) {
    if (this._active) {
      let r, o
      for (r = 0, o = this.effects.length; r < o; r++) this.effects[r].stop()
      for (r = 0, o = this.cleanups.length; r < o; r++) this.cleanups[r]()
      if (this.scopes) for (r = 0, o = this.scopes.length; r < o; r++) this.scopes[r].stop(!0)
      if (!this.detached && this.parent && !e) {
        const l = this.parent.scopes.pop()
        l && l !== this && ((this.parent.scopes[this.index] = l), (l.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function jx(t, e = $n) {
  e && e.active && e.effects.push(t)
}
function ym() {
  return $n
}
function Gx(t) {
  $n && $n.cleanups.push(t)
}
const th = (t) => {
    const e = new Set(t)
    return (e.w = 0), (e.n = 0), e
  },
  bm = (t) => (t.w & Si) > 0,
  wm = (t) => (t.n & Si) > 0,
  Vx = ({ deps: t }) => {
    if (t.length) for (let e = 0; e < t.length; e++) t[e].w |= Si
  },
  Kx = (t) => {
    const { deps: e } = t
    if (e.length) {
      let r = 0
      for (let o = 0; o < e.length; o++) {
        const l = e[o]
        bm(l) && !wm(l) ? l.delete(t) : (e[r++] = l), (l.w &= ~Si), (l.n &= ~Si)
      }
      e.length = r
    }
  },
  Wl = new WeakMap()
let Ks = 0,
  Si = 1
const sf = 30
let Jn
const Xi = Symbol(''),
  af = Symbol('')
class eh {
  constructor(e, r = null, o) {
    ;(this.fn = e), (this.scheduler = r), (this.active = !0), (this.deps = []), (this.parent = void 0), jx(this, o)
  }
  run() {
    if (!this.active) return this.fn()
    let e = Jn,
      r = wi
    for (; e; ) {
      if (e === this) return
      e = e.parent
    }
    try {
      return (this.parent = Jn), (Jn = this), (wi = !0), (Si = 1 << ++Ks), Ks <= sf ? Vx(this) : Zp(this), this.fn()
    } finally {
      Ks <= sf && Kx(this),
        (Si = 1 << --Ks),
        (Jn = this.parent),
        (wi = r),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    Jn === this ? (this.deferStop = !0) : this.active && (Zp(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function Zp(t) {
  const { deps: e } = t
  if (e.length) {
    for (let r = 0; r < e.length; r++) e[r].delete(t)
    e.length = 0
  }
}
let wi = !0
const xm = []
function os() {
  xm.push(wi), (wi = !1)
}
function ss() {
  const t = xm.pop()
  wi = t === void 0 ? !0 : t
}
function Mn(t, e, r) {
  if (wi && Jn) {
    let o = Wl.get(t)
    o || Wl.set(t, (o = new Map()))
    let l = o.get(r)
    l || o.set(r, (l = th())), _m(l)
  }
}
function _m(t, e) {
  let r = !1
  Ks <= sf ? wm(t) || ((t.n |= Si), (r = !bm(t))) : (r = !t.has(Jn)), r && (t.add(Jn), Jn.deps.push(t))
}
function Fr(t, e, r, o, l, u) {
  const f = Wl.get(t)
  if (!f) return
  let h = []
  if (e === 'clear') h = [...f.values()]
  else if (r === 'length' && Rt(t)) {
    const d = Number(o)
    f.forEach((g, v) => {
      ;(v === 'length' || v >= d) && h.push(g)
    })
  } else
    switch ((r !== void 0 && h.push(f.get(r)), e)) {
      case 'add':
        Rt(t) ? Qf(r) && h.push(f.get('length')) : (h.push(f.get(Xi)), Fo(t) && h.push(f.get(af)))
        break
      case 'delete':
        Rt(t) || (h.push(f.get(Xi)), Fo(t) && h.push(f.get(af)))
        break
      case 'set':
        Fo(t) && h.push(f.get(Xi))
        break
    }
  if (h.length === 1) h[0] && lf(h[0])
  else {
    const d = []
    for (const g of h) g && d.push(...g)
    lf(th(d))
  }
}
function lf(t, e) {
  const r = Rt(t) ? t : [...t]
  for (const o of r) o.computed && Jp(o)
  for (const o of r) o.computed || Jp(o)
}
function Jp(t, e) {
  ;(t !== Jn || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run())
}
function Xx(t, e) {
  var r
  return (r = Wl.get(t)) == null ? void 0 : r.get(e)
}
const Yx = Xf('__proto__,__v_isRef,__isVue'),
  Sm = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((t) => t !== 'arguments' && t !== 'caller')
      .map((t) => Symbol[t])
      .filter(Jf),
  ),
  Zx = nh(),
  Jx = nh(!1, !0),
  Qx = nh(!0),
  Qp = t1()
function t1() {
  const t = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((e) => {
      t[e] = function (...r) {
        const o = ae(this)
        for (let u = 0, f = this.length; u < f; u++) Mn(o, 'get', u + '')
        const l = o[e](...r)
        return l === -1 || l === !1 ? o[e](...r.map(ae)) : l
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((e) => {
      t[e] = function (...r) {
        os()
        const o = ae(this)[e].apply(this, r)
        return ss(), o
      }
    }),
    t
  )
}
function e1(t) {
  const e = ae(this)
  return Mn(e, 'has', t), e.hasOwnProperty(t)
}
function nh(t = !1, e = !1) {
  return function (o, l, u) {
    if (l === '__v_isReactive') return !t
    if (l === '__v_isReadonly') return t
    if (l === '__v_isShallow') return e
    if (l === '__v_raw' && u === (t ? (e ? m1 : Lm) : e ? Em : Tm).get(o)) return o
    const f = Rt(o)
    if (!t) {
      if (f && se(Qp, l)) return Reflect.get(Qp, l, u)
      if (l === 'hasOwnProperty') return e1
    }
    const h = Reflect.get(o, l, u)
    return (Jf(l) ? Sm.has(l) : Yx(l)) || (t || Mn(o, 'get', l), e)
      ? h
      : Ee(h)
        ? f && Qf(l)
          ? h
          : h.value
        : be(h)
          ? t
            ? bc(h)
            : zn(h)
          : h
  }
}
const n1 = km(),
  r1 = km(!0)
function km(t = !1) {
  return function (r, o, l, u) {
    let f = r[o]
    if (Ko(f) && Ee(f) && !Ee(l)) return !1
    if (!t && (!Ul(l) && !Ko(l) && ((f = ae(f)), (l = ae(l))), !Rt(r) && Ee(f) && !Ee(l))) return (f.value = l), !0
    const h = Rt(r) && Qf(o) ? Number(o) < r.length : se(r, o),
      d = Reflect.set(r, o, l, u)
    return r === ae(u) && (h ? oa(l, f) && Fr(r, 'set', o, l) : Fr(r, 'add', o, l)), d
  }
}
function i1(t, e) {
  const r = se(t, e)
  t[e]
  const o = Reflect.deleteProperty(t, e)
  return o && r && Fr(t, 'delete', e, void 0), o
}
function o1(t, e) {
  const r = Reflect.has(t, e)
  return (!Jf(e) || !Sm.has(e)) && Mn(t, 'has', e), r
}
function s1(t) {
  return Mn(t, 'iterate', Rt(t) ? 'length' : Xi), Reflect.ownKeys(t)
}
const Cm = { get: Zx, set: n1, deleteProperty: i1, has: o1, ownKeys: s1 },
  a1 = {
    get: Qx,
    set(t, e) {
      return !0
    },
    deleteProperty(t, e) {
      return !0
    },
  },
  l1 = Oe({}, Cm, { get: Jx, set: r1 }),
  rh = (t) => t,
  yc = (t) => Reflect.getPrototypeOf(t)
function gl(t, e, r = !1, o = !1) {
  t = t.__v_raw
  const l = ae(t),
    u = ae(e)
  r || (e !== u && Mn(l, 'get', e), Mn(l, 'get', u))
  const { has: f } = yc(l),
    h = o ? rh : r ? ah : sa
  if (f.call(l, e)) return h(t.get(e))
  if (f.call(l, u)) return h(t.get(u))
  t !== l && t.get(e)
}
function vl(t, e = !1) {
  const r = this.__v_raw,
    o = ae(r),
    l = ae(t)
  return e || (t !== l && Mn(o, 'has', t), Mn(o, 'has', l)), t === l ? r.has(t) : r.has(t) || r.has(l)
}
function ml(t, e = !1) {
  return (t = t.__v_raw), !e && Mn(ae(t), 'iterate', Xi), Reflect.get(t, 'size', t)
}
function tg(t) {
  t = ae(t)
  const e = ae(this)
  return yc(e).has.call(e, t) || (e.add(t), Fr(e, 'add', t, t)), this
}
function eg(t, e) {
  e = ae(e)
  const r = ae(this),
    { has: o, get: l } = yc(r)
  let u = o.call(r, t)
  u || ((t = ae(t)), (u = o.call(r, t)))
  const f = l.call(r, t)
  return r.set(t, e), u ? oa(e, f) && Fr(r, 'set', t, e) : Fr(r, 'add', t, e), this
}
function ng(t) {
  const e = ae(this),
    { has: r, get: o } = yc(e)
  let l = r.call(e, t)
  l || ((t = ae(t)), (l = r.call(e, t))), o && o.call(e, t)
  const u = e.delete(t)
  return l && Fr(e, 'delete', t, void 0), u
}
function rg() {
  const t = ae(this),
    e = t.size !== 0,
    r = t.clear()
  return e && Fr(t, 'clear', void 0, void 0), r
}
function yl(t, e) {
  return function (o, l) {
    const u = this,
      f = u.__v_raw,
      h = ae(f),
      d = e ? rh : t ? ah : sa
    return !t && Mn(h, 'iterate', Xi), f.forEach((g, v) => o.call(l, d(g), d(v), u))
  }
}
function bl(t, e, r) {
  return function (...o) {
    const l = this.__v_raw,
      u = ae(l),
      f = Fo(u),
      h = t === 'entries' || (t === Symbol.iterator && f),
      d = t === 'keys' && f,
      g = l[t](...o),
      v = r ? rh : e ? ah : sa
    return (
      !e && Mn(u, 'iterate', d ? af : Xi),
      {
        next() {
          const { value: b, done: x } = g.next()
          return x ? { value: b, done: x } : { value: h ? [v(b[0]), v(b[1])] : v(b), done: x }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function ci(t) {
  return function (...e) {
    return t === 'delete' ? !1 : this
  }
}
function c1() {
  const t = {
      get(u) {
        return gl(this, u)
      },
      get size() {
        return ml(this)
      },
      has: vl,
      add: tg,
      set: eg,
      delete: ng,
      clear: rg,
      forEach: yl(!1, !1),
    },
    e = {
      get(u) {
        return gl(this, u, !1, !0)
      },
      get size() {
        return ml(this)
      },
      has: vl,
      add: tg,
      set: eg,
      delete: ng,
      clear: rg,
      forEach: yl(!1, !0),
    },
    r = {
      get(u) {
        return gl(this, u, !0)
      },
      get size() {
        return ml(this, !0)
      },
      has(u) {
        return vl.call(this, u, !0)
      },
      add: ci('add'),
      set: ci('set'),
      delete: ci('delete'),
      clear: ci('clear'),
      forEach: yl(!0, !1),
    },
    o = {
      get(u) {
        return gl(this, u, !0, !0)
      },
      get size() {
        return ml(this, !0)
      },
      has(u) {
        return vl.call(this, u, !0)
      },
      add: ci('add'),
      set: ci('set'),
      delete: ci('delete'),
      clear: ci('clear'),
      forEach: yl(!0, !0),
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((u) => {
      ;(t[u] = bl(u, !1, !1)), (r[u] = bl(u, !0, !1)), (e[u] = bl(u, !1, !0)), (o[u] = bl(u, !0, !0))
    }),
    [t, r, e, o]
  )
}
const [u1, f1, h1, d1] = c1()
function ih(t, e) {
  const r = e ? (t ? d1 : h1) : t ? f1 : u1
  return (o, l, u) =>
    l === '__v_isReactive'
      ? !t
      : l === '__v_isReadonly'
        ? t
        : l === '__v_raw'
          ? o
          : Reflect.get(se(r, l) && l in o ? r : o, l, u)
}
const p1 = { get: ih(!1, !1) },
  g1 = { get: ih(!1, !0) },
  v1 = { get: ih(!0, !1) },
  Tm = new WeakMap(),
  Em = new WeakMap(),
  Lm = new WeakMap(),
  m1 = new WeakMap()
function y1(t) {
  switch (t) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function b1(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : y1(Dx(t))
}
function zn(t) {
  return Ko(t) ? t : oh(t, !1, Cm, p1, Tm)
}
function w1(t) {
  return oh(t, !1, l1, g1, Em)
}
function bc(t) {
  return oh(t, !0, a1, v1, Lm)
}
function oh(t, e, r, o, l) {
  if (!be(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t
  const u = l.get(t)
  if (u) return u
  const f = b1(t)
  if (f === 0) return t
  const h = new Proxy(t, f === 2 ? o : r)
  return l.set(t, h), h
}
function qo(t) {
  return Ko(t) ? qo(t.__v_raw) : !!(t && t.__v_isReactive)
}
function Ko(t) {
  return !!(t && t.__v_isReadonly)
}
function Ul(t) {
  return !!(t && t.__v_isShallow)
}
function Am(t) {
  return qo(t) || Ko(t)
}
function ae(t) {
  const e = t && t.__v_raw
  return e ? ae(e) : t
}
function sh(t) {
  return Bl(t, '__v_skip', !0), t
}
const sa = (t) => (be(t) ? zn(t) : t),
  ah = (t) => (be(t) ? bc(t) : t)
function lh(t) {
  wi && Jn && ((t = ae(t)), _m(t.dep || (t.dep = th())))
}
function ch(t, e) {
  t = ae(t)
  const r = t.dep
  r && lf(r)
}
function Ee(t) {
  return !!(t && t.__v_isRef === !0)
}
function Kt(t) {
  return Mm(t, !1)
}
function as(t) {
  return Mm(t, !0)
}
function Mm(t, e) {
  return Ee(t) ? t : new x1(t, e)
}
class x1 {
  constructor(e, r) {
    ;(this.__v_isShallow = r),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = r ? e : ae(e)),
      (this._value = r ? e : sa(e))
  }
  get value() {
    return lh(this), this._value
  }
  set value(e) {
    const r = this.__v_isShallow || Ul(e) || Ko(e)
    ;(e = r ? e : ae(e)), oa(e, this._rawValue) && ((this._rawValue = e), (this._value = r ? e : sa(e)), ch(this))
  }
}
function G(t) {
  return Ee(t) ? t.value : t
}
const _1 = {
  get: (t, e, r) => G(Reflect.get(t, e, r)),
  set: (t, e, r, o) => {
    const l = t[e]
    return Ee(l) && !Ee(r) ? ((l.value = r), !0) : Reflect.set(t, e, r, o)
  },
}
function Nm(t) {
  return qo(t) ? t : new Proxy(t, _1)
}
class S1 {
  constructor(e) {
    ;(this.dep = void 0), (this.__v_isRef = !0)
    const { get: r, set: o } = e(
      () => lh(this),
      () => ch(this),
    )
    ;(this._get = r), (this._set = o)
  }
  get value() {
    return this._get()
  }
  set value(e) {
    this._set(e)
  }
}
function k1(t) {
  return new S1(t)
}
function C1(t) {
  const e = Rt(t) ? new Array(t.length) : {}
  for (const r in t) e[r] = Pm(t, r)
  return e
}
class T1 {
  constructor(e, r, o) {
    ;(this._object = e), (this._key = r), (this._defaultValue = o), (this.__v_isRef = !0)
  }
  get value() {
    const e = this._object[this._key]
    return e === void 0 ? this._defaultValue : e
  }
  set value(e) {
    this._object[this._key] = e
  }
  get dep() {
    return Xx(ae(this._object), this._key)
  }
}
class E1 {
  constructor(e) {
    ;(this._getter = e), (this.__v_isRef = !0), (this.__v_isReadonly = !0)
  }
  get value() {
    return this._getter()
  }
}
function uh(t, e, r) {
  return Ee(t) ? t : Wt(t) ? new E1(t) : be(t) && arguments.length > 1 ? Pm(t, e, r) : Kt(t)
}
function Pm(t, e, r) {
  const o = t[e]
  return Ee(o) ? o : new T1(t, e, r)
}
class L1 {
  constructor(e, r, o, l) {
    ;(this._setter = r),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new eh(e, () => {
        this._dirty || ((this._dirty = !0), ch(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !l),
      (this.__v_isReadonly = o)
  }
  get value() {
    const e = ae(this)
    return lh(e), (e._dirty || !e._cacheable) && ((e._dirty = !1), (e._value = e.effect.run())), e._value
  }
  set value(e) {
    this._setter(e)
  }
}
function A1(t, e, r = !1) {
  let o, l
  const u = Wt(t)
  return u ? ((o = t), (l = er)) : ((o = t.get), (l = t.set)), new L1(o, l, u || !l, r)
}
function xi(t, e, r, o) {
  let l
  try {
    l = o ? t(...o) : t()
  } catch (u) {
    _a(u, e, r)
  }
  return l
}
function Wn(t, e, r, o) {
  if (Wt(t)) {
    const u = xi(t, e, r, o)
    return (
      u &&
        hm(u) &&
        u.catch((f) => {
          _a(f, e, r)
        }),
      u
    )
  }
  const l = []
  for (let u = 0; u < t.length; u++) l.push(Wn(t[u], e, r, o))
  return l
}
function _a(t, e, r, o = !0) {
  const l = e ? e.vnode : null
  if (e) {
    let u = e.parent
    const f = e.proxy,
      h = r
    for (; u; ) {
      const g = u.ec
      if (g) {
        for (let v = 0; v < g.length; v++) if (g[v](t, f, h) === !1) return
      }
      u = u.parent
    }
    const d = e.appContext.config.errorHandler
    if (d) {
      xi(d, null, 10, [t, f, h])
      return
    }
  }
  M1(t, r, l, o)
}
function M1(t, e, r, o = !0) {
  console.error(t)
}
let aa = !1,
  cf = !1
const nn = []
let dr = 0
const Ho = []
let Or = null,
  Ui = 0
const Om = Promise.resolve()
let fh = null
function qr(t) {
  const e = fh || Om
  return t ? e.then(this ? t.bind(this) : t) : e
}
function N1(t) {
  let e = dr + 1,
    r = nn.length
  for (; e < r; ) {
    const o = (e + r) >>> 1
    la(nn[o]) < t ? (e = o + 1) : (r = o)
  }
  return e
}
function hh(t) {
  ;(!nn.length || !nn.includes(t, aa && t.allowRecurse ? dr + 1 : dr)) &&
    (t.id == null ? nn.push(t) : nn.splice(N1(t.id), 0, t), $m())
}
function $m() {
  !aa && !cf && ((cf = !0), (fh = Om.then(zm)))
}
function P1(t) {
  const e = nn.indexOf(t)
  e > dr && nn.splice(e, 1)
}
function Dm(t) {
  Rt(t) ? Ho.push(...t) : (!Or || !Or.includes(t, t.allowRecurse ? Ui + 1 : Ui)) && Ho.push(t), $m()
}
function ig(t, e = aa ? dr + 1 : 0) {
  for (; e < nn.length; e++) {
    const r = nn[e]
    r && r.pre && (nn.splice(e, 1), e--, r())
  }
}
function Rm(t) {
  if (Ho.length) {
    const e = [...new Set(Ho)]
    if (((Ho.length = 0), Or)) {
      Or.push(...e)
      return
    }
    for (Or = e, Or.sort((r, o) => la(r) - la(o)), Ui = 0; Ui < Or.length; Ui++) Or[Ui]()
    ;(Or = null), (Ui = 0)
  }
}
const la = (t) => (t.id == null ? 1 / 0 : t.id),
  O1 = (t, e) => {
    const r = la(t) - la(e)
    if (r === 0) {
      if (t.pre && !e.pre) return -1
      if (e.pre && !t.pre) return 1
    }
    return r
  }
function zm(t) {
  ;(cf = !1), (aa = !0), nn.sort(O1)
  const e = er
  try {
    for (dr = 0; dr < nn.length; dr++) {
      const r = nn[dr]
      r && r.active !== !1 && xi(r, null, 14)
    }
  } finally {
    ;(dr = 0), (nn.length = 0), Rm(), (aa = !1), (fh = null), (nn.length || Ho.length) && zm()
  }
}
function $1(t, e, ...r) {
  if (t.isUnmounted) return
  const o = t.vnode.props || xe
  let l = r
  const u = e.startsWith('update:'),
    f = u && e.slice(7)
  if (f && f in o) {
    const v = `${f === 'modelValue' ? 'model' : f}Modifiers`,
      { number: b, trim: x } = o[v] || xe
    x && (l = r.map((S) => (ze(S) ? S.trim() : S))), b && (l = r.map(rf))
  }
  let h,
    d = o[(h = Du(e))] || o[(h = Du(yr(e)))]
  !d && u && (d = o[(h = Du(io(e)))]), d && Wn(d, t, 6, l)
  const g = o[h + 'Once']
  if (g) {
    if (!t.emitted) t.emitted = {}
    else if (t.emitted[h]) return
    ;(t.emitted[h] = !0), Wn(g, t, 6, l)
  }
}
function Im(t, e, r = !1) {
  const o = e.emitsCache,
    l = o.get(t)
  if (l !== void 0) return l
  const u = t.emits
  let f = {},
    h = !1
  if (!Wt(t)) {
    const d = (g) => {
      const v = Im(g, e, !0)
      v && ((h = !0), Oe(f, v))
    }
    !r && e.mixins.length && e.mixins.forEach(d), t.extends && d(t.extends), t.mixins && t.mixins.forEach(d)
  }
  return !u && !h
    ? (be(t) && o.set(t, null), null)
    : (Rt(u) ? u.forEach((d) => (f[d] = null)) : Oe(f, u), be(t) && o.set(t, f), f)
}
function wc(t, e) {
  return !t || !pc(e)
    ? !1
    : ((e = e.slice(2).replace(/Once$/, '')), se(t, e[0].toLowerCase() + e.slice(1)) || se(t, io(e)) || se(t, e))
}
let Ze = null,
  xc = null
function jl(t) {
  const e = Ze
  return (Ze = t), (xc = (t && t.type.__scopeId) || null), e
}
function Fm(t) {
  xc = t
}
function qm() {
  xc = null
}
const D1 = (t) => Yt
function Yt(t, e = Ze, r) {
  if (!e || t._n) return t
  const o = (...l) => {
    o._d && vg(-1)
    const u = jl(e)
    let f
    try {
      f = t(...l)
    } finally {
      jl(u), o._d && vg(1)
    }
    return f
  }
  return (o._n = !0), (o._c = !0), (o._d = !0), o
}
function Ru(t) {
  const {
    type: e,
    vnode: r,
    proxy: o,
    withProxy: l,
    props: u,
    propsOptions: [f],
    slots: h,
    attrs: d,
    emit: g,
    render: v,
    renderCache: b,
    data: x,
    setupState: S,
    ctx: M,
    inheritAttrs: T,
  } = t
  let N, E
  const L = jl(t)
  try {
    if (r.shapeFlag & 4) {
      const A = l || o
      ;(N = Zn(v.call(A, A, b, u, S, x, M))), (E = d)
    } else {
      const A = e
      ;(N = Zn(A.length > 1 ? A(u, { attrs: d, slots: h, emit: g }) : A(u, null))), (E = e.props ? d : z1(d))
    }
  } catch (A) {
    ;(ta.length = 0), _a(A, t, 1), (N = qt(Ln))
  }
  let F = N
  if (E && T !== !1) {
    const A = Object.keys(E),
      { shapeFlag: B } = F
    A.length && B & 7 && (f && A.some(Yf) && (E = I1(E, f)), (F = ki(F, E)))
  }
  return (
    r.dirs && ((F = ki(F)), (F.dirs = F.dirs ? F.dirs.concat(r.dirs) : r.dirs)),
    r.transition && (F.transition = r.transition),
    (N = F),
    jl(L),
    N
  )
}
function R1(t) {
  let e
  for (let r = 0; r < t.length; r++) {
    const o = t[r]
    if (ua(o)) {
      if (o.type !== Ln || o.children === 'v-if') {
        if (e) return
        e = o
      }
    } else return
  }
  return e
}
const z1 = (t) => {
    let e
    for (const r in t) (r === 'class' || r === 'style' || pc(r)) && ((e || (e = {}))[r] = t[r])
    return e
  },
  I1 = (t, e) => {
    const r = {}
    for (const o in t) (!Yf(o) || !(o.slice(9) in e)) && (r[o] = t[o])
    return r
  }
function F1(t, e, r) {
  const { props: o, children: l, component: u } = t,
    { props: f, children: h, patchFlag: d } = e,
    g = u.emitsOptions
  if (e.dirs || e.transition) return !0
  if (r && d >= 0) {
    if (d & 1024) return !0
    if (d & 16) return o ? og(o, f, g) : !!f
    if (d & 8) {
      const v = e.dynamicProps
      for (let b = 0; b < v.length; b++) {
        const x = v[b]
        if (f[x] !== o[x] && !wc(g, x)) return !0
      }
    }
  } else return (l || h) && (!h || !h.$stable) ? !0 : o === f ? !1 : o ? (f ? og(o, f, g) : !0) : !!f
  return !1
}
function og(t, e, r) {
  const o = Object.keys(e)
  if (o.length !== Object.keys(t).length) return !0
  for (let l = 0; l < o.length; l++) {
    const u = o[l]
    if (e[u] !== t[u] && !wc(r, u)) return !0
  }
  return !1
}
function dh({ vnode: t, parent: e }, r) {
  for (; e && e.subTree === t; ) ((t = e.vnode).el = r), (e = e.parent)
}
const q1 = (t) => t.__isSuspense,
  H1 = {
    name: 'Suspense',
    __isSuspense: !0,
    process(t, e, r, o, l, u, f, h, d, g) {
      t == null ? W1(e, r, o, l, u, f, h, d, g) : U1(t, e, r, o, l, f, h, d, g)
    },
    hydrate: j1,
    create: ph,
    normalize: G1,
  },
  B1 = H1
function ca(t, e) {
  const r = t.props && t.props[e]
  Wt(r) && r()
}
function W1(t, e, r, o, l, u, f, h, d) {
  const {
      p: g,
      o: { createElement: v },
    } = d,
    b = v('div'),
    x = (t.suspense = ph(t, l, o, e, b, r, u, f, h, d))
  g(null, (x.pendingBranch = t.ssContent), b, null, o, x, u, f),
    x.deps > 0
      ? (ca(t, 'onPending'), ca(t, 'onFallback'), g(null, t.ssFallback, e, r, o, null, u, f), Bo(x, t.ssFallback))
      : x.resolve(!1, !0)
}
function U1(t, e, r, o, l, u, f, h, { p: d, um: g, o: { createElement: v } }) {
  const b = (e.suspense = t.suspense)
  ;(b.vnode = e), (e.el = t.el)
  const x = e.ssContent,
    S = e.ssFallback,
    { activeBranch: M, pendingBranch: T, isInFallback: N, isHydrating: E } = b
  if (T)
    (b.pendingBranch = x),
      pr(x, T)
        ? (d(T, x, b.hiddenContainer, null, l, b, u, f, h),
          b.deps <= 0 ? b.resolve() : N && (d(M, S, r, o, l, null, u, f, h), Bo(b, S)))
        : (b.pendingId++,
          E ? ((b.isHydrating = !1), (b.activeBranch = T)) : g(T, l, b),
          (b.deps = 0),
          (b.effects.length = 0),
          (b.hiddenContainer = v('div')),
          N
            ? (d(null, x, b.hiddenContainer, null, l, b, u, f, h),
              b.deps <= 0 ? b.resolve() : (d(M, S, r, o, l, null, u, f, h), Bo(b, S)))
            : M && pr(x, M)
              ? (d(M, x, r, o, l, b, u, f, h), b.resolve(!0))
              : (d(null, x, b.hiddenContainer, null, l, b, u, f, h), b.deps <= 0 && b.resolve()))
  else if (M && pr(x, M)) d(M, x, r, o, l, b, u, f, h), Bo(b, x)
  else if (
    (ca(e, 'onPending'),
    (b.pendingBranch = x),
    b.pendingId++,
    d(null, x, b.hiddenContainer, null, l, b, u, f, h),
    b.deps <= 0)
  )
    b.resolve()
  else {
    const { timeout: L, pendingId: F } = b
    L > 0
      ? setTimeout(() => {
          b.pendingId === F && b.fallback(S)
        }, L)
      : L === 0 && b.fallback(S)
  }
}
function ph(t, e, r, o, l, u, f, h, d, g, v = !1) {
  const {
    p: b,
    m: x,
    um: S,
    n: M,
    o: { parentNode: T, remove: N },
  } = g
  let E
  const L = K1(t)
  L && e != null && e.pendingBranch && ((E = e.pendingId), e.deps++)
  const F = t.props ? gm(t.props.timeout) : void 0,
    A = {
      vnode: t,
      parent: e,
      parentComponent: r,
      isSVG: f,
      container: o,
      hiddenContainer: l,
      anchor: u,
      deps: 0,
      pendingId: 0,
      timeout: typeof F == 'number' ? F : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: v,
      isUnmounted: !1,
      effects: [],
      resolve(B = !1, tt = !1) {
        const {
          vnode: ft,
          activeBranch: X,
          pendingBranch: st,
          pendingId: ot,
          effects: kt,
          parentComponent: pt,
          container: V,
        } = A
        if (A.isHydrating) A.isHydrating = !1
        else if (!B) {
          const H = X && st.transition && st.transition.mode === 'out-in'
          H &&
            (X.transition.afterLeave = () => {
              ot === A.pendingId && x(st, V, W, 0)
            })
          let { anchor: W } = A
          X && ((W = M(X)), S(X, pt, A, !0)), H || x(st, V, W, 0)
        }
        Bo(A, st), (A.pendingBranch = null), (A.isInFallback = !1)
        let R = A.parent,
          k = !1
        for (; R; ) {
          if (R.pendingBranch) {
            R.effects.push(...kt), (k = !0)
            break
          }
          R = R.parent
        }
        k || Dm(kt),
          (A.effects = []),
          L && e && e.pendingBranch && E === e.pendingId && (e.deps--, e.deps === 0 && !tt && e.resolve()),
          ca(ft, 'onResolve')
      },
      fallback(B) {
        if (!A.pendingBranch) return
        const { vnode: tt, activeBranch: ft, parentComponent: X, container: st, isSVG: ot } = A
        ca(tt, 'onFallback')
        const kt = M(ft),
          pt = () => {
            A.isInFallback && (b(null, B, st, kt, X, null, ot, h, d), Bo(A, B))
          },
          V = B.transition && B.transition.mode === 'out-in'
        V && (ft.transition.afterLeave = pt), (A.isInFallback = !0), S(ft, X, null, !0), V || pt()
      },
      move(B, tt, ft) {
        A.activeBranch && x(A.activeBranch, B, tt, ft), (A.container = B)
      },
      next() {
        return A.activeBranch && M(A.activeBranch)
      },
      registerDep(B, tt) {
        const ft = !!A.pendingBranch
        ft && A.deps++
        const X = B.vnode.el
        B.asyncDep
          .catch((st) => {
            _a(st, B, 0)
          })
          .then((st) => {
            if (B.isUnmounted || A.isUnmounted || A.pendingId !== B.suspenseId) return
            B.asyncResolved = !0
            const { vnode: ot } = B
            yf(B, st, !1), X && (ot.el = X)
            const kt = !X && B.subTree.el
            tt(B, ot, T(X || B.subTree.el), X ? null : M(B.subTree), A, f, d),
              kt && N(kt),
              dh(B, ot.el),
              ft && --A.deps === 0 && A.resolve()
          })
      },
      unmount(B, tt) {
        ;(A.isUnmounted = !0),
          A.activeBranch && S(A.activeBranch, r, B, tt),
          A.pendingBranch && S(A.pendingBranch, r, B, tt)
      },
    }
  return A
}
function j1(t, e, r, o, l, u, f, h, d) {
  const g = (e.suspense = ph(e, o, r, t.parentNode, document.createElement('div'), null, l, u, f, h, !0)),
    v = d(t, (g.pendingBranch = e.ssContent), r, g, u, f)
  return g.deps === 0 && g.resolve(!1, !0), v
}
function G1(t) {
  const { shapeFlag: e, children: r } = t,
    o = e & 32
  ;(t.ssContent = sg(o ? r.default : r)), (t.ssFallback = o ? sg(r.fallback) : qt(Ln))
}
function sg(t) {
  let e
  if (Wt(t)) {
    const r = Xo && t._c
    r && ((t._d = !1), ct()), (t = t()), r && ((t._d = !0), (e = Bn), o0())
  }
  return Rt(t) && (t = R1(t)), (t = Zn(t)), e && !t.dynamicChildren && (t.dynamicChildren = e.filter((r) => r !== t)), t
}
function V1(t, e) {
  e && e.pendingBranch ? (Rt(t) ? e.effects.push(...t) : e.effects.push(t)) : Dm(t)
}
function Bo(t, e) {
  t.activeBranch = e
  const { vnode: r, parentComponent: o } = t,
    l = (r.el = e.el)
  o && o.subTree === r && ((o.vnode.el = l), dh(o, l))
}
function K1(t) {
  var e
  return ((e = t.props) == null ? void 0 : e.suspensible) != null && t.props.suspensible !== !1
}
function gh(t, e) {
  return vh(t, null, e)
}
const wl = {}
function Re(t, e, r) {
  return vh(t, e, r)
}
function vh(t, e, { immediate: r, deep: o, flush: l, onTrack: u, onTrigger: f } = xe) {
  var h
  const d = ym() === ((h = je) == null ? void 0 : h.scope) ? je : null
  let g,
    v = !1,
    b = !1
  if (
    (Ee(t)
      ? ((g = () => t.value), (v = Ul(t)))
      : qo(t)
        ? ((g = () => t), (o = !0))
        : Rt(t)
          ? ((b = !0),
            (v = t.some((A) => qo(A) || Ul(A))),
            (g = () =>
              t.map((A) => {
                if (Ee(A)) return A.value
                if (qo(A)) return Gi(A)
                if (Wt(A)) return xi(A, d, 2)
              })))
          : Wt(t)
            ? e
              ? (g = () => xi(t, d, 2))
              : (g = () => {
                  if (!(d && d.isUnmounted)) return x && x(), Wn(t, d, 3, [S])
                })
            : (g = er),
    e && o)
  ) {
    const A = g
    g = () => Gi(A())
  }
  let x,
    S = (A) => {
      x = L.onStop = () => {
        xi(A, d, 4)
      }
    },
    M
  if (fa)
    if (((S = er), e ? r && Wn(e, d, 3, [g(), b ? [] : void 0, S]) : g(), l === 'sync')) {
      const A = H_()
      M = A.__watcherHandles || (A.__watcherHandles = [])
    } else return er
  let T = b ? new Array(t.length).fill(wl) : wl
  const N = () => {
    if (L.active)
      if (e) {
        const A = L.run()
        ;(o || v || (b ? A.some((B, tt) => oa(B, T[tt])) : oa(A, T))) &&
          (x && x(), Wn(e, d, 3, [A, T === wl ? void 0 : b && T[0] === wl ? [] : T, S]), (T = A))
      } else L.run()
  }
  N.allowRecurse = !!e
  let E
  l === 'sync'
    ? (E = N)
    : l === 'post'
      ? (E = () => Sn(N, d && d.suspense))
      : ((N.pre = !0), d && (N.id = d.uid), (E = () => hh(N)))
  const L = new eh(g, E)
  e ? (r ? N() : (T = L.run())) : l === 'post' ? Sn(L.run.bind(L), d && d.suspense) : L.run()
  const F = () => {
    L.stop(), d && d.scope && Zf(d.scope.effects, L)
  }
  return M && M.push(F), F
}
function X1(t, e, r) {
  const o = this.proxy,
    l = ze(t) ? (t.includes('.') ? Hm(o, t) : () => o[t]) : t.bind(o, o)
  let u
  Wt(e) ? (u = e) : ((u = e.handler), (r = e))
  const f = je
  Yo(this)
  const h = vh(l, u.bind(o), r)
  return f ? Yo(f) : Yi(), h
}
function Hm(t, e) {
  const r = e.split('.')
  return () => {
    let o = t
    for (let l = 0; l < r.length && o; l++) o = o[r[l]]
    return o
  }
}
function Gi(t, e) {
  if (!be(t) || t.__v_skip || ((e = e || new Set()), e.has(t))) return t
  if ((e.add(t), Ee(t))) Gi(t.value, e)
  else if (Rt(t)) for (let r = 0; r < t.length; r++) Gi(t[r], e)
  else if (fm(t) || Fo(t))
    t.forEach((r) => {
      Gi(r, e)
    })
  else if (pm(t)) for (const r in t) Gi(t[r], e)
  return t
}
function rn(t, e) {
  const r = Ze
  if (r === null) return t
  const o = Tc(r) || r.proxy,
    l = t.dirs || (t.dirs = [])
  for (let u = 0; u < e.length; u++) {
    let [f, h, d, g = xe] = e[u]
    f &&
      (Wt(f) && (f = { mounted: f, updated: f }),
      f.deep && Gi(h),
      l.push({ dir: f, instance: o, value: h, oldValue: void 0, arg: d, modifiers: g }))
  }
  return t
}
function Fi(t, e, r, o) {
  const l = t.dirs,
    u = e && e.dirs
  for (let f = 0; f < l.length; f++) {
    const h = l[f]
    u && (h.oldValue = u[f].value)
    let d = h.dir[o]
    d && (os(), Wn(d, r, 8, [t.el, h, t, e]), ss())
  }
}
function Y1() {
  const t = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
  return (
    ls(() => {
      t.isMounted = !0
    }),
    Gm(() => {
      t.isUnmounting = !0
    }),
    t
  )
}
const Hn = [Function, Array],
  Bm = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Hn,
    onEnter: Hn,
    onAfterEnter: Hn,
    onEnterCancelled: Hn,
    onBeforeLeave: Hn,
    onLeave: Hn,
    onAfterLeave: Hn,
    onLeaveCancelled: Hn,
    onBeforeAppear: Hn,
    onAppear: Hn,
    onAfterAppear: Hn,
    onAppearCancelled: Hn,
  },
  Z1 = {
    name: 'BaseTransition',
    props: Bm,
    setup(t, { slots: e }) {
      const r = Sa(),
        o = Y1()
      let l
      return () => {
        const u = e.default && Um(e.default(), !0)
        if (!u || !u.length) return
        let f = u[0]
        if (u.length > 1) {
          for (const T of u)
            if (T.type !== Ln) {
              f = T
              break
            }
        }
        const h = ae(t),
          { mode: d } = h
        if (o.isLeaving) return zu(f)
        const g = ag(f)
        if (!g) return zu(f)
        const v = uf(g, h, o, r)
        ff(g, v)
        const b = r.subTree,
          x = b && ag(b)
        let S = !1
        const { getTransitionKey: M } = g.type
        if (M) {
          const T = M()
          l === void 0 ? (l = T) : T !== l && ((l = T), (S = !0))
        }
        if (x && x.type !== Ln && (!pr(g, x) || S)) {
          const T = uf(x, h, o, r)
          if ((ff(x, T), d === 'out-in'))
            return (
              (o.isLeaving = !0),
              (T.afterLeave = () => {
                ;(o.isLeaving = !1), r.update.active !== !1 && r.update()
              }),
              zu(f)
            )
          d === 'in-out' &&
            g.type !== Ln &&
            (T.delayLeave = (N, E, L) => {
              const F = Wm(o, x)
              ;(F[String(x.key)] = x),
                (N._leaveCb = () => {
                  E(), (N._leaveCb = void 0), delete v.delayedLeave
                }),
                (v.delayedLeave = L)
            })
        }
        return f
      }
    },
  },
  J1 = Z1
function Wm(t, e) {
  const { leavingVNodes: r } = t
  let o = r.get(e.type)
  return o || ((o = Object.create(null)), r.set(e.type, o)), o
}
function uf(t, e, r, o) {
  const {
      appear: l,
      mode: u,
      persisted: f = !1,
      onBeforeEnter: h,
      onEnter: d,
      onAfterEnter: g,
      onEnterCancelled: v,
      onBeforeLeave: b,
      onLeave: x,
      onAfterLeave: S,
      onLeaveCancelled: M,
      onBeforeAppear: T,
      onAppear: N,
      onAfterAppear: E,
      onAppearCancelled: L,
    } = e,
    F = String(t.key),
    A = Wm(r, t),
    B = (X, st) => {
      X && Wn(X, o, 9, st)
    },
    tt = (X, st) => {
      const ot = st[1]
      B(X, st), Rt(X) ? X.every((kt) => kt.length <= 1) && ot() : X.length <= 1 && ot()
    },
    ft = {
      mode: u,
      persisted: f,
      beforeEnter(X) {
        let st = h
        if (!r.isMounted)
          if (l) st = T || h
          else return
        X._leaveCb && X._leaveCb(!0)
        const ot = A[F]
        ot && pr(t, ot) && ot.el._leaveCb && ot.el._leaveCb(), B(st, [X])
      },
      enter(X) {
        let st = d,
          ot = g,
          kt = v
        if (!r.isMounted)
          if (l) (st = N || d), (ot = E || g), (kt = L || v)
          else return
        let pt = !1
        const V = (X._enterCb = (R) => {
          pt || ((pt = !0), R ? B(kt, [X]) : B(ot, [X]), ft.delayedLeave && ft.delayedLeave(), (X._enterCb = void 0))
        })
        st ? tt(st, [X, V]) : V()
      },
      leave(X, st) {
        const ot = String(t.key)
        if ((X._enterCb && X._enterCb(!0), r.isUnmounting)) return st()
        B(b, [X])
        let kt = !1
        const pt = (X._leaveCb = (V) => {
          kt || ((kt = !0), st(), V ? B(M, [X]) : B(S, [X]), (X._leaveCb = void 0), A[ot] === t && delete A[ot])
        })
        ;(A[ot] = t), x ? tt(x, [X, pt]) : pt()
      },
      clone(X) {
        return uf(X, e, r, o)
      },
    }
  return ft
}
function zu(t) {
  if (_c(t)) return (t = ki(t)), (t.children = null), t
}
function ag(t) {
  return _c(t) ? (t.children ? t.children[0] : void 0) : t
}
function ff(t, e) {
  t.shapeFlag & 6 && t.component
    ? ff(t.component.subTree, e)
    : t.shapeFlag & 128
      ? ((t.ssContent.transition = e.clone(t.ssContent)), (t.ssFallback.transition = e.clone(t.ssFallback)))
      : (t.transition = e)
}
function Um(t, e = !1, r) {
  let o = [],
    l = 0
  for (let u = 0; u < t.length; u++) {
    let f = t[u]
    const h = r == null ? f.key : String(r) + String(f.key != null ? f.key : u)
    f.type === fe
      ? (f.patchFlag & 128 && l++, (o = o.concat(Um(f.children, e, h))))
      : (e || f.type !== Ln) && o.push(h != null ? ki(f, { key: h }) : f)
  }
  if (l > 1) for (let u = 0; u < o.length; u++) o[u].patchFlag = -2
  return o
}
function re(t, e) {
  return Wt(t) ? (() => Oe({ name: t.name }, e, { setup: t }))() : t
}
const Js = (t) => !!t.type.__asyncLoader,
  _c = (t) => t.type.__isKeepAlive
function Q1(t, e) {
  jm(t, 'a', e)
}
function t_(t, e) {
  jm(t, 'da', e)
}
function jm(t, e, r = je) {
  const o =
    t.__wdc ||
    (t.__wdc = () => {
      let l = r
      for (; l; ) {
        if (l.isDeactivated) return
        l = l.parent
      }
      return t()
    })
  if ((Sc(e, o, r), r)) {
    let l = r.parent
    for (; l && l.parent; ) _c(l.parent.vnode) && e_(o, e, r, l), (l = l.parent)
  }
}
function e_(t, e, r, o) {
  const l = Sc(e, t, o, !0)
  mh(() => {
    Zf(o[e], l)
  }, r)
}
function Sc(t, e, r = je, o = !1) {
  if (r) {
    const l = r[t] || (r[t] = []),
      u =
        e.__weh ||
        (e.__weh = (...f) => {
          if (r.isUnmounted) return
          os(), Yo(r)
          const h = Wn(e, r, t, f)
          return Yi(), ss(), h
        })
    return o ? l.unshift(u) : l.push(u), u
  }
}
const Vr =
    (t) =>
    (e, r = je) =>
      (!fa || t === 'sp') && Sc(t, (...o) => e(...o), r),
  n_ = Vr('bm'),
  ls = Vr('m'),
  r_ = Vr('bu'),
  i_ = Vr('u'),
  Gm = Vr('bum'),
  mh = Vr('um'),
  o_ = Vr('sp'),
  s_ = Vr('rtg'),
  a_ = Vr('rtc')
function l_(t, e = je) {
  Sc('ec', t, e)
}
const Vm = 'components',
  c_ = 'directives'
function Qi(t, e) {
  return Km(Vm, t, !0, e) || t
}
const u_ = Symbol.for('v-ndc')
function oo(t) {
  return Km(c_, t)
}
function Km(t, e, r = !0, o = !1) {
  const l = Ze || je
  if (l) {
    const u = l.type
    if (t === Vm) {
      const h = I_(u, !1)
      if (h && (h === e || h === yr(e) || h === mc(yr(e)))) return u
    }
    const f = lg(l[t] || u[t], e) || lg(l.appContext[t], e)
    return !f && o ? u : f
  }
}
function lg(t, e) {
  return t && (t[e] || t[yr(e)] || t[mc(yr(e))])
}
function Qn(t, e, r, o) {
  let l
  const u = r && r[o]
  if (Rt(t) || ze(t)) {
    l = new Array(t.length)
    for (let f = 0, h = t.length; f < h; f++) l[f] = e(t[f], f, void 0, u && u[f])
  } else if (typeof t == 'number') {
    l = new Array(t)
    for (let f = 0; f < t; f++) l[f] = e(f + 1, f, void 0, u && u[f])
  } else if (be(t))
    if (t[Symbol.iterator]) l = Array.from(t, (f, h) => e(f, h, void 0, u && u[h]))
    else {
      const f = Object.keys(t)
      l = new Array(f.length)
      for (let h = 0, d = f.length; h < d; h++) {
        const g = f[h]
        l[h] = e(t[g], g, h, u && u[h])
      }
    }
  else l = []
  return r && (r[o] = l), l
}
function nr(t, e, r = {}, o, l) {
  if (Ze.isCE || (Ze.parent && Js(Ze.parent) && Ze.parent.isCE))
    return e !== 'default' && (r.name = e), qt('slot', r, o && o())
  let u = t[e]
  u && u._c && (u._d = !1), ct()
  const f = u && Xm(u(r)),
    h = Zt(fe, { key: r.key || (f && f.key) || `_${e}` }, f || (o ? o() : []), f && t._ === 1 ? 64 : -2)
  return !l && h.scopeId && (h.slotScopeIds = [h.scopeId + '-s']), u && u._c && (u._d = !0), h
}
function Xm(t) {
  return t.some((e) => (ua(e) ? !(e.type === Ln || (e.type === fe && !Xm(e.children))) : !0)) ? t : null
}
const hf = (t) => (t ? (l0(t) ? Tc(t) || t.proxy : hf(t.parent)) : null),
  Qs = Oe(Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => hf(t.parent),
    $root: (t) => hf(t.root),
    $emit: (t) => t.emit,
    $options: (t) => yh(t),
    $forceUpdate: (t) => t.f || (t.f = () => hh(t.update)),
    $nextTick: (t) => t.n || (t.n = qr.bind(t.proxy)),
    $watch: (t) => X1.bind(t),
  }),
  Iu = (t, e) => t !== xe && !t.__isScriptSetup && se(t, e),
  f_ = {
    get({ _: t }, e) {
      const { ctx: r, setupState: o, data: l, props: u, accessCache: f, type: h, appContext: d } = t
      let g
      if (e[0] !== '$') {
        const S = f[e]
        if (S !== void 0)
          switch (S) {
            case 1:
              return o[e]
            case 2:
              return l[e]
            case 4:
              return r[e]
            case 3:
              return u[e]
          }
        else {
          if (Iu(o, e)) return (f[e] = 1), o[e]
          if (l !== xe && se(l, e)) return (f[e] = 2), l[e]
          if ((g = t.propsOptions[0]) && se(g, e)) return (f[e] = 3), u[e]
          if (r !== xe && se(r, e)) return (f[e] = 4), r[e]
          pf && (f[e] = 0)
        }
      }
      const v = Qs[e]
      let b, x
      if (v) return e === '$attrs' && Mn(t, 'get', e), v(t)
      if ((b = h.__cssModules) && (b = b[e])) return b
      if (r !== xe && se(r, e)) return (f[e] = 4), r[e]
      if (((x = d.config.globalProperties), se(x, e))) return x[e]
    },
    set({ _: t }, e, r) {
      const { data: o, setupState: l, ctx: u } = t
      return Iu(l, e)
        ? ((l[e] = r), !0)
        : o !== xe && se(o, e)
          ? ((o[e] = r), !0)
          : se(t.props, e) || (e[0] === '$' && e.slice(1) in t)
            ? !1
            : ((u[e] = r), !0)
    },
    has({ _: { data: t, setupState: e, accessCache: r, ctx: o, appContext: l, propsOptions: u } }, f) {
      let h
      return (
        !!r[f] ||
        (t !== xe && se(t, f)) ||
        Iu(e, f) ||
        ((h = u[0]) && se(h, f)) ||
        se(o, f) ||
        se(Qs, f) ||
        se(l.config.globalProperties, f)
      )
    },
    defineProperty(t, e, r) {
      return (
        r.get != null ? (t._.accessCache[e] = 0) : se(r, 'value') && this.set(t, e, r.value, null),
        Reflect.defineProperty(t, e, r)
      )
    },
  }
function h_() {
  return d_().attrs
}
function Ym(t, e, r) {
  const o = Sa()
  if (r && r.local) {
    const l = Kt(t[e])
    return (
      Re(
        () => t[e],
        (u) => (l.value = u),
      ),
      Re(l, (u) => {
        u !== t[e] && o.emit(`update:${e}`, u)
      }),
      l
    )
  } else
    return {
      __v_isRef: !0,
      get value() {
        return t[e]
      },
      set value(l) {
        o.emit(`update:${e}`, l)
      },
    }
}
function d_() {
  const t = Sa()
  return t.setupContext || (t.setupContext = u0(t))
}
function Gl(t) {
  return Rt(t) ? t.reduce((e, r) => ((e[r] = null), e), {}) : t
}
function df(t, e) {
  return !t || !e ? t || e : Rt(t) && Rt(e) ? t.concat(e) : Oe({}, Gl(t), Gl(e))
}
let pf = !0
function p_(t) {
  const e = yh(t),
    r = t.proxy,
    o = t.ctx
  ;(pf = !1), e.beforeCreate && cg(e.beforeCreate, t, 'bc')
  const {
    data: l,
    computed: u,
    methods: f,
    watch: h,
    provide: d,
    inject: g,
    created: v,
    beforeMount: b,
    mounted: x,
    beforeUpdate: S,
    updated: M,
    activated: T,
    deactivated: N,
    beforeDestroy: E,
    beforeUnmount: L,
    destroyed: F,
    unmounted: A,
    render: B,
    renderTracked: tt,
    renderTriggered: ft,
    errorCaptured: X,
    serverPrefetch: st,
    expose: ot,
    inheritAttrs: kt,
    components: pt,
    directives: V,
    filters: R,
  } = e
  if ((g && g_(g, o, null), f))
    for (const W in f) {
      const J = f[W]
      Wt(J) && (o[W] = J.bind(r))
    }
  if (l) {
    const W = l.call(r, r)
    be(W) && (t.data = zn(W))
  }
  if (((pf = !0), u))
    for (const W in u) {
      const J = u[W],
        wt = Wt(J) ? J.bind(r, r) : Wt(J.get) ? J.get.bind(r, r) : er,
        Tt = !Wt(J) && Wt(J.set) ? J.set.bind(r) : er,
        zt = yt({ get: wt, set: Tt })
      Object.defineProperty(o, W, {
        enumerable: !0,
        configurable: !0,
        get: () => zt.value,
        set: (It) => (zt.value = It),
      })
    }
  if (h) for (const W in h) Zm(h[W], o, r, W)
  if (d) {
    const W = Wt(d) ? d.call(r) : d
    Reflect.ownKeys(W).forEach((J) => {
      Pl(J, W[J])
    })
  }
  v && cg(v, t, 'c')
  function H(W, J) {
    Rt(J) ? J.forEach((wt) => W(wt.bind(r))) : J && W(J.bind(r))
  }
  if (
    (H(n_, b),
    H(ls, x),
    H(r_, S),
    H(i_, M),
    H(Q1, T),
    H(t_, N),
    H(l_, X),
    H(a_, tt),
    H(s_, ft),
    H(Gm, L),
    H(mh, A),
    H(o_, st),
    Rt(ot))
  )
    if (ot.length) {
      const W = t.exposed || (t.exposed = {})
      ot.forEach((J) => {
        Object.defineProperty(W, J, { get: () => r[J], set: (wt) => (r[J] = wt) })
      })
    } else t.exposed || (t.exposed = {})
  B && t.render === er && (t.render = B),
    kt != null && (t.inheritAttrs = kt),
    pt && (t.components = pt),
    V && (t.directives = V)
}
function g_(t, e, r = er) {
  Rt(t) && (t = gf(t))
  for (const o in t) {
    const l = t[o]
    let u
    be(l) ? ('default' in l ? (u = zr(l.from || o, l.default, !0)) : (u = zr(l.from || o))) : (u = zr(l)),
      Ee(u)
        ? Object.defineProperty(e, o, {
            enumerable: !0,
            configurable: !0,
            get: () => u.value,
            set: (f) => (u.value = f),
          })
        : (e[o] = u)
  }
}
function cg(t, e, r) {
  Wn(Rt(t) ? t.map((o) => o.bind(e.proxy)) : t.bind(e.proxy), e, r)
}
function Zm(t, e, r, o) {
  const l = o.includes('.') ? Hm(r, o) : () => r[o]
  if (ze(t)) {
    const u = e[t]
    Wt(u) && Re(l, u)
  } else if (Wt(t)) Re(l, t.bind(r))
  else if (be(t))
    if (Rt(t)) t.forEach((u) => Zm(u, e, r, o))
    else {
      const u = Wt(t.handler) ? t.handler.bind(r) : e[t.handler]
      Wt(u) && Re(l, u, t)
    }
}
function yh(t) {
  const e = t.type,
    { mixins: r, extends: o } = e,
    {
      mixins: l,
      optionsCache: u,
      config: { optionMergeStrategies: f },
    } = t.appContext,
    h = u.get(e)
  let d
  return (
    h
      ? (d = h)
      : !l.length && !r && !o
        ? (d = e)
        : ((d = {}), l.length && l.forEach((g) => Vl(d, g, f, !0)), Vl(d, e, f)),
    be(e) && u.set(e, d),
    d
  )
}
function Vl(t, e, r, o = !1) {
  const { mixins: l, extends: u } = e
  u && Vl(t, u, r, !0), l && l.forEach((f) => Vl(t, f, r, !0))
  for (const f in e)
    if (!(o && f === 'expose')) {
      const h = v_[f] || (r && r[f])
      t[f] = h ? h(t[f], e[f]) : e[f]
    }
  return t
}
const v_ = {
  data: ug,
  props: fg,
  emits: fg,
  methods: Xs,
  computed: Xs,
  beforeCreate: hn,
  created: hn,
  beforeMount: hn,
  mounted: hn,
  beforeUpdate: hn,
  updated: hn,
  beforeDestroy: hn,
  beforeUnmount: hn,
  destroyed: hn,
  unmounted: hn,
  activated: hn,
  deactivated: hn,
  errorCaptured: hn,
  serverPrefetch: hn,
  components: Xs,
  directives: Xs,
  watch: y_,
  provide: ug,
  inject: m_,
}
function ug(t, e) {
  return e
    ? t
      ? function () {
          return Oe(Wt(t) ? t.call(this, this) : t, Wt(e) ? e.call(this, this) : e)
        }
      : e
    : t
}
function m_(t, e) {
  return Xs(gf(t), gf(e))
}
function gf(t) {
  if (Rt(t)) {
    const e = {}
    for (let r = 0; r < t.length; r++) e[t[r]] = t[r]
    return e
  }
  return t
}
function hn(t, e) {
  return t ? [...new Set([].concat(t, e))] : e
}
function Xs(t, e) {
  return t ? Oe(Object.create(null), t, e) : e
}
function fg(t, e) {
  return t ? (Rt(t) && Rt(e) ? [...new Set([...t, ...e])] : Oe(Object.create(null), Gl(t), Gl(e ?? {}))) : e
}
function y_(t, e) {
  if (!t) return e
  if (!e) return t
  const r = Oe(Object.create(null), t)
  for (const o in e) r[o] = hn(t[o], e[o])
  return r
}
function Jm() {
  return {
    app: null,
    config: {
      isNativeTag: Px,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let b_ = 0
function w_(t, e) {
  return function (o, l = null) {
    Wt(o) || (o = Oe({}, o)), l != null && !be(l) && (l = null)
    const u = Jm(),
      f = new Set()
    let h = !1
    const d = (u.app = {
      _uid: b_++,
      _component: o,
      _props: l,
      _container: null,
      _context: u,
      _instance: null,
      version: B_,
      get config() {
        return u.config
      },
      set config(g) {},
      use(g, ...v) {
        return f.has(g) || (g && Wt(g.install) ? (f.add(g), g.install(d, ...v)) : Wt(g) && (f.add(g), g(d, ...v))), d
      },
      mixin(g) {
        return u.mixins.includes(g) || u.mixins.push(g), d
      },
      component(g, v) {
        return v ? ((u.components[g] = v), d) : u.components[g]
      },
      directive(g, v) {
        return v ? ((u.directives[g] = v), d) : u.directives[g]
      },
      mount(g, v, b) {
        if (!h) {
          const x = qt(o, l)
          return (
            (x.appContext = u),
            v && e ? e(x, g) : t(x, g, b),
            (h = !0),
            (d._container = g),
            (g.__vue_app__ = d),
            Tc(x.component) || x.component.proxy
          )
        }
      },
      unmount() {
        h && (t(null, d._container), delete d._container.__vue_app__)
      },
      provide(g, v) {
        return (u.provides[g] = v), d
      },
      runWithContext(g) {
        Kl = d
        try {
          return g()
        } finally {
          Kl = null
        }
      },
    })
    return d
  }
}
let Kl = null
function Pl(t, e) {
  if (je) {
    let r = je.provides
    const o = je.parent && je.parent.provides
    o === r && (r = je.provides = Object.create(o)), (r[t] = e)
  }
}
function zr(t, e, r = !1) {
  const o = je || Ze
  if (o || Kl) {
    const l = o
      ? o.parent == null
        ? o.vnode.appContext && o.vnode.appContext.provides
        : o.parent.provides
      : Kl._context.provides
    if (l && t in l) return l[t]
    if (arguments.length > 1) return r && Wt(e) ? e.call(o && o.proxy) : e
  }
}
function x_(t, e, r, o = !1) {
  const l = {},
    u = {}
  Bl(u, Cc, 1), (t.propsDefaults = Object.create(null)), Qm(t, e, l, u)
  for (const f in t.propsOptions[0]) f in l || (l[f] = void 0)
  r ? (t.props = o ? l : w1(l)) : t.type.props ? (t.props = l) : (t.props = u), (t.attrs = u)
}
function __(t, e, r, o) {
  const {
      props: l,
      attrs: u,
      vnode: { patchFlag: f },
    } = t,
    h = ae(l),
    [d] = t.propsOptions
  let g = !1
  if ((o || f > 0) && !(f & 16)) {
    if (f & 8) {
      const v = t.vnode.dynamicProps
      for (let b = 0; b < v.length; b++) {
        let x = v[b]
        if (wc(t.emitsOptions, x)) continue
        const S = e[x]
        if (d)
          if (se(u, x)) S !== u[x] && ((u[x] = S), (g = !0))
          else {
            const M = yr(x)
            l[M] = vf(d, h, M, S, t, !1)
          }
        else S !== u[x] && ((u[x] = S), (g = !0))
      }
    }
  } else {
    Qm(t, e, l, u) && (g = !0)
    let v
    for (const b in h)
      (!e || (!se(e, b) && ((v = io(b)) === b || !se(e, v)))) &&
        (d ? r && (r[b] !== void 0 || r[v] !== void 0) && (l[b] = vf(d, h, b, void 0, t, !0)) : delete l[b])
    if (u !== h) for (const b in u) (!e || !se(e, b)) && (delete u[b], (g = !0))
  }
  g && Fr(t, 'set', '$attrs')
}
function Qm(t, e, r, o) {
  const [l, u] = t.propsOptions
  let f = !1,
    h
  if (e)
    for (let d in e) {
      if (Ml(d)) continue
      const g = e[d]
      let v
      l && se(l, (v = yr(d)))
        ? !u || !u.includes(v)
          ? (r[v] = g)
          : ((h || (h = {}))[v] = g)
        : wc(t.emitsOptions, d) || ((!(d in o) || g !== o[d]) && ((o[d] = g), (f = !0)))
    }
  if (u) {
    const d = ae(r),
      g = h || xe
    for (let v = 0; v < u.length; v++) {
      const b = u[v]
      r[b] = vf(l, d, b, g[b], t, !se(g, b))
    }
  }
  return f
}
function vf(t, e, r, o, l, u) {
  const f = t[r]
  if (f != null) {
    const h = se(f, 'default')
    if (h && o === void 0) {
      const d = f.default
      if (f.type !== Function && !f.skipFactory && Wt(d)) {
        const { propsDefaults: g } = l
        r in g ? (o = g[r]) : (Yo(l), (o = g[r] = d.call(null, e)), Yi())
      } else o = d
    }
    f[0] && (u && !h ? (o = !1) : f[1] && (o === '' || o === io(r)) && (o = !0))
  }
  return o
}
function t0(t, e, r = !1) {
  const o = e.propsCache,
    l = o.get(t)
  if (l) return l
  const u = t.props,
    f = {},
    h = []
  let d = !1
  if (!Wt(t)) {
    const v = (b) => {
      d = !0
      const [x, S] = t0(b, e, !0)
      Oe(f, x), S && h.push(...S)
    }
    !r && e.mixins.length && e.mixins.forEach(v), t.extends && v(t.extends), t.mixins && t.mixins.forEach(v)
  }
  if (!u && !d) return be(t) && o.set(t, Io), Io
  if (Rt(u))
    for (let v = 0; v < u.length; v++) {
      const b = yr(u[v])
      hg(b) && (f[b] = xe)
    }
  else if (u)
    for (const v in u) {
      const b = yr(v)
      if (hg(b)) {
        const x = u[v],
          S = (f[b] = Rt(x) || Wt(x) ? { type: x } : Oe({}, x))
        if (S) {
          const M = gg(Boolean, S.type),
            T = gg(String, S.type)
          ;(S[0] = M > -1), (S[1] = T < 0 || M < T), (M > -1 || se(S, 'default')) && h.push(b)
        }
      }
    }
  const g = [f, h]
  return be(t) && o.set(t, g), g
}
function hg(t) {
  return t[0] !== '$'
}
function dg(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/)
  return e ? e[2] : t === null ? 'null' : ''
}
function pg(t, e) {
  return dg(t) === dg(e)
}
function gg(t, e) {
  return Rt(e) ? e.findIndex((r) => pg(r, t)) : Wt(e) && pg(e, t) ? 0 : -1
}
const e0 = (t) => t[0] === '_' || t === '$stable',
  bh = (t) => (Rt(t) ? t.map(Zn) : [Zn(t)]),
  S_ = (t, e, r) => {
    if (e._n) return e
    const o = Yt((...l) => bh(e(...l)), r)
    return (o._c = !1), o
  },
  n0 = (t, e, r) => {
    const o = t._ctx
    for (const l in t) {
      if (e0(l)) continue
      const u = t[l]
      if (Wt(u)) e[l] = S_(l, u, o)
      else if (u != null) {
        const f = bh(u)
        e[l] = () => f
      }
    }
  },
  r0 = (t, e) => {
    const r = bh(e)
    t.slots.default = () => r
  },
  k_ = (t, e) => {
    if (t.vnode.shapeFlag & 32) {
      const r = e._
      r ? ((t.slots = ae(e)), Bl(e, '_', r)) : n0(e, (t.slots = {}))
    } else (t.slots = {}), e && r0(t, e)
    Bl(t.slots, Cc, 1)
  },
  C_ = (t, e, r) => {
    const { vnode: o, slots: l } = t
    let u = !0,
      f = xe
    if (o.shapeFlag & 32) {
      const h = e._
      h ? (r && h === 1 ? (u = !1) : (Oe(l, e), !r && h === 1 && delete l._)) : ((u = !e.$stable), n0(e, l)), (f = e)
    } else e && (r0(t, e), (f = { default: 1 }))
    if (u) for (const h in l) !e0(h) && !(h in f) && delete l[h]
  }
function mf(t, e, r, o, l = !1) {
  if (Rt(t)) {
    t.forEach((x, S) => mf(x, e && (Rt(e) ? e[S] : e), r, o, l))
    return
  }
  if (Js(o) && !l) return
  const u = o.shapeFlag & 4 ? Tc(o.component) || o.component.proxy : o.el,
    f = l ? null : u,
    { i: h, r: d } = t,
    g = e && e.r,
    v = h.refs === xe ? (h.refs = {}) : h.refs,
    b = h.setupState
  if ((g != null && g !== d && (ze(g) ? ((v[g] = null), se(b, g) && (b[g] = null)) : Ee(g) && (g.value = null)), Wt(d)))
    xi(d, h, 12, [f, v])
  else {
    const x = ze(d),
      S = Ee(d)
    if (x || S) {
      const M = () => {
        if (t.f) {
          const T = x ? (se(b, d) ? b[d] : v[d]) : d.value
          l
            ? Rt(T) && Zf(T, u)
            : Rt(T)
              ? T.includes(u) || T.push(u)
              : x
                ? ((v[d] = [u]), se(b, d) && (b[d] = v[d]))
                : ((d.value = [u]), t.k && (v[t.k] = d.value))
        } else x ? ((v[d] = f), se(b, d) && (b[d] = f)) : S && ((d.value = f), t.k && (v[t.k] = f))
      }
      f ? ((M.id = -1), Sn(M, r)) : M()
    }
  }
}
const Sn = V1
function T_(t) {
  return E_(t)
}
function E_(t, e) {
  const r = of()
  r.__VUE__ = !0
  const {
      insert: o,
      remove: l,
      patchProp: u,
      createElement: f,
      createText: h,
      createComment: d,
      setText: g,
      setElementText: v,
      parentNode: b,
      nextSibling: x,
      setScopeId: S = er,
      insertStaticContent: M,
    } = t,
    T = (O, I, K, Q = null, nt = null, at = null, lt = !1, gt = null, xt = !!I.dynamicChildren) => {
      if (O === I) return
      O && !pr(O, I) && ((Q = U(O)), It(O, nt, at, !0), (O = null)),
        I.patchFlag === -2 && ((xt = !1), (I.dynamicChildren = null))
      const { type: ht, ref: $t, shapeFlag: At } = I
      switch (ht) {
        case kc:
          N(O, I, K, Q)
          break
        case Ln:
          E(O, I, K, Q)
          break
        case Fu:
          O == null && L(I, K, Q, lt)
          break
        case fe:
          pt(O, I, K, Q, nt, at, lt, gt, xt)
          break
        default:
          At & 1
            ? B(O, I, K, Q, nt, at, lt, gt, xt)
            : At & 6
              ? V(O, I, K, Q, nt, at, lt, gt, xt)
              : (At & 64 || At & 128) && ht.process(O, I, K, Q, nt, at, lt, gt, xt, it)
      }
      $t != null && nt && mf($t, O && O.ref, at, I || O, !I)
    },
    N = (O, I, K, Q) => {
      if (O == null) o((I.el = h(I.children)), K, Q)
      else {
        const nt = (I.el = O.el)
        I.children !== O.children && g(nt, I.children)
      }
    },
    E = (O, I, K, Q) => {
      O == null ? o((I.el = d(I.children || '')), K, Q) : (I.el = O.el)
    },
    L = (O, I, K, Q) => {
      ;[O.el, O.anchor] = M(O.children, I, K, Q, O.el, O.anchor)
    },
    F = ({ el: O, anchor: I }, K, Q) => {
      let nt
      for (; O && O !== I; ) (nt = x(O)), o(O, K, Q), (O = nt)
      o(I, K, Q)
    },
    A = ({ el: O, anchor: I }) => {
      let K
      for (; O && O !== I; ) (K = x(O)), l(O), (O = K)
      l(I)
    },
    B = (O, I, K, Q, nt, at, lt, gt, xt) => {
      ;(lt = lt || I.type === 'svg'), O == null ? tt(I, K, Q, nt, at, lt, gt, xt) : st(O, I, nt, at, lt, gt, xt)
    },
    tt = (O, I, K, Q, nt, at, lt, gt) => {
      let xt, ht
      const { type: $t, props: At, shapeFlag: Ot, transition: Ft, dirs: jt } = O
      if (
        ((xt = O.el = f(O.type, at, At && At.is, At)),
        Ot & 8 ? v(xt, O.children) : Ot & 16 && X(O.children, xt, null, Q, nt, at && $t !== 'foreignObject', lt, gt),
        jt && Fi(O, null, Q, 'created'),
        ft(xt, O, O.scopeId, lt, Q),
        At)
      ) {
        for (const ee in At) ee !== 'value' && !Ml(ee) && u(xt, ee, null, At[ee], at, O.children, Q, nt, _t)
        'value' in At && u(xt, 'value', null, At.value), (ht = At.onVnodeBeforeMount) && hr(ht, Q, O)
      }
      jt && Fi(O, null, Q, 'beforeMount')
      const ie = (!nt || (nt && !nt.pendingBranch)) && Ft && !Ft.persisted
      ie && Ft.beforeEnter(xt),
        o(xt, I, K),
        ((ht = At && At.onVnodeMounted) || ie || jt) &&
          Sn(() => {
            ht && hr(ht, Q, O), ie && Ft.enter(xt), jt && Fi(O, null, Q, 'mounted')
          }, nt)
    },
    ft = (O, I, K, Q, nt) => {
      if ((K && S(O, K), Q)) for (let at = 0; at < Q.length; at++) S(O, Q[at])
      if (nt) {
        let at = nt.subTree
        if (I === at) {
          const lt = nt.vnode
          ft(O, lt, lt.scopeId, lt.slotScopeIds, nt.parent)
        }
      }
    },
    X = (O, I, K, Q, nt, at, lt, gt, xt = 0) => {
      for (let ht = xt; ht < O.length; ht++) {
        const $t = (O[ht] = gt ? pi(O[ht]) : Zn(O[ht]))
        T(null, $t, I, K, Q, nt, at, lt, gt)
      }
    },
    st = (O, I, K, Q, nt, at, lt) => {
      const gt = (I.el = O.el)
      let { patchFlag: xt, dynamicChildren: ht, dirs: $t } = I
      xt |= O.patchFlag & 16
      const At = O.props || xe,
        Ot = I.props || xe
      let Ft
      K && qi(K, !1),
        (Ft = Ot.onVnodeBeforeUpdate) && hr(Ft, K, I, O),
        $t && Fi(I, O, K, 'beforeUpdate'),
        K && qi(K, !0)
      const jt = nt && I.type !== 'foreignObject'
      if ((ht ? ot(O.dynamicChildren, ht, gt, K, Q, jt, at) : lt || J(O, I, gt, null, K, Q, jt, at, !1), xt > 0)) {
        if (xt & 16) kt(gt, I, At, Ot, K, Q, nt)
        else if (
          (xt & 2 && At.class !== Ot.class && u(gt, 'class', null, Ot.class, nt),
          xt & 4 && u(gt, 'style', At.style, Ot.style, nt),
          xt & 8)
        ) {
          const ie = I.dynamicProps
          for (let ee = 0; ee < ie.length; ee++) {
            const ue = ie[ee],
              Qt = At[ue],
              yn = Ot[ue]
            ;(yn !== Qt || ue === 'value') && u(gt, ue, Qt, yn, nt, O.children, K, Q, _t)
          }
        }
        xt & 1 && O.children !== I.children && v(gt, I.children)
      } else !lt && ht == null && kt(gt, I, At, Ot, K, Q, nt)
      ;((Ft = Ot.onVnodeUpdated) || $t) &&
        Sn(() => {
          Ft && hr(Ft, K, I, O), $t && Fi(I, O, K, 'updated')
        }, Q)
    },
    ot = (O, I, K, Q, nt, at, lt) => {
      for (let gt = 0; gt < I.length; gt++) {
        const xt = O[gt],
          ht = I[gt],
          $t = xt.el && (xt.type === fe || !pr(xt, ht) || xt.shapeFlag & 70) ? b(xt.el) : K
        T(xt, ht, $t, null, Q, nt, at, lt, !0)
      }
    },
    kt = (O, I, K, Q, nt, at, lt) => {
      if (K !== Q) {
        if (K !== xe) for (const gt in K) !Ml(gt) && !(gt in Q) && u(O, gt, K[gt], null, lt, I.children, nt, at, _t)
        for (const gt in Q) {
          if (Ml(gt)) continue
          const xt = Q[gt],
            ht = K[gt]
          xt !== ht && gt !== 'value' && u(O, gt, ht, xt, lt, I.children, nt, at, _t)
        }
        'value' in Q && u(O, 'value', K.value, Q.value)
      }
    },
    pt = (O, I, K, Q, nt, at, lt, gt, xt) => {
      const ht = (I.el = O ? O.el : h('')),
        $t = (I.anchor = O ? O.anchor : h(''))
      let { patchFlag: At, dynamicChildren: Ot, slotScopeIds: Ft } = I
      Ft && (gt = gt ? gt.concat(Ft) : Ft),
        O == null
          ? (o(ht, K, Q), o($t, K, Q), X(I.children, K, $t, nt, at, lt, gt, xt))
          : At > 0 && At & 64 && Ot && O.dynamicChildren
            ? (ot(O.dynamicChildren, Ot, K, nt, at, lt, gt),
              (I.key != null || (nt && I === nt.subTree)) && i0(O, I, !0))
            : J(O, I, K, $t, nt, at, lt, gt, xt)
    },
    V = (O, I, K, Q, nt, at, lt, gt, xt) => {
      ;(I.slotScopeIds = gt),
        O == null ? (I.shapeFlag & 512 ? nt.ctx.activate(I, K, Q, lt, xt) : R(I, K, Q, nt, at, lt, xt)) : k(O, I, xt)
    },
    R = (O, I, K, Q, nt, at, lt) => {
      const gt = (O.component = $_(O, Q, nt))
      if ((_c(O) && (gt.ctx.renderer = it), D_(gt), gt.asyncDep)) {
        if ((nt && nt.registerDep(gt, H), !O.el)) {
          const xt = (gt.subTree = qt(Ln))
          E(null, xt, I, K)
        }
        return
      }
      H(gt, O, I, K, nt, at, lt)
    },
    k = (O, I, K) => {
      const Q = (I.component = O.component)
      if (F1(O, I, K))
        if (Q.asyncDep && !Q.asyncResolved) {
          W(Q, I, K)
          return
        } else (Q.next = I), P1(Q.update), Q.update()
      else (I.el = O.el), (Q.vnode = I)
    },
    H = (O, I, K, Q, nt, at, lt) => {
      const gt = () => {
          if (O.isMounted) {
            let { next: $t, bu: At, u: Ot, parent: Ft, vnode: jt } = O,
              ie = $t,
              ee
            qi(O, !1),
              $t ? (($t.el = jt.el), W(O, $t, lt)) : ($t = jt),
              At && Nl(At),
              (ee = $t.props && $t.props.onVnodeBeforeUpdate) && hr(ee, Ft, $t, jt),
              qi(O, !0)
            const ue = Ru(O),
              Qt = O.subTree
            ;(O.subTree = ue),
              T(Qt, ue, b(Qt.el), U(Qt), O, nt, at),
              ($t.el = ue.el),
              ie === null && dh(O, ue.el),
              Ot && Sn(Ot, nt),
              (ee = $t.props && $t.props.onVnodeUpdated) && Sn(() => hr(ee, Ft, $t, jt), nt)
          } else {
            let $t
            const { el: At, props: Ot } = I,
              { bm: Ft, m: jt, parent: ie } = O,
              ee = Js(I)
            if (
              (qi(O, !1), Ft && Nl(Ft), !ee && ($t = Ot && Ot.onVnodeBeforeMount) && hr($t, ie, I), qi(O, !0), At && Nt)
            ) {
              const ue = () => {
                ;(O.subTree = Ru(O)), Nt(At, O.subTree, O, nt, null)
              }
              ee ? I.type.__asyncLoader().then(() => !O.isUnmounted && ue()) : ue()
            } else {
              const ue = (O.subTree = Ru(O))
              T(null, ue, K, Q, O, nt, at), (I.el = ue.el)
            }
            if ((jt && Sn(jt, nt), !ee && ($t = Ot && Ot.onVnodeMounted))) {
              const ue = I
              Sn(() => hr($t, ie, ue), nt)
            }
            ;(I.shapeFlag & 256 || (ie && Js(ie.vnode) && ie.vnode.shapeFlag & 256)) && O.a && Sn(O.a, nt),
              (O.isMounted = !0),
              (I = K = Q = null)
          }
        },
        xt = (O.effect = new eh(gt, () => hh(ht), O.scope)),
        ht = (O.update = () => xt.run())
      ;(ht.id = O.uid), qi(O, !0), ht()
    },
    W = (O, I, K) => {
      I.component = O
      const Q = O.vnode.props
      ;(O.vnode = I), (O.next = null), __(O, I.props, Q, K), C_(O, I.children, K), os(), ig(), ss()
    },
    J = (O, I, K, Q, nt, at, lt, gt, xt = !1) => {
      const ht = O && O.children,
        $t = O ? O.shapeFlag : 0,
        At = I.children,
        { patchFlag: Ot, shapeFlag: Ft } = I
      if (Ot > 0) {
        if (Ot & 128) {
          Tt(ht, At, K, Q, nt, at, lt, gt, xt)
          return
        } else if (Ot & 256) {
          wt(ht, At, K, Q, nt, at, lt, gt, xt)
          return
        }
      }
      Ft & 8
        ? ($t & 16 && _t(ht, nt, at), At !== ht && v(K, At))
        : $t & 16
          ? Ft & 16
            ? Tt(ht, At, K, Q, nt, at, lt, gt, xt)
            : _t(ht, nt, at, !0)
          : ($t & 8 && v(K, ''), Ft & 16 && X(At, K, Q, nt, at, lt, gt, xt))
    },
    wt = (O, I, K, Q, nt, at, lt, gt, xt) => {
      ;(O = O || Io), (I = I || Io)
      const ht = O.length,
        $t = I.length,
        At = Math.min(ht, $t)
      let Ot
      for (Ot = 0; Ot < At; Ot++) {
        const Ft = (I[Ot] = xt ? pi(I[Ot]) : Zn(I[Ot]))
        T(O[Ot], Ft, K, null, nt, at, lt, gt, xt)
      }
      ht > $t ? _t(O, nt, at, !0, !1, At) : X(I, K, Q, nt, at, lt, gt, xt, At)
    },
    Tt = (O, I, K, Q, nt, at, lt, gt, xt) => {
      let ht = 0
      const $t = I.length
      let At = O.length - 1,
        Ot = $t - 1
      for (; ht <= At && ht <= Ot; ) {
        const Ft = O[ht],
          jt = (I[ht] = xt ? pi(I[ht]) : Zn(I[ht]))
        if (pr(Ft, jt)) T(Ft, jt, K, null, nt, at, lt, gt, xt)
        else break
        ht++
      }
      for (; ht <= At && ht <= Ot; ) {
        const Ft = O[At],
          jt = (I[Ot] = xt ? pi(I[Ot]) : Zn(I[Ot]))
        if (pr(Ft, jt)) T(Ft, jt, K, null, nt, at, lt, gt, xt)
        else break
        At--, Ot--
      }
      if (ht > At) {
        if (ht <= Ot) {
          const Ft = Ot + 1,
            jt = Ft < $t ? I[Ft].el : Q
          for (; ht <= Ot; ) T(null, (I[ht] = xt ? pi(I[ht]) : Zn(I[ht])), K, jt, nt, at, lt, gt, xt), ht++
        }
      } else if (ht > Ot) for (; ht <= At; ) It(O[ht], nt, at, !0), ht++
      else {
        const Ft = ht,
          jt = ht,
          ie = new Map()
        for (ht = jt; ht <= Ot; ht++) {
          const ye = (I[ht] = xt ? pi(I[ht]) : Zn(I[ht]))
          ye.key != null && ie.set(ye.key, ht)
        }
        let ee,
          ue = 0
        const Qt = Ot - jt + 1
        let yn = !1,
          Nn = 0
        const We = new Array(Qt)
        for (ht = 0; ht < Qt; ht++) We[ht] = 0
        for (ht = Ft; ht <= At; ht++) {
          const ye = O[ht]
          if (ue >= Qt) {
            It(ye, nt, at, !0)
            continue
          }
          let on
          if (ye.key != null) on = ie.get(ye.key)
          else
            for (ee = jt; ee <= Ot; ee++)
              if (We[ee - jt] === 0 && pr(ye, I[ee])) {
                on = ee
                break
              }
          on === void 0
            ? It(ye, nt, at, !0)
            : ((We[on - jt] = ht + 1),
              on >= Nn ? (Nn = on) : (yn = !0),
              T(ye, I[on], K, null, nt, at, lt, gt, xt),
              ue++)
        }
        const ao = yn ? L_(We) : Io
        for (ee = ao.length - 1, ht = Qt - 1; ht >= 0; ht--) {
          const ye = jt + ht,
            on = I[ye],
            bt = ye + 1 < $t ? I[ye + 1].el : Q
          We[ht] === 0
            ? T(null, on, K, bt, nt, at, lt, gt, xt)
            : yn && (ee < 0 || ht !== ao[ee] ? zt(on, K, bt, 2) : ee--)
        }
      }
    },
    zt = (O, I, K, Q, nt = null) => {
      const { el: at, type: lt, transition: gt, children: xt, shapeFlag: ht } = O
      if (ht & 6) {
        zt(O.component.subTree, I, K, Q)
        return
      }
      if (ht & 128) {
        O.suspense.move(I, K, Q)
        return
      }
      if (ht & 64) {
        lt.move(O, I, K, it)
        return
      }
      if (lt === fe) {
        o(at, I, K)
        for (let At = 0; At < xt.length; At++) zt(xt[At], I, K, Q)
        o(O.anchor, I, K)
        return
      }
      if (lt === Fu) {
        F(O, I, K)
        return
      }
      if (Q !== 2 && ht & 1 && gt)
        if (Q === 0) gt.beforeEnter(at), o(at, I, K), Sn(() => gt.enter(at), nt)
        else {
          const { leave: At, delayLeave: Ot, afterLeave: Ft } = gt,
            jt = () => o(at, I, K),
            ie = () => {
              At(at, () => {
                jt(), Ft && Ft()
              })
            }
          Ot ? Ot(at, jt, ie) : ie()
        }
      else o(at, I, K)
    },
    It = (O, I, K, Q = !1, nt = !1) => {
      const {
        type: at,
        props: lt,
        ref: gt,
        children: xt,
        dynamicChildren: ht,
        shapeFlag: $t,
        patchFlag: At,
        dirs: Ot,
      } = O
      if ((gt != null && mf(gt, null, K, O, !0), $t & 256)) {
        I.ctx.deactivate(O)
        return
      }
      const Ft = $t & 1 && Ot,
        jt = !Js(O)
      let ie
      if ((jt && (ie = lt && lt.onVnodeBeforeUnmount) && hr(ie, I, O), $t & 6)) Jt(O.component, K, Q)
      else {
        if ($t & 128) {
          O.suspense.unmount(K, Q)
          return
        }
        Ft && Fi(O, null, I, 'beforeUnmount'),
          $t & 64
            ? O.type.remove(O, I, K, nt, it, Q)
            : ht && (at !== fe || (At > 0 && At & 64))
              ? _t(ht, I, K, !1, !0)
              : ((at === fe && At & 384) || (!nt && $t & 16)) && _t(xt, I, K),
          Q && Gt(O)
      }
      ;((jt && (ie = lt && lt.onVnodeUnmounted)) || Ft) &&
        Sn(() => {
          ie && hr(ie, I, O), Ft && Fi(O, null, I, 'unmounted')
        }, K)
    },
    Gt = (O) => {
      const { type: I, el: K, anchor: Q, transition: nt } = O
      if (I === fe) {
        Vt(K, Q)
        return
      }
      if (I === Fu) {
        A(O)
        return
      }
      const at = () => {
        l(K), nt && !nt.persisted && nt.afterLeave && nt.afterLeave()
      }
      if (O.shapeFlag & 1 && nt && !nt.persisted) {
        const { leave: lt, delayLeave: gt } = nt,
          xt = () => lt(K, at)
        gt ? gt(O.el, at, xt) : xt()
      } else at()
    },
    Vt = (O, I) => {
      let K
      for (; O !== I; ) (K = x(O)), l(O), (O = K)
      l(I)
    },
    Jt = (O, I, K) => {
      const { bum: Q, scope: nt, update: at, subTree: lt, um: gt } = O
      Q && Nl(Q),
        nt.stop(),
        at && ((at.active = !1), It(lt, O, I, K)),
        gt && Sn(gt, I),
        Sn(() => {
          O.isUnmounted = !0
        }, I),
        I &&
          I.pendingBranch &&
          !I.isUnmounted &&
          O.asyncDep &&
          !O.asyncResolved &&
          O.suspenseId === I.pendingId &&
          (I.deps--, I.deps === 0 && I.resolve())
    },
    _t = (O, I, K, Q = !1, nt = !1, at = 0) => {
      for (let lt = at; lt < O.length; lt++) It(O[lt], I, K, Q, nt)
    },
    U = (O) => (O.shapeFlag & 6 ? U(O.component.subTree) : O.shapeFlag & 128 ? O.suspense.next() : x(O.anchor || O.el)),
    et = (O, I, K) => {
      O == null ? I._vnode && It(I._vnode, null, null, !0) : T(I._vnode || null, O, I, null, null, null, K),
        ig(),
        Rm(),
        (I._vnode = O)
    },
    it = { p: T, um: It, m: zt, r: Gt, mt: R, mc: X, pc: J, pbc: ot, n: U, o: t }
  let Mt, Nt
  return e && ([Mt, Nt] = e(it)), { render: et, hydrate: Mt, createApp: w_(et, Mt) }
}
function qi({ effect: t, update: e }, r) {
  t.allowRecurse = e.allowRecurse = r
}
function i0(t, e, r = !1) {
  const o = t.children,
    l = e.children
  if (Rt(o) && Rt(l))
    for (let u = 0; u < o.length; u++) {
      const f = o[u]
      let h = l[u]
      h.shapeFlag & 1 &&
        !h.dynamicChildren &&
        ((h.patchFlag <= 0 || h.patchFlag === 32) && ((h = l[u] = pi(l[u])), (h.el = f.el)), r || i0(f, h)),
        h.type === kc && (h.el = f.el)
    }
}
function L_(t) {
  const e = t.slice(),
    r = [0]
  let o, l, u, f, h
  const d = t.length
  for (o = 0; o < d; o++) {
    const g = t[o]
    if (g !== 0) {
      if (((l = r[r.length - 1]), t[l] < g)) {
        ;(e[o] = l), r.push(o)
        continue
      }
      for (u = 0, f = r.length - 1; u < f; ) (h = (u + f) >> 1), t[r[h]] < g ? (u = h + 1) : (f = h)
      g < t[r[u]] && (u > 0 && (e[o] = r[u - 1]), (r[u] = o))
    }
  }
  for (u = r.length, f = r[u - 1]; u-- > 0; ) (r[u] = f), (f = e[f])
  return r
}
const A_ = (t) => t.__isTeleport,
  fe = Symbol.for('v-fgt'),
  kc = Symbol.for('v-txt'),
  Ln = Symbol.for('v-cmt'),
  Fu = Symbol.for('v-stc'),
  ta = []
let Bn = null
function ct(t = !1) {
  ta.push((Bn = t ? null : []))
}
function o0() {
  ta.pop(), (Bn = ta[ta.length - 1] || null)
}
let Xo = 1
function vg(t) {
  Xo += t
}
function s0(t) {
  return (t.dynamicChildren = Xo > 0 ? Bn || Io : null), o0(), Xo > 0 && Bn && Bn.push(t), t
}
function Et(t, e, r, o, l, u) {
  return s0(ut(t, e, r, o, l, u, !0))
}
function Zt(t, e, r, o, l) {
  return s0(qt(t, e, r, o, l, !0))
}
function ua(t) {
  return t ? t.__v_isVNode === !0 : !1
}
function pr(t, e) {
  return t.type === e.type && t.key === e.key
}
const Cc = '__vInternal',
  a0 = ({ key: t }) => t ?? null,
  Ol = ({ ref: t, ref_key: e, ref_for: r }) => (
    typeof t == 'number' && (t = '' + t),
    t != null ? (ze(t) || Ee(t) || Wt(t) ? { i: Ze, r: t, k: e, f: !!r } : t) : null
  )
function ut(t, e = null, r = null, o = 0, l = null, u = t === fe ? 0 : 1, f = !1, h = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && a0(e),
    ref: e && Ol(e),
    scopeId: xc,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: u,
    patchFlag: o,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
    ctx: Ze,
  }
  return (
    h ? (wh(d, r), u & 128 && t.normalize(d)) : r && (d.shapeFlag |= ze(r) ? 8 : 16),
    Xo > 0 && !f && Bn && (d.patchFlag > 0 || u & 6) && d.patchFlag !== 32 && Bn.push(d),
    d
  )
}
const qt = M_
function M_(t, e = null, r = null, o = 0, l = null, u = !1) {
  if (((!t || t === u_) && (t = Ln), ua(t))) {
    const h = ki(t, e, !0)
    return (
      r && wh(h, r),
      Xo > 0 && !u && Bn && (h.shapeFlag & 6 ? (Bn[Bn.indexOf(t)] = h) : Bn.push(h)),
      (h.patchFlag |= -2),
      h
    )
  }
  if ((F_(t) && (t = t.__vccOpts), e)) {
    e = N_(e)
    let { class: h, style: d } = e
    h && !ze(h) && (e.class = ve(h)), be(d) && (Am(d) && !Rt(d) && (d = Oe({}, d)), (e.style = En(d)))
  }
  const f = ze(t) ? 1 : q1(t) ? 128 : A_(t) ? 64 : be(t) ? 4 : Wt(t) ? 2 : 0
  return ut(t, e, r, o, l, f, u, !0)
}
function N_(t) {
  return t ? (Am(t) || Cc in t ? Oe({}, t) : t) : null
}
function ki(t, e, r = !1) {
  const { props: o, ref: l, patchFlag: u, children: f } = t,
    h = e ? _i(o || {}, e) : o
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: h,
    key: h && a0(h),
    ref: e && e.ref ? (r && l ? (Rt(l) ? l.concat(Ol(e)) : [l, Ol(e)]) : Ol(e)) : l,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: f,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== fe ? (u === -1 ? 16 : u | 16) : u,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && ki(t.ssContent),
    ssFallback: t.ssFallback && ki(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce,
  }
}
function dn(t = ' ', e = 0) {
  return qt(kc, null, t, e)
}
function ne(t = '', e = !1) {
  return e ? (ct(), Zt(Ln, null, t)) : qt(Ln, null, t)
}
function Zn(t) {
  return t == null || typeof t == 'boolean'
    ? qt(Ln)
    : Rt(t)
      ? qt(fe, null, t.slice())
      : typeof t == 'object'
        ? pi(t)
        : qt(kc, null, String(t))
}
function pi(t) {
  return (t.el === null && t.patchFlag !== -1) || t.memo ? t : ki(t)
}
function wh(t, e) {
  let r = 0
  const { shapeFlag: o } = t
  if (e == null) e = null
  else if (Rt(e)) r = 16
  else if (typeof e == 'object')
    if (o & 65) {
      const l = e.default
      l && (l._c && (l._d = !1), wh(t, l()), l._c && (l._d = !0))
      return
    } else {
      r = 32
      const l = e._
      !l && !(Cc in e)
        ? (e._ctx = Ze)
        : l === 3 && Ze && (Ze.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)))
    }
  else
    Wt(e) ? ((e = { default: e, _ctx: Ze }), (r = 32)) : ((e = String(e)), o & 64 ? ((r = 16), (e = [dn(e)])) : (r = 8))
  ;(t.children = e), (t.shapeFlag |= r)
}
function _i(...t) {
  const e = {}
  for (let r = 0; r < t.length; r++) {
    const o = t[r]
    for (const l in o)
      if (l === 'class') e.class !== o.class && (e.class = ve([e.class, o.class]))
      else if (l === 'style') e.style = En([e.style, o.style])
      else if (pc(l)) {
        const u = e[l],
          f = o[l]
        f && u !== f && !(Rt(u) && u.includes(f)) && (e[l] = u ? [].concat(u, f) : f)
      } else l !== '' && (e[l] = o[l])
  }
  return e
}
function hr(t, e, r, o = null) {
  Wn(t, e, 7, [r, o])
}
const P_ = Jm()
let O_ = 0
function $_(t, e, r) {
  const o = t.type,
    l = (e ? e.appContext : t.appContext) || P_,
    u = {
      uid: O_++,
      vnode: t,
      type: o,
      parent: e,
      appContext: l,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ux(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(l.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: t0(o, l),
      emitsOptions: Im(o, l),
      emit: null,
      emitted: null,
      propsDefaults: xe,
      inheritAttrs: o.inheritAttrs,
      ctx: xe,
      data: xe,
      props: xe,
      attrs: xe,
      slots: xe,
      refs: xe,
      setupState: xe,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: r,
      suspenseId: r ? r.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (u.ctx = { _: u }), (u.root = e ? e.root : u), (u.emit = $1.bind(null, u)), t.ce && t.ce(u), u
}
let je = null
const Sa = () => je || Ze
let xh,
  No,
  mg = '__VUE_INSTANCE_SETTERS__'
;(No = of()[mg]) || (No = of()[mg] = []),
  No.push((t) => (je = t)),
  (xh = (t) => {
    No.length > 1 ? No.forEach((e) => e(t)) : No[0](t)
  })
const Yo = (t) => {
    xh(t), t.scope.on()
  },
  Yi = () => {
    je && je.scope.off(), xh(null)
  }
function l0(t) {
  return t.vnode.shapeFlag & 4
}
let fa = !1
function D_(t, e = !1) {
  fa = e
  const { props: r, children: o } = t.vnode,
    l = l0(t)
  x_(t, r, l, e), k_(t, o)
  const u = l ? R_(t, e) : void 0
  return (fa = !1), u
}
function R_(t, e) {
  const r = t.type
  ;(t.accessCache = Object.create(null)), (t.proxy = sh(new Proxy(t.ctx, f_)))
  const { setup: o } = r
  if (o) {
    const l = (t.setupContext = o.length > 1 ? u0(t) : null)
    Yo(t), os()
    const u = xi(o, t, 0, [t.props, l])
    if ((ss(), Yi(), hm(u))) {
      if ((u.then(Yi, Yi), e))
        return u
          .then((f) => {
            yf(t, f, e)
          })
          .catch((f) => {
            _a(f, t, 0)
          })
      t.asyncDep = u
    } else yf(t, u, e)
  } else c0(t, e)
}
function yf(t, e, r) {
  Wt(e) ? (t.type.__ssrInlineRender ? (t.ssrRender = e) : (t.render = e)) : be(e) && (t.setupState = Nm(e)), c0(t, r)
}
let yg
function c0(t, e, r) {
  const o = t.type
  if (!t.render) {
    if (!e && yg && !o.render) {
      const l = o.template || yh(t).template
      if (l) {
        const { isCustomElement: u, compilerOptions: f } = t.appContext.config,
          { delimiters: h, compilerOptions: d } = o,
          g = Oe(Oe({ isCustomElement: u, delimiters: h }, f), d)
        o.render = yg(l, g)
      }
    }
    t.render = o.render || er
  }
  Yo(t), os(), p_(t), ss(), Yi()
}
function z_(t) {
  return (
    t.attrsProxy ||
    (t.attrsProxy = new Proxy(t.attrs, {
      get(e, r) {
        return Mn(t, 'get', '$attrs'), e[r]
      },
    }))
  )
}
function u0(t) {
  const e = (r) => {
    t.exposed = r || {}
  }
  return {
    get attrs() {
      return z_(t)
    },
    slots: t.slots,
    emit: t.emit,
    expose: e,
  }
}
function Tc(t) {
  if (t.exposed)
    return (
      t.exposeProxy ||
      (t.exposeProxy = new Proxy(Nm(sh(t.exposed)), {
        get(e, r) {
          if (r in e) return e[r]
          if (r in Qs) return Qs[r](t)
        },
        has(e, r) {
          return r in e || r in Qs
        },
      }))
    )
}
function I_(t, e = !0) {
  return Wt(t) ? t.displayName || t.name : t.name || (e && t.__name)
}
function F_(t) {
  return Wt(t) && '__vccOpts' in t
}
const yt = (t, e) => A1(t, e, fa)
function ka(t, e, r) {
  const o = arguments.length
  return o === 2
    ? be(e) && !Rt(e)
      ? ua(e)
        ? qt(t, null, [e])
        : qt(t, e)
      : qt(t, null, e)
    : (o > 3 ? (r = Array.prototype.slice.call(arguments, 2)) : o === 3 && ua(r) && (r = [r]), qt(t, e, r))
}
const q_ = Symbol.for('v-scx'),
  H_ = () => zr(q_),
  B_ = '3.3.4',
  W_ = 'http://www.w3.org/2000/svg',
  ji = typeof document < 'u' ? document : null,
  bg = ji && ji.createElement('template'),
  U_ = {
    insert: (t, e, r) => {
      e.insertBefore(t, r || null)
    },
    remove: (t) => {
      const e = t.parentNode
      e && e.removeChild(t)
    },
    createElement: (t, e, r, o) => {
      const l = e ? ji.createElementNS(W_, t) : ji.createElement(t, r ? { is: r } : void 0)
      return t === 'select' && o && o.multiple != null && l.setAttribute('multiple', o.multiple), l
    },
    createText: (t) => ji.createTextNode(t),
    createComment: (t) => ji.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e
    },
    setElementText: (t, e) => {
      t.textContent = e
    },
    parentNode: (t) => t.parentNode,
    nextSibling: (t) => t.nextSibling,
    querySelector: (t) => ji.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, '')
    },
    insertStaticContent(t, e, r, o, l, u) {
      const f = r ? r.previousSibling : e.lastChild
      if (l && (l === u || l.nextSibling))
        for (; e.insertBefore(l.cloneNode(!0), r), !(l === u || !(l = l.nextSibling)); );
      else {
        bg.innerHTML = o ? `<svg>${t}</svg>` : t
        const h = bg.content
        if (o) {
          const d = h.firstChild
          for (; d.firstChild; ) h.appendChild(d.firstChild)
          h.removeChild(d)
        }
        e.insertBefore(h, r)
      }
      return [f ? f.nextSibling : e.firstChild, r ? r.previousSibling : e.lastChild]
    },
  }
function j_(t, e, r) {
  const o = t._vtc
  o && (e = (e ? [e, ...o] : [...o]).join(' ')),
    e == null ? t.removeAttribute('class') : r ? t.setAttribute('class', e) : (t.className = e)
}
function G_(t, e, r) {
  const o = t.style,
    l = ze(r)
  if (r && !l) {
    if (e && !ze(e)) for (const u in e) r[u] == null && bf(o, u, '')
    for (const u in r) bf(o, u, r[u])
  } else {
    const u = o.display
    l ? e !== r && (o.cssText = r) : e && t.removeAttribute('style'), '_vod' in t && (o.display = u)
  }
}
const wg = /\s*!important$/
function bf(t, e, r) {
  if (Rt(r)) r.forEach((o) => bf(t, e, o))
  else if ((r == null && (r = ''), e.startsWith('--'))) t.setProperty(e, r)
  else {
    const o = V_(t, e)
    wg.test(r) ? t.setProperty(io(o), r.replace(wg, ''), 'important') : (t[o] = r)
  }
}
const xg = ['Webkit', 'Moz', 'ms'],
  qu = {}
function V_(t, e) {
  const r = qu[e]
  if (r) return r
  let o = yr(e)
  if (o !== 'filter' && o in t) return (qu[e] = o)
  o = mc(o)
  for (let l = 0; l < xg.length; l++) {
    const u = xg[l] + o
    if (u in t) return (qu[e] = u)
  }
  return e
}
const _g = 'http://www.w3.org/1999/xlink'
function K_(t, e, r, o, l) {
  if (o && e.startsWith('xlink:'))
    r == null ? t.removeAttributeNS(_g, e.slice(6, e.length)) : t.setAttributeNS(_g, e, r)
  else {
    const u = Wx(e)
    r == null || (u && !vm(r)) ? t.removeAttribute(e) : t.setAttribute(e, u ? '' : r)
  }
}
function X_(t, e, r, o, l, u, f) {
  if (e === 'innerHTML' || e === 'textContent') {
    o && f(o, l, u), (t[e] = r ?? '')
    return
  }
  const h = t.tagName
  if (e === 'value' && h !== 'PROGRESS' && !h.includes('-')) {
    t._value = r
    const g = h === 'OPTION' ? t.getAttribute('value') : t.value,
      v = r ?? ''
    g !== v && (t.value = v), r == null && t.removeAttribute(e)
    return
  }
  let d = !1
  if (r === '' || r == null) {
    const g = typeof t[e]
    g === 'boolean'
      ? (r = vm(r))
      : r == null && g === 'string'
        ? ((r = ''), (d = !0))
        : g === 'number' && ((r = 0), (d = !0))
  }
  try {
    t[e] = r
  } catch {}
  d && t.removeAttribute(e)
}
function Oo(t, e, r, o) {
  t.addEventListener(e, r, o)
}
function Y_(t, e, r, o) {
  t.removeEventListener(e, r, o)
}
function Z_(t, e, r, o, l = null) {
  const u = t._vei || (t._vei = {}),
    f = u[e]
  if (o && f) f.value = o
  else {
    const [h, d] = J_(e)
    if (o) {
      const g = (u[e] = eS(o, l))
      Oo(t, h, g, d)
    } else f && (Y_(t, h, f, d), (u[e] = void 0))
  }
}
const Sg = /(?:Once|Passive|Capture)$/
function J_(t) {
  let e
  if (Sg.test(t)) {
    e = {}
    let o
    for (; (o = t.match(Sg)); ) (t = t.slice(0, t.length - o[0].length)), (e[o[0].toLowerCase()] = !0)
  }
  return [t[2] === ':' ? t.slice(3) : io(t.slice(2)), e]
}
let Hu = 0
const Q_ = Promise.resolve(),
  tS = () => Hu || (Q_.then(() => (Hu = 0)), (Hu = Date.now()))
function eS(t, e) {
  const r = (o) => {
    if (!o._vts) o._vts = Date.now()
    else if (o._vts <= r.attached) return
    Wn(nS(o, r.value), e, 5, [o])
  }
  return (r.value = t), (r.attached = tS()), r
}
function nS(t, e) {
  if (Rt(e)) {
    const r = t.stopImmediatePropagation
    return (
      (t.stopImmediatePropagation = () => {
        r.call(t), (t._stopped = !0)
      }),
      e.map((o) => (l) => !l._stopped && o && o(l))
    )
  } else return e
}
const kg = /^on[a-z]/,
  rS = (t, e, r, o, l = !1, u, f, h, d) => {
    e === 'class'
      ? j_(t, o, l)
      : e === 'style'
        ? G_(t, r, o)
        : pc(e)
          ? Yf(e) || Z_(t, e, r, o, f)
          : (e[0] === '.' ? ((e = e.slice(1)), !0) : e[0] === '^' ? ((e = e.slice(1)), !1) : iS(t, e, o, l))
            ? X_(t, e, o, u, f, h, d)
            : (e === 'true-value' ? (t._trueValue = o) : e === 'false-value' && (t._falseValue = o), K_(t, e, o, l))
  }
function iS(t, e, r, o) {
  return o
    ? !!(e === 'innerHTML' || e === 'textContent' || (e in t && kg.test(e) && Wt(r)))
    : e === 'spellcheck' ||
        e === 'draggable' ||
        e === 'translate' ||
        e === 'form' ||
        (e === 'list' && t.tagName === 'INPUT') ||
        (e === 'type' && t.tagName === 'TEXTAREA') ||
        (kg.test(e) && ze(r))
      ? !1
      : e in t
}
const ui = 'transition',
  Ws = 'animation',
  _h = (t, { slots: e }) => ka(J1, oS(t), e)
_h.displayName = 'Transition'
const f0 = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
}
_h.props = Oe({}, Bm, f0)
const Hi = (t, e = []) => {
    Rt(t) ? t.forEach((r) => r(...e)) : t && t(...e)
  },
  Cg = (t) => (t ? (Rt(t) ? t.some((e) => e.length > 1) : t.length > 1) : !1)
function oS(t) {
  const e = {}
  for (const pt in t) pt in f0 || (e[pt] = t[pt])
  if (t.css === !1) return e
  const {
      name: r = 'v',
      type: o,
      duration: l,
      enterFromClass: u = `${r}-enter-from`,
      enterActiveClass: f = `${r}-enter-active`,
      enterToClass: h = `${r}-enter-to`,
      appearFromClass: d = u,
      appearActiveClass: g = f,
      appearToClass: v = h,
      leaveFromClass: b = `${r}-leave-from`,
      leaveActiveClass: x = `${r}-leave-active`,
      leaveToClass: S = `${r}-leave-to`,
    } = t,
    M = sS(l),
    T = M && M[0],
    N = M && M[1],
    {
      onBeforeEnter: E,
      onEnter: L,
      onEnterCancelled: F,
      onLeave: A,
      onLeaveCancelled: B,
      onBeforeAppear: tt = E,
      onAppear: ft = L,
      onAppearCancelled: X = F,
    } = e,
    st = (pt, V, R) => {
      Bi(pt, V ? v : h), Bi(pt, V ? g : f), R && R()
    },
    ot = (pt, V) => {
      ;(pt._isLeaving = !1), Bi(pt, b), Bi(pt, S), Bi(pt, x), V && V()
    },
    kt = (pt) => (V, R) => {
      const k = pt ? ft : L,
        H = () => st(V, pt, R)
      Hi(k, [V, H]),
        Tg(() => {
          Bi(V, pt ? d : u), fi(V, pt ? v : h), Cg(k) || Eg(V, o, T, H)
        })
    }
  return Oe(e, {
    onBeforeEnter(pt) {
      Hi(E, [pt]), fi(pt, u), fi(pt, f)
    },
    onBeforeAppear(pt) {
      Hi(tt, [pt]), fi(pt, d), fi(pt, g)
    },
    onEnter: kt(!1),
    onAppear: kt(!0),
    onLeave(pt, V) {
      pt._isLeaving = !0
      const R = () => ot(pt, V)
      fi(pt, b),
        cS(),
        fi(pt, x),
        Tg(() => {
          pt._isLeaving && (Bi(pt, b), fi(pt, S), Cg(A) || Eg(pt, o, N, R))
        }),
        Hi(A, [pt, R])
    },
    onEnterCancelled(pt) {
      st(pt, !1), Hi(F, [pt])
    },
    onAppearCancelled(pt) {
      st(pt, !0), Hi(X, [pt])
    },
    onLeaveCancelled(pt) {
      ot(pt), Hi(B, [pt])
    },
  })
}
function sS(t) {
  if (t == null) return null
  if (be(t)) return [Bu(t.enter), Bu(t.leave)]
  {
    const e = Bu(t)
    return [e, e]
  }
}
function Bu(t) {
  return gm(t)
}
function fi(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.add(r)), (t._vtc || (t._vtc = new Set())).add(e)
}
function Bi(t, e) {
  e.split(/\s+/).forEach((o) => o && t.classList.remove(o))
  const { _vtc: r } = t
  r && (r.delete(e), r.size || (t._vtc = void 0))
}
function Tg(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t)
  })
}
let aS = 0
function Eg(t, e, r, o) {
  const l = (t._endId = ++aS),
    u = () => {
      l === t._endId && o()
    }
  if (r) return setTimeout(u, r)
  const { type: f, timeout: h, propCount: d } = lS(t, e)
  if (!f) return o()
  const g = f + 'end'
  let v = 0
  const b = () => {
      t.removeEventListener(g, x), u()
    },
    x = (S) => {
      S.target === t && ++v >= d && b()
    }
  setTimeout(() => {
    v < d && b()
  }, h + 1),
    t.addEventListener(g, x)
}
function lS(t, e) {
  const r = window.getComputedStyle(t),
    o = (M) => (r[M] || '').split(', '),
    l = o(`${ui}Delay`),
    u = o(`${ui}Duration`),
    f = Lg(l, u),
    h = o(`${Ws}Delay`),
    d = o(`${Ws}Duration`),
    g = Lg(h, d)
  let v = null,
    b = 0,
    x = 0
  e === ui
    ? f > 0 && ((v = ui), (b = f), (x = u.length))
    : e === Ws
      ? g > 0 && ((v = Ws), (b = g), (x = d.length))
      : ((b = Math.max(f, g)), (v = b > 0 ? (f > g ? ui : Ws) : null), (x = v ? (v === ui ? u.length : d.length) : 0))
  const S = v === ui && /\b(transform|all)(,|$)/.test(o(`${ui}Property`).toString())
  return { type: v, timeout: b, propCount: x, hasTransform: S }
}
function Lg(t, e) {
  for (; t.length < e.length; ) t = t.concat(t)
  return Math.max(...e.map((r, o) => Ag(r) + Ag(t[o])))
}
function Ag(t) {
  return Number(t.slice(0, -1).replace(',', '.')) * 1e3
}
function cS() {
  return document.body.offsetHeight
}
const Mg = (t) => {
  const e = t.props['onUpdate:modelValue'] || !1
  return Rt(e) ? (r) => Nl(e, r) : e
}
function uS(t) {
  t.target.composing = !0
}
function Ng(t) {
  const e = t.target
  e.composing && ((e.composing = !1), e.dispatchEvent(new Event('input')))
}
const fS = {
    created(t, { modifiers: { lazy: e, trim: r, number: o } }, l) {
      t._assign = Mg(l)
      const u = o || (l.props && l.props.type === 'number')
      Oo(t, e ? 'change' : 'input', (f) => {
        if (f.target.composing) return
        let h = t.value
        r && (h = h.trim()), u && (h = rf(h)), t._assign(h)
      }),
        r &&
          Oo(t, 'change', () => {
            t.value = t.value.trim()
          }),
        e || (Oo(t, 'compositionstart', uS), Oo(t, 'compositionend', Ng), Oo(t, 'change', Ng))
    },
    mounted(t, { value: e }) {
      t.value = e ?? ''
    },
    beforeUpdate(t, { value: e, modifiers: { lazy: r, trim: o, number: l } }, u) {
      if (
        ((t._assign = Mg(u)),
        t.composing ||
          (document.activeElement === t &&
            t.type !== 'range' &&
            (r || (o && t.value.trim() === e) || ((l || t.type === 'number') && rf(t.value) === e))))
      )
        return
      const f = e ?? ''
      t.value !== f && (t.value = f)
    },
  },
  hS = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  wf = (t, e) => (r) => {
    if (!('key' in r)) return
    const o = io(r.key)
    if (e.some((l) => l === o || hS[l] === o)) return t(r)
  },
  xf = {
    beforeMount(t, { value: e }, { transition: r }) {
      ;(t._vod = t.style.display === 'none' ? '' : t.style.display), r && e ? r.beforeEnter(t) : Us(t, e)
    },
    mounted(t, { value: e }, { transition: r }) {
      r && e && r.enter(t)
    },
    updated(t, { value: e, oldValue: r }, { transition: o }) {
      !e != !r &&
        (o
          ? e
            ? (o.beforeEnter(t), Us(t, !0), o.enter(t))
            : o.leave(t, () => {
                Us(t, !1)
              })
          : Us(t, e))
    },
    beforeUnmount(t, { value: e }) {
      Us(t, e)
    },
  }
function Us(t, e) {
  t.style.display = e ? t._vod : 'none'
}
const dS = Oe({ patchProp: rS }, U_)
let Pg
function pS() {
  return Pg || (Pg = T_(dS))
}
const h0 = (...t) => {
  const e = pS().createApp(...t),
    { mount: r } = e
  return (
    (e.mount = (o) => {
      const l = gS(o)
      if (!l) return
      const u = e._component
      !Wt(u) && !u.render && !u.template && (u.template = l.innerHTML), (l.innerHTML = '')
      const f = r(l, !1, l instanceof SVGElement)
      return l instanceof Element && (l.removeAttribute('v-cloak'), l.setAttribute('data-v-app', '')), f
    }),
    e
  )
}
function gS(t) {
  return ze(t) ? document.querySelector(t) : t
}
const so = (t, e) => {
    const r = t.__vccOpts || t
    for (const [o, l] of e) r[o] = l
    return r
  },
  vS = {}
function mS(t, e) {
  const r = Qi('RouterView')
  return ct(), Zt(r)
}
const yS = so(vS, [['render', mS]])
/*!
 * vue-router v4.2.2
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const $o = typeof window < 'u'
function bS(t) {
  return t.__esModule || t[Symbol.toStringTag] === 'Module'
}
const pe = Object.assign
function Wu(t, e) {
  const r = {}
  for (const o in e) {
    const l = e[o]
    r[o] = rr(l) ? l.map(t) : t(l)
  }
  return r
}
const ea = () => {},
  rr = Array.isArray,
  wS = /\/$/,
  xS = (t) => t.replace(wS, '')
function Uu(t, e, r = '/') {
  let o,
    l = {},
    u = '',
    f = ''
  const h = e.indexOf('#')
  let d = e.indexOf('?')
  return (
    h < d && h >= 0 && (d = -1),
    d > -1 && ((o = e.slice(0, d)), (u = e.slice(d + 1, h > -1 ? h : e.length)), (l = t(u))),
    h > -1 && ((o = o || e.slice(0, h)), (f = e.slice(h, e.length))),
    (o = CS(o ?? e, r)),
    { fullPath: o + (u && '?') + u + f, path: o, query: l, hash: f }
  )
}
function _S(t, e) {
  const r = e.query ? t(e.query) : ''
  return e.path + (r && '?') + r + (e.hash || '')
}
function Og(t, e) {
  return !e || !t.toLowerCase().startsWith(e.toLowerCase()) ? t : t.slice(e.length) || '/'
}
function SS(t, e, r) {
  const o = e.matched.length - 1,
    l = r.matched.length - 1
  return (
    o > -1 &&
    o === l &&
    Zo(e.matched[o], r.matched[l]) &&
    d0(e.params, r.params) &&
    t(e.query) === t(r.query) &&
    e.hash === r.hash
  )
}
function Zo(t, e) {
  return (t.aliasOf || t) === (e.aliasOf || e)
}
function d0(t, e) {
  if (Object.keys(t).length !== Object.keys(e).length) return !1
  for (const r in t) if (!kS(t[r], e[r])) return !1
  return !0
}
function kS(t, e) {
  return rr(t) ? $g(t, e) : rr(e) ? $g(e, t) : t === e
}
function $g(t, e) {
  return rr(e) ? t.length === e.length && t.every((r, o) => r === e[o]) : t.length === 1 && t[0] === e
}
function CS(t, e) {
  if (t.startsWith('/')) return t
  if (!t) return e
  const r = e.split('/'),
    o = t.split('/'),
    l = o[o.length - 1]
  ;(l === '..' || l === '.') && o.push('')
  let u = r.length - 1,
    f,
    h
  for (f = 0; f < o.length; f++)
    if (((h = o[f]), h !== '.'))
      if (h === '..') u > 1 && u--
      else break
  return r.slice(0, u).join('/') + '/' + o.slice(f - (f === o.length ? 1 : 0)).join('/')
}
var ha
;(function (t) {
  ;(t.pop = 'pop'), (t.push = 'push')
})(ha || (ha = {}))
var na
;(function (t) {
  ;(t.back = 'back'), (t.forward = 'forward'), (t.unknown = '')
})(na || (na = {}))
function TS(t) {
  if (!t)
    if ($o) {
      const e = document.querySelector('base')
      ;(t = (e && e.getAttribute('href')) || '/'), (t = t.replace(/^\w+:\/\/[^\/]+/, ''))
    } else t = '/'
  return t[0] !== '/' && t[0] !== '#' && (t = '/' + t), xS(t)
}
const ES = /^[^#]+#/
function LS(t, e) {
  return t.replace(ES, '#') + e
}
function AS(t, e) {
  const r = document.documentElement.getBoundingClientRect(),
    o = t.getBoundingClientRect()
  return { behavior: e.behavior, left: o.left - r.left - (e.left || 0), top: o.top - r.top - (e.top || 0) }
}
const Ec = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function MS(t) {
  let e
  if ('el' in t) {
    const r = t.el,
      o = typeof r == 'string' && r.startsWith('#'),
      l = typeof r == 'string' ? (o ? document.getElementById(r.slice(1)) : document.querySelector(r)) : r
    if (!l) return
    e = AS(l, t)
  } else e = t
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(e)
    : window.scrollTo(e.left != null ? e.left : window.pageXOffset, e.top != null ? e.top : window.pageYOffset)
}
function Dg(t, e) {
  return (history.state ? history.state.position - e : -1) + t
}
const _f = new Map()
function NS(t, e) {
  _f.set(t, e)
}
function PS(t) {
  const e = _f.get(t)
  return _f.delete(t), e
}
let OS = () => location.protocol + '//' + location.host
function p0(t, e) {
  const { pathname: r, search: o, hash: l } = e,
    u = t.indexOf('#')
  if (u > -1) {
    let h = l.includes(t.slice(u)) ? t.slice(u).length : 1,
      d = l.slice(h)
    return d[0] !== '/' && (d = '/' + d), Og(d, '')
  }
  return Og(r, t) + o + l
}
function $S(t, e, r, o) {
  let l = [],
    u = [],
    f = null
  const h = ({ state: x }) => {
    const S = p0(t, location),
      M = r.value,
      T = e.value
    let N = 0
    if (x) {
      if (((r.value = S), (e.value = x), f && f === M)) {
        f = null
        return
      }
      N = T ? x.position - T.position : 0
    } else o(S)
    l.forEach((E) => {
      E(r.value, M, { delta: N, type: ha.pop, direction: N ? (N > 0 ? na.forward : na.back) : na.unknown })
    })
  }
  function d() {
    f = r.value
  }
  function g(x) {
    l.push(x)
    const S = () => {
      const M = l.indexOf(x)
      M > -1 && l.splice(M, 1)
    }
    return u.push(S), S
  }
  function v() {
    const { history: x } = window
    x.state && x.replaceState(pe({}, x.state, { scroll: Ec() }), '')
  }
  function b() {
    for (const x of u) x()
    ;(u = []), window.removeEventListener('popstate', h), window.removeEventListener('beforeunload', v)
  }
  return (
    window.addEventListener('popstate', h),
    window.addEventListener('beforeunload', v, { passive: !0 }),
    { pauseListeners: d, listen: g, destroy: b }
  )
}
function Rg(t, e, r, o = !1, l = !1) {
  return { back: t, current: e, forward: r, replaced: o, position: window.history.length, scroll: l ? Ec() : null }
}
function DS(t) {
  const { history: e, location: r } = window,
    o = { value: p0(t, r) },
    l = { value: e.state }
  l.value ||
    u(o.value, { back: null, current: o.value, forward: null, position: e.length - 1, replaced: !0, scroll: null }, !0)
  function u(d, g, v) {
    const b = t.indexOf('#'),
      x = b > -1 ? (r.host && document.querySelector('base') ? t : t.slice(b)) + d : OS() + t + d
    try {
      e[v ? 'replaceState' : 'pushState'](g, '', x), (l.value = g)
    } catch (S) {
      console.error(S), r[v ? 'replace' : 'assign'](x)
    }
  }
  function f(d, g) {
    const v = pe({}, e.state, Rg(l.value.back, d, l.value.forward, !0), g, { position: l.value.position })
    u(d, v, !0), (o.value = d)
  }
  function h(d, g) {
    const v = pe({}, l.value, e.state, { forward: d, scroll: Ec() })
    u(v.current, v, !0)
    const b = pe({}, Rg(o.value, d, null), { position: v.position + 1 }, g)
    u(d, b, !1), (o.value = d)
  }
  return { location: o, state: l, push: h, replace: f }
}
function RS(t) {
  t = TS(t)
  const e = DS(t),
    r = $S(t, e.state, e.location, e.replace)
  function o(u, f = !0) {
    f || r.pauseListeners(), history.go(u)
  }
  const l = pe({ location: '', base: t, go: o, createHref: LS.bind(null, t) }, e, r)
  return (
    Object.defineProperty(l, 'location', { enumerable: !0, get: () => e.location.value }),
    Object.defineProperty(l, 'state', { enumerable: !0, get: () => e.state.value }),
    l
  )
}
function zS(t) {
  return (t = location.host ? t || location.pathname + location.search : ''), t.includes('#') || (t += '#'), RS(t)
}
function IS(t) {
  return typeof t == 'string' || (t && typeof t == 'object')
}
function g0(t) {
  return typeof t == 'string' || typeof t == 'symbol'
}
const hi = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  v0 = Symbol('')
var zg
;(function (t) {
  ;(t[(t.aborted = 4)] = 'aborted'), (t[(t.cancelled = 8)] = 'cancelled'), (t[(t.duplicated = 16)] = 'duplicated')
})(zg || (zg = {}))
function Jo(t, e) {
  return pe(new Error(), { type: t, [v0]: !0 }, e)
}
function Nr(t, e) {
  return t instanceof Error && v0 in t && (e == null || !!(t.type & e))
}
const Ig = '[^/]+?',
  FS = { sensitive: !1, strict: !1, start: !0, end: !0 },
  qS = /[.+*?^${}()[\]/\\]/g
function HS(t, e) {
  const r = pe({}, FS, e),
    o = []
  let l = r.start ? '^' : ''
  const u = []
  for (const g of t) {
    const v = g.length ? [] : [90]
    r.strict && !g.length && (l += '/')
    for (let b = 0; b < g.length; b++) {
      const x = g[b]
      let S = 40 + (r.sensitive ? 0.25 : 0)
      if (x.type === 0) b || (l += '/'), (l += x.value.replace(qS, '\\$&')), (S += 40)
      else if (x.type === 1) {
        const { value: M, repeatable: T, optional: N, regexp: E } = x
        u.push({ name: M, repeatable: T, optional: N })
        const L = E || Ig
        if (L !== Ig) {
          S += 10
          try {
            new RegExp(`(${L})`)
          } catch (A) {
            throw new Error(`Invalid custom RegExp for param "${M}" (${L}): ` + A.message)
          }
        }
        let F = T ? `((?:${L})(?:/(?:${L}))*)` : `(${L})`
        b || (F = N && g.length < 2 ? `(?:/${F})` : '/' + F),
          N && (F += '?'),
          (l += F),
          (S += 20),
          N && (S += -8),
          T && (S += -20),
          L === '.*' && (S += -50)
      }
      v.push(S)
    }
    o.push(v)
  }
  if (r.strict && r.end) {
    const g = o.length - 1
    o[g][o[g].length - 1] += 0.7000000000000001
  }
  r.strict || (l += '/?'), r.end ? (l += '$') : r.strict && (l += '(?:/|$)')
  const f = new RegExp(l, r.sensitive ? '' : 'i')
  function h(g) {
    const v = g.match(f),
      b = {}
    if (!v) return null
    for (let x = 1; x < v.length; x++) {
      const S = v[x] || '',
        M = u[x - 1]
      b[M.name] = S && M.repeatable ? S.split('/') : S
    }
    return b
  }
  function d(g) {
    let v = '',
      b = !1
    for (const x of t) {
      ;(!b || !v.endsWith('/')) && (v += '/'), (b = !1)
      for (const S of x)
        if (S.type === 0) v += S.value
        else if (S.type === 1) {
          const { value: M, repeatable: T, optional: N } = S,
            E = M in g ? g[M] : ''
          if (rr(E) && !T)
            throw new Error(`Provided param "${M}" is an array but it is not repeatable (* or + modifiers)`)
          const L = rr(E) ? E.join('/') : E
          if (!L)
            if (N) x.length < 2 && (v.endsWith('/') ? (v = v.slice(0, -1)) : (b = !0))
            else throw new Error(`Missing required param "${M}"`)
          v += L
        }
    }
    return v || '/'
  }
  return { re: f, score: o, keys: u, parse: h, stringify: d }
}
function BS(t, e) {
  let r = 0
  for (; r < t.length && r < e.length; ) {
    const o = e[r] - t[r]
    if (o) return o
    r++
  }
  return t.length < e.length
    ? t.length === 1 && t[0] === 40 + 40
      ? -1
      : 1
    : t.length > e.length
      ? e.length === 1 && e[0] === 40 + 40
        ? 1
        : -1
      : 0
}
function WS(t, e) {
  let r = 0
  const o = t.score,
    l = e.score
  for (; r < o.length && r < l.length; ) {
    const u = BS(o[r], l[r])
    if (u) return u
    r++
  }
  if (Math.abs(l.length - o.length) === 1) {
    if (Fg(o)) return 1
    if (Fg(l)) return -1
  }
  return l.length - o.length
}
function Fg(t) {
  const e = t[t.length - 1]
  return t.length > 0 && e[e.length - 1] < 0
}
const US = { type: 0, value: '' },
  jS = /[a-zA-Z0-9_]/
function GS(t) {
  if (!t) return [[]]
  if (t === '/') return [[US]]
  if (!t.startsWith('/')) throw new Error(`Invalid path "${t}"`)
  function e(S) {
    throw new Error(`ERR (${r})/"${g}": ${S}`)
  }
  let r = 0,
    o = r
  const l = []
  let u
  function f() {
    u && l.push(u), (u = [])
  }
  let h = 0,
    d,
    g = '',
    v = ''
  function b() {
    g &&
      (r === 0
        ? u.push({ type: 0, value: g })
        : r === 1 || r === 2 || r === 3
          ? (u.length > 1 &&
              (d === '*' || d === '+') &&
              e(`A repeatable param (${g}) must be alone in its segment. eg: '/:ids+.`),
            u.push({
              type: 1,
              value: g,
              regexp: v,
              repeatable: d === '*' || d === '+',
              optional: d === '*' || d === '?',
            }))
          : e('Invalid state to consume buffer'),
      (g = ''))
  }
  function x() {
    g += d
  }
  for (; h < t.length; ) {
    if (((d = t[h++]), d === '\\' && r !== 2)) {
      ;(o = r), (r = 4)
      continue
    }
    switch (r) {
      case 0:
        d === '/' ? (g && b(), f()) : d === ':' ? (b(), (r = 1)) : x()
        break
      case 4:
        x(), (r = o)
        break
      case 1:
        d === '(' ? (r = 2) : jS.test(d) ? x() : (b(), (r = 0), d !== '*' && d !== '?' && d !== '+' && h--)
        break
      case 2:
        d === ')' ? (v[v.length - 1] == '\\' ? (v = v.slice(0, -1) + d) : (r = 3)) : (v += d)
        break
      case 3:
        b(), (r = 0), d !== '*' && d !== '?' && d !== '+' && h--, (v = '')
        break
      default:
        e('Unknown state')
        break
    }
  }
  return r === 2 && e(`Unfinished custom RegExp for param "${g}"`), b(), f(), l
}
function VS(t, e, r) {
  const o = HS(GS(t.path), r),
    l = pe(o, { record: t, parent: e, children: [], alias: [] })
  return e && !l.record.aliasOf == !e.record.aliasOf && e.children.push(l), l
}
function KS(t, e) {
  const r = [],
    o = new Map()
  e = Bg({ strict: !1, end: !0, sensitive: !1 }, e)
  function l(v) {
    return o.get(v)
  }
  function u(v, b, x) {
    const S = !x,
      M = XS(v)
    M.aliasOf = x && x.record
    const T = Bg(e, v),
      N = [M]
    if ('alias' in v) {
      const F = typeof v.alias == 'string' ? [v.alias] : v.alias
      for (const A of F)
        N.push(pe({}, M, { components: x ? x.record.components : M.components, path: A, aliasOf: x ? x.record : M }))
    }
    let E, L
    for (const F of N) {
      const { path: A } = F
      if (b && A[0] !== '/') {
        const B = b.record.path,
          tt = B[B.length - 1] === '/' ? '' : '/'
        F.path = b.record.path + (A && tt + A)
      }
      if (
        ((E = VS(F, b, T)),
        x ? x.alias.push(E) : ((L = L || E), L !== E && L.alias.push(E), S && v.name && !Hg(E) && f(v.name)),
        M.children)
      ) {
        const B = M.children
        for (let tt = 0; tt < B.length; tt++) u(B[tt], E, x && x.children[tt])
      }
      ;(x = x || E),
        ((E.record.components && Object.keys(E.record.components).length) || E.record.name || E.record.redirect) && d(E)
    }
    return L
      ? () => {
          f(L)
        }
      : ea
  }
  function f(v) {
    if (g0(v)) {
      const b = o.get(v)
      b && (o.delete(v), r.splice(r.indexOf(b), 1), b.children.forEach(f), b.alias.forEach(f))
    } else {
      const b = r.indexOf(v)
      b > -1 && (r.splice(b, 1), v.record.name && o.delete(v.record.name), v.children.forEach(f), v.alias.forEach(f))
    }
  }
  function h() {
    return r
  }
  function d(v) {
    let b = 0
    for (; b < r.length && WS(v, r[b]) >= 0 && (v.record.path !== r[b].record.path || !m0(v, r[b])); ) b++
    r.splice(b, 0, v), v.record.name && !Hg(v) && o.set(v.record.name, v)
  }
  function g(v, b) {
    let x,
      S = {},
      M,
      T
    if ('name' in v && v.name) {
      if (((x = o.get(v.name)), !x)) throw Jo(1, { location: v })
      ;(T = x.record.name),
        (S = pe(
          qg(
            b.params,
            x.keys.filter((L) => !L.optional).map((L) => L.name),
          ),
          v.params &&
            qg(
              v.params,
              x.keys.map((L) => L.name),
            ),
        )),
        (M = x.stringify(S))
    } else if ('path' in v)
      (M = v.path), (x = r.find((L) => L.re.test(M))), x && ((S = x.parse(M)), (T = x.record.name))
    else {
      if (((x = b.name ? o.get(b.name) : r.find((L) => L.re.test(b.path))), !x))
        throw Jo(1, { location: v, currentLocation: b })
      ;(T = x.record.name), (S = pe({}, b.params, v.params)), (M = x.stringify(S))
    }
    const N = []
    let E = x
    for (; E; ) N.unshift(E.record), (E = E.parent)
    return { name: T, path: M, params: S, matched: N, meta: ZS(N) }
  }
  return t.forEach((v) => u(v)), { addRoute: u, resolve: g, removeRoute: f, getRoutes: h, getRecordMatcher: l }
}
function qg(t, e) {
  const r = {}
  for (const o of e) o in t && (r[o] = t[o])
  return r
}
function XS(t) {
  return {
    path: t.path,
    redirect: t.redirect,
    name: t.name,
    meta: t.meta || {},
    aliasOf: void 0,
    beforeEnter: t.beforeEnter,
    props: YS(t),
    children: t.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: 'components' in t ? t.components || null : t.component && { default: t.component },
  }
}
function YS(t) {
  const e = {},
    r = t.props || !1
  if ('component' in t) e.default = r
  else for (const o in t.components) e[o] = typeof r == 'boolean' ? r : r[o]
  return e
}
function Hg(t) {
  for (; t; ) {
    if (t.record.aliasOf) return !0
    t = t.parent
  }
  return !1
}
function ZS(t) {
  return t.reduce((e, r) => pe(e, r.meta), {})
}
function Bg(t, e) {
  const r = {}
  for (const o in t) r[o] = o in e ? e[o] : t[o]
  return r
}
function m0(t, e) {
  return e.children.some((r) => r === t || m0(t, r))
}
const y0 = /#/g,
  JS = /&/g,
  QS = /\//g,
  tk = /=/g,
  ek = /\?/g,
  b0 = /\+/g,
  nk = /%5B/g,
  rk = /%5D/g,
  w0 = /%5E/g,
  ik = /%60/g,
  x0 = /%7B/g,
  ok = /%7C/g,
  _0 = /%7D/g,
  sk = /%20/g
function Sh(t) {
  return encodeURI('' + t)
    .replace(ok, '|')
    .replace(nk, '[')
    .replace(rk, ']')
}
function ak(t) {
  return Sh(t).replace(x0, '{').replace(_0, '}').replace(w0, '^')
}
function Sf(t) {
  return Sh(t)
    .replace(b0, '%2B')
    .replace(sk, '+')
    .replace(y0, '%23')
    .replace(JS, '%26')
    .replace(ik, '`')
    .replace(x0, '{')
    .replace(_0, '}')
    .replace(w0, '^')
}
function lk(t) {
  return Sf(t).replace(tk, '%3D')
}
function ck(t) {
  return Sh(t).replace(y0, '%23').replace(ek, '%3F')
}
function uk(t) {
  return t == null ? '' : ck(t).replace(QS, '%2F')
}
function Xl(t) {
  try {
    return decodeURIComponent('' + t)
  } catch {}
  return '' + t
}
function fk(t) {
  const e = {}
  if (t === '' || t === '?') return e
  const o = (t[0] === '?' ? t.slice(1) : t).split('&')
  for (let l = 0; l < o.length; ++l) {
    const u = o[l].replace(b0, ' '),
      f = u.indexOf('='),
      h = Xl(f < 0 ? u : u.slice(0, f)),
      d = f < 0 ? null : Xl(u.slice(f + 1))
    if (h in e) {
      let g = e[h]
      rr(g) || (g = e[h] = [g]), g.push(d)
    } else e[h] = d
  }
  return e
}
function Wg(t) {
  let e = ''
  for (let r in t) {
    const o = t[r]
    if (((r = lk(r)), o == null)) {
      o !== void 0 && (e += (e.length ? '&' : '') + r)
      continue
    }
    ;(rr(o) ? o.map((u) => u && Sf(u)) : [o && Sf(o)]).forEach((u) => {
      u !== void 0 && ((e += (e.length ? '&' : '') + r), u != null && (e += '=' + u))
    })
  }
  return e
}
function hk(t) {
  const e = {}
  for (const r in t) {
    const o = t[r]
    o !== void 0 && (e[r] = rr(o) ? o.map((l) => (l == null ? null : '' + l)) : o == null ? o : '' + o)
  }
  return e
}
const dk = Symbol(''),
  Ug = Symbol(''),
  kh = Symbol(''),
  S0 = Symbol(''),
  kf = Symbol('')
function js() {
  let t = []
  function e(o) {
    return (
      t.push(o),
      () => {
        const l = t.indexOf(o)
        l > -1 && t.splice(l, 1)
      }
    )
  }
  function r() {
    t = []
  }
  return { add: e, list: () => t, reset: r }
}
function gi(t, e, r, o, l) {
  const u = o && (o.enterCallbacks[l] = o.enterCallbacks[l] || [])
  return () =>
    new Promise((f, h) => {
      const d = (b) => {
          b === !1
            ? h(Jo(4, { from: r, to: e }))
            : b instanceof Error
              ? h(b)
              : IS(b)
                ? h(Jo(2, { from: e, to: b }))
                : (u && o.enterCallbacks[l] === u && typeof b == 'function' && u.push(b), f())
        },
        g = t.call(o && o.instances[l], e, r, d)
      let v = Promise.resolve(g)
      t.length < 3 && (v = v.then(d)), v.catch((b) => h(b))
    })
}
function ju(t, e, r, o) {
  const l = []
  for (const u of t)
    for (const f in u.components) {
      let h = u.components[f]
      if (!(e !== 'beforeRouteEnter' && !u.instances[f]))
        if (pk(h)) {
          const g = (h.__vccOpts || h)[e]
          g && l.push(gi(g, r, o, u, f))
        } else {
          let d = h()
          l.push(() =>
            d.then((g) => {
              if (!g) return Promise.reject(new Error(`Couldn't resolve component "${f}" at "${u.path}"`))
              const v = bS(g) ? g.default : g
              u.components[f] = v
              const x = (v.__vccOpts || v)[e]
              return x && gi(x, r, o, u, f)()
            }),
          )
        }
    }
  return l
}
function pk(t) {
  return typeof t == 'object' || 'displayName' in t || 'props' in t || '__vccOpts' in t
}
function jg(t) {
  const e = zr(kh),
    r = zr(S0),
    o = yt(() => e.resolve(G(t.to))),
    l = yt(() => {
      const { matched: d } = o.value,
        { length: g } = d,
        v = d[g - 1],
        b = r.matched
      if (!v || !b.length) return -1
      const x = b.findIndex(Zo.bind(null, v))
      if (x > -1) return x
      const S = Gg(d[g - 2])
      return g > 1 && Gg(v) === S && b[b.length - 1].path !== S ? b.findIndex(Zo.bind(null, d[g - 2])) : x
    }),
    u = yt(() => l.value > -1 && yk(r.params, o.value.params)),
    f = yt(() => l.value > -1 && l.value === r.matched.length - 1 && d0(r.params, o.value.params))
  function h(d = {}) {
    return mk(d) ? e[G(t.replace) ? 'replace' : 'push'](G(t.to)).catch(ea) : Promise.resolve()
  }
  return { route: o, href: yt(() => o.value.href), isActive: u, isExactActive: f, navigate: h }
}
const gk = re({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' },
    },
    useLink: jg,
    setup(t, { slots: e }) {
      const r = zn(jg(t)),
        { options: o } = zr(kh),
        l = yt(() => ({
          [Vg(t.activeClass, o.linkActiveClass, 'router-link-active')]: r.isActive,
          [Vg(t.exactActiveClass, o.linkExactActiveClass, 'router-link-exact-active')]: r.isExactActive,
        }))
      return () => {
        const u = e.default && e.default(r)
        return t.custom
          ? u
          : ka(
              'a',
              {
                'aria-current': r.isExactActive ? t.ariaCurrentValue : null,
                href: r.href,
                onClick: r.navigate,
                class: l.value,
              },
              u,
            )
      }
    },
  }),
  vk = gk
function mk(t) {
  if (
    !(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey) &&
    !t.defaultPrevented &&
    !(t.button !== void 0 && t.button !== 0)
  ) {
    if (t.currentTarget && t.currentTarget.getAttribute) {
      const e = t.currentTarget.getAttribute('target')
      if (/\b_blank\b/i.test(e)) return
    }
    return t.preventDefault && t.preventDefault(), !0
  }
}
function yk(t, e) {
  for (const r in e) {
    const o = e[r],
      l = t[r]
    if (typeof o == 'string') {
      if (o !== l) return !1
    } else if (!rr(l) || l.length !== o.length || o.some((u, f) => u !== l[f])) return !1
  }
  return !0
}
function Gg(t) {
  return t ? (t.aliasOf ? t.aliasOf.path : t.path) : ''
}
const Vg = (t, e, r) => t ?? e ?? r,
  bk = re({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(t, { attrs: e, slots: r }) {
      const o = zr(kf),
        l = yt(() => t.route || o.value),
        u = zr(Ug, 0),
        f = yt(() => {
          let g = G(u)
          const { matched: v } = l.value
          let b
          for (; (b = v[g]) && !b.components; ) g++
          return g
        }),
        h = yt(() => l.value.matched[f.value])
      Pl(
        Ug,
        yt(() => f.value + 1),
      ),
        Pl(dk, h),
        Pl(kf, l)
      const d = Kt()
      return (
        Re(
          () => [d.value, h.value, t.name],
          ([g, v, b], [x, S, M]) => {
            v &&
              ((v.instances[b] = g),
              S &&
                S !== v &&
                g &&
                g === x &&
                (v.leaveGuards.size || (v.leaveGuards = S.leaveGuards),
                v.updateGuards.size || (v.updateGuards = S.updateGuards))),
              g && v && (!S || !Zo(v, S) || !x) && (v.enterCallbacks[b] || []).forEach((T) => T(g))
          },
          { flush: 'post' },
        ),
        () => {
          const g = l.value,
            v = t.name,
            b = h.value,
            x = b && b.components[v]
          if (!x) return Kg(r.default, { Component: x, route: g })
          const S = b.props[v],
            M = S ? (S === !0 ? g.params : typeof S == 'function' ? S(g) : S) : null,
            N = ka(
              x,
              pe({}, M, e, {
                onVnodeUnmounted: (E) => {
                  E.component.isUnmounted && (b.instances[v] = null)
                },
                ref: d,
              }),
            )
          return Kg(r.default, { Component: N, route: g }) || N
        }
      )
    },
  })
function Kg(t, e) {
  if (!t) return null
  const r = t(e)
  return r.length === 1 ? r[0] : r
}
const wk = bk
function xk(t) {
  const e = KS(t.routes, t),
    r = t.parseQuery || fk,
    o = t.stringifyQuery || Wg,
    l = t.history,
    u = js(),
    f = js(),
    h = js(),
    d = as(hi)
  let g = hi
  $o && t.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual')
  const v = Wu.bind(null, (U) => '' + U),
    b = Wu.bind(null, uk),
    x = Wu.bind(null, Xl)
  function S(U, et) {
    let it, Mt
    return g0(U) ? ((it = e.getRecordMatcher(U)), (Mt = et)) : (Mt = U), e.addRoute(Mt, it)
  }
  function M(U) {
    const et = e.getRecordMatcher(U)
    et && e.removeRoute(et)
  }
  function T() {
    return e.getRoutes().map((U) => U.record)
  }
  function N(U) {
    return !!e.getRecordMatcher(U)
  }
  function E(U, et) {
    if (((et = pe({}, et || d.value)), typeof U == 'string')) {
      const K = Uu(r, U, et.path),
        Q = e.resolve({ path: K.path }, et),
        nt = l.createHref(K.fullPath)
      return pe(K, Q, { params: x(Q.params), hash: Xl(K.hash), redirectedFrom: void 0, href: nt })
    }
    let it
    if ('path' in U) it = pe({}, U, { path: Uu(r, U.path, et.path).path })
    else {
      const K = pe({}, U.params)
      for (const Q in K) K[Q] == null && delete K[Q]
      ;(it = pe({}, U, { params: b(K) })), (et.params = b(et.params))
    }
    const Mt = e.resolve(it, et),
      Nt = U.hash || ''
    Mt.params = v(x(Mt.params))
    const O = _S(o, pe({}, U, { hash: ak(Nt), path: Mt.path })),
      I = l.createHref(O)
    return pe({ fullPath: O, hash: Nt, query: o === Wg ? hk(U.query) : U.query || {} }, Mt, {
      redirectedFrom: void 0,
      href: I,
    })
  }
  function L(U) {
    return typeof U == 'string' ? Uu(r, U, d.value.path) : pe({}, U)
  }
  function F(U, et) {
    if (g !== U) return Jo(8, { from: et, to: U })
  }
  function A(U) {
    return ft(U)
  }
  function B(U) {
    return A(pe(L(U), { replace: !0 }))
  }
  function tt(U) {
    const et = U.matched[U.matched.length - 1]
    if (et && et.redirect) {
      const { redirect: it } = et
      let Mt = typeof it == 'function' ? it(U) : it
      return (
        typeof Mt == 'string' &&
          ((Mt = Mt.includes('?') || Mt.includes('#') ? (Mt = L(Mt)) : { path: Mt }), (Mt.params = {})),
        pe({ query: U.query, hash: U.hash, params: 'path' in Mt ? {} : U.params }, Mt)
      )
    }
  }
  function ft(U, et) {
    const it = (g = E(U)),
      Mt = d.value,
      Nt = U.state,
      O = U.force,
      I = U.replace === !0,
      K = tt(it)
    if (K)
      return ft(pe(L(K), { state: typeof K == 'object' ? pe({}, Nt, K.state) : Nt, force: O, replace: I }), et || it)
    const Q = it
    Q.redirectedFrom = et
    let nt
    return (
      !O && SS(o, Mt, it) && ((nt = Jo(16, { to: Q, from: Mt })), zt(Mt, Mt, !0, !1)),
      (nt ? Promise.resolve(nt) : ot(Q, Mt))
        .catch((at) => (Nr(at) ? (Nr(at, 2) ? at : Tt(at)) : J(at, Q, Mt)))
        .then((at) => {
          if (at) {
            if (Nr(at, 2))
              return ft(
                pe({ replace: I }, L(at.to), {
                  state: typeof at.to == 'object' ? pe({}, Nt, at.to.state) : Nt,
                  force: O,
                }),
                et || Q,
              )
          } else at = pt(Q, Mt, !0, I, Nt)
          return kt(Q, Mt, at), at
        })
    )
  }
  function X(U, et) {
    const it = F(U, et)
    return it ? Promise.reject(it) : Promise.resolve()
  }
  function st(U) {
    const et = Vt.values().next().value
    return et && typeof et.runWithContext == 'function' ? et.runWithContext(U) : U()
  }
  function ot(U, et) {
    let it
    const [Mt, Nt, O] = _k(U, et)
    it = ju(Mt.reverse(), 'beforeRouteLeave', U, et)
    for (const K of Mt)
      K.leaveGuards.forEach((Q) => {
        it.push(gi(Q, U, et))
      })
    const I = X.bind(null, U, et)
    return (
      it.push(I),
      _t(it)
        .then(() => {
          it = []
          for (const K of u.list()) it.push(gi(K, U, et))
          return it.push(I), _t(it)
        })
        .then(() => {
          it = ju(Nt, 'beforeRouteUpdate', U, et)
          for (const K of Nt)
            K.updateGuards.forEach((Q) => {
              it.push(gi(Q, U, et))
            })
          return it.push(I), _t(it)
        })
        .then(() => {
          it = []
          for (const K of U.matched)
            if (K.beforeEnter && !et.matched.includes(K))
              if (rr(K.beforeEnter)) for (const Q of K.beforeEnter) it.push(gi(Q, U, et))
              else it.push(gi(K.beforeEnter, U, et))
          return it.push(I), _t(it)
        })
        .then(
          () => (
            U.matched.forEach((K) => (K.enterCallbacks = {})),
            (it = ju(O, 'beforeRouteEnter', U, et)),
            it.push(I),
            _t(it)
          ),
        )
        .then(() => {
          it = []
          for (const K of f.list()) it.push(gi(K, U, et))
          return it.push(I), _t(it)
        })
        .catch((K) => (Nr(K, 8) ? K : Promise.reject(K)))
    )
  }
  function kt(U, et, it) {
    for (const Mt of h.list()) st(() => Mt(U, et, it))
  }
  function pt(U, et, it, Mt, Nt) {
    const O = F(U, et)
    if (O) return O
    const I = et === hi,
      K = $o ? history.state : {}
    it && (Mt || I ? l.replace(U.fullPath, pe({ scroll: I && K && K.scroll }, Nt)) : l.push(U.fullPath, Nt)),
      (d.value = U),
      zt(U, et, it, I),
      Tt()
  }
  let V
  function R() {
    V ||
      (V = l.listen((U, et, it) => {
        if (!Jt.listening) return
        const Mt = E(U),
          Nt = tt(Mt)
        if (Nt) {
          ft(pe(Nt, { replace: !0 }), Mt).catch(ea)
          return
        }
        g = Mt
        const O = d.value
        $o && NS(Dg(O.fullPath, it.delta), Ec()),
          ot(Mt, O)
            .catch((I) =>
              Nr(I, 12)
                ? I
                : Nr(I, 2)
                  ? (ft(I.to, Mt)
                      .then((K) => {
                        Nr(K, 20) && !it.delta && it.type === ha.pop && l.go(-1, !1)
                      })
                      .catch(ea),
                    Promise.reject())
                  : (it.delta && l.go(-it.delta, !1), J(I, Mt, O)),
            )
            .then((I) => {
              ;(I = I || pt(Mt, O, !1)),
                I && (it.delta && !Nr(I, 8) ? l.go(-it.delta, !1) : it.type === ha.pop && Nr(I, 20) && l.go(-1, !1)),
                kt(Mt, O, I)
            })
            .catch(ea)
      }))
  }
  let k = js(),
    H = js(),
    W
  function J(U, et, it) {
    Tt(U)
    const Mt = H.list()
    return Mt.length ? Mt.forEach((Nt) => Nt(U, et, it)) : console.error(U), Promise.reject(U)
  }
  function wt() {
    return W && d.value !== hi
      ? Promise.resolve()
      : new Promise((U, et) => {
          k.add([U, et])
        })
  }
  function Tt(U) {
    return W || ((W = !U), R(), k.list().forEach(([et, it]) => (U ? it(U) : et())), k.reset()), U
  }
  function zt(U, et, it, Mt) {
    const { scrollBehavior: Nt } = t
    if (!$o || !Nt) return Promise.resolve()
    const O = (!it && PS(Dg(U.fullPath, 0))) || ((Mt || !it) && history.state && history.state.scroll) || null
    return qr()
      .then(() => Nt(U, et, O))
      .then((I) => I && MS(I))
      .catch((I) => J(I, U, et))
  }
  const It = (U) => l.go(U)
  let Gt
  const Vt = new Set(),
    Jt = {
      currentRoute: d,
      listening: !0,
      addRoute: S,
      removeRoute: M,
      hasRoute: N,
      getRoutes: T,
      resolve: E,
      options: t,
      push: A,
      replace: B,
      go: It,
      back: () => It(-1),
      forward: () => It(1),
      beforeEach: u.add,
      beforeResolve: f.add,
      afterEach: h.add,
      onError: H.add,
      isReady: wt,
      install(U) {
        const et = this
        U.component('RouterLink', vk),
          U.component('RouterView', wk),
          (U.config.globalProperties.$router = et),
          Object.defineProperty(U.config.globalProperties, '$route', { enumerable: !0, get: () => G(d) }),
          $o && !Gt && d.value === hi && ((Gt = !0), A(l.location).catch((Nt) => {}))
        const it = {}
        for (const Nt in hi) it[Nt] = yt(() => d.value[Nt])
        U.provide(kh, et), U.provide(S0, zn(it)), U.provide(kf, d)
        const Mt = U.unmount
        Vt.add(U),
          (U.unmount = function () {
            Vt.delete(U), Vt.size < 1 && ((g = hi), V && V(), (V = null), (d.value = hi), (Gt = !1), (W = !1)), Mt()
          })
      },
    }
  function _t(U) {
    return U.reduce((et, it) => et.then(() => st(it)), Promise.resolve())
  }
  return Jt
}
function _k(t, e) {
  const r = [],
    o = [],
    l = [],
    u = Math.max(e.matched.length, t.matched.length)
  for (let f = 0; f < u; f++) {
    const h = e.matched[f]
    h && (t.matched.find((g) => Zo(g, h)) ? o.push(h) : r.push(h))
    const d = t.matched[f]
    d && (e.matched.find((g) => Zo(g, d)) || l.push(d))
  }
  return [r, o, l]
}
function Kr(t) {
  return t.split('-')[0]
}
function Wo(t) {
  return t.split('-')[1]
}
function Ca(t) {
  return ['top', 'bottom'].includes(Kr(t)) ? 'x' : 'y'
}
function Ch(t) {
  return t === 'y' ? 'height' : 'width'
}
function Xg(t) {
  let { reference: e, floating: r, placement: o } = t
  const l = e.x + e.width / 2 - r.width / 2,
    u = e.y + e.height / 2 - r.height / 2
  let f
  switch (Kr(o)) {
    case 'top':
      f = { x: l, y: e.y - r.height }
      break
    case 'bottom':
      f = { x: l, y: e.y + e.height }
      break
    case 'right':
      f = { x: e.x + e.width, y: u }
      break
    case 'left':
      f = { x: e.x - r.width, y: u }
      break
    default:
      f = { x: e.x, y: e.y }
  }
  const h = Ca(o),
    d = Ch(h)
  switch (Wo(o)) {
    case 'start':
      f[h] = f[h] - (e[d] / 2 - r[d] / 2)
      break
    case 'end':
      f[h] = f[h] + (e[d] / 2 - r[d] / 2)
      break
  }
  return f
}
const Sk = async (t, e, r) => {
  const { placement: o = 'bottom', strategy: l = 'absolute', middleware: u = [], platform: f } = r
  let h = await f.getElementRects({ reference: t, floating: e, strategy: l }),
    { x: d, y: g } = Xg({ ...h, placement: o }),
    v = o,
    b = {}
  for (let x = 0; x < u.length; x++) {
    const { name: S, fn: M } = u[x],
      {
        x: T,
        y: N,
        data: E,
        reset: L,
      } = await M({
        x: d,
        y: g,
        initialPlacement: o,
        placement: v,
        strategy: l,
        middlewareData: b,
        rects: h,
        platform: f,
        elements: { reference: t, floating: e },
      })
    if (((d = T ?? d), (g = N ?? g), (b = { ...b, [S]: E ?? {} }), L)) {
      typeof L == 'object' &&
        (L.placement && (v = L.placement),
        L.rects && (h = L.rects === !0 ? await f.getElementRects({ reference: t, floating: e, strategy: l }) : L.rects),
        ({ x: d, y: g } = Xg({ ...h, placement: v }))),
        (x = -1)
      continue
    }
  }
  return { x: d, y: g, placement: v, strategy: l, middlewareData: b }
}
function kk(t) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...t }
}
function k0(t) {
  return typeof t != 'number' ? kk(t) : { top: t, right: t, bottom: t, left: t }
}
function Cf(t) {
  return { ...t, top: t.y, left: t.x, right: t.x + t.width, bottom: t.y + t.height }
}
async function Lc(t, e) {
  e === void 0 && (e = {})
  const { x: r, y: o, platform: l, rects: u, elements: f, strategy: h } = t,
    {
      boundary: d = 'clippingParents',
      rootBoundary: g = 'viewport',
      elementContext: v = 'floating',
      altBoundary: b = !1,
      padding: x = 0,
    } = e,
    S = k0(x),
    T = f[b ? (v === 'floating' ? 'reference' : 'floating') : v],
    N = await l.getClippingClientRect({
      element: (await l.isElement(T)) ? T : T.contextElement || (await l.getDocumentElement({ element: f.floating })),
      boundary: d,
      rootBoundary: g,
    }),
    E = Cf(
      await l.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: v === 'floating' ? { ...u.floating, x: r, y: o } : u.reference,
        offsetParent: await l.getOffsetParent({ element: f.floating }),
        strategy: h,
      }),
    )
  return {
    top: N.top - E.top + S.top,
    bottom: E.bottom - N.bottom + S.bottom,
    left: N.left - E.left + S.left,
    right: E.right - N.right + S.right,
  }
}
const Ck = Math.min,
  Wi = Math.max
function Tf(t, e, r) {
  return Wi(t, Ck(e, r))
}
const Tk = (t) => ({
    name: 'arrow',
    options: t,
    async fn(e) {
      const { element: r, padding: o = 0 } = t ?? {},
        { x: l, y: u, placement: f, rects: h, platform: d } = e
      if (r == null) return {}
      const g = k0(o),
        v = { x: l, y: u },
        b = Kr(f),
        x = Ca(b),
        S = Ch(x),
        M = await d.getDimensions({ element: r }),
        T = x === 'y' ? 'top' : 'left',
        N = x === 'y' ? 'bottom' : 'right',
        E = h.reference[S] + h.reference[x] - v[x] - h.floating[S],
        L = v[x] - h.reference[x],
        F = await d.getOffsetParent({ element: r }),
        A = F ? (x === 'y' ? F.clientHeight || 0 : F.clientWidth || 0) : 0,
        B = E / 2 - L / 2,
        tt = g[T],
        ft = A - M[S] - g[N],
        X = A / 2 - M[S] / 2 + B,
        st = Tf(tt, X, ft)
      return { data: { [x]: st, centerOffset: X - st } }
    },
  }),
  Ek = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
function Yl(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Ek[e])
}
function C0(t, e) {
  const r = Wo(t) === 'start',
    o = Ca(t),
    l = Ch(o)
  let u = o === 'x' ? (r ? 'right' : 'left') : r ? 'bottom' : 'top'
  return e.reference[l] > e.floating[l] && (u = Yl(u)), { main: u, cross: Yl(u) }
}
const Lk = { start: 'end', end: 'start' }
function Ef(t) {
  return t.replace(/start|end/g, (e) => Lk[e])
}
const Ak = ['top', 'right', 'bottom', 'left'],
  Mk = Ak.reduce((t, e) => t.concat(e, e + '-start', e + '-end'), [])
function Nk(t, e, r) {
  return (t ? [...r.filter((l) => Wo(l) === t), ...r.filter((l) => Wo(l) !== t)] : r.filter((l) => Kr(l) === l)).filter(
    (l) => (t ? Wo(l) === t || (e ? Ef(l) !== l : !1) : !0),
  )
}
const Pk = function (t) {
  return (
    t === void 0 && (t = {}),
    {
      name: 'autoPlacement',
      options: t,
      async fn(e) {
        var r, o, l, u, f, h
        const { x: d, y: g, rects: v, middlewareData: b, placement: x } = e,
          { alignment: S = null, allowedPlacements: M = Mk, autoAlignment: T = !0, ...N } = t
        if ((r = b.autoPlacement) != null && r.skip) return {}
        const E = Nk(S, T, M),
          L = await Lc(e, N),
          F = (o = (l = b.autoPlacement) == null ? void 0 : l.index) != null ? o : 0,
          A = E[F],
          { main: B, cross: tt } = C0(A, v)
        if (x !== A) return { x: d, y: g, reset: { placement: E[0] } }
        const ft = [L[Kr(A)], L[B], L[tt]],
          X = [
            ...((u = (f = b.autoPlacement) == null ? void 0 : f.overflows) != null ? u : []),
            { placement: A, overflows: ft },
          ],
          st = E[F + 1]
        if (st) return { data: { index: F + 1, overflows: X }, reset: { placement: st } }
        const ot = X.slice().sort((pt, V) => pt.overflows[0] - V.overflows[0]),
          kt =
            (h = ot.find((pt) => {
              let { overflows: V } = pt
              return V.every((R) => R <= 0)
            })) == null
              ? void 0
              : h.placement
        return { data: { skip: !0 }, reset: { placement: kt ?? ot[0].placement } }
      },
    }
  )
}
function Ok(t) {
  const e = Yl(t)
  return [Ef(t), e, Ef(e)]
}
const $k = function (t) {
  return (
    t === void 0 && (t = {}),
    {
      name: 'flip',
      options: t,
      async fn(e) {
        var r, o
        const { placement: l, middlewareData: u, rects: f, initialPlacement: h } = e
        if ((r = u.flip) != null && r.skip) return {}
        const {
            mainAxis: d = !0,
            crossAxis: g = !0,
            fallbackPlacements: v,
            fallbackStrategy: b = 'bestFit',
            flipAlignment: x = !0,
            ...S
          } = t,
          M = Kr(l),
          N = v || (M === h || !x ? [Yl(h)] : Ok(h)),
          E = [h, ...N],
          L = await Lc(e, S),
          F = []
        let A = ((o = u.flip) == null ? void 0 : o.overflows) || []
        if ((d && F.push(L[M]), g)) {
          const { main: X, cross: st } = C0(l, f)
          F.push(L[X], L[st])
        }
        if (((A = [...A, { placement: l, overflows: F }]), !F.every((X) => X <= 0))) {
          var B, tt
          const X = ((B = (tt = u.flip) == null ? void 0 : tt.index) != null ? B : 0) + 1,
            st = E[X]
          if (st) return { data: { index: X, overflows: A }, reset: { placement: st } }
          let ot = 'bottom'
          switch (b) {
            case 'bestFit': {
              var ft
              const kt =
                (ft = A.slice().sort(
                  (pt, V) =>
                    pt.overflows.filter((R) => R > 0).reduce((R, k) => R + k, 0) -
                    V.overflows.filter((R) => R > 0).reduce((R, k) => R + k, 0),
                )[0]) == null
                  ? void 0
                  : ft.placement
              kt && (ot = kt)
              break
            }
            case 'initialPlacement':
              ot = h
              break
          }
          return { data: { skip: !0 }, reset: { placement: ot } }
        }
        return {}
      },
    }
  )
}
function Dk(t) {
  let { placement: e, rects: r, value: o } = t
  const l = Kr(e),
    u = ['left', 'top'].includes(l) ? -1 : 1,
    f = typeof o == 'function' ? o({ ...r, placement: e }) : o,
    { mainAxis: h, crossAxis: d } =
      typeof f == 'number' ? { mainAxis: f, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...f }
  return Ca(l) === 'x' ? { x: d, y: h * u } : { x: h * u, y: d }
}
const Rk = function (t) {
  return (
    t === void 0 && (t = 0),
    {
      name: 'offset',
      options: t,
      fn(e) {
        const { x: r, y: o, placement: l, rects: u } = e,
          f = Dk({ placement: l, rects: u, value: t })
        return { x: r + f.x, y: o + f.y, data: f }
      },
    }
  )
}
function zk(t) {
  return t === 'x' ? 'y' : 'x'
}
const Ik = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'shift',
        options: t,
        async fn(e) {
          const { x: r, y: o, placement: l } = e,
            {
              mainAxis: u = !0,
              crossAxis: f = !1,
              limiter: h = {
                fn: (N) => {
                  let { x: E, y: L } = N
                  return { x: E, y: L }
                },
              },
              ...d
            } = t,
            g = { x: r, y: o },
            v = await Lc(e, d),
            b = Ca(Kr(l)),
            x = zk(b)
          let S = g[b],
            M = g[x]
          if (u) {
            const N = b === 'y' ? 'top' : 'left',
              E = b === 'y' ? 'bottom' : 'right',
              L = S + v[N],
              F = S - v[E]
            S = Tf(L, S, F)
          }
          if (f) {
            const N = x === 'y' ? 'top' : 'left',
              E = x === 'y' ? 'bottom' : 'right',
              L = M + v[N],
              F = M - v[E]
            M = Tf(L, M, F)
          }
          const T = h.fn({ ...e, [b]: S, [x]: M })
          return { ...T, data: { x: T.x - r, y: T.y - o } }
        },
      }
    )
  },
  Fk = function (t) {
    return (
      t === void 0 && (t = {}),
      {
        name: 'size',
        options: t,
        async fn(e) {
          var r
          const { placement: o, rects: l, middlewareData: u } = e,
            { apply: f, ...h } = t
          if ((r = u.size) != null && r.skip) return {}
          const d = await Lc(e, h),
            g = Kr(o),
            v = Wo(o) === 'end'
          let b, x
          g === 'top' || g === 'bottom' ? ((b = g), (x = v ? 'left' : 'right')) : ((x = g), (b = v ? 'top' : 'bottom'))
          const S = Wi(d.left, 0),
            M = Wi(d.right, 0),
            T = Wi(d.top, 0),
            N = Wi(d.bottom, 0),
            E = {
              height:
                l.floating.height -
                (['left', 'right'].includes(o) ? 2 * (T !== 0 || N !== 0 ? T + N : Wi(d.top, d.bottom)) : d[b]),
              width:
                l.floating.width -
                (['top', 'bottom'].includes(o) ? 2 * (S !== 0 || M !== 0 ? S + M : Wi(d.left, d.right)) : d[x]),
            }
          return f == null || f({ ...E, ...l }), { data: { skip: !0 }, reset: { rects: !0 } }
        },
      }
    )
  }
function Th(t) {
  return (t == null ? void 0 : t.toString()) === '[object Window]'
}
function Ti(t) {
  if (t == null) return window
  if (!Th(t)) {
    const e = t.ownerDocument
    return (e && e.defaultView) || window
  }
  return t
}
function Ac(t) {
  return Ti(t).getComputedStyle(t)
}
function Hr(t) {
  return Th(t) ? '' : t ? (t.nodeName || '').toLowerCase() : ''
}
function Br(t) {
  return t instanceof Ti(t).HTMLElement
}
function Zl(t) {
  return t instanceof Ti(t).Element
}
function qk(t) {
  return t instanceof Ti(t).Node
}
function T0(t) {
  const e = Ti(t).ShadowRoot
  return t instanceof e || t instanceof ShadowRoot
}
function Mc(t) {
  const { overflow: e, overflowX: r, overflowY: o } = Ac(t)
  return /auto|scroll|overlay|hidden/.test(e + o + r)
}
function Hk(t) {
  return ['table', 'td', 'th'].includes(Hr(t))
}
function E0(t) {
  const e = navigator.userAgent.toLowerCase().includes('firefox'),
    r = Ac(t)
  return (
    r.transform !== 'none' ||
    r.perspective !== 'none' ||
    r.contain === 'paint' ||
    ['transform', 'perspective'].includes(r.willChange) ||
    (e && r.willChange === 'filter') ||
    (e && (r.filter ? r.filter !== 'none' : !1))
  )
}
const Yg = Math.min,
  ra = Math.max,
  Jl = Math.round
function Qo(t, e) {
  e === void 0 && (e = !1)
  const r = t.getBoundingClientRect()
  let o = 1,
    l = 1
  return (
    e &&
      Br(t) &&
      ((o = (t.offsetWidth > 0 && Jl(r.width) / t.offsetWidth) || 1),
      (l = (t.offsetHeight > 0 && Jl(r.height) / t.offsetHeight) || 1)),
    {
      width: r.width / o,
      height: r.height / l,
      top: r.top / l,
      right: r.right / o,
      bottom: r.bottom / l,
      left: r.left / o,
      x: r.left / o,
      y: r.top / l,
    }
  )
}
function Ei(t) {
  return ((qk(t) ? t.ownerDocument : t.document) || window.document).documentElement
}
function Nc(t) {
  return Th(t)
    ? { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
    : { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
}
function L0(t) {
  return Qo(Ei(t)).left + Nc(t).scrollLeft
}
function Bk(t) {
  const e = Qo(t)
  return Jl(e.width) !== t.offsetWidth || Jl(e.height) !== t.offsetHeight
}
function Wk(t, e, r) {
  const o = Br(e),
    l = Ei(e),
    u = Qo(t, o && Bk(e))
  let f = { scrollLeft: 0, scrollTop: 0 }
  const h = { x: 0, y: 0 }
  if (o || (!o && r !== 'fixed'))
    if (((Hr(e) !== 'body' || Mc(l)) && (f = Nc(e)), Br(e))) {
      const d = Qo(e, !0)
      ;(h.x = d.x + e.clientLeft), (h.y = d.y + e.clientTop)
    } else l && (h.x = L0(l))
  return { x: u.left + f.scrollLeft - h.x, y: u.top + f.scrollTop - h.y, width: u.width, height: u.height }
}
function Pc(t) {
  return Hr(t) === 'html' ? t : t.assignedSlot || t.parentNode || (T0(t) ? t.host : null) || Ei(t)
}
function Zg(t) {
  return !Br(t) || getComputedStyle(t).position === 'fixed' ? null : t.offsetParent
}
function Uk(t) {
  let e = Pc(t)
  for (; Br(e) && !['html', 'body'].includes(Hr(e)); ) {
    if (E0(e)) return e
    e = e.parentNode
  }
  return null
}
function Lf(t) {
  const e = Ti(t)
  let r = Zg(t)
  for (; r && Hk(r) && getComputedStyle(r).position === 'static'; ) r = Zg(r)
  return r && (Hr(r) === 'html' || (Hr(r) === 'body' && getComputedStyle(r).position === 'static' && !E0(r)))
    ? e
    : r || Uk(t) || e
}
function Jg(t) {
  return { width: t.offsetWidth, height: t.offsetHeight }
}
function jk(t) {
  let { rect: e, offsetParent: r, strategy: o } = t
  const l = Br(r),
    u = Ei(r)
  if (r === u) return e
  let f = { scrollLeft: 0, scrollTop: 0 }
  const h = { x: 0, y: 0 }
  if ((l || (!l && o !== 'fixed')) && ((Hr(r) !== 'body' || Mc(u)) && (f = Nc(r)), Br(r))) {
    const d = Qo(r, !0)
    ;(h.x = d.x + r.clientLeft), (h.y = d.y + r.clientTop)
  }
  return { ...e, x: e.x - f.scrollLeft + h.x, y: e.y - f.scrollTop + h.y }
}
function Gk(t) {
  const e = Ti(t),
    r = Ei(t),
    o = e.visualViewport
  let l = r.clientWidth,
    u = r.clientHeight,
    f = 0,
    h = 0
  return (
    o &&
      ((l = o.width),
      (u = o.height),
      Math.abs(e.innerWidth / o.scale - o.width) < 0.01 && ((f = o.offsetLeft), (h = o.offsetTop))),
    { width: l, height: u, x: f, y: h }
  )
}
function Vk(t) {
  var e
  const r = Ei(t),
    o = Nc(t),
    l = (e = t.ownerDocument) == null ? void 0 : e.body,
    u = ra(r.scrollWidth, r.clientWidth, l ? l.scrollWidth : 0, l ? l.clientWidth : 0),
    f = ra(r.scrollHeight, r.clientHeight, l ? l.scrollHeight : 0, l ? l.clientHeight : 0)
  let h = -o.scrollLeft + L0(t)
  const d = -o.scrollTop
  return (
    Ac(l || r).direction === 'rtl' && (h += ra(r.clientWidth, l ? l.clientWidth : 0) - u),
    { width: u, height: f, x: h, y: d }
  )
}
function A0(t) {
  return ['html', 'body', '#document'].includes(Hr(t)) ? t.ownerDocument.body : Br(t) && Mc(t) ? t : A0(Pc(t))
}
function Ql(t, e) {
  var r
  e === void 0 && (e = [])
  const o = A0(t),
    l = o === ((r = t.ownerDocument) == null ? void 0 : r.body),
    u = Ti(o),
    f = l ? [u].concat(u.visualViewport || [], Mc(o) ? o : []) : o,
    h = e.concat(f)
  return l ? h : h.concat(Ql(Pc(f)))
}
function Kk(t, e) {
  const r = e.getRootNode == null ? void 0 : e.getRootNode()
  if (t.contains(e)) return !0
  if (r && T0(r)) {
    let o = e
    do {
      if (o && t === o) return !0
      o = o.parentNode || o.host
    } while (o)
  }
  return !1
}
function Xk(t) {
  const e = Qo(t),
    r = e.top + t.clientTop,
    o = e.left + t.clientLeft
  return {
    top: r,
    left: o,
    x: o,
    y: r,
    right: o + t.clientWidth,
    bottom: r + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight,
  }
}
function Qg(t, e) {
  return e === 'viewport' ? Cf(Gk(t)) : Zl(e) ? Xk(e) : Cf(Vk(Ei(t)))
}
function Yk(t) {
  const e = Ql(Pc(t)),
    o = ['absolute', 'fixed'].includes(Ac(t).position) && Br(t) ? Lf(t) : t
  return Zl(o) ? e.filter((l) => Zl(l) && Kk(l, o) && Hr(l) !== 'body') : []
}
function Zk(t) {
  let { element: e, boundary: r, rootBoundary: o } = t
  const u = [...(r === 'clippingParents' ? Yk(e) : [].concat(r)), o],
    f = u[0],
    h = u.reduce(
      (d, g) => {
        const v = Qg(e, g)
        return (
          (d.top = ra(v.top, d.top)),
          (d.right = Yg(v.right, d.right)),
          (d.bottom = Yg(v.bottom, d.bottom)),
          (d.left = ra(v.left, d.left)),
          d
        )
      },
      Qg(e, f),
    )
  return (h.width = h.right - h.left), (h.height = h.bottom - h.top), (h.x = h.left), (h.y = h.top), h
}
const Jk = {
    getElementRects: (t) => {
      let { reference: e, floating: r, strategy: o } = t
      return { reference: Wk(e, Lf(r), o), floating: { ...Jg(r), x: 0, y: 0 } }
    },
    convertOffsetParentRelativeRectToViewportRelativeRect: (t) => jk(t),
    getOffsetParent: (t) => {
      let { element: e } = t
      return Lf(e)
    },
    isElement: (t) => Zl(t),
    getDocumentElement: (t) => {
      let { element: e } = t
      return Ei(e)
    },
    getClippingClientRect: (t) => Zk(t),
    getDimensions: (t) => {
      let { element: e } = t
      return Jg(e)
    },
    getClientRects: (t) => {
      let { element: e } = t
      return e.getClientRects()
    },
  },
  Qk = (t, e, r) => Sk(t, e, { platform: Jk, ...r })
var tC = Object.defineProperty,
  eC = Object.defineProperties,
  nC = Object.getOwnPropertyDescriptors,
  tv = Object.getOwnPropertySymbols,
  rC = Object.prototype.hasOwnProperty,
  iC = Object.prototype.propertyIsEnumerable,
  ev = (t, e, r) => (e in t ? tC(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  Dr = (t, e) => {
    for (var r in e || (e = {})) rC.call(e, r) && ev(t, r, e[r])
    if (tv) for (var r of tv(e)) iC.call(e, r) && ev(t, r, e[r])
    return t
  },
  Ta = (t, e) => eC(t, nC(e))
function M0(t, e) {
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (typeof e[r] == 'object' && t[r] ? M0(t[r], e[r]) : (t[r] = e[r]))
}
const Zi = {
  disabled: !1,
  distance: 5,
  skidding: 0,
  container: 'body',
  boundary: void 0,
  instantMove: !1,
  disposeTimeout: 5e3,
  popperTriggers: [],
  strategy: 'absolute',
  preventOverflow: !0,
  flip: !0,
  shift: !0,
  overflowPadding: 0,
  arrowPadding: 0,
  arrowOverflow: !0,
  themes: {
    tooltip: {
      placement: 'top',
      triggers: ['hover', 'focus', 'touch'],
      hideTriggers: (t) => [...t, 'click'],
      delay: { show: 200, hide: 0 },
      handleResize: !1,
      html: !1,
      loadingContent: '...',
    },
    dropdown: { placement: 'bottom', triggers: ['click'], delay: 0, handleResize: !0, autoHide: !0 },
    menu: {
      $extend: 'dropdown',
      triggers: ['hover', 'focus'],
      popperTriggers: ['hover', 'focus'],
      delay: { show: 0, hide: 400 },
    },
  },
}
function ts(t, e) {
  let r = Zi.themes[t] || {},
    o
  do
    (o = r[e]), typeof o > 'u' ? (r.$extend ? (r = Zi.themes[r.$extend] || {}) : ((r = null), (o = Zi[e]))) : (r = null)
  while (r)
  return o
}
function oC(t) {
  const e = [t]
  let r = Zi.themes[t] || {}
  do r.$extend && !r.$resetCss ? (e.push(r.$extend), (r = Zi.themes[r.$extend] || {})) : (r = null)
  while (r)
  return e.map((o) => `v-popper--theme-${o}`)
}
let es = !1
if (typeof window < 'u') {
  es = !1
  try {
    const t = Object.defineProperty({}, 'passive', {
      get() {
        es = !0
      },
    })
    window.addEventListener('test', null, t)
  } catch {}
}
let N0 = !1
typeof window < 'u' && typeof navigator < 'u' && (N0 = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
const P0 = ['auto', 'top', 'bottom', 'left', 'right'].reduce((t, e) => t.concat([e, `${e}-start`, `${e}-end`]), []),
  nv = { hover: 'mouseenter', focus: 'focus', click: 'click', touch: 'touchstart' },
  rv = { hover: 'mouseleave', focus: 'blur', click: 'click', touch: 'touchend' }
function sC(t, e) {
  const r = t.indexOf(e)
  r !== -1 && t.splice(r, 1)
}
function Gu() {
  return new Promise((t) =>
    requestAnimationFrame(() => {
      requestAnimationFrame(t)
    }),
  )
}
const vr = []
let Po = null,
  Af = function () {}
typeof window < 'u' && (Af = window.Element)
function de(t) {
  return function (e) {
    return ts(e.theme, t)
  }
}
var O0 = () =>
  re({
    name: 'VPopper',
    props: {
      theme: { type: String, required: !0 },
      targetNodes: { type: Function, required: !0 },
      referenceNode: { type: Function, required: !0 },
      popperNode: { type: Function, required: !0 },
      shown: { type: Boolean, default: !1 },
      showGroup: { type: String, default: null },
      ariaId: { default: null },
      disabled: { type: Boolean, default: de('disabled') },
      placement: { type: String, default: de('placement'), validator: (t) => P0.includes(t) },
      delay: { type: [String, Number, Object], default: de('delay') },
      distance: { type: [Number, String], default: de('distance') },
      skidding: { type: [Number, String], default: de('skidding') },
      triggers: { type: Array, default: de('triggers') },
      showTriggers: { type: [Array, Function], default: de('showTriggers') },
      hideTriggers: { type: [Array, Function], default: de('hideTriggers') },
      popperTriggers: { type: Array, default: de('popperTriggers') },
      popperShowTriggers: { type: [Array, Function], default: de('popperShowTriggers') },
      popperHideTriggers: { type: [Array, Function], default: de('popperHideTriggers') },
      container: { type: [String, Object, Af, Boolean], default: de('container') },
      boundary: { type: [String, Af], default: de('boundary') },
      strategy: { type: String, validator: (t) => ['absolute', 'fixed'].includes(t), default: de('strategy') },
      autoHide: { type: Boolean, default: de('autoHide') },
      handleResize: { type: Boolean, default: de('handleResize') },
      instantMove: { type: Boolean, default: de('instantMove') },
      eagerMount: { type: Boolean, default: de('eagerMount') },
      popperClass: { type: [String, Array, Object], default: de('popperClass') },
      computeTransformOrigin: { type: Boolean, default: de('computeTransformOrigin') },
      autoMinSize: { type: Boolean, default: de('autoMinSize') },
      autoMaxSize: { type: Boolean, default: de('autoMaxSize') },
      preventOverflow: { type: Boolean, default: de('preventOverflow') },
      overflowPadding: { type: [Number, String], default: de('overflowPadding') },
      arrowPadding: { type: [Number, String], default: de('arrowPadding') },
      arrowOverflow: { type: Boolean, default: de('arrowOverflow') },
      flip: { type: Boolean, default: de('flip') },
      shift: { type: Boolean, default: de('shift') },
      shiftCrossAxis: { type: Boolean, default: de('shiftCrossAxis') },
    },
    emits: [
      'show',
      'hide',
      'update:shown',
      'apply-show',
      'apply-hide',
      'close-group',
      'close-directive',
      'auto-hide',
      'resize',
      'dispose',
    ],
    data() {
      return {
        isShown: !1,
        isMounted: !1,
        skipTransition: !1,
        classes: { showFrom: !1, showTo: !1, hideFrom: !1, hideTo: !0 },
        result: {
          x: 0,
          y: 0,
          placement: '',
          strategy: this.strategy,
          arrow: { x: 0, y: 0, centerOffset: 0 },
          transformOrigin: null,
        },
      }
    },
    computed: {
      popperId() {
        return this.ariaId != null ? this.ariaId : this.randomId
      },
      shouldMountContent() {
        return this.eagerMount || this.isMounted
      },
      slotData() {
        return {
          popperId: this.popperId,
          isShown: this.isShown,
          shouldMountContent: this.shouldMountContent,
          skipTransition: this.skipTransition,
          autoHide: this.autoHide,
          show: this.show,
          hide: this.hide,
          handleResize: this.handleResize,
          onResize: this.onResize,
          classes: Ta(Dr({}, this.classes), { popperClass: this.popperClass }),
          result: this.result,
        }
      },
    },
    watch: Dr(
      {
        shown: '$_autoShowHide',
        disabled(t) {
          t ? this.dispose() : this.init()
        },
        async container() {
          this.isShown && (this.$_ensureTeleport(), await this.$_computePosition())
        },
        triggers() {
          this.$_isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners())
        },
      },
      [
        'placement',
        'distance',
        'skidding',
        'boundary',
        'strategy',
        'overflowPadding',
        'arrowPadding',
        'preventOverflow',
        'shift',
        'shiftCrossAxis',
        'flip',
      ].reduce((t, e) => ((t[e] = '$_computePosition'), t), {}),
    ),
    created() {
      ;(this.$_isDisposed = !0),
        (this.randomId = `popper_${[Math.random(), Date.now()].map((t) => t.toString(36).substring(2, 10)).join('_')}`)
    },
    mounted() {
      this.init(), this.$_detachPopperNode()
    },
    activated() {
      this.$_autoShowHide()
    },
    deactivated() {
      this.hide()
    },
    beforeUnmount() {
      this.dispose()
    },
    methods: {
      show({ event: t = null, skipDelay: e = !1, force: r = !1 } = {}) {
        ;(r || !this.disabled) &&
          (this.$_scheduleShow(t, e),
          this.$emit('show'),
          (this.$_showFrameLocked = !0),
          requestAnimationFrame(() => {
            this.$_showFrameLocked = !1
          })),
          this.$emit('update:shown', !0)
      },
      hide({ event: t = null, skipDelay: e = !1 } = {}) {
        this.$_scheduleHide(t, e), this.$emit('hide'), this.$emit('update:shown', !1)
      },
      init() {
        this.$_isDisposed &&
          ((this.$_isDisposed = !1),
          (this.isMounted = !1),
          (this.$_events = []),
          (this.$_preventShow = !1),
          (this.$_referenceNode = this.referenceNode()),
          (this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE)),
          (this.$_popperNode = this.popperNode()),
          (this.$_innerNode = this.$_popperNode.querySelector('.v-popper__inner')),
          (this.$_arrowNode = this.$_popperNode.querySelector('.v-popper__arrow-container')),
          this.$_swapTargetAttrs('title', 'data-original-title'),
          this.$_detachPopperNode(),
          this.triggers.length && this.$_addEventListeners(),
          this.shown && this.show())
      },
      dispose() {
        this.$_isDisposed ||
          ((this.$_isDisposed = !0),
          this.$_removeEventListeners(),
          this.hide({ skipDelay: !0 }),
          this.$_detachPopperNode(),
          (this.isMounted = !1),
          (this.isShown = !1),
          this.$_swapTargetAttrs('data-original-title', 'title'),
          this.$emit('dispose'))
      },
      async onResize() {
        this.isShown && (await this.$_computePosition(), this.$emit('resize'))
      },
      async $_computePosition() {
        var t
        if (this.$_isDisposed) return
        const e = { strategy: this.strategy, middleware: [] }
        ;(this.distance || this.skidding) &&
          e.middleware.push(Rk({ mainAxis: this.distance, crossAxis: this.skidding }))
        const r = this.placement.startsWith('auto')
        r
          ? e.middleware.push(Pk({ alignment: (t = this.placement.split('-')[1]) != null ? t : '' }))
          : (e.placement = this.placement),
          this.preventOverflow &&
            (this.shift &&
              e.middleware.push(
                Ik({ padding: this.overflowPadding, boundary: this.boundary, crossAxis: this.shiftCrossAxis }),
              ),
            !r && this.flip && e.middleware.push($k({ padding: this.overflowPadding, boundary: this.boundary }))),
          e.middleware.push(Tk({ element: this.$_arrowNode, padding: this.arrowPadding })),
          this.arrowOverflow &&
            e.middleware.push({
              name: 'arrowOverflow',
              fn: ({ placement: l, rects: u, middlewareData: f }) => {
                let h
                const { centerOffset: d } = f.arrow
                return (
                  l.startsWith('top') || l.startsWith('bottom')
                    ? (h = Math.abs(d) > u.reference.width / 2)
                    : (h = Math.abs(d) > u.reference.height / 2),
                  { data: { overflow: h } }
                )
              },
            }),
          this.autoMinSize &&
            e.middleware.push({
              name: 'autoMinSize',
              fn: ({ rects: l, placement: u, middlewareData: f }) => {
                var h
                if ((h = f.autoMinSize) != null && h.skip) return {}
                let d, g
                return (
                  u.startsWith('top') || u.startsWith('bottom') ? (d = l.reference.width) : (g = l.reference.height),
                  (this.$_innerNode.style.minWidth = d != null ? `${d}px` : null),
                  (this.$_innerNode.style.minHeight = g != null ? `${g}px` : null),
                  { data: { skip: !0 }, reset: { rects: !0 } }
                )
              },
            }),
          this.autoMaxSize &&
            e.middleware.push(
              Fk({
                boundary: this.boundary,
                padding: this.overflowPadding,
                apply: ({ width: l, height: u }) => {
                  ;(this.$_innerNode.style.maxWidth = l != null ? `${l}px` : null),
                    (this.$_innerNode.style.maxHeight = u != null ? `${u}px` : null)
                },
              }),
            )
        const o = await Qk(this.$_referenceNode, this.$_popperNode, e)
        Object.assign(this.result, {
          x: o.x,
          y: o.y,
          placement: o.placement,
          strategy: o.strategy,
          arrow: Dr(Dr({}, o.middlewareData.arrow), o.middlewareData.arrowOverflow),
        })
      },
      $_scheduleShow(t = null, e = !1) {
        if (
          ((this.$_hideInProgress = !1), clearTimeout(this.$_scheduleTimer), Po && this.instantMove && Po.instantMove)
        ) {
          Po.$_applyHide(!0), this.$_applyShow(!0)
          return
        }
        e
          ? this.$_applyShow()
          : (this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay('show')))
      },
      $_scheduleHide(t = null, e = !1) {
        ;(this.$_hideInProgress = !0),
          clearTimeout(this.$_scheduleTimer),
          this.isShown && (Po = this),
          e
            ? this.$_applyHide()
            : (this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay('hide')))
      },
      $_computeDelay(t) {
        const e = this.delay
        return parseInt((e && e[t]) || e || 0)
      },
      async $_applyShow(t = !1) {
        clearTimeout(this.$_disposeTimer),
          clearTimeout(this.$_scheduleTimer),
          (this.skipTransition = t),
          !this.isShown &&
            (this.$_ensureTeleport(), await Gu(), await this.$_computePosition(), await this.$_applyShowEffect())
      },
      async $_applyShowEffect() {
        if (this.$_hideInProgress) return
        if (this.computeTransformOrigin) {
          const e = this.$_referenceNode.getBoundingClientRect(),
            r = this.$_popperNode.querySelector('.v-popper__wrapper'),
            o = r.parentNode.getBoundingClientRect(),
            l = e.x + e.width / 2 - (o.left + r.offsetLeft),
            u = e.y + e.height / 2 - (o.top + r.offsetTop)
          this.result.transformOrigin = `${l}px ${u}px`
        }
        ;(this.isShown = !0), this.$_applyAttrsToTarget({ 'aria-describedby': this.popperId, 'data-popper-shown': '' })
        const t = this.showGroup
        if (t) {
          let e
          for (let r = 0; r < vr.length; r++) (e = vr[r]), e.showGroup !== t && (e.hide(), e.$emit('close-group'))
        }
        vr.push(this),
          this.$emit('apply-show'),
          (this.classes.showFrom = !0),
          (this.classes.showTo = !1),
          (this.classes.hideFrom = !1),
          (this.classes.hideTo = !1),
          await Gu(),
          (this.classes.showFrom = !1),
          (this.classes.showTo = !0)
      },
      async $_applyHide(t = !1) {
        if ((clearTimeout(this.$_scheduleTimer), !this.isShown)) return
        ;(this.skipTransition = t),
          sC(vr, this),
          Po === this && (Po = null),
          (this.isShown = !1),
          this.$_applyAttrsToTarget({ 'aria-describedby': void 0, 'data-popper-shown': void 0 }),
          clearTimeout(this.$_disposeTimer)
        const e = ts(this.theme, 'disposeTimeout')
        e !== null &&
          (this.$_disposeTimer = setTimeout(() => {
            this.$_popperNode && (this.$_detachPopperNode(), (this.isMounted = !1))
          }, e)),
          this.$emit('apply-hide'),
          (this.classes.showFrom = !1),
          (this.classes.showTo = !1),
          (this.classes.hideFrom = !0),
          (this.classes.hideTo = !1),
          await Gu(),
          (this.classes.hideFrom = !1),
          (this.classes.hideTo = !0)
      },
      $_autoShowHide() {
        this.shown ? this.show() : this.hide()
      },
      $_ensureTeleport() {
        if (this.$_isDisposed) return
        let t = this.container
        if (
          (typeof t == 'string'
            ? (t = window.document.querySelector(t))
            : t === !1 && (t = this.$_targetNodes[0].parentNode),
          !t)
        )
          throw new Error('No container for popover: ' + this.container)
        t.appendChild(this.$_popperNode), (this.isMounted = !0)
      },
      $_addEventListeners() {
        const t = (l, u, f) => {
            this.$_events.push({ targetNodes: l, eventType: u, handler: f }),
              l.forEach((h) => h.addEventListener(u, f, es ? { passive: !0 } : void 0))
          },
          e = (l, u, f, h, d) => {
            let g = f
            h != null && (g = typeof h == 'function' ? h(g) : h),
              g.forEach((v) => {
                const b = u[v]
                b && t(l, b, d)
              })
          },
          r = (l) => {
            ;(this.isShown && !this.$_hideInProgress) ||
              ((l.usedByTooltip = !0), !this.$_preventShow && this.show({ event: l }))
          }
        e(this.$_targetNodes, nv, this.triggers, this.showTriggers, r),
          e([this.$_popperNode], nv, this.popperTriggers, this.popperShowTriggers, r)
        const o = (l) => {
          l.usedByTooltip || this.hide({ event: l })
        }
        e(this.$_targetNodes, rv, this.triggers, this.hideTriggers, o),
          e([this.$_popperNode], rv, this.popperTriggers, this.popperHideTriggers, o),
          t([...Ql(this.$_referenceNode), ...Ql(this.$_popperNode)], 'scroll', () => {
            this.$_computePosition()
          })
      },
      $_removeEventListeners() {
        this.$_events.forEach(({ targetNodes: t, eventType: e, handler: r }) => {
          t.forEach((o) => o.removeEventListener(e, r))
        }),
          (this.$_events = [])
      },
      $_handleGlobalClose(t, e = !1) {
        this.$_showFrameLocked ||
          (this.hide({ event: t }),
          t.closePopover ? this.$emit('close-directive') : this.$emit('auto-hide'),
          e &&
            ((this.$_preventShow = !0),
            setTimeout(() => {
              this.$_preventShow = !1
            }, 300)))
      },
      $_detachPopperNode() {
        this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode)
      },
      $_swapTargetAttrs(t, e) {
        for (const r of this.$_targetNodes) {
          const o = r.getAttribute(t)
          o && (r.removeAttribute(t), r.setAttribute(e, o))
        }
      },
      $_applyAttrsToTarget(t) {
        for (const e of this.$_targetNodes)
          for (const r in t) {
            const o = t[r]
            o == null ? e.removeAttribute(r) : e.setAttribute(r, o)
          }
      },
    },
    render() {
      return this.$slots.default(this.slotData)
    },
  })
typeof document < 'u' &&
  typeof window < 'u' &&
  (N0
    ? (document.addEventListener('touchstart', iv, es ? { passive: !0, capture: !0 } : !0),
      document.addEventListener('touchend', lC, es ? { passive: !0, capture: !0 } : !0))
    : (window.addEventListener('mousedown', iv, !0), window.addEventListener('click', aC, !0)),
  window.addEventListener('resize', cC))
function iv(t) {
  for (let e = 0; e < vr.length; e++) {
    const r = vr[e],
      o = r.popperNode()
    r.$_mouseDownContains = o.contains(t.target)
  }
}
function aC(t) {
  $0(t)
}
function lC(t) {
  $0(t, !0)
}
function $0(t, e = !1) {
  for (let r = 0; r < vr.length; r++) {
    const o = vr[r],
      l = o.popperNode(),
      u = o.$_mouseDownContains || l.contains(t.target)
    requestAnimationFrame(() => {
      ;(t.closeAllPopover || (t.closePopover && u) || (o.autoHide && !u)) && o.$_handleGlobalClose(t, e)
    })
  }
}
function cC(t) {
  for (let e = 0; e < vr.length; e++) vr[e].$_computePosition(t)
}
function uC() {
  var t = window.navigator.userAgent,
    e = t.indexOf('MSIE ')
  if (e > 0) return parseInt(t.substring(e + 5, t.indexOf('.', e)), 10)
  var r = t.indexOf('Trident/')
  if (r > 0) {
    var o = t.indexOf('rv:')
    return parseInt(t.substring(o + 3, t.indexOf('.', o)), 10)
  }
  var l = t.indexOf('Edge/')
  return l > 0 ? parseInt(t.substring(l + 5, t.indexOf('.', l)), 10) : -1
}
let $l
function Mf() {
  Mf.init || ((Mf.init = !0), ($l = uC() !== -1))
}
var Oc = {
  name: 'ResizeObserver',
  props: {
    emitOnMount: { type: Boolean, default: !1 },
    ignoreWidth: { type: Boolean, default: !1 },
    ignoreHeight: { type: Boolean, default: !1 },
  },
  emits: ['notify'],
  mounted() {
    Mf(),
      qr(() => {
        ;(this._w = this.$el.offsetWidth), (this._h = this.$el.offsetHeight), this.emitOnMount && this.emitSize()
      })
    const t = document.createElement('object')
    ;(this._resizeObject = t),
      t.setAttribute('aria-hidden', 'true'),
      t.setAttribute('tabindex', -1),
      (t.onload = this.addResizeHandlers),
      (t.type = 'text/html'),
      $l && this.$el.appendChild(t),
      (t.data = 'about:blank'),
      $l || this.$el.appendChild(t)
  },
  beforeUnmount() {
    this.removeResizeHandlers()
  },
  methods: {
    compareAndNotify() {
      ;((!this.ignoreWidth && this._w !== this.$el.offsetWidth) ||
        (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) &&
        ((this._w = this.$el.offsetWidth), (this._h = this.$el.offsetHeight), this.emitSize())
    },
    emitSize() {
      this.$emit('notify', { width: this._w, height: this._h })
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify),
        this.compareAndNotify()
    },
    removeResizeHandlers() {
      this._resizeObject &&
        this._resizeObject.onload &&
        (!$l &&
          this._resizeObject.contentDocument &&
          this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify),
        this.$el.removeChild(this._resizeObject),
        (this._resizeObject.onload = null),
        (this._resizeObject = null))
    },
  },
}
const fC = D1()
Fm('data-v-b329ee4c')
const hC = { class: 'resize-observer', tabindex: '-1' }
qm()
const dC = fC((t, e, r, o, l, u) => (ct(), Zt('div', hC)))
Oc.render = dC
Oc.__scopeId = 'data-v-b329ee4c'
Oc.__file = 'src/components/ResizeObserver.vue'
var D0 = {
    computed: {
      themeClass() {
        return oC(this.theme)
      },
    },
  },
  Eh = (t, e) => {
    const r = t.__vccOpts || t
    for (const [o, l] of e) r[o] = l
    return r
  }
const pC = re({
    name: 'VPopperContent',
    components: { ResizeObserver: Oc },
    mixins: [D0],
    props: {
      popperId: String,
      theme: String,
      shown: Boolean,
      mounted: Boolean,
      skipTransition: Boolean,
      autoHide: Boolean,
      handleResize: Boolean,
      classes: Object,
      result: Object,
    },
    emits: ['hide', 'resize'],
    methods: {
      toPx(t) {
        return t != null && !isNaN(t) ? `${t}px` : null
      },
    },
  }),
  gC = ['id', 'aria-hidden', 'tabindex', 'data-popper-placement'],
  vC = { ref: 'inner', class: 'v-popper__inner' },
  mC = ut('div', { class: 'v-popper__arrow-outer' }, null, -1),
  yC = ut('div', { class: 'v-popper__arrow-inner' }, null, -1),
  bC = [mC, yC]
function wC(t, e, r, o, l, u) {
  const f = Qi('ResizeObserver')
  return (
    ct(),
    Et(
      'div',
      {
        id: t.popperId,
        ref: 'popover',
        class: ve([
          'v-popper__popper',
          [
            t.themeClass,
            t.classes.popperClass,
            {
              'v-popper__popper--shown': t.shown,
              'v-popper__popper--hidden': !t.shown,
              'v-popper__popper--show-from': t.classes.showFrom,
              'v-popper__popper--show-to': t.classes.showTo,
              'v-popper__popper--hide-from': t.classes.hideFrom,
              'v-popper__popper--hide-to': t.classes.hideTo,
              'v-popper__popper--skip-transition': t.skipTransition,
              'v-popper__popper--arrow-overflow': t.result.arrow.overflow,
            },
          ],
        ]),
        style: En({
          position: t.result.strategy,
          transform: `translate3d(${Math.round(t.result.x)}px,${Math.round(t.result.y)}px,0)`,
        }),
        'aria-hidden': t.shown ? 'false' : 'true',
        tabindex: t.autoHide ? 0 : void 0,
        'data-popper-placement': t.result.placement,
        onKeyup: e[1] || (e[1] = wf((h) => t.autoHide && t.$emit('hide'), ['esc'])),
      },
      [
        ut(
          'div',
          { class: 'v-popper__wrapper', style: En({ transformOrigin: t.result.transformOrigin }) },
          [
            ut(
              'div',
              vC,
              [
                t.mounted
                  ? (ct(),
                    Et(
                      fe,
                      { key: 0 },
                      [
                        ut('div', null, [nr(t.$slots, 'default')]),
                        t.handleResize
                          ? (ct(), Zt(f, { key: 0, onNotify: e[0] || (e[0] = (h) => t.$emit('resize', h)) }))
                          : ne('', !0),
                      ],
                      64,
                    ))
                  : ne('', !0),
              ],
              512,
            ),
            ut(
              'div',
              {
                ref: 'arrow',
                class: 'v-popper__arrow-container',
                style: En({ left: t.toPx(t.result.arrow.x), top: t.toPx(t.result.arrow.y) }),
              },
              bC,
              4,
            ),
          ],
          4,
        ),
      ],
      46,
      gC,
    )
  )
}
var R0 = Eh(pC, [['render', wC]]),
  z0 = {
    methods: {
      show(...t) {
        return this.$refs.popper.show(...t)
      },
      hide(...t) {
        return this.$refs.popper.hide(...t)
      },
      dispose(...t) {
        return this.$refs.popper.dispose(...t)
      },
      onResize(...t) {
        return this.$refs.popper.onResize(...t)
      },
    },
  }
const xC = re({
  name: 'VPopperWrapper',
  components: { Popper: O0(), PopperContent: R0 },
  mixins: [z0, D0],
  inheritAttrs: !1,
  props: { theme: { type: String, default: null } },
  computed: {
    finalTheme() {
      var t
      return (t = this.theme) != null ? t : this.$options.vPopperTheme
    },
    popperAttrs() {
      const t = Dr({}, this.$attrs)
      return delete t.class, delete t.style, t
    },
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$refs.reference.children).filter((t) => t !== this.$refs.popperContent.$el)
    },
  },
})
function _C(t, e, r, o, l, u) {
  const f = Qi('PopperContent'),
    h = Qi('Popper')
  return (
    ct(),
    Zt(
      h,
      _i({ ref: 'popper' }, t.popperAttrs, {
        theme: t.finalTheme,
        'target-nodes': t.getTargetNodes,
        'reference-node': () => t.$refs.reference,
        'popper-node': () => t.$refs.popperContent.$el,
      }),
      {
        default: Yt(
          ({
            popperId: d,
            isShown: g,
            shouldMountContent: v,
            skipTransition: b,
            autoHide: x,
            show: S,
            hide: M,
            handleResize: T,
            onResize: N,
            classes: E,
            result: L,
          }) => [
            ut(
              'div',
              {
                ref: 'reference',
                class: ve(['v-popper', [t.$attrs.class, t.themeClass, { 'v-popper--shown': g }]]),
                style: En(t.$attrs.style),
              },
              [
                nr(t.$slots, 'default', { shown: g, show: S, hide: M }),
                qt(
                  f,
                  {
                    ref: 'popperContent',
                    'popper-id': d,
                    theme: t.finalTheme,
                    shown: g,
                    mounted: v,
                    'skip-transition': b,
                    'auto-hide': x,
                    'handle-resize': T,
                    classes: E,
                    result: L,
                    onHide: M,
                    onResize: N,
                  },
                  { default: Yt(() => [nr(t.$slots, 'popper', { shown: g, hide: M })]), _: 2 },
                  1032,
                  [
                    'popper-id',
                    'theme',
                    'shown',
                    'mounted',
                    'skip-transition',
                    'auto-hide',
                    'handle-resize',
                    'classes',
                    'result',
                    'onHide',
                    'onResize',
                  ],
                ),
              ],
              6,
            ),
          ],
        ),
        _: 3,
      },
      16,
      ['theme', 'target-nodes', 'reference-node', 'popper-node'],
    )
  )
}
var Lh = Eh(xC, [['render', _C]])
const ov = re(Ta(Dr({}, Lh), { name: 'VDropdown', vPopperTheme: 'dropdown' })),
  sv = re(Ta(Dr({}, Lh), { name: 'VMenu', vPopperTheme: 'menu' })),
  Nf = re(Ta(Dr({}, Lh), { name: 'VTooltip', vPopperTheme: 'tooltip' })),
  SC = re({
    name: 'VTooltipDirective',
    components: { Popper: O0(), PopperContent: R0 },
    mixins: [z0],
    inheritAttrs: !1,
    props: {
      theme: { type: String, default: 'tooltip' },
      html: { type: Boolean, default: (t) => ts(t.theme, 'html') },
      content: { type: [String, Number, Function], default: null },
      loadingContent: { type: String, default: (t) => ts(t.theme, 'loadingContent') },
    },
    data() {
      return { asyncContent: null }
    },
    computed: {
      isContentAsync() {
        return typeof this.content == 'function'
      },
      loading() {
        return this.isContentAsync && this.asyncContent == null
      },
      finalContent() {
        return this.isContentAsync ? (this.loading ? this.loadingContent : this.asyncContent) : this.content
      },
    },
    watch: {
      content: {
        handler() {
          this.fetchContent(!0)
        },
        immediate: !0,
      },
      async finalContent() {
        await this.$nextTick(), this.$refs.popper.onResize()
      },
    },
    created() {
      this.$_fetchId = 0
    },
    methods: {
      fetchContent(t) {
        if (
          typeof this.content == 'function' &&
          this.$_isShown &&
          (t || (!this.$_loading && this.asyncContent == null))
        ) {
          ;(this.asyncContent = null), (this.$_loading = !0)
          const e = ++this.$_fetchId,
            r = this.content(this)
          r.then ? r.then((o) => this.onResult(e, o)) : this.onResult(e, r)
        }
      },
      onResult(t, e) {
        t === this.$_fetchId && ((this.$_loading = !1), (this.asyncContent = e))
      },
      onShow() {
        ;(this.$_isShown = !0), this.fetchContent()
      },
      onHide() {
        this.$_isShown = !1
      },
    },
  }),
  kC = ['innerHTML'],
  CC = ['textContent']
function TC(t, e, r, o, l, u) {
  const f = Qi('PopperContent'),
    h = Qi('Popper')
  return (
    ct(),
    Zt(
      h,
      _i({ ref: 'popper' }, t.$attrs, {
        theme: t.theme,
        'popper-node': () => t.$refs.popperContent.$el,
        onApplyShow: t.onShow,
        onApplyHide: t.onHide,
      }),
      {
        default: Yt(
          ({
            popperId: d,
            isShown: g,
            shouldMountContent: v,
            skipTransition: b,
            autoHide: x,
            hide: S,
            handleResize: M,
            onResize: T,
            classes: N,
            result: E,
          }) => [
            qt(
              f,
              {
                ref: 'popperContent',
                class: ve({ 'v-popper--tooltip-loading': t.loading }),
                'popper-id': d,
                theme: t.theme,
                shown: g,
                mounted: v,
                'skip-transition': b,
                'auto-hide': x,
                'handle-resize': M,
                classes: N,
                result: E,
                onHide: S,
                onResize: T,
              },
              {
                default: Yt(() => [
                  t.html
                    ? (ct(), Et('div', { key: 0, innerHTML: t.finalContent }, null, 8, kC))
                    : (ct(), Et('div', { key: 1, textContent: te(t.finalContent) }, null, 8, CC)),
                ]),
                _: 2,
              },
              1032,
              [
                'class',
                'popper-id',
                'theme',
                'shown',
                'mounted',
                'skip-transition',
                'auto-hide',
                'handle-resize',
                'classes',
                'result',
                'onHide',
                'onResize',
              ],
            ),
          ],
        ),
        _: 1,
      },
      16,
      ['theme', 'popper-node', 'onApplyShow', 'onApplyHide'],
    )
  )
}
var EC = Eh(SC, [['render', TC]])
const I0 = 'v-popper--has-tooltip'
function LC(t, e) {
  let r = t.placement
  if (!r && e) for (const o of P0) e[o] && (r = o)
  return r || (r = ts(t.theme || 'tooltip', 'placement')), r
}
function F0(t, e, r) {
  let o
  const l = typeof e
  return (
    l === 'string' ? (o = { content: e }) : e && l === 'object' ? (o = e) : (o = { content: !1 }),
    (o.placement = LC(o, r)),
    (o.targetNodes = () => [t]),
    (o.referenceNode = () => t),
    o
  )
}
let Vu,
  da,
  AC = 0
function MC() {
  if (Vu) return
  ;(da = Kt([])),
    (Vu = h0({
      name: 'VTooltipDirectiveApp',
      setup() {
        return { directives: da }
      },
      render() {
        return this.directives.map((e) =>
          ka(EC, Ta(Dr({}, e.options), { shown: e.shown.value || e.options.shown, key: e.id })),
        )
      },
      devtools: { hide: !0 },
    }))
  const t = document.createElement('div')
  document.body.appendChild(t), Vu.mount(t)
}
function q0(t, e, r) {
  MC()
  const o = Kt(F0(t, e, r)),
    l = Kt(!1),
    u = { id: AC++, options: o, shown: l }
  return (
    da.value.push(u),
    t.classList && t.classList.add(I0),
    (t.$_popper = {
      options: o,
      item: u,
      show() {
        l.value = !0
      },
      hide() {
        l.value = !1
      },
    })
  )
}
function Ah(t) {
  if (t.$_popper) {
    const e = da.value.indexOf(t.$_popper.item)
    e !== -1 && da.value.splice(e, 1), delete t.$_popper, delete t.$_popperOldShown, delete t.$_popperMountTarget
  }
  t.classList && t.classList.remove(I0)
}
function av(t, { value: e, oldValue: r, modifiers: o }) {
  const l = F0(t, e, o)
  if (!l.content || ts(l.theme || 'tooltip', 'disabled')) Ah(t)
  else {
    let u
    t.$_popper ? ((u = t.$_popper), (u.options.value = l)) : (u = q0(t, e, o)),
      typeof e.shown < 'u' &&
        e.shown !== t.$_popperOldShown &&
        ((t.$_popperOldShown = e.shown), e.shown ? u.show() : u.hide())
  }
}
var H0 = {
  beforeMount: av,
  updated: av,
  beforeUnmount(t) {
    Ah(t)
  },
}
function lv(t) {
  t.addEventListener('click', B0), t.addEventListener('touchstart', W0, es ? { passive: !0 } : !1)
}
function cv(t) {
  t.removeEventListener('click', B0),
    t.removeEventListener('touchstart', W0),
    t.removeEventListener('touchend', U0),
    t.removeEventListener('touchcancel', j0)
}
function B0(t) {
  const e = t.currentTarget
  ;(t.closePopover = !e.$_vclosepopover_touch),
    (t.closeAllPopover = e.$_closePopoverModifiers && !!e.$_closePopoverModifiers.all)
}
function W0(t) {
  if (t.changedTouches.length === 1) {
    const e = t.currentTarget
    e.$_vclosepopover_touch = !0
    const r = t.changedTouches[0]
    ;(e.$_vclosepopover_touchPoint = r), e.addEventListener('touchend', U0), e.addEventListener('touchcancel', j0)
  }
}
function U0(t) {
  const e = t.currentTarget
  if (((e.$_vclosepopover_touch = !1), t.changedTouches.length === 1)) {
    const r = t.changedTouches[0],
      o = e.$_vclosepopover_touchPoint
    ;(t.closePopover = Math.abs(r.screenY - o.screenY) < 20 && Math.abs(r.screenX - o.screenX) < 20),
      (t.closeAllPopover = e.$_closePopoverModifiers && !!e.$_closePopoverModifiers.all)
  }
}
function j0(t) {
  const e = t.currentTarget
  e.$_vclosepopover_touch = !1
}
var NC = {
  beforeMount(t, { value: e, modifiers: r }) {
    ;(t.$_closePopoverModifiers = r), (typeof e > 'u' || e) && lv(t)
  },
  updated(t, { value: e, oldValue: r, modifiers: o }) {
    ;(t.$_closePopoverModifiers = o), e !== r && (typeof e > 'u' || e ? lv(t) : cv(t))
  },
  beforeUnmount(t) {
    cv(t)
  },
}
const PC = H0,
  OC = Nf
function $C(t, e = {}) {
  t.$_vTooltipInstalled ||
    ((t.$_vTooltipInstalled = !0),
    M0(Zi, e),
    t.directive('tooltip', H0),
    t.directive('close-popper', NC),
    t.component('v-tooltip', Nf),
    t.component('VTooltip', Nf),
    t.component('v-dropdown', ov),
    t.component('VDropdown', ov),
    t.component('v-menu', sv),
    t.component('VMenu', sv))
}
const G0 = { version: '2.0.0-y.0', install: $C, options: Zi },
  DC = 6e4
function V0(t) {
  return t
}
const RC = V0,
  { setTimeout: zC } = globalThis,
  IC = Math.random.bind(Math)
function FC(t, e) {
  const {
      post: r,
      on: o,
      eventNames: l = [],
      serialize: u = V0,
      deserialize: f = RC,
      resolver: h,
      timeout: d = DC,
    } = e,
    g = new Map()
  let v
  const b = new Proxy(
    {},
    {
      get(x, S) {
        if (S === '$functions') return t
        const M = (...N) => {
          r(u({ m: S, a: N, t: 'q' }))
        }
        if (l.includes(S)) return (M.asEvent = M), M
        const T = async (...N) => (
          await v,
          new Promise((E, L) => {
            const F = HC()
            g.set(F, { resolve: E, reject: L }),
              r(u({ m: S, a: N, i: F, t: 'q' })),
              d >= 0 &&
                zC(() => {
                  L(new Error(`[birpc] timeout on calling "${S}"`)), g.delete(F)
                }, d)
          })
        )
        return (T.asEvent = M), T
      },
    },
  )
  return (
    (v = o(async (x, ...S) => {
      const M = f(x)
      if (M.t === 'q') {
        const { m: T, a: N } = M
        let E, L
        const F = h ? h(T, t[T]) : t[T]
        if (!F) L = new Error(`[birpc] function "${T}" not found`)
        else
          try {
            E = await F.apply(b, N)
          } catch (A) {
            L = A
          }
        M.i && (L && e.onError && e.onError(L, T, N), r(u({ t: 's', i: M.i, r: E, e: L }), ...S))
      } else {
        const { i: T, r: N, e: E } = M,
          L = g.get(T)
        L && (E ? L.reject(E) : L.resolve(N)), g.delete(T)
      }
    })),
    b
  )
}
const qC = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
function HC(t = 21) {
  let e = '',
    r = t
  for (; r--; ) e += qC[(IC() * 64) | 0]
  return e
}
/*! (c) 2020 Andrea Giammarchi */ const { parse: BC, stringify: WC } = JSON,
  { keys: UC } = Object,
  pa = String,
  K0 = 'string',
  uv = {},
  tc = 'object',
  X0 = (t, e) => e,
  jC = (t) => (t instanceof pa ? pa(t) : t),
  GC = (t, e) => (typeof e === K0 ? new pa(e) : e),
  Y0 = (t, e, r, o) => {
    const l = []
    for (let u = UC(r), { length: f } = u, h = 0; h < f; h++) {
      const d = u[h],
        g = r[d]
      if (g instanceof pa) {
        const v = t[g]
        typeof v === tc && !e.has(v)
          ? (e.add(v), (r[d] = uv), l.push({ k: d, a: [t, e, v, o] }))
          : (r[d] = o.call(r, d, v))
      } else r[d] !== uv && (r[d] = o.call(r, d, g))
    }
    for (let { length: u } = l, f = 0; f < u; f++) {
      const { k: h, a: d } = l[f]
      r[h] = o.call(r, h, Y0.apply(null, d))
    }
    return r
  },
  fv = (t, e, r) => {
    const o = pa(e.push(r) - 1)
    return t.set(r, o), o
  },
  Pf = (t, e) => {
    const r = BC(t, GC).map(jC),
      o = r[0],
      l = e || X0,
      u = typeof o === tc && o ? Y0(r, new Set(), o, l) : o
    return l.call({ '': u }, '', u)
  },
  VC = (t, e, r) => {
    const o = e && typeof e === tc ? (v, b) => (v === '' || -1 < e.indexOf(v) ? b : void 0) : e || X0,
      l = new Map(),
      u = [],
      f = []
    let h = +fv(l, u, o.call({ '': t }, '', t)),
      d = !h
    for (; h < u.length; ) (d = !0), (f[h] = WC(u[h++], g, r))
    return '[' + f.join(',') + ']'
    function g(v, b) {
      if (d) return (d = !d), b
      const x = o.call(this, v, b)
      switch (typeof x) {
        case tc:
          if (x === null) return x
        case K0:
          return l.get(x) || fv(l, u, x)
      }
      return x
    }
  }
function KC(t = '') {
  return !t || !t.includes('\\') ? t : t.replace(/\\/g, '/')
}
const XC = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/
function YC() {
  return typeof process < 'u' ? process.cwd().replace(/\\/g, '/') : '/'
}
const hv = function (...t) {
  t = t.map((o) => KC(o))
  let e = '',
    r = !1
  for (let o = t.length - 1; o >= -1 && !r; o--) {
    const l = o >= 0 ? t[o] : YC()
    !l || l.length === 0 || ((e = `${l}/${e}`), (r = dv(l)))
  }
  return (e = ZC(e, !r)), r && !dv(e) ? `/${e}` : e.length > 0 ? e : '.'
}
function ZC(t, e) {
  let r = '',
    o = 0,
    l = -1,
    u = 0,
    f = null
  for (let h = 0; h <= t.length; ++h) {
    if (h < t.length) f = t[h]
    else {
      if (f === '/') break
      f = '/'
    }
    if (f === '/') {
      if (!(l === h - 1 || u === 1))
        if (u === 2) {
          if (r.length < 2 || o !== 2 || r[r.length - 1] !== '.' || r[r.length - 2] !== '.') {
            if (r.length > 2) {
              const d = r.lastIndexOf('/')
              d === -1 ? ((r = ''), (o = 0)) : ((r = r.slice(0, d)), (o = r.length - 1 - r.lastIndexOf('/'))),
                (l = h),
                (u = 0)
              continue
            } else if (r.length > 0) {
              ;(r = ''), (o = 0), (l = h), (u = 0)
              continue
            }
          }
          e && ((r += r.length > 0 ? '/..' : '..'), (o = 2))
        } else r.length > 0 ? (r += `/${t.slice(l + 1, h)}`) : (r = t.slice(l + 1, h)), (o = h - l - 1)
      ;(l = h), (u = 0)
    } else f === '.' && u !== -1 ? ++u : (u = -1)
  }
  return r
}
const dv = function (t) {
    return XC.test(t)
  },
  JC = function (t, e) {
    const r = hv(t).split('/'),
      o = hv(e).split('/'),
      l = [...r]
    for (const u of l) {
      if (o[0] !== u) break
      r.shift(), o.shift()
    }
    return [...r.map(() => '..'), ...o].join('/')
  }
function QC(t) {
  return typeof AggregateError < 'u' && t instanceof AggregateError ? !0 : t instanceof Error && 'errors' in t
}
class Z0 {
  constructor() {
    li(this, 'filesMap', new Map())
    li(this, 'pathsSet', new Set())
    li(this, 'browserTestPromises', new Map())
    li(this, 'idMap', new Map())
    li(this, 'taskFileMap', new WeakMap())
    li(this, 'errorsSet', new Set())
    li(this, 'processTimeoutCauses', new Set())
  }
  catchError(e, r) {
    if (QC(e)) return e.errors.forEach((l) => this.catchError(l, r))
    e === Object(e) ? (e.type = r) : (e = { type: r, message: e })
    const o = e
    if (o && typeof o == 'object' && o.code === 'VITEST_PENDING') {
      const l = this.idMap.get(o.taskId)
      l && ((l.mode = 'skip'), l.result ?? (l.result = { state: 'skip' }), (l.result.state = 'skip'))
      return
    }
    this.errorsSet.add(e)
  }
  clearErrors() {
    this.errorsSet.clear()
  }
  getUnhandledErrors() {
    return Array.from(this.errorsSet.values())
  }
  addProcessTimeoutCause(e) {
    this.processTimeoutCauses.add(e)
  }
  getProcessTimeoutCauses() {
    return Array.from(this.processTimeoutCauses.values())
  }
  getPaths() {
    return Array.from(this.pathsSet)
  }
  getFiles(e) {
    return e
      ? e
          .map((r) => this.filesMap.get(r))
          .filter(Boolean)
          .flat()
      : Array.from(this.filesMap.values()).flat()
  }
  getFilepaths() {
    return Array.from(this.filesMap.keys())
  }
  getFailedFilepaths() {
    return this.getFiles()
      .filter((e) => {
        var r
        return ((r = e.result) == null ? void 0 : r.state) === 'fail'
      })
      .map((e) => e.filepath)
  }
  collectPaths(e = []) {
    e.forEach((r) => {
      this.pathsSet.add(r)
    })
  }
  collectFiles(e = []) {
    e.forEach((r) => {
      const l = (this.filesMap.get(r.filepath) || []).filter((u) => u.projectName !== r.projectName)
      l.push(r), this.filesMap.set(r.filepath, l), this.updateId(r)
    })
  }
  clearFiles(e, r = []) {
    const o = e
    r.forEach((l) => {
      const u = this.filesMap.get(l)
      if (!u) return
      const f = u.filter((h) => h.projectName !== o.config.name)
      f.length ? this.filesMap.set(l, f) : this.filesMap.delete(l)
    })
  }
  updateId(e) {
    this.idMap.get(e.id) !== e &&
      (this.idMap.set(e.id, e),
      e.type === 'suite' &&
        e.tasks.forEach((r) => {
          this.updateId(r)
        }))
  }
  updateTasks(e) {
    for (const [r, o, l] of e) {
      const u = this.idMap.get(r)
      u && ((u.result = o), (u.meta = l), (o == null ? void 0 : o.state) === 'skip' && (u.mode = 'skip'))
    }
  }
  updateUserLog(e) {
    const r = e.taskId && this.idMap.get(e.taskId)
    r && (r.logs || (r.logs = []), r.logs.push(e))
  }
  getCountOfFailedTests() {
    return Array.from(this.idMap.values()).filter((e) => {
      var r
      return ((r = e.result) == null ? void 0 : r.state) === 'fail'
    }).length
  }
  cancelFiles(e, r) {
    this.collectFiles(
      e.map((o) => ({
        filepath: o,
        name: JC(r, o),
        id: o,
        mode: 'skip',
        type: 'suite',
        result: { state: 'skip' },
        meta: {},
        tasks: [],
      })),
    )
  }
}
var to =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {}
function J0(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t
}
function Q0(t) {
  return t == null && (t = []), Array.isArray(t) ? t : [t]
}
function Of(t) {
  return t.type === 'test' || t.type === 'custom'
}
function ty(t) {
  const e = [],
    r = Q0(t)
  for (const o of r)
    if (Of(o)) e.push(o)
    else for (const l of o.tasks) Of(l) ? e.push(l) : e.push(...ty(l))
  return e
}
function Mh(t = []) {
  return Q0(t).flatMap((e) => (Of(e) ? [e] : [e, ...Mh(e.tasks)]))
}
function tT(t) {
  const e = [t.name]
  let r = t
  for (; (r != null && r.suite) || (r != null && r.file); )
    (r = r.suite || r.file), r != null && r.name && e.unshift(r.name)
  return e
}
function $c(t) {
  return ty(t).some((e) => {
    var r, o
    return (o = (r = e.result) == null ? void 0 : r.errors) == null
      ? void 0
      : o.some((l) => typeof (l == null ? void 0 : l.message) == 'string' && l.message.match(/Snapshot .* mismatched/))
  })
}
function eT(t, e = {}) {
  const {
    handlers: r = {},
    autoReconnect: o = !0,
    reconnectInterval: l = 2e3,
    reconnectTries: u = 10,
    reactive: f = (E) => E,
    WebSocketConstructor: h = globalThis.WebSocket,
  } = e
  let d = u
  const g = f({ ws: new h(t), state: new Z0(), waitForConnection: N, reconnect: M })
  ;(g.state.filesMap = f(g.state.filesMap)), (g.state.idMap = f(g.state.idMap))
  let v
  const b = {
      onPathsCollected(E) {
        var L
        g.state.collectPaths(E), (L = r.onPathsCollected) == null || L.call(r, E)
      },
      onCollected(E) {
        var L
        g.state.collectFiles(E), (L = r.onCollected) == null || L.call(r, E)
      },
      onTaskUpdate(E) {
        var L
        g.state.updateTasks(E), (L = r.onTaskUpdate) == null || L.call(r, E)
      },
      onUserConsoleLog(E) {
        g.state.updateUserLog(E)
      },
      onFinished(E) {
        var L
        ;(L = r.onFinished) == null || L.call(r, E)
      },
      onCancel(E) {
        var L
        ;(L = r.onCancel) == null || L.call(r, E)
      },
    },
    x = { post: (E) => g.ws.send(E), on: (E) => (v = E), serialize: VC, deserialize: Pf }
  g.rpc = FC(b, x)
  let S
  function M(E = !1) {
    E && (d = u), (g.ws = new h(t)), T()
  }
  function T() {
    ;(S = new Promise((E) => {
      g.ws.addEventListener('open', () => {
        ;(d = u), E()
      })
    })),
      g.ws.addEventListener('message', (E) => {
        v(E.data)
      }),
      g.ws.addEventListener('close', () => {
        ;(d -= 1), o && d > 0 && setTimeout(M, l)
      })
  }
  T()
  function N() {
    return S
  }
  return g
}
const nT = location.port,
  rT = [location.hostname, nT].filter(Boolean).join(':'),
  iT = `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${rT}/__vitest_api__`,
  Wr = !!window.METADATA_PATH
function Nh(t) {
  return ym() ? (Gx(t), !0) : !1
}
function Ur(t) {
  return typeof t == 'function' ? t() : G(t)
}
const oT = typeof window < 'u',
  eo = () => {}
function Ph(t, e) {
  function r(...o) {
    return new Promise((l, u) => {
      Promise.resolve(t(() => e.apply(this, o), { fn: e, thisArg: this, args: o }))
        .then(l)
        .catch(u)
    })
  }
  return r
}
const ey = (t) => t()
function ny(t, e = {}) {
  let r,
    o,
    l = eo
  const u = (h) => {
    clearTimeout(h), l(), (l = eo)
  }
  return (h) => {
    const d = Ur(t),
      g = Ur(e.maxWait)
    return (
      r && u(r),
      d <= 0 || (g !== void 0 && g <= 0)
        ? (o && (u(o), (o = null)), Promise.resolve(h()))
        : new Promise((v, b) => {
            ;(l = e.rejectOnCancel ? b : v),
              g &&
                !o &&
                (o = setTimeout(() => {
                  r && u(r), (o = null), v(h())
                }, g)),
              (r = setTimeout(() => {
                o && u(o), (o = null), v(h())
              }, d))
          })
    )
  }
}
function sT(t, e = !0, r = !0, o = !1) {
  let l = 0,
    u,
    f = !0,
    h = eo,
    d
  const g = () => {
    u && (clearTimeout(u), (u = void 0), h(), (h = eo))
  }
  return (b) => {
    const x = Ur(t),
      S = Date.now() - l,
      M = () => (d = b())
    return (
      g(),
      x <= 0
        ? ((l = Date.now()), M())
        : (S > x && (r || !f)
            ? ((l = Date.now()), M())
            : e &&
              (d = new Promise((T, N) => {
                ;(h = o ? N : T),
                  (u = setTimeout(
                    () => {
                      ;(l = Date.now()), (f = !0), T(M()), g()
                    },
                    Math.max(0, x - S),
                  ))
              })),
          !r && !u && (u = setTimeout(() => (f = !0), x)),
          (f = !1),
          d)
    )
  }
}
function aT(t = ey) {
  const e = Kt(!0)
  function r() {
    e.value = !1
  }
  function o() {
    e.value = !0
  }
  const l = (...u) => {
    e.value && t(...u)
  }
  return { isActive: bc(e), pause: r, resume: o, eventFilter: l }
}
function ry(...t) {
  if (t.length !== 1) return uh(...t)
  const e = t[0]
  return typeof e == 'function' ? bc(k1(() => ({ get: e, set: eo }))) : Kt(e)
}
function pv(t, e = 200, r = {}) {
  return Ph(ny(e, r), t)
}
function lT(t, e = 200, r = !1, o = !0, l = !1) {
  return Ph(sT(e, r, o, l), t)
}
function cT(t, e = 200, r = !0, o = !0) {
  if (e <= 0) return t
  const l = Kt(t.value),
    u = lT(
      () => {
        l.value = t.value
      },
      e,
      r,
      o,
    )
  return Re(t, () => u()), l
}
function iy(t, e = !0) {
  Sa() ? ls(t) : e ? t() : qr(t)
}
function uT(t = !1, e = {}) {
  const { truthyValue: r = !0, falsyValue: o = !1 } = e,
    l = Ee(t),
    u = Kt(t)
  function f(h) {
    if (arguments.length) return (u.value = h), u.value
    {
      const d = Ur(r)
      return (u.value = u.value === d ? Ur(o) : d), u.value
    }
  }
  return l ? f : [u, f]
}
var gv = Object.getOwnPropertySymbols,
  fT = Object.prototype.hasOwnProperty,
  hT = Object.prototype.propertyIsEnumerable,
  dT = (t, e) => {
    var r = {}
    for (var o in t) fT.call(t, o) && e.indexOf(o) < 0 && (r[o] = t[o])
    if (t != null && gv) for (var o of gv(t)) e.indexOf(o) < 0 && hT.call(t, o) && (r[o] = t[o])
    return r
  }
function oy(t, e, r = {}) {
  const o = r,
    { eventFilter: l = ey } = o,
    u = dT(o, ['eventFilter'])
  return Re(t, Ph(l, e), u)
}
var pT = Object.defineProperty,
  gT = Object.defineProperties,
  vT = Object.getOwnPropertyDescriptors,
  ec = Object.getOwnPropertySymbols,
  sy = Object.prototype.hasOwnProperty,
  ay = Object.prototype.propertyIsEnumerable,
  vv = (t, e, r) => (e in t ? pT(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  mT = (t, e) => {
    for (var r in e || (e = {})) sy.call(e, r) && vv(t, r, e[r])
    if (ec) for (var r of ec(e)) ay.call(e, r) && vv(t, r, e[r])
    return t
  },
  yT = (t, e) => gT(t, vT(e)),
  bT = (t, e) => {
    var r = {}
    for (var o in t) sy.call(t, o) && e.indexOf(o) < 0 && (r[o] = t[o])
    if (t != null && ec) for (var o of ec(t)) e.indexOf(o) < 0 && ay.call(t, o) && (r[o] = t[o])
    return r
  }
function wT(t, e, r = {}) {
  const o = r,
    { debounce: l = 0, maxWait: u = void 0 } = o,
    f = bT(o, ['debounce', 'maxWait'])
  return oy(t, e, yT(mT({}, f), { eventFilter: ny(l, { maxWait: u }) }))
}
function xT(t, e, r) {
  const o = Re(t, (...l) => (qr(() => o()), e(...l)), r)
}
var _T = Object.defineProperty,
  ST = Object.defineProperties,
  kT = Object.getOwnPropertyDescriptors,
  nc = Object.getOwnPropertySymbols,
  ly = Object.prototype.hasOwnProperty,
  cy = Object.prototype.propertyIsEnumerable,
  mv = (t, e, r) => (e in t ? _T(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  CT = (t, e) => {
    for (var r in e || (e = {})) ly.call(e, r) && mv(t, r, e[r])
    if (nc) for (var r of nc(e)) cy.call(e, r) && mv(t, r, e[r])
    return t
  },
  TT = (t, e) => ST(t, kT(e)),
  ET = (t, e) => {
    var r = {}
    for (var o in t) ly.call(t, o) && e.indexOf(o) < 0 && (r[o] = t[o])
    if (t != null && nc) for (var o of nc(t)) e.indexOf(o) < 0 && cy.call(t, o) && (r[o] = t[o])
    return r
  }
function uy(t, e, r = {}) {
  const o = r,
    { eventFilter: l } = o,
    u = ET(o, ['eventFilter']),
    { eventFilter: f, pause: h, resume: d, isActive: g } = aT(l)
  return { stop: oy(t, e, TT(CT({}, u), { eventFilter: f })), pause: h, resume: d, isActive: g }
}
function LT(t, e, r) {
  let o
  Ee(r) ? (o = { evaluating: r }) : (o = r || {})
  const { lazy: l = !1, evaluating: u = void 0, shallow: f = !0, onError: h = eo } = o,
    d = Kt(!l),
    g = f ? as(e) : Kt(e)
  let v = 0
  return (
    gh(async (b) => {
      if (!d.value) return
      v++
      const x = v
      let S = !1
      u &&
        Promise.resolve().then(() => {
          u.value = !0
        })
      try {
        const M = await t((T) => {
          b(() => {
            u && (u.value = !1), S || T()
          })
        })
        x === v && (g.value = M)
      } catch (M) {
        h(M)
      } finally {
        u && x === v && (u.value = !1), (S = !0)
      }
    }),
    l ? yt(() => ((d.value = !0), g.value)) : g
  )
}
function rc(t) {
  var e
  const r = Ur(t)
  return (e = r == null ? void 0 : r.$el) != null ? e : r
}
const jr = oT ? window : void 0
function ns(...t) {
  let e, r, o, l
  if ((typeof t[0] == 'string' || Array.isArray(t[0]) ? (([r, o, l] = t), (e = jr)) : ([e, r, o, l] = t), !e)) return eo
  Array.isArray(r) || (r = [r]), Array.isArray(o) || (o = [o])
  const u = [],
    f = () => {
      u.forEach((v) => v()), (u.length = 0)
    },
    h = (v, b, x, S) => (v.addEventListener(b, x, S), () => v.removeEventListener(b, x, S)),
    d = Re(
      () => [rc(e), Ur(l)],
      ([v, b]) => {
        f(), v && u.push(...r.flatMap((x) => o.map((S) => h(v, x, S, b))))
      },
      { immediate: !0, flush: 'post' },
    ),
    g = () => {
      d(), f()
    }
  return Nh(g), g
}
function AT(t) {
  return typeof t == 'function'
    ? t
    : typeof t == 'string'
      ? (e) => e.key === t
      : Array.isArray(t)
        ? (e) => t.includes(e.key)
        : () => !0
}
function MT(...t) {
  let e,
    r,
    o = {}
  t.length === 3
    ? ((e = t[0]), (r = t[1]), (o = t[2]))
    : t.length === 2
      ? typeof t[1] == 'object'
        ? ((e = !0), (r = t[0]), (o = t[1]))
        : ((e = t[0]), (r = t[1]))
      : ((e = !0), (r = t[0]))
  const { target: l = jr, eventName: u = 'keydown', passive: f = !1, dedupe: h = !1 } = o,
    d = AT(e)
  return ns(
    l,
    u,
    (v) => {
      ;(v.repeat && Ur(h)) || (d(v) && r(v))
    },
    f,
  )
}
function NT() {
  const t = Kt(!1)
  return (
    Sa() &&
      ls(() => {
        t.value = !0
      }),
    t
  )
}
function fy(t) {
  const e = NT()
  return yt(() => (e.value, !!t()))
}
function hy(t, e = {}) {
  const { window: r = jr } = e,
    o = fy(() => r && 'matchMedia' in r && typeof r.matchMedia == 'function')
  let l
  const u = Kt(!1),
    f = () => {
      l && ('removeEventListener' in l ? l.removeEventListener('change', h) : l.removeListener(h))
    },
    h = () => {
      o.value &&
        (f(),
        (l = r.matchMedia(ry(t).value)),
        (u.value = !!(l != null && l.matches)),
        l && ('addEventListener' in l ? l.addEventListener('change', h) : l.addListener(h)))
    }
  return gh(h), Nh(() => f()), u
}
const xl =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  _l = '__vueuse_ssr_handlers__',
  PT = OT()
function OT() {
  return _l in xl || (xl[_l] = xl[_l] || {}), xl[_l]
}
function dy(t, e) {
  return PT[t] || e
}
function $T(t) {
  return t == null
    ? 'any'
    : t instanceof Set
      ? 'set'
      : t instanceof Map
        ? 'map'
        : t instanceof Date
          ? 'date'
          : typeof t == 'boolean'
            ? 'boolean'
            : typeof t == 'string'
              ? 'string'
              : typeof t == 'object'
                ? 'object'
                : Number.isNaN(t)
                  ? 'any'
                  : 'number'
}
var DT = Object.defineProperty,
  yv = Object.getOwnPropertySymbols,
  RT = Object.prototype.hasOwnProperty,
  zT = Object.prototype.propertyIsEnumerable,
  bv = (t, e, r) => (e in t ? DT(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  wv = (t, e) => {
    for (var r in e || (e = {})) RT.call(e, r) && bv(t, r, e[r])
    if (yv) for (var r of yv(e)) zT.call(e, r) && bv(t, r, e[r])
    return t
  }
const IT = {
    boolean: { read: (t) => t === 'true', write: (t) => String(t) },
    object: { read: (t) => JSON.parse(t), write: (t) => JSON.stringify(t) },
    number: { read: (t) => Number.parseFloat(t), write: (t) => String(t) },
    any: { read: (t) => t, write: (t) => String(t) },
    string: { read: (t) => t, write: (t) => String(t) },
    map: { read: (t) => new Map(JSON.parse(t)), write: (t) => JSON.stringify(Array.from(t.entries())) },
    set: { read: (t) => new Set(JSON.parse(t)), write: (t) => JSON.stringify(Array.from(t)) },
    date: { read: (t) => new Date(t), write: (t) => t.toISOString() },
  },
  xv = 'vueuse-storage'
function FT(t, e, r, o = {}) {
  var l
  const {
      flush: u = 'pre',
      deep: f = !0,
      listenToStorageChanges: h = !0,
      writeDefaults: d = !0,
      mergeDefaults: g = !1,
      shallow: v,
      window: b = jr,
      eventFilter: x,
      onError: S = (X) => {
        console.error(X)
      },
    } = o,
    M = (v ? as : Kt)(e)
  if (!r)
    try {
      r = dy('getDefaultStorage', () => {
        var X
        return (X = jr) == null ? void 0 : X.localStorage
      })()
    } catch (X) {
      S(X)
    }
  if (!r) return M
  const T = Ur(e),
    N = $T(T),
    E = (l = o.serializer) != null ? l : IT[N],
    { pause: L, resume: F } = uy(M, () => A(M.value), { flush: u, deep: f, eventFilter: x })
  return b && h && (ns(b, 'storage', ft), ns(b, xv, tt)), ft(), M
  function A(X) {
    try {
      if (X == null) r.removeItem(t)
      else {
        const st = E.write(X),
          ot = r.getItem(t)
        ot !== st &&
          (r.setItem(t, st),
          b && b.dispatchEvent(new CustomEvent(xv, { detail: { key: t, oldValue: ot, newValue: st, storageArea: r } })))
      }
    } catch (st) {
      S(st)
    }
  }
  function B(X) {
    const st = X ? X.newValue : r.getItem(t)
    if (st == null) return d && T !== null && r.setItem(t, E.write(T)), T
    if (!X && g) {
      const ot = E.read(st)
      return typeof g == 'function' ? g(ot, T) : N === 'object' && !Array.isArray(ot) ? wv(wv({}, T), ot) : ot
    } else return typeof st != 'string' ? st : E.read(st)
  }
  function tt(X) {
    ft(X.detail)
  }
  function ft(X) {
    if (!(X && X.storageArea !== r)) {
      if (X && X.key == null) {
        M.value = T
        return
      }
      if (!(X && X.key !== t)) {
        L()
        try {
          M.value = B(X)
        } catch (st) {
          S(st)
        } finally {
          X ? qr(F) : F()
        }
      }
    }
  }
}
function qT(t) {
  return hy('(prefers-color-scheme: dark)', t)
}
var HT = Object.defineProperty,
  _v = Object.getOwnPropertySymbols,
  BT = Object.prototype.hasOwnProperty,
  WT = Object.prototype.propertyIsEnumerable,
  Sv = (t, e, r) => (e in t ? HT(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  UT = (t, e) => {
    for (var r in e || (e = {})) BT.call(e, r) && Sv(t, r, e[r])
    if (_v) for (var r of _v(e)) WT.call(e, r) && Sv(t, r, e[r])
    return t
  }
function jT(t = {}) {
  const {
      selector: e = 'html',
      attribute: r = 'class',
      initialValue: o = 'auto',
      window: l = jr,
      storage: u,
      storageKey: f = 'vueuse-color-scheme',
      listenToStorageChanges: h = !0,
      storageRef: d,
      emitAuto: g,
      disableTransition: v = !0,
    } = t,
    b = UT({ auto: '', light: 'light', dark: 'dark' }, t.modes || {}),
    x = qT({ window: l }),
    S = yt(() => (x.value ? 'dark' : 'light')),
    M = d || (f == null ? ry(o) : FT(f, o, u, { window: l, listenToStorageChanges: h })),
    T = yt(() => (M.value === 'auto' ? S.value : M.value)),
    N = dy('updateHTMLAttrs', (A, B, tt) => {
      const ft = typeof A == 'string' ? (l == null ? void 0 : l.document.querySelector(A)) : rc(A)
      if (!ft) return
      let X
      if (v) {
        X = l.document.createElement('style')
        const st =
          '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}'
        X.appendChild(document.createTextNode(st)), l.document.head.appendChild(X)
      }
      if (B === 'class') {
        const st = tt.split(/\s/g)
        Object.values(b)
          .flatMap((ot) => (ot || '').split(/\s/g))
          .filter(Boolean)
          .forEach((ot) => {
            st.includes(ot) ? ft.classList.add(ot) : ft.classList.remove(ot)
          })
      } else ft.setAttribute(B, tt)
      v && (l.getComputedStyle(X).opacity, document.head.removeChild(X))
    })
  function E(A) {
    var B
    N(e, r, (B = b[A]) != null ? B : A)
  }
  function L(A) {
    t.onChanged ? t.onChanged(A, E) : E(A)
  }
  Re(T, L, { flush: 'post', immediate: !0 }), iy(() => L(T.value))
  const F = yt({
    get() {
      return g ? M.value : T.value
    },
    set(A) {
      M.value = A
    },
  })
  try {
    return Object.assign(F, { store: M, system: S, state: T })
  } catch {
    return F
  }
}
var GT = Object.defineProperty,
  VT = Object.defineProperties,
  KT = Object.getOwnPropertyDescriptors,
  kv = Object.getOwnPropertySymbols,
  XT = Object.prototype.hasOwnProperty,
  YT = Object.prototype.propertyIsEnumerable,
  Cv = (t, e, r) => (e in t ? GT(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  ZT = (t, e) => {
    for (var r in e || (e = {})) XT.call(e, r) && Cv(t, r, e[r])
    if (kv) for (var r of kv(e)) YT.call(e, r) && Cv(t, r, e[r])
    return t
  },
  JT = (t, e) => VT(t, KT(e))
function QT(t = {}) {
  const { valueDark: e = 'dark', valueLight: r = '' } = t,
    o = jT(
      JT(ZT({}, t), {
        onChanged: (u, f) => {
          var h
          t.onChanged ? (h = t.onChanged) == null || h.call(t, u === 'dark', f, u) : f(u)
        },
        modes: { dark: e, light: r },
      }),
    )
  return yt({
    get() {
      return o.value === 'dark'
    },
    set(u) {
      const f = u ? 'dark' : 'light'
      o.system.value === f ? (o.value = 'auto') : (o.value = f)
    },
  })
}
var Tv = Object.getOwnPropertySymbols,
  tE = Object.prototype.hasOwnProperty,
  eE = Object.prototype.propertyIsEnumerable,
  nE = (t, e) => {
    var r = {}
    for (var o in t) tE.call(t, o) && e.indexOf(o) < 0 && (r[o] = t[o])
    if (t != null && Tv) for (var o of Tv(t)) e.indexOf(o) < 0 && eE.call(t, o) && (r[o] = t[o])
    return r
  }
function rE(t, e, r = {}) {
  const o = r,
    { window: l = jr } = o,
    u = nE(o, ['window'])
  let f
  const h = fy(() => l && 'ResizeObserver' in l),
    d = () => {
      f && (f.disconnect(), (f = void 0))
    },
    g = yt(() => (Array.isArray(t) ? t.map((x) => rc(x)) : [rc(t)])),
    v = Re(
      g,
      (x) => {
        if ((d(), h.value && l)) {
          f = new ResizeObserver(e)
          for (const S of x) S && f.observe(S, u)
        }
      },
      { immediate: !0, flush: 'post', deep: !0 },
    ),
    b = () => {
      d(), v()
    }
  return Nh(b), { isSupported: h, stop: b }
}
function iE(t = 'history', e = {}) {
  const {
    initialValue: r = {},
    removeNullishValues: o = !0,
    removeFalsyValues: l = !1,
    write: u = !0,
    window: f = jr,
  } = e
  if (!f) return zn(r)
  const h = zn({})
  function d() {
    if (t === 'history') return f.location.search || ''
    if (t === 'hash') {
      const E = f.location.hash || '',
        L = E.indexOf('?')
      return L > 0 ? E.slice(L) : ''
    } else return (f.location.hash || '').replace(/^#/, '')
  }
  function g(E) {
    const L = E.toString()
    if (t === 'history') return `${L ? `?${L}` : ''}${f.location.hash || ''}`
    if (t === 'hash-params') return `${f.location.search || ''}${L ? `#${L}` : ''}`
    const F = f.location.hash || '#',
      A = F.indexOf('?')
    return A > 0 ? `${F.slice(0, A)}${L ? `?${L}` : ''}` : `${F}${L ? `?${L}` : ''}`
  }
  function v() {
    return new URLSearchParams(d())
  }
  function b(E) {
    const L = new Set(Object.keys(h))
    for (const F of E.keys()) {
      const A = E.getAll(F)
      ;(h[F] = A.length > 1 ? A : E.get(F) || ''), L.delete(F)
    }
    Array.from(L).forEach((F) => delete h[F])
  }
  const { pause: x, resume: S } = uy(
    h,
    () => {
      const E = new URLSearchParams('')
      Object.keys(h).forEach((L) => {
        const F = h[L]
        Array.isArray(F) ? F.forEach((A) => E.append(L, A)) : (o && F == null) || (l && !F) ? E.delete(L) : E.set(L, F)
      }),
        M(E)
    },
    { deep: !0 },
  )
  function M(E, L) {
    x(), L && b(E), f.history.replaceState(f.history.state, f.document.title, f.location.pathname + g(E)), S()
  }
  function T() {
    u && M(v(), !0)
  }
  ns(f, 'popstate', T, !1), t !== 'history' && ns(f, 'hashchange', T, !1)
  const N = v()
  return N.keys().next().value ? b(N) : Object.assign(h, r), h
}
function oE(t = {}) {
  const {
      window: e = jr,
      initialWidth: r = 1 / 0,
      initialHeight: o = 1 / 0,
      listenOrientation: l = !0,
      includeScrollbar: u = !0,
    } = t,
    f = Kt(r),
    h = Kt(o),
    d = () => {
      e &&
        (u
          ? ((f.value = e.innerWidth), (h.value = e.innerHeight))
          : ((f.value = e.document.documentElement.clientWidth), (h.value = e.document.documentElement.clientHeight)))
    }
  if ((d(), iy(d), ns('resize', d, { passive: !0 }), l)) {
    const g = hy('(orientation: portrait)')
    Re(g, () => d())
  }
  return { width: f, height: h }
}
const py = iE('hash', { initialValue: { file: '', view: null } }),
  gr = uh(py, 'file'),
  Xn = uh(py, 'view')
var Dn = Uint8Array,
  Do = Uint16Array,
  sE = Int32Array,
  gy = new Dn([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
  vy = new Dn([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
  aE = new Dn([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  my = function (t, e) {
    for (var r = new Do(31), o = 0; o < 31; ++o) r[o] = e += 1 << t[o - 1]
    for (var l = new sE(r[30]), o = 1; o < 30; ++o) for (var u = r[o]; u < r[o + 1]; ++u) l[u] = ((u - r[o]) << 5) | o
    return { b: r, r: l }
  },
  yy = my(gy, 2),
  by = yy.b,
  lE = yy.r
;(by[28] = 258), (lE[258] = 28)
var cE = my(vy, 0),
  uE = cE.b,
  $f = new Do(32768)
for (var _e = 0; _e < 32768; ++_e) {
  var di = ((_e & 43690) >> 1) | ((_e & 21845) << 1)
  ;(di = ((di & 52428) >> 2) | ((di & 13107) << 2)),
    (di = ((di & 61680) >> 4) | ((di & 3855) << 4)),
    ($f[_e] = (((di & 65280) >> 8) | ((di & 255) << 8)) >> 1)
}
var ia = function (t, e, r) {
    for (var o = t.length, l = 0, u = new Do(e); l < o; ++l) t[l] && ++u[t[l] - 1]
    var f = new Do(e)
    for (l = 1; l < e; ++l) f[l] = (f[l - 1] + u[l - 1]) << 1
    var h
    if (r) {
      h = new Do(1 << e)
      var d = 15 - e
      for (l = 0; l < o; ++l)
        if (t[l])
          for (var g = (l << 4) | t[l], v = e - t[l], b = f[t[l] - 1]++ << v, x = b | ((1 << v) - 1); b <= x; ++b)
            h[$f[b] >> d] = g
    } else for (h = new Do(o), l = 0; l < o; ++l) t[l] && (h[l] = $f[f[t[l] - 1]++] >> (15 - t[l]))
    return h
  },
  Ea = new Dn(288)
for (var _e = 0; _e < 144; ++_e) Ea[_e] = 8
for (var _e = 144; _e < 256; ++_e) Ea[_e] = 9
for (var _e = 256; _e < 280; ++_e) Ea[_e] = 7
for (var _e = 280; _e < 288; ++_e) Ea[_e] = 8
var wy = new Dn(32)
for (var _e = 0; _e < 32; ++_e) wy[_e] = 5
var fE = ia(Ea, 9, 1),
  hE = ia(wy, 5, 1),
  Ku = function (t) {
    for (var e = t[0], r = 1; r < t.length; ++r) t[r] > e && (e = t[r])
    return e
  },
  Yn = function (t, e, r) {
    var o = (e / 8) | 0
    return ((t[o] | (t[o + 1] << 8)) >> (e & 7)) & r
  },
  Xu = function (t, e) {
    var r = (e / 8) | 0
    return (t[r] | (t[r + 1] << 8) | (t[r + 2] << 16)) >> (e & 7)
  },
  dE = function (t) {
    return ((t + 7) / 8) | 0
  },
  xy = function (t, e, r) {
    ;(e == null || e < 0) && (e = 0), (r == null || r > t.length) && (r = t.length)
    var o = new Dn(r - e)
    return o.set(t.subarray(e, r)), o
  },
  pE = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data',
  ],
  kn = function (t, e, r) {
    var o = new Error(e || pE[t])
    if (((o.code = t), Error.captureStackTrace && Error.captureStackTrace(o, kn), !r)) throw o
    return o
  },
  Oh = function (t, e, r, o) {
    var l = t.length,
      u = o ? o.length : 0
    if (!l || (e.f && !e.l)) return r || new Dn(0)
    var f = !r || e.i != 2,
      h = e.i
    r || (r = new Dn(l * 3))
    var d = function (Mt) {
        var Nt = r.length
        if (Mt > Nt) {
          var O = new Dn(Math.max(Nt * 2, Mt))
          O.set(r), (r = O)
        }
      },
      g = e.f || 0,
      v = e.p || 0,
      b = e.b || 0,
      x = e.l,
      S = e.d,
      M = e.m,
      T = e.n,
      N = l * 8
    do {
      if (!x) {
        g = Yn(t, v, 1)
        var E = Yn(t, v + 1, 3)
        if (((v += 3), E))
          if (E == 1) (x = fE), (S = hE), (M = 9), (T = 5)
          else if (E == 2) {
            var B = Yn(t, v, 31) + 257,
              tt = Yn(t, v + 10, 15) + 4,
              ft = B + Yn(t, v + 5, 31) + 1
            v += 14
            for (var X = new Dn(ft), st = new Dn(19), ot = 0; ot < tt; ++ot) st[aE[ot]] = Yn(t, v + ot * 3, 7)
            v += tt * 3
            for (var kt = Ku(st), pt = (1 << kt) - 1, V = ia(st, kt, 1), ot = 0; ot < ft; ) {
              var R = V[Yn(t, v, pt)]
              v += R & 15
              var L = R >> 4
              if (L < 16) X[ot++] = L
              else {
                var k = 0,
                  H = 0
                for (
                  L == 16
                    ? ((H = 3 + Yn(t, v, 3)), (v += 2), (k = X[ot - 1]))
                    : L == 17
                      ? ((H = 3 + Yn(t, v, 7)), (v += 3))
                      : L == 18 && ((H = 11 + Yn(t, v, 127)), (v += 7));
                  H--;

                )
                  X[ot++] = k
              }
            }
            var W = X.subarray(0, B),
              J = X.subarray(B)
            ;(M = Ku(W)), (T = Ku(J)), (x = ia(W, M, 1)), (S = ia(J, T, 1))
          } else kn(1)
        else {
          var L = dE(v) + 4,
            F = t[L - 4] | (t[L - 3] << 8),
            A = L + F
          if (A > l) {
            h && kn(0)
            break
          }
          f && d(b + F), r.set(t.subarray(L, A), b), (e.b = b += F), (e.p = v = A * 8), (e.f = g)
          continue
        }
        if (v > N) {
          h && kn(0)
          break
        }
      }
      f && d(b + 131072)
      for (var wt = (1 << M) - 1, Tt = (1 << T) - 1, zt = v; ; zt = v) {
        var k = x[Xu(t, v) & wt],
          It = k >> 4
        if (((v += k & 15), v > N)) {
          h && kn(0)
          break
        }
        if ((k || kn(2), It < 256)) r[b++] = It
        else if (It == 256) {
          ;(zt = v), (x = null)
          break
        } else {
          var Gt = It - 254
          if (It > 264) {
            var ot = It - 257,
              Vt = gy[ot]
            ;(Gt = Yn(t, v, (1 << Vt) - 1) + by[ot]), (v += Vt)
          }
          var Jt = S[Xu(t, v) & Tt],
            _t = Jt >> 4
          Jt || kn(3), (v += Jt & 15)
          var J = uE[_t]
          if (_t > 3) {
            var Vt = vy[_t]
            ;(J += Xu(t, v) & ((1 << Vt) - 1)), (v += Vt)
          }
          if (v > N) {
            h && kn(0)
            break
          }
          f && d(b + 131072)
          var U = b + Gt
          if (b < J) {
            var et = u - J,
              it = Math.min(J, U)
            for (et + b < 0 && kn(3); b < it; ++b) r[b] = o[et + b]
          }
          for (; b < U; b += 4)
            (r[b] = r[b - J]), (r[b + 1] = r[b + 1 - J]), (r[b + 2] = r[b + 2 - J]), (r[b + 3] = r[b + 3 - J])
          b = U
        }
      }
      ;(e.l = x), (e.p = zt), (e.b = b), (e.f = g), x && ((g = 1), (e.m = M), (e.d = S), (e.n = T))
    } while (!g)
    return b == r.length ? r : xy(r, 0, b)
  },
  gE = new Dn(0),
  vE = function (t) {
    ;(t[0] != 31 || t[1] != 139 || t[2] != 8) && kn(6, 'invalid gzip data')
    var e = t[3],
      r = 10
    e & 4 && (r += (t[10] | (t[11] << 8)) + 2)
    for (var o = ((e >> 3) & 1) + ((e >> 4) & 1); o > 0; o -= !t[r++]);
    return r + (e & 2)
  },
  mE = function (t) {
    var e = t.length
    return (t[e - 4] | (t[e - 3] << 8) | (t[e - 2] << 16) | (t[e - 1] << 24)) >>> 0
  },
  yE = function (t, e) {
    return (
      ((t[0] & 15) != 8 || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31) && kn(6, 'invalid zlib data'),
      ((t[1] >> 5) & 1) == +!e && kn(6, 'invalid zlib data: ' + (t[1] & 32 ? 'need' : 'unexpected') + ' dictionary'),
      ((t[1] >> 3) & 4) + 2
    )
  }
function bE(t, e) {
  return Oh(t, { i: 2 }, e && e.out, e && e.dictionary)
}
function wE(t, e) {
  var r = vE(t)
  return (
    r + 8 > t.length && kn(6, 'invalid gzip data'),
    Oh(t.subarray(r, -8), { i: 2 }, (e && e.out) || new Dn(mE(t)), e && e.dictionary)
  )
}
function xE(t, e) {
  return Oh(t.subarray(yE(t, e && e.dictionary), -4), { i: 2 }, e && e.out, e && e.dictionary)
}
function _E(t, e) {
  return t[0] == 31 && t[1] == 139 && t[2] == 8
    ? wE(t, e)
    : (t[0] & 15) != 8 || t[0] >> 4 > 7 || ((t[0] << 8) | t[1]) % 31
      ? bE(t, e)
      : xE(t, e)
}
var Df = typeof TextDecoder < 'u' && new TextDecoder(),
  SE = 0
try {
  Df.decode(gE, { stream: !0 }), (SE = 1)
} catch {}
var kE = function (t) {
  for (var e = '', r = 0; ; ) {
    var o = t[r++],
      l = (o > 127) + (o > 223) + (o > 239)
    if (r + l > t.length) return { s: e, r: xy(t, r - 1) }
    l
      ? l == 3
        ? ((o = (((o & 15) << 18) | ((t[r++] & 63) << 12) | ((t[r++] & 63) << 6) | (t[r++] & 63)) - 65536),
          (e += String.fromCharCode(55296 | (o >> 10), 56320 | (o & 1023))))
        : l & 1
          ? (e += String.fromCharCode(((o & 31) << 6) | (t[r++] & 63)))
          : (e += String.fromCharCode(((o & 15) << 12) | ((t[r++] & 63) << 6) | (t[r++] & 63)))
      : (e += String.fromCharCode(o))
  }
}
function CE(t, e) {
  if (e) {
    for (var r = '', o = 0; o < t.length; o += 16384) r += String.fromCharCode.apply(null, t.subarray(o, o + 16384))
    return r
  } else {
    if (Df) return Df.decode(t)
    var l = kE(t),
      u = l.s,
      r = l.r
    return r.length && kn(8), u
  }
}
const Ev = () => {},
  _n = () => Promise.resolve()
function TE() {
  const t = zn({ state: new Z0(), waitForConnection: f, reconnect: l, ws: new EventTarget() })
  ;(t.state.filesMap = zn(t.state.filesMap)), (t.state.idMap = zn(t.state.idMap))
  let e
  const r = {
    getFiles: () => e.files,
    getPaths: () => e.paths,
    getConfig: () => e.config,
    getModuleGraph: async (h) => e.moduleGraph[h],
    getTransformResult: async (h) => ({ code: h, source: '', map: null }),
    onDone: Ev,
    onCollected: _n,
    onTaskUpdate: Ev,
    writeFile: _n,
    rerun: _n,
    updateSnapshot: _n,
    resolveSnapshotPath: _n,
    snapshotSaved: _n,
    onAfterSuiteRun: _n,
    onCancel: _n,
    getCountOfFailedTests: () => 0,
    sendLog: _n,
    resolveSnapshotRawPath: _n,
    readSnapshotFile: _n,
    saveSnapshotFile: _n,
    readTestFile: _n,
    removeSnapshotFile: _n,
  }
  t.rpc = r
  let o
  function l() {
    u()
  }
  async function u() {
    var v
    const h = await fetch(window.METADATA_PATH),
      d = ((v = h.headers.get('content-type')) == null ? void 0 : v.toLowerCase()) || ''
    if (d.includes('application/gzip') || d.includes('application/x-gzip')) {
      const b = new Uint8Array(await h.arrayBuffer()),
        x = CE(_E(b))
      e = Pf(x)
    } else e = Pf(await h.text())
    const g = new Event('open')
    t.ws.dispatchEvent(g)
  }
  u()
  function f() {
    return o
  }
  return t
}
const ga = Kt('idle'),
  Ge = (function () {
    return Wr
      ? TE()
      : eT(iT, {
          reactive: zn,
          handlers: {
            onTaskUpdate() {
              ga.value = 'running'
            },
            onFinished() {
              ga.value = 'idle'
            },
          },
        })
  })(),
  La = as({}),
  Vi = Kt('CONNECTING'),
  An = yt(() => Ge.state.getFiles()),
  Ae = yt(() => An.value.find((t) => t.id === gr.value)),
  _y = yt(
    () =>
      Mh(Ae.value)
        .map((t) => (t == null ? void 0 : t.logs) || [])
        .flat() || [],
  )
function ic(t) {
  return An.value.find((e) => e.id === t)
}
const EE = yt(() => Vi.value === 'OPEN'),
  Yu = yt(() => Vi.value === 'CONNECTING')
yt(() => Vi.value === 'CLOSED')
function LE(t = Ge.state.getFiles()) {
  return Sy(t)
}
function Sy(t) {
  return (
    t.forEach((e) => {
      delete e.result, Mh(e).forEach((r) => delete r.result)
    }),
    Ge.rpc.rerun(t.map((e) => e.filepath))
  )
}
function AE() {
  if (Ae.value) return Sy([Ae.value])
}
Re(
  () => Ge.ws,
  (t) => {
    ;(Vi.value = Wr ? 'OPEN' : 'CONNECTING'),
      t.addEventListener('open', async () => {
        ;(Vi.value = 'OPEN'), Ge.state.filesMap.clear()
        const [e, r] = await Promise.all([Ge.rpc.getFiles(), Ge.rpc.getConfig()])
        Ge.state.collectFiles(e), (La.value = r)
      }),
      t.addEventListener('close', () => {
        setTimeout(() => {
          Vi.value === 'CONNECTING' && (Vi.value = 'CLOSED')
        }, 1e3)
      })
  },
  { immediate: !0 },
)
const ME = { 'text-2xl': '' },
  NE = ut('div', { 'text-lg': '', op50: '' }, ' Check your terminal or start a new server with `vitest --ui` ', -1),
  PE = re({
    __name: 'ConnectionOverlay',
    setup(t) {
      return (e, r) =>
        G(EE)
          ? ne('', !0)
          : (ct(),
            Et(
              'div',
              {
                key: 0,
                fixed: '',
                'inset-0': '',
                p2: '',
                'z-10': '',
                'select-none': '',
                text: 'center sm',
                bg: 'overlay',
                'backdrop-blur-sm': '',
                'backdrop-saturate-0': '',
                onClick: r[0] || (r[0] = (...o) => G(Ge).reconnect && G(Ge).reconnect(...o)),
              },
              [
                ut(
                  'div',
                  {
                    'h-full': '',
                    flex: '~ col gap-2',
                    'items-center': '',
                    'justify-center': '',
                    class: ve(G(Yu) ? 'animate-pulse' : ''),
                  },
                  [
                    ut(
                      'div',
                      {
                        text: '5xl',
                        class: ve(G(Yu) ? 'i-carbon:renew animate-spin animate-reverse' : 'i-carbon-wifi-off'),
                      },
                      null,
                      2,
                    ),
                    ut('div', ME, te(G(Yu) ? 'Connecting...' : 'Disconnected'), 1),
                    NE,
                  ],
                  2,
                ),
              ],
            ))
    },
  })
var ky = {},
  Ir = {}
const OE = 'Á',
  $E = 'á',
  DE = 'Ă',
  RE = 'ă',
  zE = '∾',
  IE = '∿',
  FE = '∾̳',
  qE = 'Â',
  HE = 'â',
  BE = '´',
  WE = 'А',
  UE = 'а',
  jE = 'Æ',
  GE = 'æ',
  VE = '⁡',
  KE = '𝔄',
  XE = '𝔞',
  YE = 'À',
  ZE = 'à',
  JE = 'ℵ',
  QE = 'ℵ',
  tL = 'Α',
  eL = 'α',
  nL = 'Ā',
  rL = 'ā',
  iL = '⨿',
  oL = '&',
  sL = '&',
  aL = '⩕',
  lL = '⩓',
  cL = '∧',
  uL = '⩜',
  fL = '⩘',
  hL = '⩚',
  dL = '∠',
  pL = '⦤',
  gL = '∠',
  vL = '⦨',
  mL = '⦩',
  yL = '⦪',
  bL = '⦫',
  wL = '⦬',
  xL = '⦭',
  _L = '⦮',
  SL = '⦯',
  kL = '∡',
  CL = '∟',
  TL = '⊾',
  EL = '⦝',
  LL = '∢',
  AL = 'Å',
  ML = '⍼',
  NL = 'Ą',
  PL = 'ą',
  OL = '𝔸',
  $L = '𝕒',
  DL = '⩯',
  RL = '≈',
  zL = '⩰',
  IL = '≊',
  FL = '≋',
  qL = "'",
  HL = '⁡',
  BL = '≈',
  WL = '≊',
  UL = 'Å',
  jL = 'å',
  GL = '𝒜',
  VL = '𝒶',
  KL = '≔',
  XL = '*',
  YL = '≈',
  ZL = '≍',
  JL = 'Ã',
  QL = 'ã',
  tA = 'Ä',
  eA = 'ä',
  nA = '∳',
  rA = '⨑',
  iA = '≌',
  oA = '϶',
  sA = '‵',
  aA = '∽',
  lA = '⋍',
  cA = '∖',
  uA = '⫧',
  fA = '⊽',
  hA = '⌅',
  dA = '⌆',
  pA = '⌅',
  gA = '⎵',
  vA = '⎶',
  mA = '≌',
  yA = 'Б',
  bA = 'б',
  wA = '„',
  xA = '∵',
  _A = '∵',
  SA = '∵',
  kA = '⦰',
  CA = '϶',
  TA = 'ℬ',
  EA = 'ℬ',
  LA = 'Β',
  AA = 'β',
  MA = 'ℶ',
  NA = '≬',
  PA = '𝔅',
  OA = '𝔟',
  $A = '⋂',
  DA = '◯',
  RA = '⋃',
  zA = '⨀',
  IA = '⨁',
  FA = '⨂',
  qA = '⨆',
  HA = '★',
  BA = '▽',
  WA = '△',
  UA = '⨄',
  jA = '⋁',
  GA = '⋀',
  VA = '⤍',
  KA = '⧫',
  XA = '▪',
  YA = '▴',
  ZA = '▾',
  JA = '◂',
  QA = '▸',
  tM = '␣',
  eM = '▒',
  nM = '░',
  rM = '▓',
  iM = '█',
  oM = '=⃥',
  sM = '≡⃥',
  aM = '⫭',
  lM = '⌐',
  cM = '𝔹',
  uM = '𝕓',
  fM = '⊥',
  hM = '⊥',
  dM = '⋈',
  pM = '⧉',
  gM = '┐',
  vM = '╕',
  mM = '╖',
  yM = '╗',
  bM = '┌',
  wM = '╒',
  xM = '╓',
  _M = '╔',
  SM = '─',
  kM = '═',
  CM = '┬',
  TM = '╤',
  EM = '╥',
  LM = '╦',
  AM = '┴',
  MM = '╧',
  NM = '╨',
  PM = '╩',
  OM = '⊟',
  $M = '⊞',
  DM = '⊠',
  RM = '┘',
  zM = '╛',
  IM = '╜',
  FM = '╝',
  qM = '└',
  HM = '╘',
  BM = '╙',
  WM = '╚',
  UM = '│',
  jM = '║',
  GM = '┼',
  VM = '╪',
  KM = '╫',
  XM = '╬',
  YM = '┤',
  ZM = '╡',
  JM = '╢',
  QM = '╣',
  tN = '├',
  eN = '╞',
  nN = '╟',
  rN = '╠',
  iN = '‵',
  oN = '˘',
  sN = '˘',
  aN = '¦',
  lN = '𝒷',
  cN = 'ℬ',
  uN = '⁏',
  fN = '∽',
  hN = '⋍',
  dN = '⧅',
  pN = '\\',
  gN = '⟈',
  vN = '•',
  mN = '•',
  yN = '≎',
  bN = '⪮',
  wN = '≏',
  xN = '≎',
  _N = '≏',
  SN = 'Ć',
  kN = 'ć',
  CN = '⩄',
  TN = '⩉',
  EN = '⩋',
  LN = '∩',
  AN = '⋒',
  MN = '⩇',
  NN = '⩀',
  PN = 'ⅅ',
  ON = '∩︀',
  $N = '⁁',
  DN = 'ˇ',
  RN = 'ℭ',
  zN = '⩍',
  IN = 'Č',
  FN = 'č',
  qN = 'Ç',
  HN = 'ç',
  BN = 'Ĉ',
  WN = 'ĉ',
  UN = '∰',
  jN = '⩌',
  GN = '⩐',
  VN = 'Ċ',
  KN = 'ċ',
  XN = '¸',
  YN = '¸',
  ZN = '⦲',
  JN = '¢',
  QN = '·',
  tP = '·',
  eP = '𝔠',
  nP = 'ℭ',
  rP = 'Ч',
  iP = 'ч',
  oP = '✓',
  sP = '✓',
  aP = 'Χ',
  lP = 'χ',
  cP = 'ˆ',
  uP = '≗',
  fP = '↺',
  hP = '↻',
  dP = '⊛',
  pP = '⊚',
  gP = '⊝',
  vP = '⊙',
  mP = '®',
  yP = 'Ⓢ',
  bP = '⊖',
  wP = '⊕',
  xP = '⊗',
  _P = '○',
  SP = '⧃',
  kP = '≗',
  CP = '⨐',
  TP = '⫯',
  EP = '⧂',
  LP = '∲',
  AP = '”',
  MP = '’',
  NP = '♣',
  PP = '♣',
  OP = ':',
  $P = '∷',
  DP = '⩴',
  RP = '≔',
  zP = '≔',
  IP = ',',
  FP = '@',
  qP = '∁',
  HP = '∘',
  BP = '∁',
  WP = 'ℂ',
  UP = '≅',
  jP = '⩭',
  GP = '≡',
  VP = '∮',
  KP = '∯',
  XP = '∮',
  YP = '𝕔',
  ZP = 'ℂ',
  JP = '∐',
  QP = '∐',
  tO = '©',
  eO = '©',
  nO = '℗',
  rO = '∳',
  iO = '↵',
  oO = '✗',
  sO = '⨯',
  aO = '𝒞',
  lO = '𝒸',
  cO = '⫏',
  uO = '⫑',
  fO = '⫐',
  hO = '⫒',
  dO = '⋯',
  pO = '⤸',
  gO = '⤵',
  vO = '⋞',
  mO = '⋟',
  yO = '↶',
  bO = '⤽',
  wO = '⩈',
  xO = '⩆',
  _O = '≍',
  SO = '∪',
  kO = '⋓',
  CO = '⩊',
  TO = '⊍',
  EO = '⩅',
  LO = '∪︀',
  AO = '↷',
  MO = '⤼',
  NO = '⋞',
  PO = '⋟',
  OO = '⋎',
  $O = '⋏',
  DO = '¤',
  RO = '↶',
  zO = '↷',
  IO = '⋎',
  FO = '⋏',
  qO = '∲',
  HO = '∱',
  BO = '⌭',
  WO = '†',
  UO = '‡',
  jO = 'ℸ',
  GO = '↓',
  VO = '↡',
  KO = '⇓',
  XO = '‐',
  YO = '⫤',
  ZO = '⊣',
  JO = '⤏',
  QO = '˝',
  t$ = 'Ď',
  e$ = 'ď',
  n$ = 'Д',
  r$ = 'д',
  i$ = '‡',
  o$ = '⇊',
  s$ = 'ⅅ',
  a$ = 'ⅆ',
  l$ = '⤑',
  c$ = '⩷',
  u$ = '°',
  f$ = '∇',
  h$ = 'Δ',
  d$ = 'δ',
  p$ = '⦱',
  g$ = '⥿',
  v$ = '𝔇',
  m$ = '𝔡',
  y$ = '⥥',
  b$ = '⇃',
  w$ = '⇂',
  x$ = '´',
  _$ = '˙',
  S$ = '˝',
  k$ = '`',
  C$ = '˜',
  T$ = '⋄',
  E$ = '⋄',
  L$ = '⋄',
  A$ = '♦',
  M$ = '♦',
  N$ = '¨',
  P$ = 'ⅆ',
  O$ = 'ϝ',
  $$ = '⋲',
  D$ = '÷',
  R$ = '÷',
  z$ = '⋇',
  I$ = '⋇',
  F$ = 'Ђ',
  q$ = 'ђ',
  H$ = '⌞',
  B$ = '⌍',
  W$ = '$',
  U$ = '𝔻',
  j$ = '𝕕',
  G$ = '¨',
  V$ = '˙',
  K$ = '⃜',
  X$ = '≐',
  Y$ = '≑',
  Z$ = '≐',
  J$ = '∸',
  Q$ = '∔',
  tD = '⊡',
  eD = '⌆',
  nD = '∯',
  rD = '¨',
  iD = '⇓',
  oD = '⇐',
  sD = '⇔',
  aD = '⫤',
  lD = '⟸',
  cD = '⟺',
  uD = '⟹',
  fD = '⇒',
  hD = '⊨',
  dD = '⇑',
  pD = '⇕',
  gD = '∥',
  vD = '⤓',
  mD = '↓',
  yD = '↓',
  bD = '⇓',
  wD = '⇵',
  xD = '̑',
  _D = '⇊',
  SD = '⇃',
  kD = '⇂',
  CD = '⥐',
  TD = '⥞',
  ED = '⥖',
  LD = '↽',
  AD = '⥟',
  MD = '⥗',
  ND = '⇁',
  PD = '↧',
  OD = '⊤',
  $D = '⤐',
  DD = '⌟',
  RD = '⌌',
  zD = '𝒟',
  ID = '𝒹',
  FD = 'Ѕ',
  qD = 'ѕ',
  HD = '⧶',
  BD = 'Đ',
  WD = 'đ',
  UD = '⋱',
  jD = '▿',
  GD = '▾',
  VD = '⇵',
  KD = '⥯',
  XD = '⦦',
  YD = 'Џ',
  ZD = 'џ',
  JD = '⟿',
  QD = 'É',
  t2 = 'é',
  e2 = '⩮',
  n2 = 'Ě',
  r2 = 'ě',
  i2 = 'Ê',
  o2 = 'ê',
  s2 = '≖',
  a2 = '≕',
  l2 = 'Э',
  c2 = 'э',
  u2 = '⩷',
  f2 = 'Ė',
  h2 = 'ė',
  d2 = '≑',
  p2 = 'ⅇ',
  g2 = '≒',
  v2 = '𝔈',
  m2 = '𝔢',
  y2 = '⪚',
  b2 = 'È',
  w2 = 'è',
  x2 = '⪖',
  _2 = '⪘',
  S2 = '⪙',
  k2 = '∈',
  C2 = '⏧',
  T2 = 'ℓ',
  E2 = '⪕',
  L2 = '⪗',
  A2 = 'Ē',
  M2 = 'ē',
  N2 = '∅',
  P2 = '∅',
  O2 = '◻',
  $2 = '∅',
  D2 = '▫',
  R2 = ' ',
  z2 = ' ',
  I2 = ' ',
  F2 = 'Ŋ',
  q2 = 'ŋ',
  H2 = ' ',
  B2 = 'Ę',
  W2 = 'ę',
  U2 = '𝔼',
  j2 = '𝕖',
  G2 = '⋕',
  V2 = '⧣',
  K2 = '⩱',
  X2 = 'ε',
  Y2 = 'Ε',
  Z2 = 'ε',
  J2 = 'ϵ',
  Q2 = '≖',
  tR = '≕',
  eR = '≂',
  nR = '⪖',
  rR = '⪕',
  iR = '⩵',
  oR = '=',
  sR = '≂',
  aR = '≟',
  lR = '⇌',
  cR = '≡',
  uR = '⩸',
  fR = '⧥',
  hR = '⥱',
  dR = '≓',
  pR = 'ℯ',
  gR = 'ℰ',
  vR = '≐',
  mR = '⩳',
  yR = '≂',
  bR = 'Η',
  wR = 'η',
  xR = 'Ð',
  _R = 'ð',
  SR = 'Ë',
  kR = 'ë',
  CR = '€',
  TR = '!',
  ER = '∃',
  LR = '∃',
  AR = 'ℰ',
  MR = 'ⅇ',
  NR = 'ⅇ',
  PR = '≒',
  OR = 'Ф',
  $R = 'ф',
  DR = '♀',
  RR = 'ﬃ',
  zR = 'ﬀ',
  IR = 'ﬄ',
  FR = '𝔉',
  qR = '𝔣',
  HR = 'ﬁ',
  BR = '◼',
  WR = '▪',
  UR = 'fj',
  jR = '♭',
  GR = 'ﬂ',
  VR = '▱',
  KR = 'ƒ',
  XR = '𝔽',
  YR = '𝕗',
  ZR = '∀',
  JR = '∀',
  QR = '⋔',
  tz = '⫙',
  ez = 'ℱ',
  nz = '⨍',
  rz = '½',
  iz = '⅓',
  oz = '¼',
  sz = '⅕',
  az = '⅙',
  lz = '⅛',
  cz = '⅔',
  uz = '⅖',
  fz = '¾',
  hz = '⅗',
  dz = '⅜',
  pz = '⅘',
  gz = '⅚',
  vz = '⅝',
  mz = '⅞',
  yz = '⁄',
  bz = '⌢',
  wz = '𝒻',
  xz = 'ℱ',
  _z = 'ǵ',
  Sz = 'Γ',
  kz = 'γ',
  Cz = 'Ϝ',
  Tz = 'ϝ',
  Ez = '⪆',
  Lz = 'Ğ',
  Az = 'ğ',
  Mz = 'Ģ',
  Nz = 'Ĝ',
  Pz = 'ĝ',
  Oz = 'Г',
  $z = 'г',
  Dz = 'Ġ',
  Rz = 'ġ',
  zz = '≥',
  Iz = '≧',
  Fz = '⪌',
  qz = '⋛',
  Hz = '≥',
  Bz = '≧',
  Wz = '⩾',
  Uz = '⪩',
  jz = '⩾',
  Gz = '⪀',
  Vz = '⪂',
  Kz = '⪄',
  Xz = '⋛︀',
  Yz = '⪔',
  Zz = '𝔊',
  Jz = '𝔤',
  Qz = '≫',
  tI = '⋙',
  eI = '⋙',
  nI = 'ℷ',
  rI = 'Ѓ',
  iI = 'ѓ',
  oI = '⪥',
  sI = '≷',
  aI = '⪒',
  lI = '⪤',
  cI = '⪊',
  uI = '⪊',
  fI = '⪈',
  hI = '≩',
  dI = '⪈',
  pI = '≩',
  gI = '⋧',
  vI = '𝔾',
  mI = '𝕘',
  yI = '`',
  bI = '≥',
  wI = '⋛',
  xI = '≧',
  _I = '⪢',
  SI = '≷',
  kI = '⩾',
  CI = '≳',
  TI = '𝒢',
  EI = 'ℊ',
  LI = '≳',
  AI = '⪎',
  MI = '⪐',
  NI = '⪧',
  PI = '⩺',
  OI = '>',
  $I = '>',
  DI = '≫',
  RI = '⋗',
  zI = '⦕',
  II = '⩼',
  FI = '⪆',
  qI = '⥸',
  HI = '⋗',
  BI = '⋛',
  WI = '⪌',
  UI = '≷',
  jI = '≳',
  GI = '≩︀',
  VI = '≩︀',
  KI = 'ˇ',
  XI = ' ',
  YI = '½',
  ZI = 'ℋ',
  JI = 'Ъ',
  QI = 'ъ',
  tF = '⥈',
  eF = '↔',
  nF = '⇔',
  rF = '↭',
  iF = '^',
  oF = 'ℏ',
  sF = 'Ĥ',
  aF = 'ĥ',
  lF = '♥',
  cF = '♥',
  uF = '…',
  fF = '⊹',
  hF = '𝔥',
  dF = 'ℌ',
  pF = 'ℋ',
  gF = '⤥',
  vF = '⤦',
  mF = '⇿',
  yF = '∻',
  bF = '↩',
  wF = '↪',
  xF = '𝕙',
  _F = 'ℍ',
  SF = '―',
  kF = '─',
  CF = '𝒽',
  TF = 'ℋ',
  EF = 'ℏ',
  LF = 'Ħ',
  AF = 'ħ',
  MF = '≎',
  NF = '≏',
  PF = '⁃',
  OF = '‐',
  $F = 'Í',
  DF = 'í',
  RF = '⁣',
  zF = 'Î',
  IF = 'î',
  FF = 'И',
  qF = 'и',
  HF = 'İ',
  BF = 'Е',
  WF = 'е',
  UF = '¡',
  jF = '⇔',
  GF = '𝔦',
  VF = 'ℑ',
  KF = 'Ì',
  XF = 'ì',
  YF = 'ⅈ',
  ZF = '⨌',
  JF = '∭',
  QF = '⧜',
  tq = '℩',
  eq = 'Ĳ',
  nq = 'ĳ',
  rq = 'Ī',
  iq = 'ī',
  oq = 'ℑ',
  sq = 'ⅈ',
  aq = 'ℐ',
  lq = 'ℑ',
  cq = 'ı',
  uq = 'ℑ',
  fq = '⊷',
  hq = 'Ƶ',
  dq = '⇒',
  pq = '℅',
  gq = '∞',
  vq = '⧝',
  mq = 'ı',
  yq = '⊺',
  bq = '∫',
  wq = '∬',
  xq = 'ℤ',
  _q = '∫',
  Sq = '⊺',
  kq = '⋂',
  Cq = '⨗',
  Tq = '⨼',
  Eq = '⁣',
  Lq = '⁢',
  Aq = 'Ё',
  Mq = 'ё',
  Nq = 'Į',
  Pq = 'į',
  Oq = '𝕀',
  $q = '𝕚',
  Dq = 'Ι',
  Rq = 'ι',
  zq = '⨼',
  Iq = '¿',
  Fq = '𝒾',
  qq = 'ℐ',
  Hq = '∈',
  Bq = '⋵',
  Wq = '⋹',
  Uq = '⋴',
  jq = '⋳',
  Gq = '∈',
  Vq = '⁢',
  Kq = 'Ĩ',
  Xq = 'ĩ',
  Yq = 'І',
  Zq = 'і',
  Jq = 'Ï',
  Qq = 'ï',
  tH = 'Ĵ',
  eH = 'ĵ',
  nH = 'Й',
  rH = 'й',
  iH = '𝔍',
  oH = '𝔧',
  sH = 'ȷ',
  aH = '𝕁',
  lH = '𝕛',
  cH = '𝒥',
  uH = '𝒿',
  fH = 'Ј',
  hH = 'ј',
  dH = 'Є',
  pH = 'є',
  gH = 'Κ',
  vH = 'κ',
  mH = 'ϰ',
  yH = 'Ķ',
  bH = 'ķ',
  wH = 'К',
  xH = 'к',
  _H = '𝔎',
  SH = '𝔨',
  kH = 'ĸ',
  CH = 'Х',
  TH = 'х',
  EH = 'Ќ',
  LH = 'ќ',
  AH = '𝕂',
  MH = '𝕜',
  NH = '𝒦',
  PH = '𝓀',
  OH = '⇚',
  $H = 'Ĺ',
  DH = 'ĺ',
  RH = '⦴',
  zH = 'ℒ',
  IH = 'Λ',
  FH = 'λ',
  qH = '⟨',
  HH = '⟪',
  BH = '⦑',
  WH = '⟨',
  UH = '⪅',
  jH = 'ℒ',
  GH = '«',
  VH = '⇤',
  KH = '⤟',
  XH = '←',
  YH = '↞',
  ZH = '⇐',
  JH = '⤝',
  QH = '↩',
  tB = '↫',
  eB = '⤹',
  nB = '⥳',
  rB = '↢',
  iB = '⤙',
  oB = '⤛',
  sB = '⪫',
  aB = '⪭',
  lB = '⪭︀',
  cB = '⤌',
  uB = '⤎',
  fB = '❲',
  hB = '{',
  dB = '[',
  pB = '⦋',
  gB = '⦏',
  vB = '⦍',
  mB = 'Ľ',
  yB = 'ľ',
  bB = 'Ļ',
  wB = 'ļ',
  xB = '⌈',
  _B = '{',
  SB = 'Л',
  kB = 'л',
  CB = '⤶',
  TB = '“',
  EB = '„',
  LB = '⥧',
  AB = '⥋',
  MB = '↲',
  NB = '≤',
  PB = '≦',
  OB = '⟨',
  $B = '⇤',
  DB = '←',
  RB = '←',
  zB = '⇐',
  IB = '⇆',
  FB = '↢',
  qB = '⌈',
  HB = '⟦',
  BB = '⥡',
  WB = '⥙',
  UB = '⇃',
  jB = '⌊',
  GB = '↽',
  VB = '↼',
  KB = '⇇',
  XB = '↔',
  YB = '↔',
  ZB = '⇔',
  JB = '⇆',
  QB = '⇋',
  t3 = '↭',
  e3 = '⥎',
  n3 = '↤',
  r3 = '⊣',
  i3 = '⥚',
  o3 = '⋋',
  s3 = '⧏',
  a3 = '⊲',
  l3 = '⊴',
  c3 = '⥑',
  u3 = '⥠',
  f3 = '⥘',
  h3 = '↿',
  d3 = '⥒',
  p3 = '↼',
  g3 = '⪋',
  v3 = '⋚',
  m3 = '≤',
  y3 = '≦',
  b3 = '⩽',
  w3 = '⪨',
  x3 = '⩽',
  _3 = '⩿',
  S3 = '⪁',
  k3 = '⪃',
  C3 = '⋚︀',
  T3 = '⪓',
  E3 = '⪅',
  L3 = '⋖',
  A3 = '⋚',
  M3 = '⪋',
  N3 = '⋚',
  P3 = '≦',
  O3 = '≶',
  $3 = '≶',
  D3 = '⪡',
  R3 = '≲',
  z3 = '⩽',
  I3 = '≲',
  F3 = '⥼',
  q3 = '⌊',
  H3 = '𝔏',
  B3 = '𝔩',
  W3 = '≶',
  U3 = '⪑',
  j3 = '⥢',
  G3 = '↽',
  V3 = '↼',
  K3 = '⥪',
  X3 = '▄',
  Y3 = 'Љ',
  Z3 = 'љ',
  J3 = '⇇',
  Q3 = '≪',
  t5 = '⋘',
  e5 = '⌞',
  n5 = '⇚',
  r5 = '⥫',
  i5 = '◺',
  o5 = 'Ŀ',
  s5 = 'ŀ',
  a5 = '⎰',
  l5 = '⎰',
  c5 = '⪉',
  u5 = '⪉',
  f5 = '⪇',
  h5 = '≨',
  d5 = '⪇',
  p5 = '≨',
  g5 = '⋦',
  v5 = '⟬',
  m5 = '⇽',
  y5 = '⟦',
  b5 = '⟵',
  w5 = '⟵',
  x5 = '⟸',
  _5 = '⟷',
  S5 = '⟷',
  k5 = '⟺',
  C5 = '⟼',
  T5 = '⟶',
  E5 = '⟶',
  L5 = '⟹',
  A5 = '↫',
  M5 = '↬',
  N5 = '⦅',
  P5 = '𝕃',
  O5 = '𝕝',
  $5 = '⨭',
  D5 = '⨴',
  R5 = '∗',
  z5 = '_',
  I5 = '↙',
  F5 = '↘',
  q5 = '◊',
  H5 = '◊',
  B5 = '⧫',
  W5 = '(',
  U5 = '⦓',
  j5 = '⇆',
  G5 = '⌟',
  V5 = '⇋',
  K5 = '⥭',
  X5 = '‎',
  Y5 = '⊿',
  Z5 = '‹',
  J5 = '𝓁',
  Q5 = 'ℒ',
  t8 = '↰',
  e8 = '↰',
  n8 = '≲',
  r8 = '⪍',
  i8 = '⪏',
  o8 = '[',
  s8 = '‘',
  a8 = '‚',
  l8 = 'Ł',
  c8 = 'ł',
  u8 = '⪦',
  f8 = '⩹',
  h8 = '<',
  d8 = '<',
  p8 = '≪',
  g8 = '⋖',
  v8 = '⋋',
  m8 = '⋉',
  y8 = '⥶',
  b8 = '⩻',
  w8 = '◃',
  x8 = '⊴',
  _8 = '◂',
  S8 = '⦖',
  k8 = '⥊',
  C8 = '⥦',
  T8 = '≨︀',
  E8 = '≨︀',
  L8 = '¯',
  A8 = '♂',
  M8 = '✠',
  N8 = '✠',
  P8 = '↦',
  O8 = '↦',
  $8 = '↧',
  D8 = '↤',
  R8 = '↥',
  z8 = '▮',
  I8 = '⨩',
  F8 = 'М',
  q8 = 'м',
  H8 = '—',
  B8 = '∺',
  W8 = '∡',
  U8 = ' ',
  j8 = 'ℳ',
  G8 = '𝔐',
  V8 = '𝔪',
  K8 = '℧',
  X8 = 'µ',
  Y8 = '*',
  Z8 = '⫰',
  J8 = '∣',
  Q8 = '·',
  tW = '⊟',
  eW = '−',
  nW = '∸',
  rW = '⨪',
  iW = '∓',
  oW = '⫛',
  sW = '…',
  aW = '∓',
  lW = '⊧',
  cW = '𝕄',
  uW = '𝕞',
  fW = '∓',
  hW = '𝓂',
  dW = 'ℳ',
  pW = '∾',
  gW = 'Μ',
  vW = 'μ',
  mW = '⊸',
  yW = '⊸',
  bW = '∇',
  wW = 'Ń',
  xW = 'ń',
  _W = '∠⃒',
  SW = '≉',
  kW = '⩰̸',
  CW = '≋̸',
  TW = 'ŉ',
  EW = '≉',
  LW = '♮',
  AW = 'ℕ',
  MW = '♮',
  NW = ' ',
  PW = '≎̸',
  OW = '≏̸',
  $W = '⩃',
  DW = 'Ň',
  RW = 'ň',
  zW = 'Ņ',
  IW = 'ņ',
  FW = '≇',
  qW = '⩭̸',
  HW = '⩂',
  BW = 'Н',
  WW = 'н',
  UW = '–',
  jW = '⤤',
  GW = '↗',
  VW = '⇗',
  KW = '↗',
  XW = '≠',
  YW = '≐̸',
  ZW = '​',
  JW = '​',
  QW = '​',
  tU = '​',
  eU = '≢',
  nU = '⤨',
  rU = '≂̸',
  iU = '≫',
  oU = '≪',
  sU = `
`,
  aU = '∄',
  lU = '∄',
  cU = '𝔑',
  uU = '𝔫',
  fU = '≧̸',
  hU = '≱',
  dU = '≱',
  pU = '≧̸',
  gU = '⩾̸',
  vU = '⩾̸',
  mU = '⋙̸',
  yU = '≵',
  bU = '≫⃒',
  wU = '≯',
  xU = '≯',
  _U = '≫̸',
  SU = '↮',
  kU = '⇎',
  CU = '⫲',
  TU = '∋',
  EU = '⋼',
  LU = '⋺',
  AU = '∋',
  MU = 'Њ',
  NU = 'њ',
  PU = '↚',
  OU = '⇍',
  $U = '‥',
  DU = '≦̸',
  RU = '≰',
  zU = '↚',
  IU = '⇍',
  FU = '↮',
  qU = '⇎',
  HU = '≰',
  BU = '≦̸',
  WU = '⩽̸',
  UU = '⩽̸',
  jU = '≮',
  GU = '⋘̸',
  VU = '≴',
  KU = '≪⃒',
  XU = '≮',
  YU = '⋪',
  ZU = '⋬',
  JU = '≪̸',
  QU = '∤',
  t4 = '⁠',
  e4 = ' ',
  n4 = '𝕟',
  r4 = 'ℕ',
  i4 = '⫬',
  o4 = '¬',
  s4 = '≢',
  a4 = '≭',
  l4 = '∦',
  c4 = '∉',
  u4 = '≠',
  f4 = '≂̸',
  h4 = '∄',
  d4 = '≯',
  p4 = '≱',
  g4 = '≧̸',
  v4 = '≫̸',
  m4 = '≹',
  y4 = '⩾̸',
  b4 = '≵',
  w4 = '≎̸',
  x4 = '≏̸',
  _4 = '∉',
  S4 = '⋵̸',
  k4 = '⋹̸',
  C4 = '∉',
  T4 = '⋷',
  E4 = '⋶',
  L4 = '⧏̸',
  A4 = '⋪',
  M4 = '⋬',
  N4 = '≮',
  P4 = '≰',
  O4 = '≸',
  $4 = '≪̸',
  D4 = '⩽̸',
  R4 = '≴',
  z4 = '⪢̸',
  I4 = '⪡̸',
  F4 = '∌',
  q4 = '∌',
  H4 = '⋾',
  B4 = '⋽',
  W4 = '⊀',
  U4 = '⪯̸',
  j4 = '⋠',
  G4 = '∌',
  V4 = '⧐̸',
  K4 = '⋫',
  X4 = '⋭',
  Y4 = '⊏̸',
  Z4 = '⋢',
  J4 = '⊐̸',
  Q4 = '⋣',
  t6 = '⊂⃒',
  e6 = '⊈',
  n6 = '⊁',
  r6 = '⪰̸',
  i6 = '⋡',
  o6 = '≿̸',
  s6 = '⊃⃒',
  a6 = '⊉',
  l6 = '≁',
  c6 = '≄',
  u6 = '≇',
  f6 = '≉',
  h6 = '∤',
  d6 = '∦',
  p6 = '∦',
  g6 = '⫽⃥',
  v6 = '∂̸',
  m6 = '⨔',
  y6 = '⊀',
  b6 = '⋠',
  w6 = '⊀',
  x6 = '⪯̸',
  _6 = '⪯̸',
  S6 = '⤳̸',
  k6 = '↛',
  C6 = '⇏',
  T6 = '↝̸',
  E6 = '↛',
  L6 = '⇏',
  A6 = '⋫',
  M6 = '⋭',
  N6 = '⊁',
  P6 = '⋡',
  O6 = '⪰̸',
  $6 = '𝒩',
  D6 = '𝓃',
  R6 = '∤',
  z6 = '∦',
  I6 = '≁',
  F6 = '≄',
  q6 = '≄',
  H6 = '∤',
  B6 = '∦',
  W6 = '⋢',
  U6 = '⋣',
  j6 = '⊄',
  G6 = '⫅̸',
  V6 = '⊈',
  K6 = '⊂⃒',
  X6 = '⊈',
  Y6 = '⫅̸',
  Z6 = '⊁',
  J6 = '⪰̸',
  Q6 = '⊅',
  tj = '⫆̸',
  ej = '⊉',
  nj = '⊃⃒',
  rj = '⊉',
  ij = '⫆̸',
  oj = '≹',
  sj = 'Ñ',
  aj = 'ñ',
  lj = '≸',
  cj = '⋪',
  uj = '⋬',
  fj = '⋫',
  hj = '⋭',
  dj = 'Ν',
  pj = 'ν',
  gj = '#',
  vj = '№',
  mj = ' ',
  yj = '≍⃒',
  bj = '⊬',
  wj = '⊭',
  xj = '⊮',
  _j = '⊯',
  Sj = '≥⃒',
  kj = '>⃒',
  Cj = '⤄',
  Tj = '⧞',
  Ej = '⤂',
  Lj = '≤⃒',
  Aj = '<⃒',
  Mj = '⊴⃒',
  Nj = '⤃',
  Pj = '⊵⃒',
  Oj = '∼⃒',
  $j = '⤣',
  Dj = '↖',
  Rj = '⇖',
  zj = '↖',
  Ij = '⤧',
  Fj = 'Ó',
  qj = 'ó',
  Hj = '⊛',
  Bj = 'Ô',
  Wj = 'ô',
  Uj = '⊚',
  jj = 'О',
  Gj = 'о',
  Vj = '⊝',
  Kj = 'Ő',
  Xj = 'ő',
  Yj = '⨸',
  Zj = '⊙',
  Jj = '⦼',
  Qj = 'Œ',
  t9 = 'œ',
  e9 = '⦿',
  n9 = '𝔒',
  r9 = '𝔬',
  i9 = '˛',
  o9 = 'Ò',
  s9 = 'ò',
  a9 = '⧁',
  l9 = '⦵',
  c9 = 'Ω',
  u9 = '∮',
  f9 = '↺',
  h9 = '⦾',
  d9 = '⦻',
  p9 = '‾',
  g9 = '⧀',
  v9 = 'Ō',
  m9 = 'ō',
  y9 = 'Ω',
  b9 = 'ω',
  w9 = 'Ο',
  x9 = 'ο',
  _9 = '⦶',
  S9 = '⊖',
  k9 = '𝕆',
  C9 = '𝕠',
  T9 = '⦷',
  E9 = '“',
  L9 = '‘',
  A9 = '⦹',
  M9 = '⊕',
  N9 = '↻',
  P9 = '⩔',
  O9 = '∨',
  $9 = '⩝',
  D9 = 'ℴ',
  R9 = 'ℴ',
  z9 = 'ª',
  I9 = 'º',
  F9 = '⊶',
  q9 = '⩖',
  H9 = '⩗',
  B9 = '⩛',
  W9 = 'Ⓢ',
  U9 = '𝒪',
  j9 = 'ℴ',
  G9 = 'Ø',
  V9 = 'ø',
  K9 = '⊘',
  X9 = 'Õ',
  Y9 = 'õ',
  Z9 = '⨶',
  J9 = '⨷',
  Q9 = '⊗',
  tG = 'Ö',
  eG = 'ö',
  nG = '⌽',
  rG = '‾',
  iG = '⏞',
  oG = '⎴',
  sG = '⏜',
  aG = '¶',
  lG = '∥',
  cG = '∥',
  uG = '⫳',
  fG = '⫽',
  hG = '∂',
  dG = '∂',
  pG = 'П',
  gG = 'п',
  vG = '%',
  mG = '.',
  yG = '‰',
  bG = '⊥',
  wG = '‱',
  xG = '𝔓',
  _G = '𝔭',
  SG = 'Φ',
  kG = 'φ',
  CG = 'ϕ',
  TG = 'ℳ',
  EG = '☎',
  LG = 'Π',
  AG = 'π',
  MG = '⋔',
  NG = 'ϖ',
  PG = 'ℏ',
  OG = 'ℎ',
  $G = 'ℏ',
  DG = '⨣',
  RG = '⊞',
  zG = '⨢',
  IG = '+',
  FG = '∔',
  qG = '⨥',
  HG = '⩲',
  BG = '±',
  WG = '±',
  UG = '⨦',
  jG = '⨧',
  GG = '±',
  VG = 'ℌ',
  KG = '⨕',
  XG = '𝕡',
  YG = 'ℙ',
  ZG = '£',
  JG = '⪷',
  QG = '⪻',
  tV = '≺',
  eV = '≼',
  nV = '⪷',
  rV = '≺',
  iV = '≼',
  oV = '≺',
  sV = '⪯',
  aV = '≼',
  lV = '≾',
  cV = '⪯',
  uV = '⪹',
  fV = '⪵',
  hV = '⋨',
  dV = '⪯',
  pV = '⪳',
  gV = '≾',
  vV = '′',
  mV = '″',
  yV = 'ℙ',
  bV = '⪹',
  wV = '⪵',
  xV = '⋨',
  _V = '∏',
  SV = '∏',
  kV = '⌮',
  CV = '⌒',
  TV = '⌓',
  EV = '∝',
  LV = '∝',
  AV = '∷',
  MV = '∝',
  NV = '≾',
  PV = '⊰',
  OV = '𝒫',
  $V = '𝓅',
  DV = 'Ψ',
  RV = 'ψ',
  zV = ' ',
  IV = '𝔔',
  FV = '𝔮',
  qV = '⨌',
  HV = '𝕢',
  BV = 'ℚ',
  WV = '⁗',
  UV = '𝒬',
  jV = '𝓆',
  GV = 'ℍ',
  VV = '⨖',
  KV = '?',
  XV = '≟',
  YV = '"',
  ZV = '"',
  JV = '⇛',
  QV = '∽̱',
  t7 = 'Ŕ',
  e7 = 'ŕ',
  n7 = '√',
  r7 = '⦳',
  i7 = '⟩',
  o7 = '⟫',
  s7 = '⦒',
  a7 = '⦥',
  l7 = '⟩',
  c7 = '»',
  u7 = '⥵',
  f7 = '⇥',
  h7 = '⤠',
  d7 = '⤳',
  p7 = '→',
  g7 = '↠',
  v7 = '⇒',
  m7 = '⤞',
  y7 = '↪',
  b7 = '↬',
  w7 = '⥅',
  x7 = '⥴',
  _7 = '⤖',
  S7 = '↣',
  k7 = '↝',
  C7 = '⤚',
  T7 = '⤜',
  E7 = '∶',
  L7 = 'ℚ',
  A7 = '⤍',
  M7 = '⤏',
  N7 = '⤐',
  P7 = '❳',
  O7 = '}',
  $7 = ']',
  D7 = '⦌',
  R7 = '⦎',
  z7 = '⦐',
  I7 = 'Ř',
  F7 = 'ř',
  q7 = 'Ŗ',
  H7 = 'ŗ',
  B7 = '⌉',
  W7 = '}',
  U7 = 'Р',
  j7 = 'р',
  G7 = '⤷',
  V7 = '⥩',
  K7 = '”',
  X7 = '”',
  Y7 = '↳',
  Z7 = 'ℜ',
  J7 = 'ℛ',
  Q7 = 'ℜ',
  tK = 'ℝ',
  eK = 'ℜ',
  nK = '▭',
  rK = '®',
  iK = '®',
  oK = '∋',
  sK = '⇋',
  aK = '⥯',
  lK = '⥽',
  cK = '⌋',
  uK = '𝔯',
  fK = 'ℜ',
  hK = '⥤',
  dK = '⇁',
  pK = '⇀',
  gK = '⥬',
  vK = 'Ρ',
  mK = 'ρ',
  yK = 'ϱ',
  bK = '⟩',
  wK = '⇥',
  xK = '→',
  _K = '→',
  SK = '⇒',
  kK = '⇄',
  CK = '↣',
  TK = '⌉',
  EK = '⟧',
  LK = '⥝',
  AK = '⥕',
  MK = '⇂',
  NK = '⌋',
  PK = '⇁',
  OK = '⇀',
  $K = '⇄',
  DK = '⇌',
  RK = '⇉',
  zK = '↝',
  IK = '↦',
  FK = '⊢',
  qK = '⥛',
  HK = '⋌',
  BK = '⧐',
  WK = '⊳',
  UK = '⊵',
  jK = '⥏',
  GK = '⥜',
  VK = '⥔',
  KK = '↾',
  XK = '⥓',
  YK = '⇀',
  ZK = '˚',
  JK = '≓',
  QK = '⇄',
  tX = '⇌',
  eX = '‏',
  nX = '⎱',
  rX = '⎱',
  iX = '⫮',
  oX = '⟭',
  sX = '⇾',
  aX = '⟧',
  lX = '⦆',
  cX = '𝕣',
  uX = 'ℝ',
  fX = '⨮',
  hX = '⨵',
  dX = '⥰',
  pX = ')',
  gX = '⦔',
  vX = '⨒',
  mX = '⇉',
  yX = '⇛',
  bX = '›',
  wX = '𝓇',
  xX = 'ℛ',
  _X = '↱',
  SX = '↱',
  kX = ']',
  CX = '’',
  TX = '’',
  EX = '⋌',
  LX = '⋊',
  AX = '▹',
  MX = '⊵',
  NX = '▸',
  PX = '⧎',
  OX = '⧴',
  $X = '⥨',
  DX = '℞',
  RX = 'Ś',
  zX = 'ś',
  IX = '‚',
  FX = '⪸',
  qX = 'Š',
  HX = 'š',
  BX = '⪼',
  WX = '≻',
  UX = '≽',
  jX = '⪰',
  GX = '⪴',
  VX = 'Ş',
  KX = 'ş',
  XX = 'Ŝ',
  YX = 'ŝ',
  ZX = '⪺',
  JX = '⪶',
  QX = '⋩',
  tY = '⨓',
  eY = '≿',
  nY = 'С',
  rY = 'с',
  iY = '⊡',
  oY = '⋅',
  sY = '⩦',
  aY = '⤥',
  lY = '↘',
  cY = '⇘',
  uY = '↘',
  fY = '§',
  hY = ';',
  dY = '⤩',
  pY = '∖',
  gY = '∖',
  vY = '✶',
  mY = '𝔖',
  yY = '𝔰',
  bY = '⌢',
  wY = '♯',
  xY = 'Щ',
  _Y = 'щ',
  SY = 'Ш',
  kY = 'ш',
  CY = '↓',
  TY = '←',
  EY = '∣',
  LY = '∥',
  AY = '→',
  MY = '↑',
  NY = '­',
  PY = 'Σ',
  OY = 'σ',
  $Y = 'ς',
  DY = 'ς',
  RY = '∼',
  zY = '⩪',
  IY = '≃',
  FY = '≃',
  qY = '⪞',
  HY = '⪠',
  BY = '⪝',
  WY = '⪟',
  UY = '≆',
  jY = '⨤',
  GY = '⥲',
  VY = '←',
  KY = '∘',
  XY = '∖',
  YY = '⨳',
  ZY = '⧤',
  JY = '∣',
  QY = '⌣',
  tZ = '⪪',
  eZ = '⪬',
  nZ = '⪬︀',
  rZ = 'Ь',
  iZ = 'ь',
  oZ = '⌿',
  sZ = '⧄',
  aZ = '/',
  lZ = '𝕊',
  cZ = '𝕤',
  uZ = '♠',
  fZ = '♠',
  hZ = '∥',
  dZ = '⊓',
  pZ = '⊓︀',
  gZ = '⊔',
  vZ = '⊔︀',
  mZ = '√',
  yZ = '⊏',
  bZ = '⊑',
  wZ = '⊏',
  xZ = '⊑',
  _Z = '⊐',
  SZ = '⊒',
  kZ = '⊐',
  CZ = '⊒',
  TZ = '□',
  EZ = '□',
  LZ = '⊓',
  AZ = '⊏',
  MZ = '⊑',
  NZ = '⊐',
  PZ = '⊒',
  OZ = '⊔',
  $Z = '▪',
  DZ = '□',
  RZ = '▪',
  zZ = '→',
  IZ = '𝒮',
  FZ = '𝓈',
  qZ = '∖',
  HZ = '⌣',
  BZ = '⋆',
  WZ = '⋆',
  UZ = '☆',
  jZ = '★',
  GZ = 'ϵ',
  VZ = 'ϕ',
  KZ = '¯',
  XZ = '⊂',
  YZ = '⋐',
  ZZ = '⪽',
  JZ = '⫅',
  QZ = '⊆',
  tJ = '⫃',
  eJ = '⫁',
  nJ = '⫋',
  rJ = '⊊',
  iJ = '⪿',
  oJ = '⥹',
  sJ = '⊂',
  aJ = '⋐',
  lJ = '⊆',
  cJ = '⫅',
  uJ = '⊆',
  fJ = '⊊',
  hJ = '⫋',
  dJ = '⫇',
  pJ = '⫕',
  gJ = '⫓',
  vJ = '⪸',
  mJ = '≻',
  yJ = '≽',
  bJ = '≻',
  wJ = '⪰',
  xJ = '≽',
  _J = '≿',
  SJ = '⪰',
  kJ = '⪺',
  CJ = '⪶',
  TJ = '⋩',
  EJ = '≿',
  LJ = '∋',
  AJ = '∑',
  MJ = '∑',
  NJ = '♪',
  PJ = '¹',
  OJ = '²',
  $J = '³',
  DJ = '⊃',
  RJ = '⋑',
  zJ = '⪾',
  IJ = '⫘',
  FJ = '⫆',
  qJ = '⊇',
  HJ = '⫄',
  BJ = '⊃',
  WJ = '⊇',
  UJ = '⟉',
  jJ = '⫗',
  GJ = '⥻',
  VJ = '⫂',
  KJ = '⫌',
  XJ = '⊋',
  YJ = '⫀',
  ZJ = '⊃',
  JJ = '⋑',
  QJ = '⊇',
  tQ = '⫆',
  eQ = '⊋',
  nQ = '⫌',
  rQ = '⫈',
  iQ = '⫔',
  oQ = '⫖',
  sQ = '⤦',
  aQ = '↙',
  lQ = '⇙',
  cQ = '↙',
  uQ = '⤪',
  fQ = 'ß',
  hQ = '	',
  dQ = '⌖',
  pQ = 'Τ',
  gQ = 'τ',
  vQ = '⎴',
  mQ = 'Ť',
  yQ = 'ť',
  bQ = 'Ţ',
  wQ = 'ţ',
  xQ = 'Т',
  _Q = 'т',
  SQ = '⃛',
  kQ = '⌕',
  CQ = '𝔗',
  TQ = '𝔱',
  EQ = '∴',
  LQ = '∴',
  AQ = '∴',
  MQ = 'Θ',
  NQ = 'θ',
  PQ = 'ϑ',
  OQ = 'ϑ',
  $Q = '≈',
  DQ = '∼',
  RQ = '  ',
  zQ = ' ',
  IQ = ' ',
  FQ = '≈',
  qQ = '∼',
  HQ = 'Þ',
  BQ = 'þ',
  WQ = '˜',
  UQ = '∼',
  jQ = '≃',
  GQ = '≅',
  VQ = '≈',
  KQ = '⨱',
  XQ = '⊠',
  YQ = '×',
  ZQ = '⨰',
  JQ = '∭',
  QQ = '⤨',
  ttt = '⌶',
  ett = '⫱',
  ntt = '⊤',
  rtt = '𝕋',
  itt = '𝕥',
  ott = '⫚',
  stt = '⤩',
  att = '‴',
  ltt = '™',
  ctt = '™',
  utt = '▵',
  ftt = '▿',
  htt = '◃',
  dtt = '⊴',
  ptt = '≜',
  gtt = '▹',
  vtt = '⊵',
  mtt = '◬',
  ytt = '≜',
  btt = '⨺',
  wtt = '⃛',
  xtt = '⨹',
  _tt = '⧍',
  Stt = '⨻',
  ktt = '⏢',
  Ctt = '𝒯',
  Ttt = '𝓉',
  Ett = 'Ц',
  Ltt = 'ц',
  Att = 'Ћ',
  Mtt = 'ћ',
  Ntt = 'Ŧ',
  Ptt = 'ŧ',
  Ott = '≬',
  $tt = '↞',
  Dtt = '↠',
  Rtt = 'Ú',
  ztt = 'ú',
  Itt = '↑',
  Ftt = '↟',
  qtt = '⇑',
  Htt = '⥉',
  Btt = 'Ў',
  Wtt = 'ў',
  Utt = 'Ŭ',
  jtt = 'ŭ',
  Gtt = 'Û',
  Vtt = 'û',
  Ktt = 'У',
  Xtt = 'у',
  Ytt = '⇅',
  Ztt = 'Ű',
  Jtt = 'ű',
  Qtt = '⥮',
  tet = '⥾',
  eet = '𝔘',
  net = '𝔲',
  ret = 'Ù',
  iet = 'ù',
  oet = '⥣',
  set = '↿',
  aet = '↾',
  cet = '▀',
  uet = '⌜',
  fet = '⌜',
  het = '⌏',
  det = '◸',
  pet = 'Ū',
  get = 'ū',
  vet = '¨',
  met = '_',
  yet = '⏟',
  bet = '⎵',
  wet = '⏝',
  xet = '⋃',
  _et = '⊎',
  ket = 'Ų',
  Cet = 'ų',
  Tet = '𝕌',
  Eet = '𝕦',
  Let = '⤒',
  Aet = '↑',
  Met = '↑',
  Net = '⇑',
  Pet = '⇅',
  Oet = '↕',
  $et = '↕',
  Det = '⇕',
  Ret = '⥮',
  zet = '↿',
  Iet = '↾',
  Fet = '⊎',
  qet = '↖',
  Het = '↗',
  Bet = 'υ',
  Wet = 'ϒ',
  Uet = 'ϒ',
  jet = 'Υ',
  Get = 'υ',
  Vet = '↥',
  Ket = '⊥',
  Xet = '⇈',
  Yet = '⌝',
  Zet = '⌝',
  Jet = '⌎',
  Qet = 'Ů',
  tnt = 'ů',
  ent = '◹',
  nnt = '𝒰',
  rnt = '𝓊',
  int = '⋰',
  ont = 'Ũ',
  snt = 'ũ',
  ant = '▵',
  lnt = '▴',
  cnt = '⇈',
  unt = 'Ü',
  fnt = 'ü',
  hnt = '⦧',
  dnt = '⦜',
  pnt = 'ϵ',
  gnt = 'ϰ',
  vnt = '∅',
  mnt = 'ϕ',
  ynt = 'ϖ',
  bnt = '∝',
  wnt = '↕',
  xnt = '⇕',
  _nt = 'ϱ',
  Snt = 'ς',
  knt = '⊊︀',
  Cnt = '⫋︀',
  Tnt = '⊋︀',
  Ent = '⫌︀',
  Lnt = 'ϑ',
  Ant = '⊲',
  Mnt = '⊳',
  Nnt = '⫨',
  Pnt = '⫫',
  Ont = '⫩',
  $nt = 'В',
  Dnt = 'в',
  Rnt = '⊢',
  znt = '⊨',
  Int = '⊩',
  Fnt = '⊫',
  qnt = '⫦',
  Hnt = '⊻',
  Bnt = '∨',
  Wnt = '⋁',
  Unt = '≚',
  jnt = '⋮',
  Gnt = '|',
  Vnt = '‖',
  Knt = '|',
  Xnt = '‖',
  Ynt = '∣',
  Znt = '|',
  Jnt = '❘',
  Qnt = '≀',
  trt = ' ',
  ert = '𝔙',
  nrt = '𝔳',
  rrt = '⊲',
  irt = '⊂⃒',
  ort = '⊃⃒',
  srt = '𝕍',
  art = '𝕧',
  lrt = '∝',
  crt = '⊳',
  urt = '𝒱',
  frt = '𝓋',
  hrt = '⫋︀',
  drt = '⊊︀',
  prt = '⫌︀',
  grt = '⊋︀',
  vrt = '⊪',
  mrt = '⦚',
  yrt = 'Ŵ',
  brt = 'ŵ',
  wrt = '⩟',
  xrt = '∧',
  _rt = '⋀',
  Srt = '≙',
  krt = '℘',
  Crt = '𝔚',
  Trt = '𝔴',
  Ert = '𝕎',
  Lrt = '𝕨',
  Art = '℘',
  Mrt = '≀',
  Nrt = '≀',
  Prt = '𝒲',
  Ort = '𝓌',
  $rt = '⋂',
  Drt = '◯',
  Rrt = '⋃',
  zrt = '▽',
  Irt = '𝔛',
  Frt = '𝔵',
  qrt = '⟷',
  Hrt = '⟺',
  Brt = 'Ξ',
  Wrt = 'ξ',
  Urt = '⟵',
  jrt = '⟸',
  Grt = '⟼',
  Vrt = '⋻',
  Krt = '⨀',
  Xrt = '𝕏',
  Yrt = '𝕩',
  Zrt = '⨁',
  Jrt = '⨂',
  Qrt = '⟶',
  tit = '⟹',
  eit = '𝒳',
  nit = '𝓍',
  rit = '⨆',
  iit = '⨄',
  oit = '△',
  sit = '⋁',
  ait = '⋀',
  lit = 'Ý',
  cit = 'ý',
  uit = 'Я',
  fit = 'я',
  hit = 'Ŷ',
  dit = 'ŷ',
  pit = 'Ы',
  git = 'ы',
  vit = '¥',
  mit = '𝔜',
  yit = '𝔶',
  bit = 'Ї',
  wit = 'ї',
  xit = '𝕐',
  _it = '𝕪',
  Sit = '𝒴',
  kit = '𝓎',
  Cit = 'Ю',
  Tit = 'ю',
  Eit = 'ÿ',
  Lit = 'Ÿ',
  Ait = 'Ź',
  Mit = 'ź',
  Nit = 'Ž',
  Pit = 'ž',
  Oit = 'З',
  $it = 'з',
  Dit = 'Ż',
  Rit = 'ż',
  zit = 'ℨ',
  Iit = '​',
  Fit = 'Ζ',
  qit = 'ζ',
  Hit = '𝔷',
  Bit = 'ℨ',
  Wit = 'Ж',
  Uit = 'ж',
  jit = '⇝',
  Git = '𝕫',
  Vit = 'ℤ',
  Kit = '𝒵',
  Xit = '𝓏',
  Yit = '‍',
  Zit = '‌',
  Cy = {
    Aacute: OE,
    aacute: $E,
    Abreve: DE,
    abreve: RE,
    ac: zE,
    acd: IE,
    acE: FE,
    Acirc: qE,
    acirc: HE,
    acute: BE,
    Acy: WE,
    acy: UE,
    AElig: jE,
    aelig: GE,
    af: VE,
    Afr: KE,
    afr: XE,
    Agrave: YE,
    agrave: ZE,
    alefsym: JE,
    aleph: QE,
    Alpha: tL,
    alpha: eL,
    Amacr: nL,
    amacr: rL,
    amalg: iL,
    amp: oL,
    AMP: sL,
    andand: aL,
    And: lL,
    and: cL,
    andd: uL,
    andslope: fL,
    andv: hL,
    ang: dL,
    ange: pL,
    angle: gL,
    angmsdaa: vL,
    angmsdab: mL,
    angmsdac: yL,
    angmsdad: bL,
    angmsdae: wL,
    angmsdaf: xL,
    angmsdag: _L,
    angmsdah: SL,
    angmsd: kL,
    angrt: CL,
    angrtvb: TL,
    angrtvbd: EL,
    angsph: LL,
    angst: AL,
    angzarr: ML,
    Aogon: NL,
    aogon: PL,
    Aopf: OL,
    aopf: $L,
    apacir: DL,
    ap: RL,
    apE: zL,
    ape: IL,
    apid: FL,
    apos: qL,
    ApplyFunction: HL,
    approx: BL,
    approxeq: WL,
    Aring: UL,
    aring: jL,
    Ascr: GL,
    ascr: VL,
    Assign: KL,
    ast: XL,
    asymp: YL,
    asympeq: ZL,
    Atilde: JL,
    atilde: QL,
    Auml: tA,
    auml: eA,
    awconint: nA,
    awint: rA,
    backcong: iA,
    backepsilon: oA,
    backprime: sA,
    backsim: aA,
    backsimeq: lA,
    Backslash: cA,
    Barv: uA,
    barvee: fA,
    barwed: hA,
    Barwed: dA,
    barwedge: pA,
    bbrk: gA,
    bbrktbrk: vA,
    bcong: mA,
    Bcy: yA,
    bcy: bA,
    bdquo: wA,
    becaus: xA,
    because: _A,
    Because: SA,
    bemptyv: kA,
    bepsi: CA,
    bernou: TA,
    Bernoullis: EA,
    Beta: LA,
    beta: AA,
    beth: MA,
    between: NA,
    Bfr: PA,
    bfr: OA,
    bigcap: $A,
    bigcirc: DA,
    bigcup: RA,
    bigodot: zA,
    bigoplus: IA,
    bigotimes: FA,
    bigsqcup: qA,
    bigstar: HA,
    bigtriangledown: BA,
    bigtriangleup: WA,
    biguplus: UA,
    bigvee: jA,
    bigwedge: GA,
    bkarow: VA,
    blacklozenge: KA,
    blacksquare: XA,
    blacktriangle: YA,
    blacktriangledown: ZA,
    blacktriangleleft: JA,
    blacktriangleright: QA,
    blank: tM,
    blk12: eM,
    blk14: nM,
    blk34: rM,
    block: iM,
    bne: oM,
    bnequiv: sM,
    bNot: aM,
    bnot: lM,
    Bopf: cM,
    bopf: uM,
    bot: fM,
    bottom: hM,
    bowtie: dM,
    boxbox: pM,
    boxdl: gM,
    boxdL: vM,
    boxDl: mM,
    boxDL: yM,
    boxdr: bM,
    boxdR: wM,
    boxDr: xM,
    boxDR: _M,
    boxh: SM,
    boxH: kM,
    boxhd: CM,
    boxHd: TM,
    boxhD: EM,
    boxHD: LM,
    boxhu: AM,
    boxHu: MM,
    boxhU: NM,
    boxHU: PM,
    boxminus: OM,
    boxplus: $M,
    boxtimes: DM,
    boxul: RM,
    boxuL: zM,
    boxUl: IM,
    boxUL: FM,
    boxur: qM,
    boxuR: HM,
    boxUr: BM,
    boxUR: WM,
    boxv: UM,
    boxV: jM,
    boxvh: GM,
    boxvH: VM,
    boxVh: KM,
    boxVH: XM,
    boxvl: YM,
    boxvL: ZM,
    boxVl: JM,
    boxVL: QM,
    boxvr: tN,
    boxvR: eN,
    boxVr: nN,
    boxVR: rN,
    bprime: iN,
    breve: oN,
    Breve: sN,
    brvbar: aN,
    bscr: lN,
    Bscr: cN,
    bsemi: uN,
    bsim: fN,
    bsime: hN,
    bsolb: dN,
    bsol: pN,
    bsolhsub: gN,
    bull: vN,
    bullet: mN,
    bump: yN,
    bumpE: bN,
    bumpe: wN,
    Bumpeq: xN,
    bumpeq: _N,
    Cacute: SN,
    cacute: kN,
    capand: CN,
    capbrcup: TN,
    capcap: EN,
    cap: LN,
    Cap: AN,
    capcup: MN,
    capdot: NN,
    CapitalDifferentialD: PN,
    caps: ON,
    caret: $N,
    caron: DN,
    Cayleys: RN,
    ccaps: zN,
    Ccaron: IN,
    ccaron: FN,
    Ccedil: qN,
    ccedil: HN,
    Ccirc: BN,
    ccirc: WN,
    Cconint: UN,
    ccups: jN,
    ccupssm: GN,
    Cdot: VN,
    cdot: KN,
    cedil: XN,
    Cedilla: YN,
    cemptyv: ZN,
    cent: JN,
    centerdot: QN,
    CenterDot: tP,
    cfr: eP,
    Cfr: nP,
    CHcy: rP,
    chcy: iP,
    check: oP,
    checkmark: sP,
    Chi: aP,
    chi: lP,
    circ: cP,
    circeq: uP,
    circlearrowleft: fP,
    circlearrowright: hP,
    circledast: dP,
    circledcirc: pP,
    circleddash: gP,
    CircleDot: vP,
    circledR: mP,
    circledS: yP,
    CircleMinus: bP,
    CirclePlus: wP,
    CircleTimes: xP,
    cir: _P,
    cirE: SP,
    cire: kP,
    cirfnint: CP,
    cirmid: TP,
    cirscir: EP,
    ClockwiseContourIntegral: LP,
    CloseCurlyDoubleQuote: AP,
    CloseCurlyQuote: MP,
    clubs: NP,
    clubsuit: PP,
    colon: OP,
    Colon: $P,
    Colone: DP,
    colone: RP,
    coloneq: zP,
    comma: IP,
    commat: FP,
    comp: qP,
    compfn: HP,
    complement: BP,
    complexes: WP,
    cong: UP,
    congdot: jP,
    Congruent: GP,
    conint: VP,
    Conint: KP,
    ContourIntegral: XP,
    copf: YP,
    Copf: ZP,
    coprod: JP,
    Coproduct: QP,
    copy: tO,
    COPY: eO,
    copysr: nO,
    CounterClockwiseContourIntegral: rO,
    crarr: iO,
    cross: oO,
    Cross: sO,
    Cscr: aO,
    cscr: lO,
    csub: cO,
    csube: uO,
    csup: fO,
    csupe: hO,
    ctdot: dO,
    cudarrl: pO,
    cudarrr: gO,
    cuepr: vO,
    cuesc: mO,
    cularr: yO,
    cularrp: bO,
    cupbrcap: wO,
    cupcap: xO,
    CupCap: _O,
    cup: SO,
    Cup: kO,
    cupcup: CO,
    cupdot: TO,
    cupor: EO,
    cups: LO,
    curarr: AO,
    curarrm: MO,
    curlyeqprec: NO,
    curlyeqsucc: PO,
    curlyvee: OO,
    curlywedge: $O,
    curren: DO,
    curvearrowleft: RO,
    curvearrowright: zO,
    cuvee: IO,
    cuwed: FO,
    cwconint: qO,
    cwint: HO,
    cylcty: BO,
    dagger: WO,
    Dagger: UO,
    daleth: jO,
    darr: GO,
    Darr: VO,
    dArr: KO,
    dash: XO,
    Dashv: YO,
    dashv: ZO,
    dbkarow: JO,
    dblac: QO,
    Dcaron: t$,
    dcaron: e$,
    Dcy: n$,
    dcy: r$,
    ddagger: i$,
    ddarr: o$,
    DD: s$,
    dd: a$,
    DDotrahd: l$,
    ddotseq: c$,
    deg: u$,
    Del: f$,
    Delta: h$,
    delta: d$,
    demptyv: p$,
    dfisht: g$,
    Dfr: v$,
    dfr: m$,
    dHar: y$,
    dharl: b$,
    dharr: w$,
    DiacriticalAcute: x$,
    DiacriticalDot: _$,
    DiacriticalDoubleAcute: S$,
    DiacriticalGrave: k$,
    DiacriticalTilde: C$,
    diam: T$,
    diamond: E$,
    Diamond: L$,
    diamondsuit: A$,
    diams: M$,
    die: N$,
    DifferentialD: P$,
    digamma: O$,
    disin: $$,
    div: D$,
    divide: R$,
    divideontimes: z$,
    divonx: I$,
    DJcy: F$,
    djcy: q$,
    dlcorn: H$,
    dlcrop: B$,
    dollar: W$,
    Dopf: U$,
    dopf: j$,
    Dot: G$,
    dot: V$,
    DotDot: K$,
    doteq: X$,
    doteqdot: Y$,
    DotEqual: Z$,
    dotminus: J$,
    dotplus: Q$,
    dotsquare: tD,
    doublebarwedge: eD,
    DoubleContourIntegral: nD,
    DoubleDot: rD,
    DoubleDownArrow: iD,
    DoubleLeftArrow: oD,
    DoubleLeftRightArrow: sD,
    DoubleLeftTee: aD,
    DoubleLongLeftArrow: lD,
    DoubleLongLeftRightArrow: cD,
    DoubleLongRightArrow: uD,
    DoubleRightArrow: fD,
    DoubleRightTee: hD,
    DoubleUpArrow: dD,
    DoubleUpDownArrow: pD,
    DoubleVerticalBar: gD,
    DownArrowBar: vD,
    downarrow: mD,
    DownArrow: yD,
    Downarrow: bD,
    DownArrowUpArrow: wD,
    DownBreve: xD,
    downdownarrows: _D,
    downharpoonleft: SD,
    downharpoonright: kD,
    DownLeftRightVector: CD,
    DownLeftTeeVector: TD,
    DownLeftVectorBar: ED,
    DownLeftVector: LD,
    DownRightTeeVector: AD,
    DownRightVectorBar: MD,
    DownRightVector: ND,
    DownTeeArrow: PD,
    DownTee: OD,
    drbkarow: $D,
    drcorn: DD,
    drcrop: RD,
    Dscr: zD,
    dscr: ID,
    DScy: FD,
    dscy: qD,
    dsol: HD,
    Dstrok: BD,
    dstrok: WD,
    dtdot: UD,
    dtri: jD,
    dtrif: GD,
    duarr: VD,
    duhar: KD,
    dwangle: XD,
    DZcy: YD,
    dzcy: ZD,
    dzigrarr: JD,
    Eacute: QD,
    eacute: t2,
    easter: e2,
    Ecaron: n2,
    ecaron: r2,
    Ecirc: i2,
    ecirc: o2,
    ecir: s2,
    ecolon: a2,
    Ecy: l2,
    ecy: c2,
    eDDot: u2,
    Edot: f2,
    edot: h2,
    eDot: d2,
    ee: p2,
    efDot: g2,
    Efr: v2,
    efr: m2,
    eg: y2,
    Egrave: b2,
    egrave: w2,
    egs: x2,
    egsdot: _2,
    el: S2,
    Element: k2,
    elinters: C2,
    ell: T2,
    els: E2,
    elsdot: L2,
    Emacr: A2,
    emacr: M2,
    empty: N2,
    emptyset: P2,
    EmptySmallSquare: O2,
    emptyv: $2,
    EmptyVerySmallSquare: D2,
    emsp13: R2,
    emsp14: z2,
    emsp: I2,
    ENG: F2,
    eng: q2,
    ensp: H2,
    Eogon: B2,
    eogon: W2,
    Eopf: U2,
    eopf: j2,
    epar: G2,
    eparsl: V2,
    eplus: K2,
    epsi: X2,
    Epsilon: Y2,
    epsilon: Z2,
    epsiv: J2,
    eqcirc: Q2,
    eqcolon: tR,
    eqsim: eR,
    eqslantgtr: nR,
    eqslantless: rR,
    Equal: iR,
    equals: oR,
    EqualTilde: sR,
    equest: aR,
    Equilibrium: lR,
    equiv: cR,
    equivDD: uR,
    eqvparsl: fR,
    erarr: hR,
    erDot: dR,
    escr: pR,
    Escr: gR,
    esdot: vR,
    Esim: mR,
    esim: yR,
    Eta: bR,
    eta: wR,
    ETH: xR,
    eth: _R,
    Euml: SR,
    euml: kR,
    euro: CR,
    excl: TR,
    exist: ER,
    Exists: LR,
    expectation: AR,
    exponentiale: MR,
    ExponentialE: NR,
    fallingdotseq: PR,
    Fcy: OR,
    fcy: $R,
    female: DR,
    ffilig: RR,
    fflig: zR,
    ffllig: IR,
    Ffr: FR,
    ffr: qR,
    filig: HR,
    FilledSmallSquare: BR,
    FilledVerySmallSquare: WR,
    fjlig: UR,
    flat: jR,
    fllig: GR,
    fltns: VR,
    fnof: KR,
    Fopf: XR,
    fopf: YR,
    forall: ZR,
    ForAll: JR,
    fork: QR,
    forkv: tz,
    Fouriertrf: ez,
    fpartint: nz,
    frac12: rz,
    frac13: iz,
    frac14: oz,
    frac15: sz,
    frac16: az,
    frac18: lz,
    frac23: cz,
    frac25: uz,
    frac34: fz,
    frac35: hz,
    frac38: dz,
    frac45: pz,
    frac56: gz,
    frac58: vz,
    frac78: mz,
    frasl: yz,
    frown: bz,
    fscr: wz,
    Fscr: xz,
    gacute: _z,
    Gamma: Sz,
    gamma: kz,
    Gammad: Cz,
    gammad: Tz,
    gap: Ez,
    Gbreve: Lz,
    gbreve: Az,
    Gcedil: Mz,
    Gcirc: Nz,
    gcirc: Pz,
    Gcy: Oz,
    gcy: $z,
    Gdot: Dz,
    gdot: Rz,
    ge: zz,
    gE: Iz,
    gEl: Fz,
    gel: qz,
    geq: Hz,
    geqq: Bz,
    geqslant: Wz,
    gescc: Uz,
    ges: jz,
    gesdot: Gz,
    gesdoto: Vz,
    gesdotol: Kz,
    gesl: Xz,
    gesles: Yz,
    Gfr: Zz,
    gfr: Jz,
    gg: Qz,
    Gg: tI,
    ggg: eI,
    gimel: nI,
    GJcy: rI,
    gjcy: iI,
    gla: oI,
    gl: sI,
    glE: aI,
    glj: lI,
    gnap: cI,
    gnapprox: uI,
    gne: fI,
    gnE: hI,
    gneq: dI,
    gneqq: pI,
    gnsim: gI,
    Gopf: vI,
    gopf: mI,
    grave: yI,
    GreaterEqual: bI,
    GreaterEqualLess: wI,
    GreaterFullEqual: xI,
    GreaterGreater: _I,
    GreaterLess: SI,
    GreaterSlantEqual: kI,
    GreaterTilde: CI,
    Gscr: TI,
    gscr: EI,
    gsim: LI,
    gsime: AI,
    gsiml: MI,
    gtcc: NI,
    gtcir: PI,
    gt: OI,
    GT: $I,
    Gt: DI,
    gtdot: RI,
    gtlPar: zI,
    gtquest: II,
    gtrapprox: FI,
    gtrarr: qI,
    gtrdot: HI,
    gtreqless: BI,
    gtreqqless: WI,
    gtrless: UI,
    gtrsim: jI,
    gvertneqq: GI,
    gvnE: VI,
    Hacek: KI,
    hairsp: XI,
    half: YI,
    hamilt: ZI,
    HARDcy: JI,
    hardcy: QI,
    harrcir: tF,
    harr: eF,
    hArr: nF,
    harrw: rF,
    Hat: iF,
    hbar: oF,
    Hcirc: sF,
    hcirc: aF,
    hearts: lF,
    heartsuit: cF,
    hellip: uF,
    hercon: fF,
    hfr: hF,
    Hfr: dF,
    HilbertSpace: pF,
    hksearow: gF,
    hkswarow: vF,
    hoarr: mF,
    homtht: yF,
    hookleftarrow: bF,
    hookrightarrow: wF,
    hopf: xF,
    Hopf: _F,
    horbar: SF,
    HorizontalLine: kF,
    hscr: CF,
    Hscr: TF,
    hslash: EF,
    Hstrok: LF,
    hstrok: AF,
    HumpDownHump: MF,
    HumpEqual: NF,
    hybull: PF,
    hyphen: OF,
    Iacute: $F,
    iacute: DF,
    ic: RF,
    Icirc: zF,
    icirc: IF,
    Icy: FF,
    icy: qF,
    Idot: HF,
    IEcy: BF,
    iecy: WF,
    iexcl: UF,
    iff: jF,
    ifr: GF,
    Ifr: VF,
    Igrave: KF,
    igrave: XF,
    ii: YF,
    iiiint: ZF,
    iiint: JF,
    iinfin: QF,
    iiota: tq,
    IJlig: eq,
    ijlig: nq,
    Imacr: rq,
    imacr: iq,
    image: oq,
    ImaginaryI: sq,
    imagline: aq,
    imagpart: lq,
    imath: cq,
    Im: uq,
    imof: fq,
    imped: hq,
    Implies: dq,
    incare: pq,
    in: '∈',
    infin: gq,
    infintie: vq,
    inodot: mq,
    intcal: yq,
    int: bq,
    Int: wq,
    integers: xq,
    Integral: _q,
    intercal: Sq,
    Intersection: kq,
    intlarhk: Cq,
    intprod: Tq,
    InvisibleComma: Eq,
    InvisibleTimes: Lq,
    IOcy: Aq,
    iocy: Mq,
    Iogon: Nq,
    iogon: Pq,
    Iopf: Oq,
    iopf: $q,
    Iota: Dq,
    iota: Rq,
    iprod: zq,
    iquest: Iq,
    iscr: Fq,
    Iscr: qq,
    isin: Hq,
    isindot: Bq,
    isinE: Wq,
    isins: Uq,
    isinsv: jq,
    isinv: Gq,
    it: Vq,
    Itilde: Kq,
    itilde: Xq,
    Iukcy: Yq,
    iukcy: Zq,
    Iuml: Jq,
    iuml: Qq,
    Jcirc: tH,
    jcirc: eH,
    Jcy: nH,
    jcy: rH,
    Jfr: iH,
    jfr: oH,
    jmath: sH,
    Jopf: aH,
    jopf: lH,
    Jscr: cH,
    jscr: uH,
    Jsercy: fH,
    jsercy: hH,
    Jukcy: dH,
    jukcy: pH,
    Kappa: gH,
    kappa: vH,
    kappav: mH,
    Kcedil: yH,
    kcedil: bH,
    Kcy: wH,
    kcy: xH,
    Kfr: _H,
    kfr: SH,
    kgreen: kH,
    KHcy: CH,
    khcy: TH,
    KJcy: EH,
    kjcy: LH,
    Kopf: AH,
    kopf: MH,
    Kscr: NH,
    kscr: PH,
    lAarr: OH,
    Lacute: $H,
    lacute: DH,
    laemptyv: RH,
    lagran: zH,
    Lambda: IH,
    lambda: FH,
    lang: qH,
    Lang: HH,
    langd: BH,
    langle: WH,
    lap: UH,
    Laplacetrf: jH,
    laquo: GH,
    larrb: VH,
    larrbfs: KH,
    larr: XH,
    Larr: YH,
    lArr: ZH,
    larrfs: JH,
    larrhk: QH,
    larrlp: tB,
    larrpl: eB,
    larrsim: nB,
    larrtl: rB,
    latail: iB,
    lAtail: oB,
    lat: sB,
    late: aB,
    lates: lB,
    lbarr: cB,
    lBarr: uB,
    lbbrk: fB,
    lbrace: hB,
    lbrack: dB,
    lbrke: pB,
    lbrksld: gB,
    lbrkslu: vB,
    Lcaron: mB,
    lcaron: yB,
    Lcedil: bB,
    lcedil: wB,
    lceil: xB,
    lcub: _B,
    Lcy: SB,
    lcy: kB,
    ldca: CB,
    ldquo: TB,
    ldquor: EB,
    ldrdhar: LB,
    ldrushar: AB,
    ldsh: MB,
    le: NB,
    lE: PB,
    LeftAngleBracket: OB,
    LeftArrowBar: $B,
    leftarrow: DB,
    LeftArrow: RB,
    Leftarrow: zB,
    LeftArrowRightArrow: IB,
    leftarrowtail: FB,
    LeftCeiling: qB,
    LeftDoubleBracket: HB,
    LeftDownTeeVector: BB,
    LeftDownVectorBar: WB,
    LeftDownVector: UB,
    LeftFloor: jB,
    leftharpoondown: GB,
    leftharpoonup: VB,
    leftleftarrows: KB,
    leftrightarrow: XB,
    LeftRightArrow: YB,
    Leftrightarrow: ZB,
    leftrightarrows: JB,
    leftrightharpoons: QB,
    leftrightsquigarrow: t3,
    LeftRightVector: e3,
    LeftTeeArrow: n3,
    LeftTee: r3,
    LeftTeeVector: i3,
    leftthreetimes: o3,
    LeftTriangleBar: s3,
    LeftTriangle: a3,
    LeftTriangleEqual: l3,
    LeftUpDownVector: c3,
    LeftUpTeeVector: u3,
    LeftUpVectorBar: f3,
    LeftUpVector: h3,
    LeftVectorBar: d3,
    LeftVector: p3,
    lEg: g3,
    leg: v3,
    leq: m3,
    leqq: y3,
    leqslant: b3,
    lescc: w3,
    les: x3,
    lesdot: _3,
    lesdoto: S3,
    lesdotor: k3,
    lesg: C3,
    lesges: T3,
    lessapprox: E3,
    lessdot: L3,
    lesseqgtr: A3,
    lesseqqgtr: M3,
    LessEqualGreater: N3,
    LessFullEqual: P3,
    LessGreater: O3,
    lessgtr: $3,
    LessLess: D3,
    lesssim: R3,
    LessSlantEqual: z3,
    LessTilde: I3,
    lfisht: F3,
    lfloor: q3,
    Lfr: H3,
    lfr: B3,
    lg: W3,
    lgE: U3,
    lHar: j3,
    lhard: G3,
    lharu: V3,
    lharul: K3,
    lhblk: X3,
    LJcy: Y3,
    ljcy: Z3,
    llarr: J3,
    ll: Q3,
    Ll: t5,
    llcorner: e5,
    Lleftarrow: n5,
    llhard: r5,
    lltri: i5,
    Lmidot: o5,
    lmidot: s5,
    lmoustache: a5,
    lmoust: l5,
    lnap: c5,
    lnapprox: u5,
    lne: f5,
    lnE: h5,
    lneq: d5,
    lneqq: p5,
    lnsim: g5,
    loang: v5,
    loarr: m5,
    lobrk: y5,
    longleftarrow: b5,
    LongLeftArrow: w5,
    Longleftarrow: x5,
    longleftrightarrow: _5,
    LongLeftRightArrow: S5,
    Longleftrightarrow: k5,
    longmapsto: C5,
    longrightarrow: T5,
    LongRightArrow: E5,
    Longrightarrow: L5,
    looparrowleft: A5,
    looparrowright: M5,
    lopar: N5,
    Lopf: P5,
    lopf: O5,
    loplus: $5,
    lotimes: D5,
    lowast: R5,
    lowbar: z5,
    LowerLeftArrow: I5,
    LowerRightArrow: F5,
    loz: q5,
    lozenge: H5,
    lozf: B5,
    lpar: W5,
    lparlt: U5,
    lrarr: j5,
    lrcorner: G5,
    lrhar: V5,
    lrhard: K5,
    lrm: X5,
    lrtri: Y5,
    lsaquo: Z5,
    lscr: J5,
    Lscr: Q5,
    lsh: t8,
    Lsh: e8,
    lsim: n8,
    lsime: r8,
    lsimg: i8,
    lsqb: o8,
    lsquo: s8,
    lsquor: a8,
    Lstrok: l8,
    lstrok: c8,
    ltcc: u8,
    ltcir: f8,
    lt: h8,
    LT: d8,
    Lt: p8,
    ltdot: g8,
    lthree: v8,
    ltimes: m8,
    ltlarr: y8,
    ltquest: b8,
    ltri: w8,
    ltrie: x8,
    ltrif: _8,
    ltrPar: S8,
    lurdshar: k8,
    luruhar: C8,
    lvertneqq: T8,
    lvnE: E8,
    macr: L8,
    male: A8,
    malt: M8,
    maltese: N8,
    Map: '⤅',
    map: P8,
    mapsto: O8,
    mapstodown: $8,
    mapstoleft: D8,
    mapstoup: R8,
    marker: z8,
    mcomma: I8,
    Mcy: F8,
    mcy: q8,
    mdash: H8,
    mDDot: B8,
    measuredangle: W8,
    MediumSpace: U8,
    Mellintrf: j8,
    Mfr: G8,
    mfr: V8,
    mho: K8,
    micro: X8,
    midast: Y8,
    midcir: Z8,
    mid: J8,
    middot: Q8,
    minusb: tW,
    minus: eW,
    minusd: nW,
    minusdu: rW,
    MinusPlus: iW,
    mlcp: oW,
    mldr: sW,
    mnplus: aW,
    models: lW,
    Mopf: cW,
    mopf: uW,
    mp: fW,
    mscr: hW,
    Mscr: dW,
    mstpos: pW,
    Mu: gW,
    mu: vW,
    multimap: mW,
    mumap: yW,
    nabla: bW,
    Nacute: wW,
    nacute: xW,
    nang: _W,
    nap: SW,
    napE: kW,
    napid: CW,
    napos: TW,
    napprox: EW,
    natural: LW,
    naturals: AW,
    natur: MW,
    nbsp: NW,
    nbump: PW,
    nbumpe: OW,
    ncap: $W,
    Ncaron: DW,
    ncaron: RW,
    Ncedil: zW,
    ncedil: IW,
    ncong: FW,
    ncongdot: qW,
    ncup: HW,
    Ncy: BW,
    ncy: WW,
    ndash: UW,
    nearhk: jW,
    nearr: GW,
    neArr: VW,
    nearrow: KW,
    ne: XW,
    nedot: YW,
    NegativeMediumSpace: ZW,
    NegativeThickSpace: JW,
    NegativeThinSpace: QW,
    NegativeVeryThinSpace: tU,
    nequiv: eU,
    nesear: nU,
    nesim: rU,
    NestedGreaterGreater: iU,
    NestedLessLess: oU,
    NewLine: sU,
    nexist: aU,
    nexists: lU,
    Nfr: cU,
    nfr: uU,
    ngE: fU,
    nge: hU,
    ngeq: dU,
    ngeqq: pU,
    ngeqslant: gU,
    nges: vU,
    nGg: mU,
    ngsim: yU,
    nGt: bU,
    ngt: wU,
    ngtr: xU,
    nGtv: _U,
    nharr: SU,
    nhArr: kU,
    nhpar: CU,
    ni: TU,
    nis: EU,
    nisd: LU,
    niv: AU,
    NJcy: MU,
    njcy: NU,
    nlarr: PU,
    nlArr: OU,
    nldr: $U,
    nlE: DU,
    nle: RU,
    nleftarrow: zU,
    nLeftarrow: IU,
    nleftrightarrow: FU,
    nLeftrightarrow: qU,
    nleq: HU,
    nleqq: BU,
    nleqslant: WU,
    nles: UU,
    nless: jU,
    nLl: GU,
    nlsim: VU,
    nLt: KU,
    nlt: XU,
    nltri: YU,
    nltrie: ZU,
    nLtv: JU,
    nmid: QU,
    NoBreak: t4,
    NonBreakingSpace: e4,
    nopf: n4,
    Nopf: r4,
    Not: i4,
    not: o4,
    NotCongruent: s4,
    NotCupCap: a4,
    NotDoubleVerticalBar: l4,
    NotElement: c4,
    NotEqual: u4,
    NotEqualTilde: f4,
    NotExists: h4,
    NotGreater: d4,
    NotGreaterEqual: p4,
    NotGreaterFullEqual: g4,
    NotGreaterGreater: v4,
    NotGreaterLess: m4,
    NotGreaterSlantEqual: y4,
    NotGreaterTilde: b4,
    NotHumpDownHump: w4,
    NotHumpEqual: x4,
    notin: _4,
    notindot: S4,
    notinE: k4,
    notinva: C4,
    notinvb: T4,
    notinvc: E4,
    NotLeftTriangleBar: L4,
    NotLeftTriangle: A4,
    NotLeftTriangleEqual: M4,
    NotLess: N4,
    NotLessEqual: P4,
    NotLessGreater: O4,
    NotLessLess: $4,
    NotLessSlantEqual: D4,
    NotLessTilde: R4,
    NotNestedGreaterGreater: z4,
    NotNestedLessLess: I4,
    notni: F4,
    notniva: q4,
    notnivb: H4,
    notnivc: B4,
    NotPrecedes: W4,
    NotPrecedesEqual: U4,
    NotPrecedesSlantEqual: j4,
    NotReverseElement: G4,
    NotRightTriangleBar: V4,
    NotRightTriangle: K4,
    NotRightTriangleEqual: X4,
    NotSquareSubset: Y4,
    NotSquareSubsetEqual: Z4,
    NotSquareSuperset: J4,
    NotSquareSupersetEqual: Q4,
    NotSubset: t6,
    NotSubsetEqual: e6,
    NotSucceeds: n6,
    NotSucceedsEqual: r6,
    NotSucceedsSlantEqual: i6,
    NotSucceedsTilde: o6,
    NotSuperset: s6,
    NotSupersetEqual: a6,
    NotTilde: l6,
    NotTildeEqual: c6,
    NotTildeFullEqual: u6,
    NotTildeTilde: f6,
    NotVerticalBar: h6,
    nparallel: d6,
    npar: p6,
    nparsl: g6,
    npart: v6,
    npolint: m6,
    npr: y6,
    nprcue: b6,
    nprec: w6,
    npreceq: x6,
    npre: _6,
    nrarrc: S6,
    nrarr: k6,
    nrArr: C6,
    nrarrw: T6,
    nrightarrow: E6,
    nRightarrow: L6,
    nrtri: A6,
    nrtrie: M6,
    nsc: N6,
    nsccue: P6,
    nsce: O6,
    Nscr: $6,
    nscr: D6,
    nshortmid: R6,
    nshortparallel: z6,
    nsim: I6,
    nsime: F6,
    nsimeq: q6,
    nsmid: H6,
    nspar: B6,
    nsqsube: W6,
    nsqsupe: U6,
    nsub: j6,
    nsubE: G6,
    nsube: V6,
    nsubset: K6,
    nsubseteq: X6,
    nsubseteqq: Y6,
    nsucc: Z6,
    nsucceq: J6,
    nsup: Q6,
    nsupE: tj,
    nsupe: ej,
    nsupset: nj,
    nsupseteq: rj,
    nsupseteqq: ij,
    ntgl: oj,
    Ntilde: sj,
    ntilde: aj,
    ntlg: lj,
    ntriangleleft: cj,
    ntrianglelefteq: uj,
    ntriangleright: fj,
    ntrianglerighteq: hj,
    Nu: dj,
    nu: pj,
    num: gj,
    numero: vj,
    numsp: mj,
    nvap: yj,
    nvdash: bj,
    nvDash: wj,
    nVdash: xj,
    nVDash: _j,
    nvge: Sj,
    nvgt: kj,
    nvHarr: Cj,
    nvinfin: Tj,
    nvlArr: Ej,
    nvle: Lj,
    nvlt: Aj,
    nvltrie: Mj,
    nvrArr: Nj,
    nvrtrie: Pj,
    nvsim: Oj,
    nwarhk: $j,
    nwarr: Dj,
    nwArr: Rj,
    nwarrow: zj,
    nwnear: Ij,
    Oacute: Fj,
    oacute: qj,
    oast: Hj,
    Ocirc: Bj,
    ocirc: Wj,
    ocir: Uj,
    Ocy: jj,
    ocy: Gj,
    odash: Vj,
    Odblac: Kj,
    odblac: Xj,
    odiv: Yj,
    odot: Zj,
    odsold: Jj,
    OElig: Qj,
    oelig: t9,
    ofcir: e9,
    Ofr: n9,
    ofr: r9,
    ogon: i9,
    Ograve: o9,
    ograve: s9,
    ogt: a9,
    ohbar: l9,
    ohm: c9,
    oint: u9,
    olarr: f9,
    olcir: h9,
    olcross: d9,
    oline: p9,
    olt: g9,
    Omacr: v9,
    omacr: m9,
    Omega: y9,
    omega: b9,
    Omicron: w9,
    omicron: x9,
    omid: _9,
    ominus: S9,
    Oopf: k9,
    oopf: C9,
    opar: T9,
    OpenCurlyDoubleQuote: E9,
    OpenCurlyQuote: L9,
    operp: A9,
    oplus: M9,
    orarr: N9,
    Or: P9,
    or: O9,
    ord: $9,
    order: D9,
    orderof: R9,
    ordf: z9,
    ordm: I9,
    origof: F9,
    oror: q9,
    orslope: H9,
    orv: B9,
    oS: W9,
    Oscr: U9,
    oscr: j9,
    Oslash: G9,
    oslash: V9,
    osol: K9,
    Otilde: X9,
    otilde: Y9,
    otimesas: Z9,
    Otimes: J9,
    otimes: Q9,
    Ouml: tG,
    ouml: eG,
    ovbar: nG,
    OverBar: rG,
    OverBrace: iG,
    OverBracket: oG,
    OverParenthesis: sG,
    para: aG,
    parallel: lG,
    par: cG,
    parsim: uG,
    parsl: fG,
    part: hG,
    PartialD: dG,
    Pcy: pG,
    pcy: gG,
    percnt: vG,
    period: mG,
    permil: yG,
    perp: bG,
    pertenk: wG,
    Pfr: xG,
    pfr: _G,
    Phi: SG,
    phi: kG,
    phiv: CG,
    phmmat: TG,
    phone: EG,
    Pi: LG,
    pi: AG,
    pitchfork: MG,
    piv: NG,
    planck: PG,
    planckh: OG,
    plankv: $G,
    plusacir: DG,
    plusb: RG,
    pluscir: zG,
    plus: IG,
    plusdo: FG,
    plusdu: qG,
    pluse: HG,
    PlusMinus: BG,
    plusmn: WG,
    plussim: UG,
    plustwo: jG,
    pm: GG,
    Poincareplane: VG,
    pointint: KG,
    popf: XG,
    Popf: YG,
    pound: ZG,
    prap: JG,
    Pr: QG,
    pr: tV,
    prcue: eV,
    precapprox: nV,
    prec: rV,
    preccurlyeq: iV,
    Precedes: oV,
    PrecedesEqual: sV,
    PrecedesSlantEqual: aV,
    PrecedesTilde: lV,
    preceq: cV,
    precnapprox: uV,
    precneqq: fV,
    precnsim: hV,
    pre: dV,
    prE: pV,
    precsim: gV,
    prime: vV,
    Prime: mV,
    primes: yV,
    prnap: bV,
    prnE: wV,
    prnsim: xV,
    prod: _V,
    Product: SV,
    profalar: kV,
    profline: CV,
    profsurf: TV,
    prop: EV,
    Proportional: LV,
    Proportion: AV,
    propto: MV,
    prsim: NV,
    prurel: PV,
    Pscr: OV,
    pscr: $V,
    Psi: DV,
    psi: RV,
    puncsp: zV,
    Qfr: IV,
    qfr: FV,
    qint: qV,
    qopf: HV,
    Qopf: BV,
    qprime: WV,
    Qscr: UV,
    qscr: jV,
    quaternions: GV,
    quatint: VV,
    quest: KV,
    questeq: XV,
    quot: YV,
    QUOT: ZV,
    rAarr: JV,
    race: QV,
    Racute: t7,
    racute: e7,
    radic: n7,
    raemptyv: r7,
    rang: i7,
    Rang: o7,
    rangd: s7,
    range: a7,
    rangle: l7,
    raquo: c7,
    rarrap: u7,
    rarrb: f7,
    rarrbfs: h7,
    rarrc: d7,
    rarr: p7,
    Rarr: g7,
    rArr: v7,
    rarrfs: m7,
    rarrhk: y7,
    rarrlp: b7,
    rarrpl: w7,
    rarrsim: x7,
    Rarrtl: _7,
    rarrtl: S7,
    rarrw: k7,
    ratail: C7,
    rAtail: T7,
    ratio: E7,
    rationals: L7,
    rbarr: A7,
    rBarr: M7,
    RBarr: N7,
    rbbrk: P7,
    rbrace: O7,
    rbrack: $7,
    rbrke: D7,
    rbrksld: R7,
    rbrkslu: z7,
    Rcaron: I7,
    rcaron: F7,
    Rcedil: q7,
    rcedil: H7,
    rceil: B7,
    rcub: W7,
    Rcy: U7,
    rcy: j7,
    rdca: G7,
    rdldhar: V7,
    rdquo: K7,
    rdquor: X7,
    rdsh: Y7,
    real: Z7,
    realine: J7,
    realpart: Q7,
    reals: tK,
    Re: eK,
    rect: nK,
    reg: rK,
    REG: iK,
    ReverseElement: oK,
    ReverseEquilibrium: sK,
    ReverseUpEquilibrium: aK,
    rfisht: lK,
    rfloor: cK,
    rfr: uK,
    Rfr: fK,
    rHar: hK,
    rhard: dK,
    rharu: pK,
    rharul: gK,
    Rho: vK,
    rho: mK,
    rhov: yK,
    RightAngleBracket: bK,
    RightArrowBar: wK,
    rightarrow: xK,
    RightArrow: _K,
    Rightarrow: SK,
    RightArrowLeftArrow: kK,
    rightarrowtail: CK,
    RightCeiling: TK,
    RightDoubleBracket: EK,
    RightDownTeeVector: LK,
    RightDownVectorBar: AK,
    RightDownVector: MK,
    RightFloor: NK,
    rightharpoondown: PK,
    rightharpoonup: OK,
    rightleftarrows: $K,
    rightleftharpoons: DK,
    rightrightarrows: RK,
    rightsquigarrow: zK,
    RightTeeArrow: IK,
    RightTee: FK,
    RightTeeVector: qK,
    rightthreetimes: HK,
    RightTriangleBar: BK,
    RightTriangle: WK,
    RightTriangleEqual: UK,
    RightUpDownVector: jK,
    RightUpTeeVector: GK,
    RightUpVectorBar: VK,
    RightUpVector: KK,
    RightVectorBar: XK,
    RightVector: YK,
    ring: ZK,
    risingdotseq: JK,
    rlarr: QK,
    rlhar: tX,
    rlm: eX,
    rmoustache: nX,
    rmoust: rX,
    rnmid: iX,
    roang: oX,
    roarr: sX,
    robrk: aX,
    ropar: lX,
    ropf: cX,
    Ropf: uX,
    roplus: fX,
    rotimes: hX,
    RoundImplies: dX,
    rpar: pX,
    rpargt: gX,
    rppolint: vX,
    rrarr: mX,
    Rrightarrow: yX,
    rsaquo: bX,
    rscr: wX,
    Rscr: xX,
    rsh: _X,
    Rsh: SX,
    rsqb: kX,
    rsquo: CX,
    rsquor: TX,
    rthree: EX,
    rtimes: LX,
    rtri: AX,
    rtrie: MX,
    rtrif: NX,
    rtriltri: PX,
    RuleDelayed: OX,
    ruluhar: $X,
    rx: DX,
    Sacute: RX,
    sacute: zX,
    sbquo: IX,
    scap: FX,
    Scaron: qX,
    scaron: HX,
    Sc: BX,
    sc: WX,
    sccue: UX,
    sce: jX,
    scE: GX,
    Scedil: VX,
    scedil: KX,
    Scirc: XX,
    scirc: YX,
    scnap: ZX,
    scnE: JX,
    scnsim: QX,
    scpolint: tY,
    scsim: eY,
    Scy: nY,
    scy: rY,
    sdotb: iY,
    sdot: oY,
    sdote: sY,
    searhk: aY,
    searr: lY,
    seArr: cY,
    searrow: uY,
    sect: fY,
    semi: hY,
    seswar: dY,
    setminus: pY,
    setmn: gY,
    sext: vY,
    Sfr: mY,
    sfr: yY,
    sfrown: bY,
    sharp: wY,
    SHCHcy: xY,
    shchcy: _Y,
    SHcy: SY,
    shcy: kY,
    ShortDownArrow: CY,
    ShortLeftArrow: TY,
    shortmid: EY,
    shortparallel: LY,
    ShortRightArrow: AY,
    ShortUpArrow: MY,
    shy: NY,
    Sigma: PY,
    sigma: OY,
    sigmaf: $Y,
    sigmav: DY,
    sim: RY,
    simdot: zY,
    sime: IY,
    simeq: FY,
    simg: qY,
    simgE: HY,
    siml: BY,
    simlE: WY,
    simne: UY,
    simplus: jY,
    simrarr: GY,
    slarr: VY,
    SmallCircle: KY,
    smallsetminus: XY,
    smashp: YY,
    smeparsl: ZY,
    smid: JY,
    smile: QY,
    smt: tZ,
    smte: eZ,
    smtes: nZ,
    SOFTcy: rZ,
    softcy: iZ,
    solbar: oZ,
    solb: sZ,
    sol: aZ,
    Sopf: lZ,
    sopf: cZ,
    spades: uZ,
    spadesuit: fZ,
    spar: hZ,
    sqcap: dZ,
    sqcaps: pZ,
    sqcup: gZ,
    sqcups: vZ,
    Sqrt: mZ,
    sqsub: yZ,
    sqsube: bZ,
    sqsubset: wZ,
    sqsubseteq: xZ,
    sqsup: _Z,
    sqsupe: SZ,
    sqsupset: kZ,
    sqsupseteq: CZ,
    square: TZ,
    Square: EZ,
    SquareIntersection: LZ,
    SquareSubset: AZ,
    SquareSubsetEqual: MZ,
    SquareSuperset: NZ,
    SquareSupersetEqual: PZ,
    SquareUnion: OZ,
    squarf: $Z,
    squ: DZ,
    squf: RZ,
    srarr: zZ,
    Sscr: IZ,
    sscr: FZ,
    ssetmn: qZ,
    ssmile: HZ,
    sstarf: BZ,
    Star: WZ,
    star: UZ,
    starf: jZ,
    straightepsilon: GZ,
    straightphi: VZ,
    strns: KZ,
    sub: XZ,
    Sub: YZ,
    subdot: ZZ,
    subE: JZ,
    sube: QZ,
    subedot: tJ,
    submult: eJ,
    subnE: nJ,
    subne: rJ,
    subplus: iJ,
    subrarr: oJ,
    subset: sJ,
    Subset: aJ,
    subseteq: lJ,
    subseteqq: cJ,
    SubsetEqual: uJ,
    subsetneq: fJ,
    subsetneqq: hJ,
    subsim: dJ,
    subsub: pJ,
    subsup: gJ,
    succapprox: vJ,
    succ: mJ,
    succcurlyeq: yJ,
    Succeeds: bJ,
    SucceedsEqual: wJ,
    SucceedsSlantEqual: xJ,
    SucceedsTilde: _J,
    succeq: SJ,
    succnapprox: kJ,
    succneqq: CJ,
    succnsim: TJ,
    succsim: EJ,
    SuchThat: LJ,
    sum: AJ,
    Sum: MJ,
    sung: NJ,
    sup1: PJ,
    sup2: OJ,
    sup3: $J,
    sup: DJ,
    Sup: RJ,
    supdot: zJ,
    supdsub: IJ,
    supE: FJ,
    supe: qJ,
    supedot: HJ,
    Superset: BJ,
    SupersetEqual: WJ,
    suphsol: UJ,
    suphsub: jJ,
    suplarr: GJ,
    supmult: VJ,
    supnE: KJ,
    supne: XJ,
    supplus: YJ,
    supset: ZJ,
    Supset: JJ,
    supseteq: QJ,
    supseteqq: tQ,
    supsetneq: eQ,
    supsetneqq: nQ,
    supsim: rQ,
    supsub: iQ,
    supsup: oQ,
    swarhk: sQ,
    swarr: aQ,
    swArr: lQ,
    swarrow: cQ,
    swnwar: uQ,
    szlig: fQ,
    Tab: hQ,
    target: dQ,
    Tau: pQ,
    tau: gQ,
    tbrk: vQ,
    Tcaron: mQ,
    tcaron: yQ,
    Tcedil: bQ,
    tcedil: wQ,
    Tcy: xQ,
    tcy: _Q,
    tdot: SQ,
    telrec: kQ,
    Tfr: CQ,
    tfr: TQ,
    there4: EQ,
    therefore: LQ,
    Therefore: AQ,
    Theta: MQ,
    theta: NQ,
    thetasym: PQ,
    thetav: OQ,
    thickapprox: $Q,
    thicksim: DQ,
    ThickSpace: RQ,
    ThinSpace: zQ,
    thinsp: IQ,
    thkap: FQ,
    thksim: qQ,
    THORN: HQ,
    thorn: BQ,
    tilde: WQ,
    Tilde: UQ,
    TildeEqual: jQ,
    TildeFullEqual: GQ,
    TildeTilde: VQ,
    timesbar: KQ,
    timesb: XQ,
    times: YQ,
    timesd: ZQ,
    tint: JQ,
    toea: QQ,
    topbot: ttt,
    topcir: ett,
    top: ntt,
    Topf: rtt,
    topf: itt,
    topfork: ott,
    tosa: stt,
    tprime: att,
    trade: ltt,
    TRADE: ctt,
    triangle: utt,
    triangledown: ftt,
    triangleleft: htt,
    trianglelefteq: dtt,
    triangleq: ptt,
    triangleright: gtt,
    trianglerighteq: vtt,
    tridot: mtt,
    trie: ytt,
    triminus: btt,
    TripleDot: wtt,
    triplus: xtt,
    trisb: _tt,
    tritime: Stt,
    trpezium: ktt,
    Tscr: Ctt,
    tscr: Ttt,
    TScy: Ett,
    tscy: Ltt,
    TSHcy: Att,
    tshcy: Mtt,
    Tstrok: Ntt,
    tstrok: Ptt,
    twixt: Ott,
    twoheadleftarrow: $tt,
    twoheadrightarrow: Dtt,
    Uacute: Rtt,
    uacute: ztt,
    uarr: Itt,
    Uarr: Ftt,
    uArr: qtt,
    Uarrocir: Htt,
    Ubrcy: Btt,
    ubrcy: Wtt,
    Ubreve: Utt,
    ubreve: jtt,
    Ucirc: Gtt,
    ucirc: Vtt,
    Ucy: Ktt,
    ucy: Xtt,
    udarr: Ytt,
    Udblac: Ztt,
    udblac: Jtt,
    udhar: Qtt,
    ufisht: tet,
    Ufr: eet,
    ufr: net,
    Ugrave: ret,
    ugrave: iet,
    uHar: oet,
    uharl: set,
    uharr: aet,
    uhblk: cet,
    ulcorn: uet,
    ulcorner: fet,
    ulcrop: het,
    ultri: det,
    Umacr: pet,
    umacr: get,
    uml: vet,
    UnderBar: met,
    UnderBrace: yet,
    UnderBracket: bet,
    UnderParenthesis: wet,
    Union: xet,
    UnionPlus: _et,
    Uogon: ket,
    uogon: Cet,
    Uopf: Tet,
    uopf: Eet,
    UpArrowBar: Let,
    uparrow: Aet,
    UpArrow: Met,
    Uparrow: Net,
    UpArrowDownArrow: Pet,
    updownarrow: Oet,
    UpDownArrow: $et,
    Updownarrow: Det,
    UpEquilibrium: Ret,
    upharpoonleft: zet,
    upharpoonright: Iet,
    uplus: Fet,
    UpperLeftArrow: qet,
    UpperRightArrow: Het,
    upsi: Bet,
    Upsi: Wet,
    upsih: Uet,
    Upsilon: jet,
    upsilon: Get,
    UpTeeArrow: Vet,
    UpTee: Ket,
    upuparrows: Xet,
    urcorn: Yet,
    urcorner: Zet,
    urcrop: Jet,
    Uring: Qet,
    uring: tnt,
    urtri: ent,
    Uscr: nnt,
    uscr: rnt,
    utdot: int,
    Utilde: ont,
    utilde: snt,
    utri: ant,
    utrif: lnt,
    uuarr: cnt,
    Uuml: unt,
    uuml: fnt,
    uwangle: hnt,
    vangrt: dnt,
    varepsilon: pnt,
    varkappa: gnt,
    varnothing: vnt,
    varphi: mnt,
    varpi: ynt,
    varpropto: bnt,
    varr: wnt,
    vArr: xnt,
    varrho: _nt,
    varsigma: Snt,
    varsubsetneq: knt,
    varsubsetneqq: Cnt,
    varsupsetneq: Tnt,
    varsupsetneqq: Ent,
    vartheta: Lnt,
    vartriangleleft: Ant,
    vartriangleright: Mnt,
    vBar: Nnt,
    Vbar: Pnt,
    vBarv: Ont,
    Vcy: $nt,
    vcy: Dnt,
    vdash: Rnt,
    vDash: znt,
    Vdash: Int,
    VDash: Fnt,
    Vdashl: qnt,
    veebar: Hnt,
    vee: Bnt,
    Vee: Wnt,
    veeeq: Unt,
    vellip: jnt,
    verbar: Gnt,
    Verbar: Vnt,
    vert: Knt,
    Vert: Xnt,
    VerticalBar: Ynt,
    VerticalLine: Znt,
    VerticalSeparator: Jnt,
    VerticalTilde: Qnt,
    VeryThinSpace: trt,
    Vfr: ert,
    vfr: nrt,
    vltri: rrt,
    vnsub: irt,
    vnsup: ort,
    Vopf: srt,
    vopf: art,
    vprop: lrt,
    vrtri: crt,
    Vscr: urt,
    vscr: frt,
    vsubnE: hrt,
    vsubne: drt,
    vsupnE: prt,
    vsupne: grt,
    Vvdash: vrt,
    vzigzag: mrt,
    Wcirc: yrt,
    wcirc: brt,
    wedbar: wrt,
    wedge: xrt,
    Wedge: _rt,
    wedgeq: Srt,
    weierp: krt,
    Wfr: Crt,
    wfr: Trt,
    Wopf: Ert,
    wopf: Lrt,
    wp: Art,
    wr: Mrt,
    wreath: Nrt,
    Wscr: Prt,
    wscr: Ort,
    xcap: $rt,
    xcirc: Drt,
    xcup: Rrt,
    xdtri: zrt,
    Xfr: Irt,
    xfr: Frt,
    xharr: qrt,
    xhArr: Hrt,
    Xi: Brt,
    xi: Wrt,
    xlarr: Urt,
    xlArr: jrt,
    xmap: Grt,
    xnis: Vrt,
    xodot: Krt,
    Xopf: Xrt,
    xopf: Yrt,
    xoplus: Zrt,
    xotime: Jrt,
    xrarr: Qrt,
    xrArr: tit,
    Xscr: eit,
    xscr: nit,
    xsqcup: rit,
    xuplus: iit,
    xutri: oit,
    xvee: sit,
    xwedge: ait,
    Yacute: lit,
    yacute: cit,
    YAcy: uit,
    yacy: fit,
    Ycirc: hit,
    ycirc: dit,
    Ycy: pit,
    ycy: git,
    yen: vit,
    Yfr: mit,
    yfr: yit,
    YIcy: bit,
    yicy: wit,
    Yopf: xit,
    yopf: _it,
    Yscr: Sit,
    yscr: kit,
    YUcy: Cit,
    yucy: Tit,
    yuml: Eit,
    Yuml: Lit,
    Zacute: Ait,
    zacute: Mit,
    Zcaron: Nit,
    zcaron: Pit,
    Zcy: Oit,
    zcy: $it,
    Zdot: Dit,
    zdot: Rit,
    zeetrf: zit,
    ZeroWidthSpace: Iit,
    Zeta: Fit,
    zeta: qit,
    zfr: Hit,
    Zfr: Bit,
    ZHcy: Wit,
    zhcy: Uit,
    zigrarr: jit,
    zopf: Git,
    Zopf: Vit,
    Zscr: Kit,
    zscr: Xit,
    zwj: Yit,
    zwnj: Zit,
  },
  Jit = 'Á',
  Qit = 'á',
  tot = 'Â',
  eot = 'â',
  not = '´',
  rot = 'Æ',
  iot = 'æ',
  oot = 'À',
  sot = 'à',
  aot = '&',
  lot = '&',
  cot = 'Å',
  uot = 'å',
  fot = 'Ã',
  hot = 'ã',
  dot = 'Ä',
  pot = 'ä',
  got = '¦',
  vot = 'Ç',
  mot = 'ç',
  yot = '¸',
  bot = '¢',
  wot = '©',
  xot = '©',
  _ot = '¤',
  Sot = '°',
  kot = '÷',
  Cot = 'É',
  Tot = 'é',
  Eot = 'Ê',
  Lot = 'ê',
  Aot = 'È',
  Mot = 'è',
  Not = 'Ð',
  Pot = 'ð',
  Oot = 'Ë',
  $ot = 'ë',
  Dot = '½',
  Rot = '¼',
  zot = '¾',
  Iot = '>',
  Fot = '>',
  qot = 'Í',
  Hot = 'í',
  Bot = 'Î',
  Wot = 'î',
  Uot = '¡',
  jot = 'Ì',
  Got = 'ì',
  Vot = '¿',
  Kot = 'Ï',
  Xot = 'ï',
  Yot = '«',
  Zot = '<',
  Jot = '<',
  Qot = '¯',
  tst = 'µ',
  est = '·',
  nst = ' ',
  rst = '¬',
  ist = 'Ñ',
  ost = 'ñ',
  sst = 'Ó',
  ast = 'ó',
  lst = 'Ô',
  cst = 'ô',
  ust = 'Ò',
  fst = 'ò',
  hst = 'ª',
  dst = 'º',
  pst = 'Ø',
  gst = 'ø',
  vst = 'Õ',
  mst = 'õ',
  yst = 'Ö',
  bst = 'ö',
  wst = '¶',
  xst = '±',
  _st = '£',
  Sst = '"',
  kst = '"',
  Cst = '»',
  Tst = '®',
  Est = '®',
  Lst = '§',
  Ast = '­',
  Mst = '¹',
  Nst = '²',
  Pst = '³',
  Ost = 'ß',
  $st = 'Þ',
  Dst = 'þ',
  Rst = '×',
  zst = 'Ú',
  Ist = 'ú',
  Fst = 'Û',
  qst = 'û',
  Hst = 'Ù',
  Bst = 'ù',
  Wst = '¨',
  Ust = 'Ü',
  jst = 'ü',
  Gst = 'Ý',
  Vst = 'ý',
  Kst = '¥',
  Xst = 'ÿ',
  Yst = {
    Aacute: Jit,
    aacute: Qit,
    Acirc: tot,
    acirc: eot,
    acute: not,
    AElig: rot,
    aelig: iot,
    Agrave: oot,
    agrave: sot,
    amp: aot,
    AMP: lot,
    Aring: cot,
    aring: uot,
    Atilde: fot,
    atilde: hot,
    Auml: dot,
    auml: pot,
    brvbar: got,
    Ccedil: vot,
    ccedil: mot,
    cedil: yot,
    cent: bot,
    copy: wot,
    COPY: xot,
    curren: _ot,
    deg: Sot,
    divide: kot,
    Eacute: Cot,
    eacute: Tot,
    Ecirc: Eot,
    ecirc: Lot,
    Egrave: Aot,
    egrave: Mot,
    ETH: Not,
    eth: Pot,
    Euml: Oot,
    euml: $ot,
    frac12: Dot,
    frac14: Rot,
    frac34: zot,
    gt: Iot,
    GT: Fot,
    Iacute: qot,
    iacute: Hot,
    Icirc: Bot,
    icirc: Wot,
    iexcl: Uot,
    Igrave: jot,
    igrave: Got,
    iquest: Vot,
    Iuml: Kot,
    iuml: Xot,
    laquo: Yot,
    lt: Zot,
    LT: Jot,
    macr: Qot,
    micro: tst,
    middot: est,
    nbsp: nst,
    not: rst,
    Ntilde: ist,
    ntilde: ost,
    Oacute: sst,
    oacute: ast,
    Ocirc: lst,
    ocirc: cst,
    Ograve: ust,
    ograve: fst,
    ordf: hst,
    ordm: dst,
    Oslash: pst,
    oslash: gst,
    Otilde: vst,
    otilde: mst,
    Ouml: yst,
    ouml: bst,
    para: wst,
    plusmn: xst,
    pound: _st,
    quot: Sst,
    QUOT: kst,
    raquo: Cst,
    reg: Tst,
    REG: Est,
    sect: Lst,
    shy: Ast,
    sup1: Mst,
    sup2: Nst,
    sup3: Pst,
    szlig: Ost,
    THORN: $st,
    thorn: Dst,
    times: Rst,
    Uacute: zst,
    uacute: Ist,
    Ucirc: Fst,
    ucirc: qst,
    Ugrave: Hst,
    ugrave: Bst,
    uml: Wst,
    Uuml: Ust,
    uuml: jst,
    Yacute: Gst,
    yacute: Vst,
    yen: Kst,
    yuml: Xst,
  },
  Zst = '&',
  Jst = "'",
  Qst = '>',
  tat = '<',
  eat = '"',
  Ty = { amp: Zst, apos: Jst, gt: Qst, lt: tat, quot: eat }
var $h = {}
const nat = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376,
}
var rat =
  (to && to.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t }
  }
Object.defineProperty($h, '__esModule', { value: !0 })
var Lv = rat(nat),
  iat =
    String.fromCodePoint ||
    function (t) {
      var e = ''
      return (
        t > 65535 && ((t -= 65536), (e += String.fromCharCode(((t >>> 10) & 1023) | 55296)), (t = 56320 | (t & 1023))),
        (e += String.fromCharCode(t)),
        e
      )
    }
function oat(t) {
  return (t >= 55296 && t <= 57343) || t > 1114111 ? '�' : (t in Lv.default && (t = Lv.default[t]), iat(t))
}
$h.default = oat
var Dc =
  (to && to.__importDefault) ||
  function (t) {
    return t && t.__esModule ? t : { default: t }
  }
Object.defineProperty(Ir, '__esModule', { value: !0 })
Ir.decodeHTML = Ir.decodeHTMLStrict = Ir.decodeXML = void 0
var Rf = Dc(Cy),
  sat = Dc(Yst),
  aat = Dc(Ty),
  Av = Dc($h),
  lat = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g
Ir.decodeXML = Ey(aat.default)
Ir.decodeHTMLStrict = Ey(Rf.default)
function Ey(t) {
  var e = Ly(t)
  return function (r) {
    return String(r).replace(lat, e)
  }
}
var Mv = function (t, e) {
  return t < e ? 1 : -1
}
Ir.decodeHTML = (function () {
  for (var t = Object.keys(sat.default).sort(Mv), e = Object.keys(Rf.default).sort(Mv), r = 0, o = 0; r < e.length; r++)
    t[o] === e[r] ? ((e[r] += ';?'), o++) : (e[r] += ';')
  var l = new RegExp('&(?:' + e.join('|') + '|#[xX][\\da-fA-F]+;?|#\\d+;?)', 'g'),
    u = Ly(Rf.default)
  function f(h) {
    return h.substr(-1) !== ';' && (h += ';'), u(h)
  }
  return function (h) {
    return String(h).replace(l, f)
  }
})()
function Ly(t) {
  return function (r) {
    if (r.charAt(1) === '#') {
      var o = r.charAt(2)
      return o === 'X' || o === 'x' ? Av.default(parseInt(r.substr(3), 16)) : Av.default(parseInt(r.substr(2), 10))
    }
    return t[r.slice(1, -1)] || r
  }
}
var Rn = {},
  Ay =
    (to && to.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t }
    }
Object.defineProperty(Rn, '__esModule', { value: !0 })
Rn.escapeUTF8 = Rn.escape = Rn.encodeNonAsciiHTML = Rn.encodeHTML = Rn.encodeXML = void 0
var cat = Ay(Ty),
  My = Py(cat.default),
  Ny = Oy(My)
Rn.encodeXML = Ry(My)
var uat = Ay(Cy),
  Dh = Py(uat.default),
  fat = Oy(Dh)
Rn.encodeHTML = dat(Dh, fat)
Rn.encodeNonAsciiHTML = Ry(Dh)
function Py(t) {
  return Object.keys(t)
    .sort()
    .reduce(function (e, r) {
      return (e[t[r]] = '&' + r + ';'), e
    }, {})
}
function Oy(t) {
  for (var e = [], r = [], o = 0, l = Object.keys(t); o < l.length; o++) {
    var u = l[o]
    u.length === 1 ? e.push('\\' + u) : r.push(u)
  }
  e.sort()
  for (var f = 0; f < e.length - 1; f++) {
    for (var h = f; h < e.length - 1 && e[h].charCodeAt(1) + 1 === e[h + 1].charCodeAt(1); ) h += 1
    var d = 1 + h - f
    d < 3 || e.splice(f, d, e[f] + '-' + e[h])
  }
  return r.unshift('[' + e.join('') + ']'), new RegExp(r.join('|'), 'g')
}
var $y =
    /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
  hat =
    String.prototype.codePointAt != null
      ? function (t) {
          return t.codePointAt(0)
        }
      : function (t) {
          return (t.charCodeAt(0) - 55296) * 1024 + t.charCodeAt(1) - 56320 + 65536
        }
function Rc(t) {
  return '&#x' + (t.length > 1 ? hat(t) : t.charCodeAt(0)).toString(16).toUpperCase() + ';'
}
function dat(t, e) {
  return function (r) {
    return r
      .replace(e, function (o) {
        return t[o]
      })
      .replace($y, Rc)
  }
}
var Dy = new RegExp(Ny.source + '|' + $y.source, 'g')
function pat(t) {
  return t.replace(Dy, Rc)
}
Rn.escape = pat
function gat(t) {
  return t.replace(Ny, Rc)
}
Rn.escapeUTF8 = gat
function Ry(t) {
  return function (e) {
    return e.replace(Dy, function (r) {
      return t[r] || Rc(r)
    })
  }
}
;(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 }),
    (t.decodeXMLStrict =
      t.decodeHTML5Strict =
      t.decodeHTML4Strict =
      t.decodeHTML5 =
      t.decodeHTML4 =
      t.decodeHTMLStrict =
      t.decodeHTML =
      t.decodeXML =
      t.encodeHTML5 =
      t.encodeHTML4 =
      t.escapeUTF8 =
      t.escape =
      t.encodeNonAsciiHTML =
      t.encodeHTML =
      t.encodeXML =
      t.encode =
      t.decodeStrict =
      t.decode =
        void 0)
  var e = Ir,
    r = Rn
  function o(d, g) {
    return (!g || g <= 0 ? e.decodeXML : e.decodeHTML)(d)
  }
  t.decode = o
  function l(d, g) {
    return (!g || g <= 0 ? e.decodeXML : e.decodeHTMLStrict)(d)
  }
  t.decodeStrict = l
  function u(d, g) {
    return (!g || g <= 0 ? r.encodeXML : r.encodeHTML)(d)
  }
  t.encode = u
  var f = Rn
  Object.defineProperty(t, 'encodeXML', {
    enumerable: !0,
    get: function () {
      return f.encodeXML
    },
  }),
    Object.defineProperty(t, 'encodeHTML', {
      enumerable: !0,
      get: function () {
        return f.encodeHTML
      },
    }),
    Object.defineProperty(t, 'encodeNonAsciiHTML', {
      enumerable: !0,
      get: function () {
        return f.encodeNonAsciiHTML
      },
    }),
    Object.defineProperty(t, 'escape', {
      enumerable: !0,
      get: function () {
        return f.escape
      },
    }),
    Object.defineProperty(t, 'escapeUTF8', {
      enumerable: !0,
      get: function () {
        return f.escapeUTF8
      },
    }),
    Object.defineProperty(t, 'encodeHTML4', {
      enumerable: !0,
      get: function () {
        return f.encodeHTML
      },
    }),
    Object.defineProperty(t, 'encodeHTML5', {
      enumerable: !0,
      get: function () {
        return f.encodeHTML
      },
    })
  var h = Ir
  Object.defineProperty(t, 'decodeXML', {
    enumerable: !0,
    get: function () {
      return h.decodeXML
    },
  }),
    Object.defineProperty(t, 'decodeHTML', {
      enumerable: !0,
      get: function () {
        return h.decodeHTML
      },
    }),
    Object.defineProperty(t, 'decodeHTMLStrict', {
      enumerable: !0,
      get: function () {
        return h.decodeHTMLStrict
      },
    }),
    Object.defineProperty(t, 'decodeHTML4', {
      enumerable: !0,
      get: function () {
        return h.decodeHTML
      },
    }),
    Object.defineProperty(t, 'decodeHTML5', {
      enumerable: !0,
      get: function () {
        return h.decodeHTML
      },
    }),
    Object.defineProperty(t, 'decodeHTML4Strict', {
      enumerable: !0,
      get: function () {
        return h.decodeHTMLStrict
      },
    }),
    Object.defineProperty(t, 'decodeHTML5Strict', {
      enumerable: !0,
      get: function () {
        return h.decodeHTMLStrict
      },
    }),
    Object.defineProperty(t, 'decodeXMLStrict', {
      enumerable: !0,
      get: function () {
        return h.decodeXML
      },
    })
})(ky)
function vat(t, e) {
  if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function')
}
function Nv(t, e) {
  for (var r = 0; r < e.length; r++) {
    var o = e[r]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(t, o.key, o)
  }
}
function mat(t, e, r) {
  return e && Nv(t.prototype, e), r && Nv(t, r), t
}
function zy(t, e) {
  var r = (typeof Symbol < 'u' && t[Symbol.iterator]) || t['@@iterator']
  if (!r) {
    if (Array.isArray(t) || (r = yat(t)) || (e && t && typeof t.length == 'number')) {
      r && (t = r)
      var o = 0,
        l = function () {}
      return {
        s: l,
        n: function () {
          return o >= t.length ? { done: !0 } : { done: !1, value: t[o++] }
        },
        e: function (g) {
          throw g
        },
        f: l,
      }
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
  }
  var u = !0,
    f = !1,
    h
  return {
    s: function () {
      r = r.call(t)
    },
    n: function () {
      var g = r.next()
      return (u = g.done), g
    },
    e: function (g) {
      ;(f = !0), (h = g)
    },
    f: function () {
      try {
        !u && r.return != null && r.return()
      } finally {
        if (f) throw h
      }
    },
  }
}
function yat(t, e) {
  if (t) {
    if (typeof t == 'string') return Pv(t, e)
    var r = Object.prototype.toString.call(t).slice(8, -1)
    if ((r === 'Object' && t.constructor && (r = t.constructor.name), r === 'Map' || r === 'Set')) return Array.from(t)
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Pv(t, e)
  }
}
function Pv(t, e) {
  ;(e == null || e > t.length) && (e = t.length)
  for (var r = 0, o = new Array(e); r < e; r++) o[r] = t[r]
  return o
}
var bat = ky,
  Ov = { fg: '#FFF', bg: '#000', newline: !1, escapeXML: !1, stream: !1, colors: wat() }
function wat() {
  var t = {
    0: '#000',
    1: '#A00',
    2: '#0A0',
    3: '#A50',
    4: '#00A',
    5: '#A0A',
    6: '#0AA',
    7: '#AAA',
    8: '#555',
    9: '#F55',
    10: '#5F5',
    11: '#FF5',
    12: '#55F',
    13: '#F5F',
    14: '#5FF',
    15: '#FFF',
  }
  return (
    Sl(0, 5).forEach(function (e) {
      Sl(0, 5).forEach(function (r) {
        Sl(0, 5).forEach(function (o) {
          return xat(e, r, o, t)
        })
      })
    }),
    Sl(0, 23).forEach(function (e) {
      var r = e + 232,
        o = Iy(e * 10 + 8)
      t[r] = '#' + o + o + o
    }),
    t
  )
}
function xat(t, e, r, o) {
  var l = 16 + t * 36 + e * 6 + r,
    u = t > 0 ? t * 40 + 55 : 0,
    f = e > 0 ? e * 40 + 55 : 0,
    h = r > 0 ? r * 40 + 55 : 0
  o[l] = _at([u, f, h])
}
function Iy(t) {
  for (var e = t.toString(16); e.length < 2; ) e = '0' + e
  return e
}
function _at(t) {
  var e = [],
    r = zy(t),
    o
  try {
    for (r.s(); !(o = r.n()).done; ) {
      var l = o.value
      e.push(Iy(l))
    }
  } catch (u) {
    r.e(u)
  } finally {
    r.f()
  }
  return '#' + e.join('')
}
function $v(t, e, r, o) {
  var l
  return (
    e === 'text'
      ? (l = Tat(r, o))
      : e === 'display'
        ? (l = kat(t, r, o))
        : e === 'xterm256Foreground'
          ? (l = Rl(t, o.colors[r]))
          : e === 'xterm256Background'
            ? (l = zl(t, o.colors[r]))
            : e === 'rgb' && (l = Sat(t, r)),
    l
  )
}
function Sat(t, e) {
  e = e.substring(2).slice(0, -1)
  var r = +e.substr(0, 2),
    o = e.substring(5).split(';'),
    l = o
      .map(function (u) {
        return ('0' + Number(u).toString(16)).substr(-2)
      })
      .join('')
  return Dl(t, (r === 38 ? 'color:#' : 'background-color:#') + l)
}
function kat(t, e, r) {
  e = parseInt(e, 10)
  var o = {
      '-1': function () {
        return '<br/>'
      },
      0: function () {
        return t.length && Fy(t)
      },
      1: function () {
        return mi(t, 'b')
      },
      3: function () {
        return mi(t, 'i')
      },
      4: function () {
        return mi(t, 'u')
      },
      8: function () {
        return Dl(t, 'display:none')
      },
      9: function () {
        return mi(t, 'strike')
      },
      22: function () {
        return Dl(t, 'font-weight:normal;text-decoration:none;font-style:normal')
      },
      23: function () {
        return Rv(t, 'i')
      },
      24: function () {
        return Rv(t, 'u')
      },
      39: function () {
        return Rl(t, r.fg)
      },
      49: function () {
        return zl(t, r.bg)
      },
      53: function () {
        return Dl(t, 'text-decoration:overline')
      },
    },
    l
  return (
    o[e]
      ? (l = o[e]())
      : 4 < e && e < 7
        ? (l = mi(t, 'blink'))
        : 29 < e && e < 38
          ? (l = Rl(t, r.colors[e - 30]))
          : 39 < e && e < 48
            ? (l = zl(t, r.colors[e - 40]))
            : 89 < e && e < 98
              ? (l = Rl(t, r.colors[8 + (e - 90)]))
              : 99 < e && e < 108 && (l = zl(t, r.colors[8 + (e - 100)])),
    l
  )
}
function Fy(t) {
  var e = t.slice(0)
  return (
    (t.length = 0),
    e
      .reverse()
      .map(function (r) {
        return '</' + r + '>'
      })
      .join('')
  )
}
function Sl(t, e) {
  for (var r = [], o = t; o <= e; o++) r.push(o)
  return r
}
function Cat(t) {
  return function (e) {
    return (t === null || e.category !== t) && t !== 'all'
  }
}
function Dv(t) {
  t = parseInt(t, 10)
  var e = null
  return (
    t === 0
      ? (e = 'all')
      : t === 1
        ? (e = 'bold')
        : 2 < t && t < 5
          ? (e = 'underline')
          : 4 < t && t < 7
            ? (e = 'blink')
            : t === 8
              ? (e = 'hide')
              : t === 9
                ? (e = 'strike')
                : (29 < t && t < 38) || t === 39 || (89 < t && t < 98)
                  ? (e = 'foreground-color')
                  : ((39 < t && t < 48) || t === 49 || (99 < t && t < 108)) && (e = 'background-color'),
    e
  )
}
function Tat(t, e) {
  return e.escapeXML ? bat.encodeXML(t) : t
}
function mi(t, e, r) {
  return r || (r = ''), t.push(e), '<'.concat(e).concat(r ? ' style="'.concat(r, '"') : '', '>')
}
function Dl(t, e) {
  return mi(t, 'span', e)
}
function Rl(t, e) {
  return mi(t, 'span', 'color:' + e)
}
function zl(t, e) {
  return mi(t, 'span', 'background-color:' + e)
}
function Rv(t, e) {
  var r
  if ((t.slice(-1)[0] === e && (r = t.pop()), r)) return '</' + e + '>'
}
function Eat(t, e, r) {
  var o = !1,
    l = 3
  function u() {
    return ''
  }
  function f(B, tt) {
    return r('xterm256Foreground', tt), ''
  }
  function h(B, tt) {
    return r('xterm256Background', tt), ''
  }
  function d(B) {
    return e.newline ? r('display', -1) : r('text', B), ''
  }
  function g(B, tt) {
    ;(o = !0), tt.trim().length === 0 && (tt = '0'), (tt = tt.trimRight(';').split(';'))
    var ft = zy(tt),
      X
    try {
      for (ft.s(); !(X = ft.n()).done; ) {
        var st = X.value
        r('display', st)
      }
    } catch (ot) {
      ft.e(ot)
    } finally {
      ft.f()
    }
    return ''
  }
  function v(B) {
    return r('text', B), ''
  }
  function b(B) {
    return r('rgb', B), ''
  }
  var x = [
    { pattern: /^\x08+/, sub: u },
    { pattern: /^\x1b\[[012]?K/, sub: u },
    { pattern: /^\x1b\[\(B/, sub: u },
    { pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/, sub: b },
    { pattern: /^\x1b\[38;5;(\d+)m/, sub: f },
    { pattern: /^\x1b\[48;5;(\d+)m/, sub: h },
    { pattern: /^\n/, sub: d },
    { pattern: /^\r+\n/, sub: d },
    { pattern: /^\r/, sub: d },
    { pattern: /^\x1b\[((?:\d{1,3};?)+|)m/, sub: g },
    { pattern: /^\x1b\[\d?J/, sub: u },
    { pattern: /^\x1b\[\d{0,3};\d{0,3}f/, sub: u },
    { pattern: /^\x1b\[?[\d;]{0,3}/, sub: u },
    { pattern: /^(([^\x1b\x08\r\n])+)/, sub: v },
  ]
  function S(B, tt) {
    ;(tt > l && o) || ((o = !1), (t = t.replace(B.pattern, B.sub)))
  }
  var M = [],
    T = t,
    N = T.length
  t: for (; N > 0; ) {
    for (var E = 0, L = 0, F = x.length; L < F; E = ++L) {
      var A = x[E]
      if ((S(A, E), t.length !== N)) {
        N = t.length
        continue t
      }
    }
    if (t.length === N) break
    M.push(0), (N = t.length)
  }
  return M
}
function Lat(t, e, r) {
  return e !== 'text' && ((t = t.filter(Cat(Dv(r)))), t.push({ token: e, data: r, category: Dv(r) })), t
}
var Aat = (function () {
    function t(e) {
      vat(this, t),
        (e = e || {}),
        e.colors && (e.colors = Object.assign({}, Ov.colors, e.colors)),
        (this.options = Object.assign({}, Ov, e)),
        (this.stack = []),
        (this.stickyStack = [])
    }
    return (
      mat(t, [
        {
          key: 'toHtml',
          value: function (r) {
            var o = this
            r = typeof r == 'string' ? [r] : r
            var l = this.stack,
              u = this.options,
              f = []
            return (
              this.stickyStack.forEach(function (h) {
                var d = $v(l, h.token, h.data, u)
                d && f.push(d)
              }),
              Eat(r.join(''), u, function (h, d) {
                var g = $v(l, h, d, u)
                g && f.push(g), u.stream && (o.stickyStack = Lat(o.stickyStack, h, d))
              }),
              l.length && f.push(Fy(l)),
              f.join('')
            )
          },
        },
      ]),
      t
    )
  })(),
  Mat = Aat
const Nat = J0(Mat)
function Pat(t, e) {
  return e && t.endsWith(e)
}
async function qy(t, e, r) {
  const o = encodeURI(`${t}:${e}:${r}`)
  await fetch(`/__open-in-editor?file=${o}`)
}
function Rh(t) {
  return new Nat({ fg: t ? '#FFF' : '#000', bg: t ? '#000' : '#FFF' })
}
const Aa = QT(),
  Oat = uT(Aa),
  $at = { class: 'scrolls scrolls-rounded task-error' },
  Dat = ['onClickPassive'],
  Rat = ['innerHTML'],
  zat = re({
    __name: 'ViewReportError',
    props: { root: {}, filename: {}, error: {} },
    setup(t) {
      const e = t
      function r(f) {
        return f.startsWith(e.root) ? f.slice(e.root.length) : f
      }
      const o = yt(() => Rh(Aa.value)),
        l = yt(() => {
          var f
          return !!((f = e.error) != null && f.diff)
        }),
        u = yt(() => (e.error.diff ? o.value.toHtml(e.error.diff) : void 0))
      return (f, h) => {
        const d = oo('tooltip')
        return (
          ct(),
          Et('div', $at, [
            ut('pre', null, [ut('b', null, te(f.error.name || f.error.nameStr), 1), dn(': ' + te(f.error.message), 1)]),
            (ct(!0),
            Et(
              fe,
              null,
              Qn(
                f.error.stacks,
                (g, v) => (
                  ct(),
                  Et('div', { key: v, class: 'op80 flex gap-x-2 items-center', 'data-testid': 'stack' }, [
                    ut('pre', null, ' - ' + te(r(g.file)) + ':' + te(g.line) + ':' + te(g.column), 1),
                    G(Pat)(g.file, f.filename)
                      ? rn(
                          (ct(),
                          Et(
                            'div',
                            {
                              key: 0,
                              class:
                                'i-carbon-launch c-red-600 dark:c-red-400 hover:cursor-pointer min-w-1em min-h-1em',
                              tabindex: '0',
                              'aria-label': 'Open in Editor',
                              onClickPassive: (b) => G(qy)(g.file, g.line, g.column),
                            },
                            null,
                            40,
                            Dat,
                          )),
                          [[d, 'Open in Editor', void 0, { bottom: !0 }]],
                        )
                      : ne('', !0),
                  ])
                ),
              ),
              128,
            )),
            G(l) ? (ct(), Et('pre', { key: 0, 'data-testid': 'diff', innerHTML: G(u) }, null, 8, Rat)) : ne('', !0),
          ])
        )
      }
    },
  })
const Iat = so(zat, [['__scopeId', 'data-v-e33c3955']]),
  Fat = { 'h-full': '', class: 'scrolls' },
  qat = { key: 0, class: 'scrolls scrolls-rounded task-error' },
  Hat = ['innerHTML'],
  Bat = { key: 1, bg: 'green-500/10', text: 'green-500 sm', p: 'x4 y2', 'm-2': '', rounded: '' },
  Wat = re({
    __name: 'ViewReport',
    props: { file: {} },
    setup(t) {
      const e = t
      function r(h, d) {
        var g
        return ((g = h.result) == null ? void 0 : g.state) !== 'fail'
          ? []
          : h.type === 'test' || h.type === 'custom'
            ? [{ ...h, level: d }]
            : [{ ...h, level: d }, ...h.tasks.flatMap((v) => r(v, d + 1))]
      }
      function o(h) {
        return h
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
      }
      function l(h, d) {
        var b, x, S
        let g = ''
        ;(b = d.message) != null &&
          b.includes('\x1B') &&
          (g = `<b>${d.nameStr || d.name}</b>: ${h.toHtml(o(d.message))}`)
        const v = (x = d.stackStr) == null ? void 0 : x.includes('\x1B')
        return (
          (v || ((S = d.stack) != null && S.includes('\x1B'))) &&
            (g.length > 0
              ? (g += h.toHtml(o(v ? d.stackStr : d.stack)))
              : (g = `<b>${d.nameStr || d.name}</b>: ${d.message}${h.toHtml(o(v ? d.stackStr : d.stack))}`)),
          g.length > 0 ? g : null
        )
      }
      function u(h, d) {
        const g = Rh(h)
        return d.map((v) => {
          var S
          const b = v.result
          if (!b) return v
          const x =
            (S = b.errors) == null
              ? void 0
              : S.map((M) => l(g, M))
                  .filter((M) => M != null)
                  .join('<br><br>')
          return x != null && x.length && (b.htmlError = x), v
        })
      }
      const f = yt(() => {
        var b, x
        const h = e.file,
          d = ((b = h == null ? void 0 : h.tasks) == null ? void 0 : b.flatMap((S) => r(S, 0))) ?? [],
          g = h == null ? void 0 : h.result
        if ((x = g == null ? void 0 : g.errors) == null ? void 0 : x[0]) {
          const S = { id: h.id, name: h.name, level: 0, type: 'suite', mode: 'run', meta: {}, tasks: [], result: g }
          d.unshift(S)
        }
        return d.length > 0 ? u(Aa.value, d) : d
      })
      return (h, d) => (
        ct(),
        Et('div', Fat, [
          G(f).length
            ? (ct(!0),
              Et(
                fe,
                { key: 0 },
                Qn(G(f), (g) => {
                  var v, b, x
                  return (
                    ct(),
                    Et('div', { key: g.id }, [
                      ut(
                        'div',
                        {
                          bg: 'red-500/10',
                          text: 'red-500 sm',
                          p: 'x3 y2',
                          'm-2': '',
                          rounded: '',
                          style: En({
                            'margin-left': `${(v = g.result) != null && v.htmlError ? 0.5 : 2 * g.level + 0.5}rem`,
                          }),
                        },
                        [
                          dn(te(g.name) + ' ', 1),
                          (b = g.result) != null && b.htmlError
                            ? (ct(), Et('div', qat, [ut('pre', { innerHTML: g.result.htmlError }, null, 8, Hat)]))
                            : (x = g.result) != null && x.errors
                              ? (ct(!0),
                                Et(
                                  fe,
                                  { key: 1 },
                                  Qn(g.result.errors, (S, M) => {
                                    var T
                                    return (
                                      ct(),
                                      Zt(
                                        Iat,
                                        {
                                          key: M,
                                          error: S,
                                          filename: (T = h.file) == null ? void 0 : T.name,
                                          root: G(La).root,
                                        },
                                        null,
                                        8,
                                        ['error', 'filename', 'root'],
                                      )
                                    )
                                  }),
                                  128,
                                ))
                              : ne('', !0),
                        ],
                        4,
                      ),
                    ])
                  )
                }),
                128,
              ))
            : (ct(), Et('div', Bat, ' All tests passed in this file ')),
        ])
      )
    },
  })
const Uat = so(Wat, [['__scopeId', 'data-v-6f755b01']]),
  jat = { border: 'b base', 'p-4': '' },
  Gat = ['innerHTML'],
  Vat = ['textContent'],
  Kat = re({
    __name: 'ViewConsoleOutputEntry',
    props: { taskName: {}, type: {}, time: {}, content: {}, html: { type: Boolean } },
    setup(t) {
      function e(r) {
        return new Date(r).toLocaleTimeString()
      }
      return (r, o) => (
        ct(),
        Et('div', jat, [
          ut(
            'div',
            { 'text-xs': '', 'mb-1': '', class: ve(r.type === 'stderr' ? 'text-red-600 dark:text-red-300' : 'op30') },
            te(e(r.time)) + ' | ' + te(r.taskName) + ' | ' + te(r.type),
            3,
          ),
          r.html
            ? (ct(), Et('pre', { key: 0, 'data-type': 'html', innerHTML: r.content }, null, 8, Gat))
            : (ct(), Et('pre', { key: 1, 'data-type': 'text', textContent: te(r.content) }, null, 8, Vat)),
        ])
      )
    },
  }),
  oc = yt(() =>
    An.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === 'fail'
    }),
  ),
  sc = yt(() =>
    An.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === 'pass'
    }),
  ),
  zh = yt(() => An.value.filter((t) => t.mode === 'skip' || t.mode === 'todo'))
yt(() => An.value.filter((t) => !oc.value.includes(t) && !sc.value.includes(t) && !zh.value.includes(t)))
yt(() => zh.value.filter((t) => t.mode === 'skip'))
const zv = yt(() => An.value.filter($c))
yt(() => zh.value.filter((t) => t.mode === 'todo'))
const Xat = yt(() => ga.value === 'idle'),
  Ma = yt(() => Ih(An.value)),
  Hy = yt(() =>
    Ma.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === 'fail'
    }),
  ),
  By = yt(() =>
    Ma.value.filter((t) => {
      var e
      return ((e = t.result) == null ? void 0 : e.state) === 'pass'
    }),
  ),
  Wy = yt(() => Ma.value.filter((t) => t.mode === 'skip' || t.mode === 'todo')),
  Yat = yt(() => Wy.value.filter((t) => t.mode === 'skip')),
  Zat = yt(() => Wy.value.filter((t) => t.mode === 'todo'))
yt(() => Hy.value.length + By.value.length)
const Jat = yt(() => {
  const t = Ih(Ma.value).reduce((e, r) => {
    var o
    return (
      (e += Math.max(0, r.collectDuration || 0)),
      (e += Math.max(0, r.setupDuration || 0)),
      (e += Math.max(0, ((o = r.result) == null ? void 0 : o.duration) || 0)),
      e
    )
  }, 0)
  return t > 1e3 ? `${(t / 1e3).toFixed(2)}s` : `${Math.round(t)}ms`
})
function Qat(t) {
  return (t = t || []), Array.isArray(t) ? t : [t]
}
function Iv(t) {
  return t.type === 'test' || t.type === 'benchmark' || t.type === 'typecheck'
}
function Ih(t) {
  return Qat(t).flatMap((e) => (Iv(e) ? [e] : e.tasks.flatMap((r) => (Iv(r) ? [r] : Ih(r)))))
}
const tlt = { key: 0, 'h-full': '', class: 'scrolls', flex: '', 'flex-col': '', 'data-testid': 'logs' },
  elt = { key: 1, p6: '' },
  nlt = ut('pre', { inline: '' }, 'console.log(foo)', -1),
  rlt = re({
    __name: 'ViewConsoleOutput',
    setup(t) {
      const e = yt(() => {
        const o = _y.value
        if (o) {
          const l = Rh(Aa.value)
          return o.map(({ taskId: u, type: f, time: h, content: d }) => {
            const g = d.trim(),
              v = l.toHtml(g)
            return v !== g
              ? { taskId: u, type: f, time: h, html: !0, content: v }
              : { taskId: u, type: f, time: h, html: !1, content: d }
          })
        }
      })
      function r(o) {
        const l = o && Ge.state.idMap.get(o)
        return (l ? tT(l).slice(1).join(' > ') : '-') || '-'
      }
      return (o, l) => {
        var f
        const u = Kat
        return (f = G(e)) != null && f.length
          ? (ct(),
            Et('div', tlt, [
              (ct(!0),
              Et(
                fe,
                null,
                Qn(
                  G(e),
                  ({ taskId: h, type: d, time: g, html: v, content: b }) => (
                    ct(),
                    Et('div', { key: h, 'font-mono': '' }, [
                      qt(u, { 'task-name': r(h), type: d, time: g, content: b, html: v }, null, 8, [
                        'task-name',
                        'type',
                        'time',
                        'content',
                        'html',
                      ]),
                    ])
                  ),
                ),
                128,
              )),
            ]))
          : (ct(), Et('p', elt, [dn(' Log something in your test and it would print here. (e.g. '), nlt, dn(') ')]))
      }
    },
  })
var Zu = { exports: {} },
  Fv
function cs() {
  return (
    Fv ||
      ((Fv = 1),
      (function (t, e) {
        ;(function (r, o) {
          t.exports = o()
        })(to, function () {
          var r = navigator.userAgent,
            o = navigator.platform,
            l = /gecko\/\d/i.test(r),
            u = /MSIE \d/.test(r),
            f = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(r),
            h = /Edge\/(\d+)/.exec(r),
            d = u || f || h,
            g = d && (u ? document.documentMode || 6 : +(h || f)[1]),
            v = !h && /WebKit\//.test(r),
            b = v && /Qt\/\d+\.\d+/.test(r),
            x = !h && /Chrome\/(\d+)/.exec(r),
            S = x && +x[1],
            M = /Opera\//.test(r),
            T = /Apple Computer/.test(navigator.vendor),
            N = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(r),
            E = /PhantomJS/.test(r),
            L = T && (/Mobile\/\w+/.test(r) || navigator.maxTouchPoints > 2),
            F = /Android/.test(r),
            A = L || F || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(r),
            B = L || /Mac/.test(o),
            tt = /\bCrOS\b/.test(r),
            ft = /win/i.test(o),
            X = M && r.match(/Version\/(\d*\.\d*)/)
          X && (X = Number(X[1])), X && X >= 15 && ((M = !1), (v = !0))
          var st = B && (b || (M && (X == null || X < 12.11))),
            ot = l || (d && g >= 9)
          function kt(n) {
            return new RegExp('(^|\\s)' + n + '(?:$|\\s)\\s*')
          }
          var pt = function (n, i) {
            var a = n.className,
              s = kt(i).exec(a)
            if (s) {
              var c = a.slice(s.index + s[0].length)
              n.className = a.slice(0, s.index) + (c ? s[1] + c : '')
            }
          }
          function V(n) {
            for (var i = n.childNodes.length; i > 0; --i) n.removeChild(n.firstChild)
            return n
          }
          function R(n, i) {
            return V(n).appendChild(i)
          }
          function k(n, i, a, s) {
            var c = document.createElement(n)
            if ((a && (c.className = a), s && (c.style.cssText = s), typeof i == 'string'))
              c.appendChild(document.createTextNode(i))
            else if (i) for (var p = 0; p < i.length; ++p) c.appendChild(i[p])
            return c
          }
          function H(n, i, a, s) {
            var c = k(n, i, a, s)
            return c.setAttribute('role', 'presentation'), c
          }
          var W
          document.createRange
            ? (W = function (n, i, a, s) {
                var c = document.createRange()
                return c.setEnd(s || n, a), c.setStart(n, i), c
              })
            : (W = function (n, i, a) {
                var s = document.body.createTextRange()
                try {
                  s.moveToElementText(n.parentNode)
                } catch {
                  return s
                }
                return s.collapse(!0), s.moveEnd('character', a), s.moveStart('character', i), s
              })
          function J(n, i) {
            if ((i.nodeType == 3 && (i = i.parentNode), n.contains)) return n.contains(i)
            do if ((i.nodeType == 11 && (i = i.host), i == n)) return !0
            while ((i = i.parentNode))
          }
          function wt(n) {
            var i
            try {
              i = n.activeElement
            } catch {
              i = n.body || null
            }
            for (; i && i.shadowRoot && i.shadowRoot.activeElement; ) i = i.shadowRoot.activeElement
            return i
          }
          function Tt(n, i) {
            var a = n.className
            kt(i).test(a) || (n.className += (a ? ' ' : '') + i)
          }
          function zt(n, i) {
            for (var a = n.split(' '), s = 0; s < a.length; s++) a[s] && !kt(a[s]).test(i) && (i += ' ' + a[s])
            return i
          }
          var It = function (n) {
            n.select()
          }
          L
            ? (It = function (n) {
                ;(n.selectionStart = 0), (n.selectionEnd = n.value.length)
              })
            : d &&
              (It = function (n) {
                try {
                  n.select()
                } catch {}
              })
          function Gt(n) {
            return n.display.wrapper.ownerDocument
          }
          function Vt(n) {
            return Gt(n).defaultView
          }
          function Jt(n) {
            var i = Array.prototype.slice.call(arguments, 1)
            return function () {
              return n.apply(null, i)
            }
          }
          function _t(n, i, a) {
            i || (i = {})
            for (var s in n) n.hasOwnProperty(s) && (a !== !1 || !i.hasOwnProperty(s)) && (i[s] = n[s])
            return i
          }
          function U(n, i, a, s, c) {
            i == null && ((i = n.search(/[^\s\u00a0]/)), i == -1 && (i = n.length))
            for (var p = s || 0, m = c || 0; ; ) {
              var y = n.indexOf('	', p)
              if (y < 0 || y >= i) return m + (i - p)
              ;(m += y - p), (m += a - (m % a)), (p = y + 1)
            }
          }
          var et = function () {
            ;(this.id = null), (this.f = null), (this.time = 0), (this.handler = Jt(this.onTimeout, this))
          }
          ;(et.prototype.onTimeout = function (n) {
            ;(n.id = 0), n.time <= +new Date() ? n.f() : setTimeout(n.handler, n.time - +new Date())
          }),
            (et.prototype.set = function (n, i) {
              this.f = i
              var a = +new Date() + n
              ;(!this.id || a < this.time) &&
                (clearTimeout(this.id), (this.id = setTimeout(this.handler, n)), (this.time = a))
            })
          function it(n, i) {
            for (var a = 0; a < n.length; ++a) if (n[a] == i) return a
            return -1
          }
          var Mt = 50,
            Nt = {
              toString: function () {
                return 'CodeMirror.Pass'
              },
            },
            O = { scroll: !1 },
            I = { origin: '*mouse' },
            K = { origin: '+move' }
          function Q(n, i, a) {
            for (var s = 0, c = 0; ; ) {
              var p = n.indexOf('	', s)
              p == -1 && (p = n.length)
              var m = p - s
              if (p == n.length || c + m >= i) return s + Math.min(m, i - c)
              if (((c += p - s), (c += a - (c % a)), (s = p + 1), c >= i)) return s
            }
          }
          var nt = ['']
          function at(n) {
            for (; nt.length <= n; ) nt.push(lt(nt) + ' ')
            return nt[n]
          }
          function lt(n) {
            return n[n.length - 1]
          }
          function gt(n, i) {
            for (var a = [], s = 0; s < n.length; s++) a[s] = i(n[s], s)
            return a
          }
          function xt(n, i, a) {
            for (var s = 0, c = a(i); s < n.length && a(n[s]) <= c; ) s++
            n.splice(s, 0, i)
          }
          function ht() {}
          function $t(n, i) {
            var a
            return Object.create ? (a = Object.create(n)) : ((ht.prototype = n), (a = new ht())), i && _t(i, a), a
          }
          var At =
            /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/
          function Ot(n) {
            return /\w/.test(n) || (n > '' && (n.toUpperCase() != n.toLowerCase() || At.test(n)))
          }
          function Ft(n, i) {
            return i ? (i.source.indexOf('\\w') > -1 && Ot(n) ? !0 : i.test(n)) : Ot(n)
          }
          function jt(n) {
            for (var i in n) if (n.hasOwnProperty(i) && n[i]) return !1
            return !0
          }
          var ie =
            /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/
          function ee(n) {
            return n.charCodeAt(0) >= 768 && ie.test(n)
          }
          function ue(n, i, a) {
            for (; (a < 0 ? i > 0 : i < n.length) && ee(n.charAt(i)); ) i += a
            return i
          }
          function Qt(n, i, a) {
            for (var s = i > a ? -1 : 1; ; ) {
              if (i == a) return i
              var c = (i + a) / 2,
                p = s < 0 ? Math.ceil(c) : Math.floor(c)
              if (p == i) return n(p) ? i : a
              n(p) ? (a = p) : (i = p + s)
            }
          }
          function yn(n, i, a, s) {
            if (!n) return s(i, a, 'ltr', 0)
            for (var c = !1, p = 0; p < n.length; ++p) {
              var m = n[p]
              ;((m.from < a && m.to > i) || (i == a && m.to == i)) &&
                (s(Math.max(m.from, i), Math.min(m.to, a), m.level == 1 ? 'rtl' : 'ltr', p), (c = !0))
            }
            c || s(i, a, 'ltr')
          }
          var Nn = null
          function We(n, i, a) {
            var s
            Nn = null
            for (var c = 0; c < n.length; ++c) {
              var p = n[c]
              if (p.from < i && p.to > i) return c
              p.to == i && (p.from != p.to && a == 'before' ? (s = c) : (Nn = c)),
                p.from == i && (p.from != p.to && a != 'before' ? (s = c) : (Nn = c))
            }
            return s ?? Nn
          }
          var ao = (function () {
            var n =
                'bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN',
              i =
                'nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111'
            function a(_) {
              return _ <= 247
                ? n.charAt(_)
                : 1424 <= _ && _ <= 1524
                  ? 'R'
                  : 1536 <= _ && _ <= 1785
                    ? i.charAt(_ - 1536)
                    : 1774 <= _ && _ <= 2220
                      ? 'r'
                      : 8192 <= _ && _ <= 8203
                        ? 'w'
                        : _ == 8204
                          ? 'b'
                          : 'L'
            }
            var s = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
              c = /[stwN]/,
              p = /[LRr]/,
              m = /[Lb1n]/,
              y = /[1n]/
            function w(_, P, $) {
              ;(this.level = _), (this.from = P), (this.to = $)
            }
            return function (_, P) {
              var $ = P == 'ltr' ? 'L' : 'R'
              if (_.length == 0 || (P == 'ltr' && !s.test(_))) return !1
              for (var j = _.length, q = [], Z = 0; Z < j; ++Z) q.push(a(_.charCodeAt(Z)))
              for (var rt = 0, dt = $; rt < j; ++rt) {
                var vt = q[rt]
                vt == 'm' ? (q[rt] = dt) : (dt = vt)
              }
              for (var St = 0, mt = $; St < j; ++St) {
                var Ct = q[St]
                Ct == '1' && mt == 'r' ? (q[St] = 'n') : p.test(Ct) && ((mt = Ct), Ct == 'r' && (q[St] = 'R'))
              }
              for (var Dt = 1, Pt = q[0]; Dt < j - 1; ++Dt) {
                var Ut = q[Dt]
                Ut == '+' && Pt == '1' && q[Dt + 1] == '1'
                  ? (q[Dt] = '1')
                  : Ut == ',' && Pt == q[Dt + 1] && (Pt == '1' || Pt == 'n') && (q[Dt] = Pt),
                  (Pt = Ut)
              }
              for (var ge = 0; ge < j; ++ge) {
                var He = q[ge]
                if (He == ',') q[ge] = 'N'
                else if (He == '%') {
                  var Se = void 0
                  for (Se = ge + 1; Se < j && q[Se] == '%'; ++Se);
                  for (
                    var xn = (ge && q[ge - 1] == '!') || (Se < j && q[Se] == '1') ? '1' : 'N', cn = ge;
                    cn < Se;
                    ++cn
                  )
                    q[cn] = xn
                  ge = Se - 1
                }
              }
              for (var Me = 0, un = $; Me < j; ++Me) {
                var Ue = q[Me]
                un == 'L' && Ue == '1' ? (q[Me] = 'L') : p.test(Ue) && (un = Ue)
              }
              for (var De = 0; De < j; ++De)
                if (c.test(q[De])) {
                  var Ne = void 0
                  for (Ne = De + 1; Ne < j && c.test(q[Ne]); ++Ne);
                  for (
                    var Te = (De ? q[De - 1] : $) == 'L',
                      fn = (Ne < j ? q[Ne] : $) == 'L',
                      Ao = Te == fn ? (Te ? 'L' : 'R') : $,
                      ai = De;
                    ai < Ne;
                    ++ai
                  )
                    q[ai] = Ao
                  De = Ne - 1
                }
              for (var Ye = [], fr, Be = 0; Be < j; )
                if (m.test(q[Be])) {
                  var Ou = Be
                  for (++Be; Be < j && m.test(q[Be]); ++Be);
                  Ye.push(new w(0, Ou, Be))
                } else {
                  var Mr = Be,
                    zi = Ye.length,
                    Ii = P == 'rtl' ? 1 : 0
                  for (++Be; Be < j && q[Be] != 'L'; ++Be);
                  for (var en = Mr; en < Be; )
                    if (y.test(q[en])) {
                      Mr < en && (Ye.splice(zi, 0, new w(1, Mr, en)), (zi += Ii))
                      var Mo = en
                      for (++en; en < Be && y.test(q[en]); ++en);
                      Ye.splice(zi, 0, new w(2, Mo, en)), (zi += Ii), (Mr = en)
                    } else ++en
                  Mr < Be && Ye.splice(zi, 0, new w(1, Mr, Be))
                }
              return (
                P == 'ltr' &&
                  (Ye[0].level == 1 &&
                    (fr = _.match(/^\s+/)) &&
                    ((Ye[0].from = fr[0].length), Ye.unshift(new w(0, 0, fr[0].length))),
                  lt(Ye).level == 1 &&
                    (fr = _.match(/\s+$/)) &&
                    ((lt(Ye).to -= fr[0].length), Ye.push(new w(0, j - fr[0].length, j)))),
                P == 'rtl' ? Ye.reverse() : Ye
              )
            }
          })()
          function ye(n, i) {
            var a = n.order
            return a == null && (a = n.order = ao(n.text, i)), a
          }
          var on = [],
            bt = function (n, i, a) {
              if (n.addEventListener) n.addEventListener(i, a, !1)
              else if (n.attachEvent) n.attachEvent('on' + i, a)
              else {
                var s = n._handlers || (n._handlers = {})
                s[i] = (s[i] || on).concat(a)
              }
            }
          function fs(n, i) {
            return (n._handlers && n._handlers[i]) || on
          }
          function Ve(n, i, a) {
            if (n.removeEventListener) n.removeEventListener(i, a, !1)
            else if (n.detachEvent) n.detachEvent('on' + i, a)
            else {
              var s = n._handlers,
                c = s && s[i]
              if (c) {
                var p = it(c, a)
                p > -1 && (s[i] = c.slice(0, p).concat(c.slice(p + 1)))
              }
            }
          }
          function me(n, i) {
            var a = fs(n, i)
            if (a.length)
              for (var s = Array.prototype.slice.call(arguments, 2), c = 0; c < a.length; ++c) a[c].apply(null, s)
          }
          function ke(n, i, a) {
            return (
              typeof i == 'string' &&
                (i = {
                  type: i,
                  preventDefault: function () {
                    this.defaultPrevented = !0
                  },
                }),
              me(n, a || i.type, n, i),
              hs(i) || i.codemirrorIgnore
            )
          }
          function $a(n) {
            var i = n._handlers && n._handlers.cursorActivity
            if (i)
              for (
                var a = n.curOp.cursorActivityHandlers || (n.curOp.cursorActivityHandlers = []), s = 0;
                s < i.length;
                ++s
              )
                it(a, i[s]) == -1 && a.push(i[s])
          }
          function Je(n, i) {
            return fs(n, i).length > 0
          }
          function Qe(n) {
            ;(n.prototype.on = function (i, a) {
              bt(this, i, a)
            }),
              (n.prototype.off = function (i, a) {
                Ve(this, i, a)
              })
          }
          function Ke(n) {
            n.preventDefault ? n.preventDefault() : (n.returnValue = !1)
          }
          function Li(n) {
            n.stopPropagation ? n.stopPropagation() : (n.cancelBubble = !0)
          }
          function hs(n) {
            return n.defaultPrevented != null ? n.defaultPrevented : n.returnValue == !1
          }
          function xr(n) {
            Ke(n), Li(n)
          }
          function sn(n) {
            return n.target || n.srcElement
          }
          function ds(n) {
            var i = n.which
            return (
              i == null && (n.button & 1 ? (i = 1) : n.button & 2 ? (i = 3) : n.button & 4 && (i = 2)),
              B && n.ctrlKey && i == 1 && (i = 3),
              i
            )
          }
          var qc = (function () {
              if (d && g < 9) return !1
              var n = k('div')
              return 'draggable' in n || 'dragDrop' in n
            })(),
            Fn
          function Hc(n) {
            if (Fn == null) {
              var i = k('span', '​')
              R(n, k('span', [i, document.createTextNode('x')])),
                n.firstChild.offsetHeight != 0 && (Fn = i.offsetWidth <= 1 && i.offsetHeight > 2 && !(d && g < 8))
            }
            var a = Fn ? k('span', '​') : k('span', ' ', null, 'display: inline-block; width: 1px; margin-right: -1px')
            return a.setAttribute('cm-text', ''), a
          }
          var lo
          function Da(n) {
            if (lo != null) return lo
            var i = R(n, document.createTextNode('AخA')),
              a = W(i, 0, 1).getBoundingClientRect(),
              s = W(i, 1, 2).getBoundingClientRect()
            return V(n), !a || a.left == a.right ? !1 : (lo = s.right - a.right < 3)
          }
          var ps =
              `

b`.split(/\n/).length != 3
                ? function (n) {
                    for (var i = 0, a = [], s = n.length; i <= s; ) {
                      var c = n.indexOf(
                        `
`,
                        i,
                      )
                      c == -1 && (c = n.length)
                      var p = n.slice(i, n.charAt(c - 1) == '\r' ? c - 1 : c),
                        m = p.indexOf('\r')
                      m != -1 ? (a.push(p.slice(0, m)), (i += m + 1)) : (a.push(p), (i = c + 1))
                    }
                    return a
                  }
                : function (n) {
                    return n.split(/\r\n?|\n/)
                  },
            Xr = window.getSelection
              ? function (n) {
                  try {
                    return n.selectionStart != n.selectionEnd
                  } catch {
                    return !1
                  }
                }
              : function (n) {
                  var i
                  try {
                    i = n.ownerDocument.selection.createRange()
                  } catch {}
                  return !i || i.parentElement() != n ? !1 : i.compareEndPoints('StartToEnd', i) != 0
                },
            or = (function () {
              var n = k('div')
              return 'oncopy' in n ? !0 : (n.setAttribute('oncopy', 'return;'), typeof n.oncopy == 'function')
            })(),
            sr = null
          function Ra(n) {
            if (sr != null) return sr
            var i = R(n, k('span', 'x')),
              a = i.getBoundingClientRect(),
              s = W(i, 0, 1).getBoundingClientRect()
            return (sr = Math.abs(a.left - s.left) > 1)
          }
          var Un = {},
            Yr = {}
          function za(n, i) {
            arguments.length > 2 && (i.dependencies = Array.prototype.slice.call(arguments, 2)), (Un[n] = i)
          }
          function co(n, i) {
            Yr[n] = i
          }
          function bn(n) {
            if (typeof n == 'string' && Yr.hasOwnProperty(n)) n = Yr[n]
            else if (n && typeof n.name == 'string' && Yr.hasOwnProperty(n.name)) {
              var i = Yr[n.name]
              typeof i == 'string' && (i = { name: i }), (n = $t(i, n)), (n.name = i.name)
            } else {
              if (typeof n == 'string' && /^[\w\-]+\/[\w\-]+\+xml$/.test(n)) return bn('application/xml')
              if (typeof n == 'string' && /^[\w\-]+\/[\w\-]+\+json$/.test(n)) return bn('application/json')
            }
            return typeof n == 'string' ? { name: n } : n || { name: 'null' }
          }
          function _r(n, i) {
            i = bn(i)
            var a = Un[i.name]
            if (!a) return _r(n, 'text/plain')
            var s = a(n, i)
            if (Zr.hasOwnProperty(i.name)) {
              var c = Zr[i.name]
              for (var p in c) c.hasOwnProperty(p) && (s.hasOwnProperty(p) && (s['_' + p] = s[p]), (s[p] = c[p]))
            }
            if (((s.name = i.name), i.helperType && (s.helperType = i.helperType), i.modeProps))
              for (var m in i.modeProps) s[m] = i.modeProps[m]
            return s
          }
          var Zr = {}
          function Ia(n, i) {
            var a = Zr.hasOwnProperty(n) ? Zr[n] : (Zr[n] = {})
            _t(i, a)
          }
          function Sr(n, i) {
            if (i === !0) return i
            if (n.copyState) return n.copyState(i)
            var a = {}
            for (var s in i) {
              var c = i[s]
              c instanceof Array && (c = c.concat([])), (a[s] = c)
            }
            return a
          }
          function Jr(n, i) {
            for (var a; n.innerMode && ((a = n.innerMode(i)), !(!a || a.mode == n)); ) (i = a.state), (n = a.mode)
            return a || { mode: n, state: i }
          }
          function gs(n, i, a) {
            return n.startState ? n.startState(i, a) : !0
          }
          var Ce = function (n, i, a) {
            ;(this.pos = this.start = 0),
              (this.string = n),
              (this.tabSize = i || 8),
              (this.lastColumnPos = this.lastColumnValue = 0),
              (this.lineStart = 0),
              (this.lineOracle = a)
          }
          ;(Ce.prototype.eol = function () {
            return this.pos >= this.string.length
          }),
            (Ce.prototype.sol = function () {
              return this.pos == this.lineStart
            }),
            (Ce.prototype.peek = function () {
              return this.string.charAt(this.pos) || void 0
            }),
            (Ce.prototype.next = function () {
              if (this.pos < this.string.length) return this.string.charAt(this.pos++)
            }),
            (Ce.prototype.eat = function (n) {
              var i = this.string.charAt(this.pos),
                a
              if ((typeof n == 'string' ? (a = i == n) : (a = i && (n.test ? n.test(i) : n(i))), a))
                return ++this.pos, i
            }),
            (Ce.prototype.eatWhile = function (n) {
              for (var i = this.pos; this.eat(n); );
              return this.pos > i
            }),
            (Ce.prototype.eatSpace = function () {
              for (var n = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos
              return this.pos > n
            }),
            (Ce.prototype.skipToEnd = function () {
              this.pos = this.string.length
            }),
            (Ce.prototype.skipTo = function (n) {
              var i = this.string.indexOf(n, this.pos)
              if (i > -1) return (this.pos = i), !0
            }),
            (Ce.prototype.backUp = function (n) {
              this.pos -= n
            }),
            (Ce.prototype.column = function () {
              return (
                this.lastColumnPos < this.start &&
                  ((this.lastColumnValue = U(
                    this.string,
                    this.start,
                    this.tabSize,
                    this.lastColumnPos,
                    this.lastColumnValue,
                  )),
                  (this.lastColumnPos = this.start)),
                this.lastColumnValue - (this.lineStart ? U(this.string, this.lineStart, this.tabSize) : 0)
              )
            }),
            (Ce.prototype.indentation = function () {
              return (
                U(this.string, null, this.tabSize) - (this.lineStart ? U(this.string, this.lineStart, this.tabSize) : 0)
              )
            }),
            (Ce.prototype.match = function (n, i, a) {
              if (typeof n == 'string') {
                var s = function (m) {
                    return a ? m.toLowerCase() : m
                  },
                  c = this.string.substr(this.pos, n.length)
                if (s(c) == s(n)) return i !== !1 && (this.pos += n.length), !0
              } else {
                var p = this.string.slice(this.pos).match(n)
                return p && p.index > 0 ? null : (p && i !== !1 && (this.pos += p[0].length), p)
              }
            }),
            (Ce.prototype.current = function () {
              return this.string.slice(this.start, this.pos)
            }),
            (Ce.prototype.hideFirstChars = function (n, i) {
              this.lineStart += n
              try {
                return i()
              } finally {
                this.lineStart -= n
              }
            }),
            (Ce.prototype.lookAhead = function (n) {
              var i = this.lineOracle
              return i && i.lookAhead(n)
            }),
            (Ce.prototype.baseToken = function () {
              var n = this.lineOracle
              return n && n.baseToken(this.pos)
            })
          function Lt(n, i) {
            if (((i -= n.first), i < 0 || i >= n.size))
              throw new Error('There is no line ' + (i + n.first) + ' in the document.')
            for (var a = n; !a.lines; )
              for (var s = 0; ; ++s) {
                var c = a.children[s],
                  p = c.chunkSize()
                if (i < p) {
                  a = c
                  break
                }
                i -= p
              }
            return a.lines[i]
          }
          function kr(n, i, a) {
            var s = [],
              c = i.line
            return (
              n.iter(i.line, a.line + 1, function (p) {
                var m = p.text
                c == a.line && (m = m.slice(0, a.ch)), c == i.line && (m = m.slice(i.ch)), s.push(m), ++c
              }),
              s
            )
          }
          function uo(n, i, a) {
            var s = []
            return (
              n.iter(i, a, function (c) {
                s.push(c.text)
              }),
              s
            )
          }
          function qn(n, i) {
            var a = i - n.height
            if (a) for (var s = n; s; s = s.parent) s.height += a
          }
          function le(n) {
            if (n.parent == null) return null
            for (var i = n.parent, a = it(i.lines, n), s = i.parent; s; i = s, s = s.parent)
              for (var c = 0; s.children[c] != i; ++c) a += s.children[c].chunkSize()
            return a + i.first
          }
          function ar(n, i) {
            var a = n.first
            t: do {
              for (var s = 0; s < n.children.length; ++s) {
                var c = n.children[s],
                  p = c.height
                if (i < p) {
                  n = c
                  continue t
                }
                ;(i -= p), (a += c.chunkSize())
              }
              return a
            } while (!n.lines)
            for (var m = 0; m < n.lines.length; ++m) {
              var y = n.lines[m],
                w = y.height
              if (i < w) break
              i -= w
            }
            return a + m
          }
          function C(n, i) {
            return i >= n.first && i < n.first + n.size
          }
          function D(n, i) {
            return String(n.lineNumberFormatter(i + n.firstLineNumber))
          }
          function z(n, i, a) {
            if ((a === void 0 && (a = null), !(this instanceof z))) return new z(n, i, a)
            ;(this.line = n), (this.ch = i), (this.sticky = a)
          }
          function Y(n, i) {
            return n.line - i.line || n.ch - i.ch
          }
          function Ht(n, i) {
            return n.sticky == i.sticky && Y(n, i) == 0
          }
          function Xt(n) {
            return z(n.line, n.ch)
          }
          function oe(n, i) {
            return Y(n, i) < 0 ? i : n
          }
          function $e(n, i) {
            return Y(n, i) < 0 ? n : i
          }
          function Pn(n, i) {
            return Math.max(n.first, Math.min(i, n.first + n.size - 1))
          }
          function Bt(n, i) {
            if (i.line < n.first) return z(n.first, 0)
            var a = n.first + n.size - 1
            return i.line > a ? z(a, Lt(n, a).text.length) : Nb(i, Lt(n, i.line).text.length)
          }
          function Nb(n, i) {
            var a = n.ch
            return a == null || a > i ? z(n.line, i) : a < 0 ? z(n.line, 0) : n
          }
          function Jh(n, i) {
            for (var a = [], s = 0; s < i.length; s++) a[s] = Bt(n, i[s])
            return a
          }
          var Fa = function (n, i) {
              ;(this.state = n), (this.lookAhead = i)
            },
            lr = function (n, i, a, s) {
              ;(this.state = i),
                (this.doc = n),
                (this.line = a),
                (this.maxLookAhead = s || 0),
                (this.baseTokens = null),
                (this.baseTokenPos = 1)
            }
          ;(lr.prototype.lookAhead = function (n) {
            var i = this.doc.getLine(this.line + n)
            return i != null && n > this.maxLookAhead && (this.maxLookAhead = n), i
          }),
            (lr.prototype.baseToken = function (n) {
              if (!this.baseTokens) return null
              for (; this.baseTokens[this.baseTokenPos] <= n; ) this.baseTokenPos += 2
              var i = this.baseTokens[this.baseTokenPos + 1]
              return { type: i && i.replace(/( |^)overlay .*/, ''), size: this.baseTokens[this.baseTokenPos] - n }
            }),
            (lr.prototype.nextLine = function () {
              this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
            }),
            (lr.fromSaved = function (n, i, a) {
              return i instanceof Fa ? new lr(n, Sr(n.mode, i.state), a, i.lookAhead) : new lr(n, Sr(n.mode, i), a)
            }),
            (lr.prototype.save = function (n) {
              var i = n !== !1 ? Sr(this.doc.mode, this.state) : this.state
              return this.maxLookAhead > 0 ? new Fa(i, this.maxLookAhead) : i
            })
          function Qh(n, i, a, s) {
            var c = [n.state.modeGen],
              p = {}
            od(
              n,
              i.text,
              n.doc.mode,
              a,
              function (_, P) {
                return c.push(_, P)
              },
              p,
              s,
            )
            for (
              var m = a.state,
                y = function (_) {
                  a.baseTokens = c
                  var P = n.state.overlays[_],
                    $ = 1,
                    j = 0
                  ;(a.state = !0),
                    od(
                      n,
                      i.text,
                      P.mode,
                      a,
                      function (q, Z) {
                        for (var rt = $; j < q; ) {
                          var dt = c[$]
                          dt > q && c.splice($, 1, q, c[$ + 1], dt), ($ += 2), (j = Math.min(q, dt))
                        }
                        if (Z)
                          if (P.opaque) c.splice(rt, $ - rt, q, 'overlay ' + Z), ($ = rt + 2)
                          else
                            for (; rt < $; rt += 2) {
                              var vt = c[rt + 1]
                              c[rt + 1] = (vt ? vt + ' ' : '') + 'overlay ' + Z
                            }
                      },
                      p,
                    ),
                    (a.state = m),
                    (a.baseTokens = null),
                    (a.baseTokenPos = 1)
                },
                w = 0;
              w < n.state.overlays.length;
              ++w
            )
              y(w)
            return { styles: c, classes: p.bgClass || p.textClass ? p : null }
          }
          function td(n, i, a) {
            if (!i.styles || i.styles[0] != n.state.modeGen) {
              var s = vs(n, le(i)),
                c = i.text.length > n.options.maxHighlightLength && Sr(n.doc.mode, s.state),
                p = Qh(n, i, s)
              c && (s.state = c),
                (i.stateAfter = s.save(!c)),
                (i.styles = p.styles),
                p.classes ? (i.styleClasses = p.classes) : i.styleClasses && (i.styleClasses = null),
                a === n.doc.highlightFrontier &&
                  (n.doc.modeFrontier = Math.max(n.doc.modeFrontier, ++n.doc.highlightFrontier))
            }
            return i.styles
          }
          function vs(n, i, a) {
            var s = n.doc,
              c = n.display
            if (!s.mode.startState) return new lr(s, !0, i)
            var p = Pb(n, i, a),
              m = p > s.first && Lt(s, p - 1).stateAfter,
              y = m ? lr.fromSaved(s, m, p) : new lr(s, gs(s.mode), p)
            return (
              s.iter(p, i, function (w) {
                Bc(n, w.text, y)
                var _ = y.line
                ;(w.stateAfter = _ == i - 1 || _ % 5 == 0 || (_ >= c.viewFrom && _ < c.viewTo) ? y.save() : null),
                  y.nextLine()
              }),
              a && (s.modeFrontier = y.line),
              y
            )
          }
          function Bc(n, i, a, s) {
            var c = n.doc.mode,
              p = new Ce(i, n.options.tabSize, a)
            for (p.start = p.pos = s || 0, i == '' && ed(c, a.state); !p.eol(); ) Wc(c, p, a.state), (p.start = p.pos)
          }
          function ed(n, i) {
            if (n.blankLine) return n.blankLine(i)
            if (n.innerMode) {
              var a = Jr(n, i)
              if (a.mode.blankLine) return a.mode.blankLine(a.state)
            }
          }
          function Wc(n, i, a, s) {
            for (var c = 0; c < 10; c++) {
              s && (s[0] = Jr(n, a).mode)
              var p = n.token(i, a)
              if (i.pos > i.start) return p
            }
            throw new Error('Mode ' + n.name + ' failed to advance stream.')
          }
          var nd = function (n, i, a) {
            ;(this.start = n.start),
              (this.end = n.pos),
              (this.string = n.current()),
              (this.type = i || null),
              (this.state = a)
          }
          function rd(n, i, a, s) {
            var c = n.doc,
              p = c.mode,
              m
            i = Bt(c, i)
            var y = Lt(c, i.line),
              w = vs(n, i.line, a),
              _ = new Ce(y.text, n.options.tabSize, w),
              P
            for (s && (P = []); (s || _.pos < i.ch) && !_.eol(); )
              (_.start = _.pos), (m = Wc(p, _, w.state)), s && P.push(new nd(_, m, Sr(c.mode, w.state)))
            return s ? P : new nd(_, m, w.state)
          }
          function id(n, i) {
            if (n)
              for (;;) {
                var a = n.match(/(?:^|\s+)line-(background-)?(\S+)/)
                if (!a) break
                n = n.slice(0, a.index) + n.slice(a.index + a[0].length)
                var s = a[1] ? 'bgClass' : 'textClass'
                i[s] == null
                  ? (i[s] = a[2])
                  : new RegExp('(?:^|\\s)' + a[2] + '(?:$|\\s)').test(i[s]) || (i[s] += ' ' + a[2])
              }
            return n
          }
          function od(n, i, a, s, c, p, m) {
            var y = a.flattenSpans
            y == null && (y = n.options.flattenSpans)
            var w = 0,
              _ = null,
              P = new Ce(i, n.options.tabSize, s),
              $,
              j = n.options.addModeClass && [null]
            for (i == '' && id(ed(a, s.state), p); !P.eol(); ) {
              if (
                (P.pos > n.options.maxHighlightLength
                  ? ((y = !1), m && Bc(n, i, s, P.pos), (P.pos = i.length), ($ = null))
                  : ($ = id(Wc(a, P, s.state, j), p)),
                j)
              ) {
                var q = j[0].name
                q && ($ = 'm-' + ($ ? q + ' ' + $ : q))
              }
              if (!y || _ != $) {
                for (; w < P.start; ) (w = Math.min(P.start, w + 5e3)), c(w, _)
                _ = $
              }
              P.start = P.pos
            }
            for (; w < P.pos; ) {
              var Z = Math.min(P.pos, w + 5e3)
              c(Z, _), (w = Z)
            }
          }
          function Pb(n, i, a) {
            for (var s, c, p = n.doc, m = a ? -1 : i - (n.doc.mode.innerMode ? 1e3 : 100), y = i; y > m; --y) {
              if (y <= p.first) return p.first
              var w = Lt(p, y - 1),
                _ = w.stateAfter
              if (_ && (!a || y + (_ instanceof Fa ? _.lookAhead : 0) <= p.modeFrontier)) return y
              var P = U(w.text, null, n.options.tabSize)
              ;(c == null || s > P) && ((c = y - 1), (s = P))
            }
            return c
          }
          function Ob(n, i) {
            if (((n.modeFrontier = Math.min(n.modeFrontier, i)), !(n.highlightFrontier < i - 10))) {
              for (var a = n.first, s = i - 1; s > a; s--) {
                var c = Lt(n, s).stateAfter
                if (c && (!(c instanceof Fa) || s + c.lookAhead < i)) {
                  a = s + 1
                  break
                }
              }
              n.highlightFrontier = Math.min(n.highlightFrontier, a)
            }
          }
          var sd = !1,
            Cr = !1
          function $b() {
            sd = !0
          }
          function Db() {
            Cr = !0
          }
          function qa(n, i, a) {
            ;(this.marker = n), (this.from = i), (this.to = a)
          }
          function ms(n, i) {
            if (n)
              for (var a = 0; a < n.length; ++a) {
                var s = n[a]
                if (s.marker == i) return s
              }
          }
          function Rb(n, i) {
            for (var a, s = 0; s < n.length; ++s) n[s] != i && (a || (a = [])).push(n[s])
            return a
          }
          function zb(n, i, a) {
            var s = a && window.WeakSet && (a.markedSpans || (a.markedSpans = new WeakSet()))
            s && n.markedSpans && s.has(n.markedSpans)
              ? n.markedSpans.push(i)
              : ((n.markedSpans = n.markedSpans ? n.markedSpans.concat([i]) : [i]), s && s.add(n.markedSpans)),
              i.marker.attachLine(n)
          }
          function Ib(n, i, a) {
            var s
            if (n)
              for (var c = 0; c < n.length; ++c) {
                var p = n[c],
                  m = p.marker,
                  y = p.from == null || (m.inclusiveLeft ? p.from <= i : p.from < i)
                if (y || (p.from == i && m.type == 'bookmark' && (!a || !p.marker.insertLeft))) {
                  var w = p.to == null || (m.inclusiveRight ? p.to >= i : p.to > i)
                  ;(s || (s = [])).push(new qa(m, p.from, w ? null : p.to))
                }
              }
            return s
          }
          function Fb(n, i, a) {
            var s
            if (n)
              for (var c = 0; c < n.length; ++c) {
                var p = n[c],
                  m = p.marker,
                  y = p.to == null || (m.inclusiveRight ? p.to >= i : p.to > i)
                if (y || (p.from == i && m.type == 'bookmark' && (!a || p.marker.insertLeft))) {
                  var w = p.from == null || (m.inclusiveLeft ? p.from <= i : p.from < i)
                  ;(s || (s = [])).push(new qa(m, w ? null : p.from - i, p.to == null ? null : p.to - i))
                }
              }
            return s
          }
          function Uc(n, i) {
            if (i.full) return null
            var a = C(n, i.from.line) && Lt(n, i.from.line).markedSpans,
              s = C(n, i.to.line) && Lt(n, i.to.line).markedSpans
            if (!a && !s) return null
            var c = i.from.ch,
              p = i.to.ch,
              m = Y(i.from, i.to) == 0,
              y = Ib(a, c, m),
              w = Fb(s, p, m),
              _ = i.text.length == 1,
              P = lt(i.text).length + (_ ? c : 0)
            if (y)
              for (var $ = 0; $ < y.length; ++$) {
                var j = y[$]
                if (j.to == null) {
                  var q = ms(w, j.marker)
                  q ? _ && (j.to = q.to == null ? null : q.to + P) : (j.to = c)
                }
              }
            if (w)
              for (var Z = 0; Z < w.length; ++Z) {
                var rt = w[Z]
                if ((rt.to != null && (rt.to += P), rt.from == null)) {
                  var dt = ms(y, rt.marker)
                  dt || ((rt.from = P), _ && (y || (y = [])).push(rt))
                } else (rt.from += P), _ && (y || (y = [])).push(rt)
              }
            y && (y = ad(y)), w && w != y && (w = ad(w))
            var vt = [y]
            if (!_) {
              var St = i.text.length - 2,
                mt
              if (St > 0 && y)
                for (var Ct = 0; Ct < y.length; ++Ct)
                  y[Ct].to == null && (mt || (mt = [])).push(new qa(y[Ct].marker, null, null))
              for (var Dt = 0; Dt < St; ++Dt) vt.push(mt)
              vt.push(w)
            }
            return vt
          }
          function ad(n) {
            for (var i = 0; i < n.length; ++i) {
              var a = n[i]
              a.from != null && a.from == a.to && a.marker.clearWhenEmpty !== !1 && n.splice(i--, 1)
            }
            return n.length ? n : null
          }
          function qb(n, i, a) {
            var s = null
            if (
              (n.iter(i.line, a.line + 1, function (q) {
                if (q.markedSpans)
                  for (var Z = 0; Z < q.markedSpans.length; ++Z) {
                    var rt = q.markedSpans[Z].marker
                    rt.readOnly && (!s || it(s, rt) == -1) && (s || (s = [])).push(rt)
                  }
              }),
              !s)
            )
              return null
            for (var c = [{ from: i, to: a }], p = 0; p < s.length; ++p)
              for (var m = s[p], y = m.find(0), w = 0; w < c.length; ++w) {
                var _ = c[w]
                if (!(Y(_.to, y.from) < 0 || Y(_.from, y.to) > 0)) {
                  var P = [w, 1],
                    $ = Y(_.from, y.from),
                    j = Y(_.to, y.to)
                  ;($ < 0 || (!m.inclusiveLeft && !$)) && P.push({ from: _.from, to: y.from }),
                    (j > 0 || (!m.inclusiveRight && !j)) && P.push({ from: y.to, to: _.to }),
                    c.splice.apply(c, P),
                    (w += P.length - 3)
                }
              }
            return c
          }
          function ld(n) {
            var i = n.markedSpans
            if (i) {
              for (var a = 0; a < i.length; ++a) i[a].marker.detachLine(n)
              n.markedSpans = null
            }
          }
          function cd(n, i) {
            if (i) {
              for (var a = 0; a < i.length; ++a) i[a].marker.attachLine(n)
              n.markedSpans = i
            }
          }
          function Ha(n) {
            return n.inclusiveLeft ? -1 : 0
          }
          function Ba(n) {
            return n.inclusiveRight ? 1 : 0
          }
          function jc(n, i) {
            var a = n.lines.length - i.lines.length
            if (a != 0) return a
            var s = n.find(),
              c = i.find(),
              p = Y(s.from, c.from) || Ha(n) - Ha(i)
            if (p) return -p
            var m = Y(s.to, c.to) || Ba(n) - Ba(i)
            return m || i.id - n.id
          }
          function ud(n, i) {
            var a = Cr && n.markedSpans,
              s
            if (a)
              for (var c = void 0, p = 0; p < a.length; ++p)
                (c = a[p]),
                  c.marker.collapsed && (i ? c.from : c.to) == null && (!s || jc(s, c.marker) < 0) && (s = c.marker)
            return s
          }
          function fd(n) {
            return ud(n, !0)
          }
          function Wa(n) {
            return ud(n, !1)
          }
          function Hb(n, i) {
            var a = Cr && n.markedSpans,
              s
            if (a)
              for (var c = 0; c < a.length; ++c) {
                var p = a[c]
                p.marker.collapsed &&
                  (p.from == null || p.from < i) &&
                  (p.to == null || p.to > i) &&
                  (!s || jc(s, p.marker) < 0) &&
                  (s = p.marker)
              }
            return s
          }
          function hd(n, i, a, s, c) {
            var p = Lt(n, i),
              m = Cr && p.markedSpans
            if (m)
              for (var y = 0; y < m.length; ++y) {
                var w = m[y]
                if (w.marker.collapsed) {
                  var _ = w.marker.find(0),
                    P = Y(_.from, a) || Ha(w.marker) - Ha(c),
                    $ = Y(_.to, s) || Ba(w.marker) - Ba(c)
                  if (
                    !((P >= 0 && $ <= 0) || (P <= 0 && $ >= 0)) &&
                    ((P <= 0 && (w.marker.inclusiveRight && c.inclusiveLeft ? Y(_.to, a) >= 0 : Y(_.to, a) > 0)) ||
                      (P >= 0 && (w.marker.inclusiveRight && c.inclusiveLeft ? Y(_.from, s) <= 0 : Y(_.from, s) < 0)))
                  )
                    return !0
                }
              }
          }
          function jn(n) {
            for (var i; (i = fd(n)); ) n = i.find(-1, !0).line
            return n
          }
          function Bb(n) {
            for (var i; (i = Wa(n)); ) n = i.find(1, !0).line
            return n
          }
          function Wb(n) {
            for (var i, a; (i = Wa(n)); ) (n = i.find(1, !0).line), (a || (a = [])).push(n)
            return a
          }
          function Gc(n, i) {
            var a = Lt(n, i),
              s = jn(a)
            return a == s ? i : le(s)
          }
          function dd(n, i) {
            if (i > n.lastLine()) return i
            var a = Lt(n, i),
              s
            if (!Qr(n, a)) return i
            for (; (s = Wa(a)); ) a = s.find(1, !0).line
            return le(a) + 1
          }
          function Qr(n, i) {
            var a = Cr && i.markedSpans
            if (a) {
              for (var s = void 0, c = 0; c < a.length; ++c)
                if (((s = a[c]), !!s.marker.collapsed)) {
                  if (s.from == null) return !0
                  if (!s.marker.widgetNode && s.from == 0 && s.marker.inclusiveLeft && Vc(n, i, s)) return !0
                }
            }
          }
          function Vc(n, i, a) {
            if (a.to == null) {
              var s = a.marker.find(1, !0)
              return Vc(n, s.line, ms(s.line.markedSpans, a.marker))
            }
            if (a.marker.inclusiveRight && a.to == i.text.length) return !0
            for (var c = void 0, p = 0; p < i.markedSpans.length; ++p)
              if (
                ((c = i.markedSpans[p]),
                c.marker.collapsed &&
                  !c.marker.widgetNode &&
                  c.from == a.to &&
                  (c.to == null || c.to != a.from) &&
                  (c.marker.inclusiveLeft || a.marker.inclusiveRight) &&
                  Vc(n, i, c))
              )
                return !0
          }
          function Tr(n) {
            n = jn(n)
            for (var i = 0, a = n.parent, s = 0; s < a.lines.length; ++s) {
              var c = a.lines[s]
              if (c == n) break
              i += c.height
            }
            for (var p = a.parent; p; a = p, p = a.parent)
              for (var m = 0; m < p.children.length; ++m) {
                var y = p.children[m]
                if (y == a) break
                i += y.height
              }
            return i
          }
          function Ua(n) {
            if (n.height == 0) return 0
            for (var i = n.text.length, a, s = n; (a = fd(s)); ) {
              var c = a.find(0, !0)
              ;(s = c.from.line), (i += c.from.ch - c.to.ch)
            }
            for (s = n; (a = Wa(s)); ) {
              var p = a.find(0, !0)
              ;(i -= s.text.length - p.from.ch), (s = p.to.line), (i += s.text.length - p.to.ch)
            }
            return i
          }
          function Kc(n) {
            var i = n.display,
              a = n.doc
            ;(i.maxLine = Lt(a, a.first)),
              (i.maxLineLength = Ua(i.maxLine)),
              (i.maxLineChanged = !0),
              a.iter(function (s) {
                var c = Ua(s)
                c > i.maxLineLength && ((i.maxLineLength = c), (i.maxLine = s))
              })
          }
          var fo = function (n, i, a) {
            ;(this.text = n), cd(this, i), (this.height = a ? a(this) : 1)
          }
          ;(fo.prototype.lineNo = function () {
            return le(this)
          }),
            Qe(fo)
          function Ub(n, i, a, s) {
            ;(n.text = i),
              n.stateAfter && (n.stateAfter = null),
              n.styles && (n.styles = null),
              n.order != null && (n.order = null),
              ld(n),
              cd(n, a)
            var c = s ? s(n) : 1
            c != n.height && qn(n, c)
          }
          function jb(n) {
            ;(n.parent = null), ld(n)
          }
          var Gb = {},
            Vb = {}
          function pd(n, i) {
            if (!n || /^\s*$/.test(n)) return null
            var a = i.addModeClass ? Vb : Gb
            return a[n] || (a[n] = n.replace(/\S+/g, 'cm-$&'))
          }
          function gd(n, i) {
            var a = H('span', null, null, v ? 'padding-right: .1px' : null),
              s = {
                pre: H('pre', [a], 'CodeMirror-line'),
                content: a,
                col: 0,
                pos: 0,
                cm: n,
                trailingSpace: !1,
                splitSpaces: n.getOption('lineWrapping'),
              }
            i.measure = {}
            for (var c = 0; c <= (i.rest ? i.rest.length : 0); c++) {
              var p = c ? i.rest[c - 1] : i.line,
                m = void 0
              ;(s.pos = 0),
                (s.addToken = Xb),
                Da(n.display.measure) && (m = ye(p, n.doc.direction)) && (s.addToken = Zb(s.addToken, m)),
                (s.map = [])
              var y = i != n.display.externalMeasured && le(p)
              Jb(p, s, td(n, p, y)),
                p.styleClasses &&
                  (p.styleClasses.bgClass && (s.bgClass = zt(p.styleClasses.bgClass, s.bgClass || '')),
                  p.styleClasses.textClass && (s.textClass = zt(p.styleClasses.textClass, s.textClass || ''))),
                s.map.length == 0 && s.map.push(0, 0, s.content.appendChild(Hc(n.display.measure))),
                c == 0
                  ? ((i.measure.map = s.map), (i.measure.cache = {}))
                  : ((i.measure.maps || (i.measure.maps = [])).push(s.map),
                    (i.measure.caches || (i.measure.caches = [])).push({}))
            }
            if (v) {
              var w = s.content.lastChild
              ;(/\bcm-tab\b/.test(w.className) || (w.querySelector && w.querySelector('.cm-tab'))) &&
                (s.content.className = 'cm-tab-wrap-hack')
            }
            return (
              me(n, 'renderLine', n, i.line, s.pre),
              s.pre.className && (s.textClass = zt(s.pre.className, s.textClass || '')),
              s
            )
          }
          function Kb(n) {
            var i = k('span', '•', 'cm-invalidchar')
            return (i.title = '\\u' + n.charCodeAt(0).toString(16)), i.setAttribute('aria-label', i.title), i
          }
          function Xb(n, i, a, s, c, p, m) {
            if (i) {
              var y = n.splitSpaces ? Yb(i, n.trailingSpace) : i,
                w = n.cm.state.specialChars,
                _ = !1,
                P
              if (!w.test(i))
                (n.col += i.length),
                  (P = document.createTextNode(y)),
                  n.map.push(n.pos, n.pos + i.length, P),
                  d && g < 9 && (_ = !0),
                  (n.pos += i.length)
              else {
                P = document.createDocumentFragment()
                for (var $ = 0; ; ) {
                  w.lastIndex = $
                  var j = w.exec(i),
                    q = j ? j.index - $ : i.length - $
                  if (q) {
                    var Z = document.createTextNode(y.slice($, $ + q))
                    d && g < 9 ? P.appendChild(k('span', [Z])) : P.appendChild(Z),
                      n.map.push(n.pos, n.pos + q, Z),
                      (n.col += q),
                      (n.pos += q)
                  }
                  if (!j) break
                  $ += q + 1
                  var rt = void 0
                  if (j[0] == '	') {
                    var dt = n.cm.options.tabSize,
                      vt = dt - (n.col % dt)
                    ;(rt = P.appendChild(k('span', at(vt), 'cm-tab'))),
                      rt.setAttribute('role', 'presentation'),
                      rt.setAttribute('cm-text', '	'),
                      (n.col += vt)
                  } else
                    j[0] == '\r' ||
                    j[0] ==
                      `
`
                      ? ((rt = P.appendChild(k('span', j[0] == '\r' ? '␍' : '␤', 'cm-invalidchar'))),
                        rt.setAttribute('cm-text', j[0]),
                        (n.col += 1))
                      : ((rt = n.cm.options.specialCharPlaceholder(j[0])),
                        rt.setAttribute('cm-text', j[0]),
                        d && g < 9 ? P.appendChild(k('span', [rt])) : P.appendChild(rt),
                        (n.col += 1))
                  n.map.push(n.pos, n.pos + 1, rt), n.pos++
                }
              }
              if (((n.trailingSpace = y.charCodeAt(i.length - 1) == 32), a || s || c || _ || p || m)) {
                var St = a || ''
                s && (St += s), c && (St += c)
                var mt = k('span', [P], St, p)
                if (m)
                  for (var Ct in m) m.hasOwnProperty(Ct) && Ct != 'style' && Ct != 'class' && mt.setAttribute(Ct, m[Ct])
                return n.content.appendChild(mt)
              }
              n.content.appendChild(P)
            }
          }
          function Yb(n, i) {
            if (n.length > 1 && !/  /.test(n)) return n
            for (var a = i, s = '', c = 0; c < n.length; c++) {
              var p = n.charAt(c)
              p == ' ' && a && (c == n.length - 1 || n.charCodeAt(c + 1) == 32) && (p = ' '), (s += p), (a = p == ' ')
            }
            return s
          }
          function Zb(n, i) {
            return function (a, s, c, p, m, y, w) {
              c = c ? c + ' cm-force-border' : 'cm-force-border'
              for (var _ = a.pos, P = _ + s.length; ; ) {
                for (var $ = void 0, j = 0; j < i.length && (($ = i[j]), !($.to > _ && $.from <= _)); j++);
                if ($.to >= P) return n(a, s, c, p, m, y, w)
                n(a, s.slice(0, $.to - _), c, p, null, y, w), (p = null), (s = s.slice($.to - _)), (_ = $.to)
              }
            }
          }
          function vd(n, i, a, s) {
            var c = !s && a.widgetNode
            c && n.map.push(n.pos, n.pos + i, c),
              !s &&
                n.cm.display.input.needsContentAttribute &&
                (c || (c = n.content.appendChild(document.createElement('span'))), c.setAttribute('cm-marker', a.id)),
              c && (n.cm.display.input.setUneditable(c), n.content.appendChild(c)),
              (n.pos += i),
              (n.trailingSpace = !1)
          }
          function Jb(n, i, a) {
            var s = n.markedSpans,
              c = n.text,
              p = 0
            if (!s) {
              for (var m = 1; m < a.length; m += 2) i.addToken(i, c.slice(p, (p = a[m])), pd(a[m + 1], i.cm.options))
              return
            }
            for (var y = c.length, w = 0, _ = 1, P = '', $, j, q = 0, Z, rt, dt, vt, St; ; ) {
              if (q == w) {
                ;(Z = rt = dt = j = ''), (St = null), (vt = null), (q = 1 / 0)
                for (var mt = [], Ct = void 0, Dt = 0; Dt < s.length; ++Dt) {
                  var Pt = s[Dt],
                    Ut = Pt.marker
                  if (Ut.type == 'bookmark' && Pt.from == w && Ut.widgetNode) mt.push(Ut)
                  else if (
                    Pt.from <= w &&
                    (Pt.to == null || Pt.to > w || (Ut.collapsed && Pt.to == w && Pt.from == w))
                  ) {
                    if (
                      (Pt.to != null && Pt.to != w && q > Pt.to && ((q = Pt.to), (rt = '')),
                      Ut.className && (Z += ' ' + Ut.className),
                      Ut.css && (j = (j ? j + ';' : '') + Ut.css),
                      Ut.startStyle && Pt.from == w && (dt += ' ' + Ut.startStyle),
                      Ut.endStyle && Pt.to == q && (Ct || (Ct = [])).push(Ut.endStyle, Pt.to),
                      Ut.title && ((St || (St = {})).title = Ut.title),
                      Ut.attributes)
                    )
                      for (var ge in Ut.attributes) (St || (St = {}))[ge] = Ut.attributes[ge]
                    Ut.collapsed && (!vt || jc(vt.marker, Ut) < 0) && (vt = Pt)
                  } else Pt.from > w && q > Pt.from && (q = Pt.from)
                }
                if (Ct) for (var He = 0; He < Ct.length; He += 2) Ct[He + 1] == q && (rt += ' ' + Ct[He])
                if (!vt || vt.from == w) for (var Se = 0; Se < mt.length; ++Se) vd(i, 0, mt[Se])
                if (vt && (vt.from || 0) == w) {
                  if ((vd(i, (vt.to == null ? y + 1 : vt.to) - w, vt.marker, vt.from == null), vt.to == null)) return
                  vt.to == w && (vt = !1)
                }
              }
              if (w >= y) break
              for (var xn = Math.min(y, q); ; ) {
                if (P) {
                  var cn = w + P.length
                  if (!vt) {
                    var Me = cn > xn ? P.slice(0, xn - w) : P
                    i.addToken(i, Me, $ ? $ + Z : Z, dt, w + Me.length == q ? rt : '', j, St)
                  }
                  if (cn >= xn) {
                    ;(P = P.slice(xn - w)), (w = xn)
                    break
                  }
                  ;(w = cn), (dt = '')
                }
                ;(P = c.slice(p, (p = a[_++]))), ($ = pd(a[_++], i.cm.options))
              }
            }
          }
          function md(n, i, a) {
            ;(this.line = i),
              (this.rest = Wb(i)),
              (this.size = this.rest ? le(lt(this.rest)) - a + 1 : 1),
              (this.node = this.text = null),
              (this.hidden = Qr(n, i))
          }
          function ja(n, i, a) {
            for (var s = [], c, p = i; p < a; p = c) {
              var m = new md(n.doc, Lt(n.doc, p), p)
              ;(c = p + m.size), s.push(m)
            }
            return s
          }
          var ho = null
          function Qb(n) {
            ho ? ho.ops.push(n) : (n.ownsGroup = ho = { ops: [n], delayedCallbacks: [] })
          }
          function tw(n) {
            var i = n.delayedCallbacks,
              a = 0
            do {
              for (; a < i.length; a++) i[a].call(null)
              for (var s = 0; s < n.ops.length; s++) {
                var c = n.ops[s]
                if (c.cursorActivityHandlers)
                  for (; c.cursorActivityCalled < c.cursorActivityHandlers.length; )
                    c.cursorActivityHandlers[c.cursorActivityCalled++].call(null, c.cm)
              }
            } while (a < i.length)
          }
          function ew(n, i) {
            var a = n.ownsGroup
            if (a)
              try {
                tw(a)
              } finally {
                ;(ho = null), i(a)
              }
          }
          var ys = null
          function Ie(n, i) {
            var a = fs(n, i)
            if (a.length) {
              var s = Array.prototype.slice.call(arguments, 2),
                c
              ho ? (c = ho.delayedCallbacks) : ys ? (c = ys) : ((c = ys = []), setTimeout(nw, 0))
              for (
                var p = function (y) {
                    c.push(function () {
                      return a[y].apply(null, s)
                    })
                  },
                  m = 0;
                m < a.length;
                ++m
              )
                p(m)
            }
          }
          function nw() {
            var n = ys
            ys = null
            for (var i = 0; i < n.length; ++i) n[i]()
          }
          function yd(n, i, a, s) {
            for (var c = 0; c < i.changes.length; c++) {
              var p = i.changes[c]
              p == 'text'
                ? iw(n, i)
                : p == 'gutter'
                  ? wd(n, i, a, s)
                  : p == 'class'
                    ? Xc(n, i)
                    : p == 'widget' && ow(n, i, s)
            }
            i.changes = null
          }
          function bs(n) {
            return (
              n.node == n.text &&
                ((n.node = k('div', null, null, 'position: relative')),
                n.text.parentNode && n.text.parentNode.replaceChild(n.node, n.text),
                n.node.appendChild(n.text),
                d && g < 8 && (n.node.style.zIndex = 2)),
              n.node
            )
          }
          function rw(n, i) {
            var a = i.bgClass ? i.bgClass + ' ' + (i.line.bgClass || '') : i.line.bgClass
            if ((a && (a += ' CodeMirror-linebackground'), i.background))
              a
                ? (i.background.className = a)
                : (i.background.parentNode.removeChild(i.background), (i.background = null))
            else if (a) {
              var s = bs(i)
              ;(i.background = s.insertBefore(k('div', null, a), s.firstChild)),
                n.display.input.setUneditable(i.background)
            }
          }
          function bd(n, i) {
            var a = n.display.externalMeasured
            return a && a.line == i.line
              ? ((n.display.externalMeasured = null), (i.measure = a.measure), a.built)
              : gd(n, i)
          }
          function iw(n, i) {
            var a = i.text.className,
              s = bd(n, i)
            i.text == i.node && (i.node = s.pre),
              i.text.parentNode.replaceChild(s.pre, i.text),
              (i.text = s.pre),
              s.bgClass != i.bgClass || s.textClass != i.textClass
                ? ((i.bgClass = s.bgClass), (i.textClass = s.textClass), Xc(n, i))
                : a && (i.text.className = a)
          }
          function Xc(n, i) {
            rw(n, i),
              i.line.wrapClass ? (bs(i).className = i.line.wrapClass) : i.node != i.text && (i.node.className = '')
            var a = i.textClass ? i.textClass + ' ' + (i.line.textClass || '') : i.line.textClass
            i.text.className = a || ''
          }
          function wd(n, i, a, s) {
            if (
              (i.gutter && (i.node.removeChild(i.gutter), (i.gutter = null)),
              i.gutterBackground && (i.node.removeChild(i.gutterBackground), (i.gutterBackground = null)),
              i.line.gutterClass)
            ) {
              var c = bs(i)
              ;(i.gutterBackground = k(
                'div',
                null,
                'CodeMirror-gutter-background ' + i.line.gutterClass,
                'left: ' +
                  (n.options.fixedGutter ? s.fixedPos : -s.gutterTotalWidth) +
                  'px; width: ' +
                  s.gutterTotalWidth +
                  'px',
              )),
                n.display.input.setUneditable(i.gutterBackground),
                c.insertBefore(i.gutterBackground, i.text)
            }
            var p = i.line.gutterMarkers
            if (n.options.lineNumbers || p) {
              var m = bs(i),
                y = (i.gutter = k(
                  'div',
                  null,
                  'CodeMirror-gutter-wrapper',
                  'left: ' + (n.options.fixedGutter ? s.fixedPos : -s.gutterTotalWidth) + 'px',
                ))
              if (
                (y.setAttribute('aria-hidden', 'true'),
                n.display.input.setUneditable(y),
                m.insertBefore(y, i.text),
                i.line.gutterClass && (y.className += ' ' + i.line.gutterClass),
                n.options.lineNumbers &&
                  (!p || !p['CodeMirror-linenumbers']) &&
                  (i.lineNumber = y.appendChild(
                    k(
                      'div',
                      D(n.options, a),
                      'CodeMirror-linenumber CodeMirror-gutter-elt',
                      'left: ' +
                        s.gutterLeft['CodeMirror-linenumbers'] +
                        'px; width: ' +
                        n.display.lineNumInnerWidth +
                        'px',
                    ),
                  )),
                p)
              )
                for (var w = 0; w < n.display.gutterSpecs.length; ++w) {
                  var _ = n.display.gutterSpecs[w].className,
                    P = p.hasOwnProperty(_) && p[_]
                  P &&
                    y.appendChild(
                      k(
                        'div',
                        [P],
                        'CodeMirror-gutter-elt',
                        'left: ' + s.gutterLeft[_] + 'px; width: ' + s.gutterWidth[_] + 'px',
                      ),
                    )
                }
            }
          }
          function ow(n, i, a) {
            i.alignable && (i.alignable = null)
            for (var s = kt('CodeMirror-linewidget'), c = i.node.firstChild, p = void 0; c; c = p)
              (p = c.nextSibling), s.test(c.className) && i.node.removeChild(c)
            xd(n, i, a)
          }
          function sw(n, i, a, s) {
            var c = bd(n, i)
            return (
              (i.text = i.node = c.pre),
              c.bgClass && (i.bgClass = c.bgClass),
              c.textClass && (i.textClass = c.textClass),
              Xc(n, i),
              wd(n, i, a, s),
              xd(n, i, s),
              i.node
            )
          }
          function xd(n, i, a) {
            if ((_d(n, i.line, i, a, !0), i.rest)) for (var s = 0; s < i.rest.length; s++) _d(n, i.rest[s], i, a, !1)
          }
          function _d(n, i, a, s, c) {
            if (i.widgets)
              for (var p = bs(a), m = 0, y = i.widgets; m < y.length; ++m) {
                var w = y[m],
                  _ = k('div', [w.node], 'CodeMirror-linewidget' + (w.className ? ' ' + w.className : ''))
                w.handleMouseEvents || _.setAttribute('cm-ignore-events', 'true'),
                  aw(w, _, a, s),
                  n.display.input.setUneditable(_),
                  c && w.above ? p.insertBefore(_, a.gutter || a.text) : p.appendChild(_),
                  Ie(w, 'redraw')
              }
          }
          function aw(n, i, a, s) {
            if (n.noHScroll) {
              ;(a.alignable || (a.alignable = [])).push(i)
              var c = s.wrapperWidth
              ;(i.style.left = s.fixedPos + 'px'),
                n.coverGutter || ((c -= s.gutterTotalWidth), (i.style.paddingLeft = s.gutterTotalWidth + 'px')),
                (i.style.width = c + 'px')
            }
            n.coverGutter &&
              ((i.style.zIndex = 5),
              (i.style.position = 'relative'),
              n.noHScroll || (i.style.marginLeft = -s.gutterTotalWidth + 'px'))
          }
          function ws(n) {
            if (n.height != null) return n.height
            var i = n.doc.cm
            if (!i) return 0
            if (!J(document.body, n.node)) {
              var a = 'position: relative;'
              n.coverGutter && (a += 'margin-left: -' + i.display.gutters.offsetWidth + 'px;'),
                n.noHScroll && (a += 'width: ' + i.display.wrapper.clientWidth + 'px;'),
                R(i.display.measure, k('div', [n.node], null, a))
            }
            return (n.height = n.node.parentNode.offsetHeight)
          }
          function Er(n, i) {
            for (var a = sn(i); a != n.wrapper; a = a.parentNode)
              if (
                !a ||
                (a.nodeType == 1 && a.getAttribute('cm-ignore-events') == 'true') ||
                (a.parentNode == n.sizer && a != n.mover)
              )
                return !0
          }
          function Ga(n) {
            return n.lineSpace.offsetTop
          }
          function Yc(n) {
            return n.mover.offsetHeight - n.lineSpace.offsetHeight
          }
          function Sd(n) {
            if (n.cachedPaddingH) return n.cachedPaddingH
            var i = R(n.measure, k('pre', 'x', 'CodeMirror-line-like')),
              a = window.getComputedStyle ? window.getComputedStyle(i) : i.currentStyle,
              s = { left: parseInt(a.paddingLeft), right: parseInt(a.paddingRight) }
            return !isNaN(s.left) && !isNaN(s.right) && (n.cachedPaddingH = s), s
          }
          function cr(n) {
            return Mt - n.display.nativeBarWidth
          }
          function Ai(n) {
            return n.display.scroller.clientWidth - cr(n) - n.display.barWidth
          }
          function Zc(n) {
            return n.display.scroller.clientHeight - cr(n) - n.display.barHeight
          }
          function lw(n, i, a) {
            var s = n.options.lineWrapping,
              c = s && Ai(n)
            if (!i.measure.heights || (s && i.measure.width != c)) {
              var p = (i.measure.heights = [])
              if (s) {
                i.measure.width = c
                for (var m = i.text.firstChild.getClientRects(), y = 0; y < m.length - 1; y++) {
                  var w = m[y],
                    _ = m[y + 1]
                  Math.abs(w.bottom - _.bottom) > 2 && p.push((w.bottom + _.top) / 2 - a.top)
                }
              }
              p.push(a.bottom - a.top)
            }
          }
          function kd(n, i, a) {
            if (n.line == i) return { map: n.measure.map, cache: n.measure.cache }
            if (n.rest) {
              for (var s = 0; s < n.rest.length; s++)
                if (n.rest[s] == i) return { map: n.measure.maps[s], cache: n.measure.caches[s] }
              for (var c = 0; c < n.rest.length; c++)
                if (le(n.rest[c]) > a) return { map: n.measure.maps[c], cache: n.measure.caches[c], before: !0 }
            }
          }
          function cw(n, i) {
            i = jn(i)
            var a = le(i),
              s = (n.display.externalMeasured = new md(n.doc, i, a))
            s.lineN = a
            var c = (s.built = gd(n, s))
            return (s.text = c.pre), R(n.display.lineMeasure, c.pre), s
          }
          function Cd(n, i, a, s) {
            return ur(n, po(n, i), a, s)
          }
          function Jc(n, i) {
            if (i >= n.display.viewFrom && i < n.display.viewTo) return n.display.view[Pi(n, i)]
            var a = n.display.externalMeasured
            if (a && i >= a.lineN && i < a.lineN + a.size) return a
          }
          function po(n, i) {
            var a = le(i),
              s = Jc(n, a)
            s && !s.text ? (s = null) : s && s.changes && (yd(n, s, a, ru(n)), (n.curOp.forceUpdate = !0)),
              s || (s = cw(n, i))
            var c = kd(s, i, a)
            return { line: i, view: s, rect: null, map: c.map, cache: c.cache, before: c.before, hasHeights: !1 }
          }
          function ur(n, i, a, s, c) {
            i.before && (a = -1)
            var p = a + (s || ''),
              m
            return (
              i.cache.hasOwnProperty(p)
                ? (m = i.cache[p])
                : (i.rect || (i.rect = i.view.text.getBoundingClientRect()),
                  i.hasHeights || (lw(n, i.view, i.rect), (i.hasHeights = !0)),
                  (m = fw(n, i, a, s)),
                  m.bogus || (i.cache[p] = m)),
              { left: m.left, right: m.right, top: c ? m.rtop : m.top, bottom: c ? m.rbottom : m.bottom }
            )
          }
          var Td = { left: 0, right: 0, top: 0, bottom: 0 }
          function Ed(n, i, a) {
            for (var s, c, p, m, y, w, _ = 0; _ < n.length; _ += 3)
              if (
                ((y = n[_]),
                (w = n[_ + 1]),
                i < y
                  ? ((c = 0), (p = 1), (m = 'left'))
                  : i < w
                    ? ((c = i - y), (p = c + 1))
                    : (_ == n.length - 3 || (i == w && n[_ + 3] > i)) &&
                      ((p = w - y), (c = p - 1), i >= w && (m = 'right')),
                c != null)
              ) {
                if (
                  ((s = n[_ + 2]), y == w && a == (s.insertLeft ? 'left' : 'right') && (m = a), a == 'left' && c == 0)
                )
                  for (; _ && n[_ - 2] == n[_ - 3] && n[_ - 1].insertLeft; ) (s = n[(_ -= 3) + 2]), (m = 'left')
                if (a == 'right' && c == w - y)
                  for (; _ < n.length - 3 && n[_ + 3] == n[_ + 4] && !n[_ + 5].insertLeft; )
                    (s = n[(_ += 3) + 2]), (m = 'right')
                break
              }
            return { node: s, start: c, end: p, collapse: m, coverStart: y, coverEnd: w }
          }
          function uw(n, i) {
            var a = Td
            if (i == 'left') for (var s = 0; s < n.length && (a = n[s]).left == a.right; s++);
            else for (var c = n.length - 1; c >= 0 && (a = n[c]).left == a.right; c--);
            return a
          }
          function fw(n, i, a, s) {
            var c = Ed(i.map, a, s),
              p = c.node,
              m = c.start,
              y = c.end,
              w = c.collapse,
              _
            if (p.nodeType == 3) {
              for (var P = 0; P < 4; P++) {
                for (; m && ee(i.line.text.charAt(c.coverStart + m)); ) --m
                for (; c.coverStart + y < c.coverEnd && ee(i.line.text.charAt(c.coverStart + y)); ) ++y
                if (
                  (d && g < 9 && m == 0 && y == c.coverEnd - c.coverStart
                    ? (_ = p.parentNode.getBoundingClientRect())
                    : (_ = uw(W(p, m, y).getClientRects(), s)),
                  _.left || _.right || m == 0)
                )
                  break
                ;(y = m), (m = m - 1), (w = 'right')
              }
              d && g < 11 && (_ = hw(n.display.measure, _))
            } else {
              m > 0 && (w = s = 'right')
              var $
              n.options.lineWrapping && ($ = p.getClientRects()).length > 1
                ? (_ = $[s == 'right' ? $.length - 1 : 0])
                : (_ = p.getBoundingClientRect())
            }
            if (d && g < 9 && !m && (!_ || (!_.left && !_.right))) {
              var j = p.parentNode.getClientRects()[0]
              j ? (_ = { left: j.left, right: j.left + vo(n.display), top: j.top, bottom: j.bottom }) : (_ = Td)
            }
            for (
              var q = _.top - i.rect.top,
                Z = _.bottom - i.rect.top,
                rt = (q + Z) / 2,
                dt = i.view.measure.heights,
                vt = 0;
              vt < dt.length - 1 && !(rt < dt[vt]);
              vt++
            );
            var St = vt ? dt[vt - 1] : 0,
              mt = dt[vt],
              Ct = {
                left: (w == 'right' ? _.right : _.left) - i.rect.left,
                right: (w == 'left' ? _.left : _.right) - i.rect.left,
                top: St,
                bottom: mt,
              }
            return (
              !_.left && !_.right && (Ct.bogus = !0),
              n.options.singleCursorHeightPerLine || ((Ct.rtop = q), (Ct.rbottom = Z)),
              Ct
            )
          }
          function hw(n, i) {
            if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !Ra(n))
              return i
            var a = screen.logicalXDPI / screen.deviceXDPI,
              s = screen.logicalYDPI / screen.deviceYDPI
            return { left: i.left * a, right: i.right * a, top: i.top * s, bottom: i.bottom * s }
          }
          function Ld(n) {
            if (n.measure && ((n.measure.cache = {}), (n.measure.heights = null), n.rest))
              for (var i = 0; i < n.rest.length; i++) n.measure.caches[i] = {}
          }
          function Ad(n) {
            ;(n.display.externalMeasure = null), V(n.display.lineMeasure)
            for (var i = 0; i < n.display.view.length; i++) Ld(n.display.view[i])
          }
          function xs(n) {
            Ad(n),
              (n.display.cachedCharWidth = n.display.cachedTextHeight = n.display.cachedPaddingH = null),
              n.options.lineWrapping || (n.display.maxLineChanged = !0),
              (n.display.lineNumChars = null)
          }
          function Md(n) {
            return x && F
              ? -(n.body.getBoundingClientRect().left - parseInt(getComputedStyle(n.body).marginLeft))
              : n.defaultView.pageXOffset || (n.documentElement || n.body).scrollLeft
          }
          function Nd(n) {
            return x && F
              ? -(n.body.getBoundingClientRect().top - parseInt(getComputedStyle(n.body).marginTop))
              : n.defaultView.pageYOffset || (n.documentElement || n.body).scrollTop
          }
          function Qc(n) {
            var i = jn(n),
              a = i.widgets,
              s = 0
            if (a) for (var c = 0; c < a.length; ++c) a[c].above && (s += ws(a[c]))
            return s
          }
          function Va(n, i, a, s, c) {
            if (!c) {
              var p = Qc(i)
              ;(a.top += p), (a.bottom += p)
            }
            if (s == 'line') return a
            s || (s = 'local')
            var m = Tr(i)
            if ((s == 'local' ? (m += Ga(n.display)) : (m -= n.display.viewOffset), s == 'page' || s == 'window')) {
              var y = n.display.lineSpace.getBoundingClientRect()
              m += y.top + (s == 'window' ? 0 : Nd(Gt(n)))
              var w = y.left + (s == 'window' ? 0 : Md(Gt(n)))
              ;(a.left += w), (a.right += w)
            }
            return (a.top += m), (a.bottom += m), a
          }
          function Pd(n, i, a) {
            if (a == 'div') return i
            var s = i.left,
              c = i.top
            if (a == 'page') (s -= Md(Gt(n))), (c -= Nd(Gt(n)))
            else if (a == 'local' || !a) {
              var p = n.display.sizer.getBoundingClientRect()
              ;(s += p.left), (c += p.top)
            }
            var m = n.display.lineSpace.getBoundingClientRect()
            return { left: s - m.left, top: c - m.top }
          }
          function Ka(n, i, a, s, c) {
            return s || (s = Lt(n.doc, i.line)), Va(n, s, Cd(n, s, i.ch, c), a)
          }
          function Gn(n, i, a, s, c, p) {
            ;(s = s || Lt(n.doc, i.line)), c || (c = po(n, s))
            function m(Z, rt) {
              var dt = ur(n, c, Z, rt ? 'right' : 'left', p)
              return rt ? (dt.left = dt.right) : (dt.right = dt.left), Va(n, s, dt, a)
            }
            var y = ye(s, n.doc.direction),
              w = i.ch,
              _ = i.sticky
            if ((w >= s.text.length ? ((w = s.text.length), (_ = 'before')) : w <= 0 && ((w = 0), (_ = 'after')), !y))
              return m(_ == 'before' ? w - 1 : w, _ == 'before')
            function P(Z, rt, dt) {
              var vt = y[rt],
                St = vt.level == 1
              return m(dt ? Z - 1 : Z, St != dt)
            }
            var $ = We(y, w, _),
              j = Nn,
              q = P(w, $, _ == 'before')
            return j != null && (q.other = P(w, j, _ != 'before')), q
          }
          function Od(n, i) {
            var a = 0
            ;(i = Bt(n.doc, i)), n.options.lineWrapping || (a = vo(n.display) * i.ch)
            var s = Lt(n.doc, i.line),
              c = Tr(s) + Ga(n.display)
            return { left: a, right: a, top: c, bottom: c + s.height }
          }
          function tu(n, i, a, s, c) {
            var p = z(n, i, a)
            return (p.xRel = c), s && (p.outside = s), p
          }
          function eu(n, i, a) {
            var s = n.doc
            if (((a += n.display.viewOffset), a < 0)) return tu(s.first, 0, null, -1, -1)
            var c = ar(s, a),
              p = s.first + s.size - 1
            if (c > p) return tu(s.first + s.size - 1, Lt(s, p).text.length, null, 1, 1)
            i < 0 && (i = 0)
            for (var m = Lt(s, c); ; ) {
              var y = dw(n, m, c, i, a),
                w = Hb(m, y.ch + (y.xRel > 0 || y.outside > 0 ? 1 : 0))
              if (!w) return y
              var _ = w.find(1)
              if (_.line == c) return _
              m = Lt(s, (c = _.line))
            }
          }
          function $d(n, i, a, s) {
            s -= Qc(i)
            var c = i.text.length,
              p = Qt(
                function (m) {
                  return ur(n, a, m - 1).bottom <= s
                },
                c,
                0,
              )
            return (
              (c = Qt(
                function (m) {
                  return ur(n, a, m).top > s
                },
                p,
                c,
              )),
              { begin: p, end: c }
            )
          }
          function Dd(n, i, a, s) {
            a || (a = po(n, i))
            var c = Va(n, i, ur(n, a, s), 'line').top
            return $d(n, i, a, c)
          }
          function nu(n, i, a, s) {
            return n.bottom <= a ? !1 : n.top > a ? !0 : (s ? n.left : n.right) > i
          }
          function dw(n, i, a, s, c) {
            c -= Tr(i)
            var p = po(n, i),
              m = Qc(i),
              y = 0,
              w = i.text.length,
              _ = !0,
              P = ye(i, n.doc.direction)
            if (P) {
              var $ = (n.options.lineWrapping ? gw : pw)(n, i, a, p, P, s, c)
              ;(_ = $.level != 1), (y = _ ? $.from : $.to - 1), (w = _ ? $.to : $.from - 1)
            }
            var j = null,
              q = null,
              Z = Qt(
                function (Dt) {
                  var Pt = ur(n, p, Dt)
                  return (
                    (Pt.top += m),
                    (Pt.bottom += m),
                    nu(Pt, s, c, !1) ? (Pt.top <= c && Pt.left <= s && ((j = Dt), (q = Pt)), !0) : !1
                  )
                },
                y,
                w,
              ),
              rt,
              dt,
              vt = !1
            if (q) {
              var St = s - q.left < q.right - s,
                mt = St == _
              ;(Z = j + (mt ? 0 : 1)), (dt = mt ? 'after' : 'before'), (rt = St ? q.left : q.right)
            } else {
              !_ && (Z == w || Z == y) && Z++,
                (dt =
                  Z == 0
                    ? 'after'
                    : Z == i.text.length
                      ? 'before'
                      : ur(n, p, Z - (_ ? 1 : 0)).bottom + m <= c == _
                        ? 'after'
                        : 'before')
              var Ct = Gn(n, z(a, Z, dt), 'line', i, p)
              ;(rt = Ct.left), (vt = c < Ct.top ? -1 : c >= Ct.bottom ? 1 : 0)
            }
            return (Z = ue(i.text, Z, 1)), tu(a, Z, dt, vt, s - rt)
          }
          function pw(n, i, a, s, c, p, m) {
            var y = Qt(
                function ($) {
                  var j = c[$],
                    q = j.level != 1
                  return nu(Gn(n, z(a, q ? j.to : j.from, q ? 'before' : 'after'), 'line', i, s), p, m, !0)
                },
                0,
                c.length - 1,
              ),
              w = c[y]
            if (y > 0) {
              var _ = w.level != 1,
                P = Gn(n, z(a, _ ? w.from : w.to, _ ? 'after' : 'before'), 'line', i, s)
              nu(P, p, m, !0) && P.top > m && (w = c[y - 1])
            }
            return w
          }
          function gw(n, i, a, s, c, p, m) {
            var y = $d(n, i, s, m),
              w = y.begin,
              _ = y.end
            ;/\s/.test(i.text.charAt(_ - 1)) && _--
            for (var P = null, $ = null, j = 0; j < c.length; j++) {
              var q = c[j]
              if (!(q.from >= _ || q.to <= w)) {
                var Z = q.level != 1,
                  rt = ur(n, s, Z ? Math.min(_, q.to) - 1 : Math.max(w, q.from)).right,
                  dt = rt < p ? p - rt + 1e9 : rt - p
                ;(!P || $ > dt) && ((P = q), ($ = dt))
              }
            }
            return (
              P || (P = c[c.length - 1]),
              P.from < w && (P = { from: w, to: P.to, level: P.level }),
              P.to > _ && (P = { from: P.from, to: _, level: P.level }),
              P
            )
          }
          var Mi
          function go(n) {
            if (n.cachedTextHeight != null) return n.cachedTextHeight
            if (Mi == null) {
              Mi = k('pre', null, 'CodeMirror-line-like')
              for (var i = 0; i < 49; ++i) Mi.appendChild(document.createTextNode('x')), Mi.appendChild(k('br'))
              Mi.appendChild(document.createTextNode('x'))
            }
            R(n.measure, Mi)
            var a = Mi.offsetHeight / 50
            return a > 3 && (n.cachedTextHeight = a), V(n.measure), a || 1
          }
          function vo(n) {
            if (n.cachedCharWidth != null) return n.cachedCharWidth
            var i = k('span', 'xxxxxxxxxx'),
              a = k('pre', [i], 'CodeMirror-line-like')
            R(n.measure, a)
            var s = i.getBoundingClientRect(),
              c = (s.right - s.left) / 10
            return c > 2 && (n.cachedCharWidth = c), c || 10
          }
          function ru(n) {
            for (
              var i = n.display, a = {}, s = {}, c = i.gutters.clientLeft, p = i.gutters.firstChild, m = 0;
              p;
              p = p.nextSibling, ++m
            ) {
              var y = n.display.gutterSpecs[m].className
              ;(a[y] = p.offsetLeft + p.clientLeft + c), (s[y] = p.clientWidth)
            }
            return {
              fixedPos: iu(i),
              gutterTotalWidth: i.gutters.offsetWidth,
              gutterLeft: a,
              gutterWidth: s,
              wrapperWidth: i.wrapper.clientWidth,
            }
          }
          function iu(n) {
            return n.scroller.getBoundingClientRect().left - n.sizer.getBoundingClientRect().left
          }
          function Rd(n) {
            var i = go(n.display),
              a = n.options.lineWrapping,
              s = a && Math.max(5, n.display.scroller.clientWidth / vo(n.display) - 3)
            return function (c) {
              if (Qr(n.doc, c)) return 0
              var p = 0
              if (c.widgets)
                for (var m = 0; m < c.widgets.length; m++) c.widgets[m].height && (p += c.widgets[m].height)
              return a ? p + (Math.ceil(c.text.length / s) || 1) * i : p + i
            }
          }
          function ou(n) {
            var i = n.doc,
              a = Rd(n)
            i.iter(function (s) {
              var c = a(s)
              c != s.height && qn(s, c)
            })
          }
          function Ni(n, i, a, s) {
            var c = n.display
            if (!a && sn(i).getAttribute('cm-not-content') == 'true') return null
            var p,
              m,
              y = c.lineSpace.getBoundingClientRect()
            try {
              ;(p = i.clientX - y.left), (m = i.clientY - y.top)
            } catch {
              return null
            }
            var w = eu(n, p, m),
              _
            if (s && w.xRel > 0 && (_ = Lt(n.doc, w.line).text).length == w.ch) {
              var P = U(_, _.length, n.options.tabSize) - _.length
              w = z(w.line, Math.max(0, Math.round((p - Sd(n.display).left) / vo(n.display)) - P))
            }
            return w
          }
          function Pi(n, i) {
            if (i >= n.display.viewTo || ((i -= n.display.viewFrom), i < 0)) return null
            for (var a = n.display.view, s = 0; s < a.length; s++) if (((i -= a[s].size), i < 0)) return s
          }
          function an(n, i, a, s) {
            i == null && (i = n.doc.first), a == null && (a = n.doc.first + n.doc.size), s || (s = 0)
            var c = n.display
            if (
              (s &&
                a < c.viewTo &&
                (c.updateLineNumbers == null || c.updateLineNumbers > i) &&
                (c.updateLineNumbers = i),
              (n.curOp.viewChanged = !0),
              i >= c.viewTo)
            )
              Cr && Gc(n.doc, i) < c.viewTo && ei(n)
            else if (a <= c.viewFrom) Cr && dd(n.doc, a + s) > c.viewFrom ? ei(n) : ((c.viewFrom += s), (c.viewTo += s))
            else if (i <= c.viewFrom && a >= c.viewTo) ei(n)
            else if (i <= c.viewFrom) {
              var p = Xa(n, a, a + s, 1)
              p ? ((c.view = c.view.slice(p.index)), (c.viewFrom = p.lineN), (c.viewTo += s)) : ei(n)
            } else if (a >= c.viewTo) {
              var m = Xa(n, i, i, -1)
              m ? ((c.view = c.view.slice(0, m.index)), (c.viewTo = m.lineN)) : ei(n)
            } else {
              var y = Xa(n, i, i, -1),
                w = Xa(n, a, a + s, 1)
              y && w
                ? ((c.view = c.view
                    .slice(0, y.index)
                    .concat(ja(n, y.lineN, w.lineN))
                    .concat(c.view.slice(w.index))),
                  (c.viewTo += s))
                : ei(n)
            }
            var _ = c.externalMeasured
            _ && (a < _.lineN ? (_.lineN += s) : i < _.lineN + _.size && (c.externalMeasured = null))
          }
          function ti(n, i, a) {
            n.curOp.viewChanged = !0
            var s = n.display,
              c = n.display.externalMeasured
            if (
              (c && i >= c.lineN && i < c.lineN + c.size && (s.externalMeasured = null),
              !(i < s.viewFrom || i >= s.viewTo))
            ) {
              var p = s.view[Pi(n, i)]
              if (p.node != null) {
                var m = p.changes || (p.changes = [])
                it(m, a) == -1 && m.push(a)
              }
            }
          }
          function ei(n) {
            ;(n.display.viewFrom = n.display.viewTo = n.doc.first), (n.display.view = []), (n.display.viewOffset = 0)
          }
          function Xa(n, i, a, s) {
            var c = Pi(n, i),
              p,
              m = n.display.view
            if (!Cr || a == n.doc.first + n.doc.size) return { index: c, lineN: a }
            for (var y = n.display.viewFrom, w = 0; w < c; w++) y += m[w].size
            if (y != i) {
              if (s > 0) {
                if (c == m.length - 1) return null
                ;(p = y + m[c].size - i), c++
              } else p = y - i
              ;(i += p), (a += p)
            }
            for (; Gc(n.doc, a) != a; ) {
              if (c == (s < 0 ? 0 : m.length - 1)) return null
              ;(a += s * m[c - (s < 0 ? 1 : 0)].size), (c += s)
            }
            return { index: c, lineN: a }
          }
          function vw(n, i, a) {
            var s = n.display,
              c = s.view
            c.length == 0 || i >= s.viewTo || a <= s.viewFrom
              ? ((s.view = ja(n, i, a)), (s.viewFrom = i))
              : (s.viewFrom > i
                  ? (s.view = ja(n, i, s.viewFrom).concat(s.view))
                  : s.viewFrom < i && (s.view = s.view.slice(Pi(n, i))),
                (s.viewFrom = i),
                s.viewTo < a
                  ? (s.view = s.view.concat(ja(n, s.viewTo, a)))
                  : s.viewTo > a && (s.view = s.view.slice(0, Pi(n, a)))),
              (s.viewTo = a)
          }
          function zd(n) {
            for (var i = n.display.view, a = 0, s = 0; s < i.length; s++) {
              var c = i[s]
              !c.hidden && (!c.node || c.changes) && ++a
            }
            return a
          }
          function _s(n) {
            n.display.input.showSelection(n.display.input.prepareSelection())
          }
          function Id(n, i) {
            i === void 0 && (i = !0)
            var a = n.doc,
              s = {},
              c = (s.cursors = document.createDocumentFragment()),
              p = (s.selection = document.createDocumentFragment()),
              m = n.options.$customCursor
            m && (i = !0)
            for (var y = 0; y < a.sel.ranges.length; y++)
              if (!(!i && y == a.sel.primIndex)) {
                var w = a.sel.ranges[y]
                if (!(w.from().line >= n.display.viewTo || w.to().line < n.display.viewFrom)) {
                  var _ = w.empty()
                  if (m) {
                    var P = m(n, w)
                    P && su(n, P, c)
                  } else (_ || n.options.showCursorWhenSelecting) && su(n, w.head, c)
                  _ || mw(n, w, p)
                }
              }
            return s
          }
          function su(n, i, a) {
            var s = Gn(n, i, 'div', null, null, !n.options.singleCursorHeightPerLine),
              c = a.appendChild(k('div', ' ', 'CodeMirror-cursor'))
            if (
              ((c.style.left = s.left + 'px'),
              (c.style.top = s.top + 'px'),
              (c.style.height = Math.max(0, s.bottom - s.top) * n.options.cursorHeight + 'px'),
              /\bcm-fat-cursor\b/.test(n.getWrapperElement().className))
            ) {
              var p = Ka(n, i, 'div', null, null),
                m = p.right - p.left
              c.style.width = (m > 0 ? m : n.defaultCharWidth()) + 'px'
            }
            if (s.other) {
              var y = a.appendChild(k('div', ' ', 'CodeMirror-cursor CodeMirror-secondarycursor'))
              ;(y.style.display = ''),
                (y.style.left = s.other.left + 'px'),
                (y.style.top = s.other.top + 'px'),
                (y.style.height = (s.other.bottom - s.other.top) * 0.85 + 'px')
            }
          }
          function Ya(n, i) {
            return n.top - i.top || n.left - i.left
          }
          function mw(n, i, a) {
            var s = n.display,
              c = n.doc,
              p = document.createDocumentFragment(),
              m = Sd(n.display),
              y = m.left,
              w = Math.max(s.sizerWidth, Ai(n) - s.sizer.offsetLeft) - m.right,
              _ = c.direction == 'ltr'
            function P(mt, Ct, Dt, Pt) {
              Ct < 0 && (Ct = 0),
                (Ct = Math.round(Ct)),
                (Pt = Math.round(Pt)),
                p.appendChild(
                  k(
                    'div',
                    null,
                    'CodeMirror-selected',
                    'position: absolute; left: ' +
                      mt +
                      `px;
                             top: ` +
                      Ct +
                      'px; width: ' +
                      (Dt ?? w - mt) +
                      `px;
                             height: ` +
                      (Pt - Ct) +
                      'px',
                  ),
                )
            }
            function $(mt, Ct, Dt) {
              var Pt = Lt(c, mt),
                Ut = Pt.text.length,
                ge,
                He
              function Se(Me, un) {
                return Ka(n, z(mt, Me), 'div', Pt, un)
              }
              function xn(Me, un, Ue) {
                var De = Dd(n, Pt, null, Me),
                  Ne = (un == 'ltr') == (Ue == 'after') ? 'left' : 'right',
                  Te = Ue == 'after' ? De.begin : De.end - (/\s/.test(Pt.text.charAt(De.end - 1)) ? 2 : 1)
                return Se(Te, Ne)[Ne]
              }
              var cn = ye(Pt, c.direction)
              return (
                yn(cn, Ct || 0, Dt ?? Ut, function (Me, un, Ue, De) {
                  var Ne = Ue == 'ltr',
                    Te = Se(Me, Ne ? 'left' : 'right'),
                    fn = Se(un - 1, Ne ? 'right' : 'left'),
                    Ao = Ct == null && Me == 0,
                    ai = Dt == null && un == Ut,
                    Ye = De == 0,
                    fr = !cn || De == cn.length - 1
                  if (fn.top - Te.top <= 3) {
                    var Be = (_ ? Ao : ai) && Ye,
                      Ou = (_ ? ai : Ao) && fr,
                      Mr = Be ? y : (Ne ? Te : fn).left,
                      zi = Ou ? w : (Ne ? fn : Te).right
                    P(Mr, Te.top, zi - Mr, Te.bottom)
                  } else {
                    var Ii, en, Mo, $u
                    Ne
                      ? ((Ii = _ && Ao && Ye ? y : Te.left),
                        (en = _ ? w : xn(Me, Ue, 'before')),
                        (Mo = _ ? y : xn(un, Ue, 'after')),
                        ($u = _ && ai && fr ? w : fn.right))
                      : ((Ii = _ ? xn(Me, Ue, 'before') : y),
                        (en = !_ && Ao && Ye ? w : Te.right),
                        (Mo = !_ && ai && fr ? y : fn.left),
                        ($u = _ ? xn(un, Ue, 'after') : w)),
                      P(Ii, Te.top, en - Ii, Te.bottom),
                      Te.bottom < fn.top && P(y, Te.bottom, null, fn.top),
                      P(Mo, fn.top, $u - Mo, fn.bottom)
                  }
                  ;(!ge || Ya(Te, ge) < 0) && (ge = Te),
                    Ya(fn, ge) < 0 && (ge = fn),
                    (!He || Ya(Te, He) < 0) && (He = Te),
                    Ya(fn, He) < 0 && (He = fn)
                }),
                { start: ge, end: He }
              )
            }
            var j = i.from(),
              q = i.to()
            if (j.line == q.line) $(j.line, j.ch, q.ch)
            else {
              var Z = Lt(c, j.line),
                rt = Lt(c, q.line),
                dt = jn(Z) == jn(rt),
                vt = $(j.line, j.ch, dt ? Z.text.length + 1 : null).end,
                St = $(q.line, dt ? 0 : null, q.ch).start
              dt &&
                (vt.top < St.top - 2
                  ? (P(vt.right, vt.top, null, vt.bottom), P(y, St.top, St.left, St.bottom))
                  : P(vt.right, vt.top, St.left - vt.right, vt.bottom)),
                vt.bottom < St.top && P(y, vt.bottom, null, St.top)
            }
            a.appendChild(p)
          }
          function au(n) {
            if (n.state.focused) {
              var i = n.display
              clearInterval(i.blinker)
              var a = !0
              ;(i.cursorDiv.style.visibility = ''),
                n.options.cursorBlinkRate > 0
                  ? (i.blinker = setInterval(function () {
                      n.hasFocus() || mo(n), (i.cursorDiv.style.visibility = (a = !a) ? '' : 'hidden')
                    }, n.options.cursorBlinkRate))
                  : n.options.cursorBlinkRate < 0 && (i.cursorDiv.style.visibility = 'hidden')
            }
          }
          function Fd(n) {
            n.hasFocus() || (n.display.input.focus(), n.state.focused || cu(n))
          }
          function lu(n) {
            ;(n.state.delayingBlurEvent = !0),
              setTimeout(function () {
                n.state.delayingBlurEvent && ((n.state.delayingBlurEvent = !1), n.state.focused && mo(n))
              }, 100)
          }
          function cu(n, i) {
            n.state.delayingBlurEvent && !n.state.draggingText && (n.state.delayingBlurEvent = !1),
              n.options.readOnly != 'nocursor' &&
                (n.state.focused ||
                  (me(n, 'focus', n, i),
                  (n.state.focused = !0),
                  Tt(n.display.wrapper, 'CodeMirror-focused'),
                  !n.curOp &&
                    n.display.selForContextMenu != n.doc.sel &&
                    (n.display.input.reset(),
                    v &&
                      setTimeout(function () {
                        return n.display.input.reset(!0)
                      }, 20)),
                  n.display.input.receivedFocus()),
                au(n))
          }
          function mo(n, i) {
            n.state.delayingBlurEvent ||
              (n.state.focused &&
                (me(n, 'blur', n, i), (n.state.focused = !1), pt(n.display.wrapper, 'CodeMirror-focused')),
              clearInterval(n.display.blinker),
              setTimeout(function () {
                n.state.focused || (n.display.shift = !1)
              }, 150))
          }
          function Za(n) {
            for (
              var i = n.display,
                a = i.lineDiv.offsetTop,
                s = Math.max(0, i.scroller.getBoundingClientRect().top),
                c = i.lineDiv.getBoundingClientRect().top,
                p = 0,
                m = 0;
              m < i.view.length;
              m++
            ) {
              var y = i.view[m],
                w = n.options.lineWrapping,
                _ = void 0,
                P = 0
              if (!y.hidden) {
                if (((c += y.line.height), d && g < 8)) {
                  var $ = y.node.offsetTop + y.node.offsetHeight
                  ;(_ = $ - a), (a = $)
                } else {
                  var j = y.node.getBoundingClientRect()
                  ;(_ = j.bottom - j.top),
                    !w && y.text.firstChild && (P = y.text.firstChild.getBoundingClientRect().right - j.left - 1)
                }
                var q = y.line.height - _
                if ((q > 0.005 || q < -0.005) && (c < s && (p -= q), qn(y.line, _), qd(y.line), y.rest))
                  for (var Z = 0; Z < y.rest.length; Z++) qd(y.rest[Z])
                if (P > n.display.sizerWidth) {
                  var rt = Math.ceil(P / vo(n.display))
                  rt > n.display.maxLineLength &&
                    ((n.display.maxLineLength = rt), (n.display.maxLine = y.line), (n.display.maxLineChanged = !0))
                }
              }
            }
            Math.abs(p) > 2 && (i.scroller.scrollTop += p)
          }
          function qd(n) {
            if (n.widgets)
              for (var i = 0; i < n.widgets.length; ++i) {
                var a = n.widgets[i],
                  s = a.node.parentNode
                s && (a.height = s.offsetHeight)
              }
          }
          function Ja(n, i, a) {
            var s = a && a.top != null ? Math.max(0, a.top) : n.scroller.scrollTop
            s = Math.floor(s - Ga(n))
            var c = a && a.bottom != null ? a.bottom : s + n.wrapper.clientHeight,
              p = ar(i, s),
              m = ar(i, c)
            if (a && a.ensure) {
              var y = a.ensure.from.line,
                w = a.ensure.to.line
              y < p
                ? ((p = y), (m = ar(i, Tr(Lt(i, y)) + n.wrapper.clientHeight)))
                : Math.min(w, i.lastLine()) >= m && ((p = ar(i, Tr(Lt(i, w)) - n.wrapper.clientHeight)), (m = w))
            }
            return { from: p, to: Math.max(m, p + 1) }
          }
          function yw(n, i) {
            if (!ke(n, 'scrollCursorIntoView')) {
              var a = n.display,
                s = a.sizer.getBoundingClientRect(),
                c = null,
                p = a.wrapper.ownerDocument
              if (
                (i.top + s.top < 0
                  ? (c = !0)
                  : i.bottom + s.top > (p.defaultView.innerHeight || p.documentElement.clientHeight) && (c = !1),
                c != null && !E)
              ) {
                var m = k(
                  'div',
                  '​',
                  null,
                  `position: absolute;
                         top: ` +
                    (i.top - a.viewOffset - Ga(n.display)) +
                    `px;
                         height: ` +
                    (i.bottom - i.top + cr(n) + a.barHeight) +
                    `px;
                         left: ` +
                    i.left +
                    'px; width: ' +
                    Math.max(2, i.right - i.left) +
                    'px;',
                )
                n.display.lineSpace.appendChild(m), m.scrollIntoView(c), n.display.lineSpace.removeChild(m)
              }
            }
          }
          function bw(n, i, a, s) {
            s == null && (s = 0)
            var c
            !n.options.lineWrapping &&
              i == a &&
              ((a = i.sticky == 'before' ? z(i.line, i.ch + 1, 'before') : i),
              (i = i.ch ? z(i.line, i.sticky == 'before' ? i.ch - 1 : i.ch, 'after') : i))
            for (var p = 0; p < 5; p++) {
              var m = !1,
                y = Gn(n, i),
                w = !a || a == i ? y : Gn(n, a)
              c = {
                left: Math.min(y.left, w.left),
                top: Math.min(y.top, w.top) - s,
                right: Math.max(y.left, w.left),
                bottom: Math.max(y.bottom, w.bottom) + s,
              }
              var _ = uu(n, c),
                P = n.doc.scrollTop,
                $ = n.doc.scrollLeft
              if (
                (_.scrollTop != null && (ks(n, _.scrollTop), Math.abs(n.doc.scrollTop - P) > 1 && (m = !0)),
                _.scrollLeft != null && (Oi(n, _.scrollLeft), Math.abs(n.doc.scrollLeft - $) > 1 && (m = !0)),
                !m)
              )
                break
            }
            return c
          }
          function ww(n, i) {
            var a = uu(n, i)
            a.scrollTop != null && ks(n, a.scrollTop), a.scrollLeft != null && Oi(n, a.scrollLeft)
          }
          function uu(n, i) {
            var a = n.display,
              s = go(n.display)
            i.top < 0 && (i.top = 0)
            var c = n.curOp && n.curOp.scrollTop != null ? n.curOp.scrollTop : a.scroller.scrollTop,
              p = Zc(n),
              m = {}
            i.bottom - i.top > p && (i.bottom = i.top + p)
            var y = n.doc.height + Yc(a),
              w = i.top < s,
              _ = i.bottom > y - s
            if (i.top < c) m.scrollTop = w ? 0 : i.top
            else if (i.bottom > c + p) {
              var P = Math.min(i.top, (_ ? y : i.bottom) - p)
              P != c && (m.scrollTop = P)
            }
            var $ = n.options.fixedGutter ? 0 : a.gutters.offsetWidth,
              j = n.curOp && n.curOp.scrollLeft != null ? n.curOp.scrollLeft : a.scroller.scrollLeft - $,
              q = Ai(n) - a.gutters.offsetWidth,
              Z = i.right - i.left > q
            return (
              Z && (i.right = i.left + q),
              i.left < 10
                ? (m.scrollLeft = 0)
                : i.left < j
                  ? (m.scrollLeft = Math.max(0, i.left + $ - (Z ? 0 : 10)))
                  : i.right > q + j - 3 && (m.scrollLeft = i.right + (Z ? 0 : 10) - q),
              m
            )
          }
          function fu(n, i) {
            i != null &&
              (Qa(n), (n.curOp.scrollTop = (n.curOp.scrollTop == null ? n.doc.scrollTop : n.curOp.scrollTop) + i))
          }
          function yo(n) {
            Qa(n)
            var i = n.getCursor()
            n.curOp.scrollToPos = { from: i, to: i, margin: n.options.cursorScrollMargin }
          }
          function Ss(n, i, a) {
            ;(i != null || a != null) && Qa(n),
              i != null && (n.curOp.scrollLeft = i),
              a != null && (n.curOp.scrollTop = a)
          }
          function xw(n, i) {
            Qa(n), (n.curOp.scrollToPos = i)
          }
          function Qa(n) {
            var i = n.curOp.scrollToPos
            if (i) {
              n.curOp.scrollToPos = null
              var a = Od(n, i.from),
                s = Od(n, i.to)
              Hd(n, a, s, i.margin)
            }
          }
          function Hd(n, i, a, s) {
            var c = uu(n, {
              left: Math.min(i.left, a.left),
              top: Math.min(i.top, a.top) - s,
              right: Math.max(i.right, a.right),
              bottom: Math.max(i.bottom, a.bottom) + s,
            })
            Ss(n, c.scrollLeft, c.scrollTop)
          }
          function ks(n, i) {
            Math.abs(n.doc.scrollTop - i) < 2 || (l || du(n, { top: i }), Bd(n, i, !0), l && du(n), Es(n, 100))
          }
          function Bd(n, i, a) {
            ;(i = Math.max(0, Math.min(n.display.scroller.scrollHeight - n.display.scroller.clientHeight, i))),
              !(n.display.scroller.scrollTop == i && !a) &&
                ((n.doc.scrollTop = i),
                n.display.scrollbars.setScrollTop(i),
                n.display.scroller.scrollTop != i && (n.display.scroller.scrollTop = i))
          }
          function Oi(n, i, a, s) {
            ;(i = Math.max(0, Math.min(i, n.display.scroller.scrollWidth - n.display.scroller.clientWidth))),
              !((a ? i == n.doc.scrollLeft : Math.abs(n.doc.scrollLeft - i) < 2) && !s) &&
                ((n.doc.scrollLeft = i),
                Vd(n),
                n.display.scroller.scrollLeft != i && (n.display.scroller.scrollLeft = i),
                n.display.scrollbars.setScrollLeft(i))
          }
          function Cs(n) {
            var i = n.display,
              a = i.gutters.offsetWidth,
              s = Math.round(n.doc.height + Yc(n.display))
            return {
              clientHeight: i.scroller.clientHeight,
              viewHeight: i.wrapper.clientHeight,
              scrollWidth: i.scroller.scrollWidth,
              clientWidth: i.scroller.clientWidth,
              viewWidth: i.wrapper.clientWidth,
              barLeft: n.options.fixedGutter ? a : 0,
              docHeight: s,
              scrollHeight: s + cr(n) + i.barHeight,
              nativeBarWidth: i.nativeBarWidth,
              gutterWidth: a,
            }
          }
          var $i = function (n, i, a) {
            this.cm = a
            var s = (this.vert = k('div', [k('div', null, null, 'min-width: 1px')], 'CodeMirror-vscrollbar')),
              c = (this.horiz = k(
                'div',
                [k('div', null, null, 'height: 100%; min-height: 1px')],
                'CodeMirror-hscrollbar',
              ))
            ;(s.tabIndex = c.tabIndex = -1),
              n(s),
              n(c),
              bt(s, 'scroll', function () {
                s.clientHeight && i(s.scrollTop, 'vertical')
              }),
              bt(c, 'scroll', function () {
                c.clientWidth && i(c.scrollLeft, 'horizontal')
              }),
              (this.checkedZeroWidth = !1),
              d && g < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = '18px')
          }
          ;($i.prototype.update = function (n) {
            var i = n.scrollWidth > n.clientWidth + 1,
              a = n.scrollHeight > n.clientHeight + 1,
              s = n.nativeBarWidth
            if (a) {
              ;(this.vert.style.display = 'block'), (this.vert.style.bottom = i ? s + 'px' : '0')
              var c = n.viewHeight - (i ? s : 0)
              this.vert.firstChild.style.height = Math.max(0, n.scrollHeight - n.clientHeight + c) + 'px'
            } else (this.vert.scrollTop = 0), (this.vert.style.display = ''), (this.vert.firstChild.style.height = '0')
            if (i) {
              ;(this.horiz.style.display = 'block'),
                (this.horiz.style.right = a ? s + 'px' : '0'),
                (this.horiz.style.left = n.barLeft + 'px')
              var p = n.viewWidth - n.barLeft - (a ? s : 0)
              this.horiz.firstChild.style.width = Math.max(0, n.scrollWidth - n.clientWidth + p) + 'px'
            } else (this.horiz.style.display = ''), (this.horiz.firstChild.style.width = '0')
            return (
              !this.checkedZeroWidth &&
                n.clientHeight > 0 &&
                (s == 0 && this.zeroWidthHack(), (this.checkedZeroWidth = !0)),
              { right: a ? s : 0, bottom: i ? s : 0 }
            )
          }),
            ($i.prototype.setScrollLeft = function (n) {
              this.horiz.scrollLeft != n && (this.horiz.scrollLeft = n),
                this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, 'horiz')
            }),
            ($i.prototype.setScrollTop = function (n) {
              this.vert.scrollTop != n && (this.vert.scrollTop = n),
                this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, 'vert')
            }),
            ($i.prototype.zeroWidthHack = function () {
              var n = B && !N ? '12px' : '18px'
              ;(this.horiz.style.height = this.vert.style.width = n),
                (this.horiz.style.visibility = this.vert.style.visibility = 'hidden'),
                (this.disableHoriz = new et()),
                (this.disableVert = new et())
            }),
            ($i.prototype.enableZeroWidthBar = function (n, i, a) {
              n.style.visibility = ''
              function s() {
                var c = n.getBoundingClientRect(),
                  p =
                    a == 'vert'
                      ? document.elementFromPoint(c.right - 1, (c.top + c.bottom) / 2)
                      : document.elementFromPoint((c.right + c.left) / 2, c.bottom - 1)
                p != n ? (n.style.visibility = 'hidden') : i.set(1e3, s)
              }
              i.set(1e3, s)
            }),
            ($i.prototype.clear = function () {
              var n = this.horiz.parentNode
              n.removeChild(this.horiz), n.removeChild(this.vert)
            })
          var Ts = function () {}
          ;(Ts.prototype.update = function () {
            return { bottom: 0, right: 0 }
          }),
            (Ts.prototype.setScrollLeft = function () {}),
            (Ts.prototype.setScrollTop = function () {}),
            (Ts.prototype.clear = function () {})
          function bo(n, i) {
            i || (i = Cs(n))
            var a = n.display.barWidth,
              s = n.display.barHeight
            Wd(n, i)
            for (var c = 0; (c < 4 && a != n.display.barWidth) || s != n.display.barHeight; c++)
              a != n.display.barWidth && n.options.lineWrapping && Za(n),
                Wd(n, Cs(n)),
                (a = n.display.barWidth),
                (s = n.display.barHeight)
          }
          function Wd(n, i) {
            var a = n.display,
              s = a.scrollbars.update(i)
            ;(a.sizer.style.paddingRight = (a.barWidth = s.right) + 'px'),
              (a.sizer.style.paddingBottom = (a.barHeight = s.bottom) + 'px'),
              (a.heightForcer.style.borderBottom = s.bottom + 'px solid transparent'),
              s.right && s.bottom
                ? ((a.scrollbarFiller.style.display = 'block'),
                  (a.scrollbarFiller.style.height = s.bottom + 'px'),
                  (a.scrollbarFiller.style.width = s.right + 'px'))
                : (a.scrollbarFiller.style.display = ''),
              s.bottom && n.options.coverGutterNextToScrollbar && n.options.fixedGutter
                ? ((a.gutterFiller.style.display = 'block'),
                  (a.gutterFiller.style.height = s.bottom + 'px'),
                  (a.gutterFiller.style.width = i.gutterWidth + 'px'))
                : (a.gutterFiller.style.display = '')
          }
          var Ud = { native: $i, null: Ts }
          function jd(n) {
            n.display.scrollbars &&
              (n.display.scrollbars.clear(),
              n.display.scrollbars.addClass && pt(n.display.wrapper, n.display.scrollbars.addClass)),
              (n.display.scrollbars = new Ud[n.options.scrollbarStyle](
                function (i) {
                  n.display.wrapper.insertBefore(i, n.display.scrollbarFiller),
                    bt(i, 'mousedown', function () {
                      n.state.focused &&
                        setTimeout(function () {
                          return n.display.input.focus()
                        }, 0)
                    }),
                    i.setAttribute('cm-not-content', 'true')
                },
                function (i, a) {
                  a == 'horizontal' ? Oi(n, i) : ks(n, i)
                },
                n,
              )),
              n.display.scrollbars.addClass && Tt(n.display.wrapper, n.display.scrollbars.addClass)
          }
          var _w = 0
          function Di(n) {
            ;(n.curOp = {
              cm: n,
              viewChanged: !1,
              startHeight: n.doc.height,
              forceUpdate: !1,
              updateInput: 0,
              typing: !1,
              changeObjs: null,
              cursorActivityHandlers: null,
              cursorActivityCalled: 0,
              selectionChanged: !1,
              updateMaxLine: !1,
              scrollLeft: null,
              scrollTop: null,
              scrollToPos: null,
              focus: !1,
              id: ++_w,
              markArrays: null,
            }),
              Qb(n.curOp)
          }
          function Ri(n) {
            var i = n.curOp
            i &&
              ew(i, function (a) {
                for (var s = 0; s < a.ops.length; s++) a.ops[s].cm.curOp = null
                Sw(a)
              })
          }
          function Sw(n) {
            for (var i = n.ops, a = 0; a < i.length; a++) kw(i[a])
            for (var s = 0; s < i.length; s++) Cw(i[s])
            for (var c = 0; c < i.length; c++) Tw(i[c])
            for (var p = 0; p < i.length; p++) Ew(i[p])
            for (var m = 0; m < i.length; m++) Lw(i[m])
          }
          function kw(n) {
            var i = n.cm,
              a = i.display
            Mw(i),
              n.updateMaxLine && Kc(i),
              (n.mustUpdate =
                n.viewChanged ||
                n.forceUpdate ||
                n.scrollTop != null ||
                (n.scrollToPos && (n.scrollToPos.from.line < a.viewFrom || n.scrollToPos.to.line >= a.viewTo)) ||
                (a.maxLineChanged && i.options.lineWrapping)),
              (n.update =
                n.mustUpdate && new tl(i, n.mustUpdate && { top: n.scrollTop, ensure: n.scrollToPos }, n.forceUpdate))
          }
          function Cw(n) {
            n.updatedDisplay = n.mustUpdate && hu(n.cm, n.update)
          }
          function Tw(n) {
            var i = n.cm,
              a = i.display
            n.updatedDisplay && Za(i),
              (n.barMeasure = Cs(i)),
              a.maxLineChanged &&
                !i.options.lineWrapping &&
                ((n.adjustWidthTo = Cd(i, a.maxLine, a.maxLine.text.length).left + 3),
                (i.display.sizerWidth = n.adjustWidthTo),
                (n.barMeasure.scrollWidth = Math.max(
                  a.scroller.clientWidth,
                  a.sizer.offsetLeft + n.adjustWidthTo + cr(i) + i.display.barWidth,
                )),
                (n.maxScrollLeft = Math.max(0, a.sizer.offsetLeft + n.adjustWidthTo - Ai(i)))),
              (n.updatedDisplay || n.selectionChanged) && (n.preparedSelection = a.input.prepareSelection())
          }
          function Ew(n) {
            var i = n.cm
            n.adjustWidthTo != null &&
              ((i.display.sizer.style.minWidth = n.adjustWidthTo + 'px'),
              n.maxScrollLeft < i.doc.scrollLeft && Oi(i, Math.min(i.display.scroller.scrollLeft, n.maxScrollLeft), !0),
              (i.display.maxLineChanged = !1))
            var a = n.focus && n.focus == wt(Gt(i))
            n.preparedSelection && i.display.input.showSelection(n.preparedSelection, a),
              (n.updatedDisplay || n.startHeight != i.doc.height) && bo(i, n.barMeasure),
              n.updatedDisplay && gu(i, n.barMeasure),
              n.selectionChanged && au(i),
              i.state.focused && n.updateInput && i.display.input.reset(n.typing),
              a && Fd(n.cm)
          }
          function Lw(n) {
            var i = n.cm,
              a = i.display,
              s = i.doc
            if (
              (n.updatedDisplay && Gd(i, n.update),
              a.wheelStartX != null &&
                (n.scrollTop != null || n.scrollLeft != null || n.scrollToPos) &&
                (a.wheelStartX = a.wheelStartY = null),
              n.scrollTop != null && Bd(i, n.scrollTop, n.forceScroll),
              n.scrollLeft != null && Oi(i, n.scrollLeft, !0, !0),
              n.scrollToPos)
            ) {
              var c = bw(i, Bt(s, n.scrollToPos.from), Bt(s, n.scrollToPos.to), n.scrollToPos.margin)
              yw(i, c)
            }
            var p = n.maybeHiddenMarkers,
              m = n.maybeUnhiddenMarkers
            if (p) for (var y = 0; y < p.length; ++y) p[y].lines.length || me(p[y], 'hide')
            if (m) for (var w = 0; w < m.length; ++w) m[w].lines.length && me(m[w], 'unhide')
            a.wrapper.offsetHeight && (s.scrollTop = i.display.scroller.scrollTop),
              n.changeObjs && me(i, 'changes', i, n.changeObjs),
              n.update && n.update.finish()
          }
          function wn(n, i) {
            if (n.curOp) return i()
            Di(n)
            try {
              return i()
            } finally {
              Ri(n)
            }
          }
          function Fe(n, i) {
            return function () {
              if (n.curOp) return i.apply(n, arguments)
              Di(n)
              try {
                return i.apply(n, arguments)
              } finally {
                Ri(n)
              }
            }
          }
          function tn(n) {
            return function () {
              if (this.curOp) return n.apply(this, arguments)
              Di(this)
              try {
                return n.apply(this, arguments)
              } finally {
                Ri(this)
              }
            }
          }
          function qe(n) {
            return function () {
              var i = this.cm
              if (!i || i.curOp) return n.apply(this, arguments)
              Di(i)
              try {
                return n.apply(this, arguments)
              } finally {
                Ri(i)
              }
            }
          }
          function Es(n, i) {
            n.doc.highlightFrontier < n.display.viewTo && n.state.highlight.set(i, Jt(Aw, n))
          }
          function Aw(n) {
            var i = n.doc
            if (!(i.highlightFrontier >= n.display.viewTo)) {
              var a = +new Date() + n.options.workTime,
                s = vs(n, i.highlightFrontier),
                c = []
              i.iter(s.line, Math.min(i.first + i.size, n.display.viewTo + 500), function (p) {
                if (s.line >= n.display.viewFrom) {
                  var m = p.styles,
                    y = p.text.length > n.options.maxHighlightLength ? Sr(i.mode, s.state) : null,
                    w = Qh(n, p, s, !0)
                  y && (s.state = y), (p.styles = w.styles)
                  var _ = p.styleClasses,
                    P = w.classes
                  P ? (p.styleClasses = P) : _ && (p.styleClasses = null)
                  for (
                    var $ =
                        !m ||
                        m.length != p.styles.length ||
                        (_ != P && (!_ || !P || _.bgClass != P.bgClass || _.textClass != P.textClass)),
                      j = 0;
                    !$ && j < m.length;
                    ++j
                  )
                    $ = m[j] != p.styles[j]
                  $ && c.push(s.line), (p.stateAfter = s.save()), s.nextLine()
                } else
                  p.text.length <= n.options.maxHighlightLength && Bc(n, p.text, s),
                    (p.stateAfter = s.line % 5 == 0 ? s.save() : null),
                    s.nextLine()
                if (+new Date() > a) return Es(n, n.options.workDelay), !0
              }),
                (i.highlightFrontier = s.line),
                (i.modeFrontier = Math.max(i.modeFrontier, s.line)),
                c.length &&
                  wn(n, function () {
                    for (var p = 0; p < c.length; p++) ti(n, c[p], 'text')
                  })
            }
          }
          var tl = function (n, i, a) {
            var s = n.display
            ;(this.viewport = i),
              (this.visible = Ja(s, n.doc, i)),
              (this.editorIsHidden = !s.wrapper.offsetWidth),
              (this.wrapperHeight = s.wrapper.clientHeight),
              (this.wrapperWidth = s.wrapper.clientWidth),
              (this.oldDisplayWidth = Ai(n)),
              (this.force = a),
              (this.dims = ru(n)),
              (this.events = [])
          }
          ;(tl.prototype.signal = function (n, i) {
            Je(n, i) && this.events.push(arguments)
          }),
            (tl.prototype.finish = function () {
              for (var n = 0; n < this.events.length; n++) me.apply(null, this.events[n])
            })
          function Mw(n) {
            var i = n.display
            !i.scrollbarsClipped &&
              i.scroller.offsetWidth &&
              ((i.nativeBarWidth = i.scroller.offsetWidth - i.scroller.clientWidth),
              (i.heightForcer.style.height = cr(n) + 'px'),
              (i.sizer.style.marginBottom = -i.nativeBarWidth + 'px'),
              (i.sizer.style.borderRightWidth = cr(n) + 'px'),
              (i.scrollbarsClipped = !0))
          }
          function Nw(n) {
            if (n.hasFocus()) return null
            var i = wt(Gt(n))
            if (!i || !J(n.display.lineDiv, i)) return null
            var a = { activeElt: i }
            if (window.getSelection) {
              var s = Vt(n).getSelection()
              s.anchorNode &&
                s.extend &&
                J(n.display.lineDiv, s.anchorNode) &&
                ((a.anchorNode = s.anchorNode),
                (a.anchorOffset = s.anchorOffset),
                (a.focusNode = s.focusNode),
                (a.focusOffset = s.focusOffset))
            }
            return a
          }
          function Pw(n) {
            if (
              !(!n || !n.activeElt || n.activeElt == wt(n.activeElt.ownerDocument)) &&
              (n.activeElt.focus(),
              !/^(INPUT|TEXTAREA)$/.test(n.activeElt.nodeName) &&
                n.anchorNode &&
                J(document.body, n.anchorNode) &&
                J(document.body, n.focusNode))
            ) {
              var i = n.activeElt.ownerDocument,
                a = i.defaultView.getSelection(),
                s = i.createRange()
              s.setEnd(n.anchorNode, n.anchorOffset),
                s.collapse(!1),
                a.removeAllRanges(),
                a.addRange(s),
                a.extend(n.focusNode, n.focusOffset)
            }
          }
          function hu(n, i) {
            var a = n.display,
              s = n.doc
            if (i.editorIsHidden) return ei(n), !1
            if (
              !i.force &&
              i.visible.from >= a.viewFrom &&
              i.visible.to <= a.viewTo &&
              (a.updateLineNumbers == null || a.updateLineNumbers >= a.viewTo) &&
              a.renderedView == a.view &&
              zd(n) == 0
            )
              return !1
            Kd(n) && (ei(n), (i.dims = ru(n)))
            var c = s.first + s.size,
              p = Math.max(i.visible.from - n.options.viewportMargin, s.first),
              m = Math.min(c, i.visible.to + n.options.viewportMargin)
            a.viewFrom < p && p - a.viewFrom < 20 && (p = Math.max(s.first, a.viewFrom)),
              a.viewTo > m && a.viewTo - m < 20 && (m = Math.min(c, a.viewTo)),
              Cr && ((p = Gc(n.doc, p)), (m = dd(n.doc, m)))
            var y =
              p != a.viewFrom ||
              m != a.viewTo ||
              a.lastWrapHeight != i.wrapperHeight ||
              a.lastWrapWidth != i.wrapperWidth
            vw(n, p, m), (a.viewOffset = Tr(Lt(n.doc, a.viewFrom))), (n.display.mover.style.top = a.viewOffset + 'px')
            var w = zd(n)
            if (
              !y &&
              w == 0 &&
              !i.force &&
              a.renderedView == a.view &&
              (a.updateLineNumbers == null || a.updateLineNumbers >= a.viewTo)
            )
              return !1
            var _ = Nw(n)
            return (
              w > 4 && (a.lineDiv.style.display = 'none'),
              Ow(n, a.updateLineNumbers, i.dims),
              w > 4 && (a.lineDiv.style.display = ''),
              (a.renderedView = a.view),
              Pw(_),
              V(a.cursorDiv),
              V(a.selectionDiv),
              (a.gutters.style.height = a.sizer.style.minHeight = 0),
              y && ((a.lastWrapHeight = i.wrapperHeight), (a.lastWrapWidth = i.wrapperWidth), Es(n, 400)),
              (a.updateLineNumbers = null),
              !0
            )
          }
          function Gd(n, i) {
            for (var a = i.viewport, s = !0; ; s = !1) {
              if (!s || !n.options.lineWrapping || i.oldDisplayWidth == Ai(n)) {
                if (
                  (a && a.top != null && (a = { top: Math.min(n.doc.height + Yc(n.display) - Zc(n), a.top) }),
                  (i.visible = Ja(n.display, n.doc, a)),
                  i.visible.from >= n.display.viewFrom && i.visible.to <= n.display.viewTo)
                )
                  break
              } else s && (i.visible = Ja(n.display, n.doc, a))
              if (!hu(n, i)) break
              Za(n)
              var c = Cs(n)
              _s(n), bo(n, c), gu(n, c), (i.force = !1)
            }
            i.signal(n, 'update', n),
              (n.display.viewFrom != n.display.reportedViewFrom || n.display.viewTo != n.display.reportedViewTo) &&
                (i.signal(n, 'viewportChange', n, n.display.viewFrom, n.display.viewTo),
                (n.display.reportedViewFrom = n.display.viewFrom),
                (n.display.reportedViewTo = n.display.viewTo))
          }
          function du(n, i) {
            var a = new tl(n, i)
            if (hu(n, a)) {
              Za(n), Gd(n, a)
              var s = Cs(n)
              _s(n), bo(n, s), gu(n, s), a.finish()
            }
          }
          function Ow(n, i, a) {
            var s = n.display,
              c = n.options.lineNumbers,
              p = s.lineDiv,
              m = p.firstChild
            function y(Z) {
              var rt = Z.nextSibling
              return (
                v && B && n.display.currentWheelTarget == Z ? (Z.style.display = 'none') : Z.parentNode.removeChild(Z),
                rt
              )
            }
            for (var w = s.view, _ = s.viewFrom, P = 0; P < w.length; P++) {
              var $ = w[P]
              if (!$.hidden)
                if (!$.node || $.node.parentNode != p) {
                  var j = sw(n, $, _, a)
                  p.insertBefore(j, m)
                } else {
                  for (; m != $.node; ) m = y(m)
                  var q = c && i != null && i <= _ && $.lineNumber
                  $.changes && (it($.changes, 'gutter') > -1 && (q = !1), yd(n, $, _, a)),
                    q && (V($.lineNumber), $.lineNumber.appendChild(document.createTextNode(D(n.options, _)))),
                    (m = $.node.nextSibling)
                }
              _ += $.size
            }
            for (; m; ) m = y(m)
          }
          function pu(n) {
            var i = n.gutters.offsetWidth
            ;(n.sizer.style.marginLeft = i + 'px'), Ie(n, 'gutterChanged', n)
          }
          function gu(n, i) {
            ;(n.display.sizer.style.minHeight = i.docHeight + 'px'),
              (n.display.heightForcer.style.top = i.docHeight + 'px'),
              (n.display.gutters.style.height = i.docHeight + n.display.barHeight + cr(n) + 'px')
          }
          function Vd(n) {
            var i = n.display,
              a = i.view
            if (!(!i.alignWidgets && (!i.gutters.firstChild || !n.options.fixedGutter))) {
              for (
                var s = iu(i) - i.scroller.scrollLeft + n.doc.scrollLeft,
                  c = i.gutters.offsetWidth,
                  p = s + 'px',
                  m = 0;
                m < a.length;
                m++
              )
                if (!a[m].hidden) {
                  n.options.fixedGutter &&
                    (a[m].gutter && (a[m].gutter.style.left = p),
                    a[m].gutterBackground && (a[m].gutterBackground.style.left = p))
                  var y = a[m].alignable
                  if (y) for (var w = 0; w < y.length; w++) y[w].style.left = p
                }
              n.options.fixedGutter && (i.gutters.style.left = s + c + 'px')
            }
          }
          function Kd(n) {
            if (!n.options.lineNumbers) return !1
            var i = n.doc,
              a = D(n.options, i.first + i.size - 1),
              s = n.display
            if (a.length != s.lineNumChars) {
              var c = s.measure.appendChild(k('div', [k('div', a)], 'CodeMirror-linenumber CodeMirror-gutter-elt')),
                p = c.firstChild.offsetWidth,
                m = c.offsetWidth - p
              return (
                (s.lineGutter.style.width = ''),
                (s.lineNumInnerWidth = Math.max(p, s.lineGutter.offsetWidth - m) + 1),
                (s.lineNumWidth = s.lineNumInnerWidth + m),
                (s.lineNumChars = s.lineNumInnerWidth ? a.length : -1),
                (s.lineGutter.style.width = s.lineNumWidth + 'px'),
                pu(n.display),
                !0
              )
            }
            return !1
          }
          function vu(n, i) {
            for (var a = [], s = !1, c = 0; c < n.length; c++) {
              var p = n[c],
                m = null
              if ((typeof p != 'string' && ((m = p.style), (p = p.className)), p == 'CodeMirror-linenumbers'))
                if (i) s = !0
                else continue
              a.push({ className: p, style: m })
            }
            return i && !s && a.push({ className: 'CodeMirror-linenumbers', style: null }), a
          }
          function Xd(n) {
            var i = n.gutters,
              a = n.gutterSpecs
            V(i), (n.lineGutter = null)
            for (var s = 0; s < a.length; ++s) {
              var c = a[s],
                p = c.className,
                m = c.style,
                y = i.appendChild(k('div', null, 'CodeMirror-gutter ' + p))
              m && (y.style.cssText = m),
                p == 'CodeMirror-linenumbers' && ((n.lineGutter = y), (y.style.width = (n.lineNumWidth || 1) + 'px'))
            }
            ;(i.style.display = a.length ? '' : 'none'), pu(n)
          }
          function Ls(n) {
            Xd(n.display), an(n), Vd(n)
          }
          function $w(n, i, a, s) {
            var c = this
            ;(this.input = a),
              (c.scrollbarFiller = k('div', null, 'CodeMirror-scrollbar-filler')),
              c.scrollbarFiller.setAttribute('cm-not-content', 'true'),
              (c.gutterFiller = k('div', null, 'CodeMirror-gutter-filler')),
              c.gutterFiller.setAttribute('cm-not-content', 'true'),
              (c.lineDiv = H('div', null, 'CodeMirror-code')),
              (c.selectionDiv = k('div', null, null, 'position: relative; z-index: 1')),
              (c.cursorDiv = k('div', null, 'CodeMirror-cursors')),
              (c.measure = k('div', null, 'CodeMirror-measure')),
              (c.lineMeasure = k('div', null, 'CodeMirror-measure')),
              (c.lineSpace = H(
                'div',
                [c.measure, c.lineMeasure, c.selectionDiv, c.cursorDiv, c.lineDiv],
                null,
                'position: relative; outline: none',
              ))
            var p = H('div', [c.lineSpace], 'CodeMirror-lines')
            ;(c.mover = k('div', [p], null, 'position: relative')),
              (c.sizer = k('div', [c.mover], 'CodeMirror-sizer')),
              (c.sizerWidth = null),
              (c.heightForcer = k('div', null, null, 'position: absolute; height: ' + Mt + 'px; width: 1px;')),
              (c.gutters = k('div', null, 'CodeMirror-gutters')),
              (c.lineGutter = null),
              (c.scroller = k('div', [c.sizer, c.heightForcer, c.gutters], 'CodeMirror-scroll')),
              c.scroller.setAttribute('tabIndex', '-1'),
              (c.wrapper = k('div', [c.scrollbarFiller, c.gutterFiller, c.scroller], 'CodeMirror')),
              x && S >= 105 && (c.wrapper.style.clipPath = 'inset(0px)'),
              c.wrapper.setAttribute('translate', 'no'),
              d && g < 8 && ((c.gutters.style.zIndex = -1), (c.scroller.style.paddingRight = 0)),
              !v && !(l && A) && (c.scroller.draggable = !0),
              n && (n.appendChild ? n.appendChild(c.wrapper) : n(c.wrapper)),
              (c.viewFrom = c.viewTo = i.first),
              (c.reportedViewFrom = c.reportedViewTo = i.first),
              (c.view = []),
              (c.renderedView = null),
              (c.externalMeasured = null),
              (c.viewOffset = 0),
              (c.lastWrapHeight = c.lastWrapWidth = 0),
              (c.updateLineNumbers = null),
              (c.nativeBarWidth = c.barHeight = c.barWidth = 0),
              (c.scrollbarsClipped = !1),
              (c.lineNumWidth = c.lineNumInnerWidth = c.lineNumChars = null),
              (c.alignWidgets = !1),
              (c.cachedCharWidth = c.cachedTextHeight = c.cachedPaddingH = null),
              (c.maxLine = null),
              (c.maxLineLength = 0),
              (c.maxLineChanged = !1),
              (c.wheelDX = c.wheelDY = c.wheelStartX = c.wheelStartY = null),
              (c.shift = !1),
              (c.selForContextMenu = null),
              (c.activeTouch = null),
              (c.gutterSpecs = vu(s.gutters, s.lineNumbers)),
              Xd(c),
              a.init(c)
          }
          var el = 0,
            Lr = null
          d ? (Lr = -0.53) : l ? (Lr = 15) : x ? (Lr = -0.7) : T && (Lr = -1 / 3)
          function Yd(n) {
            var i = n.wheelDeltaX,
              a = n.wheelDeltaY
            return (
              i == null && n.detail && n.axis == n.HORIZONTAL_AXIS && (i = n.detail),
              a == null && n.detail && n.axis == n.VERTICAL_AXIS ? (a = n.detail) : a == null && (a = n.wheelDelta),
              { x: i, y: a }
            )
          }
          function Dw(n) {
            var i = Yd(n)
            return (i.x *= Lr), (i.y *= Lr), i
          }
          function Zd(n, i) {
            x &&
              S == 102 &&
              (n.display.chromeScrollHack == null
                ? (n.display.sizer.style.pointerEvents = 'none')
                : clearTimeout(n.display.chromeScrollHack),
              (n.display.chromeScrollHack = setTimeout(function () {
                ;(n.display.chromeScrollHack = null), (n.display.sizer.style.pointerEvents = '')
              }, 100)))
            var a = Yd(i),
              s = a.x,
              c = a.y,
              p = Lr
            i.deltaMode === 0 && ((s = i.deltaX), (c = i.deltaY), (p = 1))
            var m = n.display,
              y = m.scroller,
              w = y.scrollWidth > y.clientWidth,
              _ = y.scrollHeight > y.clientHeight
            if ((s && w) || (c && _)) {
              if (c && B && v) {
                t: for (var P = i.target, $ = m.view; P != y; P = P.parentNode)
                  for (var j = 0; j < $.length; j++)
                    if ($[j].node == P) {
                      n.display.currentWheelTarget = P
                      break t
                    }
              }
              if (s && !l && !M && p != null) {
                c && _ && ks(n, Math.max(0, y.scrollTop + c * p)),
                  Oi(n, Math.max(0, y.scrollLeft + s * p)),
                  (!c || (c && _)) && Ke(i),
                  (m.wheelStartX = null)
                return
              }
              if (c && p != null) {
                var q = c * p,
                  Z = n.doc.scrollTop,
                  rt = Z + m.wrapper.clientHeight
                q < 0 ? (Z = Math.max(0, Z + q - 50)) : (rt = Math.min(n.doc.height, rt + q + 50)),
                  du(n, { top: Z, bottom: rt })
              }
              el < 20 &&
                i.deltaMode !== 0 &&
                (m.wheelStartX == null
                  ? ((m.wheelStartX = y.scrollLeft),
                    (m.wheelStartY = y.scrollTop),
                    (m.wheelDX = s),
                    (m.wheelDY = c),
                    setTimeout(function () {
                      if (m.wheelStartX != null) {
                        var dt = y.scrollLeft - m.wheelStartX,
                          vt = y.scrollTop - m.wheelStartY,
                          St = (vt && m.wheelDY && vt / m.wheelDY) || (dt && m.wheelDX && dt / m.wheelDX)
                        ;(m.wheelStartX = m.wheelStartY = null), St && ((Lr = (Lr * el + St) / (el + 1)), ++el)
                      }
                    }, 200))
                  : ((m.wheelDX += s), (m.wheelDY += c)))
            }
          }
          var On = function (n, i) {
            ;(this.ranges = n), (this.primIndex = i)
          }
          ;(On.prototype.primary = function () {
            return this.ranges[this.primIndex]
          }),
            (On.prototype.equals = function (n) {
              if (n == this) return !0
              if (n.primIndex != this.primIndex || n.ranges.length != this.ranges.length) return !1
              for (var i = 0; i < this.ranges.length; i++) {
                var a = this.ranges[i],
                  s = n.ranges[i]
                if (!Ht(a.anchor, s.anchor) || !Ht(a.head, s.head)) return !1
              }
              return !0
            }),
            (On.prototype.deepCopy = function () {
              for (var n = [], i = 0; i < this.ranges.length; i++)
                n[i] = new ce(Xt(this.ranges[i].anchor), Xt(this.ranges[i].head))
              return new On(n, this.primIndex)
            }),
            (On.prototype.somethingSelected = function () {
              for (var n = 0; n < this.ranges.length; n++) if (!this.ranges[n].empty()) return !0
              return !1
            }),
            (On.prototype.contains = function (n, i) {
              i || (i = n)
              for (var a = 0; a < this.ranges.length; a++) {
                var s = this.ranges[a]
                if (Y(i, s.from()) >= 0 && Y(n, s.to()) <= 0) return a
              }
              return -1
            })
          var ce = function (n, i) {
            ;(this.anchor = n), (this.head = i)
          }
          ;(ce.prototype.from = function () {
            return $e(this.anchor, this.head)
          }),
            (ce.prototype.to = function () {
              return oe(this.anchor, this.head)
            }),
            (ce.prototype.empty = function () {
              return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
            })
          function Vn(n, i, a) {
            var s = n && n.options.selectionsMayTouch,
              c = i[a]
            i.sort(function (j, q) {
              return Y(j.from(), q.from())
            }),
              (a = it(i, c))
            for (var p = 1; p < i.length; p++) {
              var m = i[p],
                y = i[p - 1],
                w = Y(y.to(), m.from())
              if (s && !m.empty() ? w > 0 : w >= 0) {
                var _ = $e(y.from(), m.from()),
                  P = oe(y.to(), m.to()),
                  $ = y.empty() ? m.from() == m.head : y.from() == y.head
                p <= a && --a, i.splice(--p, 2, new ce($ ? P : _, $ ? _ : P))
              }
            }
            return new On(i, a)
          }
          function ni(n, i) {
            return new On([new ce(n, i || n)], 0)
          }
          function ri(n) {
            return n.text
              ? z(n.from.line + n.text.length - 1, lt(n.text).length + (n.text.length == 1 ? n.from.ch : 0))
              : n.to
          }
          function Jd(n, i) {
            if (Y(n, i.from) < 0) return n
            if (Y(n, i.to) <= 0) return ri(i)
            var a = n.line + i.text.length - (i.to.line - i.from.line) - 1,
              s = n.ch
            return n.line == i.to.line && (s += ri(i).ch - i.to.ch), z(a, s)
          }
          function mu(n, i) {
            for (var a = [], s = 0; s < n.sel.ranges.length; s++) {
              var c = n.sel.ranges[s]
              a.push(new ce(Jd(c.anchor, i), Jd(c.head, i)))
            }
            return Vn(n.cm, a, n.sel.primIndex)
          }
          function Qd(n, i, a) {
            return n.line == i.line ? z(a.line, n.ch - i.ch + a.ch) : z(a.line + (n.line - i.line), n.ch)
          }
          function Rw(n, i, a) {
            for (var s = [], c = z(n.first, 0), p = c, m = 0; m < i.length; m++) {
              var y = i[m],
                w = Qd(y.from, c, p),
                _ = Qd(ri(y), c, p)
              if (((c = y.to), (p = _), a == 'around')) {
                var P = n.sel.ranges[m],
                  $ = Y(P.head, P.anchor) < 0
                s[m] = new ce($ ? _ : w, $ ? w : _)
              } else s[m] = new ce(w, w)
            }
            return new On(s, n.sel.primIndex)
          }
          function yu(n) {
            ;(n.doc.mode = _r(n.options, n.doc.modeOption)), As(n)
          }
          function As(n) {
            n.doc.iter(function (i) {
              i.stateAfter && (i.stateAfter = null), i.styles && (i.styles = null)
            }),
              (n.doc.modeFrontier = n.doc.highlightFrontier = n.doc.first),
              Es(n, 100),
              n.state.modeGen++,
              n.curOp && an(n)
          }
          function tp(n, i) {
            return i.from.ch == 0 && i.to.ch == 0 && lt(i.text) == '' && (!n.cm || n.cm.options.wholeLineUpdateBefore)
          }
          function bu(n, i, a, s) {
            function c(St) {
              return a ? a[St] : null
            }
            function p(St, mt, Ct) {
              Ub(St, mt, Ct, s), Ie(St, 'change', St, i)
            }
            function m(St, mt) {
              for (var Ct = [], Dt = St; Dt < mt; ++Dt) Ct.push(new fo(_[Dt], c(Dt), s))
              return Ct
            }
            var y = i.from,
              w = i.to,
              _ = i.text,
              P = Lt(n, y.line),
              $ = Lt(n, w.line),
              j = lt(_),
              q = c(_.length - 1),
              Z = w.line - y.line
            if (i.full) n.insert(0, m(0, _.length)), n.remove(_.length, n.size - _.length)
            else if (tp(n, i)) {
              var rt = m(0, _.length - 1)
              p($, $.text, q), Z && n.remove(y.line, Z), rt.length && n.insert(y.line, rt)
            } else if (P == $)
              if (_.length == 1) p(P, P.text.slice(0, y.ch) + j + P.text.slice(w.ch), q)
              else {
                var dt = m(1, _.length - 1)
                dt.push(new fo(j + P.text.slice(w.ch), q, s)),
                  p(P, P.text.slice(0, y.ch) + _[0], c(0)),
                  n.insert(y.line + 1, dt)
              }
            else if (_.length == 1)
              p(P, P.text.slice(0, y.ch) + _[0] + $.text.slice(w.ch), c(0)), n.remove(y.line + 1, Z)
            else {
              p(P, P.text.slice(0, y.ch) + _[0], c(0)), p($, j + $.text.slice(w.ch), q)
              var vt = m(1, _.length - 1)
              Z > 1 && n.remove(y.line + 1, Z - 1), n.insert(y.line + 1, vt)
            }
            Ie(n, 'change', n, i)
          }
          function ii(n, i, a) {
            function s(c, p, m) {
              if (c.linked)
                for (var y = 0; y < c.linked.length; ++y) {
                  var w = c.linked[y]
                  if (w.doc != p) {
                    var _ = m && w.sharedHist
                    ;(a && !_) || (i(w.doc, _), s(w.doc, c, _))
                  }
                }
            }
            s(n, null, !0)
          }
          function ep(n, i) {
            if (i.cm) throw new Error('This document is already in use.')
            ;(n.doc = i),
              (i.cm = n),
              ou(n),
              yu(n),
              np(n),
              (n.options.direction = i.direction),
              n.options.lineWrapping || Kc(n),
              (n.options.mode = i.modeOption),
              an(n)
          }
          function np(n) {
            ;(n.doc.direction == 'rtl' ? Tt : pt)(n.display.lineDiv, 'CodeMirror-rtl')
          }
          function zw(n) {
            wn(n, function () {
              np(n), an(n)
            })
          }
          function nl(n) {
            ;(this.done = []),
              (this.undone = []),
              (this.undoDepth = n ? n.undoDepth : 1 / 0),
              (this.lastModTime = this.lastSelTime = 0),
              (this.lastOp = this.lastSelOp = null),
              (this.lastOrigin = this.lastSelOrigin = null),
              (this.generation = this.maxGeneration = n ? n.maxGeneration : 1)
          }
          function wu(n, i) {
            var a = { from: Xt(i.from), to: ri(i), text: kr(n, i.from, i.to) }
            return (
              op(n, a, i.from.line, i.to.line + 1),
              ii(
                n,
                function (s) {
                  return op(s, a, i.from.line, i.to.line + 1)
                },
                !0,
              ),
              a
            )
          }
          function rp(n) {
            for (; n.length; ) {
              var i = lt(n)
              if (i.ranges) n.pop()
              else break
            }
          }
          function Iw(n, i) {
            if (i) return rp(n.done), lt(n.done)
            if (n.done.length && !lt(n.done).ranges) return lt(n.done)
            if (n.done.length > 1 && !n.done[n.done.length - 2].ranges) return n.done.pop(), lt(n.done)
          }
          function ip(n, i, a, s) {
            var c = n.history
            c.undone.length = 0
            var p = +new Date(),
              m,
              y
            if (
              (c.lastOp == s ||
                (c.lastOrigin == i.origin &&
                  i.origin &&
                  ((i.origin.charAt(0) == '+' && c.lastModTime > p - (n.cm ? n.cm.options.historyEventDelay : 500)) ||
                    i.origin.charAt(0) == '*'))) &&
              (m = Iw(c, c.lastOp == s))
            )
              (y = lt(m.changes)),
                Y(i.from, i.to) == 0 && Y(i.from, y.to) == 0 ? (y.to = ri(i)) : m.changes.push(wu(n, i))
            else {
              var w = lt(c.done)
              for (
                (!w || !w.ranges) && rl(n.sel, c.done),
                  m = { changes: [wu(n, i)], generation: c.generation },
                  c.done.push(m);
                c.done.length > c.undoDepth;

              )
                c.done.shift(), c.done[0].ranges || c.done.shift()
            }
            c.done.push(a),
              (c.generation = ++c.maxGeneration),
              (c.lastModTime = c.lastSelTime = p),
              (c.lastOp = c.lastSelOp = s),
              (c.lastOrigin = c.lastSelOrigin = i.origin),
              y || me(n, 'historyAdded')
          }
          function Fw(n, i, a, s) {
            var c = i.charAt(0)
            return (
              c == '*' ||
              (c == '+' &&
                a.ranges.length == s.ranges.length &&
                a.somethingSelected() == s.somethingSelected() &&
                new Date() - n.history.lastSelTime <= (n.cm ? n.cm.options.historyEventDelay : 500))
            )
          }
          function qw(n, i, a, s) {
            var c = n.history,
              p = s && s.origin
            a == c.lastSelOp ||
            (p &&
              c.lastSelOrigin == p &&
              ((c.lastModTime == c.lastSelTime && c.lastOrigin == p) || Fw(n, p, lt(c.done), i)))
              ? (c.done[c.done.length - 1] = i)
              : rl(i, c.done),
              (c.lastSelTime = +new Date()),
              (c.lastSelOrigin = p),
              (c.lastSelOp = a),
              s && s.clearRedo !== !1 && rp(c.undone)
          }
          function rl(n, i) {
            var a = lt(i)
            ;(a && a.ranges && a.equals(n)) || i.push(n)
          }
          function op(n, i, a, s) {
            var c = i['spans_' + n.id],
              p = 0
            n.iter(Math.max(n.first, a), Math.min(n.first + n.size, s), function (m) {
              m.markedSpans && ((c || (c = i['spans_' + n.id] = {}))[p] = m.markedSpans), ++p
            })
          }
          function Hw(n) {
            if (!n) return null
            for (var i, a = 0; a < n.length; ++a)
              n[a].marker.explicitlyCleared ? i || (i = n.slice(0, a)) : i && i.push(n[a])
            return i ? (i.length ? i : null) : n
          }
          function Bw(n, i) {
            var a = i['spans_' + n.id]
            if (!a) return null
            for (var s = [], c = 0; c < i.text.length; ++c) s.push(Hw(a[c]))
            return s
          }
          function sp(n, i) {
            var a = Bw(n, i),
              s = Uc(n, i)
            if (!a) return s
            if (!s) return a
            for (var c = 0; c < a.length; ++c) {
              var p = a[c],
                m = s[c]
              if (p && m)
                t: for (var y = 0; y < m.length; ++y) {
                  for (var w = m[y], _ = 0; _ < p.length; ++_) if (p[_].marker == w.marker) continue t
                  p.push(w)
                }
              else m && (a[c] = m)
            }
            return a
          }
          function wo(n, i, a) {
            for (var s = [], c = 0; c < n.length; ++c) {
              var p = n[c]
              if (p.ranges) {
                s.push(a ? On.prototype.deepCopy.call(p) : p)
                continue
              }
              var m = p.changes,
                y = []
              s.push({ changes: y })
              for (var w = 0; w < m.length; ++w) {
                var _ = m[w],
                  P = void 0
                if ((y.push({ from: _.from, to: _.to, text: _.text }), i))
                  for (var $ in _)
                    (P = $.match(/^spans_(\d+)$/)) && it(i, Number(P[1])) > -1 && ((lt(y)[$] = _[$]), delete _[$])
              }
            }
            return s
          }
          function xu(n, i, a, s) {
            if (s) {
              var c = n.anchor
              if (a) {
                var p = Y(i, c) < 0
                p != Y(a, c) < 0 ? ((c = i), (i = a)) : p != Y(i, a) < 0 && (i = a)
              }
              return new ce(c, i)
            } else return new ce(a || i, i)
          }
          function il(n, i, a, s, c) {
            c == null && (c = n.cm && (n.cm.display.shift || n.extend)),
              Xe(n, new On([xu(n.sel.primary(), i, a, c)], 0), s)
          }
          function ap(n, i, a) {
            for (var s = [], c = n.cm && (n.cm.display.shift || n.extend), p = 0; p < n.sel.ranges.length; p++)
              s[p] = xu(n.sel.ranges[p], i[p], null, c)
            var m = Vn(n.cm, s, n.sel.primIndex)
            Xe(n, m, a)
          }
          function _u(n, i, a, s) {
            var c = n.sel.ranges.slice(0)
            ;(c[i] = a), Xe(n, Vn(n.cm, c, n.sel.primIndex), s)
          }
          function lp(n, i, a, s) {
            Xe(n, ni(i, a), s)
          }
          function Ww(n, i, a) {
            var s = {
              ranges: i.ranges,
              update: function (c) {
                this.ranges = []
                for (var p = 0; p < c.length; p++) this.ranges[p] = new ce(Bt(n, c[p].anchor), Bt(n, c[p].head))
              },
              origin: a && a.origin,
            }
            return (
              me(n, 'beforeSelectionChange', n, s),
              n.cm && me(n.cm, 'beforeSelectionChange', n.cm, s),
              s.ranges != i.ranges ? Vn(n.cm, s.ranges, s.ranges.length - 1) : i
            )
          }
          function cp(n, i, a) {
            var s = n.history.done,
              c = lt(s)
            c && c.ranges ? ((s[s.length - 1] = i), ol(n, i, a)) : Xe(n, i, a)
          }
          function Xe(n, i, a) {
            ol(n, i, a), qw(n, n.sel, n.cm ? n.cm.curOp.id : NaN, a)
          }
          function ol(n, i, a) {
            ;(Je(n, 'beforeSelectionChange') || (n.cm && Je(n.cm, 'beforeSelectionChange'))) && (i = Ww(n, i, a))
            var s = (a && a.bias) || (Y(i.primary().head, n.sel.primary().head) < 0 ? -1 : 1)
            up(n, hp(n, i, s, !0)),
              !(a && a.scroll === !1) && n.cm && n.cm.getOption('readOnly') != 'nocursor' && yo(n.cm)
          }
          function up(n, i) {
            i.equals(n.sel) ||
              ((n.sel = i),
              n.cm && ((n.cm.curOp.updateInput = 1), (n.cm.curOp.selectionChanged = !0), $a(n.cm)),
              Ie(n, 'cursorActivity', n))
          }
          function fp(n) {
            up(n, hp(n, n.sel, null, !1))
          }
          function hp(n, i, a, s) {
            for (var c, p = 0; p < i.ranges.length; p++) {
              var m = i.ranges[p],
                y = i.ranges.length == n.sel.ranges.length && n.sel.ranges[p],
                w = sl(n, m.anchor, y && y.anchor, a, s),
                _ = m.head == m.anchor ? w : sl(n, m.head, y && y.head, a, s)
              ;(c || w != m.anchor || _ != m.head) && (c || (c = i.ranges.slice(0, p)), (c[p] = new ce(w, _)))
            }
            return c ? Vn(n.cm, c, i.primIndex) : i
          }
          function xo(n, i, a, s, c) {
            var p = Lt(n, i.line)
            if (p.markedSpans)
              for (var m = 0; m < p.markedSpans.length; ++m) {
                var y = p.markedSpans[m],
                  w = y.marker,
                  _ = 'selectLeft' in w ? !w.selectLeft : w.inclusiveLeft,
                  P = 'selectRight' in w ? !w.selectRight : w.inclusiveRight
                if (
                  (y.from == null || (_ ? y.from <= i.ch : y.from < i.ch)) &&
                  (y.to == null || (P ? y.to >= i.ch : y.to > i.ch))
                ) {
                  if (c && (me(w, 'beforeCursorEnter'), w.explicitlyCleared))
                    if (p.markedSpans) {
                      --m
                      continue
                    } else break
                  if (!w.atomic) continue
                  if (a) {
                    var $ = w.find(s < 0 ? 1 : -1),
                      j = void 0
                    if (
                      ((s < 0 ? P : _) && ($ = dp(n, $, -s, $ && $.line == i.line ? p : null)),
                      $ && $.line == i.line && (j = Y($, a)) && (s < 0 ? j < 0 : j > 0))
                    )
                      return xo(n, $, i, s, c)
                  }
                  var q = w.find(s < 0 ? -1 : 1)
                  return (s < 0 ? _ : P) && (q = dp(n, q, s, q.line == i.line ? p : null)), q ? xo(n, q, i, s, c) : null
                }
              }
            return i
          }
          function sl(n, i, a, s, c) {
            var p = s || 1,
              m = xo(n, i, a, p, c) || (!c && xo(n, i, a, p, !0)) || xo(n, i, a, -p, c) || (!c && xo(n, i, a, -p, !0))
            return m || ((n.cantEdit = !0), z(n.first, 0))
          }
          function dp(n, i, a, s) {
            return a < 0 && i.ch == 0
              ? i.line > n.first
                ? Bt(n, z(i.line - 1))
                : null
              : a > 0 && i.ch == (s || Lt(n, i.line)).text.length
                ? i.line < n.first + n.size - 1
                  ? z(i.line + 1, 0)
                  : null
                : new z(i.line, i.ch + a)
          }
          function pp(n) {
            n.setSelection(z(n.firstLine(), 0), z(n.lastLine()), O)
          }
          function gp(n, i, a) {
            var s = {
              canceled: !1,
              from: i.from,
              to: i.to,
              text: i.text,
              origin: i.origin,
              cancel: function () {
                return (s.canceled = !0)
              },
            }
            return (
              a &&
                (s.update = function (c, p, m, y) {
                  c && (s.from = Bt(n, c)), p && (s.to = Bt(n, p)), m && (s.text = m), y !== void 0 && (s.origin = y)
                }),
              me(n, 'beforeChange', n, s),
              n.cm && me(n.cm, 'beforeChange', n.cm, s),
              s.canceled
                ? (n.cm && (n.cm.curOp.updateInput = 2), null)
                : { from: s.from, to: s.to, text: s.text, origin: s.origin }
            )
          }
          function _o(n, i, a) {
            if (n.cm) {
              if (!n.cm.curOp) return Fe(n.cm, _o)(n, i, a)
              if (n.cm.state.suppressEdits) return
            }
            if (!((Je(n, 'beforeChange') || (n.cm && Je(n.cm, 'beforeChange'))) && ((i = gp(n, i, !0)), !i))) {
              var s = sd && !a && qb(n, i.from, i.to)
              if (s)
                for (var c = s.length - 1; c >= 0; --c)
                  vp(n, { from: s[c].from, to: s[c].to, text: c ? [''] : i.text, origin: i.origin })
              else vp(n, i)
            }
          }
          function vp(n, i) {
            if (!(i.text.length == 1 && i.text[0] == '' && Y(i.from, i.to) == 0)) {
              var a = mu(n, i)
              ip(n, i, a, n.cm ? n.cm.curOp.id : NaN), Ms(n, i, a, Uc(n, i))
              var s = []
              ii(n, function (c, p) {
                !p && it(s, c.history) == -1 && (wp(c.history, i), s.push(c.history)), Ms(c, i, null, Uc(c, i))
              })
            }
          }
          function al(n, i, a) {
            var s = n.cm && n.cm.state.suppressEdits
            if (!(s && !a)) {
              for (
                var c = n.history,
                  p,
                  m = n.sel,
                  y = i == 'undo' ? c.done : c.undone,
                  w = i == 'undo' ? c.undone : c.done,
                  _ = 0;
                _ < y.length && ((p = y[_]), !(a ? p.ranges && !p.equals(n.sel) : !p.ranges));
                _++
              );
              if (_ != y.length) {
                for (c.lastOrigin = c.lastSelOrigin = null; ; )
                  if (((p = y.pop()), p.ranges)) {
                    if ((rl(p, w), a && !p.equals(n.sel))) {
                      Xe(n, p, { clearRedo: !1 })
                      return
                    }
                    m = p
                  } else if (s) {
                    y.push(p)
                    return
                  } else break
                var P = []
                rl(m, w),
                  w.push({ changes: P, generation: c.generation }),
                  (c.generation = p.generation || ++c.maxGeneration)
                for (
                  var $ = Je(n, 'beforeChange') || (n.cm && Je(n.cm, 'beforeChange')),
                    j = function (rt) {
                      var dt = p.changes[rt]
                      if (((dt.origin = i), $ && !gp(n, dt, !1))) return (y.length = 0), {}
                      P.push(wu(n, dt))
                      var vt = rt ? mu(n, dt) : lt(y)
                      Ms(n, dt, vt, sp(n, dt)), !rt && n.cm && n.cm.scrollIntoView({ from: dt.from, to: ri(dt) })
                      var St = []
                      ii(n, function (mt, Ct) {
                        !Ct && it(St, mt.history) == -1 && (wp(mt.history, dt), St.push(mt.history)),
                          Ms(mt, dt, null, sp(mt, dt))
                      })
                    },
                    q = p.changes.length - 1;
                  q >= 0;
                  --q
                ) {
                  var Z = j(q)
                  if (Z) return Z.v
                }
              }
            }
          }
          function mp(n, i) {
            if (
              i != 0 &&
              ((n.first += i),
              (n.sel = new On(
                gt(n.sel.ranges, function (c) {
                  return new ce(z(c.anchor.line + i, c.anchor.ch), z(c.head.line + i, c.head.ch))
                }),
                n.sel.primIndex,
              )),
              n.cm)
            ) {
              an(n.cm, n.first, n.first - i, i)
              for (var a = n.cm.display, s = a.viewFrom; s < a.viewTo; s++) ti(n.cm, s, 'gutter')
            }
          }
          function Ms(n, i, a, s) {
            if (n.cm && !n.cm.curOp) return Fe(n.cm, Ms)(n, i, a, s)
            if (i.to.line < n.first) {
              mp(n, i.text.length - 1 - (i.to.line - i.from.line))
              return
            }
            if (!(i.from.line > n.lastLine())) {
              if (i.from.line < n.first) {
                var c = i.text.length - 1 - (n.first - i.from.line)
                mp(n, c),
                  (i = { from: z(n.first, 0), to: z(i.to.line + c, i.to.ch), text: [lt(i.text)], origin: i.origin })
              }
              var p = n.lastLine()
              i.to.line > p &&
                (i = { from: i.from, to: z(p, Lt(n, p).text.length), text: [i.text[0]], origin: i.origin }),
                (i.removed = kr(n, i.from, i.to)),
                a || (a = mu(n, i)),
                n.cm ? Uw(n.cm, i, s) : bu(n, i, s),
                ol(n, a, O),
                n.cantEdit && sl(n, z(n.firstLine(), 0)) && (n.cantEdit = !1)
            }
          }
          function Uw(n, i, a) {
            var s = n.doc,
              c = n.display,
              p = i.from,
              m = i.to,
              y = !1,
              w = p.line
            n.options.lineWrapping ||
              ((w = le(jn(Lt(s, p.line)))),
              s.iter(w, m.line + 1, function (q) {
                if (q == c.maxLine) return (y = !0), !0
              })),
              s.sel.contains(i.from, i.to) > -1 && $a(n),
              bu(s, i, a, Rd(n)),
              n.options.lineWrapping ||
                (s.iter(w, p.line + i.text.length, function (q) {
                  var Z = Ua(q)
                  Z > c.maxLineLength && ((c.maxLine = q), (c.maxLineLength = Z), (c.maxLineChanged = !0), (y = !1))
                }),
                y && (n.curOp.updateMaxLine = !0)),
              Ob(s, p.line),
              Es(n, 400)
            var _ = i.text.length - (m.line - p.line) - 1
            i.full
              ? an(n)
              : p.line == m.line && i.text.length == 1 && !tp(n.doc, i)
                ? ti(n, p.line, 'text')
                : an(n, p.line, m.line + 1, _)
            var P = Je(n, 'changes'),
              $ = Je(n, 'change')
            if ($ || P) {
              var j = { from: p, to: m, text: i.text, removed: i.removed, origin: i.origin }
              $ && Ie(n, 'change', n, j), P && (n.curOp.changeObjs || (n.curOp.changeObjs = [])).push(j)
            }
            n.display.selForContextMenu = null
          }
          function So(n, i, a, s, c) {
            var p
            s || (s = a),
              Y(s, a) < 0 && ((p = [s, a]), (a = p[0]), (s = p[1])),
              typeof i == 'string' && (i = n.splitLines(i)),
              _o(n, { from: a, to: s, text: i, origin: c })
          }
          function yp(n, i, a, s) {
            a < n.line ? (n.line += s) : i < n.line && ((n.line = i), (n.ch = 0))
          }
          function bp(n, i, a, s) {
            for (var c = 0; c < n.length; ++c) {
              var p = n[c],
                m = !0
              if (p.ranges) {
                p.copied || ((p = n[c] = p.deepCopy()), (p.copied = !0))
                for (var y = 0; y < p.ranges.length; y++) yp(p.ranges[y].anchor, i, a, s), yp(p.ranges[y].head, i, a, s)
                continue
              }
              for (var w = 0; w < p.changes.length; ++w) {
                var _ = p.changes[w]
                if (a < _.from.line) (_.from = z(_.from.line + s, _.from.ch)), (_.to = z(_.to.line + s, _.to.ch))
                else if (i <= _.to.line) {
                  m = !1
                  break
                }
              }
              m || (n.splice(0, c + 1), (c = 0))
            }
          }
          function wp(n, i) {
            var a = i.from.line,
              s = i.to.line,
              c = i.text.length - (s - a) - 1
            bp(n.done, a, s, c), bp(n.undone, a, s, c)
          }
          function Ns(n, i, a, s) {
            var c = i,
              p = i
            return (
              typeof i == 'number' ? (p = Lt(n, Pn(n, i))) : (c = le(i)),
              c == null ? null : (s(p, c) && n.cm && ti(n.cm, c, a), p)
            )
          }
          function Ps(n) {
            ;(this.lines = n), (this.parent = null)
            for (var i = 0, a = 0; a < n.length; ++a) (n[a].parent = this), (i += n[a].height)
            this.height = i
          }
          Ps.prototype = {
            chunkSize: function () {
              return this.lines.length
            },
            removeInner: function (n, i) {
              for (var a = n, s = n + i; a < s; ++a) {
                var c = this.lines[a]
                ;(this.height -= c.height), jb(c), Ie(c, 'delete')
              }
              this.lines.splice(n, i)
            },
            collapse: function (n) {
              n.push.apply(n, this.lines)
            },
            insertInner: function (n, i, a) {
              ;(this.height += a), (this.lines = this.lines.slice(0, n).concat(i).concat(this.lines.slice(n)))
              for (var s = 0; s < i.length; ++s) i[s].parent = this
            },
            iterN: function (n, i, a) {
              for (var s = n + i; n < s; ++n) if (a(this.lines[n])) return !0
            },
          }
          function Os(n) {
            this.children = n
            for (var i = 0, a = 0, s = 0; s < n.length; ++s) {
              var c = n[s]
              ;(i += c.chunkSize()), (a += c.height), (c.parent = this)
            }
            ;(this.size = i), (this.height = a), (this.parent = null)
          }
          Os.prototype = {
            chunkSize: function () {
              return this.size
            },
            removeInner: function (n, i) {
              this.size -= i
              for (var a = 0; a < this.children.length; ++a) {
                var s = this.children[a],
                  c = s.chunkSize()
                if (n < c) {
                  var p = Math.min(i, c - n),
                    m = s.height
                  if (
                    (s.removeInner(n, p),
                    (this.height -= m - s.height),
                    c == p && (this.children.splice(a--, 1), (s.parent = null)),
                    (i -= p) == 0)
                  )
                    break
                  n = 0
                } else n -= c
              }
              if (this.size - i < 25 && (this.children.length > 1 || !(this.children[0] instanceof Ps))) {
                var y = []
                this.collapse(y), (this.children = [new Ps(y)]), (this.children[0].parent = this)
              }
            },
            collapse: function (n) {
              for (var i = 0; i < this.children.length; ++i) this.children[i].collapse(n)
            },
            insertInner: function (n, i, a) {
              ;(this.size += i.length), (this.height += a)
              for (var s = 0; s < this.children.length; ++s) {
                var c = this.children[s],
                  p = c.chunkSize()
                if (n <= p) {
                  if ((c.insertInner(n, i, a), c.lines && c.lines.length > 50)) {
                    for (var m = (c.lines.length % 25) + 25, y = m; y < c.lines.length; ) {
                      var w = new Ps(c.lines.slice(y, (y += 25)))
                      ;(c.height -= w.height), this.children.splice(++s, 0, w), (w.parent = this)
                    }
                    ;(c.lines = c.lines.slice(0, m)), this.maybeSpill()
                  }
                  break
                }
                n -= p
              }
            },
            maybeSpill: function () {
              if (!(this.children.length <= 10)) {
                var n = this
                do {
                  var i = n.children.splice(n.children.length - 5, 5),
                    a = new Os(i)
                  if (n.parent) {
                    ;(n.size -= a.size), (n.height -= a.height)
                    var c = it(n.parent.children, n)
                    n.parent.children.splice(c + 1, 0, a)
                  } else {
                    var s = new Os(n.children)
                    ;(s.parent = n), (n.children = [s, a]), (n = s)
                  }
                  a.parent = n.parent
                } while (n.children.length > 10)
                n.parent.maybeSpill()
              }
            },
            iterN: function (n, i, a) {
              for (var s = 0; s < this.children.length; ++s) {
                var c = this.children[s],
                  p = c.chunkSize()
                if (n < p) {
                  var m = Math.min(i, p - n)
                  if (c.iterN(n, m, a)) return !0
                  if ((i -= m) == 0) break
                  n = 0
                } else n -= p
              }
            },
          }
          var $s = function (n, i, a) {
            if (a) for (var s in a) a.hasOwnProperty(s) && (this[s] = a[s])
            ;(this.doc = n), (this.node = i)
          }
          ;($s.prototype.clear = function () {
            var n = this.doc.cm,
              i = this.line.widgets,
              a = this.line,
              s = le(a)
            if (!(s == null || !i)) {
              for (var c = 0; c < i.length; ++c) i[c] == this && i.splice(c--, 1)
              i.length || (a.widgets = null)
              var p = ws(this)
              qn(a, Math.max(0, a.height - p)),
                n &&
                  (wn(n, function () {
                    xp(n, a, -p), ti(n, s, 'widget')
                  }),
                  Ie(n, 'lineWidgetCleared', n, this, s))
            }
          }),
            ($s.prototype.changed = function () {
              var n = this,
                i = this.height,
                a = this.doc.cm,
                s = this.line
              this.height = null
              var c = ws(this) - i
              c &&
                (Qr(this.doc, s) || qn(s, s.height + c),
                a &&
                  wn(a, function () {
                    ;(a.curOp.forceUpdate = !0), xp(a, s, c), Ie(a, 'lineWidgetChanged', a, n, le(s))
                  }))
            }),
            Qe($s)
          function xp(n, i, a) {
            Tr(i) < ((n.curOp && n.curOp.scrollTop) || n.doc.scrollTop) && fu(n, a)
          }
          function jw(n, i, a, s) {
            var c = new $s(n, a, s),
              p = n.cm
            return (
              p && c.noHScroll && (p.display.alignWidgets = !0),
              Ns(n, i, 'widget', function (m) {
                var y = m.widgets || (m.widgets = [])
                if (
                  (c.insertAt == null ? y.push(c) : y.splice(Math.min(y.length, Math.max(0, c.insertAt)), 0, c),
                  (c.line = m),
                  p && !Qr(n, m))
                ) {
                  var w = Tr(m) < n.scrollTop
                  qn(m, m.height + ws(c)), w && fu(p, c.height), (p.curOp.forceUpdate = !0)
                }
                return !0
              }),
              p && Ie(p, 'lineWidgetAdded', p, c, typeof i == 'number' ? i : le(i)),
              c
            )
          }
          var _p = 0,
            oi = function (n, i) {
              ;(this.lines = []), (this.type = i), (this.doc = n), (this.id = ++_p)
            }
          ;(oi.prototype.clear = function () {
            if (!this.explicitlyCleared) {
              var n = this.doc.cm,
                i = n && !n.curOp
              if ((i && Di(n), Je(this, 'clear'))) {
                var a = this.find()
                a && Ie(this, 'clear', a.from, a.to)
              }
              for (var s = null, c = null, p = 0; p < this.lines.length; ++p) {
                var m = this.lines[p],
                  y = ms(m.markedSpans, this)
                n && !this.collapsed
                  ? ti(n, le(m), 'text')
                  : n && (y.to != null && (c = le(m)), y.from != null && (s = le(m))),
                  (m.markedSpans = Rb(m.markedSpans, y)),
                  y.from == null && this.collapsed && !Qr(this.doc, m) && n && qn(m, go(n.display))
              }
              if (n && this.collapsed && !n.options.lineWrapping)
                for (var w = 0; w < this.lines.length; ++w) {
                  var _ = jn(this.lines[w]),
                    P = Ua(_)
                  P > n.display.maxLineLength &&
                    ((n.display.maxLine = _), (n.display.maxLineLength = P), (n.display.maxLineChanged = !0))
                }
              s != null && n && this.collapsed && an(n, s, c + 1),
                (this.lines.length = 0),
                (this.explicitlyCleared = !0),
                this.atomic && this.doc.cantEdit && ((this.doc.cantEdit = !1), n && fp(n.doc)),
                n && Ie(n, 'markerCleared', n, this, s, c),
                i && Ri(n),
                this.parent && this.parent.clear()
            }
          }),
            (oi.prototype.find = function (n, i) {
              n == null && this.type == 'bookmark' && (n = 1)
              for (var a, s, c = 0; c < this.lines.length; ++c) {
                var p = this.lines[c],
                  m = ms(p.markedSpans, this)
                if (m.from != null && ((a = z(i ? p : le(p), m.from)), n == -1)) return a
                if (m.to != null && ((s = z(i ? p : le(p), m.to)), n == 1)) return s
              }
              return a && { from: a, to: s }
            }),
            (oi.prototype.changed = function () {
              var n = this,
                i = this.find(-1, !0),
                a = this,
                s = this.doc.cm
              !i ||
                !s ||
                wn(s, function () {
                  var c = i.line,
                    p = le(i.line),
                    m = Jc(s, p)
                  if (
                    (m && (Ld(m), (s.curOp.selectionChanged = s.curOp.forceUpdate = !0)),
                    (s.curOp.updateMaxLine = !0),
                    !Qr(a.doc, c) && a.height != null)
                  ) {
                    var y = a.height
                    a.height = null
                    var w = ws(a) - y
                    w && qn(c, c.height + w)
                  }
                  Ie(s, 'markerChanged', s, n)
                })
            }),
            (oi.prototype.attachLine = function (n) {
              if (!this.lines.length && this.doc.cm) {
                var i = this.doc.cm.curOp
                ;(!i.maybeHiddenMarkers || it(i.maybeHiddenMarkers, this) == -1) &&
                  (i.maybeUnhiddenMarkers || (i.maybeUnhiddenMarkers = [])).push(this)
              }
              this.lines.push(n)
            }),
            (oi.prototype.detachLine = function (n) {
              if ((this.lines.splice(it(this.lines, n), 1), !this.lines.length && this.doc.cm)) {
                var i = this.doc.cm.curOp
                ;(i.maybeHiddenMarkers || (i.maybeHiddenMarkers = [])).push(this)
              }
            }),
            Qe(oi)
          function ko(n, i, a, s, c) {
            if (s && s.shared) return Gw(n, i, a, s, c)
            if (n.cm && !n.cm.curOp) return Fe(n.cm, ko)(n, i, a, s, c)
            var p = new oi(n, c),
              m = Y(i, a)
            if ((s && _t(s, p, !1), m > 0 || (m == 0 && p.clearWhenEmpty !== !1))) return p
            if (
              (p.replacedWith &&
                ((p.collapsed = !0),
                (p.widgetNode = H('span', [p.replacedWith], 'CodeMirror-widget')),
                s.handleMouseEvents || p.widgetNode.setAttribute('cm-ignore-events', 'true'),
                s.insertLeft && (p.widgetNode.insertLeft = !0)),
              p.collapsed)
            ) {
              if (hd(n, i.line, i, a, p) || (i.line != a.line && hd(n, a.line, i, a, p)))
                throw new Error('Inserting collapsed marker partially overlapping an existing one')
              Db()
            }
            p.addToHistory && ip(n, { from: i, to: a, origin: 'markText' }, n.sel, NaN)
            var y = i.line,
              w = n.cm,
              _
            if (
              (n.iter(y, a.line + 1, function ($) {
                w && p.collapsed && !w.options.lineWrapping && jn($) == w.display.maxLine && (_ = !0),
                  p.collapsed && y != i.line && qn($, 0),
                  zb($, new qa(p, y == i.line ? i.ch : null, y == a.line ? a.ch : null), n.cm && n.cm.curOp),
                  ++y
              }),
              p.collapsed &&
                n.iter(i.line, a.line + 1, function ($) {
                  Qr(n, $) && qn($, 0)
                }),
              p.clearOnEnter &&
                bt(p, 'beforeCursorEnter', function () {
                  return p.clear()
                }),
              p.readOnly && ($b(), (n.history.done.length || n.history.undone.length) && n.clearHistory()),
              p.collapsed && ((p.id = ++_p), (p.atomic = !0)),
              w)
            ) {
              if ((_ && (w.curOp.updateMaxLine = !0), p.collapsed)) an(w, i.line, a.line + 1)
              else if (p.className || p.startStyle || p.endStyle || p.css || p.attributes || p.title)
                for (var P = i.line; P <= a.line; P++) ti(w, P, 'text')
              p.atomic && fp(w.doc), Ie(w, 'markerAdded', w, p)
            }
            return p
          }
          var Ds = function (n, i) {
            ;(this.markers = n), (this.primary = i)
            for (var a = 0; a < n.length; ++a) n[a].parent = this
          }
          ;(Ds.prototype.clear = function () {
            if (!this.explicitlyCleared) {
              this.explicitlyCleared = !0
              for (var n = 0; n < this.markers.length; ++n) this.markers[n].clear()
              Ie(this, 'clear')
            }
          }),
            (Ds.prototype.find = function (n, i) {
              return this.primary.find(n, i)
            }),
            Qe(Ds)
          function Gw(n, i, a, s, c) {
            ;(s = _t(s)), (s.shared = !1)
            var p = [ko(n, i, a, s, c)],
              m = p[0],
              y = s.widgetNode
            return (
              ii(n, function (w) {
                y && (s.widgetNode = y.cloneNode(!0)), p.push(ko(w, Bt(w, i), Bt(w, a), s, c))
                for (var _ = 0; _ < w.linked.length; ++_) if (w.linked[_].isParent) return
                m = lt(p)
              }),
              new Ds(p, m)
            )
          }
          function Sp(n) {
            return n.findMarks(z(n.first, 0), n.clipPos(z(n.lastLine())), function (i) {
              return i.parent
            })
          }
          function Vw(n, i) {
            for (var a = 0; a < i.length; a++) {
              var s = i[a],
                c = s.find(),
                p = n.clipPos(c.from),
                m = n.clipPos(c.to)
              if (Y(p, m)) {
                var y = ko(n, p, m, s.primary, s.primary.type)
                s.markers.push(y), (y.parent = s)
              }
            }
          }
          function Kw(n) {
            for (
              var i = function (s) {
                  var c = n[s],
                    p = [c.primary.doc]
                  ii(c.primary.doc, function (w) {
                    return p.push(w)
                  })
                  for (var m = 0; m < c.markers.length; m++) {
                    var y = c.markers[m]
                    it(p, y.doc) == -1 && ((y.parent = null), c.markers.splice(m--, 1))
                  }
                },
                a = 0;
              a < n.length;
              a++
            )
              i(a)
          }
          var Xw = 0,
            ln = function (n, i, a, s, c) {
              if (!(this instanceof ln)) return new ln(n, i, a, s, c)
              a == null && (a = 0),
                Os.call(this, [new Ps([new fo('', null)])]),
                (this.first = a),
                (this.scrollTop = this.scrollLeft = 0),
                (this.cantEdit = !1),
                (this.cleanGeneration = 1),
                (this.modeFrontier = this.highlightFrontier = a)
              var p = z(a, 0)
              ;(this.sel = ni(p)),
                (this.history = new nl(null)),
                (this.id = ++Xw),
                (this.modeOption = i),
                (this.lineSep = s),
                (this.direction = c == 'rtl' ? 'rtl' : 'ltr'),
                (this.extend = !1),
                typeof n == 'string' && (n = this.splitLines(n)),
                bu(this, { from: p, to: p, text: n }),
                Xe(this, ni(p), O)
            }
          ;(ln.prototype = $t(Os.prototype, {
            constructor: ln,
            iter: function (n, i, a) {
              a ? this.iterN(n - this.first, i - n, a) : this.iterN(this.first, this.first + this.size, n)
            },
            insert: function (n, i) {
              for (var a = 0, s = 0; s < i.length; ++s) a += i[s].height
              this.insertInner(n - this.first, i, a)
            },
            remove: function (n, i) {
              this.removeInner(n - this.first, i)
            },
            getValue: function (n) {
              var i = uo(this, this.first, this.first + this.size)
              return n === !1 ? i : i.join(n || this.lineSeparator())
            },
            setValue: qe(function (n) {
              var i = z(this.first, 0),
                a = this.first + this.size - 1
              _o(
                this,
                { from: i, to: z(a, Lt(this, a).text.length), text: this.splitLines(n), origin: 'setValue', full: !0 },
                !0,
              ),
                this.cm && Ss(this.cm, 0, 0),
                Xe(this, ni(i), O)
            }),
            replaceRange: function (n, i, a, s) {
              ;(i = Bt(this, i)), (a = a ? Bt(this, a) : i), So(this, n, i, a, s)
            },
            getRange: function (n, i, a) {
              var s = kr(this, Bt(this, n), Bt(this, i))
              return a === !1 ? s : a === '' ? s.join('') : s.join(a || this.lineSeparator())
            },
            getLine: function (n) {
              var i = this.getLineHandle(n)
              return i && i.text
            },
            getLineHandle: function (n) {
              if (C(this, n)) return Lt(this, n)
            },
            getLineNumber: function (n) {
              return le(n)
            },
            getLineHandleVisualStart: function (n) {
              return typeof n == 'number' && (n = Lt(this, n)), jn(n)
            },
            lineCount: function () {
              return this.size
            },
            firstLine: function () {
              return this.first
            },
            lastLine: function () {
              return this.first + this.size - 1
            },
            clipPos: function (n) {
              return Bt(this, n)
            },
            getCursor: function (n) {
              var i = this.sel.primary(),
                a
              return (
                n == null || n == 'head'
                  ? (a = i.head)
                  : n == 'anchor'
                    ? (a = i.anchor)
                    : n == 'end' || n == 'to' || n === !1
                      ? (a = i.to())
                      : (a = i.from()),
                a
              )
            },
            listSelections: function () {
              return this.sel.ranges
            },
            somethingSelected: function () {
              return this.sel.somethingSelected()
            },
            setCursor: qe(function (n, i, a) {
              lp(this, Bt(this, typeof n == 'number' ? z(n, i || 0) : n), null, a)
            }),
            setSelection: qe(function (n, i, a) {
              lp(this, Bt(this, n), Bt(this, i || n), a)
            }),
            extendSelection: qe(function (n, i, a) {
              il(this, Bt(this, n), i && Bt(this, i), a)
            }),
            extendSelections: qe(function (n, i) {
              ap(this, Jh(this, n), i)
            }),
            extendSelectionsBy: qe(function (n, i) {
              var a = gt(this.sel.ranges, n)
              ap(this, Jh(this, a), i)
            }),
            setSelections: qe(function (n, i, a) {
              if (n.length) {
                for (var s = [], c = 0; c < n.length; c++)
                  s[c] = new ce(Bt(this, n[c].anchor), Bt(this, n[c].head || n[c].anchor))
                i == null && (i = Math.min(n.length - 1, this.sel.primIndex)), Xe(this, Vn(this.cm, s, i), a)
              }
            }),
            addSelection: qe(function (n, i, a) {
              var s = this.sel.ranges.slice(0)
              s.push(new ce(Bt(this, n), Bt(this, i || n))), Xe(this, Vn(this.cm, s, s.length - 1), a)
            }),
            getSelection: function (n) {
              for (var i = this.sel.ranges, a, s = 0; s < i.length; s++) {
                var c = kr(this, i[s].from(), i[s].to())
                a = a ? a.concat(c) : c
              }
              return n === !1 ? a : a.join(n || this.lineSeparator())
            },
            getSelections: function (n) {
              for (var i = [], a = this.sel.ranges, s = 0; s < a.length; s++) {
                var c = kr(this, a[s].from(), a[s].to())
                n !== !1 && (c = c.join(n || this.lineSeparator())), (i[s] = c)
              }
              return i
            },
            replaceSelection: function (n, i, a) {
              for (var s = [], c = 0; c < this.sel.ranges.length; c++) s[c] = n
              this.replaceSelections(s, i, a || '+input')
            },
            replaceSelections: qe(function (n, i, a) {
              for (var s = [], c = this.sel, p = 0; p < c.ranges.length; p++) {
                var m = c.ranges[p]
                s[p] = { from: m.from(), to: m.to(), text: this.splitLines(n[p]), origin: a }
              }
              for (var y = i && i != 'end' && Rw(this, s, i), w = s.length - 1; w >= 0; w--) _o(this, s[w])
              y ? cp(this, y) : this.cm && yo(this.cm)
            }),
            undo: qe(function () {
              al(this, 'undo')
            }),
            redo: qe(function () {
              al(this, 'redo')
            }),
            undoSelection: qe(function () {
              al(this, 'undo', !0)
            }),
            redoSelection: qe(function () {
              al(this, 'redo', !0)
            }),
            setExtending: function (n) {
              this.extend = n
            },
            getExtending: function () {
              return this.extend
            },
            historySize: function () {
              for (var n = this.history, i = 0, a = 0, s = 0; s < n.done.length; s++) n.done[s].ranges || ++i
              for (var c = 0; c < n.undone.length; c++) n.undone[c].ranges || ++a
              return { undo: i, redo: a }
            },
            clearHistory: function () {
              var n = this
              ;(this.history = new nl(this.history)),
                ii(
                  this,
                  function (i) {
                    return (i.history = n.history)
                  },
                  !0,
                )
            },
            markClean: function () {
              this.cleanGeneration = this.changeGeneration(!0)
            },
            changeGeneration: function (n) {
              return (
                n && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null),
                this.history.generation
              )
            },
            isClean: function (n) {
              return this.history.generation == (n || this.cleanGeneration)
            },
            getHistory: function () {
              return { done: wo(this.history.done), undone: wo(this.history.undone) }
            },
            setHistory: function (n) {
              var i = (this.history = new nl(this.history))
              ;(i.done = wo(n.done.slice(0), null, !0)), (i.undone = wo(n.undone.slice(0), null, !0))
            },
            setGutterMarker: qe(function (n, i, a) {
              return Ns(this, n, 'gutter', function (s) {
                var c = s.gutterMarkers || (s.gutterMarkers = {})
                return (c[i] = a), !a && jt(c) && (s.gutterMarkers = null), !0
              })
            }),
            clearGutter: qe(function (n) {
              var i = this
              this.iter(function (a) {
                a.gutterMarkers &&
                  a.gutterMarkers[n] &&
                  Ns(i, a, 'gutter', function () {
                    return (a.gutterMarkers[n] = null), jt(a.gutterMarkers) && (a.gutterMarkers = null), !0
                  })
              })
            }),
            lineInfo: function (n) {
              var i
              if (typeof n == 'number') {
                if (!C(this, n) || ((i = n), (n = Lt(this, n)), !n)) return null
              } else if (((i = le(n)), i == null)) return null
              return {
                line: i,
                handle: n,
                text: n.text,
                gutterMarkers: n.gutterMarkers,
                textClass: n.textClass,
                bgClass: n.bgClass,
                wrapClass: n.wrapClass,
                widgets: n.widgets,
              }
            },
            addLineClass: qe(function (n, i, a) {
              return Ns(this, n, i == 'gutter' ? 'gutter' : 'class', function (s) {
                var c =
                  i == 'text'
                    ? 'textClass'
                    : i == 'background'
                      ? 'bgClass'
                      : i == 'gutter'
                        ? 'gutterClass'
                        : 'wrapClass'
                if (!s[c]) s[c] = a
                else {
                  if (kt(a).test(s[c])) return !1
                  s[c] += ' ' + a
                }
                return !0
              })
            }),
            removeLineClass: qe(function (n, i, a) {
              return Ns(this, n, i == 'gutter' ? 'gutter' : 'class', function (s) {
                var c =
                    i == 'text'
                      ? 'textClass'
                      : i == 'background'
                        ? 'bgClass'
                        : i == 'gutter'
                          ? 'gutterClass'
                          : 'wrapClass',
                  p = s[c]
                if (p)
                  if (a == null) s[c] = null
                  else {
                    var m = p.match(kt(a))
                    if (!m) return !1
                    var y = m.index + m[0].length
                    s[c] = p.slice(0, m.index) + (!m.index || y == p.length ? '' : ' ') + p.slice(y) || null
                  }
                else return !1
                return !0
              })
            }),
            addLineWidget: qe(function (n, i, a) {
              return jw(this, n, i, a)
            }),
            removeLineWidget: function (n) {
              n.clear()
            },
            markText: function (n, i, a) {
              return ko(this, Bt(this, n), Bt(this, i), a, (a && a.type) || 'range')
            },
            setBookmark: function (n, i) {
              var a = {
                replacedWith: i && (i.nodeType == null ? i.widget : i),
                insertLeft: i && i.insertLeft,
                clearWhenEmpty: !1,
                shared: i && i.shared,
                handleMouseEvents: i && i.handleMouseEvents,
              }
              return (n = Bt(this, n)), ko(this, n, n, a, 'bookmark')
            },
            findMarksAt: function (n) {
              n = Bt(this, n)
              var i = [],
                a = Lt(this, n.line).markedSpans
              if (a)
                for (var s = 0; s < a.length; ++s) {
                  var c = a[s]
                  ;(c.from == null || c.from <= n.ch) &&
                    (c.to == null || c.to >= n.ch) &&
                    i.push(c.marker.parent || c.marker)
                }
              return i
            },
            findMarks: function (n, i, a) {
              ;(n = Bt(this, n)), (i = Bt(this, i))
              var s = [],
                c = n.line
              return (
                this.iter(n.line, i.line + 1, function (p) {
                  var m = p.markedSpans
                  if (m)
                    for (var y = 0; y < m.length; y++) {
                      var w = m[y]
                      !(
                        (w.to != null && c == n.line && n.ch >= w.to) ||
                        (w.from == null && c != n.line) ||
                        (w.from != null && c == i.line && w.from >= i.ch)
                      ) &&
                        (!a || a(w.marker)) &&
                        s.push(w.marker.parent || w.marker)
                    }
                  ++c
                }),
                s
              )
            },
            getAllMarks: function () {
              var n = []
              return (
                this.iter(function (i) {
                  var a = i.markedSpans
                  if (a) for (var s = 0; s < a.length; ++s) a[s].from != null && n.push(a[s].marker)
                }),
                n
              )
            },
            posFromIndex: function (n) {
              var i,
                a = this.first,
                s = this.lineSeparator().length
              return (
                this.iter(function (c) {
                  var p = c.text.length + s
                  if (p > n) return (i = n), !0
                  ;(n -= p), ++a
                }),
                Bt(this, z(a, i))
              )
            },
            indexFromPos: function (n) {
              n = Bt(this, n)
              var i = n.ch
              if (n.line < this.first || n.ch < 0) return 0
              var a = this.lineSeparator().length
              return (
                this.iter(this.first, n.line, function (s) {
                  i += s.text.length + a
                }),
                i
              )
            },
            copy: function (n) {
              var i = new ln(
                uo(this, this.first, this.first + this.size),
                this.modeOption,
                this.first,
                this.lineSep,
                this.direction,
              )
              return (
                (i.scrollTop = this.scrollTop),
                (i.scrollLeft = this.scrollLeft),
                (i.sel = this.sel),
                (i.extend = !1),
                n && ((i.history.undoDepth = this.history.undoDepth), i.setHistory(this.getHistory())),
                i
              )
            },
            linkedDoc: function (n) {
              n || (n = {})
              var i = this.first,
                a = this.first + this.size
              n.from != null && n.from > i && (i = n.from), n.to != null && n.to < a && (a = n.to)
              var s = new ln(uo(this, i, a), n.mode || this.modeOption, i, this.lineSep, this.direction)
              return (
                n.sharedHist && (s.history = this.history),
                (this.linked || (this.linked = [])).push({ doc: s, sharedHist: n.sharedHist }),
                (s.linked = [{ doc: this, isParent: !0, sharedHist: n.sharedHist }]),
                Vw(s, Sp(this)),
                s
              )
            },
            unlinkDoc: function (n) {
              if ((n instanceof we && (n = n.doc), this.linked))
                for (var i = 0; i < this.linked.length; ++i) {
                  var a = this.linked[i]
                  if (a.doc == n) {
                    this.linked.splice(i, 1), n.unlinkDoc(this), Kw(Sp(this))
                    break
                  }
                }
              if (n.history == this.history) {
                var s = [n.id]
                ii(
                  n,
                  function (c) {
                    return s.push(c.id)
                  },
                  !0,
                ),
                  (n.history = new nl(null)),
                  (n.history.done = wo(this.history.done, s)),
                  (n.history.undone = wo(this.history.undone, s))
              }
            },
            iterLinkedDocs: function (n) {
              ii(this, n)
            },
            getMode: function () {
              return this.mode
            },
            getEditor: function () {
              return this.cm
            },
            splitLines: function (n) {
              return this.lineSep ? n.split(this.lineSep) : ps(n)
            },
            lineSeparator: function () {
              return (
                this.lineSep ||
                `
`
              )
            },
            setDirection: qe(function (n) {
              n != 'rtl' && (n = 'ltr'),
                n != this.direction &&
                  ((this.direction = n),
                  this.iter(function (i) {
                    return (i.order = null)
                  }),
                  this.cm && zw(this.cm))
            }),
          })),
            (ln.prototype.eachLine = ln.prototype.iter)
          var kp = 0
          function Yw(n) {
            var i = this
            if ((Cp(i), !(ke(i, n) || Er(i.display, n)))) {
              Ke(n), d && (kp = +new Date())
              var a = Ni(i, n, !0),
                s = n.dataTransfer.files
              if (!(!a || i.isReadOnly()))
                if (s && s.length && window.FileReader && window.File)
                  for (
                    var c = s.length,
                      p = Array(c),
                      m = 0,
                      y = function () {
                        ++m == c &&
                          Fe(i, function () {
                            a = Bt(i.doc, a)
                            var q = {
                              from: a,
                              to: a,
                              text: i.doc.splitLines(
                                p
                                  .filter(function (Z) {
                                    return Z != null
                                  })
                                  .join(i.doc.lineSeparator()),
                              ),
                              origin: 'paste',
                            }
                            _o(i.doc, q), cp(i.doc, ni(Bt(i.doc, a), Bt(i.doc, ri(q))))
                          })()
                      },
                      w = function (q, Z) {
                        if (i.options.allowDropFileTypes && it(i.options.allowDropFileTypes, q.type) == -1) {
                          y()
                          return
                        }
                        var rt = new FileReader()
                        ;(rt.onerror = function () {
                          return y()
                        }),
                          (rt.onload = function () {
                            var dt = rt.result
                            if (/[\x00-\x08\x0e-\x1f]{2}/.test(dt)) {
                              y()
                              return
                            }
                            ;(p[Z] = dt), y()
                          }),
                          rt.readAsText(q)
                      },
                      _ = 0;
                    _ < s.length;
                    _++
                  )
                    w(s[_], _)
                else {
                  if (i.state.draggingText && i.doc.sel.contains(a) > -1) {
                    i.state.draggingText(n),
                      setTimeout(function () {
                        return i.display.input.focus()
                      }, 20)
                    return
                  }
                  try {
                    var P = n.dataTransfer.getData('Text')
                    if (P) {
                      var $
                      if (
                        (i.state.draggingText && !i.state.draggingText.copy && ($ = i.listSelections()),
                        ol(i.doc, ni(a, a)),
                        $)
                      )
                        for (var j = 0; j < $.length; ++j) So(i.doc, '', $[j].anchor, $[j].head, 'drag')
                      i.replaceSelection(P, 'around', 'paste'), i.display.input.focus()
                    }
                  } catch {}
                }
            }
          }
          function Zw(n, i) {
            if (d && (!n.state.draggingText || +new Date() - kp < 100)) {
              xr(i)
              return
            }
            if (
              !(ke(n, i) || Er(n.display, i)) &&
              (i.dataTransfer.setData('Text', n.getSelection()),
              (i.dataTransfer.effectAllowed = 'copyMove'),
              i.dataTransfer.setDragImage && !T)
            ) {
              var a = k('img', null, null, 'position: fixed; left: 0; top: 0;')
              ;(a.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='),
                M && ((a.width = a.height = 1), n.display.wrapper.appendChild(a), (a._top = a.offsetTop)),
                i.dataTransfer.setDragImage(a, 0, 0),
                M && a.parentNode.removeChild(a)
            }
          }
          function Jw(n, i) {
            var a = Ni(n, i)
            if (a) {
              var s = document.createDocumentFragment()
              su(n, a, s),
                n.display.dragCursor ||
                  ((n.display.dragCursor = k('div', null, 'CodeMirror-cursors CodeMirror-dragcursors')),
                  n.display.lineSpace.insertBefore(n.display.dragCursor, n.display.cursorDiv)),
                R(n.display.dragCursor, s)
            }
          }
          function Cp(n) {
            n.display.dragCursor &&
              (n.display.lineSpace.removeChild(n.display.dragCursor), (n.display.dragCursor = null))
          }
          function Tp(n) {
            if (document.getElementsByClassName) {
              for (var i = document.getElementsByClassName('CodeMirror'), a = [], s = 0; s < i.length; s++) {
                var c = i[s].CodeMirror
                c && a.push(c)
              }
              a.length &&
                a[0].operation(function () {
                  for (var p = 0; p < a.length; p++) n(a[p])
                })
            }
          }
          var Ep = !1
          function Qw() {
            Ep || (tx(), (Ep = !0))
          }
          function tx() {
            var n
            bt(window, 'resize', function () {
              n == null &&
                (n = setTimeout(function () {
                  ;(n = null), Tp(ex)
                }, 100))
            }),
              bt(window, 'blur', function () {
                return Tp(mo)
              })
          }
          function ex(n) {
            var i = n.display
            ;(i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null), (i.scrollbarsClipped = !1), n.setSize()
          }
          for (
            var si = {
                3: 'Pause',
                8: 'Backspace',
                9: 'Tab',
                13: 'Enter',
                16: 'Shift',
                17: 'Ctrl',
                18: 'Alt',
                19: 'Pause',
                20: 'CapsLock',
                27: 'Esc',
                32: 'Space',
                33: 'PageUp',
                34: 'PageDown',
                35: 'End',
                36: 'Home',
                37: 'Left',
                38: 'Up',
                39: 'Right',
                40: 'Down',
                44: 'PrintScrn',
                45: 'Insert',
                46: 'Delete',
                59: ';',
                61: '=',
                91: 'Mod',
                92: 'Mod',
                93: 'Mod',
                106: '*',
                107: '=',
                109: '-',
                110: '.',
                111: '/',
                145: 'ScrollLock',
                173: '-',
                186: ';',
                187: '=',
                188: ',',
                189: '-',
                190: '.',
                191: '/',
                192: '`',
                219: '[',
                220: '\\',
                221: ']',
                222: "'",
                224: 'Mod',
                63232: 'Up',
                63233: 'Down',
                63234: 'Left',
                63235: 'Right',
                63272: 'Delete',
                63273: 'Home',
                63275: 'End',
                63276: 'PageUp',
                63277: 'PageDown',
                63302: 'Insert',
              },
              Rs = 0;
            Rs < 10;
            Rs++
          )
            si[Rs + 48] = si[Rs + 96] = String(Rs)
          for (var ll = 65; ll <= 90; ll++) si[ll] = String.fromCharCode(ll)
          for (var zs = 1; zs <= 12; zs++) si[zs + 111] = si[zs + 63235] = 'F' + zs
          var Ar = {}
          ;(Ar.basic = {
            Left: 'goCharLeft',
            Right: 'goCharRight',
            Up: 'goLineUp',
            Down: 'goLineDown',
            End: 'goLineEnd',
            Home: 'goLineStartSmart',
            PageUp: 'goPageUp',
            PageDown: 'goPageDown',
            Delete: 'delCharAfter',
            Backspace: 'delCharBefore',
            'Shift-Backspace': 'delCharBefore',
            Tab: 'defaultTab',
            'Shift-Tab': 'indentAuto',
            Enter: 'newlineAndIndent',
            Insert: 'toggleOverwrite',
            Esc: 'singleSelection',
          }),
            (Ar.pcDefault = {
              'Ctrl-A': 'selectAll',
              'Ctrl-D': 'deleteLine',
              'Ctrl-Z': 'undo',
              'Shift-Ctrl-Z': 'redo',
              'Ctrl-Y': 'redo',
              'Ctrl-Home': 'goDocStart',
              'Ctrl-End': 'goDocEnd',
              'Ctrl-Up': 'goLineUp',
              'Ctrl-Down': 'goLineDown',
              'Ctrl-Left': 'goGroupLeft',
              'Ctrl-Right': 'goGroupRight',
              'Alt-Left': 'goLineStart',
              'Alt-Right': 'goLineEnd',
              'Ctrl-Backspace': 'delGroupBefore',
              'Ctrl-Delete': 'delGroupAfter',
              'Ctrl-S': 'save',
              'Ctrl-F': 'find',
              'Ctrl-G': 'findNext',
              'Shift-Ctrl-G': 'findPrev',
              'Shift-Ctrl-F': 'replace',
              'Shift-Ctrl-R': 'replaceAll',
              'Ctrl-[': 'indentLess',
              'Ctrl-]': 'indentMore',
              'Ctrl-U': 'undoSelection',
              'Shift-Ctrl-U': 'redoSelection',
              'Alt-U': 'redoSelection',
              fallthrough: 'basic',
            }),
            (Ar.emacsy = {
              'Ctrl-F': 'goCharRight',
              'Ctrl-B': 'goCharLeft',
              'Ctrl-P': 'goLineUp',
              'Ctrl-N': 'goLineDown',
              'Ctrl-A': 'goLineStart',
              'Ctrl-E': 'goLineEnd',
              'Ctrl-V': 'goPageDown',
              'Shift-Ctrl-V': 'goPageUp',
              'Ctrl-D': 'delCharAfter',
              'Ctrl-H': 'delCharBefore',
              'Alt-Backspace': 'delWordBefore',
              'Ctrl-K': 'killLine',
              'Ctrl-T': 'transposeChars',
              'Ctrl-O': 'openLine',
            }),
            (Ar.macDefault = {
              'Cmd-A': 'selectAll',
              'Cmd-D': 'deleteLine',
              'Cmd-Z': 'undo',
              'Shift-Cmd-Z': 'redo',
              'Cmd-Y': 'redo',
              'Cmd-Home': 'goDocStart',
              'Cmd-Up': 'goDocStart',
              'Cmd-End': 'goDocEnd',
              'Cmd-Down': 'goDocEnd',
              'Alt-Left': 'goGroupLeft',
              'Alt-Right': 'goGroupRight',
              'Cmd-Left': 'goLineLeft',
              'Cmd-Right': 'goLineRight',
              'Alt-Backspace': 'delGroupBefore',
              'Ctrl-Alt-Backspace': 'delGroupAfter',
              'Alt-Delete': 'delGroupAfter',
              'Cmd-S': 'save',
              'Cmd-F': 'find',
              'Cmd-G': 'findNext',
              'Shift-Cmd-G': 'findPrev',
              'Cmd-Alt-F': 'replace',
              'Shift-Cmd-Alt-F': 'replaceAll',
              'Cmd-[': 'indentLess',
              'Cmd-]': 'indentMore',
              'Cmd-Backspace': 'delWrappedLineLeft',
              'Cmd-Delete': 'delWrappedLineRight',
              'Cmd-U': 'undoSelection',
              'Shift-Cmd-U': 'redoSelection',
              'Ctrl-Up': 'goDocStart',
              'Ctrl-Down': 'goDocEnd',
              fallthrough: ['basic', 'emacsy'],
            }),
            (Ar.default = B ? Ar.macDefault : Ar.pcDefault)
          function nx(n) {
            var i = n.split(/-(?!$)/)
            n = i[i.length - 1]
            for (var a, s, c, p, m = 0; m < i.length - 1; m++) {
              var y = i[m]
              if (/^(cmd|meta|m)$/i.test(y)) p = !0
              else if (/^a(lt)?$/i.test(y)) a = !0
              else if (/^(c|ctrl|control)$/i.test(y)) s = !0
              else if (/^s(hift)?$/i.test(y)) c = !0
              else throw new Error('Unrecognized modifier name: ' + y)
            }
            return a && (n = 'Alt-' + n), s && (n = 'Ctrl-' + n), p && (n = 'Cmd-' + n), c && (n = 'Shift-' + n), n
          }
          function rx(n) {
            var i = {}
            for (var a in n)
              if (n.hasOwnProperty(a)) {
                var s = n[a]
                if (/^(name|fallthrough|(de|at)tach)$/.test(a)) continue
                if (s == '...') {
                  delete n[a]
                  continue
                }
                for (var c = gt(a.split(' '), nx), p = 0; p < c.length; p++) {
                  var m = void 0,
                    y = void 0
                  p == c.length - 1 ? ((y = c.join(' ')), (m = s)) : ((y = c.slice(0, p + 1).join(' ')), (m = '...'))
                  var w = i[y]
                  if (!w) i[y] = m
                  else if (w != m) throw new Error('Inconsistent bindings for ' + y)
                }
                delete n[a]
              }
            for (var _ in i) n[_] = i[_]
            return n
          }
          function Co(n, i, a, s) {
            i = cl(i)
            var c = i.call ? i.call(n, s) : i[n]
            if (c === !1) return 'nothing'
            if (c === '...') return 'multi'
            if (c != null && a(c)) return 'handled'
            if (i.fallthrough) {
              if (Object.prototype.toString.call(i.fallthrough) != '[object Array]') return Co(n, i.fallthrough, a, s)
              for (var p = 0; p < i.fallthrough.length; p++) {
                var m = Co(n, i.fallthrough[p], a, s)
                if (m) return m
              }
            }
          }
          function Lp(n) {
            var i = typeof n == 'string' ? n : si[n.keyCode]
            return i == 'Ctrl' || i == 'Alt' || i == 'Shift' || i == 'Mod'
          }
          function Ap(n, i, a) {
            var s = n
            return (
              i.altKey && s != 'Alt' && (n = 'Alt-' + n),
              (st ? i.metaKey : i.ctrlKey) && s != 'Ctrl' && (n = 'Ctrl-' + n),
              (st ? i.ctrlKey : i.metaKey) && s != 'Mod' && (n = 'Cmd-' + n),
              !a && i.shiftKey && s != 'Shift' && (n = 'Shift-' + n),
              n
            )
          }
          function Mp(n, i) {
            if (M && n.keyCode == 34 && n.char) return !1
            var a = si[n.keyCode]
            return a == null || n.altGraphKey ? !1 : (n.keyCode == 3 && n.code && (a = n.code), Ap(a, n, i))
          }
          function cl(n) {
            return typeof n == 'string' ? Ar[n] : n
          }
          function To(n, i) {
            for (var a = n.doc.sel.ranges, s = [], c = 0; c < a.length; c++) {
              for (var p = i(a[c]); s.length && Y(p.from, lt(s).to) <= 0; ) {
                var m = s.pop()
                if (Y(m.from, p.from) < 0) {
                  p.from = m.from
                  break
                }
              }
              s.push(p)
            }
            wn(n, function () {
              for (var y = s.length - 1; y >= 0; y--) So(n.doc, '', s[y].from, s[y].to, '+delete')
              yo(n)
            })
          }
          function Su(n, i, a) {
            var s = ue(n.text, i + a, a)
            return s < 0 || s > n.text.length ? null : s
          }
          function ku(n, i, a) {
            var s = Su(n, i.ch, a)
            return s == null ? null : new z(i.line, s, a < 0 ? 'after' : 'before')
          }
          function Cu(n, i, a, s, c) {
            if (n) {
              i.doc.direction == 'rtl' && (c = -c)
              var p = ye(a, i.doc.direction)
              if (p) {
                var m = c < 0 ? lt(p) : p[0],
                  y = c < 0 == (m.level == 1),
                  w = y ? 'after' : 'before',
                  _
                if (m.level > 0 || i.doc.direction == 'rtl') {
                  var P = po(i, a)
                  _ = c < 0 ? a.text.length - 1 : 0
                  var $ = ur(i, P, _).top
                  ;(_ = Qt(
                    function (j) {
                      return ur(i, P, j).top == $
                    },
                    c < 0 == (m.level == 1) ? m.from : m.to - 1,
                    _,
                  )),
                    w == 'before' && (_ = Su(a, _, 1))
                } else _ = c < 0 ? m.to : m.from
                return new z(s, _, w)
              }
            }
            return new z(s, c < 0 ? a.text.length : 0, c < 0 ? 'before' : 'after')
          }
          function ix(n, i, a, s) {
            var c = ye(i, n.doc.direction)
            if (!c) return ku(i, a, s)
            a.ch >= i.text.length
              ? ((a.ch = i.text.length), (a.sticky = 'before'))
              : a.ch <= 0 && ((a.ch = 0), (a.sticky = 'after'))
            var p = We(c, a.ch, a.sticky),
              m = c[p]
            if (n.doc.direction == 'ltr' && m.level % 2 == 0 && (s > 0 ? m.to > a.ch : m.from < a.ch))
              return ku(i, a, s)
            var y = function (vt, St) {
                return Su(i, vt instanceof z ? vt.ch : vt, St)
              },
              w,
              _ = function (vt) {
                return n.options.lineWrapping
                  ? ((w = w || po(n, i)), Dd(n, i, w, vt))
                  : { begin: 0, end: i.text.length }
              },
              P = _(a.sticky == 'before' ? y(a, -1) : a.ch)
            if (n.doc.direction == 'rtl' || m.level == 1) {
              var $ = (m.level == 1) == s < 0,
                j = y(a, $ ? 1 : -1)
              if (j != null && ($ ? j <= m.to && j <= P.end : j >= m.from && j >= P.begin)) {
                var q = $ ? 'before' : 'after'
                return new z(a.line, j, q)
              }
            }
            var Z = function (vt, St, mt) {
                for (
                  var Ct = function (ge, He) {
                    return He ? new z(a.line, y(ge, 1), 'before') : new z(a.line, ge, 'after')
                  };
                  vt >= 0 && vt < c.length;
                  vt += St
                ) {
                  var Dt = c[vt],
                    Pt = St > 0 == (Dt.level != 1),
                    Ut = Pt ? mt.begin : y(mt.end, -1)
                  if (
                    (Dt.from <= Ut && Ut < Dt.to) ||
                    ((Ut = Pt ? Dt.from : y(Dt.to, -1)), mt.begin <= Ut && Ut < mt.end)
                  )
                    return Ct(Ut, Pt)
                }
              },
              rt = Z(p + s, s, P)
            if (rt) return rt
            var dt = s > 0 ? P.end : y(P.begin, -1)
            return dt != null && !(s > 0 && dt == i.text.length) && ((rt = Z(s > 0 ? 0 : c.length - 1, s, _(dt))), rt)
              ? rt
              : null
          }
          var Is = {
            selectAll: pp,
            singleSelection: function (n) {
              return n.setSelection(n.getCursor('anchor'), n.getCursor('head'), O)
            },
            killLine: function (n) {
              return To(n, function (i) {
                if (i.empty()) {
                  var a = Lt(n.doc, i.head.line).text.length
                  return i.head.ch == a && i.head.line < n.lastLine()
                    ? { from: i.head, to: z(i.head.line + 1, 0) }
                    : { from: i.head, to: z(i.head.line, a) }
                } else return { from: i.from(), to: i.to() }
              })
            },
            deleteLine: function (n) {
              return To(n, function (i) {
                return { from: z(i.from().line, 0), to: Bt(n.doc, z(i.to().line + 1, 0)) }
              })
            },
            delLineLeft: function (n) {
              return To(n, function (i) {
                return { from: z(i.from().line, 0), to: i.from() }
              })
            },
            delWrappedLineLeft: function (n) {
              return To(n, function (i) {
                var a = n.charCoords(i.head, 'div').top + 5,
                  s = n.coordsChar({ left: 0, top: a }, 'div')
                return { from: s, to: i.from() }
              })
            },
            delWrappedLineRight: function (n) {
              return To(n, function (i) {
                var a = n.charCoords(i.head, 'div').top + 5,
                  s = n.coordsChar({ left: n.display.lineDiv.offsetWidth + 100, top: a }, 'div')
                return { from: i.from(), to: s }
              })
            },
            undo: function (n) {
              return n.undo()
            },
            redo: function (n) {
              return n.redo()
            },
            undoSelection: function (n) {
              return n.undoSelection()
            },
            redoSelection: function (n) {
              return n.redoSelection()
            },
            goDocStart: function (n) {
              return n.extendSelection(z(n.firstLine(), 0))
            },
            goDocEnd: function (n) {
              return n.extendSelection(z(n.lastLine()))
            },
            goLineStart: function (n) {
              return n.extendSelectionsBy(
                function (i) {
                  return Np(n, i.head.line)
                },
                { origin: '+move', bias: 1 },
              )
            },
            goLineStartSmart: function (n) {
              return n.extendSelectionsBy(
                function (i) {
                  return Pp(n, i.head)
                },
                { origin: '+move', bias: 1 },
              )
            },
            goLineEnd: function (n) {
              return n.extendSelectionsBy(
                function (i) {
                  return ox(n, i.head.line)
                },
                { origin: '+move', bias: -1 },
              )
            },
            goLineRight: function (n) {
              return n.extendSelectionsBy(function (i) {
                var a = n.cursorCoords(i.head, 'div').top + 5
                return n.coordsChar({ left: n.display.lineDiv.offsetWidth + 100, top: a }, 'div')
              }, K)
            },
            goLineLeft: function (n) {
              return n.extendSelectionsBy(function (i) {
                var a = n.cursorCoords(i.head, 'div').top + 5
                return n.coordsChar({ left: 0, top: a }, 'div')
              }, K)
            },
            goLineLeftSmart: function (n) {
              return n.extendSelectionsBy(function (i) {
                var a = n.cursorCoords(i.head, 'div').top + 5,
                  s = n.coordsChar({ left: 0, top: a }, 'div')
                return s.ch < n.getLine(s.line).search(/\S/) ? Pp(n, i.head) : s
              }, K)
            },
            goLineUp: function (n) {
              return n.moveV(-1, 'line')
            },
            goLineDown: function (n) {
              return n.moveV(1, 'line')
            },
            goPageUp: function (n) {
              return n.moveV(-1, 'page')
            },
            goPageDown: function (n) {
              return n.moveV(1, 'page')
            },
            goCharLeft: function (n) {
              return n.moveH(-1, 'char')
            },
            goCharRight: function (n) {
              return n.moveH(1, 'char')
            },
            goColumnLeft: function (n) {
              return n.moveH(-1, 'column')
            },
            goColumnRight: function (n) {
              return n.moveH(1, 'column')
            },
            goWordLeft: function (n) {
              return n.moveH(-1, 'word')
            },
            goGroupRight: function (n) {
              return n.moveH(1, 'group')
            },
            goGroupLeft: function (n) {
              return n.moveH(-1, 'group')
            },
            goWordRight: function (n) {
              return n.moveH(1, 'word')
            },
            delCharBefore: function (n) {
              return n.deleteH(-1, 'codepoint')
            },
            delCharAfter: function (n) {
              return n.deleteH(1, 'char')
            },
            delWordBefore: function (n) {
              return n.deleteH(-1, 'word')
            },
            delWordAfter: function (n) {
              return n.deleteH(1, 'word')
            },
            delGroupBefore: function (n) {
              return n.deleteH(-1, 'group')
            },
            delGroupAfter: function (n) {
              return n.deleteH(1, 'group')
            },
            indentAuto: function (n) {
              return n.indentSelection('smart')
            },
            indentMore: function (n) {
              return n.indentSelection('add')
            },
            indentLess: function (n) {
              return n.indentSelection('subtract')
            },
            insertTab: function (n) {
              return n.replaceSelection('	')
            },
            insertSoftTab: function (n) {
              for (var i = [], a = n.listSelections(), s = n.options.tabSize, c = 0; c < a.length; c++) {
                var p = a[c].from(),
                  m = U(n.getLine(p.line), p.ch, s)
                i.push(at(s - (m % s)))
              }
              n.replaceSelections(i)
            },
            defaultTab: function (n) {
              n.somethingSelected() ? n.indentSelection('add') : n.execCommand('insertTab')
            },
            transposeChars: function (n) {
              return wn(n, function () {
                for (var i = n.listSelections(), a = [], s = 0; s < i.length; s++)
                  if (i[s].empty()) {
                    var c = i[s].head,
                      p = Lt(n.doc, c.line).text
                    if (p) {
                      if ((c.ch == p.length && (c = new z(c.line, c.ch - 1)), c.ch > 0))
                        (c = new z(c.line, c.ch + 1)),
                          n.replaceRange(p.charAt(c.ch - 1) + p.charAt(c.ch - 2), z(c.line, c.ch - 2), c, '+transpose')
                      else if (c.line > n.doc.first) {
                        var m = Lt(n.doc, c.line - 1).text
                        m &&
                          ((c = new z(c.line, 1)),
                          n.replaceRange(
                            p.charAt(0) + n.doc.lineSeparator() + m.charAt(m.length - 1),
                            z(c.line - 1, m.length - 1),
                            c,
                            '+transpose',
                          ))
                      }
                    }
                    a.push(new ce(c, c))
                  }
                n.setSelections(a)
              })
            },
            newlineAndIndent: function (n) {
              return wn(n, function () {
                for (var i = n.listSelections(), a = i.length - 1; a >= 0; a--)
                  n.replaceRange(n.doc.lineSeparator(), i[a].anchor, i[a].head, '+input')
                i = n.listSelections()
                for (var s = 0; s < i.length; s++) n.indentLine(i[s].from().line, null, !0)
                yo(n)
              })
            },
            openLine: function (n) {
              return n.replaceSelection(
                `
`,
                'start',
              )
            },
            toggleOverwrite: function (n) {
              return n.toggleOverwrite()
            },
          }
          function Np(n, i) {
            var a = Lt(n.doc, i),
              s = jn(a)
            return s != a && (i = le(s)), Cu(!0, n, s, i, 1)
          }
          function ox(n, i) {
            var a = Lt(n.doc, i),
              s = Bb(a)
            return s != a && (i = le(s)), Cu(!0, n, a, i, -1)
          }
          function Pp(n, i) {
            var a = Np(n, i.line),
              s = Lt(n.doc, a.line),
              c = ye(s, n.doc.direction)
            if (!c || c[0].level == 0) {
              var p = Math.max(a.ch, s.text.search(/\S/)),
                m = i.line == a.line && i.ch <= p && i.ch
              return z(a.line, m ? 0 : p, a.sticky)
            }
            return a
          }
          function ul(n, i, a) {
            if (typeof i == 'string' && ((i = Is[i]), !i)) return !1
            n.display.input.ensurePolled()
            var s = n.display.shift,
              c = !1
            try {
              n.isReadOnly() && (n.state.suppressEdits = !0), a && (n.display.shift = !1), (c = i(n) != Nt)
            } finally {
              ;(n.display.shift = s), (n.state.suppressEdits = !1)
            }
            return c
          }
          function sx(n, i, a) {
            for (var s = 0; s < n.state.keyMaps.length; s++) {
              var c = Co(i, n.state.keyMaps[s], a, n)
              if (c) return c
            }
            return (n.options.extraKeys && Co(i, n.options.extraKeys, a, n)) || Co(i, n.options.keyMap, a, n)
          }
          var ax = new et()
          function Fs(n, i, a, s) {
            var c = n.state.keySeq
            if (c) {
              if (Lp(i)) return 'handled'
              if (
                (/\'$/.test(i)
                  ? (n.state.keySeq = null)
                  : ax.set(50, function () {
                      n.state.keySeq == c && ((n.state.keySeq = null), n.display.input.reset())
                    }),
                Op(n, c + ' ' + i, a, s))
              )
                return !0
            }
            return Op(n, i, a, s)
          }
          function Op(n, i, a, s) {
            var c = sx(n, i, s)
            return (
              c == 'multi' && (n.state.keySeq = i),
              c == 'handled' && Ie(n, 'keyHandled', n, i, a),
              (c == 'handled' || c == 'multi') && (Ke(a), au(n)),
              !!c
            )
          }
          function $p(n, i) {
            var a = Mp(i, !0)
            return a
              ? i.shiftKey && !n.state.keySeq
                ? Fs(n, 'Shift-' + a, i, function (s) {
                    return ul(n, s, !0)
                  }) ||
                  Fs(n, a, i, function (s) {
                    if (typeof s == 'string' ? /^go[A-Z]/.test(s) : s.motion) return ul(n, s)
                  })
                : Fs(n, a, i, function (s) {
                    return ul(n, s)
                  })
              : !1
          }
          function lx(n, i, a) {
            return Fs(n, "'" + a + "'", i, function (s) {
              return ul(n, s, !0)
            })
          }
          var Tu = null
          function Dp(n) {
            var i = this
            if (!(n.target && n.target != i.display.input.getField()) && ((i.curOp.focus = wt(Gt(i))), !ke(i, n))) {
              d && g < 11 && n.keyCode == 27 && (n.returnValue = !1)
              var a = n.keyCode
              i.display.shift = a == 16 || n.shiftKey
              var s = $p(i, n)
              M &&
                ((Tu = s ? a : null),
                !s && a == 88 && !or && (B ? n.metaKey : n.ctrlKey) && i.replaceSelection('', null, 'cut')),
                l &&
                  !B &&
                  !s &&
                  a == 46 &&
                  n.shiftKey &&
                  !n.ctrlKey &&
                  document.execCommand &&
                  document.execCommand('cut'),
                a == 18 && !/\bCodeMirror-crosshair\b/.test(i.display.lineDiv.className) && cx(i)
            }
          }
          function cx(n) {
            var i = n.display.lineDiv
            Tt(i, 'CodeMirror-crosshair')
            function a(s) {
              ;(s.keyCode == 18 || !s.altKey) &&
                (pt(i, 'CodeMirror-crosshair'), Ve(document, 'keyup', a), Ve(document, 'mouseover', a))
            }
            bt(document, 'keyup', a), bt(document, 'mouseover', a)
          }
          function Rp(n) {
            n.keyCode == 16 && (this.doc.sel.shift = !1), ke(this, n)
          }
          function zp(n) {
            var i = this
            if (
              !(n.target && n.target != i.display.input.getField()) &&
              !(Er(i.display, n) || ke(i, n) || (n.ctrlKey && !n.altKey) || (B && n.metaKey))
            ) {
              var a = n.keyCode,
                s = n.charCode
              if (M && a == Tu) {
                ;(Tu = null), Ke(n)
                return
              }
              if (!(M && (!n.which || n.which < 10) && $p(i, n))) {
                var c = String.fromCharCode(s ?? a)
                c != '\b' && (lx(i, n, c) || i.display.input.onKeyPress(n))
              }
            }
          }
          var ux = 400,
            Eu = function (n, i, a) {
              ;(this.time = n), (this.pos = i), (this.button = a)
            }
          Eu.prototype.compare = function (n, i, a) {
            return this.time + ux > n && Y(i, this.pos) == 0 && a == this.button
          }
          var qs, Hs
          function fx(n, i) {
            var a = +new Date()
            return Hs && Hs.compare(a, n, i)
              ? ((qs = Hs = null), 'triple')
              : qs && qs.compare(a, n, i)
                ? ((Hs = new Eu(a, n, i)), (qs = null), 'double')
                : ((qs = new Eu(a, n, i)), (Hs = null), 'single')
          }
          function Ip(n) {
            var i = this,
              a = i.display
            if (!(ke(i, n) || (a.activeTouch && a.input.supportsTouch()))) {
              if ((a.input.ensurePolled(), (a.shift = n.shiftKey), Er(a, n))) {
                v ||
                  ((a.scroller.draggable = !1),
                  setTimeout(function () {
                    return (a.scroller.draggable = !0)
                  }, 100))
                return
              }
              if (!Lu(i, n)) {
                var s = Ni(i, n),
                  c = ds(n),
                  p = s ? fx(s, c) : 'single'
                Vt(i).focus(),
                  c == 1 && i.state.selectingText && i.state.selectingText(n),
                  !(s && hx(i, c, s, p, n)) &&
                    (c == 1
                      ? s
                        ? px(i, s, p, n)
                        : sn(n) == a.scroller && Ke(n)
                      : c == 2
                        ? (s && il(i.doc, s),
                          setTimeout(function () {
                            return a.input.focus()
                          }, 20))
                        : c == 3 && (ot ? i.display.input.onContextMenu(n) : lu(i)))
              }
            }
          }
          function hx(n, i, a, s, c) {
            var p = 'Click'
            return (
              s == 'double' ? (p = 'Double' + p) : s == 'triple' && (p = 'Triple' + p),
              (p = (i == 1 ? 'Left' : i == 2 ? 'Middle' : 'Right') + p),
              Fs(n, Ap(p, c), c, function (m) {
                if ((typeof m == 'string' && (m = Is[m]), !m)) return !1
                var y = !1
                try {
                  n.isReadOnly() && (n.state.suppressEdits = !0), (y = m(n, a) != Nt)
                } finally {
                  n.state.suppressEdits = !1
                }
                return y
              })
            )
          }
          function dx(n, i, a) {
            var s = n.getOption('configureMouse'),
              c = s ? s(n, i, a) : {}
            if (c.unit == null) {
              var p = tt ? a.shiftKey && a.metaKey : a.altKey
              c.unit = p ? 'rectangle' : i == 'single' ? 'char' : i == 'double' ? 'word' : 'line'
            }
            return (
              (c.extend == null || n.doc.extend) && (c.extend = n.doc.extend || a.shiftKey),
              c.addNew == null && (c.addNew = B ? a.metaKey : a.ctrlKey),
              c.moveOnDrag == null && (c.moveOnDrag = !(B ? a.altKey : a.ctrlKey)),
              c
            )
          }
          function px(n, i, a, s) {
            d ? setTimeout(Jt(Fd, n), 0) : (n.curOp.focus = wt(Gt(n)))
            var c = dx(n, a, s),
              p = n.doc.sel,
              m
            n.options.dragDrop &&
            qc &&
            !n.isReadOnly() &&
            a == 'single' &&
            (m = p.contains(i)) > -1 &&
            (Y((m = p.ranges[m]).from(), i) < 0 || i.xRel > 0) &&
            (Y(m.to(), i) > 0 || i.xRel < 0)
              ? gx(n, s, i, c)
              : vx(n, s, i, c)
          }
          function gx(n, i, a, s) {
            var c = n.display,
              p = !1,
              m = Fe(n, function (_) {
                v && (c.scroller.draggable = !1),
                  (n.state.draggingText = !1),
                  n.state.delayingBlurEvent && (n.hasFocus() ? (n.state.delayingBlurEvent = !1) : lu(n)),
                  Ve(c.wrapper.ownerDocument, 'mouseup', m),
                  Ve(c.wrapper.ownerDocument, 'mousemove', y),
                  Ve(c.scroller, 'dragstart', w),
                  Ve(c.scroller, 'drop', m),
                  p ||
                    (Ke(_),
                    s.addNew || il(n.doc, a, null, null, s.extend),
                    (v && !T) || (d && g == 9)
                      ? setTimeout(function () {
                          c.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), c.input.focus()
                        }, 20)
                      : c.input.focus())
              }),
              y = function (_) {
                p = p || Math.abs(i.clientX - _.clientX) + Math.abs(i.clientY - _.clientY) >= 10
              },
              w = function () {
                return (p = !0)
              }
            v && (c.scroller.draggable = !0),
              (n.state.draggingText = m),
              (m.copy = !s.moveOnDrag),
              bt(c.wrapper.ownerDocument, 'mouseup', m),
              bt(c.wrapper.ownerDocument, 'mousemove', y),
              bt(c.scroller, 'dragstart', w),
              bt(c.scroller, 'drop', m),
              (n.state.delayingBlurEvent = !0),
              setTimeout(function () {
                return c.input.focus()
              }, 20),
              c.scroller.dragDrop && c.scroller.dragDrop()
          }
          function Fp(n, i, a) {
            if (a == 'char') return new ce(i, i)
            if (a == 'word') return n.findWordAt(i)
            if (a == 'line') return new ce(z(i.line, 0), Bt(n.doc, z(i.line + 1, 0)))
            var s = a(n, i)
            return new ce(s.from, s.to)
          }
          function vx(n, i, a, s) {
            d && lu(n)
            var c = n.display,
              p = n.doc
            Ke(i)
            var m,
              y,
              w = p.sel,
              _ = w.ranges
            if (
              (s.addNew && !s.extend
                ? ((y = p.sel.contains(a)), y > -1 ? (m = _[y]) : (m = new ce(a, a)))
                : ((m = p.sel.primary()), (y = p.sel.primIndex)),
              s.unit == 'rectangle')
            )
              s.addNew || (m = new ce(a, a)), (a = Ni(n, i, !0, !0)), (y = -1)
            else {
              var P = Fp(n, a, s.unit)
              s.extend ? (m = xu(m, P.anchor, P.head, s.extend)) : (m = P)
            }
            s.addNew
              ? y == -1
                ? ((y = _.length), Xe(p, Vn(n, _.concat([m]), y), { scroll: !1, origin: '*mouse' }))
                : _.length > 1 && _[y].empty() && s.unit == 'char' && !s.extend
                  ? (Xe(p, Vn(n, _.slice(0, y).concat(_.slice(y + 1)), 0), { scroll: !1, origin: '*mouse' }),
                    (w = p.sel))
                  : _u(p, y, m, I)
              : ((y = 0), Xe(p, new On([m], 0), I), (w = p.sel))
            var $ = a
            function j(mt) {
              if (Y($, mt) != 0)
                if ((($ = mt), s.unit == 'rectangle')) {
                  for (
                    var Ct = [],
                      Dt = n.options.tabSize,
                      Pt = U(Lt(p, a.line).text, a.ch, Dt),
                      Ut = U(Lt(p, mt.line).text, mt.ch, Dt),
                      ge = Math.min(Pt, Ut),
                      He = Math.max(Pt, Ut),
                      Se = Math.min(a.line, mt.line),
                      xn = Math.min(n.lastLine(), Math.max(a.line, mt.line));
                    Se <= xn;
                    Se++
                  ) {
                    var cn = Lt(p, Se).text,
                      Me = Q(cn, ge, Dt)
                    ge == He
                      ? Ct.push(new ce(z(Se, Me), z(Se, Me)))
                      : cn.length > Me && Ct.push(new ce(z(Se, Me), z(Se, Q(cn, He, Dt))))
                  }
                  Ct.length || Ct.push(new ce(a, a)),
                    Xe(p, Vn(n, w.ranges.slice(0, y).concat(Ct), y), { origin: '*mouse', scroll: !1 }),
                    n.scrollIntoView(mt)
                } else {
                  var un = m,
                    Ue = Fp(n, mt, s.unit),
                    De = un.anchor,
                    Ne
                  Y(Ue.anchor, De) > 0
                    ? ((Ne = Ue.head), (De = $e(un.from(), Ue.anchor)))
                    : ((Ne = Ue.anchor), (De = oe(un.to(), Ue.head)))
                  var Te = w.ranges.slice(0)
                  ;(Te[y] = mx(n, new ce(Bt(p, De), Ne))), Xe(p, Vn(n, Te, y), I)
                }
            }
            var q = c.wrapper.getBoundingClientRect(),
              Z = 0
            function rt(mt) {
              var Ct = ++Z,
                Dt = Ni(n, mt, !0, s.unit == 'rectangle')
              if (Dt)
                if (Y(Dt, $) != 0) {
                  ;(n.curOp.focus = wt(Gt(n))), j(Dt)
                  var Pt = Ja(c, p)
                  ;(Dt.line >= Pt.to || Dt.line < Pt.from) &&
                    setTimeout(
                      Fe(n, function () {
                        Z == Ct && rt(mt)
                      }),
                      150,
                    )
                } else {
                  var Ut = mt.clientY < q.top ? -20 : mt.clientY > q.bottom ? 20 : 0
                  Ut &&
                    setTimeout(
                      Fe(n, function () {
                        Z == Ct && ((c.scroller.scrollTop += Ut), rt(mt))
                      }),
                      50,
                    )
                }
            }
            function dt(mt) {
              ;(n.state.selectingText = !1),
                (Z = 1 / 0),
                mt && (Ke(mt), c.input.focus()),
                Ve(c.wrapper.ownerDocument, 'mousemove', vt),
                Ve(c.wrapper.ownerDocument, 'mouseup', St),
                (p.history.lastSelOrigin = null)
            }
            var vt = Fe(n, function (mt) {
                mt.buttons === 0 || !ds(mt) ? dt(mt) : rt(mt)
              }),
              St = Fe(n, dt)
            ;(n.state.selectingText = St),
              bt(c.wrapper.ownerDocument, 'mousemove', vt),
              bt(c.wrapper.ownerDocument, 'mouseup', St)
          }
          function mx(n, i) {
            var a = i.anchor,
              s = i.head,
              c = Lt(n.doc, a.line)
            if (Y(a, s) == 0 && a.sticky == s.sticky) return i
            var p = ye(c)
            if (!p) return i
            var m = We(p, a.ch, a.sticky),
              y = p[m]
            if (y.from != a.ch && y.to != a.ch) return i
            var w = m + ((y.from == a.ch) == (y.level != 1) ? 0 : 1)
            if (w == 0 || w == p.length) return i
            var _
            if (s.line != a.line) _ = (s.line - a.line) * (n.doc.direction == 'ltr' ? 1 : -1) > 0
            else {
              var P = We(p, s.ch, s.sticky),
                $ = P - m || (s.ch - a.ch) * (y.level == 1 ? -1 : 1)
              P == w - 1 || P == w ? (_ = $ < 0) : (_ = $ > 0)
            }
            var j = p[w + (_ ? -1 : 0)],
              q = _ == (j.level == 1),
              Z = q ? j.from : j.to,
              rt = q ? 'after' : 'before'
            return a.ch == Z && a.sticky == rt ? i : new ce(new z(a.line, Z, rt), s)
          }
          function qp(n, i, a, s) {
            var c, p
            if (i.touches) (c = i.touches[0].clientX), (p = i.touches[0].clientY)
            else
              try {
                ;(c = i.clientX), (p = i.clientY)
              } catch {
                return !1
              }
            if (c >= Math.floor(n.display.gutters.getBoundingClientRect().right)) return !1
            s && Ke(i)
            var m = n.display,
              y = m.lineDiv.getBoundingClientRect()
            if (p > y.bottom || !Je(n, a)) return hs(i)
            p -= y.top - m.viewOffset
            for (var w = 0; w < n.display.gutterSpecs.length; ++w) {
              var _ = m.gutters.childNodes[w]
              if (_ && _.getBoundingClientRect().right >= c) {
                var P = ar(n.doc, p),
                  $ = n.display.gutterSpecs[w]
                return me(n, a, n, P, $.className, i), hs(i)
              }
            }
          }
          function Lu(n, i) {
            return qp(n, i, 'gutterClick', !0)
          }
          function Hp(n, i) {
            Er(n.display, i) || yx(n, i) || ke(n, i, 'contextmenu') || ot || n.display.input.onContextMenu(i)
          }
          function yx(n, i) {
            return Je(n, 'gutterContextMenu') ? qp(n, i, 'gutterContextMenu', !1) : !1
          }
          function Bp(n) {
            ;(n.display.wrapper.className =
              n.display.wrapper.className.replace(/\s*cm-s-\S+/g, '') +
              n.options.theme.replace(/(^|\s)\s*/g, ' cm-s-')),
              xs(n)
          }
          var Eo = {
              toString: function () {
                return 'CodeMirror.Init'
              },
            },
            Wp = {},
            fl = {}
          function bx(n) {
            var i = n.optionHandlers
            function a(s, c, p, m) {
              ;(n.defaults[s] = c),
                p &&
                  (i[s] = m
                    ? function (y, w, _) {
                        _ != Eo && p(y, w, _)
                      }
                    : p)
            }
            ;(n.defineOption = a),
              (n.Init = Eo),
              a(
                'value',
                '',
                function (s, c) {
                  return s.setValue(c)
                },
                !0,
              ),
              a(
                'mode',
                null,
                function (s, c) {
                  ;(s.doc.modeOption = c), yu(s)
                },
                !0,
              ),
              a('indentUnit', 2, yu, !0),
              a('indentWithTabs', !1),
              a('smartIndent', !0),
              a(
                'tabSize',
                4,
                function (s) {
                  As(s), xs(s), an(s)
                },
                !0,
              ),
              a('lineSeparator', null, function (s, c) {
                if (((s.doc.lineSep = c), !!c)) {
                  var p = [],
                    m = s.doc.first
                  s.doc.iter(function (w) {
                    for (var _ = 0; ; ) {
                      var P = w.text.indexOf(c, _)
                      if (P == -1) break
                      ;(_ = P + c.length), p.push(z(m, P))
                    }
                    m++
                  })
                  for (var y = p.length - 1; y >= 0; y--) So(s.doc, c, p[y], z(p[y].line, p[y].ch + c.length))
                }
              }),
              a(
                'specialChars',
                /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g,
                function (s, c, p) {
                  ;(s.state.specialChars = new RegExp(c.source + (c.test('	') ? '' : '|	'), 'g')), p != Eo && s.refresh()
                },
              ),
              a(
                'specialCharPlaceholder',
                Kb,
                function (s) {
                  return s.refresh()
                },
                !0,
              ),
              a('electricChars', !0),
              a(
                'inputStyle',
                A ? 'contenteditable' : 'textarea',
                function () {
                  throw new Error('inputStyle can not (yet) be changed in a running editor')
                },
                !0,
              ),
              a(
                'spellcheck',
                !1,
                function (s, c) {
                  return (s.getInputField().spellcheck = c)
                },
                !0,
              ),
              a(
                'autocorrect',
                !1,
                function (s, c) {
                  return (s.getInputField().autocorrect = c)
                },
                !0,
              ),
              a(
                'autocapitalize',
                !1,
                function (s, c) {
                  return (s.getInputField().autocapitalize = c)
                },
                !0,
              ),
              a('rtlMoveVisually', !ft),
              a('wholeLineUpdateBefore', !0),
              a(
                'theme',
                'default',
                function (s) {
                  Bp(s), Ls(s)
                },
                !0,
              ),
              a('keyMap', 'default', function (s, c, p) {
                var m = cl(c),
                  y = p != Eo && cl(p)
                y && y.detach && y.detach(s, m), m.attach && m.attach(s, y || null)
              }),
              a('extraKeys', null),
              a('configureMouse', null),
              a('lineWrapping', !1, xx, !0),
              a(
                'gutters',
                [],
                function (s, c) {
                  ;(s.display.gutterSpecs = vu(c, s.options.lineNumbers)), Ls(s)
                },
                !0,
              ),
              a(
                'fixedGutter',
                !0,
                function (s, c) {
                  ;(s.display.gutters.style.left = c ? iu(s.display) + 'px' : '0'), s.refresh()
                },
                !0,
              ),
              a(
                'coverGutterNextToScrollbar',
                !1,
                function (s) {
                  return bo(s)
                },
                !0,
              ),
              a(
                'scrollbarStyle',
                'native',
                function (s) {
                  jd(s),
                    bo(s),
                    s.display.scrollbars.setScrollTop(s.doc.scrollTop),
                    s.display.scrollbars.setScrollLeft(s.doc.scrollLeft)
                },
                !0,
              ),
              a(
                'lineNumbers',
                !1,
                function (s, c) {
                  ;(s.display.gutterSpecs = vu(s.options.gutters, c)), Ls(s)
                },
                !0,
              ),
              a('firstLineNumber', 1, Ls, !0),
              a(
                'lineNumberFormatter',
                function (s) {
                  return s
                },
                Ls,
                !0,
              ),
              a('showCursorWhenSelecting', !1, _s, !0),
              a('resetSelectionOnContextMenu', !0),
              a('lineWiseCopyCut', !0),
              a('pasteLinesPerSelection', !0),
              a('selectionsMayTouch', !1),
              a('readOnly', !1, function (s, c) {
                c == 'nocursor' && (mo(s), s.display.input.blur()), s.display.input.readOnlyChanged(c)
              }),
              a('screenReaderLabel', null, function (s, c) {
                ;(c = c === '' ? null : c), s.display.input.screenReaderLabelChanged(c)
              }),
              a(
                'disableInput',
                !1,
                function (s, c) {
                  c || s.display.input.reset()
                },
                !0,
              ),
              a('dragDrop', !0, wx),
              a('allowDropFileTypes', null),
              a('cursorBlinkRate', 530),
              a('cursorScrollMargin', 0),
              a('cursorHeight', 1, _s, !0),
              a('singleCursorHeightPerLine', !0, _s, !0),
              a('workTime', 100),
              a('workDelay', 100),
              a('flattenSpans', !0, As, !0),
              a('addModeClass', !1, As, !0),
              a('pollInterval', 100),
              a('undoDepth', 200, function (s, c) {
                return (s.doc.history.undoDepth = c)
              }),
              a('historyEventDelay', 1250),
              a(
                'viewportMargin',
                10,
                function (s) {
                  return s.refresh()
                },
                !0,
              ),
              a('maxHighlightLength', 1e4, As, !0),
              a('moveInputWithCursor', !0, function (s, c) {
                c || s.display.input.resetPosition()
              }),
              a('tabindex', null, function (s, c) {
                return (s.display.input.getField().tabIndex = c || '')
              }),
              a('autofocus', null),
              a(
                'direction',
                'ltr',
                function (s, c) {
                  return s.doc.setDirection(c)
                },
                !0,
              ),
              a('phrases', null)
          }
          function wx(n, i, a) {
            var s = a && a != Eo
            if (!i != !s) {
              var c = n.display.dragFunctions,
                p = i ? bt : Ve
              p(n.display.scroller, 'dragstart', c.start),
                p(n.display.scroller, 'dragenter', c.enter),
                p(n.display.scroller, 'dragover', c.over),
                p(n.display.scroller, 'dragleave', c.leave),
                p(n.display.scroller, 'drop', c.drop)
            }
          }
          function xx(n) {
            n.options.lineWrapping
              ? (Tt(n.display.wrapper, 'CodeMirror-wrap'),
                (n.display.sizer.style.minWidth = ''),
                (n.display.sizerWidth = null))
              : (pt(n.display.wrapper, 'CodeMirror-wrap'), Kc(n)),
              ou(n),
              an(n),
              xs(n),
              setTimeout(function () {
                return bo(n)
              }, 100)
          }
          function we(n, i) {
            var a = this
            if (!(this instanceof we)) return new we(n, i)
            ;(this.options = i = i ? _t(i) : {}), _t(Wp, i, !1)
            var s = i.value
            typeof s == 'string'
              ? (s = new ln(s, i.mode, null, i.lineSeparator, i.direction))
              : i.mode && (s.modeOption = i.mode),
              (this.doc = s)
            var c = new we.inputStyles[i.inputStyle](this),
              p = (this.display = new $w(n, s, c, i))
            ;(p.wrapper.CodeMirror = this),
              Bp(this),
              i.lineWrapping && (this.display.wrapper.className += ' CodeMirror-wrap'),
              jd(this),
              (this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                delayingBlurEvent: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: -1,
                cutIncoming: -1,
                selectingText: !1,
                draggingText: !1,
                highlight: new et(),
                keySeq: null,
                specialChars: null,
              }),
              i.autofocus && !A && p.input.focus(),
              d &&
                g < 11 &&
                setTimeout(function () {
                  return a.display.input.reset(!0)
                }, 20),
              _x(this),
              Qw(),
              Di(this),
              (this.curOp.forceUpdate = !0),
              ep(this, s),
              (i.autofocus && !A) || this.hasFocus()
                ? setTimeout(function () {
                    a.hasFocus() && !a.state.focused && cu(a)
                  }, 20)
                : mo(this)
            for (var m in fl) fl.hasOwnProperty(m) && fl[m](this, i[m], Eo)
            Kd(this), i.finishInit && i.finishInit(this)
            for (var y = 0; y < Au.length; ++y) Au[y](this)
            Ri(this),
              v &&
                i.lineWrapping &&
                getComputedStyle(p.lineDiv).textRendering == 'optimizelegibility' &&
                (p.lineDiv.style.textRendering = 'auto')
          }
          ;(we.defaults = Wp), (we.optionHandlers = fl)
          function _x(n) {
            var i = n.display
            bt(i.scroller, 'mousedown', Fe(n, Ip)),
              d && g < 11
                ? bt(
                    i.scroller,
                    'dblclick',
                    Fe(n, function (w) {
                      if (!ke(n, w)) {
                        var _ = Ni(n, w)
                        if (!(!_ || Lu(n, w) || Er(n.display, w))) {
                          Ke(w)
                          var P = n.findWordAt(_)
                          il(n.doc, P.anchor, P.head)
                        }
                      }
                    }),
                  )
                : bt(i.scroller, 'dblclick', function (w) {
                    return ke(n, w) || Ke(w)
                  }),
              bt(i.scroller, 'contextmenu', function (w) {
                return Hp(n, w)
              }),
              bt(i.input.getField(), 'contextmenu', function (w) {
                i.scroller.contains(w.target) || Hp(n, w)
              })
            var a,
              s = { end: 0 }
            function c() {
              i.activeTouch &&
                ((a = setTimeout(function () {
                  return (i.activeTouch = null)
                }, 1e3)),
                (s = i.activeTouch),
                (s.end = +new Date()))
            }
            function p(w) {
              if (w.touches.length != 1) return !1
              var _ = w.touches[0]
              return _.radiusX <= 1 && _.radiusY <= 1
            }
            function m(w, _) {
              if (_.left == null) return !0
              var P = _.left - w.left,
                $ = _.top - w.top
              return P * P + $ * $ > 20 * 20
            }
            bt(i.scroller, 'touchstart', function (w) {
              if (!ke(n, w) && !p(w) && !Lu(n, w)) {
                i.input.ensurePolled(), clearTimeout(a)
                var _ = +new Date()
                ;(i.activeTouch = { start: _, moved: !1, prev: _ - s.end <= 300 ? s : null }),
                  w.touches.length == 1 &&
                    ((i.activeTouch.left = w.touches[0].pageX), (i.activeTouch.top = w.touches[0].pageY))
              }
            }),
              bt(i.scroller, 'touchmove', function () {
                i.activeTouch && (i.activeTouch.moved = !0)
              }),
              bt(i.scroller, 'touchend', function (w) {
                var _ = i.activeTouch
                if (_ && !Er(i, w) && _.left != null && !_.moved && new Date() - _.start < 300) {
                  var P = n.coordsChar(i.activeTouch, 'page'),
                    $
                  !_.prev || m(_, _.prev)
                    ? ($ = new ce(P, P))
                    : !_.prev.prev || m(_, _.prev.prev)
                      ? ($ = n.findWordAt(P))
                      : ($ = new ce(z(P.line, 0), Bt(n.doc, z(P.line + 1, 0)))),
                    n.setSelection($.anchor, $.head),
                    n.focus(),
                    Ke(w)
                }
                c()
              }),
              bt(i.scroller, 'touchcancel', c),
              bt(i.scroller, 'scroll', function () {
                i.scroller.clientHeight &&
                  (ks(n, i.scroller.scrollTop), Oi(n, i.scroller.scrollLeft, !0), me(n, 'scroll', n))
              }),
              bt(i.scroller, 'mousewheel', function (w) {
                return Zd(n, w)
              }),
              bt(i.scroller, 'DOMMouseScroll', function (w) {
                return Zd(n, w)
              }),
              bt(i.wrapper, 'scroll', function () {
                return (i.wrapper.scrollTop = i.wrapper.scrollLeft = 0)
              }),
              (i.dragFunctions = {
                enter: function (w) {
                  ke(n, w) || xr(w)
                },
                over: function (w) {
                  ke(n, w) || (Jw(n, w), xr(w))
                },
                start: function (w) {
                  return Zw(n, w)
                },
                drop: Fe(n, Yw),
                leave: function (w) {
                  ke(n, w) || Cp(n)
                },
              })
            var y = i.input.getField()
            bt(y, 'keyup', function (w) {
              return Rp.call(n, w)
            }),
              bt(y, 'keydown', Fe(n, Dp)),
              bt(y, 'keypress', Fe(n, zp)),
              bt(y, 'focus', function (w) {
                return cu(n, w)
              }),
              bt(y, 'blur', function (w) {
                return mo(n, w)
              })
          }
          var Au = []
          we.defineInitHook = function (n) {
            return Au.push(n)
          }
          function Bs(n, i, a, s) {
            var c = n.doc,
              p
            a == null && (a = 'add'), a == 'smart' && (c.mode.indent ? (p = vs(n, i).state) : (a = 'prev'))
            var m = n.options.tabSize,
              y = Lt(c, i),
              w = U(y.text, null, m)
            y.stateAfter && (y.stateAfter = null)
            var _ = y.text.match(/^\s*/)[0],
              P
            if (!s && !/\S/.test(y.text)) (P = 0), (a = 'not')
            else if (a == 'smart' && ((P = c.mode.indent(p, y.text.slice(_.length), y.text)), P == Nt || P > 150)) {
              if (!s) return
              a = 'prev'
            }
            a == 'prev'
              ? i > c.first
                ? (P = U(Lt(c, i - 1).text, null, m))
                : (P = 0)
              : a == 'add'
                ? (P = w + n.options.indentUnit)
                : a == 'subtract'
                  ? (P = w - n.options.indentUnit)
                  : typeof a == 'number' && (P = w + a),
              (P = Math.max(0, P))
            var $ = '',
              j = 0
            if (n.options.indentWithTabs) for (var q = Math.floor(P / m); q; --q) (j += m), ($ += '	')
            if ((j < P && ($ += at(P - j)), $ != _))
              return So(c, $, z(i, 0), z(i, _.length), '+input'), (y.stateAfter = null), !0
            for (var Z = 0; Z < c.sel.ranges.length; Z++) {
              var rt = c.sel.ranges[Z]
              if (rt.head.line == i && rt.head.ch < _.length) {
                var dt = z(i, _.length)
                _u(c, Z, new ce(dt, dt))
                break
              }
            }
          }
          var Kn = null
          function hl(n) {
            Kn = n
          }
          function Mu(n, i, a, s, c) {
            var p = n.doc
            ;(n.display.shift = !1), s || (s = p.sel)
            var m = +new Date() - 200,
              y = c == 'paste' || n.state.pasteIncoming > m,
              w = ps(i),
              _ = null
            if (y && s.ranges.length > 1)
              if (
                Kn &&
                Kn.text.join(`
`) == i
              ) {
                if (s.ranges.length % Kn.text.length == 0) {
                  _ = []
                  for (var P = 0; P < Kn.text.length; P++) _.push(p.splitLines(Kn.text[P]))
                }
              } else
                w.length == s.ranges.length &&
                  n.options.pasteLinesPerSelection &&
                  (_ = gt(w, function (vt) {
                    return [vt]
                  }))
            for (var $ = n.curOp.updateInput, j = s.ranges.length - 1; j >= 0; j--) {
              var q = s.ranges[j],
                Z = q.from(),
                rt = q.to()
              q.empty() &&
                (a && a > 0
                  ? (Z = z(Z.line, Z.ch - a))
                  : n.state.overwrite && !y
                    ? (rt = z(rt.line, Math.min(Lt(p, rt.line).text.length, rt.ch + lt(w).length)))
                    : y &&
                      Kn &&
                      Kn.lineWise &&
                      Kn.text.join(`
`) ==
                        w.join(`
`) &&
                      (Z = rt = z(Z.line, 0)))
              var dt = {
                from: Z,
                to: rt,
                text: _ ? _[j % _.length] : w,
                origin: c || (y ? 'paste' : n.state.cutIncoming > m ? 'cut' : '+input'),
              }
              _o(n.doc, dt), Ie(n, 'inputRead', n, dt)
            }
            i && !y && jp(n, i),
              yo(n),
              n.curOp.updateInput < 2 && (n.curOp.updateInput = $),
              (n.curOp.typing = !0),
              (n.state.pasteIncoming = n.state.cutIncoming = -1)
          }
          function Up(n, i) {
            var a = n.clipboardData && n.clipboardData.getData('Text')
            if (a)
              return (
                n.preventDefault(),
                !i.isReadOnly() &&
                  !i.options.disableInput &&
                  i.hasFocus() &&
                  wn(i, function () {
                    return Mu(i, a, 0, null, 'paste')
                  }),
                !0
              )
          }
          function jp(n, i) {
            if (!(!n.options.electricChars || !n.options.smartIndent))
              for (var a = n.doc.sel, s = a.ranges.length - 1; s >= 0; s--) {
                var c = a.ranges[s]
                if (!(c.head.ch > 100 || (s && a.ranges[s - 1].head.line == c.head.line))) {
                  var p = n.getModeAt(c.head),
                    m = !1
                  if (p.electricChars) {
                    for (var y = 0; y < p.electricChars.length; y++)
                      if (i.indexOf(p.electricChars.charAt(y)) > -1) {
                        m = Bs(n, c.head.line, 'smart')
                        break
                      }
                  } else
                    p.electricInput &&
                      p.electricInput.test(Lt(n.doc, c.head.line).text.slice(0, c.head.ch)) &&
                      (m = Bs(n, c.head.line, 'smart'))
                  m && Ie(n, 'electricInput', n, c.head.line)
                }
              }
          }
          function Gp(n) {
            for (var i = [], a = [], s = 0; s < n.doc.sel.ranges.length; s++) {
              var c = n.doc.sel.ranges[s].head.line,
                p = { anchor: z(c, 0), head: z(c + 1, 0) }
              a.push(p), i.push(n.getRange(p.anchor, p.head))
            }
            return { text: i, ranges: a }
          }
          function Nu(n, i, a, s) {
            n.setAttribute('autocorrect', a ? 'on' : 'off'),
              n.setAttribute('autocapitalize', s ? 'on' : 'off'),
              n.setAttribute('spellcheck', !!i)
          }
          function Vp() {
            var n = k(
                'textarea',
                null,
                null,
                'position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none',
              ),
              i = k('div', [n], null, 'overflow: hidden; position: relative; width: 3px; height: 0px;')
            return (
              v ? (n.style.width = '1000px') : n.setAttribute('wrap', 'off'),
              L && (n.style.border = '1px solid black'),
              i
            )
          }
          function Sx(n) {
            var i = n.optionHandlers,
              a = (n.helpers = {})
            ;(n.prototype = {
              constructor: n,
              focus: function () {
                Vt(this).focus(), this.display.input.focus()
              },
              setOption: function (s, c) {
                var p = this.options,
                  m = p[s]
                ;(p[s] == c && s != 'mode') ||
                  ((p[s] = c), i.hasOwnProperty(s) && Fe(this, i[s])(this, c, m), me(this, 'optionChange', this, s))
              },
              getOption: function (s) {
                return this.options[s]
              },
              getDoc: function () {
                return this.doc
              },
              addKeyMap: function (s, c) {
                this.state.keyMaps[c ? 'push' : 'unshift'](cl(s))
              },
              removeKeyMap: function (s) {
                for (var c = this.state.keyMaps, p = 0; p < c.length; ++p)
                  if (c[p] == s || c[p].name == s) return c.splice(p, 1), !0
              },
              addOverlay: tn(function (s, c) {
                var p = s.token ? s : n.getMode(this.options, s)
                if (p.startState) throw new Error('Overlays may not be stateful.')
                xt(
                  this.state.overlays,
                  { mode: p, modeSpec: s, opaque: c && c.opaque, priority: (c && c.priority) || 0 },
                  function (m) {
                    return m.priority
                  },
                ),
                  this.state.modeGen++,
                  an(this)
              }),
              removeOverlay: tn(function (s) {
                for (var c = this.state.overlays, p = 0; p < c.length; ++p) {
                  var m = c[p].modeSpec
                  if (m == s || (typeof s == 'string' && m.name == s)) {
                    c.splice(p, 1), this.state.modeGen++, an(this)
                    return
                  }
                }
              }),
              indentLine: tn(function (s, c, p) {
                typeof c != 'string' &&
                  typeof c != 'number' &&
                  (c == null ? (c = this.options.smartIndent ? 'smart' : 'prev') : (c = c ? 'add' : 'subtract')),
                  C(this.doc, s) && Bs(this, s, c, p)
              }),
              indentSelection: tn(function (s) {
                for (var c = this.doc.sel.ranges, p = -1, m = 0; m < c.length; m++) {
                  var y = c[m]
                  if (y.empty())
                    y.head.line > p &&
                      (Bs(this, y.head.line, s, !0), (p = y.head.line), m == this.doc.sel.primIndex && yo(this))
                  else {
                    var w = y.from(),
                      _ = y.to(),
                      P = Math.max(p, w.line)
                    p = Math.min(this.lastLine(), _.line - (_.ch ? 0 : 1)) + 1
                    for (var $ = P; $ < p; ++$) Bs(this, $, s)
                    var j = this.doc.sel.ranges
                    w.ch == 0 && c.length == j.length && j[m].from().ch > 0 && _u(this.doc, m, new ce(w, j[m].to()), O)
                  }
                }
              }),
              getTokenAt: function (s, c) {
                return rd(this, s, c)
              },
              getLineTokens: function (s, c) {
                return rd(this, z(s), c, !0)
              },
              getTokenTypeAt: function (s) {
                s = Bt(this.doc, s)
                var c = td(this, Lt(this.doc, s.line)),
                  p = 0,
                  m = (c.length - 1) / 2,
                  y = s.ch,
                  w
                if (y == 0) w = c[2]
                else
                  for (;;) {
                    var _ = (p + m) >> 1
                    if ((_ ? c[_ * 2 - 1] : 0) >= y) m = _
                    else if (c[_ * 2 + 1] < y) p = _ + 1
                    else {
                      w = c[_ * 2 + 2]
                      break
                    }
                  }
                var P = w ? w.indexOf('overlay ') : -1
                return P < 0 ? w : P == 0 ? null : w.slice(0, P - 1)
              },
              getModeAt: function (s) {
                var c = this.doc.mode
                return c.innerMode ? n.innerMode(c, this.getTokenAt(s).state).mode : c
              },
              getHelper: function (s, c) {
                return this.getHelpers(s, c)[0]
              },
              getHelpers: function (s, c) {
                var p = []
                if (!a.hasOwnProperty(c)) return p
                var m = a[c],
                  y = this.getModeAt(s)
                if (typeof y[c] == 'string') m[y[c]] && p.push(m[y[c]])
                else if (y[c])
                  for (var w = 0; w < y[c].length; w++) {
                    var _ = m[y[c][w]]
                    _ && p.push(_)
                  }
                else y.helperType && m[y.helperType] ? p.push(m[y.helperType]) : m[y.name] && p.push(m[y.name])
                for (var P = 0; P < m._global.length; P++) {
                  var $ = m._global[P]
                  $.pred(y, this) && it(p, $.val) == -1 && p.push($.val)
                }
                return p
              },
              getStateAfter: function (s, c) {
                var p = this.doc
                return (s = Pn(p, s ?? p.first + p.size - 1)), vs(this, s + 1, c).state
              },
              cursorCoords: function (s, c) {
                var p,
                  m = this.doc.sel.primary()
                return (
                  s == null ? (p = m.head) : typeof s == 'object' ? (p = Bt(this.doc, s)) : (p = s ? m.from() : m.to()),
                  Gn(this, p, c || 'page')
                )
              },
              charCoords: function (s, c) {
                return Ka(this, Bt(this.doc, s), c || 'page')
              },
              coordsChar: function (s, c) {
                return (s = Pd(this, s, c || 'page')), eu(this, s.left, s.top)
              },
              lineAtHeight: function (s, c) {
                return (s = Pd(this, { top: s, left: 0 }, c || 'page').top), ar(this.doc, s + this.display.viewOffset)
              },
              heightAtLine: function (s, c, p) {
                var m = !1,
                  y
                if (typeof s == 'number') {
                  var w = this.doc.first + this.doc.size - 1
                  s < this.doc.first ? (s = this.doc.first) : s > w && ((s = w), (m = !0)), (y = Lt(this.doc, s))
                } else y = s
                return Va(this, y, { top: 0, left: 0 }, c || 'page', p || m).top + (m ? this.doc.height - Tr(y) : 0)
              },
              defaultTextHeight: function () {
                return go(this.display)
              },
              defaultCharWidth: function () {
                return vo(this.display)
              },
              getViewport: function () {
                return { from: this.display.viewFrom, to: this.display.viewTo }
              },
              addWidget: function (s, c, p, m, y) {
                var w = this.display
                s = Gn(this, Bt(this.doc, s))
                var _ = s.bottom,
                  P = s.left
                if (
                  ((c.style.position = 'absolute'),
                  c.setAttribute('cm-ignore-events', 'true'),
                  this.display.input.setUneditable(c),
                  w.sizer.appendChild(c),
                  m == 'over')
                )
                  _ = s.top
                else if (m == 'above' || m == 'near') {
                  var $ = Math.max(w.wrapper.clientHeight, this.doc.height),
                    j = Math.max(w.sizer.clientWidth, w.lineSpace.clientWidth)
                  ;(m == 'above' || s.bottom + c.offsetHeight > $) && s.top > c.offsetHeight
                    ? (_ = s.top - c.offsetHeight)
                    : s.bottom + c.offsetHeight <= $ && (_ = s.bottom),
                    P + c.offsetWidth > j && (P = j - c.offsetWidth)
                }
                ;(c.style.top = _ + 'px'),
                  (c.style.left = c.style.right = ''),
                  y == 'right'
                    ? ((P = w.sizer.clientWidth - c.offsetWidth), (c.style.right = '0px'))
                    : (y == 'left' ? (P = 0) : y == 'middle' && (P = (w.sizer.clientWidth - c.offsetWidth) / 2),
                      (c.style.left = P + 'px')),
                  p && ww(this, { left: P, top: _, right: P + c.offsetWidth, bottom: _ + c.offsetHeight })
              },
              triggerOnKeyDown: tn(Dp),
              triggerOnKeyPress: tn(zp),
              triggerOnKeyUp: Rp,
              triggerOnMouseDown: tn(Ip),
              execCommand: function (s) {
                if (Is.hasOwnProperty(s)) return Is[s].call(null, this)
              },
              triggerElectric: tn(function (s) {
                jp(this, s)
              }),
              findPosH: function (s, c, p, m) {
                var y = 1
                c < 0 && ((y = -1), (c = -c))
                for (var w = Bt(this.doc, s), _ = 0; _ < c && ((w = Pu(this.doc, w, y, p, m)), !w.hitSide); ++_);
                return w
              },
              moveH: tn(function (s, c) {
                var p = this
                this.extendSelectionsBy(function (m) {
                  return p.display.shift || p.doc.extend || m.empty()
                    ? Pu(p.doc, m.head, s, c, p.options.rtlMoveVisually)
                    : s < 0
                      ? m.from()
                      : m.to()
                }, K)
              }),
              deleteH: tn(function (s, c) {
                var p = this.doc.sel,
                  m = this.doc
                p.somethingSelected()
                  ? m.replaceSelection('', null, '+delete')
                  : To(this, function (y) {
                      var w = Pu(m, y.head, s, c, !1)
                      return s < 0 ? { from: w, to: y.head } : { from: y.head, to: w }
                    })
              }),
              findPosV: function (s, c, p, m) {
                var y = 1,
                  w = m
                c < 0 && ((y = -1), (c = -c))
                for (var _ = Bt(this.doc, s), P = 0; P < c; ++P) {
                  var $ = Gn(this, _, 'div')
                  if ((w == null ? (w = $.left) : ($.left = w), (_ = Kp(this, $, y, p)), _.hitSide)) break
                }
                return _
              },
              moveV: tn(function (s, c) {
                var p = this,
                  m = this.doc,
                  y = [],
                  w = !this.display.shift && !m.extend && m.sel.somethingSelected()
                if (
                  (m.extendSelectionsBy(function (P) {
                    if (w) return s < 0 ? P.from() : P.to()
                    var $ = Gn(p, P.head, 'div')
                    P.goalColumn != null && ($.left = P.goalColumn), y.push($.left)
                    var j = Kp(p, $, s, c)
                    return c == 'page' && P == m.sel.primary() && fu(p, Ka(p, j, 'div').top - $.top), j
                  }, K),
                  y.length)
                )
                  for (var _ = 0; _ < m.sel.ranges.length; _++) m.sel.ranges[_].goalColumn = y[_]
              }),
              findWordAt: function (s) {
                var c = this.doc,
                  p = Lt(c, s.line).text,
                  m = s.ch,
                  y = s.ch
                if (p) {
                  var w = this.getHelper(s, 'wordChars')
                  ;(s.sticky == 'before' || y == p.length) && m ? --m : ++y
                  for (
                    var _ = p.charAt(m),
                      P = Ft(_, w)
                        ? function ($) {
                            return Ft($, w)
                          }
                        : /\s/.test(_)
                          ? function ($) {
                              return /\s/.test($)
                            }
                          : function ($) {
                              return !/\s/.test($) && !Ft($)
                            };
                    m > 0 && P(p.charAt(m - 1));

                  )
                    --m
                  for (; y < p.length && P(p.charAt(y)); ) ++y
                }
                return new ce(z(s.line, m), z(s.line, y))
              },
              toggleOverwrite: function (s) {
                ;(s != null && s == this.state.overwrite) ||
                  ((this.state.overwrite = !this.state.overwrite)
                    ? Tt(this.display.cursorDiv, 'CodeMirror-overwrite')
                    : pt(this.display.cursorDiv, 'CodeMirror-overwrite'),
                  me(this, 'overwriteToggle', this, this.state.overwrite))
              },
              hasFocus: function () {
                return this.display.input.getField() == wt(Gt(this))
              },
              isReadOnly: function () {
                return !!(this.options.readOnly || this.doc.cantEdit)
              },
              scrollTo: tn(function (s, c) {
                Ss(this, s, c)
              }),
              getScrollInfo: function () {
                var s = this.display.scroller
                return {
                  left: s.scrollLeft,
                  top: s.scrollTop,
                  height: s.scrollHeight - cr(this) - this.display.barHeight,
                  width: s.scrollWidth - cr(this) - this.display.barWidth,
                  clientHeight: Zc(this),
                  clientWidth: Ai(this),
                }
              },
              scrollIntoView: tn(function (s, c) {
                s == null
                  ? ((s = { from: this.doc.sel.primary().head, to: null }),
                    c == null && (c = this.options.cursorScrollMargin))
                  : typeof s == 'number'
                    ? (s = { from: z(s, 0), to: null })
                    : s.from == null && (s = { from: s, to: null }),
                  s.to || (s.to = s.from),
                  (s.margin = c || 0),
                  s.from.line != null ? xw(this, s) : Hd(this, s.from, s.to, s.margin)
              }),
              setSize: tn(function (s, c) {
                var p = this,
                  m = function (w) {
                    return typeof w == 'number' || /^\d+$/.test(String(w)) ? w + 'px' : w
                  }
                s != null && (this.display.wrapper.style.width = m(s)),
                  c != null && (this.display.wrapper.style.height = m(c)),
                  this.options.lineWrapping && Ad(this)
                var y = this.display.viewFrom
                this.doc.iter(y, this.display.viewTo, function (w) {
                  if (w.widgets) {
                    for (var _ = 0; _ < w.widgets.length; _++)
                      if (w.widgets[_].noHScroll) {
                        ti(p, y, 'widget')
                        break
                      }
                  }
                  ++y
                }),
                  (this.curOp.forceUpdate = !0),
                  me(this, 'refresh', this)
              }),
              operation: function (s) {
                return wn(this, s)
              },
              startOperation: function () {
                return Di(this)
              },
              endOperation: function () {
                return Ri(this)
              },
              refresh: tn(function () {
                var s = this.display.cachedTextHeight
                an(this),
                  (this.curOp.forceUpdate = !0),
                  xs(this),
                  Ss(this, this.doc.scrollLeft, this.doc.scrollTop),
                  pu(this.display),
                  (s == null || Math.abs(s - go(this.display)) > 0.5 || this.options.lineWrapping) && ou(this),
                  me(this, 'refresh', this)
              }),
              swapDoc: tn(function (s) {
                var c = this.doc
                return (
                  (c.cm = null),
                  this.state.selectingText && this.state.selectingText(),
                  ep(this, s),
                  xs(this),
                  this.display.input.reset(),
                  Ss(this, s.scrollLeft, s.scrollTop),
                  (this.curOp.forceScroll = !0),
                  Ie(this, 'swapDoc', this, c),
                  c
                )
              }),
              phrase: function (s) {
                var c = this.options.phrases
                return c && Object.prototype.hasOwnProperty.call(c, s) ? c[s] : s
              },
              getInputField: function () {
                return this.display.input.getField()
              },
              getWrapperElement: function () {
                return this.display.wrapper
              },
              getScrollerElement: function () {
                return this.display.scroller
              },
              getGutterElement: function () {
                return this.display.gutters
              },
            }),
              Qe(n),
              (n.registerHelper = function (s, c, p) {
                a.hasOwnProperty(s) || (a[s] = n[s] = { _global: [] }), (a[s][c] = p)
              }),
              (n.registerGlobalHelper = function (s, c, p, m) {
                n.registerHelper(s, c, m), a[s]._global.push({ pred: p, val: m })
              })
          }
          function Pu(n, i, a, s, c) {
            var p = i,
              m = a,
              y = Lt(n, i.line),
              w = c && n.direction == 'rtl' ? -a : a
            function _() {
              var St = i.line + w
              return St < n.first || St >= n.first + n.size ? !1 : ((i = new z(St, i.ch, i.sticky)), (y = Lt(n, St)))
            }
            function P(St) {
              var mt
              if (s == 'codepoint') {
                var Ct = y.text.charCodeAt(i.ch + (a > 0 ? 0 : -1))
                if (isNaN(Ct)) mt = null
                else {
                  var Dt = a > 0 ? Ct >= 55296 && Ct < 56320 : Ct >= 56320 && Ct < 57343
                  mt = new z(i.line, Math.max(0, Math.min(y.text.length, i.ch + a * (Dt ? 2 : 1))), -a)
                }
              } else c ? (mt = ix(n.cm, y, i, a)) : (mt = ku(y, i, a))
              if (mt == null)
                if (!St && _()) i = Cu(c, n.cm, y, i.line, w)
                else return !1
              else i = mt
              return !0
            }
            if (s == 'char' || s == 'codepoint') P()
            else if (s == 'column') P(!0)
            else if (s == 'word' || s == 'group')
              for (
                var $ = null, j = s == 'group', q = n.cm && n.cm.getHelper(i, 'wordChars'), Z = !0;
                !(a < 0 && !P(!Z));
                Z = !1
              ) {
                var rt =
                    y.text.charAt(i.ch) ||
                    `
`,
                  dt = Ft(rt, q)
                    ? 'w'
                    : j &&
                        rt ==
                          `
`
                      ? 'n'
                      : !j || /\s/.test(rt)
                        ? null
                        : 'p'
                if ((j && !Z && !dt && (dt = 's'), $ && $ != dt)) {
                  a < 0 && ((a = 1), P(), (i.sticky = 'after'))
                  break
                }
                if ((dt && ($ = dt), a > 0 && !P(!Z))) break
              }
            var vt = sl(n, i, p, m, !0)
            return Ht(p, vt) && (vt.hitSide = !0), vt
          }
          function Kp(n, i, a, s) {
            var c = n.doc,
              p = i.left,
              m
            if (s == 'page') {
              var y = Math.min(n.display.wrapper.clientHeight, Vt(n).innerHeight || c(n).documentElement.clientHeight),
                w = Math.max(y - 0.5 * go(n.display), 3)
              m = (a > 0 ? i.bottom : i.top) + a * w
            } else s == 'line' && (m = a > 0 ? i.bottom + 3 : i.top - 3)
            for (var _; (_ = eu(n, p, m)), !!_.outside; ) {
              if (a < 0 ? m <= 0 : m >= c.height) {
                _.hitSide = !0
                break
              }
              m += a * 5
            }
            return _
          }
          var he = function (n) {
            ;(this.cm = n),
              (this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null),
              (this.polling = new et()),
              (this.composing = null),
              (this.gracePeriod = !1),
              (this.readDOMTimeout = null)
          }
          ;(he.prototype.init = function (n) {
            var i = this,
              a = this,
              s = a.cm,
              c = (a.div = n.lineDiv)
            ;(c.contentEditable = !0), Nu(c, s.options.spellcheck, s.options.autocorrect, s.options.autocapitalize)
            function p(y) {
              for (var w = y.target; w; w = w.parentNode) {
                if (w == c) return !0
                if (/\bCodeMirror-(?:line)?widget\b/.test(w.className)) break
              }
              return !1
            }
            bt(c, 'paste', function (y) {
              !p(y) ||
                ke(s, y) ||
                Up(y, s) ||
                (g <= 11 &&
                  setTimeout(
                    Fe(s, function () {
                      return i.updateFromDOM()
                    }),
                    20,
                  ))
            }),
              bt(c, 'compositionstart', function (y) {
                i.composing = { data: y.data, done: !1 }
              }),
              bt(c, 'compositionupdate', function (y) {
                i.composing || (i.composing = { data: y.data, done: !1 })
              }),
              bt(c, 'compositionend', function (y) {
                i.composing && (y.data != i.composing.data && i.readFromDOMSoon(), (i.composing.done = !0))
              }),
              bt(c, 'touchstart', function () {
                return a.forceCompositionEnd()
              }),
              bt(c, 'input', function () {
                i.composing || i.readFromDOMSoon()
              })
            function m(y) {
              if (!(!p(y) || ke(s, y))) {
                if (s.somethingSelected())
                  hl({ lineWise: !1, text: s.getSelections() }), y.type == 'cut' && s.replaceSelection('', null, 'cut')
                else if (s.options.lineWiseCopyCut) {
                  var w = Gp(s)
                  hl({ lineWise: !0, text: w.text }),
                    y.type == 'cut' &&
                      s.operation(function () {
                        s.setSelections(w.ranges, 0, O), s.replaceSelection('', null, 'cut')
                      })
                } else return
                if (y.clipboardData) {
                  y.clipboardData.clearData()
                  var _ = Kn.text.join(`
`)
                  if ((y.clipboardData.setData('Text', _), y.clipboardData.getData('Text') == _)) {
                    y.preventDefault()
                    return
                  }
                }
                var P = Vp(),
                  $ = P.firstChild
                Nu($),
                  s.display.lineSpace.insertBefore(P, s.display.lineSpace.firstChild),
                  ($.value = Kn.text.join(`
`))
                var j = wt(c.ownerDocument)
                It($),
                  setTimeout(function () {
                    s.display.lineSpace.removeChild(P), j.focus(), j == c && a.showPrimarySelection()
                  }, 50)
              }
            }
            bt(c, 'copy', m), bt(c, 'cut', m)
          }),
            (he.prototype.screenReaderLabelChanged = function (n) {
              n ? this.div.setAttribute('aria-label', n) : this.div.removeAttribute('aria-label')
            }),
            (he.prototype.prepareSelection = function () {
              var n = Id(this.cm, !1)
              return (n.focus = wt(this.div.ownerDocument) == this.div), n
            }),
            (he.prototype.showSelection = function (n, i) {
              !n ||
                !this.cm.display.view.length ||
                ((n.focus || i) && this.showPrimarySelection(), this.showMultipleSelections(n))
            }),
            (he.prototype.getSelection = function () {
              return this.cm.display.wrapper.ownerDocument.getSelection()
            }),
            (he.prototype.showPrimarySelection = function () {
              var n = this.getSelection(),
                i = this.cm,
                a = i.doc.sel.primary(),
                s = a.from(),
                c = a.to()
              if (i.display.viewTo == i.display.viewFrom || s.line >= i.display.viewTo || c.line < i.display.viewFrom) {
                n.removeAllRanges()
                return
              }
              var p = dl(i, n.anchorNode, n.anchorOffset),
                m = dl(i, n.focusNode, n.focusOffset)
              if (!(p && !p.bad && m && !m.bad && Y($e(p, m), s) == 0 && Y(oe(p, m), c) == 0)) {
                var y = i.display.view,
                  w = (s.line >= i.display.viewFrom && Xp(i, s)) || { node: y[0].measure.map[2], offset: 0 },
                  _ = c.line < i.display.viewTo && Xp(i, c)
                if (!_) {
                  var P = y[y.length - 1].measure,
                    $ = P.maps ? P.maps[P.maps.length - 1] : P.map
                  _ = { node: $[$.length - 1], offset: $[$.length - 2] - $[$.length - 3] }
                }
                if (!w || !_) {
                  n.removeAllRanges()
                  return
                }
                var j = n.rangeCount && n.getRangeAt(0),
                  q
                try {
                  q = W(w.node, w.offset, _.offset, _.node)
                } catch {}
                q &&
                  (!l && i.state.focused
                    ? (n.collapse(w.node, w.offset), q.collapsed || (n.removeAllRanges(), n.addRange(q)))
                    : (n.removeAllRanges(), n.addRange(q)),
                  j && n.anchorNode == null ? n.addRange(j) : l && this.startGracePeriod()),
                  this.rememberSelection()
              }
            }),
            (he.prototype.startGracePeriod = function () {
              var n = this
              clearTimeout(this.gracePeriod),
                (this.gracePeriod = setTimeout(function () {
                  ;(n.gracePeriod = !1),
                    n.selectionChanged() &&
                      n.cm.operation(function () {
                        return (n.cm.curOp.selectionChanged = !0)
                      })
                }, 20))
            }),
            (he.prototype.showMultipleSelections = function (n) {
              R(this.cm.display.cursorDiv, n.cursors), R(this.cm.display.selectionDiv, n.selection)
            }),
            (he.prototype.rememberSelection = function () {
              var n = this.getSelection()
              ;(this.lastAnchorNode = n.anchorNode),
                (this.lastAnchorOffset = n.anchorOffset),
                (this.lastFocusNode = n.focusNode),
                (this.lastFocusOffset = n.focusOffset)
            }),
            (he.prototype.selectionInEditor = function () {
              var n = this.getSelection()
              if (!n.rangeCount) return !1
              var i = n.getRangeAt(0).commonAncestorContainer
              return J(this.div, i)
            }),
            (he.prototype.focus = function () {
              this.cm.options.readOnly != 'nocursor' &&
                ((!this.selectionInEditor() || wt(this.div.ownerDocument) != this.div) &&
                  this.showSelection(this.prepareSelection(), !0),
                this.div.focus())
            }),
            (he.prototype.blur = function () {
              this.div.blur()
            }),
            (he.prototype.getField = function () {
              return this.div
            }),
            (he.prototype.supportsTouch = function () {
              return !0
            }),
            (he.prototype.receivedFocus = function () {
              var n = this,
                i = this
              this.selectionInEditor()
                ? setTimeout(function () {
                    return n.pollSelection()
                  }, 20)
                : wn(this.cm, function () {
                    return (i.cm.curOp.selectionChanged = !0)
                  })
              function a() {
                i.cm.state.focused && (i.pollSelection(), i.polling.set(i.cm.options.pollInterval, a))
              }
              this.polling.set(this.cm.options.pollInterval, a)
            }),
            (he.prototype.selectionChanged = function () {
              var n = this.getSelection()
              return (
                n.anchorNode != this.lastAnchorNode ||
                n.anchorOffset != this.lastAnchorOffset ||
                n.focusNode != this.lastFocusNode ||
                n.focusOffset != this.lastFocusOffset
              )
            }),
            (he.prototype.pollSelection = function () {
              if (!(this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged())) {
                var n = this.getSelection(),
                  i = this.cm
                if (F && x && this.cm.display.gutterSpecs.length && kx(n.anchorNode)) {
                  this.cm.triggerOnKeyDown({ type: 'keydown', keyCode: 8, preventDefault: Math.abs }),
                    this.blur(),
                    this.focus()
                  return
                }
                if (!this.composing) {
                  this.rememberSelection()
                  var a = dl(i, n.anchorNode, n.anchorOffset),
                    s = dl(i, n.focusNode, n.focusOffset)
                  a &&
                    s &&
                    wn(i, function () {
                      Xe(i.doc, ni(a, s), O), (a.bad || s.bad) && (i.curOp.selectionChanged = !0)
                    })
                }
              }
            }),
            (he.prototype.pollContent = function () {
              this.readDOMTimeout != null && (clearTimeout(this.readDOMTimeout), (this.readDOMTimeout = null))
              var n = this.cm,
                i = n.display,
                a = n.doc.sel.primary(),
                s = a.from(),
                c = a.to()
              if (
                (s.ch == 0 && s.line > n.firstLine() && (s = z(s.line - 1, Lt(n.doc, s.line - 1).length)),
                c.ch == Lt(n.doc, c.line).text.length && c.line < n.lastLine() && (c = z(c.line + 1, 0)),
                s.line < i.viewFrom || c.line > i.viewTo - 1)
              )
                return !1
              var p, m, y
              s.line == i.viewFrom || (p = Pi(n, s.line)) == 0
                ? ((m = le(i.view[0].line)), (y = i.view[0].node))
                : ((m = le(i.view[p].line)), (y = i.view[p - 1].node.nextSibling))
              var w = Pi(n, c.line),
                _,
                P
              if (
                (w == i.view.length - 1
                  ? ((_ = i.viewTo - 1), (P = i.lineDiv.lastChild))
                  : ((_ = le(i.view[w + 1].line) - 1), (P = i.view[w + 1].node.previousSibling)),
                !y)
              )
                return !1
              for (
                var $ = n.doc.splitLines(Cx(n, y, P, m, _)), j = kr(n.doc, z(m, 0), z(_, Lt(n.doc, _).text.length));
                $.length > 1 && j.length > 1;

              )
                if (lt($) == lt(j)) $.pop(), j.pop(), _--
                else if ($[0] == j[0]) $.shift(), j.shift(), m++
                else break
              for (
                var q = 0, Z = 0, rt = $[0], dt = j[0], vt = Math.min(rt.length, dt.length);
                q < vt && rt.charCodeAt(q) == dt.charCodeAt(q);

              )
                ++q
              for (
                var St = lt($),
                  mt = lt(j),
                  Ct = Math.min(St.length - ($.length == 1 ? q : 0), mt.length - (j.length == 1 ? q : 0));
                Z < Ct && St.charCodeAt(St.length - Z - 1) == mt.charCodeAt(mt.length - Z - 1);

              )
                ++Z
              if ($.length == 1 && j.length == 1 && m == s.line)
                for (; q && q > s.ch && St.charCodeAt(St.length - Z - 1) == mt.charCodeAt(mt.length - Z - 1); ) q--, Z++
              ;($[$.length - 1] = St.slice(0, St.length - Z).replace(/^\u200b+/, '')),
                ($[0] = $[0].slice(q).replace(/\u200b+$/, ''))
              var Dt = z(m, q),
                Pt = z(_, j.length ? lt(j).length - Z : 0)
              if ($.length > 1 || $[0] || Y(Dt, Pt)) return So(n.doc, $, Dt, Pt, '+input'), !0
            }),
            (he.prototype.ensurePolled = function () {
              this.forceCompositionEnd()
            }),
            (he.prototype.reset = function () {
              this.forceCompositionEnd()
            }),
            (he.prototype.forceCompositionEnd = function () {
              this.composing &&
                (clearTimeout(this.readDOMTimeout),
                (this.composing = null),
                this.updateFromDOM(),
                this.div.blur(),
                this.div.focus())
            }),
            (he.prototype.readFromDOMSoon = function () {
              var n = this
              this.readDOMTimeout == null &&
                (this.readDOMTimeout = setTimeout(function () {
                  if (((n.readDOMTimeout = null), n.composing))
                    if (n.composing.done) n.composing = null
                    else return
                  n.updateFromDOM()
                }, 80))
            }),
            (he.prototype.updateFromDOM = function () {
              var n = this
              ;(this.cm.isReadOnly() || !this.pollContent()) &&
                wn(this.cm, function () {
                  return an(n.cm)
                })
            }),
            (he.prototype.setUneditable = function (n) {
              n.contentEditable = 'false'
            }),
            (he.prototype.onKeyPress = function (n) {
              n.charCode == 0 ||
                this.composing ||
                (n.preventDefault(),
                this.cm.isReadOnly() ||
                  Fe(this.cm, Mu)(this.cm, String.fromCharCode(n.charCode == null ? n.keyCode : n.charCode), 0))
            }),
            (he.prototype.readOnlyChanged = function (n) {
              this.div.contentEditable = String(n != 'nocursor')
            }),
            (he.prototype.onContextMenu = function () {}),
            (he.prototype.resetPosition = function () {}),
            (he.prototype.needsContentAttribute = !0)
          function Xp(n, i) {
            var a = Jc(n, i.line)
            if (!a || a.hidden) return null
            var s = Lt(n.doc, i.line),
              c = kd(a, s, i.line),
              p = ye(s, n.doc.direction),
              m = 'left'
            if (p) {
              var y = We(p, i.ch)
              m = y % 2 ? 'right' : 'left'
            }
            var w = Ed(c.map, i.ch, m)
            return (w.offset = w.collapse == 'right' ? w.end : w.start), w
          }
          function kx(n) {
            for (var i = n; i; i = i.parentNode) if (/CodeMirror-gutter-wrapper/.test(i.className)) return !0
            return !1
          }
          function Lo(n, i) {
            return i && (n.bad = !0), n
          }
          function Cx(n, i, a, s, c) {
            var p = '',
              m = !1,
              y = n.doc.lineSeparator(),
              w = !1
            function _(q) {
              return function (Z) {
                return Z.id == q
              }
            }
            function P() {
              m && ((p += y), w && (p += y), (m = w = !1))
            }
            function $(q) {
              q && (P(), (p += q))
            }
            function j(q) {
              if (q.nodeType == 1) {
                var Z = q.getAttribute('cm-text')
                if (Z) {
                  $(Z)
                  return
                }
                var rt = q.getAttribute('cm-marker'),
                  dt
                if (rt) {
                  var vt = n.findMarks(z(s, 0), z(c + 1, 0), _(+rt))
                  vt.length && (dt = vt[0].find(0)) && $(kr(n.doc, dt.from, dt.to).join(y))
                  return
                }
                if (q.getAttribute('contenteditable') == 'false') return
                var St = /^(pre|div|p|li|table|br)$/i.test(q.nodeName)
                if (!/^br$/i.test(q.nodeName) && q.textContent.length == 0) return
                St && P()
                for (var mt = 0; mt < q.childNodes.length; mt++) j(q.childNodes[mt])
                ;/^(pre|p)$/i.test(q.nodeName) && (w = !0), St && (m = !0)
              } else q.nodeType == 3 && $(q.nodeValue.replace(/\u200b/g, '').replace(/\u00a0/g, ' '))
            }
            for (; j(i), i != a; ) (i = i.nextSibling), (w = !1)
            return p
          }
          function dl(n, i, a) {
            var s
            if (i == n.display.lineDiv) {
              if (((s = n.display.lineDiv.childNodes[a]), !s)) return Lo(n.clipPos(z(n.display.viewTo - 1)), !0)
              ;(i = null), (a = 0)
            } else
              for (s = i; ; s = s.parentNode) {
                if (!s || s == n.display.lineDiv) return null
                if (s.parentNode && s.parentNode == n.display.lineDiv) break
              }
            for (var c = 0; c < n.display.view.length; c++) {
              var p = n.display.view[c]
              if (p.node == s) return Tx(p, i, a)
            }
          }
          function Tx(n, i, a) {
            var s = n.text.firstChild,
              c = !1
            if (!i || !J(s, i)) return Lo(z(le(n.line), 0), !0)
            if (i == s && ((c = !0), (i = s.childNodes[a]), (a = 0), !i)) {
              var p = n.rest ? lt(n.rest) : n.line
              return Lo(z(le(p), p.text.length), c)
            }
            var m = i.nodeType == 3 ? i : null,
              y = i
            for (
              !m &&
              i.childNodes.length == 1 &&
              i.firstChild.nodeType == 3 &&
              ((m = i.firstChild), a && (a = m.nodeValue.length));
              y.parentNode != s;

            )
              y = y.parentNode
            var w = n.measure,
              _ = w.maps
            function P(dt, vt, St) {
              for (var mt = -1; mt < (_ ? _.length : 0); mt++)
                for (var Ct = mt < 0 ? w.map : _[mt], Dt = 0; Dt < Ct.length; Dt += 3) {
                  var Pt = Ct[Dt + 2]
                  if (Pt == dt || Pt == vt) {
                    var Ut = le(mt < 0 ? n.line : n.rest[mt]),
                      ge = Ct[Dt] + St
                    return (St < 0 || Pt != dt) && (ge = Ct[Dt + (St ? 1 : 0)]), z(Ut, ge)
                  }
                }
            }
            var $ = P(m, y, a)
            if ($) return Lo($, c)
            for (var j = y.nextSibling, q = m ? m.nodeValue.length - a : 0; j; j = j.nextSibling) {
              if ((($ = P(j, j.firstChild, 0)), $)) return Lo(z($.line, $.ch - q), c)
              q += j.textContent.length
            }
            for (var Z = y.previousSibling, rt = a; Z; Z = Z.previousSibling) {
              if ((($ = P(Z, Z.firstChild, -1)), $)) return Lo(z($.line, $.ch + rt), c)
              rt += Z.textContent.length
            }
          }
          var Le = function (n) {
            ;(this.cm = n),
              (this.prevInput = ''),
              (this.pollingFast = !1),
              (this.polling = new et()),
              (this.hasSelection = !1),
              (this.composing = null),
              (this.resetting = !1)
          }
          ;(Le.prototype.init = function (n) {
            var i = this,
              a = this,
              s = this.cm
            this.createField(n)
            var c = this.textarea
            n.wrapper.insertBefore(this.wrapper, n.wrapper.firstChild),
              L && (c.style.width = '0px'),
              bt(c, 'input', function () {
                d && g >= 9 && i.hasSelection && (i.hasSelection = null), a.poll()
              }),
              bt(c, 'paste', function (m) {
                ke(s, m) || Up(m, s) || ((s.state.pasteIncoming = +new Date()), a.fastPoll())
              })
            function p(m) {
              if (!ke(s, m)) {
                if (s.somethingSelected()) hl({ lineWise: !1, text: s.getSelections() })
                else if (s.options.lineWiseCopyCut) {
                  var y = Gp(s)
                  hl({ lineWise: !0, text: y.text }),
                    m.type == 'cut'
                      ? s.setSelections(y.ranges, null, O)
                      : ((a.prevInput = ''),
                        (c.value = y.text.join(`
`)),
                        It(c))
                } else return
                m.type == 'cut' && (s.state.cutIncoming = +new Date())
              }
            }
            bt(c, 'cut', p),
              bt(c, 'copy', p),
              bt(n.scroller, 'paste', function (m) {
                if (!(Er(n, m) || ke(s, m))) {
                  if (!c.dispatchEvent) {
                    ;(s.state.pasteIncoming = +new Date()), a.focus()
                    return
                  }
                  var y = new Event('paste')
                  ;(y.clipboardData = m.clipboardData), c.dispatchEvent(y)
                }
              }),
              bt(n.lineSpace, 'selectstart', function (m) {
                Er(n, m) || Ke(m)
              }),
              bt(c, 'compositionstart', function () {
                var m = s.getCursor('from')
                a.composing && a.composing.range.clear(),
                  (a.composing = {
                    start: m,
                    range: s.markText(m, s.getCursor('to'), { className: 'CodeMirror-composing' }),
                  })
              }),
              bt(c, 'compositionend', function () {
                a.composing && (a.poll(), a.composing.range.clear(), (a.composing = null))
              })
          }),
            (Le.prototype.createField = function (n) {
              ;(this.wrapper = Vp()), (this.textarea = this.wrapper.firstChild)
              var i = this.cm.options
              Nu(this.textarea, i.spellcheck, i.autocorrect, i.autocapitalize)
            }),
            (Le.prototype.screenReaderLabelChanged = function (n) {
              n ? this.textarea.setAttribute('aria-label', n) : this.textarea.removeAttribute('aria-label')
            }),
            (Le.prototype.prepareSelection = function () {
              var n = this.cm,
                i = n.display,
                a = n.doc,
                s = Id(n)
              if (n.options.moveInputWithCursor) {
                var c = Gn(n, a.sel.primary().head, 'div'),
                  p = i.wrapper.getBoundingClientRect(),
                  m = i.lineDiv.getBoundingClientRect()
                ;(s.teTop = Math.max(0, Math.min(i.wrapper.clientHeight - 10, c.top + m.top - p.top))),
                  (s.teLeft = Math.max(0, Math.min(i.wrapper.clientWidth - 10, c.left + m.left - p.left)))
              }
              return s
            }),
            (Le.prototype.showSelection = function (n) {
              var i = this.cm,
                a = i.display
              R(a.cursorDiv, n.cursors),
                R(a.selectionDiv, n.selection),
                n.teTop != null &&
                  ((this.wrapper.style.top = n.teTop + 'px'), (this.wrapper.style.left = n.teLeft + 'px'))
            }),
            (Le.prototype.reset = function (n) {
              if (!(this.contextMenuPending || (this.composing && n))) {
                var i = this.cm
                if (((this.resetting = !0), i.somethingSelected())) {
                  this.prevInput = ''
                  var a = i.getSelection()
                  ;(this.textarea.value = a),
                    i.state.focused && It(this.textarea),
                    d && g >= 9 && (this.hasSelection = a)
                } else n || ((this.prevInput = this.textarea.value = ''), d && g >= 9 && (this.hasSelection = null))
                this.resetting = !1
              }
            }),
            (Le.prototype.getField = function () {
              return this.textarea
            }),
            (Le.prototype.supportsTouch = function () {
              return !1
            }),
            (Le.prototype.focus = function () {
              if (this.cm.options.readOnly != 'nocursor' && (!A || wt(this.textarea.ownerDocument) != this.textarea))
                try {
                  this.textarea.focus()
                } catch {}
            }),
            (Le.prototype.blur = function () {
              this.textarea.blur()
            }),
            (Le.prototype.resetPosition = function () {
              this.wrapper.style.top = this.wrapper.style.left = 0
            }),
            (Le.prototype.receivedFocus = function () {
              this.slowPoll()
            }),
            (Le.prototype.slowPoll = function () {
              var n = this
              this.pollingFast ||
                this.polling.set(this.cm.options.pollInterval, function () {
                  n.poll(), n.cm.state.focused && n.slowPoll()
                })
            }),
            (Le.prototype.fastPoll = function () {
              var n = !1,
                i = this
              i.pollingFast = !0
              function a() {
                var s = i.poll()
                !s && !n ? ((n = !0), i.polling.set(60, a)) : ((i.pollingFast = !1), i.slowPoll())
              }
              i.polling.set(20, a)
            }),
            (Le.prototype.poll = function () {
              var n = this,
                i = this.cm,
                a = this.textarea,
                s = this.prevInput
              if (
                this.contextMenuPending ||
                this.resetting ||
                !i.state.focused ||
                (Xr(a) && !s && !this.composing) ||
                i.isReadOnly() ||
                i.options.disableInput ||
                i.state.keySeq
              )
                return !1
              var c = a.value
              if (c == s && !i.somethingSelected()) return !1
              if ((d && g >= 9 && this.hasSelection === c) || (B && /[\uf700-\uf7ff]/.test(c)))
                return i.display.input.reset(), !1
              if (i.doc.sel == i.display.selForContextMenu) {
                var p = c.charCodeAt(0)
                if ((p == 8203 && !s && (s = '​'), p == 8666)) return this.reset(), this.cm.execCommand('undo')
              }
              for (var m = 0, y = Math.min(s.length, c.length); m < y && s.charCodeAt(m) == c.charCodeAt(m); ) ++m
              return (
                wn(i, function () {
                  Mu(i, c.slice(m), s.length - m, null, n.composing ? '*compose' : null),
                    c.length > 1e3 ||
                    c.indexOf(`
`) > -1
                      ? (a.value = n.prevInput = '')
                      : (n.prevInput = c),
                    n.composing &&
                      (n.composing.range.clear(),
                      (n.composing.range = i.markText(n.composing.start, i.getCursor('to'), {
                        className: 'CodeMirror-composing',
                      })))
                }),
                !0
              )
            }),
            (Le.prototype.ensurePolled = function () {
              this.pollingFast && this.poll() && (this.pollingFast = !1)
            }),
            (Le.prototype.onKeyPress = function () {
              d && g >= 9 && (this.hasSelection = null), this.fastPoll()
            }),
            (Le.prototype.onContextMenu = function (n) {
              var i = this,
                a = i.cm,
                s = a.display,
                c = i.textarea
              i.contextMenuPending && i.contextMenuPending()
              var p = Ni(a, n),
                m = s.scroller.scrollTop
              if (!p || M) return
              var y = a.options.resetSelectionOnContextMenu
              y && a.doc.sel.contains(p) == -1 && Fe(a, Xe)(a.doc, ni(p), O)
              var w = c.style.cssText,
                _ = i.wrapper.style.cssText,
                P = i.wrapper.offsetParent.getBoundingClientRect()
              ;(i.wrapper.style.cssText = 'position: static'),
                (c.style.cssText =
                  `position: absolute; width: 30px; height: 30px;
      top: ` +
                  (n.clientY - P.top - 5) +
                  'px; left: ' +
                  (n.clientX - P.left - 5) +
                  `px;
      z-index: 1000; background: ` +
                  (d ? 'rgba(255, 255, 255, .05)' : 'transparent') +
                  `;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`)
              var $
              v && ($ = c.ownerDocument.defaultView.scrollY),
                s.input.focus(),
                v && c.ownerDocument.defaultView.scrollTo(null, $),
                s.input.reset(),
                a.somethingSelected() || (c.value = i.prevInput = ' '),
                (i.contextMenuPending = q),
                (s.selForContextMenu = a.doc.sel),
                clearTimeout(s.detectingSelectAll)
              function j() {
                if (c.selectionStart != null) {
                  var rt = a.somethingSelected(),
                    dt = '​' + (rt ? c.value : '')
                  ;(c.value = '⇚'),
                    (c.value = dt),
                    (i.prevInput = rt ? '' : '​'),
                    (c.selectionStart = 1),
                    (c.selectionEnd = dt.length),
                    (s.selForContextMenu = a.doc.sel)
                }
              }
              function q() {
                if (
                  i.contextMenuPending == q &&
                  ((i.contextMenuPending = !1),
                  (i.wrapper.style.cssText = _),
                  (c.style.cssText = w),
                  d && g < 9 && s.scrollbars.setScrollTop((s.scroller.scrollTop = m)),
                  c.selectionStart != null)
                ) {
                  ;(!d || (d && g < 9)) && j()
                  var rt = 0,
                    dt = function () {
                      s.selForContextMenu == a.doc.sel &&
                      c.selectionStart == 0 &&
                      c.selectionEnd > 0 &&
                      i.prevInput == '​'
                        ? Fe(a, pp)(a)
                        : rt++ < 10
                          ? (s.detectingSelectAll = setTimeout(dt, 500))
                          : ((s.selForContextMenu = null), s.input.reset())
                    }
                  s.detectingSelectAll = setTimeout(dt, 200)
                }
              }
              if ((d && g >= 9 && j(), ot)) {
                xr(n)
                var Z = function () {
                  Ve(window, 'mouseup', Z), setTimeout(q, 20)
                }
                bt(window, 'mouseup', Z)
              } else setTimeout(q, 50)
            }),
            (Le.prototype.readOnlyChanged = function (n) {
              n || this.reset(), (this.textarea.disabled = n == 'nocursor'), (this.textarea.readOnly = !!n)
            }),
            (Le.prototype.setUneditable = function () {}),
            (Le.prototype.needsContentAttribute = !1)
          function Ex(n, i) {
            if (
              ((i = i ? _t(i) : {}),
              (i.value = n.value),
              !i.tabindex && n.tabIndex && (i.tabindex = n.tabIndex),
              !i.placeholder && n.placeholder && (i.placeholder = n.placeholder),
              i.autofocus == null)
            ) {
              var a = wt(n.ownerDocument)
              i.autofocus = a == n || (n.getAttribute('autofocus') != null && a == document.body)
            }
            function s() {
              n.value = y.getValue()
            }
            var c
            if (n.form && (bt(n.form, 'submit', s), !i.leaveSubmitMethodAlone)) {
              var p = n.form
              c = p.submit
              try {
                var m = (p.submit = function () {
                  s(), (p.submit = c), p.submit(), (p.submit = m)
                })
              } catch {}
            }
            ;(i.finishInit = function (w) {
              ;(w.save = s),
                (w.getTextArea = function () {
                  return n
                }),
                (w.toTextArea = function () {
                  ;(w.toTextArea = isNaN),
                    s(),
                    n.parentNode.removeChild(w.getWrapperElement()),
                    (n.style.display = ''),
                    n.form &&
                      (Ve(n.form, 'submit', s),
                      !i.leaveSubmitMethodAlone && typeof n.form.submit == 'function' && (n.form.submit = c))
                })
            }),
              (n.style.display = 'none')
            var y = we(function (w) {
              return n.parentNode.insertBefore(w, n.nextSibling)
            }, i)
            return y
          }
          function Lx(n) {
            ;(n.off = Ve),
              (n.on = bt),
              (n.wheelEventPixels = Dw),
              (n.Doc = ln),
              (n.splitLines = ps),
              (n.countColumn = U),
              (n.findColumn = Q),
              (n.isWordChar = Ot),
              (n.Pass = Nt),
              (n.signal = me),
              (n.Line = fo),
              (n.changeEnd = ri),
              (n.scrollbarModel = Ud),
              (n.Pos = z),
              (n.cmpPos = Y),
              (n.modes = Un),
              (n.mimeModes = Yr),
              (n.resolveMode = bn),
              (n.getMode = _r),
              (n.modeExtensions = Zr),
              (n.extendMode = Ia),
              (n.copyState = Sr),
              (n.startState = gs),
              (n.innerMode = Jr),
              (n.commands = Is),
              (n.keyMap = Ar),
              (n.keyName = Mp),
              (n.isModifierKey = Lp),
              (n.lookupKey = Co),
              (n.normalizeKeyMap = rx),
              (n.StringStream = Ce),
              (n.SharedTextMarker = Ds),
              (n.TextMarker = oi),
              (n.LineWidget = $s),
              (n.e_preventDefault = Ke),
              (n.e_stopPropagation = Li),
              (n.e_stop = xr),
              (n.addClass = Tt),
              (n.contains = J),
              (n.rmClass = pt),
              (n.keyNames = si)
          }
          bx(we), Sx(we)
          var Ax = 'iter insert remove copy getEditor constructor'.split(' ')
          for (var pl in ln.prototype)
            ln.prototype.hasOwnProperty(pl) &&
              it(Ax, pl) < 0 &&
              (we.prototype[pl] = (function (n) {
                return function () {
                  return n.apply(this.doc, arguments)
                }
              })(ln.prototype[pl]))
          return (
            Qe(ln),
            (we.inputStyles = { textarea: Le, contenteditable: he }),
            (we.defineMode = function (n) {
              !we.defaults.mode && n != 'null' && (we.defaults.mode = n), za.apply(this, arguments)
            }),
            (we.defineMIME = co),
            we.defineMode('null', function () {
              return {
                token: function (n) {
                  return n.skipToEnd()
                },
              }
            }),
            we.defineMIME('text/plain', 'null'),
            (we.defineExtension = function (n, i) {
              we.prototype[n] = i
            }),
            (we.defineDocExtension = function (n, i) {
              ln.prototype[n] = i
            }),
            (we.fromTextArea = Ex),
            Lx(we),
            (we.version = '5.65.13'),
            we
          )
        })
      })(Zu)),
    Zu.exports
  )
}
var ilt = cs()
const olt = J0(ilt)
var slt = { exports: {} }
;(function (t, e) {
  ;(function (r) {
    r(cs())
  })(function (r) {
    r.defineMode('javascript', function (o, l) {
      var u = o.indentUnit,
        f = l.statementIndent,
        h = l.jsonld,
        d = l.json || h,
        g = l.trackScope !== !1,
        v = l.typescript,
        b = l.wordCharacters || /[\w$\xa1-\uffff]/,
        x = (function () {
          function C($e) {
            return { type: $e, style: 'keyword' }
          }
          var D = C('keyword a'),
            z = C('keyword b'),
            Y = C('keyword c'),
            Ht = C('keyword d'),
            Xt = C('operator'),
            oe = { type: 'atom', style: 'atom' }
          return {
            if: C('if'),
            while: D,
            with: D,
            else: z,
            do: z,
            try: z,
            finally: z,
            return: Ht,
            break: Ht,
            continue: Ht,
            new: C('new'),
            delete: Y,
            void: Y,
            throw: Y,
            debugger: C('debugger'),
            var: C('var'),
            const: C('var'),
            let: C('var'),
            function: C('function'),
            catch: C('catch'),
            for: C('for'),
            switch: C('switch'),
            case: C('case'),
            default: C('default'),
            in: Xt,
            typeof: Xt,
            instanceof: Xt,
            true: oe,
            false: oe,
            null: oe,
            undefined: oe,
            NaN: oe,
            Infinity: oe,
            this: C('this'),
            class: C('class'),
            super: C('atom'),
            yield: Y,
            export: C('export'),
            import: C('import'),
            extends: Y,
            await: Y,
          }
        })(),
        S = /[+\-*&%=<>!?|~^@]/,
        M = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/
      function T(C) {
        for (var D = !1, z, Y = !1; (z = C.next()) != null; ) {
          if (!D) {
            if (z == '/' && !Y) return
            z == '[' ? (Y = !0) : Y && z == ']' && (Y = !1)
          }
          D = !D && z == '\\'
        }
      }
      var N, E
      function L(C, D, z) {
        return (N = C), (E = z), D
      }
      function F(C, D) {
        var z = C.next()
        if (z == '"' || z == "'") return (D.tokenize = A(z)), D.tokenize(C, D)
        if (z == '.' && C.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) return L('number', 'number')
        if (z == '.' && C.match('..')) return L('spread', 'meta')
        if (/[\[\]{}\(\),;\:\.]/.test(z)) return L(z)
        if (z == '=' && C.eat('>')) return L('=>', 'operator')
        if (z == '0' && C.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) return L('number', 'number')
        if (/\d/.test(z)) return C.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), L('number', 'number')
        if (z == '/')
          return C.eat('*')
            ? ((D.tokenize = B), B(C, D))
            : C.eat('/')
              ? (C.skipToEnd(), L('comment', 'comment'))
              : ar(C, D, 1)
                ? (T(C), C.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), L('regexp', 'string-2'))
                : (C.eat('='), L('operator', 'operator', C.current()))
        if (z == '`') return (D.tokenize = tt), tt(C, D)
        if (z == '#' && C.peek() == '!') return C.skipToEnd(), L('meta', 'meta')
        if (z == '#' && C.eatWhile(b)) return L('variable', 'property')
        if ((z == '<' && C.match('!--')) || (z == '-' && C.match('->') && !/\S/.test(C.string.slice(0, C.start))))
          return C.skipToEnd(), L('comment', 'comment')
        if (S.test(z))
          return (
            (z != '>' || !D.lexical || D.lexical.type != '>') &&
              (C.eat('=')
                ? (z == '!' || z == '=') && C.eat('=')
                : /[<>*+\-|&?]/.test(z) && (C.eat(z), z == '>' && C.eat(z))),
            z == '?' && C.eat('.') ? L('.') : L('operator', 'operator', C.current())
          )
        if (b.test(z)) {
          C.eatWhile(b)
          var Y = C.current()
          if (D.lastType != '.') {
            if (x.propertyIsEnumerable(Y)) {
              var Ht = x[Y]
              return L(Ht.type, Ht.style, Y)
            }
            if (Y == 'async' && C.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1)) return L('async', 'keyword', Y)
          }
          return L('variable', 'variable', Y)
        }
      }
      function A(C) {
        return function (D, z) {
          var Y = !1,
            Ht
          if (h && D.peek() == '@' && D.match(M)) return (z.tokenize = F), L('jsonld-keyword', 'meta')
          for (; (Ht = D.next()) != null && !(Ht == C && !Y); ) Y = !Y && Ht == '\\'
          return Y || (z.tokenize = F), L('string', 'string')
        }
      }
      function B(C, D) {
        for (var z = !1, Y; (Y = C.next()); ) {
          if (Y == '/' && z) {
            D.tokenize = F
            break
          }
          z = Y == '*'
        }
        return L('comment', 'comment')
      }
      function tt(C, D) {
        for (var z = !1, Y; (Y = C.next()) != null; ) {
          if (!z && (Y == '`' || (Y == '$' && C.eat('{')))) {
            D.tokenize = F
            break
          }
          z = !z && Y == '\\'
        }
        return L('quasi', 'string-2', C.current())
      }
      var ft = '([{}])'
      function X(C, D) {
        D.fatArrowAt && (D.fatArrowAt = null)
        var z = C.string.indexOf('=>', C.start)
        if (!(z < 0)) {
          if (v) {
            var Y = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(C.string.slice(C.start, z))
            Y && (z = Y.index)
          }
          for (var Ht = 0, Xt = !1, oe = z - 1; oe >= 0; --oe) {
            var $e = C.string.charAt(oe),
              Pn = ft.indexOf($e)
            if (Pn >= 0 && Pn < 3) {
              if (!Ht) {
                ++oe
                break
              }
              if (--Ht == 0) {
                $e == '(' && (Xt = !0)
                break
              }
            } else if (Pn >= 3 && Pn < 6) ++Ht
            else if (b.test($e)) Xt = !0
            else if (/["'\/`]/.test($e))
              for (; ; --oe) {
                if (oe == 0) return
                var Bt = C.string.charAt(oe - 1)
                if (Bt == $e && C.string.charAt(oe - 2) != '\\') {
                  oe--
                  break
                }
              }
            else if (Xt && !Ht) {
              ++oe
              break
            }
          }
          Xt && !Ht && (D.fatArrowAt = oe)
        }
      }
      var st = {
        atom: !0,
        number: !0,
        variable: !0,
        string: !0,
        regexp: !0,
        this: !0,
        import: !0,
        'jsonld-keyword': !0,
      }
      function ot(C, D, z, Y, Ht, Xt) {
        ;(this.indented = C),
          (this.column = D),
          (this.type = z),
          (this.prev = Ht),
          (this.info = Xt),
          Y != null && (this.align = Y)
      }
      function kt(C, D) {
        if (!g) return !1
        for (var z = C.localVars; z; z = z.next) if (z.name == D) return !0
        for (var Y = C.context; Y; Y = Y.prev) for (var z = Y.vars; z; z = z.next) if (z.name == D) return !0
      }
      function pt(C, D, z, Y, Ht) {
        var Xt = C.cc
        for (
          V.state = C,
            V.stream = Ht,
            V.marked = null,
            V.cc = Xt,
            V.style = D,
            C.lexical.hasOwnProperty('align') || (C.lexical.align = !0);
          ;

        ) {
          var oe = Xt.length ? Xt.pop() : d ? Nt : it
          if (oe(z, Y)) {
            for (; Xt.length && Xt[Xt.length - 1].lex; ) Xt.pop()()
            return V.marked ? V.marked : z == 'variable' && kt(C, Y) ? 'variable-2' : D
          }
        }
      }
      var V = { state: null, column: null, marked: null, cc: null }
      function R() {
        for (var C = arguments.length - 1; C >= 0; C--) V.cc.push(arguments[C])
      }
      function k() {
        return R.apply(null, arguments), !0
      }
      function H(C, D) {
        for (var z = D; z; z = z.next) if (z.name == C) return !0
        return !1
      }
      function W(C) {
        var D = V.state
        if (((V.marked = 'def'), !!g)) {
          if (D.context) {
            if (D.lexical.info == 'var' && D.context && D.context.block) {
              var z = J(C, D.context)
              if (z != null) {
                D.context = z
                return
              }
            } else if (!H(C, D.localVars)) {
              D.localVars = new zt(C, D.localVars)
              return
            }
          }
          l.globalVars && !H(C, D.globalVars) && (D.globalVars = new zt(C, D.globalVars))
        }
      }
      function J(C, D) {
        if (D)
          if (D.block) {
            var z = J(C, D.prev)
            return z ? (z == D.prev ? D : new Tt(z, D.vars, !0)) : null
          } else return H(C, D.vars) ? D : new Tt(D.prev, new zt(C, D.vars), !1)
        else return null
      }
      function wt(C) {
        return C == 'public' || C == 'private' || C == 'protected' || C == 'abstract' || C == 'readonly'
      }
      function Tt(C, D, z) {
        ;(this.prev = C), (this.vars = D), (this.block = z)
      }
      function zt(C, D) {
        ;(this.name = C), (this.next = D)
      }
      var It = new zt('this', new zt('arguments', null))
      function Gt() {
        ;(V.state.context = new Tt(V.state.context, V.state.localVars, !1)), (V.state.localVars = It)
      }
      function Vt() {
        ;(V.state.context = new Tt(V.state.context, V.state.localVars, !0)), (V.state.localVars = null)
      }
      Gt.lex = Vt.lex = !0
      function Jt() {
        ;(V.state.localVars = V.state.context.vars), (V.state.context = V.state.context.prev)
      }
      Jt.lex = !0
      function _t(C, D) {
        var z = function () {
          var Y = V.state,
            Ht = Y.indented
          if (Y.lexical.type == 'stat') Ht = Y.lexical.indented
          else for (var Xt = Y.lexical; Xt && Xt.type == ')' && Xt.align; Xt = Xt.prev) Ht = Xt.indented
          Y.lexical = new ot(Ht, V.stream.column(), C, null, Y.lexical, D)
        }
        return (z.lex = !0), z
      }
      function U() {
        var C = V.state
        C.lexical.prev && (C.lexical.type == ')' && (C.indented = C.lexical.indented), (C.lexical = C.lexical.prev))
      }
      U.lex = !0
      function et(C) {
        function D(z) {
          return z == C ? k() : C == ';' || z == '}' || z == ')' || z == ']' ? R() : k(D)
        }
        return D
      }
      function it(C, D) {
        return C == 'var'
          ? k(_t('vardef', D), xr, et(';'), U)
          : C == 'keyword a'
            ? k(_t('form'), I, it, U)
            : C == 'keyword b'
              ? k(_t('form'), it, U)
              : C == 'keyword d'
                ? V.stream.match(/^\s*$/, !1)
                  ? k()
                  : k(_t('stat'), Q, et(';'), U)
                : C == 'debugger'
                  ? k(et(';'))
                  : C == '{'
                    ? k(_t('}'), Vt, Nn, U, Jt)
                    : C == ';'
                      ? k()
                      : C == 'if'
                        ? (V.state.lexical.info == 'else' &&
                            V.state.cc[V.state.cc.length - 1] == U &&
                            V.state.cc.pop()(),
                          k(_t('form'), I, it, U, lo))
                        : C == 'function'
                          ? k(or)
                          : C == 'for'
                            ? k(_t('form'), Vt, Da, it, Jt, U)
                            : C == 'class' || (v && D == 'interface')
                              ? ((V.marked = 'keyword'), k(_t('form', C == 'class' ? C : D), za, U))
                              : C == 'variable'
                                ? v && D == 'declare'
                                  ? ((V.marked = 'keyword'), k(it))
                                  : v && (D == 'module' || D == 'enum' || D == 'type') && V.stream.match(/^\s*\w/, !1)
                                    ? ((V.marked = 'keyword'),
                                      D == 'enum'
                                        ? k(uo)
                                        : D == 'type'
                                          ? k(Ra, et('operator'), bt, et(';'))
                                          : k(_t('form'), sn, et('{'), _t('}'), Nn, U, U))
                                    : v && D == 'namespace'
                                      ? ((V.marked = 'keyword'), k(_t('form'), Nt, it, U))
                                      : v && D == 'abstract'
                                        ? ((V.marked = 'keyword'), k(it))
                                        : k(_t('stat'), Ft)
                                : C == 'switch'
                                  ? k(_t('form'), I, et('{'), _t('}', 'switch'), Vt, Nn, U, U, Jt)
                                  : C == 'case'
                                    ? k(Nt, et(':'))
                                    : C == 'default'
                                      ? k(et(':'))
                                      : C == 'catch'
                                        ? k(_t('form'), Gt, Mt, it, U, Jt)
                                        : C == 'export'
                                          ? k(_t('stat'), Zr, U)
                                          : C == 'import'
                                            ? k(_t('stat'), Sr, U)
                                            : C == 'async'
                                              ? k(it)
                                              : D == '@'
                                                ? k(Nt, it)
                                                : R(_t('stat'), Nt, et(';'), U)
      }
      function Mt(C) {
        if (C == '(') return k(Un, et(')'))
      }
      function Nt(C, D) {
        return K(C, D, !1)
      }
      function O(C, D) {
        return K(C, D, !0)
      }
      function I(C) {
        return C != '(' ? R() : k(_t(')'), Q, et(')'), U)
      }
      function K(C, D, z) {
        if (V.state.fatArrowAt == V.stream.start) {
          var Y = z ? ht : xt
          if (C == '(') return k(Gt, _t(')'), Qt(Un, ')'), U, et('=>'), Y, Jt)
          if (C == 'variable') return R(Gt, sn, et('=>'), Y, Jt)
        }
        var Ht = z ? at : nt
        return st.hasOwnProperty(C)
          ? k(Ht)
          : C == 'function'
            ? k(or, Ht)
            : C == 'class' || (v && D == 'interface')
              ? ((V.marked = 'keyword'), k(_t('form'), Yr, U))
              : C == 'keyword c' || C == 'async'
                ? k(z ? O : Nt)
                : C == '('
                  ? k(_t(')'), Q, et(')'), U, Ht)
                  : C == 'operator' || C == 'spread'
                    ? k(z ? O : Nt)
                    : C == '['
                      ? k(_t(']'), kr, U, Ht)
                      : C == '{'
                        ? yn(ie, '}', null, Ht)
                        : C == 'quasi'
                          ? R(lt, Ht)
                          : C == 'new'
                            ? k($t(z))
                            : k()
      }
      function Q(C) {
        return C.match(/[;\}\)\],]/) ? R() : R(Nt)
      }
      function nt(C, D) {
        return C == ',' ? k(Q) : at(C, D, !1)
      }
      function at(C, D, z) {
        var Y = z == !1 ? nt : at,
          Ht = z == !1 ? Nt : O
        if (C == '=>') return k(Gt, z ? ht : xt, Jt)
        if (C == 'operator')
          return /\+\+|--/.test(D) || (v && D == '!')
            ? k(Y)
            : v && D == '<' && V.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1)
              ? k(_t('>'), Qt(bt, '>'), U, Y)
              : D == '?'
                ? k(Nt, et(':'), Ht)
                : k(Ht)
        if (C == 'quasi') return R(lt, Y)
        if (C != ';') {
          if (C == '(') return yn(O, ')', 'call', Y)
          if (C == '.') return k(jt, Y)
          if (C == '[') return k(_t(']'), Q, et(']'), U, Y)
          if (v && D == 'as') return (V.marked = 'keyword'), k(bt, Y)
          if (C == 'regexp')
            return (V.state.lastType = V.marked = 'operator'), V.stream.backUp(V.stream.pos - V.stream.start - 1), k(Ht)
        }
      }
      function lt(C, D) {
        return C != 'quasi' ? R() : D.slice(D.length - 2) != '${' ? k(lt) : k(Q, gt)
      }
      function gt(C) {
        if (C == '}') return (V.marked = 'string-2'), (V.state.tokenize = tt), k(lt)
      }
      function xt(C) {
        return X(V.stream, V.state), R(C == '{' ? it : Nt)
      }
      function ht(C) {
        return X(V.stream, V.state), R(C == '{' ? it : O)
      }
      function $t(C) {
        return function (D) {
          return D == '.' ? k(C ? Ot : At) : D == 'variable' && v ? k(Ke, C ? at : nt) : R(C ? O : Nt)
        }
      }
      function At(C, D) {
        if (D == 'target') return (V.marked = 'keyword'), k(nt)
      }
      function Ot(C, D) {
        if (D == 'target') return (V.marked = 'keyword'), k(at)
      }
      function Ft(C) {
        return C == ':' ? k(U, it) : R(nt, et(';'), U)
      }
      function jt(C) {
        if (C == 'variable') return (V.marked = 'property'), k()
      }
      function ie(C, D) {
        if (C == 'async') return (V.marked = 'property'), k(ie)
        if (C == 'variable' || V.style == 'keyword') {
          if (((V.marked = 'property'), D == 'get' || D == 'set')) return k(ee)
          var z
          return (
            v &&
              V.state.fatArrowAt == V.stream.start &&
              (z = V.stream.match(/^\s*:\s*/, !1)) &&
              (V.state.fatArrowAt = V.stream.pos + z[0].length),
            k(ue)
          )
        } else {
          if (C == 'number' || C == 'string') return (V.marked = h ? 'property' : V.style + ' property'), k(ue)
          if (C == 'jsonld-keyword') return k(ue)
          if (v && wt(D)) return (V.marked = 'keyword'), k(ie)
          if (C == '[') return k(Nt, We, et(']'), ue)
          if (C == 'spread') return k(O, ue)
          if (D == '*') return (V.marked = 'keyword'), k(ie)
          if (C == ':') return R(ue)
        }
      }
      function ee(C) {
        return C != 'variable' ? R(ue) : ((V.marked = 'property'), k(or))
      }
      function ue(C) {
        if (C == ':') return k(O)
        if (C == '(') return R(or)
      }
      function Qt(C, D, z) {
        function Y(Ht, Xt) {
          if (z ? z.indexOf(Ht) > -1 : Ht == ',') {
            var oe = V.state.lexical
            return (
              oe.info == 'call' && (oe.pos = (oe.pos || 0) + 1),
              k(function ($e, Pn) {
                return $e == D || Pn == D ? R() : R(C)
              }, Y)
            )
          }
          return Ht == D || Xt == D ? k() : z && z.indexOf(';') > -1 ? R(C) : k(et(D))
        }
        return function (Ht, Xt) {
          return Ht == D || Xt == D ? k() : R(C, Y)
        }
      }
      function yn(C, D, z) {
        for (var Y = 3; Y < arguments.length; Y++) V.cc.push(arguments[Y])
        return k(_t(D, z), Qt(C, D), U)
      }
      function Nn(C) {
        return C == '}' ? k() : R(it, Nn)
      }
      function We(C, D) {
        if (v) {
          if (C == ':') return k(bt)
          if (D == '?') return k(We)
        }
      }
      function ao(C, D) {
        if (v && (C == ':' || D == 'in')) return k(bt)
      }
      function ye(C) {
        if (v && C == ':') return V.stream.match(/^\s*\w+\s+is\b/, !1) ? k(Nt, on, bt) : k(bt)
      }
      function on(C, D) {
        if (D == 'is') return (V.marked = 'keyword'), k()
      }
      function bt(C, D) {
        if (D == 'keyof' || D == 'typeof' || D == 'infer' || D == 'readonly')
          return (V.marked = 'keyword'), k(D == 'typeof' ? O : bt)
        if (C == 'variable' || D == 'void') return (V.marked = 'type'), k(Qe)
        if (D == '|' || D == '&') return k(bt)
        if (C == 'string' || C == 'number' || C == 'atom') return k(Qe)
        if (C == '[') return k(_t(']'), Qt(bt, ']', ','), U, Qe)
        if (C == '{') return k(_t('}'), Ve, U, Qe)
        if (C == '(') return k(Qt(Je, ')'), fs, Qe)
        if (C == '<') return k(Qt(bt, '>'), bt)
        if (C == 'quasi') return R(ke, Qe)
      }
      function fs(C) {
        if (C == '=>') return k(bt)
      }
      function Ve(C) {
        return C.match(/[\}\)\]]/) ? k() : C == ',' || C == ';' ? k(Ve) : R(me, Ve)
      }
      function me(C, D) {
        if (C == 'variable' || V.style == 'keyword') return (V.marked = 'property'), k(me)
        if (D == '?' || C == 'number' || C == 'string') return k(me)
        if (C == ':') return k(bt)
        if (C == '[') return k(et('variable'), ao, et(']'), me)
        if (C == '(') return R(sr, me)
        if (!C.match(/[;\}\)\],]/)) return k()
      }
      function ke(C, D) {
        return C != 'quasi' ? R() : D.slice(D.length - 2) != '${' ? k(ke) : k(bt, $a)
      }
      function $a(C) {
        if (C == '}') return (V.marked = 'string-2'), (V.state.tokenize = tt), k(ke)
      }
      function Je(C, D) {
        return (C == 'variable' && V.stream.match(/^\s*[?:]/, !1)) || D == '?'
          ? k(Je)
          : C == ':'
            ? k(bt)
            : C == 'spread'
              ? k(Je)
              : R(bt)
      }
      function Qe(C, D) {
        if (D == '<') return k(_t('>'), Qt(bt, '>'), U, Qe)
        if (D == '|' || C == '.' || D == '&') return k(bt)
        if (C == '[') return k(bt, et(']'), Qe)
        if (D == 'extends' || D == 'implements') return (V.marked = 'keyword'), k(bt)
        if (D == '?') return k(bt, et(':'), bt)
      }
      function Ke(C, D) {
        if (D == '<') return k(_t('>'), Qt(bt, '>'), U, Qe)
      }
      function Li() {
        return R(bt, hs)
      }
      function hs(C, D) {
        if (D == '=') return k(bt)
      }
      function xr(C, D) {
        return D == 'enum' ? ((V.marked = 'keyword'), k(uo)) : R(sn, We, Fn, Hc)
      }
      function sn(C, D) {
        if (v && wt(D)) return (V.marked = 'keyword'), k(sn)
        if (C == 'variable') return W(D), k()
        if (C == 'spread') return k(sn)
        if (C == '[') return yn(qc, ']')
        if (C == '{') return yn(ds, '}')
      }
      function ds(C, D) {
        return C == 'variable' && !V.stream.match(/^\s*:/, !1)
          ? (W(D), k(Fn))
          : (C == 'variable' && (V.marked = 'property'),
            C == 'spread' ? k(sn) : C == '}' ? R() : C == '[' ? k(Nt, et(']'), et(':'), ds) : k(et(':'), sn, Fn))
      }
      function qc() {
        return R(sn, Fn)
      }
      function Fn(C, D) {
        if (D == '=') return k(O)
      }
      function Hc(C) {
        if (C == ',') return k(xr)
      }
      function lo(C, D) {
        if (C == 'keyword b' && D == 'else') return k(_t('form', 'else'), it, U)
      }
      function Da(C, D) {
        if (D == 'await') return k(Da)
        if (C == '(') return k(_t(')'), ps, U)
      }
      function ps(C) {
        return C == 'var' ? k(xr, Xr) : C == 'variable' ? k(Xr) : R(Xr)
      }
      function Xr(C, D) {
        return C == ')'
          ? k()
          : C == ';'
            ? k(Xr)
            : D == 'in' || D == 'of'
              ? ((V.marked = 'keyword'), k(Nt, Xr))
              : R(Nt, Xr)
      }
      function or(C, D) {
        if (D == '*') return (V.marked = 'keyword'), k(or)
        if (C == 'variable') return W(D), k(or)
        if (C == '(') return k(Gt, _t(')'), Qt(Un, ')'), U, ye, it, Jt)
        if (v && D == '<') return k(_t('>'), Qt(Li, '>'), U, or)
      }
      function sr(C, D) {
        if (D == '*') return (V.marked = 'keyword'), k(sr)
        if (C == 'variable') return W(D), k(sr)
        if (C == '(') return k(Gt, _t(')'), Qt(Un, ')'), U, ye, Jt)
        if (v && D == '<') return k(_t('>'), Qt(Li, '>'), U, sr)
      }
      function Ra(C, D) {
        if (C == 'keyword' || C == 'variable') return (V.marked = 'type'), k(Ra)
        if (D == '<') return k(_t('>'), Qt(Li, '>'), U)
      }
      function Un(C, D) {
        return (
          D == '@' && k(Nt, Un),
          C == 'spread'
            ? k(Un)
            : v && wt(D)
              ? ((V.marked = 'keyword'), k(Un))
              : v && C == 'this'
                ? k(We, Fn)
                : R(sn, We, Fn)
        )
      }
      function Yr(C, D) {
        return C == 'variable' ? za(C, D) : co(C, D)
      }
      function za(C, D) {
        if (C == 'variable') return W(D), k(co)
      }
      function co(C, D) {
        if (D == '<') return k(_t('>'), Qt(Li, '>'), U, co)
        if (D == 'extends' || D == 'implements' || (v && C == ','))
          return D == 'implements' && (V.marked = 'keyword'), k(v ? bt : Nt, co)
        if (C == '{') return k(_t('}'), bn, U)
      }
      function bn(C, D) {
        if (
          C == 'async' ||
          (C == 'variable' &&
            (D == 'static' || D == 'get' || D == 'set' || (v && wt(D))) &&
            V.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
        )
          return (V.marked = 'keyword'), k(bn)
        if (C == 'variable' || V.style == 'keyword') return (V.marked = 'property'), k(_r, bn)
        if (C == 'number' || C == 'string') return k(_r, bn)
        if (C == '[') return k(Nt, We, et(']'), _r, bn)
        if (D == '*') return (V.marked = 'keyword'), k(bn)
        if (v && C == '(') return R(sr, bn)
        if (C == ';' || C == ',') return k(bn)
        if (C == '}') return k()
        if (D == '@') return k(Nt, bn)
      }
      function _r(C, D) {
        if (D == '!' || D == '?') return k(_r)
        if (C == ':') return k(bt, Fn)
        if (D == '=') return k(O)
        var z = V.state.lexical.prev,
          Y = z && z.info == 'interface'
        return R(Y ? sr : or)
      }
      function Zr(C, D) {
        return D == '*'
          ? ((V.marked = 'keyword'), k(Lt, et(';')))
          : D == 'default'
            ? ((V.marked = 'keyword'), k(Nt, et(';')))
            : C == '{'
              ? k(Qt(Ia, '}'), Lt, et(';'))
              : R(it)
      }
      function Ia(C, D) {
        if (D == 'as') return (V.marked = 'keyword'), k(et('variable'))
        if (C == 'variable') return R(O, Ia)
      }
      function Sr(C) {
        return C == 'string' ? k() : C == '(' ? R(Nt) : C == '.' ? R(nt) : R(Jr, gs, Lt)
      }
      function Jr(C, D) {
        return C == '{' ? yn(Jr, '}') : (C == 'variable' && W(D), D == '*' && (V.marked = 'keyword'), k(Ce))
      }
      function gs(C) {
        if (C == ',') return k(Jr, gs)
      }
      function Ce(C, D) {
        if (D == 'as') return (V.marked = 'keyword'), k(Jr)
      }
      function Lt(C, D) {
        if (D == 'from') return (V.marked = 'keyword'), k(Nt)
      }
      function kr(C) {
        return C == ']' ? k() : R(Qt(O, ']'))
      }
      function uo() {
        return R(_t('form'), sn, et('{'), _t('}'), Qt(qn, '}'), U, U)
      }
      function qn() {
        return R(sn, Fn)
      }
      function le(C, D) {
        return C.lastType == 'operator' || C.lastType == ',' || S.test(D.charAt(0)) || /[,.]/.test(D.charAt(0))
      }
      function ar(C, D, z) {
        return (
          (D.tokenize == F &&
            /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(D.lastType)) ||
          (D.lastType == 'quasi' && /\{\s*$/.test(C.string.slice(0, C.pos - (z || 0))))
        )
      }
      return {
        startState: function (C) {
          var D = {
            tokenize: F,
            lastType: 'sof',
            cc: [],
            lexical: new ot((C || 0) - u, 0, 'block', !1),
            localVars: l.localVars,
            context: l.localVars && new Tt(null, null, !1),
            indented: C || 0,
          }
          return l.globalVars && typeof l.globalVars == 'object' && (D.globalVars = l.globalVars), D
        },
        token: function (C, D) {
          if (
            (C.sol() &&
              (D.lexical.hasOwnProperty('align') || (D.lexical.align = !1), (D.indented = C.indentation()), X(C, D)),
            D.tokenize != B && C.eatSpace())
          )
            return null
          var z = D.tokenize(C, D)
          return N == 'comment'
            ? z
            : ((D.lastType = N == 'operator' && (E == '++' || E == '--') ? 'incdec' : N), pt(D, z, N, E, C))
        },
        indent: function (C, D) {
          if (C.tokenize == B || C.tokenize == tt) return r.Pass
          if (C.tokenize != F) return 0
          var z = D && D.charAt(0),
            Y = C.lexical,
            Ht
          if (!/^\s*else\b/.test(D))
            for (var Xt = C.cc.length - 1; Xt >= 0; --Xt) {
              var oe = C.cc[Xt]
              if (oe == U) Y = Y.prev
              else if (oe != lo && oe != Jt) break
            }
          for (
            ;
            (Y.type == 'stat' || Y.type == 'form') &&
            (z == '}' || ((Ht = C.cc[C.cc.length - 1]) && (Ht == nt || Ht == at) && !/^[,\.=+\-*:?[\(]/.test(D)));

          )
            Y = Y.prev
          f && Y.type == ')' && Y.prev.type == 'stat' && (Y = Y.prev)
          var $e = Y.type,
            Pn = z == $e
          return $e == 'vardef'
            ? Y.indented + (C.lastType == 'operator' || C.lastType == ',' ? Y.info.length + 1 : 0)
            : $e == 'form' && z == '{'
              ? Y.indented
              : $e == 'form'
                ? Y.indented + u
                : $e == 'stat'
                  ? Y.indented + (le(C, D) ? f || u : 0)
                  : Y.info == 'switch' && !Pn && l.doubleIndentSwitch != !1
                    ? Y.indented + (/^(?:case|default)\b/.test(D) ? u : 2 * u)
                    : Y.align
                      ? Y.column + (Pn ? 0 : 1)
                      : Y.indented + (Pn ? 0 : u)
        },
        electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
        blockCommentStart: d ? null : '/*',
        blockCommentEnd: d ? null : '*/',
        blockCommentContinue: d ? null : ' * ',
        lineComment: d ? null : '//',
        fold: 'brace',
        closeBrackets: '()[]{}\'\'""``',
        helperType: d ? 'json' : 'javascript',
        jsonldMode: h,
        jsonMode: d,
        expressionAllowed: ar,
        skipExpression: function (C) {
          pt(C, 'atom', 'atom', 'true', new r.StringStream('', 2, null))
        },
      }
    }),
      r.registerHelper('wordChars', 'javascript', /[\w$]/),
      r.defineMIME('text/javascript', 'javascript'),
      r.defineMIME('text/ecmascript', 'javascript'),
      r.defineMIME('application/javascript', 'javascript'),
      r.defineMIME('application/x-javascript', 'javascript'),
      r.defineMIME('application/ecmascript', 'javascript'),
      r.defineMIME('application/json', { name: 'javascript', json: !0 }),
      r.defineMIME('application/x-json', { name: 'javascript', json: !0 }),
      r.defineMIME('application/manifest+json', { name: 'javascript', json: !0 }),
      r.defineMIME('application/ld+json', { name: 'javascript', jsonld: !0 }),
      r.defineMIME('text/typescript', { name: 'javascript', typescript: !0 }),
      r.defineMIME('application/typescript', { name: 'javascript', typescript: !0 })
  })
})()
var alt = slt.exports,
  llt = { exports: {} }
;(function (t, e) {
  ;(function (r) {
    r(cs())
  })(function (r) {
    var o = {
        autoSelfClosers: {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          command: !0,
          embed: !0,
          frame: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
          menuitem: !0,
        },
        implicitlyClosed: {
          dd: !0,
          li: !0,
          optgroup: !0,
          option: !0,
          p: !0,
          rp: !0,
          rt: !0,
          tbody: !0,
          td: !0,
          tfoot: !0,
          th: !0,
          tr: !0,
        },
        contextGrabbers: {
          dd: { dd: !0, dt: !0 },
          dt: { dd: !0, dt: !0 },
          li: { li: !0 },
          option: { option: !0, optgroup: !0 },
          optgroup: { optgroup: !0 },
          p: {
            address: !0,
            article: !0,
            aside: !0,
            blockquote: !0,
            dir: !0,
            div: !0,
            dl: !0,
            fieldset: !0,
            footer: !0,
            form: !0,
            h1: !0,
            h2: !0,
            h3: !0,
            h4: !0,
            h5: !0,
            h6: !0,
            header: !0,
            hgroup: !0,
            hr: !0,
            menu: !0,
            nav: !0,
            ol: !0,
            p: !0,
            pre: !0,
            section: !0,
            table: !0,
            ul: !0,
          },
          rp: { rp: !0, rt: !0 },
          rt: { rp: !0, rt: !0 },
          tbody: { tbody: !0, tfoot: !0 },
          td: { td: !0, th: !0 },
          tfoot: { tbody: !0 },
          th: { td: !0, th: !0 },
          thead: { tbody: !0, tfoot: !0 },
          tr: { tr: !0 },
        },
        doNotIndent: { pre: !0 },
        allowUnquoted: !0,
        allowMissing: !0,
        caseFold: !0,
      },
      l = {
        autoSelfClosers: {},
        implicitlyClosed: {},
        contextGrabbers: {},
        doNotIndent: {},
        allowUnquoted: !1,
        allowMissing: !1,
        allowMissingTagName: !1,
        caseFold: !1,
      }
    r.defineMode('xml', function (u, f) {
      var h = u.indentUnit,
        d = {},
        g = f.htmlMode ? o : l
      for (var v in g) d[v] = g[v]
      for (var v in f) d[v] = f[v]
      var b, x
      function S(k, H) {
        function W(Tt) {
          return (H.tokenize = Tt), Tt(k, H)
        }
        var J = k.next()
        if (J == '<')
          return k.eat('!')
            ? k.eat('[')
              ? k.match('CDATA[')
                ? W(N('atom', ']]>'))
                : null
              : k.match('--')
                ? W(N('comment', '-->'))
                : k.match('DOCTYPE', !0, !0)
                  ? (k.eatWhile(/[\w\._\-]/), W(E(1)))
                  : null
            : k.eat('?')
              ? (k.eatWhile(/[\w\._\-]/), (H.tokenize = N('meta', '?>')), 'meta')
              : ((b = k.eat('/') ? 'closeTag' : 'openTag'), (H.tokenize = M), 'tag bracket')
        if (J == '&') {
          var wt
          return (
            k.eat('#')
              ? k.eat('x')
                ? (wt = k.eatWhile(/[a-fA-F\d]/) && k.eat(';'))
                : (wt = k.eatWhile(/[\d]/) && k.eat(';'))
              : (wt = k.eatWhile(/[\w\.\-:]/) && k.eat(';')),
            wt ? 'atom' : 'error'
          )
        } else return k.eatWhile(/[^&<]/), null
      }
      S.isInText = !0
      function M(k, H) {
        var W = k.next()
        if (W == '>' || (W == '/' && k.eat('>')))
          return (H.tokenize = S), (b = W == '>' ? 'endTag' : 'selfcloseTag'), 'tag bracket'
        if (W == '=') return (b = 'equals'), null
        if (W == '<') {
          ;(H.tokenize = S), (H.state = tt), (H.tagName = H.tagStart = null)
          var J = H.tokenize(k, H)
          return J ? J + ' tag error' : 'tag error'
        } else
          return /[\'\"]/.test(W)
            ? ((H.tokenize = T(W)), (H.stringStartCol = k.column()), H.tokenize(k, H))
            : (k.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), 'word')
      }
      function T(k) {
        var H = function (W, J) {
          for (; !W.eol(); )
            if (W.next() == k) {
              J.tokenize = M
              break
            }
          return 'string'
        }
        return (H.isInAttribute = !0), H
      }
      function N(k, H) {
        return function (W, J) {
          for (; !W.eol(); ) {
            if (W.match(H)) {
              J.tokenize = S
              break
            }
            W.next()
          }
          return k
        }
      }
      function E(k) {
        return function (H, W) {
          for (var J; (J = H.next()) != null; ) {
            if (J == '<') return (W.tokenize = E(k + 1)), W.tokenize(H, W)
            if (J == '>')
              if (k == 1) {
                W.tokenize = S
                break
              } else return (W.tokenize = E(k - 1)), W.tokenize(H, W)
          }
          return 'meta'
        }
      }
      function L(k) {
        return k && k.toLowerCase()
      }
      function F(k, H, W) {
        ;(this.prev = k.context),
          (this.tagName = H || ''),
          (this.indent = k.indented),
          (this.startOfLine = W),
          (d.doNotIndent.hasOwnProperty(H) || (k.context && k.context.noIndent)) && (this.noIndent = !0)
      }
      function A(k) {
        k.context && (k.context = k.context.prev)
      }
      function B(k, H) {
        for (var W; ; ) {
          if (
            !k.context ||
            ((W = k.context.tagName),
            !d.contextGrabbers.hasOwnProperty(L(W)) || !d.contextGrabbers[L(W)].hasOwnProperty(L(H)))
          )
            return
          A(k)
        }
      }
      function tt(k, H, W) {
        return k == 'openTag' ? ((W.tagStart = H.column()), ft) : k == 'closeTag' ? X : tt
      }
      function ft(k, H, W) {
        return k == 'word'
          ? ((W.tagName = H.current()), (x = 'tag'), kt)
          : d.allowMissingTagName && k == 'endTag'
            ? ((x = 'tag bracket'), kt(k, H, W))
            : ((x = 'error'), ft)
      }
      function X(k, H, W) {
        if (k == 'word') {
          var J = H.current()
          return (
            W.context && W.context.tagName != J && d.implicitlyClosed.hasOwnProperty(L(W.context.tagName)) && A(W),
            (W.context && W.context.tagName == J) || d.matchClosing === !1 ? ((x = 'tag'), st) : ((x = 'tag error'), ot)
          )
        } else return d.allowMissingTagName && k == 'endTag' ? ((x = 'tag bracket'), st(k, H, W)) : ((x = 'error'), ot)
      }
      function st(k, H, W) {
        return k != 'endTag' ? ((x = 'error'), st) : (A(W), tt)
      }
      function ot(k, H, W) {
        return (x = 'error'), st(k, H, W)
      }
      function kt(k, H, W) {
        if (k == 'word') return (x = 'attribute'), pt
        if (k == 'endTag' || k == 'selfcloseTag') {
          var J = W.tagName,
            wt = W.tagStart
          return (
            (W.tagName = W.tagStart = null),
            k == 'selfcloseTag' || d.autoSelfClosers.hasOwnProperty(L(J))
              ? B(W, J)
              : (B(W, J), (W.context = new F(W, J, wt == W.indented))),
            tt
          )
        }
        return (x = 'error'), kt
      }
      function pt(k, H, W) {
        return k == 'equals' ? V : (d.allowMissing || (x = 'error'), kt(k, H, W))
      }
      function V(k, H, W) {
        return k == 'string' ? R : k == 'word' && d.allowUnquoted ? ((x = 'string'), kt) : ((x = 'error'), kt(k, H, W))
      }
      function R(k, H, W) {
        return k == 'string' ? R : kt(k, H, W)
      }
      return {
        startState: function (k) {
          var H = { tokenize: S, state: tt, indented: k || 0, tagName: null, tagStart: null, context: null }
          return k != null && (H.baseIndent = k), H
        },
        token: function (k, H) {
          if ((!H.tagName && k.sol() && (H.indented = k.indentation()), k.eatSpace())) return null
          b = null
          var W = H.tokenize(k, H)
          return (
            (W || b) &&
              W != 'comment' &&
              ((x = null), (H.state = H.state(b || W, k, H)), x && (W = x == 'error' ? W + ' error' : x)),
            W
          )
        },
        indent: function (k, H, W) {
          var J = k.context
          if (k.tokenize.isInAttribute) return k.tagStart == k.indented ? k.stringStartCol + 1 : k.indented + h
          if (J && J.noIndent) return r.Pass
          if (k.tokenize != M && k.tokenize != S) return W ? W.match(/^(\s*)/)[0].length : 0
          if (k.tagName)
            return d.multilineTagIndentPastTag !== !1
              ? k.tagStart + k.tagName.length + 2
              : k.tagStart + h * (d.multilineTagIndentFactor || 1)
          if (d.alignCDATA && /<!\[CDATA\[/.test(H)) return 0
          var wt = H && /^<(\/)?([\w_:\.-]*)/.exec(H)
          if (wt && wt[1])
            for (; J; )
              if (J.tagName == wt[2]) {
                J = J.prev
                break
              } else if (d.implicitlyClosed.hasOwnProperty(L(J.tagName))) J = J.prev
              else break
          else if (wt)
            for (; J; ) {
              var Tt = d.contextGrabbers[L(J.tagName)]
              if (Tt && Tt.hasOwnProperty(L(wt[2]))) J = J.prev
              else break
            }
          for (; J && J.prev && !J.startOfLine; ) J = J.prev
          return J ? J.indent + h : k.baseIndent || 0
        },
        electricInput: /<\/[\s\w:]+>$/,
        blockCommentStart: '<!--',
        blockCommentEnd: '-->',
        configuration: d.htmlMode ? 'html' : 'xml',
        helperType: d.htmlMode ? 'html' : 'xml',
        skipAttribute: function (k) {
          k.state == V && (k.state = kt)
        },
        xmlCurrentTag: function (k) {
          return k.tagName ? { name: k.tagName, close: k.type == 'closeTag' } : null
        },
        xmlCurrentContext: function (k) {
          for (var H = [], W = k.context; W; W = W.prev) H.push(W.tagName)
          return H.reverse()
        },
      }
    }),
      r.defineMIME('text/xml', 'xml'),
      r.defineMIME('application/xml', 'xml'),
      r.mimeModes.hasOwnProperty('text/html') || r.defineMIME('text/html', { name: 'xml', htmlMode: !0 })
  })
})()
var clt = llt.exports
;(function (t, e) {
  ;(function (r) {
    r(cs(), clt, alt)
  })(function (r) {
    function o(u, f, h, d) {
      ;(this.state = u), (this.mode = f), (this.depth = h), (this.prev = d)
    }
    function l(u) {
      return new o(r.copyState(u.mode, u.state), u.mode, u.depth, u.prev && l(u.prev))
    }
    r.defineMode(
      'jsx',
      function (u, f) {
        var h = r.getMode(u, { name: 'xml', allowMissing: !0, multilineTagIndentPastTag: !1, allowMissingTagName: !0 }),
          d = r.getMode(u, (f && f.base) || 'javascript')
        function g(S) {
          var M = S.tagName
          S.tagName = null
          var T = h.indent(S, '', '')
          return (S.tagName = M), T
        }
        function v(S, M) {
          return M.context.mode == h ? b(S, M, M.context) : x(S, M, M.context)
        }
        function b(S, M, T) {
          if (T.depth == 2) return S.match(/^.*?\*\//) ? (T.depth = 1) : S.skipToEnd(), 'comment'
          if (S.peek() == '{') {
            h.skipAttribute(T.state)
            var N = g(T.state),
              E = T.state.context
            if (E && S.match(/^[^>]*>\s*$/, !1)) {
              for (; E.prev && !E.startOfLine; ) E = E.prev
              E.startOfLine ? (N -= u.indentUnit) : T.prev.state.lexical && (N = T.prev.state.lexical.indented)
            } else T.depth == 1 && (N += u.indentUnit)
            return (M.context = new o(r.startState(d, N), d, 0, M.context)), null
          }
          if (T.depth == 1) {
            if (S.peek() == '<')
              return h.skipAttribute(T.state), (M.context = new o(r.startState(h, g(T.state)), h, 0, M.context)), null
            if (S.match('//')) return S.skipToEnd(), 'comment'
            if (S.match('/*')) return (T.depth = 2), v(S, M)
          }
          var L = h.token(S, T.state),
            F = S.current(),
            A
          return (
            /\btag\b/.test(L)
              ? />$/.test(F)
                ? T.state.context
                  ? (T.depth = 0)
                  : (M.context = M.context.prev)
                : /^</.test(F) && (T.depth = 1)
              : !L && (A = F.indexOf('{')) > -1 && S.backUp(F.length - A),
            L
          )
        }
        function x(S, M, T) {
          if (S.peek() == '<' && d.expressionAllowed(S, T.state))
            return (
              (M.context = new o(r.startState(h, d.indent(T.state, '', '')), h, 0, M.context)),
              d.skipExpression(T.state),
              null
            )
          var N = d.token(S, T.state)
          if (!N && T.depth != null) {
            var E = S.current()
            E == '{' ? T.depth++ : E == '}' && --T.depth == 0 && (M.context = M.context.prev)
          }
          return N
        }
        return {
          startState: function () {
            return { context: new o(r.startState(d), d) }
          },
          copyState: function (S) {
            return { context: l(S.context) }
          },
          token: v,
          indent: function (S, M, T) {
            return S.context.mode.indent(S.context.state, M, T)
          },
          innerMode: function (S) {
            return S.context
          },
        }
      },
      'xml',
      'javascript',
    ),
      r.defineMIME('text/jsx', 'jsx'),
      r.defineMIME('text/typescript-jsx', { name: 'jsx', base: { name: 'javascript', typescript: !0 } })
  })
})()
;(function (t, e) {
  ;(function (r) {
    r(cs())
  })(function (r) {
    r.defineOption('placeholder', '', function (g, v, b) {
      var x = b && b != r.Init
      if (v && !x)
        g.on('blur', f),
          g.on('change', h),
          g.on('swapDoc', h),
          r.on(
            g.getInputField(),
            'compositionupdate',
            (g.state.placeholderCompose = function () {
              u(g)
            }),
          ),
          h(g)
      else if (!v && x) {
        g.off('blur', f),
          g.off('change', h),
          g.off('swapDoc', h),
          r.off(g.getInputField(), 'compositionupdate', g.state.placeholderCompose),
          o(g)
        var S = g.getWrapperElement()
        S.className = S.className.replace(' CodeMirror-empty', '')
      }
      v && !g.hasFocus() && f(g)
    })
    function o(g) {
      g.state.placeholder &&
        (g.state.placeholder.parentNode.removeChild(g.state.placeholder), (g.state.placeholder = null))
    }
    function l(g) {
      o(g)
      var v = (g.state.placeholder = document.createElement('pre'))
      ;(v.style.cssText = 'height: 0; overflow: visible'),
        (v.style.direction = g.getOption('direction')),
        (v.className = 'CodeMirror-placeholder CodeMirror-line-like')
      var b = g.getOption('placeholder')
      typeof b == 'string' && (b = document.createTextNode(b)),
        v.appendChild(b),
        g.display.lineSpace.insertBefore(v, g.display.lineSpace.firstChild)
    }
    function u(g) {
      setTimeout(function () {
        var v = !1
        if (g.lineCount() == 1) {
          var b = g.getInputField()
          v =
            b.nodeName == 'TEXTAREA'
              ? !g.getLine(0).length
              : !/[^\u200b]/.test(b.querySelector('.CodeMirror-line').textContent)
        }
        v ? l(g) : o(g)
      }, 20)
    }
    function f(g) {
      d(g) && l(g)
    }
    function h(g) {
      var v = g.getWrapperElement(),
        b = d(g)
      ;(v.className = v.className.replace(' CodeMirror-empty', '') + (b ? ' CodeMirror-empty' : '')), b ? l(g) : o(g)
    }
    function d(g) {
      return g.lineCount() === 1 && g.getLine(0) === ''
    }
  })
})()
;(function (t, e) {
  ;(function (r) {
    r(cs())
  })(function (r) {
    function o(f, h, d) {
      ;(this.orientation = h),
        (this.scroll = d),
        (this.screen = this.total = this.size = 1),
        (this.pos = 0),
        (this.node = document.createElement('div')),
        (this.node.className = f + '-' + h),
        (this.inner = this.node.appendChild(document.createElement('div')))
      var g = this
      r.on(this.inner, 'mousedown', function (b) {
        if (b.which != 1) return
        r.e_preventDefault(b)
        var x = g.orientation == 'horizontal' ? 'pageX' : 'pageY',
          S = b[x],
          M = g.pos
        function T() {
          r.off(document, 'mousemove', N), r.off(document, 'mouseup', T)
        }
        function N(E) {
          if (E.which != 1) return T()
          g.moveTo(M + (E[x] - S) * (g.total / g.size))
        }
        r.on(document, 'mousemove', N), r.on(document, 'mouseup', T)
      }),
        r.on(this.node, 'click', function (b) {
          r.e_preventDefault(b)
          var x = g.inner.getBoundingClientRect(),
            S
          g.orientation == 'horizontal'
            ? (S = b.clientX < x.left ? -1 : b.clientX > x.right ? 1 : 0)
            : (S = b.clientY < x.top ? -1 : b.clientY > x.bottom ? 1 : 0),
            g.moveTo(g.pos + S * g.screen)
        })
      function v(b) {
        var x = r.wheelEventPixels(b)[g.orientation == 'horizontal' ? 'x' : 'y'],
          S = g.pos
        g.moveTo(g.pos + x), g.pos != S && r.e_preventDefault(b)
      }
      r.on(this.node, 'mousewheel', v), r.on(this.node, 'DOMMouseScroll', v)
    }
    ;(o.prototype.setPos = function (f, h) {
      return (
        f < 0 && (f = 0),
        f > this.total - this.screen && (f = this.total - this.screen),
        !h && f == this.pos
          ? !1
          : ((this.pos = f),
            (this.inner.style[this.orientation == 'horizontal' ? 'left' : 'top'] = f * (this.size / this.total) + 'px'),
            !0)
      )
    }),
      (o.prototype.moveTo = function (f) {
        this.setPos(f) && this.scroll(f, this.orientation)
      })
    var l = 10
    o.prototype.update = function (f, h, d) {
      var g = this.screen != h || this.total != f || this.size != d
      g && ((this.screen = h), (this.total = f), (this.size = d))
      var v = this.screen * (this.size / this.total)
      v < l && ((this.size -= l - v), (v = l)),
        (this.inner.style[this.orientation == 'horizontal' ? 'width' : 'height'] = v + 'px'),
        this.setPos(this.pos, g)
    }
    function u(f, h, d) {
      ;(this.addClass = f),
        (this.horiz = new o(f, 'horizontal', d)),
        h(this.horiz.node),
        (this.vert = new o(f, 'vertical', d)),
        h(this.vert.node),
        (this.width = null)
    }
    ;(u.prototype.update = function (f) {
      if (this.width == null) {
        var h = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle
        h && (this.width = parseInt(h.height))
      }
      var d = this.width || 0,
        g = f.scrollWidth > f.clientWidth + 1,
        v = f.scrollHeight > f.clientHeight + 1
      return (
        (this.vert.node.style.display = v ? 'block' : 'none'),
        (this.horiz.node.style.display = g ? 'block' : 'none'),
        v &&
          (this.vert.update(f.scrollHeight, f.clientHeight, f.viewHeight - (g ? d : 0)),
          (this.vert.node.style.bottom = g ? d + 'px' : '0')),
        g &&
          (this.horiz.update(f.scrollWidth, f.clientWidth, f.viewWidth - (v ? d : 0) - f.barLeft),
          (this.horiz.node.style.right = v ? d + 'px' : '0'),
          (this.horiz.node.style.left = f.barLeft + 'px')),
        { right: v ? d : 0, bottom: g ? d : 0 }
      )
    }),
      (u.prototype.setScrollTop = function (f) {
        this.vert.setPos(f)
      }),
      (u.prototype.setScrollLeft = function (f) {
        this.horiz.setPos(f)
      }),
      (u.prototype.clear = function () {
        var f = this.horiz.node.parentNode
        f.removeChild(this.horiz.node), f.removeChild(this.vert.node)
      }),
      (r.scrollbarModel.simple = function (f, h) {
        return new u('CodeMirror-simplescroll', f, h)
      }),
      (r.scrollbarModel.overlay = function (f, h) {
        return new u('CodeMirror-overlayscroll', f, h)
      })
  })
})()
function ult(t, e, r = {}) {
  const o = olt.fromTextArea(t.value, { theme: 'vars', ...r, scrollbarStyle: 'simple' })
  let l = !1
  return (
    o.on('change', () => {
      if (l) {
        l = !1
        return
      }
      e.value = o.getValue()
    }),
    Re(
      e,
      (u) => {
        if (u !== o.getValue()) {
          l = !0
          const f = o.listSelections()
          o.replaceRange(u, o.posFromIndex(0), o.posFromIndex(Number.POSITIVE_INFINITY)), o.setSelections(f)
        }
      },
      { immediate: !0 },
    ),
    sh(o)
  )
}
const flt = { relative: '', 'font-mono': '', 'text-sm': '', class: 'codemirror-scrolls' },
  Uy = re({
    __name: 'CodeMirror',
    props: df({ mode: {}, readOnly: { type: Boolean } }, { modelValue: {} }),
    emits: df(['save'], ['update:modelValue']),
    setup(t, { expose: e, emit: r }) {
      const o = Ym(t, 'modelValue'),
        l = h_(),
        u = {
          js: 'javascript',
          mjs: 'javascript',
          cjs: 'javascript',
          ts: { name: 'javascript', typescript: !0 },
          mts: { name: 'javascript', typescript: !0 },
          cts: { name: 'javascript', typescript: !0 },
          jsx: { name: 'javascript', jsx: !0 },
          tsx: { name: 'javascript', typescript: !0, jsx: !0 },
        },
        f = Kt(),
        h = as()
      return (
        e({ cm: h }),
        ls(async () => {
          ;(h.value = ult(f, o, {
            ...l,
            mode: u[t.mode || ''] || t.mode,
            readOnly: t.readOnly ? !0 : void 0,
            extraKeys: {
              'Cmd-S': function (d) {
                r('save', d.getValue())
              },
              'Ctrl-S': function (d) {
                r('save', d.getValue())
              },
            },
          })),
            h.value.setSize('100%', '100%'),
            h.value.clearHistory(),
            setTimeout(() => h.value.refresh(), 100)
        }),
        (d, g) => (ct(), Et('div', flt, [ut('textarea', { ref_key: 'el', ref: f }, null, 512)]))
      )
    },
  }),
  hlt = re({
    __name: 'ViewEditor',
    props: { file: {} },
    emits: ['draft'],
    setup(t, { emit: e }) {
      const r = t,
        o = Kt(''),
        l = as(void 0),
        u = Kt(!1)
      Re(
        () => r.file,
        async () => {
          var L
          if (!r.file || !((L = r.file) != null && L.filepath)) {
            ;(o.value = ''), (l.value = o.value), (u.value = !1)
            return
          }
          ;(o.value = (await Ge.rpc.readTestFile(r.file.filepath)) || ''), (l.value = o.value), (u.value = !1)
        },
        { immediate: !0 },
      )
      const f = yt(() => {
          var L, F
          return ((F = (L = r.file) == null ? void 0 : L.filepath) == null ? void 0 : F.split(/\./g).pop()) || 'js'
        }),
        h = Kt(),
        d = yt(() => {
          var L
          return (L = h.value) == null ? void 0 : L.cm
        }),
        g = yt(() => {
          var L
          return (
            ((L = r.file) == null
              ? void 0
              : L.tasks.filter((F) => {
                  var A
                  return ((A = F.result) == null ? void 0 : A.state) === 'fail'
                })) || []
          )
        }),
        v = [],
        b = [],
        x = [],
        S = Kt(!1)
      function M() {
        x.forEach(([L, F, A]) => {
          L.removeEventListener('click', F), A()
        }),
          (x.length = 0)
      }
      rE(h, () => {
        var L
        ;(L = d.value) == null || L.refresh()
      })
      function T() {
        u.value = l.value !== d.value.getValue()
      }
      Re(
        u,
        (L) => {
          e('draft', L)
        },
        { immediate: !0 },
      )
      function N(L) {
        const F = ((L == null ? void 0 : L.stacks) || []).filter((st) => {
            var ot
            return st.file && st.file === ((ot = r.file) == null ? void 0 : ot.filepath)
          }),
          A = F == null ? void 0 : F[0]
        if (!A) return
        const B = document.createElement('div')
        B.className = 'op80 flex gap-x-2 items-center'
        const tt = document.createElement('pre')
        ;(tt.className = 'c-red-600 dark:c-red-400'),
          (tt.textContent = `${' '.repeat(A.column)}^ ${L == null ? void 0 : L.nameStr}: ${
            L == null ? void 0 : L.message
          }`),
          B.appendChild(tt)
        const ft = document.createElement('span')
        ;(ft.className = 'i-carbon-launch c-red-600 dark:c-red-400 hover:cursor-pointer min-w-1em min-h-1em'),
          (ft.tabIndex = 0),
          (ft.ariaLabel = 'Open in Editor'),
          q0(ft, { content: 'Open in Editor', placement: 'bottom' }, !1)
        const X = async () => {
          await qy(A.file, A.line, A.column)
        }
        B.appendChild(ft),
          x.push([ft, X, () => Ah(ft)]),
          b.push(d.value.addLineClass(A.line - 1, 'wrap', 'bg-red-500/10')),
          v.push(d.value.addLineWidget(A.line - 1, B))
      }
      Re(
        [d, g],
        ([L]) => {
          if (!L) {
            M()
            return
          }
          setTimeout(() => {
            M(),
              v.forEach((F) => F.clear()),
              b.forEach((F) => {
                var A
                return (A = d.value) == null ? void 0 : A.removeLineClass(F, 'wrap')
              }),
              (v.length = 0),
              (b.length = 0),
              L.on('changes', T),
              g.value.forEach((F) => {
                var A, B
                ;(B = (A = F.result) == null ? void 0 : A.errors) == null || B.forEach(N)
              }),
              S.value || L.clearHistory()
          }, 100)
        },
        { flush: 'post' },
      )
      async function E(L) {
        ;(S.value = !0), await Ge.rpc.saveTestFile(r.file.filepath, L), (l.value = L), (u.value = !1)
      }
      return (L, F) => {
        const A = Uy
        return (
          ct(),
          Zt(
            A,
            _i(
              {
                ref_key: 'editor',
                ref: h,
                modelValue: G(o),
                'onUpdate:modelValue': F[0] || (F[0] = (B) => (Ee(o) ? (o.value = B) : null)),
                'h-full': '',
              },
              { lineNumbers: !0 },
              { mode: G(f), 'data-testid': 'code-mirror', onSave: E },
            ),
            null,
            16,
            ['modelValue', 'mode'],
          )
        )
      }
    },
  }),
  dlt = re({
    __name: 'Modal',
    props: df({ direction: { default: 'bottom' } }, { modelValue: { type: Boolean, default: !1 } }),
    emits: ['update:modelValue'],
    setup(t) {
      const e = Ym(t, 'modelValue'),
        r = yt(() => {
          switch (t.direction) {
            case 'bottom':
              return 'bottom-0 left-0 right-0 border-t'
            case 'top':
              return 'top-0 left-0 right-0 border-b'
            case 'left':
              return 'bottom-0 left-0 top-0 border-r'
            case 'right':
              return 'bottom-0 top-0 right-0 border-l'
            default:
              return ''
          }
        }),
        o = yt(() => {
          switch (t.direction) {
            case 'bottom':
              return 'translateY(100%)'
            case 'top':
              return 'translateY(-100%)'
            case 'left':
              return 'translateX(-100%)'
            case 'right':
              return 'translateX(100%)'
            default:
              return ''
          }
        }),
        l = () => (e.value = !1)
      return (u, f) => (
        ct(),
        Et(
          'div',
          { class: ve(['fixed inset-0 z-40', e.value ? '' : 'pointer-events-none']) },
          [
            ut(
              'div',
              {
                class: ve([
                  'bg-base inset-0 absolute transition-opacity duration-500 ease-out',
                  e.value ? 'opacity-50' : 'opacity-0',
                ]),
                onClick: l,
              },
              null,
              2,
            ),
            ut(
              'div',
              {
                class: ve(['bg-base border-base absolute transition-all duration-200 ease-out scrolls', [G(r)]]),
                style: En(e.value ? {} : { transform: G(o) }),
              },
              [nr(u.$slots, 'default')],
              6,
            ),
          ],
          2,
        )
      )
    },
  }),
  plt = ['aria-label', 'opacity', 'disabled', 'hover'],
  us = re({
    __name: 'IconButton',
    props: { icon: {}, title: {}, disabled: { type: Boolean } },
    setup(t) {
      return (e, r) => (
        ct(),
        Et(
          'button',
          {
            'aria-label': e.title,
            role: 'button',
            opacity: e.disabled ? 10 : 70,
            rounded: '',
            disabled: e.disabled,
            hover: e.disabled ? '' : 'bg-active op100',
            class: 'w-1.4em h-1.4em flex',
          },
          [nr(e.$slots, 'default', {}, () => [ut('div', { class: ve(e.icon), ma: '' }, null, 2)])],
          8,
          plt,
        )
      )
    },
  }),
  glt = { 'w-350': '', 'max-w-screen': '', 'h-full': '', flex: '', 'flex-col': '' },
  vlt = { 'p-4': '', relative: '' },
  mlt = ut('p', null, 'Module Info', -1),
  ylt = { op50: '', 'font-mono': '', 'text-sm': '' },
  blt = { key: 0, 'p-5': '' },
  wlt = { grid: '~ cols-2 rows-[min-content_auto]', 'overflow-hidden': '', 'flex-auto': '' },
  xlt = ut('div', { p: 'x3 y-1', 'bg-overlay': '', border: 'base b t r' }, ' Source ', -1),
  _lt = ut('div', { p: 'x3 y-1', 'bg-overlay': '', border: 'base b t' }, ' Transformed ', -1),
  Slt = { key: 0 },
  klt = { p: 'x3 y-1', 'bg-overlay': '', border: 'base b t' },
  Clt = re({
    __name: 'ModuleTransformResultView',
    props: { id: {} },
    emits: ['close'],
    setup(t, { emit: e }) {
      const r = t,
        o = LT(() => Ge.rpc.getTransformResult(r.id)),
        l = yt(() => {
          var d
          return ((d = r.id) == null ? void 0 : d.split(/\./g).pop()) || 'js'
        }),
        u = yt(() => {
          var d, g
          return ((g = (d = o.value) == null ? void 0 : d.source) == null ? void 0 : g.trim()) || ''
        }),
        f = yt(() => {
          var d, g
          return (
            ((g = (d = o.value) == null ? void 0 : d.code) == null
              ? void 0
              : g.replace(/\/\/# sourceMappingURL=.*\n/, '').trim()) || ''
          )
        }),
        h = yt(() => {
          var d, g, v, b
          return {
            mappings: ((g = (d = o.value) == null ? void 0 : d.map) == null ? void 0 : g.mappings) ?? '',
            version: (b = (v = o.value) == null ? void 0 : v.map) == null ? void 0 : b.version,
          }
        })
      return (
        MT('Escape', () => {
          e('close')
        }),
        (d, g) => {
          const v = us,
            b = Uy
          return (
            ct(),
            Et('div', glt, [
              ut('div', vlt, [
                mlt,
                ut('p', ylt, te(d.id), 1),
                qt(v, {
                  icon: 'i-carbon-close',
                  absolute: '',
                  'top-5px': '',
                  'right-5px': '',
                  'text-2xl': '',
                  onClick: g[0] || (g[0] = (x) => e('close')),
                }),
              ]),
              G(o)
                ? (ct(),
                  Et(
                    fe,
                    { key: 1 },
                    [
                      ut('div', wlt, [
                        xlt,
                        _lt,
                        qt(
                          b,
                          _i(
                            { 'h-full': '', 'model-value': G(u), 'read-only': '' },
                            { lineNumbers: !0 },
                            { mode: G(l) },
                          ),
                          null,
                          16,
                          ['model-value', 'mode'],
                        ),
                        qt(
                          b,
                          _i(
                            { 'h-full': '', 'model-value': G(f), 'read-only': '' },
                            { lineNumbers: !0 },
                            { mode: G(l) },
                          ),
                          null,
                          16,
                          ['model-value', 'mode'],
                        ),
                      ]),
                      G(h).mappings !== ''
                        ? (ct(),
                          Et('div', Slt, [
                            ut('div', klt, ' Source map (v' + te(G(h).version) + ') ', 1),
                            qt(
                              b,
                              _i(
                                { 'model-value': G(h).mappings, 'read-only': '' },
                                { lineNumbers: !0 },
                                { mode: G(l) },
                              ),
                              null,
                              16,
                              ['model-value', 'mode'],
                            ),
                          ]))
                        : ne('', !0),
                    ],
                    64,
                  ))
                : (ct(), Et('div', blt, ' No transform result found for this module. ')),
            ])
          )
        }
      )
    },
  })
var zf = 'http://www.w3.org/1999/xhtml'
const qv = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: zf,
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/',
}
function zc(t) {
  var e = (t += ''),
    r = e.indexOf(':')
  return (
    r >= 0 && (e = t.slice(0, r)) !== 'xmlns' && (t = t.slice(r + 1)),
    qv.hasOwnProperty(e) ? { space: qv[e], local: t } : t
  )
}
function Tlt(t) {
  return function () {
    var e = this.ownerDocument,
      r = this.namespaceURI
    return r === zf && e.documentElement.namespaceURI === zf ? e.createElement(t) : e.createElementNS(r, t)
  }
}
function Elt(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local)
  }
}
function jy(t) {
  var e = zc(t)
  return (e.local ? Elt : Tlt)(e)
}
function Llt() {}
function Fh(t) {
  return t == null
    ? Llt
    : function () {
        return this.querySelector(t)
      }
}
function Alt(t) {
  typeof t != 'function' && (t = Fh(t))
  for (var e = this._groups, r = e.length, o = new Array(r), l = 0; l < r; ++l)
    for (var u = e[l], f = u.length, h = (o[l] = new Array(f)), d, g, v = 0; v < f; ++v)
      (d = u[v]) && (g = t.call(d, d.__data__, v, u)) && ('__data__' in d && (g.__data__ = d.__data__), (h[v] = g))
  return new In(o, this._parents)
}
function Mlt(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t)
}
function Nlt() {
  return []
}
function Gy(t) {
  return t == null
    ? Nlt
    : function () {
        return this.querySelectorAll(t)
      }
}
function Plt(t) {
  return function () {
    return Mlt(t.apply(this, arguments))
  }
}
function Olt(t) {
  typeof t == 'function' ? (t = Plt(t)) : (t = Gy(t))
  for (var e = this._groups, r = e.length, o = [], l = [], u = 0; u < r; ++u)
    for (var f = e[u], h = f.length, d, g = 0; g < h; ++g)
      (d = f[g]) && (o.push(t.call(d, d.__data__, g, f)), l.push(d))
  return new In(o, l)
}
function Vy(t) {
  return function () {
    return this.matches(t)
  }
}
function Ky(t) {
  return function (e) {
    return e.matches(t)
  }
}
var $lt = Array.prototype.find
function Dlt(t) {
  return function () {
    return $lt.call(this.children, t)
  }
}
function Rlt() {
  return this.firstElementChild
}
function zlt(t) {
  return this.select(t == null ? Rlt : Dlt(typeof t == 'function' ? t : Ky(t)))
}
var Ilt = Array.prototype.filter
function Flt() {
  return Array.from(this.children)
}
function qlt(t) {
  return function () {
    return Ilt.call(this.children, t)
  }
}
function Hlt(t) {
  return this.selectAll(t == null ? Flt : qlt(typeof t == 'function' ? t : Ky(t)))
}
function Blt(t) {
  typeof t != 'function' && (t = Vy(t))
  for (var e = this._groups, r = e.length, o = new Array(r), l = 0; l < r; ++l)
    for (var u = e[l], f = u.length, h = (o[l] = []), d, g = 0; g < f; ++g)
      (d = u[g]) && t.call(d, d.__data__, g, u) && h.push(d)
  return new In(o, this._parents)
}
function Xy(t) {
  return new Array(t.length)
}
function Wlt() {
  return new In(this._enter || this._groups.map(Xy), this._parents)
}
function ac(t, e) {
  ;(this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = e)
}
ac.prototype = {
  constructor: ac,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next)
  },
  insertBefore: function (t, e) {
    return this._parent.insertBefore(t, e)
  },
  querySelector: function (t) {
    return this._parent.querySelector(t)
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t)
  },
}
function Ult(t) {
  return function () {
    return t
  }
}
function jlt(t, e, r, o, l, u) {
  for (var f = 0, h, d = e.length, g = u.length; f < g; ++f)
    (h = e[f]) ? ((h.__data__ = u[f]), (o[f] = h)) : (r[f] = new ac(t, u[f]))
  for (; f < d; ++f) (h = e[f]) && (l[f] = h)
}
function Glt(t, e, r, o, l, u, f) {
  var h,
    d,
    g = new Map(),
    v = e.length,
    b = u.length,
    x = new Array(v),
    S
  for (h = 0; h < v; ++h)
    (d = e[h]) && ((x[h] = S = f.call(d, d.__data__, h, e) + ''), g.has(S) ? (l[h] = d) : g.set(S, d))
  for (h = 0; h < b; ++h)
    (S = f.call(t, u[h], h, u) + ''),
      (d = g.get(S)) ? ((o[h] = d), (d.__data__ = u[h]), g.delete(S)) : (r[h] = new ac(t, u[h]))
  for (h = 0; h < v; ++h) (d = e[h]) && g.get(x[h]) === d && (l[h] = d)
}
function Vlt(t) {
  return t.__data__
}
function Klt(t, e) {
  if (!arguments.length) return Array.from(this, Vlt)
  var r = e ? Glt : jlt,
    o = this._parents,
    l = this._groups
  typeof t != 'function' && (t = Ult(t))
  for (var u = l.length, f = new Array(u), h = new Array(u), d = new Array(u), g = 0; g < u; ++g) {
    var v = o[g],
      b = l[g],
      x = b.length,
      S = Xlt(t.call(v, v && v.__data__, g, o)),
      M = S.length,
      T = (h[g] = new Array(M)),
      N = (f[g] = new Array(M)),
      E = (d[g] = new Array(x))
    r(v, b, T, N, E, S, e)
    for (var L = 0, F = 0, A, B; L < M; ++L)
      if ((A = T[L])) {
        for (L >= F && (F = L + 1); !(B = N[F]) && ++F < M; );
        A._next = B || null
      }
  }
  return (f = new In(f, o)), (f._enter = h), (f._exit = d), f
}
function Xlt(t) {
  return typeof t == 'object' && 'length' in t ? t : Array.from(t)
}
function Ylt() {
  return new In(this._exit || this._groups.map(Xy), this._parents)
}
function Zlt(t, e, r) {
  var o = this.enter(),
    l = this,
    u = this.exit()
  return (
    typeof t == 'function' ? ((o = t(o)), o && (o = o.selection())) : (o = o.append(t + '')),
    e != null && ((l = e(l)), l && (l = l.selection())),
    r == null ? u.remove() : r(u),
    o && l ? o.merge(l).order() : l
  )
}
function Jlt(t) {
  for (
    var e = t.selection ? t.selection() : t,
      r = this._groups,
      o = e._groups,
      l = r.length,
      u = o.length,
      f = Math.min(l, u),
      h = new Array(l),
      d = 0;
    d < f;
    ++d
  )
    for (var g = r[d], v = o[d], b = g.length, x = (h[d] = new Array(b)), S, M = 0; M < b; ++M)
      (S = g[M] || v[M]) && (x[M] = S)
  for (; d < l; ++d) h[d] = r[d]
  return new In(h, this._parents)
}
function Qlt() {
  for (var t = this._groups, e = -1, r = t.length; ++e < r; )
    for (var o = t[e], l = o.length - 1, u = o[l], f; --l >= 0; )
      (f = o[l]) && (u && f.compareDocumentPosition(u) ^ 4 && u.parentNode.insertBefore(f, u), (u = f))
  return this
}
function tct(t) {
  t || (t = ect)
  function e(b, x) {
    return b && x ? t(b.__data__, x.__data__) : !b - !x
  }
  for (var r = this._groups, o = r.length, l = new Array(o), u = 0; u < o; ++u) {
    for (var f = r[u], h = f.length, d = (l[u] = new Array(h)), g, v = 0; v < h; ++v) (g = f[v]) && (d[v] = g)
    d.sort(e)
  }
  return new In(l, this._parents).order()
}
function ect(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
}
function nct() {
  var t = arguments[0]
  return (arguments[0] = this), t.apply(null, arguments), this
}
function rct() {
  return Array.from(this)
}
function ict() {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var o = t[e], l = 0, u = o.length; l < u; ++l) {
      var f = o[l]
      if (f) return f
    }
  return null
}
function oct() {
  let t = 0
  for (const e of this) ++t
  return t
}
function sct() {
  return !this.node()
}
function act(t) {
  for (var e = this._groups, r = 0, o = e.length; r < o; ++r)
    for (var l = e[r], u = 0, f = l.length, h; u < f; ++u) (h = l[u]) && t.call(h, h.__data__, u, l)
  return this
}
function lct(t) {
  return function () {
    this.removeAttribute(t)
  }
}
function cct(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local)
  }
}
function uct(t, e) {
  return function () {
    this.setAttribute(t, e)
  }
}
function fct(t, e) {
  return function () {
    this.setAttributeNS(t.space, t.local, e)
  }
}
function hct(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    r == null ? this.removeAttribute(t) : this.setAttribute(t, r)
  }
}
function dct(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    r == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, r)
  }
}
function pct(t, e) {
  var r = zc(t)
  if (arguments.length < 2) {
    var o = this.node()
    return r.local ? o.getAttributeNS(r.space, r.local) : o.getAttribute(r)
  }
  return this.each(
    (e == null ? (r.local ? cct : lct) : typeof e == 'function' ? (r.local ? dct : hct) : r.local ? fct : uct)(r, e),
  )
}
function Yy(t) {
  return (t.ownerDocument && t.ownerDocument.defaultView) || (t.document && t) || t.defaultView
}
function gct(t) {
  return function () {
    this.style.removeProperty(t)
  }
}
function vct(t, e, r) {
  return function () {
    this.style.setProperty(t, e, r)
  }
}
function mct(t, e, r) {
  return function () {
    var o = e.apply(this, arguments)
    o == null ? this.style.removeProperty(t) : this.style.setProperty(t, o, r)
  }
}
function yct(t, e, r) {
  return arguments.length > 1
    ? this.each((e == null ? gct : typeof e == 'function' ? mct : vct)(t, e, r ?? ''))
    : rs(this.node(), t)
}
function rs(t, e) {
  return t.style.getPropertyValue(e) || Yy(t).getComputedStyle(t, null).getPropertyValue(e)
}
function bct(t) {
  return function () {
    delete this[t]
  }
}
function wct(t, e) {
  return function () {
    this[t] = e
  }
}
function xct(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    r == null ? delete this[t] : (this[t] = r)
  }
}
function _ct(t, e) {
  return arguments.length > 1 ? this.each((e == null ? bct : typeof e == 'function' ? xct : wct)(t, e)) : this.node()[t]
}
function Zy(t) {
  return t.trim().split(/^|\s+/)
}
function qh(t) {
  return t.classList || new Jy(t)
}
function Jy(t) {
  ;(this._node = t), (this._names = Zy(t.getAttribute('class') || ''))
}
Jy.prototype = {
  add: function (t) {
    var e = this._names.indexOf(t)
    e < 0 && (this._names.push(t), this._node.setAttribute('class', this._names.join(' ')))
  },
  remove: function (t) {
    var e = this._names.indexOf(t)
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute('class', this._names.join(' ')))
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0
  },
}
function Qy(t, e) {
  for (var r = qh(t), o = -1, l = e.length; ++o < l; ) r.add(e[o])
}
function tb(t, e) {
  for (var r = qh(t), o = -1, l = e.length; ++o < l; ) r.remove(e[o])
}
function Sct(t) {
  return function () {
    Qy(this, t)
  }
}
function kct(t) {
  return function () {
    tb(this, t)
  }
}
function Cct(t, e) {
  return function () {
    ;(e.apply(this, arguments) ? Qy : tb)(this, t)
  }
}
function Tct(t, e) {
  var r = Zy(t + '')
  if (arguments.length < 2) {
    for (var o = qh(this.node()), l = -1, u = r.length; ++l < u; ) if (!o.contains(r[l])) return !1
    return !0
  }
  return this.each((typeof e == 'function' ? Cct : e ? Sct : kct)(r, e))
}
function Ect() {
  this.textContent = ''
}
function Lct(t) {
  return function () {
    this.textContent = t
  }
}
function Act(t) {
  return function () {
    var e = t.apply(this, arguments)
    this.textContent = e ?? ''
  }
}
function Mct(t) {
  return arguments.length
    ? this.each(t == null ? Ect : (typeof t == 'function' ? Act : Lct)(t))
    : this.node().textContent
}
function Nct() {
  this.innerHTML = ''
}
function Pct(t) {
  return function () {
    this.innerHTML = t
  }
}
function Oct(t) {
  return function () {
    var e = t.apply(this, arguments)
    this.innerHTML = e ?? ''
  }
}
function $ct(t) {
  return arguments.length ? this.each(t == null ? Nct : (typeof t == 'function' ? Oct : Pct)(t)) : this.node().innerHTML
}
function Dct() {
  this.nextSibling && this.parentNode.appendChild(this)
}
function Rct() {
  return this.each(Dct)
}
function zct() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
}
function Ict() {
  return this.each(zct)
}
function Fct(t) {
  var e = typeof t == 'function' ? t : jy(t)
  return this.select(function () {
    return this.appendChild(e.apply(this, arguments))
  })
}
function qct() {
  return null
}
function Hct(t, e) {
  var r = typeof t == 'function' ? t : jy(t),
    o = e == null ? qct : typeof e == 'function' ? e : Fh(e)
  return this.select(function () {
    return this.insertBefore(r.apply(this, arguments), o.apply(this, arguments) || null)
  })
}
function Bct() {
  var t = this.parentNode
  t && t.removeChild(this)
}
function Wct() {
  return this.each(Bct)
}
function Uct() {
  var t = this.cloneNode(!1),
    e = this.parentNode
  return e ? e.insertBefore(t, this.nextSibling) : t
}
function jct() {
  var t = this.cloneNode(!0),
    e = this.parentNode
  return e ? e.insertBefore(t, this.nextSibling) : t
}
function Gct(t) {
  return this.select(t ? jct : Uct)
}
function Vct(t) {
  return arguments.length ? this.property('__data__', t) : this.node().__data__
}
function Kct(t) {
  return function (e) {
    t.call(this, e, this.__data__)
  }
}
function Xct(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = '',
        o = e.indexOf('.')
      return o >= 0 && ((r = e.slice(o + 1)), (e = e.slice(0, o))), { type: e, name: r }
    })
}
function Yct(t) {
  return function () {
    var e = this.__on
    if (e) {
      for (var r = 0, o = -1, l = e.length, u; r < l; ++r)
        (u = e[r]),
          (!t.type || u.type === t.type) && u.name === t.name
            ? this.removeEventListener(u.type, u.listener, u.options)
            : (e[++o] = u)
      ++o ? (e.length = o) : delete this.__on
    }
  }
}
function Zct(t, e, r) {
  return function () {
    var o = this.__on,
      l,
      u = Kct(e)
    if (o) {
      for (var f = 0, h = o.length; f < h; ++f)
        if ((l = o[f]).type === t.type && l.name === t.name) {
          this.removeEventListener(l.type, l.listener, l.options),
            this.addEventListener(l.type, (l.listener = u), (l.options = r)),
            (l.value = e)
          return
        }
    }
    this.addEventListener(t.type, u, r),
      (l = { type: t.type, name: t.name, value: e, listener: u, options: r }),
      o ? o.push(l) : (this.__on = [l])
  }
}
function Jct(t, e, r) {
  var o = Xct(t + ''),
    l,
    u = o.length,
    f
  if (arguments.length < 2) {
    var h = this.node().__on
    if (h) {
      for (var d = 0, g = h.length, v; d < g; ++d)
        for (l = 0, v = h[d]; l < u; ++l) if ((f = o[l]).type === v.type && f.name === v.name) return v.value
    }
    return
  }
  for (h = e ? Zct : Yct, l = 0; l < u; ++l) this.each(h(o[l], e, r))
  return this
}
function eb(t, e, r) {
  var o = Yy(t),
    l = o.CustomEvent
  typeof l == 'function'
    ? (l = new l(e, r))
    : ((l = o.document.createEvent('Event')),
      r ? (l.initEvent(e, r.bubbles, r.cancelable), (l.detail = r.detail)) : l.initEvent(e, !1, !1)),
    t.dispatchEvent(l)
}
function Qct(t, e) {
  return function () {
    return eb(this, t, e)
  }
}
function tut(t, e) {
  return function () {
    return eb(this, t, e.apply(this, arguments))
  }
}
function eut(t, e) {
  return this.each((typeof e == 'function' ? tut : Qct)(t, e))
}
function* nut() {
  for (var t = this._groups, e = 0, r = t.length; e < r; ++e)
    for (var o = t[e], l = 0, u = o.length, f; l < u; ++l) (f = o[l]) && (yield f)
}
var nb = [null]
function In(t, e) {
  ;(this._groups = t), (this._parents = e)
}
function Na() {
  return new In([[document.documentElement]], nb)
}
function rut() {
  return this
}
In.prototype = Na.prototype = {
  constructor: In,
  select: Alt,
  selectAll: Olt,
  selectChild: zlt,
  selectChildren: Hlt,
  filter: Blt,
  data: Klt,
  enter: Wlt,
  exit: Ylt,
  join: Zlt,
  merge: Jlt,
  selection: rut,
  order: Qlt,
  sort: tct,
  call: nct,
  nodes: rct,
  node: ict,
  size: oct,
  empty: sct,
  each: act,
  attr: pct,
  style: yct,
  property: _ct,
  classed: Tct,
  text: Mct,
  html: $ct,
  raise: Rct,
  lower: Ict,
  append: Fct,
  insert: Hct,
  remove: Wct,
  clone: Gct,
  datum: Vct,
  on: Jct,
  dispatch: eut,
  [Symbol.iterator]: nut,
}
function Cn(t) {
  return typeof t == 'string' ? new In([[document.querySelector(t)]], [document.documentElement]) : new In([[t]], nb)
}
function iut(t) {
  let e
  for (; (e = t.sourceEvent); ) t = e
  return t
}
function $r(t, e) {
  if (((t = iut(t)), e === void 0 && (e = t.currentTarget), e)) {
    var r = e.ownerSVGElement || e
    if (r.createSVGPoint) {
      var o = r.createSVGPoint()
      return (o.x = t.clientX), (o.y = t.clientY), (o = o.matrixTransform(e.getScreenCTM().inverse())), [o.x, o.y]
    }
    if (e.getBoundingClientRect) {
      var l = e.getBoundingClientRect()
      return [t.clientX - l.left - e.clientLeft, t.clientY - l.top - e.clientTop]
    }
  }
  return [t.pageX, t.pageY]
}
class pn {
  constructor(e, r) {
    ;(this.x = e), (this.y = r)
  }
  static of([e, r]) {
    return new pn(e, r)
  }
  add(e) {
    return new pn(this.x + e.x, this.y + e.y)
  }
  subtract(e) {
    return new pn(this.x - e.x, this.y - e.y)
  }
  multiply(e) {
    return new pn(this.x * e, this.y * e)
  }
  divide(e) {
    return new pn(this.x / e, this.y / e)
  }
  dot(e) {
    return this.x * e.x + this.y * e.y
  }
  cross(e) {
    return this.x * e.y - e.x * this.y
  }
  hadamard(e) {
    return new pn(this.x * e.x, this.y * e.y)
  }
  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  normalize() {
    const e = this.length()
    return new pn(this.x / e, this.y / e)
  }
  rotateByRadians(e) {
    const r = Math.cos(e),
      o = Math.sin(e)
    return new pn(this.x * r - this.y * o, this.x * o + this.y * r)
  }
  rotateByDegrees(e) {
    return this.rotateByRadians((e * Math.PI) / 180)
  }
}
var out = { value: () => {} }
function Pa() {
  for (var t = 0, e = arguments.length, r = {}, o; t < e; ++t) {
    if (!(o = arguments[t] + '') || o in r || /[\s.]/.test(o)) throw new Error('illegal type: ' + o)
    r[o] = []
  }
  return new Il(r)
}
function Il(t) {
  this._ = t
}
function sut(t, e) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (r) {
      var o = '',
        l = r.indexOf('.')
      if ((l >= 0 && ((o = r.slice(l + 1)), (r = r.slice(0, l))), r && !e.hasOwnProperty(r)))
        throw new Error('unknown type: ' + r)
      return { type: r, name: o }
    })
}
Il.prototype = Pa.prototype = {
  constructor: Il,
  on: function (t, e) {
    var r = this._,
      o = sut(t + '', r),
      l,
      u = -1,
      f = o.length
    if (arguments.length < 2) {
      for (; ++u < f; ) if ((l = (t = o[u]).type) && (l = aut(r[l], t.name))) return l
      return
    }
    if (e != null && typeof e != 'function') throw new Error('invalid callback: ' + e)
    for (; ++u < f; )
      if ((l = (t = o[u]).type)) r[l] = Hv(r[l], t.name, e)
      else if (e == null) for (l in r) r[l] = Hv(r[l], t.name, null)
    return this
  },
  copy: function () {
    var t = {},
      e = this._
    for (var r in e) t[r] = e[r].slice()
    return new Il(t)
  },
  call: function (t, e) {
    if ((l = arguments.length - 2) > 0) for (var r = new Array(l), o = 0, l, u; o < l; ++o) r[o] = arguments[o + 2]
    if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t)
    for (u = this._[t], o = 0, l = u.length; o < l; ++o) u[o].value.apply(e, r)
  },
  apply: function (t, e, r) {
    if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t)
    for (var o = this._[t], l = 0, u = o.length; l < u; ++l) o[l].value.apply(e, r)
  },
}
function aut(t, e) {
  for (var r = 0, o = t.length, l; r < o; ++r) if ((l = t[r]).name === e) return l.value
}
function Hv(t, e, r) {
  for (var o = 0, l = t.length; o < l; ++o)
    if (t[o].name === e) {
      ;(t[o] = out), (t = t.slice(0, o).concat(t.slice(o + 1)))
      break
    }
  return r != null && t.push({ name: e, value: r }), t
}
const lut = { passive: !1 },
  va = { capture: !0, passive: !1 }
function Ju(t) {
  t.stopImmediatePropagation()
}
function Uo(t) {
  t.preventDefault(), t.stopImmediatePropagation()
}
function rb(t) {
  var e = t.document.documentElement,
    r = Cn(t).on('dragstart.drag', Uo, va)
  'onselectstart' in e
    ? r.on('selectstart.drag', Uo, va)
    : ((e.__noselect = e.style.MozUserSelect), (e.style.MozUserSelect = 'none'))
}
function ib(t, e) {
  var r = t.document.documentElement,
    o = Cn(t).on('dragstart.drag', null)
  e &&
    (o.on('click.drag', Uo, va),
    setTimeout(function () {
      o.on('click.drag', null)
    }, 0)),
    'onselectstart' in r
      ? o.on('selectstart.drag', null)
      : ((r.style.MozUserSelect = r.__noselect), delete r.__noselect)
}
const kl = (t) => () => t
function If(
  t,
  { sourceEvent: e, subject: r, target: o, identifier: l, active: u, x: f, y: h, dx: d, dy: g, dispatch: v },
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: r, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: l, enumerable: !0, configurable: !0 },
    active: { value: u, enumerable: !0, configurable: !0 },
    x: { value: f, enumerable: !0, configurable: !0 },
    y: { value: h, enumerable: !0, configurable: !0 },
    dx: { value: d, enumerable: !0, configurable: !0 },
    dy: { value: g, enumerable: !0, configurable: !0 },
    _: { value: v },
  })
}
If.prototype.on = function () {
  var t = this._.on.apply(this._, arguments)
  return t === this._ ? this : t
}
function cut(t) {
  return !t.ctrlKey && !t.button
}
function uut() {
  return this.parentNode
}
function fut(t, e) {
  return e ?? { x: t.x, y: t.y }
}
function hut() {
  return navigator.maxTouchPoints || 'ontouchstart' in this
}
function dut() {
  var t = cut,
    e = uut,
    r = fut,
    o = hut,
    l = {},
    u = Pa('start', 'drag', 'end'),
    f = 0,
    h,
    d,
    g,
    v,
    b = 0
  function x(A) {
    A.on('mousedown.drag', S)
      .filter(o)
      .on('touchstart.drag', N)
      .on('touchmove.drag', E, lut)
      .on('touchend.drag touchcancel.drag', L)
      .style('touch-action', 'none')
      .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
  }
  function S(A, B) {
    if (!(v || !t.call(this, A, B))) {
      var tt = F(this, e.call(this, A, B), A, B, 'mouse')
      tt &&
        (Cn(A.view).on('mousemove.drag', M, va).on('mouseup.drag', T, va),
        rb(A.view),
        Ju(A),
        (g = !1),
        (h = A.clientX),
        (d = A.clientY),
        tt('start', A))
    }
  }
  function M(A) {
    if ((Uo(A), !g)) {
      var B = A.clientX - h,
        tt = A.clientY - d
      g = B * B + tt * tt > b
    }
    l.mouse('drag', A)
  }
  function T(A) {
    Cn(A.view).on('mousemove.drag mouseup.drag', null), ib(A.view, g), Uo(A), l.mouse('end', A)
  }
  function N(A, B) {
    if (t.call(this, A, B)) {
      var tt = A.changedTouches,
        ft = e.call(this, A, B),
        X = tt.length,
        st,
        ot
      for (st = 0; st < X; ++st) (ot = F(this, ft, A, B, tt[st].identifier, tt[st])) && (Ju(A), ot('start', A, tt[st]))
    }
  }
  function E(A) {
    var B = A.changedTouches,
      tt = B.length,
      ft,
      X
    for (ft = 0; ft < tt; ++ft) (X = l[B[ft].identifier]) && (Uo(A), X('drag', A, B[ft]))
  }
  function L(A) {
    var B = A.changedTouches,
      tt = B.length,
      ft,
      X
    for (
      v && clearTimeout(v),
        v = setTimeout(function () {
          v = null
        }, 500),
        ft = 0;
      ft < tt;
      ++ft
    )
      (X = l[B[ft].identifier]) && (Ju(A), X('end', A, B[ft]))
  }
  function F(A, B, tt, ft, X, st) {
    var ot = u.copy(),
      kt = $r(st || tt, B),
      pt,
      V,
      R
    if (
      (R = r.call(
        A,
        new If('beforestart', {
          sourceEvent: tt,
          target: x,
          identifier: X,
          active: f,
          x: kt[0],
          y: kt[1],
          dx: 0,
          dy: 0,
          dispatch: ot,
        }),
        ft,
      )) != null
    )
      return (
        (pt = R.x - kt[0] || 0),
        (V = R.y - kt[1] || 0),
        function k(H, W, J) {
          var wt = kt,
            Tt
          switch (H) {
            case 'start':
              ;(l[X] = k), (Tt = f++)
              break
            case 'end':
              delete l[X], --f
            case 'drag':
              ;(kt = $r(J || W, B)), (Tt = f)
              break
          }
          ot.call(
            H,
            A,
            new If(H, {
              sourceEvent: W,
              subject: R,
              target: x,
              identifier: X,
              active: Tt,
              x: kt[0] + pt,
              y: kt[1] + V,
              dx: kt[0] - wt[0],
              dy: kt[1] - wt[1],
              dispatch: ot,
            }),
            ft,
          )
        }
      )
  }
  return (
    (x.filter = function (A) {
      return arguments.length ? ((t = typeof A == 'function' ? A : kl(!!A)), x) : t
    }),
    (x.container = function (A) {
      return arguments.length ? ((e = typeof A == 'function' ? A : kl(A)), x) : e
    }),
    (x.subject = function (A) {
      return arguments.length ? ((r = typeof A == 'function' ? A : kl(A)), x) : r
    }),
    (x.touchable = function (A) {
      return arguments.length ? ((o = typeof A == 'function' ? A : kl(!!A)), x) : o
    }),
    (x.on = function () {
      var A = u.on.apply(u, arguments)
      return A === u ? x : A
    }),
    (x.clickDistance = function (A) {
      return arguments.length ? ((b = (A = +A) * A), x) : Math.sqrt(b)
    }),
    x
  )
}
function Hh(t, e, r) {
  ;(t.prototype = e.prototype = r), (r.constructor = t)
}
function ob(t, e) {
  var r = Object.create(t.prototype)
  for (var o in e) r[o] = e[o]
  return r
}
function Oa() {}
var ma = 0.7,
  lc = 1 / ma,
  jo = '\\s*([+-]?\\d+)\\s*',
  ya = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
  mr = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
  put = /^#([0-9a-f]{3,8})$/,
  gut = new RegExp(`^rgb\\(${jo},${jo},${jo}\\)$`),
  vut = new RegExp(`^rgb\\(${mr},${mr},${mr}\\)$`),
  mut = new RegExp(`^rgba\\(${jo},${jo},${jo},${ya}\\)$`),
  yut = new RegExp(`^rgba\\(${mr},${mr},${mr},${ya}\\)$`),
  but = new RegExp(`^hsl\\(${ya},${mr},${mr}\\)$`),
  wut = new RegExp(`^hsla\\(${ya},${mr},${mr},${ya}\\)$`),
  Bv = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  }
Hh(Oa, ba, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t)
  },
  displayable() {
    return this.rgb().displayable()
  },
  hex: Wv,
  formatHex: Wv,
  formatHex8: xut,
  formatHsl: _ut,
  formatRgb: Uv,
  toString: Uv,
})
function Wv() {
  return this.rgb().formatHex()
}
function xut() {
  return this.rgb().formatHex8()
}
function _ut() {
  return sb(this).formatHsl()
}
function Uv() {
  return this.rgb().formatRgb()
}
function ba(t) {
  var e, r
  return (
    (t = (t + '').trim().toLowerCase()),
    (e = put.exec(t))
      ? ((r = e[1].length),
        (e = parseInt(e[1], 16)),
        r === 6
          ? jv(e)
          : r === 3
            ? new Tn(((e >> 8) & 15) | ((e >> 4) & 240), ((e >> 4) & 15) | (e & 240), ((e & 15) << 4) | (e & 15), 1)
            : r === 8
              ? Cl((e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255, (e & 255) / 255)
              : r === 4
                ? Cl(
                    ((e >> 12) & 15) | ((e >> 8) & 240),
                    ((e >> 8) & 15) | ((e >> 4) & 240),
                    ((e >> 4) & 15) | (e & 240),
                    (((e & 15) << 4) | (e & 15)) / 255,
                  )
                : null)
      : (e = gut.exec(t))
        ? new Tn(e[1], e[2], e[3], 1)
        : (e = vut.exec(t))
          ? new Tn((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, 1)
          : (e = mut.exec(t))
            ? Cl(e[1], e[2], e[3], e[4])
            : (e = yut.exec(t))
              ? Cl((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, e[4])
              : (e = but.exec(t))
                ? Kv(e[1], e[2] / 100, e[3] / 100, 1)
                : (e = wut.exec(t))
                  ? Kv(e[1], e[2] / 100, e[3] / 100, e[4])
                  : Bv.hasOwnProperty(t)
                    ? jv(Bv[t])
                    : t === 'transparent'
                      ? new Tn(NaN, NaN, NaN, 0)
                      : null
  )
}
function jv(t) {
  return new Tn((t >> 16) & 255, (t >> 8) & 255, t & 255, 1)
}
function Cl(t, e, r, o) {
  return o <= 0 && (t = e = r = NaN), new Tn(t, e, r, o)
}
function Sut(t) {
  return t instanceof Oa || (t = ba(t)), t ? ((t = t.rgb()), new Tn(t.r, t.g, t.b, t.opacity)) : new Tn()
}
function Ff(t, e, r, o) {
  return arguments.length === 1 ? Sut(t) : new Tn(t, e, r, o ?? 1)
}
function Tn(t, e, r, o) {
  ;(this.r = +t), (this.g = +e), (this.b = +r), (this.opacity = +o)
}
Hh(
  Tn,
  Ff,
  ob(Oa, {
    brighter(t) {
      return (t = t == null ? lc : Math.pow(lc, t)), new Tn(this.r * t, this.g * t, this.b * t, this.opacity)
    },
    darker(t) {
      return (t = t == null ? ma : Math.pow(ma, t)), new Tn(this.r * t, this.g * t, this.b * t, this.opacity)
    },
    rgb() {
      return this
    },
    clamp() {
      return new Tn(Ji(this.r), Ji(this.g), Ji(this.b), cc(this.opacity))
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      )
    },
    hex: Gv,
    formatHex: Gv,
    formatHex8: kut,
    formatRgb: Vv,
    toString: Vv,
  }),
)
function Gv() {
  return `#${Ki(this.r)}${Ki(this.g)}${Ki(this.b)}`
}
function kut() {
  return `#${Ki(this.r)}${Ki(this.g)}${Ki(this.b)}${Ki((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`
}
function Vv() {
  const t = cc(this.opacity)
  return `${t === 1 ? 'rgb(' : 'rgba('}${Ji(this.r)}, ${Ji(this.g)}, ${Ji(this.b)}${t === 1 ? ')' : `, ${t})`}`
}
function cc(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t))
}
function Ji(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0))
}
function Ki(t) {
  return (t = Ji(t)), (t < 16 ? '0' : '') + t.toString(16)
}
function Kv(t, e, r, o) {
  return o <= 0 ? (t = e = r = NaN) : r <= 0 || r >= 1 ? (t = e = NaN) : e <= 0 && (t = NaN), new tr(t, e, r, o)
}
function sb(t) {
  if (t instanceof tr) return new tr(t.h, t.s, t.l, t.opacity)
  if ((t instanceof Oa || (t = ba(t)), !t)) return new tr()
  if (t instanceof tr) return t
  t = t.rgb()
  var e = t.r / 255,
    r = t.g / 255,
    o = t.b / 255,
    l = Math.min(e, r, o),
    u = Math.max(e, r, o),
    f = NaN,
    h = u - l,
    d = (u + l) / 2
  return (
    h
      ? (e === u ? (f = (r - o) / h + (r < o) * 6) : r === u ? (f = (o - e) / h + 2) : (f = (e - r) / h + 4),
        (h /= d < 0.5 ? u + l : 2 - u - l),
        (f *= 60))
      : (h = d > 0 && d < 1 ? 0 : f),
    new tr(f, h, d, t.opacity)
  )
}
function Cut(t, e, r, o) {
  return arguments.length === 1 ? sb(t) : new tr(t, e, r, o ?? 1)
}
function tr(t, e, r, o) {
  ;(this.h = +t), (this.s = +e), (this.l = +r), (this.opacity = +o)
}
Hh(
  tr,
  Cut,
  ob(Oa, {
    brighter(t) {
      return (t = t == null ? lc : Math.pow(lc, t)), new tr(this.h, this.s, this.l * t, this.opacity)
    },
    darker(t) {
      return (t = t == null ? ma : Math.pow(ma, t)), new tr(this.h, this.s, this.l * t, this.opacity)
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        r = this.l,
        o = r + (r < 0.5 ? r : 1 - r) * e,
        l = 2 * r - o
      return new Tn(
        Qu(t >= 240 ? t - 240 : t + 120, l, o),
        Qu(t, l, o),
        Qu(t < 120 ? t + 240 : t - 120, l, o),
        this.opacity,
      )
    },
    clamp() {
      return new tr(Xv(this.h), Tl(this.s), Tl(this.l), cc(this.opacity))
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      )
    },
    formatHsl() {
      const t = cc(this.opacity)
      return `${t === 1 ? 'hsl(' : 'hsla('}${Xv(this.h)}, ${Tl(this.s) * 100}%, ${Tl(this.l) * 100}%${
        t === 1 ? ')' : `, ${t})`
      }`
    },
  }),
)
function Xv(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t
}
function Tl(t) {
  return Math.max(0, Math.min(1, t || 0))
}
function Qu(t, e, r) {
  return (t < 60 ? e + ((r - e) * t) / 60 : t < 180 ? r : t < 240 ? e + ((r - e) * (240 - t)) / 60 : e) * 255
}
const ab = (t) => () => t
function Tut(t, e) {
  return function (r) {
    return t + r * e
  }
}
function Eut(t, e, r) {
  return (
    (t = Math.pow(t, r)),
    (e = Math.pow(e, r) - t),
    (r = 1 / r),
    function (o) {
      return Math.pow(t + o * e, r)
    }
  )
}
function Lut(t) {
  return (t = +t) == 1
    ? lb
    : function (e, r) {
        return r - e ? Eut(e, r, t) : ab(isNaN(e) ? r : e)
      }
}
function lb(t, e) {
  var r = e - t
  return r ? Tut(t, r) : ab(isNaN(t) ? e : t)
}
const Yv = (function t(e) {
  var r = Lut(e)
  function o(l, u) {
    var f = r((l = Ff(l)).r, (u = Ff(u)).r),
      h = r(l.g, u.g),
      d = r(l.b, u.b),
      g = lb(l.opacity, u.opacity)
    return function (v) {
      return (l.r = f(v)), (l.g = h(v)), (l.b = d(v)), (l.opacity = g(v)), l + ''
    }
  }
  return (o.gamma = t), o
})(1)
function vi(t, e) {
  return (
    (t = +t),
    (e = +e),
    function (r) {
      return t * (1 - r) + e * r
    }
  )
}
var qf = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  tf = new RegExp(qf.source, 'g')
function Aut(t) {
  return function () {
    return t
  }
}
function Mut(t) {
  return function (e) {
    return t(e) + ''
  }
}
function Nut(t, e) {
  var r = (qf.lastIndex = tf.lastIndex = 0),
    o,
    l,
    u,
    f = -1,
    h = [],
    d = []
  for (t = t + '', e = e + ''; (o = qf.exec(t)) && (l = tf.exec(e)); )
    (u = l.index) > r && ((u = e.slice(r, u)), h[f] ? (h[f] += u) : (h[++f] = u)),
      (o = o[0]) === (l = l[0])
        ? h[f]
          ? (h[f] += l)
          : (h[++f] = l)
        : ((h[++f] = null), d.push({ i: f, x: vi(o, l) })),
      (r = tf.lastIndex)
  return (
    r < e.length && ((u = e.slice(r)), h[f] ? (h[f] += u) : (h[++f] = u)),
    h.length < 2
      ? d[0]
        ? Mut(d[0].x)
        : Aut(e)
      : ((e = d.length),
        function (g) {
          for (var v = 0, b; v < e; ++v) h[(b = d[v]).i] = b.x(g)
          return h.join('')
        })
  )
}
var Zv = 180 / Math.PI,
  Hf = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 }
function cb(t, e, r, o, l, u) {
  var f, h, d
  return (
    (f = Math.sqrt(t * t + e * e)) && ((t /= f), (e /= f)),
    (d = t * r + e * o) && ((r -= t * d), (o -= e * d)),
    (h = Math.sqrt(r * r + o * o)) && ((r /= h), (o /= h), (d /= h)),
    t * o < e * r && ((t = -t), (e = -e), (d = -d), (f = -f)),
    { translateX: l, translateY: u, rotate: Math.atan2(e, t) * Zv, skewX: Math.atan(d) * Zv, scaleX: f, scaleY: h }
  )
}
var El
function Put(t) {
  const e = new (typeof DOMMatrix == 'function' ? DOMMatrix : WebKitCSSMatrix)(t + '')
  return e.isIdentity ? Hf : cb(e.a, e.b, e.c, e.d, e.e, e.f)
}
function Out(t) {
  return t == null ||
    (El || (El = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
    El.setAttribute('transform', t),
    !(t = El.transform.baseVal.consolidate()))
    ? Hf
    : ((t = t.matrix), cb(t.a, t.b, t.c, t.d, t.e, t.f))
}
function ub(t, e, r, o) {
  function l(g) {
    return g.length ? g.pop() + ' ' : ''
  }
  function u(g, v, b, x, S, M) {
    if (g !== b || v !== x) {
      var T = S.push('translate(', null, e, null, r)
      M.push({ i: T - 4, x: vi(g, b) }, { i: T - 2, x: vi(v, x) })
    } else (b || x) && S.push('translate(' + b + e + x + r)
  }
  function f(g, v, b, x) {
    g !== v
      ? (g - v > 180 ? (v += 360) : v - g > 180 && (g += 360),
        x.push({ i: b.push(l(b) + 'rotate(', null, o) - 2, x: vi(g, v) }))
      : v && b.push(l(b) + 'rotate(' + v + o)
  }
  function h(g, v, b, x) {
    g !== v ? x.push({ i: b.push(l(b) + 'skewX(', null, o) - 2, x: vi(g, v) }) : v && b.push(l(b) + 'skewX(' + v + o)
  }
  function d(g, v, b, x, S, M) {
    if (g !== b || v !== x) {
      var T = S.push(l(S) + 'scale(', null, ',', null, ')')
      M.push({ i: T - 4, x: vi(g, b) }, { i: T - 2, x: vi(v, x) })
    } else (b !== 1 || x !== 1) && S.push(l(S) + 'scale(' + b + ',' + x + ')')
  }
  return function (g, v) {
    var b = [],
      x = []
    return (
      (g = t(g)),
      (v = t(v)),
      u(g.translateX, g.translateY, v.translateX, v.translateY, b, x),
      f(g.rotate, v.rotate, b, x),
      h(g.skewX, v.skewX, b, x),
      d(g.scaleX, g.scaleY, v.scaleX, v.scaleY, b, x),
      (g = v = null),
      function (S) {
        for (var M = -1, T = x.length, N; ++M < T; ) b[(N = x[M]).i] = N.x(S)
        return b.join('')
      }
    )
  }
}
var $ut = ub(Put, 'px, ', 'px)', 'deg)'),
  Dut = ub(Out, ', ', ')', ')'),
  Rut = 1e-12
function Jv(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2
}
function zut(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2
}
function Iut(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1)
}
const Fut = (function t(e, r, o) {
  function l(u, f) {
    var h = u[0],
      d = u[1],
      g = u[2],
      v = f[0],
      b = f[1],
      x = f[2],
      S = v - h,
      M = b - d,
      T = S * S + M * M,
      N,
      E
    if (T < Rut)
      (E = Math.log(x / g) / e),
        (N = function (ft) {
          return [h + ft * S, d + ft * M, g * Math.exp(e * ft * E)]
        })
    else {
      var L = Math.sqrt(T),
        F = (x * x - g * g + o * T) / (2 * g * r * L),
        A = (x * x - g * g - o * T) / (2 * x * r * L),
        B = Math.log(Math.sqrt(F * F + 1) - F),
        tt = Math.log(Math.sqrt(A * A + 1) - A)
      ;(E = (tt - B) / e),
        (N = function (ft) {
          var X = ft * E,
            st = Jv(B),
            ot = (g / (r * L)) * (st * Iut(e * X + B) - zut(B))
          return [h + ot * S, d + ot * M, (g * st) / Jv(e * X + B)]
        })
    }
    return (N.duration = (E * 1e3 * e) / Math.SQRT2), N
  }
  return (
    (l.rho = function (u) {
      var f = Math.max(0.001, +u),
        h = f * f,
        d = h * h
      return t(f, h, d)
    }),
    l
  )
})(Math.SQRT2, 2, 4)
var is = 0,
  Ys = 0,
  Gs = 0,
  fb = 1e3,
  uc,
  Zs,
  fc = 0,
  no = 0,
  Ic = 0,
  wa = typeof performance == 'object' && performance.now ? performance : Date,
  hb =
    typeof window == 'object' && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17)
        }
function Bh() {
  return no || (hb(qut), (no = wa.now() + Ic))
}
function qut() {
  no = 0
}
function hc() {
  this._call = this._time = this._next = null
}
hc.prototype = Wh.prototype = {
  constructor: hc,
  restart: function (t, e, r) {
    if (typeof t != 'function') throw new TypeError('callback is not a function')
    ;(r = (r == null ? Bh() : +r) + (e == null ? 0 : +e)),
      !this._next && Zs !== this && (Zs ? (Zs._next = this) : (uc = this), (Zs = this)),
      (this._call = t),
      (this._time = r),
      Bf()
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Bf())
  },
}
function Wh(t, e, r) {
  var o = new hc()
  return o.restart(t, e, r), o
}
function Hut() {
  Bh(), ++is
  for (var t = uc, e; t; ) (e = no - t._time) >= 0 && t._call.call(void 0, e), (t = t._next)
  --is
}
function Qv() {
  ;(no = (fc = wa.now()) + Ic), (is = Ys = 0)
  try {
    Hut()
  } finally {
    ;(is = 0), Wut(), (no = 0)
  }
}
function But() {
  var t = wa.now(),
    e = t - fc
  e > fb && ((Ic -= e), (fc = t))
}
function Wut() {
  for (var t, e = uc, r, o = 1 / 0; e; )
    e._call
      ? (o > e._time && (o = e._time), (t = e), (e = e._next))
      : ((r = e._next), (e._next = null), (e = t ? (t._next = r) : (uc = r)))
  ;(Zs = t), Bf(o)
}
function Bf(t) {
  if (!is) {
    Ys && (Ys = clearTimeout(Ys))
    var e = t - no
    e > 24
      ? (t < 1 / 0 && (Ys = setTimeout(Qv, t - wa.now() - Ic)), Gs && (Gs = clearInterval(Gs)))
      : (Gs || ((fc = wa.now()), (Gs = setInterval(But, fb))), (is = 1), hb(Qv))
  }
}
function tm(t, e, r) {
  var o = new hc()
  return (
    (e = e == null ? 0 : +e),
    o.restart(
      (l) => {
        o.stop(), t(l + e)
      },
      e,
      r,
    ),
    o
  )
}
var Uut = Pa('start', 'end', 'cancel', 'interrupt'),
  jut = [],
  db = 0,
  em = 1,
  Wf = 2,
  Fl = 3,
  nm = 4,
  Uf = 5,
  ql = 6
function Fc(t, e, r, o, l, u) {
  var f = t.__transition
  if (!f) t.__transition = {}
  else if (r in f) return
  Gut(t, r, {
    name: e,
    index: o,
    group: l,
    on: Uut,
    tween: jut,
    time: u.time,
    delay: u.delay,
    duration: u.duration,
    ease: u.ease,
    timer: null,
    state: db,
  })
}
function Uh(t, e) {
  var r = ir(t, e)
  if (r.state > db) throw new Error('too late; already scheduled')
  return r
}
function br(t, e) {
  var r = ir(t, e)
  if (r.state > Fl) throw new Error('too late; already running')
  return r
}
function ir(t, e) {
  var r = t.__transition
  if (!r || !(r = r[e])) throw new Error('transition not found')
  return r
}
function Gut(t, e, r) {
  var o = t.__transition,
    l
  ;(o[e] = r), (r.timer = Wh(u, 0, r.time))
  function u(g) {
    ;(r.state = em), r.timer.restart(f, r.delay, r.time), r.delay <= g && f(g - r.delay)
  }
  function f(g) {
    var v, b, x, S
    if (r.state !== em) return d()
    for (v in o)
      if (((S = o[v]), S.name === r.name)) {
        if (S.state === Fl) return tm(f)
        S.state === nm
          ? ((S.state = ql), S.timer.stop(), S.on.call('interrupt', t, t.__data__, S.index, S.group), delete o[v])
          : +v < e &&
            ((S.state = ql), S.timer.stop(), S.on.call('cancel', t, t.__data__, S.index, S.group), delete o[v])
      }
    if (
      (tm(function () {
        r.state === Fl && ((r.state = nm), r.timer.restart(h, r.delay, r.time), h(g))
      }),
      (r.state = Wf),
      r.on.call('start', t, t.__data__, r.index, r.group),
      r.state === Wf)
    ) {
      for (r.state = Fl, l = new Array((x = r.tween.length)), v = 0, b = -1; v < x; ++v)
        (S = r.tween[v].value.call(t, t.__data__, r.index, r.group)) && (l[++b] = S)
      l.length = b + 1
    }
  }
  function h(g) {
    for (
      var v = g < r.duration ? r.ease.call(null, g / r.duration) : (r.timer.restart(d), (r.state = Uf), 1),
        b = -1,
        x = l.length;
      ++b < x;

    )
      l[b].call(t, v)
    r.state === Uf && (r.on.call('end', t, t.__data__, r.index, r.group), d())
  }
  function d() {
    ;(r.state = ql), r.timer.stop(), delete o[e]
    for (var g in o) return
    delete t.__transition
  }
}
function Hl(t, e) {
  var r = t.__transition,
    o,
    l,
    u = !0,
    f
  if (r) {
    e = e == null ? null : e + ''
    for (f in r) {
      if ((o = r[f]).name !== e) {
        u = !1
        continue
      }
      ;(l = o.state > Wf && o.state < Uf),
        (o.state = ql),
        o.timer.stop(),
        o.on.call(l ? 'interrupt' : 'cancel', t, t.__data__, o.index, o.group),
        delete r[f]
    }
    u && delete t.__transition
  }
}
function Vut(t) {
  return this.each(function () {
    Hl(this, t)
  })
}
function Kut(t, e) {
  var r, o
  return function () {
    var l = br(this, t),
      u = l.tween
    if (u !== r) {
      o = r = u
      for (var f = 0, h = o.length; f < h; ++f)
        if (o[f].name === e) {
          ;(o = o.slice()), o.splice(f, 1)
          break
        }
    }
    l.tween = o
  }
}
function Xut(t, e, r) {
  var o, l
  if (typeof r != 'function') throw new Error()
  return function () {
    var u = br(this, t),
      f = u.tween
    if (f !== o) {
      l = (o = f).slice()
      for (var h = { name: e, value: r }, d = 0, g = l.length; d < g; ++d)
        if (l[d].name === e) {
          l[d] = h
          break
        }
      d === g && l.push(h)
    }
    u.tween = l
  }
}
function Yut(t, e) {
  var r = this._id
  if (((t += ''), arguments.length < 2)) {
    for (var o = ir(this.node(), r).tween, l = 0, u = o.length, f; l < u; ++l) if ((f = o[l]).name === t) return f.value
    return null
  }
  return this.each((e == null ? Kut : Xut)(r, t, e))
}
function jh(t, e, r) {
  var o = t._id
  return (
    t.each(function () {
      var l = br(this, o)
      ;(l.value || (l.value = {}))[e] = r.apply(this, arguments)
    }),
    function (l) {
      return ir(l, o).value[e]
    }
  )
}
function pb(t, e) {
  var r
  return (typeof e == 'number' ? vi : e instanceof ba ? Yv : (r = ba(e)) ? ((e = r), Yv) : Nut)(t, e)
}
function Zut(t) {
  return function () {
    this.removeAttribute(t)
  }
}
function Jut(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local)
  }
}
function Qut(t, e, r) {
  var o,
    l = r + '',
    u
  return function () {
    var f = this.getAttribute(t)
    return f === l ? null : f === o ? u : (u = e((o = f), r))
  }
}
function tft(t, e, r) {
  var o,
    l = r + '',
    u
  return function () {
    var f = this.getAttributeNS(t.space, t.local)
    return f === l ? null : f === o ? u : (u = e((o = f), r))
  }
}
function eft(t, e, r) {
  var o, l, u
  return function () {
    var f,
      h = r(this),
      d
    return h == null
      ? void this.removeAttribute(t)
      : ((f = this.getAttribute(t)),
        (d = h + ''),
        f === d ? null : f === o && d === l ? u : ((l = d), (u = e((o = f), h))))
  }
}
function nft(t, e, r) {
  var o, l, u
  return function () {
    var f,
      h = r(this),
      d
    return h == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((f = this.getAttributeNS(t.space, t.local)),
        (d = h + ''),
        f === d ? null : f === o && d === l ? u : ((l = d), (u = e((o = f), h))))
  }
}
function rft(t, e) {
  var r = zc(t),
    o = r === 'transform' ? Dut : pb
  return this.attrTween(
    t,
    typeof e == 'function'
      ? (r.local ? nft : eft)(r, o, jh(this, 'attr.' + t, e))
      : e == null
        ? (r.local ? Jut : Zut)(r)
        : (r.local ? tft : Qut)(r, o, e),
  )
}
function ift(t, e) {
  return function (r) {
    this.setAttribute(t, e.call(this, r))
  }
}
function oft(t, e) {
  return function (r) {
    this.setAttributeNS(t.space, t.local, e.call(this, r))
  }
}
function sft(t, e) {
  var r, o
  function l() {
    var u = e.apply(this, arguments)
    return u !== o && (r = (o = u) && oft(t, u)), r
  }
  return (l._value = e), l
}
function aft(t, e) {
  var r, o
  function l() {
    var u = e.apply(this, arguments)
    return u !== o && (r = (o = u) && ift(t, u)), r
  }
  return (l._value = e), l
}
function lft(t, e) {
  var r = 'attr.' + t
  if (arguments.length < 2) return (r = this.tween(r)) && r._value
  if (e == null) return this.tween(r, null)
  if (typeof e != 'function') throw new Error()
  var o = zc(t)
  return this.tween(r, (o.local ? sft : aft)(o, e))
}
function cft(t, e) {
  return function () {
    Uh(this, t).delay = +e.apply(this, arguments)
  }
}
function uft(t, e) {
  return (
    (e = +e),
    function () {
      Uh(this, t).delay = e
    }
  )
}
function fft(t) {
  var e = this._id
  return arguments.length ? this.each((typeof t == 'function' ? cft : uft)(e, t)) : ir(this.node(), e).delay
}
function hft(t, e) {
  return function () {
    br(this, t).duration = +e.apply(this, arguments)
  }
}
function dft(t, e) {
  return (
    (e = +e),
    function () {
      br(this, t).duration = e
    }
  )
}
function pft(t) {
  var e = this._id
  return arguments.length ? this.each((typeof t == 'function' ? hft : dft)(e, t)) : ir(this.node(), e).duration
}
function gft(t, e) {
  if (typeof e != 'function') throw new Error()
  return function () {
    br(this, t).ease = e
  }
}
function vft(t) {
  var e = this._id
  return arguments.length ? this.each(gft(e, t)) : ir(this.node(), e).ease
}
function mft(t, e) {
  return function () {
    var r = e.apply(this, arguments)
    if (typeof r != 'function') throw new Error()
    br(this, t).ease = r
  }
}
function yft(t) {
  if (typeof t != 'function') throw new Error()
  return this.each(mft(this._id, t))
}
function bft(t) {
  typeof t != 'function' && (t = Vy(t))
  for (var e = this._groups, r = e.length, o = new Array(r), l = 0; l < r; ++l)
    for (var u = e[l], f = u.length, h = (o[l] = []), d, g = 0; g < f; ++g)
      (d = u[g]) && t.call(d, d.__data__, g, u) && h.push(d)
  return new Gr(o, this._parents, this._name, this._id)
}
function wft(t) {
  if (t._id !== this._id) throw new Error()
  for (
    var e = this._groups, r = t._groups, o = e.length, l = r.length, u = Math.min(o, l), f = new Array(o), h = 0;
    h < u;
    ++h
  )
    for (var d = e[h], g = r[h], v = d.length, b = (f[h] = new Array(v)), x, S = 0; S < v; ++S)
      (x = d[S] || g[S]) && (b[S] = x)
  for (; h < o; ++h) f[h] = e[h]
  return new Gr(f, this._parents, this._name, this._id)
}
function xft(t) {
  return (t + '')
    .trim()
    .split(/^|\s+/)
    .every(function (e) {
      var r = e.indexOf('.')
      return r >= 0 && (e = e.slice(0, r)), !e || e === 'start'
    })
}
function _ft(t, e, r) {
  var o,
    l,
    u = xft(e) ? Uh : br
  return function () {
    var f = u(this, t),
      h = f.on
    h !== o && (l = (o = h).copy()).on(e, r), (f.on = l)
  }
}
function Sft(t, e) {
  var r = this._id
  return arguments.length < 2 ? ir(this.node(), r).on.on(t) : this.each(_ft(r, t, e))
}
function kft(t) {
  return function () {
    var e = this.parentNode
    for (var r in this.__transition) if (+r !== t) return
    e && e.removeChild(this)
  }
}
function Cft() {
  return this.on('end.remove', kft(this._id))
}
function Tft(t) {
  var e = this._name,
    r = this._id
  typeof t != 'function' && (t = Fh(t))
  for (var o = this._groups, l = o.length, u = new Array(l), f = 0; f < l; ++f)
    for (var h = o[f], d = h.length, g = (u[f] = new Array(d)), v, b, x = 0; x < d; ++x)
      (v = h[x]) &&
        (b = t.call(v, v.__data__, x, h)) &&
        ('__data__' in v && (b.__data__ = v.__data__), (g[x] = b), Fc(g[x], e, r, x, g, ir(v, r)))
  return new Gr(u, this._parents, e, r)
}
function Eft(t) {
  var e = this._name,
    r = this._id
  typeof t != 'function' && (t = Gy(t))
  for (var o = this._groups, l = o.length, u = [], f = [], h = 0; h < l; ++h)
    for (var d = o[h], g = d.length, v, b = 0; b < g; ++b)
      if ((v = d[b])) {
        for (var x = t.call(v, v.__data__, b, d), S, M = ir(v, r), T = 0, N = x.length; T < N; ++T)
          (S = x[T]) && Fc(S, e, r, T, x, M)
        u.push(x), f.push(v)
      }
  return new Gr(u, f, e, r)
}
var Lft = Na.prototype.constructor
function Aft() {
  return new Lft(this._groups, this._parents)
}
function Mft(t, e) {
  var r, o, l
  return function () {
    var u = rs(this, t),
      f = (this.style.removeProperty(t), rs(this, t))
    return u === f ? null : u === r && f === o ? l : (l = e((r = u), (o = f)))
  }
}
function gb(t) {
  return function () {
    this.style.removeProperty(t)
  }
}
function Nft(t, e, r) {
  var o,
    l = r + '',
    u
  return function () {
    var f = rs(this, t)
    return f === l ? null : f === o ? u : (u = e((o = f), r))
  }
}
function Pft(t, e, r) {
  var o, l, u
  return function () {
    var f = rs(this, t),
      h = r(this),
      d = h + ''
    return (
      h == null && (d = h = (this.style.removeProperty(t), rs(this, t))),
      f === d ? null : f === o && d === l ? u : ((l = d), (u = e((o = f), h)))
    )
  }
}
function Oft(t, e) {
  var r,
    o,
    l,
    u = 'style.' + e,
    f = 'end.' + u,
    h
  return function () {
    var d = br(this, t),
      g = d.on,
      v = d.value[u] == null ? h || (h = gb(e)) : void 0
    ;(g !== r || l !== v) && (o = (r = g).copy()).on(f, (l = v)), (d.on = o)
  }
}
function $ft(t, e, r) {
  var o = (t += '') == 'transform' ? $ut : pb
  return e == null
    ? this.styleTween(t, Mft(t, o)).on('end.style.' + t, gb(t))
    : typeof e == 'function'
      ? this.styleTween(t, Pft(t, o, jh(this, 'style.' + t, e))).each(Oft(this._id, t))
      : this.styleTween(t, Nft(t, o, e), r).on('end.style.' + t, null)
}
function Dft(t, e, r) {
  return function (o) {
    this.style.setProperty(t, e.call(this, o), r)
  }
}
function Rft(t, e, r) {
  var o, l
  function u() {
    var f = e.apply(this, arguments)
    return f !== l && (o = (l = f) && Dft(t, f, r)), o
  }
  return (u._value = e), u
}
function zft(t, e, r) {
  var o = 'style.' + (t += '')
  if (arguments.length < 2) return (o = this.tween(o)) && o._value
  if (e == null) return this.tween(o, null)
  if (typeof e != 'function') throw new Error()
  return this.tween(o, Rft(t, e, r ?? ''))
}
function Ift(t) {
  return function () {
    this.textContent = t
  }
}
function Fft(t) {
  return function () {
    var e = t(this)
    this.textContent = e ?? ''
  }
}
function qft(t) {
  return this.tween('text', typeof t == 'function' ? Fft(jh(this, 'text', t)) : Ift(t == null ? '' : t + ''))
}
function Hft(t) {
  return function (e) {
    this.textContent = t.call(this, e)
  }
}
function Bft(t) {
  var e, r
  function o() {
    var l = t.apply(this, arguments)
    return l !== r && (e = (r = l) && Hft(l)), e
  }
  return (o._value = t), o
}
function Wft(t) {
  var e = 'text'
  if (arguments.length < 1) return (e = this.tween(e)) && e._value
  if (t == null) return this.tween(e, null)
  if (typeof t != 'function') throw new Error()
  return this.tween(e, Bft(t))
}
function Uft() {
  for (var t = this._name, e = this._id, r = vb(), o = this._groups, l = o.length, u = 0; u < l; ++u)
    for (var f = o[u], h = f.length, d, g = 0; g < h; ++g)
      if ((d = f[g])) {
        var v = ir(d, e)
        Fc(d, t, r, g, f, { time: v.time + v.delay + v.duration, delay: 0, duration: v.duration, ease: v.ease })
      }
  return new Gr(o, this._parents, t, r)
}
function jft() {
  var t,
    e,
    r = this,
    o = r._id,
    l = r.size()
  return new Promise(function (u, f) {
    var h = { value: f },
      d = {
        value: function () {
          --l === 0 && u()
        },
      }
    r.each(function () {
      var g = br(this, o),
        v = g.on
      v !== t && ((e = (t = v).copy()), e._.cancel.push(h), e._.interrupt.push(h), e._.end.push(d)), (g.on = e)
    }),
      l === 0 && u()
  })
}
var Gft = 0
function Gr(t, e, r, o) {
  ;(this._groups = t), (this._parents = e), (this._name = r), (this._id = o)
}
function vb() {
  return ++Gft
}
var Pr = Na.prototype
Gr.prototype = {
  constructor: Gr,
  select: Tft,
  selectAll: Eft,
  selectChild: Pr.selectChild,
  selectChildren: Pr.selectChildren,
  filter: bft,
  merge: wft,
  selection: Aft,
  transition: Uft,
  call: Pr.call,
  nodes: Pr.nodes,
  node: Pr.node,
  size: Pr.size,
  empty: Pr.empty,
  each: Pr.each,
  on: Sft,
  attr: rft,
  attrTween: lft,
  style: $ft,
  styleTween: zft,
  text: qft,
  textTween: Wft,
  remove: Cft,
  tween: Yut,
  delay: fft,
  duration: pft,
  ease: vft,
  easeVarying: yft,
  end: jft,
  [Symbol.iterator]: Pr[Symbol.iterator],
}
function Vft(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
}
var Kft = { time: null, delay: 0, duration: 250, ease: Vft }
function Xft(t, e) {
  for (var r; !(r = t.__transition) || !(r = r[e]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`)
  return r
}
function Yft(t) {
  var e, r
  t instanceof Gr
    ? ((e = t._id), (t = t._name))
    : ((e = vb()), ((r = Kft).time = Bh()), (t = t == null ? null : t + ''))
  for (var o = this._groups, l = o.length, u = 0; u < l; ++u)
    for (var f = o[u], h = f.length, d, g = 0; g < h; ++g) (d = f[g]) && Fc(d, t, e, g, f, r || Xft(d, e))
  return new Gr(o, this._parents, t, e)
}
Na.prototype.interrupt = Vut
Na.prototype.transition = Yft
const Ll = (t) => () => t
function Zft(t, { sourceEvent: e, target: r, transform: o, dispatch: l }) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: l },
  })
}
function Rr(t, e, r) {
  ;(this.k = t), (this.x = e), (this.y = r)
}
Rr.prototype = {
  constructor: Rr,
  scale: function (t) {
    return t === 1 ? this : new Rr(this.k * t, this.x, this.y)
  },
  translate: function (t, e) {
    return (t === 0) & (e === 0) ? this : new Rr(this.k, this.x + this.k * t, this.y + this.k * e)
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y]
  },
  applyX: function (t) {
    return t * this.k + this.x
  },
  applyY: function (t) {
    return t * this.k + this.y
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
  },
  invertX: function (t) {
    return (t - this.x) / this.k
  },
  invertY: function (t) {
    return (t - this.y) / this.k
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
  },
  toString: function () {
    return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')'
  },
}
var Gh = new Rr(1, 0, 0)
Rr.prototype
function ef(t) {
  t.stopImmediatePropagation()
}
function Vs(t) {
  t.preventDefault(), t.stopImmediatePropagation()
}
function Jft(t) {
  return (!t.ctrlKey || t.type === 'wheel') && !t.button
}
function Qft() {
  var t = this
  return t instanceof SVGElement
    ? ((t = t.ownerSVGElement || t),
      t.hasAttribute('viewBox')
        ? ((t = t.viewBox.baseVal),
          [
            [t.x, t.y],
            [t.x + t.width, t.y + t.height],
          ])
        : [
            [0, 0],
            [t.width.baseVal.value, t.height.baseVal.value],
          ])
    : [
        [0, 0],
        [t.clientWidth, t.clientHeight],
      ]
}
function rm() {
  return this.__zoom || Gh
}
function tht(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 0.002) * (t.ctrlKey ? 10 : 1)
}
function eht() {
  return navigator.maxTouchPoints || 'ontouchstart' in this
}
function nht(t, e, r) {
  var o = t.invertX(e[0][0]) - r[0][0],
    l = t.invertX(e[1][0]) - r[1][0],
    u = t.invertY(e[0][1]) - r[0][1],
    f = t.invertY(e[1][1]) - r[1][1]
  return t.translate(
    l > o ? (o + l) / 2 : Math.min(0, o) || Math.max(0, l),
    f > u ? (u + f) / 2 : Math.min(0, u) || Math.max(0, f),
  )
}
function rht() {
  var t = Jft,
    e = Qft,
    r = nht,
    o = tht,
    l = eht,
    u = [0, 1 / 0],
    f = [
      [-1 / 0, -1 / 0],
      [1 / 0, 1 / 0],
    ],
    h = 250,
    d = Fut,
    g = Pa('start', 'zoom', 'end'),
    v,
    b,
    x,
    S = 500,
    M = 150,
    T = 0,
    N = 10
  function E(R) {
    R.property('__zoom', rm)
      .on('wheel.zoom', X, { passive: !1 })
      .on('mousedown.zoom', st)
      .on('dblclick.zoom', ot)
      .filter(l)
      .on('touchstart.zoom', kt)
      .on('touchmove.zoom', pt)
      .on('touchend.zoom touchcancel.zoom', V)
      .style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
  }
  ;(E.transform = function (R, k, H, W) {
    var J = R.selection ? R.selection() : R
    J.property('__zoom', rm),
      R !== J
        ? B(R, k, H, W)
        : J.interrupt().each(function () {
            tt(this, arguments)
              .event(W)
              .start()
              .zoom(null, typeof k == 'function' ? k.apply(this, arguments) : k)
              .end()
          })
  }),
    (E.scaleBy = function (R, k, H, W) {
      E.scaleTo(
        R,
        function () {
          var J = this.__zoom.k,
            wt = typeof k == 'function' ? k.apply(this, arguments) : k
          return J * wt
        },
        H,
        W,
      )
    }),
    (E.scaleTo = function (R, k, H, W) {
      E.transform(
        R,
        function () {
          var J = e.apply(this, arguments),
            wt = this.__zoom,
            Tt = H == null ? A(J) : typeof H == 'function' ? H.apply(this, arguments) : H,
            zt = wt.invert(Tt),
            It = typeof k == 'function' ? k.apply(this, arguments) : k
          return r(F(L(wt, It), Tt, zt), J, f)
        },
        H,
        W,
      )
    }),
    (E.translateBy = function (R, k, H, W) {
      E.transform(
        R,
        function () {
          return r(
            this.__zoom.translate(
              typeof k == 'function' ? k.apply(this, arguments) : k,
              typeof H == 'function' ? H.apply(this, arguments) : H,
            ),
            e.apply(this, arguments),
            f,
          )
        },
        null,
        W,
      )
    }),
    (E.translateTo = function (R, k, H, W, J) {
      E.transform(
        R,
        function () {
          var wt = e.apply(this, arguments),
            Tt = this.__zoom,
            zt = W == null ? A(wt) : typeof W == 'function' ? W.apply(this, arguments) : W
          return r(
            Gh.translate(zt[0], zt[1])
              .scale(Tt.k)
              .translate(
                typeof k == 'function' ? -k.apply(this, arguments) : -k,
                typeof H == 'function' ? -H.apply(this, arguments) : -H,
              ),
            wt,
            f,
          )
        },
        W,
        J,
      )
    })
  function L(R, k) {
    return (k = Math.max(u[0], Math.min(u[1], k))), k === R.k ? R : new Rr(k, R.x, R.y)
  }
  function F(R, k, H) {
    var W = k[0] - H[0] * R.k,
      J = k[1] - H[1] * R.k
    return W === R.x && J === R.y ? R : new Rr(R.k, W, J)
  }
  function A(R) {
    return [(+R[0][0] + +R[1][0]) / 2, (+R[0][1] + +R[1][1]) / 2]
  }
  function B(R, k, H, W) {
    R.on('start.zoom', function () {
      tt(this, arguments).event(W).start()
    })
      .on('interrupt.zoom end.zoom', function () {
        tt(this, arguments).event(W).end()
      })
      .tween('zoom', function () {
        var J = this,
          wt = arguments,
          Tt = tt(J, wt).event(W),
          zt = e.apply(J, wt),
          It = H == null ? A(zt) : typeof H == 'function' ? H.apply(J, wt) : H,
          Gt = Math.max(zt[1][0] - zt[0][0], zt[1][1] - zt[0][1]),
          Vt = J.__zoom,
          Jt = typeof k == 'function' ? k.apply(J, wt) : k,
          _t = d(Vt.invert(It).concat(Gt / Vt.k), Jt.invert(It).concat(Gt / Jt.k))
        return function (U) {
          if (U === 1) U = Jt
          else {
            var et = _t(U),
              it = Gt / et[2]
            U = new Rr(it, It[0] - et[0] * it, It[1] - et[1] * it)
          }
          Tt.zoom(null, U)
        }
      })
  }
  function tt(R, k, H) {
    return (!H && R.__zooming) || new ft(R, k)
  }
  function ft(R, k) {
    ;(this.that = R),
      (this.args = k),
      (this.active = 0),
      (this.sourceEvent = null),
      (this.extent = e.apply(R, k)),
      (this.taps = 0)
  }
  ft.prototype = {
    event: function (R) {
      return R && (this.sourceEvent = R), this
    },
    start: function () {
      return ++this.active === 1 && ((this.that.__zooming = this), this.emit('start')), this
    },
    zoom: function (R, k) {
      return (
        this.mouse && R !== 'mouse' && (this.mouse[1] = k.invert(this.mouse[0])),
        this.touch0 && R !== 'touch' && (this.touch0[1] = k.invert(this.touch0[0])),
        this.touch1 && R !== 'touch' && (this.touch1[1] = k.invert(this.touch1[0])),
        (this.that.__zoom = k),
        this.emit('zoom'),
        this
      )
    },
    end: function () {
      return --this.active === 0 && (delete this.that.__zooming, this.emit('end')), this
    },
    emit: function (R) {
      var k = Cn(this.that).datum()
      g.call(
        R,
        this.that,
        new Zft(R, { sourceEvent: this.sourceEvent, target: E, type: R, transform: this.that.__zoom, dispatch: g }),
        k,
      )
    },
  }
  function X(R, ...k) {
    if (!t.apply(this, arguments)) return
    var H = tt(this, k).event(R),
      W = this.__zoom,
      J = Math.max(u[0], Math.min(u[1], W.k * Math.pow(2, o.apply(this, arguments)))),
      wt = $r(R)
    if (H.wheel)
      (H.mouse[0][0] !== wt[0] || H.mouse[0][1] !== wt[1]) && (H.mouse[1] = W.invert((H.mouse[0] = wt))),
        clearTimeout(H.wheel)
    else {
      if (W.k === J) return
      ;(H.mouse = [wt, W.invert(wt)]), Hl(this), H.start()
    }
    Vs(R), (H.wheel = setTimeout(Tt, M)), H.zoom('mouse', r(F(L(W, J), H.mouse[0], H.mouse[1]), H.extent, f))
    function Tt() {
      ;(H.wheel = null), H.end()
    }
  }
  function st(R, ...k) {
    if (x || !t.apply(this, arguments)) return
    var H = R.currentTarget,
      W = tt(this, k, !0).event(R),
      J = Cn(R.view).on('mousemove.zoom', It, !0).on('mouseup.zoom', Gt, !0),
      wt = $r(R, H),
      Tt = R.clientX,
      zt = R.clientY
    rb(R.view), ef(R), (W.mouse = [wt, this.__zoom.invert(wt)]), Hl(this), W.start()
    function It(Vt) {
      if ((Vs(Vt), !W.moved)) {
        var Jt = Vt.clientX - Tt,
          _t = Vt.clientY - zt
        W.moved = Jt * Jt + _t * _t > T
      }
      W.event(Vt).zoom('mouse', r(F(W.that.__zoom, (W.mouse[0] = $r(Vt, H)), W.mouse[1]), W.extent, f))
    }
    function Gt(Vt) {
      J.on('mousemove.zoom mouseup.zoom', null), ib(Vt.view, W.moved), Vs(Vt), W.event(Vt).end()
    }
  }
  function ot(R, ...k) {
    if (t.apply(this, arguments)) {
      var H = this.__zoom,
        W = $r(R.changedTouches ? R.changedTouches[0] : R, this),
        J = H.invert(W),
        wt = H.k * (R.shiftKey ? 0.5 : 2),
        Tt = r(F(L(H, wt), W, J), e.apply(this, k), f)
      Vs(R), h > 0 ? Cn(this).transition().duration(h).call(B, Tt, W, R) : Cn(this).call(E.transform, Tt, W, R)
    }
  }
  function kt(R, ...k) {
    if (t.apply(this, arguments)) {
      var H = R.touches,
        W = H.length,
        J = tt(this, k, R.changedTouches.length === W).event(R),
        wt,
        Tt,
        zt,
        It
      for (ef(R), Tt = 0; Tt < W; ++Tt)
        (zt = H[Tt]),
          (It = $r(zt, this)),
          (It = [It, this.__zoom.invert(It), zt.identifier]),
          J.touch0
            ? !J.touch1 && J.touch0[2] !== It[2] && ((J.touch1 = It), (J.taps = 0))
            : ((J.touch0 = It), (wt = !0), (J.taps = 1 + !!v))
      v && (v = clearTimeout(v)),
        wt &&
          (J.taps < 2 &&
            ((b = It[0]),
            (v = setTimeout(function () {
              v = null
            }, S))),
          Hl(this),
          J.start())
    }
  }
  function pt(R, ...k) {
    if (this.__zooming) {
      var H = tt(this, k).event(R),
        W = R.changedTouches,
        J = W.length,
        wt,
        Tt,
        zt,
        It
      for (Vs(R), wt = 0; wt < J; ++wt)
        (Tt = W[wt]),
          (zt = $r(Tt, this)),
          H.touch0 && H.touch0[2] === Tt.identifier
            ? (H.touch0[0] = zt)
            : H.touch1 && H.touch1[2] === Tt.identifier && (H.touch1[0] = zt)
      if (((Tt = H.that.__zoom), H.touch1)) {
        var Gt = H.touch0[0],
          Vt = H.touch0[1],
          Jt = H.touch1[0],
          _t = H.touch1[1],
          U = (U = Jt[0] - Gt[0]) * U + (U = Jt[1] - Gt[1]) * U,
          et = (et = _t[0] - Vt[0]) * et + (et = _t[1] - Vt[1]) * et
        ;(Tt = L(Tt, Math.sqrt(U / et))),
          (zt = [(Gt[0] + Jt[0]) / 2, (Gt[1] + Jt[1]) / 2]),
          (It = [(Vt[0] + _t[0]) / 2, (Vt[1] + _t[1]) / 2])
      } else if (H.touch0) (zt = H.touch0[0]), (It = H.touch0[1])
      else return
      H.zoom('touch', r(F(Tt, zt, It), H.extent, f))
    }
  }
  function V(R, ...k) {
    if (this.__zooming) {
      var H = tt(this, k).event(R),
        W = R.changedTouches,
        J = W.length,
        wt,
        Tt
      for (
        ef(R),
          x && clearTimeout(x),
          x = setTimeout(function () {
            x = null
          }, S),
          wt = 0;
        wt < J;
        ++wt
      )
        (Tt = W[wt]),
          H.touch0 && H.touch0[2] === Tt.identifier
            ? delete H.touch0
            : H.touch1 && H.touch1[2] === Tt.identifier && delete H.touch1
      if ((H.touch1 && !H.touch0 && ((H.touch0 = H.touch1), delete H.touch1), H.touch0))
        H.touch0[1] = this.__zoom.invert(H.touch0[0])
      else if ((H.end(), H.taps === 2 && ((Tt = $r(Tt, this)), Math.hypot(b[0] - Tt[0], b[1] - Tt[1]) < N))) {
        var zt = Cn(this).on('dblclick.zoom')
        zt && zt.apply(this, arguments)
      }
    }
  }
  return (
    (E.wheelDelta = function (R) {
      return arguments.length ? ((o = typeof R == 'function' ? R : Ll(+R)), E) : o
    }),
    (E.filter = function (R) {
      return arguments.length ? ((t = typeof R == 'function' ? R : Ll(!!R)), E) : t
    }),
    (E.touchable = function (R) {
      return arguments.length ? ((l = typeof R == 'function' ? R : Ll(!!R)), E) : l
    }),
    (E.extent = function (R) {
      return arguments.length
        ? ((e =
            typeof R == 'function'
              ? R
              : Ll([
                  [+R[0][0], +R[0][1]],
                  [+R[1][0], +R[1][1]],
                ])),
          E)
        : e
    }),
    (E.scaleExtent = function (R) {
      return arguments.length ? ((u[0] = +R[0]), (u[1] = +R[1]), E) : [u[0], u[1]]
    }),
    (E.translateExtent = function (R) {
      return arguments.length
        ? ((f[0][0] = +R[0][0]), (f[1][0] = +R[1][0]), (f[0][1] = +R[0][1]), (f[1][1] = +R[1][1]), E)
        : [
            [f[0][0], f[0][1]],
            [f[1][0], f[1][1]],
          ]
    }),
    (E.constrain = function (R) {
      return arguments.length ? ((r = R), E) : r
    }),
    (E.duration = function (R) {
      return arguments.length ? ((h = +R), E) : h
    }),
    (E.interpolate = function (R) {
      return arguments.length ? ((d = R), E) : d
    }),
    (E.on = function () {
      var R = g.on.apply(g, arguments)
      return R === g ? E : R
    }),
    (E.clickDistance = function (R) {
      return arguments.length ? ((T = (R = +R) * R), E) : Math.sqrt(T)
    }),
    (E.tapDistance = function (R) {
      return arguments.length ? ((N = +R), E) : N
    }),
    E
  )
}
function iht(t) {
  const e = +this._x.call(null, t),
    r = +this._y.call(null, t)
  return mb(this.cover(e, r), e, r, t)
}
function mb(t, e, r, o) {
  if (isNaN(e) || isNaN(r)) return t
  var l,
    u = t._root,
    f = { data: o },
    h = t._x0,
    d = t._y0,
    g = t._x1,
    v = t._y1,
    b,
    x,
    S,
    M,
    T,
    N,
    E,
    L
  if (!u) return (t._root = f), t
  for (; u.length; )
    if (
      ((T = e >= (b = (h + g) / 2)) ? (h = b) : (g = b),
      (N = r >= (x = (d + v) / 2)) ? (d = x) : (v = x),
      (l = u),
      !(u = u[(E = (N << 1) | T)]))
    )
      return (l[E] = f), t
  if (((S = +t._x.call(null, u.data)), (M = +t._y.call(null, u.data)), e === S && r === M))
    return (f.next = u), l ? (l[E] = f) : (t._root = f), t
  do
    (l = l ? (l[E] = new Array(4)) : (t._root = new Array(4))),
      (T = e >= (b = (h + g) / 2)) ? (h = b) : (g = b),
      (N = r >= (x = (d + v) / 2)) ? (d = x) : (v = x)
  while ((E = (N << 1) | T) === (L = ((M >= x) << 1) | (S >= b)))
  return (l[L] = u), (l[E] = f), t
}
function oht(t) {
  var e,
    r,
    o = t.length,
    l,
    u,
    f = new Array(o),
    h = new Array(o),
    d = 1 / 0,
    g = 1 / 0,
    v = -1 / 0,
    b = -1 / 0
  for (r = 0; r < o; ++r)
    isNaN((l = +this._x.call(null, (e = t[r])))) ||
      isNaN((u = +this._y.call(null, e))) ||
      ((f[r] = l), (h[r] = u), l < d && (d = l), l > v && (v = l), u < g && (g = u), u > b && (b = u))
  if (d > v || g > b) return this
  for (this.cover(d, g).cover(v, b), r = 0; r < o; ++r) mb(this, f[r], h[r], t[r])
  return this
}
function sht(t, e) {
  if (isNaN((t = +t)) || isNaN((e = +e))) return this
  var r = this._x0,
    o = this._y0,
    l = this._x1,
    u = this._y1
  if (isNaN(r)) (l = (r = Math.floor(t)) + 1), (u = (o = Math.floor(e)) + 1)
  else {
    for (var f = l - r || 1, h = this._root, d, g; r > t || t >= l || o > e || e >= u; )
      switch (((g = ((e < o) << 1) | (t < r)), (d = new Array(4)), (d[g] = h), (h = d), (f *= 2), g)) {
        case 0:
          ;(l = r + f), (u = o + f)
          break
        case 1:
          ;(r = l - f), (u = o + f)
          break
        case 2:
          ;(l = r + f), (o = u - f)
          break
        case 3:
          ;(r = l - f), (o = u - f)
          break
      }
    this._root && this._root.length && (this._root = h)
  }
  return (this._x0 = r), (this._y0 = o), (this._x1 = l), (this._y1 = u), this
}
function aht() {
  var t = []
  return (
    this.visit(function (e) {
      if (!e.length)
        do t.push(e.data)
        while ((e = e.next))
    }),
    t
  )
}
function lht(t) {
  return arguments.length
    ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1])
    : isNaN(this._x0)
      ? void 0
      : [
          [this._x0, this._y0],
          [this._x1, this._y1],
        ]
}
function gn(t, e, r, o, l) {
  ;(this.node = t), (this.x0 = e), (this.y0 = r), (this.x1 = o), (this.y1 = l)
}
function cht(t, e, r) {
  var o,
    l = this._x0,
    u = this._y0,
    f,
    h,
    d,
    g,
    v = this._x1,
    b = this._y1,
    x = [],
    S = this._root,
    M,
    T
  for (
    S && x.push(new gn(S, l, u, v, b)),
      r == null ? (r = 1 / 0) : ((l = t - r), (u = e - r), (v = t + r), (b = e + r), (r *= r));
    (M = x.pop());

  )
    if (!(!(S = M.node) || (f = M.x0) > v || (h = M.y0) > b || (d = M.x1) < l || (g = M.y1) < u))
      if (S.length) {
        var N = (f + d) / 2,
          E = (h + g) / 2
        x.push(new gn(S[3], N, E, d, g), new gn(S[2], f, E, N, g), new gn(S[1], N, h, d, E), new gn(S[0], f, h, N, E)),
          (T = ((e >= E) << 1) | (t >= N)) &&
            ((M = x[x.length - 1]), (x[x.length - 1] = x[x.length - 1 - T]), (x[x.length - 1 - T] = M))
      } else {
        var L = t - +this._x.call(null, S.data),
          F = e - +this._y.call(null, S.data),
          A = L * L + F * F
        if (A < r) {
          var B = Math.sqrt((r = A))
          ;(l = t - B), (u = e - B), (v = t + B), (b = e + B), (o = S.data)
        }
      }
  return o
}
function uht(t) {
  if (isNaN((v = +this._x.call(null, t))) || isNaN((b = +this._y.call(null, t)))) return this
  var e,
    r = this._root,
    o,
    l,
    u,
    f = this._x0,
    h = this._y0,
    d = this._x1,
    g = this._y1,
    v,
    b,
    x,
    S,
    M,
    T,
    N,
    E
  if (!r) return this
  if (r.length)
    for (;;) {
      if (
        ((M = v >= (x = (f + d) / 2)) ? (f = x) : (d = x),
        (T = b >= (S = (h + g) / 2)) ? (h = S) : (g = S),
        (e = r),
        !(r = r[(N = (T << 1) | M)]))
      )
        return this
      if (!r.length) break
      ;(e[(N + 1) & 3] || e[(N + 2) & 3] || e[(N + 3) & 3]) && ((o = e), (E = N))
    }
  for (; r.data !== t; ) if (((l = r), !(r = r.next))) return this
  return (
    (u = r.next) && delete r.next,
    l
      ? (u ? (l.next = u) : delete l.next, this)
      : e
        ? (u ? (e[N] = u) : delete e[N],
          (r = e[0] || e[1] || e[2] || e[3]) &&
            r === (e[3] || e[2] || e[1] || e[0]) &&
            !r.length &&
            (o ? (o[E] = r) : (this._root = r)),
          this)
        : ((this._root = u), this)
  )
}
function fht(t) {
  for (var e = 0, r = t.length; e < r; ++e) this.remove(t[e])
  return this
}
function hht() {
  return this._root
}
function dht() {
  var t = 0
  return (
    this.visit(function (e) {
      if (!e.length)
        do ++t
        while ((e = e.next))
    }),
    t
  )
}
function pht(t) {
  var e = [],
    r,
    o = this._root,
    l,
    u,
    f,
    h,
    d
  for (o && e.push(new gn(o, this._x0, this._y0, this._x1, this._y1)); (r = e.pop()); )
    if (!t((o = r.node), (u = r.x0), (f = r.y0), (h = r.x1), (d = r.y1)) && o.length) {
      var g = (u + h) / 2,
        v = (f + d) / 2
      ;(l = o[3]) && e.push(new gn(l, g, v, h, d)),
        (l = o[2]) && e.push(new gn(l, u, v, g, d)),
        (l = o[1]) && e.push(new gn(l, g, f, h, v)),
        (l = o[0]) && e.push(new gn(l, u, f, g, v))
    }
  return this
}
function ght(t) {
  var e = [],
    r = [],
    o
  for (this._root && e.push(new gn(this._root, this._x0, this._y0, this._x1, this._y1)); (o = e.pop()); ) {
    var l = o.node
    if (l.length) {
      var u,
        f = o.x0,
        h = o.y0,
        d = o.x1,
        g = o.y1,
        v = (f + d) / 2,
        b = (h + g) / 2
      ;(u = l[0]) && e.push(new gn(u, f, h, v, b)),
        (u = l[1]) && e.push(new gn(u, v, h, d, b)),
        (u = l[2]) && e.push(new gn(u, f, b, v, g)),
        (u = l[3]) && e.push(new gn(u, v, b, d, g))
    }
    r.push(o)
  }
  for (; (o = r.pop()); ) t(o.node, o.x0, o.y0, o.x1, o.y1)
  return this
}
function vht(t) {
  return t[0]
}
function mht(t) {
  return arguments.length ? ((this._x = t), this) : this._x
}
function yht(t) {
  return t[1]
}
function bht(t) {
  return arguments.length ? ((this._y = t), this) : this._y
}
function Vh(t, e, r) {
  var o = new Kh(e ?? vht, r ?? yht, NaN, NaN, NaN, NaN)
  return t == null ? o : o.addAll(t)
}
function Kh(t, e, r, o, l, u) {
  ;(this._x = t), (this._y = e), (this._x0 = r), (this._y0 = o), (this._x1 = l), (this._y1 = u), (this._root = void 0)
}
function im(t) {
  for (var e = { data: t.data }, r = e; (t = t.next); ) r = r.next = { data: t.data }
  return e
}
var mn = (Vh.prototype = Kh.prototype)
mn.copy = function () {
  var t = new Kh(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
    e = this._root,
    r,
    o
  if (!e) return t
  if (!e.length) return (t._root = im(e)), t
  for (r = [{ source: e, target: (t._root = new Array(4)) }]; (e = r.pop()); )
    for (var l = 0; l < 4; ++l)
      (o = e.source[l]) &&
        (o.length ? r.push({ source: o, target: (e.target[l] = new Array(4)) }) : (e.target[l] = im(o)))
  return t
}
mn.add = iht
mn.addAll = oht
mn.cover = sht
mn.data = aht
mn.extent = lht
mn.find = cht
mn.remove = uht
mn.removeAll = fht
mn.root = hht
mn.size = dht
mn.visit = pht
mn.visitAfter = ght
mn.x = mht
mn.y = bht
function vn(t) {
  return function () {
    return t
  }
}
function yi(t) {
  return (t() - 0.5) * 1e-6
}
function wht(t) {
  return t.x + t.vx
}
function xht(t) {
  return t.y + t.vy
}
function _ht(t) {
  var e,
    r,
    o,
    l = 1,
    u = 1
  typeof t != 'function' && (t = vn(t == null ? 1 : +t))
  function f() {
    for (var g, v = e.length, b, x, S, M, T, N, E = 0; E < u; ++E)
      for (b = Vh(e, wht, xht).visitAfter(h), g = 0; g < v; ++g)
        (x = e[g]), (T = r[x.index]), (N = T * T), (S = x.x + x.vx), (M = x.y + x.vy), b.visit(L)
    function L(F, A, B, tt, ft) {
      var X = F.data,
        st = F.r,
        ot = T + st
      if (X) {
        if (X.index > x.index) {
          var kt = S - X.x - X.vx,
            pt = M - X.y - X.vy,
            V = kt * kt + pt * pt
          V < ot * ot &&
            (kt === 0 && ((kt = yi(o)), (V += kt * kt)),
            pt === 0 && ((pt = yi(o)), (V += pt * pt)),
            (V = ((ot - (V = Math.sqrt(V))) / V) * l),
            (x.vx += (kt *= V) * (ot = (st *= st) / (N + st))),
            (x.vy += (pt *= V) * ot),
            (X.vx -= kt * (ot = 1 - ot)),
            (X.vy -= pt * ot))
        }
        return
      }
      return A > S + ot || tt < S - ot || B > M + ot || ft < M - ot
    }
  }
  function h(g) {
    if (g.data) return (g.r = r[g.data.index])
    for (var v = (g.r = 0); v < 4; ++v) g[v] && g[v].r > g.r && (g.r = g[v].r)
  }
  function d() {
    if (e) {
      var g,
        v = e.length,
        b
      for (r = new Array(v), g = 0; g < v; ++g) (b = e[g]), (r[b.index] = +t(b, g, e))
    }
  }
  return (
    (f.initialize = function (g, v) {
      ;(e = g), (o = v), d()
    }),
    (f.iterations = function (g) {
      return arguments.length ? ((u = +g), f) : u
    }),
    (f.strength = function (g) {
      return arguments.length ? ((l = +g), f) : l
    }),
    (f.radius = function (g) {
      return arguments.length ? ((t = typeof g == 'function' ? g : vn(+g)), d(), f) : t
    }),
    f
  )
}
function Sht(t) {
  return t.index
}
function om(t, e) {
  var r = t.get(e)
  if (!r) throw new Error('node not found: ' + e)
  return r
}
function kht(t) {
  var e = Sht,
    r = b,
    o,
    l = vn(30),
    u,
    f,
    h,
    d,
    g,
    v = 1
  t == null && (t = [])
  function b(N) {
    return 1 / Math.min(h[N.source.index], h[N.target.index])
  }
  function x(N) {
    for (var E = 0, L = t.length; E < v; ++E)
      for (var F = 0, A, B, tt, ft, X, st, ot; F < L; ++F)
        (A = t[F]),
          (B = A.source),
          (tt = A.target),
          (ft = tt.x + tt.vx - B.x - B.vx || yi(g)),
          (X = tt.y + tt.vy - B.y - B.vy || yi(g)),
          (st = Math.sqrt(ft * ft + X * X)),
          (st = ((st - u[F]) / st) * N * o[F]),
          (ft *= st),
          (X *= st),
          (tt.vx -= ft * (ot = d[F])),
          (tt.vy -= X * ot),
          (B.vx += ft * (ot = 1 - ot)),
          (B.vy += X * ot)
  }
  function S() {
    if (f) {
      var N,
        E = f.length,
        L = t.length,
        F = new Map(f.map((B, tt) => [e(B, tt, f), B])),
        A
      for (N = 0, h = new Array(E); N < L; ++N)
        (A = t[N]),
          (A.index = N),
          typeof A.source != 'object' && (A.source = om(F, A.source)),
          typeof A.target != 'object' && (A.target = om(F, A.target)),
          (h[A.source.index] = (h[A.source.index] || 0) + 1),
          (h[A.target.index] = (h[A.target.index] || 0) + 1)
      for (N = 0, d = new Array(L); N < L; ++N)
        (A = t[N]), (d[N] = h[A.source.index] / (h[A.source.index] + h[A.target.index]))
      ;(o = new Array(L)), M(), (u = new Array(L)), T()
    }
  }
  function M() {
    if (f) for (var N = 0, E = t.length; N < E; ++N) o[N] = +r(t[N], N, t)
  }
  function T() {
    if (f) for (var N = 0, E = t.length; N < E; ++N) u[N] = +l(t[N], N, t)
  }
  return (
    (x.initialize = function (N, E) {
      ;(f = N), (g = E), S()
    }),
    (x.links = function (N) {
      return arguments.length ? ((t = N), S(), x) : t
    }),
    (x.id = function (N) {
      return arguments.length ? ((e = N), x) : e
    }),
    (x.iterations = function (N) {
      return arguments.length ? ((v = +N), x) : v
    }),
    (x.strength = function (N) {
      return arguments.length ? ((r = typeof N == 'function' ? N : vn(+N)), M(), x) : r
    }),
    (x.distance = function (N) {
      return arguments.length ? ((l = typeof N == 'function' ? N : vn(+N)), T(), x) : l
    }),
    x
  )
}
const Cht = 1664525,
  Tht = 1013904223,
  sm = 4294967296
function Eht() {
  let t = 1
  return () => (t = (Cht * t + Tht) % sm) / sm
}
function Lht(t) {
  return t.x
}
function Aht(t) {
  return t.y
}
var Mht = 10,
  Nht = Math.PI * (3 - Math.sqrt(5))
function Pht(t) {
  var e,
    r = 1,
    o = 0.001,
    l = 1 - Math.pow(o, 1 / 300),
    u = 0,
    f = 0.6,
    h = new Map(),
    d = Wh(b),
    g = Pa('tick', 'end'),
    v = Eht()
  t == null && (t = [])
  function b() {
    x(), g.call('tick', e), r < o && (d.stop(), g.call('end', e))
  }
  function x(T) {
    var N,
      E = t.length,
      L
    T === void 0 && (T = 1)
    for (var F = 0; F < T; ++F)
      for (
        r += (u - r) * l,
          h.forEach(function (A) {
            A(r)
          }),
          N = 0;
        N < E;
        ++N
      )
        (L = t[N]),
          L.fx == null ? (L.x += L.vx *= f) : ((L.x = L.fx), (L.vx = 0)),
          L.fy == null ? (L.y += L.vy *= f) : ((L.y = L.fy), (L.vy = 0))
    return e
  }
  function S() {
    for (var T = 0, N = t.length, E; T < N; ++T) {
      if (
        ((E = t[T]),
        (E.index = T),
        E.fx != null && (E.x = E.fx),
        E.fy != null && (E.y = E.fy),
        isNaN(E.x) || isNaN(E.y))
      ) {
        var L = Mht * Math.sqrt(0.5 + T),
          F = T * Nht
        ;(E.x = L * Math.cos(F)), (E.y = L * Math.sin(F))
      }
      ;(isNaN(E.vx) || isNaN(E.vy)) && (E.vx = E.vy = 0)
    }
  }
  function M(T) {
    return T.initialize && T.initialize(t, v), T
  }
  return (
    S(),
    (e = {
      tick: x,
      restart: function () {
        return d.restart(b), e
      },
      stop: function () {
        return d.stop(), e
      },
      nodes: function (T) {
        return arguments.length ? ((t = T), S(), h.forEach(M), e) : t
      },
      alpha: function (T) {
        return arguments.length ? ((r = +T), e) : r
      },
      alphaMin: function (T) {
        return arguments.length ? ((o = +T), e) : o
      },
      alphaDecay: function (T) {
        return arguments.length ? ((l = +T), e) : +l
      },
      alphaTarget: function (T) {
        return arguments.length ? ((u = +T), e) : u
      },
      velocityDecay: function (T) {
        return arguments.length ? ((f = 1 - T), e) : 1 - f
      },
      randomSource: function (T) {
        return arguments.length ? ((v = T), h.forEach(M), e) : v
      },
      force: function (T, N) {
        return arguments.length > 1 ? (N == null ? h.delete(T) : h.set(T, M(N)), e) : h.get(T)
      },
      find: function (T, N, E) {
        var L = 0,
          F = t.length,
          A,
          B,
          tt,
          ft,
          X
        for (E == null ? (E = 1 / 0) : (E *= E), L = 0; L < F; ++L)
          (ft = t[L]), (A = T - ft.x), (B = N - ft.y), (tt = A * A + B * B), tt < E && ((X = ft), (E = tt))
        return X
      },
      on: function (T, N) {
        return arguments.length > 1 ? (g.on(T, N), e) : g.on(T)
      },
    })
  )
}
function Oht() {
  var t,
    e,
    r,
    o,
    l = vn(-30),
    u,
    f = 1,
    h = 1 / 0,
    d = 0.81
  function g(S) {
    var M,
      T = t.length,
      N = Vh(t, Lht, Aht).visitAfter(b)
    for (o = S, M = 0; M < T; ++M) (e = t[M]), N.visit(x)
  }
  function v() {
    if (t) {
      var S,
        M = t.length,
        T
      for (u = new Array(M), S = 0; S < M; ++S) (T = t[S]), (u[T.index] = +l(T, S, t))
    }
  }
  function b(S) {
    var M = 0,
      T,
      N,
      E = 0,
      L,
      F,
      A
    if (S.length) {
      for (L = F = A = 0; A < 4; ++A)
        (T = S[A]) && (N = Math.abs(T.value)) && ((M += T.value), (E += N), (L += N * T.x), (F += N * T.y))
      ;(S.x = L / E), (S.y = F / E)
    } else {
      ;(T = S), (T.x = T.data.x), (T.y = T.data.y)
      do M += u[T.data.index]
      while ((T = T.next))
    }
    S.value = M
  }
  function x(S, M, T, N) {
    if (!S.value) return !0
    var E = S.x - e.x,
      L = S.y - e.y,
      F = N - M,
      A = E * E + L * L
    if ((F * F) / d < A)
      return (
        A < h &&
          (E === 0 && ((E = yi(r)), (A += E * E)),
          L === 0 && ((L = yi(r)), (A += L * L)),
          A < f && (A = Math.sqrt(f * A)),
          (e.vx += (E * S.value * o) / A),
          (e.vy += (L * S.value * o) / A)),
        !0
      )
    if (S.length || A >= h) return
    ;(S.data !== e || S.next) &&
      (E === 0 && ((E = yi(r)), (A += E * E)), L === 0 && ((L = yi(r)), (A += L * L)), A < f && (A = Math.sqrt(f * A)))
    do S.data !== e && ((F = (u[S.data.index] * o) / A), (e.vx += E * F), (e.vy += L * F))
    while ((S = S.next))
  }
  return (
    (g.initialize = function (S, M) {
      ;(t = S), (r = M), v()
    }),
    (g.strength = function (S) {
      return arguments.length ? ((l = typeof S == 'function' ? S : vn(+S)), v(), g) : l
    }),
    (g.distanceMin = function (S) {
      return arguments.length ? ((f = S * S), g) : Math.sqrt(f)
    }),
    (g.distanceMax = function (S) {
      return arguments.length ? ((h = S * S), g) : Math.sqrt(h)
    }),
    (g.theta = function (S) {
      return arguments.length ? ((d = S * S), g) : Math.sqrt(d)
    }),
    g
  )
}
function $ht(t) {
  var e = vn(0.1),
    r,
    o,
    l
  typeof t != 'function' && (t = vn(t == null ? 0 : +t))
  function u(h) {
    for (var d = 0, g = r.length, v; d < g; ++d) (v = r[d]), (v.vx += (l[d] - v.x) * o[d] * h)
  }
  function f() {
    if (r) {
      var h,
        d = r.length
      for (o = new Array(d), l = new Array(d), h = 0; h < d; ++h)
        o[h] = isNaN((l[h] = +t(r[h], h, r))) ? 0 : +e(r[h], h, r)
    }
  }
  return (
    (u.initialize = function (h) {
      ;(r = h), f()
    }),
    (u.strength = function (h) {
      return arguments.length ? ((e = typeof h == 'function' ? h : vn(+h)), f(), u) : e
    }),
    (u.x = function (h) {
      return arguments.length ? ((t = typeof h == 'function' ? h : vn(+h)), f(), u) : t
    }),
    u
  )
}
function Dht(t) {
  var e = vn(0.1),
    r,
    o,
    l
  typeof t != 'function' && (t = vn(t == null ? 0 : +t))
  function u(h) {
    for (var d = 0, g = r.length, v; d < g; ++d) (v = r[d]), (v.vy += (l[d] - v.y) * o[d] * h)
  }
  function f() {
    if (r) {
      var h,
        d = r.length
      for (o = new Array(d), l = new Array(d), h = 0; h < d; ++h)
        o[h] = isNaN((l[h] = +t(r[h], h, r))) ? 0 : +e(r[h], h, r)
    }
  }
  return (
    (u.initialize = function (h) {
      ;(r = h), f()
    }),
    (u.strength = function (h) {
      return arguments.length ? ((e = typeof h == 'function' ? h : vn(+h)), f(), u) : e
    }),
    (u.y = function (h) {
      return arguments.length ? ((t = typeof h == 'function' ? h : vn(+h)), f(), u) : t
    }),
    u
  )
}
var Rht = Object.defineProperty,
  zht = (t, e, r) => (e in t ? Rht(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
  Pe = (t, e, r) => (zht(t, typeof e != 'symbol' ? e + '' : e, r), r)
function Iht() {
  return {
    drag: { end: 0, start: 0.1 },
    filter: { link: 1, type: 0.1, unlinked: { include: 0.1, exclude: 0.1 } },
    focus: { acquire: () => 0.1, release: () => 0.1 },
    initialize: 1,
    labels: { links: { hide: 0, show: 0 }, nodes: { hide: 0, show: 0 } },
    resize: 0.5,
  }
}
const am = (t) => {
    if (typeof t == 'object' && t !== null) {
      if (typeof Object.getPrototypeOf == 'function') {
        const e = Object.getPrototypeOf(t)
        return e === Object.prototype || e === null
      }
      return Object.prototype.toString.call(t) === '[object Object]'
    }
    return !1
  },
  bi = (...t) =>
    t.reduce((e, r) => {
      if (Array.isArray(r)) throw new TypeError('Arguments provided to deepmerge must be objects, not arrays.')
      return (
        Object.keys(r).forEach((o) => {
          ;['__proto__', 'constructor', 'prototype'].includes(o) ||
            (Array.isArray(e[o]) && Array.isArray(r[o])
              ? (e[o] = bi.options.mergeArrays ? Array.from(new Set(e[o].concat(r[o]))) : r[o])
              : am(e[o]) && am(r[o])
                ? (e[o] = bi(e[o], r[o]))
                : (e[o] = r[o]))
        }),
        e
      )
    }, {}),
  yb = { mergeArrays: !0 }
bi.options = yb
bi.withOptions = (t, ...e) => {
  bi.options = { mergeArrays: !0, ...t }
  const r = bi(...e)
  return (bi.options = yb), r
}
function Fht() {
  return {
    centering: { enabled: !0, strength: 0.1 },
    charge: { enabled: !0, strength: -1 },
    collision: { enabled: !0, strength: 1, radiusMultiplier: 2 },
    link: { enabled: !0, strength: 1, length: 128 },
  }
}
function qht() {
  return { includeUnlinked: !0, linkFilter: () => !0, nodeTypeFilter: void 0, showLinkLabels: !0, showNodeLabels: !0 }
}
function bb(t) {
  t.preventDefault(), t.stopPropagation()
}
function wb(t) {
  return typeof t == 'number'
}
function Ci(t, e) {
  return wb(t.nodeRadius) ? t.nodeRadius : t.nodeRadius(e)
}
function Hht(t) {
  return `${t.source.id}-${t.target.id}`
}
function xb(t) {
  return `link-arrow-${t}`.replace(/[()]/g, '~')
}
function Bht(t) {
  return `url(#${xb(t.color)})`
}
function Wht(t) {
  return {
    size: t,
    padding: (e, r) => Ci(r, e) + 2 * t,
    ref: [t / 2, t / 2],
    path: [
      [0, 0],
      [0, t],
      [t, t / 2],
    ],
    viewBox: [0, 0, t, t].join(','),
  }
}
const _b = { Arrow: (t) => Wht(t) },
  Uht = (t, e, r) => [e / 2, r / 2],
  Sb = (t, e, r) => [lm(0, e), lm(0, r)]
function lm(t, e) {
  return Math.random() * (e - t) + t
}
function jht(t) {
  const e = Object.fromEntries(t.nodes.map((r) => [r.id, [r.x, r.y]]))
  return (r, o, l) => {
    const [u, f] = e[r.id] ?? []
    return !u || !f ? Sb(r, o, l) : [u, f]
  }
}
const jf = { Centered: Uht, Randomized: Sb, Stable: jht }
function Ght() {
  return {
    autoResize: !1,
    callbacks: {},
    hooks: {},
    initial: qht(),
    nodeRadius: 16,
    marker: _b.Arrow(4),
    modifiers: {},
    positionInitializer: jf.Centered,
    simulation: { alphas: Iht(), forces: Fht() },
    zoom: { initial: 1, min: 0.1, max: 2 },
  }
}
function Vht(t = {}) {
  return bi.withOptions({ mergeArrays: !1 }, Ght(), t)
}
function Kht(t, e) {
  let r
  return () => {
    r !== void 0 && clearTimeout(r), (r = setTimeout(() => t(), e))
  }
}
function Xht({
  applyZoom: t,
  container: e,
  onDoubleClick: r,
  onPointerMoved: o,
  onPointerUp: l,
  offset: [u, f],
  scale: h,
  zoom: d,
}) {
  const g = e
    .classed('graph', !0)
    .append('svg')
    .attr('height', '100%')
    .attr('width', '100%')
    .call(d)
    .on('contextmenu', (v) => bb(v))
    .on('dblclick', (v) => (r == null ? void 0 : r(v)))
    .on('dblclick.zoom', null)
    .on('pointermove', (v) => (o == null ? void 0 : o(v)))
    .on('pointerup', (v) => (l == null ? void 0 : l(v)))
    .style('cursor', 'grab')
  return t && g.call(d.transform, Gh.translate(u, f).scale(h)), g.append('g')
}
function Yht({ canvas: t, scale: e, xOffset: r, yOffset: o }) {
  t == null || t.attr('transform', `translate(${r},${o})scale(${e})`)
}
function Zht({ config: t, onDragStart: e, onDragEnd: r }) {
  var o, l
  const u = dut()
    .filter((f) => (f.type === 'mousedown' ? f.button === 0 : f.type === 'touchstart' ? f.touches.length === 1 : !1))
    .on('start', (f, h) => {
      f.active === 0 && e(f, h), Cn(f.sourceEvent.target).classed('grabbed', !0), (h.fx = h.x), (h.fy = h.y)
    })
    .on('drag', (f, h) => {
      ;(h.fx = f.x), (h.fy = f.y)
    })
    .on('end', (f, h) => {
      f.active === 0 && r(f, h), Cn(f.sourceEvent.target).classed('grabbed', !1), (h.fx = void 0), (h.fy = void 0)
    })
  return (l = (o = t.modifiers).drag) == null || l.call(o, u), u
}
function Jht({ graph: t, filter: e, focusedNode: r, includeUnlinked: o, linkFilter: l }) {
  const u = t.links.filter((d) => e.includes(d.source.type) && e.includes(d.target.type) && l(d)),
    f = (d) => u.find((g) => g.source.id === d.id || g.target.id === d.id) !== void 0,
    h = t.nodes.filter((d) => e.includes(d.type) && (o || f(d)))
  return r === void 0 || !e.includes(r.type) ? { nodes: h, links: u } : Qht({ nodes: h, links: u }, r)
}
function Qht(t, e) {
  const r = [...tdt(t, e), ...edt(t, e)],
    o = r.flatMap((l) => [l.source, l.target])
  return { nodes: [...new Set([...o, e])], links: [...new Set(r)] }
}
function tdt(t, e) {
  return kb(t, e, (r, o) => r.target.id === o.id)
}
function edt(t, e) {
  return kb(t, e, (r, o) => r.source.id === o.id)
}
function kb(t, e, r) {
  const o = new Set(t.links),
    l = new Set([e]),
    u = []
  for (; o.size > 0; ) {
    const f = [...o].filter((h) => [...l].some((d) => r(h, d)))
    if (f.length === 0) return u
    f.forEach((h) => {
      l.add(h.source), l.add(h.target), u.push(h), o.delete(h)
    })
  }
  return u
}
function Gf(t) {
  return t.x ?? 0
}
function Vf(t) {
  return t.y ?? 0
}
function Xh({ source: t, target: e }) {
  const r = new pn(Gf(t), Vf(t)),
    o = new pn(Gf(e), Vf(e)),
    l = o.subtract(r),
    u = l.length(),
    f = l.normalize(),
    h = f.multiply(-1)
  return { s: r, t: o, dist: u, norm: f, endNorm: h }
}
function Cb({ center: t, node: e }) {
  const r = new pn(Gf(e), Vf(e))
  let o = t
  return r.x === o.x && r.y === o.y && (o = o.add(new pn(0, 1))), { n: r, c: o }
}
function Tb({ config: t, source: e, target: r }) {
  const { s: o, t: l, norm: u } = Xh({ config: t, source: e, target: r }),
    f = o.add(u.multiply(Ci(t, e) - 1)),
    h = l.subtract(u.multiply(t.marker.padding(r, t)))
  return { start: f, end: h }
}
function ndt(t) {
  const { start: e, end: r } = Tb(t)
  return `M${e.x},${e.y}
          L${r.x},${r.y}`
}
function rdt(t) {
  const { start: e, end: r } = Tb(t),
    o = r.subtract(e).multiply(0.5),
    l = e.add(o)
  return `translate(${l.x - 8},${l.y - 4})`
}
function idt({ config: t, source: e, target: r }) {
  const { s: o, t: l, dist: u, norm: f, endNorm: h } = Xh({ config: t, source: e, target: r }),
    d = 10,
    g = f
      .rotateByDegrees(-d)
      .multiply(Ci(t, e) - 1)
      .add(o),
    v = h
      .rotateByDegrees(d)
      .multiply(Ci(t, r))
      .add(l)
      .add(h.rotateByDegrees(d).multiply(2 * t.marker.size)),
    b = 1.2 * u
  return `M${g.x},${g.y}
          A${b},${b},0,0,1,${v.x},${v.y}`
}
function odt({ center: t, config: e, node: r }) {
  const { n: o, c: l } = Cb({ center: t, config: e, node: r }),
    u = Ci(e, r),
    f = o.subtract(l),
    h = f.multiply(1 / f.length()),
    d = 40,
    g = h
      .rotateByDegrees(d)
      .multiply(u - 1)
      .add(o),
    v = h
      .rotateByDegrees(-d)
      .multiply(u)
      .add(o)
      .add(h.rotateByDegrees(-d).multiply(2 * e.marker.size))
  return `M${g.x},${g.y}
          A${u},${u},0,1,0,${v.x},${v.y}`
}
function sdt({ config: t, source: e, target: r }) {
  const { t: o, dist: l, endNorm: u } = Xh({ config: t, source: e, target: r }),
    f = 10,
    h = u
      .rotateByDegrees(f)
      .multiply(0.5 * l)
      .add(o)
  return `translate(${h.x},${h.y})`
}
function adt({ center: t, config: e, node: r }) {
  const { n: o, c: l } = Cb({ center: t, config: e, node: r }),
    u = o.subtract(l),
    f = u
      .multiply(1 / u.length())
      .multiply(3 * Ci(e, r) + 8)
      .add(o)
  return `translate(${f.x},${f.y})`
}
const Go = {
  line: { labelTransform: rdt, path: ndt },
  arc: { labelTransform: sdt, path: idt },
  reflexive: { labelTransform: adt, path: odt },
}
function ldt(t) {
  return t.append('g').classed('links', !0).selectAll('path')
}
function cdt({ config: t, graph: e, selection: r, showLabels: o }) {
  const l =
    r == null
      ? void 0
      : r
          .data(e.links, (u) => Hht(u))
          .join((u) => {
            var f, h, d, g
            const v = u.append('g'),
              b = v
                .append('path')
                .classed('link', !0)
                .style('marker-end', (S) => Bht(S))
                .style('stroke', (S) => S.color)
            ;(h = (f = t.modifiers).link) == null || h.call(f, b)
            const x = v
              .append('text')
              .classed('link__label', !0)
              .style('fill', (S) => (S.label ? S.label.color : null))
              .style('font-size', (S) => (S.label ? S.label.fontSize : null))
              .text((S) => (S.label ? S.label.text : null))
            return (g = (d = t.modifiers).linkLabel) == null || g.call(d, x), v
          })
  return l == null || l.select('.link__label').attr('opacity', (u) => (u.label && o ? 1 : 0)), l
}
function udt(t) {
  fdt(t), hdt(t)
}
function fdt({ center: t, config: e, graph: r, selection: o }) {
  o == null ||
    o
      .selectAll('path')
      .attr('d', (l) =>
        l.source.x === void 0 || l.source.y === void 0 || l.target.x === void 0 || l.target.y === void 0
          ? ''
          : l.source.id === l.target.id
            ? Go.reflexive.path({ config: e, node: l.source, center: t })
            : Eb(r, l.source, l.target)
              ? Go.arc.path({ config: e, source: l.source, target: l.target })
              : Go.line.path({ config: e, source: l.source, target: l.target }),
      )
}
function hdt({ config: t, center: e, graph: r, selection: o }) {
  o == null ||
    o
      .select('.link__label')
      .attr('transform', (l) =>
        l.source.x === void 0 || l.source.y === void 0 || l.target.x === void 0 || l.target.y === void 0
          ? 'translate(0, 0)'
          : l.source.id === l.target.id
            ? Go.reflexive.labelTransform({ config: t, node: l.source, center: e })
            : Eb(r, l.source, l.target)
              ? Go.arc.labelTransform({ config: t, source: l.source, target: l.target })
              : Go.line.labelTransform({ config: t, source: l.source, target: l.target }),
      )
}
function Eb(t, e, r) {
  return (
    e.id !== r.id &&
    t.links.some((o) => o.target.id === e.id && o.source.id === r.id) &&
    t.links.some((o) => o.target.id === r.id && o.source.id === e.id)
  )
}
function ddt(t) {
  return t.append('defs').selectAll('marker')
}
function pdt({ config: t, graph: e, selection: r }) {
  return r == null
    ? void 0
    : r
        .data(gdt(e), (o) => o)
        .join((o) => {
          const l = o
            .append('marker')
            .attr('id', (u) => xb(u))
            .attr('markerHeight', 4 * t.marker.size)
            .attr('markerWidth', 4 * t.marker.size)
            .attr('markerUnits', 'userSpaceOnUse')
            .attr('orient', 'auto')
            .attr('refX', t.marker.ref[0])
            .attr('refY', t.marker.ref[1])
            .attr('viewBox', t.marker.viewBox)
            .style('fill', (u) => u)
          return l.append('path').attr('d', vdt(t.marker.path)), l
        })
}
function gdt(t) {
  return [...new Set(t.links.map((e) => e.color))]
}
function vdt(t) {
  const [e, ...r] = t
  if (!e) return 'M0,0'
  const [o, l] = e
  return r.reduce((u, [f, h]) => `${u}L${f},${h}`, `M${o},${l}`)
}
function mdt(t) {
  return t.append('g').classed('nodes', !0).selectAll('circle')
}
function ydt({ config: t, drag: e, graph: r, onNodeContext: o, onNodeSelected: l, selection: u, showLabels: f }) {
  const h =
    u == null
      ? void 0
      : u
          .data(r.nodes, (d) => d.id)
          .join((d) => {
            var g, v, b, x
            const S = d.append('g')
            e !== void 0 && S.call(e)
            const M = S.append('circle')
              .classed('node', !0)
              .attr('r', (N) => Ci(t, N))
              .on('contextmenu', (N, E) => {
                bb(N), o(E)
              })
              .on('pointerdown', (N, E) => wdt(N, E, l ?? o))
              .style('fill', (N) => N.color)
            ;(v = (g = t.modifiers).node) == null || v.call(g, M)
            const T = S.append('text')
              .classed('node__label', !0)
              .attr('dy', '0.33em')
              .style('fill', (N) => (N.label ? N.label.color : null))
              .style('font-size', (N) => (N.label ? N.label.fontSize : null))
              .style('stroke', 'none')
              .text((N) => (N.label ? N.label.text : null))
            return (x = (b = t.modifiers).nodeLabel) == null || x.call(b, T), S
          })
  return (
    h == null || h.select('.node').classed('focused', (d) => d.isFocused),
    h == null || h.select('.node__label').attr('opacity', f ? 1 : 0),
    h
  )
}
const bdt = 500
function wdt(t, e, r) {
  if (t.button !== void 0 && t.button !== 0) return
  const o = e.lastInteractionTimestamp,
    l = Date.now()
  if (o === void 0 || l - o > bdt) {
    e.lastInteractionTimestamp = l
    return
  }
  ;(e.lastInteractionTimestamp = void 0), r(e)
}
function xdt(t) {
  t == null || t.attr('transform', (e) => `translate(${e.x ?? 0},${e.y ?? 0})`)
}
function _dt({ center: t, config: e, graph: r, onTick: o }) {
  var l, u
  const f = Pht(r.nodes),
    h = e.simulation.forces.centering
  if (h && h.enabled) {
    const b = h.strength
    f.force('x', $ht(() => t().x).strength(b)).force('y', Dht(() => t().y).strength(b))
  }
  const d = e.simulation.forces.charge
  d && d.enabled && f.force('charge', Oht().strength(d.strength))
  const g = e.simulation.forces.collision
  g &&
    g.enabled &&
    f.force(
      'collision',
      _ht().radius((b) => g.radiusMultiplier * Ci(e, b)),
    )
  const v = e.simulation.forces.link
  return (
    v &&
      v.enabled &&
      f.force(
        'link',
        kht(r.links)
          .id((b) => b.id)
          .distance(e.simulation.forces.link.length)
          .strength(v.strength),
      ),
    f.on('tick', () => o()),
    (u = (l = e.modifiers).simulation) == null || u.call(l, f),
    f
  )
}
function Sdt({ canvasContainer: t, config: e, min: r, max: o, onZoom: l }) {
  var u, f
  const h = rht()
    .scaleExtent([r, o])
    .filter((d) => {
      var g
      return d.button === 0 || ((g = d.touches) == null ? void 0 : g.length) >= 2
    })
    .on('start', () => t().classed('grabbed', !0))
    .on('zoom', (d) => l(d))
    .on('end', () => t().classed('grabbed', !1))
  return (f = (u = e.modifiers).zoom) == null || f.call(u, h), h
}
class kdt {
  constructor(e, r, o) {
    if (
      (Pe(this, 'nodeTypes'),
      Pe(this, '_nodeTypeFilter'),
      Pe(this, '_includeUnlinked', !0),
      Pe(this, '_linkFilter', () => !0),
      Pe(this, '_showLinkLabels', !0),
      Pe(this, '_showNodeLabels', !0),
      Pe(this, 'filteredGraph'),
      Pe(this, 'width', 0),
      Pe(this, 'height', 0),
      Pe(this, 'simulation'),
      Pe(this, 'canvas'),
      Pe(this, 'linkSelection'),
      Pe(this, 'nodeSelection'),
      Pe(this, 'markerSelection'),
      Pe(this, 'zoom'),
      Pe(this, 'drag'),
      Pe(this, 'xOffset', 0),
      Pe(this, 'yOffset', 0),
      Pe(this, 'scale'),
      Pe(this, 'focusedNode'),
      Pe(this, 'resizeObserver'),
      (this.container = e),
      (this.graph = r),
      (this.config = o),
      (this.scale = o.zoom.initial),
      this.resetView(),
      this.graph.nodes.forEach((l) => {
        const [u, f] = o.positionInitializer(l, this.effectiveWidth, this.effectiveHeight)
        ;(l.x = l.x ?? u), (l.y = l.y ?? f)
      }),
      (this.nodeTypes = [...new Set(r.nodes.map((l) => l.type))]),
      (this._nodeTypeFilter = [...this.nodeTypes]),
      o.initial)
    ) {
      const { includeUnlinked: l, nodeTypeFilter: u, linkFilter: f, showLinkLabels: h, showNodeLabels: d } = o.initial
      ;(this._includeUnlinked = l ?? this._includeUnlinked),
        (this._showLinkLabels = h ?? this._showLinkLabels),
        (this._showNodeLabels = d ?? this._showNodeLabels),
        (this._nodeTypeFilter = u ?? this._nodeTypeFilter),
        (this._linkFilter = f ?? this._linkFilter)
    }
    this.filterGraph(void 0),
      this.initGraph(),
      this.restart(o.simulation.alphas.initialize),
      o.autoResize &&
        ((this.resizeObserver = new ResizeObserver(Kht(() => this.resize()))),
        this.resizeObserver.observe(this.container))
  }
  get nodeTypeFilter() {
    return this._nodeTypeFilter
  }
  get includeUnlinked() {
    return this._includeUnlinked
  }
  set includeUnlinked(e) {
    ;(this._includeUnlinked = e), this.filterGraph(this.focusedNode)
    const { include: r, exclude: o } = this.config.simulation.alphas.filter.unlinked,
      l = e ? r : o
    this.restart(l)
  }
  set linkFilter(e) {
    ;(this._linkFilter = e), this.filterGraph(this.focusedNode), this.restart(this.config.simulation.alphas.filter.link)
  }
  get linkFilter() {
    return this._linkFilter
  }
  get showNodeLabels() {
    return this._showNodeLabels
  }
  set showNodeLabels(e) {
    this._showNodeLabels = e
    const { hide: r, show: o } = this.config.simulation.alphas.labels.nodes,
      l = e ? o : r
    this.restart(l)
  }
  get showLinkLabels() {
    return this._showLinkLabels
  }
  set showLinkLabels(e) {
    this._showLinkLabels = e
    const { hide: r, show: o } = this.config.simulation.alphas.labels.links,
      l = e ? o : r
    this.restart(l)
  }
  get effectiveWidth() {
    return this.width / this.scale
  }
  get effectiveHeight() {
    return this.height / this.scale
  }
  get effectiveCenter() {
    return pn
      .of([this.width, this.height])
      .divide(2)
      .subtract(pn.of([this.xOffset, this.yOffset]))
      .divide(this.scale)
  }
  resize() {
    const e = this.width,
      r = this.height,
      o = this.container.getBoundingClientRect().width,
      l = this.container.getBoundingClientRect().height,
      u = e.toFixed() !== o.toFixed(),
      f = r.toFixed() !== l.toFixed()
    if (!u && !f) return
    ;(this.width = this.container.getBoundingClientRect().width),
      (this.height = this.container.getBoundingClientRect().height)
    const h = this.config.simulation.alphas.resize
    this.restart(wb(h) ? h : h({ oldWidth: e, oldHeight: r, newWidth: o, newHeight: l }))
  }
  restart(e) {
    var r
    ;(this.markerSelection = pdt({ config: this.config, graph: this.filteredGraph, selection: this.markerSelection })),
      (this.linkSelection = cdt({
        config: this.config,
        graph: this.filteredGraph,
        selection: this.linkSelection,
        showLabels: this._showLinkLabels,
      })),
      (this.nodeSelection = ydt({
        config: this.config,
        drag: this.drag,
        graph: this.filteredGraph,
        onNodeContext: (o) => this.toggleNodeFocus(o),
        onNodeSelected: this.config.callbacks.nodeClicked,
        selection: this.nodeSelection,
        showLabels: this._showNodeLabels,
      })),
      (r = this.simulation) == null || r.stop(),
      (this.simulation = _dt({
        center: () => this.effectiveCenter,
        config: this.config,
        graph: this.filteredGraph,
        onTick: () => this.onTick(),
      })
        .alpha(e)
        .restart())
  }
  filterNodesByType(e, r) {
    e ? this._nodeTypeFilter.push(r) : (this._nodeTypeFilter = this._nodeTypeFilter.filter((o) => o !== r)),
      this.filterGraph(this.focusedNode),
      this.restart(this.config.simulation.alphas.filter.type)
  }
  shutdown() {
    var e, r
    this.focusedNode !== void 0 && ((this.focusedNode.isFocused = !1), (this.focusedNode = void 0)),
      (e = this.resizeObserver) == null || e.unobserve(this.container),
      (r = this.simulation) == null || r.stop()
  }
  initGraph() {
    ;(this.zoom = Sdt({
      config: this.config,
      canvasContainer: () => Cn(this.container).select('svg'),
      min: this.config.zoom.min,
      max: this.config.zoom.max,
      onZoom: (e) => this.onZoom(e),
    })),
      (this.canvas = Xht({
        applyZoom: this.scale !== 1,
        container: Cn(this.container),
        offset: [this.xOffset, this.yOffset],
        scale: this.scale,
        zoom: this.zoom,
      })),
      this.applyZoom(),
      (this.linkSelection = ldt(this.canvas)),
      (this.nodeSelection = mdt(this.canvas)),
      (this.markerSelection = ddt(this.canvas)),
      (this.drag = Zht({
        config: this.config,
        onDragStart: () => {
          var e
          return (e = this.simulation) == null
            ? void 0
            : e.alphaTarget(this.config.simulation.alphas.drag.start).restart()
        },
        onDragEnd: () => {
          var e
          return (e = this.simulation) == null
            ? void 0
            : e.alphaTarget(this.config.simulation.alphas.drag.end).restart()
        },
      }))
  }
  onTick() {
    xdt(this.nodeSelection),
      udt({
        config: this.config,
        center: this.effectiveCenter,
        graph: this.filteredGraph,
        selection: this.linkSelection,
      })
  }
  resetView() {
    var e
    ;(e = this.simulation) == null || e.stop(),
      Cn(this.container).selectChildren().remove(),
      (this.zoom = void 0),
      (this.canvas = void 0),
      (this.linkSelection = void 0),
      (this.nodeSelection = void 0),
      (this.markerSelection = void 0),
      (this.simulation = void 0),
      (this.width = this.container.getBoundingClientRect().width),
      (this.height = this.container.getBoundingClientRect().height)
  }
  onZoom(e) {
    var r, o, l
    ;(this.xOffset = e.transform.x),
      (this.yOffset = e.transform.y),
      (this.scale = e.transform.k),
      this.applyZoom(),
      (o = (r = this.config.hooks).afterZoom) == null || o.call(r, this.scale, this.xOffset, this.yOffset),
      (l = this.simulation) == null || l.restart()
  }
  applyZoom() {
    Yht({ canvas: this.canvas, scale: this.scale, xOffset: this.xOffset, yOffset: this.yOffset })
  }
  toggleNodeFocus(e) {
    e.isFocused
      ? (this.filterGraph(void 0), this.restart(this.config.simulation.alphas.focus.release(e)))
      : this.focusNode(e)
  }
  focusNode(e) {
    this.filterGraph(e), this.restart(this.config.simulation.alphas.focus.acquire(e))
  }
  filterGraph(e) {
    this.focusedNode !== void 0 && ((this.focusedNode.isFocused = !1), (this.focusedNode = void 0)),
      e !== void 0 && this._nodeTypeFilter.includes(e.type) && ((e.isFocused = !0), (this.focusedNode = e)),
      (this.filteredGraph = Jht({
        graph: this.graph,
        filter: this._nodeTypeFilter,
        focusedNode: this.focusedNode,
        includeUnlinked: this._includeUnlinked,
        linkFilter: this._linkFilter,
      }))
  }
}
function cm({ nodes: t, links: e }) {
  return { nodes: t ?? [], links: e ?? [] }
}
function Cdt(t) {
  return { ...t }
}
function Lb(t) {
  return { ...t, isFocused: !1, lastInteractionTimestamp: void 0 }
}
const Tdt = { 'h-full': '', 'min-h-75': '', 'flex-1': '', overflow: 'hidden' },
  Edt = { flex: '', 'items-center': '', 'gap-4': '', 'px-3': '', 'py-2': '' },
  Ldt = ['id', 'checked', 'onChange'],
  Adt = ['for'],
  Mdt = ut('div', { 'flex-auto': '' }, null, -1),
  Ndt = re({
    __name: 'ViewModuleGraph',
    props: { graph: {} },
    setup(t) {
      const e = t,
        { graph: r } = C1(e),
        o = Kt(),
        l = Kt(!1),
        u = Kt(),
        f = Kt()
      gh(
        () => {
          l.value === !1 && setTimeout(() => (u.value = void 0), 300)
        },
        { flush: 'post' },
      ),
        ls(() => {
          g()
        }),
        mh(() => {
          var b
          ;(b = f.value) == null || b.shutdown()
        }),
        Re(r, g)
      function h(b, x) {
        var S
        ;(S = f.value) == null || S.filterNodesByType(x, b)
      }
      function d(b) {
        ;(u.value = b), (l.value = !0)
      }
      function g() {
        var b
        ;(b = f.value) == null || b.shutdown(),
          !(!r.value || !o.value) &&
            (f.value = new kdt(
              o.value,
              r.value,
              Vht({
                nodeRadius: 10,
                autoResize: !0,
                simulation: {
                  alphas: { initialize: 1, resize: ({ newHeight: x, newWidth: S }) => (x === 0 && S === 0 ? 0 : 0.25) },
                  forces: { collision: { radiusMultiplier: 10 }, link: { length: 240 } },
                },
                marker: _b.Arrow(2),
                modifiers: { node: v },
                positionInitializer: r.value.nodes.length > 1 ? jf.Randomized : jf.Centered,
                zoom: { min: 0.5, max: 2 },
              }),
            ))
      }
      function v(b) {
        if (Wr) return
        const x = (N) => N.button === 0
        let S = 0,
          M = 0,
          T = 0
        b.on('pointerdown', (N, E) => {
          E.type !== 'external' && (!E.x || !E.y || !x(N) || ((S = E.x), (M = E.y), (T = Date.now())))
        }).on('pointerup', (N, E) => {
          if (E.type === 'external' || !E.x || !E.y || !x(N) || Date.now() - T > 500) return
          const L = E.x - S,
            F = E.y - M
          L ** 2 + F ** 2 < 100 && d(E.id)
        })
      }
      return (b, x) => {
        var E
        const S = us,
          M = Clt,
          T = dlt,
          N = oo('tooltip')
        return (
          ct(),
          Et('div', Tdt, [
            ut('div', null, [
              ut('div', Edt, [
                (ct(!0),
                Et(
                  fe,
                  null,
                  Qn((E = G(f)) == null ? void 0 : E.nodeTypes.sort(), (L) => {
                    var F
                    return (
                      ct(),
                      Et('div', { key: L, flex: '~ gap-1', 'items-center': '', 'select-none': '' }, [
                        ut(
                          'input',
                          {
                            id: `type-${L}`,
                            type: 'checkbox',
                            checked: (F = G(f)) == null ? void 0 : F.nodeTypeFilter.includes(L),
                            onChange: (A) => h(L, A.target.checked),
                          },
                          null,
                          40,
                          Ldt,
                        ),
                        ut(
                          'label',
                          {
                            'font-light': '',
                            'text-sm': '',
                            'ws-nowrap': '',
                            'overflow-hidden': '',
                            capitalize: '',
                            truncate: '',
                            for: `type-${L}`,
                            'border-b-2': '',
                            style: En({ 'border-color': `var(--color-node-${L})` }),
                          },
                          te(L) + ' Modules',
                          13,
                          Adt,
                        ),
                      ])
                    )
                  }),
                  128,
                )),
                Mdt,
                ut('div', null, [
                  rn(qt(S, { icon: 'i-carbon-reset', onClick: g }, null, 512), [[N, 'Reset', void 0, { bottom: !0 }]]),
                ]),
              ]),
            ]),
            ut('div', { ref_key: 'el', ref: o }, null, 512),
            qt(
              T,
              {
                modelValue: G(l),
                'onUpdate:modelValue': x[1] || (x[1] = (L) => (Ee(l) ? (l.value = L) : null)),
                direction: 'right',
              },
              {
                default: Yt(() => [
                  G(u)
                    ? (ct(),
                      Zt(
                        B1,
                        { key: 0 },
                        {
                          default: Yt(() => [
                            qt(M, { id: G(u), onClose: x[0] || (x[0] = (L) => (l.value = !1)) }, null, 8, ['id']),
                          ]),
                          _: 1,
                        },
                      ))
                    : ne('', !0),
                ]),
                _: 1,
              },
              8,
              ['modelValue'],
            ),
          ])
        )
      }
    },
  })
const Pdt = { key: 0, 'text-green-500': '', 'flex-shrink-0': '', 'i-carbon:checkmark': '' },
  Odt = { key: 1, 'text-red-500': '', 'flex-shrink-0': '', 'i-carbon:compare': '' },
  $dt = { key: 2, 'text-red-500': '', 'flex-shrink-0': '', 'i-carbon:close': '' },
  Ddt = { key: 3, 'text-gray-500': '', 'flex-shrink-0': '', 'i-carbon:document-blank': '' },
  Rdt = { key: 4, 'text-gray-500': '', 'flex-shrink-0': '', 'i-carbon:redo': '', 'rotate-90': '' },
  zdt = { key: 5, 'text-yellow-500': '', 'flex-shrink-0': '', 'i-carbon:circle-dash': '', 'animate-spin': '' },
  Yh = re({
    __name: 'StatusIcon',
    props: { task: {} },
    setup(t) {
      return (e, r) => {
        var l, u, f
        const o = oo('tooltip')
        return ((l = e.task.result) == null ? void 0 : l.state) === 'pass'
          ? (ct(), Et('div', Pdt))
          : G($c)(e.task)
            ? rn((ct(), Et('div', Odt, null, 512)), [[o, 'Contains failed snapshot', void 0, { right: !0 }]])
            : ((u = e.task.result) == null ? void 0 : u.state) === 'fail'
              ? (ct(), Et('div', $dt))
              : e.task.mode === 'todo'
                ? rn((ct(), Et('div', Ddt, null, 512)), [[o, 'Todo', void 0, { right: !0 }]])
                : e.task.mode === 'skip' || ((f = e.task.result) == null ? void 0 : f.state) === 'skip'
                  ? rn((ct(), Et('div', Rdt, null, 512)), [[o, 'Skipped', void 0, { right: !0 }]])
                  : (ct(), Et('div', zdt))
      }
    },
  })
function Idt(t) {
  const e = new Map(),
    r = new Map(),
    o = []
  for (;;) {
    let l = 0
    if (
      (t.forEach((u, f) => {
        var v
        const { splits: h, finished: d } = u
        if (d) {
          l++
          const { raw: b, candidate: x } = u
          e.set(b, x)
          return
        }
        if (h.length === 0) {
          u.finished = !0
          return
        }
        const g = h[0]
        r.has(g)
          ? ((u.candidate += u.candidate === '' ? g : `/${g}`), (v = r.get(g)) == null || v.push(f), h.shift())
          : (r.set(g, [f]), o.push(f))
      }),
      o.forEach((u) => {
        const f = t[u],
          h = f.splits.shift()
        f.candidate += f.candidate === '' ? h : `/${h}`
      }),
      r.forEach((u) => {
        if (u.length === 1) {
          const f = u[0]
          t[f].finished = !0
        }
      }),
      r.clear(),
      (o.length = 0),
      l === t.length)
    )
      break
  }
  return e
}
function Fdt(t) {
  let e = t
  e.includes('/node_modules/') && (e = t.split(/\/node_modules\//g).pop())
  const r = e.split(/\//g)
  return { raw: e, splits: r, candidate: '', finished: !1, id: t }
}
function qdt(t) {
  const e = t.map((o) => Fdt(o)),
    r = Idt(e)
  return e.map(({ raw: o, id: l }) =>
    Lb({
      color: 'var(--color-node-external)',
      label: { color: 'var(--color-node-external)', fontSize: '0.875rem', text: r.get(o) ?? '' },
      isFocused: !1,
      id: l,
      type: 'external',
    }),
  )
}
function Hdt(t, e) {
  return Lb({
    color: e ? 'var(--color-node-root)' : 'var(--color-node-inline)',
    label: {
      color: e ? 'var(--color-node-root)' : 'var(--color-node-inline)',
      fontSize: '0.875rem',
      text: t.split(/\//g).pop(),
    },
    isFocused: !1,
    id: t,
    type: 'inline',
  })
}
function Bdt(t, e) {
  if (!t) return cm({})
  const r = qdt(t.externalized),
    o = t.inlined.map((h) => Hdt(h, h === e)) ?? [],
    l = [...r, ...o],
    u = Object.fromEntries(l.map((h) => [h.id, h])),
    f = Object.entries(t.graph).flatMap(([h, d]) =>
      d
        .map((g) => {
          const v = u[h],
            b = u[g]
          if (!(v === void 0 || b === void 0))
            return Cdt({ source: v, target: b, color: 'var(--color-link)', label: !1 })
        })
        .filter((g) => g !== void 0),
    )
  return cm({ nodes: l, links: f })
}
const Wdt = {
    key: 0,
    flex: '',
    'flex-col': '',
    'h-full': '',
    'max-h-full': '',
    'overflow-hidden': '',
    'data-testid': 'file-detail',
  },
  Udt = { p: '2', 'h-10': '', flex: '~ gap-2', 'items-center': '', 'bg-header': '', border: 'b base' },
  jdt = { 'flex-1': '', 'font-light': '', 'op-50': '', 'ws-nowrap': '', truncate: '', 'text-sm': '' },
  Gdt = { class: 'flex text-lg' },
  Vdt = { flex: '~', 'items-center': '', 'bg-header': '', border: 'b-2 base', 'text-sm': '', 'h-41px': '' },
  Kdt = { flex: '', 'flex-col': '', 'flex-1': '', overflow: 'hidden' },
  Xdt = ['flex-1'],
  Ydt = re({
    __name: 'FileDetails',
    setup(t) {
      const e = Kt({ externalized: [], graph: {}, inlined: [] }),
        r = Kt({ nodes: [], links: [] }),
        o = Kt(!1),
        l = Kt(!1)
      wT(
        Ae,
        async (g, v) => {
          g &&
            g.filepath !== (v == null ? void 0 : v.filepath) &&
            ((e.value = await Ge.rpc.getModuleGraph(g.filepath)), (r.value = Bdt(e.value, g.filepath)))
        },
        { debounce: 100, immediate: !0 },
      )
      function u() {
        var v
        const g = (v = Ae.value) == null ? void 0 : v.filepath
        g && fetch(`/__open-in-editor?file=${encodeURIComponent(g)}`)
      }
      function f(g) {
        g === 'graph' && (l.value = !0), (Xn.value = g)
      }
      const h = yt(() => {
        var g
        return ((g = _y.value) == null ? void 0 : g.reduce((v, { size: b }) => v + b, 0)) ?? 0
      })
      function d(g) {
        o.value = g
      }
      return (g, v) => {
        var L, F
        const b = Yh,
          x = us,
          S = Ndt,
          M = hlt,
          T = rlt,
          N = Uat,
          E = oo('tooltip')
        return G(Ae)
          ? (ct(),
            Et('div', Wdt, [
              ut('div', null, [
                ut('div', Udt, [
                  qt(b, { task: G(Ae) }, null, 8, ['task']),
                  ut('div', jdt, te((L = G(Ae)) == null ? void 0 : L.filepath), 1),
                  ut('div', Gdt, [
                    G(Wr)
                      ? ne('', !0)
                      : rn(
                          (ct(),
                          Zt(
                            x,
                            {
                              key: 0,
                              title: 'Open in editor',
                              icon: 'i-carbon-launch',
                              disabled: !((F = G(Ae)) != null && F.filepath),
                              onClick: u,
                            },
                            null,
                            8,
                            ['disabled'],
                          )),
                          [[E, 'Open in editor', void 0, { bottom: !0 }]],
                        ),
                  ]),
                ]),
                ut('div', Vdt, [
                  ut(
                    'button',
                    {
                      'tab-button': '',
                      class: ve({ 'tab-button-active': G(Xn) == null }),
                      'data-testid': 'btn-report',
                      onClick: v[0] || (v[0] = (A) => f(null)),
                    },
                    ' Report ',
                    2,
                  ),
                  ut(
                    'button',
                    {
                      'tab-button': '',
                      'data-testid': 'btn-graph',
                      class: ve({ 'tab-button-active': G(Xn) === 'graph' }),
                      onClick: v[1] || (v[1] = (A) => f('graph')),
                    },
                    ' Module Graph ',
                    2,
                  ),
                  G(Wr)
                    ? ne('', !0)
                    : (ct(),
                      Et(
                        'button',
                        {
                          key: 0,
                          'tab-button': '',
                          'data-testid': 'btn-code',
                          class: ve({ 'tab-button-active': G(Xn) === 'editor' }),
                          onClick: v[2] || (v[2] = (A) => f('editor')),
                        },
                        te(G(o) ? '* ' : '') + 'Code ',
                        3,
                      )),
                  ut(
                    'button',
                    {
                      'tab-button': '',
                      'data-testid': 'btn-console',
                      class: ve({ 'tab-button-active': G(Xn) === 'console', op20: G(Xn) !== 'console' && G(h) === 0 }),
                      onClick: v[3] || (v[3] = (A) => f('console')),
                    },
                    ' Console (' + te(G(h)) + ') ',
                    3,
                  ),
                ]),
              ]),
              ut('div', Kdt, [
                G(l)
                  ? (ct(),
                    Et(
                      'div',
                      { key: 0, 'flex-1': G(Xn) === 'graph' && '' },
                      [
                        rn(qt(S, { graph: G(r), 'data-testid': 'graph' }, null, 8, ['graph']), [
                          [xf, G(Xn) === 'graph'],
                        ]),
                      ],
                      8,
                      Xdt,
                    ))
                  : ne('', !0),
                G(Xn) === 'editor'
                  ? (ct(),
                    Zt(M, { key: G(Ae).filepath, file: G(Ae), 'data-testid': 'editor', onDraft: d }, null, 8, ['file']))
                  : G(Xn) === 'console'
                    ? (ct(), Zt(T, { key: 2, file: G(Ae), 'data-testid': 'console' }, null, 8, ['file']))
                    : G(Xn)
                      ? ne('', !0)
                      : (ct(), Zt(N, { key: 3, file: G(Ae), 'data-testid': 'report' }, null, 8, ['file'])),
              ]),
            ]))
          : ne('', !0)
      }
    },
  }),
  Zdt = ['open'],
  Jdt = ut('div', { 'flex-1': '', 'h-1px': '', border: 'base b', op80: '' }, null, -1),
  Qdt = ut('div', { 'flex-1': '', 'h-1px': '', border: 'base b', op80: '' }, null, -1),
  tpt = re({
    __name: 'DetailsPanel',
    props: { color: {} },
    setup(t) {
      const e = Kt(!0)
      return (r, o) => (
        ct(),
        Et(
          'div',
          { open: G(e), class: 'details-panel', onToggle: o[0] || (o[0] = (l) => (e.value = l.target.open)) },
          [
            ut(
              'div',
              {
                p: 'y1',
                'text-sm': '',
                'bg-base': '',
                'items-center': '',
                'z-5': '',
                'gap-2': '',
                class: ve(r.color),
                'w-full': '',
                flex: '',
                'select-none': '',
                sticky: '',
                top: '-1',
              },
              [Jdt, nr(r.$slots, 'summary', { open: G(e) }), Qdt],
              2,
            ),
            nr(r.$slots, 'default'),
          ],
          40,
          Zdt,
        )
      )
    },
  })
const ept = {
    key: 0,
    flex: '~ row',
    'items-center': '',
    p: 'x-2 y-1',
    'border-rounded': '',
    'cursor-pointer': '',
    hover: 'bg-active',
  },
  npt = ['text'],
  rpt = { 'text-sm': '', truncate: '', 'font-light': '' },
  ipt = { key: 0, text: 'xs', op20: '', style: { 'white-space': 'nowrap' } },
  opt = re({
    __name: 'TaskItem',
    props: { task: {} },
    setup(t) {
      const e = t,
        r = yt(() => {
          const { result: o } = e.task
          return o && Math.round(o.duration || 0)
        })
      return (o, l) => {
        var f, h
        const u = Yh
        return o.task
          ? (ct(),
            Et('div', ept, [
              qt(u, { task: o.task, 'mr-2': '' }, null, 8, ['task']),
              ut(
                'div',
                {
                  flex: '',
                  'items-end': '',
                  'gap-2': '',
                  text:
                    ((h = (f = o.task) == null ? void 0 : f.result) == null ? void 0 : h.state) === 'fail'
                      ? 'red-500'
                      : '',
                },
                [
                  ut('span', rpt, te(o.task.name), 1),
                  typeof G(r) == 'number'
                    ? (ct(), Et('span', ipt, te(G(r) > 0 ? G(r) : '< 1') + 'ms ', 1))
                    : ne('', !0),
                ],
                8,
                npt,
              ),
            ]))
          : ne('', !0)
      }
    },
  })
function spt(t) {
  return Object.hasOwnProperty.call(t, 'tasks')
}
function Ab(t, e) {
  return typeof t != 'string' || typeof e != 'string' ? !1 : t.toLowerCase().includes(e.toLowerCase())
}
const apt = { key: 1 },
  lpt = re({
    inheritAttrs: !1,
    __name: 'TaskTree',
    props: {
      task: {},
      indent: { default: 0 },
      nested: { type: Boolean, default: !1 },
      search: {},
      onItemClick: { type: Function },
    },
    setup(t) {
      return (e, r) => {
        const o = opt,
          l = Qi('TaskTree', !0)
        return (
          ct(),
          Et(
            fe,
            null,
            [
              !e.search || G(Ab)(e.task.name, e.search)
                ? (ct(),
                  Zt(
                    o,
                    _i({ key: 0 }, e.$attrs, {
                      task: e.task,
                      style: { paddingLeft: `${e.indent * 0.75 + 1}rem` },
                      onClick: r[0] || (r[0] = (u) => e.onItemClick && e.onItemClick(e.task)),
                    }),
                    null,
                    16,
                    ['task', 'style'],
                  ))
                : ne('', !0),
              e.nested && e.task.type === 'suite' && e.task.tasks.length
                ? (ct(),
                  Et('div', apt, [
                    (ct(!0),
                    Et(
                      fe,
                      null,
                      Qn(
                        e.task.tasks,
                        (u) => (
                          ct(),
                          Zt(
                            l,
                            {
                              key: u.id,
                              task: u,
                              nested: e.nested,
                              indent: e.indent + 1,
                              search: e.search,
                              'on-item-click': e.onItemClick,
                            },
                            null,
                            8,
                            ['task', 'nested', 'indent', 'search', 'on-item-click'],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]))
                : ne('', !0),
            ],
            64,
          )
        )
      }
    },
  }),
  cpt = { h: 'full', flex: '~ col' },
  upt = { p: '2', 'h-10': '', flex: '~ gap-2', 'items-center': '', 'bg-header': '', border: 'b base' },
  fpt = { p: 'l3 y2 r2', flex: '~ gap-2', 'items-center': '', 'bg-header': '', border: 'b-2 base' },
  hpt = ut('div', { class: 'i-carbon:search', 'flex-shrink-0': '' }, null, -1),
  dpt = ['op'],
  ppt = { class: 'scrolls', 'flex-auto': '', 'py-1': '' },
  gpt = { 'text-red5': '' },
  vpt = { 'text-yellow5': '' },
  mpt = { 'text-green5': '' },
  ypt = { class: 'text-purple5:50' },
  bpt = { key: 2, flex: '~ col', 'items-center': '', p: 'x4 y4', 'font-light': '' },
  wpt = ut('div', { op30: '' }, ' No matched test ', -1),
  Mb = re({
    inheritAttrs: !1,
    __name: 'TasksList',
    props: {
      tasks: {},
      indent: { default: 0 },
      nested: { type: Boolean, default: !1 },
      groupByType: { type: Boolean, default: !1 },
      onItemClick: { type: Function },
    },
    emits: ['run'],
    setup(t, { emit: e }) {
      const r = Kt(''),
        o = Kt(),
        l = yt(() => r.value.trim() !== ''),
        u = yt(() => (r.value.trim() ? t.tasks.filter((T) => M([T], r.value)) : t.tasks)),
        f = yt(() => (l.value ? u.value.map((T) => ic(T.id)).filter(Boolean) : [])),
        h = yt(() =>
          u.value.filter((T) => {
            var N
            return ((N = T.result) == null ? void 0 : N.state) === 'fail'
          }),
        ),
        d = yt(() =>
          u.value.filter((T) => {
            var N
            return ((N = T.result) == null ? void 0 : N.state) === 'pass'
          }),
        ),
        g = yt(() => u.value.filter((T) => T.mode === 'skip' || T.mode === 'todo')),
        v = yt(() => u.value.filter((T) => !h.value.includes(T) && !d.value.includes(T) && !g.value.includes(T))),
        b = yt(() => r.value === ''),
        x = cT(v, 250)
      function S(T) {
        var N
        ;(r.value = ''), T && ((N = o.value) == null || N.focus())
      }
      function M(T, N) {
        let E = !1
        for (let L = 0; L < T.length; L++) {
          const F = T[L]
          if (Ab(F.name, N)) {
            E = !0
            break
          }
          if (spt(F) && F.tasks && ((E = M(F.tasks, N)), E)) break
        }
        return E
      }
      return (T, N) => {
        const E = us,
          L = lpt,
          F = tpt,
          A = oo('tooltip')
        return (
          ct(),
          Et('div', cpt, [
            ut('div', null, [
              ut('div', upt, [nr(T.$slots, 'header', { filteredTests: G(l) ? G(f) : void 0 })]),
              ut('div', fpt, [
                hpt,
                rn(
                  ut(
                    'input',
                    {
                      ref_key: 'searchBox',
                      ref: o,
                      'onUpdate:modelValue': N[0] || (N[0] = (B) => (Ee(r) ? (r.value = B) : null)),
                      placeholder: 'Search...',
                      outline: 'none',
                      bg: 'transparent',
                      font: 'light',
                      text: 'sm',
                      'flex-1': '',
                      'pl-1': '',
                      op: G(r).length ? '100' : '50',
                      onKeydown: [
                        N[1] || (N[1] = wf((B) => S(!1), ['esc'])),
                        N[2] || (N[2] = wf((B) => e('run', G(l) ? G(f) : void 0), ['enter'])),
                      ],
                    },
                    null,
                    40,
                    dpt,
                  ),
                  [[fS, G(r)]],
                ),
                rn(
                  qt(
                    E,
                    {
                      disabled: G(b),
                      title: 'Clear search',
                      icon: 'i-carbon:filter-remove',
                      onClickPassive: N[3] || (N[3] = (B) => S(!0)),
                    },
                    null,
                    8,
                    ['disabled'],
                  ),
                  [[A, 'Clear search', void 0, { bottom: !0 }]],
                ),
              ]),
            ]),
            ut('div', ppt, [
              T.groupByType
                ? (ct(),
                  Et(
                    fe,
                    { key: 0 },
                    [
                      G(h).length
                        ? (ct(),
                          Zt(
                            F,
                            { key: 0 },
                            {
                              summary: Yt(() => [ut('div', gpt, ' FAIL (' + te(G(h).length) + ') ', 1)]),
                              default: Yt(() => [
                                (ct(!0),
                                Et(
                                  fe,
                                  null,
                                  Qn(
                                    G(h),
                                    (B) => (
                                      ct(),
                                      Zt(
                                        L,
                                        {
                                          key: B.id,
                                          task: B,
                                          nested: T.nested,
                                          search: G(r),
                                          class: ve(G(gr) === B.id ? 'bg-active' : ''),
                                          'on-item-click': T.onItemClick,
                                        },
                                        null,
                                        8,
                                        ['task', 'nested', 'search', 'class', 'on-item-click'],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : ne('', !0),
                      G(v).length || G(ga) === 'running'
                        ? (ct(),
                          Zt(
                            F,
                            { key: 1 },
                            {
                              summary: Yt(() => [ut('div', vpt, ' RUNNING (' + te(G(x).length) + ') ', 1)]),
                              default: Yt(() => [
                                (ct(!0),
                                Et(
                                  fe,
                                  null,
                                  Qn(
                                    G(x),
                                    (B) => (
                                      ct(),
                                      Zt(
                                        L,
                                        {
                                          key: B.id,
                                          task: B,
                                          nested: T.nested,
                                          search: G(r),
                                          class: ve(G(gr) === B.id ? 'bg-active' : ''),
                                          'on-item-click': T.onItemClick,
                                        },
                                        null,
                                        8,
                                        ['task', 'nested', 'search', 'class', 'on-item-click'],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : ne('', !0),
                      G(d).length
                        ? (ct(),
                          Zt(
                            F,
                            { key: 2 },
                            {
                              summary: Yt(() => [ut('div', mpt, ' PASS (' + te(G(d).length) + ') ', 1)]),
                              default: Yt(() => [
                                (ct(!0),
                                Et(
                                  fe,
                                  null,
                                  Qn(
                                    G(d),
                                    (B) => (
                                      ct(),
                                      Zt(
                                        L,
                                        {
                                          key: B.id,
                                          task: B,
                                          nested: T.nested,
                                          search: G(r),
                                          class: ve(G(gr) === B.id ? 'bg-active' : ''),
                                          'on-item-click': T.onItemClick,
                                        },
                                        null,
                                        8,
                                        ['task', 'nested', 'search', 'class', 'on-item-click'],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : ne('', !0),
                      G(g).length
                        ? (ct(),
                          Zt(
                            F,
                            { key: 3 },
                            {
                              summary: Yt(() => [ut('div', ypt, ' SKIP (' + te(G(g).length) + ') ', 1)]),
                              default: Yt(() => [
                                (ct(!0),
                                Et(
                                  fe,
                                  null,
                                  Qn(
                                    G(g),
                                    (B) => (
                                      ct(),
                                      Zt(
                                        L,
                                        {
                                          key: B.id,
                                          task: B,
                                          nested: T.nested,
                                          search: G(r),
                                          class: ve(G(gr) === B.id ? 'bg-active' : ''),
                                          'on-item-click': T.onItemClick,
                                        },
                                        null,
                                        8,
                                        ['task', 'nested', 'search', 'class', 'on-item-click'],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              _: 1,
                            },
                          ))
                        : ne('', !0),
                    ],
                    64,
                  ))
                : (ct(!0),
                  Et(
                    fe,
                    { key: 1 },
                    Qn(
                      G(u),
                      (B) => (
                        ct(),
                        Zt(
                          L,
                          {
                            key: B.id,
                            task: B,
                            nested: T.nested,
                            search: G(r),
                            class: ve(G(gr) === B.id ? 'bg-active' : ''),
                            'on-item-click': T.onItemClick,
                          },
                          null,
                          8,
                          ['task', 'nested', 'search', 'class', 'on-item-click'],
                        )
                      ),
                    ),
                    128,
                  )),
              G(l) && G(u).length === 0
                ? (ct(),
                  Et('div', bpt, [
                    wpt,
                    ut(
                      'button',
                      {
                        'font-light': '',
                        op: '50 hover:100',
                        'text-sm': '',
                        border: '~ gray-400/50 rounded',
                        p: 'x2 y0.5',
                        m: 't2',
                        onClickPassive: N[4] || (N[4] = (B) => S(!0)),
                      },
                      ' Clear ',
                      32,
                    ),
                  ]))
                : ne('', !0),
            ]),
          ])
        )
      }
    },
  }),
  xa = Kt(),
  Vo = Kt(!0),
  ro = Kt(!1),
  dc = Kt(!0),
  Ro = yt(() => {
    var t
    return (t = La.value) == null ? void 0 : t.coverage
  }),
  Kf = yt(() => {
    var t, e, r
    return (e = (t = La.value) == null ? void 0 : t.api) != null && e.port
      ? (r = Ro.value) == null
        ? void 0
        : r.enabled
      : !1
  }),
  zo = yt(() => Kf.value && Ro.value.reporter.map(([t]) => t).includes('html')),
  xpt = yt(() => {
    if (zo.value) {
      const t = `${window.location.protocol}//${window.location.hostname}:${La.value.api.port}`,
        e = Ro.value.reportsDirectory.lastIndexOf('/'),
        r = Ro.value.reporter.find((o) => {
          if (o[0] === 'html') return o
        })
      return r && 'subdir' in r[1]
        ? `${t}/${Ro.value.reportsDirectory.slice(e + 1)}/${r[1].subdir}/index.html`
        : `${t}/${Ro.value.reportsDirectory.slice(e + 1)}/index.html`
    }
  })
Re(
  ga,
  (t) => {
    dc.value = t === 'running'
  },
  { immediate: !0 },
)
function _pt() {
  const t = gr.value
  if (t && t.length > 0) {
    const e = ic(t)
    e
      ? ((xa.value = e), (Vo.value = !1), (ro.value = !1))
      : xT(
          () => Ge.state.getFiles(),
          () => {
            ;(xa.value = ic(t)), (Vo.value = !1), (ro.value = !1)
          },
        )
  }
  return Vo
}
function nf(t) {
  ;(Vo.value = t), (ro.value = !1), t && ((xa.value = void 0), (gr.value = ''))
}
function Spt() {
  ;(ro.value = !0), (Vo.value = !1), (xa.value = void 0), (gr.value = '')
}
const kpt = { key: 0, 'h-full': '' },
  Cpt = {
    'data-testid': 'filenames',
    'font-bold': '',
    'text-sm': '',
    'flex-auto': '',
    'ws-nowrap': '',
    'overflow-hidden': '',
    truncate: '',
  },
  Tpt = { class: 'flex text-lg' },
  Ept = re({
    __name: 'Suites',
    setup(t) {
      const e = yt(() => {
          var u
          return (u = Ae.value) == null ? void 0 : u.name.split(/\//g).pop()
        }),
        r = yt(() => {
          var u, f
          return ((u = Ae.value) == null ? void 0 : u.tasks) && $c((f = Ae.value) == null ? void 0 : f.tasks)
        })
      function o() {
        return Ae.value && Ge.rpc.updateSnapshot(Ae.value)
      }
      async function l() {
        zo.value && ((dc.value = !0), await qr()), await AE()
      }
      return (u, f) => {
        const h = Yh,
          d = us,
          g = Mb,
          v = oo('tooltip')
        return G(Ae)
          ? (ct(),
            Et('div', kpt, [
              qt(
                g,
                { tasks: G(Ae).tasks, nested: !0 },
                {
                  header: Yt(() => [
                    qt(h, { 'mx-1': '', task: G(Ae) }, null, 8, ['task']),
                    ut('span', Cpt, te(G(e)), 1),
                    ut('div', Tpt, [
                      G(r) && !G(Wr)
                        ? rn(
                            (ct(),
                            Zt(
                              d,
                              { key: 0, icon: 'i-carbon-result-old', onClick: f[0] || (f[0] = (b) => o()) },
                              null,
                              512,
                            )),
                            [[v, `Update failed snapshot(s) of ${G(Ae).name}`, void 0, { bottom: !0 }]],
                          )
                        : ne('', !0),
                      G(Wr)
                        ? ne('', !0)
                        : rn(
                            (ct(),
                            Zt(d, { key: 1, icon: 'i-carbon-play', onClick: f[1] || (f[1] = (b) => l()) }, null, 512)),
                            [[v, 'Rerun file', void 0, { bottom: !0 }]],
                          ),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ['tasks'],
              ),
            ]))
          : ne('', !0)
      }
    },
  }),
  Lpt = { h: 'full', flex: '~ col' },
  Apt = ut(
    'div',
    { p: '3', 'h-10': '', flex: '~ gap-2', 'items-center': '', 'bg-header': '', border: 'b base' },
    [
      ut('div', { class: 'i-carbon:folder-details-reference' }),
      ut(
        'span',
        {
          'pl-1': '',
          'font-bold': '',
          'text-sm': '',
          'flex-auto': '',
          'ws-nowrap': '',
          'overflow-hidden': '',
          truncate: '',
        },
        'Coverage',
      ),
    ],
    -1,
  ),
  Mpt = { 'flex-auto': '', 'py-1': '', 'bg-white': '' },
  Npt = ['src'],
  Ppt = re({
    __name: 'Coverage',
    props: { src: {} },
    setup(t) {
      return (e, r) => (
        ct(),
        Et('div', Lpt, [Apt, ut('div', Mpt, [ut('iframe', { id: 'vitest-ui-coverage', src: e.src }, null, 8, Npt)])])
      )
    },
  })
const wr = (t) => (Fm('data-v-6679a536'), (t = t()), qm(), t),
  Opt = {
    'data-testid': 'test-files-entry',
    grid: '~ cols-[min-content_1fr_min-content]',
    'items-center': '',
    gap: 'x-2 y-3',
    p: 'x4',
    relative: '',
    'font-light': '',
    'w-80': '',
    op80: '',
  },
  $pt = wr(() => ut('div', { 'i-carbon-document': '' }, null, -1)),
  Dpt = wr(() => ut('div', null, 'Files', -1)),
  Rpt = { class: 'number', 'data-testid': 'num-files' },
  zpt = wr(() => ut('div', { 'i-carbon-checkmark': '' }, null, -1)),
  Ipt = wr(() => ut('div', null, 'Pass', -1)),
  Fpt = { class: 'number' },
  qpt = wr(() => ut('div', { 'i-carbon-close': '' }, null, -1)),
  Hpt = wr(() => ut('div', null, ' Fail ', -1)),
  Bpt = { class: 'number', 'text-red5': '' },
  Wpt = wr(() => ut('div', { 'i-carbon-compare': '' }, null, -1)),
  Upt = wr(() => ut('div', null, ' Snapshot Fail ', -1)),
  jpt = { class: 'number', 'text-red5': '' },
  Gpt = wr(() => ut('div', { 'i-carbon-timer': '' }, null, -1)),
  Vpt = wr(() => ut('div', null, 'Time', -1)),
  Kpt = { class: 'number', 'data-testid': 'run-time' },
  Xpt = re({
    __name: 'TestFilesEntry',
    setup(t) {
      return (e, r) => (
        ct(),
        Et('div', Opt, [
          $pt,
          Dpt,
          ut('div', Rpt, te(G(An).length), 1),
          G(sc).length ? (ct(), Et(fe, { key: 0 }, [zpt, Ipt, ut('div', Fpt, te(G(sc).length), 1)], 64)) : ne('', !0),
          G(oc).length ? (ct(), Et(fe, { key: 1 }, [qpt, Hpt, ut('div', Bpt, te(G(oc).length), 1)], 64)) : ne('', !0),
          G(zv).length ? (ct(), Et(fe, { key: 2 }, [Wpt, Upt, ut('div', jpt, te(G(zv).length), 1)], 64)) : ne('', !0),
          Gpt,
          Vpt,
          ut('div', Kpt, te(G(Jat)), 1),
        ])
      )
    },
  })
const Ypt = so(Xpt, [['__scopeId', 'data-v-6679a536']]),
  Zpt = { 'p-2': '', 'text-center': '', flex: '' },
  Jpt = { 'text-4xl': '', 'min-w-2em': '' },
  Qpt = { 'text-md': '' },
  tgt = re({
    __name: 'DashboardEntry',
    props: { tail: { type: Boolean, default: !1 } },
    setup(t) {
      return (e, r) => (
        ct(),
        Et('div', Zpt, [
          ut('div', null, [ut('div', Jpt, [nr(e.$slots, 'body')]), ut('div', Qpt, [nr(e.$slots, 'header')])]),
        ])
      )
    },
  }),
  egt = { flex: '~ wrap', 'justify-evenly': '', 'gap-2': '', p: 'x-4', relative: '' },
  ngt = re({
    __name: 'TestsEntry',
    setup(t) {
      const e = yt(() => Ma.value.length),
        r = yt(() => By.value.length),
        o = yt(() => Hy.value.length),
        l = yt(() => Yat.value.length),
        u = yt(() => Zat.value.length)
      return (f, h) => {
        const d = tgt
        return (
          ct(),
          Et('div', egt, [
            qt(
              d,
              { 'text-green5': '', 'data-testid': 'pass-entry' },
              { header: Yt(() => [dn(' Pass ')]), body: Yt(() => [dn(te(G(r)), 1)]), _: 1 },
            ),
            qt(
              d,
              { class: ve({ 'text-red5': G(o), op50: !G(o) }), 'data-testid': 'fail-entry' },
              { header: Yt(() => [dn(' Fail ')]), body: Yt(() => [dn(te(G(o)), 1)]), _: 1 },
              8,
              ['class'],
            ),
            G(l)
              ? (ct(),
                Zt(
                  d,
                  { key: 0, op50: '', 'data-testid': 'skipped-entry' },
                  { header: Yt(() => [dn(' Skip ')]), body: Yt(() => [dn(te(G(l)), 1)]), _: 1 },
                ))
              : ne('', !0),
            G(u)
              ? (ct(),
                Zt(
                  d,
                  { key: 1, op50: '', 'data-testid': 'todo-entry' },
                  { header: Yt(() => [dn(' Todo ')]), body: Yt(() => [dn(te(G(u)), 1)]), _: 1 },
                ))
              : ne('', !0),
            qt(
              d,
              { tail: !0, 'data-testid': 'total-entry' },
              { header: Yt(() => [dn(' Total ')]), body: Yt(() => [dn(te(G(e)), 1)]), _: 1 },
            ),
          ])
        )
      }
    },
  }),
  rgt = {},
  igt = { 'gap-0': '', flex: '~ col gap-4', 'h-full': '', 'justify-center': '', 'items-center': '' },
  ogt = { 'aria-labelledby': 'tests', m: 'y-4 x-2' }
function sgt(t, e) {
  const r = ngt,
    o = Ypt
  return ct(), Et('div', igt, [ut('section', ogt, [qt(r)]), qt(o)])
}
const agt = so(rgt, [['render', sgt]]),
  lgt = {},
  cgt = { h: 'full', flex: '~ col' },
  ugt = ut(
    'div',
    { p: '3', 'h-10': '', flex: '~ gap-2', 'items-center': '', 'bg-header': '', border: 'b base' },
    [
      ut('div', { class: 'i-carbon-dashboard' }),
      ut(
        'span',
        {
          'pl-1': '',
          'font-bold': '',
          'text-sm': '',
          'flex-auto': '',
          'ws-nowrap': '',
          'overflow-hidden': '',
          truncate: '',
        },
        'Dashboard',
      ),
    ],
    -1,
  ),
  fgt = { class: 'scrolls', 'flex-auto': '', 'py-1': '' }
function hgt(t, e) {
  const r = agt
  return ct(), Et('div', cgt, [ugt, ut('div', fgt, [qt(r)])])
}
const dgt = so(lgt, [['render', hgt]]),
  pgt = '' + new URL('../favicon.svg', import.meta.url).href,
  ggt = ut('img', { 'w-6': '', 'h-6': '', src: pgt, alt: 'Vitest logo' }, null, -1),
  vgt = ut('span', { 'font-light': '', 'text-sm': '', 'flex-1': '' }, 'Vitest', -1),
  mgt = { class: 'flex text-lg' },
  ygt = ut('div', { class: 'i-carbon:folder-off ma' }, null, -1),
  bgt = ut(
    'div',
    { class: 'op100 gap-1 p-y-1', grid: '~ items-center cols-[1.5em_1fr]' },
    [
      ut('div', { class: 'i-carbon:information-square w-1.5em h-1.5em' }),
      ut('div', null, 'Coverage enabled but missing html reporter.'),
      ut('div', { style: { 'grid-column': '2' } }, ' Add html reporter to your configuration to see coverage here. '),
    ],
    -1,
  ),
  wgt = re({
    __name: 'Navigation',
    setup(t) {
      const e = yt(() => An.value && $c(An.value))
      function r() {
        return Ge.rpc.updateSnapshot()
      }
      const o = yt(() => (Aa.value ? 'light' : 'dark'))
      function l(f) {
        ;(gr.value = f.id), (xa.value = ic(f.id)), nf(!1)
      }
      async function u(f) {
        zo.value && ((dc.value = !0), await qr(), ro.value && (nf(!0), await qr())), await LE(f)
      }
      return (f, h) => {
        const d = us,
          g = Mb,
          v = oo('tooltip')
        return (
          ct(),
          Zt(
            g,
            { border: 'r base', tasks: G(An), 'on-item-click': l, 'group-by-type': !0, onRun: u },
            {
              header: Yt(({ filteredTests: b }) => [
                ggt,
                vgt,
                ut('div', mgt, [
                  rn(
                    qt(
                      d,
                      {
                        title: 'Show dashboard',
                        class: '!animate-100ms',
                        'animate-count-1': '',
                        icon: 'i-carbon:dashboard',
                        onClick: h[0] || (h[0] = (x) => G(nf)(!0)),
                      },
                      null,
                      512,
                    ),
                    [
                      [xf, (G(Kf) && !G(zo)) || !G(Vo)],
                      [v, 'Dashboard', void 0, { bottom: !0 }],
                    ],
                  ),
                  G(Kf) && !G(zo)
                    ? (ct(),
                      Zt(
                        G(OC),
                        {
                          key: 0,
                          title: 'Coverage enabled but missing html reporter',
                          class: 'w-1.4em h-1.4em op100 rounded flex color-red5 dark:color-#f43f5e cursor-help',
                        },
                        { popper: Yt(() => [bgt]), default: Yt(() => [ygt]), _: 1 },
                      ))
                    : ne('', !0),
                  G(zo)
                    ? rn(
                        (ct(),
                        Zt(
                          d,
                          {
                            key: 1,
                            disabled: G(dc),
                            title: 'Show coverage',
                            class: '!animate-100ms',
                            'animate-count-1': '',
                            icon: 'i-carbon:folder-details-reference',
                            onClick: h[1] || (h[1] = (x) => G(Spt)()),
                          },
                          null,
                          8,
                          ['disabled'],
                        )),
                        [
                          [xf, !G(ro)],
                          [v, 'Coverage', void 0, { bottom: !0 }],
                        ],
                      )
                    : ne('', !0),
                  G(e) && !G(Wr)
                    ? rn(
                        (ct(),
                        Zt(
                          d,
                          { key: 2, icon: 'i-carbon:result-old', onClick: h[2] || (h[2] = (x) => r()) },
                          null,
                          512,
                        )),
                        [[v, 'Update all failed snapshot(s)', void 0, { bottom: !0 }]],
                      )
                    : ne('', !0),
                  G(Wr)
                    ? ne('', !0)
                    : rn(
                        (ct(),
                        Zt(
                          d,
                          {
                            key: 3,
                            disabled: (b == null ? void 0 : b.length) === 0,
                            icon: 'i-carbon:play',
                            onClick: (x) => u(b),
                          },
                          null,
                          8,
                          ['disabled', 'onClick'],
                        )),
                        [
                          [
                            v,
                            b ? (b.length === 0 ? 'No test to run (clear filter)' : 'Rerun filtered') : 'Rerun all',
                            void 0,
                            { bottom: !0 },
                          ],
                        ],
                      ),
                  rn(
                    qt(
                      d,
                      { icon: 'dark:i-carbon-moon i-carbon:sun', onClick: h[3] || (h[3] = (x) => G(Oat)()) },
                      null,
                      512,
                    ),
                    [[v, `Toggle to ${G(o)} mode`, void 0, { bottom: !0 }]],
                  ),
                ]),
              ]),
              _: 1,
            },
            8,
            ['tasks'],
          )
        )
      }
    },
  }),
  xgt = { 'h-3px': '', relative: '', 'overflow-hidden': '', class: 'px-0', 'w-screen': '' },
  _gt = re({
    __name: 'ProgressBar',
    setup(t) {
      const { width: e } = oE(),
        r = yt(() =>
          An.value.length === 0 ? '!bg-gray-4 !dark:bg-gray-7 in-progress' : Xat.value ? null : 'in-progress',
        ),
        o = yt(() => An.value.length),
        l = yt(() => sc.value.length),
        u = yt(() => oc.value.length),
        f = yt(() => {
          const v = G(o)
          return v > 0 ? (e.value * l.value) / v : 0
        }),
        h = yt(() => {
          const v = G(o)
          return v > 0 ? (e.value * u.value) / v : 0
        }),
        d = yt(() => G(o) - u.value - l.value),
        g = yt(() => {
          const v = G(o)
          return v > 0 ? (e.value * d.value) / v : 0
        })
      return (v, b) => (
        ct(),
        Et(
          'div',
          {
            absolute: '',
            't-0': '',
            'l-0': '',
            'r-0': '',
            'z-index-1031': '',
            'pointer-events-none': '',
            'p-0': '',
            'h-3px': '',
            grid: '~ auto-cols-max',
            'justify-items-center': '',
            'w-screen': '',
            class: ve(G(r)),
          },
          [
            ut('div', xgt, [
              ut(
                'div',
                {
                  absolute: '',
                  'l-0': '',
                  't-0': '',
                  'bg-red5': '',
                  'h-3px': '',
                  class: ve(G(r)),
                  style: En(`width: ${G(h)}px;`),
                },
                '   ',
                6,
              ),
              ut(
                'div',
                {
                  absolute: '',
                  'l-0': '',
                  't-0': '',
                  'bg-green5': '',
                  'h-3px': '',
                  class: ve(G(r)),
                  style: En(`left: ${G(h)}px; width: ${G(f)}px;`),
                },
                '   ',
                6,
              ),
              ut(
                'div',
                {
                  absolute: '',
                  'l-0': '',
                  't-0': '',
                  'bg-yellow5': '',
                  'h-3px': '',
                  class: ve(G(r)),
                  style: En(`left: ${G(f) + G(h)}px; width: ${G(g)}px;`),
                },
                '   ',
                6,
              ),
            ]),
          ],
          2,
        )
      )
    },
  })
const Sgt = so(_gt, [['__scopeId', 'data-v-f967c1fe']]),
  um = {
    name: 'splitpanes',
    emits: ['ready', 'resize', 'resized', 'pane-click', 'pane-maximize', 'pane-add', 'pane-remove', 'splitter-click'],
    props: {
      horizontal: { type: Boolean },
      pushOtherPanes: { type: Boolean, default: !0 },
      dblClickSplitter: { type: Boolean, default: !0 },
      rtl: { type: Boolean, default: !1 },
      firstSplitter: { type: Boolean },
    },
    provide() {
      return {
        requestUpdate: this.requestUpdate,
        onPaneAdd: this.onPaneAdd,
        onPaneRemove: this.onPaneRemove,
        onPaneClick: this.onPaneClick,
      }
    },
    data: () => ({
      container: null,
      ready: !1,
      panes: [],
      touch: { mouseDown: !1, dragging: !1, activeSplitter: null },
      splitterTaps: { splitter: null, timeoutId: null },
    }),
    computed: {
      panesCount() {
        return this.panes.length
      },
      indexedPanes() {
        return this.panes.reduce((t, e) => (t[e.id] = e) && t, {})
      },
    },
    methods: {
      updatePaneComponents() {
        this.panes.forEach((t) => {
          t.update && t.update({ [this.horizontal ? 'height' : 'width']: `${this.indexedPanes[t.id].size}%` })
        })
      },
      bindEvents() {
        document.addEventListener('mousemove', this.onMouseMove, { passive: !1 }),
          document.addEventListener('mouseup', this.onMouseUp),
          'ontouchstart' in window &&
            (document.addEventListener('touchmove', this.onMouseMove, { passive: !1 }),
            document.addEventListener('touchend', this.onMouseUp))
      },
      unbindEvents() {
        document.removeEventListener('mousemove', this.onMouseMove, { passive: !1 }),
          document.removeEventListener('mouseup', this.onMouseUp),
          'ontouchstart' in window &&
            (document.removeEventListener('touchmove', this.onMouseMove, { passive: !1 }),
            document.removeEventListener('touchend', this.onMouseUp))
      },
      onMouseDown(t, e) {
        this.bindEvents(), (this.touch.mouseDown = !0), (this.touch.activeSplitter = e)
      },
      onMouseMove(t) {
        this.touch.mouseDown &&
          (t.preventDefault(),
          (this.touch.dragging = !0),
          this.calculatePanesSize(this.getCurrentMouseDrag(t)),
          this.$emit(
            'resize',
            this.panes.map((e) => ({ min: e.min, max: e.max, size: e.size })),
          ))
      },
      onMouseUp() {
        this.touch.dragging &&
          this.$emit(
            'resized',
            this.panes.map((t) => ({ min: t.min, max: t.max, size: t.size })),
          ),
          (this.touch.mouseDown = !1),
          setTimeout(() => {
            ;(this.touch.dragging = !1), this.unbindEvents()
          }, 100)
      },
      onSplitterClick(t, e) {
        'ontouchstart' in window &&
          (t.preventDefault(),
          this.dblClickSplitter &&
            (this.splitterTaps.splitter === e
              ? (clearTimeout(this.splitterTaps.timeoutId),
                (this.splitterTaps.timeoutId = null),
                this.onSplitterDblClick(t, e),
                (this.splitterTaps.splitter = null))
              : ((this.splitterTaps.splitter = e),
                (this.splitterTaps.timeoutId = setTimeout(() => {
                  this.splitterTaps.splitter = null
                }, 500))))),
          this.touch.dragging || this.$emit('splitter-click', this.panes[e])
      },
      onSplitterDblClick(t, e) {
        let r = 0
        ;(this.panes = this.panes.map((o, l) => ((o.size = l === e ? o.max : o.min), l !== e && (r += o.min), o))),
          (this.panes[e].size -= r),
          this.$emit('pane-maximize', this.panes[e]),
          this.$emit(
            'resized',
            this.panes.map((o) => ({ min: o.min, max: o.max, size: o.size })),
          )
      },
      onPaneClick(t, e) {
        this.$emit('pane-click', this.indexedPanes[e])
      },
      getCurrentMouseDrag(t) {
        const e = this.container.getBoundingClientRect(),
          { clientX: r, clientY: o } = 'ontouchstart' in window && t.touches ? t.touches[0] : t
        return { x: r - e.left, y: o - e.top }
      },
      getCurrentDragPercentage(t) {
        t = t[this.horizontal ? 'y' : 'x']
        const e = this.container[this.horizontal ? 'clientHeight' : 'clientWidth']
        return this.rtl && !this.horizontal && (t = e - t), (t * 100) / e
      },
      calculatePanesSize(t) {
        const e = this.touch.activeSplitter
        let r = {
          prevPanesSize: this.sumPrevPanesSize(e),
          nextPanesSize: this.sumNextPanesSize(e),
          prevReachedMinPanes: 0,
          nextReachedMinPanes: 0,
        }
        const o = 0 + (this.pushOtherPanes ? 0 : r.prevPanesSize),
          l = 100 - (this.pushOtherPanes ? 0 : r.nextPanesSize),
          u = Math.max(Math.min(this.getCurrentDragPercentage(t), l), o)
        let f = [e, e + 1],
          h = this.panes[f[0]] || null,
          d = this.panes[f[1]] || null
        const g = h.max < 100 && u >= h.max + r.prevPanesSize,
          v = d.max < 100 && u <= 100 - (d.max + this.sumNextPanesSize(e + 1))
        if (g || v) {
          g
            ? ((h.size = h.max), (d.size = Math.max(100 - h.max - r.prevPanesSize - r.nextPanesSize, 0)))
            : ((h.size = Math.max(100 - d.max - r.prevPanesSize - this.sumNextPanesSize(e + 1), 0)), (d.size = d.max))
          return
        }
        if (this.pushOtherPanes) {
          const b = this.doPushOtherPanes(r, u)
          if (!b) return
          ;({ sums: r, panesToResize: f } = b), (h = this.panes[f[0]] || null), (d = this.panes[f[1]] || null)
        }
        h !== null && (h.size = Math.min(Math.max(u - r.prevPanesSize - r.prevReachedMinPanes, h.min), h.max)),
          d !== null && (d.size = Math.min(Math.max(100 - u - r.nextPanesSize - r.nextReachedMinPanes, d.min), d.max))
      },
      doPushOtherPanes(t, e) {
        const r = this.touch.activeSplitter,
          o = [r, r + 1]
        return e < t.prevPanesSize + this.panes[o[0]].min &&
          ((o[0] = this.findPrevExpandedPane(r).index),
          (t.prevReachedMinPanes = 0),
          o[0] < r &&
            this.panes.forEach((l, u) => {
              u > o[0] && u <= r && ((l.size = l.min), (t.prevReachedMinPanes += l.min))
            }),
          (t.prevPanesSize = this.sumPrevPanesSize(o[0])),
          o[0] === void 0)
          ? ((t.prevReachedMinPanes = 0),
            (this.panes[0].size = this.panes[0].min),
            this.panes.forEach((l, u) => {
              u > 0 && u <= r && ((l.size = l.min), (t.prevReachedMinPanes += l.min))
            }),
            (this.panes[o[1]].size =
              100 - t.prevReachedMinPanes - this.panes[0].min - t.prevPanesSize - t.nextPanesSize),
            null)
          : e > 100 - t.nextPanesSize - this.panes[o[1]].min &&
              ((o[1] = this.findNextExpandedPane(r).index),
              (t.nextReachedMinPanes = 0),
              o[1] > r + 1 &&
                this.panes.forEach((l, u) => {
                  u > r && u < o[1] && ((l.size = l.min), (t.nextReachedMinPanes += l.min))
                }),
              (t.nextPanesSize = this.sumNextPanesSize(o[1] - 1)),
              o[1] === void 0)
            ? ((t.nextReachedMinPanes = 0),
              (this.panes[this.panesCount - 1].size = this.panes[this.panesCount - 1].min),
              this.panes.forEach((l, u) => {
                u < this.panesCount - 1 && u >= r + 1 && ((l.size = l.min), (t.nextReachedMinPanes += l.min))
              }),
              (this.panes[o[0]].size =
                100 - t.prevPanesSize - t.nextReachedMinPanes - this.panes[this.panesCount - 1].min - t.nextPanesSize),
              null)
            : { sums: t, panesToResize: o }
      },
      sumPrevPanesSize(t) {
        return this.panes.reduce((e, r, o) => e + (o < t ? r.size : 0), 0)
      },
      sumNextPanesSize(t) {
        return this.panes.reduce((e, r, o) => e + (o > t + 1 ? r.size : 0), 0)
      },
      findPrevExpandedPane(t) {
        return [...this.panes].reverse().find((e) => e.index < t && e.size > e.min) || {}
      },
      findNextExpandedPane(t) {
        return this.panes.find((e) => e.index > t + 1 && e.size > e.min) || {}
      },
      checkSplitpanesNodes() {
        Array.from(this.container.children).forEach((t) => {
          const e = t.classList.contains('splitpanes__pane'),
            r = t.classList.contains('splitpanes__splitter')
          !e &&
            !r &&
            (t.parentNode.removeChild(t),
            console.warn(
              'Splitpanes: Only <pane> elements are allowed at the root of <splitpanes>. One of your DOM nodes was removed.',
            ))
        })
      },
      addSplitter(t, e, r = !1) {
        const o = t - 1,
          l = document.createElement('div')
        l.classList.add('splitpanes__splitter'),
          r ||
            ((l.onmousedown = (u) => this.onMouseDown(u, o)),
            typeof window < 'u' && 'ontouchstart' in window && (l.ontouchstart = (u) => this.onMouseDown(u, o)),
            (l.onclick = (u) => this.onSplitterClick(u, o + 1))),
          this.dblClickSplitter && (l.ondblclick = (u) => this.onSplitterDblClick(u, o + 1)),
          e.parentNode.insertBefore(l, e)
      },
      removeSplitter(t) {
        ;(t.onmousedown = void 0), (t.onclick = void 0), (t.ondblclick = void 0), t.parentNode.removeChild(t)
      },
      redoSplitters() {
        const t = Array.from(this.container.children)
        t.forEach((r) => {
          r.className.includes('splitpanes__splitter') && this.removeSplitter(r)
        })
        let e = 0
        t.forEach((r) => {
          r.className.includes('splitpanes__pane') &&
            (!e && this.firstSplitter ? this.addSplitter(e, r, !0) : e && this.addSplitter(e, r), e++)
        })
      },
      requestUpdate({ target: t, ...e }) {
        const r = this.indexedPanes[t._.uid]
        Object.entries(e).forEach(([o, l]) => (r[o] = l))
      },
      onPaneAdd(t) {
        let e = -1
        Array.from(t.$el.parentNode.children).some(
          (l) => (l.className.includes('splitpanes__pane') && e++, l === t.$el),
        )
        const r = parseFloat(t.minSize),
          o = parseFloat(t.maxSize)
        this.panes.splice(e, 0, {
          id: t._.uid,
          index: e,
          min: isNaN(r) ? 0 : r,
          max: isNaN(o) ? 100 : o,
          size: t.size === null ? null : parseFloat(t.size),
          givenSize: t.size,
          update: t.update,
        }),
          this.panes.forEach((l, u) => (l.index = u)),
          this.ready &&
            this.$nextTick(() => {
              this.redoSplitters(),
                this.resetPaneSizes({ addedPane: this.panes[e] }),
                this.$emit('pane-add', {
                  index: e,
                  panes: this.panes.map((l) => ({ min: l.min, max: l.max, size: l.size })),
                })
            })
      },
      onPaneRemove(t) {
        const e = this.panes.findIndex((o) => o.id === t._.uid),
          r = this.panes.splice(e, 1)[0]
        this.panes.forEach((o, l) => (o.index = l)),
          this.$nextTick(() => {
            this.redoSplitters(),
              this.resetPaneSizes({ removedPane: { ...r, index: e } }),
              this.$emit('pane-remove', {
                removed: r,
                panes: this.panes.map((o) => ({ min: o.min, max: o.max, size: o.size })),
              })
          })
      },
      resetPaneSizes(t = {}) {
        !t.addedPane && !t.removedPane
          ? this.initialPanesSizing()
          : this.panes.some((e) => e.givenSize !== null || e.min || e.max < 100)
            ? this.equalizeAfterAddOrRemove(t)
            : this.equalize(),
          this.ready &&
            this.$emit(
              'resized',
              this.panes.map((e) => ({ min: e.min, max: e.max, size: e.size })),
            )
      },
      equalize() {
        const t = 100 / this.panesCount
        let e = 0
        const r = [],
          o = []
        this.panes.forEach((l) => {
          ;(l.size = Math.max(Math.min(t, l.max), l.min)),
            (e -= l.size),
            l.size >= l.max && r.push(l.id),
            l.size <= l.min && o.push(l.id)
        }),
          e > 0.1 && this.readjustSizes(e, r, o)
      },
      initialPanesSizing() {
        let t = 100
        const e = [],
          r = []
        let o = 0
        this.panes.forEach((u) => {
          ;(t -= u.size), u.size !== null && o++, u.size >= u.max && e.push(u.id), u.size <= u.min && r.push(u.id)
        })
        let l = 100
        t > 0.1 &&
          (this.panes.forEach((u) => {
            u.size === null && (u.size = Math.max(Math.min(t / (this.panesCount - o), u.max), u.min)), (l -= u.size)
          }),
          l > 0.1 && this.readjustSizes(t, e, r))
      },
      equalizeAfterAddOrRemove({ addedPane: t, removedPane: e } = {}) {
        let r = 100 / this.panesCount,
          o = 0
        const l = [],
          u = []
        t && t.givenSize !== null && (r = (100 - t.givenSize) / (this.panesCount - 1)),
          this.panes.forEach((f) => {
            ;(o -= f.size), f.size >= f.max && l.push(f.id), f.size <= f.min && u.push(f.id)
          }),
          !(Math.abs(o) < 0.1) &&
            (this.panes.forEach((f) => {
              ;(t && t.givenSize !== null && t.id === f.id) || (f.size = Math.max(Math.min(r, f.max), f.min)),
                (o -= f.size),
                f.size >= f.max && l.push(f.id),
                f.size <= f.min && u.push(f.id)
            }),
            o > 0.1 && this.readjustSizes(o, l, u))
      },
      readjustSizes(t, e, r) {
        let o
        t > 0 ? (o = t / (this.panesCount - e.length)) : (o = t / (this.panesCount - r.length)),
          this.panes.forEach((l, u) => {
            if (t > 0 && !e.includes(l.id)) {
              const f = Math.max(Math.min(l.size + o, l.max), l.min),
                h = f - l.size
              ;(t -= h), (l.size = f)
            } else if (!r.includes(l.id)) {
              const f = Math.max(Math.min(l.size + o, l.max), l.min),
                h = f - l.size
              ;(t -= h), (l.size = f)
            }
            l.update({ [this.horizontal ? 'height' : 'width']: `${this.indexedPanes[l.id].size}%` })
          }),
          Math.abs(t) > 0.1 &&
            this.$nextTick(() => {
              this.ready && console.warn('Splitpanes: Could not resize panes correctly due to their constraints.')
            })
      },
    },
    watch: {
      panes: {
        deep: !0,
        immediate: !1,
        handler() {
          this.updatePaneComponents()
        },
      },
      horizontal() {
        this.updatePaneComponents()
      },
      firstSplitter() {
        this.redoSplitters()
      },
      dblClickSplitter(t) {
        ;[...this.container.querySelectorAll('.splitpanes__splitter')].forEach((e, r) => {
          e.ondblclick = t ? (o) => this.onSplitterDblClick(o, r) : void 0
        })
      },
    },
    beforeUnmount() {
      this.ready = !1
    },
    mounted() {
      ;(this.container = this.$refs.container),
        this.checkSplitpanesNodes(),
        this.redoSplitters(),
        this.resetPaneSizes(),
        this.$emit('ready'),
        (this.ready = !0)
    },
    render() {
      return ka(
        'div',
        {
          ref: 'container',
          class: [
            'splitpanes',
            `splitpanes--${this.horizontal ? 'horizontal' : 'vertical'}`,
            { 'splitpanes--dragging': this.touch.dragging },
          ],
        },
        this.$slots.default(),
      )
    },
  },
  kgt = (t, e) => {
    const r = t.__vccOpts || t
    for (const [o, l] of e) r[o] = l
    return r
  },
  Cgt = {
    name: 'pane',
    inject: ['requestUpdate', 'onPaneAdd', 'onPaneRemove', 'onPaneClick'],
    props: {
      size: { type: [Number, String], default: null },
      minSize: { type: [Number, String], default: 0 },
      maxSize: { type: [Number, String], default: 100 },
    },
    data: () => ({ style: {} }),
    mounted() {
      this.onPaneAdd(this)
    },
    beforeUnmount() {
      this.onPaneRemove(this)
    },
    methods: {
      update(t) {
        this.style = t
      },
    },
    computed: {
      sizeNumber() {
        return this.size || this.size === 0 ? parseFloat(this.size) : null
      },
      minSizeNumber() {
        return parseFloat(this.minSize)
      },
      maxSizeNumber() {
        return parseFloat(this.maxSize)
      },
    },
    watch: {
      sizeNumber(t) {
        this.requestUpdate({ target: this, size: t })
      },
      minSizeNumber(t) {
        this.requestUpdate({ target: this, min: t })
      },
      maxSizeNumber(t) {
        this.requestUpdate({ target: this, max: t })
      },
    },
  }
function Tgt(t, e, r, o, l, u) {
  return (
    ct(),
    Et(
      'div',
      { class: 'splitpanes__pane', onClick: e[0] || (e[0] = (f) => u.onPaneClick(f, t._.uid)), style: En(t.style) },
      [nr(t.$slots, 'default')],
      4,
    )
  )
}
const Al = kgt(Cgt, [['render', Tgt]]),
  Egt = { 'h-screen': '', 'w-screen': '', overflow: 'hidden' },
  Lgt = re({
    __name: 'index',
    setup(t) {
      const e = _pt(),
        r = zn([33, 67]),
        o = zn([33, 67]),
        l = pv((h) => {
          h.forEach((d, g) => {
            r[g] = d.size
          })
        }, 0),
        u = pv((h) => {
          h.forEach((d, g) => {
            o[g] = d.size
          })
        }, 0)
      function f() {
        const h = window.innerWidth,
          d = Math.min(h / 3, 300)
        ;(r[0] = (100 * d) / h), (r[1] = 100 - r[0]), (o[0] = (100 * d) / (h - d)), (o[1] = 100 - o[0])
      }
      return (h, d) => {
        const g = Sgt,
          v = wgt,
          b = dgt,
          x = Ppt,
          S = Ept,
          M = Ydt,
          T = PE
        return (
          ct(),
          Et(
            fe,
            null,
            [
              qt(g),
              ut('div', Egt, [
                qt(
                  G(um),
                  { class: 'pt-4px', onResized: G(l), onReady: f },
                  {
                    default: Yt(() => [
                      qt(G(Al), { size: G(r)[0] }, { default: Yt(() => [qt(v)]), _: 1 }, 8, ['size']),
                      qt(
                        G(Al),
                        { size: G(r)[1] },
                        {
                          default: Yt(() => [
                            qt(_h, null, {
                              default: Yt(() => [
                                G(e)
                                  ? (ct(), Zt(b, { key: 'summary' }))
                                  : G(ro)
                                    ? (ct(), Zt(x, { key: 'coverage', src: G(xpt) }, null, 8, ['src']))
                                    : (ct(),
                                      Zt(
                                        G(um),
                                        { key: 'detail', onResized: G(u) },
                                        {
                                          default: Yt(() => [
                                            qt(G(Al), { size: G(o)[0] }, { default: Yt(() => [qt(S)]), _: 1 }, 8, [
                                              'size',
                                            ]),
                                            qt(G(Al), { size: G(o)[1] }, { default: Yt(() => [qt(M)]), _: 1 }, 8, [
                                              'size',
                                            ]),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ['onResized'],
                                      )),
                              ]),
                              _: 1,
                            }),
                          ]),
                          _: 1,
                        },
                        8,
                        ['size'],
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ['onResized'],
                ),
              ]),
              qt(T),
            ],
            64,
          )
        )
      }
    },
  }),
  Agt = [{ name: 'index', path: '/', component: Lgt, props: !0 }]
const Mgt = { tooltip: PC }
G0.options.instantMove = !0
G0.options.distance = 10
function Ngt() {
  return xk({ history: zS(), routes: Agt })
}
const Pgt = [Ngt],
  Zh = h0(yS)
Pgt.forEach((t) => {
  Zh.use(t())
})
Object.entries(Mgt).forEach(([t, e]) => {
  Zh.directive(t, e)
})
Zh.mount('#app')
