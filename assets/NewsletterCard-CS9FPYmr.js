import{r as h,j as e}from"./vendor-C9AuzQIH.js";const w=({id:g,title:r,description:o,imageUrl:d="https://via.placeholder.com/350x200?text=Newsletter",tags:i,subscriptionCount:t,isFavorite:n=!1,onFavorite:s})=>{const[a,x]=h.useState(n),c=()=>{x(!a),s==null||s()};return e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group",children:[e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:d,alt:r,className:"w-full h-48 object-cover"}),e.jsx("button",{onClick:c,className:"absolute top-4 right-4 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors",children:a?e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-red-500",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",clipRule:"evenodd"})}):e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-gray-500 group-hover:text-red-500 transition-colors",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"})})})]}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate",children:r}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3",children:o}),e.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:i.map(l=>e.jsx("span",{className:"px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs",children:l},l))}),t!==void 0&&e.jsxs("div",{className:"text-sm text-gray-500 dark:text-gray-400 flex items-center",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"})}),t.toLocaleString()," Subscribers"]})]})]})};export{w as N};
