import{j as a}from"./vendor-DuoTAqd8.js";const y=({label:b,isActive:x=!1,onClick:w,icon:o})=>a.jsxs("button",{onClick:w,className:`
        flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${x?"bg-blue-500 text-white hover:bg-blue-600":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}
      `,children:[o&&a.jsx("span",{children:o}),a.jsx("span",{children:b})]});y.__docgenInfo={description:"",methods:[],displayName:"CategoryButton",props:{label:{required:!0,tsType:{name:"string"},description:""},isActive:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const T={title:"Components/CategoryButton",component:y,parameters:{layout:"centered",backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a202c"}]}},argTypes:{onClick:{action:"clicked"}}},e={args:{label:"Technology"}},r={args:{label:"Technology",isActive:!0}},s={args:{label:"Technology",icon:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:a.jsx("path",{fillRule:"evenodd",d:"M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z",clipRule:"evenodd"})})}},t={parameters:{backgrounds:{default:"dark"}},args:{...e.args}};var n,l,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    label: 'Technology'
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var i,d,u;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'Technology',
    isActive: true
  }
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var g,p,m;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Technology',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">\r
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />\r
      </svg>
  }
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var h,f,v;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    ...Default.args
  }
}`,...(v=(f=t.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const R=["Default","Active","WithIcon","DarkMode"];export{r as Active,t as DarkMode,e as Default,s as WithIcon,R as __namedExportsOrder,T as default};
