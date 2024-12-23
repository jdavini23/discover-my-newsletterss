import{h as a,d as y,H as o,f as b,w,R as u,e as x,o as C}from"./vendor-Ced-Dk9l.js";import{m as k,a as g,b as h,c as P,t as T}from"./data-BNiK4gsS.js";import{l as v,d as A}from"./themes-D30gyLP9.js";function S(s,t=1,e=5){const n=(t-1)*e;return{data:s.slice(n,n+e),total:s.length,page:t,pageSize:e,totalPages:Math.ceil(s.length/e)}}const E=[a.get("/api/newsletters/search",async({request:s})=>{const t=new URL(s.url),e={query:t.searchParams.get("q")||void 0,categories:t.searchParams.getAll("categories"),tags:t.searchParams.getAll("tags"),sortBy:t.searchParams.get("sortBy"),page:parseInt(t.searchParams.get("page")||"1"),pageSize:parseInt(t.searchParams.get("pageSize")||"5")};await y(500);let n=k.filter(r=>{var p,d;const c=!e.query||r.title.toLowerCase().includes(e.query.toLowerCase())||r.description.toLowerCase().includes(e.query.toLowerCase()),m=!((p=e.categories)!=null&&p.length)||e.categories.some(l=>r.categories.includes(l)),f=!((d=e.tags)!=null&&d.length)||e.tags.some(l=>r.tags.includes(l));return c&&m&&f});switch(e.sortBy){case"subscribers":n.sort((r,c)=>c.subscriberCount-r.subscriberCount);break}const i=S(n,e.page,e.pageSize);return i.total===0?o.json(g.notFound,{status:404}):o.json(i)}),a.get("/api/user/preferences",()=>o.json(h.preferences)),a.post("/api/user/preferences",async({request:s})=>{try{const t=await s.json(),e={...h.preferences,...t};return o.json(e)}catch{return o.json({code:"BAD_REQUEST",message:"Invalid preferences update"},{status:400})}}),a.get("/api/categories",()=>o.json(P)),a.get("/api/tags",()=>o.json(T)),a.get("/api/error/network",()=>o.json(g.networkError,{status:500})),a.get("/api/error/unauthorized",()=>o.json(g.unauthorized,{status:401}))],j=b`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  input, button, textarea, select {
    font: inherit;
  }
`;typeof globalThis.expect>"u"&&(globalThis.expect=x);const D={parameters:{actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/i}},backgrounds:{default:"light",values:[{name:"light",value:"#ffffff"},{name:"dark",value:"#1a202c"}]},layout:"centered",msw:{handlers:E},docs:{canvas:{sourceState:"shown"},source:{type:"code"},description:{component:"## Component Description",story:"### Story Description"}},a11y:{config:{rules:[{id:"color-contrast",enabled:!0}]}},headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, PATCH, OPTIONS","Access-Control-Allow-Headers":"X-Requested-With, content-type, Authorization","Content-Security-Policy":"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://o4504455926185984.ingest.us.sentry.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https: https://o4504455926185984.ingest.us.sentry.io https://storybook.chakra-ui.com; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; report-uri https://o4504455926185984.ingest.us.sentry.io/api/4508260154015744/envelope/"}},decorators:[w({themes:{light:v,dark:A},defaultTheme:"light",Provider:C}),s=>u.createElement("div",{style:{padding:"20px",maxWidth:"1200px",margin:"0 auto"}},u.createElement(j),u.createElement(s))]};export{D as default};
