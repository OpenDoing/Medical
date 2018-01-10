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
            tittle:'操作',
            align:"center",
            formatter: function (value, row, index) {
                //value = "编辑";
                //console.log(row.id);
                return "<div class=\"glyphicon glyphicon-edit\"  data-target=\"#addCase\" data-toggle=\"modal\" data-type=\"text\" data-pk=\""+row.Id+"\" data-title=\"用户名\"></div>";
            }
        }
    ]
});

function update(row) {

    console.log(gloable);
    alert(gloable);
    //return 'index';
}