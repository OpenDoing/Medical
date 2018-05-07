window.onload = init_order_table();

function init_orderlist() {
    $.ajax({
        type: "GET",
        url: config.base_url + "Doctororders",
        data:{
            'token':checktoken(),
            'flag': 1
        },
        success: function (data) {
            if (data.succ == 1){
                $('#order').bootstrapTable('load',data.data);
            }
        }
    });
}

function init_order_table(data) {

    init_orderlist();

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
            for (var i=0;i<res.data.length;i++){
                if (res.data[i].sex === 0){
                    res.data[i].sex="女";
                }else{
                    res.data[i].sex="男";
                }
            }
            console.log(res);
            return res;
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
                field: 'name',
                title: '患者姓名'
            },
            {
                field: 'sex',
                title: '患者性别'
            },
            {
                field: 'birth',
                title: '患者生日'
            },
            {
                field: 'appointment_date',
                title: '预约时间'
            },
            {
                field: 'price',
                title: '价格'
            },
            {
                field: 'status',
                title: '状态'
            }
        ]
    });
}


