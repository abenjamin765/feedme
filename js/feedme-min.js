function updateFeed(){var e='{<br>&nbsp;&nbsp;"'+feedName+'": {<br>',o="<br>&nbsp;&nbsp;}<br>}";document.getElementById("codeField").innerHTML=e+o}function copyLink(){$copyUrl=$("#path--field").val(),console.log($copyUrl),document.getElementById("path--field").focus(),document.getElementById("path--field").select(),document.execCommand("copy"),document.getElementById("copyButton").focus(),console.log("copied")}function copyToClipboard(e){}for(var feedName="Feed",code="",possible="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;10>i;i++)code+=possible.charAt(Math.floor(Math.random()*possible.length));var uniqueURL="http://feed.me/"+code;document.getElementById("path--field").value=uniqueURL,$("#feedName").focusin("input",function(e){$("#feedName").keyup(function(){setTimeout(function(){var e=$("#feedName").val();e=e.split(" ").join(""),e=e.replace(/[^A-Za-z\s!?]/g,""),$("#feedName").val(e),feedName=""!=e?e:"Feed",updateFeed()},500)})}),updateFeed();