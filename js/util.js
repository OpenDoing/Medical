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

function loadInner(){
    var sId = window.location.hash;
    var pathn, i, data;
    pathn = sId.replace("#","");
    if(!pathn){
        if (getInfoFromCookie('type_id') == 1){
            pathn = "baseinfo.html";
            refresh_userinfo();
        }
        else if (getInfoFromCookie('type_id') == 2){
            pathn = "doctor_baseinfo.html";
            refresh_doctorinfo();
        }

    }
    // else if(pathn.indexOf('recordlist') >= 0 && event.target.value !== null){
    //     pathn = pathn + ".html";
    //     if(pathn.indexOf('profile_id') < 0)
    //         window.location.hash += "?profile_id=" + event.target.value;
    //     else
    //         pathn = pathn.split("?")[0] + ".html";
    // }
    else
        pathn = pathn + ".html";
    $("#info-content").load(pathn); //加载相对应的内容
}

//获取get参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//获取下一个周x的日期
function getdate(day) {
    var length = day - new Date().getDay();
    if (length <= 0)
        length += 7;
    var date = new Date();
    date.setDate(date.getDate() + length);
    var month = date.getMonth() + 1;
    return date.getFullYear() + '年' + month + '月' + date.getDate() + '日';
}
