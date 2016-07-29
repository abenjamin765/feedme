// feedme.js - All main javascript & jQuery happens here
// CODE WRITTEN BY MARC MUELLER (@seven11nash)

// INITIAL VARIABLES
var feedName = "feed";
var itemArray = [];
var itemDetailArray = [];
var valueArray = ["0", "1"];
var gender = "both";
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

// CAMELCASING FEEDNAME
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// FEED NAME HANDLE
$('#feedName').focusin('input',function(e){
	$("#feedName").keyup(function() {
		setTimeout(function(){

			var value = $("#feedName").val();
			value = value.replace(/[^A-Za-z\s!?]/g,'');
			value = value.toLowerCase();
			var words = value.split(' ');
			var numberOfWords = words.length;
			value = "";
			for(var i = 0;i < numberOfWords;i+=1){
				if(i == 0){
					value = value + words[i].toLowerCase();
				}else{
					value = value + words[i].capitalize();
				}	
			}

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

	var selectedValueField = document.getElementById("valueTypeSelection");
	var selectedValue = selectedValueField.options[selectedValueField.selectedIndex].value;

	var id = itemArray.length;

	itemArray.push(selectedValue);
	if(selectedValue == "phone"){
		itemDetailArray.push("us");
	}else{
		itemDetailArray.push("none");
	}

	if(selectedValue == "phone"){
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span><input type="checkbox" id="phoneNumber" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone" id="us" checked><label for="both">US</label></li><li><input type="radio" name="phone" id="uk"><label for="male">UK</label></li><li><input type="radio" name="phone" id="de"><label for="female">DE</label></li></ul></div></div></section>');
	}else{
		$("#valueWrapper").append('<section class="block" id="valueBlock' + id +'"><a href="javascript:removeValue(' + id + ')" class="close">✕</a><span class="node-name">' + selectedValue + '</span></section>');
	}

	updateFeed();
}

function removeValue(id){
	if(id == "all"){
		itemArray = [];
		itemDetailArray = [];
		document.getElementById("valueWrapper").innerHTML = "";
	}else{
		itemArray.splice(id, 1);
		itemDetailArray.splice(id, 1);
		document.getElementById("valueWrapper").innerHTML = "";
		for(var i = 0;i < itemArray.length;i+=1){
			if(itemArray[i] == "phone"){
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + itemArray[i] + '</span><input type="checkbox" id="phoneNumber" name="toggles" class="toggle-switch" checked><label class="toggle" for="phoneNumber"><span></span></label><div class="options"><div class="options--frame"><span class="eyebrow">Country</span><ul class="radio-list"><li><input type="radio" name="phone" id="us" checked><label for="both">US</label></li><li><input type="radio" name="phone" id="uk"><label for="male">UK</label></li><li><input type="radio" name="phone" id="de"><label for="female">DE</label></li></ul></div></div></section>');
				document.getElementById(itemDetailArray[i]).checked = true;
			}else{
				$("#valueWrapper").append('<section class="block" id="valueBlock' + i +'"><a href="javascript:removeValue(' + i + ')" class="close">✕</a><span class="node-name">' + itemArray[i] + '</span></section>');
			}
		}
	}

	updateFeed();
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
	feedName = "feed";
	itemArray = ["phone"];
	itemDetailArray = ["us"];
	valueArray = ["0", "1"];
	gender = "both";
	document.getElementById("valueTypeSelection").value = "firstName";
	helpToggle = false;

	$("#itemNumber").val(valueArray.length);
	$("#feedName").val(feedName);

	removeValue("all");
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

			var fullName = "";
			if(gender == "male"){
				fullName = chance.name({ gender: "male" });
			}else if(gender == "female"){
				fullName = chance.name({ gender: "female" });
			}else{
				fullName = chance.name();
			}

			var firstName = fullName;
	    	firstName = firstName.substring(0, firstName.indexOf(' '));
	    	firstName = firstName.toLowerCase();
	    	firstName = firstName.charAt(0);
	    	var lastName = fullName;
	    	lastName = lastName.split(' ')[1];
	    	firstPlusLast = firstName + lastName;

			finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>fullName</span>": "' + fullName + '"';

			if(itemArray.length == 0){
				finalJSON = finalJSON + '<br>';
			}else{
				finalJSON = finalJSON + ',<br>';
			}

			for(var j = 0;j < itemArray.length;j+=1){
				var itemType = itemArray[j];
				var itemDetail = itemDetailArray[j];
			    if(itemType == "firstName"){
					name = fullName.substring(0, fullName.indexOf(' '));
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>firstName</span>": "' + name + '"';
			    }else if(itemType == "lastName"){
					name = fullName.split(' ')[1];
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>lastName</span>": "' + name + '"';
			    }else if(itemType == "email"){
			    	var email = firstPlusLast + "@example.com";
					finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span>email</span>": "' + email + '"';
			    }else if(itemType == "twitterHandle"){
			    	var username = "@" + firstPlusLast;
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














