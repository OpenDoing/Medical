window.onload = init_order_table();

function init_orderlist(p_id) {
    $.ajax({
        type: "GET",
        url: config.base_url + "order",
        data:{
            'profile_id':p_id,
            'token':checktoken()
        },
        success: function (data) {
            if (data.succ == 1){
                $('#order').bootstrapTable('load',data.data);
            }
        }
    });
}

function init_order_table(data) {
    load_profiles();
    $('#order').bootstrapTable({

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
        responseHandler:function (res) {    //data prehandle


        },
        onClickRow:function (row) {

        },
        columns: [
            {
                field: 'id',
                title: '序号',
                align:'center',
                width: 50 + "px"
            },
            {
                field: 'username',
                title: '姓名'
            },
            {
                field: 'department',
                title: '科室'
            },
            {
                field: 'appointment_date',
                title: '预约时间'
            },
            {
                field: 'create_time',
                title: '创建时间'
            },
            {
                field: 'doctorname',
                title: '医生'
            },
            {
                field: 'status',
                title: '状态'
            },
            {
                title: '操作',
                align: "center",
                events: "operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<button id="showinfo" type="button" class="btn btn-default">查看</button>'
                    ].join("");
                }
            }
        ]
    });
}

window.operateEvents = {
    'click #showinfo': function (e, value, row, index) {
        console.log(row);
        var url = "porderdetail.html?oid="+row.id + "&pid=" + row.profile_id;
        window.open(url);
    }
};

function load_profiles() {
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
                var user = data.data;
                var htmlNodes = '';
                for(var i in user) {
                    htmlNodes += '<button class="btn btn-default eborder profile_buttons" value="' + user[i].id + '"> ' + user[i].name + ' </button>';
                }
                $('#user_list').empty().append(htmlNodes);
                $(".profile_buttons").on("click",function () {
                    init_orderlist($(this).val());
                    //$('#order').bootstrapTable('refresh',{url:config.base_url + "medicalrecord?profile_id=" + $(this).val() +"&token="+checktoken() + "&record_id=0"});
                });
            }
            else {
                alert(data.error);
            }

        }

    });
}

