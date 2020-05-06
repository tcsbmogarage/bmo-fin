function pug_escape(s){var e=""+s,t=pug_match_html.exec(e);if(!t)return s;var o,n,u,i="";for(o=t.index,n=0;o<e.length;o++){switch(e.charCodeAt(o)){case 34:u="&quot;";break;case 38:u="&amp;";break;case 60:u="&lt;";break;case 62:u="&gt;";break;default:continue}n!==o&&(i+=e.substring(n,o)),n=o+1,i+=u}return n!==o?i+e.substring(n,o):i}var pug_match_html=/["&<>]/;function pug_rethrow(s,e,o,t){if(!(s instanceof Error))throw s;if(!("undefined"==typeof window&&e||t))throw s.message+=" on line "+o,s;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(s,null,o)}var n=3,u=t.split("\n"),i=Math.max(o-n,0),l=Math.min(u.length,o+n);n=u.slice(i,l).map(function(s,e){var t=e+i+1;return(t==o?"  > ":"    ")+t+"| "+s}).join("\n");throw s.path=e,s.message=(e||"Pug")+":"+o+"\n"+n+"\n\n"+s.message,s}function UserWelcomeIntent(s){var n,u,i,l="",r={};try{var e=s||{};(function(s,e,t,o){i=8,i=15,u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",r["weak-break"]=n=function(){var s=this&&this.block;this&&this.attributes;i=16,l+='<break strength="weak">',i=17,u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),l+="</break>"},i=22,i=25,i=28,i=35,i=38,i=45,i=48,i=51,i=54,i=73,i=76,i=79,i=82,i=85,i=88,i=91,i=94,i=97,i=100,i=103,i=106,i=109,i=112,i=119,i=122,u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",r.slow=n=function(){var s=this&&this.block;this&&this.attributes;i=123,l+='<prosody rate="slow">',i=124,u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),l+="</prosody>"},i=125,i=128,i=131,i=138,i=141,i=144,i=147,u=u=u=u=u=u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",r.high=n=function(){var s=this&&this.block;this&&this.attributes;i=148,l+='<prosody pitch="high">',i=149,u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),l+="</prosody>"},i=150,i=157,i=160,i=163,i=166,i=169,u=u=u=u=u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",r.loud=n=function(){var s=this&&this.block;this&&this.attributes;i=170,l+='<prosody volume="loud">',i=171,u=u="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),l+="</prosody>"},i=172,u="../node_modules/pug-ssml/pug-ssml-mixins.pug",i=3,t?(i=4,l+="<s>",i=5,r.slow.call({block:function(){i=5,l+=" ",l+="Hello ",i=i=6,l+=pug_escape(null==(n=o)?"":n),l+=" ",i=i=6,l+=pug_escape(null==(n=e)?"":n),i=6,l+=", ",l+='<break time="20ms">',i=i=7,l+=" </break>",i=8,l+="Welcome to ",l+='<prosody volume="loud">',i=i=9,l+=" </prosody>",l+='<prosody pitch="high">',i=i=10,l+=pug_escape(null==(n=s[0].Institution_Name)?"":n),i=10,l+=" </prosody>",l+='<break time="20ms">',i=i=11,l+=" </break>",i=12,l+="would you like to take",l+='<prosody volume="loud">',i=i=13,l+="a quick tour? </prosody>"}})):(i=15,l+="<s>",i=16,r.high.call({block:function(){i=17,r.loud.call({block:function(){l+="Hello ",i=i=18,l+=pug_escape(null==(n=o)?"":n),l+=" ",i=i=18,l+=pug_escape(null==(n=e)?"":n),i=18,l+=", "}})}}),i=19,r["weak-break"].call({block:function(){i=20,r.slow.call({block:function(){i=21,l+="How may I help you now?"}})}})),l+="</s>"}).call(this,"Account_Numbers"in e?e.Account_Numbers:"undefined"!=typeof Account_Numbers?Account_Numbers:void 0,"First_Name"in e?e.First_Name:"undefined"!=typeof First_Name?First_Name:void 0,"Is_New"in e?e.Is_New:"undefined"!=typeof Is_New?Is_New:void 0,"Title"in e?e.Title:"undefined"!=typeof Title?Title:void 0)}catch(s){pug_rethrow(s,u,i)}return l}function pug_escape(s){var e=""+s,t=pug_match_html.exec(e);if(!t)return s;var o,n,u,i="";for(o=t.index,n=0;o<e.length;o++){switch(e.charCodeAt(o)){case 34:u="&quot;";break;case 38:u="&amp;";break;case 60:u="&lt;";break;case 62:u="&gt;";break;default:continue}n!==o&&(i+=e.substring(n,o)),n=o+1,i+=u}return n!==o?i+e.substring(n,o):i}exports.UserWelcomeIntent=UserWelcomeIntent;pug_match_html=/["&<>]/;function pug_rethrow(s,e,o,t){if(!(s instanceof Error))throw s;if(!("undefined"==typeof window&&e||t))throw s.message+=" on line "+o,s;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(s,null,o)}var n=3,u=t.split("\n"),i=Math.max(o-n,0),l=Math.min(u.length,o+n);n=u.slice(i,l).map(function(s,e){var t=e+i+1;return(t==o?"  > ":"    ")+t+"| "+s}).join("\n");throw s.path=e,s.message=(e||"Pug")+":"+o+"\n"+n+"\n\n"+s.message,s}function WelcomeIntent(s){var e,t,o,n="",u={};try{var i=s||{};(function(s){o=8,o=15,o=22,o=25,o=28,o=35,o=38,o=45,o=48,o=51,o=54,o=73,o=76,o=79,o=82,o=85,o=88,o=91,o=94,o=97,o=100,o=103,o=106,o=109,o=112,o=119,o=122,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="../node_modules/pug-ssml/pug-ssml-mixins.pug",u.slow=e=function(){var s=this&&this.block;this&&this.attributes;o=123,n+='<prosody rate="slow">',o=124,t=t="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),n+="</prosody>"},o=125,o=128,o=131,o=138,o=141,o=144,o=147,t=t=t=t=t=t=t="../node_modules/pug-ssml/pug-ssml-mixins.pug",u.high=e=function(){var s=this&&this.block;this&&this.attributes;o=148,n+='<prosody pitch="high">',o=149,t=t="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),n+="</prosody>"},o=150,o=157,o=160,o=163,o=166,o=169,t=t=t=t=t=t="../node_modules/pug-ssml/pug-ssml-mixins.pug",u.loud=e=function(){var s=this&&this.block;this&&this.attributes;o=170,n+='<prosody volume="loud">',o=171,t=t="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),n+="</prosody>"},o=172,t="../node_modules/pug-ssml/pug-ssml-mixins.pug",o=2,n+="<s>",o=3,n+="Welcome to ",n+='<break time="20ms">',o=o=4,n+=" ",o=5,u.high.call({block:function(){o=6,u.slow.call({block:function(){o=7,u.loud.call({block:function(){o=8,n+=pug_escape(null==(e=s)?"":e)}})}})}}),n+="</break></s>"}).call(this,"Institution_Name"in i?i.Institution_Name:"undefined"!=typeof Institution_Name?Institution_Name:void 0)}catch(s){pug_rethrow(s,t,o)}return n}exports.WelcomeIntent=WelcomeIntent;