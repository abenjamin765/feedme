// feedme.js - All main javascript & jQuery happens here
// CODE WRITTEN BY MARC MUELLER (@seven11nash)

// INITIAL VARIABLES
var feedName = "Feed";
var itemArray = ["fullName", "firstName", "lastName", "email", "twitterHandle", "phone"];
var itemDetailArray = ["both", "male", "none", "none", "none", "uk"];
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
	itemArray = ["fullName", "firstName", "lastName", "email", "twitter", "phone"];
	itemDetailArray = ["both", "male", "none", "none", "none", "uk"];
	valueArray = ["0", "1"];
	helpToggle = false;

	$("#itemNumber").val(itemArray.length);
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
				var itemDetail = itemDetailArray[j];
			    if(itemType == "fullName"){
			    	if(itemDetail == "male"){
			    		var name = chance.name({ gender: "male" });
			    	}else if(itemDetail == "female"){
			    		var name = chance.name({ gender: "female" });
			    	}else{
			    		var name = chance.name();
			    	}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>Full Name</span>": "' + name + '"';
			    }else if(itemType == "firstName"){
			    	if(itemDetail == "male"){
			    		var name = chance.name({ gender: "male" });
			    	}else if(itemDetail == "female"){
			    		var name = chance.name({ gender: "female" });
			    	}else{
			    		var name = chance.name();
			    	}
					name = name.substring(0, name.indexOf(' '));
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>firstName</span>": "' + name + '"';
			    }else if(itemType == "lastName"){
			    	var name = chance.name();
					name = name.split(' ')[1];
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>lastName</span>": "' + name + '"';
			    }else if(itemType == "email"){
			    	var firstName = chance.name();
			    	firstName = firstName.substring(0, firstName.indexOf(' '));
			    	firstName = firstName.toLowerCase();
			    	firstName = firstName.charAt(0);
			    	var lastName = chance.name();
			    	lastName = lastName.split(' ')[1];
			    	var email = firstName + lastName + "@example.com";
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>email</span>": "' + email + '"';
			    }else if(itemType == "twitterHandle"){
			    	var username = chance.twitter();
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>twitterHandle</span>": "' + username + '"';
			    }else if(itemType == "phone"){
			    	if(itemDetail == "uk"){
			    		var phone = chance.phone({ country: 'uk', mobile: true });
			    	}else if(itemDetail == "de"){
			    		var phone = chance.phone({ country: 'de', mobile: true });
			    	}else{
			    		var phone = chance.phone({ country: 'us', mobile: true });
			    	}
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>phone</span>": "' + phone + '"';
			    }
			    if(j+1 == itemArray.length){
					finalJSON = finalJSON + '<br>';
				}else{
					finalJSON = finalJSON + ',<br>';
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














