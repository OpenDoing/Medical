var did,flag,day;
window.onunload = load_order();

function load_order() {
    did = getQueryString('did');
    flag = getQueryString('flag');
    day = getQueryString('day');
    load_doctor();
    load_userprofile();
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
        url:"http://bieke.cf:8080/ma/zxy/api/userprofile",
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
                alert(data.error);
            }
        }
    });
}

function init_doctor(data) {

    var week = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
    var time_range = '<li value="{id}" class="">{range}</li>';

    var s_flag = (flag == 0)?'上午':'下午';

    //1.替换医生资料模板
    var doctor_info_part = $('#doctor_info_change').html();
    doctor_info_part = doctor_info_part.replace(new RegExp("{department}","gm"),data.department)
        .replace('{img}',config.img_url + data.photo)
        .replace('{doctor_id}',data.id)
        .replace('{name}',data.name)
        .replace(new RegExp("{type}","gm"),data.typename)
        .replace('{price}',data.price);
    $("#doctor_info").append(doctor_info_part);

    //2.拼接就诊时间
    var time_part = $('#time_change').html();
    time_part = time_part.replace('{date}',getdate(day) + '    ' + s_flag)
        .replace('{week}',week[day-1]);
    $("#yuyue-time").append(time_part);

    time_part = '';
    for (var i in data.time_list){
        time_part += time_range.replace('{id}',data.time_list[i].id).replace('{range}',data.time_list[i].range);
    }
    $("#delts").append(time_part);

    $('#delts').children().click(function () {
        click_time($(this));
    })

}

//时间按钮点击事件
function click_time(clicked) {

    if(clicked.hasClass('cur'))
        return;
    else {
        $('#delts').children().each(function() {
            if ($(this).hasClass('cur')) {
                $(this).removeClass('cur');
            }
        });
        clicked.addClass('cur');
    }
}

//替换患者列表模板
function init_memlist(data) {
    var htmls = '';
    for (var i in data){
        var sex = (data[i].sex == 0)?'女':'男';
        var mem_part = $('#mem_change').html();
        mem_part = mem_part.replace('{id}',data[i].id)
            .replace('{name}',data[i].name)
            .replace('{sex}',sex)
            .replace('{birth}',data[i].birth)
            .replace('{address}',data[i].address)
            .replace('{phone}',data[i].phone);
        htmls += mem_part + '\n';
    }
    $("#mem_list").append(htmls);
}
