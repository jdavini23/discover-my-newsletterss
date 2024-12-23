import{r as w,j as e}from"./vendor-C9AuzQIH.js";const v=({placeholder:f="Search newsletters by topic or interest",onSearch:s,className:k=""})=>{const[o,l]=w.useState(""),y=n=>{n.preventDefault(),s==null||s(o)};return e.jsxs("form",{onSubmit:y,className:`relative w-full ${k}`,children:[e.jsx("div",{className:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-gray-400 dark:text-gray-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})}),e.jsx("input",{type:"text",value:o,onChange:n=>l(n.target.value),placeholder:f,className:"w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"}),o&&e.jsx("button",{type:"button",onClick:()=>l(""),className:"absolute inset-y-0 right-0 pr-3 flex items-center",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})},j={title:"Components/SearchBar",component:v,parameters:{layout:"centered",backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a202c"}]}},argTypes:{onSearch:{action:"searched"}}},r={args:{placeholder:"Search newsletters by topic or interest"}},t={args:{placeholder:"Find your next favorite newsletter"}},a={parameters:{backgrounds:{default:"dark"}},args:{...r.args}};var c,d,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search newsletters by topic or interest'
  }
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var u,p,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    placeholder: 'Find your next favorite newsletter'
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var m,h,x;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    ...Default.args
  }
}`,...(x=(h=a.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};const S=["Default","WithCustomPlaceholder","DarkMode"];export{a as DarkMode,r as Default,t as WithCustomPlaceholder,S as __namedExportsOrder,j as default};
