function pug_escape(e){var t=""+e,n=pug_match_html.exec(t);if(!n)return e;var s,a,r,o="";for(s=n.index,a=0;s<t.length;s++){switch(t.charCodeAt(s)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}a!==s&&(o+=t.substring(a,s)),a=s+1,o+=r}return a!==s?o+t.substring(a,s):o}var pug_match_html=/["&<>]/;function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function GuestWithRelationship(e){var t,n,s,a="";try{var r=e||{};(function(e){s=8,s=15,s=22,s=25,s=28,s=35,s=38,s=45,s=48,s=51,s=54,s=73,s=76,s=79,s=82,s=85,s=88,s=91,s=94,s=97,s=100,s=103,s=106,s=109,s=112,s=119,s=122,s=125,s=128,s=131,s=138,s=141,s=144,s=147,s=150,s=157,s=160,s=163,s=166,s=169,s=172,n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n=n="speech/templates/pug-ssml-mixins.pug",s=2,a+="<s>",s=3,a+="To experience this BMO voice banking service ",s=4,a+='<break time="10ms"></break>',s=5,a+="as a customer. ",s=6,a+='<break time="30ms"></break>',a+='<prosody volume="loud">',s=s=7,a+="I recommend you to </prosody>",s=8,a+='<break time="10ms"></break>',a+='<emphasis level="moderate">',a+="link your ",s=s=s=9,a+=pug_escape(null==(t=e)?"":t),s=9,a+=" online-banking account </emphasis>",s=10,a+='<break time="10ms"></break>',s=11,a+="with alexa companion app. ",s=12,a+='<break time="1s"></break>',s=13,a+="I sent instructions for how to do this  in your Alexa companion app.</s>"}).call(this,"Institution_Name"in r?r.Institution_Name:"undefined"!=typeof Institution_Name?Institution_Name:void 0)}catch(e){pug_rethrow(e,n,s)}return a}function pug_escape(e){var t=""+e,n=pug_match_html.exec(t);if(!n)return e;var s,a,r,o="";for(s=n.index,a=0;s<t.length;s++){switch(t.charCodeAt(s)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}a!==s&&(o+=t.substring(a,s)),a=s+1,o+=r}return a!==s?o+t.substring(a,s):o}exports.GuestWithRelationship=GuestWithRelationship;pug_match_html=/["&<>]/;function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function Notifications_SummaryIntent(e){var o,t,i,u="";try{var n=e||{};(function(e){i=8,i=15,i=22,i=25,i=28,i=35,i=38,i=45,i=48,i=51,i=54,i=73,i=76,i=79,i=82,i=85,i=88,i=91,i=94,i=97,i=100,i=103,i=106,i=109,i=112,i=119,i=122,i=125,i=128,i=131,i=138,i=141,i=144,i=147,i=150,i=157,i=160,i=163,i=166,i=169,i=172,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/pug-ssml-mixins.pug",i=2;var a=e;i=3;var r=1;i=4,u+="<s>",i=5,u+="I figure out few best BMO offers , ",i=6,u+='<break time="20ms"></break>',i=7,u+="related to your interest. ",i=8,u+='<break time="1s"></break>',i=9,function(){var e=a;if("number"==typeof e.length)for(var t=0,n=e.length;t<n;t++){var s=e[t];u+="Number ",i=i=10,u+=pug_escape(null==(o=r)?"":o),i=10,u+=" in the list",i=11,u+='<break time="20ms"></break>',i=i=12,u=(u+='<emphasis level="moderate">')+pug_escape(null==(o=s.Message_Summary)?"":o)+"</emphasis>",i=13,r+=1}else{n=0;for(var t in e){n++;s=e[t];u+="Number ",i=i=10,u+=pug_escape(null==(o=r)?"":o),i=10,u+=" in the list",i=11,u+='<break time="20ms"></break>',i=i=12,u=(u+='<emphasis level="moderate">')+pug_escape(null==(o=s.Message_Summary)?"":o)+"</emphasis>",i=13,r+=1}}}.call(this),u+="</s>"}).call(this,"nList"in n?n.nList:"undefined"!=typeof nList?nList:void 0)}catch(e){pug_rethrow(e,t,i)}return u}function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function StartTourIntent(e){var t,n,s="";try{n=8,n=15,n=22,n=25,n=28,n=35,n=38,n=45,n=48,n=51,n=54,n=73,n=76,n=79,n=82,n=85,n=88,n=91,n=94,n=97,n=100,n=103,n=106,n=109,n=112,n=119,n=122,n=125,n=128,n=131,n=138,n=141,n=144,n=147,n=150,n=157,n=160,n=163,n=166,n=169,n=172,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/pug-ssml-mixins.pug",n=2,s+="<s>",n=3,s+="I am going to summarize, ",n=4,s+='<break time="20ms"></break>',n=5,s+="few user specific ",s+='<emphasis level="moderate">',n=n=6,s+="transaction examples </emphasis>",n=7,s+='<break time="20ms"></break>',n=8,s+="to understand my proficiency level. ",n=10,s+='<break time="1s"></break>',n=12,s+="let's get started!",n=14,s+='<break time="1s"></break>',n=1,s+="<s>",n=2,s+="To check your balance:",s+="\n",n=n=4,s+="You can say like,",s+="\n",n=n=6,s+="What's my balance?",s+="\n",n=n=8,s+="Or",s+="\n",n=n=10,s+="Balance please",s+="\n",n=n=12,t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/en-ca/TourEnquireBalance.pug",s+="As a result of this, you can get your current balance from your linked bank account.</s>",n=19,s+='<break time="1s"></break>',s+="<s>",n=n=1,s+="   ",n=2,s+="To Send money to a safe-zone payee:",s+="\n",n=n=4,s+="You can say like,",s+="\n",n=n=6,s+="Send $200 to MOM",s+="\n",n=n=8,s+="Send $200 to MOM for monthly maintenance",s+="\n",n=n=10,s+="Or",s+="\n",n=n=12,s+="I want to send some money to MOM",s+="\n",n=n=14,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/en-ca/TourSendMoney.pug",s+="At the end of this conversation $200 will be sent to your MOM and purpose of transfer also tracked. As per this example, MOM is a short name for a safe-zone payee account.</s>",n=24,s+='<break time="1s"></break>',n=1,s+="<s>",n=2,s+="To enquire about your expenditures:",s+="\n",n=n=4,s+="You can say like,",s+="\n",n=n=6,s+="Get my last 5 transactions?",s+="\n",n=n=8,s+="How much I spent for this month?",s+="\n",n=n=10,s+="How much I spent between Apr 20 to Apr 25?",s+="\n",n=n=12,s+="How much I spent yesterday?",s+="\n",n=n=14,t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/en-ca/TourEnquireExpenditures.pug",s+="You can ask any time span as per your necessity.</s>",n=29,s+='<break time="1s"></break>',n=33,s+="Other than this, I can help a lot, related to your credit card, personal loan and ",s+='<prosody rate="slow">',n=n=35,s+="you name it I have it! </prosody>",n=37,s+='<break time="1s"></break>',n=1,s+="<s>",n=2,s+="You can seek help anytime without hesitation,",s+="\n",n=n=4,s+="For Example,",s+="\n",n=n=6,s+="HELP, What's safe-zone payee?",s+="\n",n=n=8,s+="Otherwise,",s+="\n",n=n=10,t=t=t=t=t=t=t=t=t=t="speech/templates/en-ca/TourHelp.pug",s+="HELP, And then your question</s>",n=42,s+='<break time="1s"></break>',n=46,s+="Well!",n=48,s+='<break time="2s"></break>',s+='<emphasis level="moderate">',n=n=50,s+="I guess tour is over!</emphasis>",n=52,s+='<break time="1s"></break>',n=55,s+="Thank's for your time! and enjoy your experience with BMO.</s>"}catch(e){pug_rethrow(e,t,n)}return s}function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function TourEnquireBalance(e){var t,n,s="";try{n=8,n=15,n=22,n=25,n=28,n=35,n=38,n=45,n=48,n=51,n=54,n=73,n=76,n=79,n=82,n=85,n=88,n=91,n=94,n=97,n=100,n=103,n=106,n=109,n=112,n=119,n=122,n=125,n=128,n=131,n=138,n=141,n=144,n=147,n=150,n=157,n=160,n=163,n=166,n=169,n=172,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/pug-ssml-mixins.pug",n=2,s+="<s>",n=3,s+="To check your balance:",s+="\n",n=n=5,s+="You can say like,",s+="\n",n=n=7,s+="What's my balance?",s+="\n",n=n=9,s+="Or",s+="\n",n=n=11,s+="Balance please",s+="\n",n=n=13,s+="As a result of this, you can get your current balance from your linked bank account.</s>"}catch(e){pug_rethrow(e,t,n)}return s}function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function TourEnquireExpenditures(e){var t,n,s="";try{n=8,n=15,n=22,n=25,n=28,n=35,n=38,n=45,n=48,n=51,n=54,n=73,n=76,n=79,n=82,n=85,n=88,n=91,n=94,n=97,n=100,n=103,n=106,n=109,n=112,n=119,n=122,n=125,n=128,n=131,n=138,n=141,n=144,n=147,n=150,n=157,n=160,n=163,n=166,n=169,n=172,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/pug-ssml-mixins.pug",n=2,s+="<s>",n=3,s+="To enquire about your expenditures:",s+="\n",n=n=5,s+="You can say like,",s+="\n",n=n=7,s+="Get my last 5 transactions?",s+="\n",n=n=9,s+="How much I spent for this month?",s+="\n",n=n=11,s+="How much I spent between Apr 20 to Apr 25?",s+="\n",n=n=13,s+="How much I spent yesterday?",s+="\n",n=n=15,s+="You can ask any time span as per your necessity.</s>"}catch(e){pug_rethrow(e,t,n)}return s}function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function TourHelp(e){var t,n,s="";try{n=8,n=15,n=22,n=25,n=28,n=35,n=38,n=45,n=48,n=51,n=54,n=73,n=76,n=79,n=82,n=85,n=88,n=91,n=94,n=97,n=100,n=103,n=106,n=109,n=112,n=119,n=122,n=125,n=128,n=131,n=138,n=141,n=144,n=147,n=150,n=157,n=160,n=163,n=166,n=169,n=172,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/pug-ssml-mixins.pug",n=2,s+="<s>",n=3,s+="You can seek help anytime without hesitation,",s+="\n",n=n=5,s+="For Example,",s+="\n",n=n=7,s+="HELP, What's safe-zone payee?",s+="\n",n=n=9,s+="Otherwise,",s+="\n",n=n=11,s+="HELP, And then your question</s>"}catch(e){pug_rethrow(e,t,n)}return s}function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function TourSendMoney(e){var t,n,s="";try{n=8,n=15,n=22,n=25,n=28,n=35,n=38,n=45,n=48,n=51,n=54,n=73,n=76,n=79,n=82,n=85,n=88,n=91,n=94,n=97,n=100,n=103,n=106,n=109,n=112,n=119,n=122,n=125,n=128,n=131,n=138,n=141,n=144,n=147,n=150,n=157,n=160,n=163,n=166,n=169,n=172,t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t=t="speech/templates/pug-ssml-mixins.pug",s+="<s>",n=n=2,s+="   ",n=3,s+="To Send money to a safe-zone payee:",s+="\n",n=n=5,s+="You can say like,",s+="\n",n=n=7,s+="Send $200 to MOM",s+="\n",n=n=9,s+="Send $200 to MOM for monthly maintenance",s+="\n",n=n=11,s+="Or",s+="\n",n=n=13,s+="I want to send some money to MOM",s+="\n",n=n=15,s+="At the end of this conversation $200 will be sent to your MOM and purpose of transfer also tracked. As per this example, MOM is a short name for a safe-zone payee account.</s>"}catch(e){pug_rethrow(e,t,n)}return s}function pug_escape(e){var t=""+e,n=pug_match_html.exec(t);if(!n)return e;var s,a,r,o="";for(s=n.index,a=0;s<t.length;s++){switch(t.charCodeAt(s)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}a!==s&&(o+=t.substring(a,s)),a=s+1,o+=r}return a!==s?o+t.substring(a,s):o}exports.Notifications_SummaryIntent=Notifications_SummaryIntent,exports.StartTourIntent=StartTourIntent,exports.TourEnquireBalance=TourEnquireBalance,exports.TourEnquireExpenditures=TourEnquireExpenditures,exports.TourHelp=TourHelp,exports.TourSendMoney=TourSendMoney;pug_match_html=/["&<>]/;function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function UserWelcomeIntent(e){var r,o,i,u="",p={};try{var t=e||{};(function(e,t,n,s,a){i=8,i=15,o=o="speech/templates/pug-ssml-mixins.pug",p["weak-break"]=r=function(){var e=this&&this.block;this&&this.attributes;i=16,u+='<break strength="weak">',i=17,o=o="speech/templates/pug-ssml-mixins.pug",e&&e(),u+="</break>"},i=22,i=25,i=28,i=35,i=38,i=45,i=48,i=51,i=54,i=73,i=76,i=79,i=82,i=85,i=88,i=91,i=94,i=97,i=100,i=103,i=106,i=109,i=112,i=119,i=122,o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o=o="speech/templates/pug-ssml-mixins.pug",p.slow=r=function(){var e=this&&this.block;this&&this.attributes;i=123,u+='<prosody rate="slow">',i=124,o=o="speech/templates/pug-ssml-mixins.pug",e&&e(),u+="</prosody>"},i=125,i=128,i=131,i=138,i=141,i=144,i=147,i=150,i=157,i=160,i=163,i=166,i=169,o=o=o=o=o=o=o=o=o=o=o=o=o="speech/templates/pug-ssml-mixins.pug",p.loud=r=function(){var e=this&&this.block;this&&this.attributes;i=170,u+='<prosody volume="loud">',i=171,o=o="speech/templates/pug-ssml-mixins.pug",e&&e(),u+="</prosody>"},i=172,o="speech/templates/pug-ssml-mixins.pug",i=3,t?(i=30,u+="<s>",i=31,p.slow.call({block:function(){i=32,p.loud.call({block:function(){u+="Hello ",i=i=33,u+=pug_escape(null==(r=a)?"":r),u+=" ",i=i=33,u+=pug_escape(null==(r=e)?"":r),i=33,u+=", "}})}}),i=34,p["weak-break"].call({block:function(){i=35,p.slow.call({block:function(){i=36,u+="How may I help you now?"}})}}),u+="</s>"):(i=4,i=s?(i=24,u+="<s>",u+='<prosody volume="loud">',i=i=25,u+="Say </prosody>",i=26,u+='<break time="20ms"></break>',u+='<emphasis level="strong">',i=i=27,u+="'Okay' </emphasis>",28):(u+="<s>",i=i=5,u+=" ",u+="Hello ",i=i=6,u+=pug_escape(null==(r=a)?"":r),u+=" ",i=i=6,u+=pug_escape(null==(r=e)?"":r),i=6,u+=", ",u+='<break time="40ms">',i=i=7,u+=" </break>",i=8,u+="Welcome to ",u+='<prosody volume="loud">',i=i=9,u+=" ",u+='<prosody rate="medium">',i=i=10,u+=pug_escape(null==(r=n.Institution_Name)?"":r),i=10,u+=" </prosody></prosody>",u+='<break time="1s">',i=i=11,u+=" </break>",i=12,u+="I am your personal banker,",u+="\n",i=i=13,u+="always here to help your day to day banking activities ",u+='<break time="1s">',i=i=14,u+=" </break>",u+='<prosody volume="loud">',i=i=15,u+="I recommend a </prosody>",u+='<emphasis level="moderate">',i=i=16,u+="quick tour </emphasis>",i=17,u+="to explore this voice banking service.",i=18,u+='<break time="2s"></break>',u+='<prosody volume="loud">',i=i=19,u+="Say </prosody>",i=20,u+='<break time="20ms"></break>',u+='<emphasis level="strong">',i=i=21,u+="'Okay' </emphasis>",22),u+="to continue.</s>")}).call(this,"First_Name"in t?t.First_Name:"undefined"!=typeof First_Name?First_Name:void 0,"Is_Tour_Completed"in t?t.Is_Tour_Completed:"undefined"!=typeof Is_Tour_Completed?Is_Tour_Completed:void 0,"Login"in t?t.Login:"undefined"!=typeof Login?Login:void 0,"Reprompt_Message"in t?t.Reprompt_Message:"undefined"!=typeof Reprompt_Message?Reprompt_Message:void 0,"Title"in t?t.Title:"undefined"!=typeof Title?Title:void 0)}catch(e){pug_rethrow(e,o,i)}return u}function pug_escape(e){var t=""+e,n=pug_match_html.exec(t);if(!n)return e;var s,a,r,o="";for(s=n.index,a=0;s<t.length;s++){switch(t.charCodeAt(s)){case 34:r="&quot;";break;case 38:r="&amp;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}a!==s&&(o+=t.substring(a,s)),a=s+1,o+=r}return a!==s?o+t.substring(a,s):o}exports.UserWelcomeIntent=UserWelcomeIntent;pug_match_html=/["&<>]/;function pug_rethrow(e,t,s,n){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&t||n))throw e.message+=" on line "+s,e;try{n=n||require("fs").readFileSync(t,"utf8")}catch(t){pug_rethrow(e,null,s)}var a=3,r=n.split("\n"),o=Math.max(s-a,0),i=Math.min(r.length,s+a);a=r.slice(o,i).map(function(e,t){var n=t+o+1;return(n==s?"  > ":"    ")+n+"| "+e}).join("\n");throw e.path=t,e.message=(t||"Pug")+":"+s+"\n"+a+"\n\n"+e.message,e}function WelcomeIntent(e){var n,s,a,r="",o={};try{var t=e||{};(function(e,t){a=8,a=15,a=22,a=25,a=28,a=35,a=38,a=45,a=48,a=51,a=54,a=73,a=76,a=79,a=82,a=85,a=88,a=91,a=94,a=97,a=100,a=103,a=106,a=109,a=112,a=119,a=122,s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s=s="speech/templates/pug-ssml-mixins.pug",o.slow=n=function(){var e=this&&this.block;this&&this.attributes;a=123,r+='<prosody rate="slow">',a=124,s=s="speech/templates/pug-ssml-mixins.pug",e&&e(),r+="</prosody>"},a=125,a=128,a=131,a=138,a=141,a=144,a=147,a=150,a=157,a=160,a=163,a=166,a=169,s=s=s=s=s=s=s=s=s=s=s=s=s="speech/templates/pug-ssml-mixins.pug",o.loud=n=function(){var e=this&&this.block;this&&this.attributes;a=170,r+='<prosody volume="loud">',a=171,s=s="speech/templates/pug-ssml-mixins.pug",e&&e(),r+="</prosody>"},a=172,s="speech/templates/pug-ssml-mixins.pug",a=2,a=t?(a=15,r+="<s>",a=16,r+="Are you an ",r+='<break time="20ms">',a=a=17,r+=" </break>",r+='<emphasis level="moderate">',a=a=18,r+="existing customer </emphasis>",r+="with ",a=a=19,r+=pug_escape(null==(n=e)?"":n),19):(a=3,r+="<s>",a=4,r+="Welcome to ",r+='<break time="20ms">',a=a=5,r+=" </break>",a=6,o.loud.call({block:function(){a=7,o.slow.call({block:function(){a=8,r+=pug_escape(null==(n=e)?"":n),a=8,r+=", "}})}}),a=9,r+='<break time="1s"></break>',a=10,r+="Are you an ",r+='<break time="20ms">',a=a=11,r+=" </break>",r+='<emphasis level="moderate">',a=a=12,r+="existing customer </emphasis>",r+="with ",a=a=13,r+=pug_escape(null==(n=e)?"":n),13),r+="?</s>"}).call(this,"Institution_Name"in t?t.Institution_Name:"undefined"!=typeof Institution_Name?Institution_Name:void 0,"Reprompt_Message"in t?t.Reprompt_Message:"undefined"!=typeof Reprompt_Message?Reprompt_Message:void 0)}catch(e){pug_rethrow(e,s,a)}return r}exports.WelcomeIntent=WelcomeIntent;