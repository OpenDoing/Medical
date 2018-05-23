window.onload = init();

function init() {
    init_doctor_table();
    init_select();
}

function init_select() {
    $.ajax({
        type: "POST",
        url: config.base_url + "department",

        success: function (data) {
            if(data.succ == 1){
                var data = data.data;
                var htmls = "";
                for(var i in data){
                    htmls += "<option value=" + data[i].id + ">" + data[i].name + "</option>";
                }
                $("#deid1").empty().append(htmls);
                $("#deid2").empty().append(htmls);
            }
            else {
                alert(data.error);
            }
        }
    });
    $.ajax({
        type: "POST",
        url: config.base_url + "doctortype",

        success: function (data) {
            if(data.succ == 1){
                var data = data.data;
                var htmls = "";
                for(var i in data){
                    htmls += "<option value=" + data[i].id + ">" + data[i].type + "</option>";
                }
                $("#type1").empty().append(htmls);
                $("#type2").empty().append(htmls);
            }
            else {
                alert(data.error);
            }
        }
    });
}

function init_doctor_list() {
    $.ajax({
        type: "GET",
        url: config.base_url + "Doctorprofile/name",
        data:{
            'name':$("#search_name").val()
        },
        success: function (data) {
            if (data.succ == 1){
                $('#doctors').bootstrapTable('load',data.data);
                $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉
            }
        }
    });
}

function init_doctor_table(data) {

    $('#doctors').bootstrapTable({

        method:"GET",
        dataType:'json',
        pagination:true,
        data:data,

        //url:config.base_url + "order?profile_id=2&token="+getCookie('token'),

        onLoadSuccess: function(){  //加载成功时执行

            return "加载成功";
        },
        onLoadError: function(){  //加载失败时执行
            return "加载数据失败";
        },
        striped:true,

        columns: [
            {
                field: 'id',
                title: '医生编号',
                align: 'center',
                width: 50 + "px"
            },
            {
                field: 'name',
                title: '医生姓名'
            },
            {
                field: 'department',
                title: '科室'
            },
            {
                field: 'typename',
                title: '医生类型'
            },
            {
                field: 'introduction',
                title: '医生简介'
            },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<button id="edit" type="button" class="btn btn-default" data-toggle="modal" data-target="#edit-doctor-modal">编辑</button>'
                    ].join("");
                }
            }
        ]
    });
}

function create() {
    var token = checktoken();
    $("#bOK1").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "doctorprofile/create",
        data: {
            'token':token,
            'nickname':$("#nickname").val(),
            'password':$("#password").val(),
            'phone':$("#phone").val(),
            'name':$("#name1").val(),
            'deid':$("#deid1").val(),
            'type':$("#type1").val(),
            'introduction':$("#introduction1").val()
        },
        success: function (data) {
            $("#bOK").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        医生账号添加成功,一秒后自动刷新本页面\n" +
                    "                    </div>";
                $("#alertmessage1").append(succ_message);
                //页面需要刷新
                // location.reload();
                setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                    window.location.reload();//页面刷新
                },1500);
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


function update() {
    var token = checktoken();
    $("#bOK2").attr("disabled",true).text("正在提交...");

    $.ajax({
        type: "POST",
        url: config.base_url + "doctorprofile/update",
        data: {
            'token':token,
            'doctor_id':$('#doctor_id').val(),
            'name':$("#name2").val(),
            'department_id':$("#deid2").val(),
            'type':$("#type2").val(),
            'introduction':$("#introduction2").val()
        },
        success: function (data) {
            $("#bOK").attr("disabled",false).text("提交");
            if(data.succ == 1){
                var succ_message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                    "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                    "                        医生账号修改成功\n" +
                    "                    </div>";
                $("#alertmessage2").append(succ_message);
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
                $("#alertmessage2").append(error_message);
            }
        }
    });
}

window.operateEvents = {
    'click #edit': function (e, value, row, index) {
        $('#name2').val(row.name);
        $('#introduction2').val(row.introduction);
        $('#deid2').find('option[value='+ row.department_id +']').attr("selected",true);
        $('#type2').find('option[value='+ row.type +']').attr("selected",true);
        $('#doctor_id').val(row.id);
    }
};



