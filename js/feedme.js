// feedme.js - All main javascript & jQuery happens here
// CODE WRITTEN BY MARC MUELLER (@seven11nash)

// INITIAL VARIABLES
var feedName = "Feed";
var itemAmount = 2;
var itemArray = [];
var valueArray = ["0", "1"];

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

// VALUE BUTTONS
function addValue(){
	valueAmount = valueArray.length += 1;
	updateValues(valueAmount);
}

function removeValue(){
	if(valueArray.length > 0){
		valueAmount = valueArray.length -= 1;
		updateValues(valueAmount);
	}
}

function updateValues(valueAmount){
	valueArray = [];
	for(var i = 0; i < valueAmount; i+=1){

		valueArray.push('"' + i + '"');

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
		    	itemAmount = value;
		    }else{
		  		
		    }

		  	updateFeed();

		},500);
	});
});

$('#itemNumber').focusout('input',function(e){

	var value = $("#itemNumber").val();
	if(value == ""){
		$("#itemNumber").val("2");
		itemAmount = 2;
		updateFeed();
	}

});

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

	var finalJSON = "";

	var beginning = '{<br>&nbsp;&nbsp;"' + feedName + '": {<br>';
	finalJSON = beginning;

	valueAmount = valueArray.length;
	for(var i = 0; i < valueArray.length; i+=1){

		finalJSON = finalJSON + '&nbsp;&nbsp;&nbsp;&nbsp;"' + i + '": {<br><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>';

	}
	if(valueAmount == 0){
		finalJSON = finalJSON + '<br>';
	}
	var end = "&nbsp;&nbsp;}<br>}";
	finalJSON = finalJSON + end;

	document.getElementById("codeField").innerHTML = finalJSON;

}

// INITIAL START
generateUniqueURL();
updateFeed();














