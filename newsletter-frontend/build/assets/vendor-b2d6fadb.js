import { j as e, a as t, F as n } from './pages-3cea39f5.js';
function r(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if ('string' != typeof r && !Array.isArray(r))
      for (const t in r)
        if ('default' !== t && !(t in e)) {
          const n = Object.getOwnPropertyDescriptor(r, t);
          n && Object.defineProperty(e, t, n.get ? n : { enumerable: !0, get: () => r[t] });
        }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }));
}
function i(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var a = { exports: {} },
  o = {},
  s = { exports: {} },
  l = {},
  u = Symbol.for('react.element'),
  c = Symbol.for('react.portal'),
  d = Symbol.for('react.fragment'),
  f = Symbol.for('react.strict_mode'),
  h = Symbol.for('react.profiler'),
  p = Symbol.for('react.provider'),
  m = Symbol.for('react.context'),
  g = Symbol.for('react.forward_ref'),
  y = Symbol.for('react.suspense'),
  v = Symbol.for('react.memo'),
  b = Symbol.for('react.lazy'),
  w = Symbol.iterator;
var x = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  k = Object.assign,
  S = {};
function _(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = S), (this.updater = n || x);
}
function E() {}
function C(e, t, n) {
  (this.props = e), (this.context = t), (this.refs = S), (this.updater = n || x);
}
(_.prototype.isReactComponent = {}),
  (_.prototype.setState = function (e, t) {
    if ('object' != typeof e && 'function' != typeof e && null != e)
      throw Error(
        'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
      );
    this.updater.enqueueSetState(this, e, t, 'setState');
  }),
  (_.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
  }),
  (E.prototype = _.prototype);
var T = (C.prototype = new E());
(T.constructor = C), k(T, _.prototype), (T.isPureReactComponent = !0);
var P = Array.isArray,
  A = Object.prototype.hasOwnProperty,
  R = { current: null },
  O = { key: !0, ref: !0, __self: !0, __source: !0 };
function D(e, t, n) {
  var r,
    i = {},
    a = null,
    o = null;
  if (null != t)
    for (r in (void 0 !== t.ref && (o = t.ref), void 0 !== t.key && (a = '' + t.key), t))
      A.call(t, r) && !O.hasOwnProperty(r) && (i[r] = t[r]);
  var s = arguments.length - 2;
  if (1 === s) i.children = n;
  else if (1 < s) {
    for (var l = Array(s), c = 0; c < s; c++) l[c] = arguments[c + 2];
    i.children = l;
  }
  if (e && e.defaultProps) for (r in (s = e.defaultProps)) void 0 === i[r] && (i[r] = s[r]);
  return { $$typeof: u, type: e, key: a, ref: o, props: i, _owner: R.current };
}
function L(e) {
  return 'object' == typeof e && null !== e && e.$$typeof === u;
}
var N = /\/+/g;
function M(e, t) {
  return 'object' == typeof e && null !== e && null != e.key
    ? (function (e) {
        var t = { '=': '=0', ':': '=2' };
        return (
          '$' +
          e.replace(/[=:]/g, function (e) {
            return t[e];
          })
        );
      })('' + e.key)
    : t.toString(36);
}
function F(e, t, n, r, i) {
  var a = typeof e;
  ('undefined' !== a && 'boolean' !== a) || (e = null);
  var o = !1;
  if (null === e) o = !0;
  else
    switch (a) {
      case 'string':
      case 'number':
        o = !0;
        break;
      case 'object':
        switch (e.$$typeof) {
          case u:
          case c:
            o = !0;
        }
    }
  if (o)
    return (
      (i = i((o = e))),
      (e = '' === r ? '.' + M(o, 0) : r),
      P(i)
        ? ((n = ''),
          null != e && (n = e.replace(N, '$&/') + '/'),
          F(i, t, n, '', function (e) {
            return e;
          }))
        : null != i &&
          (L(i) &&
            (i = (function (e, t) {
              return {
                $$typeof: u,
                type: e.type,
                key: t,
                ref: e.ref,
                props: e.props,
                _owner: e._owner,
              };
            })(
              i,
              n + (!i.key || (o && o.key === i.key) ? '' : ('' + i.key).replace(N, '$&/') + '/') + e
            )),
          t.push(i)),
      1
    );
  if (((o = 0), (r = '' === r ? '.' : r + ':'), P(e)))
    for (var s = 0; s < e.length; s++) {
      var l = r + M((a = e[s]), s);
      o += F(a, t, n, l, i);
    }
  else if (
    ((l = (function (e) {
      return null === e || 'object' != typeof e
        ? null
        : 'function' == typeof (e = (w && e[w]) || e['@@iterator'])
          ? e
          : null;
    })(e)),
    'function' == typeof l)
  )
    for (e = l.call(e), s = 0; !(a = e.next()).done; )
      o += F((a = a.value), t, n, (l = r + M(a, s++)), i);
  else if ('object' === a)
    throw (
      ((t = String(e)),
      Error(
        'Objects are not valid as a React child (found: ' +
          ('[object Object]' === t ? 'object with keys {' + Object.keys(e).join(', ') + '}' : t) +
          '). If you meant to render a collection of children, use an array instead.'
      ))
    );
  return o;
}
function j(e, t, n) {
  if (null == e) return e;
  var r = [],
    i = 0;
  return (
    F(e, r, '', '', function (e) {
      return t.call(n, e, i++);
    }),
    r
  );
}
function V(e) {
  if (-1 === e._status) {
    var t = e._result;
    (t = t()).then(
      function (t) {
        (0 !== e._status && -1 !== e._status) || ((e._status = 1), (e._result = t));
      },
      function (t) {
        (0 !== e._status && -1 !== e._status) || ((e._status = 2), (e._result = t));
      }
    ),
      -1 === e._status && ((e._status = 0), (e._result = t));
  }
  if (1 === e._status) return e._result.default;
  throw e._result;
}
var I = { current: null },
  z = { transition: null },
  B = { ReactCurrentDispatcher: I, ReactCurrentBatchConfig: z, ReactCurrentOwner: R };
function U() {
  throw Error('act(...) is not supported in production builds of React.');
}
(l.Children = {
  map: j,
  forEach: function (e, t, n) {
    j(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      j(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      j(e, function (e) {
        return e;
      }) || []
    );
  },
  only: function (e) {
    if (!L(e)) throw Error('React.Children.only expected to receive a single React element child.');
    return e;
  },
}),
  (l.Component = _),
  (l.Fragment = d),
  (l.Profiler = h),
  (l.PureComponent = C),
  (l.StrictMode = f),
  (l.Suspense = y),
  (l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = B),
  (l.act = U),
  (l.cloneElement = function (e, t, n) {
    if (null == e)
      throw Error(
        'React.cloneElement(...): The argument must be a React element, but you passed ' + e + '.'
      );
    var r = k({}, e.props),
      i = e.key,
      a = e.ref,
      o = e._owner;
    if (null != t) {
      if (
        (void 0 !== t.ref && ((a = t.ref), (o = R.current)),
        void 0 !== t.key && (i = '' + t.key),
        e.type && e.type.defaultProps)
      )
        var s = e.type.defaultProps;
      for (l in t)
        A.call(t, l) &&
          !O.hasOwnProperty(l) &&
          (r[l] = void 0 === t[l] && void 0 !== s ? s[l] : t[l]);
    }
    var l = arguments.length - 2;
    if (1 === l) r.children = n;
    else if (1 < l) {
      s = Array(l);
      for (var c = 0; c < l; c++) s[c] = arguments[c + 2];
      r.children = s;
    }
    return { $$typeof: u, type: e.type, key: i, ref: a, props: r, _owner: o };
  }),
  (l.createContext = function (e) {
    return (
      ((e = {
        $$typeof: m,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }).Provider = { $$typeof: p, _context: e }),
      (e.Consumer = e)
    );
  }),
  (l.createElement = D),
  (l.createFactory = function (e) {
    var t = D.bind(null, e);
    return (t.type = e), t;
  }),
  (l.createRef = function () {
    return { current: null };
  }),
  (l.forwardRef = function (e) {
    return { $$typeof: g, render: e };
  }),
  (l.isValidElement = L),
  (l.lazy = function (e) {
    return { $$typeof: b, _payload: { _status: -1, _result: e }, _init: V };
  }),
  (l.memo = function (e, t) {
    return { $$typeof: v, type: e, compare: void 0 === t ? null : t };
  }),
  (l.startTransition = function (e) {
    var t = z.transition;
    z.transition = {};
    try {
      e();
    } finally {
      z.transition = t;
    }
  }),
  (l.unstable_act = U),
  (l.useCallback = function (e, t) {
    return I.current.useCallback(e, t);
  }),
  (l.useContext = function (e) {
    return I.current.useContext(e);
  }),
  (l.useDebugValue = function () {}),
  (l.useDeferredValue = function (e) {
    return I.current.useDeferredValue(e);
  }),
  (l.useEffect = function (e, t) {
    return I.current.useEffect(e, t);
  }),
  (l.useId = function () {
    return I.current.useId();
  }),
  (l.useImperativeHandle = function (e, t, n) {
    return I.current.useImperativeHandle(e, t, n);
  }),
  (l.useInsertionEffect = function (e, t) {
    return I.current.useInsertionEffect(e, t);
  }),
  (l.useLayoutEffect = function (e, t) {
    return I.current.useLayoutEffect(e, t);
  }),
  (l.useMemo = function (e, t) {
    return I.current.useMemo(e, t);
  }),
  (l.useReducer = function (e, t, n) {
    return I.current.useReducer(e, t, n);
  }),
  (l.useRef = function (e) {
    return I.current.useRef(e);
  }),
  (l.useState = function (e) {
    return I.current.useState(e);
  }),
  (l.useSyncExternalStore = function (e, t, n) {
    return I.current.useSyncExternalStore(e, t, n);
  }),
  (l.useTransition = function () {
    return I.current.useTransition();
  }),
  (l.version = '18.3.1'),
  (s.exports = l);
var $ = s.exports;
const Z = i($),
  W = r({ __proto__: null, default: Z }, [$]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var H = $,
  q = Symbol.for('react.element'),
  K = Symbol.for('react.fragment'),
  Y = Object.prototype.hasOwnProperty,
  X = H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Q = { key: !0, ref: !0, __self: !0, __source: !0 };
function G(e, t, n) {
  var r,
    i = {},
    a = null,
    o = null;
  for (r in (void 0 !== n && (a = '' + n),
  void 0 !== t.key && (a = '' + t.key),
  void 0 !== t.ref && (o = t.ref),
  t))
    Y.call(t, r) && !Q.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps) for (r in (t = e.defaultProps)) void 0 === i[r] && (i[r] = t[r]);
  return { $$typeof: q, type: e, key: a, ref: o, props: i, _owner: X.current };
}
(o.Fragment = K), (o.jsx = G), (o.jsxs = G), (a.exports = o);
var J = a.exports,
  ee = {},
  te = { exports: {} },
  ne = {},
  re = { exports: {} },
  ie = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!(function (e) {
  function t(e, t) {
    var n = e.length;
    e.push(t);
    e: for (; 0 < n; ) {
      var r = (n - 1) >>> 1,
        a = e[r];
      if (!(0 < i(a, t))) break e;
      (e[r] = t), (e[n] = a), (n = r);
    }
  }
  function n(e) {
    return 0 === e.length ? null : e[0];
  }
  function r(e) {
    if (0 === e.length) return null;
    var t = e[0],
      n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
        var s = 2 * (r + 1) - 1,
          l = e[s],
          u = s + 1,
          c = e[u];
        if (0 > i(l, n))
          u < a && 0 > i(c, l)
            ? ((e[r] = c), (e[u] = n), (r = u))
            : ((e[r] = l), (e[s] = n), (r = s));
        else {
          if (!(u < a && 0 > i(c, n))) break e;
          (e[r] = c), (e[u] = n), (r = u);
        }
      }
    }
    return t;
  }
  function i(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  if ('object' == typeof performance && 'function' == typeof performance.now) {
    var a = performance;
    e.unstable_now = function () {
      return a.now();
    };
  } else {
    var o = Date,
      s = o.now();
    e.unstable_now = function () {
      return o.now() - s;
    };
  }
  var l = [],
    u = [],
    c = 1,
    d = null,
    f = 3,
    h = !1,
    p = !1,
    m = !1,
    g = 'function' == typeof setTimeout ? setTimeout : null,
    y = 'function' == typeof clearTimeout ? clearTimeout : null,
    v = 'undefined' != typeof setImmediate ? setImmediate : null;
  function b(e) {
    for (var i = n(u); null !== i; ) {
      if (null === i.callback) r(u);
      else {
        if (!(i.startTime <= e)) break;
        r(u), (i.sortIndex = i.expirationTime), t(l, i);
      }
      i = n(u);
    }
  }
  function w(e) {
    if (((m = !1), b(e), !p))
      if (null !== n(l)) (p = !0), D(x);
      else {
        var t = n(u);
        null !== t && L(w, t.startTime - e);
      }
  }
  function x(t, i) {
    (p = !1), m && ((m = !1), y(E), (E = -1)), (h = !0);
    var a = f;
    try {
      for (b(i), d = n(l); null !== d && (!(d.expirationTime > i) || (t && !P())); ) {
        var o = d.callback;
        if ('function' == typeof o) {
          (d.callback = null), (f = d.priorityLevel);
          var s = o(d.expirationTime <= i);
          (i = e.unstable_now()),
            'function' == typeof s ? (d.callback = s) : d === n(l) && r(l),
            b(i);
        } else r(l);
        d = n(l);
      }
      if (null !== d) var c = !0;
      else {
        var g = n(u);
        null !== g && L(w, g.startTime - i), (c = !1);
      }
      return c;
    } finally {
      (d = null), (f = a), (h = !1);
    }
  }
  'undefined' != typeof navigator &&
    void 0 !== navigator.scheduling &&
    void 0 !== navigator.scheduling.isInputPending &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  var k,
    S = !1,
    _ = null,
    E = -1,
    C = 5,
    T = -1;
  function P() {
    return !(e.unstable_now() - T < C);
  }
  function A() {
    if (null !== _) {
      var t = e.unstable_now();
      T = t;
      var n = !0;
      try {
        n = _(!0, t);
      } finally {
        n ? k() : ((S = !1), (_ = null));
      }
    } else S = !1;
  }
  if ('function' == typeof v)
    k = function () {
      v(A);
    };
  else if ('undefined' != typeof MessageChannel) {
    var R = new MessageChannel(),
      O = R.port2;
    (R.port1.onmessage = A),
      (k = function () {
        O.postMessage(null);
      });
  } else
    k = function () {
      g(A, 0);
    };
  function D(e) {
    (_ = e), S || ((S = !0), k());
  }
  function L(t, n) {
    E = g(function () {
      t(e.unstable_now());
    }, n);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (e) {
      e.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      p || h || ((p = !0), D(x));
    }),
    (e.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
          )
        : (C = 0 < e ? Math.floor(1e3 / e) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return f;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (e) {
      switch (f) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = f;
      }
      var n = f;
      f = t;
      try {
        return e();
      } finally {
        f = n;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (e, t) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var n = f;
      f = e;
      try {
        return t();
      } finally {
        f = n;
      }
    }),
    (e.unstable_scheduleCallback = function (r, i, a) {
      var o = e.unstable_now();
      switch (
        ('object' == typeof a && null !== a
          ? (a = 'number' == typeof (a = a.delay) && 0 < a ? o + a : o)
          : (a = o),
        r)
      ) {
        case 1:
          var s = -1;
          break;
        case 2:
          s = 250;
          break;
        case 5:
          s = 1073741823;
          break;
        case 4:
          s = 1e4;
          break;
        default:
          s = 5e3;
      }
      return (
        (r = {
          id: c++,
          callback: i,
          priorityLevel: r,
          startTime: a,
          expirationTime: (s = a + s),
          sortIndex: -1,
        }),
        a > o
          ? ((r.sortIndex = a),
            t(u, r),
            null === n(l) && r === n(u) && (m ? (y(E), (E = -1)) : (m = !0), L(w, a - o)))
          : ((r.sortIndex = s), t(l, r), p || h || ((p = !0), D(x))),
        r
      );
    }),
    (e.unstable_shouldYield = P),
    (e.unstable_wrapCallback = function (e) {
      var t = f;
      return function () {
        var n = f;
        f = t;
        try {
          return e.apply(this, arguments);
        } finally {
          f = n;
        }
      };
    });
})(ie),
  (re.exports = ie);
var ae = re.exports,
  oe = $,
  se = ae;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ function le(e) {
  for (
    var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e, n = 1;
    n < arguments.length;
    n++
  )
    t += '&args[]=' + encodeURIComponent(arguments[n]);
  return (
    'Minified React error #' +
    e +
    '; visit ' +
    t +
    ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
  );
}
var ue = new Set(),
  ce = {};
function de(e, t) {
  fe(e, t), fe(e + 'Capture', t);
}
function fe(e, t) {
  for (ce[e] = t, e = 0; e < t.length; e++) ue.add(t[e]);
}
var he = !(
    'undefined' == typeof window ||
    void 0 === window.document ||
    void 0 === window.document.createElement
  ),
  pe = Object.prototype.hasOwnProperty,
  me =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ge = {},
  ye = {};
function ve(e, t, n, r, i, a, o) {
  (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = a),
    (this.removeEmptyString = o);
}
var be = {};
'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
  .split(' ')
  .forEach(function (e) {
    be[e] = new ve(e, 0, !1, e, null, !1, !1);
  }),
  [
    ['acceptCharset', 'accept-charset'],
    ['className', 'class'],
    ['htmlFor', 'for'],
    ['httpEquiv', 'http-equiv'],
  ].forEach(function (e) {
    var t = e[0];
    be[t] = new ve(t, 1, !1, e[1], null, !1, !1);
  }),
  ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (e) {
    be[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }),
  ['autoReverse', 'externalResourcesRequired', 'focusable', 'preserveAlpha'].forEach(function (e) {
    be[e] = new ve(e, 2, !1, e, null, !1, !1);
  }),
  'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
    .split(' ')
    .forEach(function (e) {
      be[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
    }),
  ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
    be[e] = new ve(e, 3, !0, e, null, !1, !1);
  }),
  ['capture', 'download'].forEach(function (e) {
    be[e] = new ve(e, 4, !1, e, null, !1, !1);
  }),
  ['cols', 'rows', 'size', 'span'].forEach(function (e) {
    be[e] = new ve(e, 6, !1, e, null, !1, !1);
  }),
  ['rowSpan', 'start'].forEach(function (e) {
    be[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
var we = /[\-:]([a-z])/g;
function xe(e) {
  return e[1].toUpperCase();
}
function ke(e, t, n, r) {
  var i = be.hasOwnProperty(t) ? be[t] : null;
  (null !== i
    ? 0 !== i.type
    : r || !(2 < t.length) || ('o' !== t[0] && 'O' !== t[0]) || ('n' !== t[1] && 'N' !== t[1])) &&
    ((function (e, t, n, r) {
      if (
        null == t ||
        (function (e, t, n, r) {
          if (null !== n && 0 === n.type) return !1;
          switch (typeof t) {
            case 'function':
            case 'symbol':
              return !0;
            case 'boolean':
              return (
                !r &&
                (null !== n
                  ? !n.acceptsBooleans
                  : 'data-' !== (e = e.toLowerCase().slice(0, 5)) && 'aria-' !== e)
              );
            default:
              return !1;
          }
        })(e, t, n, r)
      )
        return !0;
      if (r) return !1;
      if (null !== n)
        switch (n.type) {
          case 3:
            return !t;
          case 4:
            return !1 === t;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    })(t, n, i, r) && (n = null),
    r || null === i
      ? (function (e) {
          return (
            !!pe.call(ye, e) ||
            (!pe.call(ge, e) && (me.test(e) ? (ye[e] = !0) : ((ge[e] = !0), !1)))
          );
        })(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
      : i.mustUseProperty
        ? (e[i.propertyName] = null === n ? 3 !== i.type && '' : n)
        : ((t = i.attributeName),
          (r = i.attributeNamespace),
          null === n
            ? e.removeAttribute(t)
            : ((n = 3 === (i = i.type) || (4 === i && !0 === n) ? '' : '' + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
  .split(' ')
  .forEach(function (e) {
    var t = e.replace(we, xe);
    be[t] = new ve(t, 1, !1, e, null, !1, !1);
  }),
  'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
    .split(' ')
    .forEach(function (e) {
      var t = e.replace(we, xe);
      be[t] = new ve(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
    }),
  ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
    var t = e.replace(we, xe);
    be[t] = new ve(t, 1, !1, e, 'http://www.w3.org/XML/1998/namespace', !1, !1);
  }),
  ['tabIndex', 'crossOrigin'].forEach(function (e) {
    be[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }),
  (be.xlinkHref = new ve('xlinkHref', 1, !1, 'xlink:href', 'http://www.w3.org/1999/xlink', !0, !1)),
  ['src', 'href', 'action', 'formAction'].forEach(function (e) {
    be[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
var Se = oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  _e = Symbol.for('react.element'),
  Ee = Symbol.for('react.portal'),
  Ce = Symbol.for('react.fragment'),
  Te = Symbol.for('react.strict_mode'),
  Pe = Symbol.for('react.profiler'),
  Ae = Symbol.for('react.provider'),
  Re = Symbol.for('react.context'),
  Oe = Symbol.for('react.forward_ref'),
  De = Symbol.for('react.suspense'),
  Le = Symbol.for('react.suspense_list'),
  Ne = Symbol.for('react.memo'),
  Me = Symbol.for('react.lazy'),
  Fe = Symbol.for('react.offscreen'),
  je = Symbol.iterator;
function Ve(e) {
  return null === e || 'object' != typeof e
    ? null
    : 'function' == typeof (e = (je && e[je]) || e['@@iterator'])
      ? e
      : null;
}
var Ie,
  ze = Object.assign;
function Be(e) {
  if (void 0 === Ie)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ie = (t && t[1]) || '';
    }
  return '\n' + Ie + e;
}
var Ue = !1;
function $e(e, t) {
  if (!e || Ue) return '';
  Ue = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, 'props', {
          set: function () {
            throw Error();
          },
        }),
        'object' == typeof Reflect && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && 'string' == typeof u.stack) {
      for (
        var i = u.stack.split('\n'), a = r.stack.split('\n'), o = i.length - 1, s = a.length - 1;
        1 <= o && 0 <= s && i[o] !== a[s];

      )
        s--;
      for (; 1 <= o && 0 <= s; o--, s--)
        if (i[o] !== a[s]) {
          if (1 !== o || 1 !== s)
            do {
              if ((o--, 0 > --s || i[o] !== a[s])) {
                var l = '\n' + i[o].replace(' at new ', ' at ');
                return (
                  e.displayName &&
                    l.includes('<anonymous>') &&
                    (l = l.replace('<anonymous>', e.displayName)),
                  l
                );
              }
            } while (1 <= o && 0 <= s);
          break;
        }
    }
  } finally {
    (Ue = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : '') ? Be(e) : '';
}
function Ze(e) {
  switch (e.tag) {
    case 5:
      return Be(e.type);
    case 16:
      return Be('Lazy');
    case 13:
      return Be('Suspense');
    case 19:
      return Be('SuspenseList');
    case 0:
    case 2:
    case 15:
      return (e = $e(e.type, !1));
    case 11:
      return (e = $e(e.type.render, !1));
    case 1:
      return (e = $e(e.type, !0));
    default:
      return '';
  }
}
function We(e) {
  if (null == e) return null;
  if ('function' == typeof e) return e.displayName || e.name || null;
  if ('string' == typeof e) return e;
  switch (e) {
    case Ce:
      return 'Fragment';
    case Ee:
      return 'Portal';
    case Pe:
      return 'Profiler';
    case Te:
      return 'StrictMode';
    case De:
      return 'Suspense';
    case Le:
      return 'SuspenseList';
  }
  if ('object' == typeof e)
    switch (e.$$typeof) {
      case Re:
        return (e.displayName || 'Context') + '.Consumer';
      case Ae:
        return (e._context.displayName || 'Context') + '.Provider';
      case Oe:
        var t = e.render;
        return (
          (e = e.displayName) ||
            (e =
              '' !== (e = t.displayName || t.name || '') ? 'ForwardRef(' + e + ')' : 'ForwardRef'),
          e
        );
      case Ne:
        return null !== (t = e.displayName || null) ? t : We(e.type) || 'Memo';
      case Me:
        (t = e._payload), (e = e._init);
        try {
          return We(e(t));
        } catch (n) {}
    }
  return null;
}
function He(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return 'Cache';
    case 9:
      return (t.displayName || 'Context') + '.Consumer';
    case 10:
      return (t._context.displayName || 'Context') + '.Provider';
    case 18:
      return 'DehydratedFragment';
    case 11:
      return (
        (e = (e = t.render).displayName || e.name || ''),
        t.displayName || ('' !== e ? 'ForwardRef(' + e + ')' : 'ForwardRef')
      );
    case 7:
      return 'Fragment';
    case 5:
      return t;
    case 4:
      return 'Portal';
    case 3:
      return 'Root';
    case 6:
      return 'Text';
    case 16:
      return We(t);
    case 8:
      return t === Te ? 'StrictMode' : 'Mode';
    case 22:
      return 'Offscreen';
    case 12:
      return 'Profiler';
    case 21:
      return 'Scope';
    case 13:
      return 'Suspense';
    case 19:
      return 'SuspenseList';
    case 25:
      return 'TracingMarker';
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ('function' == typeof t) return t.displayName || t.name || null;
      if ('string' == typeof t) return t;
  }
  return null;
}
function qe(e) {
  switch (typeof e) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'undefined':
    case 'object':
      return e;
    default:
      return '';
  }
}
function Ke(e) {
  var t = e.type;
  return (e = e.nodeName) && 'input' === e.toLowerCase() && ('checkbox' === t || 'radio' === t);
}
function Ye(e) {
  e._valueTracker ||
    (e._valueTracker = (function (e) {
      var t = Ke(e) ? 'checked' : 'value',
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = '' + e[t];
      if (
        !e.hasOwnProperty(t) &&
        void 0 !== n &&
        'function' == typeof n.get &&
        'function' == typeof n.set
      ) {
        var i = n.get,
          a = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (e) {
              (r = '' + e), a.call(this, e);
            },
          }),
          Object.defineProperty(e, t, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (e) {
              r = '' + e;
            },
            stopTracking: function () {
              (e._valueTracker = null), delete e[t];
            },
          }
        );
      }
    })(e));
}
function Xe(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = '';
  return (
    e && (r = Ke(e) ? (e.checked ? 'true' : 'false') : e.value),
    (e = r) !== n && (t.setValue(e), !0)
  );
}
function Qe(e) {
  if (void 0 === (e = e || ('undefined' != typeof document ? document : void 0))) return null;
  try {
    return e.activeElement || e.body;
  } catch (t) {
    return e.body;
  }
}
function Ge(e, t) {
  var n = t.checked;
  return ze({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != n ? n : e._wrapperState.initialChecked,
  });
}
function Je(e, t) {
  var n = null == t.defaultValue ? '' : t.defaultValue,
    r = null != t.checked ? t.checked : t.defaultChecked;
  (n = qe(null != t.value ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled: 'checkbox' === t.type || 'radio' === t.type ? null != t.checked : null != t.value,
    });
}
function et(e, t) {
  null != (t = t.checked) && ke(e, 'checked', t, !1);
}
function tt(e, t) {
  et(e, t);
  var n = qe(t.value),
    r = t.type;
  if (null != n)
    'number' === r
      ? ((0 === n && '' === e.value) || e.value != n) && (e.value = '' + n)
      : e.value !== '' + n && (e.value = '' + n);
  else if ('submit' === r || 'reset' === r) return void e.removeAttribute('value');
  t.hasOwnProperty('value')
    ? rt(e, t.type, n)
    : t.hasOwnProperty('defaultValue') && rt(e, t.type, qe(t.defaultValue)),
    null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked);
}
function nt(e, t, n) {
  if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
    var r = t.type;
    if (!(('submit' !== r && 'reset' !== r) || (void 0 !== t.value && null !== t.value))) return;
    (t = '' + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  '' !== (n = e.name) && (e.name = ''),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    '' !== n && (e.name = n);
}
function rt(e, t, n) {
  ('number' === t && Qe(e.ownerDocument) === e) ||
    (null == n
      ? (e.defaultValue = '' + e._wrapperState.initialValue)
      : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
}
var it = Array.isArray;
function at(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t['$' + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty('$' + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = '' + qe(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) return (e[i].selected = !0), void (r && (e[i].defaultSelected = !0));
      null !== t || e[i].disabled || (t = e[i]);
    }
    null !== t && (t.selected = !0);
  }
}
function ot(e, t) {
  if (null != t.dangerouslySetInnerHTML) throw Error(le(91));
  return ze({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: '' + e._wrapperState.initialValue,
  });
}
function st(e, t) {
  var n = t.value;
  if (null == n) {
    if (((n = t.children), (t = t.defaultValue), null != n)) {
      if (null != t) throw Error(le(92));
      if (it(n)) {
        if (1 < n.length) throw Error(le(93));
        n = n[0];
      }
      t = n;
    }
    null == t && (t = ''), (n = t);
  }
  e._wrapperState = { initialValue: qe(n) };
}
function lt(e, t) {
  var n = qe(t.value),
    r = qe(t.defaultValue);
  null != n &&
    ((n = '' + n) !== e.value && (e.value = n),
    null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
    null != r && (e.defaultValue = '' + r);
}
function ut(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && '' !== t && null !== t && (e.value = t);
}
function ct(e) {
  switch (e) {
    case 'svg':
      return 'http://www.w3.org/2000/svg';
    case 'math':
      return 'http://www.w3.org/1998/Math/MathML';
    default:
      return 'http://www.w3.org/1999/xhtml';
  }
}
function dt(e, t) {
  return null == e || 'http://www.w3.org/1999/xhtml' === e
    ? ct(t)
    : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === t
      ? 'http://www.w3.org/1999/xhtml'
      : e;
}
var ft,
  ht,
  pt =
    ((ht = function (e, t) {
      if ('http://www.w3.org/2000/svg' !== e.namespaceURI || 'innerHTML' in e) e.innerHTML = t;
      else {
        for (
          (ft = ft || document.createElement('div')).innerHTML =
            '<svg>' + t.valueOf().toString() + '</svg>',
            t = ft.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    }),
    'undefined' != typeof MSApp && MSApp.execUnsafeLocalFunction
      ? function (e, t, n, r) {
          MSApp.execUnsafeLocalFunction(function () {
            return ht(e, t);
          });
        }
      : ht);
function mt(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && 3 === n.nodeType) return void (n.nodeValue = t);
  }
  e.textContent = t;
}
var gt = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  yt = ['Webkit', 'ms', 'Moz', 'O'];
function vt(e, t, n) {
  return null == t || 'boolean' == typeof t || '' === t
    ? ''
    : n || 'number' != typeof t || 0 === t || (gt.hasOwnProperty(e) && gt[e])
      ? ('' + t).trim()
      : t + 'px';
}
function bt(e, t) {
  for (var n in ((e = e.style), t))
    if (t.hasOwnProperty(n)) {
      var r = 0 === n.indexOf('--'),
        i = vt(n, t[n], r);
      'float' === n && (n = 'cssFloat'), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
Object.keys(gt).forEach(function (e) {
  yt.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (gt[t] = gt[e]);
  });
});
var wt = ze(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
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
  }
);
function xt(e, t) {
  if (t) {
    if (wt[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(le(137, e));
    if (null != t.dangerouslySetInnerHTML) {
      if (null != t.children) throw Error(le(60));
      if ('object' != typeof t.dangerouslySetInnerHTML || !('__html' in t.dangerouslySetInnerHTML))
        throw Error(le(61));
    }
    if (null != t.style && 'object' != typeof t.style) throw Error(le(62));
  }
}
function kt(e, t) {
  if (-1 === e.indexOf('-')) return 'string' == typeof t.is;
  switch (e) {
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return !1;
    default:
      return !0;
  }
}
var St = null;
function _t(e) {
  return (
    (e = e.target || e.srcElement || window).correspondingUseElement &&
      (e = e.correspondingUseElement),
    3 === e.nodeType ? e.parentNode : e
  );
}
var Et = null,
  Ct = null,
  Tt = null;
function Pt(e) {
  if ((e = ka(e))) {
    if ('function' != typeof Et) throw Error(le(280));
    var t = e.stateNode;
    t && ((t = _a(t)), Et(e.stateNode, e.type, t));
  }
}
function At(e) {
  Ct ? (Tt ? Tt.push(e) : (Tt = [e])) : (Ct = e);
}
function Rt() {
  if (Ct) {
    var e = Ct,
      t = Tt;
    if (((Tt = Ct = null), Pt(e), t)) for (e = 0; e < t.length; e++) Pt(t[e]);
  }
}
function Ot(e, t) {
  return e(t);
}
function Dt() {}
var Lt = !1;
function Nt(e, t, n) {
  if (Lt) return e(t, n);
  Lt = !0;
  try {
    return Ot(e, t, n);
  } finally {
    (Lt = !1), (null !== Ct || null !== Tt) && (Dt(), Rt());
  }
}
function Mt(e, t) {
  var n = e.stateNode;
  if (null === n) return null;
  var r = _a(n);
  if (null === r) return null;
  n = r[t];
  e: switch (t) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
    case 'onMouseEnter':
      (r = !r.disabled) ||
        (r = !('button' === (e = e.type) || 'input' === e || 'select' === e || 'textarea' === e)),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && 'function' != typeof n) throw Error(le(231, t, typeof n));
  return n;
}
var Ft = !1;
if (he)
  try {
    var jt = {};
    Object.defineProperty(jt, 'passive', {
      get: function () {
        Ft = !0;
      },
    }),
      window.addEventListener('test', jt, jt),
      window.removeEventListener('test', jt, jt);
  } catch (ht) {
    Ft = !1;
  }
function Vt(e, t, n, r, i, a, o, s, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var It = !1,
  zt = null,
  Bt = !1,
  Ut = null,
  $t = {
    onError: function (e) {
      (It = !0), (zt = e);
    },
  };
function Zt(e, t, n, r, i, a, o, s, l) {
  (It = !1), (zt = null), Vt.apply($t, arguments);
}
function Wt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do {
      !!(4098 & (t = e).flags) && (n = t.return), (e = t.return);
    } while (e);
  }
  return 3 === t.tag ? n : null;
}
function Ht(e) {
  if (13 === e.tag) {
    var t = e.memoizedState;
    if ((null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t))
      return t.dehydrated;
  }
  return null;
}
function qt(e) {
  if (Wt(e) !== e) throw Error(le(188));
}
function Kt(e) {
  return null !==
    (e = (function (e) {
      var t = e.alternate;
      if (!t) {
        if (null === (t = Wt(e))) throw Error(le(188));
        return t !== e ? null : e;
      }
      for (var n = e, r = t; ; ) {
        var i = n.return;
        if (null === i) break;
        var a = i.alternate;
        if (null === a) {
          if (null !== (r = i.return)) {
            n = r;
            continue;
          }
          break;
        }
        if (i.child === a.child) {
          for (a = i.child; a; ) {
            if (a === n) return qt(i), e;
            if (a === r) return qt(i), t;
            a = a.sibling;
          }
          throw Error(le(188));
        }
        if (n.return !== r.return) (n = i), (r = a);
        else {
          for (var o = !1, s = i.child; s; ) {
            if (s === n) {
              (o = !0), (n = i), (r = a);
              break;
            }
            if (s === r) {
              (o = !0), (r = i), (n = a);
              break;
            }
            s = s.sibling;
          }
          if (!o) {
            for (s = a.child; s; ) {
              if (s === n) {
                (o = !0), (n = a), (r = i);
                break;
              }
              if (s === r) {
                (o = !0), (r = a), (n = i);
                break;
              }
              s = s.sibling;
            }
            if (!o) throw Error(le(189));
          }
        }
        if (n.alternate !== r) throw Error(le(190));
      }
      if (3 !== n.tag) throw Error(le(188));
      return n.stateNode.current === n ? e : t;
    })(e))
    ? Yt(e)
    : null;
}
function Yt(e) {
  if (5 === e.tag || 6 === e.tag) return e;
  for (e = e.child; null !== e; ) {
    var t = Yt(e);
    if (null !== t) return t;
    e = e.sibling;
  }
  return null;
}
var Xt = se.unstable_scheduleCallback,
  Qt = se.unstable_cancelCallback,
  Gt = se.unstable_shouldYield,
  Jt = se.unstable_requestPaint,
  en = se.unstable_now,
  tn = se.unstable_getCurrentPriorityLevel,
  nn = se.unstable_ImmediatePriority,
  rn = se.unstable_UserBlockingPriority,
  an = se.unstable_NormalPriority,
  on = se.unstable_LowPriority,
  sn = se.unstable_IdlePriority,
  ln = null,
  un = null;
var cn = Math.clz32
    ? Math.clz32
    : function (e) {
        return (e >>>= 0), 0 === e ? 32 : (31 - ((dn(e) / fn) | 0)) | 0;
      },
  dn = Math.log,
  fn = Math.LN2;
var hn = 64,
  pn = 4194304;
function mn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return 4194240 & e;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return 130023424 & e;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function gn(e, t) {
  var n = e.pendingLanes;
  if (0 === n) return 0;
  var r = 0,
    i = e.suspendedLanes,
    a = e.pingedLanes,
    o = 268435455 & n;
  if (0 !== o) {
    var s = o & ~i;
    0 !== s ? (r = mn(s)) : 0 !== (a &= o) && (r = mn(a));
  } else 0 !== (o = n & ~i) ? (r = mn(o)) : 0 !== a && (r = mn(a));
  if (0 === r) return 0;
  if (0 !== t && t !== r && !(t & i) && ((i = r & -r) >= (a = t & -t) || (16 === i && 4194240 & a)))
    return t;
  if ((4 & r && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
    for (e = e.entanglements, t &= r; 0 < t; ) (i = 1 << (n = 31 - cn(t))), (r |= e[n]), (t &= ~i);
  return r;
}
function yn(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    default:
      return -1;
  }
}
function vn(e) {
  return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0;
}
function bn() {
  var e = hn;
  return !(4194240 & (hn <<= 1)) && (hn = 64), e;
}
function wn(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function xn(e, t, n) {
  (e.pendingLanes |= t),
    536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    ((e = e.eventTimes)[(t = 31 - cn(t))] = n);
}
function kn(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - cn(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var Sn = 0;
function _n(e) {
  return 1 < (e &= -e) ? (4 < e ? (268435455 & e ? 16 : 536870912) : 4) : 1;
}
var En,
  Cn,
  Tn,
  Pn,
  An,
  Rn = !1,
  On = [],
  Dn = null,
  Ln = null,
  Nn = null,
  Mn = new Map(),
  Fn = new Map(),
  jn = [],
  Vn =
    'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
      ' '
    );
function In(e, t) {
  switch (e) {
    case 'focusin':
    case 'focusout':
      Dn = null;
      break;
    case 'dragenter':
    case 'dragleave':
      Ln = null;
      break;
    case 'mouseover':
    case 'mouseout':
      Nn = null;
      break;
    case 'pointerover':
    case 'pointerout':
      Mn.delete(t.pointerId);
      break;
    case 'gotpointercapture':
    case 'lostpointercapture':
      Fn.delete(t.pointerId);
  }
}
function zn(e, t, n, r, i, a) {
  return null === e || e.nativeEvent !== a
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: a,
        targetContainers: [i],
      }),
      null !== t && null !== (t = ka(t)) && Cn(t),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      null !== i && -1 === t.indexOf(i) && t.push(i),
      e);
}
function Bn(e) {
  var t = xa(e.target);
  if (null !== t) {
    var n = Wt(t);
    if (null !== n)
      if (13 === (t = n.tag)) {
        if (null !== (t = Ht(n)))
          return (
            (e.blockedOn = t),
            void An(e.priority, function () {
              Tn(n);
            })
          );
      } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated)
        return void (e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null);
  }
  e.blockedOn = null;
}
function Un(e) {
  if (null !== e.blockedOn) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Jn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (null !== n) return null !== (t = ka(n)) && Cn(t), (e.blockedOn = n), !1;
    var r = new (n = e.nativeEvent).constructor(n.type, n);
    (St = r), n.target.dispatchEvent(r), (St = null), t.shift();
  }
  return !0;
}
function $n(e, t, n) {
  Un(e) && n.delete(t);
}
function Zn() {
  (Rn = !1),
    null !== Dn && Un(Dn) && (Dn = null),
    null !== Ln && Un(Ln) && (Ln = null),
    null !== Nn && Un(Nn) && (Nn = null),
    Mn.forEach($n),
    Fn.forEach($n);
}
function Wn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Rn || ((Rn = !0), se.unstable_scheduleCallback(se.unstable_NormalPriority, Zn)));
}
function Hn(e) {
  function t(t) {
    return Wn(t, e);
  }
  if (0 < On.length) {
    Wn(On[0], e);
    for (var n = 1; n < On.length; n++) {
      var r = On[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    null !== Dn && Wn(Dn, e),
      null !== Ln && Wn(Ln, e),
      null !== Nn && Wn(Nn, e),
      Mn.forEach(t),
      Fn.forEach(t),
      n = 0;
    n < jn.length;
    n++
  )
    (r = jn[n]).blockedOn === e && (r.blockedOn = null);
  for (; 0 < jn.length && null === (n = jn[0]).blockedOn; )
    Bn(n), null === n.blockedOn && jn.shift();
}
var qn = Se.ReactCurrentBatchConfig,
  Kn = !0;
function Yn(e, t, n, r) {
  var i = Sn,
    a = qn.transition;
  qn.transition = null;
  try {
    (Sn = 1), Qn(e, t, n, r);
  } finally {
    (Sn = i), (qn.transition = a);
  }
}
function Xn(e, t, n, r) {
  var i = Sn,
    a = qn.transition;
  qn.transition = null;
  try {
    (Sn = 4), Qn(e, t, n, r);
  } finally {
    (Sn = i), (qn.transition = a);
  }
}
function Qn(e, t, n, r) {
  if (Kn) {
    var i = Jn(e, t, n, r);
    if (null === i) qi(e, t, r, Gn, n), In(e, r);
    else if (
      (function (e, t, n, r, i) {
        switch (t) {
          case 'focusin':
            return (Dn = zn(Dn, e, t, n, r, i)), !0;
          case 'dragenter':
            return (Ln = zn(Ln, e, t, n, r, i)), !0;
          case 'mouseover':
            return (Nn = zn(Nn, e, t, n, r, i)), !0;
          case 'pointerover':
            var a = i.pointerId;
            return Mn.set(a, zn(Mn.get(a) || null, e, t, n, r, i)), !0;
          case 'gotpointercapture':
            return (a = i.pointerId), Fn.set(a, zn(Fn.get(a) || null, e, t, n, r, i)), !0;
        }
        return !1;
      })(i, e, t, n, r)
    )
      r.stopPropagation();
    else if ((In(e, r), 4 & t && -1 < Vn.indexOf(e))) {
      for (; null !== i; ) {
        var a = ka(i);
        if ((null !== a && En(a), null === (a = Jn(e, t, n, r)) && qi(e, t, r, Gn, n), a === i))
          break;
        i = a;
      }
      null !== i && r.stopPropagation();
    } else qi(e, t, r, null, n);
  }
}
var Gn = null;
function Jn(e, t, n, r) {
  if (((Gn = null), null !== (e = xa((e = _t(r))))))
    if (null === (t = Wt(e))) e = null;
    else if (13 === (n = t.tag)) {
      if (null !== (e = Ht(t))) return e;
      e = null;
    } else if (3 === n) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return 3 === t.tag ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Gn = e), null;
}
function er(e) {
  switch (e) {
    case 'cancel':
    case 'click':
    case 'close':
    case 'contextmenu':
    case 'copy':
    case 'cut':
    case 'auxclick':
    case 'dblclick':
    case 'dragend':
    case 'dragstart':
    case 'drop':
    case 'focusin':
    case 'focusout':
    case 'input':
    case 'invalid':
    case 'keydown':
    case 'keypress':
    case 'keyup':
    case 'mousedown':
    case 'mouseup':
    case 'paste':
    case 'pause':
    case 'play':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
    case 'ratechange':
    case 'reset':
    case 'resize':
    case 'seeked':
    case 'submit':
    case 'touchcancel':
    case 'touchend':
    case 'touchstart':
    case 'volumechange':
    case 'change':
    case 'selectionchange':
    case 'textInput':
    case 'compositionstart':
    case 'compositionend':
    case 'compositionupdate':
    case 'beforeblur':
    case 'afterblur':
    case 'beforeinput':
    case 'blur':
    case 'fullscreenchange':
    case 'focus':
    case 'hashchange':
    case 'popstate':
    case 'select':
    case 'selectstart':
      return 1;
    case 'drag':
    case 'dragenter':
    case 'dragexit':
    case 'dragleave':
    case 'dragover':
    case 'mousemove':
    case 'mouseout':
    case 'mouseover':
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'scroll':
    case 'toggle':
    case 'touchmove':
    case 'wheel':
    case 'mouseenter':
    case 'mouseleave':
    case 'pointerenter':
    case 'pointerleave':
      return 4;
    case 'message':
      switch (tn()) {
        case nn:
          return 1;
        case rn:
          return 4;
        case an:
        case on:
          return 16;
        case sn:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var tr = null,
  nr = null,
  rr = null;
function ir() {
  if (rr) return rr;
  var e,
    t,
    n = nr,
    r = n.length,
    i = 'value' in tr ? tr.value : tr.textContent,
    a = i.length;
  for (e = 0; e < r && n[e] === i[e]; e++);
  var o = r - e;
  for (t = 1; t <= o && n[r - t] === i[a - t]; t++);
  return (rr = i.slice(e, 1 < t ? 1 - t : void 0));
}
function ar(e) {
  var t = e.keyCode;
  return (
    'charCode' in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : (e = t),
    10 === e && (e = 13),
    32 <= e || 13 === e ? e : 0
  );
}
function or() {
  return !0;
}
function sr() {
  return !1;
}
function lr(e) {
  function t(t, n, r, i, a) {
    for (var o in ((this._reactName = t),
    (this._targetInst = r),
    (this.type = n),
    (this.nativeEvent = i),
    (this.target = a),
    (this.currentTarget = null),
    e))
      e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
    return (
      (this.isDefaultPrevented = (
        null != i.defaultPrevented ? i.defaultPrevented : !1 === i.returnValue
      )
        ? or
        : sr),
      (this.isPropagationStopped = sr),
      this
    );
  }
  return (
    ze(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : 'unknown' != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = or));
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : 'unknown' != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = or));
      },
      persist: function () {},
      isPersistent: or,
    }),
    t
  );
}
var ur,
  cr,
  dr,
  fr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  hr = lr(fr),
  pr = ze({}, fr, { view: 0, detail: 0 }),
  mr = lr(pr),
  gr = ze({}, pr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Pr,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return void 0 === e.relatedTarget
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return 'movementX' in e
        ? e.movementX
        : (e !== dr &&
            (dr && 'mousemove' === e.type
              ? ((ur = e.screenX - dr.screenX), (cr = e.screenY - dr.screenY))
              : (cr = ur = 0),
            (dr = e)),
          ur);
    },
    movementY: function (e) {
      return 'movementY' in e ? e.movementY : cr;
    },
  }),
  yr = lr(gr),
  vr = lr(ze({}, gr, { dataTransfer: 0 })),
  br = lr(ze({}, pr, { relatedTarget: 0 })),
  wr = lr(ze({}, fr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })),
  xr = ze({}, fr, {
    clipboardData: function (e) {
      return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
    },
  }),
  kr = lr(xr),
  Sr = lr(ze({}, fr, { data: 0 })),
  _r = {
    Esc: 'Escape',
    Spacebar: ' ',
    Left: 'ArrowLeft',
    Up: 'ArrowUp',
    Right: 'ArrowRight',
    Down: 'ArrowDown',
    Del: 'Delete',
    Win: 'OS',
    Menu: 'ContextMenu',
    Apps: 'ContextMenu',
    Scroll: 'ScrollLock',
    MozPrintableKey: 'Unidentified',
  },
  Er = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta',
  },
  Cr = { Alt: 'altKey', Control: 'ctrlKey', Meta: 'metaKey', Shift: 'shiftKey' };
function Tr(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : !!(e = Cr[e]) && !!t[e];
}
function Pr() {
  return Tr;
}
var Ar = ze({}, pr, {
    key: function (e) {
      if (e.key) {
        var t = _r[e.key] || e.key;
        if ('Unidentified' !== t) return t;
      }
      return 'keypress' === e.type
        ? 13 === (e = ar(e))
          ? 'Enter'
          : String.fromCharCode(e)
        : 'keydown' === e.type || 'keyup' === e.type
          ? Er[e.keyCode] || 'Unidentified'
          : '';
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Pr,
    charCode: function (e) {
      return 'keypress' === e.type ? ar(e) : 0;
    },
    keyCode: function (e) {
      return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
    },
    which: function (e) {
      return 'keypress' === e.type
        ? ar(e)
        : 'keydown' === e.type || 'keyup' === e.type
          ? e.keyCode
          : 0;
    },
  }),
  Rr = lr(Ar),
  Or = lr(
    ze({}, gr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    })
  ),
  Dr = lr(
    ze({}, pr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Pr,
    })
  ),
  Lr = lr(ze({}, fr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
  Nr = ze({}, gr, {
    deltaX: function (e) {
      return 'deltaX' in e ? e.deltaX : 'wheelDeltaX' in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return 'deltaY' in e
        ? e.deltaY
        : 'wheelDeltaY' in e
          ? -e.wheelDeltaY
          : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Mr = lr(Nr),
  Fr = [9, 13, 27, 32],
  jr = he && 'CompositionEvent' in window,
  Vr = null;
he && 'documentMode' in document && (Vr = document.documentMode);
var Ir = he && 'TextEvent' in window && !Vr,
  zr = he && (!jr || (Vr && 8 < Vr && 11 >= Vr)),
  Br = String.fromCharCode(32),
  Ur = !1;
function $r(e, t) {
  switch (e) {
    case 'keyup':
      return -1 !== Fr.indexOf(t.keyCode);
    case 'keydown':
      return 229 !== t.keyCode;
    case 'keypress':
    case 'mousedown':
    case 'focusout':
      return !0;
    default:
      return !1;
  }
}
function Zr(e) {
  return 'object' == typeof (e = e.detail) && 'data' in e ? e.data : null;
}
var Wr = !1;
var Hr = {
  color: !0,
  date: !0,
  datetime: !0,
  'datetime-local': !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function qr(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return 'input' === t ? !!Hr[e.type] : 'textarea' === t;
}
function Kr(e, t, n, r) {
  At(r),
    0 < (t = Yi(t, 'onChange')).length &&
      ((n = new hr('onChange', 'change', null, n, r)), e.push({ event: n, listeners: t }));
}
var Yr = null,
  Xr = null;
function Qr(e) {
  Bi(e, 0);
}
function Gr(e) {
  if (Xe(Sa(e))) return e;
}
function Jr(e, t) {
  if ('change' === e) return t;
}
var ei = !1;
if (he) {
  var ti;
  if (he) {
    var ni = 'oninput' in document;
    if (!ni) {
      var ri = document.createElement('div');
      ri.setAttribute('oninput', 'return;'), (ni = 'function' == typeof ri.oninput);
    }
    ti = ni;
  } else ti = !1;
  ei = ti && (!document.documentMode || 9 < document.documentMode);
}
function ii() {
  Yr && (Yr.detachEvent('onpropertychange', ai), (Xr = Yr = null));
}
function ai(e) {
  if ('value' === e.propertyName && Gr(Xr)) {
    var t = [];
    Kr(t, Xr, e, _t(e)), Nt(Qr, t);
  }
}
function oi(e, t, n) {
  'focusin' === e
    ? (ii(), (Xr = n), (Yr = t).attachEvent('onpropertychange', ai))
    : 'focusout' === e && ii();
}
function si(e) {
  if ('selectionchange' === e || 'keyup' === e || 'keydown' === e) return Gr(Xr);
}
function li(e, t) {
  if ('click' === e) return Gr(t);
}
function ui(e, t) {
  if ('input' === e || 'change' === e) return Gr(t);
}
var ci =
  'function' == typeof Object.is
    ? Object.is
    : function (e, t) {
        return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
      };
function di(e, t) {
  if (ci(e, t)) return !0;
  if ('object' != typeof e || null === e || 'object' != typeof t || null === t) return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!pe.call(t, i) || !ci(e[i], t[i])) return !1;
  }
  return !0;
}
function fi(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function hi(e, t) {
  var n,
    r = fi(e);
  for (e = 0; r; ) {
    if (3 === r.nodeType) {
      if (((n = e + r.textContent.length), e <= t && n >= t)) return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r; ) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = fi(r);
  }
}
function pi(e, t) {
  return (
    !(!e || !t) &&
    (e === t ||
      ((!e || 3 !== e.nodeType) &&
        (t && 3 === t.nodeType
          ? pi(e, t.parentNode)
          : 'contains' in e
            ? e.contains(t)
            : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t)))))
  );
}
function mi() {
  for (var e = window, t = Qe(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = 'string' == typeof t.contentWindow.location.href;
    } catch (r) {
      n = !1;
    }
    if (!n) break;
    t = Qe((e = t.contentWindow).document);
  }
  return t;
}
function gi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    (('input' === t &&
      ('text' === e.type ||
        'search' === e.type ||
        'tel' === e.type ||
        'url' === e.type ||
        'password' === e.type)) ||
      'textarea' === t ||
      'true' === e.contentEditable)
  );
}
function yi(e) {
  var t = mi(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && pi(n.ownerDocument.documentElement, n)) {
    if (null !== r && gi(n))
      if (((t = r.start), void 0 === (e = r.end) && (e = t), 'selectionStart' in n))
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if ((e = ((t = n.ownerDocument || document) && t.defaultView) || window).getSelection) {
        e = e.getSelection();
        var i = n.textContent.length,
          a = Math.min(r.start, i);
        (r = void 0 === r.end ? a : Math.min(r.end, i)),
          !e.extend && a > r && ((i = r), (r = a), (a = i)),
          (i = hi(n, a));
        var o = hi(n, r);
        i &&
          o &&
          (1 !== e.rangeCount ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()).setStart(i.node, i.offset),
          e.removeAllRanges(),
          a > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    for (t = [], e = n; (e = e.parentNode); )
      1 === e.nodeType && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for ('function' == typeof n.focus && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]).element.scrollLeft = e.left), (e.element.scrollTop = e.top);
  }
}
var vi = he && 'documentMode' in document && 11 >= document.documentMode,
  bi = null,
  wi = null,
  xi = null,
  ki = !1;
function Si(e, t, n) {
  var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
  ki ||
    null == bi ||
    bi !== Qe(r) ||
    ('selectionStart' in (r = bi) && gi(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : (r = {
          anchorNode: (r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()).anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        }),
    (xi && di(xi, r)) ||
      ((xi = r),
      0 < (r = Yi(wi, 'onSelect')).length &&
        ((t = new hr('onSelect', 'select', null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = bi))));
}
function _i(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n['Webkit' + e] = 'webkit' + t),
    (n['Moz' + e] = 'moz' + t),
    n
  );
}
var Ei = {
    animationend: _i('Animation', 'AnimationEnd'),
    animationiteration: _i('Animation', 'AnimationIteration'),
    animationstart: _i('Animation', 'AnimationStart'),
    transitionend: _i('Transition', 'TransitionEnd'),
  },
  Ci = {},
  Ti = {};
function Pi(e) {
  if (Ci[e]) return Ci[e];
  if (!Ei[e]) return e;
  var t,
    n = Ei[e];
  for (t in n) if (n.hasOwnProperty(t) && t in Ti) return (Ci[e] = n[t]);
  return e;
}
he &&
  ((Ti = document.createElement('div').style),
  'AnimationEvent' in window ||
    (delete Ei.animationend.animation,
    delete Ei.animationiteration.animation,
    delete Ei.animationstart.animation),
  'TransitionEvent' in window || delete Ei.transitionend.transition);
var Ai = Pi('animationend'),
  Ri = Pi('animationiteration'),
  Oi = Pi('animationstart'),
  Di = Pi('transitionend'),
  Li = new Map(),
  Ni =
    'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
      ' '
    );
function Mi(e, t) {
  Li.set(e, t), de(t, [e]);
}
for (var Fi = 0; Fi < Ni.length; Fi++) {
  var ji = Ni[Fi];
  Mi(ji.toLowerCase(), 'on' + (ji[0].toUpperCase() + ji.slice(1)));
}
Mi(Ai, 'onAnimationEnd'),
  Mi(Ri, 'onAnimationIteration'),
  Mi(Oi, 'onAnimationStart'),
  Mi('dblclick', 'onDoubleClick'),
  Mi('focusin', 'onFocus'),
  Mi('focusout', 'onBlur'),
  Mi(Di, 'onTransitionEnd'),
  fe('onMouseEnter', ['mouseout', 'mouseover']),
  fe('onMouseLeave', ['mouseout', 'mouseover']),
  fe('onPointerEnter', ['pointerout', 'pointerover']),
  fe('onPointerLeave', ['pointerout', 'pointerover']),
  de('onChange', 'change click focusin focusout input keydown keyup selectionchange'.split(' ')),
  de(
    'onSelect',
    'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
      ' '
    )
  ),
  de('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
  de('onCompositionEnd', 'compositionend focusout keydown keypress keyup mousedown'.split(' ')),
  de('onCompositionStart', 'compositionstart focusout keydown keypress keyup mousedown'.split(' ')),
  de(
    'onCompositionUpdate',
    'compositionupdate focusout keydown keypress keyup mousedown'.split(' ')
  );
var Vi =
    'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
      ' '
    ),
  Ii = new Set('cancel close invalid load scroll toggle'.split(' ').concat(Vi));
function zi(e, t, n) {
  var r = e.type || 'unknown-event';
  (e.currentTarget = n),
    (function (e, t, n, r, i, a, o, s, l) {
      if ((Zt.apply(this, arguments), It)) {
        if (!It) throw Error(le(198));
        var u = zt;
        (It = !1), (zt = null), Bt || ((Bt = !0), (Ut = u));
      }
    })(r, t, void 0, e),
    (e.currentTarget = null);
}
function Bi(e, t) {
  t = !!(4 & t);
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var a = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o],
            l = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), l !== a && i.isPropagationStopped())) break e;
          zi(i, s, u), (a = l);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((l = (s = r[o]).instance),
            (u = s.currentTarget),
            (s = s.listener),
            l !== a && i.isPropagationStopped())
          )
            break e;
          zi(i, s, u), (a = l);
        }
    }
  }
  if (Bt) throw ((e = Ut), (Bt = !1), (Ut = null), e);
}
function Ui(e, t) {
  var n = t[va];
  void 0 === n && (n = t[va] = new Set());
  var r = e + '__bubble';
  n.has(r) || (Hi(t, e, 2, !1), n.add(r));
}
function $i(e, t, n) {
  var r = 0;
  t && (r |= 4), Hi(n, e, r, t);
}
var Zi = '_reactListening' + Math.random().toString(36).slice(2);
function Wi(e) {
  if (!e[Zi]) {
    (e[Zi] = !0),
      ue.forEach(function (t) {
        'selectionchange' !== t && (Ii.has(t) || $i(t, !1, e), $i(t, !0, e));
      });
    var t = 9 === e.nodeType ? e : e.ownerDocument;
    null === t || t[Zi] || ((t[Zi] = !0), $i('selectionchange', !1, t));
  }
}
function Hi(e, t, n, r) {
  switch (er(t)) {
    case 1:
      var i = Yn;
      break;
    case 4:
      i = Xn;
      break;
    default:
      i = Qn;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !Ft || ('touchstart' !== t && 'touchmove' !== t && 'wheel' !== t) || (i = !0),
    r
      ? void 0 !== i
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : void 0 !== i
        ? e.addEventListener(t, n, { passive: i })
        : e.addEventListener(t, n, !1);
}
function qi(e, t, n, r, i) {
  var a = r;
  if (!(1 & t || 2 & t || null === r))
    e: for (;;) {
      if (null === r) return;
      var o = r.tag;
      if (3 === o || 4 === o) {
        var s = r.stateNode.containerInfo;
        if (s === i || (8 === s.nodeType && s.parentNode === i)) break;
        if (4 === o)
          for (o = r.return; null !== o; ) {
            var l = o.tag;
            if (
              (3 === l || 4 === l) &&
              ((l = o.stateNode.containerInfo) === i || (8 === l.nodeType && l.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; null !== s; ) {
          if (null === (o = xa(s))) return;
          if (5 === (l = o.tag) || 6 === l) {
            r = a = o;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  Nt(function () {
    var r = a,
      i = _t(n),
      o = [];
    e: {
      var s = Li.get(e);
      if (void 0 !== s) {
        var l = hr,
          u = e;
        switch (e) {
          case 'keypress':
            if (0 === ar(n)) break e;
          case 'keydown':
          case 'keyup':
            l = Rr;
            break;
          case 'focusin':
            (u = 'focus'), (l = br);
            break;
          case 'focusout':
            (u = 'blur'), (l = br);
            break;
          case 'beforeblur':
          case 'afterblur':
            l = br;
            break;
          case 'click':
            if (2 === n.button) break e;
          case 'auxclick':
          case 'dblclick':
          case 'mousedown':
          case 'mousemove':
          case 'mouseup':
          case 'mouseout':
          case 'mouseover':
          case 'contextmenu':
            l = yr;
            break;
          case 'drag':
          case 'dragend':
          case 'dragenter':
          case 'dragexit':
          case 'dragleave':
          case 'dragover':
          case 'dragstart':
          case 'drop':
            l = vr;
            break;
          case 'touchcancel':
          case 'touchend':
          case 'touchmove':
          case 'touchstart':
            l = Dr;
            break;
          case Ai:
          case Ri:
          case Oi:
            l = wr;
            break;
          case Di:
            l = Lr;
            break;
          case 'scroll':
            l = mr;
            break;
          case 'wheel':
            l = Mr;
            break;
          case 'copy':
          case 'cut':
          case 'paste':
            l = kr;
            break;
          case 'gotpointercapture':
          case 'lostpointercapture':
          case 'pointercancel':
          case 'pointerdown':
          case 'pointermove':
          case 'pointerout':
          case 'pointerover':
          case 'pointerup':
            l = Or;
        }
        var c = !!(4 & t),
          d = !c && 'scroll' === e,
          f = c ? (null !== s ? s + 'Capture' : null) : s;
        c = [];
        for (var h, p = r; null !== p; ) {
          var m = (h = p).stateNode;
          if (
            (5 === h.tag &&
              null !== m &&
              ((h = m), null !== f && null != (m = Mt(p, f)) && c.push(Ki(p, m, h))),
            d)
          )
            break;
          p = p.return;
        }
        0 < c.length && ((s = new l(s, u, null, n, i)), o.push({ event: s, listeners: c }));
      }
    }
    if (!(7 & t)) {
      if (
        ((l = 'mouseout' === e || 'pointerout' === e),
        (!(s = 'mouseover' === e || 'pointerover' === e) ||
          n === St ||
          !(u = n.relatedTarget || n.fromElement) ||
          (!xa(u) && !u[ya])) &&
          (l || s) &&
          ((s =
            i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window),
          l
            ? ((l = r),
              null !== (u = (u = n.relatedTarget || n.toElement) ? xa(u) : null) &&
                (u !== (d = Wt(u)) || (5 !== u.tag && 6 !== u.tag)) &&
                (u = null))
            : ((l = null), (u = r)),
          l !== u))
      ) {
        if (
          ((c = yr),
          (m = 'onMouseLeave'),
          (f = 'onMouseEnter'),
          (p = 'mouse'),
          ('pointerout' !== e && 'pointerover' !== e) ||
            ((c = Or), (m = 'onPointerLeave'), (f = 'onPointerEnter'), (p = 'pointer')),
          (d = null == l ? s : Sa(l)),
          (h = null == u ? s : Sa(u)),
          ((s = new c(m, p + 'leave', l, n, i)).target = d),
          (s.relatedTarget = h),
          (m = null),
          xa(i) === r &&
            (((c = new c(f, p + 'enter', u, n, i)).target = h), (c.relatedTarget = d), (m = c)),
          (d = m),
          l && u)
        )
          e: {
            for (f = u, p = 0, h = c = l; h; h = Xi(h)) p++;
            for (h = 0, m = f; m; m = Xi(m)) h++;
            for (; 0 < p - h; ) (c = Xi(c)), p--;
            for (; 0 < h - p; ) (f = Xi(f)), h--;
            for (; p--; ) {
              if (c === f || (null !== f && c === f.alternate)) break e;
              (c = Xi(c)), (f = Xi(f));
            }
            c = null;
          }
        else c = null;
        null !== l && Qi(o, s, l, c, !1), null !== u && null !== d && Qi(o, d, u, c, !0);
      }
      if (
        'select' === (l = (s = r ? Sa(r) : window).nodeName && s.nodeName.toLowerCase()) ||
        ('input' === l && 'file' === s.type)
      )
        var g = Jr;
      else if (qr(s))
        if (ei) g = ui;
        else {
          g = si;
          var y = oi;
        }
      else
        (l = s.nodeName) &&
          'input' === l.toLowerCase() &&
          ('checkbox' === s.type || 'radio' === s.type) &&
          (g = li);
      switch (
        (g && (g = g(e, r))
          ? Kr(o, g, n, i)
          : (y && y(e, s, r),
            'focusout' === e &&
              (y = s._wrapperState) &&
              y.controlled &&
              'number' === s.type &&
              rt(s, 'number', s.value)),
        (y = r ? Sa(r) : window),
        e)
      ) {
        case 'focusin':
          (qr(y) || 'true' === y.contentEditable) && ((bi = y), (wi = r), (xi = null));
          break;
        case 'focusout':
          xi = wi = bi = null;
          break;
        case 'mousedown':
          ki = !0;
          break;
        case 'contextmenu':
        case 'mouseup':
        case 'dragend':
          (ki = !1), Si(o, n, i);
          break;
        case 'selectionchange':
          if (vi) break;
        case 'keydown':
        case 'keyup':
          Si(o, n, i);
      }
      var v;
      if (jr)
        e: {
          switch (e) {
            case 'compositionstart':
              var b = 'onCompositionStart';
              break e;
            case 'compositionend':
              b = 'onCompositionEnd';
              break e;
            case 'compositionupdate':
              b = 'onCompositionUpdate';
              break e;
          }
          b = void 0;
        }
      else
        Wr
          ? $r(e, n) && (b = 'onCompositionEnd')
          : 'keydown' === e && 229 === n.keyCode && (b = 'onCompositionStart');
      b &&
        (zr &&
          'ko' !== n.locale &&
          (Wr || 'onCompositionStart' !== b
            ? 'onCompositionEnd' === b && Wr && (v = ir())
            : ((nr = 'value' in (tr = i) ? tr.value : tr.textContent), (Wr = !0))),
        0 < (y = Yi(r, b)).length &&
          ((b = new Sr(b, e, null, n, i)),
          o.push({ event: b, listeners: y }),
          v ? (b.data = v) : null !== (v = Zr(n)) && (b.data = v))),
        (v = Ir
          ? (function (e, t) {
              switch (e) {
                case 'compositionend':
                  return Zr(t);
                case 'keypress':
                  return 32 !== t.which ? null : ((Ur = !0), Br);
                case 'textInput':
                  return (e = t.data) === Br && Ur ? null : e;
                default:
                  return null;
              }
            })(e, n)
          : (function (e, t) {
              if (Wr)
                return 'compositionend' === e || (!jr && $r(e, t))
                  ? ((e = ir()), (rr = nr = tr = null), (Wr = !1), e)
                  : null;
              switch (e) {
                case 'paste':
                default:
                  return null;
                case 'keypress':
                  if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
                    if (t.char && 1 < t.char.length) return t.char;
                    if (t.which) return String.fromCharCode(t.which);
                  }
                  return null;
                case 'compositionend':
                  return zr && 'ko' !== t.locale ? null : t.data;
              }
            })(e, n)) &&
          0 < (r = Yi(r, 'onBeforeInput')).length &&
          ((i = new Sr('onBeforeInput', 'beforeinput', null, n, i)),
          o.push({ event: i, listeners: r }),
          (i.data = v));
    }
    Bi(o, t);
  });
}
function Ki(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Yi(e, t) {
  for (var n = t + 'Capture', r = []; null !== e; ) {
    var i = e,
      a = i.stateNode;
    5 === i.tag &&
      null !== a &&
      ((i = a),
      null != (a = Mt(e, n)) && r.unshift(Ki(e, a, i)),
      null != (a = Mt(e, t)) && r.push(Ki(e, a, i))),
      (e = e.return);
  }
  return r;
}
function Xi(e) {
  if (null === e) return null;
  do {
    e = e.return;
  } while (e && 5 !== e.tag);
  return e || null;
}
function Qi(e, t, n, r, i) {
  for (var a = t._reactName, o = []; null !== n && n !== r; ) {
    var s = n,
      l = s.alternate,
      u = s.stateNode;
    if (null !== l && l === r) break;
    5 === s.tag &&
      null !== u &&
      ((s = u),
      i
        ? null != (l = Mt(n, a)) && o.unshift(Ki(n, l, s))
        : i || (null != (l = Mt(n, a)) && o.push(Ki(n, l, s)))),
      (n = n.return);
  }
  0 !== o.length && e.push({ event: t, listeners: o });
}
var Gi = /\r\n?/g,
  Ji = /\u0000|\uFFFD/g;
function ea(e) {
  return ('string' == typeof e ? e : '' + e).replace(Gi, '\n').replace(Ji, '');
}
function ta(e, t, n) {
  if (((t = ea(t)), ea(e) !== t && n)) throw Error(le(425));
}
function na() {}
var ra = null,
  ia = null;
function aa(e, t) {
  return (
    'textarea' === e ||
    'noscript' === e ||
    'string' == typeof t.children ||
    'number' == typeof t.children ||
    ('object' == typeof t.dangerouslySetInnerHTML &&
      null !== t.dangerouslySetInnerHTML &&
      null != t.dangerouslySetInnerHTML.__html)
  );
}
var oa = 'function' == typeof setTimeout ? setTimeout : void 0,
  sa = 'function' == typeof clearTimeout ? clearTimeout : void 0,
  la = 'function' == typeof Promise ? Promise : void 0,
  ua =
    'function' == typeof queueMicrotask
      ? queueMicrotask
      : void 0 !== la
        ? function (e) {
            return la.resolve(null).then(e).catch(ca);
          }
        : oa;
function ca(e) {
  setTimeout(function () {
    throw e;
  });
}
function da(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && 8 === i.nodeType))
      if ('/$' === (n = i.data)) {
        if (0 === r) return e.removeChild(i), void Hn(t);
        r--;
      } else ('$' !== n && '$?' !== n && '$!' !== n) || r++;
    n = i;
  } while (n);
  Hn(t);
}
function fa(e) {
  for (; null != e; e = e.nextSibling) {
    var t = e.nodeType;
    if (1 === t || 3 === t) break;
    if (8 === t) {
      if ('$' === (t = e.data) || '$!' === t || '$?' === t) break;
      if ('/$' === t) return null;
    }
  }
  return e;
}
function ha(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (8 === e.nodeType) {
      var n = e.data;
      if ('$' === n || '$!' === n || '$?' === n) {
        if (0 === t) return e;
        t--;
      } else '/$' === n && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var pa = Math.random().toString(36).slice(2),
  ma = '__reactFiber$' + pa,
  ga = '__reactProps$' + pa,
  ya = '__reactContainer$' + pa,
  va = '__reactEvents$' + pa,
  ba = '__reactListeners$' + pa,
  wa = '__reactHandles$' + pa;
function xa(e) {
  var t = e[ma];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[ya] || n[ma])) {
      if (((n = t.alternate), null !== t.child || (null !== n && null !== n.child)))
        for (e = ha(e); null !== e; ) {
          if ((n = e[ma])) return n;
          e = ha(e);
        }
      return t;
    }
    n = (e = n).parentNode;
  }
  return null;
}
function ka(e) {
  return !(e = e[ma] || e[ya]) || (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
    ? null
    : e;
}
function Sa(e) {
  if (5 === e.tag || 6 === e.tag) return e.stateNode;
  throw Error(le(33));
}
function _a(e) {
  return e[ga] || null;
}
var Ea = [],
  Ca = -1;
function Ta(e) {
  return { current: e };
}
function Pa(e) {
  0 > Ca || ((e.current = Ea[Ca]), (Ea[Ca] = null), Ca--);
}
function Aa(e, t) {
  Ca++, (Ea[Ca] = e.current), (e.current = t);
}
var Ra = {},
  Oa = Ta(Ra),
  Da = Ta(!1),
  La = Ra;
function Na(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ra;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i,
    a = {};
  for (i in n) a[i] = t[i];
  return (
    r &&
      (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = a)),
    a
  );
}
function Ma(e) {
  return null != (e = e.childContextTypes);
}
function Fa() {
  Pa(Da), Pa(Oa);
}
function ja(e, t, n) {
  if (Oa.current !== Ra) throw Error(le(168));
  Aa(Oa, t), Aa(Da, n);
}
function Va(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), 'function' != typeof r.getChildContext)) return n;
  for (var i in (r = r.getChildContext()))
    if (!(i in t)) throw Error(le(108, He(e) || 'Unknown', i));
  return ze({}, n, r);
}
function Ia(e) {
  return (
    (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ra),
    (La = Oa.current),
    Aa(Oa, e),
    Aa(Da, Da.current),
    !0
  );
}
function za(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(le(169));
  n
    ? ((e = Va(e, t, La)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Pa(Da),
      Pa(Oa),
      Aa(Oa, e))
    : Pa(Da),
    Aa(Da, n);
}
var Ba = null,
  Ua = !1,
  $a = !1;
function Za(e) {
  null === Ba ? (Ba = [e]) : Ba.push(e);
}
function Wa() {
  if (!$a && null !== Ba) {
    $a = !0;
    var e = 0,
      t = Sn;
    try {
      var n = Ba;
      for (Sn = 1; e < n.length; e++) {
        var r = n[e];
        do {
          r = r(!0);
        } while (null !== r);
      }
      (Ba = null), (Ua = !1);
    } catch (i) {
      throw (null !== Ba && (Ba = Ba.slice(e + 1)), Xt(nn, Wa), i);
    } finally {
      (Sn = t), ($a = !1);
    }
  }
  return null;
}
var Ha = [],
  qa = 0,
  Ka = null,
  Ya = 0,
  Xa = [],
  Qa = 0,
  Ga = null,
  Ja = 1,
  eo = '';
function to(e, t) {
  (Ha[qa++] = Ya), (Ha[qa++] = Ka), (Ka = e), (Ya = t);
}
function no(e, t, n) {
  (Xa[Qa++] = Ja), (Xa[Qa++] = eo), (Xa[Qa++] = Ga), (Ga = e);
  var r = Ja;
  e = eo;
  var i = 32 - cn(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var a = 32 - cn(t) + i;
  if (30 < a) {
    var o = i - (i % 5);
    (a = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (Ja = (1 << (32 - cn(t) + i)) | (n << i) | r),
      (eo = a + e);
  } else (Ja = (1 << a) | (n << i) | r), (eo = e);
}
function ro(e) {
  null !== e.return && (to(e, 1), no(e, 1, 0));
}
function io(e) {
  for (; e === Ka; ) (Ka = Ha[--qa]), (Ha[qa] = null), (Ya = Ha[--qa]), (Ha[qa] = null);
  for (; e === Ga; )
    (Ga = Xa[--Qa]),
      (Xa[Qa] = null),
      (eo = Xa[--Qa]),
      (Xa[Qa] = null),
      (Ja = Xa[--Qa]),
      (Xa[Qa] = null);
}
var ao = null,
  oo = null,
  so = !1,
  lo = null;
function uo(e, t) {
  var n = Nc(5, null, null, 0);
  (n.elementType = 'DELETED'),
    (n.stateNode = t),
    (n.return = e),
    null === (t = e.deletions) ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function co(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        null !==
          (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) &&
        ((e.stateNode = t), (ao = e), (oo = fa(t.firstChild)), !0)
      );
    case 6:
      return (
        null !== (t = '' === e.pendingProps || 3 !== t.nodeType ? null : t) &&
        ((e.stateNode = t), (ao = e), (oo = null), !0)
      );
    case 13:
      return (
        null !== (t = 8 !== t.nodeType ? null : t) &&
        ((n = null !== Ga ? { id: Ja, overflow: eo } : null),
        (e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }),
        ((n = Nc(18, null, null, 0)).stateNode = t),
        (n.return = e),
        (e.child = n),
        (ao = e),
        (oo = null),
        !0)
      );
    default:
      return !1;
  }
}
function fo(e) {
  return !(!(1 & e.mode) || 128 & e.flags);
}
function ho(e) {
  if (so) {
    var t = oo;
    if (t) {
      var n = t;
      if (!co(e, t)) {
        if (fo(e)) throw Error(le(418));
        t = fa(n.nextSibling);
        var r = ao;
        t && co(e, t) ? uo(r, n) : ((e.flags = (-4097 & e.flags) | 2), (so = !1), (ao = e));
      }
    } else {
      if (fo(e)) throw Error(le(418));
      (e.flags = (-4097 & e.flags) | 2), (so = !1), (ao = e);
    }
  }
}
function po(e) {
  for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag; ) e = e.return;
  ao = e;
}
function mo(e) {
  if (e !== ao) return !1;
  if (!so) return po(e), (so = !0), !1;
  var t;
  if (
    ((t = 3 !== e.tag) &&
      !(t = 5 !== e.tag) &&
      (t = 'head' !== (t = e.type) && 'body' !== t && !aa(e.type, e.memoizedProps)),
    t && (t = oo))
  ) {
    if (fo(e)) throw (go(), Error(le(418)));
    for (; t; ) uo(e, t), (t = fa(t.nextSibling));
  }
  if ((po(e), 13 === e.tag)) {
    if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(le(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (8 === e.nodeType) {
          var n = e.data;
          if ('/$' === n) {
            if (0 === t) {
              oo = fa(e.nextSibling);
              break e;
            }
            t--;
          } else ('$' !== n && '$!' !== n && '$?' !== n) || t++;
        }
        e = e.nextSibling;
      }
      oo = null;
    }
  } else oo = ao ? fa(e.stateNode.nextSibling) : null;
  return !0;
}
function go() {
  for (var e = oo; e; ) e = fa(e.nextSibling);
}
function yo() {
  (oo = ao = null), (so = !1);
}
function vo(e) {
  null === lo ? (lo = [e]) : lo.push(e);
}
var bo = Se.ReactCurrentBatchConfig;
function wo(e, t, n) {
  if (null !== (e = n.ref) && 'function' != typeof e && 'object' != typeof e) {
    if (n._owner) {
      if ((n = n._owner)) {
        if (1 !== n.tag) throw Error(le(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(le(147, e));
      var i = r,
        a = '' + e;
      return null !== t && null !== t.ref && 'function' == typeof t.ref && t.ref._stringRef === a
        ? t.ref
        : (((t = function (e) {
            var t = i.refs;
            null === e ? delete t[a] : (t[a] = e);
          })._stringRef = a),
          t);
    }
    if ('string' != typeof e) throw Error(le(284));
    if (!n._owner) throw Error(le(290, e));
  }
  return e;
}
function xo(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      le(31, '[object Object]' === e ? 'object with keys {' + Object.keys(t).join(', ') + '}' : e)
    ))
  );
}
function ko(e) {
  return (0, e._init)(e._payload);
}
function So(e) {
  function t(t, n) {
    if (e) {
      var r = t.deletions;
      null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
    }
  }
  function n(n, r) {
    if (!e) return null;
    for (; null !== r; ) t(n, r), (r = r.sibling);
    return null;
  }
  function r(e, t) {
    for (e = new Map(); null !== t; )
      null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
    return e;
  }
  function i(e, t) {
    return ((e = Fc(e, t)).index = 0), (e.sibling = null), e;
  }
  function a(t, n, r) {
    return (
      (t.index = r),
      e
        ? null !== (r = t.alternate)
          ? (r = r.index) < n
            ? ((t.flags |= 2), n)
            : r
          : ((t.flags |= 2), n)
        : ((t.flags |= 1048576), n)
    );
  }
  function o(t) {
    return e && null === t.alternate && (t.flags |= 2), t;
  }
  function s(e, t, n, r) {
    return null === t || 6 !== t.tag
      ? (((t = zc(n, e.mode, r)).return = e), t)
      : (((t = i(t, n)).return = e), t);
  }
  function l(e, t, n, r) {
    var a = n.type;
    return a === Ce
      ? c(e, t, n.props.children, r, n.key)
      : null !== t &&
          (t.elementType === a ||
            ('object' == typeof a && null !== a && a.$$typeof === Me && ko(a) === t.type))
        ? (((r = i(t, n.props)).ref = wo(e, t, n)), (r.return = e), r)
        : (((r = jc(n.type, n.key, n.props, null, e.mode, r)).ref = wo(e, t, n)),
          (r.return = e),
          r);
  }
  function u(e, t, n, r) {
    return null === t ||
      4 !== t.tag ||
      t.stateNode.containerInfo !== n.containerInfo ||
      t.stateNode.implementation !== n.implementation
      ? (((t = Bc(n, e.mode, r)).return = e), t)
      : (((t = i(t, n.children || [])).return = e), t);
  }
  function c(e, t, n, r, a) {
    return null === t || 7 !== t.tag
      ? (((t = Vc(n, e.mode, r, a)).return = e), t)
      : (((t = i(t, n)).return = e), t);
  }
  function d(e, t, n) {
    if (('string' == typeof t && '' !== t) || 'number' == typeof t)
      return ((t = zc('' + t, e.mode, n)).return = e), t;
    if ('object' == typeof t && null !== t) {
      switch (t.$$typeof) {
        case _e:
          return (
            ((n = jc(t.type, t.key, t.props, null, e.mode, n)).ref = wo(e, null, t)),
            (n.return = e),
            n
          );
        case Ee:
          return ((t = Bc(t, e.mode, n)).return = e), t;
        case Me:
          return d(e, (0, t._init)(t._payload), n);
      }
      if (it(t) || Ve(t)) return ((t = Vc(t, e.mode, n, null)).return = e), t;
      xo(e, t);
    }
    return null;
  }
  function f(e, t, n, r) {
    var i = null !== t ? t.key : null;
    if (('string' == typeof n && '' !== n) || 'number' == typeof n)
      return null !== i ? null : s(e, t, '' + n, r);
    if ('object' == typeof n && null !== n) {
      switch (n.$$typeof) {
        case _e:
          return n.key === i ? l(e, t, n, r) : null;
        case Ee:
          return n.key === i ? u(e, t, n, r) : null;
        case Me:
          return f(e, t, (i = n._init)(n._payload), r);
      }
      if (it(n) || Ve(n)) return null !== i ? null : c(e, t, n, r, null);
      xo(e, n);
    }
    return null;
  }
  function h(e, t, n, r, i) {
    if (('string' == typeof r && '' !== r) || 'number' == typeof r)
      return s(t, (e = e.get(n) || null), '' + r, i);
    if ('object' == typeof r && null !== r) {
      switch (r.$$typeof) {
        case _e:
          return l(t, (e = e.get(null === r.key ? n : r.key) || null), r, i);
        case Ee:
          return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, i);
        case Me:
          return h(e, t, n, (0, r._init)(r._payload), i);
      }
      if (it(r) || Ve(r)) return c(t, (e = e.get(n) || null), r, i, null);
      xo(t, r);
    }
    return null;
  }
  return function s(l, u, c, p) {
    if (
      ('object' == typeof c &&
        null !== c &&
        c.type === Ce &&
        null === c.key &&
        (c = c.props.children),
      'object' == typeof c && null !== c)
    ) {
      switch (c.$$typeof) {
        case _e:
          e: {
            for (var m = c.key, g = u; null !== g; ) {
              if (g.key === m) {
                if ((m = c.type) === Ce) {
                  if (7 === g.tag) {
                    n(l, g.sibling), ((u = i(g, c.props.children)).return = l), (l = u);
                    break e;
                  }
                } else if (
                  g.elementType === m ||
                  ('object' == typeof m && null !== m && m.$$typeof === Me && ko(m) === g.type)
                ) {
                  n(l, g.sibling), ((u = i(g, c.props)).ref = wo(l, g, c)), (u.return = l), (l = u);
                  break e;
                }
                n(l, g);
                break;
              }
              t(l, g), (g = g.sibling);
            }
            c.type === Ce
              ? (((u = Vc(c.props.children, l.mode, p, c.key)).return = l), (l = u))
              : (((p = jc(c.type, c.key, c.props, null, l.mode, p)).ref = wo(l, u, c)),
                (p.return = l),
                (l = p));
          }
          return o(l);
        case Ee:
          e: {
            for (g = c.key; null !== u; ) {
              if (u.key === g) {
                if (
                  4 === u.tag &&
                  u.stateNode.containerInfo === c.containerInfo &&
                  u.stateNode.implementation === c.implementation
                ) {
                  n(l, u.sibling), ((u = i(u, c.children || [])).return = l), (l = u);
                  break e;
                }
                n(l, u);
                break;
              }
              t(l, u), (u = u.sibling);
            }
            ((u = Bc(c, l.mode, p)).return = l), (l = u);
          }
          return o(l);
        case Me:
          return s(l, u, (g = c._init)(c._payload), p);
      }
      if (it(c))
        return (function (i, o, s, l) {
          for (
            var u = null, c = null, p = o, m = (o = 0), g = null;
            null !== p && m < s.length;
            m++
          ) {
            p.index > m ? ((g = p), (p = null)) : (g = p.sibling);
            var y = f(i, p, s[m], l);
            if (null === y) {
              null === p && (p = g);
              break;
            }
            e && p && null === y.alternate && t(i, p),
              (o = a(y, o, m)),
              null === c ? (u = y) : (c.sibling = y),
              (c = y),
              (p = g);
          }
          if (m === s.length) return n(i, p), so && to(i, m), u;
          if (null === p) {
            for (; m < s.length; m++)
              null !== (p = d(i, s[m], l)) &&
                ((o = a(p, o, m)), null === c ? (u = p) : (c.sibling = p), (c = p));
            return so && to(i, m), u;
          }
          for (p = r(i, p); m < s.length; m++)
            null !== (g = h(p, i, m, s[m], l)) &&
              (e && null !== g.alternate && p.delete(null === g.key ? m : g.key),
              (o = a(g, o, m)),
              null === c ? (u = g) : (c.sibling = g),
              (c = g));
          return (
            e &&
              p.forEach(function (e) {
                return t(i, e);
              }),
            so && to(i, m),
            u
          );
        })(l, u, c, p);
      if (Ve(c))
        return (function (i, o, s, l) {
          var u = Ve(s);
          if ('function' != typeof u) throw Error(le(150));
          if (null == (s = u.call(s))) throw Error(le(151));
          for (
            var c = (u = null), p = o, m = (o = 0), g = null, y = s.next();
            null !== p && !y.done;
            m++, y = s.next()
          ) {
            p.index > m ? ((g = p), (p = null)) : (g = p.sibling);
            var v = f(i, p, y.value, l);
            if (null === v) {
              null === p && (p = g);
              break;
            }
            e && p && null === v.alternate && t(i, p),
              (o = a(v, o, m)),
              null === c ? (u = v) : (c.sibling = v),
              (c = v),
              (p = g);
          }
          if (y.done) return n(i, p), so && to(i, m), u;
          if (null === p) {
            for (; !y.done; m++, y = s.next())
              null !== (y = d(i, y.value, l)) &&
                ((o = a(y, o, m)), null === c ? (u = y) : (c.sibling = y), (c = y));
            return so && to(i, m), u;
          }
          for (p = r(i, p); !y.done; m++, y = s.next())
            null !== (y = h(p, i, m, y.value, l)) &&
              (e && null !== y.alternate && p.delete(null === y.key ? m : y.key),
              (o = a(y, o, m)),
              null === c ? (u = y) : (c.sibling = y),
              (c = y));
          return (
            e &&
              p.forEach(function (e) {
                return t(i, e);
              }),
            so && to(i, m),
            u
          );
        })(l, u, c, p);
      xo(l, c);
    }
    return ('string' == typeof c && '' !== c) || 'number' == typeof c
      ? ((c = '' + c),
        null !== u && 6 === u.tag
          ? (n(l, u.sibling), ((u = i(u, c)).return = l), (l = u))
          : (n(l, u), ((u = zc(c, l.mode, p)).return = l), (l = u)),
        o(l))
      : n(l, u);
  };
}
var _o = So(!0),
  Eo = So(!1),
  Co = Ta(null),
  To = null,
  Po = null,
  Ao = null;
function Ro() {
  Ao = Po = To = null;
}
function Oo(e) {
  var t = Co.current;
  Pa(Co), (e._currentValue = t);
}
function Do(e, t, n) {
  for (; null !== e; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
        : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Lo(e, t) {
  (To = e),
    (Ao = Po = null),
    null !== (e = e.dependencies) &&
      null !== e.firstContext &&
      (!!(e.lanes & t) && (kl = !0), (e.firstContext = null));
}
function No(e) {
  var t = e._currentValue;
  if (Ao !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), null === Po)) {
      if (null === To) throw Error(le(308));
      (Po = e), (To.dependencies = { lanes: 0, firstContext: e });
    } else Po = Po.next = e;
  return t;
}
var Mo = null;
function Fo(e) {
  null === Mo ? (Mo = [e]) : Mo.push(e);
}
function jo(e, t, n, r) {
  var i = t.interleaved;
  return (
    null === i ? ((n.next = n), Fo(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Vo(e, r)
  );
}
function Vo(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
    (e.childLanes |= t), null !== (n = e.alternate) && (n.childLanes |= t), (n = e), (e = e.return);
  return 3 === n.tag ? n.stateNode : null;
}
var Io = !1;
function zo(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Bo(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Uo(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function $o(e, t, n) {
  var r = e.updateQueue;
  if (null === r) return null;
  if (((r = r.shared), 2 & Ou)) {
    var i = r.pending;
    return null === i ? (t.next = t) : ((t.next = i.next), (i.next = t)), (r.pending = t), Vo(e, n);
  }
  return (
    null === (i = r.interleaved) ? ((t.next = t), Fo(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Vo(e, n)
  );
}
function Zo(e, t, n) {
  if (null !== (t = t.updateQueue) && ((t = t.shared), 4194240 & n)) {
    var r = t.lanes;
    (n |= r &= e.pendingLanes), (t.lanes = n), kn(e, n);
  }
}
function Wo(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (null !== r && n === (r = r.updateQueue)) {
    var i = null,
      a = null;
    if (null !== (n = n.firstBaseUpdate)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        null === a ? (i = a = o) : (a = a.next = o), (n = n.next);
      } while (null !== n);
      null === a ? (i = a = t) : (a = a.next = t);
    } else i = a = t;
    return (
      (n = {
        baseState: r.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: a,
        shared: r.shared,
        effects: r.effects,
      }),
      void (e.updateQueue = n)
    );
  }
  null === (e = n.lastBaseUpdate) ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t);
}
function Ho(e, t, n, r) {
  var i = e.updateQueue;
  Io = !1;
  var a = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    s = i.shared.pending;
  if (null !== s) {
    i.shared.pending = null;
    var l = s,
      u = l.next;
    (l.next = null), null === o ? (a = u) : (o.next = u), (o = l);
    var c = e.alternate;
    null !== c &&
      (s = (c = c.updateQueue).lastBaseUpdate) !== o &&
      (null === s ? (c.firstBaseUpdate = u) : (s.next = u), (c.lastBaseUpdate = l));
  }
  if (null !== a) {
    var d = i.baseState;
    for (o = 0, c = u = l = null, s = a; ; ) {
      var f = s.lane,
        h = s.eventTime;
      if ((r & f) === f) {
        null !== c &&
          (c = c.next =
            {
              eventTime: h,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var p = e,
            m = s;
          switch (((f = t), (h = n), m.tag)) {
            case 1:
              if ('function' == typeof (p = m.payload)) {
                d = p.call(h, d, f);
                break e;
              }
              d = p;
              break e;
            case 3:
              p.flags = (-65537 & p.flags) | 128;
            case 0:
              if (null == (f = 'function' == typeof (p = m.payload) ? p.call(h, d, f) : p)) break e;
              d = ze({}, d, f);
              break e;
            case 2:
              Io = !0;
          }
        }
        null !== s.callback &&
          0 !== s.lane &&
          ((e.flags |= 64), null === (f = i.effects) ? (i.effects = [s]) : f.push(s));
      } else
        (h = {
          eventTime: h,
          lane: f,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          null === c ? ((u = c = h), (l = d)) : (c = c.next = h),
          (o |= f);
      if (null === (s = s.next)) {
        if (null === (s = i.shared.pending)) break;
        (s = (f = s).next), (f.next = null), (i.lastBaseUpdate = f), (i.shared.pending = null);
      }
    }
    if (
      (null === c && (l = d),
      (i.baseState = l),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      null !== (t = i.shared.interleaved))
    ) {
      i = t;
      do {
        (o |= i.lane), (i = i.next);
      } while (i !== t);
    } else null === a && (i.shared.lanes = 0);
    (Iu |= o), (e.lanes = o), (e.memoizedState = d);
  }
}
function qo(e, t, n) {
  if (((e = t.effects), (t.effects = null), null !== e))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (null !== i) {
        if (((r.callback = null), (r = n), 'function' != typeof i)) throw Error(le(191, i));
        i.call(r);
      }
    }
}
var Ko = {},
  Yo = Ta(Ko),
  Xo = Ta(Ko),
  Qo = Ta(Ko);
function Go(e) {
  if (e === Ko) throw Error(le(174));
  return e;
}
function Jo(e, t) {
  switch ((Aa(Qo, t), Aa(Xo, e), Aa(Yo, Ko), (e = t.nodeType))) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : dt(null, '');
      break;
    default:
      t = dt((t = (e = 8 === e ? t.parentNode : t).namespaceURI || null), (e = e.tagName));
  }
  Pa(Yo), Aa(Yo, t);
}
function es() {
  Pa(Yo), Pa(Xo), Pa(Qo);
}
function ts(e) {
  Go(Qo.current);
  var t = Go(Yo.current),
    n = dt(t, e.type);
  t !== n && (Aa(Xo, e), Aa(Yo, n));
}
function ns(e) {
  Xo.current === e && (Pa(Yo), Pa(Xo));
}
var rs = Ta(0);
function is(e) {
  for (var t = e; null !== t; ) {
    if (13 === t.tag) {
      var n = t.memoizedState;
      if (null !== n && (null === (n = n.dehydrated) || '$?' === n.data || '$!' === n.data))
        return t;
    } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
      if (128 & t.flags) return t;
    } else if (null !== t.child) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; null === t.sibling; ) {
      if (null === t.return || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var as = [];
function os() {
  for (var e = 0; e < as.length; e++) as[e]._workInProgressVersionPrimary = null;
  as.length = 0;
}
var ss = Se.ReactCurrentDispatcher,
  ls = Se.ReactCurrentBatchConfig,
  us = 0,
  cs = null,
  ds = null,
  fs = null,
  hs = !1,
  ps = !1,
  ms = 0,
  gs = 0;
function ys() {
  throw Error(le(321));
}
function vs(e, t) {
  if (null === t) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!ci(e[n], t[n])) return !1;
  return !0;
}
function bs(e, t, n, r, i, a) {
  if (
    ((us = a),
    (cs = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ss.current = null === e || null === e.memoizedState ? nl : rl),
    (e = n(r, i)),
    ps)
  ) {
    a = 0;
    do {
      if (((ps = !1), (ms = 0), 25 <= a)) throw Error(le(301));
      (a += 1), (fs = ds = null), (t.updateQueue = null), (ss.current = il), (e = n(r, i));
    } while (ps);
  }
  if (
    ((ss.current = tl),
    (t = null !== ds && null !== ds.next),
    (us = 0),
    (fs = ds = cs = null),
    (hs = !1),
    t)
  )
    throw Error(le(300));
  return e;
}
function ws() {
  var e = 0 !== ms;
  return (ms = 0), e;
}
function xs() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return null === fs ? (cs.memoizedState = fs = e) : (fs = fs.next = e), fs;
}
function ks() {
  if (null === ds) {
    var e = cs.alternate;
    e = null !== e ? e.memoizedState : null;
  } else e = ds.next;
  var t = null === fs ? cs.memoizedState : fs.next;
  if (null !== t) (fs = t), (ds = e);
  else {
    if (null === e) throw Error(le(310));
    (e = {
      memoizedState: (ds = e).memoizedState,
      baseState: ds.baseState,
      baseQueue: ds.baseQueue,
      queue: ds.queue,
      next: null,
    }),
      null === fs ? (cs.memoizedState = fs = e) : (fs = fs.next = e);
  }
  return fs;
}
function Ss(e, t) {
  return 'function' == typeof t ? t(e) : t;
}
function _s(e) {
  var t = ks(),
    n = t.queue;
  if (null === n) throw Error(le(311));
  n.lastRenderedReducer = e;
  var r = ds,
    i = r.baseQueue,
    a = n.pending;
  if (null !== a) {
    if (null !== i) {
      var o = i.next;
      (i.next = a.next), (a.next = o);
    }
    (r.baseQueue = i = a), (n.pending = null);
  }
  if (null !== i) {
    (a = i.next), (r = r.baseState);
    var s = (o = null),
      l = null,
      u = a;
    do {
      var c = u.lane;
      if ((us & c) === c)
        null !== l &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        null === l ? ((s = l = d), (o = r)) : (l = l.next = d), (cs.lanes |= c), (Iu |= c);
      }
      u = u.next;
    } while (null !== u && u !== a);
    null === l ? (o = r) : (l.next = s),
      ci(r, t.memoizedState) || (kl = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (null !== (e = n.interleaved)) {
    i = e;
    do {
      (a = i.lane), (cs.lanes |= a), (Iu |= a), (i = i.next);
    } while (i !== e);
  } else null === i && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Es(e) {
  var t = ks(),
    n = t.queue;
  if (null === n) throw Error(le(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    a = t.memoizedState;
  if (null !== i) {
    n.pending = null;
    var o = (i = i.next);
    do {
      (a = e(a, o.action)), (o = o.next);
    } while (o !== i);
    ci(a, t.memoizedState) || (kl = !0),
      (t.memoizedState = a),
      null === t.baseQueue && (t.baseState = a),
      (n.lastRenderedState = a);
  }
  return [a, r];
}
function Cs() {}
function Ts(e, t) {
  var n = cs,
    r = ks(),
    i = t(),
    a = !ci(r.memoizedState, i);
  if (
    (a && ((r.memoizedState = i), (kl = !0)),
    (r = r.queue),
    Is(Rs.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || a || (null !== fs && 1 & fs.memoizedState.tag))
  ) {
    if (((n.flags |= 2048), Ns(9, As.bind(null, n, r, i, t), void 0, null), null === Du))
      throw Error(le(349));
    30 & us || Ps(n, t, i);
  }
  return i;
}
function Ps(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    null === (t = cs.updateQueue)
      ? ((t = { lastEffect: null, stores: null }), (cs.updateQueue = t), (t.stores = [e]))
      : null === (n = t.stores)
        ? (t.stores = [e])
        : n.push(e);
}
function As(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Os(t) && Ds(e);
}
function Rs(e, t, n) {
  return n(function () {
    Os(t) && Ds(e);
  });
}
function Os(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !ci(e, n);
  } catch (r) {
    return !0;
  }
}
function Ds(e) {
  var t = Vo(e, 1);
  null !== t && ac(t, e, 1, -1);
}
function Ls(e) {
  var t = xs();
  return (
    'function' == typeof e && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ss,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Qs.bind(null, cs, e)),
    [t.memoizedState, e]
  );
}
function Ns(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    null === (t = cs.updateQueue)
      ? ((t = { lastEffect: null, stores: null }),
        (cs.updateQueue = t),
        (t.lastEffect = e.next = e))
      : null === (n = t.lastEffect)
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
    e
  );
}
function Ms() {
  return ks().memoizedState;
}
function Fs(e, t, n, r) {
  var i = xs();
  (cs.flags |= e), (i.memoizedState = Ns(1 | t, n, void 0, void 0 === r ? null : r));
}
function js(e, t, n, r) {
  var i = ks();
  r = void 0 === r ? null : r;
  var a = void 0;
  if (null !== ds) {
    var o = ds.memoizedState;
    if (((a = o.destroy), null !== r && vs(r, o.deps)))
      return void (i.memoizedState = Ns(t, n, a, r));
  }
  (cs.flags |= e), (i.memoizedState = Ns(1 | t, n, a, r));
}
function Vs(e, t) {
  return Fs(8390656, 8, e, t);
}
function Is(e, t) {
  return js(2048, 8, e, t);
}
function zs(e, t) {
  return js(4, 2, e, t);
}
function Bs(e, t) {
  return js(4, 4, e, t);
}
function Us(e, t) {
  return 'function' == typeof t
    ? ((e = e()),
      t(e),
      function () {
        t(null);
      })
    : null != t
      ? ((e = e()),
        (t.current = e),
        function () {
          t.current = null;
        })
      : void 0;
}
function $s(e, t, n) {
  return (n = null != n ? n.concat([e]) : null), js(4, 4, Us.bind(null, t, e), n);
}
function Zs() {}
function Ws(e, t) {
  var n = ks();
  t = void 0 === t ? null : t;
  var r = n.memoizedState;
  return null !== r && null !== t && vs(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
}
function Hs(e, t) {
  var n = ks();
  t = void 0 === t ? null : t;
  var r = n.memoizedState;
  return null !== r && null !== t && vs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function qs(e, t, n) {
  return 21 & us
    ? (ci(n, t) || ((n = bn()), (cs.lanes |= n), (Iu |= n), (e.baseState = !0)), t)
    : (e.baseState && ((e.baseState = !1), (kl = !0)), (e.memoizedState = n));
}
function Ks(e, t) {
  var n = Sn;
  (Sn = 0 !== n && 4 > n ? n : 4), e(!0);
  var r = ls.transition;
  ls.transition = {};
  try {
    e(!1), t();
  } finally {
    (Sn = n), (ls.transition = r);
  }
}
function Ys() {
  return ks().memoizedState;
}
function Xs(e, t, n) {
  var r = ic(e);
  if (((n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }), Gs(e)))
    Js(t, n);
  else if (null !== (n = jo(e, t, n, r))) {
    ac(n, e, r, rc()), el(n, t, r);
  }
}
function Qs(e, t, n) {
  var r = ic(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Gs(e)) Js(t, i);
  else {
    var a = e.alternate;
    if (0 === e.lanes && (null === a || 0 === a.lanes) && null !== (a = t.lastRenderedReducer))
      try {
        var o = t.lastRenderedState,
          s = a(o, n);
        if (((i.hasEagerState = !0), (i.eagerState = s), ci(s, o))) {
          var l = t.interleaved;
          return (
            null === l ? ((i.next = i), Fo(t)) : ((i.next = l.next), (l.next = i)),
            void (t.interleaved = i)
          );
        }
      } catch (u) {}
    null !== (n = jo(e, t, i, r)) && (ac(n, e, r, (i = rc())), el(n, t, r));
  }
}
function Gs(e) {
  var t = e.alternate;
  return e === cs || (null !== t && t === cs);
}
function Js(e, t) {
  ps = hs = !0;
  var n = e.pending;
  null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
}
function el(e, t, n) {
  if (4194240 & n) {
    var r = t.lanes;
    (n |= r &= e.pendingLanes), (t.lanes = n), kn(e, n);
  }
}
var tl = {
    readContext: No,
    useCallback: ys,
    useContext: ys,
    useEffect: ys,
    useImperativeHandle: ys,
    useInsertionEffect: ys,
    useLayoutEffect: ys,
    useMemo: ys,
    useReducer: ys,
    useRef: ys,
    useState: ys,
    useDebugValue: ys,
    useDeferredValue: ys,
    useTransition: ys,
    useMutableSource: ys,
    useSyncExternalStore: ys,
    useId: ys,
    unstable_isNewReconciler: !1,
  },
  nl = {
    readContext: No,
    useCallback: function (e, t) {
      return (xs().memoizedState = [e, void 0 === t ? null : t]), e;
    },
    useContext: No,
    useEffect: Vs,
    useImperativeHandle: function (e, t, n) {
      return (n = null != n ? n.concat([e]) : null), Fs(4194308, 4, Us.bind(null, t, e), n);
    },
    useLayoutEffect: function (e, t) {
      return Fs(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Fs(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = xs();
      return (t = void 0 === t ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
    },
    useReducer: function (e, t, n) {
      var r = xs();
      return (
        (t = void 0 !== n ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Xs.bind(null, cs, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      return (e = { current: e }), (xs().memoizedState = e);
    },
    useState: Ls,
    useDebugValue: Zs,
    useDeferredValue: function (e) {
      return (xs().memoizedState = e);
    },
    useTransition: function () {
      var e = Ls(!1),
        t = e[0];
      return (e = Ks.bind(null, e[1])), (xs().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = cs,
        i = xs();
      if (so) {
        if (void 0 === n) throw Error(le(407));
        n = n();
      } else {
        if (((n = t()), null === Du)) throw Error(le(349));
        30 & us || Ps(r, t, n);
      }
      i.memoizedState = n;
      var a = { value: n, getSnapshot: t };
      return (
        (i.queue = a),
        Vs(Rs.bind(null, r, a, e), [e]),
        (r.flags |= 2048),
        Ns(9, As.bind(null, r, a, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = xs(),
        t = Du.identifierPrefix;
      if (so) {
        var n = eo;
        (t = ':' + t + 'R' + (n = (Ja & ~(1 << (32 - cn(Ja) - 1))).toString(32) + n)),
          0 < (n = ms++) && (t += 'H' + n.toString(32)),
          (t += ':');
      } else t = ':' + t + 'r' + (n = gs++).toString(32) + ':';
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  rl = {
    readContext: No,
    useCallback: Ws,
    useContext: No,
    useEffect: Is,
    useImperativeHandle: $s,
    useInsertionEffect: zs,
    useLayoutEffect: Bs,
    useMemo: Hs,
    useReducer: _s,
    useRef: Ms,
    useState: function () {
      return _s(Ss);
    },
    useDebugValue: Zs,
    useDeferredValue: function (e) {
      return qs(ks(), ds.memoizedState, e);
    },
    useTransition: function () {
      return [_s(Ss)[0], ks().memoizedState];
    },
    useMutableSource: Cs,
    useSyncExternalStore: Ts,
    useId: Ys,
    unstable_isNewReconciler: !1,
  },
  il = {
    readContext: No,
    useCallback: Ws,
    useContext: No,
    useEffect: Is,
    useImperativeHandle: $s,
    useInsertionEffect: zs,
    useLayoutEffect: Bs,
    useMemo: Hs,
    useReducer: Es,
    useRef: Ms,
    useState: function () {
      return Es(Ss);
    },
    useDebugValue: Zs,
    useDeferredValue: function (e) {
      var t = ks();
      return null === ds ? (t.memoizedState = e) : qs(t, ds.memoizedState, e);
    },
    useTransition: function () {
      return [Es(Ss)[0], ks().memoizedState];
    },
    useMutableSource: Cs,
    useSyncExternalStore: Ts,
    useId: Ys,
    unstable_isNewReconciler: !1,
  };
function al(e, t) {
  if (e && e.defaultProps) {
    for (var n in ((t = ze({}, t)), (e = e.defaultProps))) void 0 === t[n] && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ol(e, t, n, r) {
  (n = null == (n = n(r, (t = e.memoizedState))) ? t : ze({}, t, n)),
    (e.memoizedState = n),
    0 === e.lanes && (e.updateQueue.baseState = n);
}
var sl = {
  isMounted: function (e) {
    return !!(e = e._reactInternals) && Wt(e) === e;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = rc(),
      i = ic(e),
      a = Uo(r, i);
    (a.payload = t),
      null != n && (a.callback = n),
      null !== (t = $o(e, a, i)) && (ac(t, e, i, r), Zo(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = rc(),
      i = ic(e),
      a = Uo(r, i);
    (a.tag = 1),
      (a.payload = t),
      null != n && (a.callback = n),
      null !== (t = $o(e, a, i)) && (ac(t, e, i, r), Zo(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = rc(),
      r = ic(e),
      i = Uo(n, r);
    (i.tag = 2),
      null != t && (i.callback = t),
      null !== (t = $o(e, i, r)) && (ac(t, e, r, n), Zo(t, e, r));
  },
};
function ll(e, t, n, r, i, a, o) {
  return 'function' == typeof (e = e.stateNode).shouldComponentUpdate
    ? e.shouldComponentUpdate(r, a, o)
    : !t.prototype || !t.prototype.isPureReactComponent || !di(n, r) || !di(i, a);
}
function ul(e, t, n) {
  var r = !1,
    i = Ra,
    a = t.contextType;
  return (
    'object' == typeof a && null !== a
      ? (a = No(a))
      : ((i = Ma(t) ? La : Oa.current), (a = (r = null != (r = t.contextTypes)) ? Na(e, i) : Ra)),
    (t = new t(n, a)),
    (e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null),
    (t.updater = sl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = a)),
    t
  );
}
function cl(e, t, n, r) {
  (e = t.state),
    'function' == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r),
    'function' == typeof t.UNSAFE_componentWillReceiveProps &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && sl.enqueueReplaceState(t, t.state, null);
}
function dl(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = {}), zo(e);
  var a = t.contextType;
  'object' == typeof a && null !== a
    ? (i.context = No(a))
    : ((a = Ma(t) ? La : Oa.current), (i.context = Na(e, a))),
    (i.state = e.memoizedState),
    'function' == typeof (a = t.getDerivedStateFromProps) &&
      (ol(e, t, a, n), (i.state = e.memoizedState)),
    'function' == typeof t.getDerivedStateFromProps ||
      'function' == typeof i.getSnapshotBeforeUpdate ||
      ('function' != typeof i.UNSAFE_componentWillMount &&
        'function' != typeof i.componentWillMount) ||
      ((t = i.state),
      'function' == typeof i.componentWillMount && i.componentWillMount(),
      'function' == typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount(),
      t !== i.state && sl.enqueueReplaceState(i, i.state, null),
      Ho(e, n, i, r),
      (i.state = e.memoizedState)),
    'function' == typeof i.componentDidMount && (e.flags |= 4194308);
}
function fl(e, t) {
  try {
    var n = '',
      r = t;
    do {
      (n += Ze(r)), (r = r.return);
    } while (r);
    var i = n;
  } catch (a) {
    i = '\nError generating stack: ' + a.message + '\n' + a.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function hl(e, t, n) {
  return { value: e, source: null, stack: null != n ? n : null, digest: null != t ? t : null };
}
function pl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var ml = 'function' == typeof WeakMap ? WeakMap : Map;
function gl(e, t, n) {
  ((n = Uo(-1, n)).tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      qu || ((qu = !0), (Ku = r)), pl(0, t);
    }),
    n
  );
}
function yl(e, t, n) {
  (n = Uo(-1, n)).tag = 3;
  var r = e.type.getDerivedStateFromError;
  if ('function' == typeof r) {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        pl(0, t);
      });
  }
  var a = e.stateNode;
  return (
    null !== a &&
      'function' == typeof a.componentDidCatch &&
      (n.callback = function () {
        pl(0, t), 'function' != typeof r && (null === Yu ? (Yu = new Set([this])) : Yu.add(this));
        var e = t.stack;
        this.componentDidCatch(t.value, { componentStack: null !== e ? e : '' });
      }),
    n
  );
}
function vl(e, t, n) {
  var r = e.pingCache;
  if (null === r) {
    r = e.pingCache = new ml();
    var i = new Set();
    r.set(t, i);
  } else void 0 === (i = r.get(t)) && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Pc.bind(null, e, t, n)), t.then(e, e));
}
function bl(e) {
  do {
    var t;
    if (((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), t))
      return e;
    e = e.return;
  } while (null !== e);
  return null;
}
function wl(e, t, n, r, i) {
  return 1 & e.mode
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          1 === n.tag &&
            (null === n.alternate ? (n.tag = 17) : (((t = Uo(-1, 1)).tag = 2), $o(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var xl = Se.ReactCurrentOwner,
  kl = !1;
function Sl(e, t, n, r) {
  t.child = null === e ? Eo(t, null, n, r) : _o(t, e.child, n, r);
}
function _l(e, t, n, r, i) {
  n = n.render;
  var a = t.ref;
  return (
    Lo(t, i),
    (r = bs(e, t, n, r, a, i)),
    (n = ws()),
    null === e || kl
      ? (so && n && ro(t), (t.flags |= 1), Sl(e, t, r, i), t.child)
      : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), ql(e, t, i))
  );
}
function El(e, t, n, r, i) {
  if (null === e) {
    var a = n.type;
    return 'function' != typeof a ||
      Mc(a) ||
      void 0 !== a.defaultProps ||
      null !== n.compare ||
      void 0 !== n.defaultProps
      ? (((e = jc(n.type, null, r, t, t.mode, i)).ref = t.ref), (e.return = t), (t.child = e))
      : ((t.tag = 15), (t.type = a), Cl(e, t, a, r, i));
  }
  if (((a = e.child), !(e.lanes & i))) {
    var o = a.memoizedProps;
    if ((n = null !== (n = n.compare) ? n : di)(o, r) && e.ref === t.ref) return ql(e, t, i);
  }
  return (t.flags |= 1), ((e = Fc(a, r)).ref = t.ref), (e.return = t), (t.child = e);
}
function Cl(e, t, n, r, i) {
  if (null !== e) {
    var a = e.memoizedProps;
    if (di(a, r) && e.ref === t.ref) {
      if (((kl = !1), (t.pendingProps = r = a), !(e.lanes & i)))
        return (t.lanes = e.lanes), ql(e, t, i);
      131072 & e.flags && (kl = !0);
    }
  }
  return Al(e, t, n, r, i);
}
function Tl(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    a = null !== e ? e.memoizedState : null;
  if ('hidden' === r.mode)
    if (1 & t.mode) {
      if (!(1073741824 & n))
        return (
          (e = null !== a ? a.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }),
          (t.updateQueue = null),
          Aa(Fu, Mu),
          (Mu |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = null !== a ? a.baseLanes : n),
        Aa(Fu, Mu),
        (Mu |= r);
    } else
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Aa(Fu, Mu),
        (Mu |= n);
  else
    null !== a ? ((r = a.baseLanes | n), (t.memoizedState = null)) : (r = n), Aa(Fu, Mu), (Mu |= r);
  return Sl(e, t, i, n), t.child;
}
function Pl(e, t) {
  var n = t.ref;
  ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Al(e, t, n, r, i) {
  var a = Ma(n) ? La : Oa.current;
  return (
    (a = Na(t, a)),
    Lo(t, i),
    (n = bs(e, t, n, r, a, i)),
    (r = ws()),
    null === e || kl
      ? (so && r && ro(t), (t.flags |= 1), Sl(e, t, n, i), t.child)
      : ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), ql(e, t, i))
  );
}
function Rl(e, t, n, r, i) {
  if (Ma(n)) {
    var a = !0;
    Ia(t);
  } else a = !1;
  if ((Lo(t, i), null === t.stateNode)) Hl(e, t), ul(t, n, r), dl(t, n, r, i), (r = !0);
  else if (null === e) {
    var o = t.stateNode,
      s = t.memoizedProps;
    o.props = s;
    var l = o.context,
      u = n.contextType;
    'object' == typeof u && null !== u ? (u = No(u)) : (u = Na(t, (u = Ma(n) ? La : Oa.current)));
    var c = n.getDerivedStateFromProps,
      d = 'function' == typeof c || 'function' == typeof o.getSnapshotBeforeUpdate;
    d ||
      ('function' != typeof o.UNSAFE_componentWillReceiveProps &&
        'function' != typeof o.componentWillReceiveProps) ||
      ((s !== r || l !== u) && cl(t, o, r, u)),
      (Io = !1);
    var f = t.memoizedState;
    (o.state = f),
      Ho(t, r, o, i),
      (l = t.memoizedState),
      s !== r || f !== l || Da.current || Io
        ? ('function' == typeof c && (ol(t, n, c, r), (l = t.memoizedState)),
          (s = Io || ll(t, n, s, r, f, l, u))
            ? (d ||
                ('function' != typeof o.UNSAFE_componentWillMount &&
                  'function' != typeof o.componentWillMount) ||
                ('function' == typeof o.componentWillMount && o.componentWillMount(),
                'function' == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount()),
              'function' == typeof o.componentDidMount && (t.flags |= 4194308))
            : ('function' == typeof o.componentDidMount && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (o.props = r),
          (o.state = l),
          (o.context = u),
          (r = s))
        : ('function' == typeof o.componentDidMount && (t.flags |= 4194308), (r = !1));
  } else {
    (o = t.stateNode),
      Bo(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : al(t.type, s)),
      (o.props = u),
      (d = t.pendingProps),
      (f = o.context),
      'object' == typeof (l = n.contextType) && null !== l
        ? (l = No(l))
        : (l = Na(t, (l = Ma(n) ? La : Oa.current)));
    var h = n.getDerivedStateFromProps;
    (c = 'function' == typeof h || 'function' == typeof o.getSnapshotBeforeUpdate) ||
      ('function' != typeof o.UNSAFE_componentWillReceiveProps &&
        'function' != typeof o.componentWillReceiveProps) ||
      ((s !== d || f !== l) && cl(t, o, r, l)),
      (Io = !1),
      (f = t.memoizedState),
      (o.state = f),
      Ho(t, r, o, i);
    var p = t.memoizedState;
    s !== d || f !== p || Da.current || Io
      ? ('function' == typeof h && (ol(t, n, h, r), (p = t.memoizedState)),
        (u = Io || ll(t, n, u, r, f, p, l) || !1)
          ? (c ||
              ('function' != typeof o.UNSAFE_componentWillUpdate &&
                'function' != typeof o.componentWillUpdate) ||
              ('function' == typeof o.componentWillUpdate && o.componentWillUpdate(r, p, l),
              'function' == typeof o.UNSAFE_componentWillUpdate &&
                o.UNSAFE_componentWillUpdate(r, p, l)),
            'function' == typeof o.componentDidUpdate && (t.flags |= 4),
            'function' == typeof o.getSnapshotBeforeUpdate && (t.flags |= 1024))
          : ('function' != typeof o.componentDidUpdate ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            'function' != typeof o.getSnapshotBeforeUpdate ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = p)),
        (o.props = r),
        (o.state = p),
        (o.context = l),
        (r = u))
      : ('function' != typeof o.componentDidUpdate ||
          (s === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 4),
        'function' != typeof o.getSnapshotBeforeUpdate ||
          (s === e.memoizedProps && f === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ol(e, t, n, r, a, i);
}
function Ol(e, t, n, r, i, a) {
  Pl(e, t);
  var o = !!(128 & t.flags);
  if (!r && !o) return i && za(t, n, !1), ql(e, t, a);
  (r = t.stateNode), (xl.current = t);
  var s = o && 'function' != typeof n.getDerivedStateFromError ? null : r.render();
  return (
    (t.flags |= 1),
    null !== e && o
      ? ((t.child = _o(t, e.child, null, a)), (t.child = _o(t, null, s, a)))
      : Sl(e, t, s, a),
    (t.memoizedState = r.state),
    i && za(t, n, !0),
    t.child
  );
}
function Dl(e) {
  var t = e.stateNode;
  t.pendingContext
    ? ja(0, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ja(0, t.context, !1),
    Jo(e, t.containerInfo);
}
function Ll(e, t, n, r, i) {
  return yo(), vo(i), (t.flags |= 256), Sl(e, t, n, r), t.child;
}
var Nl,
  Ml,
  Fl,
  jl,
  Vl = { dehydrated: null, treeContext: null, retryLane: 0 };
function Il(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function zl(e, t, n) {
  var r,
    i = t.pendingProps,
    a = rs.current,
    o = !1,
    s = !!(128 & t.flags);
  if (
    ((r = s) || (r = (null === e || null !== e.memoizedState) && !!(2 & a)),
    r ? ((o = !0), (t.flags &= -129)) : (null !== e && null === e.memoizedState) || (a |= 1),
    Aa(rs, 1 & a),
    null === e)
  )
    return (
      ho(t),
      null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
        ? (1 & t.mode ? ('$!' === e.data ? (t.lanes = 8) : (t.lanes = 1073741824)) : (t.lanes = 1),
          null)
        : ((s = i.children),
          (e = i.fallback),
          o
            ? ((i = t.mode),
              (o = t.child),
              (s = { mode: 'hidden', children: s }),
              1 & i || null === o
                ? (o = Ic(s, i, 0, null))
                : ((o.childLanes = 0), (o.pendingProps = s)),
              (e = Vc(e, i, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Il(n)),
              (t.memoizedState = Vl),
              e)
            : Bl(t, s))
    );
  if (null !== (a = e.memoizedState) && null !== (r = a.dehydrated))
    return (function (e, t, n, r, i, a, o) {
      if (n)
        return 256 & t.flags
          ? ((t.flags &= -257), Ul(e, t, o, (r = hl(Error(le(422))))))
          : null !== t.memoizedState
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((a = r.fallback),
              (i = t.mode),
              (r = Ic({ mode: 'visible', children: r.children }, i, 0, null)),
              ((a = Vc(a, i, o, null)).flags |= 2),
              (r.return = t),
              (a.return = t),
              (r.sibling = a),
              (t.child = r),
              1 & t.mode && _o(t, e.child, null, o),
              (t.child.memoizedState = Il(o)),
              (t.memoizedState = Vl),
              a);
      if (!(1 & t.mode)) return Ul(e, t, o, null);
      if ('$!' === i.data) {
        if ((r = i.nextSibling && i.nextSibling.dataset)) var s = r.dgst;
        return (r = s), Ul(e, t, o, (r = hl((a = Error(le(419))), r, void 0)));
      }
      if (((s = !!(o & e.childLanes)), kl || s)) {
        if (null !== (r = Du)) {
          switch (o & -o) {
            case 4:
              i = 2;
              break;
            case 16:
              i = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              i = 32;
              break;
            case 536870912:
              i = 268435456;
              break;
            default:
              i = 0;
          }
          0 !== (i = i & (r.suspendedLanes | o) ? 0 : i) &&
            i !== a.retryLane &&
            ((a.retryLane = i), Vo(e, i), ac(r, e, i, -1));
        }
        return vc(), Ul(e, t, o, (r = hl(Error(le(421)))));
      }
      return '$?' === i.data
        ? ((t.flags |= 128), (t.child = e.child), (t = Rc.bind(null, e)), (i._reactRetry = t), null)
        : ((e = a.treeContext),
          (oo = fa(i.nextSibling)),
          (ao = t),
          (so = !0),
          (lo = null),
          null !== e &&
            ((Xa[Qa++] = Ja),
            (Xa[Qa++] = eo),
            (Xa[Qa++] = Ga),
            (Ja = e.id),
            (eo = e.overflow),
            (Ga = t)),
          (t = Bl(t, r.children)),
          (t.flags |= 4096),
          t);
    })(e, t, s, i, r, a, n);
  if (o) {
    (o = i.fallback), (s = t.mode), (r = (a = e.child).sibling);
    var l = { mode: 'hidden', children: i.children };
    return (
      1 & s || t.child === a
        ? ((i = Fc(a, l)).subtreeFlags = 14680064 & a.subtreeFlags)
        : (((i = t.child).childLanes = 0), (i.pendingProps = l), (t.deletions = null)),
      null !== r ? (o = Fc(r, o)) : ((o = Vc(o, s, n, null)).flags |= 2),
      (o.return = t),
      (i.return = t),
      (i.sibling = o),
      (t.child = i),
      (i = o),
      (o = t.child),
      (s =
        null === (s = e.child.memoizedState)
          ? Il(n)
          : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }),
      (o.memoizedState = s),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Vl),
      i
    );
  }
  return (
    (e = (o = e.child).sibling),
    (i = Fc(o, { mode: 'visible', children: i.children })),
    !(1 & t.mode) && (i.lanes = n),
    (i.return = t),
    (i.sibling = null),
    null !== e && (null === (n = t.deletions) ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = i),
    (t.memoizedState = null),
    i
  );
}
function Bl(e, t) {
  return ((t = Ic({ mode: 'visible', children: t }, e.mode, 0, null)).return = e), (e.child = t);
}
function Ul(e, t, n, r) {
  return (
    null !== r && vo(r),
    _o(t, e.child, null, n),
    ((e = Bl(t, t.pendingProps.children)).flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function $l(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  null !== r && (r.lanes |= t), Do(e.return, t, n);
}
function Zl(e, t, n, r, i) {
  var a = e.memoizedState;
  null === a
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((a.isBackwards = t),
      (a.rendering = null),
      (a.renderingStartTime = 0),
      (a.last = r),
      (a.tail = n),
      (a.tailMode = i));
}
function Wl(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    a = r.tail;
  if ((Sl(e, t, r.children, n), 2 & (r = rs.current))) (r = (1 & r) | 2), (t.flags |= 128);
  else {
    if (null !== e && 128 & e.flags)
      e: for (e = t.child; null !== e; ) {
        if (13 === e.tag) null !== e.memoizedState && $l(e, n, t);
        else if (19 === e.tag) $l(e, n, t);
        else if (null !== e.child) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; null === e.sibling; ) {
          if (null === e.return || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Aa(rs, r), 1 & t.mode))
    switch (i) {
      case 'forwards':
        for (n = t.child, i = null; null !== n; )
          null !== (e = n.alternate) && null === is(e) && (i = n), (n = n.sibling);
        null === (n = i)
          ? ((i = t.child), (t.child = null))
          : ((i = n.sibling), (n.sibling = null)),
          Zl(t, !1, i, n, a);
        break;
      case 'backwards':
        for (n = null, i = t.child, t.child = null; null !== i; ) {
          if (null !== (e = i.alternate) && null === is(e)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        Zl(t, !0, n, null, a);
        break;
      case 'together':
        Zl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  else t.memoizedState = null;
  return t.child;
}
function Hl(e, t) {
  !(1 & t.mode) && null !== e && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function ql(e, t, n) {
  if ((null !== e && (t.dependencies = e.dependencies), (Iu |= t.lanes), !(n & t.childLanes)))
    return null;
  if (null !== e && t.child !== e.child) throw Error(le(153));
  if (null !== t.child) {
    for (n = Fc((e = t.child), e.pendingProps), t.child = n, n.return = t; null !== e.sibling; )
      (e = e.sibling), ((n = n.sibling = Fc(e, e.pendingProps)).return = t);
    n.sibling = null;
  }
  return t.child;
}
function Kl(e, t) {
  if (!so)
    switch (e.tailMode) {
      case 'hidden':
        t = e.tail;
        for (var n = null; null !== t; ) null !== t.alternate && (n = t), (t = t.sibling);
        null === n ? (e.tail = null) : (n.sibling = null);
        break;
      case 'collapsed':
        n = e.tail;
        for (var r = null; null !== n; ) null !== n.alternate && (r = n), (n = n.sibling);
        null === r
          ? t || null === e.tail
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Yl(e) {
  var t = null !== e.alternate && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; null !== i; )
      (n |= i.lanes | i.childLanes),
        (r |= 14680064 & i.subtreeFlags),
        (r |= 14680064 & i.flags),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; null !== i; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Xl(e, t, n) {
  var r = t.pendingProps;
  switch ((io(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Yl(t), null;
    case 1:
    case 17:
      return Ma(t.type) && Fa(), Yl(t), null;
    case 3:
      return (
        (r = t.stateNode),
        es(),
        Pa(Da),
        Pa(Oa),
        os(),
        r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
        (null !== e && null !== e.child) ||
          (mo(t)
            ? (t.flags |= 4)
            : null === e ||
              (e.memoizedState.isDehydrated && !(256 & t.flags)) ||
              ((t.flags |= 1024), null !== lo && (uc(lo), (lo = null)))),
        Ml(e, t),
        Yl(t),
        null
      );
    case 5:
      ns(t);
      var i = Go(Qo.current);
      if (((n = t.type), null !== e && null != t.stateNode))
        Fl(e, t, n, r, i), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (null === t.stateNode) throw Error(le(166));
          return Yl(t), null;
        }
        if (((e = Go(Yo.current)), mo(t))) {
          (r = t.stateNode), (n = t.type);
          var a = t.memoizedProps;
          switch (((r[ma] = t), (r[ga] = a), (e = !!(1 & t.mode)), n)) {
            case 'dialog':
              Ui('cancel', r), Ui('close', r);
              break;
            case 'iframe':
            case 'object':
            case 'embed':
              Ui('load', r);
              break;
            case 'video':
            case 'audio':
              for (i = 0; i < Vi.length; i++) Ui(Vi[i], r);
              break;
            case 'source':
              Ui('error', r);
              break;
            case 'img':
            case 'image':
            case 'link':
              Ui('error', r), Ui('load', r);
              break;
            case 'details':
              Ui('toggle', r);
              break;
            case 'input':
              Je(r, a), Ui('invalid', r);
              break;
            case 'select':
              (r._wrapperState = { wasMultiple: !!a.multiple }), Ui('invalid', r);
              break;
            case 'textarea':
              st(r, a), Ui('invalid', r);
          }
          for (var o in (xt(n, a), (i = null), a))
            if (a.hasOwnProperty(o)) {
              var s = a[o];
              'children' === o
                ? 'string' == typeof s
                  ? r.textContent !== s &&
                    (!0 !== a.suppressHydrationWarning && ta(r.textContent, s, e),
                    (i = ['children', s]))
                  : 'number' == typeof s &&
                    r.textContent !== '' + s &&
                    (!0 !== a.suppressHydrationWarning && ta(r.textContent, s, e),
                    (i = ['children', '' + s]))
                : ce.hasOwnProperty(o) && null != s && 'onScroll' === o && Ui('scroll', r);
            }
          switch (n) {
            case 'input':
              Ye(r), nt(r, a, !0);
              break;
            case 'textarea':
              Ye(r), ut(r);
              break;
            case 'select':
            case 'option':
              break;
            default:
              'function' == typeof a.onClick && (r.onclick = na);
          }
          (r = i), (t.updateQueue = r), null !== r && (t.flags |= 4);
        } else {
          (o = 9 === i.nodeType ? i : i.ownerDocument),
            'http://www.w3.org/1999/xhtml' === e && (e = ct(n)),
            'http://www.w3.org/1999/xhtml' === e
              ? 'script' === n
                ? (((e = o.createElement('div')).innerHTML = '<script><\/script>'),
                  (e = e.removeChild(e.firstChild)))
                : 'string' == typeof r.is
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    'select' === n &&
                      ((o = e), r.multiple ? (o.multiple = !0) : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[ma] = t),
            (e[ga] = r),
            Nl(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = kt(n, r)), n)) {
              case 'dialog':
                Ui('cancel', e), Ui('close', e), (i = r);
                break;
              case 'iframe':
              case 'object':
              case 'embed':
                Ui('load', e), (i = r);
                break;
              case 'video':
              case 'audio':
                for (i = 0; i < Vi.length; i++) Ui(Vi[i], e);
                i = r;
                break;
              case 'source':
                Ui('error', e), (i = r);
                break;
              case 'img':
              case 'image':
              case 'link':
                Ui('error', e), Ui('load', e), (i = r);
                break;
              case 'details':
                Ui('toggle', e), (i = r);
                break;
              case 'input':
                Je(e, r), (i = Ge(e, r)), Ui('invalid', e);
                break;
              case 'option':
              default:
                i = r;
                break;
              case 'select':
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ze({}, r, { value: void 0 })),
                  Ui('invalid', e);
                break;
              case 'textarea':
                st(e, r), (i = ot(e, r)), Ui('invalid', e);
            }
            for (a in (xt(n, i), (s = i)))
              if (s.hasOwnProperty(a)) {
                var l = s[a];
                'style' === a
                  ? bt(e, l)
                  : 'dangerouslySetInnerHTML' === a
                    ? null != (l = l ? l.__html : void 0) && pt(e, l)
                    : 'children' === a
                      ? 'string' == typeof l
                        ? ('textarea' !== n || '' !== l) && mt(e, l)
                        : 'number' == typeof l && mt(e, '' + l)
                      : 'suppressContentEditableWarning' !== a &&
                        'suppressHydrationWarning' !== a &&
                        'autoFocus' !== a &&
                        (ce.hasOwnProperty(a)
                          ? null != l && 'onScroll' === a && Ui('scroll', e)
                          : null != l && ke(e, a, l, o));
              }
            switch (n) {
              case 'input':
                Ye(e), nt(e, r, !1);
                break;
              case 'textarea':
                Ye(e), ut(e);
                break;
              case 'option':
                null != r.value && e.setAttribute('value', '' + qe(r.value));
                break;
              case 'select':
                (e.multiple = !!r.multiple),
                  null != (a = r.value)
                    ? at(e, !!r.multiple, a, !1)
                    : null != r.defaultValue && at(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                'function' == typeof i.onClick && (e.onclick = na);
            }
            switch (n) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                r = !!r.autoFocus;
                break e;
              case 'img':
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Yl(t), null;
    case 6:
      if (e && null != t.stateNode) jl(e, t, e.memoizedProps, r);
      else {
        if ('string' != typeof r && null === t.stateNode) throw Error(le(166));
        if (((n = Go(Qo.current)), Go(Yo.current), mo(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[ma] = t),
            (a = r.nodeValue !== n) && null !== (e = ao))
          )
            switch (e.tag) {
              case 3:
                ta(r.nodeValue, n, !!(1 & e.mode));
                break;
              case 5:
                !0 !== e.memoizedProps.suppressHydrationWarning &&
                  ta(r.nodeValue, n, !!(1 & e.mode));
            }
          a && (t.flags |= 4);
        } else
          ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[ma] = t),
            (t.stateNode = r);
      }
      return Yl(t), null;
    case 13:
      if (
        (Pa(rs),
        (r = t.memoizedState),
        null === e || (null !== e.memoizedState && null !== e.memoizedState.dehydrated))
      ) {
        if (so && null !== oo && 1 & t.mode && !(128 & t.flags))
          go(), yo(), (t.flags |= 98560), (a = !1);
        else if (((a = mo(t)), null !== r && null !== r.dehydrated)) {
          if (null === e) {
            if (!a) throw Error(le(318));
            if (!(a = null !== (a = t.memoizedState) ? a.dehydrated : null)) throw Error(le(317));
            a[ma] = t;
          } else yo(), !(128 & t.flags) && (t.memoizedState = null), (t.flags |= 4);
          Yl(t), (a = !1);
        } else null !== lo && (uc(lo), (lo = null)), (a = !0);
        if (!a) return 65536 & t.flags ? t : null;
      }
      return 128 & t.flags
        ? ((t.lanes = n), t)
        : ((r = null !== r) !== (null !== e && null !== e.memoizedState) &&
            r &&
            ((t.child.flags |= 8192),
            1 & t.mode && (null === e || 1 & rs.current ? 0 === ju && (ju = 3) : vc())),
          null !== t.updateQueue && (t.flags |= 4),
          Yl(t),
          null);
    case 4:
      return es(), Ml(e, t), null === e && Wi(t.stateNode.containerInfo), Yl(t), null;
    case 10:
      return Oo(t.type._context), Yl(t), null;
    case 19:
      if ((Pa(rs), null === (a = t.memoizedState))) return Yl(t), null;
      if (((r = !!(128 & t.flags)), null === (o = a.rendering)))
        if (r) Kl(a, !1);
        else {
          if (0 !== ju || (null !== e && 128 & e.flags))
            for (e = t.child; null !== e; ) {
              if (null !== (o = is(e))) {
                for (
                  t.flags |= 128,
                    Kl(a, !1),
                    null !== (r = o.updateQueue) && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  null !== n;

                )
                  (e = r),
                    ((a = n).flags &= 14680066),
                    null === (o = a.alternate)
                      ? ((a.childLanes = 0),
                        (a.lanes = e),
                        (a.child = null),
                        (a.subtreeFlags = 0),
                        (a.memoizedProps = null),
                        (a.memoizedState = null),
                        (a.updateQueue = null),
                        (a.dependencies = null),
                        (a.stateNode = null))
                      : ((a.childLanes = o.childLanes),
                        (a.lanes = o.lanes),
                        (a.child = o.child),
                        (a.subtreeFlags = 0),
                        (a.deletions = null),
                        (a.memoizedProps = o.memoizedProps),
                        (a.memoizedState = o.memoizedState),
                        (a.updateQueue = o.updateQueue),
                        (a.type = o.type),
                        (e = o.dependencies),
                        (a.dependencies =
                          null === e ? null : { lanes: e.lanes, firstContext: e.firstContext })),
                    (n = n.sibling);
                return Aa(rs, (1 & rs.current) | 2), t.child;
              }
              e = e.sibling;
            }
          null !== a.tail &&
            en() > Wu &&
            ((t.flags |= 128), (r = !0), Kl(a, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (null !== (e = is(o))) {
            if (
              ((t.flags |= 128),
              (r = !0),
              null !== (n = e.updateQueue) && ((t.updateQueue = n), (t.flags |= 4)),
              Kl(a, !0),
              null === a.tail && 'hidden' === a.tailMode && !o.alternate && !so)
            )
              return Yl(t), null;
          } else
            2 * en() - a.renderingStartTime > Wu &&
              1073741824 !== n &&
              ((t.flags |= 128), (r = !0), Kl(a, !1), (t.lanes = 4194304));
        a.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : (null !== (n = a.last) ? (n.sibling = o) : (t.child = o), (a.last = o));
      }
      return null !== a.tail
        ? ((t = a.tail),
          (a.rendering = t),
          (a.tail = t.sibling),
          (a.renderingStartTime = en()),
          (t.sibling = null),
          (n = rs.current),
          Aa(rs, r ? (1 & n) | 2 : 1 & n),
          t)
        : (Yl(t), null);
    case 22:
    case 23:
      return (
        pc(),
        (r = null !== t.memoizedState),
        null !== e && (null !== e.memoizedState) !== r && (t.flags |= 8192),
        r && 1 & t.mode
          ? !!(1073741824 & Mu) && (Yl(t), 6 & t.subtreeFlags && (t.flags |= 8192))
          : Yl(t),
        null
      );
    case 24:
    case 25:
      return null;
  }
  throw Error(le(156, t.tag));
}
function Ql(e, t) {
  switch ((io(t), t.tag)) {
    case 1:
      return Ma(t.type) && Fa(), 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
    case 3:
      return (
        es(),
        Pa(Da),
        Pa(Oa),
        os(),
        65536 & (e = t.flags) && !(128 & e) ? ((t.flags = (-65537 & e) | 128), t) : null
      );
    case 5:
      return ns(t), null;
    case 13:
      if ((Pa(rs), null !== (e = t.memoizedState) && null !== e.dehydrated)) {
        if (null === t.alternate) throw Error(le(340));
        yo();
      }
      return 65536 & (e = t.flags) ? ((t.flags = (-65537 & e) | 128), t) : null;
    case 19:
      return Pa(rs), null;
    case 4:
      return es(), null;
    case 10:
      return Oo(t.type._context), null;
    case 22:
    case 23:
      return pc(), null;
    default:
      return null;
  }
}
(Nl = function (e, t) {
  for (var n = t.child; null !== n; ) {
    if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
    else if (4 !== n.tag && null !== n.child) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; null === n.sibling; ) {
      if (null === n.return || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
}),
  (Ml = function () {}),
  (Fl = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      (e = t.stateNode), Go(Yo.current);
      var a,
        o = null;
      switch (n) {
        case 'input':
          (i = Ge(e, i)), (r = Ge(e, r)), (o = []);
          break;
        case 'select':
          (i = ze({}, i, { value: void 0 })), (r = ze({}, r, { value: void 0 })), (o = []);
          break;
        case 'textarea':
          (i = ot(e, i)), (r = ot(e, r)), (o = []);
          break;
        default:
          'function' != typeof i.onClick && 'function' == typeof r.onClick && (e.onclick = na);
      }
      for (u in (xt(n, r), (n = null), i))
        if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && null != i[u])
          if ('style' === u) {
            var s = i[u];
            for (a in s) s.hasOwnProperty(a) && (n || (n = {}), (n[a] = ''));
          } else
            'dangerouslySetInnerHTML' !== u &&
              'children' !== u &&
              'suppressContentEditableWarning' !== u &&
              'suppressHydrationWarning' !== u &&
              'autoFocus' !== u &&
              (ce.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
      for (u in r) {
        var l = r[u];
        if (
          ((s = null != i ? i[u] : void 0),
          r.hasOwnProperty(u) && l !== s && (null != l || null != s))
        )
          if ('style' === u)
            if (s) {
              for (a in s)
                !s.hasOwnProperty(a) || (l && l.hasOwnProperty(a)) || (n || (n = {}), (n[a] = ''));
              for (a in l) l.hasOwnProperty(a) && s[a] !== l[a] && (n || (n = {}), (n[a] = l[a]));
            } else n || (o || (o = []), o.push(u, n)), (n = l);
          else
            'dangerouslySetInnerHTML' === u
              ? ((l = l ? l.__html : void 0),
                (s = s ? s.__html : void 0),
                null != l && s !== l && (o = o || []).push(u, l))
              : 'children' === u
                ? ('string' != typeof l && 'number' != typeof l) || (o = o || []).push(u, '' + l)
                : 'suppressContentEditableWarning' !== u &&
                  'suppressHydrationWarning' !== u &&
                  (ce.hasOwnProperty(u)
                    ? (null != l && 'onScroll' === u && Ui('scroll', e), o || s === l || (o = []))
                    : (o = o || []).push(u, l));
      }
      n && (o = o || []).push('style', n);
      var u = o;
      (t.updateQueue = u) && (t.flags |= 4);
    }
  }),
  (jl = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
  });
var Gl = !1,
  Jl = !1,
  eu = 'function' == typeof WeakSet ? WeakSet : Set,
  tu = null;
function nu(e, t) {
  var n = e.ref;
  if (null !== n)
    if ('function' == typeof n)
      try {
        n(null);
      } catch (r) {
        Tc(e, t, r);
      }
    else n.current = null;
}
function ru(e, t, n) {
  try {
    n();
  } catch (r) {
    Tc(e, t, r);
  }
}
var iu = !1;
function au(e, t, n) {
  var r = t.updateQueue;
  if (null !== (r = null !== r ? r.lastEffect : null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var a = i.destroy;
        (i.destroy = void 0), void 0 !== a && ru(t, n, a);
      }
      i = i.next;
    } while (i !== r);
  }
}
function ou(e, t) {
  if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function su(e) {
  var t = e.ref;
  if (null !== t) {
    var n = e.stateNode;
    e.tag, (e = n), 'function' == typeof t ? t(e) : (t.current = e);
  }
}
function lu(e) {
  var t = e.alternate;
  null !== t && ((e.alternate = null), lu(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    5 === e.tag &&
      null !== (t = e.stateNode) &&
      (delete t[ma], delete t[ga], delete t[va], delete t[ba], delete t[wa]),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function uu(e) {
  return 5 === e.tag || 3 === e.tag || 4 === e.tag;
}
function cu(e) {
  e: for (;;) {
    for (; null === e.sibling; ) {
      if (null === e.return || uu(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag; ) {
      if (2 & e.flags) continue e;
      if (null === e.child || 4 === e.tag) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(2 & e.flags)) return e.stateNode;
  }
}
function du(e, t, n) {
  var r = e.tag;
  if (5 === r || 6 === r)
    (e = e.stateNode),
      t
        ? 8 === n.nodeType
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e),
          null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = na));
  else if (4 !== r && null !== (e = e.child))
    for (du(e, t, n), e = e.sibling; null !== e; ) du(e, t, n), (e = e.sibling);
}
function fu(e, t, n) {
  var r = e.tag;
  if (5 === r || 6 === r) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (4 !== r && null !== (e = e.child))
    for (fu(e, t, n), e = e.sibling; null !== e; ) fu(e, t, n), (e = e.sibling);
}
var hu = null,
  pu = !1;
function mu(e, t, n) {
  for (n = n.child; null !== n; ) gu(e, t, n), (n = n.sibling);
}
function gu(e, t, n) {
  if (un && 'function' == typeof un.onCommitFiberUnmount)
    try {
      un.onCommitFiberUnmount(ln, n);
    } catch (s) {}
  switch (n.tag) {
    case 5:
      Jl || nu(n, t);
    case 6:
      var r = hu,
        i = pu;
      (hu = null),
        mu(e, t, n),
        (pu = i),
        null !== (hu = r) &&
          (pu
            ? ((e = hu),
              (n = n.stateNode),
              8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n))
            : hu.removeChild(n.stateNode));
      break;
    case 18:
      null !== hu &&
        (pu
          ? ((e = hu),
            (n = n.stateNode),
            8 === e.nodeType ? da(e.parentNode, n) : 1 === e.nodeType && da(e, n),
            Hn(e))
          : da(hu, n.stateNode));
      break;
    case 4:
      (r = hu),
        (i = pu),
        (hu = n.stateNode.containerInfo),
        (pu = !0),
        mu(e, t, n),
        (hu = r),
        (pu = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Jl && null !== (r = n.updateQueue) && null !== (r = r.lastEffect)) {
        i = r = r.next;
        do {
          var a = i,
            o = a.destroy;
          (a = a.tag), void 0 !== o && (2 & a || 4 & a) && ru(n, t, o), (i = i.next);
        } while (i !== r);
      }
      mu(e, t, n);
      break;
    case 1:
      if (!Jl && (nu(n, t), 'function' == typeof (r = n.stateNode).componentWillUnmount))
        try {
          (r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
        } catch (s) {
          Tc(n, t, s);
        }
      mu(e, t, n);
      break;
    case 21:
      mu(e, t, n);
      break;
    case 22:
      1 & n.mode
        ? ((Jl = (r = Jl) || null !== n.memoizedState), mu(e, t, n), (Jl = r))
        : mu(e, t, n);
      break;
    default:
      mu(e, t, n);
  }
}
function yu(e) {
  var t = e.updateQueue;
  if (null !== t) {
    e.updateQueue = null;
    var n = e.stateNode;
    null === n && (n = e.stateNode = new eu()),
      t.forEach(function (t) {
        var r = Oc.bind(null, e, t);
        n.has(t) || (n.add(t), t.then(r, r));
      });
  }
}
function vu(e, t) {
  var n = t.deletions;
  if (null !== n)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var a = e,
          o = t,
          s = o;
        e: for (; null !== s; ) {
          switch (s.tag) {
            case 5:
              (hu = s.stateNode), (pu = !1);
              break e;
            case 3:
            case 4:
              (hu = s.stateNode.containerInfo), (pu = !0);
              break e;
          }
          s = s.return;
        }
        if (null === hu) throw Error(le(160));
        gu(a, o, i), (hu = null), (pu = !1);
        var l = i.alternate;
        null !== l && (l.return = null), (i.return = null);
      } catch (u) {
        Tc(i, t, u);
      }
    }
  if (12854 & t.subtreeFlags) for (t = t.child; null !== t; ) bu(t, e), (t = t.sibling);
}
function bu(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((vu(t, e), wu(e), 4 & r)) {
        try {
          au(3, e, e.return), ou(3, e);
        } catch (m) {
          Tc(e, e.return, m);
        }
        try {
          au(5, e, e.return);
        } catch (m) {
          Tc(e, e.return, m);
        }
      }
      break;
    case 1:
      vu(t, e), wu(e), 512 & r && null !== n && nu(n, n.return);
      break;
    case 5:
      if ((vu(t, e), wu(e), 512 & r && null !== n && nu(n, n.return), 32 & e.flags)) {
        var i = e.stateNode;
        try {
          mt(i, '');
        } catch (m) {
          Tc(e, e.return, m);
        }
      }
      if (4 & r && null != (i = e.stateNode)) {
        var a = e.memoizedProps,
          o = null !== n ? n.memoizedProps : a,
          s = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), null !== l))
          try {
            'input' === s && 'radio' === a.type && null != a.name && et(i, a), kt(s, o);
            var u = kt(s, a);
            for (o = 0; o < l.length; o += 2) {
              var c = l[o],
                d = l[o + 1];
              'style' === c
                ? bt(i, d)
                : 'dangerouslySetInnerHTML' === c
                  ? pt(i, d)
                  : 'children' === c
                    ? mt(i, d)
                    : ke(i, c, d, u);
            }
            switch (s) {
              case 'input':
                tt(i, a);
                break;
              case 'textarea':
                lt(i, a);
                break;
              case 'select':
                var f = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!a.multiple;
                var h = a.value;
                null != h
                  ? at(i, !!a.multiple, h, !1)
                  : f !== !!a.multiple &&
                    (null != a.defaultValue
                      ? at(i, !!a.multiple, a.defaultValue, !0)
                      : at(i, !!a.multiple, a.multiple ? [] : '', !1));
            }
            i[ga] = a;
          } catch (m) {
            Tc(e, e.return, m);
          }
      }
      break;
    case 6:
      if ((vu(t, e), wu(e), 4 & r)) {
        if (null === e.stateNode) throw Error(le(162));
        (i = e.stateNode), (a = e.memoizedProps);
        try {
          i.nodeValue = a;
        } catch (m) {
          Tc(e, e.return, m);
        }
      }
      break;
    case 3:
      if ((vu(t, e), wu(e), 4 & r && null !== n && n.memoizedState.isDehydrated))
        try {
          Hn(t.containerInfo);
        } catch (m) {
          Tc(e, e.return, m);
        }
      break;
    case 4:
    default:
      vu(t, e), wu(e);
      break;
    case 13:
      vu(t, e),
        wu(e),
        8192 & (i = e.child).flags &&
          ((a = null !== i.memoizedState),
          (i.stateNode.isHidden = a),
          !a || (null !== i.alternate && null !== i.alternate.memoizedState) || (Zu = en())),
        4 & r && yu(e);
      break;
    case 22:
      if (
        ((c = null !== n && null !== n.memoizedState),
        1 & e.mode ? ((Jl = (u = Jl) || c), vu(t, e), (Jl = u)) : vu(t, e),
        wu(e),
        8192 & r)
      ) {
        if (((u = null !== e.memoizedState), (e.stateNode.isHidden = u) && !c && 1 & e.mode))
          for (tu = e, c = e.child; null !== c; ) {
            for (d = tu = c; null !== tu; ) {
              switch (((h = (f = tu).child), f.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  au(4, f, f.return);
                  break;
                case 1:
                  nu(f, f.return);
                  var p = f.stateNode;
                  if ('function' == typeof p.componentWillUnmount) {
                    (r = f), (n = f.return);
                    try {
                      (t = r),
                        (p.props = t.memoizedProps),
                        (p.state = t.memoizedState),
                        p.componentWillUnmount();
                    } catch (m) {
                      Tc(r, n, m);
                    }
                  }
                  break;
                case 5:
                  nu(f, f.return);
                  break;
                case 22:
                  if (null !== f.memoizedState) {
                    _u(d);
                    continue;
                  }
              }
              null !== h ? ((h.return = f), (tu = h)) : _u(d);
            }
            c = c.sibling;
          }
        e: for (c = null, d = e; ; ) {
          if (5 === d.tag) {
            if (null === c) {
              c = d;
              try {
                (i = d.stateNode),
                  u
                    ? 'function' == typeof (a = i.style).setProperty
                      ? a.setProperty('display', 'none', 'important')
                      : (a.display = 'none')
                    : ((s = d.stateNode),
                      (o =
                        null != (l = d.memoizedProps.style) && l.hasOwnProperty('display')
                          ? l.display
                          : null),
                      (s.style.display = vt('display', o)));
              } catch (m) {
                Tc(e, e.return, m);
              }
            }
          } else if (6 === d.tag) {
            if (null === c)
              try {
                d.stateNode.nodeValue = u ? '' : d.memoizedProps;
              } catch (m) {
                Tc(e, e.return, m);
              }
          } else if (
            ((22 !== d.tag && 23 !== d.tag) || null === d.memoizedState || d === e) &&
            null !== d.child
          ) {
            (d.child.return = d), (d = d.child);
            continue;
          }
          if (d === e) break e;
          for (; null === d.sibling; ) {
            if (null === d.return || d.return === e) break e;
            c === d && (c = null), (d = d.return);
          }
          c === d && (c = null), (d.sibling.return = d.return), (d = d.sibling);
        }
      }
      break;
    case 19:
      vu(t, e), wu(e), 4 & r && yu(e);
    case 21:
  }
}
function wu(e) {
  var t = e.flags;
  if (2 & t) {
    try {
      e: {
        for (var n = e.return; null !== n; ) {
          if (uu(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(le(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          32 & r.flags && (mt(i, ''), (r.flags &= -33)), fu(e, cu(e), i);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo;
          du(e, cu(e), a);
          break;
        default:
          throw Error(le(161));
      }
    } catch (o) {
      Tc(e, e.return, o);
    }
    e.flags &= -3;
  }
  4096 & t && (e.flags &= -4097);
}
function xu(e, t, n) {
  (tu = e), ku(e);
}
function ku(e, t, n) {
  for (var r = !!(1 & e.mode); null !== tu; ) {
    var i = tu,
      a = i.child;
    if (22 === i.tag && r) {
      var o = null !== i.memoizedState || Gl;
      if (!o) {
        var s = i.alternate,
          l = (null !== s && null !== s.memoizedState) || Jl;
        s = Gl;
        var u = Jl;
        if (((Gl = o), (Jl = l) && !u))
          for (tu = i; null !== tu; )
            (l = (o = tu).child),
              22 === o.tag && null !== o.memoizedState
                ? Eu(i)
                : null !== l
                  ? ((l.return = o), (tu = l))
                  : Eu(i);
        for (; null !== a; ) (tu = a), ku(a), (a = a.sibling);
        (tu = i), (Gl = s), (Jl = u);
      }
      Su(e);
    } else 8772 & i.subtreeFlags && null !== a ? ((a.return = i), (tu = a)) : Su(e);
  }
}
function Su(e) {
  for (; null !== tu; ) {
    var t = tu;
    if (8772 & t.flags) {
      var n = t.alternate;
      try {
        if (8772 & t.flags)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Jl || ou(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (4 & t.flags && !Jl)
                if (null === n) r.componentDidMount();
                else {
                  var i = t.elementType === t.type ? n.memoizedProps : al(t.type, n.memoizedProps);
                  r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
                }
              var a = t.updateQueue;
              null !== a && qo(t, a, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (null !== o) {
                if (((n = null), null !== t.child))
                  switch (t.child.tag) {
                    case 5:
                    case 1:
                      n = t.child.stateNode;
                  }
                qo(t, o, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (null === n && 4 & t.flags) {
                n = s;
                var l = t.memoizedProps;
                switch (t.type) {
                  case 'button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    l.autoFocus && n.focus();
                    break;
                  case 'img':
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
            case 4:
            case 12:
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            case 13:
              if (null === t.memoizedState) {
                var u = t.alternate;
                if (null !== u) {
                  var c = u.memoizedState;
                  if (null !== c) {
                    var d = c.dehydrated;
                    null !== d && Hn(d);
                  }
                }
              }
              break;
            default:
              throw Error(le(163));
          }
        Jl || (512 & t.flags && su(t));
      } catch (f) {
        Tc(t, t.return, f);
      }
    }
    if (t === e) {
      tu = null;
      break;
    }
    if (null !== (n = t.sibling)) {
      (n.return = t.return), (tu = n);
      break;
    }
    tu = t.return;
  }
}
function _u(e) {
  for (; null !== tu; ) {
    var t = tu;
    if (t === e) {
      tu = null;
      break;
    }
    var n = t.sibling;
    if (null !== n) {
      (n.return = t.return), (tu = n);
      break;
    }
    tu = t.return;
  }
}
function Eu(e) {
  for (; null !== tu; ) {
    var t = tu;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ou(4, t);
          } catch (l) {
            Tc(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if ('function' == typeof r.componentDidMount) {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              Tc(t, i, l);
            }
          }
          var a = t.return;
          try {
            su(t);
          } catch (l) {
            Tc(t, a, l);
          }
          break;
        case 5:
          var o = t.return;
          try {
            su(t);
          } catch (l) {
            Tc(t, o, l);
          }
      }
    } catch (l) {
      Tc(t, t.return, l);
    }
    if (t === e) {
      tu = null;
      break;
    }
    var s = t.sibling;
    if (null !== s) {
      (s.return = t.return), (tu = s);
      break;
    }
    tu = t.return;
  }
}
var Cu,
  Tu = Math.ceil,
  Pu = Se.ReactCurrentDispatcher,
  Au = Se.ReactCurrentOwner,
  Ru = Se.ReactCurrentBatchConfig,
  Ou = 0,
  Du = null,
  Lu = null,
  Nu = 0,
  Mu = 0,
  Fu = Ta(0),
  ju = 0,
  Vu = null,
  Iu = 0,
  zu = 0,
  Bu = 0,
  Uu = null,
  $u = null,
  Zu = 0,
  Wu = 1 / 0,
  Hu = null,
  qu = !1,
  Ku = null,
  Yu = null,
  Xu = !1,
  Qu = null,
  Gu = 0,
  Ju = 0,
  ec = null,
  tc = -1,
  nc = 0;
function rc() {
  return 6 & Ou ? en() : -1 !== tc ? tc : (tc = en());
}
function ic(e) {
  return 1 & e.mode
    ? 2 & Ou && 0 !== Nu
      ? Nu & -Nu
      : null !== bo.transition
        ? (0 === nc && (nc = bn()), nc)
        : 0 !== (e = Sn)
          ? e
          : (e = void 0 === (e = window.event) ? 16 : er(e.type))
    : 1;
}
function ac(e, t, n, r) {
  if (50 < Ju) throw ((Ju = 0), (ec = null), Error(le(185)));
  xn(e, n, r),
    (2 & Ou && e === Du) ||
      (e === Du && (!(2 & Ou) && (zu |= n), 4 === ju && cc(e, Nu)),
      oc(e, r),
      1 === n && 0 === Ou && !(1 & t.mode) && ((Wu = en() + 500), Ua && Wa()));
}
function oc(e, t) {
  var n = e.callbackNode;
  !(function (e, t) {
    for (
      var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes;
      0 < a;

    ) {
      var o = 31 - cn(a),
        s = 1 << o,
        l = i[o];
      -1 === l ? (s & n && !(s & r)) || (i[o] = yn(s, t)) : l <= t && (e.expiredLanes |= s),
        (a &= ~s);
    }
  })(e, t);
  var r = gn(e, e === Du ? Nu : 0);
  if (0 === r) null !== n && Qt(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((null != n && Qt(n), 1 === t))
      0 === e.tag
        ? (function (e) {
            (Ua = !0), Za(e);
          })(dc.bind(null, e))
        : Za(dc.bind(null, e)),
        ua(function () {
          !(6 & Ou) && Wa();
        }),
        (n = null);
    else {
      switch (_n(r)) {
        case 1:
          n = nn;
          break;
        case 4:
          n = rn;
          break;
        case 16:
        default:
          n = an;
          break;
        case 536870912:
          n = sn;
      }
      n = Dc(n, sc.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function sc(e, t) {
  if (((tc = -1), (nc = 0), 6 & Ou)) throw Error(le(327));
  var n = e.callbackNode;
  if (Ec() && e.callbackNode !== n) return null;
  var r = gn(e, e === Du ? Nu : 0);
  if (0 === r) return null;
  if (30 & r || r & e.expiredLanes || t) t = bc(e, r);
  else {
    t = r;
    var i = Ou;
    Ou |= 2;
    var a = yc();
    for ((Du === e && Nu === t) || ((Hu = null), (Wu = en() + 500), mc(e, t)); ; )
      try {
        xc();
        break;
      } catch (s) {
        gc(e, s);
      }
    Ro(), (Pu.current = a), (Ou = i), null !== Lu ? (t = 0) : ((Du = null), (Nu = 0), (t = ju));
  }
  if (0 !== t) {
    if ((2 === t && 0 !== (i = vn(e)) && ((r = i), (t = lc(e, i))), 1 === t))
      throw ((n = Vu), mc(e, 0), cc(e, r), oc(e, en()), n);
    if (6 === t) cc(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(
          30 & r ||
          (function (e) {
            for (var t = e; ; ) {
              if (16384 & t.flags) {
                var n = t.updateQueue;
                if (null !== n && null !== (n = n.stores))
                  for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                      a = i.getSnapshot;
                    i = i.value;
                    try {
                      if (!ci(a(), i)) return !1;
                    } catch (o) {
                      return !1;
                    }
                  }
              }
              if (((n = t.child), 16384 & t.subtreeFlags && null !== n)) (n.return = t), (t = n);
              else {
                if (t === e) break;
                for (; null === t.sibling; ) {
                  if (null === t.return || t.return === e) return !0;
                  t = t.return;
                }
                (t.sibling.return = t.return), (t = t.sibling);
              }
            }
            return !0;
          })(i) ||
          ((t = bc(e, r)), 2 === t && ((a = vn(e)), 0 !== a && ((r = a), (t = lc(e, a)))), 1 !== t)
        ))
      )
        throw ((n = Vu), mc(e, 0), cc(e, r), oc(e, en()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(le(345));
        case 2:
        case 5:
          _c(e, $u, Hu);
          break;
        case 3:
          if ((cc(e, r), (130023424 & r) === r && 10 < (t = Zu + 500 - en()))) {
            if (0 !== gn(e, 0)) break;
            if (((i = e.suspendedLanes) & r) !== r) {
              rc(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = oa(_c.bind(null, e, $u, Hu), t);
            break;
          }
          _c(e, $u, Hu);
          break;
        case 4:
          if ((cc(e, r), (4194240 & r) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - cn(r);
            (a = 1 << o), (o = t[o]) > i && (i = o), (r &= ~a);
          }
          if (
            ((r = i),
            10 <
              (r =
                (120 > (r = en() - r)
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * Tu(r / 1960)) - r))
          ) {
            e.timeoutHandle = oa(_c.bind(null, e, $u, Hu), r);
            break;
          }
          _c(e, $u, Hu);
          break;
        default:
          throw Error(le(329));
      }
    }
  }
  return oc(e, en()), e.callbackNode === n ? sc.bind(null, e) : null;
}
function lc(e, t) {
  var n = Uu;
  return (
    e.current.memoizedState.isDehydrated && (mc(e, t).flags |= 256),
    2 !== (e = bc(e, t)) && ((t = $u), ($u = n), null !== t && uc(t)),
    e
  );
}
function uc(e) {
  null === $u ? ($u = e) : $u.push.apply($u, e);
}
function cc(e, t) {
  for (
    t &= ~Bu, t &= ~zu, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - cn(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function dc(e) {
  if (6 & Ou) throw Error(le(327));
  Ec();
  var t = gn(e, 0);
  if (!(1 & t)) return oc(e, en()), null;
  var n = bc(e, t);
  if (0 !== e.tag && 2 === n) {
    var r = vn(e);
    0 !== r && ((t = r), (n = lc(e, r)));
  }
  if (1 === n) throw ((n = Vu), mc(e, 0), cc(e, t), oc(e, en()), n);
  if (6 === n) throw Error(le(345));
  return (
    (e.finishedWork = e.current.alternate), (e.finishedLanes = t), _c(e, $u, Hu), oc(e, en()), null
  );
}
function fc(e, t) {
  var n = Ou;
  Ou |= 1;
  try {
    return e(t);
  } finally {
    0 === (Ou = n) && ((Wu = en() + 500), Ua && Wa());
  }
}
function hc(e) {
  null !== Qu && 0 === Qu.tag && !(6 & Ou) && Ec();
  var t = Ou;
  Ou |= 1;
  var n = Ru.transition,
    r = Sn;
  try {
    if (((Ru.transition = null), (Sn = 1), e)) return e();
  } finally {
    (Sn = r), (Ru.transition = n), !(6 & (Ou = t)) && Wa();
  }
}
function pc() {
  (Mu = Fu.current), Pa(Fu);
}
function mc(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((-1 !== n && ((e.timeoutHandle = -1), sa(n)), null !== Lu))
    for (n = Lu.return; null !== n; ) {
      var r = n;
      switch ((io(r), r.tag)) {
        case 1:
          null != (r = r.type.childContextTypes) && Fa();
          break;
        case 3:
          es(), Pa(Da), Pa(Oa), os();
          break;
        case 5:
          ns(r);
          break;
        case 4:
          es();
          break;
        case 13:
        case 19:
          Pa(rs);
          break;
        case 10:
          Oo(r.type._context);
          break;
        case 22:
        case 23:
          pc();
      }
      n = n.return;
    }
  if (
    ((Du = e),
    (Lu = e = Fc(e.current, null)),
    (Nu = Mu = t),
    (ju = 0),
    (Vu = null),
    (Bu = zu = Iu = 0),
    ($u = Uu = null),
    null !== Mo)
  ) {
    for (t = 0; t < Mo.length; t++)
      if (null !== (r = (n = Mo[t]).interleaved)) {
        n.interleaved = null;
        var i = r.next,
          a = n.pending;
        if (null !== a) {
          var o = a.next;
          (a.next = i), (r.next = o);
        }
        n.pending = r;
      }
    Mo = null;
  }
  return e;
}
function gc(e, t) {
  for (;;) {
    var n = Lu;
    try {
      if ((Ro(), (ss.current = tl), hs)) {
        for (var r = cs.memoizedState; null !== r; ) {
          var i = r.queue;
          null !== i && (i.pending = null), (r = r.next);
        }
        hs = !1;
      }
      if (
        ((us = 0),
        (fs = ds = cs = null),
        (ps = !1),
        (ms = 0),
        (Au.current = null),
        null === n || null === n.return)
      ) {
        (ju = 1), (Vu = t), (Lu = null);
        break;
      }
      e: {
        var a = e,
          o = n.return,
          s = n,
          l = t;
        if (
          ((t = Nu),
          (s.flags |= 32768),
          null !== l && 'object' == typeof l && 'function' == typeof l.then)
        ) {
          var u = l,
            c = s,
            d = c.tag;
          if (!(1 & c.mode || (0 !== d && 11 !== d && 15 !== d))) {
            var f = c.alternate;
            f
              ? ((c.updateQueue = f.updateQueue),
                (c.memoizedState = f.memoizedState),
                (c.lanes = f.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var h = bl(o);
          if (null !== h) {
            (h.flags &= -257), wl(h, o, s, 0, t), 1 & h.mode && vl(a, u, t), (l = u);
            var p = (t = h).updateQueue;
            if (null === p) {
              var m = new Set();
              m.add(l), (t.updateQueue = m);
            } else p.add(l);
            break e;
          }
          if (!(1 & t)) {
            vl(a, u, t), vc();
            break e;
          }
          l = Error(le(426));
        } else if (so && 1 & s.mode) {
          var g = bl(o);
          if (null !== g) {
            !(65536 & g.flags) && (g.flags |= 256), wl(g, o, s, 0, t), vo(fl(l, s));
            break e;
          }
        }
        (a = l = fl(l, s)), 4 !== ju && (ju = 2), null === Uu ? (Uu = [a]) : Uu.push(a), (a = o);
        do {
          switch (a.tag) {
            case 3:
              (a.flags |= 65536), (t &= -t), (a.lanes |= t), Wo(a, gl(0, l, t));
              break e;
            case 1:
              s = l;
              var y = a.type,
                v = a.stateNode;
              if (
                !(
                  128 & a.flags ||
                  ('function' != typeof y.getDerivedStateFromError &&
                    (null === v ||
                      'function' != typeof v.componentDidCatch ||
                      (null !== Yu && Yu.has(v))))
                )
              ) {
                (a.flags |= 65536), (t &= -t), (a.lanes |= t), Wo(a, yl(a, s, t));
                break e;
              }
          }
          a = a.return;
        } while (null !== a);
      }
      Sc(n);
    } catch (b) {
      (t = b), Lu === n && null !== n && (Lu = n = n.return);
      continue;
    }
    break;
  }
}
function yc() {
  var e = Pu.current;
  return (Pu.current = tl), null === e ? tl : e;
}
function vc() {
  (0 !== ju && 3 !== ju && 2 !== ju) || (ju = 4),
    null === Du || (!(268435455 & Iu) && !(268435455 & zu)) || cc(Du, Nu);
}
function bc(e, t) {
  var n = Ou;
  Ou |= 2;
  var r = yc();
  for ((Du === e && Nu === t) || ((Hu = null), mc(e, t)); ; )
    try {
      wc();
      break;
    } catch (i) {
      gc(e, i);
    }
  if ((Ro(), (Ou = n), (Pu.current = r), null !== Lu)) throw Error(le(261));
  return (Du = null), (Nu = 0), ju;
}
function wc() {
  for (; null !== Lu; ) kc(Lu);
}
function xc() {
  for (; null !== Lu && !Gt(); ) kc(Lu);
}
function kc(e) {
  var t = Cu(e.alternate, e, Mu);
  (e.memoizedProps = e.pendingProps), null === t ? Sc(e) : (Lu = t), (Au.current = null);
}
function Sc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), 32768 & t.flags)) {
      if (null !== (n = Ql(n, t))) return (n.flags &= 32767), void (Lu = n);
      if (null === e) return (ju = 6), void (Lu = null);
      (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
    } else if (null !== (n = Xl(n, t, Mu))) return void (Lu = n);
    if (null !== (t = t.sibling)) return void (Lu = t);
    Lu = t = e;
  } while (null !== t);
  0 === ju && (ju = 5);
}
function _c(e, t, n) {
  var r = Sn,
    i = Ru.transition;
  try {
    (Ru.transition = null),
      (Sn = 1),
      (function (e, t, n, r) {
        do {
          Ec();
        } while (null !== Qu);
        if (6 & Ou) throw Error(le(327));
        n = e.finishedWork;
        var i = e.finishedLanes;
        if (null === n) return null;
        if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(le(177));
        (e.callbackNode = null), (e.callbackPriority = 0);
        var a = n.lanes | n.childLanes;
        if (
          ((function (e, t) {
            var n = e.pendingLanes & ~t;
            (e.pendingLanes = t),
              (e.suspendedLanes = 0),
              (e.pingedLanes = 0),
              (e.expiredLanes &= t),
              (e.mutableReadLanes &= t),
              (e.entangledLanes &= t),
              (t = e.entanglements);
            var r = e.eventTimes;
            for (e = e.expirationTimes; 0 < n; ) {
              var i = 31 - cn(n),
                a = 1 << i;
              (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a);
            }
          })(e, a),
          e === Du && ((Lu = Du = null), (Nu = 0)),
          (!(2064 & n.subtreeFlags) && !(2064 & n.flags)) ||
            Xu ||
            ((Xu = !0),
            Dc(an, function () {
              return Ec(), null;
            })),
          (a = !!(15990 & n.flags)),
          !!(15990 & n.subtreeFlags) || a)
        ) {
          (a = Ru.transition), (Ru.transition = null);
          var o = Sn;
          Sn = 1;
          var s = Ou;
          (Ou |= 4),
            (Au.current = null),
            (function (e, t) {
              if (((ra = Kn), gi((e = mi())))) {
                if ('selectionStart' in e) var n = { start: e.selectionStart, end: e.selectionEnd };
                else
                  e: {
                    var r =
                      (n = ((n = e.ownerDocument) && n.defaultView) || window).getSelection &&
                      n.getSelection();
                    if (r && 0 !== r.rangeCount) {
                      n = r.anchorNode;
                      var i = r.anchorOffset,
                        a = r.focusNode;
                      r = r.focusOffset;
                      try {
                        n.nodeType, a.nodeType;
                      } catch (w) {
                        n = null;
                        break e;
                      }
                      var o = 0,
                        s = -1,
                        l = -1,
                        u = 0,
                        c = 0,
                        d = e,
                        f = null;
                      t: for (;;) {
                        for (
                          var h;
                          d !== n || (0 !== i && 3 !== d.nodeType) || (s = o + i),
                            d !== a || (0 !== r && 3 !== d.nodeType) || (l = o + r),
                            3 === d.nodeType && (o += d.nodeValue.length),
                            null !== (h = d.firstChild);

                        )
                          (f = d), (d = h);
                        for (;;) {
                          if (d === e) break t;
                          if (
                            (f === n && ++u === i && (s = o),
                            f === a && ++c === r && (l = o),
                            null !== (h = d.nextSibling))
                          )
                            break;
                          f = (d = f).parentNode;
                        }
                        d = h;
                      }
                      n = -1 === s || -1 === l ? null : { start: s, end: l };
                    } else n = null;
                  }
                n = n || { start: 0, end: 0 };
              } else n = null;
              for (ia = { focusedElem: e, selectionRange: n }, Kn = !1, tu = t; null !== tu; )
                if (((e = (t = tu).child), 1028 & t.subtreeFlags && null !== e))
                  (e.return = t), (tu = e);
                else
                  for (; null !== tu; ) {
                    t = tu;
                    try {
                      var p = t.alternate;
                      if (1024 & t.flags)
                        switch (t.tag) {
                          case 0:
                          case 11:
                          case 15:
                          case 5:
                          case 6:
                          case 4:
                          case 17:
                            break;
                          case 1:
                            if (null !== p) {
                              var m = p.memoizedProps,
                                g = p.memoizedState,
                                y = t.stateNode,
                                v = y.getSnapshotBeforeUpdate(
                                  t.elementType === t.type ? m : al(t.type, m),
                                  g
                                );
                              y.__reactInternalSnapshotBeforeUpdate = v;
                            }
                            break;
                          case 3:
                            var b = t.stateNode.containerInfo;
                            1 === b.nodeType
                              ? (b.textContent = '')
                              : 9 === b.nodeType &&
                                b.documentElement &&
                                b.removeChild(b.documentElement);
                            break;
                          default:
                            throw Error(le(163));
                        }
                    } catch (w) {
                      Tc(t, t.return, w);
                    }
                    if (null !== (e = t.sibling)) {
                      (e.return = t.return), (tu = e);
                      break;
                    }
                    tu = t.return;
                  }
              (p = iu), (iu = !1);
            })(e, n),
            bu(n, e),
            yi(ia),
            (Kn = !!ra),
            (ia = ra = null),
            (e.current = n),
            xu(n),
            Jt(),
            (Ou = s),
            (Sn = o),
            (Ru.transition = a);
        } else e.current = n;
        if (
          (Xu && ((Xu = !1), (Qu = e), (Gu = i)),
          (a = e.pendingLanes),
          0 === a && (Yu = null),
          (function (e) {
            if (un && 'function' == typeof un.onCommitFiberRoot)
              try {
                un.onCommitFiberRoot(ln, e, void 0, !(128 & ~e.current.flags));
              } catch (t) {}
          })(n.stateNode),
          oc(e, en()),
          null !== t)
        )
          for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
        if (qu) throw ((qu = !1), (e = Ku), (Ku = null), e);
        !!(1 & Gu) && 0 !== e.tag && Ec(),
          (a = e.pendingLanes),
          1 & a ? (e === ec ? Ju++ : ((Ju = 0), (ec = e))) : (Ju = 0),
          Wa();
      })(e, t, n, r);
  } finally {
    (Ru.transition = i), (Sn = r);
  }
  return null;
}
function Ec() {
  if (null !== Qu) {
    var e = _n(Gu),
      t = Ru.transition,
      n = Sn;
    try {
      if (((Ru.transition = null), (Sn = 16 > e ? 16 : e), null === Qu)) var r = !1;
      else {
        if (((e = Qu), (Qu = null), (Gu = 0), 6 & Ou)) throw Error(le(331));
        var i = Ou;
        for (Ou |= 4, tu = e.current; null !== tu; ) {
          var a = tu,
            o = a.child;
          if (16 & tu.flags) {
            var s = a.deletions;
            if (null !== s) {
              for (var l = 0; l < s.length; l++) {
                var u = s[l];
                for (tu = u; null !== tu; ) {
                  var c = tu;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      au(8, c, a);
                  }
                  var d = c.child;
                  if (null !== d) (d.return = c), (tu = d);
                  else
                    for (; null !== tu; ) {
                      var f = (c = tu).sibling,
                        h = c.return;
                      if ((lu(c), c === u)) {
                        tu = null;
                        break;
                      }
                      if (null !== f) {
                        (f.return = h), (tu = f);
                        break;
                      }
                      tu = h;
                    }
                }
              }
              var p = a.alternate;
              if (null !== p) {
                var m = p.child;
                if (null !== m) {
                  p.child = null;
                  do {
                    var g = m.sibling;
                    (m.sibling = null), (m = g);
                  } while (null !== m);
                }
              }
              tu = a;
            }
          }
          if (2064 & a.subtreeFlags && null !== o) (o.return = a), (tu = o);
          else
            e: for (; null !== tu; ) {
              if (2048 & (a = tu).flags)
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 15:
                    au(9, a, a.return);
                }
              var y = a.sibling;
              if (null !== y) {
                (y.return = a.return), (tu = y);
                break e;
              }
              tu = a.return;
            }
        }
        var v = e.current;
        for (tu = v; null !== tu; ) {
          var b = (o = tu).child;
          if (2064 & o.subtreeFlags && null !== b) (b.return = o), (tu = b);
          else
            e: for (o = v; null !== tu; ) {
              if (2048 & (s = tu).flags)
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ou(9, s);
                  }
                } catch (x) {
                  Tc(s, s.return, x);
                }
              if (s === o) {
                tu = null;
                break e;
              }
              var w = s.sibling;
              if (null !== w) {
                (w.return = s.return), (tu = w);
                break e;
              }
              tu = s.return;
            }
        }
        if (((Ou = i), Wa(), un && 'function' == typeof un.onPostCommitFiberRoot))
          try {
            un.onPostCommitFiberRoot(ln, e);
          } catch (x) {}
        r = !0;
      }
      return r;
    } finally {
      (Sn = n), (Ru.transition = t);
    }
  }
  return !1;
}
function Cc(e, t, n) {
  (e = $o(e, (t = gl(0, (t = fl(n, t)), 1)), 1)), (t = rc()), null !== e && (xn(e, 1, t), oc(e, t));
}
function Tc(e, t, n) {
  if (3 === e.tag) Cc(e, e, n);
  else
    for (; null !== t; ) {
      if (3 === t.tag) {
        Cc(t, e, n);
        break;
      }
      if (1 === t.tag) {
        var r = t.stateNode;
        if (
          'function' == typeof t.type.getDerivedStateFromError ||
          ('function' == typeof r.componentDidCatch && (null === Yu || !Yu.has(r)))
        ) {
          (t = $o(t, (e = yl(t, (e = fl(n, e)), 1)), 1)),
            (e = rc()),
            null !== t && (xn(t, 1, e), oc(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Pc(e, t, n) {
  var r = e.pingCache;
  null !== r && r.delete(t),
    (t = rc()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Du === e &&
      (Nu & n) === n &&
      (4 === ju || (3 === ju && (130023424 & Nu) === Nu && 500 > en() - Zu) ? mc(e, 0) : (Bu |= n)),
    oc(e, t);
}
function Ac(e, t) {
  0 === t && (1 & e.mode ? ((t = pn), !(130023424 & (pn <<= 1)) && (pn = 4194304)) : (t = 1));
  var n = rc();
  null !== (e = Vo(e, t)) && (xn(e, t, n), oc(e, n));
}
function Rc(e) {
  var t = e.memoizedState,
    n = 0;
  null !== t && (n = t.retryLane), Ac(e, n);
}
function Oc(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      null !== i && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(le(314));
  }
  null !== r && r.delete(t), Ac(e, n);
}
function Dc(e, t) {
  return Xt(e, t);
}
function Lc(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Nc(e, t, n, r) {
  return new Lc(e, t, n, r);
}
function Mc(e) {
  return !(!(e = e.prototype) || !e.isReactComponent);
}
function Fc(e, t) {
  var n = e.alternate;
  return (
    null === n
      ? (((n = Nc(e.tag, t, e.key, e.mode)).elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = 14680064 & e.flags),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies = null === t ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function jc(e, t, n, r, i, a) {
  var o = 2;
  if (((r = e), 'function' == typeof e)) Mc(e) && (o = 1);
  else if ('string' == typeof e) o = 5;
  else
    e: switch (e) {
      case Ce:
        return Vc(n.children, i, a, t);
      case Te:
        (o = 8), (i |= 8);
        break;
      case Pe:
        return ((e = Nc(12, n, t, 2 | i)).elementType = Pe), (e.lanes = a), e;
      case De:
        return ((e = Nc(13, n, t, i)).elementType = De), (e.lanes = a), e;
      case Le:
        return ((e = Nc(19, n, t, i)).elementType = Le), (e.lanes = a), e;
      case Fe:
        return Ic(n, i, a, t);
      default:
        if ('object' == typeof e && null !== e)
          switch (e.$$typeof) {
            case Ae:
              o = 10;
              break e;
            case Re:
              o = 9;
              break e;
            case Oe:
              o = 11;
              break e;
            case Ne:
              o = 14;
              break e;
            case Me:
              (o = 16), (r = null);
              break e;
          }
        throw Error(le(130, null == e ? e : typeof e, ''));
    }
  return ((t = Nc(o, n, t, i)).elementType = e), (t.type = r), (t.lanes = a), t;
}
function Vc(e, t, n, r) {
  return ((e = Nc(7, e, r, t)).lanes = n), e;
}
function Ic(e, t, n, r) {
  return (
    ((e = Nc(22, e, r, t)).elementType = Fe), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e
  );
}
function zc(e, t, n) {
  return ((e = Nc(6, e, null, t)).lanes = n), e;
}
function Bc(e, t, n) {
  return (
    ((t = Nc(4, null !== e.children ? e.children : [], e.key, t)).lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Uc(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = wn(0)),
    (this.expirationTimes = wn(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = wn(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function $c(e, t, n, r, i, a, o, s, l) {
  return (
    (e = new Uc(e, t, n, s, l)),
    1 === t ? ((t = 1), !0 === a && (t |= 8)) : (t = 0),
    (a = Nc(3, null, null, t)),
    (e.current = a),
    (a.stateNode = e),
    (a.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    zo(a),
    e
  );
}
function Zc(e) {
  if (!e) return Ra;
  e: {
    if (Wt((e = e._reactInternals)) !== e || 1 !== e.tag) throw Error(le(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ma(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (null !== t);
    throw Error(le(171));
  }
  if (1 === e.tag) {
    var n = e.type;
    if (Ma(n)) return Va(e, n, t);
  }
  return t;
}
function Wc(e, t, n, r, i, a, o, s, l) {
  return (
    ((e = $c(n, r, !0, e, 0, a, 0, s, l)).context = Zc(null)),
    (n = e.current),
    ((a = Uo((r = rc()), (i = ic(n)))).callback = null != t ? t : null),
    $o(n, a, i),
    (e.current.lanes = i),
    xn(e, i, r),
    oc(e, r),
    e
  );
}
function Hc(e, t, n, r) {
  var i = t.current,
    a = rc(),
    o = ic(i);
  return (
    (n = Zc(n)),
    null === t.context ? (t.context = n) : (t.pendingContext = n),
    ((t = Uo(a, o)).payload = { element: e }),
    null !== (r = void 0 === r ? null : r) && (t.callback = r),
    null !== (e = $o(i, t, o)) && (ac(e, i, o, a), Zo(e, i, o)),
    o
  );
}
function qc(e) {
  return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null;
}
function Kc(e, t) {
  if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
    var n = e.retryLane;
    e.retryLane = 0 !== n && n < t ? n : t;
  }
}
function Yc(e, t) {
  Kc(e, t), (e = e.alternate) && Kc(e, t);
}
Cu = function (e, t, n) {
  if (null !== e)
    if (e.memoizedProps !== t.pendingProps || Da.current) kl = !0;
    else {
      if (!(e.lanes & n || 128 & t.flags))
        return (
          (kl = !1),
          (function (e, t, n) {
            switch (t.tag) {
              case 3:
                Dl(t), yo();
                break;
              case 5:
                ts(t);
                break;
              case 1:
                Ma(t.type) && Ia(t);
                break;
              case 4:
                Jo(t, t.stateNode.containerInfo);
                break;
              case 10:
                var r = t.type._context,
                  i = t.memoizedProps.value;
                Aa(Co, r._currentValue), (r._currentValue = i);
                break;
              case 13:
                if (null !== (r = t.memoizedState))
                  return null !== r.dehydrated
                    ? (Aa(rs, 1 & rs.current), (t.flags |= 128), null)
                    : n & t.child.childLanes
                      ? zl(e, t, n)
                      : (Aa(rs, 1 & rs.current), null !== (e = ql(e, t, n)) ? e.sibling : null);
                Aa(rs, 1 & rs.current);
                break;
              case 19:
                if (((r = !!(n & t.childLanes)), 128 & e.flags)) {
                  if (r) return Wl(e, t, n);
                  t.flags |= 128;
                }
                if (
                  (null !== (i = t.memoizedState) &&
                    ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
                  Aa(rs, rs.current),
                  r)
                )
                  break;
                return null;
              case 22:
              case 23:
                return (t.lanes = 0), Tl(e, t, n);
            }
            return ql(e, t, n);
          })(e, t, n)
        );
      kl = !!(131072 & e.flags);
    }
  else (kl = !1), so && 1048576 & t.flags && no(t, Ya, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Hl(e, t), (e = t.pendingProps);
      var i = Na(t, Oa.current);
      Lo(t, n), (i = bs(null, t, r, e, i, n));
      var a = ws();
      return (
        (t.flags |= 1),
        'object' == typeof i && null !== i && 'function' == typeof i.render && void 0 === i.$$typeof
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ma(r) ? ((a = !0), Ia(t)) : (a = !1),
            (t.memoizedState = null !== i.state && void 0 !== i.state ? i.state : null),
            zo(t),
            (i.updater = sl),
            (t.stateNode = i),
            (i._reactInternals = t),
            dl(t, r, e, n),
            (t = Ol(null, t, r, !0, a, n)))
          : ((t.tag = 0), so && a && ro(t), Sl(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Hl(e, t),
          (e = t.pendingProps),
          (r = (i = r._init)(r._payload)),
          (t.type = r),
          (i = t.tag =
            (function (e) {
              if ('function' == typeof e) return Mc(e) ? 1 : 0;
              if (null != e) {
                if ((e = e.$$typeof) === Oe) return 11;
                if (e === Ne) return 14;
              }
              return 2;
            })(r)),
          (e = al(r, e)),
          i)
        ) {
          case 0:
            t = Al(null, t, r, e, n);
            break e;
          case 1:
            t = Rl(null, t, r, e, n);
            break e;
          case 11:
            t = _l(null, t, r, e, n);
            break e;
          case 14:
            t = El(null, t, r, al(r.type, e), n);
            break e;
        }
        throw Error(le(306, r, ''));
      }
      return t;
    case 0:
      return (
        (r = t.type), (i = t.pendingProps), Al(e, t, r, (i = t.elementType === r ? i : al(r, i)), n)
      );
    case 1:
      return (
        (r = t.type), (i = t.pendingProps), Rl(e, t, r, (i = t.elementType === r ? i : al(r, i)), n)
      );
    case 3:
      e: {
        if ((Dl(t), null === e)) throw Error(le(387));
        (r = t.pendingProps), (i = (a = t.memoizedState).element), Bo(e, t), Ho(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), a.isDehydrated)) {
          if (
            ((a = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = a),
            (t.memoizedState = a),
            256 & t.flags)
          ) {
            t = Ll(e, t, r, n, (i = fl(Error(le(423)), t)));
            break e;
          }
          if (r !== i) {
            t = Ll(e, t, r, n, (i = fl(Error(le(424)), t)));
            break e;
          }
          for (
            oo = fa(t.stateNode.containerInfo.firstChild),
              ao = t,
              so = !0,
              lo = null,
              n = Eo(t, null, r, n),
              t.child = n;
            n;

          )
            (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
        } else {
          if ((yo(), r === i)) {
            t = ql(e, t, n);
            break e;
          }
          Sl(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        ts(t),
        null === e && ho(t),
        (r = t.type),
        (i = t.pendingProps),
        (a = null !== e ? e.memoizedProps : null),
        (o = i.children),
        aa(r, i) ? (o = null) : null !== a && aa(r, a) && (t.flags |= 32),
        Pl(e, t),
        Sl(e, t, o, n),
        t.child
      );
    case 6:
      return null === e && ho(t), null;
    case 13:
      return zl(e, t, n);
    case 4:
      return (
        Jo(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        null === e ? (t.child = _o(t, null, r, n)) : Sl(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type), (i = t.pendingProps), _l(e, t, r, (i = t.elementType === r ? i : al(r, i)), n)
      );
    case 7:
      return Sl(e, t, t.pendingProps, n), t.child;
    case 8:
    case 12:
      return Sl(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (a = t.memoizedProps),
          (o = i.value),
          Aa(Co, r._currentValue),
          (r._currentValue = o),
          null !== a)
        )
          if (ci(a.value, o)) {
            if (a.children === i.children && !Da.current) {
              t = ql(e, t, n);
              break e;
            }
          } else
            for (null !== (a = t.child) && (a.return = t); null !== a; ) {
              var s = a.dependencies;
              if (null !== s) {
                o = a.child;
                for (var l = s.firstContext; null !== l; ) {
                  if (l.context === r) {
                    if (1 === a.tag) {
                      (l = Uo(-1, n & -n)).tag = 2;
                      var u = a.updateQueue;
                      if (null !== u) {
                        var c = (u = u.shared).pending;
                        null === c ? (l.next = l) : ((l.next = c.next), (c.next = l)),
                          (u.pending = l);
                      }
                    }
                    (a.lanes |= n),
                      null !== (l = a.alternate) && (l.lanes |= n),
                      Do(a.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (10 === a.tag) o = a.type === t.type ? null : a.child;
              else if (18 === a.tag) {
                if (null === (o = a.return)) throw Error(le(341));
                (o.lanes |= n),
                  null !== (s = o.alternate) && (s.lanes |= n),
                  Do(o, n, t),
                  (o = a.sibling);
              } else o = a.child;
              if (null !== o) o.return = a;
              else
                for (o = a; null !== o; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (null !== (a = o.sibling)) {
                    (a.return = o.return), (o = a);
                    break;
                  }
                  o = o.return;
                }
              a = o;
            }
        Sl(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        Lo(t, n),
        (r = r((i = No(i)))),
        (t.flags |= 1),
        Sl(e, t, r, n),
        t.child
      );
    case 14:
      return (i = al((r = t.type), t.pendingProps)), El(e, t, r, (i = al(r.type, i)), n);
    case 15:
      return Cl(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : al(r, i)),
        Hl(e, t),
        (t.tag = 1),
        Ma(r) ? ((e = !0), Ia(t)) : (e = !1),
        Lo(t, n),
        ul(t, r, i),
        dl(t, r, i, n),
        Ol(null, t, r, !0, e, n)
      );
    case 19:
      return Wl(e, t, n);
    case 22:
      return Tl(e, t, n);
  }
  throw Error(le(156, t.tag));
};
var Xc =
  'function' == typeof reportError
    ? reportError
    : function (e) {
        console.error(e);
      };
function Qc(e) {
  this._internalRoot = e;
}
function Gc(e) {
  this._internalRoot = e;
}
function Jc(e) {
  return !(!e || (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType));
}
function ed(e) {
  return !(
    !e ||
    (1 !== e.nodeType &&
      9 !== e.nodeType &&
      11 !== e.nodeType &&
      (8 !== e.nodeType || ' react-mount-point-unstable ' !== e.nodeValue))
  );
}
function td() {}
function nd(e, t, n, r, i) {
  var a = n._reactRootContainer;
  if (a) {
    var o = a;
    if ('function' == typeof i) {
      var s = i;
      i = function () {
        var e = qc(o);
        s.call(e);
      };
    }
    Hc(t, o, e, i);
  } else
    o = (function (e, t, n, r, i) {
      if (i) {
        if ('function' == typeof r) {
          var a = r;
          r = function () {
            var e = qc(o);
            a.call(e);
          };
        }
        var o = Wc(t, r, e, 0, null, !1, 0, '', td);
        return (
          (e._reactRootContainer = o),
          (e[ya] = o.current),
          Wi(8 === e.nodeType ? e.parentNode : e),
          hc(),
          o
        );
      }
      for (; (i = e.lastChild); ) e.removeChild(i);
      if ('function' == typeof r) {
        var s = r;
        r = function () {
          var e = qc(l);
          s.call(e);
        };
      }
      var l = $c(e, 0, !1, null, 0, !1, 0, '', td);
      return (
        (e._reactRootContainer = l),
        (e[ya] = l.current),
        Wi(8 === e.nodeType ? e.parentNode : e),
        hc(function () {
          Hc(t, l, n, r);
        }),
        l
      );
    })(n, t, e, i, r);
  return qc(o);
}
(Gc.prototype.render = Qc.prototype.render =
  function (e) {
    var t = this._internalRoot;
    if (null === t) throw Error(le(409));
    Hc(e, t, null, null);
  }),
  (Gc.prototype.unmount = Qc.prototype.unmount =
    function () {
      var e = this._internalRoot;
      if (null !== e) {
        this._internalRoot = null;
        var t = e.containerInfo;
        hc(function () {
          Hc(null, e, null, null);
        }),
          (t[ya] = null);
      }
    }),
  (Gc.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Pn();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < jn.length && 0 !== t && t < jn[n].priority; n++);
      jn.splice(n, 0, e), 0 === n && Bn(e);
    }
  }),
  (En = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = mn(t.pendingLanes);
          0 !== n && (kn(t, 1 | n), oc(t, en()), !(6 & Ou) && ((Wu = en() + 500), Wa()));
        }
        break;
      case 13:
        hc(function () {
          var t = Vo(e, 1);
          if (null !== t) {
            var n = rc();
            ac(t, e, 1, n);
          }
        }),
          Yc(e, 1);
    }
  }),
  (Cn = function (e) {
    if (13 === e.tag) {
      var t = Vo(e, 134217728);
      if (null !== t) ac(t, e, 134217728, rc());
      Yc(e, 134217728);
    }
  }),
  (Tn = function (e) {
    if (13 === e.tag) {
      var t = ic(e),
        n = Vo(e, t);
      if (null !== n) ac(n, e, t, rc());
      Yc(e, t);
    }
  }),
  (Pn = function () {
    return Sn;
  }),
  (An = function (e, t) {
    var n = Sn;
    try {
      return (Sn = e), t();
    } finally {
      Sn = n;
    }
  }),
  (Et = function (e, t, n) {
    switch (t) {
      case 'input':
        if ((tt(e, n), (t = n.name), 'radio' === n.type && null != t)) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (
            n = n.querySelectorAll('input[name=' + JSON.stringify('' + t) + '][type="radio"]'),
              t = 0;
            t < n.length;
            t++
          ) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = _a(r);
              if (!i) throw Error(le(90));
              Xe(r), tt(r, i);
            }
          }
        }
        break;
      case 'textarea':
        lt(e, n);
        break;
      case 'select':
        null != (t = n.value) && at(e, !!n.multiple, t, !1);
    }
  }),
  (Ot = fc),
  (Dt = hc);
var rd = { usingClientEntryPoint: !1, Events: [ka, Sa, _a, At, Rt, fc] },
  id = {
    findFiberByHostInstance: xa,
    bundleType: 0,
    version: '18.3.1',
    rendererPackageName: 'react-dom',
  },
  ad = {
    bundleType: id.bundleType,
    version: id.version,
    rendererPackageName: id.rendererPackageName,
    rendererConfig: id.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Se.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return null === (e = Kt(e)) ? null : e.stateNode;
    },
    findFiberByHostInstance:
      id.findFiberByHostInstance ||
      function () {
        return null;
      },
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
  };
if ('undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var od = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!od.isDisabled && od.supportsFiber)
    try {
      (ln = od.inject(ad)), (un = od);
    } catch (ht) {}
}
(ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rd),
  (ne.createPortal = function (e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!Jc(t)) throw Error(le(200));
    return (function (e, t, n) {
      var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: Ee,
        key: null == r ? null : '' + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    })(e, t, null, n);
  }),
  (ne.createRoot = function (e, t) {
    if (!Jc(e)) throw Error(le(299));
    var n = !1,
      r = '',
      i = Xc;
    return (
      null != t &&
        (!0 === t.unstable_strictMode && (n = !0),
        void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
        void 0 !== t.onRecoverableError && (i = t.onRecoverableError)),
      (t = $c(e, 1, !1, null, 0, n, 0, r, i)),
      (e[ya] = t.current),
      Wi(8 === e.nodeType ? e.parentNode : e),
      new Qc(t)
    );
  }),
  (ne.findDOMNode = function (e) {
    if (null == e) return null;
    if (1 === e.nodeType) return e;
    var t = e._reactInternals;
    if (void 0 === t) {
      if ('function' == typeof e.render) throw Error(le(188));
      throw ((e = Object.keys(e).join(',')), Error(le(268, e)));
    }
    return (e = null === (e = Kt(t)) ? null : e.stateNode);
  }),
  (ne.flushSync = function (e) {
    return hc(e);
  }),
  (ne.hydrate = function (e, t, n) {
    if (!ed(t)) throw Error(le(200));
    return nd(null, e, t, !0, n);
  }),
  (ne.hydrateRoot = function (e, t, n) {
    if (!Jc(e)) throw Error(le(405));
    var r = (null != n && n.hydratedSources) || null,
      i = !1,
      a = '',
      o = Xc;
    if (
      (null != n &&
        (!0 === n.unstable_strictMode && (i = !0),
        void 0 !== n.identifierPrefix && (a = n.identifierPrefix),
        void 0 !== n.onRecoverableError && (o = n.onRecoverableError)),
      (t = Wc(t, null, e, 1, null != n ? n : null, i, 0, a, o)),
      (e[ya] = t.current),
      Wi(e),
      r)
    )
      for (e = 0; e < r.length; e++)
        (i = (i = (n = r[e])._getVersion)(n._source)),
          null == t.mutableSourceEagerHydrationData
            ? (t.mutableSourceEagerHydrationData = [n, i])
            : t.mutableSourceEagerHydrationData.push(n, i);
    return new Gc(t);
  }),
  (ne.render = function (e, t, n) {
    if (!ed(t)) throw Error(le(200));
    return nd(null, e, t, !1, n);
  }),
  (ne.unmountComponentAtNode = function (e) {
    if (!ed(e)) throw Error(le(40));
    return (
      !!e._reactRootContainer &&
      (hc(function () {
        nd(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[ya] = null);
        });
      }),
      !0)
    );
  }),
  (ne.unstable_batchedUpdates = fc),
  (ne.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!ed(n)) throw Error(le(200));
    if (null == e || void 0 === e._reactInternals) throw Error(le(38));
    return nd(e, t, n, !1, r);
  }),
  (ne.version = '18.3.1-next-f1338f8080-20240426'),
  (function e() {
    if (
      'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      'function' == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  })(),
  (te.exports = ne);
var sd = te.exports;
const ld = i(sd);
var ud = sd;
(ee.createRoot = ud.createRoot), (ee.hydrateRoot = ud.hydrateRoot);
var cd = {};
Object.defineProperty(cd, '__esModule', { value: !0 }),
  (cd.parse = function (e, t) {
    const n = new gd(),
      r = e.length;
    if (r < 2) return n;
    const i = (null == t ? void 0 : t.decode) || bd;
    let a = 0;
    do {
      const t = e.indexOf('=', a);
      if (-1 === t) break;
      const o = e.indexOf(';', a),
        s = -1 === o ? r : o;
      if (t > s) {
        a = e.lastIndexOf(';', t - 1) + 1;
        continue;
      }
      const l = yd(e, a, t),
        u = vd(e, t, l),
        c = e.slice(l, u);
      if (void 0 === n[c]) {
        let r = yd(e, t + 1, s),
          a = vd(e, s, r);
        const o = i(e.slice(r, a));
        n[c] = o;
      }
      a = s + 1;
    } while (a < r);
    return n;
  }),
  (cd.serialize = function (e, t, n) {
    const r = (null == n ? void 0 : n.encode) || encodeURIComponent;
    if (!dd.test(e)) throw new TypeError(`argument name is invalid: ${e}`);
    const i = r(t);
    if (!fd.test(i)) throw new TypeError(`argument val is invalid: ${t}`);
    let a = e + '=' + i;
    if (!n) return a;
    if (void 0 !== n.maxAge) {
      if (!Number.isInteger(n.maxAge)) throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);
      a += '; Max-Age=' + n.maxAge;
    }
    if (n.domain) {
      if (!hd.test(n.domain)) throw new TypeError(`option domain is invalid: ${n.domain}`);
      a += '; Domain=' + n.domain;
    }
    if (n.path) {
      if (!pd.test(n.path)) throw new TypeError(`option path is invalid: ${n.path}`);
      a += '; Path=' + n.path;
    }
    if (n.expires) {
      if (
        !(function (e) {
          return '[object Date]' === md.call(e);
        })(n.expires) ||
        !Number.isFinite(n.expires.valueOf())
      )
        throw new TypeError(`option expires is invalid: ${n.expires}`);
      a += '; Expires=' + n.expires.toUTCString();
    }
    n.httpOnly && (a += '; HttpOnly');
    n.secure && (a += '; Secure');
    n.partitioned && (a += '; Partitioned');
    if (n.priority) {
      switch ('string' == typeof n.priority ? n.priority.toLowerCase() : void 0) {
        case 'low':
          a += '; Priority=Low';
          break;
        case 'medium':
          a += '; Priority=Medium';
          break;
        case 'high':
          a += '; Priority=High';
          break;
        default:
          throw new TypeError(`option priority is invalid: ${n.priority}`);
      }
    }
    if (n.sameSite) {
      switch ('string' == typeof n.sameSite ? n.sameSite.toLowerCase() : n.sameSite) {
        case !0:
        case 'strict':
          a += '; SameSite=Strict';
          break;
        case 'lax':
          a += '; SameSite=Lax';
          break;
        case 'none':
          a += '; SameSite=None';
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${n.sameSite}`);
      }
    }
    return a;
  });
const dd = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
  fd = /^[\u0021-\u003A\u003C-\u007E]*$/,
  hd = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  pd = /^[\u0020-\u003A\u003D-\u007E]*$/,
  md = Object.prototype.toString,
  gd = (() => {
    const e = function () {};
    return (e.prototype = Object.create(null)), e;
  })();
function yd(e, t, n) {
  do {
    const n = e.charCodeAt(t);
    if (32 !== n && 9 !== n) return t;
  } while (++t < n);
  return n;
}
function vd(e, t, n) {
  for (; t > n; ) {
    const n = e.charCodeAt(--t);
    if (32 !== n && 9 !== n) return t + 1;
  }
  return n;
}
function bd(e) {
  if (-1 === e.indexOf('%')) return e;
  try {
    return decodeURIComponent(e);
  } catch (t) {
    return e;
  }
}
let wd,
  xd,
  kd,
  Sd = { data: '' },
  _d = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
  Ed = /\/\*[^]*?\*\/|  +/g,
  Cd = /\n+/g,
  Td = (e, t) => {
    let n = '',
      r = '',
      i = '';
    for (let a in e) {
      let o = e[a];
      '@' == a[0]
        ? 'i' == a[1]
          ? (n = a + ' ' + o + ';')
          : (r += 'f' == a[1] ? Td(o, a) : a + '{' + Td(o, 'k' == a[1] ? '' : t) + '}')
        : 'object' == typeof o
          ? (r += Td(
              o,
              t
                ? t.replace(/([^,])+/g, (e) =>
                    a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t) =>
                      /&/.test(t) ? t.replace(/&/g, e) : e ? e + ' ' + t : t
                    )
                  )
                : a
            ))
          : null != o &&
            ((a = /^--/.test(a) ? a : a.replace(/[A-Z]/g, '-$&').toLowerCase()),
            (i += Td.p ? Td.p(a, o) : a + ':' + o + ';'));
    }
    return n + (t && i ? t + '{' + i + '}' : i) + r;
  },
  Pd = {},
  Ad = (e) => {
    if ('object' == typeof e) {
      let t = '';
      for (let n in e) t += n + Ad(e[n]);
      return t;
    }
    return e;
  };
function Rd(e) {
  let t = this || {},
    n = e.call ? e(t.p) : e;
  return ((e, t, n, r, i) => {
    let a = Ad(e),
      o =
        Pd[a] ||
        (Pd[a] = ((e) => {
          let t = 0,
            n = 11;
          for (; t < e.length; ) n = (101 * n + e.charCodeAt(t++)) >>> 0;
          return 'go' + n;
        })(a));
    if (!Pd[o]) {
      let t =
        a !== e
          ? e
          : ((e) => {
              let t,
                n,
                r = [{}];
              for (; (t = _d.exec(e.replace(Ed, ''))); )
                t[4]
                  ? r.shift()
                  : t[3]
                    ? ((n = t[3].replace(Cd, ' ').trim()), r.unshift((r[0][n] = r[0][n] || {})))
                    : (r[0][t[1]] = t[2].replace(Cd, ' ').trim());
              return r[0];
            })(e);
      Pd[o] = Td(i ? { ['@keyframes ' + o]: t } : t, n ? '' : '.' + o);
    }
    let s = n && Pd.g ? Pd.g : null;
    return (
      n && (Pd.g = Pd[o]),
      (l = Pd[o]),
      (u = t),
      (c = r),
      (d = s)
        ? (u.data = u.data.replace(d, l))
        : -1 === u.data.indexOf(l) && (u.data = c ? l + u.data : u.data + l),
      o
    );
    var l, u, c, d;
  })(
    n.unshift
      ? n.raw
        ? ((e, t, n) =>
            e.reduce((e, r, i) => {
              let a = t[i];
              if (a && a.call) {
                let e = a(n),
                  t = (e && e.props && e.props.className) || (/^go/.test(e) && e);
                a = t
                  ? '.' + t
                  : e && 'object' == typeof e
                    ? e.props
                      ? ''
                      : Td(e, '')
                    : !1 === e
                      ? ''
                      : e;
              }
              return e + r + (null == a ? '' : a);
            }, ''))(n, [].slice.call(arguments, 1), t.p)
        : n.reduce((e, n) => Object.assign(e, n && n.call ? n(t.p) : n), {})
      : n,
    ((r = t.target),
    'object' == typeof window
      ? (
          (r ? r.querySelector('#_goober') : window._goober) ||
          Object.assign((r || document.head).appendChild(document.createElement('style')), {
            innerHTML: ' ',
            id: '_goober',
          })
        ).firstChild
      : r || Sd),
    t.g,
    t.o,
    t.k
  );
  var r;
}
Rd.bind({ g: 1 });
let Od = Rd.bind({ k: 1 });
function Dd(e, t, n, r) {
  (Td.p = t), (wd = e), (xd = n), (kd = r);
}
function Ld(e, t) {
  let n = this || {};
  return function () {
    let r = arguments;
    function i(a, o) {
      let s = Object.assign({}, a),
        l = s.className || i.className;
      (n.p = Object.assign({ theme: xd && xd() }, s)),
        (n.o = / *go\d+/.test(l)),
        (s.className = Rd.apply(n, r) + (l ? ' ' + l : '')),
        t && (s.ref = o);
      let u = e;
      return e[0] && ((u = s.as || e), delete s.as), kd && u[0] && kd(s), wd(u, s);
    }
    return t ? t(i) : i;
  };
}
class Nd extends Error {}
function Md(e) {
  let t = e.replace(/-/g, '+').replace(/_/g, '/');
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += '==';
      break;
    case 3:
      t += '=';
      break;
    default:
      throw new Error('base64 string is not of the correct length');
  }
  try {
    return (function (e) {
      return decodeURIComponent(
        atob(e).replace(/(.)/g, (e, t) => {
          let n = t.charCodeAt(0).toString(16).toUpperCase();
          return n.length < 2 && (n = '0' + n), '%' + n;
        })
      );
    })(t);
  } catch (n) {
    return atob(t);
  }
}
function Fd(e, t) {
  if ('string' != typeof e) throw new Nd('Invalid token specified: must be a string');
  t || (t = {});
  const n = !0 === t.header ? 0 : 1,
    r = e.split('.')[n];
  if ('string' != typeof r) throw new Nd(`Invalid token specified: missing part #${n + 1}`);
  let i;
  try {
    i = Md(r);
  } catch (a) {
    throw new Nd(`Invalid token specified: invalid base64 for part #${n + 1} (${a.message})`);
  }
  try {
    return JSON.parse(i);
  } catch (a) {
    throw new Nd(`Invalid token specified: invalid json for part #${n + 1} (${a.message})`);
  }
}
function jd(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
Nd.prototype.name = 'InvalidTokenError';
const { toString: Vd } = Object.prototype,
  { getPrototypeOf: Id } = Object,
  zd =
    ((Bd = Object.create(null)),
    (e) => {
      const t = Vd.call(e);
      return Bd[t] || (Bd[t] = t.slice(8, -1).toLowerCase());
    });
var Bd;
const Ud = (e) => ((e = e.toLowerCase()), (t) => zd(t) === e),
  $d = (e) => (t) => typeof t === e,
  { isArray: Zd } = Array,
  Wd = $d('undefined');
const Hd = Ud('ArrayBuffer');
const qd = $d('string'),
  Kd = $d('function'),
  Yd = $d('number'),
  Xd = (e) => null !== e && 'object' == typeof e,
  Qd = (e) => {
    if ('object' !== zd(e)) return !1;
    const t = Id(e);
    return !(
      (null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t)) ||
      Symbol.toStringTag in e ||
      Symbol.iterator in e
    );
  },
  Gd = Ud('Date'),
  Jd = Ud('File'),
  ef = Ud('Blob'),
  tf = Ud('FileList'),
  nf = Ud('URLSearchParams'),
  [rf, af, of, sf] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(Ud);
function lf(e, t, { allOwnKeys: n = !1 } = {}) {
  if (null == e) return;
  let r, i;
  if (('object' != typeof e && (e = [e]), Zd(e)))
    for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      a = i.length;
    let o;
    for (r = 0; r < a; r++) (o = i[r]), t.call(null, e[o], o, e);
  }
}
function uf(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r,
    i = n.length;
  for (; i-- > 0; ) if (((r = n[i]), t === r.toLowerCase())) return r;
  return null;
}
const cf =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
          ? window
          : global,
  df = (e) => !Wd(e) && e !== cf;
const ff =
  ((hf = 'undefined' != typeof Uint8Array && Id(Uint8Array)), (e) => hf && e instanceof hf);
var hf;
const pf = Ud('HTMLFormElement'),
  mf = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  gf = Ud('RegExp'),
  yf = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    lf(n, (n, i) => {
      let a;
      !1 !== (a = t(n, i, e)) && (r[i] = a || n);
    }),
      Object.defineProperties(e, r);
  },
  vf = 'abcdefghijklmnopqrstuvwxyz',
  bf = '0123456789',
  wf = { DIGIT: bf, ALPHA: vf, ALPHA_DIGIT: vf + vf.toUpperCase() + bf };
const xf = Ud('AsyncFunction'),
  kf =
    ((Sf = 'function' == typeof setImmediate),
    (_f = Kd(cf.postMessage)),
    Sf
      ? setImmediate
      : _f
        ? ((Ef = `axios@${Math.random()}`),
          (Cf = []),
          cf.addEventListener(
            'message',
            ({ source: e, data: t }) => {
              e === cf && t === Ef && Cf.length && Cf.shift()();
            },
            !1
          ),
          (e) => {
            Cf.push(e), cf.postMessage(Ef, '*');
          })
        : (e) => setTimeout(e));
var Sf, _f, Ef, Cf;
const Tf =
    'undefined' != typeof queueMicrotask
      ? queueMicrotask.bind(cf)
      : ('undefined' != typeof process && process.nextTick) || kf,
  Pf = {
    isArray: Zd,
    isArrayBuffer: Hd,
    isBuffer: function (e) {
      return (
        null !== e &&
        !Wd(e) &&
        null !== e.constructor &&
        !Wd(e.constructor) &&
        Kd(e.constructor.isBuffer) &&
        e.constructor.isBuffer(e)
      );
    },
    isFormData: (e) => {
      let t;
      return (
        e &&
        (('function' == typeof FormData && e instanceof FormData) ||
          (Kd(e.append) &&
            ('formdata' === (t = zd(e)) ||
              ('object' === t && Kd(e.toString) && '[object FormData]' === e.toString()))))
      );
    },
    isArrayBufferView: function (e) {
      let t;
      return (
        (t =
          'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e && e.buffer && Hd(e.buffer)),
        t
      );
    },
    isString: qd,
    isNumber: Yd,
    isBoolean: (e) => !0 === e || !1 === e,
    isObject: Xd,
    isPlainObject: Qd,
    isReadableStream: rf,
    isRequest: af,
    isResponse: of,
    isHeaders: sf,
    isUndefined: Wd,
    isDate: Gd,
    isFile: Jd,
    isBlob: ef,
    isRegExp: gf,
    isFunction: Kd,
    isStream: (e) => Xd(e) && Kd(e.pipe),
    isURLSearchParams: nf,
    isTypedArray: ff,
    isFileList: tf,
    forEach: lf,
    merge: function e() {
      const { caseless: t } = (df(this) && this) || {},
        n = {},
        r = (r, i) => {
          const a = (t && uf(n, i)) || i;
          Qd(n[a]) && Qd(r)
            ? (n[a] = e(n[a], r))
            : Qd(r)
              ? (n[a] = e({}, r))
              : Zd(r)
                ? (n[a] = r.slice())
                : (n[a] = r);
        };
      for (let i = 0, a = arguments.length; i < a; i++) arguments[i] && lf(arguments[i], r);
      return n;
    },
    extend: (e, t, n, { allOwnKeys: r } = {}) => (
      lf(
        t,
        (t, r) => {
          n && Kd(t) ? (e[r] = jd(t, n)) : (e[r] = t);
        },
        { allOwnKeys: r }
      ),
      e
    ),
    trim: (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')),
    stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
    inherits: (e, t, n, r) => {
      (e.prototype = Object.create(t.prototype, r)),
        (e.prototype.constructor = e),
        Object.defineProperty(e, 'super', { value: t.prototype }),
        n && Object.assign(e.prototype, n);
    },
    toFlatObject: (e, t, n, r) => {
      let i, a, o;
      const s = {};
      if (((t = t || {}), null == e)) return t;
      do {
        for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0; )
          (o = i[a]), (r && !r(o, e, t)) || s[o] || ((t[o] = e[o]), (s[o] = !0));
        e = !1 !== n && Id(e);
      } while (e && (!n || n(e, t)) && e !== Object.prototype);
      return t;
    },
    kindOf: zd,
    kindOfTest: Ud,
    endsWith: (e, t, n) => {
      (e = String(e)), (void 0 === n || n > e.length) && (n = e.length), (n -= t.length);
      const r = e.indexOf(t, n);
      return -1 !== r && r === n;
    },
    toArray: (e) => {
      if (!e) return null;
      if (Zd(e)) return e;
      let t = e.length;
      if (!Yd(t)) return null;
      const n = new Array(t);
      for (; t-- > 0; ) n[t] = e[t];
      return n;
    },
    forEachEntry: (e, t) => {
      const n = (e && e[Symbol.iterator]).call(e);
      let r;
      for (; (r = n.next()) && !r.done; ) {
        const n = r.value;
        t.call(e, n[0], n[1]);
      }
    },
    matchAll: (e, t) => {
      let n;
      const r = [];
      for (; null !== (n = e.exec(t)); ) r.push(n);
      return r;
    },
    isHTMLForm: pf,
    hasOwnProperty: mf,
    hasOwnProp: mf,
    reduceDescriptors: yf,
    freezeMethods: (e) => {
      yf(e, (t, n) => {
        if (Kd(e) && -1 !== ['arguments', 'caller', 'callee'].indexOf(n)) return !1;
        const r = e[n];
        Kd(r) &&
          ((t.enumerable = !1),
          'writable' in t
            ? (t.writable = !1)
            : t.set ||
              (t.set = () => {
                throw Error("Can not rewrite read-only method '" + n + "'");
              }));
      });
    },
    toObjectSet: (e, t) => {
      const n = {},
        r = (e) => {
          e.forEach((e) => {
            n[e] = !0;
          });
        };
      return Zd(e) ? r(e) : r(String(e).split(t)), n;
    },
    toCamelCase: (e) =>
      e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, n) {
        return t.toUpperCase() + n;
      }),
    noop: () => {},
    toFiniteNumber: (e, t) => (null != e && Number.isFinite((e = +e)) ? e : t),
    findKey: uf,
    global: cf,
    isContextDefined: df,
    ALPHABET: wf,
    generateString: (e = 16, t = wf.ALPHA_DIGIT) => {
      let n = '';
      const { length: r } = t;
      for (; e--; ) n += t[(Math.random() * r) | 0];
      return n;
    },
    isSpecCompliantForm: function (e) {
      return !!(e && Kd(e.append) && 'FormData' === e[Symbol.toStringTag] && e[Symbol.iterator]);
    },
    toJSONObject: (e) => {
      const t = new Array(10),
        n = (e, r) => {
          if (Xd(e)) {
            if (t.indexOf(e) >= 0) return;
            if (!('toJSON' in e)) {
              t[r] = e;
              const i = Zd(e) ? [] : {};
              return (
                lf(e, (e, t) => {
                  const a = n(e, r + 1);
                  !Wd(a) && (i[t] = a);
                }),
                (t[r] = void 0),
                i
              );
            }
          }
          return e;
        };
      return n(e, 0);
    },
    isAsyncFn: xf,
    isThenable: (e) => e && (Xd(e) || Kd(e)) && Kd(e.then) && Kd(e.catch),
    setImmediate: kf,
    asap: Tf,
  };
function Af(e, t, n, r, i) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = 'AxiosError'),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    i && ((this.response = i), (this.status = i.status ? i.status : null));
}
Pf.inherits(Af, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: Pf.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Rf = Af.prototype,
  Of = {};
[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL',
].forEach((e) => {
  Of[e] = { value: e };
}),
  Object.defineProperties(Af, Of),
  Object.defineProperty(Rf, 'isAxiosError', { value: !0 }),
  (Af.from = (e, t, n, r, i, a) => {
    const o = Object.create(Rf);
    return (
      Pf.toFlatObject(
        e,
        o,
        function (e) {
          return e !== Error.prototype;
        },
        (e) => 'isAxiosError' !== e
      ),
      Af.call(o, e.message, t, n, r, i),
      (o.cause = e),
      (o.name = e.name),
      a && Object.assign(o, a),
      o
    );
  });
function Df(e) {
  return Pf.isPlainObject(e) || Pf.isArray(e);
}
function Lf(e) {
  return Pf.endsWith(e, '[]') ? e.slice(0, -2) : e;
}
function Nf(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (e, t) {
          return (e = Lf(e)), !n && t ? '[' + e + ']' : e;
        })
        .join(n ? '.' : '')
    : t;
}
const Mf = Pf.toFlatObject(Pf, {}, null, function (e) {
  return /^is[A-Z]/.test(e);
});
function Ff(e, t, n) {
  if (!Pf.isObject(e)) throw new TypeError('target must be an object');
  t = t || new FormData();
  const r = (n = Pf.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (e, t) {
      return !Pf.isUndefined(t[e]);
    })).metaTokens,
    i = n.visitor || u,
    a = n.dots,
    o = n.indexes,
    s = (n.Blob || ('undefined' != typeof Blob && Blob)) && Pf.isSpecCompliantForm(t);
  if (!Pf.isFunction(i)) throw new TypeError('visitor must be a function');
  function l(e) {
    if (null === e) return '';
    if (Pf.isDate(e)) return e.toISOString();
    if (!s && Pf.isBlob(e)) throw new Af('Blob is not supported. Use a Buffer instead.');
    return Pf.isArrayBuffer(e) || Pf.isTypedArray(e)
      ? s && 'function' == typeof Blob
        ? new Blob([e])
        : Buffer.from(e)
      : e;
  }
  function u(e, n, i) {
    let s = e;
    if (e && !i && 'object' == typeof e)
      if (Pf.endsWith(n, '{}')) (n = r ? n : n.slice(0, -2)), (e = JSON.stringify(e));
      else if (
        (Pf.isArray(e) &&
          (function (e) {
            return Pf.isArray(e) && !e.some(Df);
          })(e)) ||
        ((Pf.isFileList(e) || Pf.endsWith(n, '[]')) && (s = Pf.toArray(e)))
      )
        return (
          (n = Lf(n)),
          s.forEach(function (e, r) {
            !Pf.isUndefined(e) &&
              null !== e &&
              t.append(!0 === o ? Nf([n], r, a) : null === o ? n : n + '[]', l(e));
          }),
          !1
        );
    return !!Df(e) || (t.append(Nf(i, n, a), l(e)), !1);
  }
  const c = [],
    d = Object.assign(Mf, { defaultVisitor: u, convertValue: l, isVisitable: Df });
  if (!Pf.isObject(e)) throw new TypeError('data must be an object');
  return (
    (function e(n, r) {
      if (!Pf.isUndefined(n)) {
        if (-1 !== c.indexOf(n)) throw Error('Circular reference detected in ' + r.join('.'));
        c.push(n),
          Pf.forEach(n, function (n, a) {
            !0 ===
              (!(Pf.isUndefined(n) || null === n) &&
                i.call(t, n, Pf.isString(a) ? a.trim() : a, r, d)) && e(n, r ? r.concat(a) : [a]);
          }),
          c.pop();
      }
    })(e),
    t
  );
}
function jf(e) {
  const t = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+', '%00': '\0' };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
    return t[e];
  });
}
function Vf(e, t) {
  (this._pairs = []), e && Ff(e, this, t);
}
const If = Vf.prototype;
function zf(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
function Bf(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || zf;
  Pf.isFunction(n) && (n = { serialize: n });
  const i = n && n.serialize;
  let a;
  if (((a = i ? i(t, n) : Pf.isURLSearchParams(t) ? t.toString() : new Vf(t, n).toString(r)), a)) {
    const t = e.indexOf('#');
    -1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf('?') ? '?' : '&') + a);
  }
  return e;
}
(If.append = function (e, t) {
  this._pairs.push([e, t]);
}),
  (If.toString = function (e) {
    const t = e
      ? function (t) {
          return e.call(this, t, jf);
        }
      : jf;
    return this._pairs
      .map(function (e) {
        return t(e[0]) + '=' + t(e[1]);
      }, '')
      .join('&');
  });
const Uf = class {
    constructor() {
      this.handlers = [];
    }
    use(e, t, n) {
      return (
        this.handlers.push({
          fulfilled: e,
          rejected: t,
          synchronous: !!n && n.synchronous,
          runWhen: n ? n.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }
    eject(e) {
      this.handlers[e] && (this.handlers[e] = null);
    }
    clear() {
      this.handlers && (this.handlers = []);
    }
    forEach(e) {
      Pf.forEach(this.handlers, function (t) {
        null !== t && e(t);
      });
    }
  },
  $f = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
  Zf = {
    isBrowser: !0,
    classes: {
      URLSearchParams: 'undefined' != typeof URLSearchParams ? URLSearchParams : Vf,
      FormData: 'undefined' != typeof FormData ? FormData : null,
      Blob: 'undefined' != typeof Blob ? Blob : null,
    },
    protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
  },
  Wf = 'undefined' != typeof window && 'undefined' != typeof document,
  Hf = ('object' == typeof navigator && navigator) || void 0,
  qf = Wf && (!Hf || ['ReactNative', 'NativeScript', 'NS'].indexOf(Hf.product) < 0),
  Kf =
    'undefined' != typeof WorkerGlobalScope &&
    self instanceof WorkerGlobalScope &&
    'function' == typeof self.importScripts,
  Yf = (Wf && window.location.href) || 'http://localhost',
  Xf = {
    ...Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          hasBrowserEnv: Wf,
          hasStandardBrowserEnv: qf,
          hasStandardBrowserWebWorkerEnv: Kf,
          navigator: Hf,
          origin: Yf,
        },
        Symbol.toStringTag,
        { value: 'Module' }
      )
    ),
    ...Zf,
  };
function Qf(e) {
  function t(e, n, r, i) {
    let a = e[i++];
    if ('__proto__' === a) return !0;
    const o = Number.isFinite(+a),
      s = i >= e.length;
    if (((a = !a && Pf.isArray(r) ? r.length : a), s))
      return Pf.hasOwnProp(r, a) ? (r[a] = [r[a], n]) : (r[a] = n), !o;
    (r[a] && Pf.isObject(r[a])) || (r[a] = []);
    return (
      t(e, n, r[a], i) &&
        Pf.isArray(r[a]) &&
        (r[a] = (function (e) {
          const t = {},
            n = Object.keys(e);
          let r;
          const i = n.length;
          let a;
          for (r = 0; r < i; r++) (a = n[r]), (t[a] = e[a]);
          return t;
        })(r[a])),
      !o
    );
  }
  if (Pf.isFormData(e) && Pf.isFunction(e.entries)) {
    const n = {};
    return (
      Pf.forEachEntry(e, (e, r) => {
        t(
          (function (e) {
            return Pf.matchAll(/\w+|\[(\w*)]/g, e).map((e) => ('[]' === e[0] ? '' : e[1] || e[0]));
          })(e),
          r,
          n,
          0
        );
      }),
      n
    );
  }
  return null;
}
const Gf = {
  transitional: $f,
  adapter: ['xhr', 'http', 'fetch'],
  transformRequest: [
    function (e, t) {
      const n = t.getContentType() || '',
        r = n.indexOf('application/json') > -1,
        i = Pf.isObject(e);
      i && Pf.isHTMLForm(e) && (e = new FormData(e));
      if (Pf.isFormData(e)) return r ? JSON.stringify(Qf(e)) : e;
      if (
        Pf.isArrayBuffer(e) ||
        Pf.isBuffer(e) ||
        Pf.isStream(e) ||
        Pf.isFile(e) ||
        Pf.isBlob(e) ||
        Pf.isReadableStream(e)
      )
        return e;
      if (Pf.isArrayBufferView(e)) return e.buffer;
      if (Pf.isURLSearchParams(e))
        return (
          t.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1), e.toString()
        );
      let a;
      if (i) {
        if (n.indexOf('application/x-www-form-urlencoded') > -1)
          return (function (e, t) {
            return Ff(
              e,
              new Xf.classes.URLSearchParams(),
              Object.assign(
                {
                  visitor: function (e, t, n, r) {
                    return Xf.isNode && Pf.isBuffer(e)
                      ? (this.append(t, e.toString('base64')), !1)
                      : r.defaultVisitor.apply(this, arguments);
                  },
                },
                t
              )
            );
          })(e, this.formSerializer).toString();
        if ((a = Pf.isFileList(e)) || n.indexOf('multipart/form-data') > -1) {
          const t = this.env && this.env.FormData;
          return Ff(a ? { 'files[]': e } : e, t && new t(), this.formSerializer);
        }
      }
      return i || r
        ? (t.setContentType('application/json', !1),
          (function (e, t, n) {
            if (Pf.isString(e))
              try {
                return (t || JSON.parse)(e), Pf.trim(e);
              } catch (r) {
                if ('SyntaxError' !== r.name) throw r;
              }
            return (n || JSON.stringify)(e);
          })(e))
        : e;
    },
  ],
  transformResponse: [
    function (e) {
      const t = this.transitional || Gf.transitional,
        n = t && t.forcedJSONParsing,
        r = 'json' === this.responseType;
      if (Pf.isResponse(e) || Pf.isReadableStream(e)) return e;
      if (e && Pf.isString(e) && ((n && !this.responseType) || r)) {
        const n = !(t && t.silentJSONParsing) && r;
        try {
          return JSON.parse(e);
        } catch (i) {
          if (n) {
            if ('SyntaxError' === i.name)
              throw Af.from(i, Af.ERR_BAD_RESPONSE, this, null, this.response);
            throw i;
          }
        }
      }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Xf.classes.FormData, Blob: Xf.classes.Blob },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: { common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 } },
};
Pf.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
  Gf.headers[e] = {};
});
const Jf = Gf,
  eh = Pf.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]),
  th = Symbol('internals');
function nh(e) {
  return e && String(e).trim().toLowerCase();
}
function rh(e) {
  return !1 === e || null == e ? e : Pf.isArray(e) ? e.map(rh) : String(e);
}
function ih(e, t, n, r, i) {
  return Pf.isFunction(r)
    ? r.call(this, t, n)
    : (i && (t = n),
      Pf.isString(t)
        ? Pf.isString(r)
          ? -1 !== t.indexOf(r)
          : Pf.isRegExp(r)
            ? r.test(t)
            : void 0
        : void 0);
}
class ah {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    const r = this;
    function i(e, t, n) {
      const i = nh(t);
      if (!i) throw new Error('header name must be a non-empty string');
      const a = Pf.findKey(r, i);
      (!a || void 0 === r[a] || !0 === n || (void 0 === n && !1 !== r[a])) && (r[a || t] = rh(e));
    }
    const a = (e, t) => Pf.forEach(e, (e, n) => i(e, n, t));
    if (Pf.isPlainObject(e) || e instanceof this.constructor) a(e, t);
    else if (Pf.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))
      a(
        ((e) => {
          const t = {};
          let n, r, i;
          return (
            e &&
              e.split('\n').forEach(function (e) {
                (i = e.indexOf(':')),
                  (n = e.substring(0, i).trim().toLowerCase()),
                  (r = e.substring(i + 1).trim()),
                  !n ||
                    (t[n] && eh[n]) ||
                    ('set-cookie' === n
                      ? t[n]
                        ? t[n].push(r)
                        : (t[n] = [r])
                      : (t[n] = t[n] ? t[n] + ', ' + r : r));
              }),
            t
          );
        })(e),
        t
      );
    else if (Pf.isHeaders(e)) for (const [o, s] of e.entries()) i(s, o, n);
    else null != e && i(t, e, n);
    return this;
  }
  get(e, t) {
    if ((e = nh(e))) {
      const n = Pf.findKey(this, e);
      if (n) {
        const e = this[n];
        if (!t) return e;
        if (!0 === t)
          return (function (e) {
            const t = Object.create(null),
              n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
            let r;
            for (; (r = n.exec(e)); ) t[r[1]] = r[2];
            return t;
          })(e);
        if (Pf.isFunction(t)) return t.call(this, e, n);
        if (Pf.isRegExp(t)) return t.exec(e);
        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }
  has(e, t) {
    if ((e = nh(e))) {
      const n = Pf.findKey(this, e);
      return !(!n || void 0 === this[n] || (t && !ih(0, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    const n = this;
    let r = !1;
    function i(e) {
      if ((e = nh(e))) {
        const i = Pf.findKey(n, e);
        !i || (t && !ih(0, n[i], i, t)) || (delete n[i], (r = !0));
      }
    }
    return Pf.isArray(e) ? e.forEach(i) : i(e), r;
  }
  clear(e) {
    const t = Object.keys(this);
    let n = t.length,
      r = !1;
    for (; n--; ) {
      const i = t[n];
      (e && !ih(0, this[i], i, e, !0)) || (delete this[i], (r = !0));
    }
    return r;
  }
  normalize(e) {
    const t = this,
      n = {};
    return (
      Pf.forEach(this, (r, i) => {
        const a = Pf.findKey(n, i);
        if (a) return (t[a] = rh(r)), void delete t[i];
        const o = e
          ? (function (e) {
              return e
                .trim()
                .toLowerCase()
                .replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
            })(i)
          : String(i).trim();
        o !== i && delete t[i], (t[o] = rh(r)), (n[o] = !0);
      }),
      this
    );
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = Object.create(null);
    return (
      Pf.forEach(this, (n, r) => {
        null != n && !1 !== n && (t[r] = e && Pf.isArray(n) ? n.join(', ') : n);
      }),
      t
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON())
      .map(([e, t]) => e + ': ' + t)
      .join('\n');
  }
  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const n = new this(e);
    return t.forEach((e) => n.set(e)), n;
  }
  static accessor(e) {
    const t = (this[th] = this[th] = { accessors: {} }).accessors,
      n = this.prototype;
    function r(e) {
      const r = nh(e);
      t[r] ||
        (!(function (e, t) {
          const n = Pf.toCamelCase(' ' + t);
          ['get', 'set', 'has'].forEach((r) => {
            Object.defineProperty(e, r + n, {
              value: function (e, n, i) {
                return this[r].call(this, t, e, n, i);
              },
              configurable: !0,
            });
          });
        })(n, e),
        (t[r] = !0));
    }
    return Pf.isArray(e) ? e.forEach(r) : r(e), this;
  }
}
ah.accessor([
  'Content-Type',
  'Content-Length',
  'Accept',
  'Accept-Encoding',
  'User-Agent',
  'Authorization',
]),
  Pf.reduceDescriptors(ah.prototype, ({ value: e }, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
      get: () => e,
      set(e) {
        this[n] = e;
      },
    };
  }),
  Pf.freezeMethods(ah);
const oh = ah;
function sh(e, t) {
  const n = this || Jf,
    r = t || n,
    i = oh.from(r.headers);
  let a = r.data;
  return (
    Pf.forEach(e, function (e) {
      a = e.call(n, a, i.normalize(), t ? t.status : void 0);
    }),
    i.normalize(),
    a
  );
}
function lh(e) {
  return !(!e || !e.__CANCEL__);
}
function uh(e, t, n) {
  Af.call(this, null == e ? 'canceled' : e, Af.ERR_CANCELED, t, n), (this.name = 'CanceledError');
}
function ch(e, t, n) {
  const r = n.config.validateStatus;
  n.status && r && !r(n.status)
    ? t(
        new Af(
          'Request failed with status code ' + n.status,
          [Af.ERR_BAD_REQUEST, Af.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
          n.config,
          n.request,
          n
        )
      )
    : e(n);
}
Pf.inherits(uh, Af, { __CANCEL__: !0 });
const dh = (e, t, n = 3) => {
    let r = 0;
    const i = (function (e, t) {
      e = e || 10;
      const n = new Array(e),
        r = new Array(e);
      let i,
        a = 0,
        o = 0;
      return (
        (t = void 0 !== t ? t : 1e3),
        function (s) {
          const l = Date.now(),
            u = r[o];
          i || (i = l), (n[a] = s), (r[a] = l);
          let c = o,
            d = 0;
          for (; c !== a; ) (d += n[c++]), (c %= e);
          if (((a = (a + 1) % e), a === o && (o = (o + 1) % e), l - i < t)) return;
          const f = u && l - u;
          return f ? Math.round((1e3 * d) / f) : void 0;
        }
      );
    })(50, 250);
    return (function (e, t) {
      let n,
        r,
        i = 0,
        a = 1e3 / t;
      const o = (t, a = Date.now()) => {
        (i = a), (n = null), r && (clearTimeout(r), (r = null)), e.apply(null, t);
      };
      return [
        (...e) => {
          const t = Date.now(),
            s = t - i;
          s >= a
            ? o(e, t)
            : ((n = e),
              r ||
                (r = setTimeout(() => {
                  (r = null), o(n);
                }, a - s)));
        },
        () => n && o(n),
      ];
    })((n) => {
      const a = n.loaded,
        o = n.lengthComputable ? n.total : void 0,
        s = a - r,
        l = i(s);
      r = a;
      e({
        loaded: a,
        total: o,
        progress: o ? a / o : void 0,
        bytes: s,
        rate: l || void 0,
        estimated: l && o && a <= o ? (o - a) / l : void 0,
        event: n,
        lengthComputable: null != o,
        [t ? 'download' : 'upload']: !0,
      });
    }, n);
  },
  fh = (e, t) => {
    const n = null != e;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  hh =
    (e) =>
    (...t) =>
      Pf.asap(() => e(...t)),
  ph = Xf.hasStandardBrowserEnv
    ? ((mh = new URL(Xf.origin)),
      (gh = Xf.navigator && /(msie|trident)/i.test(Xf.navigator.userAgent)),
      (e) => (
        (e = new URL(e, Xf.origin)),
        mh.protocol === e.protocol && mh.host === e.host && (gh || mh.port === e.port)
      ))
    : () => !0;
var mh, gh;
const yh = Xf.hasStandardBrowserEnv
  ? {
      write(e, t, n, r, i, a) {
        const o = [e + '=' + encodeURIComponent(t)];
        Pf.isNumber(n) && o.push('expires=' + new Date(n).toGMTString()),
          Pf.isString(r) && o.push('path=' + r),
          Pf.isString(i) && o.push('domain=' + i),
          !0 === a && o.push('secure'),
          (document.cookie = o.join('; '));
      },
      read(e) {
        const t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
        return t ? decodeURIComponent(t[3]) : null;
      },
      remove(e) {
        this.write(e, '', Date.now() - 864e5);
      },
    }
  : { write() {}, read: () => null, remove() {} };
function vh(e, t) {
  return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
    ? (function (e, t) {
        return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
      })(e, t)
    : t;
}
const bh = (e) => (e instanceof oh ? { ...e } : e);
function wh(e, t) {
  t = t || {};
  const n = {};
  function r(e, t, n, r) {
    return Pf.isPlainObject(e) && Pf.isPlainObject(t)
      ? Pf.merge.call({ caseless: r }, e, t)
      : Pf.isPlainObject(t)
        ? Pf.merge({}, t)
        : Pf.isArray(t)
          ? t.slice()
          : t;
  }
  function i(e, t, n, i) {
    return Pf.isUndefined(t) ? (Pf.isUndefined(e) ? void 0 : r(void 0, e, 0, i)) : r(e, t, 0, i);
  }
  function a(e, t) {
    if (!Pf.isUndefined(t)) return r(void 0, t);
  }
  function o(e, t) {
    return Pf.isUndefined(t) ? (Pf.isUndefined(e) ? void 0 : r(void 0, e)) : r(void 0, t);
  }
  function s(n, i, a) {
    return a in t ? r(n, i) : a in e ? r(void 0, n) : void 0;
  }
  const l = {
    url: a,
    method: a,
    data: a,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: s,
    headers: (e, t, n) => i(bh(e), bh(t), 0, !0),
  };
  return (
    Pf.forEach(Object.keys(Object.assign({}, e, t)), function (r) {
      const a = l[r] || i,
        o = a(e[r], t[r], r);
      (Pf.isUndefined(o) && a !== s) || (n[r] = o);
    }),
    n
  );
}
const xh = (e) => {
    const t = wh({}, e);
    let n,
      { data: r, withXSRFToken: i, xsrfHeaderName: a, xsrfCookieName: o, headers: s, auth: l } = t;
    if (
      ((t.headers = s = oh.from(s)),
      (t.url = Bf(vh(t.baseURL, t.url), e.params, e.paramsSerializer)),
      l &&
        s.set(
          'Authorization',
          'Basic ' +
            btoa(
              (l.username || '') +
                ':' +
                (l.password ? unescape(encodeURIComponent(l.password)) : '')
            )
        ),
      Pf.isFormData(r))
    )
      if (Xf.hasStandardBrowserEnv || Xf.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0);
      else if (!1 !== (n = s.getContentType())) {
        const [e, ...t] = n
          ? n
              .split(';')
              .map((e) => e.trim())
              .filter(Boolean)
          : [];
        s.setContentType([e || 'multipart/form-data', ...t].join('; '));
      }
    if (
      Xf.hasStandardBrowserEnv &&
      (i && Pf.isFunction(i) && (i = i(t)), i || (!1 !== i && ph(t.url)))
    ) {
      const e = a && o && yh.read(o);
      e && s.set(a, e);
    }
    return t;
  },
  kh =
    'undefined' != typeof XMLHttpRequest &&
    function (e) {
      return new Promise(function (t, n) {
        const r = xh(e);
        let i = r.data;
        const a = oh.from(r.headers).normalize();
        let o,
          s,
          l,
          u,
          c,
          { responseType: d, onUploadProgress: f, onDownloadProgress: h } = r;
        function p() {
          u && u(),
            c && c(),
            r.cancelToken && r.cancelToken.unsubscribe(o),
            r.signal && r.signal.removeEventListener('abort', o);
        }
        let m = new XMLHttpRequest();
        function g() {
          if (!m) return;
          const r = oh.from('getAllResponseHeaders' in m && m.getAllResponseHeaders());
          ch(
            function (e) {
              t(e), p();
            },
            function (e) {
              n(e), p();
            },
            {
              data: d && 'text' !== d && 'json' !== d ? m.response : m.responseText,
              status: m.status,
              statusText: m.statusText,
              headers: r,
              config: e,
              request: m,
            }
          ),
            (m = null);
        }
        m.open(r.method.toUpperCase(), r.url, !0),
          (m.timeout = r.timeout),
          'onloadend' in m
            ? (m.onloadend = g)
            : (m.onreadystatechange = function () {
                m &&
                  4 === m.readyState &&
                  (0 !== m.status || (m.responseURL && 0 === m.responseURL.indexOf('file:'))) &&
                  setTimeout(g);
              }),
          (m.onabort = function () {
            m && (n(new Af('Request aborted', Af.ECONNABORTED, e, m)), (m = null));
          }),
          (m.onerror = function () {
            n(new Af('Network Error', Af.ERR_NETWORK, e, m)), (m = null);
          }),
          (m.ontimeout = function () {
            let t = r.timeout ? 'timeout of ' + r.timeout + 'ms exceeded' : 'timeout exceeded';
            const i = r.transitional || $f;
            r.timeoutErrorMessage && (t = r.timeoutErrorMessage),
              n(new Af(t, i.clarifyTimeoutError ? Af.ETIMEDOUT : Af.ECONNABORTED, e, m)),
              (m = null);
          }),
          void 0 === i && a.setContentType(null),
          'setRequestHeader' in m &&
            Pf.forEach(a.toJSON(), function (e, t) {
              m.setRequestHeader(t, e);
            }),
          Pf.isUndefined(r.withCredentials) || (m.withCredentials = !!r.withCredentials),
          d && 'json' !== d && (m.responseType = r.responseType),
          h && (([l, c] = dh(h, !0)), m.addEventListener('progress', l)),
          f &&
            m.upload &&
            (([s, u] = dh(f)),
            m.upload.addEventListener('progress', s),
            m.upload.addEventListener('loadend', u)),
          (r.cancelToken || r.signal) &&
            ((o = (t) => {
              m && (n(!t || t.type ? new uh(null, e, m) : t), m.abort(), (m = null));
            }),
            r.cancelToken && r.cancelToken.subscribe(o),
            r.signal && (r.signal.aborted ? o() : r.signal.addEventListener('abort', o)));
        const y = (function (e) {
          const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
          return (t && t[1]) || '';
        })(r.url);
        y && -1 === Xf.protocols.indexOf(y)
          ? n(new Af('Unsupported protocol ' + y + ':', Af.ERR_BAD_REQUEST, e))
          : m.send(i || null);
      });
    },
  Sh = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let n,
        r = new AbortController();
      const i = function (e) {
        if (!n) {
          (n = !0), o();
          const t = e instanceof Error ? e : this.reason;
          r.abort(t instanceof Af ? t : new uh(t instanceof Error ? t.message : t));
        }
      };
      let a =
        t &&
        setTimeout(() => {
          (a = null), i(new Af(`timeout ${t} of ms exceeded`, Af.ETIMEDOUT));
        }, t);
      const o = () => {
        e &&
          (a && clearTimeout(a),
          (a = null),
          e.forEach((e) => {
            e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener('abort', i);
          }),
          (e = null));
      };
      e.forEach((e) => e.addEventListener('abort', i));
      const { signal: s } = r;
      return (s.unsubscribe = () => Pf.asap(o)), s;
    }
  },
  _h = function* (e, t) {
    let n = e.byteLength;
    if (!t || n < t) return void (yield e);
    let r,
      i = 0;
    for (; i < n; ) (r = i + t), yield e.slice(i, r), (i = r);
  },
  Eh = async function* (e) {
    if (e[Symbol.asyncIterator]) return void (yield* e);
    const t = e.getReader();
    try {
      for (;;) {
        const { done: e, value: n } = await t.read();
        if (e) break;
        yield n;
      }
    } finally {
      await t.cancel();
    }
  },
  Ch = (e, t, n, r) => {
    const i = (async function* (e, t) {
      for await (const n of Eh(e)) yield* _h(n, t);
    })(e, t);
    let a,
      o = 0,
      s = (e) => {
        a || ((a = !0), r && r(e));
      };
    return new ReadableStream(
      {
        async pull(e) {
          try {
            const { done: t, value: r } = await i.next();
            if (t) return s(), void e.close();
            let a = r.byteLength;
            if (n) {
              let e = (o += a);
              n(e);
            }
            e.enqueue(new Uint8Array(r));
          } catch (t) {
            throw (s(t), t);
          }
        },
        cancel: (e) => (s(e), i.return()),
      },
      { highWaterMark: 2 }
    );
  },
  Th = 'function' == typeof fetch && 'function' == typeof Request && 'function' == typeof Response,
  Ph = Th && 'function' == typeof ReadableStream,
  Ah =
    Th &&
    ('function' == typeof TextEncoder
      ? ((Rh = new TextEncoder()), (e) => Rh.encode(e))
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer()));
var Rh;
const Oh = (e, ...t) => {
    try {
      return !!e(...t);
    } catch (n) {
      return !1;
    }
  },
  Dh =
    Ph &&
    Oh(() => {
      let e = !1;
      const t = new Request(Xf.origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          return (e = !0), 'half';
        },
      }).headers.has('Content-Type');
      return e && !t;
    }),
  Lh = Ph && Oh(() => Pf.isReadableStream(new Response('').body)),
  Nh = { stream: Lh && ((e) => e.body) };
var Mh;
Th &&
  ((Mh = new Response()),
  ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((e) => {
    !Nh[e] &&
      (Nh[e] = Pf.isFunction(Mh[e])
        ? (t) => t[e]()
        : (t, n) => {
            throw new Af(`Response type '${e}' is not supported`, Af.ERR_NOT_SUPPORT, n);
          });
  }));
const Fh = async (e, t) => {
    const n = Pf.toFiniteNumber(e.getContentLength());
    return null == n
      ? (async (e) => {
          if (null == e) return 0;
          if (Pf.isBlob(e)) return e.size;
          if (Pf.isSpecCompliantForm(e)) {
            const t = new Request(Xf.origin, { method: 'POST', body: e });
            return (await t.arrayBuffer()).byteLength;
          }
          return Pf.isArrayBufferView(e) || Pf.isArrayBuffer(e)
            ? e.byteLength
            : (Pf.isURLSearchParams(e) && (e += ''),
              Pf.isString(e) ? (await Ah(e)).byteLength : void 0);
        })(t)
      : n;
  },
  jh = {
    http: null,
    xhr: kh,
    fetch:
      Th &&
      (async (e) => {
        let {
          url: t,
          method: n,
          data: r,
          signal: i,
          cancelToken: a,
          timeout: o,
          onDownloadProgress: s,
          onUploadProgress: l,
          responseType: u,
          headers: c,
          withCredentials: d = 'same-origin',
          fetchOptions: f,
        } = xh(e);
        u = u ? (u + '').toLowerCase() : 'text';
        let h,
          p = Sh([i, a && a.toAbortSignal()], o);
        const m =
          p &&
          p.unsubscribe &&
          (() => {
            p.unsubscribe();
          });
        let g;
        try {
          if (l && Dh && 'get' !== n && 'head' !== n && 0 !== (g = await Fh(c, r))) {
            let e,
              n = new Request(t, { method: 'POST', body: r, duplex: 'half' });
            if (
              (Pf.isFormData(r) && (e = n.headers.get('content-type')) && c.setContentType(e),
              n.body)
            ) {
              const [e, t] = fh(g, dh(hh(l)));
              r = Ch(n.body, 65536, e, t);
            }
          }
          Pf.isString(d) || (d = d ? 'include' : 'omit');
          const i = 'credentials' in Request.prototype;
          h = new Request(t, {
            ...f,
            signal: p,
            method: n.toUpperCase(),
            headers: c.normalize().toJSON(),
            body: r,
            duplex: 'half',
            credentials: i ? d : void 0,
          });
          let a = await fetch(h);
          const o = Lh && ('stream' === u || 'response' === u);
          if (Lh && (s || (o && m))) {
            const e = {};
            ['status', 'statusText', 'headers'].forEach((t) => {
              e[t] = a[t];
            });
            const t = Pf.toFiniteNumber(a.headers.get('content-length')),
              [n, r] = (s && fh(t, dh(hh(s), !0))) || [];
            a = new Response(
              Ch(a.body, 65536, n, () => {
                r && r(), m && m();
              }),
              e
            );
          }
          u = u || 'text';
          let y = await Nh[Pf.findKey(Nh, u) || 'text'](a, e);
          return (
            !o && m && m(),
            await new Promise((t, n) => {
              ch(t, n, {
                data: y,
                headers: oh.from(a.headers),
                status: a.status,
                statusText: a.statusText,
                config: e,
                request: h,
              });
            })
          );
        } catch (y) {
          if ((m && m(), y && 'TypeError' === y.name && /fetch/i.test(y.message)))
            throw Object.assign(new Af('Network Error', Af.ERR_NETWORK, e, h), {
              cause: y.cause || y,
            });
          throw Af.from(y, y && y.code, e, h);
        }
      }),
  };
Pf.forEach(jh, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, 'name', { value: t });
    } catch (n) {}
    Object.defineProperty(e, 'adapterName', { value: t });
  }
});
const Vh = (e) => `- ${e}`,
  Ih = (e) => Pf.isFunction(e) || null === e || !1 === e,
  zh = (e) => {
    e = Pf.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const i = {};
    for (let a = 0; a < t; a++) {
      let t;
      if (((n = e[a]), (r = n), !Ih(n) && ((r = jh[(t = String(n)).toLowerCase()]), void 0 === r)))
        throw new Af(`Unknown adapter '${t}'`);
      if (r) break;
      i[t || '#' + a] = r;
    }
    if (!r) {
      const e = Object.entries(i).map(
        ([e, t]) =>
          `adapter ${e} ` +
          (!1 === t ? 'is not supported by the environment' : 'is not available in the build')
      );
      throw new Af(
        'There is no suitable adapter to dispatch the request ' +
          (t
            ? e.length > 1
              ? 'since :\n' + e.map(Vh).join('\n')
              : ' ' + Vh(e[0])
            : 'as no adapter specified'),
        'ERR_NOT_SUPPORT'
      );
    }
    return r;
  };
function Bh(e) {
  if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
    throw new uh(null, e);
}
function Uh(e) {
  Bh(e),
    (e.headers = oh.from(e.headers)),
    (e.data = sh.call(e, e.transformRequest)),
    -1 !== ['post', 'put', 'patch'].indexOf(e.method) &&
      e.headers.setContentType('application/x-www-form-urlencoded', !1);
  return zh(e.adapter || Jf.adapter)(e).then(
    function (t) {
      return (
        Bh(e), (t.data = sh.call(e, e.transformResponse, t)), (t.headers = oh.from(t.headers)), t
      );
    },
    function (t) {
      return (
        lh(t) ||
          (Bh(e),
          t &&
            t.response &&
            ((t.response.data = sh.call(e, e.transformResponse, t.response)),
            (t.response.headers = oh.from(t.response.headers)))),
        Promise.reject(t)
      );
    }
  );
}
const $h = '1.7.9',
  Zh = {};
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
  Zh[e] = function (n) {
    return typeof n === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
  };
});
const Wh = {};
(Zh.transitional = function (e, t, n) {
  function r(e, t) {
    return "[Axios v1.7.9] Transitional option '" + e + "'" + t + (n ? '. ' + n : '');
  }
  return (n, i, a) => {
    if (!1 === e)
      throw new Af(r(i, ' has been removed' + (t ? ' in ' + t : '')), Af.ERR_DEPRECATED);
    return (
      t &&
        !Wh[i] &&
        ((Wh[i] = !0),
        console.warn(
          r(i, ' has been deprecated since v' + t + ' and will be removed in the near future')
        )),
      !e || e(n, i, a)
    );
  };
}),
  (Zh.spelling = function (e) {
    return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
  });
const Hh = {
    assertOptions: function (e, t, n) {
      if ('object' != typeof e) throw new Af('options must be an object', Af.ERR_BAD_OPTION_VALUE);
      const r = Object.keys(e);
      let i = r.length;
      for (; i-- > 0; ) {
        const a = r[i],
          o = t[a];
        if (o) {
          const t = e[a],
            n = void 0 === t || o(t, a, e);
          if (!0 !== n) throw new Af('option ' + a + ' must be ' + n, Af.ERR_BAD_OPTION_VALUE);
        } else if (!0 !== n) throw new Af('Unknown option ' + a, Af.ERR_BAD_OPTION);
      }
    },
    validators: Zh,
  },
  qh = Hh.validators;
class Kh {
  constructor(e) {
    (this.defaults = e), (this.interceptors = { request: new Uf(), response: new Uf() });
  }
  async request(e, t) {
    try {
      return await this._request(e, t);
    } catch (n) {
      if (n instanceof Error) {
        let e = {};
        Error.captureStackTrace ? Error.captureStackTrace(e) : (e = new Error());
        const t = e.stack ? e.stack.replace(/^.+\n/, '') : '';
        try {
          n.stack
            ? t && !String(n.stack).endsWith(t.replace(/^.+\n.+\n/, '')) && (n.stack += '\n' + t)
            : (n.stack = t);
        } catch (r) {}
      }
      throw n;
    }
  }
  _request(e, t) {
    'string' == typeof e ? ((t = t || {}).url = e) : (t = e || {}), (t = wh(this.defaults, t));
    const { transitional: n, paramsSerializer: r, headers: i } = t;
    void 0 !== n &&
      Hh.assertOptions(
        n,
        {
          silentJSONParsing: qh.transitional(qh.boolean),
          forcedJSONParsing: qh.transitional(qh.boolean),
          clarifyTimeoutError: qh.transitional(qh.boolean),
        },
        !1
      ),
      null != r &&
        (Pf.isFunction(r)
          ? (t.paramsSerializer = { serialize: r })
          : Hh.assertOptions(r, { encode: qh.function, serialize: qh.function }, !0)),
      Hh.assertOptions(
        t,
        { baseUrl: qh.spelling('baseURL'), withXsrfToken: qh.spelling('withXSRFToken') },
        !0
      ),
      (t.method = (t.method || this.defaults.method || 'get').toLowerCase());
    let a = i && Pf.merge(i.common, i[t.method]);
    i &&
      Pf.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], (e) => {
        delete i[e];
      }),
      (t.headers = oh.concat(a, i));
    const o = [];
    let s = !0;
    this.interceptors.request.forEach(function (e) {
      ('function' == typeof e.runWhen && !1 === e.runWhen(t)) ||
        ((s = s && e.synchronous), o.unshift(e.fulfilled, e.rejected));
    });
    const l = [];
    let u;
    this.interceptors.response.forEach(function (e) {
      l.push(e.fulfilled, e.rejected);
    });
    let c,
      d = 0;
    if (!s) {
      const e = [Uh.bind(this), void 0];
      for (e.unshift.apply(e, o), e.push.apply(e, l), c = e.length, u = Promise.resolve(t); d < c; )
        u = u.then(e[d++], e[d++]);
      return u;
    }
    c = o.length;
    let f = t;
    for (d = 0; d < c; ) {
      const e = o[d++],
        t = o[d++];
      try {
        f = e(f);
      } catch (h) {
        t.call(this, h);
        break;
      }
    }
    try {
      u = Uh.call(this, f);
    } catch (h) {
      return Promise.reject(h);
    }
    for (d = 0, c = l.length; d < c; ) u = u.then(l[d++], l[d++]);
    return u;
  }
  getUri(e) {
    return Bf(vh((e = wh(this.defaults, e)).baseURL, e.url), e.params, e.paramsSerializer);
  }
}
Pf.forEach(['delete', 'get', 'head', 'options'], function (e) {
  Kh.prototype[e] = function (t, n) {
    return this.request(wh(n || {}, { method: e, url: t, data: (n || {}).data }));
  };
}),
  Pf.forEach(['post', 'put', 'patch'], function (e) {
    function t(t) {
      return function (n, r, i) {
        return this.request(
          wh(i || {}, {
            method: e,
            headers: t ? { 'Content-Type': 'multipart/form-data' } : {},
            url: n,
            data: r,
          })
        );
      };
    }
    (Kh.prototype[e] = t()), (Kh.prototype[e + 'Form'] = t(!0));
  });
const Yh = Kh;
class Xh {
  constructor(e) {
    if ('function' != typeof e) throw new TypeError('executor must be a function.');
    let t;
    this.promise = new Promise(function (e) {
      t = e;
    });
    const n = this;
    this.promise.then((e) => {
      if (!n._listeners) return;
      let t = n._listeners.length;
      for (; t-- > 0; ) n._listeners[t](e);
      n._listeners = null;
    }),
      (this.promise.then = (e) => {
        let t;
        const r = new Promise((e) => {
          n.subscribe(e), (t = e);
        }).then(e);
        return (
          (r.cancel = function () {
            n.unsubscribe(t);
          }),
          r
        );
      }),
      e(function (e, r, i) {
        n.reason || ((n.reason = new uh(e, r, i)), t(n.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    this.reason
      ? e(this.reason)
      : this._listeners
        ? this._listeners.push(e)
        : (this._listeners = [e]);
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    const t = this._listeners.indexOf(e);
    -1 !== t && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const e = new AbortController(),
      t = (t) => {
        e.abort(t);
      };
    return this.subscribe(t), (e.signal.unsubscribe = () => this.unsubscribe(t)), e.signal;
  }
  static source() {
    let e;
    return {
      token: new Xh(function (t) {
        e = t;
      }),
      cancel: e,
    };
  }
}
const Qh = Xh;
const Gh = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(Gh).forEach(([e, t]) => {
  Gh[t] = e;
});
const Jh = Gh;
const ep = (function e(t) {
  const n = new Yh(t),
    r = jd(Yh.prototype.request, n);
  return (
    Pf.extend(r, Yh.prototype, n, { allOwnKeys: !0 }),
    Pf.extend(r, n, null, { allOwnKeys: !0 }),
    (r.create = function (n) {
      return e(wh(t, n));
    }),
    r
  );
})(Jf);
(ep.Axios = Yh),
  (ep.CanceledError = uh),
  (ep.CancelToken = Qh),
  (ep.isCancel = lh),
  (ep.VERSION = $h),
  (ep.toFormData = Ff),
  (ep.AxiosError = Af),
  (ep.Cancel = ep.CanceledError),
  (ep.all = function (e) {
    return Promise.all(e);
  }),
  (ep.spread = function (e) {
    return function (t) {
      return e.apply(null, t);
    };
  }),
  (ep.isAxiosError = function (e) {
    return Pf.isObject(e) && !0 === e.isAxiosError;
  }),
  (ep.mergeConfig = wh),
  (ep.AxiosHeaders = oh),
  (ep.formToJSON = (e) => Qf(Pf.isHTMLForm(e) ? new FormData(e) : e)),
  (ep.getAdapter = zh),
  (ep.HttpStatusCode = Jh),
  (ep.default = ep);
const tp = ep;
/*! js-cookie v3.0.5 | MIT */ function np(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n) e[r] = n[r];
  }
  return e;
}
var rp = (function e(t, n) {
  function r(e, r, i) {
    if ('undefined' != typeof document) {
      'number' == typeof (i = np({}, n, i)).expires &&
        (i.expires = new Date(Date.now() + 864e5 * i.expires)),
        i.expires && (i.expires = i.expires.toUTCString()),
        (e = encodeURIComponent(e)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape));
      var a = '';
      for (var o in i) i[o] && ((a += '; ' + o), !0 !== i[o] && (a += '=' + i[o].split(';')[0]));
      return (document.cookie = e + '=' + t.write(r, e) + a);
    }
  }
  return Object.create(
    {
      set: r,
      get: function (e) {
        if ('undefined' != typeof document && (!arguments.length || e)) {
          for (
            var n = document.cookie ? document.cookie.split('; ') : [], r = {}, i = 0;
            i < n.length;
            i++
          ) {
            var a = n[i].split('='),
              o = a.slice(1).join('=');
            try {
              var s = decodeURIComponent(a[0]);
              if (((r[s] = t.read(o, s)), e === s)) break;
            } catch (l) {}
          }
          return e ? r[e] : r;
        }
      },
      remove: function (e, t) {
        r(e, '', np({}, t, { expires: -1 }));
      },
      withAttributes: function (t) {
        return e(this.converter, np({}, this.attributes, t));
      },
      withConverter: function (t) {
        return e(np({}, this.converter, t), this.attributes);
      },
    },
    { attributes: { value: Object.freeze(n) }, converter: { value: Object.freeze(t) } }
  );
})(
  {
    read: function (e) {
      return (
        '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      );
    },
    write: function (e) {
      return encodeURIComponent(e).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    },
  },
  { path: '/' }
);
function ip(e) {
  if ('undefined' == typeof Proxy) return e;
  const t = new Map();
  return new Proxy((...t) => e(...t), {
    get: (n, r) => ('create' === r ? e : (t.has(r) || t.set(r, e(r)), t.get(r))),
  });
}
function ap(e) {
  return null !== e && 'object' == typeof e && 'function' == typeof e.start;
}
const op = (e) => Array.isArray(e);
function sp(e, t) {
  if (!Array.isArray(t)) return !1;
  const n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function lp(e) {
  return 'string' == typeof e || Array.isArray(e);
}
function up(e) {
  const t = [{}, {}];
  return (
    null == e ||
      e.values.forEach((e, n) => {
        (t[0][n] = e.get()), (t[1][n] = e.getVelocity());
      }),
    t
  );
}
function cp(e, t, n, r) {
  if ('function' == typeof t) {
    const [i, a] = up(r);
    t = t(void 0 !== n ? n : e.custom, i, a);
  }
  if (('string' == typeof t && (t = e.variants && e.variants[t]), 'function' == typeof t)) {
    const [i, a] = up(r);
    t = t(void 0 !== n ? n : e.custom, i, a);
  }
  return t;
}
function dp(e, t, n) {
  const r = e.getProps();
  return cp(r, t, void 0 !== n ? n : r.custom, e);
}
const fp = ['animate', 'whileInView', 'whileFocus', 'whileHover', 'whileTap', 'whileDrag', 'exit'],
  hp = ['initial', ...fp],
  pp = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  mp = new Set(pp),
  gp = (e) => 1e3 * e,
  yp = (e) => e / 1e3,
  vp = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  bp = { type: 'keyframes', duration: 0.8 },
  wp = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  xp = (e, { keyframes: t }) =>
    t.length > 2
      ? bp
      : mp.has(e)
        ? e.startsWith('scale')
          ? {
              type: 'spring',
              stiffness: 550,
              damping: 0 === t[1] ? 2 * Math.sqrt(550) : 30,
              restSpeed: 10,
            }
          : vp
        : wp;
function kp(e, t) {
  return e ? e[t] || e.default || e : void 0;
}
const Sp = !1,
  _p = (e) => null !== e;
function Ep(e, { repeat: t, repeatType: n = 'loop' }, r) {
  const i = e.filter(_p),
    a = t && 'loop' !== n && t % 2 == 1 ? 0 : i.length - 1;
  return a && void 0 !== r ? r : i[a];
}
const Cp = (e) => e;
let Tp = Cp;
const Pp = ['read', 'resolveKeyframes', 'update', 'preRender', 'render', 'postRender'];
function Ap(e, t) {
  let n = !1,
    r = !0;
  const i = { delta: 0, timestamp: 0, isProcessing: !1 },
    a = () => (n = !0),
    o = Pp.reduce(
      (e, t) => (
        (e[t] = (function (e) {
          let t = new Set(),
            n = new Set(),
            r = !1,
            i = !1;
          const a = new WeakSet();
          let o = { delta: 0, timestamp: 0, isProcessing: !1 };
          function s(t) {
            a.has(t) && (l.schedule(t), e()), t(o);
          }
          const l = {
            schedule: (e, i = !1, o = !1) => {
              const s = o && r ? t : n;
              return i && a.add(e), s.has(e) || s.add(e), e;
            },
            cancel: (e) => {
              n.delete(e), a.delete(e);
            },
            process: (e) => {
              (o = e),
                r
                  ? (i = !0)
                  : ((r = !0),
                    ([t, n] = [n, t]),
                    t.forEach(s),
                    t.clear(),
                    (r = !1),
                    i && ((i = !1), l.process(e)));
            },
          };
          return l;
        })(a)),
        e
      ),
      {}
    ),
    { read: s, resolveKeyframes: l, update: u, preRender: c, render: d, postRender: f } = o,
    h = () => {
      const a = performance.now();
      (n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(a - i.timestamp, 40), 1)),
        (i.timestamp = a),
        (i.isProcessing = !0),
        s.process(i),
        l.process(i),
        u.process(i),
        c.process(i),
        d.process(i),
        f.process(i),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(h));
    };
  return {
    schedule: Pp.reduce((t, a) => {
      const s = o[a];
      return (
        (t[a] = (t, a = !1, o = !1) => (
          n || ((n = !0), (r = !0), i.isProcessing || e(h)), s.schedule(t, a, o)
        )),
        t
      );
    }, {}),
    cancel: (e) => {
      for (let t = 0; t < Pp.length; t++) o[Pp[t]].cancel(e);
    },
    state: i,
    steps: o,
  };
}
const {
    schedule: Rp,
    cancel: Op,
    state: Dp,
    steps: Lp,
  } = Ap('undefined' != typeof requestAnimationFrame ? requestAnimationFrame : Cp, !0),
  Np = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e;
function Mp(e, t, n, r) {
  if (e === t && n === r) return Cp;
  const i = (t) =>
    (function (e, t, n, r, i) {
      let a,
        o,
        s = 0;
      do {
        (o = t + (n - t) / 2), (a = Np(o, r, i) - e), a > 0 ? (n = o) : (t = o);
      } while (Math.abs(a) > 1e-7 && ++s < 12);
      return o;
    })(t, 0, 1, e, n);
  return (e) => (0 === e || 1 === e ? e : Np(i(e), t, r));
}
const Fp = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  jp = (e) => (t) => 1 - e(1 - t),
  Vp = Mp(0.33, 1.53, 0.69, 0.99),
  Ip = jp(Vp),
  zp = Fp(Ip),
  Bp = (e) => ((e *= 2) < 1 ? 0.5 * Ip(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1)))),
  Up = (e) => 1 - Math.sin(Math.acos(e)),
  $p = jp(Up),
  Zp = Fp(Up),
  Wp = (e) => /^0[^.\s]+$/u.test(e);
const Hp = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
  qp = (e) => (t) => 'string' == typeof t && t.startsWith(e),
  Kp = qp('--'),
  Yp = qp('var(--'),
  Xp = (e) => !!Yp(e) && Qp.test(e.split('/*')[0].trim()),
  Qp = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Gp = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Jp(e, t, n = 1) {
  const [r, i] = (function (e) {
    const t = Gp.exec(e);
    if (!t) return [,];
    const [, n, r, i] = t;
    return [`--${null != n ? n : r}`, i];
  })(e);
  if (!r) return;
  const a = window.getComputedStyle(t).getPropertyValue(r);
  if (a) {
    const e = a.trim();
    return Hp(e) ? parseFloat(e) : e;
  }
  return Xp(i) ? Jp(i, t, n + 1) : i;
}
const em = (e, t, n) => (n > t ? t : n < e ? e : n),
  tm = { test: (e) => 'number' == typeof e, parse: parseFloat, transform: (e) => e },
  nm = { ...tm, transform: (e) => em(0, 1, e) },
  rm = { ...tm, default: 1 },
  im = (e) => ({
    test: (t) => 'string' == typeof t && t.endsWith(e) && 1 === t.split(' ').length,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  am = im('deg'),
  om = im('%'),
  sm = im('px'),
  lm = im('vh'),
  um = im('vw'),
  cm = { ...om, parse: (e) => om.parse(e) / 100, transform: (e) => om.transform(100 * e) },
  dm = new Set([
    'width',
    'height',
    'top',
    'left',
    'right',
    'bottom',
    'x',
    'y',
    'translateX',
    'translateY',
  ]),
  fm = (e) => e === tm || e === sm,
  hm = (e, t) => parseFloat(e.split(', ')[t]),
  pm =
    (e, t) =>
    (n, { transform: r }) => {
      if ('none' === r || !r) return 0;
      const i = r.match(/^matrix3d\((.+)\)$/u);
      if (i) return hm(i[1], t);
      {
        const t = r.match(/^matrix\((.+)\)$/u);
        return t ? hm(t[1], e) : 0;
      }
    },
  mm = new Set(['x', 'y', 'z']),
  gm = pp.filter((e) => !mm.has(e));
const ym = {
  width: ({ x: e }, { paddingLeft: t = '0', paddingRight: n = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = '0', paddingBottom: n = '0' }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: pm(4, 13),
  y: pm(5, 14),
};
(ym.translateX = ym.x), (ym.translateY = ym.y);
const vm = (e) => (t) => t.test(e),
  bm = [tm, sm, om, am, um, lm, { test: (e) => 'auto' === e, parse: (e) => e }],
  wm = (e) => bm.find(vm(e)),
  xm = new Set();
let km = !1,
  Sm = !1;
function _m() {
  if (Sm) {
    const e = Array.from(xm).filter((e) => e.needsMeasurement),
      t = new Set(e.map((e) => e.element)),
      n = new Map();
    t.forEach((e) => {
      const t = (function (e) {
        const t = [];
        return (
          gm.forEach((n) => {
            const r = e.getValue(n);
            void 0 !== r && (t.push([n, r.get()]), r.set(n.startsWith('scale') ? 1 : 0));
          }),
          t
        );
      })(e);
      t.length && (n.set(e, t), e.render());
    }),
      e.forEach((e) => e.measureInitialState()),
      t.forEach((e) => {
        e.render();
        const t = n.get(e);
        t &&
          t.forEach(([t, n]) => {
            var r;
            null === (r = e.getValue(t)) || void 0 === r || r.set(n);
          });
      }),
      e.forEach((e) => e.measureEndState()),
      e.forEach((e) => {
        void 0 !== e.suspendedScrollY && window.scrollTo(0, e.suspendedScrollY);
      });
  }
  (Sm = !1), (km = !1), xm.forEach((e) => e.complete()), xm.clear();
}
function Em() {
  xm.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Sm = !0);
  });
}
class Cm {
  constructor(e, t, n, r, i, a = !1) {
    (this.isComplete = !1),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.isScheduled = !1),
      (this.unresolvedKeyframes = [...e]),
      (this.onComplete = t),
      (this.name = n),
      (this.motionValue = r),
      (this.element = i),
      (this.isAsync = a);
  }
  scheduleResolve() {
    (this.isScheduled = !0),
      this.isAsync
        ? (xm.add(this), km || ((km = !0), Rp.read(Em), Rp.resolveKeyframes(_m)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
    for (let i = 0; i < e.length; i++)
      if (null === e[i])
        if (0 === i) {
          const i = null == r ? void 0 : r.get(),
            a = e[e.length - 1];
          if (void 0 !== i) e[0] = i;
          else if (n && t) {
            const r = n.readValue(t, a);
            null != r && (e[0] = r);
          }
          void 0 === e[0] && (e[0] = a), r && void 0 === i && r.set(e[0]);
        } else e[i] = e[i - 1];
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete() {
    (this.isComplete = !0),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe),
      xm.delete(this);
  }
  cancel() {
    this.isComplete || ((this.isScheduled = !1), xm.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const Tm = (e) => Math.round(1e5 * e) / 1e5,
  Pm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
const Am =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  Rm = (e, t) => (n) =>
    Boolean(
      ('string' == typeof n && Am.test(n) && n.startsWith(e)) ||
        (t &&
          !(function (e) {
            return null == e;
          })(n) &&
          Object.prototype.hasOwnProperty.call(n, t))
    ),
  Om = (e, t, n) => (r) => {
    if ('string' != typeof r) return r;
    const [i, a, o, s] = r.match(Pm);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(a),
      [n]: parseFloat(o),
      alpha: void 0 !== s ? parseFloat(s) : 1,
    };
  },
  Dm = { ...tm, transform: (e) => Math.round(((e) => em(0, 255, e))(e)) },
  Lm = {
    test: Rm('rgb', 'red'),
    parse: Om('red', 'green', 'blue'),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      'rgba(' +
      Dm.transform(e) +
      ', ' +
      Dm.transform(t) +
      ', ' +
      Dm.transform(n) +
      ', ' +
      Tm(nm.transform(r)) +
      ')',
  };
const Nm = {
    test: Rm('#'),
    parse: function (e) {
      let t = '',
        n = '',
        r = '',
        i = '';
      return (
        e.length > 5
          ? ((t = e.substring(1, 3)),
            (n = e.substring(3, 5)),
            (r = e.substring(5, 7)),
            (i = e.substring(7, 9)))
          : ((t = e.substring(1, 2)),
            (n = e.substring(2, 3)),
            (r = e.substring(3, 4)),
            (i = e.substring(4, 5)),
            (t += t),
            (n += n),
            (r += r),
            (i += i)),
        {
          red: parseInt(t, 16),
          green: parseInt(n, 16),
          blue: parseInt(r, 16),
          alpha: i ? parseInt(i, 16) / 255 : 1,
        }
      );
    },
    transform: Lm.transform,
  },
  Mm = {
    test: Rm('hsl', 'hue'),
    parse: Om('hue', 'saturation', 'lightness'),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      'hsla(' +
      Math.round(e) +
      ', ' +
      om.transform(Tm(t)) +
      ', ' +
      om.transform(Tm(n)) +
      ', ' +
      Tm(nm.transform(r)) +
      ')',
  },
  Fm = {
    test: (e) => Lm.test(e) || Nm.test(e) || Mm.test(e),
    parse: (e) => (Lm.test(e) ? Lm.parse(e) : Mm.test(e) ? Mm.parse(e) : Nm.parse(e)),
    transform: (e) =>
      'string' == typeof e ? e : e.hasOwnProperty('red') ? Lm.transform(e) : Mm.transform(e),
  },
  jm =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
const Vm = 'number',
  Im = 'color',
  zm =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Bm(e) {
  const t = e.toString(),
    n = [],
    r = { color: [], number: [], var: [] },
    i = [];
  let a = 0;
  const o = t
    .replace(
      zm,
      (e) => (
        Fm.test(e)
          ? (r.color.push(a), i.push(Im), n.push(Fm.parse(e)))
          : e.startsWith('var(')
            ? (r.var.push(a), i.push('var'), n.push(e))
            : (r.number.push(a), i.push(Vm), n.push(parseFloat(e))),
        ++a,
        '${}'
      )
    )
    .split('${}');
  return { values: n, split: o, indexes: r, types: i };
}
function Um(e) {
  return Bm(e).values;
}
function $m(e) {
  const { split: t, types: n } = Bm(e),
    r = t.length;
  return (e) => {
    let i = '';
    for (let a = 0; a < r; a++)
      if (((i += t[a]), void 0 !== e[a])) {
        const t = n[a];
        i += t === Vm ? Tm(e[a]) : t === Im ? Fm.transform(e[a]) : e[a];
      }
    return i;
  };
}
const Zm = (e) => ('number' == typeof e ? 0 : e);
const Wm = {
    test: function (e) {
      var t, n;
      return (
        isNaN(e) &&
        'string' == typeof e &&
        ((null === (t = e.match(Pm)) || void 0 === t ? void 0 : t.length) || 0) +
          ((null === (n = e.match(jm)) || void 0 === n ? void 0 : n.length) || 0) >
          0
      );
    },
    parse: Um,
    createTransformer: $m,
    getAnimatableNone: function (e) {
      const t = Um(e);
      return $m(e)(t.map(Zm));
    },
  },
  Hm = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function qm(e) {
  const [t, n] = e.slice(0, -1).split('(');
  if ('drop-shadow' === t) return e;
  const [r] = n.match(Pm) || [];
  if (!r) return e;
  const i = n.replace(r, '');
  let a = Hm.has(t) ? 1 : 0;
  return r !== n && (a *= 100), t + '(' + a + i + ')';
}
const Km = /\b([a-z-]*)\(.*?\)/gu,
  Ym = {
    ...Wm,
    getAnimatableNone: (e) => {
      const t = e.match(Km);
      return t ? t.map(qm).join(' ') : e;
    },
  },
  Xm = {
    borderWidth: sm,
    borderTopWidth: sm,
    borderRightWidth: sm,
    borderBottomWidth: sm,
    borderLeftWidth: sm,
    borderRadius: sm,
    radius: sm,
    borderTopLeftRadius: sm,
    borderTopRightRadius: sm,
    borderBottomRightRadius: sm,
    borderBottomLeftRadius: sm,
    width: sm,
    maxWidth: sm,
    height: sm,
    maxHeight: sm,
    top: sm,
    right: sm,
    bottom: sm,
    left: sm,
    padding: sm,
    paddingTop: sm,
    paddingRight: sm,
    paddingBottom: sm,
    paddingLeft: sm,
    margin: sm,
    marginTop: sm,
    marginRight: sm,
    marginBottom: sm,
    marginLeft: sm,
    backgroundPositionX: sm,
    backgroundPositionY: sm,
  },
  Qm = {
    rotate: am,
    rotateX: am,
    rotateY: am,
    rotateZ: am,
    scale: rm,
    scaleX: rm,
    scaleY: rm,
    scaleZ: rm,
    skew: am,
    skewX: am,
    skewY: am,
    distance: sm,
    translateX: sm,
    translateY: sm,
    translateZ: sm,
    x: sm,
    y: sm,
    z: sm,
    perspective: sm,
    transformPerspective: sm,
    opacity: nm,
    originX: cm,
    originY: cm,
    originZ: sm,
  },
  Gm = { ...tm, transform: Math.round },
  Jm = { ...Xm, ...Qm, zIndex: Gm, size: sm, fillOpacity: nm, strokeOpacity: nm, numOctaves: Gm },
  eg = {
    ...Jm,
    color: Fm,
    backgroundColor: Fm,
    outlineColor: Fm,
    fill: Fm,
    stroke: Fm,
    borderColor: Fm,
    borderTopColor: Fm,
    borderRightColor: Fm,
    borderBottomColor: Fm,
    borderLeftColor: Fm,
    filter: Ym,
    WebkitFilter: Ym,
  },
  tg = (e) => eg[e];
function ng(e, t) {
  let n = tg(e);
  return n !== Ym && (n = Wm), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const rg = new Set(['auto', 'none', '0']);
class ig extends Cm {
  constructor(e, t, n, r, i) {
    super(e, t, n, r, i, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: t, name: n } = this;
    if (!t || !t.current) return;
    super.readKeyframes();
    for (let s = 0; s < e.length; s++) {
      let n = e[s];
      if ('string' == typeof n && ((n = n.trim()), Xp(n))) {
        const r = Jp(n, t.current);
        void 0 !== r && (e[s] = r), s === e.length - 1 && (this.finalKeyframe = n);
      }
    }
    if ((this.resolveNoneKeyframes(), !dm.has(n) || 2 !== e.length)) return;
    const [r, i] = e,
      a = wm(r),
      o = wm(i);
    if (a !== o)
      if (fm(a) && fm(o))
        for (let s = 0; s < e.length; s++) {
          const t = e[s];
          'string' == typeof t && (e[s] = parseFloat(t));
        }
      else this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: t } = this,
      n = [];
    for (let i = 0; i < e.length; i++)
      ('number' == typeof (r = e[i])
        ? 0 === r
        : null === r || 'none' === r || '0' === r || Wp(r)) && n.push(i);
    var r;
    n.length &&
      (function (e, t, n) {
        let r,
          i = 0;
        for (; i < e.length && !r; ) {
          const t = e[i];
          'string' == typeof t && !rg.has(t) && Bm(t).values.length && (r = e[i]), i++;
        }
        if (r && n) for (const a of t) e[a] = ng(n, r);
      })(e, n, t);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: t, name: n } = this;
    if (!e || !e.current) return;
    'height' === n && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = ym[n](e.measureViewportBox(), window.getComputedStyle(e.current))),
      (t[0] = this.measuredOrigin);
    const r = t[t.length - 1];
    void 0 !== r && e.getValue(n, r).jump(r, !1);
  }
  measureEndState() {
    var e;
    const { element: t, name: n, unresolvedKeyframes: r } = this;
    if (!t || !t.current) return;
    const i = t.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const a = r.length - 1,
      o = r[a];
    (r[a] = ym[n](t.measureViewportBox(), window.getComputedStyle(t.current))),
      null !== o && void 0 === this.finalKeyframe && (this.finalKeyframe = o),
      (null === (e = this.removedTransforms) || void 0 === e ? void 0 : e.length) &&
        this.removedTransforms.forEach(([e, n]) => {
          t.getValue(e).set(n);
        }),
      this.resolveNoneKeyframes();
  }
}
function ag(e) {
  return 'function' == typeof e;
}
let og;
function sg() {
  og = void 0;
}
const lg = {
    now: () => (
      void 0 === og && lg.set(Dp.isProcessing || Sp ? Dp.timestamp : performance.now()), og
    ),
    set: (e) => {
      (og = e), queueMicrotask(sg);
    },
  },
  ug = (e, t) =>
    'zIndex' !== t &&
    (!('number' != typeof e && !Array.isArray(e)) ||
      !('string' != typeof e || (!Wm.test(e) && '0' !== e) || e.startsWith('url(')));
class cg {
  constructor({
    autoplay: e = !0,
    delay: t = 0,
    type: n = 'keyframes',
    repeat: r = 0,
    repeatDelay: i = 0,
    repeatType: a = 'loop',
    ...o
  }) {
    (this.isStopped = !1),
      (this.hasAttemptedResolve = !1),
      (this.createdAt = lg.now()),
      (this.options = {
        autoplay: e,
        delay: t,
        type: n,
        repeat: r,
        repeatDelay: i,
        repeatType: a,
        ...o,
      }),
      this.updateFinishedPromise();
  }
  calcStartTime() {
    return this.resolvedAt && this.resolvedAt - this.createdAt > 40
      ? this.resolvedAt
      : this.createdAt;
  }
  get resolved() {
    return this._resolved || this.hasAttemptedResolve || (Em(), _m()), this._resolved;
  }
  onKeyframesResolved(e, t) {
    (this.resolvedAt = lg.now()), (this.hasAttemptedResolve = !0);
    const {
      name: n,
      type: r,
      velocity: i,
      delay: a,
      onComplete: o,
      onUpdate: s,
      isGenerator: l,
    } = this.options;
    if (
      !l &&
      !(function (e, t, n, r) {
        const i = e[0];
        if (null === i) return !1;
        if ('display' === t || 'visibility' === t) return !0;
        const a = e[e.length - 1],
          o = ug(i, t),
          s = ug(a, t);
        return (
          !(!o || !s) &&
          ((function (e) {
            const t = e[0];
            if (1 === e.length) return !0;
            for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
          })(e) ||
            (('spring' === n || ag(n)) && r))
        );
      })(e, n, r, i)
    ) {
      if (!a)
        return (
          null == s || s(Ep(e, this.options, t)),
          null == o || o(),
          void this.resolveFinishedPromise()
        );
      this.options.duration = 0;
    }
    const u = this.initPlayback(e, t);
    !1 !== u &&
      ((this._resolved = { keyframes: e, finalKeyframe: t, ...u }), this.onPostResolved());
  }
  onPostResolved() {}
  then(e, t) {
    return this.currentFinishedPromise.then(e, t);
  }
  flatten() {
    (this.options.type = 'keyframes'), (this.options.ease = 'linear');
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((e) => {
      this.resolveFinishedPromise = e;
    });
  }
}
const dg = (e, t, n) => {
    const r = t - e;
    return 0 === r ? 1 : (n - e) / r;
  },
  fg = (e, t, n = 10) => {
    let r = '';
    const i = Math.max(Math.round(t / n), 2);
    for (let a = 0; a < i; a++) r += e(dg(0, i - 1, a)) + ', ';
    return `linear(${r.substring(0, r.length - 2)})`;
  };
function hg(e, t) {
  return t ? e * (1e3 / t) : 0;
}
function pg(e, t, n) {
  const r = Math.max(t - 5, 0);
  return hg(n - e(r), t - r);
}
const mg = 100,
  gg = 10,
  yg = 1,
  vg = 0,
  bg = 800,
  wg = 0.3,
  xg = 0.3,
  kg = { granular: 0.01, default: 2 },
  Sg = { granular: 0.005, default: 0.5 },
  _g = 0.01,
  Eg = 10,
  Cg = 0.05,
  Tg = 1,
  Pg = 0.001;
function Ag({ duration: e = bg, bounce: t = wg, velocity: n = vg, mass: r = yg }) {
  let i,
    a,
    o = 1 - t;
  (o = em(Cg, Tg, o)),
    (e = em(_g, Eg, yp(e))),
    o < 1
      ? ((i = (t) => {
          const r = t * o,
            i = r * e,
            a = r - n,
            s = Og(t, o),
            l = Math.exp(-i);
          return Pg - (a / s) * l;
        }),
        (a = (t) => {
          const r = t * o * e,
            a = r * n + n,
            s = Math.pow(o, 2) * Math.pow(t, 2) * e,
            l = Math.exp(-r),
            u = Og(Math.pow(t, 2), o);
          return ((-i(t) + Pg > 0 ? -1 : 1) * ((a - s) * l)) / u;
        }))
      : ((i = (t) => Math.exp(-t * e) * ((t - n) * e + 1) - 0.001),
        (a = (t) => Math.exp(-t * e) * (e * e * (n - t))));
  const s = (function (e, t, n) {
    let r = n;
    for (let i = 1; i < Rg; i++) r -= e(r) / t(r);
    return r;
  })(i, a, 5 / e);
  if (((e = gp(e)), isNaN(s))) return { stiffness: mg, damping: gg, duration: e };
  {
    const t = Math.pow(s, 2) * r;
    return { stiffness: t, damping: 2 * o * Math.sqrt(r * t), duration: e };
  }
}
const Rg = 12;
function Og(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const Dg = 2e4;
function Lg(e) {
  let t = 0;
  let n = e.next(t);
  for (; !n.done && t < Dg; ) (t += 50), (n = e.next(t));
  return t >= Dg ? 1 / 0 : t;
}
const Ng = ['duration', 'bounce'],
  Mg = ['stiffness', 'damping', 'mass'];
function Fg(e, t) {
  return t.some((t) => void 0 !== e[t]);
}
function jg(e = xg, t = wg) {
  const n = 'object' != typeof e ? { visualDuration: e, keyframes: [0, 1], bounce: t } : e;
  let { restSpeed: r, restDelta: i } = n;
  const a = n.keyframes[0],
    o = n.keyframes[n.keyframes.length - 1],
    s = { done: !1, value: a },
    {
      stiffness: l,
      damping: u,
      mass: c,
      duration: d,
      velocity: f,
      isResolvedFromDuration: h,
    } = (function (e) {
      let t = {
        velocity: vg,
        stiffness: mg,
        damping: gg,
        mass: yg,
        isResolvedFromDuration: !1,
        ...e,
      };
      if (!Fg(e, Mg) && Fg(e, Ng))
        if (e.visualDuration) {
          const n = e.visualDuration,
            r = (2 * Math.PI) / (1.2 * n),
            i = r * r,
            a = 2 * em(0.05, 1, 1 - e.bounce) * Math.sqrt(i);
          t = { ...t, mass: yg, stiffness: i, damping: a };
        } else {
          const n = Ag(e);
          (t = { ...t, ...n, mass: yg }), (t.isResolvedFromDuration = !0);
        }
      return t;
    })({ ...n, velocity: -yp(n.velocity || 0) }),
    p = f || 0,
    m = u / (2 * Math.sqrt(l * c)),
    g = o - a,
    y = yp(Math.sqrt(l / c)),
    v = Math.abs(g) < 5;
  let b;
  if ((r || (r = v ? kg.granular : kg.default), i || (i = v ? Sg.granular : Sg.default), m < 1)) {
    const e = Og(y, m);
    b = (t) => {
      const n = Math.exp(-m * y * t);
      return o - n * (((p + m * y * g) / e) * Math.sin(e * t) + g * Math.cos(e * t));
    };
  } else if (1 === m) b = (e) => o - Math.exp(-y * e) * (g + (p + y * g) * e);
  else {
    const e = y * Math.sqrt(m * m - 1);
    b = (t) => {
      const n = Math.exp(-m * y * t),
        r = Math.min(e * t, 300);
      return o - (n * ((p + m * y * g) * Math.sinh(r) + e * g * Math.cosh(r))) / e;
    };
  }
  const w = {
    calculatedDuration: (h && d) || null,
    next: (e) => {
      const t = b(e);
      if (h) s.done = e >= d;
      else {
        let n = 0;
        m < 1 && (n = 0 === e ? gp(p) : pg(b, e, t));
        const a = Math.abs(n) <= r,
          l = Math.abs(o - t) <= i;
        s.done = a && l;
      }
      return (s.value = s.done ? o : t), s;
    },
    toString: () => {
      const e = Math.min(Lg(w), Dg),
        t = fg((t) => w.next(e * t).value, e, 30);
      return e + 'ms ' + t;
    },
  };
  return w;
}
function Vg({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: a = 500,
  modifyTarget: o,
  min: s,
  max: l,
  restDelta: u = 0.5,
  restSpeed: c,
}) {
  const d = e[0],
    f = { done: !1, value: d },
    h = (e) => (void 0 === s ? l : void 0 === l || Math.abs(s - e) < Math.abs(l - e) ? s : l);
  let p = n * t;
  const m = d + p,
    g = void 0 === o ? m : o(m);
  g !== m && (p = g - d);
  const y = (e) => -p * Math.exp(-e / r),
    v = (e) => g + y(e),
    b = (e) => {
      const t = y(e),
        n = v(e);
      (f.done = Math.abs(t) <= u), (f.value = f.done ? g : n);
    };
  let w, x;
  const k = (e) => {
    var t;
    ((t = f.value), (void 0 !== s && t < s) || (void 0 !== l && t > l)) &&
      ((w = e),
      (x = jg({
        keyframes: [f.value, h(f.value)],
        velocity: pg(v, e, f.value),
        damping: i,
        stiffness: a,
        restDelta: u,
        restSpeed: c,
      })));
  };
  return (
    k(0),
    {
      calculatedDuration: null,
      next: (e) => {
        let t = !1;
        return (
          x || void 0 !== w || ((t = !0), b(e), k(e)),
          void 0 !== w && e >= w ? x.next(e - w) : (!t && b(e), f)
        );
      },
    }
  );
}
const Ig = Mp(0.42, 0, 1, 1),
  zg = Mp(0, 0, 0.58, 1),
  Bg = Mp(0.42, 0, 0.58, 1),
  Ug = (e) => Array.isArray(e) && 'number' == typeof e[0],
  $g = {
    linear: Cp,
    easeIn: Ig,
    easeInOut: Bg,
    easeOut: zg,
    circIn: Up,
    circInOut: Zp,
    circOut: $p,
    backIn: Ip,
    backInOut: zp,
    backOut: Vp,
    anticipate: Bp,
  },
  Zg = (e) => {
    if (Ug(e)) {
      Tp(4 === e.length);
      const [t, n, r, i] = e;
      return Mp(t, n, r, i);
    }
    return 'string' == typeof e ? $g[e] : e;
  },
  Wg = (e, t) => (n) => t(e(n)),
  Hg = (...e) => e.reduce(Wg),
  qg = (e, t, n) => e + (t - e) * n;
function Kg(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? e + 6 * (t - e) * n : n < 0.5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  );
}
function Yg(e, t) {
  return (n) => (n > 0 ? t : e);
}
const Xg = (e, t, n) => {
    const r = e * e,
      i = n * (t * t - r) + r;
    return i < 0 ? 0 : Math.sqrt(i);
  },
  Qg = [Nm, Lm, Mm];
function Gg(e) {
  const t = ((n = e), Qg.find((e) => e.test(n)));
  var n;
  if (!Boolean(t)) return !1;
  let r = t.parse(e);
  return (
    t === Mm &&
      (r = (function ({ hue: e, saturation: t, lightness: n, alpha: r }) {
        (e /= 360), (n /= 100);
        let i = 0,
          a = 0,
          o = 0;
        if ((t /= 100)) {
          const r = n < 0.5 ? n * (1 + t) : n + t - n * t,
            s = 2 * n - r;
          (i = Kg(s, r, e + 1 / 3)), (a = Kg(s, r, e)), (o = Kg(s, r, e - 1 / 3));
        } else i = a = o = n;
        return {
          red: Math.round(255 * i),
          green: Math.round(255 * a),
          blue: Math.round(255 * o),
          alpha: r,
        };
      })(r)),
    r
  );
}
const Jg = (e, t) => {
    const n = Gg(e),
      r = Gg(t);
    if (!n || !r) return Yg(e, t);
    const i = { ...n };
    return (e) => (
      (i.red = Xg(n.red, r.red, e)),
      (i.green = Xg(n.green, r.green, e)),
      (i.blue = Xg(n.blue, r.blue, e)),
      (i.alpha = qg(n.alpha, r.alpha, e)),
      Lm.transform(i)
    );
  },
  ey = new Set(['none', 'hidden']);
function ty(e, t) {
  return (n) => qg(e, t, n);
}
function ny(e) {
  return 'number' == typeof e
    ? ty
    : 'string' == typeof e
      ? Xp(e)
        ? Yg
        : Fm.test(e)
          ? Jg
          : ay
      : Array.isArray(e)
        ? ry
        : 'object' == typeof e
          ? Fm.test(e)
            ? Jg
            : iy
          : Yg;
}
function ry(e, t) {
  const n = [...e],
    r = n.length,
    i = e.map((e, n) => ny(e)(e, t[n]));
  return (e) => {
    for (let t = 0; t < r; t++) n[t] = i[t](e);
    return n;
  };
}
function iy(e, t) {
  const n = { ...e, ...t },
    r = {};
  for (const i in n) void 0 !== e[i] && void 0 !== t[i] && (r[i] = ny(e[i])(e[i], t[i]));
  return (e) => {
    for (const t in r) n[t] = r[t](e);
    return n;
  };
}
const ay = (e, t) => {
  const n = Wm.createTransformer(t),
    r = Bm(e),
    i = Bm(t);
  return r.indexes.var.length === i.indexes.var.length &&
    r.indexes.color.length === i.indexes.color.length &&
    r.indexes.number.length >= i.indexes.number.length
    ? (ey.has(e) && !i.values.length) || (ey.has(t) && !r.values.length)
      ? (function (e, t) {
          return ey.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e);
        })(e, t)
      : Hg(
          ry(
            (function (e, t) {
              var n;
              const r = [],
                i = { color: 0, var: 0, number: 0 };
              for (let a = 0; a < t.values.length; a++) {
                const o = t.types[a],
                  s = e.indexes[o][i[o]],
                  l = null !== (n = e.values[s]) && void 0 !== n ? n : 0;
                (r[a] = l), i[o]++;
              }
              return r;
            })(r, i),
            i.values
          ),
          n
        )
    : Yg(e, t);
};
function oy(e, t, n) {
  if ('number' == typeof e && 'number' == typeof t && 'number' == typeof n) return qg(e, t, n);
  return ny(e)(e, t);
}
function sy(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  const a = e.length;
  if ((Tp(a === t.length), 1 === a)) return () => t[0];
  if (2 === a && e[0] === e[1]) return () => t[1];
  e[0] > e[a - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  const o = (function (e, t, n) {
      const r = [],
        i = n || oy,
        a = e.length - 1;
      for (let o = 0; o < a; o++) {
        let n = i(e[o], e[o + 1]);
        if (t) {
          const e = Array.isArray(t) ? t[o] || Cp : t;
          n = Hg(e, n);
        }
        r.push(n);
      }
      return r;
    })(t, r, i),
    s = o.length,
    l = (t) => {
      let n = 0;
      if (s > 1) for (; n < e.length - 2 && !(t < e[n + 1]); n++);
      const r = dg(e[n], e[n + 1], t);
      return o[n](r);
    };
  return n ? (t) => l(em(e[0], e[a - 1], t)) : l;
}
function ly(e) {
  const t = [0];
  return (
    (function (e, t) {
      const n = e[e.length - 1];
      for (let r = 1; r <= t; r++) {
        const i = dg(0, t, r);
        e.push(qg(n, 1, i));
      }
    })(t, e.length - 1),
    t
  );
}
function uy({ duration: e = 300, keyframes: t, times: n, ease: r = 'easeInOut' }) {
  const i = ((e) => Array.isArray(e) && 'number' != typeof e[0])(r) ? r.map(Zg) : Zg(r),
    a = { done: !1, value: t[0] },
    o = (function (e, t) {
      return e.map((e) => e * t);
    })(n && n.length === t.length ? n : ly(t), e),
    s = sy(o, t, {
      ease: Array.isArray(i) ? i : ((l = t), (u = i), l.map(() => u || Bg).splice(0, l.length - 1)),
    });
  var l, u;
  return { calculatedDuration: e, next: (t) => ((a.value = s(t)), (a.done = t >= e), a) };
}
const cy = (e) => {
    const t = ({ timestamp: t }) => e(t);
    return {
      start: () => Rp.update(t, !0),
      stop: () => Op(t),
      now: () => (Dp.isProcessing ? Dp.timestamp : lg.now()),
    };
  },
  dy = { decay: Vg, inertia: Vg, tween: uy, keyframes: uy, spring: jg },
  fy = (e) => e / 100;
class hy extends cg {
  constructor(e) {
    super(e),
      (this.holdTime = null),
      (this.cancelTime = null),
      (this.currentTime = 0),
      (this.playbackSpeed = 1),
      (this.pendingPlayState = 'running'),
      (this.startTime = null),
      (this.state = 'idle'),
      (this.stop = () => {
        if ((this.resolver.cancel(), (this.isStopped = !0), 'idle' === this.state)) return;
        this.teardown();
        const { onStop: e } = this.options;
        e && e();
      });
    const { name: t, motionValue: n, element: r, keyframes: i } = this.options,
      a = (null == r ? void 0 : r.KeyframeResolver) || Cm;
    (this.resolver = new a(i, (e, t) => this.onKeyframesResolved(e, t), t, n, r)),
      this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(),
      this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(e) {
    const {
        type: t = 'keyframes',
        repeat: n = 0,
        repeatDelay: r = 0,
        repeatType: i,
        velocity: a = 0,
      } = this.options,
      o = ag(t) ? t : dy[t] || uy;
    let s, l;
    o !== uy && 'number' != typeof e[0] && ((s = Hg(fy, oy(e[0], e[1]))), (e = [0, 100]));
    const u = o({ ...this.options, keyframes: e });
    'mirror' === i && (l = o({ ...this.options, keyframes: [...e].reverse(), velocity: -a })),
      null === u.calculatedDuration && (u.calculatedDuration = Lg(u));
    const { calculatedDuration: c } = u,
      d = c + r;
    return {
      generator: u,
      mirroredGenerator: l,
      mapPercentToKeyframes: s,
      calculatedDuration: c,
      resolvedDuration: d,
      totalDuration: d * (n + 1) - r,
    };
  }
  onPostResolved() {
    const { autoplay: e = !0 } = this.options;
    this.play(),
      'paused' !== this.pendingPlayState && e ? (this.state = this.pendingPlayState) : this.pause();
  }
  tick(e, t = !1) {
    const { resolved: n } = this;
    if (!n) {
      const { keyframes: e } = this.options;
      return { done: !0, value: e[e.length - 1] };
    }
    const {
      finalKeyframe: r,
      generator: i,
      mirroredGenerator: a,
      mapPercentToKeyframes: o,
      keyframes: s,
      calculatedDuration: l,
      totalDuration: u,
      resolvedDuration: c,
    } = n;
    if (null === this.startTime) return i.next(0);
    const { delay: d, repeat: f, repeatType: h, repeatDelay: p, onUpdate: m } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, e))
      : this.speed < 0 && (this.startTime = Math.min(e - u / this.speed, this.startTime)),
      t
        ? (this.currentTime = e)
        : null !== this.holdTime
          ? (this.currentTime = this.holdTime)
          : (this.currentTime = Math.round(e - this.startTime) * this.speed);
    const g = this.currentTime - d * (this.speed >= 0 ? 1 : -1),
      y = this.speed >= 0 ? g < 0 : g > u;
    (this.currentTime = Math.max(g, 0)),
      'finished' === this.state && null === this.holdTime && (this.currentTime = u);
    let v = this.currentTime,
      b = i;
    if (f) {
      const e = Math.min(this.currentTime, u) / c;
      let t = Math.floor(e),
        n = e % 1;
      !n && e >= 1 && (n = 1), 1 === n && t--, (t = Math.min(t, f + 1));
      Boolean(t % 2) &&
        ('reverse' === h ? ((n = 1 - n), p && (n -= p / c)) : 'mirror' === h && (b = a)),
        (v = em(0, 1, n) * c);
    }
    const w = y ? { done: !1, value: s[0] } : b.next(v);
    o && (w.value = o(w.value));
    let { done: x } = w;
    y || null === l || (x = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
    const k =
      null === this.holdTime && ('finished' === this.state || ('running' === this.state && x));
    return (
      k && void 0 !== r && (w.value = Ep(s, this.options, r)),
      m && m(w.value),
      k && this.finish(),
      w
    );
  }
  get duration() {
    const { resolved: e } = this;
    return e ? yp(e.calculatedDuration) : 0;
  }
  get time() {
    return yp(this.currentTime);
  }
  set time(e) {
    (e = gp(e)),
      (this.currentTime = e),
      null !== this.holdTime || 0 === this.speed
        ? (this.holdTime = e)
        : this.driver && (this.startTime = this.driver.now() - e / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const t = this.playbackSpeed !== e;
    (this.playbackSpeed = e), t && (this.time = yp(this.currentTime));
  }
  play() {
    if ((this.resolver.isScheduled || this.resolver.resume(), !this._resolved))
      return void (this.pendingPlayState = 'running');
    if (this.isStopped) return;
    const { driver: e = cy, onPlay: t, startTime: n } = this.options;
    this.driver || (this.driver = e((e) => this.tick(e))), t && t();
    const r = this.driver.now();
    null !== this.holdTime
      ? (this.startTime = r - this.holdTime)
      : this.startTime
        ? 'finished' === this.state && (this.startTime = r)
        : (this.startTime = null != n ? n : this.calcStartTime()),
      'finished' === this.state && this.updateFinishedPromise(),
      (this.cancelTime = this.startTime),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start();
  }
  pause() {
    var e;
    this._resolved
      ? ((this.state = 'paused'),
        (this.holdTime = null !== (e = this.currentTime) && void 0 !== e ? e : 0))
      : (this.pendingPlayState = 'paused');
  }
  complete() {
    'running' !== this.state && this.play(),
      (this.pendingPlayState = this.state = 'finished'),
      (this.holdTime = null);
  }
  finish() {
    this.teardown(), (this.state = 'finished');
    const { onComplete: e } = this.options;
    e && e();
  }
  cancel() {
    null !== this.cancelTime && this.tick(this.cancelTime),
      this.teardown(),
      this.updateFinishedPromise();
  }
  teardown() {
    (this.state = 'idle'),
      this.stopDriver(),
      this.resolveFinishedPromise(),
      this.updateFinishedPromise(),
      (this.startTime = this.cancelTime = null),
      this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(e) {
    return (this.startTime = 0), this.tick(e, !0);
  }
}
const py = new Set(['opacity', 'clipPath', 'filter', 'transform']);
function my(e) {
  let t;
  return () => (void 0 === t && (t = e()), t);
}
const gy = { linearEasing: void 0 };
function yy(e, t) {
  const n = my(e);
  return () => {
    var e;
    return null !== (e = gy[t]) && void 0 !== e ? e : n();
  };
}
const vy = yy(() => {
  try {
    document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
  } catch (e) {
    return !1;
  }
  return !0;
}, 'linearEasing');
function by(e) {
  return Boolean(
    ('function' == typeof e && vy()) ||
      !e ||
      ('string' == typeof e && (e in xy || vy())) ||
      Ug(e) ||
      (Array.isArray(e) && e.every(by))
  );
}
const wy = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  xy = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: wy([0, 0.65, 0.55, 1]),
    circOut: wy([0.55, 0, 1, 0.45]),
    backIn: wy([0.31, 0.01, 0.66, -0.59]),
    backOut: wy([0.33, 1.53, 0.69, 0.99]),
  };
function ky(e, t) {
  return e
    ? 'function' == typeof e && vy()
      ? fg(e, t)
      : Ug(e)
        ? wy(e)
        : Array.isArray(e)
          ? e.map((e) => ky(e, t) || xy.easeOut)
          : xy[e]
    : void 0;
}
function Sy(
  e,
  t,
  n,
  {
    delay: r = 0,
    duration: i = 300,
    repeat: a = 0,
    repeatType: o = 'loop',
    ease: s = 'easeInOut',
    times: l,
  } = {}
) {
  const u = { [t]: n };
  l && (u.offset = l);
  const c = ky(s, i);
  return (
    Array.isArray(c) && (u.easing = c),
    e.animate(u, {
      delay: r,
      duration: i,
      easing: Array.isArray(c) ? 'linear' : c,
      fill: 'both',
      iterations: a + 1,
      direction: 'reverse' === o ? 'alternate' : 'normal',
    })
  );
}
function _y(e, t) {
  (e.timeline = t), (e.onfinish = null);
}
const Ey = my(() => Object.hasOwnProperty.call(Element.prototype, 'animate'));
const Cy = { anticipate: Bp, backInOut: zp, circInOut: Zp };
class Ty extends cg {
  constructor(e) {
    super(e);
    const { name: t, motionValue: n, element: r, keyframes: i } = this.options;
    (this.resolver = new ig(i, (e, t) => this.onKeyframesResolved(e, t), t, n, r)),
      this.resolver.scheduleResolve();
  }
  initPlayback(e, t) {
    var n;
    let {
      duration: r = 300,
      times: i,
      ease: a,
      type: o,
      motionValue: s,
      name: l,
      startTime: u,
    } = this.options;
    if (!(null === (n = s.owner) || void 0 === n ? void 0 : n.current)) return !1;
    var c;
    if (
      ('string' == typeof a && vy() && a in Cy && (a = Cy[a]),
      ag((c = this.options).type) || 'spring' === c.type || !by(c.ease))
    ) {
      const { onComplete: t, onUpdate: n, motionValue: s, element: l, ...u } = this.options,
        c = (function (e, t) {
          const n = new hy({ ...t, keyframes: e, repeat: 0, delay: 0, isGenerator: !0 });
          let r = { done: !1, value: e[0] };
          const i = [];
          let a = 0;
          for (; !r.done && a < 2e4; ) (r = n.sample(a)), i.push(r.value), (a += 10);
          return { times: void 0, keyframes: i, duration: a - 10, ease: 'linear' };
        })(e, u);
      1 === (e = c.keyframes).length && (e[1] = e[0]),
        (r = c.duration),
        (i = c.times),
        (a = c.ease),
        (o = 'keyframes');
    }
    const d = Sy(s.owner.current, l, e, { ...this.options, duration: r, times: i, ease: a });
    return (
      (d.startTime = null != u ? u : this.calcStartTime()),
      this.pendingTimeline
        ? (_y(d, this.pendingTimeline), (this.pendingTimeline = void 0))
        : (d.onfinish = () => {
            const { onComplete: n } = this.options;
            s.set(Ep(e, this.options, t)), n && n(), this.cancel(), this.resolveFinishedPromise();
          }),
      { animation: d, duration: r, times: i, type: o, ease: a, keyframes: e }
    );
  }
  get duration() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { duration: t } = e;
    return yp(t);
  }
  get time() {
    const { resolved: e } = this;
    if (!e) return 0;
    const { animation: t } = e;
    return yp(t.currentTime || 0);
  }
  set time(e) {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.currentTime = gp(e);
  }
  get speed() {
    const { resolved: e } = this;
    if (!e) return 1;
    const { animation: t } = e;
    return t.playbackRate;
  }
  set speed(e) {
    const { resolved: t } = this;
    if (!t) return;
    const { animation: n } = t;
    n.playbackRate = e;
  }
  get state() {
    const { resolved: e } = this;
    if (!e) return 'idle';
    const { animation: t } = e;
    return t.playState;
  }
  get startTime() {
    const { resolved: e } = this;
    if (!e) return null;
    const { animation: t } = e;
    return t.startTime;
  }
  attachTimeline(e) {
    if (this._resolved) {
      const { resolved: t } = this;
      if (!t) return Cp;
      const { animation: n } = t;
      _y(n, e);
    } else this.pendingTimeline = e;
    return Cp;
  }
  play() {
    if (this.isStopped) return;
    const { resolved: e } = this;
    if (!e) return;
    const { animation: t } = e;
    'finished' === t.playState && this.updateFinishedPromise(), t.play();
  }
  pause() {
    const { resolved: e } = this;
    if (!e) return;
    const { animation: t } = e;
    t.pause();
  }
  stop() {
    if ((this.resolver.cancel(), (this.isStopped = !0), 'idle' === this.state)) return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: e } = this;
    if (!e) return;
    const { animation: t, keyframes: n, duration: r, type: i, ease: a, times: o } = e;
    if ('idle' === t.playState || 'finished' === t.playState) return;
    if (this.time) {
      const { motionValue: e, onUpdate: t, onComplete: s, element: l, ...u } = this.options,
        c = new hy({
          ...u,
          keyframes: n,
          duration: r,
          type: i,
          ease: a,
          times: o,
          isGenerator: !0,
        }),
        d = gp(this.time);
      e.setWithVelocity(c.sample(d - 10).value, c.sample(d).value, 10);
    }
    const { onStop: s } = this.options;
    s && s(), this.cancel();
  }
  complete() {
    const { resolved: e } = this;
    e && e.animation.finish();
  }
  cancel() {
    const { resolved: e } = this;
    e && e.animation.cancel();
  }
  static supports(e) {
    const { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o } = e;
    return (
      Ey() &&
      n &&
      py.has(n) &&
      t &&
      t.owner &&
      t.owner.current instanceof HTMLElement &&
      !t.owner.getProps().onUpdate &&
      !r &&
      'mirror' !== i &&
      0 !== a &&
      'inertia' !== o
    );
  }
}
const Py = my(() => void 0 !== window.ScrollTimeline);
class Ay {
  constructor(e) {
    (this.stop = () => this.runAll('stop')), (this.animations = e.filter(Boolean));
  }
  then(e, t) {
    return Promise.all(this.animations).then(e).catch(t);
  }
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, t) {
    for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
  }
  attachTimeline(e, t) {
    const n = this.animations.map((n) => (Py() && n.attachTimeline ? n.attachTimeline(e) : t(n)));
    return () => {
      n.forEach((e, t) => {
        e && e(), this.animations[t].stop();
      });
    };
  }
  get time() {
    return this.getAll('time');
  }
  set time(e) {
    this.setAll('time', e);
  }
  get speed() {
    return this.getAll('speed');
  }
  set speed(e) {
    this.setAll('speed', e);
  }
  get startTime() {
    return this.getAll('startTime');
  }
  get duration() {
    let e = 0;
    for (let t = 0; t < this.animations.length; t++) e = Math.max(e, this.animations[t].duration);
    return e;
  }
  runAll(e) {
    this.animations.forEach((t) => t[e]());
  }
  flatten() {
    this.runAll('flatten');
  }
  play() {
    this.runAll('play');
  }
  pause() {
    this.runAll('pause');
  }
  cancel() {
    this.runAll('cancel');
  }
  complete() {
    this.runAll('complete');
  }
}
const Ry =
  (e, t, n, r = {}, i, a) =>
  (o) => {
    const s = kp(r, e) || {},
      l = s.delay || r.delay || 0;
    let { elapsed: u = 0 } = r;
    u -= gp(l);
    let c = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: 'easeOut',
      velocity: t.getVelocity(),
      ...s,
      delay: -u,
      onUpdate: (e) => {
        t.set(e), s.onUpdate && s.onUpdate(e);
      },
      onComplete: () => {
        o(), s.onComplete && s.onComplete();
      },
      name: e,
      motionValue: t,
      element: a ? void 0 : i,
    };
    (function ({
      when: e,
      delay: t,
      delayChildren: n,
      staggerChildren: r,
      staggerDirection: i,
      repeat: a,
      repeatType: o,
      repeatDelay: s,
      from: l,
      elapsed: u,
      ...c
    }) {
      return !!Object.keys(c).length;
    })(s) || (c = { ...c, ...xp(e, c) }),
      c.duration && (c.duration = gp(c.duration)),
      c.repeatDelay && (c.repeatDelay = gp(c.repeatDelay)),
      void 0 !== c.from && (c.keyframes[0] = c.from);
    let d = !1;
    if (
      ((!1 === c.type || (0 === c.duration && !c.repeatDelay)) &&
        ((c.duration = 0), 0 === c.delay && (d = !0)),
      d && !a && void 0 !== t.get())
    ) {
      const e = Ep(c.keyframes, s);
      if (void 0 !== e)
        return (
          Rp.update(() => {
            c.onUpdate(e), c.onComplete();
          }),
          new Ay([])
        );
    }
    return !a && Ty.supports(c) ? new Ty(c) : new hy(c);
  };
function Oy(e, t) {
  -1 === e.indexOf(t) && e.push(t);
}
function Dy(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
class Ly {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Oy(this.subscriptions, e), () => Dy(this.subscriptions, e);
  }
  notify(e, t, n) {
    const r = this.subscriptions.length;
    if (r)
      if (1 === r) this.subscriptions[0](e, t, n);
      else
        for (let i = 0; i < r; i++) {
          const r = this.subscriptions[i];
          r && r(e, t, n);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
class Ny {
  constructor(e, t = {}) {
    (this.version = '11.15.0'),
      (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (e, t = !0) => {
        const n = lg.now();
        this.updatedAt !== n && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(e),
          this.current !== this.prev &&
            this.events.change &&
            this.events.change.notify(this.current),
          t && this.events.renderRequest && this.events.renderRequest.notify(this.current);
      }),
      (this.hasAnimated = !1),
      this.setCurrent(e),
      (this.owner = t.owner);
  }
  setCurrent(e) {
    var t;
    (this.current = e),
      (this.updatedAt = lg.now()),
      null === this.canTrackVelocity &&
        void 0 !== e &&
        (this.canTrackVelocity = ((t = this.current), !isNaN(parseFloat(t))));
  }
  setPrevFrameValue(e = this.current) {
    (this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(e) {
    return this.on('change', e);
  }
  on(e, t) {
    this.events[e] || (this.events[e] = new Ly());
    const n = this.events[e].add(t);
    return 'change' === e
      ? () => {
          n(),
            Rp.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : n;
  }
  clearListeners() {
    for (const e in this.events) this.events[e].clear();
  }
  attach(e, t) {
    (this.passiveEffect = e), (this.stopPassiveEffect = t);
  }
  set(e, t = !0) {
    t && this.passiveEffect
      ? this.passiveEffect(e, this.updateAndNotify)
      : this.updateAndNotify(e, t);
  }
  setWithVelocity(e, t, n) {
    this.set(t),
      (this.prev = void 0),
      (this.prevFrameValue = e),
      (this.prevUpdatedAt = this.updatedAt - n);
  }
  jump(e, t = !0) {
    this.updateAndNotify(e),
      (this.prev = e),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      t && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const e = lg.now();
    if (!this.canTrackVelocity || void 0 === this.prevFrameValue || e - this.updatedAt > 30)
      return 0;
    const t = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
    return hg(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
  }
  start(e) {
    return (
      this.stop(),
      new Promise((t) => {
        (this.hasAnimated = !0),
          (this.animation = e(t)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function My(e, t) {
  return new Ny(e, t);
}
function Fy(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, My(n));
}
const jy = (e) => e.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
  Vy = 'data-' + jy('framerAppearId');
function Iy(e) {
  return e.props[Vy];
}
const zy = (e) => Boolean(e && e.getVelocity);
function By(e, t) {
  const n = e.getValue('willChange');
  if (((r = n), Boolean(zy(r) && r.add))) return n.add(t);
  var r;
}
function Uy({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && !0 !== t[n];
  return (t[n] = !1), r;
}
function $y(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  var a;
  let { transition: o = e.getDefaultTransition(), transitionEnd: s, ...l } = t;
  r && (o = r);
  const u = [],
    c = i && e.animationState && e.animationState.getState()[i];
  for (const d in l) {
    const t = e.getValue(d, null !== (a = e.latestValues[d]) && void 0 !== a ? a : null),
      r = l[d];
    if (void 0 === r || (c && Uy(c, d))) continue;
    const i = { delay: n, ...kp(o || {}, d) };
    let s = !1;
    if (window.MotionHandoffAnimation) {
      const t = Iy(e);
      if (t) {
        const e = window.MotionHandoffAnimation(t, d, Rp);
        null !== e && ((i.startTime = e), (s = !0));
      }
    }
    By(e, d), t.start(Ry(d, t, r, e.shouldReduceMotion && mp.has(d) ? { type: !1 } : i, e, s));
    const f = t.animation;
    f && u.push(f);
  }
  return (
    s &&
      Promise.all(u).then(() => {
        Rp.update(() => {
          s &&
            (function (e, t) {
              const n = dp(e, t);
              let { transitionEnd: r = {}, transition: i = {}, ...a } = n || {};
              a = { ...a, ...r };
              for (const s in a) Fy(e, s, ((o = a[s]), op(o) ? o[o.length - 1] || 0 : o));
              var o;
            })(e, s);
        });
      }),
    u
  );
}
function Zy(e, t, n = {}) {
  var r;
  const i = dp(
    e,
    t,
    'exit' === n.type
      ? null === (r = e.presenceContext) || void 0 === r
        ? void 0
        : r.custom
      : void 0
  );
  let { transition: a = e.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (a = n.transitionOverride);
  const o = i ? () => Promise.all($y(e, i, n)) : () => Promise.resolve(),
    s =
      e.variantChildren && e.variantChildren.size
        ? (r = 0) => {
            const { delayChildren: i = 0, staggerChildren: o, staggerDirection: s } = a;
            return (function (e, t, n = 0, r = 0, i = 1, a) {
              const o = [],
                s = (e.variantChildren.size - 1) * r,
                l = 1 === i ? (e = 0) => e * r : (e = 0) => s - e * r;
              return (
                Array.from(e.variantChildren)
                  .sort(Wy)
                  .forEach((e, r) => {
                    e.notify('AnimationStart', t),
                      o.push(
                        Zy(e, t, { ...a, delay: n + l(r) }).then(() =>
                          e.notify('AnimationComplete', t)
                        )
                      );
                  }),
                Promise.all(o)
              );
            })(e, t, i + r, o, s, n);
          }
        : () => Promise.resolve(),
    { when: l } = a;
  if (l) {
    const [e, t] = 'beforeChildren' === l ? [o, s] : [s, o];
    return e().then(() => t());
  }
  return Promise.all([o(), s(n.delay)]);
}
function Wy(e, t) {
  return e.sortNodePosition(t);
}
const Hy = hp.length;
function qy(e) {
  if (!e) return;
  if (!e.isControllingVariants) {
    const t = (e.parent && qy(e.parent)) || {};
    return void 0 !== e.props.initial && (t.initial = e.props.initial), t;
  }
  const t = {};
  for (let n = 0; n < Hy; n++) {
    const r = hp[n],
      i = e.props[r];
    (lp(i) || !1 === i) && (t[r] = i);
  }
  return t;
}
const Ky = [...fp].reverse(),
  Yy = fp.length;
function Xy(e) {
  return (t) =>
    Promise.all(
      t.map(({ animation: t, options: n }) =>
        (function (e, t, n = {}) {
          let r;
          if ((e.notify('AnimationStart', t), Array.isArray(t))) {
            const i = t.map((t) => Zy(e, t, n));
            r = Promise.all(i);
          } else if ('string' == typeof t) r = Zy(e, t, n);
          else {
            const i = 'function' == typeof t ? dp(e, t, n.custom) : t;
            r = Promise.all($y(e, i, n));
          }
          return r.then(() => {
            e.notify('AnimationComplete', t);
          });
        })(e, t, n)
      )
    );
}
function Qy(e) {
  let t = Xy(e),
    n = ev(),
    r = !0;
  const i = (t) => (n, r) => {
    var i;
    const a = dp(
      e,
      r,
      'exit' === t ? (null === (i = e.presenceContext) || void 0 === i ? void 0 : i.custom) : void 0
    );
    if (a) {
      const { transition: e, transitionEnd: t, ...r } = a;
      n = { ...n, ...r, ...t };
    }
    return n;
  };
  function a(a) {
    const { props: o } = e,
      s = qy(e.parent) || {},
      l = [],
      u = new Set();
    let c = {},
      d = 1 / 0;
    for (let t = 0; t < Yy; t++) {
      const f = Ky[t],
        h = n[f],
        p = void 0 !== o[f] ? o[f] : s[f],
        m = lp(p),
        g = f === a ? h.isActive : null;
      !1 === g && (d = t);
      let y = p === s[f] && p !== o[f] && m;
      if (
        (y && r && e.manuallyAnimateOnMount && (y = !1),
        (h.protectedKeys = { ...c }),
        (!h.isActive && null === g) || (!p && !h.prevProp) || ap(p) || 'boolean' == typeof p)
      )
        continue;
      const v = Gy(h.prevProp, p);
      let b = v || (f === a && h.isActive && !y && m) || (t > d && m),
        w = !1;
      const x = Array.isArray(p) ? p : [p];
      let k = x.reduce(i(f), {});
      !1 === g && (k = {});
      const { prevResolvedValues: S = {} } = h,
        _ = { ...S, ...k },
        E = (t) => {
          (b = !0), u.has(t) && ((w = !0), u.delete(t)), (h.needsAnimating[t] = !0);
          const n = e.getValue(t);
          n && (n.liveStyle = !1);
        };
      for (const e in _) {
        const t = k[e],
          n = S[e];
        if (c.hasOwnProperty(e)) continue;
        let r = !1;
        (r = op(t) && op(n) ? !sp(t, n) : t !== n),
          r
            ? null != t
              ? E(e)
              : u.add(e)
            : void 0 !== t && u.has(e)
              ? E(e)
              : (h.protectedKeys[e] = !0);
      }
      (h.prevProp = p),
        (h.prevResolvedValues = k),
        h.isActive && (c = { ...c, ...k }),
        r && e.blockInitialAnimation && (b = !1);
      b && (!(y && v) || w) && l.push(...x.map((e) => ({ animation: e, options: { type: f } })));
    }
    if (u.size) {
      const t = {};
      u.forEach((n) => {
        const r = e.getBaseTarget(n),
          i = e.getValue(n);
        i && (i.liveStyle = !0), (t[n] = null != r ? r : null);
      }),
        l.push({ animation: t });
    }
    let f = Boolean(l.length);
    return (
      !r || (!1 !== o.initial && o.initial !== o.animate) || e.manuallyAnimateOnMount || (f = !1),
      (r = !1),
      f ? t(l) : Promise.resolve()
    );
  }
  return {
    animateChanges: a,
    setActive: function (t, r) {
      var i;
      if (n[t].isActive === r) return Promise.resolve();
      null === (i = e.variantChildren) ||
        void 0 === i ||
        i.forEach((e) => {
          var n;
          return null === (n = e.animationState) || void 0 === n ? void 0 : n.setActive(t, r);
        }),
        (n[t].isActive = r);
      const o = a(t);
      for (const e in n) n[e].protectedKeys = {};
      return o;
    },
    setAnimateFunction: function (n) {
      t = n(e);
    },
    getState: () => n,
    reset: () => {
      (n = ev()), (r = !0);
    },
  };
}
function Gy(e, t) {
  return 'string' == typeof t ? t !== e : !!Array.isArray(t) && !sp(t, e);
}
function Jy(e = !1) {
  return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} };
}
function ev() {
  return {
    animate: Jy(!0),
    whileInView: Jy(),
    whileHover: Jy(),
    whileTap: Jy(),
    whileDrag: Jy(),
    whileFocus: Jy(),
    exit: Jy(),
  };
}
class tv {
  constructor(e) {
    (this.isMounted = !1), (this.node = e);
  }
  update() {}
}
let nv = 0;
const rv = {
    animation: {
      Feature: class extends tv {
        constructor(e) {
          super(e), e.animationState || (e.animationState = Qy(e));
        }
        updateAnimationControlsSubscription() {
          const { animate: e } = this.node.getProps();
          ap(e) && (this.unmountControls = e.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          const { animate: e } = this.node.getProps(),
            { animate: t } = this.node.prevProps || {};
          e !== t && this.updateAnimationControlsSubscription();
        }
        unmount() {
          var e;
          this.node.animationState.reset(),
            null === (e = this.unmountControls) || void 0 === e || e.call(this);
        }
      },
    },
    exit: {
      Feature: class extends tv {
        constructor() {
          super(...arguments), (this.id = nv++);
        }
        update() {
          if (!this.node.presenceContext) return;
          const { isPresent: e, onExitComplete: t } = this.node.presenceContext,
            { isPresent: n } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || e === n) return;
          const r = this.node.animationState.setActive('exit', !e);
          t && !e && r.then(() => t(this.id));
        }
        mount() {
          const { register: e } = this.node.presenceContext || {};
          e && (this.unmount = e(this.id));
        }
        unmount() {}
      },
    },
  },
  iv = { x: !1, y: !1 };
function av() {
  return iv.x || iv.y;
}
function ov(e, t) {
  const n = (function (e, t, n) {
      var r;
      if (e instanceof Element) return [e];
      if ('string' == typeof e) {
        let i = document;
        t && (i = t.current);
        const a =
          null !== (r = null == n ? void 0 : n[e]) && void 0 !== r ? r : i.querySelectorAll(e);
        return a ? Array.from(a) : [];
      }
      return Array.from(e);
    })(e),
    r = new AbortController();
  return [n, { passive: !0, ...t, signal: r.signal }, () => r.abort()];
}
function sv(e) {
  return (t) => {
    'touch' === t.pointerType || av() || e(t);
  };
}
const lv = (e) =>
    'mouse' === e.pointerType ? 'number' != typeof e.button || e.button <= 0 : !1 !== e.isPrimary,
  uv = new WeakSet();
function cv(e) {
  return (t) => {
    'Enter' === t.key && e(t);
  };
}
function dv(e, t) {
  e.dispatchEvent(new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 }));
}
const fv = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']);
const hv = (e, t) => !!t && (e === t || hv(e, t.parentElement));
function pv(e) {
  return lv(e) && !av();
}
function mv(e, t, n = {}) {
  const [r, i, a] = ov(e, n),
    o = (e) => {
      const r = e.currentTarget;
      if (!pv(e) || uv.has(r)) return;
      uv.add(r);
      const a = t(e),
        o = (e, t) => {
          window.removeEventListener('pointerup', s),
            window.removeEventListener('pointercancel', l),
            pv(e) && uv.has(r) && (uv.delete(r), a && a(e, { success: t }));
        },
        s = (e) => {
          o(e, n.useGlobalTarget || hv(r, e.target));
        },
        l = (e) => {
          o(e, !1);
        };
      window.addEventListener('pointerup', s, i), window.addEventListener('pointercancel', l, i);
    };
  return (
    r.forEach((e) => {
      (function (e) {
        return fv.has(e.tagName) || -1 !== e.tabIndex;
      })(e) || (e.tabIndex = 0);
      (n.useGlobalTarget ? window : e).addEventListener('pointerdown', o, i),
        e.addEventListener(
          'focus',
          (e) =>
            ((e, t) => {
              const n = e.currentTarget;
              if (!n) return;
              const r = cv(() => {
                if (uv.has(n)) return;
                dv(n, 'down');
                const e = cv(() => {
                  dv(n, 'up');
                });
                n.addEventListener('keyup', e, t),
                  n.addEventListener('blur', () => dv(n, 'cancel'), t);
              });
              n.addEventListener('keydown', r, t),
                n.addEventListener('blur', () => n.removeEventListener('keydown', r), t);
            })(e, i),
          i
        );
    }),
    a
  );
}
function gv(e) {
  return { point: { x: e.pageX, y: e.pageY } };
}
function yv(e, t, n, r = { passive: !0 }) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
function vv(e, t, n, r) {
  return yv(
    e,
    t,
    (
      (e) => (t) =>
        lv(t) && e(t, gv(t))
    )(n),
    r
  );
}
const bv = (e, t) => Math.abs(e - t);
class wv {
  constructor(e, t, { transformPagePoint: n, contextWindow: r, dragSnapToOrigin: i = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!this.lastMoveEvent || !this.lastMoveEventInfo) return;
        const e = Sv(this.lastMoveEventInfo, this.history),
          t = null !== this.startEvent,
          n =
            (function (e, t) {
              const n = bv(e.x, t.x),
                r = bv(e.y, t.y);
              return Math.sqrt(n ** 2 + r ** 2);
            })(e.offset, { x: 0, y: 0 }) >= 3;
        if (!t && !n) return;
        const { point: r } = e,
          { timestamp: i } = Dp;
        this.history.push({ ...r, timestamp: i });
        const { onStart: a, onMove: o } = this.handlers;
        t || (a && a(this.lastMoveEvent, e), (this.startEvent = this.lastMoveEvent)),
          o && o(this.lastMoveEvent, e);
      }),
      (this.handlePointerMove = (e, t) => {
        (this.lastMoveEvent = e),
          (this.lastMoveEventInfo = xv(t, this.transformPagePoint)),
          Rp.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (e, t) => {
        this.end();
        const { onEnd: n, onSessionEnd: r, resumeAnimation: i } = this.handlers;
        if ((this.dragSnapToOrigin && i && i(), !this.lastMoveEvent || !this.lastMoveEventInfo))
          return;
        const a = Sv(
          'pointercancel' === e.type ? this.lastMoveEventInfo : xv(t, this.transformPagePoint),
          this.history
        );
        this.startEvent && n && n(e, a), r && r(e, a);
      }),
      !lv(e))
    )
      return;
    (this.dragSnapToOrigin = i),
      (this.handlers = t),
      (this.transformPagePoint = n),
      (this.contextWindow = r || window);
    const a = xv(gv(e), this.transformPagePoint),
      { point: o } = a,
      { timestamp: s } = Dp;
    this.history = [{ ...o, timestamp: s }];
    const { onSessionStart: l } = t;
    l && l(e, Sv(a, this.history)),
      (this.removeListeners = Hg(
        vv(this.contextWindow, 'pointermove', this.handlePointerMove),
        vv(this.contextWindow, 'pointerup', this.handlePointerUp),
        vv(this.contextWindow, 'pointercancel', this.handlePointerUp)
      ));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), Op(this.updatePoint);
  }
}
function xv(e, t) {
  return t ? { point: t(e.point) } : e;
}
function kv(e, t) {
  return { x: e.x - t.x, y: e.y - t.y };
}
function Sv({ point: e }, t) {
  return { point: e, delta: kv(e, Ev(t)), offset: kv(e, _v(t)), velocity: Cv(t, 0.1) };
}
function _v(e) {
  return e[0];
}
function Ev(e) {
  return e[e.length - 1];
}
function Cv(e, t) {
  if (e.length < 2) return { x: 0, y: 0 };
  let n = e.length - 1,
    r = null;
  const i = Ev(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > gp(t))); ) n--;
  if (!r) return { x: 0, y: 0 };
  const a = yp(i.timestamp - r.timestamp);
  if (0 === a) return { x: 0, y: 0 };
  const o = { x: (i.x - r.x) / a, y: (i.y - r.y) / a };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function Tv(e) {
  return e && 'object' == typeof e && Object.prototype.hasOwnProperty.call(e, 'current');
}
function Pv(e) {
  return e.max - e.min;
}
function Av(e, t, n, r = 0.5) {
  (e.origin = r),
    (e.originPoint = qg(t.min, t.max, e.origin)),
    (e.scale = Pv(n) / Pv(t)),
    (e.translate = qg(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= 0.9999 && e.scale <= 1.0001) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= -0.01 && e.translate <= 0.01) || isNaN(e.translate)) && (e.translate = 0);
}
function Rv(e, t, n, r) {
  Av(e.x, t.x, n.x, r ? r.originX : void 0), Av(e.y, t.y, n.y, r ? r.originY : void 0);
}
function Ov(e, t, n) {
  (e.min = n.min + t.min), (e.max = e.min + Pv(t));
}
function Dv(e, t, n) {
  (e.min = t.min - n.min), (e.max = e.min + Pv(t));
}
function Lv(e, t, n) {
  Dv(e.x, t.x, n.x), Dv(e.y, t.y, n.y);
}
function Nv(e, t, n) {
  return {
    min: void 0 !== t ? e.min + t : void 0,
    max: void 0 !== n ? e.max + n - (e.max - e.min) : void 0,
  };
}
function Mv(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r };
}
const Fv = 0.35;
function jv(e, t, n) {
  return { min: Vv(e, t), max: Vv(e, n) };
}
function Vv(e, t) {
  return 'number' == typeof e ? e : e[t] || 0;
}
const Iv = () => ({ x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
function zv(e) {
  return [e('x'), e('y')];
}
function Bv({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function Uv(e) {
  return void 0 === e || 1 === e;
}
function $v({ scale: e, scaleX: t, scaleY: n }) {
  return !Uv(e) || !Uv(t) || !Uv(n);
}
function Zv(e) {
  return $v(e) || Wv(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function Wv(e) {
  return Hv(e.x) || Hv(e.y);
}
function Hv(e) {
  return e && '0%' !== e;
}
function qv(e, t, n) {
  return n + t * (e - n);
}
function Kv(e, t, n, r, i) {
  return void 0 !== i && (e = qv(e, i, r)), qv(e, n, r) + t;
}
function Yv(e, t = 0, n = 1, r, i) {
  (e.min = Kv(e.min, t, n, r, i)), (e.max = Kv(e.max, t, n, r, i));
}
function Xv(e, { x: t, y: n }) {
  Yv(e.x, t.translate, t.scale, t.originPoint), Yv(e.y, n.translate, n.scale, n.originPoint);
}
const Qv = 0.999999999999,
  Gv = 1.0000000000001;
function Jv(e, t) {
  (e.min = e.min + t), (e.max = e.max + t);
}
function eb(e, t, n, r, i = 0.5) {
  Yv(e, t, n, qg(e.min, e.max, i), r);
}
function tb(e, t) {
  eb(e.x, t.x, t.scaleX, t.scale, t.originX), eb(e.y, t.y, t.scaleY, t.scale, t.originY);
}
function nb(e, t) {
  return Bv(
    (function (e, t) {
      if (!t) return e;
      const n = t({ x: e.left, y: e.top }),
        r = t({ x: e.right, y: e.bottom });
      return { top: n.y, left: n.x, bottom: r.y, right: r.x };
    })(e.getBoundingClientRect(), t)
  );
}
const rb = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  ib = new WeakMap();
class ab {
  constructor(e) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
      (this.visualElement = e);
  }
  start(e, { snapToCursor: t = !1 } = {}) {
    const { presenceContext: n } = this.visualElement;
    if (n && !1 === n.isPresent) return;
    const { dragSnapToOrigin: r } = this.getProps();
    this.panSession = new wv(
      e,
      {
        onSessionStart: (e) => {
          const { dragSnapToOrigin: n } = this.getProps();
          n ? this.pauseAnimation() : this.stopAnimation(), t && this.snapToCursor(gv(e).point);
        },
        onStart: (e, t) => {
          const { drag: n, dragPropagation: r, onDragStart: i } = this.getProps();
          if (
            n &&
            !r &&
            (this.openDragLock && this.openDragLock(),
            (this.openDragLock =
              'x' === (a = n) || 'y' === a
                ? iv[a]
                  ? null
                  : ((iv[a] = !0),
                    () => {
                      iv[a] = !1;
                    })
                : iv.x || iv.y
                  ? null
                  : ((iv.x = iv.y = !0),
                    () => {
                      iv.x = iv.y = !1;
                    })),
            !this.openDragLock)
          )
            return;
          var a;
          (this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            zv((e) => {
              let t = this.getAxisMotionValue(e).get() || 0;
              if (om.test(t)) {
                const { projection: n } = this.visualElement;
                if (n && n.layout) {
                  const r = n.layout.layoutBox[e];
                  if (r) {
                    t = Pv(r) * (parseFloat(t) / 100);
                  }
                }
              }
              this.originPoint[e] = t;
            }),
            i && Rp.postRender(() => i(e, t)),
            By(this.visualElement, 'transform');
          const { animationState: o } = this.visualElement;
          o && o.setActive('whileDrag', !0);
        },
        onMove: (e, t) => {
          const {
            dragPropagation: n,
            dragDirectionLock: r,
            onDirectionLock: i,
            onDrag: a,
          } = this.getProps();
          if (!n && !this.openDragLock) return;
          const { offset: o } = t;
          if (r && null === this.currentDirection)
            return (
              (this.currentDirection = (function (e, t = 10) {
                let n = null;
                Math.abs(e.y) > t ? (n = 'y') : Math.abs(e.x) > t && (n = 'x');
                return n;
              })(o)),
              void (null !== this.currentDirection && i && i(this.currentDirection))
            );
          this.updateAxis('x', t.point, o),
            this.updateAxis('y', t.point, o),
            this.visualElement.render(),
            a && a(e, t);
        },
        onSessionEnd: (e, t) => this.stop(e, t),
        resumeAnimation: () =>
          zv((e) => {
            var t;
            return (
              'paused' === this.getAnimationState(e) &&
              (null === (t = this.getAxisMotionValue(e).animation) || void 0 === t
                ? void 0
                : t.play())
            );
          }),
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: r,
        contextWindow: rb(this.visualElement),
      }
    );
  }
  stop(e, t) {
    const n = this.isDragging;
    if ((this.cancel(), !n)) return;
    const { velocity: r } = t;
    this.startAnimation(r);
    const { onDragEnd: i } = this.getProps();
    i && Rp.postRender(() => i(e, t));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: t } = this.visualElement;
    e && (e.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: n } = this.getProps();
    !n && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)),
      t && t.setActive('whileDrag', !1);
  }
  updateAxis(e, t, n) {
    const { drag: r } = this.getProps();
    if (!n || !ob(e, r, this.currentDirection)) return;
    const i = this.getAxisMotionValue(e);
    let a = this.originPoint[e] + n[e];
    this.constraints &&
      this.constraints[e] &&
      (a = (function (e, { min: t, max: n }, r) {
        return (
          void 0 !== t && e < t
            ? (e = r ? qg(t, e, r.min) : Math.max(e, t))
            : void 0 !== n && e > n && (e = r ? qg(n, e, r.max) : Math.min(e, n)),
          e
        );
      })(a, this.constraints[e], this.elastic[e])),
      i.set(a);
  }
  resolveConstraints() {
    var e;
    const { dragConstraints: t, dragElastic: n } = this.getProps(),
      r =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : null === (e = this.visualElement.projection) || void 0 === e
            ? void 0
            : e.layout,
      i = this.constraints;
    t && Tv(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : (this.constraints =
          !(!t || !r) &&
          (function (e, { top: t, left: n, bottom: r, right: i }) {
            return { x: Nv(e.x, n, i), y: Nv(e.y, t, r) };
          })(r.layoutBox, t)),
      (this.elastic = (function (e = Fv) {
        return (
          !1 === e ? (e = 0) : !0 === e && (e = Fv),
          { x: jv(e, 'left', 'right'), y: jv(e, 'top', 'bottom') }
        );
      })(n)),
      i !== this.constraints &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        zv((e) => {
          !1 !== this.constraints &&
            this.getAxisMotionValue(e) &&
            (this.constraints[e] = (function (e, t) {
              const n = {};
              return (
                void 0 !== t.min && (n.min = t.min - e.min),
                void 0 !== t.max && (n.max = t.max - e.min),
                n
              );
            })(r.layoutBox[e], this.constraints[e]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: t } = this.getProps();
    if (!e || !Tv(e)) return !1;
    const n = e.current,
      { projection: r } = this.visualElement;
    if (!r || !r.layout) return !1;
    const i = (function (e, t, n) {
      const r = nb(e, n),
        { scroll: i } = t;
      return i && (Jv(r.x, i.offset.x), Jv(r.y, i.offset.y)), r;
    })(n, r.root, this.visualElement.getTransformPagePoint());
    let a = (function (e, t) {
      return { x: Mv(e.x, t.x), y: Mv(e.y, t.y) };
    })(r.layout.layoutBox, i);
    if (t) {
      const e = t(
        (function ({ x: e, y: t }) {
          return { top: t.min, right: e.max, bottom: t.max, left: e.min };
        })(a)
      );
      (this.hasMutatedConstraints = !!e), e && (a = Bv(e));
    }
    return a;
  }
  startAnimation(e) {
    const {
        drag: t,
        dragMomentum: n,
        dragElastic: r,
        dragTransition: i,
        dragSnapToOrigin: a,
        onDragTransitionEnd: o,
      } = this.getProps(),
      s = this.constraints || {},
      l = zv((o) => {
        if (!ob(o, t, this.currentDirection)) return;
        let l = (s && s[o]) || {};
        a && (l = { min: 0, max: 0 });
        const u = r ? 200 : 1e6,
          c = r ? 40 : 1e7,
          d = {
            type: 'inertia',
            velocity: n ? e[o] : 0,
            bounceStiffness: u,
            bounceDamping: c,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...i,
            ...l,
          };
        return this.startAxisValueAnimation(o, d);
      });
    return Promise.all(l).then(o);
  }
  startAxisValueAnimation(e, t) {
    const n = this.getAxisMotionValue(e);
    return By(this.visualElement, e), n.start(Ry(e, n, 0, t, this.visualElement, !1));
  }
  stopAnimation() {
    zv((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    zv((e) => {
      var t;
      return null === (t = this.getAxisMotionValue(e).animation) || void 0 === t
        ? void 0
        : t.pause();
    });
  }
  getAnimationState(e) {
    var t;
    return null === (t = this.getAxisMotionValue(e).animation) || void 0 === t ? void 0 : t.state;
  }
  getAxisMotionValue(e) {
    const t = `_drag${e.toUpperCase()}`,
      n = this.visualElement.getProps(),
      r = n[t];
    return r || this.visualElement.getValue(e, (n.initial ? n.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    zv((t) => {
      const { drag: n } = this.getProps();
      if (!ob(t, n, this.currentDirection)) return;
      const { projection: r } = this.visualElement,
        i = this.getAxisMotionValue(t);
      if (r && r.layout) {
        const { min: n, max: a } = r.layout.layoutBox[t];
        i.set(e[t] - qg(n, a, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: e, dragConstraints: t } = this.getProps(),
      { projection: n } = this.visualElement;
    if (!Tv(t) || !n || !this.constraints) return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    zv((e) => {
      const t = this.getAxisMotionValue(e);
      if (t && !1 !== this.constraints) {
        const n = t.get();
        r[e] = (function (e, t) {
          let n = 0.5;
          const r = Pv(e),
            i = Pv(t);
          return (
            i > r ? (n = dg(t.min, t.max - r, e.min)) : r > i && (n = dg(e.min, e.max - i, t.min)),
            em(0, 1, n)
          );
        })({ min: n, max: n }, this.constraints[e]);
      }
    });
    const { transformTemplate: i } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = i ? i({}, '') : 'none'),
      n.root && n.root.updateScroll(),
      n.updateLayout(),
      this.resolveConstraints(),
      zv((t) => {
        if (!ob(t, e, null)) return;
        const n = this.getAxisMotionValue(t),
          { min: i, max: a } = this.constraints[t];
        n.set(qg(i, a, r[t]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    ib.set(this.visualElement, this);
    const e = vv(this.visualElement.current, 'pointerdown', (e) => {
        const { drag: t, dragListener: n = !0 } = this.getProps();
        t && n && this.start(e);
      }),
      t = () => {
        const { dragConstraints: e } = this.getProps();
        Tv(e) && e.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: n } = this.visualElement,
      r = n.addEventListener('measure', t);
    n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()), Rp.read(t);
    const i = yv(window, 'resize', () => this.scalePositionWithinConstraints()),
      a = n.addEventListener('didUpdate', ({ delta: e, hasLayoutChanged: t }) => {
        this.isDragging &&
          t &&
          (zv((t) => {
            const n = this.getAxisMotionValue(t);
            n && ((this.originPoint[t] += e[t].translate), n.set(n.get() + e[t].translate));
          }),
          this.visualElement.render());
      });
    return () => {
      i(), e(), r(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(),
      {
        drag: t = !1,
        dragDirectionLock: n = !1,
        dragPropagation: r = !1,
        dragConstraints: i = !1,
        dragElastic: a = Fv,
        dragMomentum: o = !0,
      } = e;
    return {
      ...e,
      drag: t,
      dragDirectionLock: n,
      dragPropagation: r,
      dragConstraints: i,
      dragElastic: a,
      dragMomentum: o,
    };
  }
}
function ob(e, t, n) {
  return !((!0 !== t && t !== e) || (null !== n && n !== e));
}
const sb = (e) => (t, n) => {
  e && Rp.postRender(() => e(t, n));
};
const lb = $.createContext(null);
const ub = $.createContext({}),
  cb = $.createContext({}),
  db = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function fb(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const hb = {
    correct: (e, t) => {
      if (!t.target) return e;
      if ('string' == typeof e) {
        if (!sm.test(e)) return e;
        e = parseFloat(e);
      }
      return `${fb(e, t.target.x)}% ${fb(e, t.target.y)}%`;
    },
  },
  pb = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        i = Wm.parse(e);
      if (i.length > 5) return r;
      const a = Wm.createTransformer(e),
        o = 'number' != typeof i[0] ? 1 : 0,
        s = n.x.scale * t.x,
        l = n.y.scale * t.y;
      (i[0 + o] /= s), (i[1 + o] /= l);
      const u = qg(s, l, 0.5);
      return (
        'number' == typeof i[2 + o] && (i[2 + o] /= u),
        'number' == typeof i[3 + o] && (i[3 + o] /= u),
        a(i)
      );
    },
  },
  mb = {};
const { schedule: gb, cancel: yb } = Ap(queueMicrotask, !1);
class vb extends $.Component {
  componentDidMount() {
    const { visualElement: e, layoutGroup: t, switchLayoutGroup: n, layoutId: r } = this.props,
      { projection: i } = e;
    var a;
    (a = wb),
      Object.assign(mb, a),
      i &&
        (t.group && t.group.add(i),
        n && n.register && r && n.register(i),
        i.root.didUpdate(),
        i.addEventListener('animationComplete', () => {
          this.safeToRemove();
        }),
        i.setOptions({ ...i.options, onExitComplete: () => this.safeToRemove() })),
      (db.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: t, visualElement: n, drag: r, isPresent: i } = this.props,
      a = n.projection;
    return a
      ? ((a.isPresent = i),
        r || e.layoutDependency !== t || void 0 === t ? a.willUpdate() : this.safeToRemove(),
        e.isPresent !== i &&
          (i
            ? a.promote()
            : a.relegate() ||
              Rp.postRender(() => {
                const e = a.getStack();
                (e && e.members.length) || this.safeToRemove();
              })),
        null)
      : null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e &&
      (e.root.didUpdate(),
      gb.postRender(() => {
        !e.currentAnimation && e.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: t, switchLayoutGroup: n } = this.props,
      { projection: r } = e;
    r &&
      (r.scheduleCheckAfterUnmount(),
      t && t.group && t.group.remove(r),
      n && n.deregister && n.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function bb(t) {
  const [n, r] = (function () {
      const e = $.useContext(lb);
      if (null === e) return [!0, null];
      const { isPresent: t, onExitComplete: n, register: r } = e,
        i = $.useId();
      $.useEffect(() => r(i), []);
      const a = $.useCallback(() => n && n(i), [i, n]);
      return !t && n ? [!1, a] : [!0];
    })(),
    i = $.useContext(ub);
  return e(vb, {
    ...t,
    layoutGroup: i,
    switchLayoutGroup: $.useContext(cb),
    isPresent: n,
    safeToRemove: r,
  });
}
const wb = {
    borderRadius: {
      ...hb,
      applyTo: [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
      ],
    },
    borderTopLeftRadius: hb,
    borderTopRightRadius: hb,
    borderBottomLeftRadius: hb,
    borderBottomRightRadius: hb,
    boxShadow: pb,
  },
  xb = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  kb = xb.length,
  Sb = (e) => ('string' == typeof e ? parseFloat(e) : e),
  _b = (e) => 'number' == typeof e || sm.test(e);
function Eb(e, t) {
  return void 0 !== e[t] ? e[t] : e.borderRadius;
}
const Cb = Pb(0, 0.5, $p),
  Tb = Pb(0.5, 0.95, Cp);
function Pb(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(dg(e, t, r)));
}
function Ab(e, t) {
  (e.min = t.min), (e.max = t.max);
}
function Rb(e, t) {
  Ab(e.x, t.x), Ab(e.y, t.y);
}
function Ob(e, t) {
  (e.translate = t.translate),
    (e.scale = t.scale),
    (e.originPoint = t.originPoint),
    (e.origin = t.origin);
}
function Db(e, t, n, r, i) {
  return (e = qv((e -= t), 1 / n, r)), void 0 !== i && (e = qv(e, 1 / i, r)), e;
}
function Lb(e, t, [n, r, i], a, o) {
  !(function (e, t = 0, n = 1, r = 0.5, i, a = e, o = e) {
    om.test(t) && ((t = parseFloat(t)), (t = qg(o.min, o.max, t / 100) - o.min));
    if ('number' != typeof t) return;
    let s = qg(a.min, a.max, r);
    e === a && (s -= t), (e.min = Db(e.min, t, n, s, i)), (e.max = Db(e.max, t, n, s, i));
  })(e, t[n], t[r], t[i], t.scale, a, o);
}
const Nb = ['x', 'scaleX', 'originX'],
  Mb = ['y', 'scaleY', 'originY'];
function Fb(e, t, n, r) {
  Lb(e.x, t, Nb, n ? n.x : void 0, r ? r.x : void 0),
    Lb(e.y, t, Mb, n ? n.y : void 0, r ? r.y : void 0);
}
function jb(e) {
  return 0 === e.translate && 1 === e.scale;
}
function Vb(e) {
  return jb(e.x) && jb(e.y);
}
function Ib(e, t) {
  return e.min === t.min && e.max === t.max;
}
function zb(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max);
}
function Bb(e, t) {
  return zb(e.x, t.x) && zb(e.y, t.y);
}
function Ub(e) {
  return Pv(e.x) / Pv(e.y);
}
function $b(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint;
}
class Zb {
  constructor() {
    this.members = [];
  }
  add(e) {
    Oy(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if ((Dy(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead)) {
      const e = this.members[this.members.length - 1];
      e && this.promote(e);
    }
  }
  relegate(e) {
    const t = this.members.findIndex((t) => e === t);
    if (0 === t) return !1;
    let n;
    for (let r = t; r >= 0; r--) {
      const e = this.members[r];
      if (!1 !== e.isPresent) {
        n = e;
        break;
      }
    }
    return !!n && (this.promote(n), !0);
  }
  promote(e, t) {
    const n = this.lead;
    if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
      n.instance && n.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = n),
        t && (e.resumeFrom.preserveOpacity = !0),
        n.snapshot &&
          ((e.snapshot = n.snapshot),
          (e.snapshot.latestValues = n.animationValues || n.latestValues)),
        e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: r } = e.options;
      !1 === r && n.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: t, resumingFrom: n } = e;
      t.onExitComplete && t.onExitComplete(),
        n && n.options.onExitComplete && n.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
const Wb = (e, t) => e.depth - t.depth;
class Hb {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(e) {
    Oy(this.children, e), (this.isDirty = !0);
  }
  remove(e) {
    Dy(this.children, e), (this.isDirty = !0);
  }
  forEach(e) {
    this.isDirty && this.children.sort(Wb), (this.isDirty = !1), this.children.forEach(e);
  }
}
function qb(e) {
  const t = zy(e) ? e.get() : e;
  return (n = t), Boolean(n && 'object' == typeof n && n.mix && n.toValue) ? t.toValue() : t;
  var n;
}
const Kb = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  },
  Yb = 'undefined' != typeof window && void 0 !== window.MotionDebug,
  Xb = ['', 'X', 'Y', 'Z'],
  Qb = { visibility: 'hidden' };
let Gb = 0;
function Jb(e, t, n, r) {
  const { latestValues: i } = t;
  i[e] && ((n[e] = i[e]), t.setStaticValue(e, 0), r && (r[e] = 0));
}
function ew(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return;
  const { visualElement: t } = e.options;
  if (!t) return;
  const n = Iy(t);
  if (window.MotionHasOptimisedAnimation(n, 'transform')) {
    const { layout: t, layoutId: r } = e.options;
    window.MotionCancelOptimisedAnimation(n, 'transform', Rp, !(t || r));
  }
  const { parent: r } = e;
  r && !r.hasCheckedOptimisedAppear && ew(r);
}
function tw({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(e = {}, n = null == t ? void 0 : t()) {
      (this.id = Gb++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            Yb && (Kb.totalNodes = Kb.resolvedTargetDeltas = Kb.recalculatedProjection = 0),
            this.nodes.forEach(iw),
            this.nodes.forEach(dw),
            this.nodes.forEach(fw),
            this.nodes.forEach(aw),
            Yb && window.MotionDebug.record(Kb);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = e),
        (this.root = n ? n.root || n : this),
        (this.path = n ? [...n.path, n] : []),
        (this.parent = n),
        (this.depth = n ? n.depth + 1 : 0);
      for (let t = 0; t < this.path.length; t++) this.path[t].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Hb());
    }
    addEventListener(e, t) {
      return (
        this.eventHandlers.has(e) || this.eventHandlers.set(e, new Ly()),
        this.eventHandlers.get(e).add(t)
      );
    }
    notifyListeners(e, ...t) {
      const n = this.eventHandlers.get(e);
      n && n.notify(...t);
    }
    hasListeners(e) {
      return this.eventHandlers.has(e);
    }
    mount(t, n = this.root.hasTreeAnimated) {
      if (this.instance) return;
      var r;
      (this.isSVG = (r = t) instanceof SVGElement && 'svg' !== r.tagName), (this.instance = t);
      const { layoutId: i, layout: a, visualElement: o } = this.options;
      if (
        (o && !o.current && o.mount(t),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        n && (a || i) && (this.isLayoutDirty = !0),
        e)
      ) {
        let n;
        const r = () => (this.root.updateBlockedByResize = !1);
        e(t, () => {
          (this.root.updateBlockedByResize = !0),
            n && n(),
            (n = (function (e, t) {
              const n = lg.now(),
                r = ({ timestamp: i }) => {
                  const a = i - n;
                  a >= t && (Op(r), e(a - t));
                };
              return Rp.read(r, !0), () => Op(r);
            })(r, 250)),
            db.hasAnimatedSinceResize && ((db.hasAnimatedSinceResize = !1), this.nodes.forEach(cw));
        });
      }
      i && this.root.registerSharedNode(i, this),
        !1 !== this.options.animate &&
          o &&
          (i || a) &&
          this.addEventListener(
            'didUpdate',
            ({ delta: e, hasLayoutChanged: t, hasRelativeTargetChanged: n, layout: r }) => {
              if (this.isTreeAnimationBlocked())
                return (this.target = void 0), void (this.relativeTarget = void 0);
              const i = this.options.transition || o.getDefaultTransition() || vw,
                { onLayoutAnimationStart: a, onLayoutAnimationComplete: s } = o.getProps(),
                l = !this.targetLayout || !Bb(this.targetLayout, r) || n,
                u = !t && n;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                u ||
                (t && (l || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(e, u);
                const t = { ...kp(i, 'layout'), onPlay: a, onComplete: s };
                (o.shouldReduceMotion || this.options.layoutRoot) && ((t.delay = 0), (t.type = !1)),
                  this.startAnimation(t);
              } else
                t || cw(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
              this.targetLayout = r;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const e = this.getStack();
      e && e.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Op(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(hw), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: e } = this.options;
      return e && e.getProps().transformTemplate;
    }
    willUpdate(e = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked()))
        return void (this.options.onExitComplete && this.options.onExitComplete());
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && ew(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let i = 0; i < this.path.length; i++) {
        const e = this.path[i];
        (e.shouldResetTransform = !0),
          e.updateScroll('snapshot'),
          e.options.layoutRoot && e.willUpdate(!1);
      }
      const { layoutId: t, layout: n } = this.options;
      if (void 0 === t && !n) return;
      const r = this.getTransformTemplate();
      (this.prevTransformTemplateValue = r ? r(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        e && this.notifyListeners('willUpdate');
    }
    update() {
      this.updateScheduled = !1;
      if (this.isUpdateBlocked())
        return this.unblockUpdate(), this.clearAllSnapshots(), void this.nodes.forEach(sw);
      this.isUpdating || this.nodes.forEach(lw),
        (this.isUpdating = !1),
        this.nodes.forEach(uw),
        this.nodes.forEach(nw),
        this.nodes.forEach(rw),
        this.clearAllSnapshots();
      const e = lg.now();
      (Dp.delta = em(0, 1e3 / 60, e - Dp.timestamp)),
        (Dp.timestamp = e),
        (Dp.isProcessing = !0),
        Lp.update.process(Dp),
        Lp.preRender.process(Dp),
        Lp.render.process(Dp),
        (Dp.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), gb.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(ow), this.sharedNodes.forEach(pw);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), Rp.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Rp.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      !this.snapshot && this.instance && (this.snapshot = this.measure());
    }
    updateLayout() {
      if (!this.instance) return;
      if (
        (this.updateScroll(),
        !((this.options.alwaysMeasureLayout && this.isLead()) || this.isLayoutDirty))
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let n = 0; n < this.path.length; n++) {
          this.path[n].updateScroll();
        }
      const e = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox);
      const { visualElement: t } = this.options;
      t && t.notify('LayoutMeasure', this.layout.layoutBox, e ? e.layoutBox : void 0);
    }
    updateScroll(e = 'measure') {
      let t = Boolean(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === e &&
          (t = !1),
        t)
      ) {
        const t = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: e,
          isRoot: t,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : t,
        };
      }
    }
    resetTransform() {
      if (!i) return;
      const e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        t = this.projectionDelta && !Vb(this.projectionDelta),
        n = this.getTransformTemplate(),
        r = n ? n(this.latestValues, '') : void 0,
        a = r !== this.prevTransformTemplateValue;
      e &&
        (t || Zv(this.latestValues) || a) &&
        (i(this.instance, r), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(e = !0) {
      const t = this.measurePageBox();
      let n = this.removeElementScroll(t);
      var r;
      return (
        e && (n = this.removeTransform(n)),
        xw((r = n).x),
        xw(r.y),
        {
          animationId: this.root.animationId,
          measuredBox: t,
          layoutBox: n,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      var e;
      const { visualElement: t } = this.options;
      if (!t) return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      const n = t.measureViewportBox();
      if (
        !((null === (e = this.scroll) || void 0 === e ? void 0 : e.wasRoot) || this.path.some(Sw))
      ) {
        const { scroll: e } = this.root;
        e && (Jv(n.x, e.offset.x), Jv(n.y, e.offset.y));
      }
      return n;
    }
    removeElementScroll(e) {
      var t;
      const n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      if ((Rb(n, e), null === (t = this.scroll) || void 0 === t ? void 0 : t.wasRoot)) return n;
      for (let r = 0; r < this.path.length; r++) {
        const t = this.path[r],
          { scroll: i, options: a } = t;
        t !== this.root &&
          i &&
          a.layoutScroll &&
          (i.wasRoot && Rb(n, e), Jv(n.x, i.offset.x), Jv(n.y, i.offset.y));
      }
      return n;
    }
    applyTransform(e, t = !1) {
      const n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      Rb(n, e);
      for (let r = 0; r < this.path.length; r++) {
        const e = this.path[r];
        !t &&
          e.options.layoutScroll &&
          e.scroll &&
          e !== e.root &&
          tb(n, { x: -e.scroll.offset.x, y: -e.scroll.offset.y }),
          Zv(e.latestValues) && tb(n, e.latestValues);
      }
      return Zv(this.latestValues) && tb(n, this.latestValues), n;
    }
    removeTransform(e) {
      const t = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      Rb(t, e);
      for (let n = 0; n < this.path.length; n++) {
        const e = this.path[n];
        if (!e.instance) continue;
        if (!Zv(e.latestValues)) continue;
        $v(e.latestValues) && e.updateSnapshot();
        const r = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
        Rb(r, e.measurePageBox()),
          Fb(t, e.latestValues, e.snapshot ? e.snapshot.layoutBox : void 0, r);
      }
      return Zv(this.latestValues) && Fb(t, this.latestValues), t;
    }
    setTargetDelta(e) {
      (this.targetDelta = e), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0);
    }
    setOptions(e) {
      this.options = { ...this.options, ...e, crossfade: void 0 === e.crossfade || e.crossfade };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Dp.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(e = !1) {
      var t;
      const n = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = n.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = n.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = n.isSharedProjectionDirty);
      const r = Boolean(this.resumingFrom) || this !== n;
      if (
        !(
          e ||
          (r && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          (null === (t = this.parent) || void 0 === t ? void 0 : t.isProjectionDirty) ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: i, layoutId: a } = this.options;
      if (this.layout && (i || a)) {
        if (
          ((this.resolvedRelativeTargetAt = Dp.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const e = this.getClosestProjectingParent();
          e && e.layout && 1 !== this.animationProgress
            ? ((this.relativeParent = e),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
              (this.relativeTargetOrigin = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
              Lv(this.relativeTargetOrigin, this.layout.layoutBox, e.layout.layoutBox),
              Rb(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (this.relativeTarget || this.targetDelta) {
          var o, s, l;
          if (
            (this.target ||
              ((this.target = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
              (this.targetWithTransforms = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } })),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                (o = this.target),
                (s = this.relativeTarget),
                (l = this.relativeParent.target),
                Ov(o.x, s.x, l.x),
                Ov(o.y, s.y, l.y))
              : this.targetDelta
                ? (Boolean(this.resumingFrom)
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : Rb(this.target, this.layout.layoutBox),
                  Xv(this.target, this.targetDelta))
                : Rb(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const e = this.getClosestProjectingParent();
            e &&
            Boolean(e.resumingFrom) === Boolean(this.resumingFrom) &&
            !e.options.layoutScroll &&
            e.target &&
            1 !== this.animationProgress
              ? ((this.relativeParent = e),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
                (this.relativeTargetOrigin = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
                Lv(this.relativeTargetOrigin, this.target, e.target),
                Rb(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          Yb && Kb.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (this.parent && !$v(this.parent.latestValues) && !Wv(this.parent.latestValues))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return Boolean(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout
      );
    }
    calcProjection() {
      var e;
      const t = this.getLead(),
        n = Boolean(this.resumingFrom) || this !== t;
      let r = !0;
      if (
        ((this.isProjectionDirty ||
          (null === (e = this.parent) || void 0 === e ? void 0 : e.isProjectionDirty)) &&
          (r = !1),
        n && (this.isSharedProjectionDirty || this.isTransformDirty) && (r = !1),
        this.resolvedRelativeTargetAt === Dp.timestamp && (r = !1),
        r)
      )
        return;
      const { layout: i, layoutId: a } = this.options;
      if (
        ((this.isTreeAnimating = Boolean(
          (this.parent && this.parent.isTreeAnimating) ||
            this.currentAnimation ||
            this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || (!i && !a))
      )
        return;
      Rb(this.layoutCorrected, this.layout.layoutBox);
      const o = this.treeScale.x,
        s = this.treeScale.y;
      !(function (e, t, n, r = !1) {
        const i = n.length;
        if (!i) return;
        let a, o;
        t.x = t.y = 1;
        for (let s = 0; s < i; s++) {
          (a = n[s]), (o = a.projectionDelta);
          const { visualElement: i } = a.options;
          (i && i.props.style && 'contents' === i.props.style.display) ||
            (r &&
              a.options.layoutScroll &&
              a.scroll &&
              a !== a.root &&
              tb(e, { x: -a.scroll.offset.x, y: -a.scroll.offset.y }),
            o && ((t.x *= o.x.scale), (t.y *= o.y.scale), Xv(e, o)),
            r && Zv(a.latestValues) && tb(e, a.latestValues));
        }
        t.x < Gv && t.x > Qv && (t.x = 1), t.y < Gv && t.y > Qv && (t.y = 1);
      })(this.layoutCorrected, this.treeScale, this.path, n),
        !t.layout ||
          t.target ||
          (1 === this.treeScale.x && 1 === this.treeScale.y) ||
          ((t.target = t.layout.layoutBox),
          (t.targetWithTransforms = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }));
      const { target: l } = t;
      l
        ? (this.projectionDelta && this.prevProjectionDelta
            ? (Ob(this.prevProjectionDelta.x, this.projectionDelta.x),
              Ob(this.prevProjectionDelta.y, this.projectionDelta.y))
            : this.createProjectionDeltas(),
          Rv(this.projectionDelta, this.layoutCorrected, l, this.latestValues),
          (this.treeScale.x === o &&
            this.treeScale.y === s &&
            $b(this.projectionDelta.x, this.prevProjectionDelta.x) &&
            $b(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
            ((this.hasProjected = !0),
            this.scheduleRender(),
            this.notifyListeners('projectionUpdate', l)),
          Yb && Kb.recalculatedProjection++)
        : this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(e = !0) {
      var t;
      if ((null === (t = this.options.visualElement) || void 0 === t || t.scheduleRender(), e)) {
        const e = this.getStack();
        e && e.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = {
        x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
      }),
        (this.projectionDelta = {
          x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        }),
        (this.projectionDeltaWithTransform = {
          x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        });
    }
    setAnimationOrigin(e, t = !1) {
      const n = this.snapshot,
        r = n ? n.latestValues : {},
        i = { ...this.latestValues },
        a = {
          x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
        };
      (this.relativeParent && this.relativeParent.options.layoutRoot) ||
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !t);
      const o = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
        s = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
        l = this.getStack(),
        u = !l || l.members.length <= 1,
        c = Boolean(s && !u && !0 === this.options.crossfade && !this.path.some(yw));
      let d;
      (this.animationProgress = 0),
        (this.mixTargetDelta = (t) => {
          const n = t / 1e3;
          var l, f, h, p;
          mw(a.x, e.x, n),
            mw(a.y, e.y, n),
            this.setTargetDelta(a),
            this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.layout &&
              this.relativeParent &&
              this.relativeParent.layout &&
              (Lv(o, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
              (l = this.relativeTarget),
              (f = this.relativeTargetOrigin),
              (h = o),
              (p = n),
              gw(l.x, f.x, h.x, p),
              gw(l.y, f.y, h.y, p),
              d &&
                (function (e, t) {
                  return Ib(e.x, t.x) && Ib(e.y, t.y);
                })(this.relativeTarget, d) &&
                (this.isProjectionDirty = !1),
              d || (d = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
              Rb(d, this.relativeTarget)),
            s &&
              ((this.animationValues = i),
              (function (e, t, n, r, i, a) {
                i
                  ? ((e.opacity = qg(0, void 0 !== n.opacity ? n.opacity : 1, Cb(r))),
                    (e.opacityExit = qg(void 0 !== t.opacity ? t.opacity : 1, 0, Tb(r))))
                  : a &&
                    (e.opacity = qg(
                      void 0 !== t.opacity ? t.opacity : 1,
                      void 0 !== n.opacity ? n.opacity : 1,
                      r
                    ));
                for (let o = 0; o < kb; o++) {
                  const i = `border${xb[o]}Radius`;
                  let a = Eb(t, i),
                    s = Eb(n, i);
                  (void 0 === a && void 0 === s) ||
                    (a || (a = 0),
                    s || (s = 0),
                    0 === a || 0 === s || _b(a) === _b(s)
                      ? ((e[i] = Math.max(qg(Sb(a), Sb(s), r), 0)),
                        (om.test(s) || om.test(a)) && (e[i] += '%'))
                      : (e[i] = s));
                }
                (t.rotate || n.rotate) && (e.rotate = qg(t.rotate || 0, n.rotate || 0, r));
              })(i, r, this.latestValues, n, c, u)),
            this.root.scheduleUpdateProjection(),
            this.scheduleRender(),
            (this.animationProgress = n);
        }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(e) {
      this.notifyListeners('animationStart'),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        this.pendingAnimation && (Op(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Rp.update(() => {
          (db.hasAnimatedSinceResize = !0),
            (this.currentAnimation = (function (e, t, n) {
              const r = zy(e) ? e : My(e);
              return r.start(Ry('', r, t, n)), r.animation;
            })(0, 1e3, {
              ...e,
              onUpdate: (t) => {
                this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
              },
              onComplete: () => {
                e.onComplete && e.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const e = this.getStack();
      e && e.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete');
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const e = this.getLead();
      let { targetWithTransforms: t, target: n, layout: r, latestValues: i } = e;
      if (t && n && r) {
        if (
          this !== e &&
          this.layout &&
          r &&
          kw(this.options.animationType, this.layout.layoutBox, r.layoutBox)
        ) {
          n = this.target || { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          const t = Pv(this.layout.layoutBox.x);
          (n.x.min = e.target.x.min), (n.x.max = n.x.min + t);
          const r = Pv(this.layout.layoutBox.y);
          (n.y.min = e.target.y.min), (n.y.max = n.y.min + r);
        }
        Rb(t, n), tb(t, i), Rv(this.projectionDeltaWithTransform, this.layoutCorrected, t, i);
      }
    }
    registerSharedNode(e, t) {
      this.sharedNodes.has(e) || this.sharedNodes.set(e, new Zb());
      this.sharedNodes.get(e).add(t);
      const n = t.options.initialPromotionConfig;
      t.promote({
        transition: n ? n.transition : void 0,
        preserveFollowOpacity:
          n && n.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(t) : void 0,
      });
    }
    isLead() {
      const e = this.getStack();
      return !e || e.lead === this;
    }
    getLead() {
      var e;
      const { layoutId: t } = this.options;
      return (t && (null === (e = this.getStack()) || void 0 === e ? void 0 : e.lead)) || this;
    }
    getPrevLead() {
      var e;
      const { layoutId: t } = this.options;
      return t ? (null === (e = this.getStack()) || void 0 === e ? void 0 : e.prevLead) : void 0;
    }
    getStack() {
      const { layoutId: e } = this.options;
      if (e) return this.root.sharedNodes.get(e);
    }
    promote({ needsReset: e, transition: t, preserveFollowOpacity: n } = {}) {
      const r = this.getStack();
      r && r.promote(this, n),
        e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        t && this.setOptions({ transition: t });
    }
    relegate() {
      const e = this.getStack();
      return !!e && e.relegate(this);
    }
    resetSkewAndRotation() {
      const { visualElement: e } = this.options;
      if (!e) return;
      let t = !1;
      const { latestValues: n } = e;
      if (
        ((n.z || n.rotate || n.rotateX || n.rotateY || n.rotateZ || n.skewX || n.skewY) && (t = !0),
        !t)
      )
        return;
      const r = {};
      n.z && Jb('z', e, r, this.animationValues);
      for (let i = 0; i < Xb.length; i++)
        Jb(`rotate${Xb[i]}`, e, r, this.animationValues),
          Jb(`skew${Xb[i]}`, e, r, this.animationValues);
      e.render();
      for (const i in r)
        e.setStaticValue(i, r[i]), this.animationValues && (this.animationValues[i] = r[i]);
      e.scheduleRender();
    }
    getProjectionStyles(e) {
      var t, n;
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return Qb;
      const r = { visibility: '' },
        i = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (r.opacity = ''),
          (r.pointerEvents = qb(null == e ? void 0 : e.pointerEvents) || ''),
          (r.transform = i ? i(this.latestValues, '') : 'none'),
          r
        );
      const a = this.getLead();
      if (!this.projectionDelta || !this.layout || !a.target) {
        const t = {};
        return (
          this.options.layoutId &&
            ((t.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1),
            (t.pointerEvents = qb(null == e ? void 0 : e.pointerEvents) || '')),
          this.hasProjected &&
            !Zv(this.latestValues) &&
            ((t.transform = i ? i({}, '') : 'none'), (this.hasProjected = !1)),
          t
        );
      }
      const o = a.animationValues || a.latestValues;
      this.applyTransformsToTarget(),
        (r.transform = (function (e, t, n) {
          let r = '';
          const i = e.x.translate / t.x,
            a = e.y.translate / t.y,
            o = (null == n ? void 0 : n.z) || 0;
          if (
            ((i || a || o) && (r = `translate3d(${i}px, ${a}px, ${o}px) `),
            (1 === t.x && 1 === t.y) || (r += `scale(${1 / t.x}, ${1 / t.y}) `),
            n)
          ) {
            const {
              transformPerspective: e,
              rotate: t,
              rotateX: i,
              rotateY: a,
              skewX: o,
              skewY: s,
            } = n;
            e && (r = `perspective(${e}px) ${r}`),
              t && (r += `rotate(${t}deg) `),
              i && (r += `rotateX(${i}deg) `),
              a && (r += `rotateY(${a}deg) `),
              o && (r += `skewX(${o}deg) `),
              s && (r += `skewY(${s}deg) `);
          }
          const s = e.x.scale * t.x,
            l = e.y.scale * t.y;
          return (1 === s && 1 === l) || (r += `scale(${s}, ${l})`), r || 'none';
        })(this.projectionDeltaWithTransform, this.treeScale, o)),
        i && (r.transform = i(o, r.transform));
      const { x: s, y: l } = this.projectionDelta;
      (r.transformOrigin = `${100 * s.origin}% ${100 * l.origin}% 0`),
        a.animationValues
          ? (r.opacity =
              a === this
                ? null !==
                    (n =
                      null !== (t = o.opacity) && void 0 !== t ? t : this.latestValues.opacity) &&
                  void 0 !== n
                  ? n
                  : 1
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : o.opacityExit)
          : (r.opacity =
              a === this
                ? void 0 !== o.opacity
                  ? o.opacity
                  : ''
                : void 0 !== o.opacityExit
                  ? o.opacityExit
                  : 0);
      for (const u in mb) {
        if (void 0 === o[u]) continue;
        const { correct: e, applyTo: t } = mb[u],
          n = 'none' === r.transform ? o[u] : e(o[u], a);
        if (t) {
          const e = t.length;
          for (let i = 0; i < e; i++) r[t[i]] = n;
        } else r[u] = n;
      }
      return (
        this.options.layoutId &&
          (r.pointerEvents = a === this ? qb(null == e ? void 0 : e.pointerEvents) || '' : 'none'),
        r
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((e) => {
        var t;
        return null === (t = e.currentAnimation) || void 0 === t ? void 0 : t.stop();
      }),
        this.root.nodes.forEach(sw),
        this.root.sharedNodes.clear();
    }
  };
}
function nw(e) {
  e.updateLayout();
}
function rw(e) {
  var t;
  const n = (null === (t = e.resumeFrom) || void 0 === t ? void 0 : t.snapshot) || e.snapshot;
  if (e.isLead() && e.layout && n && e.hasListeners('didUpdate')) {
    const { layoutBox: t, measuredBox: r } = e.layout,
      { animationType: i } = e.options,
      a = n.source !== e.layout.source;
    'size' === i
      ? zv((e) => {
          const r = a ? n.measuredBox[e] : n.layoutBox[e],
            i = Pv(r);
          (r.min = t[e].min), (r.max = r.min + i);
        })
      : kw(i, n.layoutBox, t) &&
        zv((r) => {
          const i = a ? n.measuredBox[r] : n.layoutBox[r],
            o = Pv(t[r]);
          (i.max = i.min + o),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0), (e.relativeTarget[r].max = e.relativeTarget[r].min + o));
        });
    const o = {
      x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
      y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
    };
    Rv(o, t, n.layoutBox);
    const s = {
      x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
      y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
    };
    a ? Rv(s, e.applyTransform(r, !0), n.measuredBox) : Rv(s, t, n.layoutBox);
    const l = !Vb(o);
    let u = !1;
    if (!e.resumeFrom) {
      const r = e.getClosestProjectingParent();
      if (r && !r.resumeFrom) {
        const { snapshot: i, layout: a } = r;
        if (i && a) {
          const o = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          Lv(o, n.layoutBox, i.layoutBox);
          const s = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          Lv(s, t, a.layoutBox),
            Bb(o, s) || (u = !0),
            r.options.layoutRoot &&
              ((e.relativeTarget = s), (e.relativeTargetOrigin = o), (e.relativeParent = r));
        }
      }
    }
    e.notifyListeners('didUpdate', {
      layout: t,
      snapshot: n,
      delta: s,
      layoutDelta: o,
      hasLayoutChanged: l,
      hasRelativeTargetChanged: u,
    });
  } else if (e.isLead()) {
    const { onExitComplete: t } = e.options;
    t && t();
  }
  e.options.transition = void 0;
}
function iw(e) {
  Yb && Kb.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      e.isSharedProjectionDirty ||
        (e.isSharedProjectionDirty = Boolean(
          e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty
        )),
      e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty));
}
function aw(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function ow(e) {
  e.clearSnapshot();
}
function sw(e) {
  e.clearMeasurements();
}
function lw(e) {
  e.isLayoutDirty = !1;
}
function uw(e) {
  const { visualElement: t } = e.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'), e.resetTransform();
}
function cw(e) {
  e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0);
}
function dw(e) {
  e.resolveTargetDelta();
}
function fw(e) {
  e.calcProjection();
}
function hw(e) {
  e.resetSkewAndRotation();
}
function pw(e) {
  e.removeLeadSnapshot();
}
function mw(e, t, n) {
  (e.translate = qg(t.translate, 0, n)),
    (e.scale = qg(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint);
}
function gw(e, t, n, r) {
  (e.min = qg(t.min, n.min, r)), (e.max = qg(t.max, n.max, r));
}
function yw(e) {
  return e.animationValues && void 0 !== e.animationValues.opacityExit;
}
const vw = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  bw = (e) =>
    'undefined' != typeof navigator &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(e),
  ww = bw('applewebkit/') && !bw('chrome/') ? Math.round : Cp;
function xw(e) {
  (e.min = ww(e.min)), (e.max = ww(e.max));
}
function kw(e, t, n) {
  return (
    'position' === e ||
    ('preserve-aspect' === e && ((r = Ub(t)), (i = Ub(n)), (a = 0.2), !(Math.abs(r - i) <= a)))
  );
  var r, i, a;
}
function Sw(e) {
  var t;
  return e !== e.root && (null === (t = e.scroll) || void 0 === t ? void 0 : t.wasRoot);
}
const _w = tw({
    attachResizeListener: (e, t) => yv(e, 'resize', t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Ew = { current: void 0 },
  Cw = tw({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!Ew.current) {
        const e = new _w({});
        e.mount(window), e.setOptions({ layoutScroll: !0 }), (Ew.current = e);
      }
      return Ew.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = void 0 !== t ? t : 'none';
    },
    checkIsScrollRoot: (e) => Boolean('fixed' === window.getComputedStyle(e).position),
  }),
  Tw = {
    pan: {
      Feature: class extends tv {
        constructor() {
          super(...arguments), (this.removePointerDownListener = Cp);
        }
        onPointerDown(e) {
          this.session = new wv(e, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: rb(this.node),
          });
        }
        createPanHandlers() {
          const {
            onPanSessionStart: e,
            onPanStart: t,
            onPan: n,
            onPanEnd: r,
          } = this.node.getProps();
          return {
            onSessionStart: sb(e),
            onStart: sb(t),
            onMove: n,
            onEnd: (e, t) => {
              delete this.session, r && Rp.postRender(() => r(e, t));
            },
          };
        }
        mount() {
          this.removePointerDownListener = vv(this.node.current, 'pointerdown', (e) =>
            this.onPointerDown(e)
          );
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          this.removePointerDownListener(), this.session && this.session.end();
        }
      },
    },
    drag: {
      Feature: class extends tv {
        constructor(e) {
          super(e),
            (this.removeGroupControls = Cp),
            (this.removeListeners = Cp),
            (this.controls = new ab(e));
        }
        mount() {
          const { dragControls: e } = this.node.getProps();
          e && (this.removeGroupControls = e.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || Cp);
        }
        unmount() {
          this.removeGroupControls(), this.removeListeners();
        }
      },
      ProjectionNode: Cw,
      MeasureLayout: bb,
    },
  };
function Pw(e, t, n) {
  const { props: r } = e;
  e.animationState && r.whileHover && e.animationState.setActive('whileHover', 'Start' === n);
  const i = r['onHover' + n];
  i && Rp.postRender(() => i(t, gv(t)));
}
function Aw(e, t, n) {
  const { props: r } = e;
  e.animationState && r.whileTap && e.animationState.setActive('whileTap', 'Start' === n);
  const i = r['onTap' + ('End' === n ? '' : n)];
  i && Rp.postRender(() => i(t, gv(t)));
}
const Rw = new WeakMap(),
  Ow = new WeakMap(),
  Dw = (e) => {
    const t = Rw.get(e.target);
    t && t(e);
  },
  Lw = (e) => {
    e.forEach(Dw);
  };
function Nw(e, t, n) {
  const r = (function ({ root: e, ...t }) {
    const n = e || document;
    Ow.has(n) || Ow.set(n, {});
    const r = Ow.get(n),
      i = JSON.stringify(t);
    return r[i] || (r[i] = new IntersectionObserver(Lw, { root: e, ...t })), r[i];
  })(t);
  return (
    Rw.set(e, n),
    r.observe(e),
    () => {
      Rw.delete(e), r.unobserve(e);
    }
  );
}
const Mw = { some: 0, all: 1 };
const Fw = {
    inView: {
      Feature: class extends tv {
        constructor() {
          super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
        }
        startObserver() {
          this.unmount();
          const { viewport: e = {} } = this.node.getProps(),
            { root: t, margin: n, amount: r = 'some', once: i } = e,
            a = {
              root: t ? t.current : void 0,
              rootMargin: n,
              threshold: 'number' == typeof r ? r : Mw[r],
            };
          return Nw(this.node.current, a, (e) => {
            const { isIntersecting: t } = e;
            if (this.isInView === t) return;
            if (((this.isInView = t), i && !t && this.hasEnteredView)) return;
            t && (this.hasEnteredView = !0),
              this.node.animationState && this.node.animationState.setActive('whileInView', t);
            const { onViewportEnter: n, onViewportLeave: r } = this.node.getProps(),
              a = t ? n : r;
            a && a(e);
          });
        }
        mount() {
          this.startObserver();
        }
        update() {
          if ('undefined' == typeof IntersectionObserver) return;
          const { props: e, prevProps: t } = this.node;
          ['amount', 'margin', 'root'].some(
            (function ({ viewport: e = {} }, { viewport: t = {} } = {}) {
              return (n) => e[n] !== t[n];
            })(e, t)
          ) && this.startObserver();
        }
        unmount() {}
      },
    },
    tap: {
      Feature: class extends tv {
        mount() {
          const { current: e } = this.node;
          e &&
            (this.unmount = mv(
              e,
              (e) => (
                Aw(this.node, e, 'Start'),
                (e, { success: t }) => Aw(this.node, e, t ? 'End' : 'Cancel')
              ),
              { useGlobalTarget: this.node.props.globalTapTarget }
            ));
        }
        unmount() {}
      },
    },
    focus: {
      Feature: class extends tv {
        constructor() {
          super(...arguments), (this.isActive = !1);
        }
        onFocus() {
          let e = !1;
          try {
            e = this.node.current.matches(':focus-visible');
          } catch (t) {
            e = !0;
          }
          e &&
            this.node.animationState &&
            (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0));
        }
        onBlur() {
          this.isActive &&
            this.node.animationState &&
            (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1));
        }
        mount() {
          this.unmount = Hg(
            yv(this.node.current, 'focus', () => this.onFocus()),
            yv(this.node.current, 'blur', () => this.onBlur())
          );
        }
        unmount() {}
      },
    },
    hover: {
      Feature: class extends tv {
        mount() {
          const { current: e } = this.node;
          e &&
            (this.unmount = (function (e, t, n = {}) {
              const [r, i, a] = ov(e, n),
                o = sv((e) => {
                  const { target: n } = e,
                    r = t(e);
                  if (!r || !n) return;
                  const a = sv((e) => {
                    r(e), n.removeEventListener('pointerleave', a);
                  });
                  n.addEventListener('pointerleave', a, i);
                });
              return (
                r.forEach((e) => {
                  e.addEventListener('pointerenter', o, i);
                }),
                a
              );
            })(e, (e) => (Pw(this.node, e, 'Start'), (e) => Pw(this.node, e, 'End'))));
        }
        unmount() {}
      },
    },
  },
  jw = { layout: { ProjectionNode: Cw, MeasureLayout: bb } },
  Vw = $.createContext({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: 'never' }),
  Iw = $.createContext({}),
  zw = 'undefined' != typeof window,
  Bw = zw ? $.useLayoutEffect : $.useEffect,
  Uw = $.createContext({ strict: !1 });
function $w(e, t, n, r, i) {
  var a, o;
  const { visualElement: s } = $.useContext(Iw),
    l = $.useContext(Uw),
    u = $.useContext(lb),
    c = $.useContext(Vw).reducedMotion,
    d = $.useRef(null);
  (r = r || l.renderer),
    !d.current &&
      r &&
      (d.current = r(e, {
        visualState: t,
        parent: s,
        props: n,
        presenceContext: u,
        blockInitialAnimation: !!u && !1 === u.initial,
        reducedMotionConfig: c,
      }));
  const f = d.current,
    h = $.useContext(cb);
  !f ||
    f.projection ||
    !i ||
    ('html' !== f.type && 'svg' !== f.type) ||
    (function (e, t, n, r) {
      const {
        layoutId: i,
        layout: a,
        drag: o,
        dragConstraints: s,
        layoutScroll: l,
        layoutRoot: u,
      } = t;
      (e.projection = new n(e.latestValues, t['data-framer-portal-id'] ? void 0 : Zw(e.parent))),
        e.projection.setOptions({
          layoutId: i,
          layout: a,
          alwaysMeasureLayout: Boolean(o) || (s && Tv(s)),
          visualElement: e,
          animationType: 'string' == typeof a ? a : 'both',
          initialPromotionConfig: r,
          layoutScroll: l,
          layoutRoot: u,
        });
    })(d.current, n, i, h);
  const p = $.useRef(!1);
  $.useInsertionEffect(() => {
    f && p.current && f.update(n, u);
  });
  const m = n[Vy],
    g = $.useRef(
      Boolean(m) &&
        !(null === (a = window.MotionHandoffIsComplete) || void 0 === a
          ? void 0
          : a.call(window, m)) &&
        (null === (o = window.MotionHasOptimisedAnimation) || void 0 === o
          ? void 0
          : o.call(window, m))
    );
  return (
    Bw(() => {
      f &&
        ((p.current = !0),
        (window.MotionIsMounted = !0),
        f.updateFeatures(),
        gb.render(f.render),
        g.current && f.animationState && f.animationState.animateChanges());
    }),
    $.useEffect(() => {
      f &&
        (!g.current && f.animationState && f.animationState.animateChanges(),
        g.current &&
          (queueMicrotask(() => {
            var e;
            null === (e = window.MotionHandoffMarkAsComplete) || void 0 === e || e.call(window, m);
          }),
          (g.current = !1)));
    }),
    f
  );
}
function Zw(e) {
  if (e) return !1 !== e.options.allowProjection ? e.projection : Zw(e.parent);
}
function Ww(e, t, n) {
  return $.useCallback(
    (r) => {
      r && e.mount && e.mount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && ('function' == typeof n ? n(r) : Tv(n) && (n.current = r));
    },
    [t]
  );
}
function Hw(e) {
  return ap(e.animate) || hp.some((t) => lp(e[t]));
}
function qw(e) {
  return Boolean(Hw(e) || e.variants);
}
function Kw(e) {
  const { initial: t, animate: n } = (function (e, t) {
    if (Hw(e)) {
      const { initial: t, animate: n } = e;
      return { initial: !1 === t || lp(t) ? t : void 0, animate: lp(n) ? n : void 0 };
    }
    return !1 !== e.inherit ? t : {};
  })(e, $.useContext(Iw));
  return $.useMemo(() => ({ initial: t, animate: n }), [Yw(t), Yw(n)]);
}
function Yw(e) {
  return Array.isArray(e) ? e.join(' ') : e;
}
const Xw = {
    animation: [
      'animate',
      'variants',
      'whileHover',
      'whileTap',
      'exit',
      'whileInView',
      'whileFocus',
      'whileDrag',
    ],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  Qw = {};
for (const rA in Xw) Qw[rA] = { isEnabled: (e) => Xw[rA].some((t) => !!e[t]) };
const Gw = Symbol.for('motionComponentSymbol');
function Jw({
  preloadedFeatures: n,
  createVisualElement: r,
  useRender: i,
  useVisualState: a,
  Component: o,
}) {
  n &&
    (function (e) {
      for (const t in e) Qw[t] = { ...Qw[t], ...e[t] };
    })(n);
  const s = $.forwardRef(function (n, s) {
    let l;
    const u = { ...$.useContext(Vw), ...n, layoutId: ex(n) },
      { isStatic: c } = u,
      d = Kw(n),
      f = a(n, c);
    if (!c && zw) {
      $.useContext(Uw).strict;
      const e = (function (e) {
        const { drag: t, layout: n } = Qw;
        if (!t && !n) return {};
        const r = { ...t, ...n };
        return {
          MeasureLayout:
            (null == t ? void 0 : t.isEnabled(e)) || (null == n ? void 0 : n.isEnabled(e))
              ? r.MeasureLayout
              : void 0,
          ProjectionNode: r.ProjectionNode,
        };
      })(u);
      (l = e.MeasureLayout), (d.visualElement = $w(o, f, u, r, e.ProjectionNode));
    }
    return t(Iw.Provider, {
      value: d,
      children: [
        l && d.visualElement ? e(l, { visualElement: d.visualElement, ...u }) : null,
        i(o, n, Ww(f, d.visualElement, s), f, c, d.visualElement),
      ],
    });
  });
  return (s[Gw] = o), s;
}
function ex({ layoutId: e }) {
  const t = $.useContext(ub).id;
  return t && void 0 !== e ? t + '-' + e : e;
}
const tx = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
];
function nx(e) {
  return 'string' == typeof e && !e.includes('-') && !!(tx.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function rx(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (const a in n) e.style.setProperty(a, n[a]);
}
const ix = new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust',
]);
function ax(e, t, n, r) {
  rx(e, t, void 0, r);
  for (const i in t.attrs) e.setAttribute(ix.has(i) ? i : jy(i), t.attrs[i]);
}
function ox(e, { layout: t, layoutId: n }) {
  return (
    mp.has(e) || e.startsWith('origin') || ((t || void 0 !== n) && (!!mb[e] || 'opacity' === e))
  );
}
function sx(e, t, n) {
  var r;
  const { style: i } = e,
    a = {};
  for (const o in i)
    (zy(i[o]) ||
      (t.style && zy(t.style[o])) ||
      ox(o, e) ||
      void 0 !==
        (null === (r = null == n ? void 0 : n.getValue(o)) || void 0 === r
          ? void 0
          : r.liveStyle)) &&
      (a[o] = i[o]);
  return a;
}
function lx(e, t, n) {
  const r = sx(e, t, n);
  for (const i in e)
    if (zy(e[i]) || zy(t[i])) {
      r[-1 !== pp.indexOf(i) ? 'attr' + i.charAt(0).toUpperCase() + i.substring(1) : i] = e[i];
    }
  return r;
}
function ux(e) {
  const t = $.useRef(null);
  return null === t.current && (t.current = e()), t.current;
}
const cx = (e) => (t, n) => {
  const r = $.useContext(Iw),
    i = $.useContext(lb),
    a = () =>
      (function ({ scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n }, r, i, a) {
        const o = { latestValues: dx(r, i, a, e), renderState: t() };
        return n && (o.mount = (e) => n(r, e, o)), o;
      })(e, t, r, i);
  return n ? a() : ux(a);
};
function dx(e, t, n, r) {
  const i = {},
    a = r(e, {});
  for (const f in a) i[f] = qb(a[f]);
  let { initial: o, animate: s } = e;
  const l = Hw(e),
    u = qw(e);
  t &&
    u &&
    !l &&
    !1 !== e.inherit &&
    (void 0 === o && (o = t.initial), void 0 === s && (s = t.animate));
  let c = !!n && !1 === n.initial;
  c = c || !1 === o;
  const d = c ? s : o;
  if (d && 'boolean' != typeof d && !ap(d)) {
    const t = Array.isArray(d) ? d : [d];
    for (let n = 0; n < t.length; n++) {
      const r = cp(e, t[n]);
      if (r) {
        const { transitionEnd: e, transition: t, ...n } = r;
        for (const r in n) {
          let e = n[r];
          if (Array.isArray(e)) {
            e = e[c ? e.length - 1 : 0];
          }
          null !== e && (i[r] = e);
        }
        for (const r in e) i[r] = e[r];
      }
    }
  }
  return i;
}
const fx = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} }),
  hx = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {}, attrs: {} }),
  px = (e, t) => (t && 'number' == typeof e ? t.transform(e) : e),
  mx = { x: 'translateX', y: 'translateY', z: 'translateZ', transformPerspective: 'perspective' },
  gx = pp.length;
function yx(e, t, n) {
  const { style: r, vars: i, transformOrigin: a } = e;
  let o = !1,
    s = !1;
  for (const l in t) {
    const e = t[l];
    if (mp.has(l)) o = !0;
    else if (Kp(l)) i[l] = e;
    else {
      const t = px(e, Jm[l]);
      l.startsWith('origin') ? ((s = !0), (a[l] = t)) : (r[l] = t);
    }
  }
  if (
    (t.transform ||
      (o || n
        ? (r.transform = (function (e, t, n) {
            let r = '',
              i = !0;
            for (let a = 0; a < gx; a++) {
              const o = pp[a],
                s = e[o];
              if (void 0 === s) continue;
              let l = !0;
              if (
                ((l =
                  'number' == typeof s
                    ? s === (o.startsWith('scale') ? 1 : 0)
                    : 0 === parseFloat(s)),
                !l || n)
              ) {
                const e = px(s, Jm[o]);
                l || ((i = !1), (r += `${mx[o] || o}(${e}) `)), n && (t[o] = e);
              }
            }
            return (r = r.trim()), n ? (r = n(t, i ? '' : r)) : i && (r = 'none'), r;
          })(t, e.transform, n))
        : r.transform && (r.transform = 'none')),
    s)
  ) {
    const { originX: e = '50%', originY: t = '50%', originZ: n = 0 } = a;
    r.transformOrigin = `${e} ${t} ${n}`;
  }
}
function vx(e, t, n) {
  return 'string' == typeof e ? e : sm.transform(t + n * e);
}
const bx = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  wx = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
function xx(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: a,
    pathLength: o,
    pathSpacing: s = 1,
    pathOffset: l = 0,
    ...u
  },
  c,
  d
) {
  if ((yx(e, u, d), c)) return void (e.style.viewBox && (e.attrs.viewBox = e.style.viewBox));
  (e.attrs = e.style), (e.style = {});
  const { attrs: f, style: h, dimensions: p } = e;
  f.transform && (p && (h.transform = f.transform), delete f.transform),
    p &&
      (void 0 !== i || void 0 !== a || h.transform) &&
      (h.transformOrigin = (function (e, t, n) {
        return `${vx(t, e.x, e.width)} ${vx(n, e.y, e.height)}`;
      })(p, void 0 !== i ? i : 0.5, void 0 !== a ? a : 0.5)),
    void 0 !== t && (f.x = t),
    void 0 !== n && (f.y = n),
    void 0 !== r && (f.scale = r),
    void 0 !== o &&
      (function (e, t, n = 1, r = 0, i = !0) {
        e.pathLength = 1;
        const a = i ? bx : wx;
        e[a.offset] = sm.transform(-r);
        const o = sm.transform(t),
          s = sm.transform(n);
        e[a.array] = `${o} ${s}`;
      })(f, o, s, l, !1);
}
const kx = (e) => 'string' == typeof e && 'svg' === e.toLowerCase(),
  Sx = {
    useVisualState: cx({
      scrapeMotionValuesFromProps: lx,
      createRenderState: hx,
      onMount: (e, t, { renderState: n, latestValues: r }) => {
        Rp.read(() => {
          try {
            n.dimensions = 'function' == typeof t.getBBox ? t.getBBox() : t.getBoundingClientRect();
          } catch (e) {
            n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
          }
        }),
          Rp.render(() => {
            xx(n, r, kx(t.tagName), e.transformTemplate), ax(t, n);
          });
      },
    }),
  },
  _x = { useVisualState: cx({ scrapeMotionValuesFromProps: sx, createRenderState: fx }) };
function Ex(e, t, n) {
  for (const r in t) zy(t[r]) || ox(r, n) || (e[r] = t[r]);
}
function Cx(e, t) {
  const n = {};
  return (
    Ex(n, e.style || {}, e),
    Object.assign(
      n,
      (function ({ transformTemplate: e }, t) {
        return $.useMemo(() => {
          const n = { style: {}, transform: {}, transformOrigin: {}, vars: {} };
          return yx(n, t, e), Object.assign({}, n.vars, n.style);
        }, [t]);
      })(e, t)
    ),
    n
  );
}
function Tx(e, t) {
  const n = {},
    r = Cx(e, t);
  return (
    e.drag &&
      !1 !== e.dragListener &&
      ((n.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = 'none'),
      (r.touchAction = !0 === e.drag ? 'none' : 'pan-' + ('x' === e.drag ? 'y' : 'x'))),
    void 0 === e.tabIndex && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0),
    (n.style = r),
    n
  );
}
const Px = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport',
]);
function Ax(e) {
  return (
    e.startsWith('while') ||
    (e.startsWith('drag') && 'draggable' !== e) ||
    e.startsWith('layout') ||
    e.startsWith('onTap') ||
    e.startsWith('onPan') ||
    e.startsWith('onLayout') ||
    Px.has(e)
  );
}
let Rx = (e) => !Ax(e);
try {
  (Ox = require('@emotion/is-prop-valid').default) &&
    (Rx = (e) => (e.startsWith('on') ? !Ax(e) : Ox(e)));
} catch (nA) {}
var Ox;
function Dx(e, t, n, r) {
  const i = $.useMemo(() => {
    const n = { style: {}, transform: {}, transformOrigin: {}, vars: {}, attrs: {} };
    return xx(n, t, kx(r), e.transformTemplate), { ...n.attrs, style: { ...n.style } };
  }, [t]);
  if (e.style) {
    const t = {};
    Ex(t, e.style, e), (i.style = { ...t, ...i.style });
  }
  return i;
}
function Lx(e = !1) {
  return (t, n, r, { latestValues: i }, a) => {
    const o = (nx(t) ? Dx : Tx)(n, i, a, t),
      s = (function (e, t, n) {
        const r = {};
        for (const i in e)
          ('values' === i && 'object' == typeof e.values) ||
            ((Rx(i) ||
              (!0 === n && Ax(i)) ||
              (!t && !Ax(i)) ||
              (e.draggable && i.startsWith('onDrag'))) &&
              (r[i] = e[i]));
        return r;
      })(n, 'string' == typeof t, e),
      l = t !== $.Fragment ? { ...s, ...o, ref: r } : {},
      { children: u } = n,
      c = $.useMemo(() => (zy(u) ? u.get() : u), [u]);
    return $.createElement(t, { ...l, children: c });
  };
}
function Nx(e, t) {
  return function (n, { forwardMotionProps: r } = { forwardMotionProps: !1 }) {
    return Jw({
      ...(nx(n) ? Sx : _x),
      preloadedFeatures: e,
      useRender: Lx(r),
      createVisualElement: t,
      Component: n,
    });
  };
}
const Mx = { current: null },
  Fx = { current: !1 };
const jx = new WeakMap(),
  Vx = [...bm, Fm, Wm],
  Ix = [
    'AnimationStart',
    'AnimationComplete',
    'Update',
    'BeforeLayoutMeasure',
    'LayoutMeasure',
    'LayoutAnimationStart',
    'LayoutAnimationComplete',
  ];
class zx {
  scrapeMotionValuesFromProps(e, t, n) {
    return {};
  }
  constructor(
    {
      parent: e,
      props: t,
      presenceContext: n,
      reducedMotionConfig: r,
      blockInitialAnimation: i,
      visualState: a,
    },
    o = {}
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Cm),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const e = lg.now();
        this.renderScheduledAt < e &&
          ((this.renderScheduledAt = e), Rp.render(this.render, !1, !0));
      });
    const { latestValues: s, renderState: l } = a;
    (this.latestValues = s),
      (this.baseTarget = { ...s }),
      (this.initialValues = t.initial ? { ...s } : {}),
      (this.renderState = l),
      (this.parent = e),
      (this.props = t),
      (this.presenceContext = n),
      (this.depth = e ? e.depth + 1 : 0),
      (this.reducedMotionConfig = r),
      (this.options = o),
      (this.blockInitialAnimation = Boolean(i)),
      (this.isControllingVariants = Hw(t)),
      (this.isVariantNode = qw(t)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = Boolean(e && e.current));
    const { willChange: u, ...c } = this.scrapeMotionValuesFromProps(t, {}, this);
    for (const d in c) {
      const e = c[d];
      void 0 !== s[d] && zy(e) && e.set(s[d], !1);
    }
  }
  mount(e) {
    (this.current = e),
      jx.set(e, this),
      this.projection && !this.projection.instance && this.projection.mount(e),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
      Fx.current ||
        (function () {
          if (((Fx.current = !0), zw))
            if (window.matchMedia) {
              const e = window.matchMedia('(prefers-reduced-motion)'),
                t = () => (Mx.current = e.matches);
              e.addListener(t), t();
            } else Mx.current = !1;
        })(),
      (this.shouldReduceMotion =
        'never' !== this.reducedMotionConfig &&
        ('always' === this.reducedMotionConfig || Mx.current)),
      this.parent && this.parent.children.add(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    jx.delete(this.current),
      this.projection && this.projection.unmount(),
      Op(this.notifyUpdate),
      Op(this.render),
      this.valueSubscriptions.forEach((e) => e()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent && this.parent.children.delete(this);
    for (const e in this.events) this.events[e].clear();
    for (const e in this.features) {
      const t = this.features[e];
      t && (t.unmount(), (t.isMounted = !1));
    }
    this.current = null;
  }
  bindToMotionValue(e, t) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const n = mp.has(e),
      r = t.on('change', (t) => {
        (this.latestValues[e] = t),
          this.props.onUpdate && Rp.preRender(this.notifyUpdate),
          n && this.projection && (this.projection.isTransformDirty = !0);
      }),
      i = t.on('renderRequest', this.scheduleRender);
    let a;
    window.MotionCheckAppearSync && (a = window.MotionCheckAppearSync(this, e, t)),
      this.valueSubscriptions.set(e, () => {
        r(), i(), a && a(), t.owner && t.stop();
      });
  }
  sortNodePosition(e) {
    return this.current && this.sortInstanceNodePosition && this.type === e.type
      ? this.sortInstanceNodePosition(this.current, e.current)
      : 0;
  }
  updateFeatures() {
    let e = 'animation';
    for (e in Qw) {
      const t = Qw[e];
      if (!t) continue;
      const { isEnabled: n, Feature: r } = t;
      if (
        (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)),
        this.features[e])
      ) {
        const t = this.features[e];
        t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, t) {
    this.latestValues[e] = t;
  }
  update(e, t) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = e),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = t);
    for (let n = 0; n < Ix.length; n++) {
      const t = Ix[n];
      this.propEventSubscriptions[t] &&
        (this.propEventSubscriptions[t](), delete this.propEventSubscriptions[t]);
      const r = e['on' + t];
      r && (this.propEventSubscriptions[t] = this.on(t, r));
    }
    (this.prevMotionValues = (function (e, t, n) {
      for (const r in t) {
        const i = t[r],
          a = n[r];
        if (zy(i)) e.addValue(r, i);
        else if (zy(a)) e.addValue(r, My(i, { owner: e }));
        else if (a !== i)
          if (e.hasValue(r)) {
            const t = e.getValue(r);
            !0 === t.liveStyle ? t.jump(i) : t.hasAnimated || t.set(i);
          } else {
            const t = e.getStaticValue(r);
            e.addValue(r, My(void 0 !== t ? t : i, { owner: e }));
          }
      }
      for (const r in n) void 0 === t[r] && e.removeValue(r);
      return t;
    })(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues)),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  addVariantChild(e) {
    const t = this.getClosestVariantNode();
    if (t) return t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e);
  }
  addValue(e, t) {
    const n = this.values.get(e);
    t !== n &&
      (n && this.removeValue(e),
      this.bindToMotionValue(e, t),
      this.values.set(e, t),
      (this.latestValues[e] = t.get()));
  }
  removeValue(e) {
    this.values.delete(e);
    const t = this.valueSubscriptions.get(e);
    t && (t(), this.valueSubscriptions.delete(e)),
      delete this.latestValues[e],
      this.removeValueFromRenderState(e, this.renderState);
  }
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, t) {
    if (this.props.values && this.props.values[e]) return this.props.values[e];
    let n = this.values.get(e);
    return (
      void 0 === n &&
        void 0 !== t &&
        ((n = My(null === t ? void 0 : t, { owner: this })), this.addValue(e, n)),
      n
    );
  }
  readValue(e, t) {
    var n;
    let r =
      void 0 === this.latestValues[e] && this.current
        ? null !== (n = this.getBaseTargetFromProps(this.props, e)) && void 0 !== n
          ? n
          : this.readValueFromInstance(this.current, e, this.options)
        : this.latestValues[e];
    var i;
    return (
      null != r &&
        ('string' == typeof r && (Hp(r) || Wp(r))
          ? (r = parseFloat(r))
          : ((i = r), !Vx.find(vm(i)) && Wm.test(t) && (r = ng(e, t))),
        this.setBaseTarget(e, zy(r) ? r.get() : r)),
      zy(r) ? r.get() : r
    );
  }
  setBaseTarget(e, t) {
    this.baseTarget[e] = t;
  }
  getBaseTarget(e) {
    var t;
    const { initial: n } = this.props;
    let r;
    if ('string' == typeof n || 'object' == typeof n) {
      const i = cp(
        this.props,
        n,
        null === (t = this.presenceContext) || void 0 === t ? void 0 : t.custom
      );
      i && (r = i[e]);
    }
    if (n && void 0 !== r) return r;
    const i = this.getBaseTargetFromProps(this.props, e);
    return void 0 === i || zy(i)
      ? void 0 !== this.initialValues[e] && void 0 === r
        ? void 0
        : this.baseTarget[e]
      : i;
  }
  on(e, t) {
    return this.events[e] || (this.events[e] = new Ly()), this.events[e].add(t);
  }
  notify(e, ...t) {
    this.events[e] && this.events[e].notify(...t);
  }
}
class Bx extends zx {
  constructor() {
    super(...arguments), (this.KeyframeResolver = ig);
  }
  sortInstanceNodePosition(e, t) {
    return 2 & e.compareDocumentPosition(t) ? 1 : -1;
  }
  getBaseTargetFromProps(e, t) {
    return e.style ? e.style[t] : void 0;
  }
  removeValueFromRenderState(e, { vars: t, style: n }) {
    delete t[e], delete n[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    zy(e) &&
      (this.childSubscription = e.on('change', (e) => {
        this.current && (this.current.textContent = `${e}`);
      }));
  }
}
class Ux extends Bx {
  constructor() {
    super(...arguments), (this.type = 'html'), (this.renderInstance = rx);
  }
  readValueFromInstance(e, t) {
    if (mp.has(t)) {
      const e = tg(t);
      return (e && e.default) || 0;
    }
    {
      const r = ((n = e), window.getComputedStyle(n)),
        i = (Kp(t) ? r.getPropertyValue(t) : r[t]) || 0;
      return 'string' == typeof i ? i.trim() : i;
    }
    var n;
  }
  measureInstanceViewportBox(e, { transformPagePoint: t }) {
    return nb(e, t);
  }
  build(e, t, n) {
    yx(e, t, n.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, t, n) {
    return sx(e, t, n);
  }
}
class $x extends Bx {
  constructor() {
    super(...arguments),
      (this.type = 'svg'),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = Iv);
  }
  getBaseTargetFromProps(e, t) {
    return e[t];
  }
  readValueFromInstance(e, t) {
    if (mp.has(t)) {
      const e = tg(t);
      return (e && e.default) || 0;
    }
    return (t = ix.has(t) ? t : jy(t)), e.getAttribute(t);
  }
  scrapeMotionValuesFromProps(e, t, n) {
    return lx(e, t, n);
  }
  build(e, t, n) {
    xx(e, t, this.isSVGTag, n.transformTemplate);
  }
  renderInstance(e, t, n, r) {
    ax(e, t, 0, r);
  }
  mount(e) {
    (this.isSVGTag = kx(e.tagName)), super.mount(e);
  }
}
const Zx = ip(
  Nx({ ...rv, ...Fw, ...Tw, ...jw }, (e, t) =>
    nx(e) ? new $x(t) : new Ux(t, { allowProjection: e !== $.Fragment })
  )
);
class Wx extends $.Component {
  getSnapshotBeforeUpdate(e) {
    const t = this.props.childRef.current;
    if (t && e.isPresent && !this.props.isPresent) {
      const e = this.props.sizeRef.current;
      (e.height = t.offsetHeight || 0),
        (e.width = t.offsetWidth || 0),
        (e.top = t.offsetTop),
        (e.left = t.offsetLeft);
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function Hx({ children: t, isPresent: n }) {
  const r = $.useId(),
    i = $.useRef(null),
    a = $.useRef({ width: 0, height: 0, top: 0, left: 0 }),
    { nonce: o } = $.useContext(Vw);
  return (
    $.useInsertionEffect(() => {
      const { width: e, height: t, top: s, left: l } = a.current;
      if (n || !i.current || !e || !t) return;
      i.current.dataset.motionPopId = r;
      const u = document.createElement('style');
      return (
        o && (u.nonce = o),
        document.head.appendChild(u),
        u.sheet &&
          u.sheet.insertRule(
            `\n          [data-motion-pop-id="${r}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${t}px !important;\n            top: ${s}px !important;\n            left: ${l}px !important;\n          }\n        `
          ),
        () => {
          document.head.removeChild(u);
        }
      );
    }, [n]),
    e(Wx, { isPresent: n, childRef: i, sizeRef: a, children: $.cloneElement(t, { ref: i }) })
  );
}
const qx = ({
  children: t,
  initial: n,
  isPresent: r,
  onExitComplete: i,
  custom: a,
  presenceAffectsLayout: o,
  mode: s,
}) => {
  const l = ux(Kx),
    u = $.useId(),
    c = $.useCallback(
      (e) => {
        l.set(e, !0);
        for (const t of l.values()) if (!t) return;
        i && i();
      },
      [l, i]
    ),
    d = $.useMemo(
      () => ({
        id: u,
        initial: n,
        isPresent: r,
        custom: a,
        onExitComplete: c,
        register: (e) => (l.set(e, !1), () => l.delete(e)),
      }),
      o ? [Math.random(), c] : [r, c]
    );
  return (
    $.useMemo(() => {
      l.forEach((e, t) => l.set(t, !1));
    }, [r]),
    $.useEffect(() => {
      !r && !l.size && i && i();
    }, [r]),
    'popLayout' === s && (t = e(Hx, { isPresent: r, children: t })),
    e(lb.Provider, { value: d, children: t })
  );
};
function Kx() {
  return new Map();
}
const Yx = (e) => e.key || '';
function Xx(e) {
  const t = [];
  return (
    $.Children.forEach(e, (e) => {
      $.isValidElement(e) && t.push(e);
    }),
    t
  );
}
const Qx = ({
  children: t,
  exitBeforeEnter: r,
  custom: i,
  initial: a = !0,
  onExitComplete: o,
  presenceAffectsLayout: s = !0,
  mode: l = 'sync',
}) => {
  const u = $.useMemo(() => Xx(t), [t]),
    c = u.map(Yx),
    d = $.useRef(!0),
    f = $.useRef(u),
    h = ux(() => new Map()),
    [p, m] = $.useState(u),
    [g, y] = $.useState(u);
  Bw(() => {
    (d.current = !1), (f.current = u);
    for (let e = 0; e < g.length; e++) {
      const t = Yx(g[e]);
      c.includes(t) ? h.delete(t) : !0 !== h.get(t) && h.set(t, !1);
    }
  }, [g, c.length, c.join('-')]);
  const v = [];
  if (u !== p) {
    let e = [...u];
    for (let t = 0; t < g.length; t++) {
      const n = g[t],
        r = Yx(n);
      c.includes(r) || (e.splice(t, 0, n), v.push(n));
    }
    return 'wait' === l && v.length && (e = v), y(Xx(e)), void m(u);
  }
  const { forceRender: b } = $.useContext(ub);
  return e(n, {
    children: g.map((t) => {
      const n = Yx(t),
        r = u === g || c.includes(n);
      return e(
        qx,
        {
          isPresent: r,
          initial: !(d.current && !a) && void 0,
          custom: r ? void 0 : i,
          presenceAffectsLayout: s,
          mode: l,
          onExitComplete: r
            ? void 0
            : () => {
                if (!h.has(n)) return;
                h.set(n, !0);
                let e = !0;
                h.forEach((t) => {
                  t || (e = !1);
                }),
                  e && (null == b || b(), y(f.current), o && o());
              },
          children: t,
        },
        n
      );
    }),
  });
};
function Gx(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    a = Object.keys(e);
  for (r = 0; r < a.length; r++) (n = a[r]), t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
var Jx = ['color'],
  ek = $.forwardRef(function (e, t) {
    var n = e.color,
      r = void 0 === n ? 'currentColor' : n,
      i = Gx(e, Jx);
    return $.createElement(
      'svg',
      Object.assign(
        {
          width: '15',
          height: '15',
          viewBox: '0 0 15 15',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        i,
        { ref: t }
      ),
      $.createElement('path', {
        d: 'M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z',
        fill: r,
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      })
    );
  }),
  tk = ['color'],
  nk = $.forwardRef(function (e, t) {
    var n = e.color,
      r = void 0 === n ? 'currentColor' : n,
      i = Gx(e, tk);
    return $.createElement(
      'svg',
      Object.assign(
        {
          width: '15',
          height: '15',
          viewBox: '0 0 15 15',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        i,
        { ref: t }
      ),
      $.createElement('path', {
        d: 'M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z',
        fill: r,
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      })
    );
  }),
  rk = ['color'],
  ik = $.forwardRef(function (e, t) {
    var n = e.color,
      r = void 0 === n ? 'currentColor' : n,
      i = Gx(e, rk);
    return $.createElement(
      'svg',
      Object.assign(
        {
          width: '15',
          height: '15',
          viewBox: '0 0 15 15',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        i,
        { ref: t }
      ),
      $.createElement('path', {
        d: 'M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z',
        fill: r,
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      })
    );
  }),
  ak = ['color'],
  ok = $.forwardRef(function (e, t) {
    var n = e.color,
      r = void 0 === n ? 'currentColor' : n,
      i = Gx(e, ak);
    return $.createElement(
      'svg',
      Object.assign(
        {
          width: '15',
          height: '15',
          viewBox: '0 0 15 15',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        i,
        { ref: t }
      ),
      $.createElement('path', {
        d: 'M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z',
        fill: r,
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      })
    );
  }),
  sk = (e) => 'checkbox' === e.type,
  lk = (e) => e instanceof Date,
  uk = (e) => null == e;
const ck = (e) => 'object' == typeof e;
var dk = (e) => !uk(e) && !Array.isArray(e) && ck(e) && !lk(e),
  fk =
    'undefined' != typeof window && void 0 !== window.HTMLElement && 'undefined' != typeof document;
function hk(e) {
  let t;
  const n = Array.isArray(e),
    r = 'undefined' != typeof FileList && e instanceof FileList;
  if (e instanceof Date) t = new Date(e);
  else if (e instanceof Set) t = new Set(e);
  else {
    if ((fk && (e instanceof Blob || r)) || (!n && !dk(e))) return e;
    if (
      ((t = n ? [] : {}),
      n ||
        ((e) => {
          const t = e.constructor && e.constructor.prototype;
          return dk(t) && t.hasOwnProperty('isPrototypeOf');
        })(e))
    )
      for (const n in e) e.hasOwnProperty(n) && (t[n] = hk(e[n]));
    else t = e;
  }
  return t;
}
var pk = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  mk = (e) => void 0 === e,
  gk = (e, t, n) => {
    if (!t || !dk(e)) return n;
    const r = pk(t.split(/[,[\].]+?/)).reduce((e, t) => (uk(e) ? e : e[t]), e);
    return mk(r) || r === e ? (mk(e[t]) ? n : e[t]) : r;
  },
  yk = (e) => 'boolean' == typeof e,
  vk = (e) => /^\w*$/.test(e),
  bk = (e) => pk(e.replace(/["|']|\]/g, '').split(/\.|\[/)),
  wk = (e, t, n) => {
    let r = -1;
    const i = vk(t) ? [t] : bk(t),
      a = i.length,
      o = a - 1;
    for (; ++r < a; ) {
      const t = i[r];
      let a = n;
      if (r !== o) {
        const n = e[t];
        a = dk(n) || Array.isArray(n) ? n : isNaN(+i[r + 1]) ? {} : [];
      }
      if ('__proto__' === t || 'constructor' === t || 'prototype' === t) return;
      (e[t] = a), (e = e[t]);
    }
    return e;
  };
const xk = 'blur',
  kk = 'focusout',
  Sk = 'onBlur',
  _k = 'onChange',
  Ek = 'onSubmit',
  Ck = 'onTouched',
  Tk = 'all',
  Pk = 'max',
  Ak = 'min',
  Rk = 'maxLength',
  Ok = 'minLength',
  Dk = 'pattern',
  Lk = 'required',
  Nk = 'validate';
Z.createContext(null);
var Mk = (e) => dk(e) && !Object.keys(e).length,
  Fk = (e) => (Array.isArray(e) ? e : [e]);
var jk = (e) => 'string' == typeof e,
  Vk = (e, t, n, r, i) =>
    t ? { ...n[e], types: { ...(n[e] && n[e].types ? n[e].types : {}), [r]: i || !0 } } : {},
  Ik = (e) => ({
    isOnSubmit: !e || e === Ek,
    isOnBlur: e === Sk,
    isOnChange: e === _k,
    isOnAll: e === Tk,
    isOnTouch: e === Ck,
  }),
  zk = (e, t, n) =>
    !n &&
    (t.watchAll ||
      t.watch.has(e) ||
      [...t.watch].some((t) => e.startsWith(t) && /^\.\w+/.test(e.slice(t.length))));
const Bk = (e, t, n, r) => {
  for (const i of n || Object.keys(e)) {
    const n = gk(e, i);
    if (n) {
      const { _f: e, ...a } = n;
      if (e) {
        if (e.refs && e.refs[0] && t(e.refs[0], i) && !r) return !0;
        if (e.ref && t(e.ref, e.name) && !r) return !0;
        if (Bk(a, t)) break;
      } else if (dk(a) && Bk(a, t)) break;
    }
  }
};
var Uk = (e, t, n) => {
    const r = Fk(gk(e, n));
    return wk(r, 'root', t[n]), wk(e, n, r), e;
  },
  $k = (e) => 'file' === e.type,
  Zk = (e) => 'function' == typeof e,
  Wk = (e) => {
    if (!fk) return !1;
    const t = e ? e.ownerDocument : 0;
    return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement);
  },
  Hk = (e) => jk(e),
  qk = (e) => 'radio' === e.type,
  Kk = (e) => e instanceof RegExp;
const Yk = { value: !1, isValid: !1 },
  Xk = { value: !0, isValid: !0 };
var Qk = (e) => {
  if (Array.isArray(e)) {
    if (e.length > 1) {
      const t = e.filter((e) => e && e.checked && !e.disabled).map((e) => e.value);
      return { value: t, isValid: !!t.length };
    }
    return e[0].checked && !e[0].disabled
      ? e[0].attributes && !mk(e[0].attributes.value)
        ? mk(e[0].value) || '' === e[0].value
          ? Xk
          : { value: e[0].value, isValid: !0 }
        : Xk
      : Yk;
  }
  return Yk;
};
const Gk = { isValid: !1, value: null };
var Jk = (e) =>
  Array.isArray(e)
    ? e.reduce((e, t) => (t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e), Gk)
    : Gk;
function eS(e, t, n = 'validate') {
  if (Hk(e) || (Array.isArray(e) && e.every(Hk)) || (yk(e) && !e))
    return { type: n, message: Hk(e) ? e : '', ref: t };
}
var tS = (e) => (dk(e) && !Kk(e) ? e : { value: e, message: '' }),
  nS = async (e, t, n, r, i) => {
    const {
        ref: a,
        refs: o,
        required: s,
        maxLength: l,
        minLength: u,
        min: c,
        max: d,
        pattern: f,
        validate: h,
        name: p,
        valueAsNumber: m,
        mount: g,
        disabled: y,
      } = e._f,
      v = gk(t, p);
    if (!g || y) return {};
    const b = o ? o[0] : a,
      w = (e) => {
        r && b.reportValidity && (b.setCustomValidity(yk(e) ? '' : e || ''), b.reportValidity());
      },
      x = {},
      k = qk(a),
      S = sk(a),
      _ = k || S,
      E =
        ((m || $k(a)) && mk(a.value) && mk(v)) ||
        (Wk(a) && '' === a.value) ||
        '' === v ||
        (Array.isArray(v) && !v.length),
      C = Vk.bind(null, p, n, x),
      T = (e, t, n, r = Rk, i = Ok) => {
        const o = e ? t : n;
        x[p] = { type: e ? r : i, message: o, ref: a, ...C(e ? r : i, o) };
      };
    if (
      i
        ? !Array.isArray(v) || !v.length
        : s &&
          ((!_ && (E || uk(v))) || (yk(v) && !v) || (S && !Qk(o).isValid) || (k && !Jk(o).isValid))
    ) {
      const { value: e, message: t } = Hk(s) ? { value: !!s, message: s } : tS(s);
      if (e && ((x[p] = { type: Lk, message: t, ref: b, ...C(Lk, t) }), !n)) return w(t), x;
    }
    if (!(E || (uk(c) && uk(d)))) {
      let e, t;
      const r = tS(d),
        i = tS(c);
      if (uk(v) || isNaN(v)) {
        const n = a.valueAsDate || new Date(v),
          o = (e) => new Date(new Date().toDateString() + ' ' + e),
          s = 'time' == a.type,
          l = 'week' == a.type;
        jk(r.value) && v && (e = s ? o(v) > o(r.value) : l ? v > r.value : n > new Date(r.value)),
          jk(i.value) && v && (t = s ? o(v) < o(i.value) : l ? v < i.value : n < new Date(i.value));
      } else {
        const n = a.valueAsNumber || (v ? +v : v);
        uk(r.value) || (e = n > r.value), uk(i.value) || (t = n < i.value);
      }
      if ((e || t) && (T(!!e, r.message, i.message, Pk, Ak), !n)) return w(x[p].message), x;
    }
    if ((l || u) && !E && (jk(v) || (i && Array.isArray(v)))) {
      const e = tS(l),
        t = tS(u),
        r = !uk(e.value) && v.length > +e.value,
        i = !uk(t.value) && v.length < +t.value;
      if ((r || i) && (T(r, e.message, t.message), !n)) return w(x[p].message), x;
    }
    if (f && !E && jk(v)) {
      const { value: e, message: t } = tS(f);
      if (Kk(e) && !v.match(e) && ((x[p] = { type: Dk, message: t, ref: a, ...C(Dk, t) }), !n))
        return w(t), x;
    }
    if (h)
      if (Zk(h)) {
        const e = eS(await h(v, t), b);
        if (e && ((x[p] = { ...e, ...C(Nk, e.message) }), !n)) return w(e.message), x;
      } else if (dk(h)) {
        let e = {};
        for (const r in h) {
          if (!Mk(e) && !n) break;
          const i = eS(await h[r](v, t), b, r);
          i && ((e = { ...i, ...C(r, i.message) }), w(i.message), n && (x[p] = e));
        }
        if (!Mk(e) && ((x[p] = { ref: b, ...e }), !n)) return x;
      }
    return w(!0), x;
  };
function rS(e, t) {
  const n = Array.isArray(t) ? t : vk(t) ? [t] : bk(t),
    r =
      1 === n.length
        ? e
        : (function (e, t) {
            const n = t.slice(0, -1).length;
            let r = 0;
            for (; r < n; ) e = mk(e) ? r++ : e[t[r++]];
            return e;
          })(e, n),
    i = n.length - 1,
    a = n[i];
  return (
    r && delete r[a],
    0 !== i &&
      ((dk(r) && Mk(r)) ||
        (Array.isArray(r) &&
          (function (e) {
            for (const t in e) if (e.hasOwnProperty(t) && !mk(e[t])) return !1;
            return !0;
          })(r))) &&
      rS(e, n.slice(0, -1)),
    e
  );
}
var iS = () => {
    let e = [];
    return {
      get observers() {
        return e;
      },
      next: (t) => {
        for (const n of e) n.next && n.next(t);
      },
      subscribe: (t) => (
        e.push(t),
        {
          unsubscribe: () => {
            e = e.filter((e) => e !== t);
          },
        }
      ),
      unsubscribe: () => {
        e = [];
      },
    };
  },
  aS = (e) => uk(e) || !ck(e);
function oS(e, t) {
  if (aS(e) || aS(t)) return e === t;
  if (lk(e) && lk(t)) return e.getTime() === t.getTime();
  const n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (const i of n) {
    const n = e[i];
    if (!r.includes(i)) return !1;
    if ('ref' !== i) {
      const e = t[i];
      if (
        (lk(n) && lk(e)) || (dk(n) && dk(e)) || (Array.isArray(n) && Array.isArray(e))
          ? !oS(n, e)
          : n !== e
      )
        return !1;
    }
  }
  return !0;
}
var sS = (e) => 'select-multiple' === e.type,
  lS = (e) => Wk(e) && e.isConnected,
  uS = (e) => {
    for (const t in e) if (Zk(e[t])) return !0;
    return !1;
  };
function cS(e, t = {}) {
  const n = Array.isArray(e);
  if (dk(e) || n)
    for (const r in e)
      Array.isArray(e[r]) || (dk(e[r]) && !uS(e[r]))
        ? ((t[r] = Array.isArray(e[r]) ? [] : {}), cS(e[r], t[r]))
        : uk(e[r]) || (t[r] = !0);
  return t;
}
function dS(e, t, n) {
  const r = Array.isArray(e);
  if (dk(e) || r)
    for (const i in e)
      Array.isArray(e[i]) || (dk(e[i]) && !uS(e[i]))
        ? mk(t) || aS(n[i])
          ? (n[i] = Array.isArray(e[i]) ? cS(e[i], []) : { ...cS(e[i]) })
          : dS(e[i], uk(t) ? {} : t[i], n[i])
        : (n[i] = !oS(e[i], t[i]));
  return n;
}
var fS = (e, t) => dS(e, t, cS(t)),
  hS = (e, { valueAsNumber: t, valueAsDate: n, setValueAs: r }) =>
    mk(e) ? e : t ? ('' === e ? NaN : e ? +e : e) : n && jk(e) ? new Date(e) : r ? r(e) : e;
function pS(e) {
  const t = e.ref;
  if (!(e.refs ? e.refs.every((e) => e.disabled) : t.disabled))
    return $k(t)
      ? t.files
      : qk(t)
        ? Jk(e.refs).value
        : sS(t)
          ? [...t.selectedOptions].map(({ value: e }) => e)
          : sk(t)
            ? Qk(e.refs).value
            : hS(mk(t.value) ? e.ref.value : t.value, e);
}
var mS = (e) =>
  mk(e) ? e : Kk(e) ? e.source : dk(e) ? (Kk(e.value) ? e.value.source : e.value) : e;
const gS = 'AsyncFunction';
function yS(e, t, n) {
  const r = gk(e, n);
  if (r || vk(n)) return { error: r, name: n };
  const i = n.split('.');
  for (; i.length; ) {
    const r = i.join('.'),
      a = gk(t, r),
      o = gk(e, r);
    if (a && !Array.isArray(a) && n !== r) return { name: n };
    if (o && o.type) return { name: r, error: o };
    i.pop();
  }
  return { name: n };
}
const vS = { mode: Ek, reValidateMode: _k, shouldFocusError: !0 };
function bS(e = {}) {
  let t,
    n = { ...vS, ...e },
    r = {
      submitCount: 0,
      isDirty: !1,
      isLoading: Zk(n.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: n.errors || {},
      disabled: n.disabled || !1,
    },
    i = {},
    a = ((dk(n.defaultValues) || dk(n.values)) && hk(n.defaultValues || n.values)) || {},
    o = n.shouldUnregister ? {} : hk(a),
    s = { action: !1, mount: !1, watch: !1 },
    l = { mount: new Set(), unMount: new Set(), array: new Set(), watch: new Set() },
    u = 0;
  const c = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    d = { values: iS(), array: iS(), state: iS() },
    f = Ik(n.mode),
    h = Ik(n.reValidateMode),
    p = n.criteriaMode === Tk,
    m = async (e) => {
      if (!n.disabled && (c.isValid || e)) {
        const e = n.resolver ? Mk((await w()).errors) : await x(i, !0);
        e !== r.isValid && d.state.next({ isValid: e });
      }
    },
    g = (e, t) => {
      n.disabled ||
        (!c.isValidating && !c.validatingFields) ||
        ((e || Array.from(l.mount)).forEach((e) => {
          e && (t ? wk(r.validatingFields, e, t) : rS(r.validatingFields, e));
        }),
        d.state.next({
          validatingFields: r.validatingFields,
          isValidating: !Mk(r.validatingFields),
        }));
    },
    y = (e, t, n, r) => {
      const l = gk(i, e);
      if (l) {
        const i = gk(o, e, mk(n) ? gk(a, e) : n);
        mk(i) || (r && r.defaultChecked) || t ? wk(o, e, t ? i : pS(l._f)) : _(e, i),
          s.mount && m();
      }
    },
    v = (e, t, o, s, l) => {
      let u = !1,
        f = !1;
      const h = { name: e };
      if (!n.disabled) {
        const n = !!(gk(i, e) && gk(i, e)._f && gk(i, e)._f.disabled);
        if (!o || s) {
          c.isDirty && ((f = r.isDirty), (r.isDirty = h.isDirty = k()), (u = f !== h.isDirty));
          const i = n || oS(gk(a, e), t);
          (f = !(n || !gk(r.dirtyFields, e))),
            i || n ? rS(r.dirtyFields, e) : wk(r.dirtyFields, e, !0),
            (h.dirtyFields = r.dirtyFields),
            (u = u || (c.dirtyFields && f !== !i));
        }
        if (o) {
          const t = gk(r.touchedFields, e);
          t ||
            (wk(r.touchedFields, e, o),
            (h.touchedFields = r.touchedFields),
            (u = u || (c.touchedFields && t !== o)));
        }
        u && l && d.state.next(h);
      }
      return u ? h : {};
    },
    b = (e, i, a, o) => {
      const s = gk(r.errors, e),
        l = c.isValid && yk(i) && r.isValid !== i;
      var f;
      if (
        (n.delayError && a
          ? ((f = () =>
              ((e, t) => {
                wk(r.errors, e, t), d.state.next({ errors: r.errors });
              })(e, a)),
            (t = (e) => {
              clearTimeout(u), (u = setTimeout(f, e));
            }),
            t(n.delayError))
          : (clearTimeout(u), (t = null), a ? wk(r.errors, e, a) : rS(r.errors, e)),
        (a ? !oS(s, a) : s) || !Mk(o) || l)
      ) {
        const t = { ...o, ...(l && yk(i) ? { isValid: i } : {}), errors: r.errors, name: e };
        (r = { ...r, ...t }), d.state.next(t);
      }
    },
    w = async (e) => {
      g(e, !0);
      const t = await n.resolver(
        o,
        n.context,
        ((e, t, n, r) => {
          const i = {};
          for (const a of e) {
            const e = gk(t, a);
            e && wk(i, a, e._f);
          }
          return { criteriaMode: n, names: [...e], fields: i, shouldUseNativeValidation: r };
        })(e || l.mount, i, n.criteriaMode, n.shouldUseNativeValidation)
      );
      return g(e), t;
    },
    x = async (e, t, i = { valid: !0 }) => {
      for (const s in e) {
        const u = e[s];
        if (u) {
          const { _f: e, ...d } = u;
          if (e) {
            const d = l.array.has(e.name),
              f =
                u._f &&
                !!(a = u._f) &&
                !!a.validate &&
                !!(
                  (Zk(a.validate) && a.validate.constructor.name === gS) ||
                  (dk(a.validate) &&
                    Object.values(a.validate).find((e) => e.constructor.name === gS))
                );
            f && c.validatingFields && g([s], !0);
            const h = await nS(u, o, p, n.shouldUseNativeValidation && !t, d);
            if ((f && c.validatingFields && g([s]), h[e.name] && ((i.valid = !1), t))) break;
            !t &&
              (gk(h, e.name)
                ? d
                  ? Uk(r.errors, h, e.name)
                  : wk(r.errors, e.name, h[e.name])
                : rS(r.errors, e.name));
          }
          !Mk(d) && (await x(d, t, i));
        }
      }
      var a;
      return i.valid;
    },
    k = (e, t) => !n.disabled && (e && t && wk(o, e, t), !oS(R(), a)),
    S = (e, t, n) =>
      ((e, t, n, r, i) =>
        jk(e)
          ? (r && t.watch.add(e), gk(n, e, i))
          : Array.isArray(e)
            ? e.map((e) => (r && t.watch.add(e), gk(n, e)))
            : (r && (t.watchAll = !0), n))(
        e,
        l,
        { ...(s.mount ? o : mk(t) ? a : jk(e) ? { [e]: t } : t) },
        n,
        t
      ),
    _ = (e, t, n = {}) => {
      const r = gk(i, e);
      let a = t;
      if (r) {
        const n = r._f;
        n &&
          (!n.disabled && wk(o, e, hS(t, n)),
          (a = Wk(n.ref) && uk(t) ? '' : t),
          sS(n.ref)
            ? [...n.ref.options].forEach((e) => (e.selected = a.includes(e.value)))
            : n.refs
              ? sk(n.ref)
                ? n.refs.length > 1
                  ? n.refs.forEach(
                      (e) =>
                        (!e.defaultChecked || !e.disabled) &&
                        (e.checked = Array.isArray(a)
                          ? !!a.find((t) => t === e.value)
                          : a === e.value)
                    )
                  : n.refs[0] && (n.refs[0].checked = !!a)
                : n.refs.forEach((e) => (e.checked = e.value === a))
              : $k(n.ref)
                ? (n.ref.value = '')
                : ((n.ref.value = a), n.ref.type || d.values.next({ name: e, values: { ...o } })));
      }
      (n.shouldDirty || n.shouldTouch) && v(e, a, n.shouldTouch, n.shouldDirty, !0),
        n.shouldValidate && A(e);
    },
    E = (e, t, n) => {
      for (const r in t) {
        const a = t[r],
          o = `${e}.${r}`,
          s = gk(i, o);
        (l.array.has(e) || dk(a) || (s && !s._f)) && !lk(a) ? E(o, a, n) : _(o, a, n);
      }
    },
    C = (e, t, n = {}) => {
      const u = gk(i, e),
        f = l.array.has(e),
        h = hk(t);
      wk(o, e, h),
        f
          ? (d.array.next({ name: e, values: { ...o } }),
            (c.isDirty || c.dirtyFields) &&
              n.shouldDirty &&
              d.state.next({ name: e, dirtyFields: fS(a, o), isDirty: k(e, h) }))
          : !u || u._f || uk(h)
            ? _(e, h, n)
            : E(e, h, n),
        zk(e, l) && d.state.next({ ...r }),
        d.values.next({ name: s.mount ? e : void 0, values: { ...o } });
    },
    T = async (e) => {
      s.mount = !0;
      const a = e.target;
      let u = a.name,
        y = !0;
      const k = gk(i, u),
        S = () =>
          a.type
            ? pS(k._f)
            : ((e) => (dk(e) && e.target ? (sk(e.target) ? e.target.checked : e.target.value) : e))(
                e
              ),
        _ = (e) => {
          y = Number.isNaN(e) || (lk(e) && isNaN(e.getTime())) || oS(e, gk(o, u, e));
        };
      if (k) {
        let a, s;
        const C = S(),
          T = e.type === xk || e.type === kk,
          P =
            !(
              ((E = k._f).mount &&
                (E.required ||
                  E.min ||
                  E.max ||
                  E.maxLength ||
                  E.minLength ||
                  E.pattern ||
                  E.validate)) ||
              n.resolver ||
              gk(r.errors, u) ||
              k._f.deps
            ) ||
            ((e, t, n, r, i) =>
              !i.isOnAll &&
              (!n && i.isOnTouch
                ? !(t || e)
                : (n ? r.isOnBlur : i.isOnBlur)
                  ? !e
                  : !(n ? r.isOnChange : i.isOnChange) || e))(
              T,
              gk(r.touchedFields, u),
              r.isSubmitted,
              h,
              f
            ),
          R = zk(u, l, T);
        wk(o, u, C),
          T ? (k._f.onBlur && k._f.onBlur(e), t && t(0)) : k._f.onChange && k._f.onChange(e);
        const O = v(u, C, T, !1),
          D = !Mk(O) || R;
        if ((!T && d.values.next({ name: u, type: e.type, values: { ...o } }), P))
          return (
            c.isValid && ('onBlur' === n.mode ? T && m() : m()),
            D && d.state.next({ name: u, ...(R ? {} : O) })
          );
        if ((!T && R && d.state.next({ ...r }), n.resolver)) {
          const { errors: e } = await w([u]);
          if ((_(C), y)) {
            const t = yS(r.errors, i, u),
              n = yS(e, i, t.name || u);
            (a = n.error), (u = n.name), (s = Mk(e));
          }
        } else
          g([u], !0),
            (a = (await nS(k, o, p, n.shouldUseNativeValidation))[u]),
            g([u]),
            _(C),
            y && (a ? (s = !1) : c.isValid && (s = await x(i, !0)));
        y && (k._f.deps && A(k._f.deps), b(u, s, a, O));
      }
      var E;
    },
    P = (e, t) => {
      if (gk(r.errors, t) && e.focus) return e.focus(), 1;
    },
    A = async (e, t = {}) => {
      let a, o;
      const s = Fk(e);
      if (n.resolver) {
        const t = await (async (e) => {
          const { errors: t } = await w(e);
          if (e)
            for (const n of e) {
              const e = gk(t, n);
              e ? wk(r.errors, n, e) : rS(r.errors, n);
            }
          else r.errors = t;
          return t;
        })(mk(e) ? e : s);
        (a = Mk(t)), (o = e ? !s.some((e) => gk(t, e)) : a);
      } else
        e
          ? ((o = (
              await Promise.all(
                s.map(async (e) => {
                  const t = gk(i, e);
                  return await x(t && t._f ? { [e]: t } : t);
                })
              )
            ).every(Boolean)),
            (o || r.isValid) && m())
          : (o = a = await x(i));
      return (
        d.state.next({
          ...(!jk(e) || (c.isValid && a !== r.isValid) ? {} : { name: e }),
          ...(n.resolver || !e ? { isValid: a } : {}),
          errors: r.errors,
        }),
        t.shouldFocus && !o && Bk(i, P, e ? s : l.mount),
        o
      );
    },
    R = (e) => {
      const t = { ...(s.mount ? o : a) };
      return mk(e) ? t : jk(e) ? gk(t, e) : e.map((e) => gk(t, e));
    },
    O = (e, t) => ({
      invalid: !!gk((t || r).errors, e),
      isDirty: !!gk((t || r).dirtyFields, e),
      error: gk((t || r).errors, e),
      isValidating: !!gk(r.validatingFields, e),
      isTouched: !!gk((t || r).touchedFields, e),
    }),
    D = (e, t, n) => {
      const a = (gk(i, e, { _f: {} })._f || {}).ref,
        o = gk(r.errors, e) || {},
        { ref: s, message: l, type: u, ...c } = o;
      wk(r.errors, e, { ...c, ...t, ref: a }),
        d.state.next({ name: e, errors: r.errors, isValid: !1 }),
        n && n.shouldFocus && a && a.focus && a.focus();
    },
    L = (e, t = {}) => {
      for (const s of e ? Fk(e) : l.mount)
        l.mount.delete(s),
          l.array.delete(s),
          t.keepValue || (rS(i, s), rS(o, s)),
          !t.keepError && rS(r.errors, s),
          !t.keepDirty && rS(r.dirtyFields, s),
          !t.keepTouched && rS(r.touchedFields, s),
          !t.keepIsValidating && rS(r.validatingFields, s),
          !n.shouldUnregister && !t.keepDefaultValue && rS(a, s);
      d.values.next({ values: { ...o } }),
        d.state.next({ ...r, ...(t.keepDirty ? { isDirty: k() } : {}) }),
        !t.keepIsValid && m();
    },
    N = ({ disabled: e, name: t, field: n, fields: r, value: i }) => {
      if ((yk(e) && s.mount) || e) {
        const a = e ? void 0 : mk(i) ? pS(n ? n._f : gk(r, t)._f) : i;
        (e || (!e && !mk(a))) && wk(o, t, a), v(t, a, !1, !1, !0);
      }
    },
    M = (e, t = {}) => {
      let r = gk(i, e);
      const o = yk(t.disabled) || yk(n.disabled);
      return (
        wk(i, e, {
          ...(r || {}),
          _f: { ...(r && r._f ? r._f : { ref: { name: e } }), name: e, mount: !0, ...t },
        }),
        l.mount.add(e),
        r
          ? N({
              field: r,
              disabled: yk(t.disabled) ? t.disabled : n.disabled,
              name: e,
              value: t.value,
            })
          : y(e, !0, t.value),
        {
          ...(o ? { disabled: t.disabled || n.disabled } : {}),
          ...(n.progressive
            ? {
                required: !!t.required,
                min: mS(t.min),
                max: mS(t.max),
                minLength: mS(t.minLength),
                maxLength: mS(t.maxLength),
                pattern: mS(t.pattern),
              }
            : {}),
          name: e,
          onChange: T,
          onBlur: T,
          ref: (o) => {
            if (o) {
              M(e, t), (r = gk(i, e));
              const n =
                  (mk(o.value) &&
                    o.querySelectorAll &&
                    o.querySelectorAll('input,select,textarea')[0]) ||
                  o,
                s = ((e) => qk(e) || sk(e))(n),
                l = r._f.refs || [];
              if (s ? l.find((e) => e === n) : n === r._f.ref) return;
              wk(i, e, {
                _f: {
                  ...r._f,
                  ...(s
                    ? {
                        refs: [...l.filter(lS), n, ...(Array.isArray(gk(a, e)) ? [{}] : [])],
                        ref: { type: n.type, name: e },
                      }
                    : { ref: n }),
                },
              }),
                y(e, !1, void 0, n);
            } else
              (r = gk(i, e, {})),
                r._f && (r._f.mount = !1),
                (n.shouldUnregister || t.shouldUnregister) &&
                  (!((e, t) => e.has(((e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e)(t)))(
                    l.array,
                    e
                  ) ||
                    !s.action) &&
                  l.unMount.add(e);
          },
        }
      );
    },
    F = () => n.shouldFocusError && Bk(i, P, l.mount),
    j = (e, t) => async (a) => {
      let s;
      if ((a && (a.preventDefault && a.preventDefault(), a.persist && a.persist()), n.disabled))
        return void (t && (await t({ ...r.errors }, a)));
      let l = hk(o);
      if ((d.state.next({ isSubmitting: !0 }), n.resolver)) {
        const { errors: e, values: t } = await w();
        (r.errors = e), (l = t);
      } else await x(i);
      if ((rS(r.errors, 'root'), Mk(r.errors))) {
        d.state.next({ errors: {} });
        try {
          await e(l, a);
        } catch (u) {
          s = u;
        }
      } else t && (await t({ ...r.errors }, a)), F(), setTimeout(F);
      if (
        (d.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: Mk(r.errors) && !s,
          submitCount: r.submitCount + 1,
          errors: r.errors,
        }),
        s)
      )
        throw s;
    },
    V = (e, t = {}) => {
      const u = e ? hk(e) : a,
        f = hk(u),
        h = Mk(e),
        p = h ? a : f;
      if ((t.keepDefaultValues || (a = u), !t.keepValues)) {
        if (t.keepDirtyValues) {
          const e = new Set([...l.mount, ...Object.keys(fS(a, o))]);
          for (const t of Array.from(e)) gk(r.dirtyFields, t) ? wk(p, t, gk(o, t)) : C(t, gk(p, t));
        } else {
          if (fk && mk(e))
            for (const e of l.mount) {
              const t = gk(i, e);
              if (t && t._f) {
                const e = Array.isArray(t._f.refs) ? t._f.refs[0] : t._f.ref;
                if (Wk(e)) {
                  const t = e.closest('form');
                  if (t) {
                    t.reset();
                    break;
                  }
                }
              }
            }
          i = {};
        }
        (o = n.shouldUnregister ? (t.keepDefaultValues ? hk(a) : {}) : hk(p)),
          d.array.next({ values: { ...p } }),
          d.values.next({ values: { ...p } });
      }
      (l = {
        mount: t.keepDirtyValues ? l.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: '',
      }),
        (s.mount = !c.isValid || !!t.keepIsValid || !!t.keepDirtyValues),
        (s.watch = !!n.shouldUnregister),
        d.state.next({
          submitCount: t.keepSubmitCount ? r.submitCount : 0,
          isDirty: !h && (t.keepDirty ? r.isDirty : !(!t.keepDefaultValues || oS(e, a))),
          isSubmitted: !!t.keepIsSubmitted && r.isSubmitted,
          dirtyFields: h
            ? {}
            : t.keepDirtyValues
              ? t.keepDefaultValues && o
                ? fS(a, o)
                : r.dirtyFields
              : t.keepDefaultValues && e
                ? fS(a, e)
                : t.keepDirty
                  ? r.dirtyFields
                  : {},
          touchedFields: t.keepTouched ? r.touchedFields : {},
          errors: t.keepErrors ? r.errors : {},
          isSubmitSuccessful: !!t.keepIsSubmitSuccessful && r.isSubmitSuccessful,
          isSubmitting: !1,
        });
    },
    I = (e, t) => V(Zk(e) ? e(o) : e, t);
  return {
    control: {
      register: M,
      unregister: L,
      getFieldState: O,
      handleSubmit: j,
      setError: D,
      _executeSchema: w,
      _getWatch: S,
      _getDirty: k,
      _updateValid: m,
      _removeUnmounted: () => {
        for (const e of l.unMount) {
          const t = gk(i, e);
          t && (t._f.refs ? t._f.refs.every((e) => !lS(e)) : !lS(t._f.ref)) && L(e);
        }
        l.unMount = new Set();
      },
      _updateFieldArray: (e, t = [], l, u, f = !0, h = !0) => {
        if (u && l && !n.disabled) {
          if (((s.action = !0), h && Array.isArray(gk(i, e)))) {
            const t = l(gk(i, e), u.argA, u.argB);
            f && wk(i, e, t);
          }
          if (h && Array.isArray(gk(r.errors, e))) {
            const t = l(gk(r.errors, e), u.argA, u.argB);
            f && wk(r.errors, e, t),
              ((e, t) => {
                !pk(gk(e, t)).length && rS(e, t);
              })(r.errors, e);
          }
          if (c.touchedFields && h && Array.isArray(gk(r.touchedFields, e))) {
            const t = l(gk(r.touchedFields, e), u.argA, u.argB);
            f && wk(r.touchedFields, e, t);
          }
          c.dirtyFields && (r.dirtyFields = fS(a, o)),
            d.state.next({
              name: e,
              isDirty: k(e, t),
              dirtyFields: r.dirtyFields,
              errors: r.errors,
              isValid: r.isValid,
            });
        } else wk(o, e, t);
      },
      _updateDisabledField: N,
      _getFieldArray: (e) => pk(gk(s.mount ? o : a, e, n.shouldUnregister ? gk(a, e, []) : [])),
      _reset: V,
      _resetDefaultValues: () =>
        Zk(n.defaultValues) &&
        n.defaultValues().then((e) => {
          I(e, n.resetOptions), d.state.next({ isLoading: !1 });
        }),
      _updateFormState: (e) => {
        r = { ...r, ...e };
      },
      _disableForm: (e) => {
        yk(e) &&
          (d.state.next({ disabled: e }),
          Bk(
            i,
            (t, n) => {
              const r = gk(i, n);
              r &&
                ((t.disabled = r._f.disabled || e),
                Array.isArray(r._f.refs) &&
                  r._f.refs.forEach((t) => {
                    t.disabled = r._f.disabled || e;
                  }));
            },
            0,
            !1
          ));
      },
      _subjects: d,
      _proxyFormState: c,
      _setErrors: (e) => {
        (r.errors = e), d.state.next({ errors: r.errors, isValid: !1 });
      },
      get _fields() {
        return i;
      },
      get _formValues() {
        return o;
      },
      get _state() {
        return s;
      },
      set _state(e) {
        s = e;
      },
      get _defaultValues() {
        return a;
      },
      get _names() {
        return l;
      },
      set _names(e) {
        l = e;
      },
      get _formState() {
        return r;
      },
      set _formState(e) {
        r = e;
      },
      get _options() {
        return n;
      },
      set _options(e) {
        n = { ...n, ...e };
      },
    },
    trigger: A,
    register: M,
    handleSubmit: j,
    watch: (e, t) =>
      Zk(e) ? d.values.subscribe({ next: (n) => e(S(void 0, t), n) }) : S(e, t, !0),
    setValue: C,
    getValues: R,
    reset: I,
    resetField: (e, t = {}) => {
      gk(i, e) &&
        (mk(t.defaultValue)
          ? C(e, hk(gk(a, e)))
          : (C(e, t.defaultValue), wk(a, e, hk(t.defaultValue))),
        t.keepTouched || rS(r.touchedFields, e),
        t.keepDirty ||
          (rS(r.dirtyFields, e), (r.isDirty = t.defaultValue ? k(e, hk(gk(a, e))) : k())),
        t.keepError || (rS(r.errors, e), c.isValid && m()),
        d.state.next({ ...r }));
    },
    clearErrors: (e) => {
      e && Fk(e).forEach((e) => rS(r.errors, e)), d.state.next({ errors: e ? r.errors : {} });
    },
    unregister: L,
    setError: D,
    setFocus: (e, t = {}) => {
      const n = gk(i, e),
        r = n && n._f;
      if (r) {
        const e = r.refs ? r.refs[0] : r.ref;
        e.focus && (e.focus(), t.shouldSelect && Zk(e.select) && e.select());
      }
    },
    getFieldState: O,
  };
}
function wS(e = {}) {
  const t = Z.useRef(void 0),
    n = Z.useRef(void 0),
    [r, i] = Z.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: Zk(e.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: e.errors || {},
      disabled: e.disabled || !1,
      defaultValues: Zk(e.defaultValues) ? void 0 : e.defaultValues,
    });
  t.current || (t.current = { ...bS(e), formState: r });
  const a = t.current.control;
  return (
    (a._options = e),
    (function (e) {
      const t = Z.useRef(e);
      (t.current = e),
        Z.useEffect(() => {
          const n =
            !e.disabled &&
            t.current.subject &&
            t.current.subject.subscribe({ next: t.current.next });
          return () => {
            n && n.unsubscribe();
          };
        }, [e.disabled]);
    })({
      subject: a._subjects.state,
      next: (e) => {
        ((e, t, n, r) => {
          n(e);
          const { name: i, ...a } = e;
          return (
            Mk(a) ||
            Object.keys(a).length >= Object.keys(t).length ||
            Object.keys(a).find((e) => t[e] === (!r || Tk))
          );
        })(e, a._proxyFormState, a._updateFormState, !0) && i({ ...a._formState });
      },
    }),
    Z.useEffect(() => a._disableForm(e.disabled), [a, e.disabled]),
    Z.useEffect(() => {
      if (a._proxyFormState.isDirty) {
        const e = a._getDirty();
        e !== r.isDirty && a._subjects.state.next({ isDirty: e });
      }
    }, [a, r.isDirty]),
    Z.useEffect(() => {
      e.values && !oS(e.values, n.current)
        ? (a._reset(e.values, a._options.resetOptions),
          (n.current = e.values),
          i((e) => ({ ...e })))
        : a._resetDefaultValues();
    }, [e.values, a]),
    Z.useEffect(() => {
      e.errors && a._setErrors(e.errors);
    }, [e.errors, a]),
    Z.useEffect(() => {
      a._state.mount || (a._updateValid(), (a._state.mount = !0)),
        a._state.watch && ((a._state.watch = !1), a._subjects.state.next({ ...a._formState })),
        a._removeUnmounted();
    }),
    Z.useEffect(() => {
      e.shouldUnregister && a._subjects.values.next({ values: a._getWatch() });
    }, [e.shouldUnregister, a]),
    (t.current.formState = ((e, t, n, r = !0) => {
      const i = { defaultValues: t._defaultValues };
      for (const a in e)
        Object.defineProperty(i, a, {
          get: () => {
            const i = a;
            return (
              t._proxyFormState[i] !== Tk && (t._proxyFormState[i] = !r || Tk),
              n && (n[i] = !0),
              e[i]
            );
          },
        });
      return i;
    })(r, a)),
    t.current
  );
}
var xS, kS, SS;
((kS = xS || (xS = {})).assertEqual = (e) => e),
  (kS.assertIs = function (e) {}),
  (kS.assertNever = function (e) {
    throw new Error();
  }),
  (kS.arrayToEnum = (e) => {
    const t = {};
    for (const n of e) t[n] = n;
    return t;
  }),
  (kS.getValidEnumValues = (e) => {
    const t = kS.objectKeys(e).filter((t) => 'number' != typeof e[e[t]]),
      n = {};
    for (const r of t) n[r] = e[r];
    return kS.objectValues(n);
  }),
  (kS.objectValues = (e) =>
    kS.objectKeys(e).map(function (t) {
      return e[t];
    })),
  (kS.objectKeys =
    'function' == typeof Object.keys
      ? (e) => Object.keys(e)
      : (e) => {
          const t = [];
          for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
          return t;
        }),
  (kS.find = (e, t) => {
    for (const n of e) if (t(n)) return n;
  }),
  (kS.isInteger =
    'function' == typeof Number.isInteger
      ? (e) => Number.isInteger(e)
      : (e) => 'number' == typeof e && isFinite(e) && Math.floor(e) === e),
  (kS.joinValues = function (e, t = ' | ') {
    return e.map((e) => ('string' == typeof e ? `'${e}'` : e)).join(t);
  }),
  (kS.jsonStringifyReplacer = (e, t) => ('bigint' == typeof t ? t.toString() : t)),
  ((SS || (SS = {})).mergeShapes = (e, t) => ({ ...e, ...t }));
const _S = xS.arrayToEnum([
    'string',
    'nan',
    'number',
    'integer',
    'float',
    'boolean',
    'date',
    'bigint',
    'symbol',
    'function',
    'undefined',
    'null',
    'array',
    'object',
    'unknown',
    'promise',
    'void',
    'never',
    'map',
    'set',
  ]),
  ES = (e) => {
    switch (typeof e) {
      case 'undefined':
        return _S.undefined;
      case 'string':
        return _S.string;
      case 'number':
        return isNaN(e) ? _S.nan : _S.number;
      case 'boolean':
        return _S.boolean;
      case 'function':
        return _S.function;
      case 'bigint':
        return _S.bigint;
      case 'symbol':
        return _S.symbol;
      case 'object':
        return Array.isArray(e)
          ? _S.array
          : null === e
            ? _S.null
            : e.then && 'function' == typeof e.then && e.catch && 'function' == typeof e.catch
              ? _S.promise
              : 'undefined' != typeof Map && e instanceof Map
                ? _S.map
                : 'undefined' != typeof Set && e instanceof Set
                  ? _S.set
                  : 'undefined' != typeof Date && e instanceof Date
                    ? _S.date
                    : _S.object;
      default:
        return _S.unknown;
    }
  },
  CS = xS.arrayToEnum([
    'invalid_type',
    'invalid_literal',
    'custom',
    'invalid_union',
    'invalid_union_discriminator',
    'invalid_enum_value',
    'unrecognized_keys',
    'invalid_arguments',
    'invalid_return_type',
    'invalid_date',
    'invalid_string',
    'too_small',
    'too_big',
    'invalid_intersection_types',
    'not_multiple_of',
    'not_finite',
  ]);
class TS extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(),
      (this.issues = []),
      (this.addIssue = (e) => {
        this.issues = [...this.issues, e];
      }),
      (this.addIssues = (e = []) => {
        this.issues = [...this.issues, ...e];
      });
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : (this.__proto__ = t),
      (this.name = 'ZodError'),
      (this.issues = e);
  }
  format(e) {
    const t =
        e ||
        function (e) {
          return e.message;
        },
      n = { _errors: [] },
      r = (e) => {
        for (const i of e.issues)
          if ('invalid_union' === i.code) i.unionErrors.map(r);
          else if ('invalid_return_type' === i.code) r(i.returnTypeError);
          else if ('invalid_arguments' === i.code) r(i.argumentsError);
          else if (0 === i.path.length) n._errors.push(t(i));
          else {
            let e = n,
              r = 0;
            for (; r < i.path.length; ) {
              const n = i.path[r];
              r === i.path.length - 1
                ? ((e[n] = e[n] || { _errors: [] }), e[n]._errors.push(t(i)))
                : (e[n] = e[n] || { _errors: [] }),
                (e = e[n]),
                r++;
            }
          }
      };
    return r(this), n;
  }
  static assert(e) {
    if (!(e instanceof TS)) throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, xS.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return 0 === this.issues.length;
  }
  flatten(e = (e) => e.message) {
    const t = {},
      n = [];
    for (const r of this.issues)
      r.path.length > 0
        ? ((t[r.path[0]] = t[r.path[0]] || []), t[r.path[0]].push(e(r)))
        : n.push(e(r));
    return { formErrors: n, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
TS.create = (e) => new TS(e);
const PS = (e, t) => {
  let n;
  switch (e.code) {
    case CS.invalid_type:
      n =
        e.received === _S.undefined ? 'Required' : `Expected ${e.expected}, received ${e.received}`;
      break;
    case CS.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, xS.jsonStringifyReplacer)}`;
      break;
    case CS.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${xS.joinValues(e.keys, ', ')}`;
      break;
    case CS.invalid_union:
      n = 'Invalid input';
      break;
    case CS.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${xS.joinValues(e.options)}`;
      break;
    case CS.invalid_enum_value:
      n = `Invalid enum value. Expected ${xS.joinValues(e.options)}, received '${e.received}'`;
      break;
    case CS.invalid_arguments:
      n = 'Invalid function arguments';
      break;
    case CS.invalid_return_type:
      n = 'Invalid function return type';
      break;
    case CS.invalid_date:
      n = 'Invalid date';
      break;
    case CS.invalid_string:
      'object' == typeof e.validation
        ? 'includes' in e.validation
          ? ((n = `Invalid input: must include "${e.validation.includes}"`),
            'number' == typeof e.validation.position &&
              (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
          : 'startsWith' in e.validation
            ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
            : 'endsWith' in e.validation
              ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
              : xS.assertNever(e.validation)
        : (n = 'regex' !== e.validation ? `Invalid ${e.validation}` : 'Invalid');
      break;
    case CS.too_small:
      n =
        'array' === e.type
          ? `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'more than'} ${e.minimum} element(s)`
          : 'string' === e.type
            ? `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at least' : 'over'} ${e.minimum} character(s)`
            : 'number' === e.type
              ? `Number must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${e.minimum}`
              : 'date' === e.type
                ? `Date must be ${e.exact ? 'exactly equal to ' : e.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(e.minimum))}`
                : 'Invalid input';
      break;
    case CS.too_big:
      n =
        'array' === e.type
          ? `Array must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'less than'} ${e.maximum} element(s)`
          : 'string' === e.type
            ? `String must contain ${e.exact ? 'exactly' : e.inclusive ? 'at most' : 'under'} ${e.maximum} character(s)`
            : 'number' === e.type
              ? `Number must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`
              : 'bigint' === e.type
                ? `BigInt must be ${e.exact ? 'exactly' : e.inclusive ? 'less than or equal to' : 'less than'} ${e.maximum}`
                : 'date' === e.type
                  ? `Date must be ${e.exact ? 'exactly' : e.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(e.maximum))}`
                  : 'Invalid input';
      break;
    case CS.custom:
      n = 'Invalid input';
      break;
    case CS.invalid_intersection_types:
      n = 'Intersection results could not be merged';
      break;
    case CS.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case CS.not_finite:
      n = 'Number must be finite';
      break;
    default:
      (n = t.defaultError), xS.assertNever(e);
  }
  return { message: n };
};
let AS = PS;
function RS() {
  return AS;
}
const OS = (e) => {
  const { data: t, path: n, errorMaps: r, issueData: i } = e,
    a = [...n, ...(i.path || [])],
    o = { ...i, path: a };
  if (void 0 !== i.message) return { ...i, path: a, message: i.message };
  let s = '';
  const l = r
    .filter((e) => !!e)
    .slice()
    .reverse();
  for (const u of l) s = u(o, { data: t, defaultError: s }).message;
  return { ...i, path: a, message: s };
};
function DS(e, t) {
  const n = RS(),
    r = OS({
      issueData: t,
      data: e.data,
      path: e.path,
      errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, n, n === PS ? void 0 : PS].filter(
        (e) => !!e
      ),
    });
  e.common.issues.push(r);
}
class LS {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    'valid' === this.value && (this.value = 'dirty');
  }
  abort() {
    'aborted' !== this.value && (this.value = 'aborted');
  }
  static mergeArray(e, t) {
    const n = [];
    for (const r of t) {
      if ('aborted' === r.status) return NS;
      'dirty' === r.status && e.dirty(), n.push(r.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, t) {
    const n = [];
    for (const r of t) {
      const e = await r.key,
        t = await r.value;
      n.push({ key: e, value: t });
    }
    return LS.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, t) {
    const n = {};
    for (const r of t) {
      const { key: t, value: i } = r;
      if ('aborted' === t.status) return NS;
      if ('aborted' === i.status) return NS;
      'dirty' === t.status && e.dirty(),
        'dirty' === i.status && e.dirty(),
        '__proto__' === t.value || (void 0 === i.value && !r.alwaysSet) || (n[t.value] = i.value);
    }
    return { status: e.value, value: n };
  }
}
const NS = Object.freeze({ status: 'aborted' }),
  MS = (e) => ({ status: 'dirty', value: e }),
  FS = (e) => ({ status: 'valid', value: e }),
  jS = (e) => 'aborted' === e.status,
  VS = (e) => 'dirty' === e.status,
  IS = (e) => 'valid' === e.status,
  zS = (e) => 'undefined' != typeof Promise && e instanceof Promise;
function BS(e, t, n, r) {
  if ('a' === n && !r) throw new TypeError('Private accessor was defined without a getter');
  if ('function' == typeof t ? e !== t || !r : !t.has(e))
    throw new TypeError('Cannot read private member from an object whose class did not declare it');
  return 'm' === n ? r : 'a' === n ? r.call(e) : r ? r.value : t.get(e);
}
function US(e, t, n, r, i) {
  if ('m' === r) throw new TypeError('Private method is not writable');
  if ('a' === r && !i) throw new TypeError('Private accessor was defined without a setter');
  if ('function' == typeof t ? e !== t || !i : !t.has(e))
    throw new TypeError('Cannot write private member to an object whose class did not declare it');
  return 'a' === r ? i.call(e, n) : i ? (i.value = n) : t.set(e, n), n;
}
var $S, ZS, WS, HS;
'function' == typeof SuppressedError && SuppressedError,
  ((ZS = $S || ($S = {})).errToObj = (e) => ('string' == typeof e ? { message: e } : e || {})),
  (ZS.toString = (e) => ('string' == typeof e ? e : null == e ? void 0 : e.message));
class qS {
  constructor(e, t, n, r) {
    (this._cachedPath = []), (this.parent = e), (this.data = t), (this._path = n), (this._key = r);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const KS = (e, t) => {
  if (IS(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length) throw new Error('Validation failed but no issues detected.');
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const t = new TS(e.common.issues);
      return (this._error = t), this._error;
    },
  };
};
function YS(e) {
  if (!e) return {};
  const { errorMap: t, invalid_type_error: n, required_error: r, description: i } = e;
  if (t && (n || r))
    throw new Error(
      'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
    );
  if (t) return { errorMap: t, description: i };
  return {
    errorMap: (t, i) => {
      var a, o;
      const { message: s } = e;
      return 'invalid_enum_value' === t.code
        ? { message: null != s ? s : i.defaultError }
        : void 0 === i.data
          ? { message: null !== (a = null != s ? s : r) && void 0 !== a ? a : i.defaultError }
          : 'invalid_type' !== t.code
            ? { message: i.defaultError }
            : { message: null !== (o = null != s ? s : n) && void 0 !== o ? o : i.defaultError };
    },
    description: i,
  };
}
class XS {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return ES(e.data);
  }
  _getOrReturnCtx(e, t) {
    return (
      t || {
        common: e.parent.common,
        data: e.data,
        parsedType: ES(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new LS(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: ES(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (zS(t)) throw new Error('Synchronous parse encountered promise.');
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const n = this.safeParse(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  safeParse(e, t) {
    var n;
    const r = {
        common: {
          issues: [],
          async: null !== (n = null == t ? void 0 : t.async) && void 0 !== n && n,
          contextualErrorMap: null == t ? void 0 : t.errorMap,
        },
        path: (null == t ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: ES(e),
      },
      i = this._parseSync({ data: e, path: r.path, parent: r });
    return KS(r, i);
  }
  '~validate'(e) {
    var t, n;
    const r = {
      common: { issues: [], async: !!this['~standard'].async },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: ES(e),
    };
    if (!this['~standard'].async)
      try {
        const t = this._parseSync({ data: e, path: [], parent: r });
        return IS(t) ? { value: t.value } : { issues: r.common.issues };
      } catch (i) {
        (null ===
          (n =
            null === (t = null == i ? void 0 : i.message) || void 0 === t
              ? void 0
              : t.toLowerCase()) || void 0 === n
          ? void 0
          : n.includes('encountered')) && (this['~standard'].async = !0),
          (r.common = { issues: [], async: !0 });
      }
    return this._parseAsync({ data: e, path: [], parent: r }).then((e) =>
      IS(e) ? { value: e.value } : { issues: r.common.issues }
    );
  }
  async parseAsync(e, t) {
    const n = await this.safeParseAsync(e, t);
    if (n.success) return n.data;
    throw n.error;
  }
  async safeParseAsync(e, t) {
    const n = {
        common: { issues: [], contextualErrorMap: null == t ? void 0 : t.errorMap, async: !0 },
        path: (null == t ? void 0 : t.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: ES(e),
      },
      r = this._parse({ data: e, path: n.path, parent: n }),
      i = await (zS(r) ? r : Promise.resolve(r));
    return KS(n, i);
  }
  refine(e, t) {
    const n = (e) =>
      'string' == typeof t || void 0 === t ? { message: t } : 'function' == typeof t ? t(e) : t;
    return this._refinement((t, r) => {
      const i = e(t),
        a = () => r.addIssue({ code: CS.custom, ...n(t) });
      return 'undefined' != typeof Promise && i instanceof Promise
        ? i.then((e) => !!e || (a(), !1))
        : !!i || (a(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement(
      (n, r) => !!e(n) || (r.addIssue('function' == typeof t ? t(n, r) : t), !1)
    );
  }
  _refinement(e) {
    return new X_({
      schema: this,
      typeName: lE.ZodEffects,
      effect: { type: 'refinement', refinement: e },
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    (this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this)),
      (this['~standard'] = { version: 1, vendor: 'zod', validate: (e) => this['~validate'](e) });
  }
  optional() {
    return Q_.create(this, this._def);
  }
  nullable() {
    return G_.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return O_.create(this);
  }
  promise() {
    return Y_.create(this, this._def);
  }
  or(e) {
    return N_.create([this, e], this._def);
  }
  and(e) {
    return V_.create(this, e, this._def);
  }
  transform(e) {
    return new X_({
      ...YS(this._def),
      schema: this,
      typeName: lE.ZodEffects,
      effect: { type: 'transform', transform: e },
    });
  }
  default(e) {
    const t = 'function' == typeof e ? e : () => e;
    return new J_({ ...YS(this._def), innerType: this, defaultValue: t, typeName: lE.ZodDefault });
  }
  brand() {
    return new rE({ typeName: lE.ZodBranded, type: this, ...YS(this._def) });
  }
  catch(e) {
    const t = 'function' == typeof e ? e : () => e;
    return new eE({ ...YS(this._def), innerType: this, catchValue: t, typeName: lE.ZodCatch });
  }
  describe(e) {
    return new (0, this.constructor)({ ...this._def, description: e });
  }
  pipe(e) {
    return iE.create(this, e);
  }
  readonly() {
    return aE.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const QS = /^c[^\s-]{8,}$/i,
  GS = /^[0-9a-z]+$/,
  JS = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
  e_ = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  t_ = /^[a-z0-9_-]{21}$/i,
  n_ = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
  r_ =
    /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
  i_ = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
let a_;
const o_ =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  s_ =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  l_ =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  u_ =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  c_ = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  d_ = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  f_ =
    '((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
  h_ = new RegExp(`^${f_}$`);
function p_(e) {
  let t = '([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d';
  return (
    e.precision
      ? (t = `${t}\\.\\d{${e.precision}}`)
      : null == e.precision && (t = `${t}(\\.\\d+)?`),
    t
  );
}
function m_(e) {
  let t = `${f_}T${p_(e)}`;
  const n = [];
  return (
    n.push(e.local ? 'Z?' : 'Z'),
    e.offset && n.push('([+-]\\d{2}:?\\d{2})'),
    (t = `${t}(${n.join('|')})`),
    new RegExp(`^${t}$`)
  );
}
function g_(e, t) {
  if (!n_.test(e)) return !1;
  try {
    const [n] = e.split('.'),
      r = n
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(n.length + ((4 - (n.length % 4)) % 4), '='),
      i = JSON.parse(atob(r));
    return 'object' == typeof i && null !== i && !(!i.typ || !i.alg) && (!t || i.alg === t);
  } catch (nA) {
    return !1;
  }
}
function y_(e, t) {
  return !(('v4' !== t && t) || !s_.test(e)) || !(('v6' !== t && t) || !u_.test(e));
}
class v_ extends XS {
  _parse(e) {
    this._def.coerce && (e.data = String(e.data));
    if (this._getType(e) !== _S.string) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.string, received: t.parsedType }), NS;
    }
    const t = new LS();
    let n;
    for (const a of this._def.checks)
      if ('min' === a.kind)
        e.data.length < a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, {
            code: CS.too_small,
            minimum: a.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          t.dirty());
      else if ('max' === a.kind)
        e.data.length > a.value &&
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, {
            code: CS.too_big,
            maximum: a.value,
            type: 'string',
            inclusive: !0,
            exact: !1,
            message: a.message,
          }),
          t.dirty());
      else if ('length' === a.kind) {
        const r = e.data.length > a.value,
          i = e.data.length < a.value;
        (r || i) &&
          ((n = this._getOrReturnCtx(e, n)),
          r
            ? DS(n, {
                code: CS.too_big,
                maximum: a.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: a.message,
              })
            : i &&
              DS(n, {
                code: CS.too_small,
                minimum: a.value,
                type: 'string',
                inclusive: !0,
                exact: !0,
                message: a.message,
              }),
          t.dirty());
      } else if ('email' === a.kind)
        i_.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { validation: 'email', code: CS.invalid_string, message: a.message }),
          t.dirty());
      else if ('emoji' === a.kind)
        a_ || (a_ = new RegExp('^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$', 'u')),
          a_.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            DS(n, { validation: 'emoji', code: CS.invalid_string, message: a.message }),
            t.dirty());
      else if ('uuid' === a.kind)
        e_.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { validation: 'uuid', code: CS.invalid_string, message: a.message }),
          t.dirty());
      else if ('nanoid' === a.kind)
        t_.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { validation: 'nanoid', code: CS.invalid_string, message: a.message }),
          t.dirty());
      else if ('cuid' === a.kind)
        QS.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { validation: 'cuid', code: CS.invalid_string, message: a.message }),
          t.dirty());
      else if ('cuid2' === a.kind)
        GS.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { validation: 'cuid2', code: CS.invalid_string, message: a.message }),
          t.dirty());
      else if ('ulid' === a.kind)
        JS.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { validation: 'ulid', code: CS.invalid_string, message: a.message }),
          t.dirty());
      else if ('url' === a.kind)
        try {
          new URL(e.data);
        } catch (nA) {
          (n = this._getOrReturnCtx(e, n)),
            DS(n, { validation: 'url', code: CS.invalid_string, message: a.message }),
            t.dirty();
        }
      else if ('regex' === a.kind) {
        a.regex.lastIndex = 0;
        a.regex.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { validation: 'regex', code: CS.invalid_string, message: a.message }),
          t.dirty());
      } else if ('trim' === a.kind) e.data = e.data.trim();
      else if ('includes' === a.kind)
        e.data.includes(a.value, a.position) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, {
            code: CS.invalid_string,
            validation: { includes: a.value, position: a.position },
            message: a.message,
          }),
          t.dirty());
      else if ('toLowerCase' === a.kind) e.data = e.data.toLowerCase();
      else if ('toUpperCase' === a.kind) e.data = e.data.toUpperCase();
      else if ('startsWith' === a.kind)
        e.data.startsWith(a.value) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, {
            code: CS.invalid_string,
            validation: { startsWith: a.value },
            message: a.message,
          }),
          t.dirty());
      else if ('endsWith' === a.kind)
        e.data.endsWith(a.value) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { code: CS.invalid_string, validation: { endsWith: a.value }, message: a.message }),
          t.dirty());
      else if ('datetime' === a.kind) {
        m_(a).test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { code: CS.invalid_string, validation: 'datetime', message: a.message }),
          t.dirty());
      } else if ('date' === a.kind) {
        h_.test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { code: CS.invalid_string, validation: 'date', message: a.message }),
          t.dirty());
      } else if ('time' === a.kind) {
        new RegExp(`^${p_(a)}$`).test(e.data) ||
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, { code: CS.invalid_string, validation: 'time', message: a.message }),
          t.dirty());
      } else
        'duration' === a.kind
          ? r_.test(e.data) ||
            ((n = this._getOrReturnCtx(e, n)),
            DS(n, { validation: 'duration', code: CS.invalid_string, message: a.message }),
            t.dirty())
          : 'ip' === a.kind
            ? ((r = e.data),
              (('v4' !== (i = a.version) && i) || !o_.test(r)) &&
                (('v6' !== i && i) || !l_.test(r)) &&
                ((n = this._getOrReturnCtx(e, n)),
                DS(n, { validation: 'ip', code: CS.invalid_string, message: a.message }),
                t.dirty()))
            : 'jwt' === a.kind
              ? g_(e.data, a.alg) ||
                ((n = this._getOrReturnCtx(e, n)),
                DS(n, { validation: 'jwt', code: CS.invalid_string, message: a.message }),
                t.dirty())
              : 'cidr' === a.kind
                ? y_(e.data, a.version) ||
                  ((n = this._getOrReturnCtx(e, n)),
                  DS(n, { validation: 'cidr', code: CS.invalid_string, message: a.message }),
                  t.dirty())
                : 'base64' === a.kind
                  ? c_.test(e.data) ||
                    ((n = this._getOrReturnCtx(e, n)),
                    DS(n, { validation: 'base64', code: CS.invalid_string, message: a.message }),
                    t.dirty())
                  : 'base64url' === a.kind
                    ? d_.test(e.data) ||
                      ((n = this._getOrReturnCtx(e, n)),
                      DS(n, {
                        validation: 'base64url',
                        code: CS.invalid_string,
                        message: a.message,
                      }),
                      t.dirty())
                    : xS.assertNever(a);
    var r, i;
    return { status: t.value, value: e.data };
  }
  _regex(e, t, n) {
    return this.refinement((t) => e.test(t), {
      validation: t,
      code: CS.invalid_string,
      ...$S.errToObj(n),
    });
  }
  _addCheck(e) {
    return new v_({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: 'email', ...$S.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: 'url', ...$S.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: 'emoji', ...$S.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: 'uuid', ...$S.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: 'nanoid', ...$S.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: 'cuid', ...$S.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: 'cuid2', ...$S.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: 'ulid', ...$S.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: 'base64', ...$S.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({ kind: 'base64url', ...$S.errToObj(e) });
  }
  jwt(e) {
    return this._addCheck({ kind: 'jwt', ...$S.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: 'ip', ...$S.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: 'cidr', ...$S.errToObj(e) });
  }
  datetime(e) {
    var t, n;
    return 'string' == typeof e
      ? this._addCheck({ kind: 'datetime', precision: null, offset: !1, local: !1, message: e })
      : this._addCheck({
          kind: 'datetime',
          precision:
            void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
          offset: null !== (t = null == e ? void 0 : e.offset) && void 0 !== t && t,
          local: null !== (n = null == e ? void 0 : e.local) && void 0 !== n && n,
          ...$S.errToObj(null == e ? void 0 : e.message),
        });
  }
  date(e) {
    return this._addCheck({ kind: 'date', message: e });
  }
  time(e) {
    return 'string' == typeof e
      ? this._addCheck({ kind: 'time', precision: null, message: e })
      : this._addCheck({
          kind: 'time',
          precision:
            void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
          ...$S.errToObj(null == e ? void 0 : e.message),
        });
  }
  duration(e) {
    return this._addCheck({ kind: 'duration', ...$S.errToObj(e) });
  }
  regex(e, t) {
    return this._addCheck({ kind: 'regex', regex: e, ...$S.errToObj(t) });
  }
  includes(e, t) {
    return this._addCheck({
      kind: 'includes',
      value: e,
      position: null == t ? void 0 : t.position,
      ...$S.errToObj(null == t ? void 0 : t.message),
    });
  }
  startsWith(e, t) {
    return this._addCheck({ kind: 'startsWith', value: e, ...$S.errToObj(t) });
  }
  endsWith(e, t) {
    return this._addCheck({ kind: 'endsWith', value: e, ...$S.errToObj(t) });
  }
  min(e, t) {
    return this._addCheck({ kind: 'min', value: e, ...$S.errToObj(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: 'max', value: e, ...$S.errToObj(t) });
  }
  length(e, t) {
    return this._addCheck({ kind: 'length', value: e, ...$S.errToObj(t) });
  }
  nonempty(e) {
    return this.min(1, $S.errToObj(e));
  }
  trim() {
    return new v_({ ...this._def, checks: [...this._def.checks, { kind: 'trim' }] });
  }
  toLowerCase() {
    return new v_({ ...this._def, checks: [...this._def.checks, { kind: 'toLowerCase' }] });
  }
  toUpperCase() {
    return new v_({ ...this._def, checks: [...this._def.checks, { kind: 'toUpperCase' }] });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => 'datetime' === e.kind);
  }
  get isDate() {
    return !!this._def.checks.find((e) => 'date' === e.kind);
  }
  get isTime() {
    return !!this._def.checks.find((e) => 'time' === e.kind);
  }
  get isDuration() {
    return !!this._def.checks.find((e) => 'duration' === e.kind);
  }
  get isEmail() {
    return !!this._def.checks.find((e) => 'email' === e.kind);
  }
  get isURL() {
    return !!this._def.checks.find((e) => 'url' === e.kind);
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => 'emoji' === e.kind);
  }
  get isUUID() {
    return !!this._def.checks.find((e) => 'uuid' === e.kind);
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => 'nanoid' === e.kind);
  }
  get isCUID() {
    return !!this._def.checks.find((e) => 'cuid' === e.kind);
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => 'cuid2' === e.kind);
  }
  get isULID() {
    return !!this._def.checks.find((e) => 'ulid' === e.kind);
  }
  get isIP() {
    return !!this._def.checks.find((e) => 'ip' === e.kind);
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => 'cidr' === e.kind);
  }
  get isBase64() {
    return !!this._def.checks.find((e) => 'base64' === e.kind);
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => 'base64url' === e.kind);
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      'min' === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      'max' === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
}
function b_(e, t) {
  const n = (e.toString().split('.')[1] || '').length,
    r = (t.toString().split('.')[1] || '').length,
    i = n > r ? n : r;
  return (
    (parseInt(e.toFixed(i).replace('.', '')) % parseInt(t.toFixed(i).replace('.', ''))) /
    Math.pow(10, i)
  );
}
v_.create = (e) => {
  var t;
  return new v_({
    checks: [],
    typeName: lE.ZodString,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...YS(e),
  });
};
class w_ extends XS {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(e) {
    this._def.coerce && (e.data = Number(e.data));
    if (this._getType(e) !== _S.number) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.number, received: t.parsedType }), NS;
    }
    let t;
    const n = new LS();
    for (const r of this._def.checks)
      if ('int' === r.kind)
        xS.isInteger(e.data) ||
          ((t = this._getOrReturnCtx(e, t)),
          DS(t, {
            code: CS.invalid_type,
            expected: 'integer',
            received: 'float',
            message: r.message,
          }),
          n.dirty());
      else if ('min' === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          DS(t, {
            code: CS.too_small,
            minimum: r.value,
            type: 'number',
            inclusive: r.inclusive,
            exact: !1,
            message: r.message,
          }),
          n.dirty());
      } else if ('max' === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          DS(t, {
            code: CS.too_big,
            maximum: r.value,
            type: 'number',
            inclusive: r.inclusive,
            exact: !1,
            message: r.message,
          }),
          n.dirty());
      } else
        'multipleOf' === r.kind
          ? 0 !== b_(e.data, r.value) &&
            ((t = this._getOrReturnCtx(e, t)),
            DS(t, { code: CS.not_multiple_of, multipleOf: r.value, message: r.message }),
            n.dirty())
          : 'finite' === r.kind
            ? Number.isFinite(e.data) ||
              ((t = this._getOrReturnCtx(e, t)),
              DS(t, { code: CS.not_finite, message: r.message }),
              n.dirty())
            : xS.assertNever(r);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, $S.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, $S.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, $S.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, $S.toString(t));
  }
  setLimit(e, t, n, r) {
    return new w_({
      ...this._def,
      checks: [...this._def.checks, { kind: e, value: t, inclusive: n, message: $S.toString(r) }],
    });
  }
  _addCheck(e) {
    return new w_({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: 'int', message: $S.toString(e) });
  }
  positive(e) {
    return this._addCheck({ kind: 'min', value: 0, inclusive: !1, message: $S.toString(e) });
  }
  negative(e) {
    return this._addCheck({ kind: 'max', value: 0, inclusive: !1, message: $S.toString(e) });
  }
  nonpositive(e) {
    return this._addCheck({ kind: 'max', value: 0, inclusive: !0, message: $S.toString(e) });
  }
  nonnegative(e) {
    return this._addCheck({ kind: 'min', value: 0, inclusive: !0, message: $S.toString(e) });
  }
  multipleOf(e, t) {
    return this._addCheck({ kind: 'multipleOf', value: e, message: $S.toString(t) });
  }
  finite(e) {
    return this._addCheck({ kind: 'finite', message: $S.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: 'min',
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: $S.toString(e),
    })._addCheck({
      kind: 'max',
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: $S.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      'min' === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      'max' === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) => 'int' === e.kind || ('multipleOf' === e.kind && xS.isInteger(e.value))
    );
  }
  get isFinite() {
    let e = null,
      t = null;
    for (const n of this._def.checks) {
      if ('finite' === n.kind || 'int' === n.kind || 'multipleOf' === n.kind) return !0;
      'min' === n.kind
        ? (null === t || n.value > t) && (t = n.value)
        : 'max' === n.kind && (null === e || n.value < e) && (e = n.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
w_.create = (e) =>
  new w_({
    checks: [],
    typeName: lE.ZodNumber,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...YS(e),
  });
class x_ extends XS {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch (nA) {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== _S.bigint) return this._getInvalidInput(e);
    let t;
    const n = new LS();
    for (const r of this._def.checks)
      if ('min' === r.kind) {
        (r.inclusive ? e.data < r.value : e.data <= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          DS(t, {
            code: CS.too_small,
            type: 'bigint',
            minimum: r.value,
            inclusive: r.inclusive,
            message: r.message,
          }),
          n.dirty());
      } else if ('max' === r.kind) {
        (r.inclusive ? e.data > r.value : e.data >= r.value) &&
          ((t = this._getOrReturnCtx(e, t)),
          DS(t, {
            code: CS.too_big,
            type: 'bigint',
            maximum: r.value,
            inclusive: r.inclusive,
            message: r.message,
          }),
          n.dirty());
      } else
        'multipleOf' === r.kind
          ? e.data % r.value !== BigInt(0) &&
            ((t = this._getOrReturnCtx(e, t)),
            DS(t, { code: CS.not_multiple_of, multipleOf: r.value, message: r.message }),
            n.dirty())
          : xS.assertNever(r);
    return { status: n.value, value: e.data };
  }
  _getInvalidInput(e) {
    const t = this._getOrReturnCtx(e);
    return DS(t, { code: CS.invalid_type, expected: _S.bigint, received: t.parsedType }), NS;
  }
  gte(e, t) {
    return this.setLimit('min', e, !0, $S.toString(t));
  }
  gt(e, t) {
    return this.setLimit('min', e, !1, $S.toString(t));
  }
  lte(e, t) {
    return this.setLimit('max', e, !0, $S.toString(t));
  }
  lt(e, t) {
    return this.setLimit('max', e, !1, $S.toString(t));
  }
  setLimit(e, t, n, r) {
    return new x_({
      ...this._def,
      checks: [...this._def.checks, { kind: e, value: t, inclusive: n, message: $S.toString(r) }],
    });
  }
  _addCheck(e) {
    return new x_({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !1,
      message: $S.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !1,
      message: $S.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: !0,
      message: $S.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: !0,
      message: $S.toString(e),
    });
  }
  multipleOf(e, t) {
    return this._addCheck({ kind: 'multipleOf', value: e, message: $S.toString(t) });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      'min' === t.kind && (null === e || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      'max' === t.kind && (null === e || t.value < e) && (e = t.value);
    return e;
  }
}
x_.create = (e) => {
  var t;
  return new x_({
    checks: [],
    typeName: lE.ZodBigInt,
    coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
    ...YS(e),
  });
};
class k_ extends XS {
  _parse(e) {
    this._def.coerce && (e.data = Boolean(e.data));
    if (this._getType(e) !== _S.boolean) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.boolean, received: t.parsedType }), NS;
    }
    return FS(e.data);
  }
}
k_.create = (e) =>
  new k_({ typeName: lE.ZodBoolean, coerce: (null == e ? void 0 : e.coerce) || !1, ...YS(e) });
class S_ extends XS {
  _parse(e) {
    this._def.coerce && (e.data = new Date(e.data));
    if (this._getType(e) !== _S.date) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.date, received: t.parsedType }), NS;
    }
    if (isNaN(e.data.getTime())) {
      return DS(this._getOrReturnCtx(e), { code: CS.invalid_date }), NS;
    }
    const t = new LS();
    let n;
    for (const r of this._def.checks)
      'min' === r.kind
        ? e.data.getTime() < r.value &&
          ((n = this._getOrReturnCtx(e, n)),
          DS(n, {
            code: CS.too_small,
            message: r.message,
            inclusive: !0,
            exact: !1,
            minimum: r.value,
            type: 'date',
          }),
          t.dirty())
        : 'max' === r.kind
          ? e.data.getTime() > r.value &&
            ((n = this._getOrReturnCtx(e, n)),
            DS(n, {
              code: CS.too_big,
              message: r.message,
              inclusive: !0,
              exact: !1,
              maximum: r.value,
              type: 'date',
            }),
            t.dirty())
          : xS.assertNever(r);
    return { status: t.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new S_({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, t) {
    return this._addCheck({ kind: 'min', value: e.getTime(), message: $S.toString(t) });
  }
  max(e, t) {
    return this._addCheck({ kind: 'max', value: e.getTime(), message: $S.toString(t) });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      'min' === t.kind && (null === e || t.value > e) && (e = t.value);
    return null != e ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      'max' === t.kind && (null === e || t.value < e) && (e = t.value);
    return null != e ? new Date(e) : null;
  }
}
S_.create = (e) =>
  new S_({
    checks: [],
    coerce: (null == e ? void 0 : e.coerce) || !1,
    typeName: lE.ZodDate,
    ...YS(e),
  });
class __ extends XS {
  _parse(e) {
    if (this._getType(e) !== _S.symbol) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.symbol, received: t.parsedType }), NS;
    }
    return FS(e.data);
  }
}
__.create = (e) => new __({ typeName: lE.ZodSymbol, ...YS(e) });
class E_ extends XS {
  _parse(e) {
    if (this._getType(e) !== _S.undefined) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.undefined, received: t.parsedType }), NS;
    }
    return FS(e.data);
  }
}
E_.create = (e) => new E_({ typeName: lE.ZodUndefined, ...YS(e) });
class C_ extends XS {
  _parse(e) {
    if (this._getType(e) !== _S.null) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.null, received: t.parsedType }), NS;
    }
    return FS(e.data);
  }
}
C_.create = (e) => new C_({ typeName: lE.ZodNull, ...YS(e) });
class T_ extends XS {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(e) {
    return FS(e.data);
  }
}
T_.create = (e) => new T_({ typeName: lE.ZodAny, ...YS(e) });
class P_ extends XS {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(e) {
    return FS(e.data);
  }
}
P_.create = (e) => new P_({ typeName: lE.ZodUnknown, ...YS(e) });
class A_ extends XS {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return DS(t, { code: CS.invalid_type, expected: _S.never, received: t.parsedType }), NS;
  }
}
A_.create = (e) => new A_({ typeName: lE.ZodNever, ...YS(e) });
class R_ extends XS {
  _parse(e) {
    if (this._getType(e) !== _S.undefined) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.void, received: t.parsedType }), NS;
    }
    return FS(e.data);
  }
}
R_.create = (e) => new R_({ typeName: lE.ZodVoid, ...YS(e) });
class O_ extends XS {
  _parse(e) {
    const { ctx: t, status: n } = this._processInputParams(e),
      r = this._def;
    if (t.parsedType !== _S.array)
      return DS(t, { code: CS.invalid_type, expected: _S.array, received: t.parsedType }), NS;
    if (null !== r.exactLength) {
      const e = t.data.length > r.exactLength.value,
        i = t.data.length < r.exactLength.value;
      (e || i) &&
        (DS(t, {
          code: e ? CS.too_big : CS.too_small,
          minimum: i ? r.exactLength.value : void 0,
          maximum: e ? r.exactLength.value : void 0,
          type: 'array',
          inclusive: !0,
          exact: !0,
          message: r.exactLength.message,
        }),
        n.dirty());
    }
    if (
      (null !== r.minLength &&
        t.data.length < r.minLength.value &&
        (DS(t, {
          code: CS.too_small,
          minimum: r.minLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: r.minLength.message,
        }),
        n.dirty()),
      null !== r.maxLength &&
        t.data.length > r.maxLength.value &&
        (DS(t, {
          code: CS.too_big,
          maximum: r.maxLength.value,
          type: 'array',
          inclusive: !0,
          exact: !1,
          message: r.maxLength.message,
        }),
        n.dirty()),
      t.common.async)
    )
      return Promise.all(
        [...t.data].map((e, n) => r.type._parseAsync(new qS(t, e, t.path, n)))
      ).then((e) => LS.mergeArray(n, e));
    const i = [...t.data].map((e, n) => r.type._parseSync(new qS(t, e, t.path, n)));
    return LS.mergeArray(n, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new O_({ ...this._def, minLength: { value: e, message: $S.toString(t) } });
  }
  max(e, t) {
    return new O_({ ...this._def, maxLength: { value: e, message: $S.toString(t) } });
  }
  length(e, t) {
    return new O_({ ...this._def, exactLength: { value: e, message: $S.toString(t) } });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
function D_(e) {
  if (e instanceof L_) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = Q_.create(D_(r));
    }
    return new L_({ ...e._def, shape: () => t });
  }
  return e instanceof O_
    ? new O_({ ...e._def, type: D_(e.element) })
    : e instanceof Q_
      ? Q_.create(D_(e.unwrap()))
      : e instanceof G_
        ? G_.create(D_(e.unwrap()))
        : e instanceof I_
          ? I_.create(e.items.map((e) => D_(e)))
          : e;
}
O_.create = (e, t) =>
  new O_({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: lE.ZodArray,
    ...YS(t),
  });
class L_ extends XS {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (null !== this._cached) return this._cached;
    const e = this._def.shape(),
      t = xS.objectKeys(e);
    return (this._cached = { shape: e, keys: t });
  }
  _parse(e) {
    if (this._getType(e) !== _S.object) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.object, received: t.parsedType }), NS;
    }
    const { status: t, ctx: n } = this._processInputParams(e),
      { shape: r, keys: i } = this._getCached(),
      a = [];
    if (!(this._def.catchall instanceof A_ && 'strip' === this._def.unknownKeys))
      for (const s in n.data) i.includes(s) || a.push(s);
    const o = [];
    for (const s of i) {
      const e = r[s],
        t = n.data[s];
      o.push({
        key: { status: 'valid', value: s },
        value: e._parse(new qS(n, t, n.path, s)),
        alwaysSet: s in n.data,
      });
    }
    if (this._def.catchall instanceof A_) {
      const e = this._def.unknownKeys;
      if ('passthrough' === e)
        for (const t of a)
          o.push({
            key: { status: 'valid', value: t },
            value: { status: 'valid', value: n.data[t] },
          });
      else if ('strict' === e)
        a.length > 0 && (DS(n, { code: CS.unrecognized_keys, keys: a }), t.dirty());
      else if ('strip' !== e)
        throw new Error('Internal ZodObject error: invalid unknownKeys value.');
    } else {
      const e = this._def.catchall;
      for (const t of a) {
        const r = n.data[t];
        o.push({
          key: { status: 'valid', value: t },
          value: e._parse(new qS(n, r, n.path, t)),
          alwaysSet: t in n.data,
        });
      }
    }
    return n.common.async
      ? Promise.resolve()
          .then(async () => {
            const e = [];
            for (const t of o) {
              const n = await t.key,
                r = await t.value;
              e.push({ key: n, value: r, alwaysSet: t.alwaysSet });
            }
            return e;
          })
          .then((e) => LS.mergeObjectSync(t, e))
      : LS.mergeObjectSync(t, o);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      $S.errToObj,
      new L_({
        ...this._def,
        unknownKeys: 'strict',
        ...(void 0 !== e
          ? {
              errorMap: (t, n) => {
                var r, i, a, o;
                const s =
                  null !==
                    (a =
                      null === (i = (r = this._def).errorMap) || void 0 === i
                        ? void 0
                        : i.call(r, t, n).message) && void 0 !== a
                    ? a
                    : n.defaultError;
                return 'unrecognized_keys' === t.code
                  ? { message: null !== (o = $S.errToObj(e).message) && void 0 !== o ? o : s }
                  : { message: s };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new L_({ ...this._def, unknownKeys: 'strip' });
  }
  passthrough() {
    return new L_({ ...this._def, unknownKeys: 'passthrough' });
  }
  extend(e) {
    return new L_({ ...this._def, shape: () => ({ ...this._def.shape(), ...e }) });
  }
  merge(e) {
    return new L_({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: lE.ZodObject,
    });
  }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  catchall(e) {
    return new L_({ ...this._def, catchall: e });
  }
  pick(e) {
    const t = {};
    return (
      xS.objectKeys(e).forEach((n) => {
        e[n] && this.shape[n] && (t[n] = this.shape[n]);
      }),
      new L_({ ...this._def, shape: () => t })
    );
  }
  omit(e) {
    const t = {};
    return (
      xS.objectKeys(this.shape).forEach((n) => {
        e[n] || (t[n] = this.shape[n]);
      }),
      new L_({ ...this._def, shape: () => t })
    );
  }
  deepPartial() {
    return D_(this);
  }
  partial(e) {
    const t = {};
    return (
      xS.objectKeys(this.shape).forEach((n) => {
        const r = this.shape[n];
        e && !e[n] ? (t[n] = r) : (t[n] = r.optional());
      }),
      new L_({ ...this._def, shape: () => t })
    );
  }
  required(e) {
    const t = {};
    return (
      xS.objectKeys(this.shape).forEach((n) => {
        if (e && !e[n]) t[n] = this.shape[n];
        else {
          let e = this.shape[n];
          for (; e instanceof Q_; ) e = e._def.innerType;
          t[n] = e;
        }
      }),
      new L_({ ...this._def, shape: () => t })
    );
  }
  keyof() {
    return H_(xS.objectKeys(this.shape));
  }
}
(L_.create = (e, t) =>
  new L_({
    shape: () => e,
    unknownKeys: 'strip',
    catchall: A_.create(),
    typeName: lE.ZodObject,
    ...YS(t),
  })),
  (L_.strictCreate = (e, t) =>
    new L_({
      shape: () => e,
      unknownKeys: 'strict',
      catchall: A_.create(),
      typeName: lE.ZodObject,
      ...YS(t),
    })),
  (L_.lazycreate = (e, t) =>
    new L_({
      shape: e,
      unknownKeys: 'strip',
      catchall: A_.create(),
      typeName: lE.ZodObject,
      ...YS(t),
    }));
class N_ extends XS {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      n = this._def.options;
    if (t.common.async)
      return Promise.all(
        n.map(async (e) => {
          const n = { ...t, common: { ...t.common, issues: [] }, parent: null };
          return { result: await e._parseAsync({ data: t.data, path: t.path, parent: n }), ctx: n };
        })
      ).then(function (e) {
        for (const t of e) if ('valid' === t.result.status) return t.result;
        for (const r of e)
          if ('dirty' === r.result.status)
            return t.common.issues.push(...r.ctx.common.issues), r.result;
        const n = e.map((e) => new TS(e.ctx.common.issues));
        return DS(t, { code: CS.invalid_union, unionErrors: n }), NS;
      });
    {
      let e;
      const r = [];
      for (const a of n) {
        const n = { ...t, common: { ...t.common, issues: [] }, parent: null },
          i = a._parseSync({ data: t.data, path: t.path, parent: n });
        if ('valid' === i.status) return i;
        'dirty' !== i.status || e || (e = { result: i, ctx: n }),
          n.common.issues.length && r.push(n.common.issues);
      }
      if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
      const i = r.map((e) => new TS(e));
      return DS(t, { code: CS.invalid_union, unionErrors: i }), NS;
    }
  }
  get options() {
    return this._def.options;
  }
}
N_.create = (e, t) => new N_({ options: e, typeName: lE.ZodUnion, ...YS(t) });
const M_ = (e) =>
  e instanceof Z_
    ? M_(e.schema)
    : e instanceof X_
      ? M_(e.innerType())
      : e instanceof W_
        ? [e.value]
        : e instanceof q_
          ? e.options
          : e instanceof K_
            ? xS.objectValues(e.enum)
            : e instanceof J_
              ? M_(e._def.innerType)
              : e instanceof E_
                ? [void 0]
                : e instanceof C_
                  ? [null]
                  : e instanceof Q_
                    ? [void 0, ...M_(e.unwrap())]
                    : e instanceof G_
                      ? [null, ...M_(e.unwrap())]
                      : e instanceof rE || e instanceof aE
                        ? M_(e.unwrap())
                        : e instanceof eE
                          ? M_(e._def.innerType)
                          : [];
class F_ extends XS {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== _S.object)
      return DS(t, { code: CS.invalid_type, expected: _S.object, received: t.parsedType }), NS;
    const n = this.discriminator,
      r = t.data[n],
      i = this.optionsMap.get(r);
    return i
      ? t.common.async
        ? i._parseAsync({ data: t.data, path: t.path, parent: t })
        : i._parseSync({ data: t.data, path: t.path, parent: t })
      : (DS(t, {
          code: CS.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [n],
        }),
        NS);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(e, t, n) {
    const r = new Map();
    for (const i of t) {
      const t = M_(i.shape[e]);
      if (!t.length)
        throw new Error(
          `A discriminator value for key \`${e}\` could not be extracted from all schema options`
        );
      for (const n of t) {
        if (r.has(n))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(n)}`);
        r.set(n, i);
      }
    }
    return new F_({
      typeName: lE.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: r,
      ...YS(n),
    });
  }
}
function j_(e, t) {
  const n = ES(e),
    r = ES(t);
  if (e === t) return { valid: !0, data: e };
  if (n === _S.object && r === _S.object) {
    const n = xS.objectKeys(t),
      r = xS.objectKeys(e).filter((e) => -1 !== n.indexOf(e)),
      i = { ...e, ...t };
    for (const a of r) {
      const n = j_(e[a], t[a]);
      if (!n.valid) return { valid: !1 };
      i[a] = n.data;
    }
    return { valid: !0, data: i };
  }
  if (n === _S.array && r === _S.array) {
    if (e.length !== t.length) return { valid: !1 };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const i = j_(e[r], t[r]);
      if (!i.valid) return { valid: !1 };
      n.push(i.data);
    }
    return { valid: !0, data: n };
  }
  return n === _S.date && r === _S.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class V_ extends XS {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e),
      r = (e, r) => {
        if (jS(e) || jS(r)) return NS;
        const i = j_(e.value, r.value);
        return i.valid
          ? ((VS(e) || VS(r)) && t.dirty(), { status: t.value, value: i.data })
          : (DS(n, { code: CS.invalid_intersection_types }), NS);
      };
    return n.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseAsync({ data: n.data, path: n.path, parent: n }),
        ]).then(([e, t]) => r(e, t))
      : r(
          this._def.left._parseSync({ data: n.data, path: n.path, parent: n }),
          this._def.right._parseSync({ data: n.data, path: n.path, parent: n })
        );
  }
}
V_.create = (e, t, n) => new V_({ left: e, right: t, typeName: lE.ZodIntersection, ...YS(n) });
class I_ extends XS {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== _S.array)
      return DS(n, { code: CS.invalid_type, expected: _S.array, received: n.parsedType }), NS;
    if (n.data.length < this._def.items.length)
      return (
        DS(n, {
          code: CS.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: 'array',
        }),
        NS
      );
    !this._def.rest &&
      n.data.length > this._def.items.length &&
      (DS(n, {
        code: CS.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: 'array',
      }),
      t.dirty());
    const r = [...n.data]
      .map((e, t) => {
        const r = this._def.items[t] || this._def.rest;
        return r ? r._parse(new qS(n, e, n.path, t)) : null;
      })
      .filter((e) => !!e);
    return n.common.async ? Promise.all(r).then((e) => LS.mergeArray(t, e)) : LS.mergeArray(t, r);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new I_({ ...this._def, rest: e });
  }
}
I_.create = (e, t) => {
  if (!Array.isArray(e)) throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  return new I_({ items: e, typeName: lE.ZodTuple, rest: null, ...YS(t) });
};
class z_ extends XS {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== _S.object)
      return DS(n, { code: CS.invalid_type, expected: _S.object, received: n.parsedType }), NS;
    const r = [],
      i = this._def.keyType,
      a = this._def.valueType;
    for (const o in n.data)
      r.push({
        key: i._parse(new qS(n, o, n.path, o)),
        value: a._parse(new qS(n, n.data[o], n.path, o)),
        alwaysSet: o in n.data,
      });
    return n.common.async ? LS.mergeObjectAsync(t, r) : LS.mergeObjectSync(t, r);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, n) {
    return new z_(
      t instanceof XS
        ? { keyType: e, valueType: t, typeName: lE.ZodRecord, ...YS(n) }
        : { keyType: v_.create(), valueType: e, typeName: lE.ZodRecord, ...YS(t) }
    );
  }
}
class B_ extends XS {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== _S.map)
      return DS(n, { code: CS.invalid_type, expected: _S.map, received: n.parsedType }), NS;
    const r = this._def.keyType,
      i = this._def.valueType,
      a = [...n.data.entries()].map(([e, t], a) => ({
        key: r._parse(new qS(n, e, n.path, [a, 'key'])),
        value: i._parse(new qS(n, t, n.path, [a, 'value'])),
      }));
    if (n.common.async) {
      const e = new Map();
      return Promise.resolve().then(async () => {
        for (const n of a) {
          const r = await n.key,
            i = await n.value;
          if ('aborted' === r.status || 'aborted' === i.status) return NS;
          ('dirty' !== r.status && 'dirty' !== i.status) || t.dirty(), e.set(r.value, i.value);
        }
        return { status: t.value, value: e };
      });
    }
    {
      const e = new Map();
      for (const n of a) {
        const r = n.key,
          i = n.value;
        if ('aborted' === r.status || 'aborted' === i.status) return NS;
        ('dirty' !== r.status && 'dirty' !== i.status) || t.dirty(), e.set(r.value, i.value);
      }
      return { status: t.value, value: e };
    }
  }
}
B_.create = (e, t, n) => new B_({ valueType: t, keyType: e, typeName: lE.ZodMap, ...YS(n) });
class U_ extends XS {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== _S.set)
      return DS(n, { code: CS.invalid_type, expected: _S.set, received: n.parsedType }), NS;
    const r = this._def;
    null !== r.minSize &&
      n.data.size < r.minSize.value &&
      (DS(n, {
        code: CS.too_small,
        minimum: r.minSize.value,
        type: 'set',
        inclusive: !0,
        exact: !1,
        message: r.minSize.message,
      }),
      t.dirty()),
      null !== r.maxSize &&
        n.data.size > r.maxSize.value &&
        (DS(n, {
          code: CS.too_big,
          maximum: r.maxSize.value,
          type: 'set',
          inclusive: !0,
          exact: !1,
          message: r.maxSize.message,
        }),
        t.dirty());
    const i = this._def.valueType;
    function a(e) {
      const n = new Set();
      for (const r of e) {
        if ('aborted' === r.status) return NS;
        'dirty' === r.status && t.dirty(), n.add(r.value);
      }
      return { status: t.value, value: n };
    }
    const o = [...n.data.values()].map((e, t) => i._parse(new qS(n, e, n.path, t)));
    return n.common.async ? Promise.all(o).then((e) => a(e)) : a(o);
  }
  min(e, t) {
    return new U_({ ...this._def, minSize: { value: e, message: $S.toString(t) } });
  }
  max(e, t) {
    return new U_({ ...this._def, maxSize: { value: e, message: $S.toString(t) } });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
U_.create = (e, t) =>
  new U_({ valueType: e, minSize: null, maxSize: null, typeName: lE.ZodSet, ...YS(t) });
class $_ extends XS {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== _S.function)
      return DS(t, { code: CS.invalid_type, expected: _S.function, received: t.parsedType }), NS;
    function n(e, n) {
      return OS({
        data: e,
        path: t.path,
        errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, RS(), PS].filter((e) => !!e),
        issueData: { code: CS.invalid_arguments, argumentsError: n },
      });
    }
    function r(e, n) {
      return OS({
        data: e,
        path: t.path,
        errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, RS(), PS].filter((e) => !!e),
        issueData: { code: CS.invalid_return_type, returnTypeError: n },
      });
    }
    const i = { errorMap: t.common.contextualErrorMap },
      a = t.data;
    if (this._def.returns instanceof Y_) {
      const e = this;
      return FS(async function (...t) {
        const o = new TS([]),
          s = await e._def.args.parseAsync(t, i).catch((e) => {
            throw (o.addIssue(n(t, e)), o);
          }),
          l = await Reflect.apply(a, this, s);
        return await e._def.returns._def.type.parseAsync(l, i).catch((e) => {
          throw (o.addIssue(r(l, e)), o);
        });
      });
    }
    {
      const e = this;
      return FS(function (...t) {
        const o = e._def.args.safeParse(t, i);
        if (!o.success) throw new TS([n(t, o.error)]);
        const s = Reflect.apply(a, this, o.data),
          l = e._def.returns.safeParse(s, i);
        if (!l.success) throw new TS([r(s, l.error)]);
        return l.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new $_({ ...this._def, args: I_.create(e).rest(P_.create()) });
  }
  returns(e) {
    return new $_({ ...this._def, returns: e });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, n) {
    return new $_({
      args: e || I_.create([]).rest(P_.create()),
      returns: t || P_.create(),
      typeName: lE.ZodFunction,
      ...YS(n),
    });
  }
}
class Z_ extends XS {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
Z_.create = (e, t) => new Z_({ getter: e, typeName: lE.ZodLazy, ...YS(t) });
class W_ extends XS {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { received: t.data, code: CS.invalid_literal, expected: this._def.value }), NS;
    }
    return { status: 'valid', value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
function H_(e, t) {
  return new q_({ values: e, typeName: lE.ZodEnum, ...YS(t) });
}
W_.create = (e, t) => new W_({ value: e, typeName: lE.ZodLiteral, ...YS(t) });
class q_ extends XS {
  constructor() {
    super(...arguments), WS.set(this, void 0);
  }
  _parse(e) {
    if ('string' != typeof e.data) {
      const t = this._getOrReturnCtx(e),
        n = this._def.values;
      return (
        DS(t, { expected: xS.joinValues(n), received: t.parsedType, code: CS.invalid_type }), NS
      );
    }
    if (
      (BS(this, WS, 'f') || US(this, WS, new Set(this._def.values), 'f'),
      !BS(this, WS, 'f').has(e.data))
    ) {
      const t = this._getOrReturnCtx(e),
        n = this._def.values;
      return DS(t, { received: t.data, code: CS.invalid_enum_value, options: n }), NS;
    }
    return FS(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values) e[t] = t;
    return e;
  }
  extract(e, t = this._def) {
    return q_.create(e, { ...this._def, ...t });
  }
  exclude(e, t = this._def) {
    return q_.create(
      this.options.filter((t) => !e.includes(t)),
      { ...this._def, ...t }
    );
  }
}
(WS = new WeakMap()), (q_.create = H_);
class K_ extends XS {
  constructor() {
    super(...arguments), HS.set(this, void 0);
  }
  _parse(e) {
    const t = xS.getValidEnumValues(this._def.values),
      n = this._getOrReturnCtx(e);
    if (n.parsedType !== _S.string && n.parsedType !== _S.number) {
      const e = xS.objectValues(t);
      return (
        DS(n, { expected: xS.joinValues(e), received: n.parsedType, code: CS.invalid_type }), NS
      );
    }
    if (
      (BS(this, HS, 'f') || US(this, HS, new Set(xS.getValidEnumValues(this._def.values)), 'f'),
      !BS(this, HS, 'f').has(e.data))
    ) {
      const e = xS.objectValues(t);
      return DS(n, { received: n.data, code: CS.invalid_enum_value, options: e }), NS;
    }
    return FS(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
(HS = new WeakMap()),
  (K_.create = (e, t) => new K_({ values: e, typeName: lE.ZodNativeEnum, ...YS(t) }));
class Y_ extends XS {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== _S.promise && !1 === t.common.async)
      return DS(t, { code: CS.invalid_type, expected: _S.promise, received: t.parsedType }), NS;
    const n = t.parsedType === _S.promise ? t.data : Promise.resolve(t.data);
    return FS(
      n.then((e) =>
        this._def.type.parseAsync(e, { path: t.path, errorMap: t.common.contextualErrorMap })
      )
    );
  }
}
Y_.create = (e, t) => new Y_({ type: e, typeName: lE.ZodPromise, ...YS(t) });
class X_ extends XS {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === lE.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e),
      r = this._def.effect || null,
      i = {
        addIssue: (e) => {
          DS(n, e), e.fatal ? t.abort() : t.dirty();
        },
        get path() {
          return n.path;
        },
      };
    if (((i.addIssue = i.addIssue.bind(i)), 'preprocess' === r.type)) {
      const e = r.transform(n.data, i);
      if (n.common.async)
        return Promise.resolve(e).then(async (e) => {
          if ('aborted' === t.value) return NS;
          const r = await this._def.schema._parseAsync({ data: e, path: n.path, parent: n });
          return 'aborted' === r.status
            ? NS
            : 'dirty' === r.status || 'dirty' === t.value
              ? MS(r.value)
              : r;
        });
      {
        if ('aborted' === t.value) return NS;
        const r = this._def.schema._parseSync({ data: e, path: n.path, parent: n });
        return 'aborted' === r.status
          ? NS
          : 'dirty' === r.status || 'dirty' === t.value
            ? MS(r.value)
            : r;
      }
    }
    if ('refinement' === r.type) {
      const e = (e) => {
        const t = r.refinement(e, i);
        if (n.common.async) return Promise.resolve(t);
        if (t instanceof Promise)
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        return e;
      };
      if (!1 === n.common.async) {
        const r = this._def.schema._parseSync({ data: n.data, path: n.path, parent: n });
        return 'aborted' === r.status
          ? NS
          : ('dirty' === r.status && t.dirty(), e(r.value), { status: t.value, value: r.value });
      }
      return this._def.schema
        ._parseAsync({ data: n.data, path: n.path, parent: n })
        .then((n) =>
          'aborted' === n.status
            ? NS
            : ('dirty' === n.status && t.dirty(),
              e(n.value).then(() => ({ status: t.value, value: n.value })))
        );
    }
    if ('transform' === r.type) {
      if (!1 === n.common.async) {
        const e = this._def.schema._parseSync({ data: n.data, path: n.path, parent: n });
        if (!IS(e)) return e;
        const a = r.transform(e.value, i);
        if (a instanceof Promise)
          throw new Error(
            'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        return { status: t.value, value: a };
      }
      return this._def.schema
        ._parseAsync({ data: n.data, path: n.path, parent: n })
        .then((e) =>
          IS(e)
            ? Promise.resolve(r.transform(e.value, i)).then((e) => ({ status: t.value, value: e }))
            : e
        );
    }
    xS.assertNever(r);
  }
}
(X_.create = (e, t, n) => new X_({ schema: e, typeName: lE.ZodEffects, effect: t, ...YS(n) })),
  (X_.createWithPreprocess = (e, t, n) =>
    new X_({
      schema: t,
      effect: { type: 'preprocess', transform: e },
      typeName: lE.ZodEffects,
      ...YS(n),
    }));
class Q_ extends XS {
  _parse(e) {
    return this._getType(e) === _S.undefined ? FS(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Q_.create = (e, t) => new Q_({ innerType: e, typeName: lE.ZodOptional, ...YS(t) });
class G_ extends XS {
  _parse(e) {
    return this._getType(e) === _S.null ? FS(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
G_.create = (e, t) => new G_({ innerType: e, typeName: lE.ZodNullable, ...YS(t) });
class J_ extends XS {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let n = t.data;
    return (
      t.parsedType === _S.undefined && (n = this._def.defaultValue()),
      this._def.innerType._parse({ data: n, path: t.path, parent: t })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
J_.create = (e, t) =>
  new J_({
    innerType: e,
    typeName: lE.ZodDefault,
    defaultValue: 'function' == typeof t.default ? t.default : () => t.default,
    ...YS(t),
  });
class eE extends XS {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      n = { ...t, common: { ...t.common, issues: [] } },
      r = this._def.innerType._parse({ data: n.data, path: n.path, parent: { ...n } });
    return zS(r)
      ? r.then((e) => ({
          status: 'valid',
          value:
            'valid' === e.status
              ? e.value
              : this._def.catchValue({
                  get error() {
                    return new TS(n.common.issues);
                  },
                  input: n.data,
                }),
        }))
      : {
          status: 'valid',
          value:
            'valid' === r.status
              ? r.value
              : this._def.catchValue({
                  get error() {
                    return new TS(n.common.issues);
                  },
                  input: n.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
eE.create = (e, t) =>
  new eE({
    innerType: e,
    typeName: lE.ZodCatch,
    catchValue: 'function' == typeof t.catch ? t.catch : () => t.catch,
    ...YS(t),
  });
class tE extends XS {
  _parse(e) {
    if (this._getType(e) !== _S.nan) {
      const t = this._getOrReturnCtx(e);
      return DS(t, { code: CS.invalid_type, expected: _S.nan, received: t.parsedType }), NS;
    }
    return { status: 'valid', value: e.data };
  }
}
tE.create = (e) => new tE({ typeName: lE.ZodNaN, ...YS(e) });
const nE = Symbol('zod_brand');
class rE extends XS {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e),
      n = t.data;
    return this._def.type._parse({ data: n, path: t.path, parent: t });
  }
  unwrap() {
    return this._def.type;
  }
}
class iE extends XS {
  _parse(e) {
    const { status: t, ctx: n } = this._processInputParams(e);
    if (n.common.async) {
      return (async () => {
        const e = await this._def.in._parseAsync({ data: n.data, path: n.path, parent: n });
        return 'aborted' === e.status
          ? NS
          : 'dirty' === e.status
            ? (t.dirty(), MS(e.value))
            : this._def.out._parseAsync({ data: e.value, path: n.path, parent: n });
      })();
    }
    {
      const e = this._def.in._parseSync({ data: n.data, path: n.path, parent: n });
      return 'aborted' === e.status
        ? NS
        : 'dirty' === e.status
          ? (t.dirty(), { status: 'dirty', value: e.value })
          : this._def.out._parseSync({ data: e.value, path: n.path, parent: n });
    }
  }
  static create(e, t) {
    return new iE({ in: e, out: t, typeName: lE.ZodPipeline });
  }
}
class aE extends XS {
  _parse(e) {
    const t = this._def.innerType._parse(e),
      n = (e) => (IS(e) && (e.value = Object.freeze(e.value)), e);
    return zS(t) ? t.then((e) => n(e)) : n(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
function oE(e, t = {}, n) {
  return e
    ? T_.create().superRefine((r, i) => {
        var a, o;
        if (!e(r)) {
          const e = 'function' == typeof t ? t(r) : 'string' == typeof t ? { message: t } : t,
            s = null === (o = null !== (a = e.fatal) && void 0 !== a ? a : n) || void 0 === o || o,
            l = 'string' == typeof e ? { message: e } : e;
          i.addIssue({ code: 'custom', ...l, fatal: s });
        }
      })
    : T_.create();
}
aE.create = (e, t) => new aE({ innerType: e, typeName: lE.ZodReadonly, ...YS(t) });
const sE = { object: L_.lazycreate };
var lE, uE;
((uE = lE || (lE = {})).ZodString = 'ZodString'),
  (uE.ZodNumber = 'ZodNumber'),
  (uE.ZodNaN = 'ZodNaN'),
  (uE.ZodBigInt = 'ZodBigInt'),
  (uE.ZodBoolean = 'ZodBoolean'),
  (uE.ZodDate = 'ZodDate'),
  (uE.ZodSymbol = 'ZodSymbol'),
  (uE.ZodUndefined = 'ZodUndefined'),
  (uE.ZodNull = 'ZodNull'),
  (uE.ZodAny = 'ZodAny'),
  (uE.ZodUnknown = 'ZodUnknown'),
  (uE.ZodNever = 'ZodNever'),
  (uE.ZodVoid = 'ZodVoid'),
  (uE.ZodArray = 'ZodArray'),
  (uE.ZodObject = 'ZodObject'),
  (uE.ZodUnion = 'ZodUnion'),
  (uE.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
  (uE.ZodIntersection = 'ZodIntersection'),
  (uE.ZodTuple = 'ZodTuple'),
  (uE.ZodRecord = 'ZodRecord'),
  (uE.ZodMap = 'ZodMap'),
  (uE.ZodSet = 'ZodSet'),
  (uE.ZodFunction = 'ZodFunction'),
  (uE.ZodLazy = 'ZodLazy'),
  (uE.ZodLiteral = 'ZodLiteral'),
  (uE.ZodEnum = 'ZodEnum'),
  (uE.ZodEffects = 'ZodEffects'),
  (uE.ZodNativeEnum = 'ZodNativeEnum'),
  (uE.ZodOptional = 'ZodOptional'),
  (uE.ZodNullable = 'ZodNullable'),
  (uE.ZodDefault = 'ZodDefault'),
  (uE.ZodCatch = 'ZodCatch'),
  (uE.ZodPromise = 'ZodPromise'),
  (uE.ZodBranded = 'ZodBranded'),
  (uE.ZodPipeline = 'ZodPipeline'),
  (uE.ZodReadonly = 'ZodReadonly');
const cE = v_.create,
  dE = w_.create,
  fE = tE.create,
  hE = x_.create,
  pE = k_.create,
  mE = S_.create,
  gE = __.create,
  yE = E_.create,
  vE = C_.create,
  bE = T_.create,
  wE = P_.create,
  xE = A_.create,
  kE = R_.create,
  SE = O_.create,
  _E = L_.create,
  EE = L_.strictCreate,
  CE = N_.create,
  TE = F_.create,
  PE = V_.create,
  AE = I_.create,
  RE = z_.create,
  OE = B_.create,
  DE = U_.create,
  LE = $_.create,
  NE = Z_.create,
  ME = W_.create,
  FE = q_.create,
  jE = K_.create,
  VE = Y_.create,
  IE = X_.create,
  zE = Q_.create,
  BE = G_.create,
  UE = X_.createWithPreprocess,
  $E = iE.create,
  ZE = {
    string: (e) => v_.create({ ...e, coerce: !0 }),
    number: (e) => w_.create({ ...e, coerce: !0 }),
    boolean: (e) => k_.create({ ...e, coerce: !0 }),
    bigint: (e) => x_.create({ ...e, coerce: !0 }),
    date: (e) => S_.create({ ...e, coerce: !0 }),
  },
  WE = NS;
var HE = Object.freeze({
  __proto__: null,
  defaultErrorMap: PS,
  setErrorMap: function (e) {
    AS = e;
  },
  getErrorMap: RS,
  makeIssue: OS,
  EMPTY_PATH: [],
  addIssueToContext: DS,
  ParseStatus: LS,
  INVALID: NS,
  DIRTY: MS,
  OK: FS,
  isAborted: jS,
  isDirty: VS,
  isValid: IS,
  isAsync: zS,
  get util() {
    return xS;
  },
  get objectUtil() {
    return SS;
  },
  ZodParsedType: _S,
  getParsedType: ES,
  ZodType: XS,
  datetimeRegex: m_,
  ZodString: v_,
  ZodNumber: w_,
  ZodBigInt: x_,
  ZodBoolean: k_,
  ZodDate: S_,
  ZodSymbol: __,
  ZodUndefined: E_,
  ZodNull: C_,
  ZodAny: T_,
  ZodUnknown: P_,
  ZodNever: A_,
  ZodVoid: R_,
  ZodArray: O_,
  ZodObject: L_,
  ZodUnion: N_,
  ZodDiscriminatedUnion: F_,
  ZodIntersection: V_,
  ZodTuple: I_,
  ZodRecord: z_,
  ZodMap: B_,
  ZodSet: U_,
  ZodFunction: $_,
  ZodLazy: Z_,
  ZodLiteral: W_,
  ZodEnum: q_,
  ZodNativeEnum: K_,
  ZodPromise: Y_,
  ZodEffects: X_,
  ZodTransformer: X_,
  ZodOptional: Q_,
  ZodNullable: G_,
  ZodDefault: J_,
  ZodCatch: eE,
  ZodNaN: tE,
  BRAND: nE,
  ZodBranded: rE,
  ZodPipeline: iE,
  ZodReadonly: aE,
  custom: oE,
  Schema: XS,
  ZodSchema: XS,
  late: sE,
  get ZodFirstPartyTypeKind() {
    return lE;
  },
  coerce: ZE,
  any: bE,
  array: SE,
  bigint: hE,
  boolean: pE,
  date: mE,
  discriminatedUnion: TE,
  effect: IE,
  enum: FE,
  function: LE,
  instanceof: (e, t = { message: `Input not instance of ${e.name}` }) =>
    oE((t) => t instanceof e, t),
  intersection: PE,
  lazy: NE,
  literal: ME,
  map: OE,
  nan: fE,
  nativeEnum: jE,
  never: xE,
  null: vE,
  nullable: BE,
  number: dE,
  object: _E,
  oboolean: () => pE().optional(),
  onumber: () => dE().optional(),
  optional: zE,
  ostring: () => cE().optional(),
  pipeline: $E,
  preprocess: UE,
  promise: VE,
  record: RE,
  set: DE,
  strictObject: EE,
  string: cE,
  symbol: gE,
  transformer: IE,
  tuple: AE,
  undefined: yE,
  union: CE,
  unknown: wE,
  void: kE,
  NEVER: WE,
  ZodIssueCode: CS,
  quotelessJson: (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, '$1:'),
  ZodError: TS,
});
const qE = (e, t, n) => {
    if (e && 'reportValidity' in e) {
      const r = gk(n, t);
      e.setCustomValidity((r && r.message) || ''), e.reportValidity();
    }
  },
  KE = (e, t) => {
    for (const n in t.fields) {
      const r = t.fields[n];
      r && r.ref && 'reportValidity' in r.ref
        ? qE(r.ref, n, e)
        : r.refs && r.refs.forEach((t) => qE(t, n, e));
    }
  },
  YE = (e, t) => {
    t.shouldUseNativeValidation && KE(e, t);
    const n = {};
    for (const r in e) {
      const i = gk(t.fields, r),
        a = Object.assign(e[r] || {}, { ref: i && i.ref });
      if (XE(t.names || Object.keys(e), r)) {
        const e = Object.assign({}, gk(n, r));
        wk(e, 'root', a), wk(n, r, e);
      } else wk(n, r, a);
    }
    return n;
  },
  XE = (e, t) => e.some((e) => e.startsWith(t + '.'));
var QE = function (e, t) {
    for (var n = {}; e.length; ) {
      var r = e[0],
        i = r.code,
        a = r.message,
        o = r.path.join('.');
      if (!n[o])
        if ('unionErrors' in r) {
          var s = r.unionErrors[0].errors[0];
          n[o] = { message: s.message, type: s.code };
        } else n[o] = { message: a, type: i };
      if (
        ('unionErrors' in r &&
          r.unionErrors.forEach(function (t) {
            return t.errors.forEach(function (t) {
              return e.push(t);
            });
          }),
        t)
      ) {
        var l = n[o].types,
          u = l && l[r.code];
        n[o] = Vk(o, t, n, i, u ? [].concat(u, r.message) : r.message);
      }
      e.shift();
    }
    return n;
  },
  GE = function (e, t, n) {
    return (
      void 0 === n && (n = {}),
      function (r, i, a) {
        try {
          return Promise.resolve(
            (function (i, o) {
              try {
                var s = Promise.resolve(e['sync' === n.mode ? 'parse' : 'parseAsync'](r, t)).then(
                  function (e) {
                    return (
                      a.shouldUseNativeValidation && KE({}, a),
                      { errors: {}, values: n.raw ? r : e }
                    );
                  }
                );
              } catch (l) {
                return o(l);
              }
              return s && s.then ? s.then(void 0, o) : s;
            })(0, function (e) {
              if (((t = e), Array.isArray(null == t ? void 0 : t.errors)))
                return {
                  values: {},
                  errors: YE(
                    QE(e.errors, !a.shouldUseNativeValidation && 'all' === a.criteriaMode),
                    a
                  ),
                };
              var t;
              throw e;
            })
          );
        } catch (o) {
          return Promise.reject(o);
        }
      }
    );
  };
function JE(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (r) {
    if ((null == e || e(r), !1 === n || !r.defaultPrevented)) return null == t ? void 0 : t(r);
  };
}
function eC(e, t) {
  if ('function' == typeof e) return e(t);
  null != e && (e.current = t);
}
function tC(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((e) => {
      const r = eC(e, t);
      return n || 'function' != typeof r || (n = !0), r;
    });
    if (n)
      return () => {
        for (let t = 0; t < r.length; t++) {
          const n = r[t];
          'function' == typeof n ? n() : eC(e[t], null);
        }
      };
  };
}
function nC(...e) {
  return $.useCallback(tC(...e), e);
}
function rC(t, n = []) {
  let r = [];
  const i = () => {
    const e = r.map((e) => $.createContext(e));
    return function (n) {
      const r = (null == n ? void 0 : n[t]) || e;
      return $.useMemo(() => ({ [`__scope${t}`]: { ...n, [t]: r } }), [n, r]);
    };
  };
  return (
    (i.scopeName = t),
    [
      function (n, i) {
        const a = $.createContext(i),
          o = r.length;
        r = [...r, i];
        const s = (n) => {
          var r;
          const { scope: i, children: s, ...l } = n,
            u = (null == (r = null == i ? void 0 : i[t]) ? void 0 : r[o]) || a,
            c = $.useMemo(() => l, Object.values(l));
          return e(u.Provider, { value: c, children: s });
        };
        return (
          (s.displayName = n + 'Provider'),
          [
            s,
            function (e, r) {
              var s;
              const l = (null == (s = null == r ? void 0 : r[t]) ? void 0 : s[o]) || a,
                u = $.useContext(l);
              if (u) return u;
              if (void 0 !== i) return i;
              throw new Error(`\`${e}\` must be used within \`${n}\``);
            },
          ]
        );
      },
      iC(i, ...n),
    ]
  );
}
function iC(...e) {
  const t = e[0];
  if (1 === e.length) return t;
  const n = () => {
    const n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
    return function (e) {
      const r = n.reduce(
        (t, { useScope: n, scopeName: r }) => ({ ...t, ...n(e)[`__scope${r}`] }),
        {}
      );
      return $.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
    };
  };
  return (n.scopeName = t.scopeName), n;
}
var aC = $.forwardRef((t, n) => {
  const { children: r, ...i } = t,
    a = $.Children.toArray(r),
    o = a.find(lC);
  if (o) {
    const t = o.props.children,
      r = a.map((e) =>
        e === o
          ? $.Children.count(t) > 1
            ? $.Children.only(null)
            : $.isValidElement(t)
              ? t.props.children
              : null
          : e
      );
    return e(oC, {
      ...i,
      ref: n,
      children: $.isValidElement(t) ? $.cloneElement(t, void 0, r) : null,
    });
  }
  return e(oC, { ...i, ref: n, children: r });
});
aC.displayName = 'Slot';
var oC = $.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  if ($.isValidElement(n)) {
    const e = (function (e) {
      var t, n;
      let r = null == (t = Object.getOwnPropertyDescriptor(e.props, 'ref')) ? void 0 : t.get,
        i = r && 'isReactWarning' in r && r.isReactWarning;
      if (i) return e.ref;
      if (
        ((r = null == (n = Object.getOwnPropertyDescriptor(e, 'ref')) ? void 0 : n.get),
        (i = r && 'isReactWarning' in r && r.isReactWarning),
        i)
      )
        return e.props.ref;
      return e.props.ref || e.ref;
    })(n);
    return $.cloneElement(n, { ...uC(r, n.props), ref: t ? tC(t, e) : e });
  }
  return $.Children.count(n) > 1 ? $.Children.only(null) : null;
});
oC.displayName = 'SlotClone';
var sC = ({ children: t }) => e(n, { children: t });
function lC(e) {
  return $.isValidElement(e) && e.type === sC;
}
function uC(e, t) {
  const n = { ...t };
  for (const r in t) {
    const i = e[r],
      a = t[r];
    /^on[A-Z]/.test(r)
      ? i && a
        ? (n[r] = (...e) => {
            a(...e), i(...e);
          })
        : i && (n[r] = i)
      : 'style' === r
        ? (n[r] = { ...i, ...a })
        : 'className' === r && (n[r] = [i, a].filter(Boolean).join(' '));
  }
  return { ...e, ...n };
}
var cC = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
].reduce((t, n) => {
  const r = $.forwardRef((t, r) => {
    const { asChild: i, ...a } = t,
      o = i ? aC : n;
    return (
      'undefined' != typeof window && (window[Symbol.for('radix-ui')] = !0), e(o, { ...a, ref: r })
    );
  });
  return (r.displayName = `Primitive.${n}`), { ...t, [n]: r };
}, {});
function dC(e) {
  const t = $.useRef(e);
  return (
    $.useEffect(() => {
      t.current = e;
    }),
    $.useMemo(
      () =>
        (...e) => {
          var n;
          return null == (n = t.current) ? void 0 : n.call(t, ...e);
        },
      []
    )
  );
}
var fC,
  hC = 'dismissableLayer.update',
  pC = 'dismissableLayer.pointerDownOutside',
  mC = 'dismissableLayer.focusOutside',
  gC = $.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  yC = $.forwardRef((t, n) => {
    const {
        disableOutsidePointerEvents: r = !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: a,
        onFocusOutside: o,
        onInteractOutside: s,
        onDismiss: l,
        ...u
      } = t,
      c = $.useContext(gC),
      [d, f] = $.useState(null),
      h =
        (null == d ? void 0 : d.ownerDocument) ??
        (null == globalThis ? void 0 : globalThis.document),
      [, p] = $.useState({}),
      m = nC(n, (e) => f(e)),
      g = Array.from(c.layers),
      [y] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1),
      v = g.indexOf(y),
      b = d ? g.indexOf(d) : -1,
      w = c.layersWithOutsidePointerEventsDisabled.size > 0,
      x = b >= v,
      k = (function (e, t = null == globalThis ? void 0 : globalThis.document) {
        const n = dC(e),
          r = $.useRef(!1),
          i = $.useRef(() => {});
        return (
          $.useEffect(() => {
            const e = (e) => {
                if (e.target && !r.current) {
                  let r = function () {
                    bC(pC, n, a, { discrete: !0 });
                  };
                  const a = { originalEvent: e };
                  'touch' === e.pointerType
                    ? (t.removeEventListener('click', i.current),
                      (i.current = r),
                      t.addEventListener('click', i.current, { once: !0 }))
                    : r();
                } else t.removeEventListener('click', i.current);
                r.current = !1;
              },
              a = window.setTimeout(() => {
                t.addEventListener('pointerdown', e);
              }, 0);
            return () => {
              window.clearTimeout(a),
                t.removeEventListener('pointerdown', e),
                t.removeEventListener('click', i.current);
            };
          }, [t, n]),
          { onPointerDownCapture: () => (r.current = !0) }
        );
      })((e) => {
        const t = e.target,
          n = [...c.branches].some((e) => e.contains(t));
        x && !n && (null == a || a(e), null == s || s(e), e.defaultPrevented || null == l || l());
      }, h),
      S = (function (e, t = null == globalThis ? void 0 : globalThis.document) {
        const n = dC(e),
          r = $.useRef(!1);
        return (
          $.useEffect(() => {
            const e = (e) => {
              if (e.target && !r.current) {
                bC(mC, n, { originalEvent: e }, { discrete: !1 });
              }
            };
            return t.addEventListener('focusin', e), () => t.removeEventListener('focusin', e);
          }, [t, n]),
          { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
        );
      })((e) => {
        const t = e.target;
        [...c.branches].some((e) => e.contains(t)) ||
          (null == o || o(e), null == s || s(e), e.defaultPrevented || null == l || l());
      }, h);
    return (
      (function (e, t = null == globalThis ? void 0 : globalThis.document) {
        const n = dC(e);
        $.useEffect(() => {
          const e = (e) => {
            'Escape' === e.key && n(e);
          };
          return (
            t.addEventListener('keydown', e, { capture: !0 }),
            () => t.removeEventListener('keydown', e, { capture: !0 })
          );
        }, [n, t]);
      })((e) => {
        b === c.layers.size - 1 &&
          (null == i || i(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
      }, h),
      $.useEffect(() => {
        if (d)
          return (
            r &&
              (0 === c.layersWithOutsidePointerEventsDisabled.size &&
                ((fC = h.body.style.pointerEvents), (h.body.style.pointerEvents = 'none')),
              c.layersWithOutsidePointerEventsDisabled.add(d)),
            c.layers.add(d),
            vC(),
            () => {
              r &&
                1 === c.layersWithOutsidePointerEventsDisabled.size &&
                (h.body.style.pointerEvents = fC);
            }
          );
      }, [d, h, r, c]),
      $.useEffect(
        () => () => {
          d && (c.layers.delete(d), c.layersWithOutsidePointerEventsDisabled.delete(d), vC());
        },
        [d, c]
      ),
      $.useEffect(() => {
        const e = () => p({});
        return document.addEventListener(hC, e), () => document.removeEventListener(hC, e);
      }, []),
      e(cC.div, {
        ...u,
        ref: m,
        style: { pointerEvents: w ? (x ? 'auto' : 'none') : void 0, ...t.style },
        onFocusCapture: JE(t.onFocusCapture, S.onFocusCapture),
        onBlurCapture: JE(t.onBlurCapture, S.onBlurCapture),
        onPointerDownCapture: JE(t.onPointerDownCapture, k.onPointerDownCapture),
      })
    );
  });
yC.displayName = 'DismissableLayer';
function vC() {
  const e = new CustomEvent(hC);
  document.dispatchEvent(e);
}
function bC(e, t, n, { discrete: r }) {
  const i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && i.addEventListener(e, t, { once: !0 }),
    r
      ? (function (e, t) {
          e && sd.flushSync(() => e.dispatchEvent(t));
        })(i, a)
      : i.dispatchEvent(a);
}
$.forwardRef((t, n) => {
  const r = $.useContext(gC),
    i = $.useRef(null),
    a = nC(n, i);
  return (
    $.useEffect(() => {
      const e = i.current;
      if (e)
        return (
          r.branches.add(e),
          () => {
            r.branches.delete(e);
          }
        );
    }, [r.branches]),
    e(cC.div, { ...t, ref: a })
  );
}).displayName = 'DismissableLayerBranch';
var wC = Boolean(null == globalThis ? void 0 : globalThis.document) ? $.useLayoutEffect : () => {},
  xC = W['useId'.toString()] || (() => {}),
  kC = 0;
const SC = ['top', 'right', 'bottom', 'left'],
  _C = Math.min,
  EC = Math.max,
  CC = Math.round,
  TC = Math.floor,
  PC = (e) => ({ x: e, y: e }),
  AC = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
  RC = { start: 'end', end: 'start' };
function OC(e, t, n) {
  return EC(e, _C(t, n));
}
function DC(e, t) {
  return 'function' == typeof e ? e(t) : e;
}
function LC(e) {
  return e.split('-')[0];
}
function NC(e) {
  return e.split('-')[1];
}
function MC(e) {
  return 'x' === e ? 'y' : 'x';
}
function FC(e) {
  return 'y' === e ? 'height' : 'width';
}
function jC(e) {
  return ['top', 'bottom'].includes(LC(e)) ? 'y' : 'x';
}
function VC(e) {
  return MC(jC(e));
}
function IC(e) {
  return e.replace(/start|end/g, (e) => RC[e]);
}
function zC(e) {
  return e.replace(/left|right|bottom|top/g, (e) => AC[e]);
}
function BC(e) {
  return 'number' != typeof e
    ? (function (e) {
        return { top: 0, right: 0, bottom: 0, left: 0, ...e };
      })(e)
    : { top: e, right: e, bottom: e, left: e };
}
function UC(e) {
  const { x: t, y: n, width: r, height: i } = e;
  return { width: r, height: i, top: n, left: t, right: t + r, bottom: n + i, x: t, y: n };
}
function $C(e, t, n) {
  let { reference: r, floating: i } = e;
  const a = jC(t),
    o = VC(t),
    s = FC(o),
    l = LC(t),
    u = 'y' === a,
    c = r.x + r.width / 2 - i.width / 2,
    d = r.y + r.height / 2 - i.height / 2,
    f = r[s] / 2 - i[s] / 2;
  let h;
  switch (l) {
    case 'top':
      h = { x: c, y: r.y - i.height };
      break;
    case 'bottom':
      h = { x: c, y: r.y + r.height };
      break;
    case 'right':
      h = { x: r.x + r.width, y: d };
      break;
    case 'left':
      h = { x: r.x - i.width, y: d };
      break;
    default:
      h = { x: r.x, y: r.y };
  }
  switch (NC(t)) {
    case 'start':
      h[o] -= f * (n && u ? -1 : 1);
      break;
    case 'end':
      h[o] += f * (n && u ? -1 : 1);
  }
  return h;
}
async function ZC(e, t) {
  var n;
  void 0 === t && (t = {});
  const { x: r, y: i, platform: a, rects: o, elements: s, strategy: l } = e,
    {
      boundary: u = 'clippingAncestors',
      rootBoundary: c = 'viewport',
      elementContext: d = 'floating',
      altBoundary: f = !1,
      padding: h = 0,
    } = DC(t, e),
    p = BC(h),
    m = s[f ? ('floating' === d ? 'reference' : 'floating') : d],
    g = UC(
      await a.getClippingRect({
        element:
          null == (n = await (null == a.isElement ? void 0 : a.isElement(m))) || n
            ? m
            : m.contextElement ||
              (await (null == a.getDocumentElement ? void 0 : a.getDocumentElement(s.floating))),
        boundary: u,
        rootBoundary: c,
        strategy: l,
      })
    ),
    y =
      'floating' === d
        ? { x: r, y: i, width: o.floating.width, height: o.floating.height }
        : o.reference,
    v = await (null == a.getOffsetParent ? void 0 : a.getOffsetParent(s.floating)),
    b = ((await (null == a.isElement ? void 0 : a.isElement(v))) &&
      (await (null == a.getScale ? void 0 : a.getScale(v)))) || { x: 1, y: 1 },
    w = UC(
      a.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: s,
            rect: y,
            offsetParent: v,
            strategy: l,
          })
        : y
    );
  return {
    top: (g.top - w.top + p.top) / b.y,
    bottom: (w.bottom - g.bottom + p.bottom) / b.y,
    left: (g.left - w.left + p.left) / b.x,
    right: (w.right - g.right + p.right) / b.x,
  };
}
function WC(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function HC(e) {
  return SC.some((t) => e[t] >= 0);
}
function qC() {
  return 'undefined' != typeof window;
}
function KC(e) {
  return QC(e) ? (e.nodeName || '').toLowerCase() : '#document';
}
function YC(e) {
  var t;
  return (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window;
}
function XC(e) {
  var t;
  return null == (t = (QC(e) ? e.ownerDocument : e.document) || window.document)
    ? void 0
    : t.documentElement;
}
function QC(e) {
  return !!qC() && (e instanceof Node || e instanceof YC(e).Node);
}
function GC(e) {
  return !!qC() && (e instanceof Element || e instanceof YC(e).Element);
}
function JC(e) {
  return !!qC() && (e instanceof HTMLElement || e instanceof YC(e).HTMLElement);
}
function eT(e) {
  return (
    !(!qC() || 'undefined' == typeof ShadowRoot) &&
    (e instanceof ShadowRoot || e instanceof YC(e).ShadowRoot)
  );
}
function tT(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: i } = sT(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !['inline', 'contents'].includes(i);
}
function nT(e) {
  return ['table', 'td', 'th'].includes(KC(e));
}
function rT(e) {
  return [':popover-open', ':modal'].some((t) => {
    try {
      return e.matches(t);
    } catch (n) {
      return !1;
    }
  });
}
function iT(e) {
  const t = aT(),
    n = GC(e) ? sT(e) : e;
  return (
    'none' !== n.transform ||
    'none' !== n.perspective ||
    (!!n.containerType && 'normal' !== n.containerType) ||
    (!t && !!n.backdropFilter && 'none' !== n.backdropFilter) ||
    (!t && !!n.filter && 'none' !== n.filter) ||
    ['transform', 'perspective', 'filter'].some((e) => (n.willChange || '').includes(e)) ||
    ['paint', 'layout', 'strict', 'content'].some((e) => (n.contain || '').includes(e))
  );
}
function aT() {
  return (
    !('undefined' == typeof CSS || !CSS.supports) && CSS.supports('-webkit-backdrop-filter', 'none')
  );
}
function oT(e) {
  return ['html', 'body', '#document'].includes(KC(e));
}
function sT(e) {
  return YC(e).getComputedStyle(e);
}
function lT(e) {
  return GC(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function uT(e) {
  if ('html' === KC(e)) return e;
  const t = e.assignedSlot || e.parentNode || (eT(e) && e.host) || XC(e);
  return eT(t) ? t.host : t;
}
function cT(e) {
  const t = uT(e);
  return oT(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : JC(t) && tT(t) ? t : cT(t);
}
function dT(e, t, n) {
  var r;
  void 0 === t && (t = []), void 0 === n && (n = !0);
  const i = cT(e),
    a = i === (null == (r = e.ownerDocument) ? void 0 : r.body),
    o = YC(i);
  if (a) {
    const e = fT(o);
    return t.concat(o, o.visualViewport || [], tT(i) ? i : [], e && n ? dT(e) : []);
  }
  return t.concat(i, dT(i, [], n));
}
function fT(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function hT(e) {
  const t = sT(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const i = JC(e),
    a = i ? e.offsetWidth : n,
    o = i ? e.offsetHeight : r,
    s = CC(n) !== a || CC(r) !== o;
  return s && ((n = a), (r = o)), { width: n, height: r, $: s };
}
function pT(e) {
  return GC(e) ? e : e.contextElement;
}
function mT(e) {
  const t = pT(e);
  if (!JC(t)) return PC(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: i, $: a } = hT(t);
  let o = (a ? CC(n.width) : n.width) / r,
    s = (a ? CC(n.height) : n.height) / i;
  return (o && Number.isFinite(o)) || (o = 1), (s && Number.isFinite(s)) || (s = 1), { x: o, y: s };
}
const gT = PC(0);
function yT(e) {
  const t = YC(e);
  return aT() && t.visualViewport
    ? { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
    : gT;
}
function vT(e, t, n, r) {
  void 0 === t && (t = !1), void 0 === n && (n = !1);
  const i = e.getBoundingClientRect(),
    a = pT(e);
  let o = PC(1);
  t && (r ? GC(r) && (o = mT(r)) : (o = mT(e)));
  const s = (function (e, t, n) {
    return void 0 === t && (t = !1), !(!n || (t && n !== YC(e))) && t;
  })(a, n, r)
    ? yT(a)
    : PC(0);
  let l = (i.left + s.x) / o.x,
    u = (i.top + s.y) / o.y,
    c = i.width / o.x,
    d = i.height / o.y;
  if (a) {
    const e = YC(a),
      t = r && GC(r) ? YC(r) : r;
    let n = e,
      i = fT(n);
    for (; i && r && t !== n; ) {
      const e = mT(i),
        t = i.getBoundingClientRect(),
        r = sT(i),
        a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
        o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
      (l *= e.x), (u *= e.y), (c *= e.x), (d *= e.y), (l += a), (u += o), (n = YC(i)), (i = fT(n));
    }
  }
  return UC({ width: c, height: d, x: l, y: u });
}
function bT(e, t) {
  const n = lT(e).scrollLeft;
  return t ? t.left + n : vT(XC(e)).left + n;
}
function wT(e, t, n) {
  void 0 === n && (n = !1);
  const r = e.getBoundingClientRect();
  return { x: r.left + t.scrollLeft - (n ? 0 : bT(e, r)), y: r.top + t.scrollTop };
}
function xT(e, t, n) {
  let r;
  if ('viewport' === t)
    r = (function (e, t) {
      const n = YC(e),
        r = XC(e),
        i = n.visualViewport;
      let a = r.clientWidth,
        o = r.clientHeight,
        s = 0,
        l = 0;
      if (i) {
        (a = i.width), (o = i.height);
        const e = aT();
        (!e || (e && 'fixed' === t)) && ((s = i.offsetLeft), (l = i.offsetTop));
      }
      return { width: a, height: o, x: s, y: l };
    })(e, n);
  else if ('document' === t)
    r = (function (e) {
      const t = XC(e),
        n = lT(e),
        r = e.ownerDocument.body,
        i = EC(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
        a = EC(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
      let o = -n.scrollLeft + bT(e);
      const s = -n.scrollTop;
      return (
        'rtl' === sT(r).direction && (o += EC(t.clientWidth, r.clientWidth) - i),
        { width: i, height: a, x: o, y: s }
      );
    })(XC(e));
  else if (GC(t))
    r = (function (e, t) {
      const n = vT(e, !0, 'fixed' === t),
        r = n.top + e.clientTop,
        i = n.left + e.clientLeft,
        a = JC(e) ? mT(e) : PC(1);
      return { width: e.clientWidth * a.x, height: e.clientHeight * a.y, x: i * a.x, y: r * a.y };
    })(t, n);
  else {
    const n = yT(e);
    r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
  }
  return UC(r);
}
function kT(e, t) {
  const n = uT(e);
  return !(n === t || !GC(n) || oT(n)) && ('fixed' === sT(n).position || kT(n, t));
}
function ST(e, t, n) {
  const r = JC(t),
    i = XC(t),
    a = 'fixed' === n,
    o = vT(e, !0, a, t);
  let s = { scrollLeft: 0, scrollTop: 0 };
  const l = PC(0);
  if (r || (!r && !a))
    if ((('body' !== KC(t) || tT(i)) && (s = lT(t)), r)) {
      const e = vT(t, !0, a, t);
      (l.x = e.x + t.clientLeft), (l.y = e.y + t.clientTop);
    } else i && (l.x = bT(i));
  const u = !i || r || a ? PC(0) : wT(i, s);
  return {
    x: o.left + s.scrollLeft - l.x - u.x,
    y: o.top + s.scrollTop - l.y - u.y,
    width: o.width,
    height: o.height,
  };
}
function _T(e) {
  return 'static' === sT(e).position;
}
function ET(e, t) {
  if (!JC(e) || 'fixed' === sT(e).position) return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return XC(e) === n && (n = n.ownerDocument.body), n;
}
function CT(e, t) {
  const n = YC(e);
  if (rT(e)) return n;
  if (!JC(e)) {
    let t = uT(e);
    for (; t && !oT(t); ) {
      if (GC(t) && !_T(t)) return t;
      t = uT(t);
    }
    return n;
  }
  let r = ET(e, t);
  for (; r && nT(r) && _T(r); ) r = ET(r, t);
  return r && oT(r) && _T(r) && !iT(r)
    ? n
    : r ||
        (function (e) {
          let t = uT(e);
          for (; JC(t) && !oT(t); ) {
            if (iT(t)) return t;
            if (rT(t)) return null;
            t = uT(t);
          }
          return null;
        })(e) ||
        n;
}
const TT = {
  convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
    let { elements: t, rect: n, offsetParent: r, strategy: i } = e;
    const a = 'fixed' === i,
      o = XC(r),
      s = !!t && rT(t.floating);
    if (r === o || (s && a)) return n;
    let l = { scrollLeft: 0, scrollTop: 0 },
      u = PC(1);
    const c = PC(0),
      d = JC(r);
    if ((d || (!d && !a)) && (('body' !== KC(r) || tT(o)) && (l = lT(r)), JC(r))) {
      const e = vT(r);
      (u = mT(r)), (c.x = e.x + r.clientLeft), (c.y = e.y + r.clientTop);
    }
    const f = !o || d || a ? PC(0) : wT(o, l, !0);
    return {
      width: n.width * u.x,
      height: n.height * u.y,
      x: n.x * u.x - l.scrollLeft * u.x + c.x + f.x,
      y: n.y * u.y - l.scrollTop * u.y + c.y + f.y,
    };
  },
  getDocumentElement: XC,
  getClippingRect: function (e) {
    let { element: t, boundary: n, rootBoundary: r, strategy: i } = e;
    const a =
        'clippingAncestors' === n
          ? rT(t)
            ? []
            : (function (e, t) {
                const n = t.get(e);
                if (n) return n;
                let r = dT(e, [], !1).filter((e) => GC(e) && 'body' !== KC(e)),
                  i = null;
                const a = 'fixed' === sT(e).position;
                let o = a ? uT(e) : e;
                for (; GC(o) && !oT(o); ) {
                  const t = sT(o),
                    n = iT(o);
                  n || 'fixed' !== t.position || (i = null),
                    (
                      a
                        ? !n && !i
                        : (!n &&
                            'static' === t.position &&
                            i &&
                            ['absolute', 'fixed'].includes(i.position)) ||
                          (tT(o) && !n && kT(e, o))
                    )
                      ? (r = r.filter((e) => e !== o))
                      : (i = t),
                    (o = uT(o));
                }
                return t.set(e, r), r;
              })(t, this._c)
          : [].concat(n),
      o = [...a, r],
      s = o[0],
      l = o.reduce(
        (e, n) => {
          const r = xT(t, n, i);
          return (
            (e.top = EC(r.top, e.top)),
            (e.right = _C(r.right, e.right)),
            (e.bottom = _C(r.bottom, e.bottom)),
            (e.left = EC(r.left, e.left)),
            e
          );
        },
        xT(t, s, i)
      );
    return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
  },
  getOffsetParent: CT,
  getElementRects: async function (e) {
    const t = this.getOffsetParent || CT,
      n = this.getDimensions,
      r = await n(e.floating);
    return {
      reference: ST(e.reference, await t(e.floating), e.strategy),
      floating: { x: 0, y: 0, width: r.width, height: r.height },
    };
  },
  getClientRects: function (e) {
    return Array.from(e.getClientRects());
  },
  getDimensions: function (e) {
    const { width: t, height: n } = hT(e);
    return { width: t, height: n };
  },
  getScale: mT,
  isElement: GC,
  isRTL: function (e) {
    return 'rtl' === sT(e).direction;
  },
};
function PT(e, t, n, r) {
  void 0 === r && (r = {});
  const {
      ancestorScroll: i = !0,
      ancestorResize: a = !0,
      elementResize: o = 'function' == typeof ResizeObserver,
      layoutShift: s = 'function' == typeof IntersectionObserver,
      animationFrame: l = !1,
    } = r,
    u = pT(e),
    c = i || a ? [...(u ? dT(u) : []), ...dT(t)] : [];
  c.forEach((e) => {
    i && e.addEventListener('scroll', n, { passive: !0 }), a && e.addEventListener('resize', n);
  });
  const d =
    u && s
      ? (function (e, t) {
          let n,
            r = null;
          const i = XC(e);
          function a() {
            var e;
            clearTimeout(n), null == (e = r) || e.disconnect(), (r = null);
          }
          return (
            (function o(s, l) {
              void 0 === s && (s = !1), void 0 === l && (l = 1), a();
              const { left: u, top: c, width: d, height: f } = e.getBoundingClientRect();
              if ((s || t(), !d || !f)) return;
              const h = {
                rootMargin:
                  -TC(c) +
                  'px ' +
                  -TC(i.clientWidth - (u + d)) +
                  'px ' +
                  -TC(i.clientHeight - (c + f)) +
                  'px ' +
                  -TC(u) +
                  'px',
                threshold: EC(0, _C(1, l)) || 1,
              };
              let p = !0;
              function m(e) {
                const t = e[0].intersectionRatio;
                if (t !== l) {
                  if (!p) return o();
                  t
                    ? o(!1, t)
                    : (n = setTimeout(() => {
                        o(!1, 1e-7);
                      }, 1e3));
                }
                p = !1;
              }
              try {
                r = new IntersectionObserver(m, { ...h, root: i.ownerDocument });
              } catch (g) {
                r = new IntersectionObserver(m, h);
              }
              r.observe(e);
            })(!0),
            a
          );
        })(u, n)
      : null;
  let f,
    h = -1,
    p = null;
  o &&
    ((p = new ResizeObserver((e) => {
      let [r] = e;
      r &&
        r.target === u &&
        p &&
        (p.unobserve(t),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var e;
          null == (e = p) || e.observe(t);
        }))),
        n();
    })),
    u && !l && p.observe(u),
    p.observe(t));
  let m = l ? vT(e) : null;
  return (
    l &&
      (function t() {
        const r = vT(e);
        !m || (r.x === m.x && r.y === m.y && r.width === m.width && r.height === m.height) || n();
        (m = r), (f = requestAnimationFrame(t));
      })(),
    n(),
    () => {
      var e;
      c.forEach((e) => {
        i && e.removeEventListener('scroll', n), a && e.removeEventListener('resize', n);
      }),
        null == d || d(),
        null == (e = p) || e.disconnect(),
        (p = null),
        l && cancelAnimationFrame(f);
    }
  );
}
const AT = function (e) {
    return (
      void 0 === e && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var n, r;
          const { x: i, y: a, placement: o, middlewareData: s } = t,
            l = await (async function (e, t) {
              const { placement: n, platform: r, elements: i } = e,
                a = await (null == r.isRTL ? void 0 : r.isRTL(i.floating)),
                o = LC(n),
                s = NC(n),
                l = 'y' === jC(n),
                u = ['left', 'top'].includes(o) ? -1 : 1,
                c = a && l ? -1 : 1,
                d = DC(t, e);
              let {
                mainAxis: f,
                crossAxis: h,
                alignmentAxis: p,
              } = 'number' == typeof d
                ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
                : {
                    mainAxis: d.mainAxis || 0,
                    crossAxis: d.crossAxis || 0,
                    alignmentAxis: d.alignmentAxis,
                  };
              return (
                s && 'number' == typeof p && (h = 'end' === s ? -1 * p : p),
                l ? { x: h * c, y: f * u } : { x: f * u, y: h * c }
              );
            })(t, e);
          return o === (null == (n = s.offset) ? void 0 : n.placement) &&
            null != (r = s.arrow) &&
            r.alignmentOffset
            ? {}
            : { x: i + l.x, y: a + l.y, data: { ...l, placement: o } };
        },
      }
    );
  },
  RT = function (e) {
    return (
      void 0 === e && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: i } = t,
            {
              mainAxis: a = !0,
              crossAxis: o = !1,
              limiter: s = {
                fn: (e) => {
                  let { x: t, y: n } = e;
                  return { x: t, y: n };
                },
              },
              ...l
            } = DC(e, t),
            u = { x: n, y: r },
            c = await ZC(t, l),
            d = jC(LC(i)),
            f = MC(d);
          let h = u[f],
            p = u[d];
          if (a) {
            const e = 'y' === f ? 'bottom' : 'right';
            h = OC(h + c['y' === f ? 'top' : 'left'], h, h - c[e]);
          }
          if (o) {
            const e = 'y' === d ? 'bottom' : 'right';
            p = OC(p + c['y' === d ? 'top' : 'left'], p, p - c[e]);
          }
          const m = s.fn({ ...t, [f]: h, [d]: p });
          return { ...m, data: { x: m.x - n, y: m.y - r, enabled: { [f]: a, [d]: o } } };
        },
      }
    );
  },
  OT = function (e) {
    return (
      void 0 === e && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: i,
              middlewareData: a,
              rects: o,
              initialPlacement: s,
              platform: l,
              elements: u,
            } = t,
            {
              mainAxis: c = !0,
              crossAxis: d = !0,
              fallbackPlacements: f,
              fallbackStrategy: h = 'bestFit',
              fallbackAxisSideDirection: p = 'none',
              flipAlignment: m = !0,
              ...g
            } = DC(e, t);
          if (null != (n = a.arrow) && n.alignmentOffset) return {};
          const y = LC(i),
            v = jC(s),
            b = LC(s) === s,
            w = await (null == l.isRTL ? void 0 : l.isRTL(u.floating)),
            x =
              f ||
              (b || !m
                ? [zC(s)]
                : (function (e) {
                    const t = zC(e);
                    return [IC(e), t, IC(t)];
                  })(s)),
            k = 'none' !== p;
          !f &&
            k &&
            x.push(
              ...(function (e, t, n, r) {
                const i = NC(e);
                let a = (function (e, t, n) {
                  const r = ['left', 'right'],
                    i = ['right', 'left'],
                    a = ['top', 'bottom'],
                    o = ['bottom', 'top'];
                  switch (e) {
                    case 'top':
                    case 'bottom':
                      return n ? (t ? i : r) : t ? r : i;
                    case 'left':
                    case 'right':
                      return t ? a : o;
                    default:
                      return [];
                  }
                })(LC(e), 'start' === n, r);
                return i && ((a = a.map((e) => e + '-' + i)), t && (a = a.concat(a.map(IC)))), a;
              })(s, m, p, w)
            );
          const S = [s, ...x],
            _ = await ZC(t, g),
            E = [];
          let C = (null == (r = a.flip) ? void 0 : r.overflows) || [];
          if ((c && E.push(_[y]), d)) {
            const e = (function (e, t, n) {
              void 0 === n && (n = !1);
              const r = NC(e),
                i = VC(e),
                a = FC(i);
              let o =
                'x' === i
                  ? r === (n ? 'end' : 'start')
                    ? 'right'
                    : 'left'
                  : 'start' === r
                    ? 'bottom'
                    : 'top';
              return t.reference[a] > t.floating[a] && (o = zC(o)), [o, zC(o)];
            })(i, o, w);
            E.push(_[e[0]], _[e[1]]);
          }
          if (((C = [...C, { placement: i, overflows: E }]), !E.every((e) => e <= 0))) {
            var T, P;
            const e = ((null == (T = a.flip) ? void 0 : T.index) || 0) + 1,
              t = S[e];
            if (t) return { data: { index: e, overflows: C }, reset: { placement: t } };
            let n =
              null ==
              (P = C.filter((e) => e.overflows[0] <= 0).sort(
                (e, t) => e.overflows[1] - t.overflows[1]
              )[0])
                ? void 0
                : P.placement;
            if (!n)
              switch (h) {
                case 'bestFit': {
                  var A;
                  const e =
                    null ==
                    (A = C.filter((e) => {
                      if (k) {
                        const t = jC(e.placement);
                        return t === v || 'y' === t;
                      }
                      return !0;
                    })
                      .map((e) => [
                        e.placement,
                        e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0),
                      ])
                      .sort((e, t) => e[1] - t[1])[0])
                      ? void 0
                      : A[0];
                  e && (n = e);
                  break;
                }
                case 'initialPlacement':
                  n = s;
              }
            if (i !== n) return { reset: { placement: n } };
          }
          return {};
        },
      }
    );
  },
  DT = function (e) {
    return (
      void 0 === e && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var n, r;
          const { placement: i, rects: a, platform: o, elements: s } = t,
            { apply: l = () => {}, ...u } = DC(e, t),
            c = await ZC(t, u),
            d = LC(i),
            f = NC(i),
            h = 'y' === jC(i),
            { width: p, height: m } = a.floating;
          let g, y;
          'top' === d || 'bottom' === d
            ? ((g = d),
              (y =
                f === ((await (null == o.isRTL ? void 0 : o.isRTL(s.floating))) ? 'start' : 'end')
                  ? 'left'
                  : 'right'))
            : ((y = d), (g = 'end' === f ? 'top' : 'bottom'));
          const v = m - c.top - c.bottom,
            b = p - c.left - c.right,
            w = _C(m - c[g], v),
            x = _C(p - c[y], b),
            k = !t.middlewareData.shift;
          let S = w,
            _ = x;
          if (
            (null != (n = t.middlewareData.shift) && n.enabled.x && (_ = b),
            null != (r = t.middlewareData.shift) && r.enabled.y && (S = v),
            k && !f)
          ) {
            const e = EC(c.left, 0),
              t = EC(c.right, 0),
              n = EC(c.top, 0),
              r = EC(c.bottom, 0);
            h
              ? (_ = p - 2 * (0 !== e || 0 !== t ? e + t : EC(c.left, c.right)))
              : (S = m - 2 * (0 !== n || 0 !== r ? n + r : EC(c.top, c.bottom)));
          }
          await l({ ...t, availableWidth: _, availableHeight: S });
          const E = await o.getDimensions(s.floating);
          return p !== E.width || m !== E.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  },
  LT = function (e) {
    return (
      void 0 === e && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn(t) {
          const { rects: n } = t,
            { strategy: r = 'referenceHidden', ...i } = DC(e, t);
          switch (r) {
            case 'referenceHidden': {
              const e = WC(await ZC(t, { ...i, elementContext: 'reference' }), n.reference);
              return { data: { referenceHiddenOffsets: e, referenceHidden: HC(e) } };
            }
            case 'escaped': {
              const e = WC(await ZC(t, { ...i, altBoundary: !0 }), n.floating);
              return { data: { escapedOffsets: e, escaped: HC(e) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  NT = (e) => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: l } = t,
        { element: u, padding: c = 0 } = DC(e, t) || {};
      if (null == u) return {};
      const d = BC(c),
        f = { x: n, y: r },
        h = VC(i),
        p = FC(h),
        m = await o.getDimensions(u),
        g = 'y' === h,
        y = g ? 'top' : 'left',
        v = g ? 'bottom' : 'right',
        b = g ? 'clientHeight' : 'clientWidth',
        w = a.reference[p] + a.reference[h] - f[h] - a.floating[p],
        x = f[h] - a.reference[h],
        k = await (null == o.getOffsetParent ? void 0 : o.getOffsetParent(u));
      let S = k ? k[b] : 0;
      (S && (await (null == o.isElement ? void 0 : o.isElement(k)))) ||
        (S = s.floating[b] || a.floating[p]);
      const _ = w / 2 - x / 2,
        E = S / 2 - m[p] / 2 - 1,
        C = _C(d[y], E),
        T = _C(d[v], E),
        P = C,
        A = S - m[p] - T,
        R = S / 2 - m[p] / 2 + _,
        O = OC(P, R, A),
        D =
          !l.arrow &&
          null != NC(i) &&
          R !== O &&
          a.reference[p] / 2 - (R < P ? C : T) - m[p] / 2 < 0,
        L = D ? (R < P ? R - P : R - A) : 0;
      return {
        [h]: f[h] + L,
        data: { [h]: O, centerOffset: R - O - L, ...(D && { alignmentOffset: L }) },
        reset: D,
      };
    },
  }),
  MT = function (e) {
    return (
      void 0 === e && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: i, rects: a, middlewareData: o } = t,
            { offset: s = 0, mainAxis: l = !0, crossAxis: u = !0 } = DC(e, t),
            c = { x: n, y: r },
            d = jC(i),
            f = MC(d);
          let h = c[f],
            p = c[d];
          const m = DC(s, t),
            g =
              'number' == typeof m
                ? { mainAxis: m, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...m };
          if (l) {
            const e = 'y' === f ? 'height' : 'width',
              t = a.reference[f] - a.floating[e] + g.mainAxis,
              n = a.reference[f] + a.reference[e] - g.mainAxis;
            h < t ? (h = t) : h > n && (h = n);
          }
          if (u) {
            var y, v;
            const e = 'y' === f ? 'width' : 'height',
              t = ['top', 'left'].includes(LC(i)),
              n =
                a.reference[d] -
                a.floating[e] +
                ((t && (null == (y = o.offset) ? void 0 : y[d])) || 0) +
                (t ? 0 : g.crossAxis),
              r =
                a.reference[d] +
                a.reference[e] +
                (t ? 0 : (null == (v = o.offset) ? void 0 : v[d]) || 0) -
                (t ? g.crossAxis : 0);
            p < n ? (p = n) : p > r && (p = r);
          }
          return { [f]: h, [d]: p };
        },
      }
    );
  },
  FT = (e, t, n) => {
    const r = new Map(),
      i = { platform: TT, ...n },
      a = { ...i.platform, _c: r };
    return (async (e, t, n) => {
      const {
          placement: r = 'bottom',
          strategy: i = 'absolute',
          middleware: a = [],
          platform: o,
        } = n,
        s = a.filter(Boolean),
        l = await (null == o.isRTL ? void 0 : o.isRTL(t));
      let u = await o.getElementRects({ reference: e, floating: t, strategy: i }),
        { x: c, y: d } = $C(u, r, l),
        f = r,
        h = {},
        p = 0;
      for (let m = 0; m < s.length; m++) {
        const { name: n, fn: a } = s[m],
          {
            x: g,
            y: y,
            data: v,
            reset: b,
          } = await a({
            x: c,
            y: d,
            initialPlacement: r,
            placement: f,
            strategy: i,
            middlewareData: h,
            rects: u,
            platform: o,
            elements: { reference: e, floating: t },
          });
        (c = null != g ? g : c),
          (d = null != y ? y : d),
          (h = { ...h, [n]: { ...h[n], ...v } }),
          b &&
            p <= 50 &&
            (p++,
            'object' == typeof b &&
              (b.placement && (f = b.placement),
              b.rects &&
                (u =
                  !0 === b.rects
                    ? await o.getElementRects({ reference: e, floating: t, strategy: i })
                    : b.rects),
              ({ x: c, y: d } = $C(u, f, l))),
            (m = -1));
      }
      return { x: c, y: d, placement: f, strategy: i, middlewareData: h };
    })(e, t, { ...i, platform: a });
  };
var jT = 'undefined' != typeof document ? $.useLayoutEffect : $.useEffect;
function VT(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if ('function' == typeof e && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && 'object' == typeof e) {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; 0 != r--; ) if (!VT(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length)) return !1;
    for (r = n; 0 != r--; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; 0 != r--; ) {
      const n = i[r];
      if (('_owner' !== n || !e.$$typeof) && !VT(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e != e && t != t;
}
function IT(e) {
  if ('undefined' == typeof window) return 1;
  return (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function zT(e, t) {
  const n = IT(e);
  return Math.round(t * n) / n;
}
function BT(e) {
  const t = $.useRef(e);
  return (
    jT(() => {
      t.current = e;
    }),
    t
  );
}
const UT = (e) => ({
    name: 'arrow',
    options: e,
    fn(t) {
      const { element: n, padding: r } = 'function' == typeof e ? e(t) : e;
      return n && ((i = n), {}.hasOwnProperty.call(i, 'current'))
        ? null != n.current
          ? NT({ element: n.current, padding: r }).fn(t)
          : {}
        : n
          ? NT({ element: n, padding: r }).fn(t)
          : {};
      var i;
    },
  }),
  $T = (e, t) => ({ ...RT(e), options: [e, t] }),
  ZT = (e, t) => ({ ...MT(e), options: [e, t] }),
  WT = (e, t) => ({ ...OT(e), options: [e, t] }),
  HT = (e, t) => ({ ...DT(e), options: [e, t] }),
  qT = (e, t) => ({ ...LT(e), options: [e, t] }),
  KT = (e, t) => ({ ...UT(e), options: [e, t] });
var YT = $.forwardRef((t, n) => {
  const { children: r, width: i = 10, height: a = 5, ...o } = t;
  return e(cC.svg, {
    ...o,
    ref: n,
    width: i,
    height: a,
    viewBox: '0 0 30 10',
    preserveAspectRatio: 'none',
    children: t.asChild ? r : e('polygon', { points: '0,0 30,0 15,10' }),
  });
});
YT.displayName = 'Arrow';
var XT = YT;
var QT = 'Popper',
  [GT, JT] = rC(QT),
  [eP, tP] = GT(QT),
  nP = (t) => {
    const { __scopePopper: n, children: r } = t,
      [i, a] = $.useState(null);
    return e(eP, { scope: n, anchor: i, onAnchorChange: a, children: r });
  };
nP.displayName = QT;
var rP = 'PopperAnchor',
  iP = $.forwardRef((t, n) => {
    const { __scopePopper: r, virtualRef: i, ...a } = t,
      o = tP(rP, r),
      s = $.useRef(null),
      l = nC(n, s);
    return (
      $.useEffect(() => {
        o.onAnchorChange((null == i ? void 0 : i.current) || s.current);
      }),
      i ? null : e(cC.div, { ...a, ref: l })
    );
  });
iP.displayName = rP;
var aP = 'PopperContent',
  [oP, sP] = GT(aP),
  lP = $.forwardRef((t, n) => {
    var r, i, a, o, s, l;
    const {
        __scopePopper: u,
        side: c = 'bottom',
        sideOffset: d = 0,
        align: f = 'center',
        alignOffset: h = 0,
        arrowPadding: p = 0,
        avoidCollisions: m = !0,
        collisionBoundary: g = [],
        collisionPadding: y = 0,
        sticky: v = 'partial',
        hideWhenDetached: b = !1,
        updatePositionStrategy: w = 'optimized',
        onPlaced: x,
        ...k
      } = t,
      S = tP(aP, u),
      [_, E] = $.useState(null),
      C = nC(n, (e) => E(e)),
      [T, P] = $.useState(null),
      A = (function (e) {
        const [t, n] = $.useState(void 0);
        return (
          wC(() => {
            if (e) {
              n({ width: e.offsetWidth, height: e.offsetHeight });
              const t = new ResizeObserver((t) => {
                if (!Array.isArray(t)) return;
                if (!t.length) return;
                const r = t[0];
                let i, a;
                if ('borderBoxSize' in r) {
                  const e = r.borderBoxSize,
                    t = Array.isArray(e) ? e[0] : e;
                  (i = t.inlineSize), (a = t.blockSize);
                } else (i = e.offsetWidth), (a = e.offsetHeight);
                n({ width: i, height: a });
              });
              return t.observe(e, { box: 'border-box' }), () => t.unobserve(e);
            }
            n(void 0);
          }, [e]),
          t
        );
      })(T),
      R = (null == A ? void 0 : A.width) ?? 0,
      O = (null == A ? void 0 : A.height) ?? 0,
      D = c + ('center' !== f ? '-' + f : ''),
      L = 'number' == typeof y ? y : { top: 0, right: 0, bottom: 0, left: 0, ...y },
      N = Array.isArray(g) ? g : [g],
      M = N.length > 0,
      F = { padding: L, boundary: N.filter(fP), altBoundary: M },
      {
        refs: j,
        floatingStyles: V,
        placement: I,
        isPositioned: z,
        middlewareData: B,
      } = (function (e) {
        void 0 === e && (e = {});
        const {
            placement: t = 'bottom',
            strategy: n = 'absolute',
            middleware: r = [],
            platform: i,
            elements: { reference: a, floating: o } = {},
            transform: s = !0,
            whileElementsMounted: l,
            open: u,
          } = e,
          [c, d] = $.useState({
            x: 0,
            y: 0,
            strategy: n,
            placement: t,
            middlewareData: {},
            isPositioned: !1,
          }),
          [f, h] = $.useState(r);
        VT(f, r) || h(r);
        const [p, m] = $.useState(null),
          [g, y] = $.useState(null),
          v = $.useCallback((e) => {
            e !== k.current && ((k.current = e), m(e));
          }, []),
          b = $.useCallback((e) => {
            e !== S.current && ((S.current = e), y(e));
          }, []),
          w = a || p,
          x = o || g,
          k = $.useRef(null),
          S = $.useRef(null),
          _ = $.useRef(c),
          E = null != l,
          C = BT(l),
          T = BT(i),
          P = BT(u),
          A = $.useCallback(() => {
            if (!k.current || !S.current) return;
            const e = { placement: t, strategy: n, middleware: f };
            T.current && (e.platform = T.current),
              FT(k.current, S.current, e).then((e) => {
                const t = { ...e, isPositioned: !1 !== P.current };
                R.current &&
                  !VT(_.current, t) &&
                  ((_.current = t),
                  sd.flushSync(() => {
                    d(t);
                  }));
              });
          }, [f, t, n, T, P]);
        jT(() => {
          !1 === u &&
            _.current.isPositioned &&
            ((_.current.isPositioned = !1), d((e) => ({ ...e, isPositioned: !1 })));
        }, [u]);
        const R = $.useRef(!1);
        jT(
          () => (
            (R.current = !0),
            () => {
              R.current = !1;
            }
          ),
          []
        ),
          jT(() => {
            if ((w && (k.current = w), x && (S.current = x), w && x)) {
              if (C.current) return C.current(w, x, A);
              A();
            }
          }, [w, x, A, C, E]);
        const O = $.useMemo(
            () => ({ reference: k, floating: S, setReference: v, setFloating: b }),
            [v, b]
          ),
          D = $.useMemo(() => ({ reference: w, floating: x }), [w, x]),
          L = $.useMemo(() => {
            const e = { position: n, left: 0, top: 0 };
            if (!D.floating) return e;
            const t = zT(D.floating, c.x),
              r = zT(D.floating, c.y);
            return s
              ? {
                  ...e,
                  transform: 'translate(' + t + 'px, ' + r + 'px)',
                  ...(IT(D.floating) >= 1.5 && { willChange: 'transform' }),
                }
              : { position: n, left: t, top: r };
          }, [n, s, D.floating, c.x, c.y]);
        return $.useMemo(
          () => ({ ...c, update: A, refs: O, elements: D, floatingStyles: L }),
          [c, A, O, D, L]
        );
      })({
        strategy: 'fixed',
        placement: D,
        whileElementsMounted: (...e) => PT(...e, { animationFrame: 'always' === w }),
        elements: { reference: S.anchor },
        middleware: [
          ((U = { mainAxis: d + O, alignmentAxis: h }), { ...AT(U), options: [U, Z] }),
          m && $T({ mainAxis: !0, crossAxis: !1, limiter: 'partial' === v ? ZT() : void 0, ...F }),
          m && WT({ ...F }),
          HT({
            ...F,
            apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
              const { width: i, height: a } = t.reference,
                o = e.floating.style;
              o.setProperty('--radix-popper-available-width', `${n}px`),
                o.setProperty('--radix-popper-available-height', `${r}px`),
                o.setProperty('--radix-popper-anchor-width', `${i}px`),
                o.setProperty('--radix-popper-anchor-height', `${a}px`);
            },
          }),
          T && KT({ element: T, padding: p }),
          hP({ arrowWidth: R, arrowHeight: O }),
          b && qT({ strategy: 'referenceHidden', ...F }),
        ],
      });
    var U, Z;
    const [W, H] = pP(I),
      q = dC(x);
    wC(() => {
      z && (null == q || q());
    }, [z, q]);
    const K = null == (r = B.arrow) ? void 0 : r.x,
      Y = null == (i = B.arrow) ? void 0 : i.y,
      X = 0 !== (null == (a = B.arrow) ? void 0 : a.centerOffset),
      [Q, G] = $.useState();
    return (
      wC(() => {
        _ && G(window.getComputedStyle(_).zIndex);
      }, [_]),
      e('div', {
        ref: j.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...V,
          transform: z ? V.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: Q,
          '--radix-popper-transform-origin': [
            null == (o = B.transformOrigin) ? void 0 : o.x,
            null == (s = B.transformOrigin) ? void 0 : s.y,
          ].join(' '),
          ...((null == (l = B.hide) ? void 0 : l.referenceHidden) && {
            visibility: 'hidden',
            pointerEvents: 'none',
          }),
        },
        dir: t.dir,
        children: e(oP, {
          scope: u,
          placedSide: W,
          onArrowChange: P,
          arrowX: K,
          arrowY: Y,
          shouldHideArrow: X,
          children: e(cC.div, {
            'data-side': W,
            'data-align': H,
            ...k,
            ref: C,
            style: { ...k.style, animation: z ? void 0 : 'none' },
          }),
        }),
      })
    );
  });
lP.displayName = aP;
var uP = 'PopperArrow',
  cP = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  dP = $.forwardRef(function (t, n) {
    const { __scopePopper: r, ...i } = t,
      a = sP(uP, r),
      o = cP[a.placedSide];
    return e('span', {
      ref: a.onArrowChange,
      style: {
        position: 'absolute',
        left: a.arrowX,
        top: a.arrowY,
        [o]: 0,
        transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[
          a.placedSide
        ],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[a.placedSide],
        visibility: a.shouldHideArrow ? 'hidden' : void 0,
      },
      children: e(XT, { ...i, ref: n, style: { ...i.style, display: 'block' } }),
    });
  });
function fP(e) {
  return null !== e;
}
dP.displayName = uP;
var hP = (e) => ({
  name: 'transformOrigin',
  options: e,
  fn(t) {
    var n, r, i;
    const { placement: a, rects: o, middlewareData: s } = t,
      l = 0 !== (null == (n = s.arrow) ? void 0 : n.centerOffset),
      u = l ? 0 : e.arrowWidth,
      c = l ? 0 : e.arrowHeight,
      [d, f] = pP(a),
      h = { start: '0%', center: '50%', end: '100%' }[f],
      p = ((null == (r = s.arrow) ? void 0 : r.x) ?? 0) + u / 2,
      m = ((null == (i = s.arrow) ? void 0 : i.y) ?? 0) + c / 2;
    let g = '',
      y = '';
    return (
      'bottom' === d
        ? ((g = l ? h : `${p}px`), (y = -c + 'px'))
        : 'top' === d
          ? ((g = l ? h : `${p}px`), (y = `${o.floating.height + c}px`))
          : 'right' === d
            ? ((g = -c + 'px'), (y = l ? h : `${m}px`))
            : 'left' === d && ((g = `${o.floating.width + c}px`), (y = l ? h : `${m}px`)),
      { data: { x: g, y: y } }
    );
  },
});
function pP(e) {
  const [t, n = 'center'] = e.split('-');
  return [t, n];
}
var mP = nP,
  gP = iP,
  yP = lP,
  vP = dP,
  bP = $.forwardRef((t, n) => {
    var r;
    const { container: i, ...a } = t,
      [o, s] = $.useState(!1);
    wC(() => s(!0), []);
    const l =
      i ||
      (o && (null == (r = null == globalThis ? void 0 : globalThis.document) ? void 0 : r.body));
    return l ? ld.createPortal(e(cC.div, { ...a, ref: n }), l) : null;
  });
bP.displayName = 'Portal';
var wP = (e) => {
  const { present: t, children: n } = e,
    r = (function (e) {
      const [t, n] = $.useState(),
        r = $.useRef({}),
        i = $.useRef(e),
        a = $.useRef('none'),
        o = e ? 'mounted' : 'unmounted',
        [s, l] = (function (e, t) {
          return $.useReducer((e, n) => t[e][n] ?? e, e);
        })(o, {
          mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
          unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
          unmounted: { MOUNT: 'mounted' },
        });
      return (
        $.useEffect(() => {
          const e = xP(r.current);
          a.current = 'mounted' === s ? e : 'none';
        }, [s]),
        wC(() => {
          const t = r.current,
            n = i.current;
          if (n !== e) {
            const r = a.current,
              o = xP(t);
            if (e) l('MOUNT');
            else if ('none' === o || 'none' === (null == t ? void 0 : t.display)) l('UNMOUNT');
            else {
              l(n && r !== o ? 'ANIMATION_OUT' : 'UNMOUNT');
            }
            i.current = e;
          }
        }, [e, l]),
        wC(() => {
          if (t) {
            let e;
            const n = t.ownerDocument.defaultView ?? window,
              o = (a) => {
                const o = xP(r.current).includes(a.animationName);
                if (a.target === t && o && (l('ANIMATION_END'), !i.current)) {
                  const r = t.style.animationFillMode;
                  (t.style.animationFillMode = 'forwards'),
                    (e = n.setTimeout(() => {
                      'forwards' === t.style.animationFillMode && (t.style.animationFillMode = r);
                    }));
                }
              },
              s = (e) => {
                e.target === t && (a.current = xP(r.current));
              };
            return (
              t.addEventListener('animationstart', s),
              t.addEventListener('animationcancel', o),
              t.addEventListener('animationend', o),
              () => {
                n.clearTimeout(e),
                  t.removeEventListener('animationstart', s),
                  t.removeEventListener('animationcancel', o),
                  t.removeEventListener('animationend', o);
              }
            );
          }
          l('ANIMATION_END');
        }, [t, l]),
        {
          isPresent: ['mounted', 'unmountSuspended'].includes(s),
          ref: $.useCallback((e) => {
            e && (r.current = getComputedStyle(e)), n(e);
          }, []),
        }
      );
    })(t),
    i = 'function' == typeof n ? n({ present: r.isPresent }) : $.Children.only(n),
    a = nC(
      r.ref,
      (function (e) {
        var t, n;
        let r = null == (t = Object.getOwnPropertyDescriptor(e.props, 'ref')) ? void 0 : t.get,
          i = r && 'isReactWarning' in r && r.isReactWarning;
        if (i) return e.ref;
        if (
          ((r = null == (n = Object.getOwnPropertyDescriptor(e, 'ref')) ? void 0 : n.get),
          (i = r && 'isReactWarning' in r && r.isReactWarning),
          i)
        )
          return e.props.ref;
        return e.props.ref || e.ref;
      })(i)
    );
  return 'function' == typeof n || r.isPresent ? $.cloneElement(i, { ref: a }) : null;
};
function xP(e) {
  return (null == e ? void 0 : e.animationName) || 'none';
}
function kP({ prop: e, defaultProp: t, onChange: n = () => {} }) {
  const [r, i] = (function ({ defaultProp: e, onChange: t }) {
      const n = $.useState(e),
        [r] = n,
        i = $.useRef(r),
        a = dC(t);
      return (
        $.useEffect(() => {
          i.current !== r && (a(r), (i.current = r));
        }, [r, i, a]),
        n
      );
    })({ defaultProp: t, onChange: n }),
    a = void 0 !== e,
    o = a ? e : r,
    s = dC(n);
  return [
    o,
    $.useCallback(
      (t) => {
        if (a) {
          const n = 'function' == typeof t ? t(e) : t;
          n !== e && s(n);
        } else i(t);
      },
      [a, e, i, s]
    ),
  ];
}
wP.displayName = 'Presence';
var SP = $.forwardRef((t, n) =>
  e(cC.span, {
    ...t,
    ref: n,
    style: {
      position: 'absolute',
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      ...t.style,
    },
  })
);
SP.displayName = 'VisuallyHidden';
var _P = SP,
  [EP, CP] = rC('Tooltip', [JT]),
  TP = JT(),
  PP = 'TooltipProvider',
  AP = 700,
  RP = 'tooltip.open',
  [OP, DP] = EP(PP),
  LP = (t) => {
    const {
        __scopeTooltip: n,
        delayDuration: r = AP,
        skipDelayDuration: i = 300,
        disableHoverableContent: a = !1,
        children: o,
      } = t,
      [s, l] = $.useState(!0),
      u = $.useRef(!1),
      c = $.useRef(0);
    return (
      $.useEffect(() => {
        const e = c.current;
        return () => window.clearTimeout(e);
      }, []),
      e(OP, {
        scope: n,
        isOpenDelayed: s,
        delayDuration: r,
        onOpen: $.useCallback(() => {
          window.clearTimeout(c.current), l(!1);
        }, []),
        onClose: $.useCallback(() => {
          window.clearTimeout(c.current), (c.current = window.setTimeout(() => l(!0), i));
        }, [i]),
        isPointerInTransitRef: u,
        onPointerInTransitChange: $.useCallback((e) => {
          u.current = e;
        }, []),
        disableHoverableContent: a,
        children: o,
      })
    );
  };
LP.displayName = PP;
var NP = 'Tooltip',
  [MP, FP] = EP(NP),
  jP = (t) => {
    const {
        __scopeTooltip: n,
        children: r,
        open: i,
        defaultOpen: a = !1,
        onOpenChange: o,
        disableHoverableContent: s,
        delayDuration: l,
      } = t,
      u = DP(NP, t.__scopeTooltip),
      c = TP(n),
      [d, f] = $.useState(null),
      h = (function (e) {
        const [t, n] = $.useState(xC());
        return (
          wC(() => {
            e || n((e) => e ?? String(kC++));
          }, [e]),
          e || (t ? `radix-${t}` : '')
        );
      })(),
      p = $.useRef(0),
      m = s ?? u.disableHoverableContent,
      g = l ?? u.delayDuration,
      y = $.useRef(!1),
      [v = !1, b] = kP({
        prop: i,
        defaultProp: a,
        onChange: (e) => {
          e ? (u.onOpen(), document.dispatchEvent(new CustomEvent(RP))) : u.onClose(),
            null == o || o(e);
        },
      }),
      w = $.useMemo(() => (v ? (y.current ? 'delayed-open' : 'instant-open') : 'closed'), [v]),
      x = $.useCallback(() => {
        window.clearTimeout(p.current), (p.current = 0), (y.current = !1), b(!0);
      }, [b]),
      k = $.useCallback(() => {
        window.clearTimeout(p.current), (p.current = 0), b(!1);
      }, [b]),
      S = $.useCallback(() => {
        window.clearTimeout(p.current),
          (p.current = window.setTimeout(() => {
            (y.current = !0), b(!0), (p.current = 0);
          }, g));
      }, [g, b]);
    return (
      $.useEffect(
        () => () => {
          p.current && (window.clearTimeout(p.current), (p.current = 0));
        },
        []
      ),
      e(mP, {
        ...c,
        children: e(MP, {
          scope: n,
          contentId: h,
          open: v,
          stateAttribute: w,
          trigger: d,
          onTriggerChange: f,
          onTriggerEnter: $.useCallback(() => {
            u.isOpenDelayed ? S() : x();
          }, [u.isOpenDelayed, S, x]),
          onTriggerLeave: $.useCallback(() => {
            m ? k() : (window.clearTimeout(p.current), (p.current = 0));
          }, [k, m]),
          onOpen: x,
          onClose: k,
          disableHoverableContent: m,
          children: r,
        }),
      })
    );
  };
jP.displayName = NP;
var VP = 'TooltipTrigger',
  IP = $.forwardRef((t, n) => {
    const { __scopeTooltip: r, ...i } = t,
      a = FP(VP, r),
      o = DP(VP, r),
      s = TP(r),
      l = nC(n, $.useRef(null), a.onTriggerChange),
      u = $.useRef(!1),
      c = $.useRef(!1),
      d = $.useCallback(() => (u.current = !1), []);
    return (
      $.useEffect(() => () => document.removeEventListener('pointerup', d), [d]),
      e(gP, {
        asChild: !0,
        ...s,
        children: e(cC.button, {
          'aria-describedby': a.open ? a.contentId : void 0,
          'data-state': a.stateAttribute,
          ...i,
          ref: l,
          onPointerMove: JE(t.onPointerMove, (e) => {
            'touch' !== e.pointerType &&
              (c.current ||
                o.isPointerInTransitRef.current ||
                (a.onTriggerEnter(), (c.current = !0)));
          }),
          onPointerLeave: JE(t.onPointerLeave, () => {
            a.onTriggerLeave(), (c.current = !1);
          }),
          onPointerDown: JE(t.onPointerDown, () => {
            (u.current = !0), document.addEventListener('pointerup', d, { once: !0 });
          }),
          onFocus: JE(t.onFocus, () => {
            u.current || a.onOpen();
          }),
          onBlur: JE(t.onBlur, a.onClose),
          onClick: JE(t.onClick, a.onClose),
        }),
      })
    );
  });
IP.displayName = VP;
var zP = 'TooltipPortal',
  [BP, UP] = EP(zP, { forceMount: void 0 }),
  $P = (t) => {
    const { __scopeTooltip: n, forceMount: r, children: i, container: a } = t,
      o = FP(zP, n);
    return e(BP, {
      scope: n,
      forceMount: r,
      children: e(wP, {
        present: r || o.open,
        children: e(bP, { asChild: !0, container: a, children: i }),
      }),
    });
  };
$P.displayName = zP;
var ZP = 'TooltipContent',
  WP = $.forwardRef((t, n) => {
    const r = UP(ZP, t.__scopeTooltip),
      { forceMount: i = r.forceMount, side: a = 'top', ...o } = t,
      s = FP(ZP, t.__scopeTooltip);
    return e(wP, {
      present: i || s.open,
      children: s.disableHoverableContent
        ? e(YP, { side: a, ...o, ref: n })
        : e(HP, { side: a, ...o, ref: n }),
    });
  }),
  HP = $.forwardRef((t, n) => {
    const r = FP(ZP, t.__scopeTooltip),
      i = DP(ZP, t.__scopeTooltip),
      a = $.useRef(null),
      o = nC(n, a),
      [s, l] = $.useState(null),
      { trigger: u, onClose: c } = r,
      d = a.current,
      { onPointerInTransitChange: f } = i,
      h = $.useCallback(() => {
        l(null), f(!1);
      }, [f]),
      p = $.useCallback(
        (e, t) => {
          const n = e.currentTarget,
            r = { x: e.clientX, y: e.clientY },
            i = (function (e, t, n = 5) {
              const r = [];
              switch (t) {
                case 'top':
                  r.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n });
                  break;
                case 'bottom':
                  r.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n });
                  break;
                case 'left':
                  r.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n });
                  break;
                case 'right':
                  r.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n });
              }
              return r;
            })(
              r,
              (function (e, t) {
                const n = Math.abs(t.top - e.y),
                  r = Math.abs(t.bottom - e.y),
                  i = Math.abs(t.right - e.x),
                  a = Math.abs(t.left - e.x);
                switch (Math.min(n, r, i, a)) {
                  case a:
                    return 'left';
                  case i:
                    return 'right';
                  case n:
                    return 'top';
                  case r:
                    return 'bottom';
                  default:
                    throw new Error('unreachable');
                }
              })(r, n.getBoundingClientRect())
            ),
            a = (function (e) {
              const t = e.slice();
              return (
                t.sort((e, t) =>
                  e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : e.y > t.y ? 1 : 0
                ),
                (function (e) {
                  if (e.length <= 1) return e.slice();
                  const t = [];
                  for (let r = 0; r < e.length; r++) {
                    const n = e[r];
                    for (; t.length >= 2; ) {
                      const e = t[t.length - 1],
                        r = t[t.length - 2];
                      if (!((e.x - r.x) * (n.y - r.y) >= (e.y - r.y) * (n.x - r.x))) break;
                      t.pop();
                    }
                    t.push(n);
                  }
                  t.pop();
                  const n = [];
                  for (let r = e.length - 1; r >= 0; r--) {
                    const t = e[r];
                    for (; n.length >= 2; ) {
                      const e = n[n.length - 1],
                        r = n[n.length - 2];
                      if (!((e.x - r.x) * (t.y - r.y) >= (e.y - r.y) * (t.x - r.x))) break;
                      n.pop();
                    }
                    n.push(t);
                  }
                  return (
                    n.pop(),
                    1 === t.length && 1 === n.length && t[0].x === n[0].x && t[0].y === n[0].y
                      ? t
                      : t.concat(n)
                  );
                })(t)
              );
            })([
              ...i,
              ...(function (e) {
                const { top: t, right: n, bottom: r, left: i } = e;
                return [
                  { x: i, y: t },
                  { x: n, y: t },
                  { x: n, y: r },
                  { x: i, y: r },
                ];
              })(t.getBoundingClientRect()),
            ]);
          l(a), f(!0);
        },
        [f]
      );
    return (
      $.useEffect(() => () => h(), [h]),
      $.useEffect(() => {
        if (u && d) {
          const e = (e) => p(e, d),
            t = (e) => p(e, u);
          return (
            u.addEventListener('pointerleave', e),
            d.addEventListener('pointerleave', t),
            () => {
              u.removeEventListener('pointerleave', e), d.removeEventListener('pointerleave', t);
            }
          );
        }
      }, [u, d, p, h]),
      $.useEffect(() => {
        if (s) {
          const e = (e) => {
            const t = e.target,
              n = { x: e.clientX, y: e.clientY },
              r = (null == u ? void 0 : u.contains(t)) || (null == d ? void 0 : d.contains(t)),
              i = !(function (e, t) {
                const { x: n, y: r } = e;
                let i = !1;
                for (let a = 0, o = t.length - 1; a < t.length; o = a++) {
                  const e = t[a].x,
                    s = t[a].y,
                    l = t[o].x,
                    u = t[o].y;
                  s > r != u > r && n < ((l - e) * (r - s)) / (u - s) + e && (i = !i);
                }
                return i;
              })(n, s);
            r ? h() : i && (h(), c());
          };
          return (
            document.addEventListener('pointermove', e),
            () => document.removeEventListener('pointermove', e)
          );
        }
      }, [u, d, s, c, h]),
      e(YP, { ...t, ref: o })
    );
  }),
  [qP, KP] = EP(NP, { isInside: !1 }),
  YP = $.forwardRef((n, r) => {
    const {
        __scopeTooltip: i,
        children: a,
        'aria-label': o,
        onEscapeKeyDown: s,
        onPointerDownOutside: l,
        ...u
      } = n,
      c = FP(ZP, i),
      d = TP(i),
      { onClose: f } = c;
    return (
      $.useEffect(
        () => (document.addEventListener(RP, f), () => document.removeEventListener(RP, f)),
        [f]
      ),
      $.useEffect(() => {
        if (c.trigger) {
          const e = (e) => {
            const t = e.target;
            (null == t ? void 0 : t.contains(c.trigger)) && f();
          };
          return (
            window.addEventListener('scroll', e, { capture: !0 }),
            () => window.removeEventListener('scroll', e, { capture: !0 })
          );
        }
      }, [c.trigger, f]),
      e(yC, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: l,
        onFocusOutside: (e) => e.preventDefault(),
        onDismiss: f,
        children: t(yP, {
          'data-state': c.stateAttribute,
          ...d,
          ...u,
          ref: r,
          style: {
            ...u.style,
            '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
          },
          children: [
            e(sC, { children: a }),
            e(qP, {
              scope: i,
              isInside: !0,
              children: e(_P, { id: c.contentId, role: 'tooltip', children: o || a }),
            }),
          ],
        }),
      })
    );
  });
WP.displayName = ZP;
var XP = 'TooltipArrow';
$.forwardRef((t, n) => {
  const { __scopeTooltip: r, ...i } = t,
    a = TP(r);
  return KP(XP, r).isInside ? null : e(vP, { ...a, ...i, ref: n });
}).displayName = XP;
var QP = LP,
  GP = jP,
  JP = IP,
  eA = $P,
  tA = WP;
export {
  Qx as A,
  ek as C,
  ik as E,
  ok as I,
  QP as P,
  Z as R,
  JP as T,
  tp as a,
  rp as b,
  Fd as c,
  Ld as d,
  Rd as e,
  Zx as f,
  nk as g,
  Od as h,
  ee as i,
  J as j,
  GP as k,
  eA as l,
  Dd as m,
  tA as n,
  _E as o,
  $ as r,
  cE as s,
  GE as t,
  wS as u,
  HE as z,
};
