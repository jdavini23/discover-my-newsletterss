import { L as e, u as t, a as r } from './vendor-ui-e4b1e923.js';
import {
  j as s,
  a,
  b as l,
  c as o,
  u as n,
  r as d,
  z as i,
  t as c,
  o as m,
  s as u,
} from './vendor-b2d6fadb.js';
import { c as h, p as g, _ as p } from './vendor-libs-a0c97417.js';
const x = s.Fragment,
  b = s.jsx,
  f = s.jsxs,
  w = a.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
  });
w.interceptors.request.use(
  (e) => {
    const t = l.get('authToken');
    return t && (e.headers.Authorization = `Bearer ${t}`), e;
  },
  (e) => Promise.reject(e)
),
  w.interceptors.response.use(
    (e) => e,
    async (e) => {
      var t;
      const r = e.config;
      if (401 === (null == (t = e.response) ? void 0 : t.status) && !r._retry) {
        r._retry = !0;
        try {
          const e = await a.post(
              'http://localhost:5000/api/auth/refresh',
              {},
              { withCredentials: !0 }
            ),
            { token: t } = e.data;
          return (
            l.set('authToken', t, { secure: !0, sameSite: 'strict', expires: 7 }),
            (r.headers.Authorization = `Bearer ${t}`),
            a(r)
          );
        } catch (s) {
          return l.remove('authToken'), (window.location.href = '/login'), Promise.reject(s);
        }
      }
      return Promise.reject(e);
    }
  );
