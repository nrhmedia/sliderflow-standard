"use strict";(()=>{function oe(){document.querySelector("[fs-richtext-component]")?ne():setTimeout(function(){oe()},500)}document.addEventListener("DOMContentLoaded",()=>{ne(),oe()});function ne(){document.querySelectorAll(".swiper.is-standard").forEach((s,le)=>{let a=s.parentElement.querySelector(".swiper-navigation.is-standard"),ue="left-to-right",de="first",ce=!0,W="slide",pe=!0,fe=!1,We=!0,w=1e3,H=5e3,be=!0,ge=!0,we=!1,Se=4,ye=3,me=2,Pe=1,ve=16,he=12,Me=8,Ae=4,z=1,S=(e,t)=>{let i=s.getAttribute(e);return!i||i==="default"?t:!isNaN(i)&&Number(i)>0?Number(i):t},y=(e,t)=>{let i=s.getAttribute(e);return!i||i==="default"||isNaN(i)?t:Number(i)},m=e=>{let t=s.getAttribute(e);return!t||t==="default"?w:!isNaN(t)&&Number(t)>0?Number(t):w},P=e=>{let t=s.getAttribute(e);return t==="false"?!1:t==="marquee"?z:t==="true"||!t||t==="default"?H:!isNaN(t)&&Number(t)>0?Number(t):H},v=e=>{let t=s.getAttribute(e);return!t||t==="default"?!1:t==="true"},h=e=>{let t=s.getAttribute(e);return!t||t==="default"?!1:t==="true"},He=(e,t)=>{let i=s.getAttribute(e);return i===null||i==="default"||i===""?t:i},M=(e,t)=>{let i=s.getAttribute(e);return!i||i==="default"?t:i==="true"},f=(e,t)=>{let i=s.getAttribute(e);if(!i||i==="default")return t;let o=parseFloat(i);return isNaN(o)?t:o},Le=(e,t)=>{let i=s.getAttribute(e);return!(i==="false"||i==="0")},Be=(e,t)=>{let i=s.getAttribute(e);return!(i==="false"||i==="0")},A=e=>{let t=s.getAttribute(e);if(!t||t==="default")return 1;let i=Number(t);return!isNaN(i)&&i>0?i:1},ke=e=>e.getAttribute("swiperAllowTouchMove")!=="false",qe=s.getAttribute("swiperDirection")||ue,L=s.getAttribute("swiperSlideStart")||de,O=s.getAttribute("swiperFillEmptySlots")||ce.toString(),$=s.getAttribute("swiperEffect")||W,B=M("swiperCenteredSlides",we),n={desktop:S("swiperSlidesPerViewDesktop",Se),tablet:S("swiperSlidesPerViewTablet",ye),mobileLandscape:S("swiperSlidesPerViewMobileLandscape",me),mobilePortrait:S("swiperSlidesPerViewMobilePortrait",Pe)},k={desktop:A("swiperSlidesPerGroupDesktop"),tablet:A("swiperSlidesPerGroupTablet"),mobileLandscape:A("swiperSlidesPerGroupMobileLandscape"),mobilePortrait:A("swiperSlidesPerGroupMobilePortrait")},j=Math.max(n.desktop,n.tablet,n.mobileLandscape,n.mobilePortrait),Ve=(e,t)=>{let i=e.querySelectorAll(".swiper-slide").length,o=e.offsetWidth,Re=o/t,ie=Math.ceil(o/Re)-i;if(ie>0){let se=e.querySelector(".swiper-wrapper"),Ie=se.innerHTML,re="";for(let ae=0;ae<ie;ae++)re+=Ie;se.innerHTML+=re}},X=O==="true"||O==="default"||!O;X&&Ve(s,j);let J=s.querySelectorAll(".swiper-slide").length,Ne=J>j,q=M("swiperLoop",fe)&&Ne,K=!q&&M("swiperRewind",pe),Q=qe==="right-to-left",G=0;L==="last"?G=J-1:!isNaN(L)&&Number(L)>=0&&(G=Number(L));let U=`swiper-instance-${le}`;s.classList.add(U);let De=e=>{let t=`
        .${e} .swiper-wrapper {
          -webkit-transition-timing-function: linear !important;
          -o-transition-timing-function: linear !important;
          transition-timing-function: linear !important;
        }
      `,i=document.getElementById(`marquee-style-${e}`);i&&i.remove();let o=document.createElement("style");o.id=`marquee-style-${e}`,o.textContent=t,document.head.appendChild(o)};(s.getAttribute("swiperAutoplayDesktop")==="marquee"||s.getAttribute("swiperAutoplayTablet")==="marquee"||s.getAttribute("swiperAutoplayMobileLandscape")==="marquee"||s.getAttribute("swiperAutoplayMobilePortrait")==="marquee")&&De(U);let V={desktop:y("swiperSpaceBetweenDesktop",ve),tablet:y("swiperSpaceBetweenTablet",he),mobileLandscape:y("swiperSpaceBetweenMobileLandscape",Me),mobilePortrait:y("swiperSpaceBetweenMobilePortrait",Ae)},N={desktop:m("swiperSpeedDesktop"),tablet:m("swiperSpeedTablet"),mobileLandscape:m("swiperSpeedMobileLandscape"),mobilePortrait:m("swiperSpeedMobilePortrait")},D={desktop:P("swiperAutoplayDesktop"),tablet:P("swiperAutoplayTablet"),mobileLandscape:P("swiperAutoplayMobileLandscape"),mobilePortrait:P("swiperAutoplayMobilePortrait")},T={desktop:h("swiperDynamicBulletsDesktop"),tablet:h("swiperDynamicBulletsTablet"),mobileLandscape:h("swiperDynamicBulletsMobileLandscape"),mobilePortrait:h("swiperDynamicBulletsMobilePortrait")},C={desktop:v("swiperPauseOnMouseEnterDesktop"),tablet:v("swiperPauseOnMouseEnterTablet"),mobileLandscape:v("swiperPauseOnMouseEnterMobileLandscape"),mobilePortrait:v("swiperPauseOnMouseEnterMobilePortrait")},p=a.querySelector(".swiper-pagination.is-bullets.is-standard"),Te=["swiper-pagination-bullet","swiper-bullet-default","is-standard","swiper-pagination-bullet-active"],Ce=p?Array.from(p.children).flatMap(e=>Array.from(e.classList)).filter(e=>!Te.includes(e)):[],c=a.querySelector(".swiper-pagination.is-fraction.is-standard"),Y=a.querySelector(".swiper-pagination.swiper-scrollbar.is-standard"),l=a.querySelector(".swiper-pagination.swiper-pagination-progressbar.is-standard"),xe=p||c||l||Y,b=W;$&&!["none","0","","default","slide"].includes($)&&(b=$);let g=["fade","cube","flip","cards"].includes(b),Z={};b==="coverflow"&&(Z.coverflowEffect={rotate:f("swiperEffectCoverflowRotate",50),stretch:f("swiperEffectCoverflowStretch",0),depth:f("swiperEffectCoverflowDepth",100),modifier:f("swiperEffectCoverflowModifier",1),slideShadows:M("swiperEffectCoverflowSlideShadows",!0),scale:f("swiperEffectCoverflowScale",1)});let Ee=g?1:n.mobilePortrait,Fe=(()=>{let e=s.getAttribute("swiperGrabCursor");return e===null||e==="default"||e==="true"||e===""})(),Oe=Le("swiperFreeMode",be),$e=Be("swiperFreeModeMomentumBounce",ge),Ge=ke(s),x=e=>e===!1?!1:e==="marquee"?{delay:z,disableOnInteraction:!1,reverseDirection:Q,pauseOnMouseEnter:!1,enabled:!0}:e?{delay:e,disableOnInteraction:!1,reverseDirection:Q,pauseOnMouseEnter:!1,enabled:!0}:!1,E=a.querySelector(".swiper-navigation-button.is-standard.is-next"),F=a.querySelector(".swiper-navigation-button.is-standard.is-prev"),u=a.querySelector(".swiper-navigation-button.is-standard.is-play"),d=a.querySelector(".swiper-navigation-button.is-standard.is-pause"),r=new Swiper(s,{effect:b,...Z,slidesPerView:Ee,slidesPerGroup:k.mobilePortrait,spaceBetween:V.mobilePortrait,speed:N.mobilePortrait,initialSlide:G,freeMode:{enabled:Oe,momentumBounce:$e},centeredSlides:B,allowTouchMove:Ge,pagination:{el:xe,type:p?"bullets":c?"fraction":l?"progressbar":"custom",dynamicBullets:T.mobilePortrait,renderBullet:p?function(e,t){return`<button class="${t} ${Ce.join(" ")} swiper-bullet-default is-standard"></button>`}:void 0,clickable:!!p,renderFraction:c?function(e,t){return`<span class="${e}"></span> / <span class="${t}"></span>`}:void 0,progressbarFillClass:"swiper-pagination-progressbar-fill is-standard"},scrollbar:{el:Y,dragClass:"swiper-scrollbar-drag is-standard",draggable:!0,snapOnRelease:!1,dragSize:"auto"},autoplay:x(D.mobilePortrait),loop:q,loopFillGroupWithBlank:X,rewind:K,grabCursor:Fe,breakpoints:{992:{slidesPerView:g?1:n.desktop,slidesPerGroup:k.desktop,spaceBetween:V.desktop,speed:N.desktop,autoplay:x(D.desktop),pagination:{dynamicBullets:T.desktop},centeredSlides:B},768:{slidesPerView:g?1:n.tablet,slidesPerGroup:k.tablet,spaceBetween:V.tablet,speed:N.tablet,autoplay:x(D.tablet),pagination:{dynamicBullets:T.tablet},centeredSlides:B},480:{slidesPerView:g?1:n.mobileLandscape,slidesPerGroup:k.mobileLandscape,spaceBetween:V.mobileLandscape,speed:N.mobileLandscape,autoplay:x(D.mobileLandscape),pagination:{dynamicBullets:T.mobileLandscape},centeredSlides:B}},on:{init:function(){if(c){let e=a.querySelector(".swiper-pagination-fraction-text");e&&(e.textContent=`${this.realIndex+1} / ${this.slides.length}`)}if(l){let e=l.querySelector(".swiper-pagination-progressbar-fill");if(e){let t=(this.realIndex+1)/this.slides.length;e.style.transform=`scaleX(${t})`}}R(this)},slideChange:function(){if(c){let e=a.querySelector(".swiper-pagination-fraction-text");e&&(e.textContent=`${this.realIndex+1} / ${this.slides.length}`)}if(l){let e=l.querySelector(".swiper-pagination-progressbar-fill");if(e){let t=(this.realIndex+1)/this.slides.length;e.style.transform=`scaleX(${t})`}}},reachEnd:function(){!K&&!q&&this.autoplay.stop()},scrollbarDragStart:function(){this.autoplay.stop(),this.params.loop=!1,this.update()},scrollbarDragEnd:function(){this.params.loop=q,this.update(),this.autoplay.start()},update:function(){R(this)},resize:function(){R(this)}}});g&&console.warn(`The "${b}" effect requires slidesPerView to be 1. Overriding slidesPerView to 1.`);function R(e){let{isLocked:t}=e;E&&(E.style.display=t?"none":""),F&&(F.style.display=t?"none":""),u&&(u.style.display=t?"none":""),d&&(d.style.display=t?"none":""),c&&(c.style.display=t?"none":""),l&&(l.style.display=t?"none":"")}E&&E.addEventListener("click",e=>{e.preventDefault(),r.autoplay.stop(),r.slideNext(w)}),F&&F.addEventListener("click",e=>{e.preventDefault(),r.autoplay.stop(),r.slidePrev(w)}),d&&d.addEventListener("click",e=>{e.preventDefault(),r.autoplay.stop()}),u&&u.addEventListener("click",e=>{e.preventDefault(),r.params.autoplay.enabled=!0,r.autoplay.start(),setTimeout(()=>{r.slideNext()},50)});let I=()=>{r.autoplay.running?(u&&(u.disabled=!0),d&&(d.disabled=!1)):(u&&(u.disabled=!1),d&&(d.disabled=!0))};I(),r.on("autoplayStart",()=>{I()}),r.on("autoplayStop",()=>{I()});let _=()=>{r.autoplay.stop(),r.setTranslate(r.translate)},ee=()=>{r.autoplay.start()},te=()=>{let{currentBreakpoint:e}=r,t=C.mobilePortrait;e>=992?t=C.desktop:e>=768?t=C.tablet:e>=480&&(t=C.mobileLandscape),t?(s.addEventListener("mouseenter",_),s.addEventListener("mouseleave",ee)):(s.removeEventListener("mouseenter",_),s.removeEventListener("mouseleave",ee))};te(),r.on("breakpoint",()=>{te()})})}})();
