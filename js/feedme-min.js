function generateUniqueURL(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;10>a;a++)e+=t.charAt(Math.floor(Math.random()*t.length));var n="http://feed.me/"+e;document.getElementById("path--field").value=n}function addValue(){valueAmount=valueArray.length+=1,updateValues(valueAmount)}function removeValue(){valueArray.length>0&&(valueAmount=valueArray.length-=1,updateValues(valueAmount))}function updateValues(e){valueArray=[];for(var t=0;e>t;t+=1)valueArray.push('"'+t+'"');updateFeed()}function newFeed(){feedName="Feed",itemAmount=2,itemArray=[],valueArray=["0","1"],helpToggle=!1,$("#itemNumber").val(itemAmount),$("#feedName").val(feedName),generateUniqueURL(),updateFeed()}function toggleHelp(){if(0==helpToggle){helpToggle=!0;var e="<b>Welcome to Feed.Me help</b><br><span>Note: To go back to your feed press the help button again</span><br><br><b>What is Feed.Me for?</b><br><span>Feed.Me is a tool for developers and designers, you can simply and easily generate spoof JSON data, which is hosted on Feed.Me or you can download as a json file. This helps prototyping and testing if your code would work with real JSON data.</span>";document.getElementById("codeField").innerHTML=e}else helpToggle=!1,updateFeed()}function copyLink(){var e=$("#path--field").val();document.getElementById("path--field").focus(),document.getElementById("path--field").select(),document.execCommand("copy"),document.getElementById("copyButton").focus(),$("#path--field").val("COPIED"),setTimeout(function(){$("#path--field").val(e)},700)}function updateFeed(){if(0==helpToggle){var e="",t='{<br>&nbsp;&nbsp;"'+feedName+'": {<br>';e=t,valueAmount=valueArray.length;for(var a=0;a<valueArray.length;a+=1)e=e+'&nbsp;&nbsp;&nbsp;&nbsp;"'+a+'": {<br><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>';0==valueAmount&&(e+="<br>");var n="&nbsp;&nbsp;}<br>}";e+=n,document.getElementById("codeField").innerHTML=e}}var feedName="Feed",itemAmount=2,itemArray=[],valueArray=["0","1"],helpToggle=!1;$("#feedName").focusin("input",function(e){$("#feedName").keyup(function(){setTimeout(function(){var e=$("#feedName").val();e=e.split(" ").join(""),e=e.replace(/[^A-Za-z\s!?]/g,""),$("#feedName").val(e),feedName=""!=e?e:"Feed",updateFeed()},500)})}),$("#feedName").focusout("input",function(e){var t=$("#feedName").val();""==t&&($("#feedName").val("Feed"),feedName="Feed",updateFeed())}),$("#itemNumber").focusin("input",function(e){$("#itemNumber").keyup(function(){setTimeout(function(){var e=$("#itemNumber").val();e=e.split(" ").join(""),e=e.replace(/[^0-9\s!?]/g,""),$("#itemNumber").val(e),""!=e&&(itemAmount=e),updateFeed()},500)})}),$("#itemNumber").focusout("input",function(e){var t=$("#itemNumber").val();""==t&&($("#itemNumber").val("2"),itemAmount=2,updateFeed())}),generateUniqueURL(),updateFeed();