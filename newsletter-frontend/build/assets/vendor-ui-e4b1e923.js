import { r as e } from './vendor-b2d6fadb.js';
const t = {},
  n = function (e, n, r) {
    if (!n || 0 === n.length) return e();
    const a = document.getElementsByTagName('link');
    return Promise.all(
      n.map((e) => {
        if (
          (e = (function (e) {
            return '/' + e;
          })(e)) in t
        )
          return;
        t[e] = !0;
        const n = e.endsWith('.css'),
          o = n ? '[rel="stylesheet"]' : '';
        if (!!r)
          for (let t = a.length - 1; t >= 0; t--) {
            const r = a[t];
            if (r.href === e && (!n || 'stylesheet' === r.rel)) return;
          }
        else if (document.querySelector(`link[href="${e}"]${o}`)) return;
        const i = document.createElement('link');
        return (
          (i.rel = n ? 'stylesheet' : 'modulepreload'),
          n || ((i.as = 'script'), (i.crossOrigin = '')),
          (i.href = e),
          document.head.appendChild(i),
          n
            ? new Promise((t, n) => {
                i.addEventListener('load', t),
                  i.addEventListener('error', () => n(new Error(`Unable to preload CSS for ${e}`)));
              })
            : void 0
        );
      })
    )
      .then(() => e())
      .catch((e) => {
        const t = new Event('vite:preloadError', { cancelable: !0 });
        if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented)) throw e;
      });
  };
