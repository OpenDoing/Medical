$(function() {
    //按钮单击时执行
    $("#submit").click(function () {
        var username = document.getElementById("form-username").value;
        var password = document.getElementById("form-password").value;

        $.ajax({
            //Ajax调用处理
            type: "POST",
            url: config.base_url + "Login",
            data: "username=" + username + "&password=" + password,
            success: function (data) {
                if(data.succ == 1){
                    //保存用户信息到cookie
                    var exp = new Date();
                    if(data.data.token_valid_time > 0){
                        //设置过期时间
                        exp.setTime(exp.getTime() + 1000 * 60 * data.data.token_valid_time); //计算毫秒
                    }
                    document.cookie = "token=" + data.token + ";expires=" + exp.toGMTString();
                    document.cookie = "user=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
                    //跳转个人中心页面
                    window.location.href = 'info.html';
                }
                else {
                    alert(data.error);
                }
            }
        });
    });
});