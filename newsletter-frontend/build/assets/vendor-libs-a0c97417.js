import { h as t, d as e, r, m as o, e as a, R as s } from './vendor-b2d6fadb.js';
var n = (t, e) => (((t) => 'function' == typeof t)(t) ? t(e) : t),
  i = (() => {
    let t = 0;
    return () => (++t).toString();
  })(),
  l = (() => {
    let t;
    return () => {
      if (void 0 === t && typeof window < 'u') {
        let e = matchMedia('(prefers-reduced-motion: reduce)');
        t = !e || e.matches;
      }
      return t;
    };
  })(),
  c = new Map(),
  d = (t) => {
    if (c.has(t)) return;
    let e = setTimeout(() => {
      c.delete(t), f({ type: 4, toastId: t });
    }, 1e3);
    c.set(t, e);
  },
  u = (t, e) => {
    switch (e.type) {
      case 0:
        return { ...t, toasts: [e.toast, ...t.toasts].slice(0, 20) };
      case 1:
        return (
          e.toast.id &&
            ((t) => {
              let e = c.get(t);
              e && clearTimeout(e);
            })(e.toast.id),
          { ...t, toasts: t.toasts.map((t) => (t.id === e.toast.id ? { ...t, ...e.toast } : t)) }
        );
      case 2:
        let { toast: r } = e;
        return t.toasts.find((t) => t.id === r.id)
          ? u(t, { type: 1, toast: r })
          : u(t, { type: 0, toast: r });
      case 3:
        let { toastId: o } = e;
        return (
          o
            ? d(o)
            : t.toasts.forEach((t) => {
                d(t.id);
              }),
          {
            ...t,
            toasts: t.toasts.map((t) => (t.id === o || void 0 === o ? { ...t, visible: !1 } : t)),
          }
        );
      case 4:
        return void 0 === e.toastId
          ? { ...t, toasts: [] }
          : { ...t, toasts: t.toasts.filter((t) => t.id !== e.toastId) };
      case 5:
        return { ...t, pausedAt: e.time };
      case 6:
        let a = e.time - (t.pausedAt || 0);
        return {
          ...t,
          pausedAt: void 0,
          toasts: t.toasts.map((t) => ({ ...t, pauseDuration: t.pauseDuration + a })),
        };
    }
  },
  p = [],
  m = { toasts: [], pausedAt: void 0 },
  f = (t) => {
    (m = u(m, t)),
      p.forEach((t) => {
        t(m);
      });
  },
  y = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 },
  h = (t) => (e, r) => {
    let o = ((t, e = 'blank', r) => ({
      createdAt: Date.now(),
      visible: !0,
      type: e,
      ariaProps: { role: 'status', 'aria-live': 'polite' },
      message: t,
      pauseDuration: 0,
      ...r,
      id: (null == r ? void 0 : r.id) || i(),
    }))(e, t, r);
    return f({ type: 2, toast: o }), o.id;
  },
  g = (t, e) => h('blank')(t, e);
(g.error = h('error')),
  (g.success = h('success')),
  (g.loading = h('loading')),
  (g.custom = h('custom')),
  (g.dismiss = (t) => {
    f({ type: 3, toastId: t });
  }),
  (g.remove = (t) => f({ type: 4, toastId: t })),
  (g.promise = (t, e, r) => {
    let o = g.loading(e.loading, { ...r, ...(null == r ? void 0 : r.loading) });
    return (
      t
        .then(
          (t) => (
            g.success(n(e.success, t), { id: o, ...r, ...(null == r ? void 0 : r.success) }), t
          )
        )
        .catch((t) => {
          g.error(n(e.error, t), { id: o, ...r, ...(null == r ? void 0 : r.error) });
        }),
      t
    );
  });
