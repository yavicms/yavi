!function r(i,o,a){function u(n,t){if(!o[n]){if(!i[n]){var e="function"==typeof require&&require;if(!t&&e)return e(n,!0);if(s)return s(n,!0);throw new Error("Cannot find module '"+n+"'")}t=o[n]={exports:{}};i[n][0].call(t.exports,function(t){var e=i[n][1][t];return u(e||t)},t,t.exports,r,i,o,a)}return o[n].exports}for(var s="function"==typeof require&&require,t=0;t<a.length;t++)u(a[t]);return u}({1:[function(t,e,n){"use strict";t("./index")},{"./index":2}],2:[function(t,e,n){"use strict";t("yavi/dom"),t("yavi/dom/lib/prototype"),t("yavi/dom/lib/view"),t("./lib/modal")},{"./lib/modal":3,"yavi/dom":4,"yavi/dom/lib/prototype":6,"yavi/dom/lib/view":9}],3:[function(t,e,n){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var u=document.createElement("div");u.count=0,u.id="modal-location",document.querySelector(".app").append(u),window.Modal=function(e){(e=e||{}).id="modal"+u.count++,e.btn_ok||(e.btn_ok="OK"),e.btn_cancel||(e.btn_cancel="Cancel"),e.class||(e.class="");var t,n={props:e,content:e.content,_ishook:"object"===a(e.content)},r=View('\n<form class="modal {% props.class %}" action="#">\n    <input id="{% props.id %}" name="toggle" type="checkbox" />\n    <label for="{% props.id %}" class="overlay"></label>\n    <article>\n        {% if(props.title){ %}\n            <header>\n                <h3>{% props.title %}</h3>\n                <label for="{% props.id %}" class="close">&times;</label>\n            </header>\n            <section class="content">{% props.content %}</section>\n            <footer>\n                <button type="submit" class="button">{% props.btn_ok %}</button>\n                <label for="{% props.id %}" class="button dangerous">\n                    {% props.btn_cancel %}\n                </label>\n            </footer>\n        {% }else{ %}\n            <section class="content">{% _ishook ? hook(\'content\') : props.content %}</section>\n        {% } %}\n    </article>\n</form>\n    ',n),i=r.toggle,o={get show(){return function(){t||(t=1,View.render(r,u)),i.checked=!0}},get hide(){return function(){i.checked=!1}},get remove(){return function(){i.checked=!1,setTimeout(function(){r.remove(),o=null},1e3)}}};return r.toggle.onchange=function(){!this.checked&&e.cancel?e.cancel(r):this.checked=!1},r.onsubmit=function(t){t.preventDefault(),r.toggle.checked&&e.ok?e.ok(r):this.checked=!1},o}},{}],4:[function(t,e,n){"use strict";var r=t("yavi/dom/lib/ws"),i={};Object.defineProperties(window,{Yavi:{writable:!1,value:t("yavi/lib")},ajax:{writable:!1,value:t("yavi/dom/lib/ajax")},WS:{writable:!1,value:function(t,e){return t=(t=t||document.location.origin).replace(/^http/,"ws"),i[t]||(i[t]=new r(t,e)),i[t]}},spa:{writable:!1,value:function(t,e,n){return t.html(e).then(function(t){return Promise.all([document.title=t.title,history.pushState(null,"",e),n&&n(t)])})}}})},{"yavi/dom/lib/ajax":5,"yavi/dom/lib/ws":10,"yavi/lib":14}],5:[function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var r,a,u,s;function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==i(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!==i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===i(t)?t:String(t)}(r.key),r)}}function l(t,e,n){var r=t;if(e.has(r))throw new TypeError("Cannot initialize the same private elements twice on an object");e.set(t,n)}function f(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n}function p(t,e){e=function(t,e,n){if(e.has(t))return e.get(t);throw new TypeError("attempted to "+n+" private field on non-instance")}(t,e,"get");return e.get?e.get.call(t):e.value}var h=new DOMParser,y=t("yavi/lib").is;function b(n){return new Promise(function(t,e){n.success=t,n.error=e,new r(n)})}e.exports=(a=new WeakMap,u=new WeakMap,s=new WeakMap,r=function(){function o(t){if(!(this instanceof o))throw new TypeError("Cannot call a class as a function");l(this,a,{writable:!0,value:new XMLHttpRequest}),l(this,u,{writable:!0,value:document.createElement("a")}),l(this,s,{writable:!0,value:{header:{"X-Requested-With":"XMLHttpRequest"},method:"get",type:"json"}}),Object.assign(this,t),p(this,a).open(this.method,p(this,u).href,!0),p(this,a).send(p(this,s).data)}var t,e,n;return t=o,n=[{key:"get",value:function(t,e){return f(this,r,b).call(this,{method:"get",url:t,data:e})}},{key:"put",value:function(t,e){return f(this,r,b).call(this,{method:"put",url:t,data:e})}},{key:"post",value:function(t,e){return f(this,r,b).call(this,{method:"post",url:t,data:e})}},{key:"delete",value:function(t,e){return f(this,r,b).call(this,{method:"delete",url:t,data:e})}},{key:"html",value:function(t,e){return f(this,r,b).call(this,{method:"get",type:"html",url:t,data:e})}},{key:"text",value:function(t,e){return f(this,r,b).call(this,{method:"get",type:"text",url:t,data:e})}},{key:"json",value:function(t,e){return f(this,r,b).call(this,{method:"get",type:"json",url:t,data:e})}},{key:"upload",value:function(n,r,i){return new Promise(function(t,e){return new o({url:n,file:r,success:t,error:e,progress:i})})}}],(e=[{key:"method",get:function(){return p(this,s).method},set:function(t){p(this,s).method=t.toUpperCase()}},{key:"url",set:function(t){p(this,u).href=t}},{key:"type",set:function(t){y(t,"undefined")||(p(this,s).type=t)}},{key:"header",set:function(t){var n=this;loop(Object.assign(p(this,s).header,t),function(t,e){return p(n,a).setRequestHeader(e,t)})}},{key:"query",set:function(t){switch(y(t)){case"string":p(this,u).search=t;break;case"object":var n=[p(this,u).search];loop(t,function(t,e){return n.push("".concat(e,"=").concat(t))}),p(this,u).search=n.join("&")}}},{key:"data",set:function(t){y(t,"object")&&(p(this,s).header["Content-Type"]="GET"===this.method?"text/plain":"application/json",p(this,s).data=JSON.stringify(t))}},{key:"file",set:function(t){this.method="post",this.type="text",p(this,s).header["Content-Type"]=t.type,p(this,s).data=t,this.hasFile=!0}},{key:"success",set:function(t){var e=p(this,s).type;try{"function"==typeof t&&(p(this,a).onreadystatechange=function(){if(4===this.readyState&&200===this.status)switch(e){case"json":return t(JSON.parse(this.responseText));case"html":return t(h.parseFromString(this.responseText,"text/html"));case"text":return t(this.responseText);default:throw t("Ajax Error: Has not response type: ".concat(e))}})}catch(t){throw t}}},{key:"progress",set:function(e){y(e,"function")&&(this.hasFile?p(this,a).upload.onprogress=function(t){return e(t.loaded/t.total)}:p(this,a).onprogress=function(t){return e(t.loaded)})}},{key:"error",set:function(t){y(t,"function")&&(p(this,a).onerror=t)}}])&&c(t.prototype,e),n&&c(t,n),Object.defineProperty(t,"prototype",{writable:!1}),o}())},{"yavi/lib":14}],6:[function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i=t("yavi/lib/event"),o=t("./view"),a=t("./view-hook");Object.defineProperties(HTMLElement.prototype,{html:{writable:!1,value:function(t){switch(r(t)){case"undefined":return this.innerHTML;case"string":case"number":this.innerHTML=t;break;case"object":t.nodeType&&(this.innerHTML="",this.append(t))}return this}},text:{writable:!1,value:function(t){switch(r(t)){case"undefined":return this.innerText;case"string":case"number":this.innerText=t;break;case"object":t.nodeType&&(this.innerText=t.innerText)}return this}},val:{writable:!1,value:function(t){return void 0===t?this.value:(this.value=t,this)}},css:{writable:!1,value:function(t,e){switch(r(t)){case"object":for(var n in t)this.style[n]=t[n];break;case"string":if(!e)return this.style[t];this.style[t]=e}return this}},toggle:{writable:!1,value:function(){this.style.display="none"===this.style.display?"":"none"}},show:{writable:!1,value:function(){return this.style.display="",this}},hide:{writable:!1,value:function(){return this.style.display="none",this}},toggleClass:{writable:!1,value:function(t){return this.classList.contains(t)?this.classList.remove(t):this.classList.add(t),this}},addClass:{writable:!1,value:function(t){return this.classList.add(t),this}},removeClass:{writable:!1,value:function(t){return this.classList.remove(t),this}},changeClass:{writable:!1,value:function(t,e){return this.classList.replace(t,e),this}},attr:{writable:!1,value:function(t,e){switch(r(t)){case"object":for(var n in t)this.setAttribute(n,e);break;case"string":if(void 0===e)return this.getAttribute(t);this.setAttribute(t,e)}return this}},__events:{writable:!1,value:new i},on:{writable:!1,value:function(t,e){return this.__events.on(t,e),this}},emit:{writable:!1,value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return this.__events.emit.apply(this.__events,e)}},hook:{writable:!1,value:function(t){return a(this,".hook-"+t)}},prev:{get:function(){return this.previousSibling}},next:{get:function(){return this.nextSibling}},parent:{writable:!1,value:function(t){return t?this.closest(t):this.parentNode}},find:{writable:!1,value:function(t){switch(r(t)){case"number":return[this.childNodes[t]];case"string":return this.querySelectorAll(t)}}},findOne:{writable:!1,value:function(t){switch(r(t)){case"number":return this.childNodes[t];case"string":return this.querySelector(t)}}},copy:{writable:!1,value:function(t){return o(this.__text,t||this.__props,this.__callback)}}})},{"./view":9,"./view-hook":8,"yavi/lib/event":11}],7:[function(t,e,n){"use strict";var i;function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,s(r.key),r)}}function s(t){t=function(t,e){if("object"!==a(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===a(t)?t:String(t)}function c(t,e,n){if(t!==e)throw new TypeError("Private static access of wrong provenance");return n}var l=t("yavi/lib").loop;function f(t){function n(t,e){return o+=e?t.match(i)?t:"r.push("+t+");":""!=t?"r.push('"+t.replace(/'/g,"&#39")+"');":"",n}var e,r=/\{\%(.+?)\%\}/g,i=/(^( )?(var|if|for|else|elseif|switch|case|break|default|\:|\{|\}|\(|\)|\+|\-|\*|\\))(.*)?/g,o="with(YaviData){ var r=[];",a=0;for(t=t.replace(/[\n\r\t]/g,"");e=r.exec(t);)n(t.slice(a,e.index))(e[1],!0),a=e.index+e[0].length;return n(t.substr(a,t.length-a)),o+"return r.join('');}"}e.exports=i=function(){function o(t){var e,n,r,i;if(!(this instanceof o))throw new TypeError("Cannot call a class as a function");e=this,r={},(n=s(n="__hooks"))in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,"object"===a(t)&&(i=this,l(t,function(t,e){"object"===a(t)&&t.__ishook?i.__hooks[e]=t:i[e]=t}))}var t,e,n;return t=o,n=[{key:"html",value:function(t,e){try{return new Function("YaviData",c(this,i,f).call(this,t))(e)}catch(t){return console.log(t),""}}},{key:"map",value:function(t,e){var n,i,o=[];for(i in t)(n=e(t[i],i))&&o.push(n);return r.join("")}}],(e=[{key:"hook",value:function(t){return this.__hooks[t]?'<span class="hook-'+t+'"></span>':""}},{key:"map",value:function(t,e){return o.map(t,e)}}])&&u(t.prototype,e),n&&u(t,n),Object.defineProperty(t,"prototype",{writable:!1}),o}()},{"yavi/lib":14}],8:[function(t,e,n){"use strict";function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,o,a,u=[],s=!0,c=!1;try{if(o=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=o.call(n)).done)&&(u.push(r.value),u.length!==e);s=!0);}catch(t){c=!0,i=t}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw i}}return u}}(t,e)||function(t,e){var n;if(t)return"string"==typeof t?r(t,e):"Map"===(n="Object"===(n=Object.prototype.toString.call(t).slice(8,-1))&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var a=t("yavi/lib").loop;e.exports=function(n,r){return{get append(){return function(t){n.emit(r,t,"append")}},get prepend(){return function(t){n.emit(r,t,"prepend")}},get remove(){return function(t){n.emit(r,t,"remove")}},get set(){return function(t){n.emit(r,t,"replace")}},get emit(){return function(){for(var t=arguments.length,i=new Array(t),e=0;e<t;e++)i[e]=arguments[e];n.emit(r).then(function(t){a(t,function(t){for(var t=o(t,2),e=t[0],n=t[1],r=e.nextSibling;r!==n;)r.emit.apply(r,i),r=r.nextSibling})})}}}}},{"yavi/lib":14}],9:[function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=new DOMParser,a=t("./view-data"),s=t("yavi/lib").loop;function c(t,e,n){var r=new a(e),i=a.html(t,r),u=o.parseFromString(i,"text/html").body.childNodes[0];return u.__text=t,u.__callback=n,u.__props=e,u.__ishook=1,r.__hooks&&s(r.__hooks,function(o,t){var n,a=".hook-"+t;s(u.querySelectorAll(a),function(t){var e=document.createDocumentFragment(),r=document.createComment("start"),i=document.createComment("end");n=n?c(o.__text,o.__props,o.__callback):o,e.append(r),e.append(n),e.append(i),u.on(a,function(t,e){if(!arguments.length)return[r,i];switch(t=t||o.__props,e){case"append":u.insertBefore(c(o.__text,t,o.__callback),i);break;case"prepend":u.insertBefore(c(o.__text,t,o.__callback),r.nextSibling);break;case"remove":for(var n=r.nextSibling;n!==i;)n.remove(),n=r.nextSibling;break;default:for(n=r.nextSibling;n!==i;)n.remove(),n=r.nextSibling;u.insertBefore(c(o.__text,t,o.__callback),i)}}),u.insertBefore(e,t),t.remove()})}),n&&n(u),u}Object.defineProperty(c,"render",{writable:!1,value:function(t,e){switch(r(e)){case"string":document.querySelector(e).append(t);break;case"object":e.append(t)}}}),window.View=c},{"./view-data":7,"yavi/lib":14}],10:[function(t,e,n){"use strict";var i,o,a,u,s,c,l,f,p,h;function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==y(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!==y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===y(t)?t:String(t)}(r.key),r)}}function v(t,e){r(t,e),e.add(t)}function m(t,e,n){r(t,e),e.set(t,n)}function r(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function d(t,e,n){if(e.has(t))return n;throw new TypeError("attempted to get private field on non-instance")}function w(t,e){e=k(t,e,"get");return e.get?e.get.call(t):e.value}function g(t,e,n){e=k(t,e,"set");if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}function k(t,e,n){if(e.has(t))return e.get(t);throw new TypeError("attempted to "+n+" private field on non-instance")}var t=t("yavi/lib"),S=t.is,j=t.qs,_=t.Event,x=new DOMParser,P=new RegExp("^/(public|favicon)");function T(e){var t;e[2]?"function"==typeof(t=w(this,a)[e[0]])&&t(e[1]):(t=w(this,o)[e[0]]).length&&t.forEach(function(t){return t(e[1])})}function O(t,e,n){var r=0;return"function"==typeof n&&(w(this,a)[t]=n,r=1),[t,e,r]}function E(t){var r=this,i=JSON.stringify(t);setTimeout(function t(){var e,n;w(r,c)?w(r,u).length?(w(r,u).forEach(function(t){return w(r,s).send(t)}),g(r,u,[])):(g(r,l,(e=w(r,l),n=e++,e)),100<n?clearTimeout(t):w(r,s).send(i)):(w(r,u).push(i),setTimeout(t,10))})}e.exports=(i=new WeakMap,o=new WeakMap,a=new WeakMap,u=new WeakMap,s=new WeakMap,c=new WeakMap,l=new WeakMap,f=new WeakSet,p=new WeakSet,h=new WeakSet,function(){function r(t,e){var n=this;if(!(this instanceof r))throw new TypeError("Cannot call a class as a function");v(this,h),v(this,p),v(this,f),m(this,i,{writable:!0,value:new _}),m(this,o,{writable:!0,value:{}}),m(this,a,{writable:!0,value:{}}),m(this,u,{writable:!0,value:[]}),m(this,s,{writable:!0,value:null}),m(this,c,{writable:!0,value:!1}),m(this,l,{writable:!0,value:0}),g(this,s,new WebSocket(t,e)),w(this,s).onmessage=function(t){return d(n,f,T).call(n,JSON.parse(t.data))},w(this,s).onopen=function(t){n.connected(!0),w(n,i).emit("open",t)},w(this,s).onerror=function(t){n.connected(!1),w(n,i).emit("error",t)},w(this,s).onclose=function(t){n.connected(!1),w(n,i).emit("close",t)}}var t,e,n;return t=r,(e=[{key:"connected",value:function(t){if(void 0===t)return w(this,c);g(this,c,t)}},{key:"open",value:function(t){w(this,i).on("open",t)}},{key:"error",value:function(t){w(this,i).on("error",t)}},{key:"close",value:function(t){w(this,i).on("close",t)}},{key:"emit",value:function(t,e,n){d(this,h,E).call(this,d(this,p,O).call(this,t,e,n))}},{key:"on",value:function(t,e){w(this,o)[t]||(w(this,o)[t]=[]),w(this,o)[t].push(e)}},{key:"html",value:function(t,r){var i=this;return new Promise(function(e,n){return i.request({path:t,body:r,method:"get",type:"html",success:function(t){"string"==typeof t?e(x.parseFromString(t,"text/html")):n()},error:n})})}},{key:"json",value:function(){var t,r=this;switch(arguments.length){case 1:S.object(arguments.length<=0?void 0:arguments[0])&&(t=arguments.length<=0?void 0:arguments[0]);break;case 2:t={path:arguments.length<=0?void 0:arguments[0],body:arguments.length<=1?void 0:arguments[1],method:"get"};break;case 3:t={method:arguments.length<=0?void 0:arguments[0],path:arguments.length<=1?void 0:arguments[1],body:arguments.length<=2?void 0:arguments[2]}}return t?new Promise(function(e,n){return r.request(Object.assign(t,{type:"json",success:function(t){"object"===y(t)?e(t):n()},error:n}))}):Promise.reject()}},{key:"request",value:function(t){var e,n;"object"!==y(t)||P.test(t.path)||(e=document.createElement("a"),n=t.success,e.href=t.path,t.path=e.pathname,t.query=j(e.search),t.method||(t.method="get"),t.type||(t.type="json"),this.emit("http.request",t,n))}},{key:"get",value:function(n,r){var i=this;return new Promise(function(t,e){return i.request({method:"get",path:n,body:r,success:t,error:e})})}},{key:"put",value:function(n,r){var i=this;return new Promise(function(t,e){return i.request({method:"put",path:n,body:r,success:t,error:e})})}},{key:"post",value:function(n,r){var i=this;return new Promise(function(t,e){return i.request({method:"post",path:n,body:r,success:t,error:e})})}},{key:"delete",value:function(n,r){var i=this;return new Promise(function(t,e){return i.request({method:"delete",path:n,body:r,success:t,error:e})})}},{key:"api",value:function(n,r,i){var o=this;return new Promise(function(t,e){return o.request({method:n,body:i,success:t,error:e,path:"/api/"+r})})}}])&&b(t.prototype,e),n&&b(t,n),Object.defineProperty(t,"prototype",{writable:!1}),r}())},{"yavi/lib":14}],11:[function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o;function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==i(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!==i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===i(t)?t:String(t)}(r.key),r)}}function u(t,e,n){var r=t;if(e.has(r))throw new TypeError("Cannot initialize the same private elements twice on an object");e.set(t,n)}function s(t,e,n){e=r(t,e,"set");if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}function c(t,e){e=r(t,e,"get");return e.get?e.get.call(t):e.value}function r(t,e,n){if(e.has(t))return e.get(t);throw new TypeError("attempted to "+n+" private field on non-instance")}e.exports=(o=new WeakMap,function(){function t(){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function");u(this,o,{writable:!0,value:{}})}var e,n,r;return e=t,(n=[{key:"on",value:function(t,e){c(this,o)[t]||(c(this,o)[t]=[]),c(this,o)[t].push(e)}},{key:"emit",value:function(t){for(var e=arguments.length,n=new Array(1<e?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];t=c(this,o)[t]||[];return Promise.all(t.map(function(t){return t.apply(null,n)}))}},{key:"remove",value:function(t){delete c(this,o)[t]}},{key:"reset",value:function(){s(this,o,{})}}])&&a(e.prototype,n),r&&a(e,r),Object.defineProperty(e,"prototype",{writable:!1}),t}())},{}],12:[function(t,e,n){"use strict";var u=t("./is");e.exports=function(t,e){var n;switch(u(t)){case"array":for(var r=[],i=0,o=t.length;i<o;i++)(n=e(t[i],i))&&r.push(n);break;case"object":for(var a in r={},t)(n=e(t[a],a))&&(r[a]=n)}return r}},{"./is":15}],13:[function(t,e,n){"use strict";var a=t("./is");e.exports=function(t,e){var n;switch(a(t)){case"array":for(var r=0,i=t.length;r<i&&!(n=e(t[r],r));r++);break;case"object":for(var o in t)if(n=e(t[o],o))break}return n}},{"./is":15}],14:[function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==o(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0===n)return("string"===e?String:Number)(t);n=n.call(t,e||"default");if("object"!==o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return"symbol"===o(t)?t:String(t)}(r.key),r)}}function i(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var t=[["menu",t("./menu")],["find",t("./find")],["findOne",t("./findOne")],["loop",t("./loop")],["remove",t("./remove")],["map",t("./map")],["is",t("yavi/lib/is")],["qs",t("yavi/lib/query-string")],["Event",t("yavi/lib/event")],["copy",function(t){return"object"===o(t)?JSON.parse(JSON.stringify(t)):t}],["assign",function(t,e){return Object.assign(t,e)}]],a=i(function t(){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function")});t.forEach(function(t){return Object.defineProperty(a,t[0],{writable:!1,value:t[1]})}),e.exports=a},{"./find":12,"./findOne":13,"./loop":16,"./map":17,"./menu":18,"./remove":20,"yavi/lib/event":11,"yavi/lib/is":15,"yavi/lib/query-string":19}],15:[function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){var n=r(t);return"object"===n&&void 0!==t.length?e?"array"===e:"array":e?e===n:n}["string","number","undefined","boolean","object","array","function"].forEach(function(e){return Object.defineProperty(i,e,{writable:!1,value:function(t){return i(t,e)}})}),[["email",function(t){return"string"==typeof t&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}],["phone",function(t){return"string"==typeof t&&/^\d{9,15}$/.test(t)}],["password",function(t){return"string"==typeof t&&/^[^\t\n]{8,200}$/.test(t)}],["plugin",function(t){return/(plugin|theme|admin)[a-zA-Z0-9\-]+/.test(t)}]].forEach(function(t){return Object.defineProperty(i,t[0],{writable:!1,value:t[1]})}),e.exports=i},{}],16:[function(t,e,n){"use strict";var i=t("./is");e.exports=function(t,e){switch(i(t)){case"array":for(var n=0,r=t.length;n<r&&!e(t[n],n);n++);break;case"object":for(var n in t)if(e(t[n],n))break}}},{"./is":15}],17:[function(t,e,n){"use strict";var u=t("./is");e.exports=function(t,e){switch(u(t)){case"array":for(var n=[],r=0,i=t.length;r<i;r++)n.push(e(t[r]));break;case"object":for(var o in n={},t){var a=e(t[o],o);void 0!==a&&(n[o]=a)}}return n}},{"./is":15}],18:[function(t,e,n){"use strict";var u=t("yavi/lib/is");e.exports=function t(e,n,r,i){var o,a=[];if(void 0===i){if(r=0,!u.array(e))return a;i=e.length}for(;r<i;r++)(o=e[r]).parent==n&&(o.children=t(e,o.name,r,i),a.push(o));return a}},{"yavi/lib/is":15}],19:[function(t,e,n){"use strict";function r(t){var e={},t=t.split("?")[1];if(t)for(var n,r=0,i=(n=decodeURIComponent(t).split(/[=&]/)).length;r<i;r++)e[n[r]]=n[++r];return e}r.string=function(t){var e=[];if(t)for(var n in t)e.push([n,t[n]].join("="));return"?"+e.join("&")},e.exports=r},{}],20:[function(t,e,n){"use strict";var i=t("yavi/lib/is");e.exports=function(t,e){switch(i(t)){case"array":for(var n=0,r=t.length;n<r;n++)if(e(t[n],n)){t.splice(n,1);break}break;case"object":for(var n in t)if(e(t[n],n)){delete t[n];break}}}},{"yavi/lib/is":15}]},{},[1]);