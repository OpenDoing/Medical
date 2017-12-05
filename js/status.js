var phone = document.getElementById("phoneInput");
var phoneCheck = document.getElementById("phoneCheck");
var phoneCheck1 = document.getElementById("phoneCheck1");

var verify = document.getElementById("verifyInput");
var info = document.getElementById("infoInput");
var psd = document.getElementById("psdInput");
var reg = document.getElementById("reg");

function statusCheck1(){
	var phone = document.getElementById("phoneInput");
//	alert(phone.value.length);
	var len = phone.value.length;
	if (len!=11) {
		$(phone).remove("okImg");
		$(phone).addClass("errImg");
	} else{
		$(phone).remove("errImg");
		$(phone).addClass("okImg");
	}
}



