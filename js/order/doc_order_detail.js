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
        // method:"POST",
        dataType:'json',
        // pagination:true,
        // search:true,
        // url: config.base_url + "Doctororders/detail",
        // data:{
        //     'token':checktoken(),
        //     'oid':oid
        // },
        //url:config.base_url + "medicalrecord?profile_id=" + p_id +"&token="+checktoken() + "&record_id=0",

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
                        '<button id="showinfo" type="button" class="btn btn-default">查看</button>'
                    ].join("");
                }
            }
        ]
    });

}

window.operateEvents = {
    'click #showinfo': function (e, value, row, index) {
        $("#outer").empty().load("recordinfo.html",function () {
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
                        var images = data.data;
                        var imagehtml = '';

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
            $("#disease_input").text(response.data.disease_input);
            $("#username").text(response.data.username);
            $("#appointment_time").text(response.data.appointment_date +" "+ response.data.range);
            $("#price").text(response.data.price);
            $("#status").text(response.data.status);

            // var caseList = document.getElementById("caseList");
            // for (i=0;i<response.data.cases.length;i++){
            //     var tt = "<table width=\"100%\" border=\"0\" class=\"order-tab\">\n" +
            //         "                <tbody><tr>\n" +
            //         "                    <td width=\"20%\" align=\"right\">就诊时间：</td>\n" +
            //         "                    <td width=\"30%\">"+response.data.cases[i].visit_time +"</td>\n" +
            //         "                    <td width=\"20%\" align=\"right\">就诊医院：</td>\n" +
            //         "                    <td width=\"30%\">"+ response.data.cases[i].hospital +"</td>\n" +
            //         "                </tr>\n" +
            //         "                <tr>\n" +
            //         "                    <td width=\"20%\" align=\"right\">病情描述：</td>\n" +
            //         "                    <td colspan=\"3\">"+ response.data.cases[i].description +"</td>\n" +
            //         "                </tr>\n" +
            //         "\n" +
            //         "                </tbody>\n" +
            //         "            </table>";
            //     $("#caseList").append(tt);
            //     // var case1=document.createElement('div');
            //     // case1.setAttribute('id',response.data.cases[i].id);
            //     //
            //     // var visit_time = document.createElement('div');
            //     // visit_time.setAttribute('id',"visit"+response.data.cases[i].id);
            //     // var time_text=document.createTextNode(response.data.cases[i].visit_time);
            //     // visit_time.appendChild(time_text);
            //     // case1.appendChild(visit_time);
            //     //
            //     // var hospital = document.createElement('div');
            //     // hospital.setAttribute('id',"hospital"+response.data.cases[i].id);
            //     // var hospital_text=document.createTextNode(response.data.cases[i].hospital);
            //     // hospital.appendChild(hospital_text);
            //     // case1.appendChild(hospital);
            //     //
            //     // var liText=document.createTextNode(response.data.cases[i].description);
            //     //
            //     // // liElement.appendChild(liText);
            //     // caseList.appendChild(case1);
            // }
            console.log(response);
            if (response.succ == 1){
                // console.log("接口测试");
            }
        }
    });
}