var v = (t, e) => {
    f({ type: 1, toast: { id: t, height: e } });
  },
  b = () => {
    f({ type: 5, time: Date.now() });
  },
  x = (t) => {
    let { toasts: e, pausedAt: o } = ((t = {}) => {
      let [e, o] = r.useState(m);
      r.useEffect(
        () => (
          p.push(o),
          () => {
            let t = p.indexOf(o);
            t > -1 && p.splice(t, 1);
          }
        ),
        [e]
      );
      let a = e.toasts.map((e) => {
        var r, o;
        return {
          ...t,
          ...t[e.type],
          ...e,
          duration:
            e.duration ||
            (null == (r = t[e.type]) ? void 0 : r.duration) ||
            (null == t ? void 0 : t.duration) ||
            y[e.type],
          style: { ...t.style, ...(null == (o = t[e.type]) ? void 0 : o.style), ...e.style },
        };
      });
      return { ...e, toasts: a };
    })(t);
    r.useEffect(() => {
      if (o) return;
      let t = Date.now(),
        r = e.map((e) => {
          if (e.duration === 1 / 0) return;
          let r = (e.duration || 0) + e.pauseDuration - (t - e.createdAt);
          if (!(r < 0)) return setTimeout(() => g.dismiss(e.id), r);
          e.visible && g.dismiss(e.id);
        });
      return () => {
        r.forEach((t) => t && clearTimeout(t));
      };
    }, [e, o]);
    let a = r.useCallback(() => {
        o && f({ type: 6, time: Date.now() });
      }, [o]),
      s = r.useCallback(
        (t, r) => {
          let { reverseOrder: o = !1, gutter: a = 8, defaultPosition: s } = r || {},
            n = e.filter((e) => (e.position || s) === (t.position || s) && e.height),
            i = n.findIndex((e) => e.id === t.id),
            l = n.filter((t, e) => e < i && t.visible).length;
          return n
            .filter((t) => t.visible)
            .slice(...(o ? [l + 1] : [0, l]))
            .reduce((t, e) => t + (e.height || 0) + a, 0);
        },
        [e]
      );
    return {
      toasts: e,
      handlers: { updateHeight: v, startPause: b, endPause: a, calculateOffset: s },
    };
  },
  S = t`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,
  w = t`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
  E = t`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,
  O = e('div')`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(t) => t.primary || '#ff4b4b'};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${w} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(t) => t.secondary || '#fff'};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${E} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,
  I = t`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,
  $ = e('div')`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(t) => t.secondary || '#e0e0e0'};
  border-right-color: ${(t) => t.primary || '#616161'};
  animation: ${I} 1s linear infinite;
