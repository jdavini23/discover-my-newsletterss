import{j as t}from"./vendor-DuoTAqd8.js";const _=({currentPage:a,totalPages:r,onPageChange:i})=>{const q=(()=>{const e=[];if(r<=5)for(let s=1;s<=r;s++)e.push(s);else{e.push(1);let s=Math.max(2,a-1),l=Math.min(r-1,a+1);s>2&&e.push(-1);for(let p=s;p<=l;p++)e.push(p);l<r-1&&e.push(-2),e.push(r)}return e})();return t.jsxs("nav",{className:"flex justify-center space-x-2 my-8",children:[t.jsx("button",{onClick:()=>i(a-1),disabled:a===1,className:"px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600",children:"Previous"}),q.map(e=>e===-1||e===-2?t.jsx("span",{className:"px-4 py-2 text-gray-500 dark:text-gray-400",children:"..."},e):t.jsx("button",{onClick:()=>i(e),className:`
              px-4 py-2 rounded-lg transition-colors
              ${a===e?"bg-blue-500 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}
            `,children:e},e)),t.jsx("button",{onClick:()=>i(a+1),disabled:a===r,className:"px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600",children:"Next"})]})};_.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{currentPage:{required:!0,tsType:{name:"number"},description:""},totalPages:{required:!0,tsType:{name:"number"},description:""},onPageChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""}}};const I={title:"Components/Pagination",component:_,parameters:{layout:"centered",backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a202c"}]}},argTypes:{onPageChange:{action:"pageChanged"}}},n={args:{currentPage:3,totalPages:10}},o={args:{currentPage:1,totalPages:10}},g={args:{currentPage:10,totalPages:10}},c={args:{currentPage:2,totalPages:3}},d={args:{currentPage:15,totalPages:50}},u={parameters:{backgrounds:{default:"dark"}},args:{...n.args}};var m,y,b;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    currentPage: 3,
    totalPages: 10
  }
}`,...(b=(y=n.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var x,P,f;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    currentPage: 1,
    totalPages: 10
  }
}`,...(f=(P=o.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};var h,k,v;g.parameters={...g.parameters,docs:{...(h=g.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    currentPage: 10,
    totalPages: 10
  }
}`,...(v=(k=g.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var N,j,w;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    currentPage: 2,
    totalPages: 3
  }
}`,...(w=(j=c.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var M,S,C;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    currentPage: 15,
    totalPages: 50
  }
}`,...(C=(S=d.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var D,F,T;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    ...Default.args
  }
}`,...(T=(F=u.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};const O=["Default","FirstPage","LastPage","FewPages","ManyPages","DarkMode"];export{u as DarkMode,n as Default,c as FewPages,o as FirstPage,g as LastPage,d as ManyPages,O as __namedExportsOrder,I as default};
