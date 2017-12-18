$(function() {
    //按钮单击时执行
    $("#submit").click(function () {
        var username = document.getElementById("form-username").value;
        var password = document.getElementById("form-password").value;

        $.ajax({
            //Ajax调用处理
            type: "POST",
            url: config.base_url + "Login",
            dataType: 'jsonp',
            data: "username=" + username + "&password=" + password,
            success: function (data) {
                alert(data);
            }
        });
    });
});