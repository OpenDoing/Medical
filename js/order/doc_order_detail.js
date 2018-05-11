window.onload = function () {

    var oid = getQueryString('oid');
    init_orderlist(oid);
    orderdetail(oid);
    init(oid);
};

function init_orderlist(oid) {
    $.ajax({
        type: "POST",
        url: config.base_url + "Doctororders/detail",
        data:{
            'token':checktoken(),
            'oid':oid
        },
        success: function (data) {
            if (data.succ == 1){
                    $('#doc_order').bootstrapTable('load',data.data.cases);
                    $(".fixed-table-loading")[0].style.display="none";      //数据加载成功  加载那行字去掉
            }
        }
    });
}
// window.onload = init();


function init(oid) {
    $('#doc_order').bootstrapTable({
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
            console.log(row);
            $("#visit_time").text(row.visit_time);
            $("#hospital").text(row.hospital);
            $("#decription").text(row.description);

            $.ajax({
                type: "POST",
                url: config.base_url + "Doctororders/casedetail",
                data: {                          //oid+cid
                    'token':checktoken(),
                    'oid':row.order_id,
                    'cid':row.id,
                    // 'profile_id':row.profile_id,
                    // 'record_id':row.id
                },
                success: function (data) {
                    console.log(data);
                    if(data.succ == 1){
                        var images = data.data.images;
                        var imagehtml = '';

                        if (images.length == 0){
                            var message = "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">\n" +
                                "                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                                "暂无病历图片" +
                                "                    </div>";
                            $("#img-msg").empty().append(message);
                            return;
                        }

                        for (var i in images){
                            imagehtml += '<div class="col-sm-6 col-md-4">\n' +
                                '    <div class="thumbnail">\n' +
                                '        <a class="lightbox" href="' + config.img_url + images[i].link +'">\n' +
                                '            <img src="' + config.img_url + images[i].link + '" alt="' + images[i].type_id + '">\n' +
                                '        </a>\n' +
                                '        <div class="caption">\n' +
                                '            <h3>' + images[i].type_id + '</h3>\n' +
                                '            <p>上传时间:' + images[i].create_time + '</p>\n' +
                                '        </div>\n' +
                                '    </div>\n' +
                                '</div>'
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


function orderdetail(oid) {
    $.ajax({
        type: "POST",
        url: config.base_url + "Doctororders/detail",
        data:{
            'token':checktoken(),
            'oid':oid
        },
        success:function (response) {
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

            $("#username").text(response.data.username);
            $("#appointment_time").text(response.data.appointment_date +" "+ response.data.range);
            $("#price").text(response.data.price + " 元");
            $("#status").text(response.data.status);
            if(response.data.sex == 1)
                $("#sex").text("男");
            else
                $("#sex").text("女");
            $("#birth").text(response.data.birth);


            console.log(response);
            if (response.succ == 1){
                // console.log("接口测试");
            }
        }
    });
}