`,
  k = t`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,
  T = t`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,
  N = e('div')`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(t) => t.primary || '#61d345'};
  position: relative;
  transform: rotate(45deg);

  animation: ${k} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${T} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(t) => t.secondary || '#fff'};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,
  _ = e('div')`
  position: absolute;
`,
  j = e('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,
  z = t`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,
  D = e('div')`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${z} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,
  P = ({ toast: t }) => {
    let { icon: e, type: o, iconTheme: a } = t;
    return void 0 !== e
      ? 'string' == typeof e
        ? r.createElement(D, null, e)
        : e
      : 'blank' === o
        ? null
        : r.createElement(
            j,
            null,
            r.createElement($, { ...a }),
            'loading' !== o &&
              r.createElement(
                _,
                null,
                'error' === o ? r.createElement(O, { ...a }) : r.createElement(N, { ...a })
              )
          );
  },
  A = (t) =>
    `\n0% {transform: translate3d(0,${-200 * t}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,
  C = (t) =>
    `\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150 * t}%,-1px) scale(.6); opacity:0;}\n`,
  M = e('div')`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,
  H = e('div')`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,
  J = r.memo(({ toast: e, position: o, style: a, children: s }) => {
    let i = e.height
        ? ((e, r) => {
            let o = e.includes('top') ? 1 : -1,
              [a, s] = l()
                ? ['0%{opacity:0;} 100%{opacity:1;}', '0%{opacity:1;} 100%{opacity:0;}']
                : [A(o), C(o)];
            return {
              animation: r
                ? `${t(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
                : `${t(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
            };
          })(e.position || o || 'top-center', e.visible)
        : { opacity: 0 },
      c = r.createElement(P, { toast: e }),
      d = r.createElement(H, { ...e.ariaProps }, n(e.message, e));
    return r.createElement(
      M,
      { className: e.className, style: { ...i, ...a, ...e.style } },
      'function' == typeof s ? s({ icon: c, message: d }) : r.createElement(r.Fragment, null, c, d)
    );
  });
o(r.createElement);
var R = ({ id: t, className: e, style: o, onHeightUpdate: a, children: s }) => {
    let n = r.useCallback(
      (e) => {
        if (e) {
          let r = () => {
            let r = e.getBoundingClientRect().height;
            a(t, r);
          };
          r(),
            new MutationObserver(r).observe(e, { subtree: !0, childList: !0, characterData: !0 });
        }
      },
      [t, a]
    );
    return r.createElement('div', { ref: n, className: e, style: o }, s);
  },
  U = a`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,
  L = ({
    reverseOrder: t,
    position: e = 'top-center',
    toastOptions: o,
    gutter: a,
    children: s,
    containerStyle: i,
    containerClassName: c,
  }) => {
    let { toasts: d, handlers: u } = x(o);
    return r.createElement(
      'div',
      {
        style: {
          position: 'fixed',
          zIndex: 9999,
          top: 16,
          left: 16,
          right: 16,
          bottom: 16,
          pointerEvents: 'none',
          ...i,
        },
        className: c,
        onMouseEnter: u.startPause,
        onMouseLeave: u.endPause,
      },
      d.map((o) => {
        let i = o.position || e,
          c = ((t, e) => {
            let r = t.includes('top'),
              o = r ? { top: 0 } : { bottom: 0 },
              a = t.includes('center')
                ? { justifyContent: 'center' }
                : t.includes('right')
                  ? { justifyContent: 'flex-end' }
                  : {};
            return {
              left: 0,
              right: 0,
              display: 'flex',
              position: 'absolute',
              transition: l() ? void 0 : 'all 230ms cubic-bezier(.21,1.02,.73,1)',
              transform: `translateY(${e * (r ? 1 : -1)}px)`,
              ...o,
              ...a,
            };
          })(i, u.calculateOffset(o, { reverseOrder: t, gutter: a, defaultPosition: e }));
        return r.createElement(
          R,
          {
            id: o.id,
            key: o.id,
            onHeightUpdate: u.updateHeight,
            className: o.visible ? U : '',
            style: c,
          },
          'custom' === o.type
            ? n(o.message, o)
            : s
              ? s(o)
              : r.createElement(J, { toast: o, position: i })
        );
      })
    );
  },
  F = g;
const B = (t) => {
    let e;
    const r = new Set(),
      o = (t, o) => {
        const a = 'function' == typeof t ? t(e) : t;
        if (!Object.is(a, e)) {
          const t = e;
          (e = (null != o ? o : 'object' != typeof a || null === a) ? a : Object.assign({}, e, a)),
            r.forEach((r) => r(e, t));
        }
      },
      a = () => e,
      s = {
        setState: o,
        getState: a,
        getInitialState: () => n,
        subscribe: (t) => (r.add(t), () => r.delete(t)),
      },
      n = (e = t(o, a, s));
    return s;
  },
  V = (t) => t;
const X = (t) => {
    const e = ((t) => (t ? B(t) : B))(t),
      r = (t) =>
        (function (t, e = V) {
          const r = s.useSyncExternalStore(
            t.subscribe,
            () => e(t.getState()),
            () => e(t.getInitialState())
          );
          return s.useDebugValue(r), r;
        })(e, t);
    return Object.assign(r, e), r;
  },
  G = (t) => (t ? X(t) : X),
  K = new Map(),
  W = (t) => {
    const e = K.get(t);
    return e ? Object.fromEntries(Object.entries(e.stores).map(([t, e]) => [t, e.getState()])) : {};
  },
  Y =
    (t, e = {}) =>
    (r, o, a) => {
      const { enabled: s, anonymousActionType: n, store: i, ...l } = e;
      let c;
      try {
        c = null != s && s && window.__REDUX_DEVTOOLS_EXTENSION__;
      } catch (y) {}
      if (!c) return t(r, o, a);
      const { connection: d, ...u } = ((t, e, r) => {
        if (void 0 === t) return { type: 'untracked', connection: e.connect(r) };
        const o = K.get(r.name);
        if (o) return { type: 'tracked', store: t, ...o };
        const a = { connection: e.connect(r), stores: {} };
        return K.set(r.name, a), { type: 'tracked', store: t, ...a };
      })(i, c, l);
      let p = !0;
      a.setState = (t, e, s) => {
        const c = r(t, e);
        if (!p) return c;
        const u =
          void 0 === s ? { type: n || 'anonymous' } : 'string' == typeof s ? { type: s } : s;
        return void 0 === i
          ? (null == d || d.send(u, o()), c)
          : (null == d ||
              d.send({ ...u, type: `${i}/${u.type}` }, { ...W(l.name), [i]: a.getState() }),
            c);
      };
      const m = (...t) => {
          const e = p;
          (p = !1), r(...t), (p = e);
        },
        f = t(a.setState, o, a);
      if (
        ('untracked' === u.type
          ? null == d || d.init(f)
          : ((u.stores[u.store] = a),
            null == d ||
              d.init(
                Object.fromEntries(
                  Object.entries(u.stores).map(([t, e]) => [t, t === u.store ? f : e.getState()])
                )
              )),
        a.dispatchFromDevtools && 'function' == typeof a.dispatch)
      ) {
        const t = a.dispatch;
        a.dispatch = (...e) => {
          t(...e);
        };
      }
      return (
        d.subscribe((t) => {
          var e;
          switch (t.type) {
            case 'ACTION':
              return 'string' != typeof t.payload
                ? void console.error('[zustand devtools middleware] Unsupported action format')
                : q(t.payload, (t) => {
                    if ('__setState' !== t.type)
                      a.dispatchFromDevtools && 'function' == typeof a.dispatch && a.dispatch(t);
                    else {
                      if (void 0 === i) return void m(t.state);
                      1 !== Object.keys(t.state).length &&
                        console.error(
                          '\n                    [zustand devtools middleware] Unsupported __setState action format.\n                    When using \'store\' option in devtools(), the \'state\' should have only one key, which is a value of \'store\' that was passed in devtools(),\n                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }\n                    '
                        );
                      const e = t.state[i];
                      if (null == e) return;
                      JSON.stringify(a.getState()) !== JSON.stringify(e) && m(e);
                    }
                  });
            case 'DISPATCH':
              switch (t.payload.type) {
                case 'RESET':
                  return (
                    m(f),
                    void 0 === i
                      ? null == d
                        ? void 0
                        : d.init(a.getState())
                      : null == d
                        ? void 0
                        : d.init(W(l.name))
                  );
                case 'COMMIT':
                  return void 0 === i
                    ? void (null == d || d.init(a.getState()))
                    : null == d
                      ? void 0
                      : d.init(W(l.name));
                case 'ROLLBACK':
                  return q(t.state, (t) => {
                    if (void 0 === i) return m(t), void (null == d || d.init(a.getState()));
                    m(t[i]), null == d || d.init(W(l.name));
                  });
                case 'JUMP_TO_STATE':
                case 'JUMP_TO_ACTION':
                  return q(t.state, (t) => {
                    void 0 !== i
                      ? JSON.stringify(a.getState()) !== JSON.stringify(t[i]) && m(t[i])
                      : m(t);
                  });
                case 'IMPORT_STATE': {
                  const { nextLiftedState: r } = t.payload,
                    o = null == (e = r.computedStates.slice(-1)[0]) ? void 0 : e.state;
                  if (!o) return;
                  return m(void 0 === i ? o : o[i]), void (null == d || d.send(null, r));
                }
                case 'PAUSE_RECORDING':
                  return (p = !p);
              }
              return;
          }
        }),
        f
      );
    },
  q = (t, e) => {
    let r;
    try {
      r = JSON.parse(t);
    } catch (o) {
      console.error('[zustand devtools middleware] Could not parse the received json', o);
    }
    void 0 !== r && e(r);
  };
function Q(t, e) {
  let r;
  try {
    r = t();
  } catch (o) {
    return;
  }
  return {
    getItem: (t) => {
      var o;
      const a = (t) => (null === t ? null : JSON.parse(t, null == e ? void 0 : e.reviver)),
        s = null != (o = r.getItem(t)) ? o : null;
      return s instanceof Promise ? s.then(a) : a(s);
    },
    setItem: (t, o) => r.setItem(t, JSON.stringify(o, null == e ? void 0 : e.replacer)),
    removeItem: (t) => r.removeItem(t),
  };
}
const Z = (t) => (e) => {
    try {
      const r = t(e);
      return r instanceof Promise
        ? r
        : {
            then: (t) => Z(t)(r),
            catch(t) {
              return this;
            },
          };
    } catch (r) {
      return {
        then(t) {
          return this;
        },
        catch: (t) => Z(t)(r),
      };
    }
  },
  tt = (t, e) => (r, o, a) => {
    let s = {
        storage: Q(() => localStorage),
        partialize: (t) => t,
        version: 0,
        merge: (t, e) => ({ ...e, ...t }),
        ...e,
      },
      n = !1;
    const i = new Set(),
      l = new Set();
    let c = s.storage;
    if (!c)
      return t(
        (...t) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`
          ),
            r(...t);
        },
        o,
        a
      );
    const d = () => {
        const t = s.partialize({ ...o() });
        return c.setItem(s.name, { state: t, version: s.version });
      },
      u = a.setState;
    a.setState = (t, e) => {
      u(t, e), d();
    };
    const p = t(
      (...t) => {
        r(...t), d();
      },
      o,
      a
    );
    let m;
    a.getInitialState = () => p;
    const f = () => {
      var t, e;
      if (!c) return;
      (n = !1),
        i.forEach((t) => {
          var e;
          return t(null != (e = o()) ? e : p);
        });
      const a =
        (null == (e = s.onRehydrateStorage) ? void 0 : e.call(s, null != (t = o()) ? t : p)) ||
        void 0;
      return Z(c.getItem.bind(c))(s.name)
        .then((t) => {
          if (t) {
            if ('number' != typeof t.version || t.version === s.version) return [!1, t.state];
            if (s.migrate) {
              const e = s.migrate(t.state, t.version);
              return e instanceof Promise ? e.then((t) => [!0, t]) : [!0, e];
            }
            console.error(
              "State loaded from storage couldn't be migrated since no migrate function was provided"
            );
          }
          return [!1, void 0];
        })
        .then((t) => {
          var e;
          const [a, n] = t;
          if (((m = s.merge(n, null != (e = o()) ? e : p)), r(m, !0), a)) return d();
        })
        .then(() => {
          null == a || a(m, void 0), (m = o()), (n = !0), l.forEach((t) => t(m));
        })
        .catch((t) => {
          null == a || a(void 0, t);
        });
    };
    return (
      (a.persist = {
        setOptions: (t) => {
          (s = { ...s, ...t }), t.storage && (c = t.storage);
        },
        clearStorage: () => {
          null == c || c.removeItem(s.name);
        },
        getOptions: () => s,
        rehydrate: () => f(),
        hasHydrated: () => n,
        onHydrate: (t) => (
          i.add(t),
          () => {
            i.delete(t);
          }
        ),
        onFinishHydration: (t) => (
          l.add(t),
          () => {
            l.delete(t);
          }
        ),
      }),
      s.skipHydration || f(),
      m || p
    );
  };
export { L as I, F as _, G as c, Y as d, tt as p };
