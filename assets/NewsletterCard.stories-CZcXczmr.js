import{N as k}from"./NewsletterCard-CS9FPYmr.js";import"./vendor-C9AuzQIH.js";const C={title:"Components/NewsletterCard",component:k,parameters:{layout:"centered",backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a202c"}]}},argTypes:{onFavorite:{action:"favorited"}}},e={args:{title:"Tech Insights Weekly",description:"A curated newsletter delivering the latest trends in technology, startup innovations, and digital transformation.",imageUrl:"https://via.placeholder.com/350x200?text=Tech+Newsletter",tags:["Technology","Startups","Innovation"],subscriptionCount:45e3}},a={args:{...e.args,imageUrl:void 0}},t={args:{...e.args,title:"The Comprehensive Guide to Emerging Technologies and Their Impact on Global Industries",description:"An in-depth exploration of cutting-edge technologies, their potential applications, and how they are reshaping industries from healthcare and finance to manufacturing and entertainment. This newsletter provides expert analysis, case studies, and forward-looking insights that help professionals stay ahead of the curve.",tags:["Technology","Innovation","Digital Transformation","AI","Machine Learning","Blockchain"],subscriptionCount:12e4}},n={args:{...e.args,isFavorite:!0}},r={parameters:{backgrounds:{default:"dark"}},args:{...e.args}};var s,o,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    title: 'Tech Insights Weekly',
    description: 'A curated newsletter delivering the latest trends in technology, startup innovations, and digital transformation.',
    imageUrl: 'https://via.placeholder.com/350x200?text=Tech+Newsletter',
    tags: ['Technology', 'Startups', 'Innovation'],
    subscriptionCount: 45000
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var c,l,d;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    imageUrl: undefined
  }
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var g,p,u;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'The Comprehensive Guide to Emerging Technologies and Their Impact on Global Industries',
    description: 'An in-depth exploration of cutting-edge technologies, their potential applications, and how they are reshaping industries from healthcare and finance to manufacturing and entertainment. This newsletter provides expert analysis, case studies, and forward-looking insights that help professionals stay ahead of the curve.',
    tags: ['Technology', 'Innovation', 'Digital Transformation', 'AI', 'Machine Learning', 'Blockchain'],
    subscriptionCount: 120000
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,m,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    isFavorite: true
  }
}`,...(f=(m=n.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var v,T,y;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  args: {
    ...Default.args
  }
}`,...(y=(T=r.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};const x=["Default","WithoutImage","LongContent","Favorited","DarkMode"];export{r as DarkMode,e as Default,n as Favorited,t as LongContent,a as WithoutImage,x as __namedExportsOrder,C as default};
