import{S as N,K as x,L as F,M as m,N as G,A as I,U as P,O as S,P as D,t as V,Q as z,R as Q,T as W,V as X,p as q,h as J,W as k,H as ee,X as re,Y as ne,c as ae,s as M,Z as U,o as B,_ as C,d as ie,$ as p,a0 as se,a1 as te,a2 as fe,C as H,a3 as ue,y as Z,a4 as le,a5 as ve,a6 as j,a7 as ce,a8 as _e,a9 as de,aa as oe,ab as be}from"./vQiGXrMC.js";function y(e,n=null,o){if(typeof e!="object"||e===null||N in e)return e;const l=Q(e);if(l!==x&&l!==F)return e;var t=new Map,c=W(e),b=m(0);c&&t.set("length",m(e.length));var g;return new Proxy(e,{defineProperty(f,r,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&z();var s=t.get(r);return s===void 0?(s=m(a.value),t.set(r,s)):S(s,y(a.value,g)),!0},deleteProperty(f,r){var a=t.get(r);if(a===void 0)r in f&&t.set(r,m(P));else{if(c&&typeof r=="string"){var s=t.get("length"),i=Number(r);Number.isInteger(i)&&i<s.v&&S(s,i)}S(a,P),$(b)}return!0},get(f,r,a){var _;if(r===N)return e;var s=t.get(r),i=r in f;if(s===void 0&&(!i||(_=D(f,r))!=null&&_.writable)&&(s=m(y(i?f[r]:P,g)),t.set(r,s)),s!==void 0){var u=I(s);return u===P?void 0:u}return Reflect.get(f,r,a)},getOwnPropertyDescriptor(f,r){var a=Reflect.getOwnPropertyDescriptor(f,r);if(a&&"value"in a){var s=t.get(r);s&&(a.value=I(s))}else if(a===void 0){var i=t.get(r),u=i==null?void 0:i.v;if(i!==void 0&&u!==P)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return a},has(f,r){var u;if(r===N)return!0;var a=t.get(r),s=a!==void 0&&a.v!==P||Reflect.has(f,r);if(a!==void 0||V!==null&&(!s||(u=D(f,r))!=null&&u.writable)){a===void 0&&(a=m(s?y(f[r],g):P),t.set(r,a));var i=I(a);if(i===P)return!1}return s},set(f,r,a,s){var h;var i=t.get(r),u=r in f;if(c&&r==="length")for(var _=a;_<i.v;_+=1){var R=t.get(_+"");R!==void 0?S(R,P):_ in f&&(R=m(P),t.set(_+"",R))}i===void 0?(!u||(h=D(f,r))!=null&&h.writable)&&(i=m(void 0),S(i,y(a,g)),t.set(r,i)):(u=i.v!==P,S(i,y(a,g)));var d=Reflect.getOwnPropertyDescriptor(f,r);if(d!=null&&d.set&&d.set.call(s,a),!u){if(c&&typeof r=="string"){var A=t.get("length"),O=Number(r);Number.isInteger(O)&&O>=A.v&&S(A,O+1)}$(b)}return!0},ownKeys(f){I(b);var r=Reflect.ownKeys(f).filter(i=>{var u=t.get(i);return u===void 0||u.v!==P});for(var[a,s]of t)s.v!==P&&!(a in f)&&r.push(a);return r},setPrototypeOf(){G()}})}function $(e,n=1){S(e,e.v+n)}function me(e,n,[o,l]=[0,0]){q&&o===0&&J();var t=e,c=null,b=null,g=P,f=o>0?k:0,r=!1;const a=(i,u=!0)=>{r=!0,s(u,i)},s=(i,u)=>{if(g===(g=i))return;let _=!1;if(q&&l!==-1){if(o===0){const d=t.data;d===ee?l=0:d===re?l=1/0:(l=parseInt(d.substring(1)),l!==l&&(l=g?1/0:-1))}const R=l>o;!!g===R&&(t=ne(),ae(t),M(!1),_=!0,l=-1)}g?(c?U(c):u&&(c=B(()=>u(t))),b&&C(b,()=>{b=null})):(b?U(b):u&&(b=B(()=>u(t,[o+1,l]))),c&&C(c,()=>{c=null})),_&&M(!0)};X(()=>{r=!1,n(a),r||s(null,null)},f),q&&(t=ie)}let E=!1;function Pe(e){var n=E;try{return E=!1,[e(),E]}finally{E=n}}const ge={get(e,n){if(!e.exclude.includes(n))return I(e.version),n in e.special?e.special[n]():e.props[n]},set(e,n,o){return n in e.special||(e.special[n]=Ie({get[n](){return e.props[n]}},n,j)),e.special[n](o),p(e.version),!0},getOwnPropertyDescriptor(e,n){if(!e.exclude.includes(n)&&n in e.props)return{enumerable:!0,configurable:!0,value:e.props[n]}},deleteProperty(e,n){return e.exclude.includes(n)||(e.exclude.push(n),p(e.version)),!0},has(e,n){return e.exclude.includes(n)?!1:n in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(n=>!e.exclude.includes(n))}};function Se(e,n){return new Proxy({props:e,exclude:n,special:{},version:m(0)},ge)}function Ie(e,n,o,l){var K;var t=(o&be)!==0,c=!le||(o&ve)!==0,b=(o&_e)!==0,g=(o&oe)!==0,f=!1,r;b?[r,f]=Pe(()=>e[n]):r=e[n];var a=N in e||de in e,s=b&&(((K=D(e,n))==null?void 0:K.set)??(a&&n in e&&(v=>e[n]=v)))||void 0,i=l,u=!0,_=!1,R=()=>(_=!0,u&&(u=!1,g?i=Z(l):i=l),i);r===void 0&&l!==void 0&&(s&&c&&ce(),r=R(),s&&s(r));var d;if(c)d=()=>{var v=e[n];return v===void 0?R():(u=!0,_=!1,v)};else{var A=(t?H:te)(()=>e[n]);A.f|=se,d=()=>{var v=I(A);return v!==void 0&&(i=void 0),v===void 0?i:v}}if((o&j)===0)return d;if(s){var O=e.$$legacy;return function(v,w){return arguments.length>0?((!c||!w||O||f)&&s(w?d():v),v):d()}}var h=!1,L=ue(r),T=H(()=>{var v=d(),w=I(L);return h?(h=!1,w):L.v=v});return t||(T.equals=fe),function(v,w){if(arguments.length>0){const Y=w?I(T):c&&b?y(v):v;return T.equals(Y)||(h=!0,S(L,Y),_&&i!==void 0&&(i=Y),Z(()=>I(T))),v}return I(T)}}export{y as a,me as i,Se as l,Ie as p};
