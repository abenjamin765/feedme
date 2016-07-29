function generateUniqueURL(){for(var e="",a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;10>n;n++)e+=a.charAt(Math.floor(Math.random()*a.length));var s="http://feed.me/"+e;document.getElementById("path--field").value=s}function generateRandomNumber(e){for(var a="",n="0123456789",s=0;e>s;s++)a+=n.charAt(Math.floor(Math.random()*n.length));return a}function addValue(){var e=document.getElementById("valueTypeSelection"),a=e.options[e.selectedIndex].value,n=itemArray.length;itemArray.push(a),"phone"==a?itemDetailArray.push("us"):itemDetailArray.push("none"),"phone"==a?$("#valueWrapper").append('<section class="block" id="valueBlock'+n+'"><a href="javascript:removeValue('+n+')" class="close">✕</a><span class="node-name">'+a+'</span><input type="checkbox" id="phoneNumber'+n+'" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber'+n+'"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone'+n+'" onclick="updateItemDetail(this.id)" id="us'+n+'" checked><label for="us">US</label></li><li><input type="radio" name="phone'+n+'" onclick="updateItemDetail(this.id)" id="uk'+n+'"><label for="uk">UK</label></li><li><input type="radio" name="phone'+n+'" onclick="updateItemDetail(this.id)" id="de'+n+'"><label for="de">DE</label></li></ul></div></div></section>'):$("#valueWrapper").append('<section class="block" id="valueBlock'+n+'"><a href="javascript:removeValue('+n+')" class="close">✕</a><span class="node-name">'+a+"</span></section>"),updateFeed()}function removeValue(e){if("all"==e)itemArray=[],itemDetailArray=[],document.getElementById("valueWrapper").innerHTML="";else{itemArray.splice(e,1),itemDetailArray.splice(e,1),document.getElementById("valueWrapper").innerHTML="";for(var a=0;a<itemArray.length;a+=1)"phone"==itemArray[a]?($("#valueWrapper").append('<section class="block" id="valueBlock'+a+'"><a href="javascript:removeValue('+a+')" class="close">✕</a><span class="node-name">'+itemArray[a]+'</span><input type="checkbox" id="phoneNumber'+a+'" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber'+a+'"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone'+a+'" onclick="updateItemDetail(this.id)" id="us'+a+'" checked><label for="us">US</label></li><li><input type="radio" name="phone'+a+'" onclick="updateItemDetail(this.id)" id="uk'+a+'"><label for="uk">UK</label></li><li><input type="radio" name="phone'+a+'" onclick="updateItemDetail(this.id)" id="de'+a+'"><label for="de">DE</label></li></ul></div></div></section>'),document.getElementById(itemDetailArray[a]+a).checked=!0):$("#valueWrapper").append('<section class="block" id="valueBlock'+a+'"><a href="javascript:removeValue('+a+')" class="close">✕</a><span class="node-name">'+itemArray[a]+"</span></section>")}updateFeed()}function updateItemDetail(e){if("both"==e)gender="both";else if("male"==e)gender="male";else if("female"==e)gender="female";else{var a=e.substring(0,2),n=e.substr(2);itemDetailArray[n]=a}updateFeed()}function newFeed(){feedName="feed",itemArray=["phone"],itemDetailArray=["us"],valueArray=["0","1"],gender="both",document.getElementById("valueTypeSelection").value="firstName",document.getElementById("both").checked=!0,helpToggle=!1,$("#itemNumber").val(valueArray.length),$("#feedName").val(feedName),removeValue("all"),generateUniqueURL(),updateFeed()}function toggleHelp(){if(0==helpToggle){helpToggle=!0;var e="<b>Welcome to Feed.Me help</b><br>Note: To go back to your feed press the help button again<br><br><b>What is Feed.Me for?</b><br>Feed.Me is a tool for developers and designers, you can simply and easily generate spoof JSON data, which is hosted on Feed.Me or you can download as a json file. This helps prototyping and testing if your code would work with real JSON data.";document.getElementById("codeField").innerHTML=e}else helpToggle=!1,updateFeed()}function copyLink(){var e=$("#path--field").val();document.getElementById("path--field").focus(),document.getElementById("path--field").select(),document.execCommand("copy"),document.getElementById("copyButton").focus(),$("#path--field").val("COPIED"),setTimeout(function(){$("#path--field").val(e)},700)}function updateFeed(){if(0==helpToggle){var e="",a="";a='{<br>&nbsp;&nbsp;"<span>'+feedName+'</span>": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>',e=a,valueAmount=valueArray.length;for(var n=0;n<valueArray.length;n+=1){e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>'+n+'</span>": {<br>';var s="";s="male"==gender?chance.name({gender:"male"}):"female"==gender?chance.name({gender:"female"}):chance.name();var t=s;t=t.substring(0,t.indexOf(" ")),t=t.toLowerCase(),t=t.charAt(0);var l=s;l=l.split(" ")[1],firstPlusLast=t+l;var p=chance.bool({likelihood:60}),r=chance.phone({country:"us",mobile:!0}),i=chance.phone({country:"uk",mobile:!0}),o=["175","176","177"],d=Math.floor(3*Math.random()),b="0"+o[d]+"&nbsp;"+generateRandomNumber(7);e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>fullName</span>": "'+s+'"',e+=0==itemArray.length?"<br>":",<br>";for(var u=0;u<itemArray.length;u+=1){var c=itemArray[u],m=itemDetailArray[u];if("firstName"==c)name=s.substring(0,s.indexOf(" ")),e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>firstName</span>": "'+name+'"';else if("lastName"==c)name=s.split(" ")[1],e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>lastName</span>": "'+name+'"';else if("username"==c){var f=firstPlusLast;e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>username</span>": "'+f+'"'}else if("email"==c){var h=firstPlusLast+"@example.com";e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>email</span>": "'+h+'"'}else if("emailVerified"==c)e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>emailVerified</span>": '+p;else if("twitterHandle"==c){var f="@"+firstPlusLast;e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>twitterHandle</span>": "'+f+'"'}else if("phone"==c)if("uk"==m){var v=i;e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>ukPhone</span>": "'+v+'"'}else if("de"==m){var v=b;e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>dePhone</span>": "'+v+'"'}else{var v=r;e=e+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>usPhone</span>": "'+v+'"'}e+=u+1==itemArray.length?"<br>":",<br>"}e+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}",e+=n+1==valueArray.length?"<br>":",<br>"}0==valueAmount&&(e+="<br>");var g="&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}";e+=g,document.getElementById("codeField").innerHTML=e}}var feedName="feed",itemArray=[],itemDetailArray=[],valueArray=["0","1"],gender="both",helpToggle=!1;String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},$("#feedName").focusin("input",function(e){$("#feedName").keyup(function(){setTimeout(function(){var e=$("#feedName").val();e=e.replace(/[^A-Za-z\s!?]/g,""),e=e.toLowerCase();var a=e.split(" "),n=a.length;e="";for(var s=0;n>s;s+=1)e+=0==s?a[s].toLowerCase():a[s].capitalize();feedName=""!=e?e:"Feed",updateFeed()},500)})}),$("#feedName").focusout("input",function(e){var a=$("#feedName").val();""==a&&($("#feedName").val("Feed"),feedName="Feed",updateFeed())}),$("#itemNumber").focusin("input",function(e){$("#itemNumber").keyup(function(){setTimeout(function(){var e=$("#itemNumber").val();if(e=e.split(" ").join(""),e=e.replace(/[^0-9\s!?]/g,""),$("#itemNumber").val(e),""!=e){valueArray=[];for(var a=0;e>a;a+=1)valueArray.push('"'+a+'"')}updateFeed()},300)})}),$("#itemNumber").focusout("input",function(e){var a=$("#itemNumber").val();""==a&&($("#itemNumber").val("2"),valueArray=["0","1"],updateFeed())}),generateUniqueURL(),updateFeed();