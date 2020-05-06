function pug_escape(s){var e=""+s,t=pug_match_html.exec(e);if(!t)return s;var o,n,i,u="";for(o=t.index,n=0;o<e.length;o++){switch(e.charCodeAt(o)){case 34:i="&quot;";break;case 38:i="&amp;";break;case 60:i="&lt;";break;case 62:i="&gt;";break;default:continue}n!==o&&(u+=e.substring(n,o)),n=o+1,u+=i}return n!==o?u+e.substring(n,o):u}var pug_match_html=/["&<>]/;function pug_rethrow(s,e,o,t){if(!(s instanceof Error))throw s;if(!("undefined"==typeof window&&e||t))throw s.message+=" on line "+o,s;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(s,null,o)}var n=3,i=t.split("\n"),u=Math.max(o-n,0),l=Math.min(i.length,o+n);n=i.slice(u,l).map(function(s,e){var t=e+u+1;return(t==o?"  > ":"    ")+t+"| "+s}).join("\n");throw s.path=e,s.message=(e||"Pug")+":"+o+"\n"+n+"\n\n"+s.message,s}function UserWelcomeIntent(s){var t,o,n,i="",u={};try{var e=s||{};(function(s,e){n=8,n=15,o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",u["weak-break"]=t=function(){var s=this&&this.block;this&&this.attributes;n=16,i+='<break strength="weak">',n=17,o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),i+="</break>"},n=22,n=25,n=28,n=35,n=38,n=45,n=48,n=51,n=54,n=73,n=76,n=79,n=82,n=85,n=88,n=91,n=94,n=97,n=100,n=103,n=106,n=109,n=112,n=119,n=122,o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",u.slow=t=function(){var s=this&&this.block;this&&this.attributes;n=123,i+='<prosody rate="slow">',n=124,o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),i+="</prosody>"},n=125,n=128,n=131,n=138,n=141,n=144,n=147,o=o=o=o=o=o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",u.high=t=function(){var s=this&&this.block;this&&this.attributes;n=148,i+='<prosody pitch="high">',n=149,o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),i+="</prosody>"},n=150,n=157,n=160,n=163,n=166,n=169,o=o=o=o=o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",u.loud=t=function(){var s=this&&this.block;this&&this.attributes;n=170,i+='<prosody volume="loud">',n=171,o=o="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),i+="</prosody>"},n=172,o="../node_modules/pug-ssml/pug-ssml-mixins.pug",n=2,i+="<s>",n=3,u.high.call({block:function(){n=4,u.loud.call({block:function(){i+="Bonjour ",n=n=5,i+=pug_escape(null==(t=e)?"":t),i+=" ",n=n=5,i+=pug_escape(null==(t=s)?"":t),n=5,i+=", "}})}}),n=6,u["weak-break"].call({block:function(){n=7,u.slow.call({block:function(){n=8,i+="Comment puis-je vous aider aujourd'hui?"}})}}),i+="</s>"}).call(this,"First_Name"in e?e.First_Name:"undefined"!=typeof First_Name?First_Name:void 0,"Title"in e?e.Title:"undefined"!=typeof Title?Title:void 0)}catch(s){pug_rethrow(s,o,n)}return i}function pug_rethrow(s,e,o,t){if(!(s instanceof Error))throw s;if(!("undefined"==typeof window&&e||t))throw s.message+=" on line "+o,s;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(s,null,o)}var n=3,i=t.split("\n"),u=Math.max(o-n,0),l=Math.min(i.length,o+n);n=i.slice(u,l).map(function(s,e){var t=e+u+1;return(t==o?"  > ":"    ")+t+"| "+s}).join("\n");throw s.path=e,s.message=(e||"Pug")+":"+o+"\n"+n+"\n\n"+s.message,s}function WelcomeIntent(s){var e,t,o="",n={};try{t=8,t=15,e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",n["weak-break"]=function(){var s=this&&this.block;this&&this.attributes;t=16,o+='<break strength="weak">',t=17,e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),o+="</break>"},t=22,t=25,t=28,t=35,t=38,t=45,t=48,t=51,t=54,t=73,t=76,t=79,t=82,t=85,t=88,t=91,t=94,t=97,t=100,t=103,t=106,t=109,t=112,t=119,t=122,e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",n.slow=function(){var s=this&&this.block;this&&this.attributes;t=123,o+='<prosody rate="slow">',t=124,e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),o+="</prosody>"},t=125,t=128,t=131,t=138,t=141,t=144,t=147,e=e=e=e=e=e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",n.high=function(){var s=this&&this.block;this&&this.attributes;t=148,o+='<prosody pitch="high">',t=149,e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),o+="</prosody>"},t=150,t=157,t=160,t=163,t=166,t=169,e=e=e=e=e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",n.loud=function(){var s=this&&this.block;this&&this.attributes;t=170,o+='<prosody volume="loud">',t=171,e=e="../node_modules/pug-ssml/pug-ssml-mixins.pug",s&&s(),o+="</prosody>"},t=172,e="../node_modules/pug-ssml/pug-ssml-mixins.pug",t=2,o+="<s>",t=3,o+="Bienvenue à la   ",t=4,n["weak-break"].call({block:function(){t=5,n.high.call({block:function(){t=6,n.slow.call({block:function(){t=7,n.loud.call({block:function(){t=8,o+="Banque de Montréal"}})}})}})}}),o+="</s>"}catch(s){pug_rethrow(s,e,t)}return o}exports.UserWelcomeIntent=UserWelcomeIntent,exports.WelcomeIntent=WelcomeIntent;