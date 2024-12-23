import{r as c,j as e}from"./vendor-Ced-Dk9l.js";import{b as a}from"./data-BNiK4gsS.js";const S=()=>{const[t,m]=c.useState({name:a.name,email:a.email,avatarUrl:a.avatarUrl,interests:a.interests}),[s,d]=c.useState({profile:!1,interests:!1}),u=(r,l)=>{m(x=>({...x,[r]:l}))},j=r=>{m(l=>({...l,interests:l.interests.includes(r)?l.interests.filter(x=>x!==r):[...l.interests,r]}))},k=["Technology","AI","Science","Startups","Design","Business","Finance","Health","Climate","Space","Crypto","Marketing"];return e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-2xl",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-8",children:"Profile Settings"}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900 dark:text-white",children:"Personal Information"}),e.jsx("button",{onClick:()=>d(r=>({...r,profile:!r.profile})),className:"text-blue-500 hover:text-blue-600",children:s.profile?"Cancel":"Edit"})]}),e.jsxs("div",{className:"flex items-center space-x-6 mb-6",children:[e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:t.avatarUrl||"https://via.placeholder.com/150",alt:"Profile",className:"w-24 h-24 rounded-full object-cover"}),s.profile&&e.jsx("button",{className:"absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full",title:"Change Avatar",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})})})]}),e.jsx("div",{className:"flex-grow",children:s.profile?e.jsxs("div",{className:"space-y-4",children:[e.jsx("input",{type:"text",value:t.name,onChange:r=>u("name",r.target.value),placeholder:"Full Name",className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"}),e.jsx("input",{type:"email",value:t.email,onChange:r=>u("email",r.target.value),placeholder:"Email Address",className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:t.name}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:t.email})]})})]}),s.profile&&e.jsx("div",{className:"text-right",children:e.jsx("button",{className:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",onClick:()=>d(r=>({...r,profile:!1})),children:"Save Changes"})})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 shadow-md rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900 dark:text-white",children:"Interests"}),e.jsx("button",{onClick:()=>d(r=>({...r,interests:!r.interests})),className:"text-blue-500 hover:text-blue-600",children:s.interests?"Cancel":"Edit"})]}),e.jsx("div",{className:"flex flex-wrap gap-3 mb-4",children:s.interests?k.map(r=>e.jsx("button",{onClick:()=>j(r),className:`px-3 py-1 rounded-full text-sm transition-all duration-200 ${t.interests.includes(r)?"bg-blue-500 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,children:r},r)):t.interests.map(r=>e.jsx("span",{className:"px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm",children:r},r))}),s.interests&&e.jsx("div",{className:"text-right",children:e.jsx("button",{className:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",onClick:()=>d(r=>({...r,interests:!1})),children:"Save Interests"})})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6 border-2 border-red-100 dark:border-red-900",children:[e.jsx("h2",{className:"text-xl font-semibold text-red-600 mb-4",children:"Danger Zone"}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-gray-700 dark:text-gray-300",children:"Permanently delete your account"}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"This action cannot be undone"})]}),e.jsx("button",{className:"px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600",children:"Delete Account"})]})]})]})},M={title:"Pages/Profile Settings",component:S,tags:["autodocs"],parameters:{layout:"fullscreen"}},i={},o={parameters:{backgrounds:{default:"dark"}}},n={render:()=>{const[t,m]=c.useState({name:a.name,email:a.email,avatarUrl:a.avatarUrl,interests:a.interests});return c.useState({profile:!0,interests:!0}),e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-2xl",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-8",children:"Profile Settings"}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6",children:[e.jsx("div",{className:"flex items-center justify-between mb-6",children:e.jsx("h2",{className:"text-xl font-semibold text-gray-900 dark:text-white",children:"Personal Information"})}),e.jsxs("div",{className:"flex items-center space-x-6 mb-6",children:[e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:t.avatarUrl||"https://via.placeholder.com/150",alt:"Profile",className:"w-24 h-24 rounded-full object-cover"}),e.jsx("button",{className:"absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full",title:"Change Avatar",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})})})]}),e.jsxs("div",{className:"flex-grow space-y-4",children:[e.jsx("input",{type:"text",value:t.name,placeholder:"Full Name",className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"}),e.jsx("input",{type:"email",value:t.email,placeholder:"Email Address",className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg"})]})]}),e.jsx("div",{className:"text-right",children:e.jsx("button",{className:"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",children:"Save Changes"})})]})]})}};var g,h,b;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(b=(h=i.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var p,v,f;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(f=(v=o.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var y,w,N;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const [user, setUser] = useState({
      name: mockUser.name,
      email: mockUser.email,
      avatarUrl: mockUser.avatarUrl,
      interests: mockUser.interests
    });
    const [editMode, setEditMode] = useState({
      profile: true,
      interests: true
    });
    return <div className="container mx-auto px-4 py-8 max-w-2xl">\r
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">\r
          Profile Settings\r
        </h1>\r
\r
        {/* Profile Section in Edit Mode */}\r
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">\r
          <div className="flex items-center justify-between mb-6">\r
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">\r
              Personal Information\r
            </h2>\r
          </div>\r
\r
          <div className="flex items-center space-x-6 mb-6">\r
            <div className="relative">\r
              <img src={user.avatarUrl || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 rounded-full object-cover" />\r
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full" title="Change Avatar">\r
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">\r
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />\r
                </svg>\r
              </button>\r
            </div>\r
\r
            <div className="flex-grow space-y-4">\r
              <input type="text" value={user.name} placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg" />\r
              <input type="email" value={user.email} placeholder="Email Address" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg" />\r
            </div>\r
          </div>\r
\r
          <div className="text-right">\r
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">\r
              Save Changes\r
            </button>\r
          </div>\r
        </div>\r
      </div>;
  }
}`,...(N=(w=n.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};const P=["Default","DarkMode","EditMode"];export{o as DarkMode,i as Default,n as EditMode,P as __namedExportsOrder,M as default};
