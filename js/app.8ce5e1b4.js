(function(e){function t(t){for(var r,o,a=t[0],l=t[1],u=t[2],d=0,f=[];d<a.length;d++)o=a[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);c&&c(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,a=1;a<n.length;a++){var l=n[a];0!==i[l]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={app:0},s=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var c=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),i=n.n(r);i.a},"0d12":function(e,t,n){"use strict";var r=n("3fe8"),i=n.n(r);i.a},"3fe8":function(e,t,n){},"4d70":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"","clipped-left":""}},[n("v-toolbar-title",[e._v("Yet Another NTU Stars Planner")])],1),n("v-main",[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("v-row",{staticClass:"fill-height justify-space-between",attrs:{align:"center"}},[n("v-col",{staticClass:"fill-height flex",attrs:{cols:"12",sm:"6",md:"auto"}},[n("ModuleControls",{model:{value:e.selectedModules,callback:function(t){e.selectedModules=t},expression:"selectedModules"}})],1),n("v-col",{staticClass:"fill-height flex-fill",attrs:{cols:"12",sm:"6",md:"auto"}},[n("TimeTablePicker",{model:{value:e.selectedModules,callback:function(t){e.selectedModules=t},expression:"selectedModules"}})],1)],1)],1)],1),n("v-footer",{attrs:{app:""}},[n("span",[e._v("Made with ♥ by Wai Gie; © 2020 - "+e._s((new Date).getFullYear()))])])],1)},s=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"d-flex flex-column align-start justify-start fill-height max-h-100 ml-2"},[n("div",{staticClass:"d-flex flex-row justify-center align-baseline"},[n("v-text-field",{attrs:{clearable:!0,"clear-icon":e.icons.mdiClose,value:e.txtModule,label:"Enter Module Code here!"},on:{"click:clear":function(t){e.fetchModuleResult=[]},input:function(t){return e.txtModuleChange(t)}}}),n("v-btn",{staticClass:"ml-2"},[e._v("Plan!")])],1),n("div",{staticClass:"align-start d-flex flex-column overflow-auto"},[e.hasResult?e._e():n("h2",[e._v(e._s(e.helperText))]),e._l(e.fetchModuleResult,(function(t,r){return n("v-btn",{key:"fetchModuleResult[]+"+r,staticClass:"text-no-wrap mt-1",on:{click:function(n){return e.onModuleAdd(t)}}},[n("v-icon",{staticClass:"mr-2"},[e._v(e._s(e.icons.mdiPlus))]),n("span",[e._v(e._s(t.code)+" "+e._s(t.name))])],1)}))],2),n("div",{staticClass:"d-flex justify-space-between flex-row w-100 mt-2"},[n("h3",[e._v("Selected Modules:")]),n("v-btn",{on:{click:e.onClearAllModule}},[e._v("Clear All")])],1),e.hasNoModulesSelected?n("h4",[e._v("No Modules Selected!")]):e._e(),n("div",{staticClass:"d-flex flex-column align-start overflow-auto"},e._l(e.selectedModules,(function(t,r){return n("v-btn",{key:"selectedModules[]+"+r+t.code,staticClass:"mt-1",on:{click:function(n){return e.onModuleDelete(t.code)}}},[n("v-icon",{staticClass:"mr-2"},[e._v(e._s(e.icons.mdiMinus))]),n("span",[e._v(e._s(t.code)+" "+e._s(t.name))])],1)})),1)])},a=[],l=(n("7db0"),n("b64b"),n("ac1f"),n("1276"),n("498a"),n("1157")),u=n.n(l),c=n("94ed"),d=(n("c975"),n("d4ec")),f=n("bee2"),h=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(d["a"])(this,e),this.type="",this.group="",this.day="",this.time="",this.venue="",this.remarks="",this.remarkType=-1,Object.assign(this,t)}return Object(f["a"])(e,null,[{key:"parseRemarks",value:function(e){return-1!==e.indexOf("Teaching Wk1,3")?1:-1!==e.indexOf("Teaching Wk2,4")?2:0}},{key:"parseLessonTime",value:function(e){var t=e.split("-");if(2===t.length)return{start:parseInt(t[0]),end:parseInt(t[1])}}}]),e}(),v=h,p=(n("b0c0"),function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(d["a"])(this,e),this.code="",this.name="",this.AU=0,Object.assign(this,t)}),m=p,g={name:"ModuleControls",data:function(){return{icons:{mdiPlus:c["c"],mdiMinus:c["b"],mdiClose:c["a"]},txtModule:"CZ1",fetchModulePromise:null,fetchModuleResult:[],selectedModules:{}}},methods:{parseModName:function(e){var t=u()(e).find("b font");if(!(t.length<3))return{code:t[0].innerText.trim(),name:t[1].innerText.trim(),AU:parseFloat(t[2].innerText.trim().split(" ")[0])}},parseModIndexes:function(e){for(var t,n=u()(e).find("tr"),r={},i=0;i<n.length;i++){var s=u()(n[i]),o=u()(s).find("td");if(7===o.length){var a=this.parseModIndex(o[0]);void 0!==a&&(t=a);var l=new v({type:o[1].innerText,group:o[2].innerText,day:o[3].innerText,time:this.parseLessonTime(o[4].innerText),venue:o[5].innerText,remarks:o[6].innerText,remarkType:this.parseRemarks(o[6].innerText)});void 0!==t&&(void 0===r[t]&&(r[t]=[]),r[t].push(l))}}return r},parseModIndex:function(e){var t=u()(e).find("b");if(0!==t.length&&void 0!==t[0].innerText&&(void 0===t[0].innerText||0!==t[0].innerText.length))return t[0].innerText},parseRemarks:function(e){return v.parseRemarks(e)},parseLessonTime:function(e){return v.parseLessonTime(e)},getModules:function(){var e=this,t={STAFF_ACCESS:!1,ACADSEM:"2020;1",boption:"Search",r_search_type:"F",r_subj_code:this.txtModule},n="https://cors-anywhere.herokuapp.com/",r=n+"https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1";null!=this.fetchModulePromise&&(this.fetchModulePromise.abort(),this.fetchModulePromise=null),this.fetchModuleResult=[],this.fetchModulePromise=u.a.ajax({method:"POST",url:r,data:t}),this.fetchModulePromise.then((function(t){for(var n=u()(t),r=u()(n).find("table"),i=[],s=0;s<r.length;s+=2){var o=new m(e.parseModName(u()(r[s])));o.indexes=e.parseModIndexes(u()(r[s+1])),i.push(o)}e.fetchModuleResult=i})),this.fetchModulePromise.catch((function(){})),this.fetchModulePromise.always((function(){e.fetchModulePromise=null}))},txtModuleChange:function(e){this.txtModule=null==e?"":e,this.txtModule.length>0?this.getModules():this.fetchModuleResult=[]},onModuleAdd:function(e){void 0===this.selectedModules[e.code]&&(r["a"].set(this.selectedModules,e.code,e),this.$emit("onAdd",e),this.$emit("input",this.selectedModules),this.$emit("change",this.selectedModules))},onModuleDelete:function(e){void 0!==this.selectedModules[e]&&(r["a"].delete(this.selectedModules,e),this.$emit("onDelete",this.selectedModules[e]),this.$emit("input",this.selectedModules),this.$emit("change",this.selectedModules))},onClearAllModule:function(){this.selectedModules={},this.$emit("onClear"),this.$emit("input",this.selectedModules),this.$emit("change",this.selectedModules)}},computed:{hasResult:function(){return this.fetchModuleResult.length>0},helperText:function(){return 0===this.txtModule.length?this.hasNoModulesSelected?"Start by entering a course code!":"Enter course code to continue!":null===this.fetchModulePromise?"No Modules found!":"Searching NTU database... Please wait"},hasNoModulesSelected:function(){return 0===Object.keys(this.selectedModules).length}}},M=g,x=(n("b09c"),n("2877")),b=n("6544"),y=n.n(b),T=n("8336"),_=n("132d"),w=n("8654"),C=Object(x["a"])(M,o,a,!1,null,"8669a24c",null),k=C.exports;y()(C,{VBtn:T["a"],VIcon:_["a"],VTextField:w["a"]});var P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"d-flex align-center flex-column fill-height",attrs:{fluid:""}},[n("h1",[e._v("Plan "+e._s(e.selectedIndex)+" out of "+e._s(e.plans.length))]),n("TimeTableViewer",{staticClass:"flex d-flex",attrs:{value:e.selectedPlan}})],1)},S=[],O=(n("99af"),n("2909")),j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("div",{staticClass:"flex text-center"},e._l(30,(function(t){return n("div",{key:e.makeKeyRow(t),staticClass:"d-flex flex-row"},e._l(7,(function(r){return n("v-col",{key:e.makeKeyCol(r),class:e.shouldRender(r,t)},[e._v(" "+e._s(e.getContent(r,t))+" ")])})),1)})),0)])},A=[],R=(n("d3b7"),n("25f0"),n("4d90"),{name:"TimeTableViewer",props:{value:{type:Array,default:function(){return[]}}},computed:{uid:function(){return this._uid},plan:function(){return this.value}},methods:{makeKeyCol:function(e){return this.uid+"col_i"+e},makeKeyRow:function(e){return this.uid+"row_i"+e},shouldRender:function(e,t){var n=["d-flex","flex-column","flex","timetable-cell"];return n},getContent:function(e,t){if(1===t)return this.getHeaders(e);if(1===e)return this.getHours(t);var n=this.getModule(e,t);if(n.length>0){var r="";for(var i in n){var s=n[i];r+="".concat(s.modCode,", ").concat(s.timeslot.type)}return r}return""},getModule:function(e,t){var n=this.getHourStart(t),r=this.fixHour(n+30),i=this.toDay(e),s=[];for(var o in this.plan){var a=this.plan[o];for(var l in a.timings){var u=a.timings[l];u.day===i&&n>=u.time.start&&r<=u.time.end&&s.push({modCode:a.code,timeslot:u})}}return s},getHeaders:function(e){switch(e){case 1:return"Time\\Day";case 2:return"Monday";case 3:return"Tuesday";case 4:return"Wednesday";case 5:return"Thursday";case 6:return"Friday";case 7:return"Saturday"}},getHours:function(e){var t=this.getHourStart(e),n=this.fixHour(t+30),r=t.toString().padStart(4,"0"),i=n.toString().padStart(4,"0");return"".concat(r," - ").concat(i)},getHourStart:function(e){var t=830,n=this.getHourOffset(e);return this.fixHour(t+n)},getHourOffset:function(e){var t=e-2,n=30*t;return 100*Math.floor(n/60)+n%60},getHourEnd:function(e){return this.fixHour(this.getHourStart(e)+30)},fixHour:function(e){var t=e%100;return t>=60?this.fixHour(e-t+100+(t-60)):e},toDay:function(e){switch(e){case 2:return"MON";case 3:return"TUE";case 4:return"WED";case 5:return"THU";case 6:return"FRI";case 7:return"SAT"}}}}),H=R,V=(n("0d12"),n("62ad")),$=n("a523"),E=Object(x["a"])(H,j,A,!1,null,"03a93ac3",null),I=E.exports;y()(E,{VCol:V["a"],VContainer:$["a"]});var N={name:"TimeTablePicker",components:{TimeTableViewer:I},props:{value:{type:Object,default:function(){return{}}}},mounted:function(){},computed:{selectedModule:{get:function(){return this.value},set:function(e){this.value=e}},plans:{get:function(){var e=this.generatePlans();return e=this.filterClashes(e),e}},selectedPlan:function(){return this.withData(this.plans[this.planIndex])},selectedIndex:function(){return 0===this.plans.length?0:this.planIndex+1}},data:function(){return{planIndex:0}},methods:{generatePlans:function(){if(void 0!==this.selectedModule){this.planIndex=0;var e=[];for(var t in this.selectedModule){var n=this.selectedModule[t],r=[];for(var i in n.indexes){var s={code:t,index:i};if(0===e.length)r.push([s]);else for(var o in e){var a=[].concat(Object(O["a"])(e[o]),[s]);r.push(a)}}e=r}return e}},filterClashes:function(e){var t=[];for(var n in e){var r=this.hydratePlan(e[n]),i=!1;if(r.timings.length>1)for(var s=0;s<r.timings.length-1;s++){for(var o=s+1;o<r.timings.length;o++){var a=r.timings[s],l=r.timings[o];if(!(a.day!==l.day||a.time.start>=l.time.end||a.time.end<=l.time.start||0!==a.remarkType&&0!==l.remarkType&&a.remarkType!==l.remarkType)){i=!0;break}}if(i)break}i||t.push(e[n])}return t},hydratePlan:function(e){var t={};for(var n in t.reference=e,t.timings=[],e){var r=e[n].code,i=e[n].index,s=this.selectedModule[r].indexes[i];t.timings=t.timings.concat(s)}return t},withData:function(e){for(var t in e){var n=e[t].code,r=e[t].index,i=this.selectedModule[n].indexes[r];e[t].timings=i}return e}}},D=N,F=Object(x["a"])(D,P,S,!1,null,"75952ecc",null),U=F.exports;y()(F,{VContainer:$["a"]});var L={components:{TimeTablePicker:U,ModuleControls:k},data:function(){return{selectedModules:void 0}},created:function(){this.$vuetify.theme.dark=!0}},W=L,K=(n("034f"),n("7496")),B=n("40dc"),J=n("553a"),Y=n("f6c4"),q=n("0fd9"),G=n("2a7f"),Z=Object(x["a"])(W,i,s,!1,null,null,null),z=Z.exports;y()(Z,{VApp:K["a"],VAppBar:B["a"],VCol:V["a"],VContainer:$["a"],VFooter:J["a"],VMain:Y["a"],VRow:q["a"],VToolbarTitle:G["a"]});var Q=n("9483");Object(Q["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var X=n("f309");r["a"].use(X["a"]);var ee=new X["a"]({});n("d5e8");r["a"].config.productionTip=!1,new r["a"]({icons:{iconfont:"mdiSvg"},vuetify:ee,render:function(e){return e(z)}}).$mount("#app")},"85ec":function(e,t,n){},b09c:function(e,t,n){"use strict";var r=n("4d70"),i=n.n(r);i.a}});
//# sourceMappingURL=app.8ce5e1b4.js.map