import{f as y,h as n,d as b,H as r,e as w,w as k,R as l,o as x}from"./vendor-DuoTAqd8.js";import{l as P,d as R}from"./themes-D30gyLP9.js";import{m as T,a as g,b as m,c as A,t as C}from"./data-BNiK4gsS.js";const v=y`
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
`;function E(s,t=1,e=5){const o=(t-1)*e;return{data:s.slice(o,o+e),total:s.length,page:t,pageSize:e,totalPages:Math.ceil(s.length/e)}}n.get("/api/newsletters/search",async({request:s})=>{const t=new URL(s.url),e={query:t.searchParams.get("q")||void 0,categories:t.searchParams.getAll("categories"),tags:t.searchParams.getAll("tags"),sortBy:t.searchParams.get("sortBy"),page:parseInt(t.searchParams.get("page")||"1"),pageSize:parseInt(t.searchParams.get("pageSize")||"5")};await b(500);let o=T.filter(a=>{var h,p;const i=!e.query||a.title.toLowerCase().includes(e.query.toLowerCase())||a.description.toLowerCase().includes(e.query.toLowerCase()),u=!((h=e.categories)!=null&&h.length)||e.categories.some(d=>a.categories.includes(d)),f=!((p=e.tags)!=null&&p.length)||e.tags.some(d=>a.tags.includes(d));return i&&u&&f});switch(e.sortBy){case"subscribers":o.sort((a,i)=>i.subscriberCount-a.subscriberCount);break}const c=E(o,e.page,e.pageSize);return c.total===0?r.json(g.notFound,{status:404}):r.json(c)}),n.get("/api/user/preferences",()=>r.json(m.preferences)),n.post("/api/user/preferences",async({request:s})=>{try{const t=await s.json(),e={...m.preferences,...t};return r.json(e)}catch{return r.json({code:"BAD_REQUEST",message:"Invalid preferences update"},{status:400})}}),n.get("/api/categories",()=>r.json(A)),n.get("/api/tags",()=>r.json(C)),n.get("/api/error/network",()=>r.json(g.networkError,{status:500})),n.get("/api/error/unauthorized",()=>r.json(g.unauthorized,{status:401}));typeof globalThis.expect>"u"&&(globalThis.expect=w);const j=()=>{if(typeof window<"u"){const s=window.fetch;window.fetch=async(e,...o)=>["storybook.chakra-ui.com","stories.json","https://o4504455926185984.ingest.us.sentry.io"].some(i=>e.includes(i))?(console.warn(`Blocked external fetch to: ${e}`),Promise.resolve(new Response(null,{status:404}))):s(e,...o);const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,o,...c){if(["storybook.chakra-ui.com","stories.json","https://o4504455926185984.ingest.us.sentry.io"].some(u=>o.includes(u))){console.warn(`Blocked external XHR request to: ${o}`),this.abort();return}return t.call(this,e,o,...c)}}},B=s=>(l.useEffect(()=>{j()},[]),l.createElement("div",null,l.createElement(v,null),l.createElement(s))),H={parameters:{actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/i}},backgrounds:{default:"light",values:[{name:"light",value:"#F8F9FA"},{name:"dark",value:"#333333"}]},headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, PATCH, OPTIONS","Access-Control-Allow-Headers":"X-Requested-With, content-type, Authorization"},csp:{directives:{"default-src":"'self'","script-src":"'self' 'unsafe-inline' 'unsafe-eval'","style-src":"'self' 'unsafe-inline'","img-src":"'self' data: https:","connect-src":"'self'","font-src":"'self'"}}},decorators:[B,k({themes:{light:P,dark:R},defaultTheme:"light",Provider:x})]};export{H as default};
