window.onload = loadinfo();

function loadinfo() {
    load_department();
    inithead();
    load_doctor(0);
}

function load_department() {
    var htmls = "";
    $.ajax({
        type: "GET",
        url: config.base_url + "department",
        success: function (data) {
            for(var i in data){
                htmls += '<span class="small">\n' +
                    '<a href="" id="' + data[i].id + '">' + data[i].name + '</a>\n' +
                    '</span>';
            }
            $("#departments").empty().append(htmls);
            //$("#test11").html('111')
        }
    });
}

function load_doctor(d_id) {
    $.ajax({
        type: "GET",
        url: config.base_url + "doctorprofile/dutylist",
        data:{
          'department_id':d_id
        },
        success: function (data) {
            for(var i in data) {
                inittable(data[i])
            }
        }
    });
}

//初始化表头
function inithead() {
    var table = $('#maintable');
    var htmls = '<tr class="right_nav" style="width: 1002px; position: absolute;">\n' +
        '                        <th width="23%" colspan="2"><i>专家</i></th>\n' +
        '                        <th width="22%"><i>介绍</i></th>\n' +
        '                        <th width="2%"><a class="turn_fl" href="javascript:void(0)"></a></th>';


    var formatDate = function(date){
        var month = (date.getMonth()+1);
        var day = date.getDate();
        var week = ['周日','周一','周二','周三','周四','周五','周六'][date.getDay()];

        return month + '-' + day + '#' + week;
    };

    var addDate= function(date,n){
        date.setDate(date.getDate()+n);
        return date;
    };

    var date = new Date();

    for(var i = 1;i <= 7;i++){
        var d_w = formatDate(addDate(date,1)).split("#");
        htmls += '<th width="7%"><p>' + d_w[0] + '<span>' + d_w[1] +'</span></p></th>'
    }
    htmls += '<th width="3%"><a class="an_fr" href="javascript:void(0);"></a></th></tr>';
    $("#thead").html(htmls);
}

//构造表主体结构
function inittable(data) {

    var htmls = '';
    //常用组件
    //未排班，无分割线
    var empty0 = '<td width="7%" class="bor_botm" align="center"></td>\n';
    //未排班，有分割线
    var empty1 = '<td align="center"></td>\n';
    //已满
    var full0 = '<td width="7%" class="bor_botm" align="center"><span class="yuyue_yiman">已满</span></td>\n';
    var full1 = '<td align="center"><span class="yuyue_yiman">已满</span></td>\n';

    //1.替换医生简介部分
    var doctor_part = $('#doctor_change').html();
    doctor_part = doctor_part.replace(new RegExp("{doctor_id}","gm"),data.id)
        .replace('{img}',config.img_url + data.photo)
        .replace('{name}',data.name)
        .replace(new RegExp("{type}","gm"),data.typename)
        .replace('{department}',data.department)
        .replace('{description}',data.introduction);



        $('#tablebody').append(doctor_part);

}