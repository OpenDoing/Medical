$.ajax({
    //url: "data.json",
    url:"http://bieke.cf:8080/ma/zxy/api/userprofile",
    type: 'get',
    dataType: 'json',
    data: "profile_id="+0,
    success: function (user) {
        //字符串拼接
        //var tt = user;
        //var obj = eval ("(" + tt + ")");
        var htmlNodes = '';

        //console.log(obj.length);
        for(var i in user) {
            console.log(user);
            console.log(i);
            //console.log(i[i].name);
            console.log(user[0].id);
            htmlNodes += '<li class="list-group-item"><button class="menu-item-left"><span class="glyphicon glyphicon-triangle-right"></span>'+user[i].name +'</button></li>';
        }
        //console.log(user);
        $('#userList').append(htmlNodes);
    }

});
