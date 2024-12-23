import{r as c,j as e}from"./vendor-C9AuzQIH.js";import{b as w}from"./data-BNiK4gsS.js";const N=["Technology","AI","Science","Startups","Design","Business","Finance","Health","Climate","Space","Crypto","Marketing","Psychology","Art","Music","Sports"],S=()=>{const[s,u]=c.useState(w.interests),[r,i]=c.useState(1),a=t=>{u(o=>o.includes(t)?o.filter(v=>v!==t):[...o,t])},j=()=>{switch(r){case 1:return e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-6",children:"What topics interest you?"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-8",children:"Select at least 3 topics you'd like to receive newsletters about."}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:N.map(t=>e.jsx("button",{onClick:()=>a(t),className:`px-4 py-2 rounded-full transition-all duration-200 ${s.includes(t)?"bg-blue-500 text-white":"bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,children:t},t))})]});case 2:return e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-6",children:"Your Selected Interests"}),e.jsx("div",{className:"flex flex-wrap gap-4 mb-8",children:s.map(t=>e.jsx("span",{className:"px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full",children:t},t))}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"These interests will help us personalize your newsletter recommendations."})]});default:return null}};return e.jsx("div",{className:"container mx-auto px-4 py-8 max-w-2xl",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8",children:[e.jsx("div",{className:"mb-8",children:e.jsxs("div",{className:"flex justify-center space-x-4",children:[e.jsx("div",{className:`w-12 h-12 rounded-full flex items-center justify-center ${r===1?"bg-blue-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`,children:"1"}),e.jsx("div",{className:`w-12 h-12 rounded-full flex items-center justify-center ${r===2?"bg-blue-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`,children:"2"})]})}),j(),e.jsxs("div",{className:"flex justify-between mt-8",children:[r>1&&e.jsx("button",{onClick:()=>i(t=>Math.max(1,t-1)),className:"px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600",children:"Previous"}),r<2&&s.length>=3&&e.jsx("button",{onClick:()=>i(t=>Math.min(2,t+1)),className:"ml-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",children:"Next"}),r===2&&e.jsx("button",{onClick:()=>alert(`Interests saved: ${s.join(", ")}`),className:"ml-auto px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600",children:"Finish"})]})]})})},$={title:"Pages/Interest Wizard",component:S,tags:["autodocs"],parameters:{layout:"fullscreen"}},l={},n={parameters:{backgrounds:{default:"dark"}}},d={render:()=>{const[s,u]=c.useState(["Technology","AI","Startups"]),[r,i]=c.useState(1);return e.jsx("div",{className:"container mx-auto px-4 py-8 max-w-2xl",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8",children:[e.jsx("div",{className:"mb-8",children:e.jsxs("div",{className:"flex justify-center space-x-4",children:[e.jsx("div",{className:`w-12 h-12 rounded-full flex items-center justify-center ${r===1?"bg-blue-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`,children:"1"}),e.jsx("div",{className:`w-12 h-12 rounded-full flex items-center justify-center ${r===2?"bg-blue-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`,children:"2"})]})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-6",children:"Your Selected Interests"}),e.jsx("div",{className:"flex flex-wrap gap-4 mb-8",children:s.map(a=>e.jsx("span",{className:"px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full",children:a},a))}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"These interests will help us personalize your newsletter recommendations."})]}),e.jsx("div",{className:"flex justify-end mt-8",children:e.jsx("button",{onClick:()=>alert(`Interests saved: ${s.join(", ")}`),className:"px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600",children:"Finish"})})]})})}};var g,x,m;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(m=(x=l.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var b,h,p;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(p=(h=n.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var y,f,k;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['Technology', 'AI', 'Startups']);
    const [currentStep, setCurrentStep] = useState(1);

    // Reuse the same logic as the main component, but with preset interests
    return <div className="container mx-auto px-4 py-8 max-w-2xl">\r
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">\r
          {/* Similar structure to the main component */}\r
          <div className="mb-8">\r
            <div className="flex justify-center space-x-4">\r
              <div className={\`w-12 h-12 rounded-full flex items-center justify-center \${currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}\`}>\r
                1\r
              </div>\r
              <div className={\`w-12 h-12 rounded-full flex items-center justify-center \${currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}\`}>\r
                2\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div>\r
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">\r
              Your Selected Interests\r
            </h2>\r
            <div className="flex flex-wrap gap-4 mb-8">\r
              {selectedInterests.map(interest => <span key={interest} className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">\r
                  {interest}\r
                </span>)}\r
            </div>\r
            <p className="text-gray-600 dark:text-gray-300 mb-4">\r
              These interests will help us personalize your newsletter recommendations.\r
            </p>\r
          </div>\r
\r
          <div className="flex justify-end mt-8">\r
            <button onClick={() => alert(\`Interests saved: \${selectedInterests.join(', ')}\`)} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">\r
              Finish\r
            </button>\r
          </div>\r
        </div>\r
      </div>;
  }
}`,...(k=(f=d.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};const M=["Default","DarkMode","PreselectedInterests"];export{n as DarkMode,l as Default,d as PreselectedInterests,M as __namedExportsOrder,$ as default};
