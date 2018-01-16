
$('#caseTable').bootstrapTable({
    method:"GET",
    dataType:'json',
    pagination:true,
    search:true,
    url:config.base_url + "medicalrecord?profile_id=" + window.location.hash.split("profile_id=")[1] +"&token="+checktoken() + "&record_id=0",

    onLoadSuccess: function(){  //加载成功时执行
        return "加载成功";
    },
    onLoadError: function(){  //加载失败时执行
        return "加载数据失败";
    },
    striped:true,

    onClickRow:function (row) {
        //console.log(row);
        //var index = row.id;
    },
    columns: [
        {
            field: 'id',
            title: '序号',
            align:'center',
            width: 50 + "px"
        },
        {
            field: 'visit_time',
            title: '就诊日期'
        },
        {
            field: 'hospital',
            title: '就诊医院'
        },
        {
            field: 'description',
            title: '描述'
        },
        {
            title:'操作',
            align:"center",
            events:"operateEvents",
            formatter: function (value, row, index) {
                return [
                    '<button id="showinfo" type="button" class="btn btn-default">查看</button>'
                ].join("");
            }
        }
    ]
});

window.operateEvents = {
    'click #showinfo': function (e, value, row, index) {
        $("#list-info").empty().load("recordinfo.html",function () {
            $("#visit_time").text(row.visit_time);
            $("#hospital").text(row.hospital);
            $("#decription").text(row.description);

            $.ajax({
                type: "POST",
                url: config.base_url + "recordimage",
                data: {
                    'token':checktoken(),
                    'profile_id':window.location.hash.split("profile_id=")[1],
                    'record_id':row.id
                },
                success: function (data) {
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
