import{r as v,j as e}from"./vendor-Ced-Dk9l.js";import{N as b}from"./NewsletterCard-RFjxTakT.js";import{m as w}from"./data-BNiK4gsS.js";const k=()=>{const[r,n]=v.useState(w.filter(t=>t.isFavorite)),l=t=>{n(y=>y.filter(N=>N.id!==t))};return e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsxs("div",{className:"flex justify-between items-center mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white",children:"My Favorite Newsletters"}),e.jsxs("div",{className:"text-gray-600 dark:text-gray-300",children:[r.length," Newsletters"]})]}),r.length===0?e.jsxs("div",{className:"text-center py-16",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"})}),e.jsx("h2",{className:"text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4",children:"No Favorite Newsletters Yet"}),e.jsx("p",{className:"text-gray-500 dark:text-gray-400 mb-6",children:"Start exploring and add newsletters to your favorites!"}),e.jsx("button",{className:"px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",children:"Explore Newsletters"})]}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:r.map(t=>e.jsxs("div",{className:"relative group",children:[e.jsx(b,{title:t.title,description:t.description,imageUrl:t.imageUrl,tags:t.tags,onFavorite:()=>l(t.id)}),e.jsx("button",{onClick:()=>l(t.id),className:"absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",title:"Remove from Favorites",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]},t.id))}),r.length>0&&e.jsx("div",{className:"mt-8 text-center",children:e.jsx("button",{className:"px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",children:"Manage Subscriptions"})})]})},F={title:"Pages/Favorites",component:k,tags:["autodocs"],parameters:{layout:"fullscreen"}},a={},s={parameters:{backgrounds:{default:"dark"}}},o={render:()=>{const[r,n]=v.useState([]);return e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsxs("div",{className:"flex justify-between items-center mb-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white",children:"My Favorite Newsletters"}),e.jsxs("div",{className:"text-gray-600 dark:text-gray-300",children:[r.length," Newsletters"]})]}),e.jsxs("div",{className:"text-center py-16",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"})}),e.jsx("h2",{className:"text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4",children:"No Favorite Newsletters Yet"}),e.jsx("p",{className:"text-gray-500 dark:text-gray-400 mb-6",children:"Start exploring and add newsletters to your favorites!"}),e.jsx("button",{className:"px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors",children:"Explore Newsletters"})]})]})}};var i,d,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var x,m,g;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(g=(m=s.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var p,u,h;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => {
    const [favorites, setFavorites] = useState<any[]>([]);
    return <div className="container mx-auto px-4 py-8">\r
        <div className="flex justify-between items-center mb-8">\r
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">\r
            My Favorite Newsletters\r
          </h1>\r
          <div className="text-gray-600 dark:text-gray-300">\r
            {favorites.length} Newsletters\r
          </div>\r
        </div>\r
\r
        <div className="text-center py-16">\r
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 dark:text-gray-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">\r
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />\r
          </svg>\r
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">\r
            No Favorite Newsletters Yet\r
          </h2>\r
          <p className="text-gray-500 dark:text-gray-400 mb-6">\r
            Start exploring and add newsletters to your favorites!\r
          </p>\r
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">\r
            Explore Newsletters\r
          </button>\r
        </div>\r
      </div>;
  }
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const S=["Default","DarkMode","EmptyState"];export{s as DarkMode,a as Default,o as EmptyState,S as __namedExportsOrder,F as default};
