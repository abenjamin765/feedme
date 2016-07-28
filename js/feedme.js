// feedme.js - All main javascript & jQuery happens here
// CODE WRITTEN BY MARC MUELLER (@seven11nash)

// INITIAL VARIABLES
var feedName = "Feed";
var itemArray = ["First Name", "Last Name"];
var valueArray = ["0", "1"];
var helpToggle = false;

// CODE GEN FOR LINK
function generateUniqueURL(){
	var code = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 10; i++ )
	    code += possible.charAt(Math.floor(Math.random() * possible.length));

	var uniqueURL = "http://feed.me/" + code;
	document.getElementById("path--field").value = uniqueURL;
}

// FEED NAME HANDLE
$('#feedName').focusin('input',function(e){
	$("#feedName").keyup(function() {
		setTimeout(function(){

			var value = $("#feedName").val();
			value = value.split(' ').join('');
			value = value.replace(/[^A-Za-z\s!?]/g,'');
			$("#feedName").val(value);

		    if(value != ""){
		  		feedName = value;
		    }else{
		  		feedName = "Feed";
		    }

		  	updateFeed();

		},500);
	});
});

$('#feedName').focusout('input',function(e){

	var value = $("#feedName").val();
	if(value == ""){
		$("#feedName").val("Feed");
		feedName = "Feed";
		updateFeed();
	}

});

// VALUES
function addValue(){
	

}

function removeValue(){


}

// ITEM NUMBER
$('#itemNumber').focusin('input',function(e){
	$("#itemNumber").keyup(function() {
		setTimeout(function(){

			var value = $("#itemNumber").val();
			value = value.split(' ').join('');
			value = value.replace(/[^0-9\s!?]/g,'');
			$("#itemNumber").val(value);

		    if(value != ""){
		    	valueArray = [];
				for(var i = 0; i < value; i+=1){

					valueArray.push('"' + i + '"');

				}
		    }else{
		  		
		    }

		  	updateFeed();

		},300);
	});
});

$('#itemNumber').focusout('input',function(e){

	var value = $("#itemNumber").val();
	if(value == ""){
		$("#itemNumber").val("2");
		valueArray = ["0", "1"];
		updateFeed();
	}

});

// RESET FEED
function newFeed(){
	feedName = "Feed";
	itemAmount = 2;
	itemArray = [];
	valueArray = ["0", "1"];
	helpToggle = false;

	$("#itemNumber").val(itemAmount);
	$("#feedName").val(feedName);

	generateUniqueURL();
	updateFeed();
}

// DISPLAY HELP
function toggleHelp(){
	if(helpToggle == false){
		helpToggle = true;
		var helpText = "<b>Welcome to Feed.Me help</b><br>Note: To go back to your feed press the help button again<br><br><b>What is Feed.Me for?</b><br>Feed.Me is a tool for developers and designers, you can simply and easily generate spoof JSON data, which is hosted on Feed.Me or you can download as a json file. This helps prototyping and testing if your code would work with real JSON data.";
		document.getElementById("codeField").innerHTML = helpText;
	}else{
		helpToggle = false;
		updateFeed();
	}
}

// FUNCTION FOR THE COPY BUTTON
function copyLink(){
	var copyUrl = $("#path--field").val();
	// SELECT TEXT
    document.getElementById("path--field").focus();
    document.getElementById("path--field").select();
    // COPY
    document.execCommand("copy");
    // DESELECT
    document.getElementById("copyButton").focus();
    $("#path--field").val("COPIED");
    setTimeout(function(){
    	$("#path--field").val(copyUrl);
    }, 700);
}

// FUNCTION CONTROLLING WHAT IS SEEN IN THE MAIN STAGE (CODEFIELD)
function updateFeed(){
	if(helpToggle == false){

		var finalJSON = "";
		var beginning = "";

		beginning = '{<br>&nbsp;&nbsp;"<span>' + feedName + '</span>": [<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>';
		finalJSON = beginning;

		valueAmount = valueArray.length;
		for(var i = 0; i < valueArray.length; i+=1){

			finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>' + i + '</span>": {<br>';

			for(var j = 0;j < itemArray.length;j+=1){
				var itemType = itemArray[j];
			    if(itemType == "First Name"){
			    	var name = chance.name();
					name = name.substring(0, name.indexOf(' '));
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>First Name</span>": "' + name + '",<br>';
			    }else if(itemType == "Last Name"){
			    	var name = chance.name();
					name = name.split(' ')[1];
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>Last Name</span>": "' + name + '",<br>';
			    }
			}

			finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}';

			if(i+1 == valueArray.length){
				finalJSON = finalJSON + '<br>';
			}else{
				finalJSON = finalJSON + ',<br>';
			}

		}
		if(valueAmount == 0){
			finalJSON = finalJSON + '<br>';
		}
		var end = "&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>}";
		finalJSON = finalJSON + end;
		document.getElementById("codeField").innerHTML = finalJSON;

	}
}

// INITIAL START
generateUniqueURL();
updateFeed();














