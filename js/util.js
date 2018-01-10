var config = {
    base_url:"http://bieke.cf:8080/ma/zxy/api/",
    img_url:"http://bieke.cf:8080/ma/zxy/public/uploads/"
}

/* 获取指定cookie */
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split(";");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if ($.trim(arr[0]) == name)
            return arr[1];
    }
    return "";
}

function getInfoFromCookie(name) {
    var data = getCookie('data');
    data = JSON.parse(data);
    return data[name];
}

//读取token
function checktoken() {
    if(!getCookie('token')){
        //todo:弹框提示登录已失效
        window.location.href = "login.html";
        return;
    }
    return getCookie('token');
}
