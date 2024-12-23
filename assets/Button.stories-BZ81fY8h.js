import{j as r}from"./jsx-runtime-j_jdvEMj.js";import{d as A,a as P,l as C,o as E}from"./themes-gc4aHcmy.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const F=A.button`
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
`,d=({children:e,variant:t="primary",size:a="md",...w})=>r.jsx(F,{variant:t,size:a,...w,children:e}),O={title:"Common/Button",component:d,argTypes:{variant:{control:{type:"select",options:["primary","secondary","accent"]}},size:{control:{type:"select",options:["sm","md","lg"]}},onClick:{action:"clicked"}},decorators:[(e,t)=>{const a=t.parameters.theme==="dark"?P:C;return r.jsx(E,{theme:a,children:r.jsx("div",{style:{padding:"20px",backgroundColor:a.colors.background,display:"flex",gap:"10px",flexWrap:"wrap"},children:r.jsx(e,{...t})})})}]},n={args:{children:"Primary Button",variant:"primary"}},s={args:{children:"Secondary Button",variant:"secondary"}},o={args:{children:"Accent Button",variant:"accent"}},c={render:()=>r.jsxs(r.Fragment,{children:[r.jsx(d,{size:"sm",children:"Small Button"}),r.jsx(d,{size:"md",children:"Medium Button"}),r.jsx(d,{size:"lg",children:"Large Button"})]})},i={args:{children:"Disabled Button",disabled:!0}},m={parameters:{theme:"dark"},args:{children:"Dark Theme Button"}};var l,u,h;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,p,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(y=(p=s.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var B,S,f;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    children: 'Accent Button',
    variant: 'accent'
  }
}`,...(f=(S=o.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var x,b,z;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <>\r
      <Button size="sm">Small Button</Button>\r
      <Button size="md">Medium Button</Button>\r
      <Button size="lg">Large Button</Button>\r
    </>
}`,...(z=(b=c.parameters)==null?void 0:b.docs)==null?void 0:z.source}}};var k,$,j;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(j=($=i.parameters)==null?void 0:$.docs)==null?void 0:j.source}}};var v,D,T;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    theme: 'dark'
  },
  args: {
    children: 'Dark Theme Button'
  }
}`,...(T=(D=m.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};const V=["Primary","Secondary","Accent","Sizes","Disabled","DarkTheme"];export{o as Accent,m as DarkTheme,i as Disabled,n as Primary,s as Secondary,c as Sizes,V as __namedExportsOrder,O as default};
