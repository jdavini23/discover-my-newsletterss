import { j as e, a as t } from './pages-3cea39f5.js';
import {
  P as s,
  k as a,
  T as i,
  l as n,
  n as r,
  f as l,
  r as c,
  A as o,
} from './vendor-b2d6fadb.js';
import { u as d } from './index-45226833.js';
import './vendor-ui-e4b1e923.js';
import './vendor-libs-a0c97417.js';
const h = ({ children: c, content: o, side: d = 'top', align: h = 'center' }) =>
    e(s, {
      children: t(a, {
        children: [
          e(i, { asChild: !0, children: c }),
          e(n, {
            children: e(r, {
              side: d,
              align: h,
              sideOffset: 5,
              className: 'z-50 bg-gray-800 text-white text-sm px-3 py-2 rounded-md shadow-lg',
              asChild: !0,
              children: e(l.div, {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.2 },
                children: o,
              }),
            }),
          }),
        ],
      }),
    }),
  u = [
    {
      category: 'Technology',
      interests: ['AI', 'Web Development', 'Cybersecurity', 'Blockchain', 'Cloud Computing'],
    },
    {
      category: 'Business',
      interests: ['Startups', 'Entrepreneurship', 'Finance', 'Marketing', 'Leadership'],
    },
    {
      category: 'Science',
      interests: ['Space', 'Biology', 'Climate Change', 'Neuroscience', 'Quantum Physics'],
    },
    {
      category: 'Arts & Culture',
      interests: ['Film', 'Literature', 'Music', 'Design', 'Photography'],
    },
  ],
  m = () => {
    const [s, a] = c.useState([]),
      { addNotification: i } = d(),
      n = c.useCallback((e) => {
        a((t) => (t.includes(e) ? t.filter((t) => t !== e) : [...t, e]));
      }, []),
      r = c.useCallback(async () => {
        try {
          await (async function (e) {
            return console.log('Updating user interests:', e), Promise.resolve();
          })(s),
            i({ message: 'Interests updated successfully!', type: 'success' });
        } catch (e) {
          i({ message: 'Failed to update interests', type: 'error' });
        }
      }, [s, i]),
      m = c.useMemo(
        () =>
          e('div', {
            className: 'space-y-6',
            children: u.map((a) =>
              t(
                'div',
                {
                  className: 'bg-white p-6 rounded-lg shadow-md',
                  children: [
                    e('h3', { className: 'text-xl font-semibold mb-4', children: a.category }),
                    e('div', {
                      className: 'flex flex-wrap gap-3',
                      children: a.interests.map((t, a) =>
                        e(
                          h,
                          {
                            content: `Select ${t}`,
                            children: e(l.button, {
                              whileHover: { scale: 1.05 },
                              whileTap: { scale: 0.95 },
                              onClick: () => n(t),
                              className: `\n                    px-4 py-2 rounded-full text-sm font-medium transition-all\n                    ${s.includes(t) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}\n                  `,
                              children: t,
                            }),
                          },
                          t
                        )
                      ),
                    }),
                  ],
                },
                a.category
              )
            ),
          }),
        [u, s, n]
      );
    return t(l.div, {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: 'max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg',
      children: [
        e('h2', {
          className: 'text-2xl font-bold mb-6 text-center',
          children: 'Discover Your Perfect Newsletters',
        }),
        e(o, { children: m }),
        e('div', {
          className: 'mt-6 flex justify-center',
          children: e(l.button, {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            onClick: r,
            disabled: 0 === s.length,
            className: `\n            px-6 py-3 rounded-lg text-white font-bold transition-all\n            ${s.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}\n          `,
            children: 'Save My Interests',
          }),
        }),
      ],
    });
  };
export { m as default };
