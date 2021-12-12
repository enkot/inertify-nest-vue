var k=Object.defineProperty,P=Object.defineProperties;var $=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable;var _=(a,s,e)=>s in a?k(a,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[s]=e,v=(a,s)=>{for(var e in s||(s={}))B.call(s,e)&&_(a,e,s[e]);if(y)for(var e of y(s))I.call(s,e)&&_(a,e,s[e]);return a},b=(a,s)=>P(a,$(s));import{d as A,C as E,c as H,e as r,a as t,f as m,t as d,g as n,E as L,P as S,H as T,L as D,o as O,l as V}from"./vendor.6e7344dd.js";import{_ as F}from"./Input.5979be7f.js";import{_ as M}from"./Button.900f8c5f.js";import{_ as q}from"./Table.9f94ce86.js";const G={class:"max-w-4xl md:flex md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8"},J={class:"flex items-center text-3xl font-bold leading-tight text-gray-800 space-x-1.5"},K=V("Organizations"),Q=t("span",{class:"text-gray-300"},"/",-1),R={class:"max-w-4xl mx-auto sm:px-6 lg:px-8"},W={class:"mt-6 flex flex-col"},X={class:"shadow sm:rounded-md sm:overflow-hidden"},Y={class:"bg-white py-10 px-8 space-y-6"},Z=t("div",null,[t("h3",{class:"text-lg leading-6 font-medium text-gray-900"},"Primary Information"),t("p",{class:"mt-1 text-sm text-gray-500"},"Provide basic information about the organization.")],-1),ee={class:"grid grid-cols-6 gap-6"},oe={class:"flex items-center justify-between px-8 py-3 bg-gray-50 text-right"},te=V("Update"),se=t("h2",{class:"text-2xl font-bold leading-tight text-gray-800 mt-10"},"Contacts",-1),ae={class:"shadow sm:rounded-md sm:overflow-hidden mt-6"},ne={class:"flex items-center"},le={class:"flex flex-shrink-0 justify-center items-center h-10 w-10 rounded-lg text-violet-500 bg-violet-50 font-semibold group-hover:bg-violet-500 group-hover:text-white uppercase"},re={class:"ml-4"},ie={class:"text-sm font-medium text-gray-900"},de={class:"text-sm text-gray-500"},me={class:"text-sm text-gray-900"},ce={class:"text-sm text-gray-500"},ue={class:"text-sm text-gray-500"},_e=A({props:{errors:null,organization:null},setup(a){const s=a,e=E({name:s.organization.name,email:s.organization.email,phone:s.organization.phone,address:s.organization.address,city:s.organization.city,region:s.organization.region,country:s.organization.country,postalCode:s.organization.postalCode}),z=[{name:"name",label:"Name"},{name:"address",label:"Address"},{name:"phone",label:"Phone"}],w=()=>{confirm("Are you sure you want to delete this organization?")&&S.Inertia.delete(`/organizations/${s.organization.id}`)};return(pe,l)=>{var c,u,p,g,x,f,h;const C=T,U=D,i=F,N=M,j=q;return O(),H("div",null,[r(C,{title:a.organization.name},null,8,["title"]),t("header",null,[t("div",G,[t("h1",J,[r(U,{href:"/organizations",class:"hover:text-violet-700"},{default:m(()=>[K]),_:1}),Q,t("span",null,d(n(e).name),1)])])]),t("div",R,[t("div",W,[t("form",{onSubmit:l[8]||(l[8]=L(o=>n(e).put(`/organizations/${a.organization.id}`),["prevent"]))},[t("div",X,[t("div",Y,[Z,t("div",ee,[r(i,{modelValue:n(e).name,"onUpdate:modelValue":l[0]||(l[0]=o=>n(e).name=o),label:"Name",class:"col-span-6 sm:col-span-3",error:(c=a.errors)==null?void 0:c.name},null,8,["modelValue","error"]),r(i,{modelValue:n(e).phone,"onUpdate:modelValue":l[1]||(l[1]=o=>n(e).phone=o),label:"Phone",class:"col-span-6 sm:col-span-3",error:(u=a.errors)==null?void 0:u.phone},null,8,["modelValue","error"]),r(i,{modelValue:n(e).email,"onUpdate:modelValue":l[2]||(l[2]=o=>n(e).email=o),label:"Email",class:"col-span-6 sm:col-span-4",error:(p=a.errors)==null?void 0:p.email},null,8,["modelValue","error"]),r(i,{modelValue:n(e).country,"onUpdate:modelValue":l[3]||(l[3]=o=>n(e).country=o),label:"Country",class:"col-span-6 sm:col-span-3",error:(g=a.errors)==null?void 0:g.country},null,8,["modelValue","error"]),r(i,{modelValue:n(e).address,"onUpdate:modelValue":l[4]||(l[4]=o=>n(e).address=o),label:"Address",class:"col-span-6"},null,8,["modelValue"]),r(i,{modelValue:n(e).city,"onUpdate:modelValue":l[5]||(l[5]=o=>n(e).city=o),label:"City",class:"col-span-6 sm:col-span-6 lg:col-span-2",error:(x=a.errors)==null?void 0:x.city},null,8,["modelValue","error"]),r(i,{modelValue:n(e).region,"onUpdate:modelValue":l[6]||(l[6]=o=>n(e).region=o),label:"Province/State",class:"col-span-6 sm:col-span-3 lg:col-span-2",error:(f=a.errors)==null?void 0:f.region},null,8,["modelValue","error"]),r(i,{modelValue:n(e).postalCode,"onUpdate:modelValue":l[7]||(l[7]=o=>n(e).postalCode=o),label:"Postal code",class:"col-span-6 sm:col-span-3 lg:col-span-2",error:(h=a.errors)==null?void 0:h.postalCode},null,8,["modelValue","error"])])]),t("div",oe,[t("span",{class:"text-red-700 hover:underline cursor-pointer",onClick:w},"Delete Organization"),r(N,{type:"submit",variant:"primary",disabled:n(e).processing},{default:m(()=>[te]),_:1},8,["disabled"])])])],32)]),se,t("div",ae,[r(j,{headers:z,rows:s.organization.contacts.map(o=>b(v({},o),{link:`/contacts/${o.id}/edit`}))},{name:m(({row:o})=>[t("div",ne,[t("div",le,d(o.firstName.slice(0,1)),1),t("div",re,[t("div",ie,d(o.firstName)+" "+d(o.lastName),1),t("div",de,d(o.email),1)])])]),address:m(({row:o})=>[t("div",me,d(o.address),1),t("div",ce,d(o.country),1)]),phone:m(({row:o})=>[t("span",ue,d(o.phone),1)]),_:1},8,["rows"])])])])}}});export{_e as default};
