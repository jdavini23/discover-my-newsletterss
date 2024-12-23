import{j as t}from"./jsx-runtime-j_jdvEMj.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const V=({currentPage:r,totalPages:e,onPageChange:u})=>{const L=(()=>{const a=[];if(e<=5)for(let s=1;s<=e;s++)a.push(s);else{a.push(1);let s=Math.max(2,r-1),m=Math.min(e-1,r+1);s>2&&a.push(-1);for(let i=s;i<=m;i++)a.push(i);m<e-1&&a.push(-2),a.push(e)}return a})();return t.jsxs("nav",{className:"flex justify-center space-x-2 my-8",children:[t.jsx("button",{onClick:()=>u(r-1),disabled:r===1,className:"px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600",children:"Previous"}),L.map(a=>a===-1||a===-2?t.jsx("span",{className:"px-4 py-2 text-gray-500 dark:text-gray-400",children:"..."},a):t.jsx("button",{onClick:()=>u(a),className:`
              px-4 py-2 rounded-lg transition-colors
              ${r===a?"bg-blue-500 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}
            `,children:a},a)),t.jsx("button",{onClick:()=>u(r+1),disabled:r===e,className:"px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600",children:"Next"})]})},q={title:"Components/Pagination",component:V,parameters:{layout:"centered",backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a202c"}]}},argTypes:{onPageChange:{action:"pageChanged"}}},o={args:{currentPage:3,totalPages:10}},n={args:{currentPage:1,totalPages:10}},g={args:{currentPage:10,totalPages:10}},c={args:{currentPage:2,totalPages:3}},d={args:{currentPage:15,totalPages:50}},l={parameters:{backgrounds:{default:"dark"}},args:{...o.args}};var p,y,b;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    currentPage: 3,
    totalPages: 10
  }
}`,...(b=(y=o.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var x,P,f;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalPages: 10
  }
}`,...(f=(P=n.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};var h,k,v;g.parameters={...g.parameters,docs:{...(h=g.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    currentPage: 10,
    totalPages: 10
  }
}`,...(v=(k=g.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var N,j,M;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    currentPage: 2,
    totalPages: 3
  }
}`,...(M=(j=c.parameters)==null?void 0:j.docs)==null?void 0:M.source}}};var S,w,D;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    currentPage: 15,
    totalPages: 50
  }
}`,...(D=(w=d.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var C,F,E;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    ...Default.args
  }
}`,...(E=(F=l.parameters)==null?void 0:F.docs)==null?void 0:E.source}}};const z=["Default","FirstPage","LastPage","FewPages","ManyPages","DarkMode"];export{l as DarkMode,o as Default,c as FewPages,n as FirstPage,g as LastPage,d as ManyPages,z as __namedExportsOrder,q as default};
