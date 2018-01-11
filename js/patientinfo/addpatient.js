$("#bOK").on('click',function () {

    var token = checktoken();

    var sex = $('input:radio[name="sex"]:checked').val();

    $("#bOK").attr("disabled",true).text("正在提交...");

    alert(sex)

    // $.ajax({
    //     type: "POST",
    //     url: config.base_url + "userprofile/create",
    //     data: {
    //         'token':token,
    //         'name':$("#pname").val(),
    //         'sex':sex,
    //         'birth':$("#birthday").val(),
    //         'address':$("#province1").val() + $("#city1").val() + $("#district1").val(),
    //         'phone':$("#phone").val()
    //     },
    //     success: function (data) {
    //         $("#bOK").attr("disabled",false).text("提交");
    //         if(data.succ == 1){
    //             var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
    //                 "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    //                 "                        患者信息添加成功\n"
    //                 "                    </div>";
    //             $("#alertmessage").append(succ_message);
    //         }
    //         else {
    //             var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
    //                 "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    //                 data.error + "</div>";
    //             $("#alertmessage").append(error_message);
    //         }
    //     }
    // });
});