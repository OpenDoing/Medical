var did,flag,day;
var dropdown;
var p_id,schedule_id;
window.onunload = load_order();

function submit() {
    //获取病历ID
    var m_ids = [];
    if (typeof(p_id) == "undefined"){
        // $('#select-time-close').css("display","block");
        showTips("请选择咨询人");
        return;
    }

    $('span.dropdown-selected').each(function () {
        var t = $(this).find("i").first()[0].getAttribute('data-id');
        m_ids.push(t);
    });
    if (typeof(schedule_id) == "undefined"){
        // $('#select-time-close').css("display","block");
        showTips("请选择咨询时间段");
        return;
    }


    // $("#submitbtn").attr("disabled",true);
    var disease_input = $("#detail").val();
    showLoading("正在提交订单");
    $.ajax({
        type: "POST",
        url: config.base_url + "order/create",
        data: {
            'token':checktoken(),
            'profile_id':p_id,
            'appointment_time':schedule_id,
            'record_id':m_ids,
            'disease_input': disease_input
        },
        success: function (data) {
            if (data.succ == 1){
                showSuccess();
                window.location.href = "yysuccess.html?isdetail=0&oid=" + data.data + "&pid=" + p_id;
            }
            else {
                showTips(data.error);
            }
        }
    });
}



function load_order() {
    did = getQueryString('did');
    flag = getQueryString('flag');
    day = getQueryString('day');
    load_doctor();
    load_userprofile();
    dropdown = $('.dropdown-mul-1').dropdown({
        limitCount: 40,
        multipleMode: 'label'
    }).data('dropdown') ;
}

function load_doctor() {

    $.ajax({
        type: "GET",
        url: config.base_url + "doctorprofile/doctorduty",
        data:{
            'doctor_id':did,
            'flag':flag,
            'day':day
        },
        success: function (data) {
            init_doctor(data);
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
            if(data.succ == 1){
                init_memlist(data.data);
            }
            else {
                alert_error(data.error);
            }
        }
    });
}

function load_case(value) {
    // var value = $('input[name="mem_list"]:checked').val();
    var dropdown_data = [];
    $.ajax({
        url:config.base_url + "medicalrecord/all",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: value,
            token:checktoken(),
            record_id:0
        },
        success: function (data) {
            //dropdown.update(data,true);
            if (data.succ == 1){
                for (var i in data.data){
                    var option = new Object();
                    option.id = data.data[i].id;
                    option.name = '就诊时间:' + data.data[i].visit_time + '  就诊医院:' + data.data[i].hospital;
                    dropdown_data[i] = option;
                }
            }
            else{
                var option = new Object();
                option.id = 0;
                option.disabled = true;
                option.name = data.error;
                dropdown_data[0] = option;
            }
            dropdown_data = JSON.stringify(dropdown_data);
            dropdown.update(JSON.parse(dropdown_data),true);
        }
    });
}

function init_doctor(data) {

    data.photo = config.img_url + data.photo;
    new Vue({
        el: '#doctor-info',
        data: data
    });

    var week = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];

    var s_flag = (flag == 0)?'上午':'下午';

    //拼接就诊时间
    $("#appo-date").text(getdate(day));
    $("#appo-time").text(week[day-1]+ '    ' + s_flag);

    new MobileSelect({
        trigger: '#range-trigger',
        title: '咨询时间段',
        wheels: [
            {data:data.time_list}
        ],
        keyMap: {
            id:'id',
            value: 'range'
        },
        callback:function(indexArr, data){
            schedule_id = data[0].id;
        }
    });

}

//加载患者列表
function init_memlist(data) {
    var htmls = '';
    for (var i in data){
        var sex = (data[i].sex == 0)?'女':'男';
        data[i].value = data[i].name + " " + sex + " " + data[i].birth + " " + data[i].phone;
    }
    new MobileSelect({
        trigger: '#patient-trigger',
        title: '咨询人',
        wheels: [
            {data:data}
        ],
        callback:function(indexArr, data){
            // schedule_id = data[0].id;
            p_id = data[0].id;
            load_case(data[0].id);
        }
    });
}
