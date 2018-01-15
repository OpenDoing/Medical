
$('#caseTable').bootstrapTable({
    method:"GET",
    dataType:'json',
    pagination:true,
    search:true,
    url:config.base_url + "medicalrecord?profile_id=" + window.location.hash.split("profile_id=")[1] +"&token="+getCookie('token') + "&record_id=0",

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
        $("#list-info").empty();
        $("#list-info").load("recordinfo.html",function () {
            $("#visit_time").text(row.visit_time);
            $("#hospital").text(row.hospital);
            $("#decription").text(row.description);


        });

    }
};

function update(row) {

    console.log(gloable);
    alert(gloable);
    //return 'index';
}
