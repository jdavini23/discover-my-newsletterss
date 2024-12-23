import{j as a}from"./vendor-C9AuzQIH.js";const k=({label:x,isActive:b=!1,onClick:y,icon:t})=>a.jsxs("button",{onClick:y,className:`
        flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${b?"bg-blue-500 text-white hover:bg-blue-600":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}
      `,children:[t&&a.jsx("span",{children:t}),a.jsx("span",{children:x})]}),j={title:"Components/CategoryButton",component:k,parameters:{layout:"centered",backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a202c"}]}},argTypes:{onClick:{action:"clicked"}}},e={args:{label:"Technology"}},r={args:{label:"Technology",isActive:!0}},s={args:{label:"Technology",icon:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:a.jsx("path",{fillRule:"evenodd",d:"M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z",clipRule:"evenodd"})})}},o={parameters:{backgrounds:{default:"dark"}},args:{...e.args}};var n,l,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: 'Technology'
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,g,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Technology',
    isActive: true
  }
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var i,m,p;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Technology',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">\r
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />\r
      </svg>
  }
}`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var h,v,f;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    ...Default.args
  }
}`,...(f=(v=o.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const T=["Default","Active","WithIcon","DarkMode"];export{r as Active,o as DarkMode,e as Default,s as WithIcon,T as __namedExportsOrder,j as default};
