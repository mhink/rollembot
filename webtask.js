module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),i=n(o),s=r(2),a=n(s),u=r(3),c=n(u),l=new i["default"];l.get("/",function(e,t){t.send("Tuesday Attempt 3")}),l.post("/twilio",c["default"]),t["default"]=a["default"].fromExpress(l),e.exports=t["default"]},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("webtask-tools")},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){console.log("Responding to Twilio:"),console.log('"'+t+'"');var r=new i.TwimlResponse;h.test(t)?r.message("Hmm. Something went wrong at the last moment. Try again later."):r.message(t),e.type("text/xml"),e.send(r.toString())}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=function(e,t,r){console.log("Starting TwilioHandler");var n=e.webtaskContext,i=n.body.Body,a=new u["default"](n.secrets);a.searchSubreddit("BehindTheTables",i).then(function(e){console.log("Found "+e.length+" results..."),console.log("Using searchResult: "+e[0].data.id);var t=new l["default"](i,e[0].data);return t.parse()}).then(function(e){return(0,s.map)(e,function(e){if(e.values.length>0){var t=e.rollForValue();return t}return""})}).then(function(e){return e.join("\n")}).then(function(e){return o(t,e)})["catch"](function(e){return o(t,e)})};var i=r(4),s=r(5),a=r(6),u=n(a),c=r(24),l=n(c),h=/^\s*$/;e.exports=t["default"]},function(e,t){e.exports=require("twilio")},function(e,t){e.exports=require("lodash")},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(7),a=n(s),u="nodejs:rollembot:v0.0.1 (by /u/mhink)",c=function(){function e(t){o(this,e),this.uname=t.REDDIT_USERNAME,this.pass=t.REDDIT_PASSWORD,this.clientId=t.REDDIT_CLIENT_ID,this.clientSecret=t.REDDIT_CLIENT_SECRET,this.token=null}return i(e,[{key:"searchSubreddit",value:function(e,t){var r=this;return new Promise(function(n,o){r.fetchAuthenticated("/r/"+e+"/search?q="+t+"&restrict_sr=true",{method:"GET"})["catch"](function(e){console.error("fetchAuthenticated failed with error:"),console.error(e),o("Something went wrong. :(")}).then(function(e){if("Listing"!==e.kind)console.error("Search API 'kind' field was not a Listing:"),console.error(e),o("Something went wrong with Reddit... :(");else if(e.data.children.length<=0)console.error("0 search results for term "+t),o('Sorry, I could find any tables like "'+t+'"');else{e.data.children;n(e.data.children)}})})}},{key:"fetchAuthenticated",value:function(e,t){var r=this;return new Promise(function(n,o){r.token?r.fetchWithToken(e,t).then(n)["catch"](o):r.fetchToken().then(r.fetchWithToken.bind(r,e,t)).then(n)["catch"](o)})}},{key:"fetchWithToken",value:function(e,t){var r="https://oauth.reddit.com"+e,n={};t&&Object.assign(n,t);var o={"User-Agent":u,Authorization:this._tokenAuth()};return n.headers?Object.assign(n.headers,o):n.headers=o,new Promise(function(e,t){(0,a["default"])(r,n).then(function(r){r.json().then(function(n){return r.ok?e(n):t(n)})["catch"](t)})})}},{key:"fetchToken",value:function(){var e=this,t="https://www.reddit.com/api/v1/access_token",r={"User-Agent":u,Authorization:this._basicAuth()},n="grant_type=password&username="+this.uname+"&password="+this.pass;return new Promise(function(o,i){(0,a["default"])(t,{method:"POST",headers:r,body:n}).then(function(t){t.json().then(function(r){t.ok?(e.token=r.access_token,o(e.token)):i(r)})["catch"](i)})})}},{key:"_tokenAuth",value:function(){return"bearer "+this.token}},{key:"_basicAuth",value:function(){var e=this.clientId+":"+this.clientSecret,t=Buffer(e,"binary");return"Basic "+t.toString("base64")}}]),e}();t["default"]=c,e.exports=t["default"]},function(e,t,r){function n(e,t){if(!(this instanceof n))return new n(e,t);if(!n.Promise)throw new Error("native promise missing, set Fetch.Promise to your favorite alternative");c.Promise=n.Promise;var r=this;return new n.Promise(function(c,p){var y=new f(e,t);if(!y.protocol||!y.hostname)throw new Error("only absolute urls are supported");if("http:"!==y.protocol&&"https:"!==y.protocol)throw new Error("only http(s) protocols are supported");var v;v="https:"===y.protocol?s.request:i.request;var b=new h(y.headers);y.compress&&b.set("accept-encoding","gzip,deflate"),b.has("user-agent")||b.set("user-agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"),b.has("connection")||y.agent||b.set("connection","close"),b.has("accept")||b.set("accept","*/*"),!b.has("content-type")&&y.body&&"function"==typeof y.body.getBoundary&&b.set("content-type","multipart/form-data; boundary="+y.body.getBoundary()),!b.has("content-length")&&/post|put|patch|delete/i.test(y.method)&&("string"==typeof y.body?b.set("content-length",Buffer.byteLength(y.body)):y.body&&"function"==typeof y.body.getLengthSync&&0==y.body._lengthRetrievers.length?b.set("content-length",y.body.getLengthSync().toString()):void 0!==y.body&&null!==y.body||b.set("content-length","0")),y.headers=b.raw(),y.headers.host&&(y.headers.host=y.headers.host[0]);var m,g=v(y);y.timeout&&g.once("socket",function(e){m=setTimeout(function(){g.abort(),p(new d("network timeout at: "+y.url,"request-timeout"))},y.timeout)}),g.on("error",function(e){clearTimeout(m),p(new d("request to "+y.url+" failed, reason: "+e.message,"system",e))}),g.on("response",function(e){if(clearTimeout(m),r.isRedirect(e.statusCode)&&"manual"!==y.redirect)return"error"===y.redirect?void p(new d("redirect mode is set to error: "+y.url,"no-redirect")):y.counter>=y.follow?void p(new d("maximum redirect reached at: "+y.url,"max-redirect")):e.headers.location?(303!==e.statusCode&&(301!==e.statusCode&&302!==e.statusCode||"POST"!==y.method)||(y.method="GET",delete y.body,delete y.headers["content-length"]),y.counter++,void c(n(o(y.url,e.headers.location),y))):void p(new d("redirect location header missing at: "+y.url,"invalid-redirect"));var t=new h(e.headers);"manual"===y.redirect&&t.has("location")&&t.set("location",o(y.url,t.get("location")));var i,s=e.pipe(new u.PassThrough),f={url:y.url,status:e.statusCode,statusText:e.statusMessage,headers:t,size:y.size,timeout:y.timeout};if(!y.compress||"HEAD"===y.method||!t.has("content-encoding")||204===e.statusCode||304===e.statusCode)return i=new l(s,f),void c(i);var v=t.get("content-encoding");if("gzip"==v||"x-gzip"==v)return s=s.pipe(a.createGunzip()),i=new l(s,f),void c(i);if("deflate"==v||"x-deflate"==v){var b=e.pipe(new u.PassThrough);return void b.once("data",function(e){s=8===(15&e[0])?s.pipe(a.createInflate()):s.pipe(a.createInflateRaw()),i=new l(s,f),c(i)})}i=new l(s,f),c(i)}),"string"==typeof y.body?(g.write(y.body),g.end()):y.body instanceof Buffer?(g.write(y.body),g.end()):"object"==typeof y.body&&y.body.pipe?y.body.pipe(g):g.end()})}var o=(r(8).parse,r(8).resolve),i=r(9),s=r(10),a=r(11),u=r(12),c=r(13),l=r(21),h=r(22),f=r(23),d=r(19);e.exports=n,e.exports["default"]=e.exports,n.prototype.isRedirect=function(e){return 301===e||302===e||303===e||307===e||308===e},n.Promise=global.Promise,n.Response=l,n.Headers=h,n.Request=f},function(e,t){e.exports=require("url")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("https")},function(e,t){e.exports=require("zlib")},function(e,t){e.exports=require("stream")},function(e,t,r){function n(e,t){t=t||{},this.body=e,this.bodyUsed=!1,this.size=t.size||0,this.timeout=t.timeout||0,this._raw=[],this._abort=!1}var o=r(14).convert,i=r(18),s=r(12).PassThrough,a=r(19);e.exports=n,n.prototype.json=function(){return this._decode().then(function(e){return JSON.parse(e.toString())})},n.prototype.text=function(){return this._decode().then(function(e){return e.toString()})},n.prototype.buffer=function(){return this._decode()},n.prototype._decode=function(){var e=this;return this.bodyUsed?n.Promise.reject(new Error("body used already for: "+this.url)):(this.bodyUsed=!0,this._bytes=0,this._abort=!1,this._raw=[],new n.Promise(function(t,r){var n;return"string"==typeof e.body?(e._bytes=e.body.length,e._raw=[new Buffer(e.body)],t(e._convert())):e.body instanceof Buffer?(e._bytes=e.body.length,e._raw=[e.body],t(e._convert())):(e.timeout&&(n=setTimeout(function(){e._abort=!0,r(new a("response timeout at "+e.url+" over limit: "+e.timeout,"body-timeout"))},e.timeout)),e.body.on("error",function(t){r(new a("invalid response body at: "+e.url+" reason: "+t.message,"system",t))}),e.body.on("data",function(t){if(!e._abort&&null!==t){if(e.size&&e._bytes+t.length>e.size)return e._abort=!0,void r(new a("content size at "+e.url+" over limit: "+e.size,"max-size"));e._bytes+=t.length,e._raw.push(t)}}),void e.body.on("end",function(){e._abort||(clearTimeout(n),t(e._convert()))}))}))},n.prototype._convert=function(e){e=e||"utf-8";var t,r,n=this.headers.get("content-type"),i="utf-8";if(n){if(!/text\/html|text\/plain|\+xml|\/xml/i.test(n))return Buffer.concat(this._raw);t=/charset=([^;]*)/i.exec(n)}if(!t&&this._raw.length>0){for(var s=0;s<this._raw.length&&(r+=this._raw[s].toString(),!(r.length>1024));s++);r=r.substr(0,1024)}return!t&&r&&(t=/<meta.+?charset=(['"])(.+?)\1/i.exec(r)),!t&&r&&(t=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(r),t&&(t=/charset=(.*)/i.exec(t.pop()))),!t&&r&&(t=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(r)),t&&(i=t.pop(),"gb2312"!==i&&"gbk"!==i||(i="gb18030")),o(Buffer.concat(this._raw),e,i)},n.prototype._clone=function(e){var t,r,n=e.body;if(e.bodyUsed)throw new Error("cannot clone body after it is used");return i(n)&&"function"!=typeof n.getBoundary&&(t=new s,r=new s,n.pipe(t),n.pipe(r),e.body=t,n=r),n},n.Promise=global.Promise},function(e,t,r){"use strict";function n(e,t,r,n){r=s(r||"UTF-8"),t=s(t||"UTF-8"),e=e||"";var a;if("UTF-8"!==r&&"string"==typeof e&&(e=new Buffer(e,"binary")),r===t)a="string"==typeof e?new Buffer(e):e;else if(u&&!n)try{a=o(e,t,r)}catch(c){console.error(c);try{a=i(e,t,r)}catch(c){console.error(c),a=e}}else try{a=i(e,t,r)}catch(c){console.error(c),a=e}return"string"==typeof a&&(a=new Buffer(a,"utf-8")),a}function o(e,t,r){var n,o;return o=new u(r,t+"//TRANSLIT//IGNORE"),n=o.convert(e),n.slice(0,n.length)}function i(e,t,r){return"UTF-8"===t?a.decode(e,r):"UTF-8"===r?a.encode(e,t):a.encode(a.decode(e,r),t)}function s(e){return(e||"").toString().trim().replace(/^latin[\-_]?(\d+)$/i,"ISO-8859-$1").replace(/^win(?:dows)?[\-_]?(\d+)$/i,"WINDOWS-$1").replace(/^utf[\-_]?(\d+)$/i,"UTF-$1").replace(/^ks_c_5601\-1987$/i,"CP949").replace(/^us[\-_]?ascii$/i,"ASCII").toUpperCase()}var a=r(15),u=r(16);e.exports.convert=n},function(e,t){e.exports=require("iconv-lite")},function(e,t,r){"use strict";var n,o;try{n="iconv",o=r(17)(n).Iconv}catch(i){}e.exports=o},function(e,t,r){function n(e){return r(o(e))}function o(e){return i[e]||function(){throw new Error("Cannot find module '"+e+"'.")}()}var i={"./encoding":14,"./encoding.js":14,"./iconv-loader":16,"./iconv-loader.js":16};n.keys=function(){return Object.keys(i)},n.resolve=o,e.exports=n,n.id=17},function(e,t){e.exports=require("is-stream")},function(e,t,r){function n(e,t,r){Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.message=e,this.type=t,r&&(this.code=this.errno=r.code)}e.exports=n,r(20).inherits(n,Error)},function(e,t){e.exports=require("util")},function(e,t,r){function n(e,t){t=t||{},this.url=t.url,this.status=t.status||200,this.statusText=t.statusText||o.STATUS_CODES[this.status],this.headers=new i(t.headers),this.ok=this.status>=200&&this.status<300,s.call(this,e,t)}var o=r(9),i=r(22),s=r(13);e.exports=n,n.prototype=Object.create(s.prototype),n.prototype.clone=function(){return new n(this._clone(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok})}},function(e,t){function r(e){var t=this;this._headers={},e instanceof r&&(e=e.raw());for(var n in e)e.hasOwnProperty(n)&&("string"==typeof e[n]?this.set(n,e[n]):"number"!=typeof e[n]||isNaN(e[n])?e[n]instanceof Array&&e[n].forEach(function(e){t.append(n,e.toString())}):this.set(n,e[n].toString()))}e.exports=r,r.prototype.get=function(e){var t=this._headers[e.toLowerCase()];return t?t[0]:null},r.prototype.getAll=function(e){return this.has(e)?this._headers[e.toLowerCase()]:[]},r.prototype.forEach=function(e,t){Object.getOwnPropertyNames(this._headers).forEach(function(r){this._headers[r].forEach(function(n){e.call(t,n,r,this)},this)},this)},r.prototype.set=function(e,t){this._headers[e.toLowerCase()]=[t]},r.prototype.append=function(e,t){return this.has(e)?void this._headers[e.toLowerCase()].push(t):void this.set(e,t)},r.prototype.has=function(e){return this._headers.hasOwnProperty(e.toLowerCase())},r.prototype["delete"]=function(e){delete this._headers[e.toLowerCase()]},r.prototype.raw=function(){return this._headers}},function(e,t,r){function n(e,t){var r,a;e instanceof n?(r=e.url,a=o(r)):(r=e,a=o(r),e={}),t=t||{},this.method=t.method||e.method||"GET",this.redirect=t.redirect||e.redirect||"follow",this.headers=new i(t.headers||e.headers||{}),this.url=r,this.follow=void 0!==t.follow?t.follow:void 0!==e.follow?e.follow:20,this.compress=void 0!==t.compress?t.compress:void 0===e.compress||e.compress,this.counter=t.counter||e.counter||e.follow||0,this.agent=t.agent||e.agent,s.call(this,t.body||this._clone(e),{timeout:t.timeout||e.timeout||0,size:t.size||e.size||0}),this.protocol=a.protocol,this.hostname=a.hostname,this.port=a.port,this.path=a.path,this.auth=a.auth}var o=r(8).parse,i=r(22),s=r(13);e.exports=n,n.prototype=Object.create(s.prototype),n.prototype.clone=function(){return new n(this)}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=(r(5),r(25)),a=n(s),u=r(26),c=function(e){return u.TABLE_HEADER_REGEXP.test(e)},l=function(e){return u.TABLE_ENTRY_REGEXP.test(e)},h=function(){function e(t,r){o(this,e),this.data=r,this.searchTerm=t,this.lines=this.data.selftext.split("\n"),this.currentTable=null,this.tables=[]}return i(e,[{key:"parse",value:function(){var e=this;return console.log("Parsing "+this.lines.length+' lines for "'+this.searchTerm+'"...'),new Promise(function(t,r){try{var n=!0,o=!1,i=void 0;try{for(var s,a=e.lines[Symbol.iterator]();!(n=(s=a.next()).done);n=!0){var u=s.value;e.parseLine(u)}}catch(c){o=!0,i=c}finally{try{!n&&a["return"]&&a["return"]()}finally{if(o)throw i}}console.log("Finished parsing "+e.tables.length+" tables."),e.tables.length>0?t(e.tables):r(e.errorMessage())}catch(c){console.error(c),console.error(c.stack),r(e.errorMessage())}})}},{key:"errorMessage",value:function(){return"Aw, man! We found a table for "+this.searchTerm+", but we had "+("trouble reading it. :( Try rolling it yourself at "+this.data.url+".")}},{key:"parseLine",value:function(e){c(e)?this.emitTable(e):l(e)&&this.emitTableEntry(e)}},{key:"emitTable",value:function(e){this.currentTable&&this.tables.push(this.currentTable),this.currentTable=new a["default"](e)}},{key:"emitTableEntry",value:function(e){this.currentTable&&this.currentTable.pushEntry(e)}}]),e}();t["default"]=h,e.exports=t["default"]},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(26),s=function(){function e(t){n(this,e);var r=i.TABLE_HEADER_REGEXP.exec(t);this.header=r[1],this.values=[]}return o(e,[{key:"pushEntry",value:function(e){var t=i.TABLE_ENTRY_REGEXP.exec(e);this.values.push(t[1])}},{key:"rollForValue",value:function(){if(this.values.length>0){var e=Math.ceil(1),t=Math.floor(this.values.length),r=Math.floor(Math.random()*(t-e))+e;return this.header+" "+this.values[r]}return""}},{key:"log",value:function(){console.log('"'+this.header+'"');var e=!0,t=!1,r=void 0;try{for(var n,o=this.values[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var i=n.value;console.log('    "'+i+'"')}}catch(s){t=!0,r=s}finally{try{!e&&o["return"]&&o["return"]()}finally{if(t)throw r}}}}]),e}();t["default"]=s,e.exports=t["default"]},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.TABLE_HEADER_REGEXP=/^\W*\*\*[dD]\d+\s*(.*)\*\*$/,t.TABLE_ENTRY_REGEXP=/^\W*\d+\.\s*(.*)$/}]);