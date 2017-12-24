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
