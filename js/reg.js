function test() {
    sendsms();
    time(document.getElementById("getInfoCode"));
}

function sendsms() {
    var nickname = $("#username").val();
    var password = $("#pwd").val();
    var phone = $("#phone").val();

    $.ajax({
        url:"http://bieke.cf:8080/ma/zxy/api/Smscode/send",
        type: 'post',
        dataType: 'json',
        data: {
            nickname: nickname,
            password: password,
            phone: phone,
            action: "REG"
        },
        success: function (data) {
            if(data.succ == 0){
                alert(data.error);
            }
            else if(data.succ == 1){
                // document.getElementById("getInfoCode").onclick=function(){time(document.getElementById("getInfoCode"));}
            }

        }

    });
}

function reg_func() {
    var nickname = $("#username").val();
    var password = $("#pwd").val();
    var phone = $("#phone").val();
    var code = $("#code").val();

    $.ajax({
        url:"http://bieke.cf:8080/ma/zxy/api/User/create",
        type: 'post',
        dataType: 'json',
        data: {
            nickname: nickname,
            password: password,
            phone: phone,
            code: code
        },
        success: function (data) {
            if(data.succ == 1){
                //保存用户信息到cookie
                var exp = new Date();
                if(data.data.token_valid_time > 0){
                    //设置过期时间
                    exp.setTime(exp.getTime() + 1000 * 60 * data.data.token_valid_time); //计算毫秒
                    document.cookie = "token=" + data.token + ";expires=" + exp.toGMTString();
                    document.cookie = "data=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
                }
                else {
                    document.cookie = "token=" + data.token;
                    document.cookie = "data=" + JSON.stringify(data.data);
                }
                //跳转个人中心页面
                window.location.href = 'info.html';
            }
            else {
                alert(data.error);
            }
        }

    });
}