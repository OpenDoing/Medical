window.onload = init_orderlist();

function init_orderlist() {
    $.ajax({
        type: "GET",
        url: config.base_url + "order",
        data:{
            'profile_id':2,
            'token':checktoken()
        },
        success: function (data) {
            if (data.succ == 1){
                init_order_table(data.data);
            }
        }
    });
}

function init_order_table(data) {
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
                title: '账号'
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
            }
        ]
    });
}