const y = {
    getNewsletters: async () => (await w.get('/newsletters')).data,
    createNewsletter: async (e) => (await w.post('/newsletters', e)).data,
    updateNewsletter: async (e, t) => (await w.patch(`/newsletters/${e}`, t)).data,
    deleteNewsletter: async (e) => (await w.delete(`/newsletters/${e}`)).data,
  },
  N = h()(
    g(
      (e, t) => ({
        token: null,
        user: null,
        isAuthenticated: () => {
          const { token: e } = t();
          if (!e) return !1;
          try {
            return o(e).exp > Date.now() / 1e3;
          } catch {
            return !1;
          }
        },
        decodeToken: (e) => {
          try {
            const t = o(e);
            return { id: t.id, email: t.email, name: t.name, roles: t.roles };
          } catch {
            return null;
          }
        },
        login: (r) => {
          const s = t().decodeToken(r);
          e({ token: r, user: s });
        },
        register: async (r, s, a) => {
          try {
            const l = await w.post('/auth/register', { email: r, password: s, name: a }),
              { token: o } = l.data,
              n = t().decodeToken(o);
            e({ token: o, user: n });
          } catch (l) {
            throw new Error('Registration failed. Please try again.');
          }
        },
        logout: () => {
          e({ token: null, user: null });
        },
        requestPasswordReset: async (e) => {
          try {
            await w.post('/auth/request-password-reset', { email: e });
          } catch (t) {
            throw new Error('Failed to send password reset link. Please try again.');
          }
        },
        resetPassword: async (e, t) => {
          try {
            await w.post('/auth/reset-password', { token: e, newPassword: t });
          } catch (r) {
            throw new Error('Failed to reset password. Please try again.');
          }
        },
      }),
      {
        name: 'auth-storage',
        storage: {
          getItem: (e) => {
            const t = localStorage.getItem(e);
            return t ? JSON.parse(t) : null;
          },
          setItem: (e, t) => {
            localStorage.setItem(e, JSON.stringify(t));
          },
          removeItem: (e) => {
            localStorage.removeItem(e);
          },
        },
      }
    )
  ),
  v = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () => {
          const { isAuthenticated: t } = N();
          return f('div', {
            className:
              'min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8',
            children: [
              f('div', {
                className: 'sm:mx-auto sm:w-full sm:max-w-md',
                children: [
                  b('h2', {
                    className: 'mt-6 text-center text-3xl font-extrabold text-gray-900',
                    children: 'Welcome to Your Newsletter Discovery Platform',
                  }),
                  b('p', {
                    className: 'mt-2 text-center text-sm text-gray-600',
                    children:
                      "Discover newsletters that match your interests. We'll help you find the perfect reads.",
                  }),
                ],
              }),
              b('header', {
                className: 'bg-white shadow-md',
                children: f('div', {
                  className: 'container mx-auto px-4 py-6 flex justify-between items-center',
                  children: [
                    b('h1', {
                      className: 'text-2xl font-bold text-gray-800',
                      children: 'Newsletter Discovery',
                    }),
                    b('nav', {
                      className: 'space-x-4',
                      children: t()
                        ? b(e, {
                            to: '/dashboard',
                            className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                            children: 'Dashboard',
                          })
                        : f(x, {
                            children: [
                              b(e, {
                                to: '/login',
                                className:
                                  'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                                children: 'Login',
                              }),
                              b(e, {
                                to: '/register',
                                className:
                                  'bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600',
                                children: 'Register',
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
              }),
              b('main', {
                className: 'flex-grow container mx-auto px-4 py-8',
                children: f('div', {
                  className: 'text-center',
                  children: [
                    b('h2', {
                      className: 'text-4xl font-bold mb-6 text-gray-800',
                      children: 'Discover Your Perfect Newsletters',
                    }),
                    b('p', {
                      className: 'text-xl text-gray-600 mb-8',
                      children: 'Find, track, and manage newsletters that matter to you.',
                    }),
                    f('div', {
                      className: 'grid md:grid-cols-3 gap-6 max-w-4xl mx-auto',
                      children: [
                        f('div', {
                          className: 'bg-white p-6 rounded-lg shadow-md',
                          children: [
                            b('h3', {
                              className: 'text-xl font-semibold mb-4',
                              children: 'Curated Selection',
                            }),
                            b('p', {
                              className: 'text-gray-600',
                              children: 'Discover newsletters across various topics and interests.',
                            }),
                          ],
                        }),
                        f('div', {
                          className: 'bg-white p-6 rounded-lg shadow-md',
                          children: [
                            b('h3', {
                              className: 'text-xl font-semibold mb-4',
                              children: 'Easy Tracking',
                            }),
                            b('p', {
                              className: 'text-gray-600',
                              children: 'Keep track of your favorite newsletters in one place.',
                            }),
                          ],
                        }),
                        f('div', {
                          className: 'bg-white p-6 rounded-lg shadow-md',
                          children: [
                            b('h3', {
                              className: 'text-xl font-semibold mb-4',
                              children: 'Personalized Recommendations',
                            }),
                            b('p', {
                              className: 'text-gray-600',
                              children:
                                'Get tailored newsletter suggestions based on your interests.',
                            }),
                          ],
                        }),
                      ],
                    }),
                    b('div', {
                      className: 'mt-8 text-center',
                      children: b('p', {
                        className: 'text-lg text-gray-700',
                        children: "We'll help you curate the perfect newsletter collection.",
                      }),
                    }),
                    !t() &&
                      b('div', {
                        className: 'mt-12',
                        children: b(e, {
                          to: '/register',
                          className:
                            'bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition duration-300',
                          children: "Get Started - It's Free!",
                        }),
                      }),
                  ],
                }),
              }),
              b('footer', {
                className: 'bg-gray-800 text-white py-6',
                children: b('div', {
                  className: 'container mx-auto px-4 text-center',
                  children: b('p', {
                    children: '© 2024 Newsletter Discovery. All rights reserved.',
                  }),
                }),
              }),
            ],
          });
        },
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  P = () => {
    const {
        register: r,
        handleSubmit: s,
        formState: { errors: a },
      } = n(),
      [l, o] = d.useState(!1),
      i = t(),
      { login: c } = N();
    return f('div', {
      className: 'max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md',
      children: [
        b('h2', { className: 'text-2xl font-bold mb-6 text-center', children: 'Login' }),
        f('form', {
          onSubmit: s(async (e) => {
            o(!0);
            try {
              const t = await w.post('/auth/login', e),
                { token: r } = t.data;
              c(r), p.success('Login successful'), i('/dashboard');
            } catch (t) {
              p.error('Login failed. Please check your credentials.');
            } finally {
              o(!1);
            }
          }),
          className: 'space-y-4',
          children: [
            f('div', {
              children: [
                b('label', {
                  htmlFor: 'email',
                  className: 'block text-sm font-medium text-gray-700',
                  children: 'Email',
                }),
                b('input', {
                  id: 'email',
                  type: 'email',
                  ...r('email', {
                    required: 'Email is required',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                  }),
                  className:
                    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
                }),
                a.email &&
                  b('p', { className: 'text-red-500 text-xs mt-1', children: a.email.message }),
              ],
            }),
            f('div', {
              children: [
                b('label', {
                  htmlFor: 'password',
                  className: 'block text-sm font-medium text-gray-700',
                  children: 'Password',
                }),
                b('input', {
                  id: 'password',
                  type: 'password',
                  ...r('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  }),
                  className:
                    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
                }),
                a.password &&
                  b('p', { className: 'text-red-500 text-xs mt-1', children: a.password.message }),
              ],
            }),
            f('div', {
              className: 'flex items-center justify-between',
              children: [
                f('div', {
                  className: 'flex items-center',
                  children: [
                    b('input', {
                      id: 'remember-me',
                      type: 'checkbox',
                      className:
                        'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded',
                    }),
                    b('label', {
                      htmlFor: 'remember-me',
                      className: 'ml-2 block text-sm text-gray-900',
                      children: 'Remember me',
                    }),
                  ],
                }),
                b('div', {
                  className: 'text-sm',
                  children: b(e, {
                    to: '/password-reset',
                    className: 'font-medium text-indigo-600 hover:text-indigo-500',
                    children: 'Forgot your password?',
                  }),
                }),
              ],
            }),
            b('div', {
              children: b('button', {
                type: 'submit',
                disabled: l,
                className:
                  'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50',
                children: l ? 'Logging in...' : 'Log In',
              }),
            }),
            b('div', {
              className: 'text-center mt-4',
              children: f('p', {
                className: 'text-sm text-gray-600',
                children: [
                  "Don't have an account?",
                  ' ',
                  b(e, {
                    to: '/register',
                    className: 'text-blue-500 hover:underline',
                    children: 'Sign up',
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  S = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () =>
          f('div', {
            className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8',
            children: [
              b('div', {
                className: 'sm:mx-auto sm:w-full sm:max-w-md',
                children: b('h2', {
                  className: 'mt-6 text-center text-3xl font-extrabold text-gray-900',
                  children: 'Sign in to your account',
                }),
              }),
              b('div', {
                className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md',
                children: b('div', {
                  className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10',
                  children: b(P, {}),
                }),
              }),
            ],
          }),
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  k = i
    .object({
      name: i.string().min(2, 'Name must be at least 2 characters'),
      email: i.string().email('Invalid email address'),
      password: i.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: i.string(),
    })
    .refine((e) => e.password === e.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
  j = () => {
    const { register: e } = N(),
      r = t(),
      [s, a] = d.useState(null),
      {
        register: l,
        handleSubmit: o,
        formState: { errors: i, isSubmitting: m },
      } = n({ resolver: c(k) });
    return f('div', {
      className: 'max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md',
      children: [
        b('h2', { className: 'text-2xl font-bold mb-6 text-center', children: 'Register' }),
        f('form', {
          onSubmit: o(async (t) => {
            try {
              a(null), await e(t.email, t.password, t.name), r('/dashboard');
            } catch (s) {
              a('Registration failed. Please try again.');
            }
          }),
          className: 'space-y-4',
          children: [
            s &&
              b('div', {
                className:
                  'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative',
                role: 'alert',
                children: s,
              }),
            f('div', {
              children: [
                b('label', {
                  htmlFor: 'name',
                  className: 'block text-sm font-medium text-gray-700',
                  children: 'Name',
                }),
                b('input', {
                  id: 'name',
                  ...l('name'),
                  type: 'text',
                  className:
                    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                  placeholder: 'Your Name',
                }),
                i.name &&
                  b('p', { className: 'mt-2 text-sm text-red-600', children: i.name.message }),
              ],
            }),
            f('div', {
              children: [
                b('label', {
                  htmlFor: 'email',
                  className: 'block text-sm font-medium text-gray-700',
                  children: 'Email',
                }),
                b('input', {
                  id: 'email',
                  ...l('email'),
                  type: 'email',
                  className:
                    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                  placeholder: 'you@example.com',
                }),
                i.email &&
                  b('p', { className: 'mt-2 text-sm text-red-600', children: i.email.message }),
              ],
            }),
            f('div', {
              children: [
                b('label', {
                  htmlFor: 'password',
                  className: 'block text-sm font-medium text-gray-700',
                  children: 'Password',
                }),
                b('input', {
                  id: 'password',
                  ...l('password'),
                  type: 'password',
                  className:
                    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                  placeholder: 'Password',
                }),
                i.password &&
                  b('p', { className: 'mt-2 text-sm text-red-600', children: i.password.message }),
              ],
            }),
            f('div', {
              children: [
                b('label', {
                  htmlFor: 'confirmPassword',
                  className: 'block text-sm font-medium text-gray-700',
                  children: 'Confirm Password',
                }),
                b('input', {
                  id: 'confirmPassword',
                  ...l('confirmPassword'),
                  type: 'password',
                  className:
                    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                  placeholder: 'Confirm Password',
                }),
                i.confirmPassword &&
                  b('p', {
                    className: 'mt-2 text-sm text-red-600',
                    children: i.confirmPassword.message,
                  }),
              ],
            }),
            b('div', {
              children: b('button', {
                type: 'submit',
                disabled: m,
                className:
                  'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50',
                children: m ? 'Registering...' : 'Register',
              }),
            }),
            b('div', {
              className: 'text-center mt-4',
              children: f('p', {
                className: 'text-sm text-gray-600',
                children: [
                  'Already have an account?',
                  ' ',
                  b('a', {
                    href: '/login',
                    className: 'font-medium text-indigo-600 hover:text-indigo-500',
                    children: 'Login',
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  },
  _ = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () =>
          f('div', {
            className: 'min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8',
            children: [
              b('div', {
                className: 'sm:mx-auto sm:w-full sm:max-w-md',
                children: b('h2', {
                  className: 'mt-6 text-center text-3xl font-extrabold text-gray-900',
                  children: 'Create your account',
                }),
              }),
              b('div', {
                className: 'mt-8 sm:mx-auto sm:w-full sm:max-w-md',
                children: b('div', {
                  className: 'bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10',
                  children: b(j, {}),
                }),
              }),
            ],
          }),
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  O = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () => {
          const { user: e, logout: t } = N();
          return f('div', {
            className: 'container mx-auto px-4 py-8',
            children: [
              b('h1', { className: 'text-3xl font-bold mb-6', children: 'Dashboard' }),
              f('div', {
                className: 'bg-white shadow-md rounded-lg p-6',
                children: [
                  f('h2', {
                    className: 'text-xl font-semibold mb-4',
                    children: ['Welcome, ', (null == e ? void 0 : e.name) || 'User', '!'],
                  }),
                  f('p', {
                    className: 'mb-4',
                    children: ['Email: ', null == e ? void 0 : e.email],
                  }),
                  f('div', {
                    className: 'flex space-x-4',
                    children: [
                      b('button', {
                        onClick: () => {},
                        className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                        children: 'Edit Profile',
                      }),
                      b('button', {
                        onClick: t,
                        className: 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600',
                        children: 'Logout',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  T = m({ email: u().email('Invalid email address') }),
  z = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () => {
          const [e, r] = d.useState(null),
            [s, a] = d.useState(null),
            l = t(),
            { requestPasswordReset: o } = N(),
            {
              register: i,
              handleSubmit: m,
              formState: { errors: u, isSubmitting: h },
            } = n({ resolver: c(T) });
          return b('div', {
            className:
              'min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8',
            children: f('div', {
              className: 'max-w-md w-full space-y-8',
              children: [
                b('div', {
                  children: b('h2', {
                    className: 'mt-6 text-center text-3xl font-extrabold text-gray-900',
                    children: 'Reset Your Password',
                  }),
                }),
                f('form', {
                  className: 'mt-8 space-y-6',
                  onSubmit: m(async (e) => {
                    try {
                      r(null),
                        a(null),
                        await o(e.email),
                        a('Password reset link sent to your email. Check your inbox.'),
                        setTimeout(() => {
                          l('/login');
                        }, 3e3);
                    } catch (t) {
                      r(t instanceof Error ? t.message : 'An unexpected error occurred');
                    }
                  }),
                  children: [
                    b('div', {
                      className: 'rounded-md shadow-sm -space-y-px',
                      children: f('div', {
                        children: [
                          b('label', {
                            htmlFor: 'email',
                            className: 'sr-only',
                            children: 'Email address',
                          }),
                          b('input', {
                            ...i('email'),
                            id: 'email',
                            type: 'email',
                            autoComplete: 'email',
                            required: !0,
                            className:
                              'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                            placeholder: 'Email address',
                          }),
                          u.email &&
                            b('p', {
                              className: 'mt-2 text-sm text-red-600',
                              children: u.email.message,
                            }),
                        ],
                      }),
                    }),
                    e && b('div', { className: 'text-red-500 text-sm text-center', children: e }),
                    s && b('div', { className: 'text-green-500 text-sm text-center', children: s }),
                    b('div', {
                      children: b('button', {
                        type: 'submit',
                        disabled: h,
                        className:
                          'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                        children: h ? 'Sending...' : 'Send Password Reset Link',
                      }),
                    }),
                  ],
                }),
              ],
            }),
          });
        },
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  F = m({
    password: u()
      .min(12, 'Password must be at least 12 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        'Password must contain at least one special character'
      )
      .refine(
        (e) =>
          [
            /[A-Z]/.test(e),
            /[a-z]/.test(e),
            /[0-9]/.test(e),
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e),
          ].filter(Boolean).length >= 3,
        'Password must include at least 3 of the following: uppercase, lowercase, number, special character'
      ),
    confirmPassword: u(),
  }).refine((e) => e.password === e.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
  E = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () => {
          const [e] = r(),
            [s, a] = d.useState(null),
            [l, o] = d.useState(null),
            [i, m] = d.useState(0),
            u = t(),
            { resetPassword: h } = N(),
            g = e.get('token');
          d.useEffect(() => {
            g || a('Invalid or missing reset token');
          }, [g]);
          const {
              register: p,
              handleSubmit: x,
              watch: w,
              formState: { errors: y, isSubmitting: v },
            } = n({ resolver: c(F) }),
            P = w('password');
          d.useEffect(() => {
            m(
              P
                ? ((e) => {
                    let t = 0;
                    return (
                      e.length >= 12 && t++,
                      /[A-Z]/.test(e) && t++,
                      /[a-z]/.test(e) && t++,
                      /[0-9]/.test(e) && t++,
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e) && t++,
                      t
                    );
                  })(P)
                : 0
            );
          }, [P]);
          const S = [
            'bg-red-500',
            'bg-orange-500',
            'bg-yellow-500',
            'bg-green-500',
            'bg-green-700',
          ];
          return b(
            'div',
            g
              ? {
                  className:
                    'min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8',
                  children: f('div', {
                    className: 'max-w-md w-full space-y-8',
                    children: [
                      b('div', {
                        children: b('h2', {
                          className: 'mt-6 text-center text-3xl font-extrabold text-gray-900',
                          children: 'Reset Your Password',
                        }),
                      }),
                      f('form', {
                        className: 'mt-8 space-y-6',
                        onSubmit: x(async (e) => {
                          if (g)
                            try {
                              a(null),
                                o(null),
                                await h(g, e.password),
                                o('Password reset successfully'),
                                setTimeout(() => {
                                  u('/login');
                                }, 3e3);
                            } catch (t) {
                              a(t instanceof Error ? t.message : 'An unexpected error occurred');
                            }
                          else a('Invalid reset token');
                        }),
                        children: [
                          f('div', {
                            className: 'rounded-md shadow-sm -space-y-px',
                            children: [
                              f('div', {
                                children: [
                                  b('label', {
                                    htmlFor: 'password',
                                    className: 'sr-only',
                                    children: 'New Password',
                                  }),
                                  b('input', {
                                    ...p('password'),
                                    id: 'password',
                                    type: 'password',
                                    autoComplete: 'new-password',
                                    required: !0,
                                    className:
                                      'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                                    placeholder: 'New Password',
                                  }),
                                  y.password &&
                                    b('p', {
                                      className: 'mt-2 text-sm text-red-600',
                                      children: y.password.message,
                                    }),
                                  b('div', {
                                    className: 'mt-2 flex',
                                    children: [...Array(5)].map((e, t) =>
                                      b(
                                        'div',
                                        {
                                          className: `h-1 flex-1 mx-1 ${t < i ? S[t] : 'bg-gray-300'}`,
                                        },
                                        t
                                      )
                                    ),
                                  }),
                                  f('p', {
                                    className: 'mt-1 text-xs text-gray-600',
                                    children: [
                                      0 === i && 'Password strength',
                                      1 === i && 'Very weak',
                                      2 === i && 'Weak',
                                      3 === i && 'Medium',
                                      4 === i && 'Strong',
                                      5 === i && 'Very Strong',
                                    ],
                                  }),
                                ],
                              }),
                              f('div', {
                                children: [
                                  b('label', {
                                    htmlFor: 'confirmPassword',
                                    className: 'sr-only',
                                    children: 'Confirm New Password',
                                  }),
                                  b('input', {
                                    ...p('confirmPassword'),
                                    id: 'confirmPassword',
                                    type: 'password',
                                    autoComplete: 'new-password',
                                    required: !0,
                                    className:
                                      'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                                    placeholder: 'Confirm New Password',
                                  }),
                                  y.confirmPassword &&
                                    b('p', {
                                      className: 'mt-2 text-sm text-red-600',
                                      children: y.confirmPassword.message,
                                    }),
                                ],
                              }),
                            ],
                          }),
                          s &&
                            b('div', {
                              className: 'text-red-500 text-sm text-center',
                              children: s,
                            }),
                          l &&
                            b('div', {
                              className: 'text-green-500 text-sm text-center',
                              children: l,
                            }),
                          b('div', {
                            children: b('button', {
                              type: 'submit',
                              disabled: v,
                              className:
                                'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                              children: v ? 'Resetting...' : 'Reset Password',
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }
              : {
                  className: 'min-h-screen flex items-center justify-center bg-red-50',
                  children: b('p', {
                    className: 'text-red-600',
                    children: 'Invalid password reset link',
                  }),
                }
          );
        },
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  R = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () =>
          b('div', {
            className: 'min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8',
            children: f('div', {
              className: 'max-w-7xl mx-auto',
              children: [
                b('h1', {
                  className: 'text-3xl font-bold text-gray-900 mb-8',
                  children: 'Discover Newsletters',
                }),
                b('div', {
                  className: 'bg-white shadow rounded-lg p-6',
                  children: f('div', {
                    className: 'max-w-3xl mx-auto',
                    children: [
                      b('div', {
                        className: 'mb-6',
                        children: b('input', {
                          type: 'text',
                          placeholder: 'Search newsletters...',
                          className:
                            'w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500',
                        }),
                      }),
                      b('div', {
                        className: 'space-y-6',
                        children: b('p', {
                          className: 'text-gray-500 text-center',
                          children: 'Start typing to search for newsletters',
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  C = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () => {
          const { user: e } = N();
          return f('div', {
            className: 'container mx-auto px-4 py-8',
            children: [
              b('h1', { className: 'text-3xl font-bold mb-6', children: 'Profile' }),
              f('div', {
                className: 'bg-white shadow-md rounded-lg p-6',
                children: [
                  f('div', {
                    className: 'mb-4',
                    children: [
                      b('label', {
                        className: 'block text-gray-700 font-bold mb-2',
                        children: 'Name',
                      }),
                      b('p', {
                        className: 'text-gray-900',
                        children: (null == e ? void 0 : e.name) || 'Not set',
                      }),
                    ],
                  }),
                  f('div', {
                    className: 'mb-4',
                    children: [
                      b('label', {
                        className: 'block text-gray-700 font-bold mb-2',
                        children: 'Email',
                      }),
                      b('p', {
                        className: 'text-gray-900',
                        children: null == e ? void 0 : e.email,
                      }),
                    ],
                  }),
                  b('button', {
                    className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                    children: 'Edit Profile',
                  }),
                ],
              }),
            ],
          });
        },
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  L = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () => {
          const [e, t] = d.useState([]),
            [r, s] = d.useState(!0),
            [a, l] = d.useState(null);
          d.useEffect(() => {
            (async () => {
              try {
                const e = await y.getNewsletters();
                t(e), s(!1);
              } catch (e) {
                l('Failed to fetch newsletters'), s(!1);
              }
            })();
          }, []);
          return r
            ? b('div', {
                className: 'flex justify-center items-center min-h-screen',
                children: b('div', {
                  className: 'spinner-border text-primary',
                  role: 'status',
                  children: b('span', { className: 'sr-only', children: 'Loading...' }),
                }),
              })
            : a
              ? b('div', {
                  className: 'container mx-auto px-4 py-8',
                  children: b('div', {
                    className:
                      'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative',
                    role: 'alert',
                    children: a,
                  }),
                })
              : f('div', {
                  className: 'container mx-auto px-4 py-8',
                  children: [
                    b('h1', { className: 'text-3xl font-bold mb-6', children: 'Newsletters' }),
                    0 === e.length
                      ? b('div', {
                          className: 'bg-gray-100 p-6 rounded-lg text-center',
                          children: b('p', {
                            className: 'text-gray-600',
                            children: 'No newsletters found.',
                          }),
                        })
                      : b('div', {
                          className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
                          children: e.map((r) =>
                            f(
                              'div',
                              {
                                className:
                                  'bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow',
                                children: [
                                  b('h2', {
                                    className: 'text-xl font-semibold mb-2',
                                    children: r.name,
                                  }),
                                  b('p', {
                                    className: 'text-gray-600 mb-4',
                                    children: r.description,
                                  }),
                                  f('div', {
                                    className: 'flex justify-between items-center',
                                    children: [
                                      b('a', {
                                        href: r.url,
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                        className: 'text-blue-500 hover:underline',
                                        children: 'Visit Website',
                                      }),
                                      b('button', {
                                        onClick: () =>
                                          (async (r) => {
                                            try {
                                              await y.deleteNewsletter(r),
                                                t(e.filter((e) => e.id !== r));
                                            } catch (s) {
                                              l('Failed to delete newsletter');
                                            }
                                          })(r.id),
                                        className:
                                          'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600',
                                        children: 'Delete',
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              r.id
                            )
                          ),
                        }),
                  ],
                });
        },
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  D = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () =>
          b('div', {
            className: 'min-h-screen flex items-center justify-center bg-gray-100',
            children: f('div', {
              className: 'bg-white p-8 rounded-lg shadow-md text-center',
              children: [
                b('h1', { className: 'text-6xl font-bold text-gray-800 mb-4', children: '404' }),
                b('h2', {
                  className: 'text-2xl font-semibold text-gray-700 mb-4',
                  children: 'Page Not Found',
                }),
                b('p', {
                  className: 'text-gray-600 mb-6',
                  children: 'The page you are looking for does not exist or has been moved.',
                }),
                f('div', {
                  className: 'flex justify-center space-x-4',
                  children: [
                    b(e, {
                      to: '/',
                      className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                      children: 'Go to Home',
                    }),
                    b(e, {
                      to: '/dashboard',
                      className: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
                      children: 'Dashboard',
                    }),
                  ],
                }),
              ],
            }),
          }),
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  I = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: () =>
          b('div', {
            className: 'min-h-screen flex items-center justify-center bg-gray-100',
            children: f('div', {
              className: 'bg-white p-8 rounded-lg shadow-md text-center',
              children: [
                b('h1', {
                  className: 'text-4xl font-bold text-red-600 mb-4',
                  children: 'Unauthorized',
                }),
                b('p', {
                  className: 'text-gray-700 mb-6',
                  children: 'You do not have permission to access this page.',
                }),
                f('div', {
                  className: 'flex justify-center space-x-4',
                  children: [
                    b(e, {
                      to: '/login',
                      className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                      children: 'Login',
                    }),
                    b(e, {
                      to: '/',
                      className: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
                      children: 'Home',
                    }),
                  ],
                }),
              ],
            }),
          }),
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  );
export {
  O as D,
  x as F,
  v as H,
  S as L,
  R as N,
  z as P,
  _ as R,
  I as U,
  f as a,
  E as b,
  C as c,
  L as d,
  D as e,
  b as j,
  N as u,
};
