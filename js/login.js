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
                        document.cookie = "token=" + data.token + ";expires=" + exp.toGMTString();
                        document.cookie = "data=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
                        if (data.data.type_id == 2)
                            document.cookie = "did=" + data.doctor_id + ";expires=" + exp.toGMTString();
                    }
                    else {
                        document.cookie = "token=" + data.token;
                        document.cookie = "data=" + JSON.stringify(data.data);
                        if (data.data.type_id == 2)
                            document.cookie = "did=" + data.doctor_id;
                    }
                    //跳转个人中心页面
                    if(data.data.type_id == 1)
                        window.location.href = 'info.html';
                    else if(data.data.type_id == 2)
                        window.location.href = 'doctorinfo.html';
                    else if(data.data.type_id == 3)
                        window.location.href = 'admin.html';
                }
                else {
                    alert(data.error);
                }
            }
        });
    });
});

function find_pwd() {
    var password = $("#password").val();
    $("#bOK").attr("disabled",true).text("正在提交...");

    if (password.length < 8){
        $("#bOK").attr("disabled",false).text("提交");
        var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
            "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
            "新密码少于八位" + "</div>";
        $("#alertmessage").append(error_message);
        return;
    }
    $.ajax({
        url:config.base_url + "User/findpwd",
        type: 'post',
        dataType: 'json',
        data: {
            phone: $("#phone").val(),
            password: $("#password").val(),
            code: $("#code").val()
        },
        success: function (data) {
            $("#bOK").attr("disabled",false).text("提交");

            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        密码修改成功\n" +
                    "                    </div>";
                $("#alertmessage").append(succ_message);
            }

            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage").append(error_message);
            }
        }

    });
}

function send() {
    sendsms();
    time(document.getElementById("getInfoCode"));
}

function sendsms() {
    $.ajax({
        url:"http://bieke.cf:8080/ma/zxy/api/Smscode/send",
        type: 'post',
        dataType: 'json',
        data: {
            phone: $("#phone").val(),
            action: "FINDPWD"
        },
        success: function (data) {
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        发送成功\n" +
                    "                    </div>";
                $("#alertmessage").append(succ_message);
            }
            else{
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage").append(error_message);
            }
        }

    });
}