window.onload = load_userprofile();

var p_id,record_id;

function submit() {
    var visit_time = $("#visit_time").val();
    var hospital = $("#hospital").val();
    var description = $("#description").val();
    if(!p_id || !visit_time || !hospital.trim() || !description.trim()){
        showTips("请完整填写病历信息");
        return;
    }
    var token = checktoken();
    profile_id = p_id;

    // $("#submit").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "medicalrecord/create",
        data: {
            'token':token,
            'profile_id':p_id,
            'visit_time':visit_time,
            'hospital':hospital,
            'description':description
        },
        success: function (data) {
            if(data.succ === 1){
                record_id = data.data;
                window.location.href = "addimage.html?rid="+record_id+"&pid="+p_id;
            }
            else {
                showTips("创建失败");
            }
        }
    });
}

function load_userprofile() {
    $.ajax({
        url: config.base_url + "userprofile",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: 0,
            token:checktoken()
        },
        success: function (data) {
            if(data.succ === 1){
                init_memlist(data.data);

            }
            else {
                alert_error(data.error);
            }
        }
    });
}

//加载患者列表
function init_memlist(data) {
    for (var i in data){

        data[i].value = data[i].name;
    }
    new MobileSelect({
        trigger: '#patient-trigger',
        title: '患者列表',
        wheels: [
            {data:data}
        ],
        callback:function(indexArr, data){
            // schedule_id = data[0].id;
            p_id = data[0].id;
            // load_case(data[0].id);
        }
    });
}



