window.onload = function () {

    var oid = getQueryString('oid');
    var pid = getQueryString('pid');
    orderdetail(oid,pid);
    init();
};

function live_btn() {
    var url = config.patient_live_url + $('#live').attr("value");
    window.open(url);
}

function cancel_order() {
    bootbox.confirm({
        size: "small",
        message: "是否取消此订单？",
        callback: function(result){
            /* result is a boolean; true = OK, false = Cancel*/
            if(result == true){
                $.ajax({
                    type: "POST",
                    url: config.base_url + "order/cancel",
                    data: {
                        'token': checktoken(),
                        'profile_id':getQueryString('pid'),
                        'order_id': getQueryString('oid'),
                    },
                    success:function (res) {
                        if (res.succ === 1){
                            setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                                window.location.reload();//页面刷新
                            },1500);
                        }
                        else
                            bootbox.alert({
                                size: "small",
                                title: "取消订单",
                                message: res.error
                            });
                    }
                });
            }
        }
    })
}

function del_order() {
    bootbox.confirm({
        size: "small",
        message: "是否删除此订单？",
        callback: function(result){
            /* result is a boolean; true = OK, false = Cancel*/
            if(result == true){
                $.ajax({
                    type: "POST",
                    url: config.base_url + "order/delete",
                    data: {
                        'token': checktoken(),
                        'profile_id':getQueryString('pid'),
                        'order_id': getQueryString('oid')
                    },
                    success:function (res) {
                        if (res.succ === 1){
                            setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
                                window.location.reload();//页面刷新
                            },1500);
                        }
                        else
                            bootbox.alert({
                                size: "small",
                                title: "删除订单",
                                message: res.error
                            });
                    }
                });
            }
        }
    })

}

function create_case() {
    bootbox.confirm({
        size: "small",
        message: "是否生成咨询记录？",
        callback: function(result){
            /* result is a boolean; true = OK, false = Cancel*/
            if(result == true){
                $.ajax({
                    type: "POST",
                    url: config.base_url + "order/createcase",
                    data: {
                        'token': checktoken(),
                        'profile_id':getQueryString('pid'),
                        'order_id': getQueryString('oid'),
                    },
                    success:function (res) {
                        if (res.succ === 1){
                            bootbox.alert({
                                size: "small",
                                title: "生成咨询记录",
                                message: "生成记录成功！"
                            });
                        }
                        else
                            bootbox.alert({
                                size: "small",
                                title: "生成咨询记录",
                                message: res.error
                            });
                    }
                });
            }
        }
    })

}

function init() {
    $('#order_case').bootstrapTable({
        dataType:'json',

        onLoadSuccess: function(){  //加载成功时执行
            return "加载成功";
        },
        onLoadError: function(){  //加载失败时执行
            return "加载数据失败";
        },
        striped:true,

        onClickRow:function (row) {
            // alert(row.profile_id)
        },
        columns: [
            {
                field: 'id',
                title: '序号',
                align:'center',
                width: 80 + "px"
            },
            {
                field: 'visit_time',
                title: '就诊日期',
                align:'center',
                width: 150 + "px"
            },
            {
                field: 'hospital',
                title: '就诊医院',
                align:'center',
                width: 200 + "px"
            },
            {
                field: 'description',
                title: '疾病描述',
                align:'center'
            },
            {
                title:'操作',
                align:"center",
                width: 100 + "px",
                events:"operateEvents",
                formatter: function (value, row, index) {
                    return [
                        '<button id="showinfo" type="button" class="btn btn-default" data-toggle="modal" data-target="#case-images-modal">查看</button>'
                    ].join("");
                }
            }
        ]
    });

}

window.operateEvents = {
    'click #showinfo': function (e, value, row, index) {
        $("#case-detail").empty().load("recordinfo.html",function () {
            $("#visit_time").text(row.visit_time);
            $("#hospital").text(row.hospital);
            $("#decription").text(row.description);

            $.ajax({
                type: "POST",
                url: config.base_url + "Recordimage/",
                data: {
                    'token':checktoken(),
                    'profile_id':row.profile_id,
                    'record_id':row.id
                },
                success: function (data) {
                    // console.log(data);

                    if(data.succ == 1){
                        var images = data.data;
                        var imagehtml = '';
                        var head = '';
                        var tail = '</div>';

                        if (images.length == 0){
                            var message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                                "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                                "暂无病历图片" +
                                "                    </div>";
                            $("#img-msg").empty().append(message);
                            return;
                        }

                        for (var i in images){
                            if((i+1)%3 === 1 ){                 //换行
                                head = '<div class="row">';
                                console.log(head);
                                imagehtml += head;
                            }else{
                                head = '';
                            }

                            imagehtml += '<div class="col-md-4">\n' +
                                '    <div class="thumbnail">\n' +
                                '        <a class="lightbox" href="' + config.img_url + images[i].link +'">\n' +
                                '            <img src="' + config.img_url + images[i].link + '" alt="' + images[i].type_id + '">\n' +
                                '        </a>\n' +
                                '        <div class="caption">\n' +
                                '            <h3>' + images[i].type_id + '</h3>\n' +
                                '            <p>上传时间:' + images[i].create_time + '</p>\n' +
                                '        </div>\n' +
                                '    </div>\n' +
                                '</div>';
                            if ((i+1)%3 === 0) {
                                imagehtml += tail;
                            }
                        }
                        $("#image-items").empty().append(imagehtml);
                        baguetteBox.run('.tz-gallery');
                    }
                    else {
                        var message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                            "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                            data.error +
                            "                    </div>";
                        $("#img-msg").empty().append(message);
                    }
                }
            });

        });

    }
};

function update(row) {

    console.log(gloable);
    alert(gloable);
    //return 'index';
}


function orderdetail(oid,pid) {
    $.ajax({
        type: "POST",
        url: config.base_url + "order/",
        data:{
            'token':checktoken(),
            'order_id':oid,
            'profile_id':pid
        },
        success:function (response) {
            $('#order_case').bootstrapTable('load',response.data.cases);
            $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉

            $("#order_id").text("订单编号："+response.data.id);
            $("#create_time").text(response.data.create_time);
            if(response.data.disease_input != null)
                $("#disease_input").text(response.data.disease_input);
            else
                $("#disease_input").text("患者未提交病情描述");

            if(response.data.advice != null)
                $("#advice").text(response.data.advice);
            else
                $("#advice").text("医生暂未提交建议");

            $("#doctorname").text(response.data.doctorname);
            $("#typename").text(response.data.typename);
            $("#department").text(response.data.department);
            $("#code").text(response.data.code);

            $("#appointment_time").text(response.data.appointment_date +" "+ response.data.range);
            $("#price").text(response.data.price + " 元");
            $("#status").text(response.data.status);
            if (response.data.status == '咨询中'){
                $("#live").attr("disabled", false);
                $("#live").attr('value',response.data.live_link);
            }
            if (response.data.status == '待支付'){
                $("#cancel").attr("disabled", false);
            }
            if (response.data.status == '已取消'){
                $("#del").attr("disabled", false);
            }
            if (response.data.status == '待评价'){
                $("#eva").attr("disabled", false);
            }
            if(response.data.sex == 1)
                $("#sex").text("男");
            else
                $("#sex").text("女");



            console.log(response);
            if (response.succ == 1){
                // console.log("接口测试");
            }
        }
    });
}