$('#caseTable').bootstrapTable({
    // http://bieke.cf:8080/ma/zxy/api/
    //url:'data.json',
    method:"GET",
    dataType:'json',
    pagination:true,
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
            tittle:'操作'
        }
    ]
});