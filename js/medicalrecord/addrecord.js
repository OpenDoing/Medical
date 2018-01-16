window.onunload = load_profile();

var record_id;

function load_profile() {

    var token = checktoken();

    $.ajax({
        type: "POST",
        url: config.base_url + "userprofile",
        data: {
            'token':token,
            'profile_id':0
        },
        success: function (data) {
            if(data.succ == 1){
                var profiles = data.data;
                var htmls = "";
                for(var i in profiles){
                    htmls += "<option value=" + profiles[i].id + ">" + "患者姓名:" + profiles[i].name + "   生日:" + profiles[i].birth + "</option>";
                }
                $("#profile").empty().append(htmls);
            }
            else {
                alert(data.error);
            }
        }
    });
}


$("#submit").on('click',function () {

    var token = checktoken();

    $("#submit").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "medicalrecord/create",
        data: {
            'token':token,
            'profile_id':$("#profile").val(),
            'visit_time':$("#visit_time").val().replace("年","-").replace("月","-").replace("日","-"),
            'hospital':$("#hospital").val(),
            'description':$("#description").val()
        },
        success: function (data) {
            if(data.succ == 1){
                $("#step1").empty();
                bsStep(2);
                record_id = data.data;
                alert(record_id);
            }
            else {
                var error_message = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    data.error + "</div>";
                $("#alertmessage").append(error_message);
                $("#submit").attr("disabled",false).text("下一步");
            }
        }
    });
});