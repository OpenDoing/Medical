window.onunload = refresh_userinfo();

function refresh_userinfo() {

    if(!getCookie('token')){
        //todo:弹框提示登录已失效
        window.location.href = "login.html";
    }
    var token = getCookie('token');

    $.ajax({
        type: "POST",
        url: config.base_url + "User",
        data: "token=" + token,
        success: function (data) {
            if(data.succ == 1){
                //保存用户信息到cookie
                var exp = new Date();
                if(data.data.token_valid_time > 0){
                    //设置过期时间
                    exp.setTime(exp.getTime() + 1000 * 60 * data.data.token_valid_time); //计算毫秒
                    document.cookie = "data=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
                }
                else {
                    document.cookie = "data=" + JSON.stringify(data.data);

                }
                $("#userHi").text(data.data.nickname);
                $("#tel").text(data.data.phone);
                $("#hImg").attr('src',config.img_url + data.data.avatar);
            }
            else {
                alert(data.error);
            }
        }
    });
}


$(function () {
    $(".panel-group").on("click", "button", function(){
        var sId = event.target.id; //获取data-id的值
        window.location.hash = sId; //设置锚点
        loadInner(sId);
    });

    function loadInner(sId){
        var sId = window.location.hash;
        var pathn, i;
        pathn = sId.replace("#","");
        if(!pathn){
            pathn = "baseinfo.html";
            refresh_userinfo();
        }
        else
            pathn = pathn + ".html";
        $("#info-content").load(pathn); //加载相对应的内容
    }
    var sId = window.location.hash;
    loadInner(sId);
});

$("#CasePanel").on("click",function () {

});
