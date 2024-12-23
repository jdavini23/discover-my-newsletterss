import{h as w,H as N,r as n,j as e}from"./vendor-Ced-Dk9l.js";import{N as I}from"./NewsletterCard-RFjxTakT.js";import{m as x}from"./data-BNiK4gsS.js";const K=()=>{const[r,g]=n.useState(""),[s,o]=n.useState(null),[f,j]=n.useState(!1),[u,y]=n.useState(null),[c,k]=n.useState(1),b=async(t=1,h="")=>{j(!0),y(null);try{const a=await fetch(`/api/newsletters/search?q=${h}&page=${t}&pageSize=6`);if(!a.ok){const A=await a.json();throw new Error(A.message||"Failed to fetch newsletters")}const $=await a.json();o($)}catch(a){y(a instanceof Error?a.message:"An unknown error occurred"),o(null)}finally{j(!1)}};n.useEffect(()=>{b(c,r)},[c,r]);const q=t=>{g(t.target.value),k(1)},F=t=>{k(t)};return e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-6",children:"Discover Newsletters"}),e.jsx("div",{className:"mb-8",children:e.jsx("input",{type:"text",value:r,onChange:q,placeholder:"Search newsletters by topic, title, or tag",className:"w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"})}),f&&e.jsx("div",{className:"text-center py-12",children:e.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-400",children:"Loading newsletters..."})}),u&&e.jsxs("div",{className:"text-center py-12 bg-red-50 dark:bg-red-900 rounded-lg",children:[e.jsx("p",{className:"text-xl text-red-600 dark:text-red-300",children:u}),e.jsx("button",{onClick:()=>b(c,r),className:"mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",children:"Retry"})]}),s&&!f&&!u&&e.jsxs("section",{children:[e.jsxs("h2",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-6",children:[s.total," Newsletter",s.total!==1?"s":""," Found"]}),s.data.length===0?e.jsxs("div",{className:"text-center text-gray-600 dark:text-gray-400 py-12",children:[e.jsx("p",{className:"text-xl",children:"No newsletters found matching your search."}),e.jsx("p",{className:"mt-4",children:"Try a different search term or explore other categories."})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:s.data.map(t=>e.jsx(I,{title:t.title,description:t.description,imageUrl:t.imageUrl,tags:t.tags},t.id))}),e.jsx("div",{className:"flex justify-center mt-8",children:e.jsx("div",{className:"join",children:Array.from({length:s.totalPages},(t,h)=>h+1).map(t=>e.jsx("button",{onClick:()=>F(t),className:`join-item btn ${c===t?"btn-active":""}`,children:t},t))})})]})]})]})},J={title:"Pages/Newsletter Search",component:K,tags:["autodocs"],parameters:{layout:"fullscreen",msw:{handlers:[]}}},l={},d={parameters:{backgrounds:{default:"dark"}}},i={parameters:{msw:{handlers:[w.get("/api/newsletters/search",()=>N.json({data:[],total:0,page:1,pageSize:6,totalPages:0}))]}}},p={parameters:{msw:{handlers:[w.get("/api/newsletters/search",()=>N.json({code:"NETWORK_ERROR",message:"Unable to connect to the server. Please check your internet connection."},{status:500}))]}}},m={parameters:{msw:{handlers:[w.get("/api/newsletters/search",({request:r})=>{const g=new URL(r.url),s=parseInt(g.searchParams.get("page")||"1"),o={data:x.slice((s-1)*6,s*6),total:x.length,page:s,pageSize:6,totalPages:Math.ceil(x.length/6)};return N.json(o)})]}}};var R,S,P;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:"{}",...(P=(S=l.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var v,E,C;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(C=(E=d.parameters)==null?void 0:E.docs)==null?void 0:C.source}}};var D,U,z;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/api/newsletters/search', () => {
        return HttpResponse.json({
          data: [],
          total: 0,
          page: 1,
          pageSize: 6,
          totalPages: 0
        });
      })]
    }
  }
}`,...(z=(U=i.parameters)==null?void 0:U.docs)==null?void 0:z.source}}};var H,O,T;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/api/newsletters/search', () => {
        return HttpResponse.json({
          code: 'NETWORK_ERROR',
          message: 'Unable to connect to the server. Please check your internet connection.'
        }, {
          status: 500
        });
      })]
    }
  }
}`,...(T=(O=p.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var _,L,M;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters: {
    msw: {
      handlers: [http.get('/api/newsletters/search', ({
        request
      }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');

        // Simulate different page contents
        const paginatedResponse = {
          data: mockNewsletters.slice((page - 1) * 6, page * 6),
          total: mockNewsletters.length,
          page,
          pageSize: 6,
          totalPages: Math.ceil(mockNewsletters.length / 6)
        };
        return HttpResponse.json(paginatedResponse);
      })]
    }
  }
}`,...(M=(L=m.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const Q=["Default","DarkMode","NoResults","NetworkError","PaginatedResults"];export{d as DarkMode,l as Default,p as NetworkError,i as NoResults,m as PaginatedResults,Q as __namedExportsOrder,J as default};
