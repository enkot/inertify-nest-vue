import{d as I,C as z,b as $,c as j,e as s,g as o,a,f as b,t as P,E as k,P as B,H as S,L as _,o as L,l as v}from"./vendor.6e7344dd.js";import{_ as E}from"./Input.5979be7f.js";import{_ as H}from"./Select.8ad8190a.js";import{_ as A}from"./Button.900f8c5f.js";const D={class:"max-w-4xl md:flex md:items-center md:justify-between mx-auto px-4 sm:px-6 lg:px-8"},F={class:"flex items-center text-3xl font-bold leading-tight text-gray-800 space-x-1.5"},M=v("Contacts"),O=a("span",{class:"text-gray-300"},"/",-1),T={class:"max-w-4xl mx-auto sm:px-6 lg:px-8"},q={class:"mt-6 flex flex-col"},G={class:"shadow sm:rounded-md sm:overflow-hidden"},J={class:"bg-white py-10 px-8 space-y-6"},K=a("div",null,[a("h3",{class:"text-lg leading-6 font-medium text-gray-900"},"Primary Information"),a("p",{class:"mt-1 text-sm text-gray-500"},"Provide basic information about the contact.")],-1),Q={class:"grid grid-cols-6 gap-6"},R={class:"flex items-center justify-between px-8 py-3 bg-gray-50 text-right"},W=v("Update"),te=I({props:{errors:null,contact:null,organizations:null},setup(n){const r=n,e=z({firstName:r.contact.firstName,lastName:r.contact.lastName,organizationId:r.contact.organizationId,email:r.contact.email,phone:r.contact.phone,address:r.contact.address,city:r.contact.city,region:r.contact.region,country:r.contact.country,postalCode:r.contact.postalCode}),i=$(()=>`${e.firstName} ${e.lastName}`),N=()=>{confirm("Are you sure you want to delete this contact?")&&B.Inertia.delete(`/contacts/${r.contact.id}`)};return(X,t)=>{var m,c,u,p,f,g,x,V,y;const C=S,h=_,d=E,U=H,w=A;return L(),j("div",null,[s(C,{title:o(i)},null,8,["title"]),a("header",null,[a("div",D,[a("h1",F,[s(h,{href:"/contacts",class:"hover:text-violet-700"},{default:b(()=>[M]),_:1}),O,a("span",null,P(o(i)),1)])])]),a("div",T,[a("div",q,[a("form",{onSubmit:t[10]||(t[10]=k(l=>o(e).put(`/contacts/${n.contact.id}`),["prevent"]))},[a("div",G,[a("div",J,[K,a("div",Q,[s(d,{modelValue:o(e).firstName,"onUpdate:modelValue":t[0]||(t[0]=l=>o(e).firstName=l),label:"First name",class:"col-span-6 sm:col-span-3",error:(m=n.errors)==null?void 0:m.firstName},null,8,["modelValue","error"]),s(d,{modelValue:o(e).lastName,"onUpdate:modelValue":t[1]||(t[1]=l=>o(e).lastName=l),label:"Last name",class:"col-span-6 sm:col-span-3",error:(c=n.errors)==null?void 0:c.lastName},null,8,["modelValue","error"]),s(U,{modelValue:o(e).organizationId,"onUpdate:modelValue":t[2]||(t[2]=l=>o(e).organizationId=l),items:n.organizations,label:"Organization",class:"col-span-6 sm:col-span-3",error:(u=n.errors)==null?void 0:u.organizationId},null,8,["modelValue","items","error"]),s(d,{modelValue:o(e).phone,"onUpdate:modelValue":t[3]||(t[3]=l=>o(e).phone=l),label:"Phone",class:"col-span-6 sm:col-span-3",error:(p=n.errors)==null?void 0:p.phone},null,8,["modelValue","error"]),s(d,{modelValue:o(e).email,"onUpdate:modelValue":t[4]||(t[4]=l=>o(e).email=l),label:"Email",class:"col-span-6 sm:col-span-4",error:(f=n.errors)==null?void 0:f.email},null,8,["modelValue","error"]),s(d,{modelValue:o(e).country,"onUpdate:modelValue":t[5]||(t[5]=l=>o(e).country=l),label:"Country",class:"col-span-6 sm:col-span-3",error:(g=n.errors)==null?void 0:g.country},null,8,["modelValue","error"]),s(d,{modelValue:o(e).address,"onUpdate:modelValue":t[6]||(t[6]=l=>o(e).address=l),label:"Address",class:"col-span-6"},null,8,["modelValue"]),s(d,{modelValue:o(e).city,"onUpdate:modelValue":t[7]||(t[7]=l=>o(e).city=l),label:"City",class:"col-span-6 sm:col-span-6 lg:col-span-2",error:(x=n.errors)==null?void 0:x.city},null,8,["modelValue","error"]),s(d,{modelValue:o(e).region,"onUpdate:modelValue":t[8]||(t[8]=l=>o(e).region=l),label:"Province/State",class:"col-span-6 sm:col-span-3 lg:col-span-2",error:(V=n.errors)==null?void 0:V.region},null,8,["modelValue","error"]),s(d,{modelValue:o(e).postalCode,"onUpdate:modelValue":t[9]||(t[9]=l=>o(e).postalCode=l),label:"Postal code",class:"col-span-6 sm:col-span-3 lg:col-span-2",error:(y=n.errors)==null?void 0:y.postalCode},null,8,["modelValue","error"])])]),a("div",R,[a("span",{class:"text-red-700 hover:underline cursor-pointer",onClick:N},"Delete Contact"),s(w,{type:"submit",variant:"primary",disabled:o(e).processing},{default:b(()=>[W]),_:1},8,["disabled"])])])],32)])])])}}});export{te as default};
