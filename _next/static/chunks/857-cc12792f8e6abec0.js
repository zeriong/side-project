(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[857],{3379:function(e){var t={animationIterationCount:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridColumn:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,stopOpacity:!0,strokeDashoffset:!0,strokeOpacity:!0,strokeWidth:!0};e.exports=function(e,n){return"number"!=typeof n||t[e]?n:n+"px"}},3879:function(e,t,n){var r=n(7236),o=n(6189),i={float:"cssFloat"},a=n(3379);function l(e,t,n){var l,u,c=i[t];if(void 0===c&&(u=r(l=o(t)),i[l]=i[t]=i[u]=u,c=u),c){if(void 0===n)return e.style[c];e.style[c]=a(c,n)}}function u(){2==arguments.length?"string"==typeof arguments[1]?arguments[0].style.cssText=arguments[1]:function(e,t){for(var n in t)t.hasOwnProperty(n)&&l(e,n,t[n])}(arguments[0],arguments[1]):l(arguments[0],arguments[1],arguments[2])}e.exports=u,e.exports.set=u,e.exports.get=function(e,t){return Array.isArray(t)?t.reduce(function(t,n){return t[n]=l(e,n||""),t},{}):l(e,t||"")}},227:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9749:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(6495).Z,o=n(2648).Z,i=n(1598).Z,a=n(7273).Z,l=i(n(7294)),u=o(n(3121)),c=n(2675),s=n(139),f=n(8730);n(7238);var d=o(n(9824));let p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/",loader:"imgix",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e){return void 0!==e.default}function h(e){return"number"==typeof e||void 0===e?e:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function m(e,t,n,o,i){if(!e||e["data-loaded-src"]===t)return;e["data-loaded-src"]=t;let a="decode"in e?e.decode():Promise.resolve();a.catch(()=>{}).then(()=>{if(e.parentNode){if(null==n?void 0:n.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,a=!1;n.current(r({},t,{nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>a,persist(){},preventDefault(){i=!0,t.preventDefault()},stopPropagation(){a=!0,t.stopPropagation()}}))}(null==o?void 0:o.current)&&o.current(e)}})}let v=l.forwardRef((e,t)=>{var{imgAttributes:n,heightInt:o,widthInt:i,qualityInt:u,className:c,imgStyle:s,blurStyle:f,isLazy:d,fill:p,placeholder:g,loading:h,srcString:v,config:y,unoptimized:b,loader:w,onLoadRef:x,onLoadingCompleteRef:C,onLoad:_,onError:E}=e,k=a(e,["imgAttributes","heightInt","widthInt","qualityInt","className","imgStyle","blurStyle","isLazy","fill","placeholder","loading","srcString","config","unoptimized","loader","onLoadRef","onLoadingCompleteRef","onLoad","onError"]);return h=d?"lazy":h,l.default.createElement(l.default.Fragment,null,l.default.createElement("img",Object.assign({},k,n,{width:i,height:o,decoding:"async","data-nimg":p?"fill":"1",className:c,loading:h,style:r({},s,f),ref:l.useCallback(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(E&&(e.src=e.src),e.complete&&m(e,v,x,C,b))},[v,x,C,E,b,t]),onLoad(e){let t=e.currentTarget;m(t,v,x,C,b)},onError(e){let{style:t}=e.currentTarget;"transparent"===t.color&&(t.color=""),"blur"===g&&t.backgroundImage&&(t.backgroundSize="",t.backgroundPosition="",t.backgroundRepeat="",t.backgroundImage=""),E&&E(e)}})))}),y=l.forwardRef((e,t)=>{let n,o;var i,{src:m,sizes:y,unoptimized:b=!1,priority:w=!1,loading:x,className:C,quality:_,width:E,height:k,fill:j,style:S,onLoad:O,onLoadingComplete:M,placeholder:z="empty",blurDataURL:P,layout:R,objectFit:I,objectPosition:L,lazyBoundary:A,lazyRoot:T}=e,D=a(e,["src","sizes","unoptimized","priority","loading","className","quality","width","height","fill","style","onLoad","onLoadingComplete","placeholder","blurDataURL","layout","objectFit","objectPosition","lazyBoundary","lazyRoot"]);let N=l.useContext(f.ImageConfigContext),F=l.useMemo(()=>{let e=p||N||s.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),n=e.deviceSizes.sort((e,t)=>e-t);return r({},e,{allSizes:t,deviceSizes:n})},[N]),W=D,q=W.loader||d.default;if(delete W.loader,"__next_img_default"in q){if("custom"===F.loader)throw Error('Image with src "'.concat(m,'" is missing "loader" prop.')+"\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader")}else{let U=q;q=e=>{let{config:t}=e,n=a(e,["config"]);return U(n)}}if(R){"fill"===R&&(j=!0);let Z={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[R];Z&&(S=r({},S,Z));let B={responsive:"100vw",fill:"100vw"}[R];B&&!y&&(y=B)}let G="",H=h(E),K=h(k);if("object"==typeof(i=m)&&(g(i)||void 0!==i.src)){let V=g(m)?m.default:m;if(!V.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ".concat(JSON.stringify(V)));if(!V.height||!V.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ".concat(JSON.stringify(V)));if(n=V.blurWidth,o=V.blurHeight,P=P||V.blurDataURL,G=V.src,!j){if(H||K){if(H&&!K){let $=H/V.width;K=Math.round(V.height*$)}else if(!H&&K){let J=K/V.height;H=Math.round(V.width*J)}}else H=V.width,K=V.height}}let Q=!w&&("lazy"===x||void 0===x);((m="string"==typeof m?m:G).startsWith("data:")||m.startsWith("blob:"))&&(b=!0,Q=!1),F.unoptimized&&(b=!0);let X=h(_),Y=Object.assign(j?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:I,objectPosition:L}:{},{color:"transparent"},S),ee="blur"===z&&P?{backgroundSize:Y.objectFit||"cover",backgroundPosition:Y.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'.concat(c.getImageBlurSvg({widthInt:H,heightInt:K,blurWidth:n,blurHeight:o,blurDataURL:P}),'")')}:{},et=function(e){let{config:t,src:n,unoptimized:r,width:o,quality:i,sizes:a,loader:l}=e;if(r)return{src:n,srcSet:void 0,sizes:void 0};let{widths:u,kind:c}=function(e,t,n){let{deviceSizes:r,allSizes:o}=e;if(n){let i=/(^|\s)(1?\d?\d)vw/g,a=[];for(let l;l=i.exec(n);l)a.push(parseInt(l[2]));if(a.length){let u=.01*Math.min(...a);return{widths:o.filter(e=>e>=r[0]*u),kind:"w"}}return{widths:o,kind:"w"}}if("number"!=typeof t)return{widths:r,kind:"w"};let c=[...new Set([t,2*t].map(e=>o.find(t=>t>=e)||o[o.length-1]))];return{widths:c,kind:"x"}}(t,o,a),s=u.length-1;return{sizes:a||"w"!==c?a:"100vw",srcSet:u.map((e,r)=>"".concat(l({config:t,src:n,quality:i,width:e})," ").concat("w"===c?e:r+1).concat(c)).join(", "),src:l({config:t,src:n,quality:i,width:u[s]})}}({config:F,src:m,unoptimized:b,width:H,quality:X,sizes:y,loader:q}),en=m,er={imageSrcSet:et.srcSet,imageSizes:et.sizes,crossOrigin:W.crossOrigin},eo=l.useRef(O);l.useEffect(()=>{eo.current=O},[O]);let ei=l.useRef(M);l.useEffect(()=>{ei.current=M},[M]);let ea=r({isLazy:Q,imgAttributes:et,heightInt:K,widthInt:H,qualityInt:X,className:C,imgStyle:Y,blurStyle:ee,loading:x,config:F,fill:j,unoptimized:b,placeholder:z,loader:q,srcString:en,onLoadRef:eo,onLoadingCompleteRef:ei},W);return l.default.createElement(l.default.Fragment,null,l.default.createElement(v,Object.assign({},ea,{ref:t})),w?l.default.createElement(u.default,null,l.default.createElement("link",Object.assign({key:"__nimg-"+et.src+et.srcSet+et.sizes,rel:"preload",as:"image",href:et.srcSet?void 0:et.src},er))):null)});t.default=y,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1551:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(2648).Z,o=n(7273).Z,i=r(n(7294)),a=n(1003),l=n(7795),u=n(4465),c=n(2692),s=n(8245),f=n(9246),d=n(227),p=n(3468);let g=new Set;function h(e,t,n,r){if(a.isLocalURL(t)){if(!r.bypassPrefetchedCheck){let o=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,i=t+"%"+n+"%"+o;if(g.has(i))return;g.add(i)}Promise.resolve(e.prefetch(t,n,r)).catch(e=>{})}}function m(e){return"string"==typeof e?e:l.formatUrl(e)}let v=i.default.forwardRef(function(e,t){let n,r;let{href:l,as:g,children:v,prefetch:y,passHref:b,replace:w,shallow:x,scroll:C,locale:_,onClick:E,onMouseEnter:k,onTouchStart:j,legacyBehavior:S=!1}=e,O=o(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=v,S&&("string"==typeof n||"number"==typeof n)&&(n=i.default.createElement("a",null,n));let M=!1!==y,z=i.default.useContext(c.RouterContext),P=i.default.useContext(s.AppRouterContext),R=null!=z?z:P,I=!z,{href:L,as:A}=i.default.useMemo(()=>{if(!z){let e=m(l);return{href:e,as:g?m(g):e}}let[t,n]=a.resolveHref(z,l,!0);return{href:t,as:g?a.resolveHref(z,g):n||t}},[z,l,g]),T=i.default.useRef(L),D=i.default.useRef(A);S&&(r=i.default.Children.only(n));let N=S?r&&"object"==typeof r&&r.ref:t,[F,W,q]=f.useIntersection({rootMargin:"200px"}),U=i.default.useCallback(e=>{(D.current!==A||T.current!==L)&&(q(),D.current=A,T.current=L),F(e),N&&("function"==typeof N?N(e):"object"==typeof N&&(N.current=e))},[A,N,L,q,F]);i.default.useEffect(()=>{R&&W&&M&&h(R,L,A,{locale:_})},[A,L,W,_,M,null==z?void 0:z.locale,R]);let Z={ref:U,onClick(e){S||"function"!=typeof E||E(e),S&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),R&&!e.defaultPrevented&&function(e,t,n,r,o,l,u,c,s,f){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let{target:t}=e.currentTarget;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!a.isLocalURL(n)))return;e.preventDefault();let g=()=>{"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:l,locale:c,scroll:u}):t[o?"replace":"push"](r||n,{forceOptimisticNavigation:!f})};s?i.default.startTransition(g):g()}(e,R,L,A,w,x,C,_,I,M)},onMouseEnter(e){S||"function"!=typeof k||k(e),S&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),R&&(M||!I)&&h(R,L,A,{locale:_,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart(e){S||"function"!=typeof j||j(e),S&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),R&&(M||!I)&&h(R,L,A,{locale:_,priority:!0,bypassPrefetchedCheck:!0})}};if(!S||b||"a"===r.type&&!("href"in r.props)){let B=void 0!==_?_:null==z?void 0:z.locale,G=(null==z?void 0:z.isLocaleDomain)&&d.getDomainLocale(A,B,null==z?void 0:z.locales,null==z?void 0:z.domainLocales);Z.href=G||p.addBasePath(u.addLocale(A,B,null==z?void 0:z.defaultLocale))}return S?i.default.cloneElement(r,Z):i.default.createElement("a",Object.assign({},O,Z),n)});t.default=v,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:n,disabled:u}=e,c=u||!i,[s,f]=r.useState(!1),[d,p]=r.useState(null);r.useEffect(()=>{if(i){if(!c&&!s&&d&&d.tagName){let e=function(e,t,n){let{id:r,observer:o,elements:i}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=l.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=a.get(r)))return t;let o=new Map,i=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:i,elements:o},l.push(n),a.set(n,t),t}(n);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),a.delete(r);let t=l.findIndex(e=>e.root===r.root&&e.margin===r.margin);t>-1&&l.splice(t,1)}}}(d,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n});return e}}else if(!s){let r=o.requestIdleCallback(()=>f(!0));return()=>o.cancelIdleCallback(r)}},[d,c,n,t,s]);let g=r.useCallback(()=>{f(!1)},[]);return[p,s,g]};var r=n(7294),o=n(4686);let i="function"==typeof IntersectionObserver,a=new Map,l=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2675:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getImageBlurSvg=function(e){let{widthInt:t,heightInt:n,blurWidth:r,blurHeight:o,blurDataURL:i}=e,a=r||t,l=o||n,u=i.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return a&&l?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 ".concat(a," ").concat(l,"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='").concat(r&&o?"1":"20","'/%3E").concat(u,"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='").concat(i,"'/%3E%3C/svg%3E"):"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' x='0' y='0' height='100%25' width='100%25' href='".concat(i,"'/%3E%3C/svg%3E")}},9824:function(e,t){"use strict";function n(e){let{config:t,src:n,width:r,quality:o}=e;return n.endsWith(".svg")&&!t.dangerouslyAllowSVG?n:"".concat(t.path,"?url=").concat(encodeURIComponent(n),"&w=").concat(r,"&q=").concat(o||75)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n.__next_img_default=!0,t.default=n},5675:function(e,t,n){e.exports=n(9749)},1664:function(e,t,n){e.exports=n(1551)},1163:function(e,t,n){e.exports=n(880)},75:function(e,t,n){var r=n(3454);(function(){var t,n,o,i;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:null!=r&&r.hrtime?(e.exports=function(){return(t()-i)/1e6},n=r.hrtime,i=(t=function(){var e;return 1e9*(e=n())[0]+e[1]})()-1e9*r.uptime()):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return new Date().getTime()-o},o=new Date().getTime())}).call(this)},7236:function(e){var t=null,n=["Webkit","Moz","O","ms"];e.exports=function(e){t||(t=document.createElement("div"));var r=t.style;if(e in r)return e;for(var o=e.charAt(0).toUpperCase()+e.slice(1),i=n.length;i>=0;i--){var a=n[i]+o;if(a in r)return a}return!1}},4087:function(e,t,n){for(var r=n(75),o="undefined"==typeof window?n.g:window,i=["moz","webkit"],a="AnimationFrame",l=o["request"+a],u=o["cancel"+a]||o["cancelRequest"+a],c=0;!l&&c<i.length;c++)l=o[i[c]+"Request"+a],u=o[i[c]+"Cancel"+a]||o[i[c]+"CancelRequest"+a];if(!l||!u){var s=0,f=0,d=[],p=1e3/60;l=function(e){if(0===d.length){var t=r(),n=Math.max(0,p-(t-s));s=n+t,setTimeout(function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(s)}catch(n){setTimeout(function(){throw n},0)}},Math.round(n))}return d.push({handle:++f,callback:e,cancelled:!1}),f},u=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return l.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=l,e.cancelAnimationFrame=u}},6189:function(e,t,n){var r=n(7966);e.exports=function(e){return r(e).replace(/\s(\w)/g,function(e,t){return t.toUpperCase()})}},1788:function(e){e.exports=function(e){return t.test(e)?e.toLowerCase():n.test(e)?(e.replace(o,function(e,t){return t?" "+t:""})||e).toLowerCase():r.test(e)?e.replace(i,function(e,t,n){return t+" "+n.toLowerCase().split("").join(" ")}).toLowerCase():e.toLowerCase()};var t=/\s/,n=/(_|-|\.|:)/,r=/([a-z][A-Z]|[A-Z][a-z])/,o=/[\W_]+(.|$)/g,i=/(.)([A-Z]+)/g},7966:function(e,t,n){var r=n(1788);e.exports=function(e){return r(e).replace(/[\W_]+(.|$)/g,function(e,t){return t?" "+t:""}).trim()}}}]);