var r = 'popstate';
function a(e = {}) {
  return (function (e, t, n, a = {}) {
    let { window: i = document.defaultView, v5Compat: c = !1 } = a,
      h = i.history,
      d = 'POP',
      p = null,
      m = f();
    null == m && ((m = 0), h.replaceState({ ...h.state, idx: m }, ''));
    function f() {
      return (h.state || { idx: null }).idx;
    }
    function v() {
      d = 'POP';
      let e = f(),
        t = null == e ? null : e - m;
      (m = e), p && p({ action: d, location: b.location, delta: t });
    }
    function y(e, t) {
      d = 'PUSH';
      let r = u(b.location, e, t);
      n && n(r, e), (m = f() + 1);
      let a = l(r, m),
        o = b.createHref(r);
      try {
        h.pushState(a, '', o);
      } catch (s) {
        if (s instanceof DOMException && 'DataCloneError' === s.name) throw s;
        i.location.assign(o);
      }
      c && p && p({ action: d, location: b.location, delta: 1 });
    }
    function g(e, t) {
      d = 'REPLACE';
      let r = u(b.location, e, t);
      n && n(r, e), (m = f());
      let a = l(r, m),
        o = b.createHref(r);
      h.replaceState(a, '', o), c && p && p({ action: d, location: b.location, delta: 0 });
    }
    function w(e) {
      let t = 'null' !== i.location.origin ? i.location.origin : i.location.href,
        n = 'string' == typeof e ? e : s(e);
      return (
        (n = n.replace(/ $/, '%20')),
        o(t, `No window.location.(origin|href) available to create URL for href: ${n}`),
        new URL(n, t)
      );
    }
    let b = {
      get action() {
        return d;
      },
      get location() {
        return e(i, h);
      },
      listen(e) {
        if (p) throw new Error('A history only accepts one active listener');
        return (
          i.addEventListener(r, v),
          (p = e),
          () => {
            i.removeEventListener(r, v), (p = null);
          }
        );
      },
      createHref: (e) => t(i, e),
      createURL: w,
      encodeLocation(e) {
        let t = w(e);
        return { pathname: t.pathname, search: t.search, hash: t.hash };
      },
      push: y,
      replace: g,
      go: (e) => h.go(e),
    };
    return b;
  })(
    function (e, t) {
      let { pathname: n, search: r, hash: a } = e.location;
      return u(
        '',
        { pathname: n, search: r, hash: a },
        (t.state && t.state.usr) || null,
        (t.state && t.state.key) || 'default'
      );
    },
    function (e, t) {
      return 'string' == typeof t ? t : s(t);
    },
    null,
    e
  );
}
function o(e, t) {
  if (!1 === e || null == e) throw new Error(t);
}
function i(e, t) {
  if (!e) {
    'undefined' != typeof console && console.warn(t);
    try {
      throw new Error(t);
    } catch (n) {}
  }
}
function l(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function u(e, t, n = null, r) {
  return {
    pathname: 'string' == typeof e ? e : e.pathname,
    search: '',
    hash: '',
    ...('string' == typeof t ? c(t) : t),
    state: n,
    key: (t && t.key) || r || Math.random().toString(36).substring(2, 10),
  };
}
function s({ pathname: e = '/', search: t = '', hash: n = '' }) {
  return (
    t && '?' !== t && (e += '?' === t.charAt(0) ? t : '?' + t),
    n && '#' !== n && (e += '#' === n.charAt(0) ? n : '#' + n),
    e
  );
}
function c(e) {
  let t = {};
  if (e) {
    let n = e.indexOf('#');
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf('?');
    r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))), e && (t.pathname = e);
  }
  return t;
}
function h(e, t, n = '/') {
  return (function (e, t, n, r) {
    let a = 'string' == typeof t ? c(t) : t,
      o = S(a.pathname || '/', n);
    if (null == o) return null;
    let i = d(e);
    !(function (e) {
      e.sort((e, t) =>
        e.score !== t.score
          ? t.score - e.score
          : (function (e, t) {
              let n = e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n]);
              return n ? e[e.length - 1] - t[t.length - 1] : 0;
            })(
              e.routesMeta.map((e) => e.childrenIndex),
              t.routesMeta.map((e) => e.childrenIndex)
            )
      );
    })(i);
    let l = null;
    for (let u = 0; null == l && u < i.length; ++u) {
      let e = C(o);
      l = R(i[u], e, r);
    }
    return l;
  })(e, t, n, !1);
}
function d(e, t = [], n = [], r = '') {
  let a = (e, a, i) => {
    let l = {
      relativePath: void 0 === i ? e.path || '' : i,
      caseSensitive: !0 === e.caseSensitive,
      childrenIndex: a,
      route: e,
    };
    l.relativePath.startsWith('/') &&
      (o(
        l.relativePath.startsWith(r),
        `Absolute route path "${l.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (l.relativePath = l.relativePath.slice(r.length)));
    let u = k([r, l.relativePath]),
      s = n.concat(l);
    e.children &&
      e.children.length > 0 &&
      (o(
        !0 !== e.index,
        `Index routes must not have child routes. Please remove all child routes from route path "${u}".`
      ),
      d(e.children, t, s, u)),
      (null != e.path || e.index) && t.push({ path: u, score: E(u, e.index), routesMeta: s });
  };
  return (
    e.forEach((e, t) => {
      var n;
      if ('' !== e.path && (null == (n = e.path) ? void 0 : n.includes('?')))
        for (let r of p(e.path)) a(e, t, r);
      else a(e, t);
    }),
    t
  );
}
function p(e) {
  let t = e.split('/');
  if (0 === t.length) return [];
  let [n, ...r] = t,
    a = n.endsWith('?'),
    o = n.replace(/\?$/, '');
  if (0 === r.length) return a ? [o, ''] : [o];
  let i = p(r.join('/')),
    l = [];
  return (
    l.push(...i.map((e) => ('' === e ? o : [o, e].join('/')))),
    a && l.push(...i),
    l.map((t) => (e.startsWith('/') && '' === t ? '/' : t))
  );
}
var m = /^:[\w-]+$/,
  f = 3,
  v = 2,
  y = 1,
  g = 10,
  w = -2,
  b = (e) => '*' === e;
function E(e, t) {
  let n = e.split('/'),
    r = n.length;
  return (
    n.some(b) && (r += w),
    t && (r += v),
    n.filter((e) => !b(e)).reduce((e, t) => e + (m.test(t) ? f : '' === t ? y : g), r)
  );
}
function R(e, t, n = !1) {
  let { routesMeta: r } = e,
    a = {},
    o = '/',
    i = [];
  for (let l = 0; l < r.length; ++l) {
    let e = r[l],
      u = l === r.length - 1,
      s = '/' === o ? t : t.slice(o.length) || '/',
      c = x({ path: e.relativePath, caseSensitive: e.caseSensitive, end: u }, s),
      h = e.route;
    if (
      (!c &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (c = x({ path: e.relativePath, caseSensitive: e.caseSensitive, end: !1 }, s)),
      !c)
    )
      return null;
    Object.assign(a, c.params),
      i.push({
        params: a,
        pathname: k([o, c.pathname]),
        pathnameBase: T(k([o, c.pathnameBase])),
        route: h,
      }),
      '/' !== c.pathnameBase && (o = k([o, c.pathnameBase]));
  }
  return i;
}
function x(e, t) {
  'string' == typeof e && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = (function (e, t = !1, n = !0) {
      i(
        '*' === e || !e.endsWith('*') || e.endsWith('/*'),
        `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, '/*')}".`
      );
      let r = [],
        a =
          '^' +
          e
            .replace(/\/*\*?$/, '')
            .replace(/^\/*/, '/')
            .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
            .replace(
              /\/:([\w-]+)(\?)?/g,
              (e, t, n) => (
                r.push({ paramName: t, isOptional: null != n }), n ? '/?([^\\/]+)?' : '/([^\\/]+)'
              )
            );
      e.endsWith('*')
        ? (r.push({ paramName: '*' }),
          (a += '*' === e || '/*' === e ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
        : n
          ? (a += '\\/*$')
          : '' !== e && '/' !== e && (a += '(?:(?=\\/|$))');
      let o = new RegExp(a, t ? void 0 : 'i');
      return [o, r];
    })(e.path, e.caseSensitive, e.end),
    a = t.match(n);
  if (!a) return null;
  let o = a[0],
    l = o.replace(/(.)\/+$/, '$1'),
    u = a.slice(1);
  return {
    params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
      if ('*' === t) {
        let e = u[r] || '';
        l = o.slice(0, o.length - e.length).replace(/(.)\/+$/, '$1');
      }
      const a = u[r];
      return (e[t] = n && !a ? void 0 : (a || '').replace(/%2F/g, '/')), e;
    }, {}),
    pathname: o,
    pathnameBase: l,
    pattern: e,
  };
}
function C(e) {
  try {
    return e
      .split('/')
      .map((e) => decodeURIComponent(e).replace(/\//g, '%2F'))
      .join('/');
  } catch (t) {
    return (
      i(
        !1,
        `The URL path "${e}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
      ),
      e
    );
  }
}
function S(e, t) {
  if ('/' === t) return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && '/' !== r ? null : e.slice(n) || '/';
}
function $(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function L(e) {
  let t = (function (e) {
    return e.filter((e, t) => 0 === t || (e.route.path && e.route.path.length > 0));
  })(e);
  return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
}
function P(e, t, n, r = !1) {
  let a;
  'string' == typeof e
    ? (a = c(e))
    : ((a = { ...e }),
      o(!a.pathname || !a.pathname.includes('?'), $('?', 'pathname', 'search', a)),
      o(!a.pathname || !a.pathname.includes('#'), $('#', 'pathname', 'hash', a)),
      o(!a.search || !a.search.includes('#'), $('#', 'search', 'hash', a)));
  let i,
    l = '' === e || '' === a.pathname,
    u = l ? '/' : a.pathname;
  if (null == u) i = n;
  else {
    let e = t.length - 1;
    if (!r && u.startsWith('..')) {
      let t = u.split('/');
      for (; '..' === t[0]; ) t.shift(), (e -= 1);
      a.pathname = t.join('/');
    }
    i = e >= 0 ? t[e] : '/';
  }
  let s = (function (e, t = '/') {
      let { pathname: n, search: r = '', hash: a = '' } = 'string' == typeof e ? c(e) : e,
        o = n
          ? n.startsWith('/')
            ? n
            : (function (e, t) {
                let n = t.replace(/\/+$/, '').split('/');
                return (
                  e.split('/').forEach((e) => {
                    '..' === e ? n.length > 1 && n.pop() : '.' !== e && n.push(e);
                  }),
                  n.length > 1 ? n.join('/') : '/'
                );
              })(n, t)
          : t;
      return { pathname: o, search: N(r), hash: A(a) };
    })(a, i),
    h = u && '/' !== u && u.endsWith('/'),
    d = (l || '.' === u) && n.endsWith('/');
  return s.pathname.endsWith('/') || (!h && !d) || (s.pathname += '/'), s;
}
var k = (e) => e.join('/').replace(/\/\/+/g, '/'),
  T = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  N = (e) => (e && '?' !== e ? (e.startsWith('?') ? e : '?' + e) : ''),
  A = (e) => (e && '#' !== e ? (e.startsWith('#') ? e : '#' + e) : '');
var D = ['POST', 'PUT', 'PATCH', 'DELETE'];
new Set(D);
var O = ['GET', ...D];
new Set(O);
var F = e.createContext(null);
F.displayName = 'DataRouter';
var U = e.createContext(null);
U.displayName = 'DataRouterState';
var M = e.createContext({ isTransitioning: !1 });
(M.displayName = 'ViewTransition'),
  (e.createContext(new Map()).displayName = 'Fetchers'),
  (e.createContext(null).displayName = 'Await');
var B = e.createContext(null);
B.displayName = 'Navigation';
var W = e.createContext(null);
W.displayName = 'Location';
var _ = e.createContext({ outlet: null, matches: [], isDataRoute: !1 });
_.displayName = 'Route';
var j = e.createContext(null);
function I() {
  return null != e.useContext(W);
}
function H() {
  return (
    o(I(), 'useLocation() may be used only in the context of a <Router> component.'),
    e.useContext(W).location
  );
}
j.displayName = 'RouteError';
var z =
  'You should call navigate() in a React.useEffect(), not when your component is first rendered.';
function J(t) {
  e.useContext(B).static || e.useLayoutEffect(t);
}
function Y() {
  let { isDataRoute: t } = e.useContext(_);
  return t
    ? (function () {
        let { router: t } = (function (t) {
            let n = e.useContext(F);
            return o(n, Z(t)), n;
          })('useNavigate'),
          n = ee('useNavigate'),
          r = e.useRef(!1);
        return (
          J(() => {
            r.current = !0;
          }),
          e.useCallback(
            async (e, a = {}) => {
              i(r.current, z),
                r.current &&
                  ('number' == typeof e
                    ? t.navigate(e)
                    : await t.navigate(e, { fromRouteId: n, ...a }));
            },
            [t, n]
          )
        );
      })()
    : (function () {
        o(I(), 'useNavigate() may be used only in the context of a <Router> component.');
        let t = e.useContext(F),
          { basename: n, navigator: r } = e.useContext(B),
          { matches: a } = e.useContext(_),
          { pathname: l } = H(),
          u = JSON.stringify(L(a)),
          s = e.useRef(!1);
        return (
          J(() => {
            s.current = !0;
          }),
          e.useCallback(
            (e, a = {}) => {
              if ((i(s.current, z), !s.current)) return;
              if ('number' == typeof e) return void r.go(e);
              let o = P(e, JSON.parse(u), l, 'path' === a.relative);
              null == t && '/' !== n && (o.pathname = '/' === o.pathname ? n : k([n, o.pathname])),
                (a.replace ? r.replace : r.push)(o, a.state, a);
            },
            [n, r, u, l, t]
          )
        );
      })();
}
function K(t, { relative: n } = {}) {
  let { matches: r } = e.useContext(_),
    { pathname: a } = H(),
    o = JSON.stringify(L(r));
  return e.useMemo(() => P(t, JSON.parse(o), a, 'path' === n), [t, o, a, n]);
}
function V(t, n, r, a) {
  var l;
  o(I(), 'useRoutes() may be used only in the context of a <Router> component.');
  let { navigator: u } = e.useContext(B),
    { matches: s } = e.useContext(_),
    d = s[s.length - 1],
    p = d ? d.params : {},
    m = d ? d.pathname : '/',
    f = d ? d.pathnameBase : '/',
    v = d && d.route;
  {
    let e = (v && v.path) || '';
    ne(
      m,
      !v || e.endsWith('*') || e.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="${e}"> to <Route path="${'/' === e ? '*' : `${e}/*`}">.`
    );
  }
  let y,
    g = H();
  if (n) {
    let e = 'string' == typeof n ? c(n) : n;
    o(
      '/' === f || (null == (l = e.pathname) ? void 0 : l.startsWith(f)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${e.pathname}" was given in the \`location\` prop.`
    ),
      (y = e);
  } else y = g;
  let w = y.pathname || '/',
    b = w;
  if ('/' !== f) {
    let e = f.replace(/^\//, '').split('/');
    b = '/' + w.replace(/^\//, '').split('/').slice(e.length).join('/');
  }
  let E = h(t, { pathname: b });
  i(v || null != E, `No routes matched location "${y.pathname}${y.search}${y.hash}" `),
    i(
      null == E ||
        void 0 !== E[E.length - 1].route.element ||
        void 0 !== E[E.length - 1].route.Component ||
        void 0 !== E[E.length - 1].route.lazy,
      `Matched leaf route at location "${y.pathname}${y.search}${y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let R = (function (t, n = [], r = null) {
    if (null == t) {
      if (!r) return null;
      if (r.errors) t = r.matches;
      else {
        if (0 !== n.length || r.initialized || !(r.matches.length > 0)) return null;
        t = r.matches;
      }
    }
    let a = t,
      i = null == r ? void 0 : r.errors;
    if (null != i) {
      let e = a.findIndex((e) => e.route.id && void 0 !== (null == i ? void 0 : i[e.route.id]));
      o(
        e >= 0,
        `Could not find a matching route for errors on route IDs: ${Object.keys(i).join(',')}`
      ),
        (a = a.slice(0, Math.min(a.length, e + 1)));
    }
    let l = !1,
      u = -1;
    if (r)
      for (let e = 0; e < a.length; e++) {
        let t = a[e];
        if (((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (u = e), t.route.id)) {
          let { loaderData: e, errors: n } = r,
            o = t.route.loader && !e.hasOwnProperty(t.route.id) && (!n || void 0 === n[t.route.id]);
          if (t.route.lazy || o) {
            (l = !0), (a = u >= 0 ? a.slice(0, u + 1) : [a[0]]);
            break;
          }
        }
      }
    return a.reduceRight((t, o, s) => {
      let c,
        h = !1,
        d = null,
        p = null;
      r &&
        ((c = i && o.route.id ? i[o.route.id] : void 0),
        (d = o.route.errorElement || G),
        l &&
          (u < 0 && 0 === s
            ? (ne(
                'route-fallback',
                !1,
                'No `HydrateFallback` element provided to render during initial hydration'
              ),
              (h = !0),
              (p = null))
            : u === s && ((h = !0), (p = o.route.hydrateFallbackElement || null))));
      let m = n.concat(a.slice(0, s + 1)),
        f = () => {
          let n;
          return (
            (n = c
              ? d
              : h
                ? p
                : o.route.Component
                  ? e.createElement(o.route.Component, null)
                  : o.route.element
                    ? o.route.element
                    : t),
            e.createElement(Q, {
              match: o,
              routeContext: { outlet: t, matches: m, isDataRoute: null != r },
              children: n,
            })
          );
        };
      return r && (o.route.ErrorBoundary || o.route.errorElement || 0 === s)
        ? e.createElement(X, {
            location: r.location,
            revalidation: r.revalidation,
            component: d,
            error: c,
            children: f(),
            routeContext: { outlet: null, matches: m, isDataRoute: !0 },
          })
        : f();
    }, null);
  })(
    E &&
      E.map((e) =>
        Object.assign({}, e, {
          params: Object.assign({}, p, e.params),
          pathname: k([f, u.encodeLocation ? u.encodeLocation(e.pathname).pathname : e.pathname]),
          pathnameBase:
            '/' === e.pathnameBase
              ? f
              : k([
                  f,
                  u.encodeLocation ? u.encodeLocation(e.pathnameBase).pathname : e.pathnameBase,
                ]),
        })
      ),
    s,
    r,
    a
  );
  return n && R
    ? e.createElement(
        W.Provider,
        {
          value: {
            location: { pathname: '/', search: '', hash: '', state: null, key: 'default', ...y },
            navigationType: 'POP',
          },
        },
        R
      )
    : R;
}
function q() {
  let t = (function () {
      var t;
      let n = e.useContext(j),
        r = (function (t) {
          let n = e.useContext(U);
          return o(n, Z(t)), n;
        })('useRouteError'),
        a = ee('useRouteError');
      if (void 0 !== n) return n;
      return null == (t = r.errors) ? void 0 : t[a];
    })(),
    n = (function (e) {
      return (
        null != e &&
        'number' == typeof e.status &&
        'string' == typeof e.statusText &&
        'boolean' == typeof e.internal &&
        'data' in e
      );
    })(t)
      ? `${t.status} ${t.statusText}`
      : t instanceof Error
        ? t.message
        : JSON.stringify(t),
    r = t instanceof Error ? t.stack : null,
    a = 'rgba(200,200,200, 0.5)',
    i = { padding: '0.5rem', backgroundColor: a },
    l = { padding: '2px 4px', backgroundColor: a },
    u = null;
  return (
    console.error('Error handled by React Router default ErrorBoundary:', t),
    (u = e.createElement(
      e.Fragment,
      null,
      e.createElement('p', null, '💿 Hey developer 👋'),
      e.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        e.createElement('code', { style: l }, 'ErrorBoundary'),
        ' or',
        ' ',
        e.createElement('code', { style: l }, 'errorElement'),
        ' prop on your route.'
      )
    )),
    e.createElement(
      e.Fragment,
      null,
      e.createElement('h2', null, 'Unexpected Application Error!'),
      e.createElement('h3', { style: { fontStyle: 'italic' } }, n),
      r ? e.createElement('pre', { style: i }, r) : null,
      u
    )
  );
}
e.createContext(null);
var G = e.createElement(q, null),
  X = class extends e.Component {
    constructor(e) {
      super(e),
        (this.state = { location: e.location, revalidation: e.revalidation, error: e.error });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location || ('idle' !== t.revalidation && 'idle' === e.revalidation)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: void 0 !== e.error ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      console.error('React Router caught the following error during render', e, t);
    }
    render() {
      return void 0 !== this.state.error
        ? e.createElement(
            _.Provider,
            { value: this.props.routeContext },
            e.createElement(j.Provider, { value: this.state.error, children: this.props.component })
          )
        : this.props.children;
    }
  };
function Q({ routeContext: t, match: n, children: r }) {
  let a = e.useContext(F);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = n.route.id),
    e.createElement(_.Provider, { value: t }, r)
  );
}
function Z(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ee(t) {
  let n = (function (t) {
      let n = e.useContext(_);
      return o(n, Z(t)), n;
    })(t),
    r = n.matches[n.matches.length - 1];
  return o(r.route.id, `${t} can only be used on routes that contain a unique "id"`), r.route.id;
}
var te = {};
function ne(e, t, n) {
  t || te[e] || ((te[e] = !0), i(!1, n));
}
function re({ to: t, replace: n, state: r, relative: a }) {
  o(I(), '<Navigate> may be used only in the context of a <Router> component.');
  let { static: l } = e.useContext(B);
  i(
    !l,
    '<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.'
  );
  let { matches: u } = e.useContext(_),
    { pathname: s } = H(),
    c = Y(),
    h = P(t, L(u), s, 'path' === a),
    d = JSON.stringify(h);
  return (
    e.useEffect(() => {
      c(JSON.parse(d), { replace: n, state: r, relative: a });
    }, [c, d, a, n, r]),
    null
  );
}
function ae(e) {
  o(
    !1,
    'A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.'
  );
}
function oe({
  basename: t = '/',
  children: n = null,
  location: r,
  navigationType: a = 'POP',
  navigator: l,
  static: u = !1,
}) {
  o(
    !I(),
    'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.'
  );
  let s = t.replace(/^\/*/, '/'),
    h = e.useMemo(() => ({ basename: s, navigator: l, static: u, future: {} }), [s, l, u]);
  'string' == typeof r && (r = c(r));
  let { pathname: d = '/', search: p = '', hash: m = '', state: f = null, key: v = 'default' } = r,
    y = e.useMemo(() => {
      let e = S(d, s);
      return null == e
        ? null
        : { location: { pathname: e, search: p, hash: m, state: f, key: v }, navigationType: a };
    }, [s, d, p, m, f, v, a]);
  return (
    i(
      null != y,
      `<Router basename="${s}"> is not able to match the URL "${d}${p}${m}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    null == y
      ? null
      : e.createElement(
          B.Provider,
          { value: h },
          e.createElement(W.Provider, { children: n, value: y })
        )
  );
}
function ie({ children: e, location: t }) {
  return V(le(e), t);
}
function le(t, n = []) {
  let r = [];
  return (
    e.Children.forEach(t, (t, a) => {
      if (!e.isValidElement(t)) return;
      let i = [...n, a];
      if (t.type === e.Fragment) return void r.push.apply(r, le(t.props.children, i));
      o(
        t.type === ae,
        `[${'string' == typeof t.type ? t.type : t.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        o(!t.props.index || !t.props.children, 'An index route cannot have child routes.');
      let l = {
        id: t.props.id || i.join('-'),
        caseSensitive: t.props.caseSensitive,
        element: t.props.element,
        Component: t.props.Component,
        index: t.props.index,
        path: t.props.path,
        loader: t.props.loader,
        action: t.props.action,
        hydrateFallbackElement: t.props.hydrateFallbackElement,
        HydrateFallback: t.props.HydrateFallback,
        errorElement: t.props.errorElement,
        ErrorBoundary: t.props.ErrorBoundary,
        hasErrorBoundary:
          !0 === t.props.hasErrorBoundary ||
          null != t.props.ErrorBoundary ||
          null != t.props.errorElement,
        shouldRevalidate: t.props.shouldRevalidate,
        handle: t.props.handle,
        lazy: t.props.lazy,
      };
      t.props.children && (l.children = le(t.props.children, i)), r.push(l);
    }),
    r
  );
}
e.memo(function ({ routes: e, future: t, state: n }) {
  return V(e, void 0, n, t);
});
var ue = 'get',
  se = 'application/x-www-form-urlencoded';
function ce(e) {
  return null != e && 'string' == typeof e.tagName;
}
function he(e = '') {
  return new URLSearchParams(
    'string' == typeof e || Array.isArray(e) || e instanceof URLSearchParams
      ? e
      : Object.keys(e).reduce((t, n) => {
          let r = e[n];
          return t.concat(Array.isArray(r) ? r.map((e) => [n, e]) : [[n, r]]);
        }, [])
  );
}
var de = null;
var pe = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']);
function me(e) {
  return null == e || pe.has(e)
    ? e
    : (i(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${se}"`
      ),
      null);
}
function fe(e, t) {
  let n, r, a, o, i;
  if (ce((l = e)) && 'form' === l.tagName.toLowerCase()) {
    let i = e.getAttribute('action');
    (r = i ? S(i, t) : null),
      (n = e.getAttribute('method') || ue),
      (a = me(e.getAttribute('enctype')) || se),
      (o = new FormData(e));
  } else if (
    (function (e) {
      return ce(e) && 'button' === e.tagName.toLowerCase();
    })(e) ||
    ((function (e) {
      return ce(e) && 'input' === e.tagName.toLowerCase();
    })(e) &&
      ('submit' === e.type || 'image' === e.type))
  ) {
    let i = e.form;
    if (null == i)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let l = e.getAttribute('formaction') || i.getAttribute('action');
    if (
      ((r = l ? S(l, t) : null),
      (n = e.getAttribute('formmethod') || i.getAttribute('method') || ue),
      (a = me(e.getAttribute('formenctype')) || me(i.getAttribute('enctype')) || se),
      (o = new FormData(i, e)),
      !(function () {
        if (null === de)
          try {
            new FormData(document.createElement('form'), 0), (de = !1);
          } catch (e) {
            de = !0;
          }
        return de;
      })())
    ) {
      let { name: t, type: n, value: r } = e;
      if ('image' === n) {
        let e = t ? `${t}.` : '';
        o.append(`${e}x`, '0'), o.append(`${e}y`, '0');
      } else t && o.append(t, r);
    }
  } else {
    if (ce(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (n = ue), (r = null), (a = se), (i = e);
  }
  var l;
  return (
    o && 'text/plain' === a && ((i = o), (o = void 0)),
    { action: r, method: n.toLowerCase(), encType: a, formData: o, body: i }
  );
}
function ve(e, t) {
  if (!1 === e || null == e) throw new Error(t);
}
function ye(e) {
  return (
    null != e &&
    (null == e.href
      ? 'preload' === e.rel && 'string' == typeof e.imageSrcSet && 'string' == typeof e.imageSizes
      : 'string' == typeof e.rel && 'string' == typeof e.href)
  );
}
async function ge(e, t, r) {
  return (function (e, t) {
    let n = new Set(),
      r = new Set(t);
    return e.reduce((e, a) => {
      var o;
      if (
        t &&
        !(null != (o = a) && 'string' == typeof o.page) &&
        'script' === a.as &&
        a.href &&
        r.has(a.href)
      )
        return e;
      let i = JSON.stringify(
        (function (e) {
          let t = {},
            n = Object.keys(e).sort();
          for (let r of n) t[r] = e[r];
          return t;
        })(a)
      );
      return n.has(i) || (n.add(i), e.push({ key: i, link: a })), e;
    }, []);
  })(
    (
      await Promise.all(
        e.map(async (e) => {
          let a = t.routes[e.route.id];
          if (a) {
            let e = await (async function (e, t) {
              if (e.id in t) return t[e.id];
              try {
                let r = await n(() => import(e.module), []);
                return (t[e.id] = r), r;
              } catch (r) {
                return (
                  console.error(`Error loading route module \`${e.module}\`, reloading page...`),
                  console.error(r),
                  window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
                  window.location.reload(),
                  new Promise(() => {})
                );
              }
            })(a, r);
            return e.links ? e.links() : [];
          }
          return [];
        })
      )
    )
      .flat(1)
      .filter(ye)
      .filter((e) => 'stylesheet' === e.rel || 'preload' === e.rel)
      .map((e) =>
        'stylesheet' === e.rel ? { ...e, rel: 'prefetch', as: 'style' } : { ...e, rel: 'prefetch' }
      )
  );
}
function we(e, t, n, r, a, o) {
  let i = (e, t) => !n[t] || e.route.id !== n[t].route.id,
    l = (e, t) => {
      var r;
      return (
        n[t].pathname !== e.pathname ||
        ((null == (r = n[t].route.path) ? void 0 : r.endsWith('*')) &&
          n[t].params['*'] !== e.params['*'])
      );
    };
  return 'assets' === o
    ? t.filter((e, t) => i(e, t) || l(e, t))
    : 'data' === o
      ? t.filter((t, o) => {
          var u;
          let s = r.routes[t.route.id];
          if (!s || !s.hasLoader) return !1;
          if (i(t, o) || l(t, o)) return !0;
          if (t.route.shouldRevalidate) {
            let r = t.route.shouldRevalidate({
              currentUrl: new URL(a.pathname + a.search + a.hash, window.origin),
              currentParams: (null == (u = n[0]) ? void 0 : u.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: t.params,
              defaultShouldRevalidate: !0,
            });
            if ('boolean' == typeof r) return r;
          }
          return !0;
        })
      : [];
}
function be(e, t) {
  return (
    (n = e
      .map((e) => {
        let n = t.routes[e.route.id];
        if (!n) return [];
        let r = [n.module];
        return n.imports && (r = r.concat(n.imports)), r;
      })
      .flat(1)),
    [...new Set(n)]
  );
  var n;
}
var Ee = e.createContext(void 0);
function Re() {
  let t = e.useContext(Ee);
  return ve(t, 'You must render this element inside a <HydratedRouter> element'), t;
}
function xe(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function Ce({ page: t, ...n }) {
  let { router: r } = (function () {
      let t = e.useContext(F);
      return ve(t, 'You must render this element inside a <DataRouterContext.Provider> element'), t;
    })(),
    a = e.useMemo(() => h(r.routes, t, r.basename), [r.routes, t, r.basename]);
  return a
    ? e.createElement(Se, { page: t, matches: a, ...n })
    : (console.warn(`Tried to prefetch ${t} but no routes matched.`), null);
}
function Se({ page: t, matches: n, ...r }) {
  let a = H(),
    { manifest: o, routeModules: i } = Re(),
    { loaderData: l, matches: u } = (function () {
      let t = e.useContext(U);
      return (
        ve(t, 'You must render this element inside a <DataRouterStateContext.Provider> element'), t
      );
    })(),
    s = e.useMemo(() => we(t, n, u, o, a, 'data'), [t, n, u, o, a]),
    c = e.useMemo(() => we(t, n, u, o, a, 'assets'), [t, n, u, o, a]),
    h = e.useMemo(() => {
      if (t === a.pathname + a.search + a.hash) return [];
      let e = new Set(),
        r = !1;
      if (
        (n.forEach((t) => {
          var n;
          let a = o.routes[t.route.id];
          a &&
            a.hasLoader &&
            ((!s.some((e) => e.route.id === t.route.id) &&
              t.route.id in l &&
              (null == (n = i[t.route.id]) ? void 0 : n.shouldRevalidate)) ||
            a.hasClientLoader
              ? (r = !0)
              : e.add(t.route.id));
        }),
        0 === e.size)
      )
        return [];
      let u = (function (e) {
        let t =
          'string' == typeof e
            ? new URL(
                e,
                'undefined' == typeof window ? 'server://singlefetch/' : window.location.origin
              )
            : e;
        return (
          '/' === t.pathname
            ? (t.pathname = '_root.data')
            : (t.pathname = `${t.pathname.replace(/\/$/, '')}.data`),
          t
        );
      })(t);
      return (
        r &&
          e.size > 0 &&
          u.searchParams.set(
            '_routes',
            n
              .filter((t) => e.has(t.route.id))
              .map((e) => e.route.id)
              .join(',')
          ),
        [u.pathname + u.search]
      );
    }, [l, a, o, s, n, t, i]),
    d = e.useMemo(() => be(c, o), [c, o]),
    p = (function (t) {
      let { manifest: n, routeModules: r } = Re(),
        [a, o] = e.useState([]);
      return (
        e.useEffect(() => {
          let e = !1;
          return (
            ge(t, n, r).then((t) => {
              e || o(t);
            }),
            () => {
              e = !0;
            }
          );
        }, [t, n, r]),
        a
      );
    })(c);
  return e.createElement(
    e.Fragment,
    null,
    h.map((t) => e.createElement('link', { key: t, rel: 'prefetch', as: 'fetch', href: t, ...r })),
    d.map((t) => e.createElement('link', { key: t, rel: 'modulepreload', href: t, ...r })),
    p.map(({ key: t, link: n }) => e.createElement('link', { key: t, ...n }))
  );
}
function $e(...e) {
  return (t) => {
    e.forEach((e) => {
      'function' == typeof e ? e(t) : null != e && (e.current = t);
    });
  };
}
Ee.displayName = 'FrameworkContext';
var Le =
  'undefined' != typeof window &&
  void 0 !== window.document &&
  void 0 !== window.document.createElement;
try {
  Le && (window.__reactRouterVersion = '7.0.2');
} catch (Fe) {}
function Pe({ basename: t, children: n, window: r }) {
  let o = e.useRef();
  null == o.current && (o.current = a({ window: r, v5Compat: !0 }));
  let i = o.current,
    [l, u] = e.useState({ action: i.action, location: i.location }),
    s = e.useCallback(
      (t) => {
        e.startTransition(() => u(t));
      },
      [u]
    );
  return (
    e.useLayoutEffect(() => i.listen(s), [i, s]),
    e.createElement(oe, {
      basename: t,
      children: n,
      location: l.location,
      navigationType: l.action,
      navigator: i,
    })
  );
}
var ke = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Te = e.forwardRef(function (
    {
      onClick: t,
      discover: n = 'render',
      prefetch: r = 'none',
      relative: a,
      reloadDocument: l,
      replace: u,
      state: c,
      target: h,
      to: d,
      preventScrollReset: p,
      viewTransition: m,
      ...f
    },
    v
  ) {
    let y,
      { basename: g } = e.useContext(B),
      w = 'string' == typeof d && ke.test(d),
      b = !1;
    if ('string' == typeof d && w && ((y = d), Le))
      try {
        let e = new URL(window.location.href),
          t = d.startsWith('//') ? new URL(e.protocol + d) : new URL(d),
          n = S(t.pathname, g);
        t.origin === e.origin && null != n ? (d = n + t.search + t.hash) : (b = !0);
      } catch (Fe) {
        i(
          !1,
          `<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let E = (function (t, { relative: n } = {}) {
        o(I(), 'useHref() may be used only in the context of a <Router> component.');
        let { basename: r, navigator: a } = e.useContext(B),
          { hash: i, pathname: l, search: u } = K(t, { relative: n }),
          s = l;
        return (
          '/' !== r && (s = '/' === l ? r : k([r, l])),
          a.createHref({ pathname: s, search: u, hash: i })
        );
      })(d, { relative: a }),
      [R, x, C] = (function (t, n) {
        let r = e.useContext(Ee),
          [a, o] = e.useState(!1),
          [i, l] = e.useState(!1),
          { onFocus: u, onBlur: s, onMouseEnter: c, onMouseLeave: h, onTouchStart: d } = n,
          p = e.useRef(null);
        e.useEffect(() => {
          if (('render' === t && l(!0), 'viewport' === t)) {
            let e = new IntersectionObserver(
              (e) => {
                e.forEach((e) => {
                  l(e.isIntersecting);
                });
              },
              { threshold: 0.5 }
            );
            return (
              p.current && e.observe(p.current),
              () => {
                e.disconnect();
              }
            );
          }
        }, [t]),
          e.useEffect(() => {
            if (a) {
              let e = setTimeout(() => {
                l(!0);
              }, 100);
              return () => {
                clearTimeout(e);
              };
            }
          }, [a]);
        let m = () => {
            o(!0);
          },
          f = () => {
            o(!1), l(!1);
          };
        return r
          ? 'intent' !== t
            ? [i, p, {}]
            : [
                i,
                p,
                {
                  onFocus: xe(u, m),
                  onBlur: xe(s, f),
                  onMouseEnter: xe(c, m),
                  onMouseLeave: xe(h, f),
                  onTouchStart: xe(d, m),
                },
              ]
          : [!1, p, {}];
      })(r, f),
      $ = (function (
        t,
        {
          target: n,
          replace: r,
          state: a,
          preventScrollReset: o,
          relative: i,
          viewTransition: l,
        } = {}
      ) {
        let u = Y(),
          c = H(),
          h = K(t, { relative: i });
        return e.useCallback(
          (e) => {
            if (
              (function (e, t) {
                return !(
                  0 !== e.button ||
                  (t && '_self' !== t) ||
                  (function (e) {
                    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
                  })(e)
                );
              })(e, n)
            ) {
              e.preventDefault();
              let n = void 0 !== r ? r : s(c) === s(h);
              u(t, { replace: n, state: a, preventScrollReset: o, relative: i, viewTransition: l });
            }
          },
          [c, u, h, r, a, n, t, o, i, l]
        );
      })(d, {
        replace: u,
        state: c,
        target: h,
        preventScrollReset: p,
        relative: a,
        viewTransition: m,
      });
    let L = e.createElement('a', {
      ...f,
      ...C,
      href: y || E,
      onClick:
        b || l
          ? t
          : function (e) {
              t && t(e), e.defaultPrevented || $(e);
            },
      ref: $e(v, x),
      target: h,
      'data-discover': w || 'render' !== n ? void 0 : 'true',
    });
    return R && !w ? e.createElement(e.Fragment, null, L, e.createElement(Ce, { page: E })) : L;
  });
function Ne(t) {
  let n = e.useContext(F);
  return (
    o(
      n,
      (function (e) {
        return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
      })(t)
    ),
    n
  );
}
function Ae(t) {
  i(
    'undefined' != typeof URLSearchParams,
    'You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.'
  );
  let n = e.useRef(he(t)),
    r = e.useRef(!1),
    a = H(),
    o = e.useMemo(
      () =>
        (function (e, t) {
          let n = he(e);
          return (
            t &&
              t.forEach((e, r) => {
                n.has(r) ||
                  t.getAll(r).forEach((e) => {
                    n.append(r, e);
                  });
              }),
            n
          );
        })(a.search, r.current ? null : n.current),
      [a.search]
    ),
    l = Y(),
    u = e.useCallback(
      (e, t) => {
        const n = he('function' == typeof e ? e(o) : e);
        (r.current = !0), l('?' + n, t);
      },
      [l, o]
    );
  return [o, u];
}
(Te.displayName = 'Link'),
  (e.forwardRef(function (
    {
      'aria-current': t = 'page',
      caseSensitive: n = !1,
      className: r = '',
      end: a = !1,
      style: i,
      to: l,
      viewTransition: u,
      children: s,
      ...c
    },
    h
  ) {
    let d = K(l, { relative: c.relative }),
      p = H(),
      m = e.useContext(U),
      { navigator: f, basename: v } = e.useContext(B),
      y =
        null != m &&
        (function (t, n = {}) {
          let r = e.useContext(M);
          o(
            null != r,
            "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
          );
          let { basename: a } = Ne('useViewTransitionState'),
            i = K(t, { relative: n.relative });
          if (!r.isTransitioning) return !1;
          let l = S(r.currentLocation.pathname, a) || r.currentLocation.pathname,
            u = S(r.nextLocation.pathname, a) || r.nextLocation.pathname;
          return null != x(i.pathname, u) || null != x(i.pathname, l);
        })(d) &&
        !0 === u,
      g = f.encodeLocation ? f.encodeLocation(d).pathname : d.pathname,
      w = p.pathname,
      b = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
    n || ((w = w.toLowerCase()), (b = b ? b.toLowerCase() : null), (g = g.toLowerCase())),
      b && v && (b = S(b, v) || b);
    const E = '/' !== g && g.endsWith('/') ? g.length - 1 : g.length;
    let R,
      C = w === g || (!a && w.startsWith(g) && '/' === w.charAt(E)),
      $ = null != b && (b === g || (!a && b.startsWith(g) && '/' === b.charAt(g.length))),
      L = { isActive: C, isPending: $, isTransitioning: y },
      P = C ? t : void 0;
    R =
      'function' == typeof r
        ? r(L)
        : [r, C ? 'active' : null, $ ? 'pending' : null, y ? 'transitioning' : null]
            .filter(Boolean)
            .join(' ');
    let k = 'function' == typeof i ? i(L) : i;
    return e.createElement(
      Te,
      { ...c, 'aria-current': P, className: R, ref: h, style: k, to: l, viewTransition: u },
      'function' == typeof s ? s(L) : s
    );
  }).displayName = 'NavLink'),
  (e.forwardRef(
    (
      {
        discover: t = 'render',
        fetcherKey: n,
        navigate: r,
        reloadDocument: a,
        replace: i,
        state: l,
        method: u = ue,
        action: c,
        onSubmit: h,
        relative: d,
        preventScrollReset: p,
        viewTransition: m,
        ...f
      },
      v
    ) => {
      let y = (function () {
          let { router: t } = Ne('useSubmit'),
            { basename: n } = e.useContext(B),
            r = ee('useRouteId');
          return e.useCallback(
            async (e, a = {}) => {
              let { action: o, method: i, encType: l, formData: u, body: s } = fe(e, n);
              if (!1 === a.navigate) {
                let e = a.fetcherKey || Oe();
                await t.fetch(e, r, a.action || o, {
                  preventScrollReset: a.preventScrollReset,
                  formData: u,
                  body: s,
                  formMethod: a.method || i,
                  formEncType: a.encType || l,
                  flushSync: a.flushSync,
                });
              } else
                await t.navigate(a.action || o, {
                  preventScrollReset: a.preventScrollReset,
                  formData: u,
                  body: s,
                  formMethod: a.method || i,
                  formEncType: a.encType || l,
                  replace: a.replace,
                  state: a.state,
                  fromRouteId: r,
                  flushSync: a.flushSync,
                  viewTransition: a.viewTransition,
                });
            },
            [t, n, r]
          );
        })(),
        g = (function (t, { relative: n } = {}) {
          let { basename: r } = e.useContext(B),
            a = e.useContext(_);
          o(a, 'useFormAction must be used inside a RouteContext');
          let [i] = a.matches.slice(-1),
            l = { ...K(t || '.', { relative: n }) },
            u = H();
          if (null == t) {
            l.search = u.search;
            let e = new URLSearchParams(l.search),
              t = e.getAll('index');
            if (t.some((e) => '' === e)) {
              e.delete('index'), t.filter((e) => e).forEach((t) => e.append('index', t));
              let n = e.toString();
              l.search = n ? `?${n}` : '';
            }
          }
          (t && '.' !== t) ||
            !i.route.index ||
            (l.search = l.search ? l.search.replace(/^\?/, '?index&') : '?index');
          '/' !== r && (l.pathname = '/' === l.pathname ? r : k([r, l.pathname]));
          return s(l);
        })(c, { relative: d }),
        w = 'get' === u.toLowerCase() ? 'get' : 'post',
        b = 'string' == typeof c && ke.test(c);
      return e.createElement('form', {
        ref: v,
        method: w,
        action: g,
        onSubmit: a
          ? h
          : (e) => {
              if ((h && h(e), e.defaultPrevented)) return;
              e.preventDefault();
              let t = e.nativeEvent.submitter,
                a = (null == t ? void 0 : t.getAttribute('formmethod')) || u;
              y(t || e.currentTarget, {
                fetcherKey: n,
                method: a,
                navigate: r,
                replace: i,
                state: l,
                relative: d,
                preventScrollReset: p,
                viewTransition: m,
              });
            },
        ...f,
        'data-discover': b || 'render' !== t ? void 0 : 'true',
      });
    }
  ).displayName = 'Form');
var De = 0,
  Oe = () => `__${String(++De)}__`;
new TextEncoder();
export { Pe as B, Te as L, re as N, ie as R, n as _, Ae as a, ae as b, Y as u };
