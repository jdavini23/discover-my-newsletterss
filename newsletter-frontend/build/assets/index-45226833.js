var e = Object.defineProperty,
  r = (r, t, s) => (
    ((r, t, s) => {
      t in r ? e(r, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (r[t] = s);
    })(r, 'symbol' != typeof t ? t + '' : t, s),
    s
  );
import { u as t, j as s, F as n, a as o } from './pages-3cea39f5.js';
import {
  r as a,
  R as i,
  A as l,
  f as c,
  C as d,
  g as h,
  E as m,
  I as u,
  i as p,
} from './vendor-b2d6fadb.js';
import { N as g, L as f, _, R as y, b as E, B as R } from './vendor-ui-e4b1e923.js';
import { c as b, d as N, p as w, I as O } from './vendor-libs-a0c97417.js';
!(function () {
  const e = document.createElement('link').relList;
  if (!(e && e.supports && e.supports('modulepreload'))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
    new MutationObserver((e) => {
      for (const t of e)
        if ('childList' === t.type)
          for (const e of t.addedNodes) 'LINK' === e.tagName && 'modulepreload' === e.rel && r(e);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = (function (e) {
      const r = {};
      return (
        e.integrity && (r.integrity = e.integrity),
        e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
        'use-credentials' === e.crossOrigin
          ? (r.credentials = 'include')
          : 'anonymous' === e.crossOrigin
            ? (r.credentials = 'omit')
            : (r.credentials = 'same-origin'),
        r
      );
    })(e);
    fetch(e.href, r);
  }
})();
const v = ({ children: e, requiredRoles: r }) => {
  var o;
  const { isAuthenticated: a, user: i } = t(),
    l = !r || (null == (o = null == i ? void 0 : i.roles) ? void 0 : o.some((e) => r.includes(e)));
  return a()
    ? r && !l
      ? s(g, { to: '/unauthorized', replace: !0 })
      : s(n, { children: e })
    : s(g, { to: '/login', replace: !0 });
};
b()(
  N(
    w(
      (e) => ({
        user: { isAuthenticated: !1, mfaEnabled: !1 },
        setUser: (r) => e((e) => ({ user: { ...e.user, ...r } })),
        clearUser: () => e({ user: { isAuthenticated: !1, mfaEnabled: !1 } }),
      }),
      { name: 'user-storage' }
    )
  )
),
  b()(
    N((e) => ({
      newsletters: [],
      selectedNewsletter: null,
      setNewsletters: (r) => e({ newsletters: r }),
      selectNewsletter: (r) => e({ selectedNewsletter: r }),
    }))
  );
const x = b()(
    N((e) => ({
      notifications: [],
      addNotification: (r) =>
        e((e) => ({ notifications: [...e.notifications, { ...r, id: Date.now().toString() }] })),
      removeNotification: (r) =>
        e((e) => ({ notifications: e.notifications.filter((e) => e.id !== r) })),
    }))
  ),
  T = ({ error: e, errorType: r }) => {
    const { addNotification: t } = x();
    return (
      i.useEffect(() => {
        (async (e, r, t) => {
          try {
            console.error('Detailed Error Logging:', {
              message: e.message,
              name: e.name,
              type: r,
              stack: e.stack,
              componentStack: t,
            });
          } catch (s) {
            console.error('Error logging failed:', s);
          }
        })(e, r),
          t({ message: A(r), type: 'error' });
      }, [e, r, t]),
      null
    );
  },
  A = (e) => {
    switch (e) {
      case 'NETWORK_ERROR':
        return 'Network connection lost. Please check your internet and try again.';
      case 'API_ERROR':
        return 'Unable to fetch data. Our team has been notified.';
      case 'RENDER_ERROR':
        return 'Something went wrong while rendering the page.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  };
class P extends a.Component {
  constructor(e) {
    super(e),
      r(this, 'handleErrorReset', () => {
        this.setState({ hasError: !1, error: void 0, errorType: 'UNKNOWN_ERROR' });
      }),
      (this.state = { hasError: !1, error: void 0, errorType: 'UNKNOWN_ERROR' });
  }
  static getDerivedStateFromError(e) {
    let r = 'UNKNOWN_ERROR';
    return (
      (r =
        e.message.includes('fetch') || e.message.includes('network')
          ? 'NETWORK_ERROR'
          : e.message.includes('API') || e.message.includes('request failed')
            ? 'API_ERROR'
            : 'RENDER_ERROR'),
      { hasError: !0, error: e, errorType: r }
    );
  }
  componentDidCatch(e, r) {
    this.props.onError && this.props.onError(e, this.state.errorType),
      console.error('Uncaught error:', e),
      console.error('Error Info:', r.componentStack);
  }
  render() {
    return this.state.hasError
      ? o(n, {
          children: [
            this.state.error && s(T, { error: this.state.error, errorType: this.state.errorType }),
            this.props.fallback ||
              s('div', {
                className:
                  'error-boundary min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4',
                children: o('div', {
                  className: 'max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center',
                  children: [
                    s('h1', {
                      className: 'text-3xl font-bold text-red-600 mb-4',
                      children: 'Oops! Something Went Wrong',
                    }),
                    s('p', { className: 'text-gray-700 mb-6', children: A(this.state.errorType) }),
                    this.state.error &&
                      o('details', {
                        className: 'mb-6 text-left bg-gray-100 p-4 rounded',
                        children: [
                          s('summary', {
                            className: 'cursor-pointer text-gray-800 font-semibold',
                            children: 'Error Details',
                          }),
                          s('pre', {
                            className: 'text-xs text-gray-600 overflow-x-auto',
                            children: this.state.error.toString(),
                          }),
                        ],
                      }),
                    o('div', {
                      className: 'flex flex-col space-y-4',
                      children: [
                        s('button', {
                          onClick: this.handleErrorReset,
                          className:
                            'w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition',
                          children: 'Try Again',
                        }),
                        s(f, {
                          to: '/',
                          className:
                            'w-full bg-gray-200 text-gray-800 py-2 rounded text-center hover:bg-gray-300 transition',
                          children: 'Return to Home',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        })
      : this.props.children;
  }
}
const I = { success: d, error: h, warning: m, info: u },
  j = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  },
  D = () => {
    const { notifications: e, removeNotification: r } = x();
    return (
      a.useEffect(() => {
        const t = setTimeout(() => {
          e.length > 0 && r(e[0].id);
        }, 5e3);
        return () => clearTimeout(t);
      }, [e, r]),
      s('div', {
        className: 'fixed top-4 right-4 z-[100] space-y-2',
        children: s(l, {
          children: e.map((e) => {
            const t = I[e.type],
              n = j[e.type];
            return o(
              c.div,
              {
                initial: { opacity: 0, x: 100 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 100 },
                transition: { duration: 0.3 },
                className: `flex items-center p-4 rounded-lg shadow-lg text-white ${n}`,
                children: [
                  s(t, { className: 'w-6 h-6 mr-3' }),
                  s('span', { children: e.message }),
                  s('button', {
                    onClick: () => r(e.id),
                    className: 'ml-4 hover:bg-white/20 rounded-full p-1',
                    children: '✕',
                  }),
                ],
              },
              e.id
            );
          }),
        }),
      })
    );
  },
  L = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.H),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  z = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.L),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  k = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.R),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  S = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.D),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  V = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.P),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  U = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.b),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  W = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.N),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  C = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.c),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  K = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.d),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  q = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.e),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  B = a.lazy(() =>
    _(
      () => import('./pages-3cea39f5.js').then((e) => e.U),
      [
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  F = a.lazy(() =>
    _(
      () => import('./InterestWizard-ff8115aa.js'),
      [
        'assets/InterestWizard-ff8115aa.js',
        'assets/pages-3cea39f5.js',
        'assets/vendor-ui-e4b1e923.js',
        'assets/vendor-b2d6fadb.js',
        'assets/vendor-libs-a0c97417.js',
      ]
    )
  ),
  H = () =>
    s('div', {
      className: 'flex justify-center items-center h-screen',
      children: s('div', {
        className: 'animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500',
      }),
    }),
  M = ({ children: e, allowedRoles: r }) => s(v, { requiredRoles: r, children: e }),
  $ = () => {
    const { isAuthenticated: e } = t();
    return s(P, {
      children: s(P, {
        children: s(a.Suspense, {
          fallback: s(H, {}),
          children: o('div', {
            className: 'min-h-screen bg-gray-50',
            children: [
              s(O, { position: 'top-right' }),
              s(D, {}),
              o(y, {
                children: [
                  s(E, { path: '/', element: e() ? s(g, { to: '/dashboard' }) : s(L, {}) }),
                  s(E, { path: '/login', element: e() ? s(g, { to: '/dashboard' }) : s(z, {}) }),
                  s(E, { path: '/register', element: e() ? s(g, { to: '/dashboard' }) : s(k, {}) }),
                  s(E, { path: '/unauthorized', element: s(B, {}) }),
                  s(E, { path: '/password-reset', element: s(V, {}) }),
                  s(E, { path: '/password-reset-confirm', element: s(U, {}) }),
                  s(E, { path: '/discover/interests', element: s(F, {}) }),
                  s(E, { path: '/discover/newsletters', element: s(W, {}) }),
                  s(E, { path: '/dashboard', element: s(v, { children: s(S, {}) }) }),
                  s(E, { path: '/profile', element: s(v, { children: s(C, {}) }) }),
                  s(E, {
                    path: '/newsletters',
                    element: s(M, { allowedRoles: ['admin'], children: s(K, {}) }),
                  }),
                  s(E, { path: '*', element: s(q, {}) }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  },
  G = a.createContext({ user: { id: null, name: null }, setUser: () => {} }),
  J = ({ children: e }) => {
    const [r, t] = a.useState({ id: null, name: null });
    return s(G.Provider, { value: { user: r, setUser: t }, children: e });
  };
p.createRoot(document.getElementById('root')).render(
  s(i.StrictMode, { children: s(R, { children: s(J, { children: s($, {}) }) }) })
);
export { x as u };