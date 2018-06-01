window.onunload = refresh_userinfo();

function refresh_userinfo() {

    $.ajax({
        type: "POST",
        url: config.base_url + "User",
        data: "token=" + checktoken(),
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
                $("#userHH").text(data.data.nickname);
                $("#tel").text(data.data.phone);
                $("#hImg").attr('src',config.img_url + data.data.avatar);
                $("#hhImg").attr('src',config.img_url + data.data.avatar);
                $('#createTime').text(data.data.create_time);
                $('#lastTime').text(data.data.token_create_time);
            }
            else {
                alert(data.error);
            }
        }
    });

    if (window.location.hash == '#recordlist'){
        load_profiles();
    }
}


$(function () {
    $(".panel-group").on("click", "button", function(event){
        window.location.hash = event.target.id; //设置锚点
        loadInner();
    });

    loadInner();
});