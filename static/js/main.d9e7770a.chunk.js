(this["webpackJsonppokemon-collection-client"]=this["webpackJsonppokemon-collection-client"]||[]).push([[0],{164:function(e,t,a){},171:function(e,t,a){},302:function(e,t){},408:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(20),r=a.n(s),o=(a(164),a(10)),i=a(11),l=a(8),d=a(14),u=a(13),h=a(18),j=a(17),b=a(6),m=(a(170),a(171),a(60)),O=a.n(m),g=a(39),v=a.n(g),f=a(61),p=a.n(f),x="REGISTER_SUCCESS",C="REGISTER_FAIL",y="LOGIN_SUCCESS",k="LOGIN_FAIL",N="LOGOUT",S="SET_MESSAGE",w="CLEAR_MESSAGE",T="SET_TCG_CARDS",A="APPEND_TCG_CARDS",F=a(19),I=a.n(F),_="http://localhost:8080/api/auth/",E=new(function(){function e(){Object(o.a)(this,e)}return Object(i.a)(e,[{key:"login",value:function(e,t){return I.a.post(_+"signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(e,t,a){return I.a.post(_+"signup",{username:e,email:t,password:a})}}]),e}()),L=a(1),D=function(e){if(!e)return Object(L.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},P=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleLogin=n.handleLogin.bind(Object(l.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(l.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(l.a)(n)),n.state={username:"",password:"",loading:!1},n}return Object(i.a)(a,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleLogin",value:function(e){var t=this;e.preventDefault(),this.setState({loading:!0}),this.form.validateAll();var a,n,c=this.props,s=c.dispatch;c.history;0===this.checkBtn.context._errors.length?s((a=this.state.username,n=this.state.password,function(e){return E.login(a,n).then((function(t){return e({type:y,payload:{user:t}}),Promise.resolve()}),(function(t){var a=t.response&&t.response.data&&t.response.data.message||t.message||t.toString();return e({type:k}),e({type:S,payload:a}),Promise.reject()}))})).then((function(){window.location.reload()})).catch((function(){t.setState({loading:!1})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this,t=this.props,a=t.isLoggedIn,n=t.message;return a?Object(L.jsx)(b.a,{to:"/profile"}):Object(L.jsx)(c.a.Fragment,{children:Object(L.jsx)("div",{className:"col-md-12",children:Object(L.jsxs)("div",{className:"card card-container",children:[Object(L.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(L.jsxs)(O.a,{onSubmit:this.handleLogin,ref:function(t){e.form=t},children:[Object(L.jsxs)("div",{className:"form-group",children:[Object(L.jsx)("label",{htmlFor:"username",children:"Username"}),Object(L.jsx)(v.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[D]})]}),Object(L.jsxs)("div",{className:"form-group",children:[Object(L.jsx)("label",{htmlFor:"password",children:"Password"}),Object(L.jsx)(v.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[D]})]}),Object(L.jsx)("div",{className:"form-group",children:Object(L.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(L.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(L.jsx)("span",{children:"Login"})]})}),n&&Object(L.jsx)("div",{className:"form-group",children:Object(L.jsx)("div",{className:"alert alert-danger",role:"alert",children:n})}),Object(L.jsx)(p.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})]})})})}}]),a}(n.Component);var R=Object(h.b)((function(e){return{isLoggedIn:e.auth.isLoggedIn,message:e.message.message}}))(P),B=a(153),M=function(e){if(!e)return Object(L.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},U=function(e){if(!Object(B.isEmail)(e))return Object(L.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This is not a valid email."})},J=function(e){if(e.length<3||e.length>20)return Object(L.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The username must be between 3 and 20 characters."})},G=function(e){if(e.length<6||e.length>40)return Object(L.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The password must be between 6 and 40 characters."})},V=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleRegister=n.handleRegister.bind(Object(l.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(l.a)(n)),n.onChangeEmail=n.onChangeEmail.bind(Object(l.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(l.a)(n)),n.state={username:"",email:"",password:"",successful:!1},n}return Object(i.a)(a,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleRegister",value:function(e){var t,a,n,c=this;e.preventDefault(),this.setState({successful:!1}),this.form.validateAll(),0===this.checkBtn.context._errors.length&&this.props.dispatch((t=this.state.username,a=this.state.email,n=this.state.password,function(e){return E.register(t,a,n).then((function(t){return e({type:x}),e({type:S,payload:t.data.message}),Promise.resolve()}),(function(t){var a=t.response&&t.response.data&&t.response.data.message||t.message||t.toString();return e({type:C}),e({type:S,payload:a}),Promise.reject()}))})).then((function(){c.setState({successful:!0})})).catch((function(){c.setState({successful:!1})}))}},{key:"render",value:function(){var e=this,t=this.props.message;return Object(L.jsx)("div",{className:"col-md-12",children:Object(L.jsxs)("div",{className:"card card-container",children:[Object(L.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(L.jsxs)(O.a,{onSubmit:this.handleRegister,ref:function(t){e.form=t},children:[!this.state.successful&&Object(L.jsxs)("div",{children:[Object(L.jsxs)("div",{className:"form-group",children:[Object(L.jsx)("label",{htmlFor:"username",children:"Username"}),Object(L.jsx)(v.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[M,J]})]}),Object(L.jsxs)("div",{className:"form-group",children:[Object(L.jsx)("label",{htmlFor:"email",children:"Email"}),Object(L.jsx)(v.a,{type:"text",className:"form-control",name:"email",value:this.state.email,onChange:this.onChangeEmail,validations:[M,U]})]}),Object(L.jsxs)("div",{className:"form-group",children:[Object(L.jsx)("label",{htmlFor:"password",children:"Password"}),Object(L.jsx)(v.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[M,G]})]}),Object(L.jsx)("div",{className:"form-group",children:Object(L.jsx)("button",{className:"btn btn-primary btn-block",children:"Sign Up"})})]}),t&&Object(L.jsx)("div",{className:"form-group",children:Object(L.jsx)("div",{className:this.state.successful?"alert alert-success":"alert alert-danger",role:"alert",children:t})}),Object(L.jsx)(p.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})]})})}}]),a}(n.Component);var H=Object(h.b)((function(e){return{message:e.message.message}}))(V);function z(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}var Q="http://localhost:8080/api/",q=new(function(){function e(){Object(o.a)(this,e)}return Object(i.a)(e,[{key:"getPublicContent",value:function(){return I.a.get(Q+"all")}},{key:"getUserBoard",value:function(){return I.a.get(Q+"user",{headers:z()})}},{key:"getModeratorBoard",value:function(){return I.a.get(Q+"mod",{headers:z()})}},{key:"getAdminBoard",value:function(){return I.a.get(Q+"admin",{headers:z()})}}]),e}()),K=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={content:""},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;q.getPublicContent().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"container",children:Object(L.jsx)("header",{className:"jumbotron",children:Object(L.jsx)("h3",{children:this.state.content})})})}}]),a}(n.Component),Y=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=this.props.user;return e?Object(L.jsxs)("div",{className:"container",children:[Object(L.jsx)("header",{className:"jumbotron",children:Object(L.jsxs)("h3",{children:[Object(L.jsx)("strong",{children:e.username})," Profile"]})}),Object(L.jsxs)("p",{children:[Object(L.jsx)("strong",{children:"Token:"})," ",e.accessToken.substring(0,20)," ..."," ",e.accessToken.substr(e.accessToken.length-20)]}),Object(L.jsxs)("p",{children:[Object(L.jsx)("strong",{children:"Id:"})," ",e.id]}),Object(L.jsxs)("p",{children:[Object(L.jsx)("strong",{children:"Email:"})," ",e.email]}),Object(L.jsx)("strong",{children:"Authorities:"}),Object(L.jsx)("ul",{children:e.roles&&e.roles.map((function(e,t){return Object(L.jsx)("li",{children:e},t)}))})]}):Object(L.jsx)(b.a,{to:"/login"})}}]),a}(n.Component);var W=Object(h.b)((function(e){return{user:e.auth.user}}))(Y),X=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={content:""},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;q.getUserBoard().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"container",children:Object(L.jsx)("header",{className:"jumbotron",children:Object(L.jsx)("h3",{children:this.state.content})})})}}]),a}(n.Component),Z=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={content:""},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;q.getModeratorBoard().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"container",children:Object(L.jsx)("header",{className:"jumbotron",children:Object(L.jsx)("h3",{children:this.state.content})})})}}]),a}(n.Component),$=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={content:""},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;q.getAdminBoard().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(L.jsx)("div",{className:"container",children:Object(L.jsx)("header",{className:"jumbotron",children:Object(L.jsx)("h3",{children:this.state.content})})})}}]),a}(n.Component),ee=a(42),te=a(154),ae=a(155),ne=a(3),ce=JSON.parse(localStorage.getItem("user")),se=ce?{isLoggedIn:!0,user:ce}:{isLoggedIn:!1,user:null},re={},oe=a(37),ie=a(32),le=JSON.parse(localStorage.getItem("cards"))||[],de=function(e){var t=e.reduce((function(e,t){return Object(ne.a)(Object(ne.a)({},e),{},Object(ie.a)({},t.id,t))}),{});return{cards:{array:e,dict:t}}},ue=de(le),he=Object(ee.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case x:case C:return Object(ne.a)(Object(ne.a)({},e),{},{isLoggedIn:!1});case y:return Object(ne.a)(Object(ne.a)({},e),{},{isLoggedIn:!0,user:n.user});case k:case N:return Object(ne.a)(Object(ne.a)({},e),{},{isLoggedIn:!1,user:null});default:return e}},message:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case S:return{message:n};case w:return{message:""};default:return e}},tcgApi:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case T:return console.log("SET_TCG_CARDS -> ",n),Object(ne.a)(Object(ne.a)({},e),{},{cards:de(n)});case A:var c=Object(oe.a)(e.cards.array),s=Object.keys(e.cards.dict);return n.forEach((function(e){e.id in s||c.push(e)})),localStorage.setItem("cards",JSON.stringify(c)),Object(ne.a)(Object(ne.a)({},e),de(c));default:return e}}}),je=[ae.a],be=Object(ee.createStore)(he,Object(te.composeWithDevTools)(ee.applyMiddleware.apply(void 0,je))),me=a(82);me.a.configure({apiKey:"4440c304-d5c0-4939-b533-5befa084795c"});var Oe=function(e){return new Promise((function(t,a){var n=be.getState().tcgApi,c=Object.keys(n.cards.dict);c.sort(),e.sort(),console.log(c),console.log(e);var s=e.filter((function(e){var t=c.includes(e);return!t}));if(console.log("".concat(s.length," cards to be obtained from API")),0!==s.length){var r,o,i=[];for(r=0,o=e.length;r<o;r+=100){var l=s.slice(r,r+100).reduce((function(e,t){return"id:".concat(t," OR ").concat(e)}),"");l=l.slice(0,-4),console.log(l);""!==l&&i.push(ve.postTcgApiQuery(l))}Promise.all(i).then((function(e){var a=[];for(r=0;r<e.length;r+=1)a=a.concat(e[r].data);console.log("Loading "+a.length+" cards into local."),be.dispatch(function(e){return function(t){return t({type:"APPEND_TCG_CARDS",payload:e}),Promise.resolve()}}(a)).then((function(e){t(e)}))}))}}))},ge=function(e){var t=be.getState().tcgApi,a=Object.keys(t.cards.dict);return a.sort(),e.forEach((function(e,n,c){a.includes(c[n].cardId)?(c[n].rarity=t.cards.dict[c[n].cardId].rarity,c[n].name=t.cards.dict[c[n].cardId].name,c[n].setName=t.cards.dict[c[n].cardId].set.name,c[n].setReleaseDate=t.cards.dict[c[n].cardId].set.releaseDate,c[n].numberFull=t.cards.dict[c[n].cardId].number+"/"+t.cards.dict[c[n].cardId].set.printedTotal):(c[n].rarity="Loading...",c[n].name="Loading...",c[n].setName="Loading...")})),e},ve=new(function(){function e(){Object(o.a)(this,e)}return Object(i.a)(e,[{key:"getAll",value:function(){return I.a.get(Q)}},{key:"getEpic",value:function(e){return new Promise((function(t,a){I.a.get(Q+"epic",{params:e}).then((function(e){t(ge(e.data))})).catch((function(e){a(e)}))}))}},{key:"getOneDetail",value:function(e){return I.a.get(Q+"collection/"+e)}},{key:"postCollection",value:function(e){var t=z();return t.yeet="ass",I.a.post(Q+"collection",e,{headers:t})}},{key:"putCollection",value:function(e,t){return I.a.put(Q+"collection/"+e,t).then((function(e){alert("Done!")})).catch((function(e){console.log(e)}))}},{key:"getTcgApiQuery",value:function(e){return I.a.get(Q+"tcgApiQuery",{params:{query:e}})}},{key:"postTcgApiQuery",value:function(e){return I.a.post(Q+"tcgApiQuery",{data:{query:e}})}},{key:"deleteCollection",value:function(e){var t=z();return t.yeet="ass",I.a.delete(Q+"collection/"+e,{headers:t})}},{key:"patchCollectionCards",value:function(e){var t=z();return I.a.put(Q+"collectionCards",{collectionCards:e},{headers:t})}}]),e}()),fe=a(62),pe=a.n(fe),xe=a(36),Ce=a.n(xe),ye=(a(122),a(47)),ke=a.n(ye),Ne=(a(58),a(59)),Se=a.n(Ne),we=(a(132),a(133),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={collections:[]},n.loadCollectionsIntoTable=n.loadCollectionsIntoTable.bind(Object(l.a)(n)),n.optionFormatter=n.optionFormatter.bind(Object(l.a)(n)),n.onDeleteClick=n.onDeleteClick.bind(Object(l.a)(n)),n.onRowClick=n.onRowClick.bind(Object(l.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.loadCollectionsIntoTable()}},{key:"loadCollectionsIntoTable",value:function(){var e=this;ve.getAll().then((function(t){e.setState({collections:t.data})}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"onRowClick",value:function(e,t,a){console.log(a)}},{key:"onDeleteClick",value:function(e){var t=this;if(window.confirm("Are you sure you want to delete? "+e.currentTarget.id))return ve.deleteCollection(e.currentTarget.id).then((function(){t.loadCollectionsIntoTable()})).catch((function(e){alert("Error!"),console.log(e)}));console.log("Thing was not saved to the database.")}},{key:"onOpenClick",value:function(e){var t="/collection/"+e.currentTarget.id;window.open(t,"_blank")}},{key:"optionFormatter",value:function(e){var t=this;return Object(L.jsxs)("span",{children:[Object(L.jsx)("span",{id:e,style:{cursor:"pointer"},onClick:function(e){t.onOpenClick(e)},children:Object(L.jsx)("i",{className:"bi bi-box-arrow-up-right"})}),"\xa0 \xa0",Object(L.jsx)("span",{id:e,style:{cursor:"pointer"},onClick:function(e){t.onDeleteClick(e)},children:Object(L.jsx)("i",{className:"bi bi-trash"})})]})}},{key:"render",value:function(){this.state.collections.length>1&&console.log(this.state.collections[0]);var e={onClick:function(e,t,a){var n="/collection/"+t.id;window.open(n,"_blank")}};return Object(L.jsx)("div",{className:"container",children:Object(L.jsxs)("header",{className:"jumbotron",children:[Object(L.jsx)("h1",{children:"All Collections"}),Object(L.jsx)(j.b,{to:"/collection/create",className:"btn btn-primary",children:"Create Collection"}),Object(L.jsx)("div",{children:Object(L.jsx)(pe.a,{data:this.state.collections,columns:[{dataField:"name",text:"name",sort:!0},{dataField:"collectedCardsUnique",text:"Collected",sort:!0},{dataField:"totalCards",text:"totalCards",sort:!0},{dataField:"status",text:"status",sort:!0,sortFunc:function(e,t,a,n,c,s){return"asc"===a?t-e:e-t},formatter:function(e,t,a,n){return t.statusString}}],keyField:"id",striped:!0,hover:!0,rowEvents:e})})]})})}}]),a}(n.Component));var Te=Object(h.b)((function(e){return{}}))(we),Ae=a(38),Fe=a(30),Ie=a(411),_e=a(50),Ee=a(40),Le=a(27),De=a(33),Pe=a(410);var Re=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).searchTcgApiCard=n.searchTcgApiCard.bind(Object(l.a)(n)),n.changeSearchTerm=n.changeSearchTerm.bind(Object(l.a)(n)),n.changeCollectionName=n.changeCollectionName.bind(Object(l.a)(n)),n.saveCollection=n.saveCollection.bind(Object(l.a)(n)),n.Speeeeeeen=n.Speeeeeeen.bind(Object(l.a)(n)),n.saveAndRedirectClick=n.saveAndRedirectClick.bind(Object(l.a)(n)),n.saveAndCreateAnotherClick=n.saveAndCreateAnotherClick.bind(Object(l.a)(n)),n.state={searchCards:[],searchTerm:"name:blastoise",collectionName:"",isLoading:!1},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){}},{key:"changeSearchTerm",value:function(e){var t=this;this.setState({searchTerm:e.target.value},(function(){console.log(t.state)}))}},{key:"changeCollectionName",value:function(e){var t=this;this.setState({collectionName:e.target.value},(function(){console.log(t.state)}))}},{key:"Speeeeeeen",value:function(){return this.state.isLoading?Object(L.jsx)("div",{style:{display:"flex",alignContent:"center",justifyContent:"center"},children:Object(L.jsx)("div",{style:{display:"inline-block"},children:Object(L.jsx)(Pe.a,{animation:"border",role:"status"})})}):""}},{key:"searchTcgApiCard",value:function(e){var t=this;this.setState({isLoading:!0}),ve.getTcgApiQuery(this.state.searchTerm).then((function(e){e.data;t.setState({searchCards:e.data,isLoading:!1},(function(){console.log(t.state)}))})).catch((function(e){alert("Error."),t.setState({isLoading:!1},(function(){console.log(t.state)}))}))}},{key:"saveAndRedirectClick",value:function(){this.saveCollection().then((function(e){window.location="/collection/"+e.data.id})).catch((function(e){alert(e)}))}},{key:"saveAndCreateAnotherClick",value:function(){this.saveCollection().then((function(e){window.location="/collection/create"})).catch((function(e){alert(e)}))}},{key:"saveCollection",value:function(){if(""!==this.state.collectionName){if(0!==this.state.searchCards.length){var e,t=Object(ne.a)({},this.state).searchCards,a=JSON.parse(JSON.stringify(t)),n={name:this.state.collectionName,filter:this.state.searchTerm,cards:[]},c=Object(Ae.a)(a);try{for(c.s();!(e=c.n()).done;){var s=e.value;n.cards.push({id:s.id,count:0})}}catch(r){c.e(r)}finally{c.f()}return ve.postCollection(n)}alert("No cards to save. Stopping save.")}else alert("CollectionName empty. Stopping save.")}},{key:"render",value:function(){this.state.isLoading;return Object(L.jsxs)("div",{className:"container",children:[Object(L.jsx)("header",{className:"jumbotron",children:Object(L.jsx)(_e.a,{children:Object(L.jsx)(Ee.a,{className:"justify-content-md-center",children:Object(L.jsx)(Le.a,{xs:!0,lg:"5",children:Object(L.jsx)("div",{style:{fontSize:"2.5em",textAlign:"center"},children:"Create Collection"})})})})}),Object(L.jsxs)("section",{style:{marginTop:"20px"},children:[Object(L.jsx)(_e.a,{children:Object(L.jsx)(Ee.a,{className:"justify-content-md-center",children:Object(L.jsxs)(Le.a,{xs:!0,lg:"5",children:[Object(L.jsx)(Ie.a.Label,{children:"Name"}),Object(L.jsx)(Ie.a.Control,{type:"text",placeholder:"Collection Name",value:this.state.collectionName,onChange:this.changeCollectionName})]})})}),Object(L.jsx)(_e.a,{children:Object(L.jsx)(Ee.a,{className:"justify-content-md-center",children:Object(L.jsxs)(Le.a,{xs:!0,lg:"5",children:[Object(L.jsx)(Ie.a.Label,{children:"Filter"}),Object(L.jsx)(Ie.a.Control,{type:"text",placeholder:"example: name:charizard",value:this.state.searchTerm,onChange:this.changeSearchTerm}),Object(L.jsx)(Fe.a,{variant:"primary",type:"submit",onClick:this.searchTcgApiCard,children:"Search"})]})})})]}),Object(L.jsx)("section",{style:{marginTop:"20px"},children:Object(L.jsx)(_e.a,{children:Object(L.jsxs)(Ee.a,{className:"justify-content-md-center",children:[Object(L.jsxs)(Le.a,{xs:"12",children:[this.Speeeeeeen(),Object(L.jsx)(Fe.a,{className:"float-right",variant:"primary",type:"submit",onClick:this.saveAndRedirectClick,children:"Save"}),"\xa0",Object(L.jsx)(Fe.a,{className:"float-right",variant:"primary",type:"submit",onClick:this.saveAndCreateAnotherClick,children:"Save And create another"})]}),Object(L.jsxs)(Le.a,{xs:!0,lg:"12",children:[Object(L.jsxs)("div",{children:[this.state.searchCards.length," Cards"]}),Object(L.jsxs)(De.BootstrapTable,{data:this.state.searchCards,striped:!0,hover:!0,children:[Object(L.jsx)(De.TableHeaderColumn,{dataField:"id",isKey:!0,dataAlign:"center",dataSort:!0,children:"ID"}),Object(L.jsx)(De.TableHeaderColumn,{dataField:"name",dataSort:!0,children:"Card No"}),Object(L.jsx)(De.TableHeaderColumn,{dataField:"fullCardNumber",dataSort:!0,children:"fullCardNumber"}),Object(L.jsx)(De.TableHeaderColumn,{dataField:"supertype",dataSort:!0,children:"Supertype"}),Object(L.jsx)(De.TableHeaderColumn,{dataField:"setName",dataSort:!0,children:"setName"}),Object(L.jsx)(De.TableHeaderColumn,{dataField:"setReleaseDate",dataSort:!0,children:"Release Date"}),Object(L.jsx)(De.TableHeaderColumn,{dataField:"rarity",dataSort:!0,children:"Rarity"})]})]})]})})})]})}}]),a}(n.Component);var Be=Object(h.b)((function(e){return{}}))(Re),Me=a(49),Ue=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleCardCollectedCheckboxClick=n.handleCardCollectedCheckboxClick.bind(Object(l.a)(n)),n.handleSaveCollectionButtonClick=n.handleSaveCollectionButtonClick.bind(Object(l.a)(n)),n.cardCollectedToggle=n.cardCollectedToggle.bind(Object(l.a)(n)),n.state={collection:{collectionCards:[]},collectionId:n.props.id},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;ve.getOneDetail(this.props.id).then((function(t){e.setState({collection:t.data},(function(){console.log(e.state)}))}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"cardCollectedToggle",value:function(e,t,a){return console.log(t.cardId),Object(L.jsx)(Me.a,{className:"my-0",id:t.cardId,type:"checkbox",variant:"outline-primary",checked:t.count,value:t.count,onClick:this.handleCardCollectedCheckboxClick,data:t.cardId,size:"sm",children:t.count?Object(L.jsx)("i",{className:"bi bi-check2-circle"}):Object(L.jsx)("i",{className:"bi bi-circle"})})}},{key:"handleCardCollectedCheckboxClick",value:function(e){console.log(e.currentTarget.id);var t,a=e.currentTarget.htmlFor,n=Object(ne.a)({},this.state).collection,c=n,s=Object(Ae.a)(n.collectionCards);try{for(s.s();!(t=s.n()).done;){var r=t.value;if(r.cardId===a){r.count=r.count?0:1;break}}}catch(o){s.e(o)}finally{s.f()}this.setState({collection:c})}},{key:"handleSaveCollectionButtonClick",value:function(e){var t,a=Object(ne.a)({},this.state).collection,n=JSON.parse(JSON.stringify(a)),c={name:this.state.collection.name},s=new Set(["orderNumber","count","cardId"]),r=Object(Ae.a)(n.collectionCards);try{for(r.s();!(t=r.n()).done;)for(var o=t.value,i=0,l=Object.keys(o);i<l.length;i++){var d=l[i];s.has(d)||delete o[d]}}catch(u){r.e(u)}finally{r.f()}c.cards=n.collectionCards,ve.putCollection(this.state.collectionId,c)}},{key:"render",value:function(){var e;console.log(this.state.collection);var t=this.state.collection.collectionCards.reduce((function(e,t){return e+Math.min(t,1)}),0);t=this.state.collection.collectionCards.reduce((function(e,t){return e+t.count}),0);var a=0;return this.state.collection.collectionCards.length>0&&(a=t/this.state.collection.collectionCards.length),a*=100,a=Math.round(a,2)+"%",this.state.collection.collectionCards.length,Object(L.jsxs)("div",{className:"container",children:[Object(L.jsx)("header",{className:"jumbotron",children:Object(L.jsxs)("h1",{children:["Collection ",null===(e=this.state.collection)||void 0===e?void 0:e.name," - ",a]})}),Object(L.jsx)(Fe.a,{onClick:this.handleSaveCollectionButtonClick,children:"Save Collection"}),Object(L.jsx)("div",{})]})}}]),a}(n.Component);Object(h.b)((function(e){return{}}))(Ue);var Je=a(21),Ge=Object(Je.b)(),Ve=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),n=t.call(this,e),e.history.listen((function(){var t=JSON.parse(localStorage.getItem("user"));t&&(1e3*function(e){try{return JSON.parse(atob(e.split(".")[1]))}catch(t){return null}}(t.accessToken).exp<Date.now()&&e.logOut())})),n}return Object(i.a)(a,[{key:"render",value:function(){return Object(L.jsx)("div",{})}}]),a}(n.Component);var He=function(e){return Object(L.jsx)("h1",{children:"404"})},ze=ye.Search.SearchBar,Qe=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleCardCollectedCheckboxClick=n.handleCardCollectedCheckboxClick.bind(Object(l.a)(n)),n.handleSaveCollectionButtonClick=n.handleSaveCollectionButtonClick.bind(Object(l.a)(n)),n.handleCardPurchasedCheckboxClick=n.handleCardPurchasedCheckboxClick.bind(Object(l.a)(n)),n.loadFilters=n.loadFilters.bind(Object(l.a)(n)),console.log("------------------"),console.log(n.props),console.log("------------------"),n.state={displaySingleCollection:"id"in n.props,collectionId:n.props.id,collectionName:"",collectionCards:[],changedCards:new Set,checkChanged:!0,propertyValues:{setNames:{},collectionNames:{}},filters:{}},n.setNameFilter=null,n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this,t={};void 0!=this.state.collectionId&&(t={collectionId:this.state.collectionId}),ve.getEpic(t).then((function(t){var a=Object(oe.a)(new Set(t.map((function(e){return e.cardId}))));Oe(a).then((function(t){var a=ge(e.state.collectionCards);e.setState({collectionCards:a,propertyValues:e.loadFilters(a)},(function(){e.forceUpdate()}))})),e.setState({collectionCards:t,propertyValues:e.loadFilters(t)},(function(){e.forceUpdate()}))}),(function(e){console.log(e),alert("Error")}))}},{key:"loadFilters",value:function(e){var t=Object(oe.a)(new Set(e.map((function(e){return e.setName})))).sort(),a={};t.forEach((function(e){a[e]=e}));Object.assign.apply(Object,[{}].concat(Object(oe.a)(t.map((function(e){return Object(ie.a)({},e,e)})))));var n=Object(oe.a)(new Set(e.map((function(e){return e.collectionName})))).sort(),c={};return n.forEach((function(e){c[e]=e})),{setNames:a,collectionNames:c}}},{key:"handleCardCollectedCheckboxClick",value:function(e){var t=this,a=e.currentTarget.htmlFor,n=this.state.changedCards,c=this.state.collectionCards.find((function(e){return e.collection_card_key===a}));c.count=c.count?0:1,n.add(a),this.setState({collectionCards:this.state.collectionCards,checkChanged:!this.state.checkChanged,changedCards:n},(function(){console.log("InOnClick: ",t.state.collectionCards[0].count),console.log("InOnClick: ",t.state.checkChanged),console.log("InOnClick: ",t.state.changedCards),t.forceUpdate(),t.handleSaveCollectionButtonClick("test")}))}},{key:"handleCardPurchasedCheckboxClick",value:function(e){var t=this,a=e.currentTarget.htmlFor,n=this.state.collectionCards.find((function(e){return e.collection_card_key===a}));n.purchased=!n.purchased,this.state.changedCards.add(a),this.setState({collectionCards:this.state.collectionCards,checkChanged:!this.state.checkChanged},(function(){t.forceUpdate()}))}},{key:"handleSaveCollectionButtonClick",value:function(e){var t=this,a=Object(ne.a)({},this.state).collectionCards,n=Object(oe.a)(this.state.changedCards).map((function(e){return a.find((function(t){return t.collection_card_key===e}))}));ve.patchCollectionCards(n).then((function(e){t.setState({changedCards:new Set},(function(){t.forceUpdate()}))})).catch((function(e){alert(e)}))}},{key:"render",value:function(){var e=this;this.state.propertyValues.setNames;var t=this.state,a=t.collectionCards,n=t.filters,c=(this.props.tcgApi,n.setNameFilter&&n.setNameFilter.filterVal,"");this.state.propertyValues.collectionNames!={}&&(c=Object.keys(this.state.propertyValues.collectionNames)[0]);var s=0,r=this.state.collectionCards.reduce((function(e,t){return e+t.count}),0);a.length>0&&(s=r/a.length),s*=100,s=Math.round(s,2)+"%";var o=[{dataField:"collectionName",text:"collection name",searchable:!0,filter:Object(xe.selectFilter)({options:this.state.propertyValues.collectionNames}),sort:!0},{dataField:"numberFull",text:"number",searchable:!0,headerStyle:function(e,t){return{width:"6em"}},sort:!0},{dataField:"cardId",text:"cardId",searchable:!0,hidden:!0,sort:!0},{dataField:"name",text:"name",searchable:!0,sort:!0},{dataField:"rarity",text:"rarity",searchable:!0,sort:!0,headerStyle:function(e,t){return{width:"10em"}}},{dataField:"setName",text:"setName",searchable:!0,style:function(e,t){return{whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}},sort:!0,filter:Object(xe.selectFilter)({options:this.state.propertyValues.setNames})},{dataField:"setReleaseDate",text:"release date",searchable:!0,sort:!0,headerStyle:function(e,t){return{width:"7em"}}},{dataField:"collection_card_key",text:"collection_card_key",hidden:!0,sort:!0},{dataField:"orderNumber",text:"col",headerStyle:function(e,t){return{width:"3em"}},sort:!0},{dataField:"binderPageNo",text:"pg",headerStyle:function(e,t){return{width:"3em"}},sort:!0},{dataField:"binderSlotNo",text:"slot",headerStyle:function(e,t){return{width:"3em"}},sort:!0},{dataField:"count",text:"Collected",filter:Object(xe.selectFilter)({options:[{value:0,label:"N"},{value:1,label:"Y"}]}),headerStyle:function(e,t){return{width:"7em"}},formatExtraData:{collectionCards:this.state.collectionCards,changed:this.state.checkChanged},formatter:function(t,a,n,c){var s=c.collectionCards.find((function(e){return e.collection_card_key===a.collection_card_key}));return Object(L.jsx)(Me.a,{className:"my-0",id:a.collection_card_key,type:"checkbox",variant:"outline-primary",checked:1==s.count,value:s.count,onClick:e.handleCardCollectedCheckboxClick,data:a.cardId,size:"sm",children:s.count?Object(L.jsx)("i",{className:"bi bi-check-circle-fill"}):Object(L.jsx)("i",{className:"bi bi-circle"})})}},{dataField:"purchased",text:"purchased",filter:Object(xe.selectFilter)({options:[{value:!1,label:"N"},{value:!0,label:"Y"}]}),headerStyle:function(e,t){return{width:"7em"}},formatExtraData:{collectionCards:this.state.collectionCards,changed:this.state.checkChanged},formatter:function(t,a,n,c){var s=c.collectionCards.find((function(e){return e.collection_card_key===a.collection_card_key}));return Object(L.jsx)(Me.a,{className:"my-0",id:a.collection_card_key,type:"checkbox",variant:"outline-primary",checked:s.purchased,value:s.purchased,onClick:e.handleCardPurchasedCheckboxClick,data:a.cardId,size:"sm",children:s.purchased?Object(L.jsx)("i",{className:"bi bi-check-circle-fill"}):Object(L.jsx)("i",{className:"bi bi-circle"})})}}];return Object(L.jsxs)("div",{className:"container-fluid",children:[Object(L.jsx)("header",{className:"jumbotron",children:this.state.displaySingleCollection?Object(L.jsxs)("h1",{children:["Collection ",c," - ",s]}):null}),Object(L.jsxs)(Ee.a,{children:[Object(L.jsx)(Le.a,{classnames:"col-md-auto",children:Object(L.jsx)("h3",{children:"Search for cards:"})}),Object(L.jsx)(Le.a,{xs:1,children:Object(L.jsx)(Fe.a,{variant:"primary",onClick:this.handleSaveCollectionButtonClick,children:"Save"})})]}),Object(L.jsx)(ke.a,{data:a,columns:o,keyField:"collection_card_key",striped:!0,hover:!0,exportCSV:{fileName:"custom.csv",separator:"|",ignoreHeader:!0,noAutoBOM:!1},condensed:!0,search:!0,children:function(t){return Object(L.jsxs)("div",{children:[Object(L.jsx)(ze,Object(ne.a)({},t.searchProps)),Object(L.jsx)("hr",{}),Object(L.jsx)(pe.a,Object(ne.a)(Object(ne.a)({},t.baseProps),{},{srText:"sss",formatExtraData:e.state.collectionCards,filter:Ce()(),pagination:Se()({sizePerPageList:[{text:"10",value:10},{text:"30",value:30},{text:"All",value:e.state.collectionCards.length}]})}))]})}})]})}}]),a}(n.Component);var qe=Object(h.b)((function(e){return{tcgApi:e.tcgApi}}))(Qe);var Ke=function(e){var t=Object(b.h)().collectionid;return Object(L.jsx)(qe,{collectionid:t})};var Ye=function(e){var t=Object(b.h)().id;return Object(L.jsx)(qe,{id:t})},We=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).logOut=n.logOut.bind(Object(l.a)(n)),n.state={showModeratorBoard:!1,showAdminBoard:!1,currentUser:void 0},Ge.listen((function(t){e.dispatch({type:w})})),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.user;e&&(console.log(e.roles),this.setState({currentUser:e,showModeratorBoard:e.roles.includes("ROLE_MODERATOR"),showAdminBoard:e.roles.includes("ROLE_ADMIN")}))}},{key:"logOut",value:function(){this.props.dispatch((function(e){E.logout(),e({type:N})})),this.setState({showModeratorBoard:!1,showAdminBoard:!1,currentUser:void 0})}},{key:"render",value:function(){var e=this.state,t=e.currentUser,a=(e.showModeratorBoard,e.showAdminBoard,this.props.user);return console.log(null===a||void 0===a?void 0:a.roles),console.log("haha"),Object(L.jsx)(j.a,{history:Ge,children:Object(L.jsxs)("div",{children:[Object(L.jsxs)("nav",{className:"navbar navbar-expand navbar-dark bg-dark",children:[Object(L.jsx)(j.b,{to:"/",className:"navbar-brand",children:"bezKoder"}),Object(L.jsxs)("div",{className:"navbar-nav mr-auto",children:[Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/home",className:"nav-link",children:"Home"})}),(null===a||void 0===a?void 0:a.roles.includes("ROLE_MODERATOR"))&&Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/mod",className:"nav-link",children:"Moderator Board"})}),(null===a||void 0===a?void 0:a.roles.includes("ROLE_ADMIN"))&&Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/admin",className:"nav-link",children:"Admin Board"})}),Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/collections",className:"nav-link",children:"Collections"})}),t&&Object(L.jsx)(c.a.Fragment,{children:Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/epic",className:"nav-link",children:"Epic"})})})]}),t?Object(L.jsxs)("div",{className:"navbar-nav ml-auto",style:{marginLeft:"auto"},children:[Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/profile",className:"nav-link",children:t.username})}),Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/user",className:"nav-link",children:"User"})}),Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)("a",{href:"/login",className:"nav-link",onClick:this.logOut,children:"LogOut"})})]}):Object(L.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/login",className:"nav-link",children:"Login"})}),Object(L.jsx)("li",{className:"nav-item",children:Object(L.jsx)(j.b,{to:"/register",className:"nav-link",children:"Sign Up"})})]})]}),Object(L.jsx)("div",{className:"mt-3",children:Object(L.jsxs)(b.d,{children:[Object(L.jsx)(b.b,{exact:!0,path:"/",element:Object(L.jsx)(K,{})}),Object(L.jsx)(b.b,{exact:!0,path:"/home",element:Object(L.jsx)(K,{})}),Object(L.jsx)(b.b,{exact:!0,path:"/login",element:Object(L.jsx)(R,{})}),Object(L.jsx)(b.b,{exact:!0,path:"/register",element:Object(L.jsx)(H,{})}),Object(L.jsx)(b.b,{exact:!0,path:"/profile",element:Object(L.jsx)(W,{})}),Object(L.jsx)(b.b,{path:"/user",element:Object(L.jsx)(X,{})}),Object(L.jsx)(b.b,{path:"/mod",element:Object(L.jsx)(Z,{})}),Object(L.jsx)(b.b,{path:"/admin",element:Object(L.jsx)($,{})}),Object(L.jsx)(b.b,{path:"/collections",element:Object(L.jsx)(Te,{})}),Object(L.jsx)(b.b,{path:"/collection/create",element:Object(L.jsx)(Be,{})}),Object(L.jsx)(b.b,{path:"/collection/:id",element:Object(L.jsx)(Ye,{})}),Object(L.jsx)(b.b,{path:"/epic",element:Object(L.jsx)(Ke,{})}),Object(L.jsx)(b.b,{path:"*",element:Object(L.jsx)(He,{})})]})}),Object(L.jsx)(Ve,{logOut:this.logOut,history:Ge})]})})}}]),a}(n.Component);var Xe=Object(h.b)((function(e){return{user:e.auth.user}}))(We),Ze=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,412)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))};r.a.render(Object(L.jsx)(c.a.StrictMode,{children:Object(L.jsx)(h.a,{store:be,children:Object(L.jsx)(Xe,{})})}),document.getElementById("root")),Ze()}},[[408,1,2]]]);
//# sourceMappingURL=main.d9e7770a.chunk.js.map