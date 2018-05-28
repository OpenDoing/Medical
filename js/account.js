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
            token: checktoken(),
            old_phone: $("#old_phone").val(),
            phone: $("#new_phone").val(),
            action: "CHANGEPHONE"
        },
        success: function (data) {
            if(data.succ == 0){
                alert(data.error);
            }
        }

    });
}

function edit_phone() {

    $.ajax({
        url:"http://bieke.cf:8080/ma/zxy/api/User/updatephone",
        type: 'post',
        dataType: 'json',
        data: {
            token: checktoken(),
            old_phone: $("#old_phone").val(),
            phone: $("#new_phone").val(),
            code: $("#code").val()
        },
        success: function (data) {
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        手机号修改成功\n" +
                    "                    </div>";
                $("#alertmessage1").append(succ_message);
                //页面需要刷新
                // location.reload();
                // setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                //     window.location.reload();//页面刷新
                // },1500);
            }

            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage1").append(error_message);
            }
        }

    });
}