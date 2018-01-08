$('#caseTable').bootstrapTable({
    // http://bieke.cf:8080/ma/zxy/api/
    //url:'data.json',
    method:"GET",
    dataType:'json',
    pagination:true,
    search:true,
    // data:{
    //     profile_id : '0',
    //     token:'30e35f0c1c20ba47a6949a82e838d63f'
    // },
    url:"http://bieke.cf:8080/ma/zxy/api/userprofile?profile_id=0&token="+getCookie('token'),
    // ajax:function () {
    //     url:"http://bieke.cf:8080/ma/zxy/api/",
    //     type:"POST",
    // },
    // ajaxOptions:{
    //     profile_id : '0',
    //     token:'30e35f0c1c20ba47a6949a82e838d63f'
    // },
    onLoadSuccess: function(){  //加载成功时执行
        return "加载成功";
    },
    onLoadError: function(){  //加载失败时执行
        return "加载数据失败";
    },
    striped:true,
    responseHandler:function (res) {    //data prehandle


        for (var i=0;i<res.length;i++){
            if (res[i].sex=="0"){
                res[i].sex="男";
            }else{
                res[i].sex="女";
            }

        }
        //gloable = res;
        return res;
    },
    onClickRow:function (row) {
        //console.log(row);
        //var index = row.id;
        $('#pname').val(row.name);
        $('#birthday').val(row.birth);
        $('#phone').val(row.phone);
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
            title: '姓名'
        },
        {
            field: 'sex',
            title: '性别'
        },
        {
            field: 'birth',
            title: '生日'
        },
        {
            field: 'address',
            title: '地址'
        },
        {
            field: 'phone',
            title: '手机号'
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