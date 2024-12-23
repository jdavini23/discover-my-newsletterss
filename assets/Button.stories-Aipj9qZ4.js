import{a as A,j as r,o as P}from"./vendor-DuoTAqd8.js";import{d as _,l as C}from"./themes-D30gyLP9.js";const V=A.button`
  font-family: ${e=>e.theme.typography.fontFamily};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${e=>e.theme.borderRadius.md};
  
  // Variant Styles
  background-color: ${e=>{switch(e.variant){case"primary":return e.theme.colors.primary;case"secondary":return e.theme.colors.secondary;case"accent":return e.theme.colors.accent;default:return e.theme.colors.primary}}};
  
  color: ${e=>e.theme.colors.background};
  
  // Size Styles
  padding: ${e=>{switch(e.size){case"sm":return`${e.theme.spacing.sm} ${e.theme.spacing.md}`;case"lg":return`${e.theme.spacing.lg} ${e.theme.spacing.xl}`;default:return`${e.theme.spacing.md} ${e.theme.spacing.lg}`}}};
  
  font-size: ${e=>{switch(e.size){case"sm":return e.theme.typography.fontSize.small;case"lg":return e.theme.typography.fontSize.large;default:return e.theme.typography.fontSize.base}}};
  
  &:hover {
    opacity: 0.85;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,a=({children:e,variant:t="primary",size:n="md",...w})=>r.jsx(V,{variant:t,size:n,...w,children:e});a.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'accent'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'accent'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}}}};const F={title:"Common/Button",component:a,argTypes:{variant:{control:{type:"select",options:["primary","secondary","accent"]}},size:{control:{type:"select",options:["sm","md","lg"]}},onClick:{action:"clicked"}},decorators:[(e,t)=>{const n=t.parameters.theme==="dark"?_:C;return r.jsx(P,{theme:n,children:r.jsx("div",{style:{padding:"20px",backgroundColor:n.colors.background,display:"flex",gap:"10px",flexWrap:"wrap"},children:r.jsx(e,{...t})})})}]},s={args:{children:"Primary Button",variant:"primary"}},o={args:{children:"Secondary Button",variant:"secondary"}},c={args:{children:"Accent Button",variant:"accent"}},i={render:()=>r.jsxs(r.Fragment,{children:[r.jsx(a,{size:"sm",children:"Small Button"}),r.jsx(a,{size:"md",children:"Medium Button"}),r.jsx(a,{size:"lg",children:"Large Button"})]})},m={args:{children:"Disabled Button",disabled:!0}},l={parameters:{theme:"dark"},args:{children:"Dark Theme Button"}};var d,u,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var h,g,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(y=(g=o.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var B,f,S;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Accent Button',
    variant: 'accent'
  }
}`,...(S=(f=c.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var v,x,z;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <>\r
      <Button size="sm">Small Button</Button>\r
      <Button size="md">Medium Button</Button>\r
      <Button size="lg">Large Button</Button>\r
    </>
}`,...(z=(x=i.parameters)==null?void 0:x.docs)==null?void 0:z.source}}};var b,k,$;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...($=(k=m.parameters)==null?void 0:k.docs)==null?void 0:$.source}}};var j,T,D;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  parameters: {
    theme: 'dark'
  },
  args: {
    children: 'Dark Theme Button'
  }
}`,...(D=(T=l.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};const L=["Primary","Secondary","Accent","Sizes","Disabled","DarkTheme"];export{c as Accent,l as DarkTheme,m as Disabled,s as Primary,o as Secondary,i as Sizes,L as __namedExportsOrder,F as default};
