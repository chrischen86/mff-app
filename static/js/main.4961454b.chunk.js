(this["webpackJsonpmff-app"]=this["webpackJsonpmff-app"]||[]).push([[0],{312:function(t,e,n){},442:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),c=n(81),i=n.n(c),o=(n(312),n(504)),s=n(280),u=n(23),d=n(501),l=n(485),f=n(506),b=n(16),h=n(14),j=n(4);function g(t,e){var n=r.a.createContext({state:e,dispatch:function(){return e}});return[n,function(a){var c=r.a.useReducer(t,e),i=Object(b.a)(c,2),o=i[0],s=i[1];return Object(j.jsx)(n.Provider,Object(h.a)({value:{state:o,dispatch:s}},a))}]}var m=g((function(t,e){switch(e.type){case"add":return Object(h.a)(Object(h.a)({},t),{},{filters:e.filters});case"enable":case"disable":return void 0===t.filters.find((function(t){return t.id===e.filterId}))?t:Object(h.a)(Object(h.a)({},t),{},{filters:t.filters.map((function(t){return t.id===e.filterId?Object(h.a)(Object(h.a)({},t),{},{enabled:"disable"!==e.type}):t}))});case"remove":return Object(h.a)(Object(h.a)({},t),{},{filters:Object(u.a)(t.filters.filter((function(t){return e.filters.find((function(e){return e.id===t.id}))})))});default:throw new Error("Uknown action type provided")}}),{filters:[]}),O=Object(b.a)(m,2),p=O[0],v=O[1],x=p,y=v,w=g((function(t,e){switch(e.type){case"setStages":return Object(h.a)(Object(h.a)({},t),{},{stages:e.stages});case"setCharacters":return Object(h.a)(Object(h.a)({},t),{},{characters:e.characters});case"setFragments":return Object(h.a)(Object(h.a)({},t),{},{fragments:e.fragments});case"calculateLastMonth":if(void 0===e.data)return t;var n=e.data.filter((function(t,e,n){return n.findIndex((function(e){return e.date===t.date}))===e})).map((function(t){return new Date(t.date)})).sort((function(t,e){return t.getTime()-e.getTime()}));return Object(h.a)(Object(h.a)({},t),{},{currentMonth:n[n.length-1].toISOString()});default:throw new Error("Uknown action type provided")}}),{stages:[],characters:[],stories:[],fragments:[],currentMonth:void 0}),k=Object(b.a)(w,2),C=k[0],I=k[1],S=C,M=I,D=[{id:"currentMonth",label:"Current Month",enabled:!0,canDelete:!1,predicate:function(t,e){var n=new Date(t.date),a=void 0===e.currentMonth?new Date:new Date(e.currentMonth);return n.getMonth()===a.getMonth()&&n.getFullYear()===a.getFullYear()}},{id:"allTime",label:"All Time",enabled:!1,canDelete:!1,predicate:function(t){return!0}}],T={"Dimensional Clash":"#bf0001","The True SHIELD":"#3b7d57","The All War":"#6d1895","The Future Ends Here":"#23a5d7"},N=[{id:"dimensionalClash",label:"Dimensional Clash",enabled:!0,canDelete:!0,predicate:function(t){return t.stageId<=20},colour:T["Dimensional Clash"]},{id:"trueShield",label:"The True SHIELD",enabled:!0,canDelete:!0,predicate:function(t){return t.stageId>=21&&t.stageId<=24},colour:T["The True SHIELD"]},{id:"allWar",label:"The All War",enabled:!0,canDelete:!0,predicate:function(t){return t.stageId>=25&&t.stageId<=28},colour:T["The All War"]},{id:"futureEndsHere",label:"The Future Ends Here",enabled:!0,canDelete:!0,predicate:function(t){return t.stageId>=29},colour:T["The Future Ends Here"]}],L=[].concat(Object(u.a)(D),Object(u.a)(N)),E=n(487),F=n(488),H=n(507),B=n(10),A=n(265),Y=n.n(A),P=Object(l.a)((function(t){return{toolbar:{backgroundColor:"#f5f5f5",display:"flex",flexWrap:"wrap",padding:t.spacing(.5),transition:t.transitions.create(["padding","min-height","background-color"],{easing:t.transitions.easing.easeInOut,duration:t.transitions.duration.short}),position:"sticky"},toolbarHidden:{backgroundColor:"inherit",padding:0,paddingLeft:t.spacing(.5),minHeight:0,transition:t.transitions.create(["padding","min-height","background-color"],{easing:t.transitions.easing.easeIn,duration:t.transitions.duration.short})},chip:{margin:t.spacing(.5)},chipHidden:{display:"none"}}})),R=function(t){var e,n=t.visible,a=void 0!==n&&n,c=r.a.useState(a),i=Object(b.a)(c,2),o=i[0],s=i[1],u=r.a.useContext(x),d=u.state,l=u.dispatch,f=P();return!o&&d.filters.length<=0?null:Object(j.jsxs)(E.a,{className:Object(B.a)(f.toolbar,!o&&f.toolbarHidden),children:[Object(j.jsx)(F.a,{onClick:function(){return s(!o)},children:Object(j.jsx)(Y.a,{})}),null===(e=d.filters)||void 0===e?void 0:e.map((function(t){return Object(j.jsx)(H.a,{label:t.label,className:Object(B.a)(f.chip,!o&&!t.enabled&&f.chipHidden),onDelete:!o&&t.canDelete?function(){return e=t.id,void l({type:"disable",filterId:e});var e}:void 0,onClick:o?function(){return function(t){D.find((function(e){return e.id===t.id}))&&D.filter((function(e){return e.id!==t.id})).forEach((function(e){l({type:t.enabled?"enable":"disable",filterId:e.id})})),l({type:t.enabled?"disable":"enable",filterId:t.id})}(t)}:void 0,color:t.enabled?"primary":void 0,size:o?"medium":"small",style:{backgroundColor:t.enabled?t.colour:void 0}},t.id)}))]})},W=n(301),z=n(490),G=n(285),J=n(201),U=n.n(J),q=function(t){var e=t.areaBumpData;return Object(j.jsx)(G.a,{data:e,margin:{top:40,right:100,bottom:40,left:100},spacing:8,colors:{scheme:"nivo"},blendMode:"multiply",startLabel:"id",axisTop:{tickSize:5,tickPadding:5,tickRotation:0,legend:"Top 10 Ranking Over Time",legendPosition:"middle",legendOffset:-28,format:function(t){return U()(t).format("MMM YYYY")}},axisBottom:{tickSize:5,tickPadding:5,tickRotation:0,legend:"",legendPosition:"middle",legendOffset:32,format:function(t){return U()(t).format("MMM YYYY")}}})},_=n(273),K=function(t){var e=t.id;return T[e]},Q=r.a.memo((function(t){var e=t.data,n=function(t){var e=t.flatMap((function(t){return Object.keys(t)}));return Array.from(new Set(e)).filter((function(t){return"characterName"!==t}))}(e);return Object(j.jsx)(_.a,{data:e,indexBy:"characterName",keys:n,margin:{top:10,right:10,bottom:80,left:30},axisLeft:{tickSize:5,tickPadding:5,tickRotation:0,format:function(t){return"number"===typeof t&&Math.floor(t)===t?t:""}},axisBottom:{tickRotation:-45,tickPadding:10},valueScale:{type:"linear"},labelSkipWidth:12,labelSkipHeight:12,labelTextColor:"white",colors:K})})),V=function(t,e){var n=r.a.useState([]),a=Object(b.a)(n,2),c=a[0],i=a[1];return r.a.useEffect((function(){i(function(t,e){return Array.from(t.reduce((function(t,e){var n=t.get(e.characterId);return t.set(e.characterId,n?n+1:1),t}),new Map),(function(t){var n,a=Object(b.a)(t,2),r=a[0],c=a[1];return{characterName:(null===e||void 0===e||null===(n=e.characters.find((function(t){return t.id===r})))||void 0===n?void 0:n.name)||r,count:c}})).sort((function(t,e){return e.count-t.count}))}(t,e))}),[t,e]),c},X=function(t){var e=r.a.useState([]),n=Object(b.a)(e,2),a=n[0],c=n[1],i=V(t);return r.a.useEffect((function(){var e=i.slice(0,10),n=function(t){var e=Array.from(new Set(t.map((function(t){return t.date}))));return Array.from(t.reduce((function(t,n){var a=t.get(n.characterId);if(void 0===a)t.set(n.characterId,Object(u.a)(e.map((function(t){return{x:t,y:t===n.date?1:0}}))));else{var r=a.find((function(t){return t.x===n.date}));if(void 0===r)t.set(n.characterId,[].concat(Object(u.a)(a.filter((function(t){return t.x!==n.date}))),[{x:n.date,y:1}]));else{var c=Object(h.a)(Object(h.a)({},r),{},{y:r.y+1});t.set(n.characterId,a.map((function(t){return t.x===n.date?c:t})))}}return t}),new Map),(function(t){var e=Object(b.a)(t,2);return{id:e[0],data:e[1]}}))}(t);c(n.filter((function(t){return e.find((function(e){return e.characterName===t.id}))})))}),[t,i]),a},Z=n(43),$=function(t,e){var n=function(t){var e=t.flatMap((function(t){return t.story}));return Array.from(new Set(e))}(e.stages);return Array.from(t.reduce((function(t,a){var r,c,i=(null===(r=e.stages.find((function(t){return t.id===a.stageId})))||void 0===r?void 0:r.story)||"Stage ".concat(a.stageId),o=(null===(c=e.characters.find((function(t){return t.id===a.characterId})))||void 0===c?void 0:c.name)||a.characterId,s=t.get(o);if(void 0===s){var u=n.reduce((function(t,e){return Object(h.a)(Object(h.a)({},t),{},Object(Z.a)({},e,e===i?1:0))}),{});t.set(o,u)}else{var d=s[i]||0;t.set(o,Object(h.a)(Object(h.a)({},s),{},Object(Z.a)({},i,d+1)))}return t}),new Map),(function(t){var e=Object(b.a)(t,2),n=e[0],a=e[1];return Object(h.a)({characterName:n},a)}))},tt=function(t,e){var n=r.a.useState([]),a=Object(b.a)(n,2),c=a[0],i=a[1];return r.a.useEffect((function(){if(void 0!==t){var n=$(t,e);i(n)}}),[t,e]),c},et=Object(l.a)({graphContainer:{height:"75vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},graphSkeleteon:{transform:"scale(1,1)",height:"90%",width:"95%"}}),nt=function(t){var e=t.data,n=t.isLoading,a=void 0!==n&&n,c=r.a.useContext(S).state,i=r.a.useContext(x).state,o=X(e),s=tt(e,c),u=et(),d=i.filters.filter((function(t){return"currentMonth"===t.id&&t.enabled})).length>=1;return Object(j.jsxs)(W.a,{className:u.graphContainer,children:[a&&Object(j.jsx)(z.a,{className:u.graphSkeleteon}),!a&&!d&&Object(j.jsx)(q,{areaBumpData:o}),!a&&d&&Object(j.jsx)(Q,{data:s})]})},at=n(27),rt=n.n(at),ct=n(56),it=n(505),ot=function(){return Object(it.a)("characterBonus",Object(ct.a)(rt.a.mark((function t(){var e;return rt.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://chrischen86.github.io/mff-data/selectedcharacterbonus.json");case 2:return e=t.sent,t.abrupt("return",e.json());case 4:case"end":return t.stop()}}),t)}))))},st=function(){return Object(it.a)("characters",Object(ct.a)(rt.a.mark((function t(){var e;return rt.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://chrischen86.github.io/mff-data/characters.json");case 2:return e=t.sent,t.abrupt("return",e.json());case 4:case"end":return t.stop()}}),t)}))))},ut=function(t,e){var n=r.a.useContext(S).state,a=r.a.useState([]),c=Object(b.a)(a,2),i=c[0],o=c[1];return r.a.useEffect((function(){void 0===t?o([]):void 0===e||e.length<=0?o(t):o(function(t,e,n){var a=e.filter((function(t){return t.enabled})),r=e.filter((function(t){return t.id.startsWith("fragment")})),c=r.some((function(t){return t.enabled})),i=[D,N];return c&&(i=[].concat(Object(u.a)(i),[r])),t.filter((function(t){return i.every((function(e){return e.filter((function(t){return null===a||void 0===a?void 0:a.find((function(e){return e.id===t.id}))})).some((function(e){return e.predicate(t,n)}))}))}))}(t,e,n))}),[t,e,n]),i},dt=function(){return Object(it.a)("fragments",Object(ct.a)(rt.a.mark((function t(){var e;return rt.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://chrischen86.github.io/mff-data/fragments.json");case 2:return e=t.sent,t.abrupt("return",e.json());case 4:case"end":return t.stop()}}),t)}))))},lt=function(){return Object(it.a)("stages",Object(ct.a)(rt.a.mark((function t(){var e;return rt.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://chrischen86.github.io/mff-data/stages.json");case 2:return e=t.sent,t.abrupt("return",e.json());case 4:case"end":return t.stop()}}),t)}))))},ft=n(497),bt=n(498),ht=n(499),jt=n(491),gt=n(492),mt=n(493),Ot=n(494),pt=n(495),vt=n(496),xt=Object(l.a)({table:{minWidth:250},tableContainer:{height:"65vh",width:"100%"}}),yt=function(t){var e=t.rankedData,n=xt();return Object(j.jsx)(jt.a,{component:W.a,className:n.tableContainer,children:Object(j.jsxs)(gt.a,{className:n.table,stickyHeader:!0,children:[Object(j.jsx)(mt.a,{children:Object(j.jsxs)(Ot.a,{children:[Object(j.jsx)(pt.a,{children:"Character"}),Object(j.jsx)(pt.a,{align:"right",children:"# of stages"})]})}),Object(j.jsx)(vt.a,{children:e.map((function(t){return Object(j.jsxs)(Ot.a,{children:[Object(j.jsx)(pt.a,{component:"th",scope:"row",children:t.characterName}),Object(j.jsx)(pt.a,{align:"right",children:t.count})]},t.characterName)}))})]})})},wt=Object(l.a)({card:{},cardContent:{padding:0,"&:last-child":{paddingBottom:0}},left:{float:"left"},right:{float:"right",marginRight:"1em"},contentContainer:{paddingLeft:"1em"}}),kt=function(t){var e=t.data,n=t.isLoading,a=void 0!==n&&n,c=r.a.useContext(S).state,i=V(e,c),o=wt();return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)(ft.a,{className:o.card,children:[Object(j.jsx)(bt.a,{title:a?Object(j.jsx)(z.a,{animation:"wave",height:30,width:"80%",style:{marginBottom:6}}):"Story Mode Rank"}),Object(j.jsxs)(ht.a,{className:o.cardContent,children:[a&&Object(j.jsx)("div",{className:o.contentContainer,children:Object(u.a)(Array(20)).map((function(t,e){return Object(j.jsxs)(r.a.Fragment,{children:[Object(j.jsx)(z.a,{animation:"wave",height:10,style:{marginBottom:6},width:"50%",className:o.left}),Object(j.jsx)(z.a,{animation:"wave",height:10,width:"10%",className:o.right}),Object(j.jsx)("br",{})]},e)}))}),!a&&Object(j.jsx)(yt,{rankedData:i})]})]})})},Ct=n(500),It=n(163),St=n(281),Mt=n.n(St),Dt=Object(l.a)((function(t){return{root:{flexGrow:1},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1}}})),Tt=function(){var t=Dt();return Object(j.jsx)(Ct.a,{position:"static",children:Object(j.jsxs)(E.a,{children:[Object(j.jsx)(It.a,{variant:"h6",className:t.title}),Object(j.jsx)(F.a,{color:"inherit",target:"_blank",href:"https://github.com/chrischen86/mff-app",children:Object(j.jsx)(Mt.a,{})})]})})},Nt=Object(l.a)((function(t){return Object(f.a)({root:{flexGrow:1,padding:"1em"}})})),Lt=function(){var t=r.a.useContext(S).dispatch,e=r.a.useContext(x),n=e.dispatch,a=e.state,c=lt(),i=c.data,o=c.isLoading,s=st(),l=s.data,f=s.isLoading,b=dt(),h=b.data,g=b.isLoading,m=ot(),O=m.data,p=m.isLoading,v=ut(O,a.filters),y=Nt();r.a.useEffect((function(){t({type:"calculateLastMonth",data:O})}),[t,O]),r.a.useEffect((function(){o||t({type:"setStages",stages:i}),f||t({type:"setCharacters",characters:l}),!g&&h&&t({type:"setFragments",fragments:h})}),[t,l,f,o,g,i,h]),r.a.useEffect((function(){var t=(h||[]).sort((function(t,e){return t.id-e.id})).map((function(t){var e=T[t.story];return{id:"fragmentFilter".concat(t.id),label:"".concat(t.story," #").concat(t.fragment),enabled:!1,canDelete:!0,predicate:function(e,n){return t.stageIds.includes(e.stageId)},colour:e}}));n({type:"add",filters:[].concat(Object(u.a)(L),Object(u.a)(t))})}),[n,h]);var w=o&&f&&g&&p;return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(Tt,{}),Object(j.jsx)("div",{className:y.root,children:Object(j.jsxs)(d.a,{container:!0,spacing:3,children:[Object(j.jsx)(d.a,{item:!0,lg:12,children:Object(j.jsx)(R,{})}),Object(j.jsx)(d.a,{item:!0,xs:12,md:3,children:Object(j.jsx)(kt,{data:v,isLoading:w})}),Object(j.jsx)(d.a,{item:!0,xs:12,md:9,children:Object(j.jsx)(nt,{data:v,isLoading:w})})]})})]})},Et=n(502),Ft=n(284),Ht=n(282),Bt=n.n(Ht),At=n(283),Yt=n.n(At),Pt=Object(Ft.a)({palette:{primary:{main:Bt.a[500]},secondary:{main:Yt.a[500]}}}),Rt=new o.a({defaultOptions:{queries:{refetchOnWindowFocus:!1}}}),Wt=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(s.a,{client:Rt,children:Object(j.jsx)(M,{children:Object(j.jsx)(y,{children:Object(j.jsx)(Et.a,{theme:Pt,children:Object(j.jsx)(Lt,{})})})})})})},zt=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,508)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),c(t),i(t)}))};i.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(Wt,{})}),document.getElementById("root")),zt()}},[[442,1,2]]]);
//# sourceMappingURL=main.4961454b.chunk.js.map