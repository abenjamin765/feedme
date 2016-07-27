// feedme.js - All main javascript & jQuery happens here

var feedName = "Feed";

var code = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < 10; i++ )
    code += possible.charAt(Math.floor(Math.random() * possible.length));

var uniqueURL = "http://feed.me/" + code;
document.getElementById("path--field").value = uniqueURL;

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

function updateFeed(){

	var beginning = '{<br>&nbsp;&nbsp;"' + feedName + '": {<br>';
	var end = "<br>&nbsp;&nbsp;}<br>}";

	document.getElementById("codeField").innerHTML = beginning + end;

}
updateFeed();

function copyLink(){
	$copyUrl = $("#path--field").val();
	console.log($copyUrl);
    document.getElementById("path--field").focus();
    document.getElementById("path--field").select();
    document.execCommand("copy");
    document.getElementById("copyButton").focus();
    console.log("copied");
}

function copyToClipboard(elem) {

    
}