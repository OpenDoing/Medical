window.onunload = refresh_userinfo();

function refresh_userinfo() {

    $.ajax({
        type: "POST",
        url: config.base_url + "User",
        data: "token=" + checktoken(),
        success: function (data) {
            if(data.succ == 1){
                //保存用户信息到cookie
                var exp = new Date();
                if(data.data.token_valid_time > 0){
                    //设置过期时间
                    exp.setTime(exp.getTime() + 1000 * 60 * data.data.token_valid_time); //计算毫秒
                    document.cookie = "data=" + JSON.stringify(data.data) + ";expires=" + exp.toGMTString();
                }
                else {
                    document.cookie = "data=" + JSON.stringify(data.data);

                }
                $("#userHi").text(data.data.nickname);
                $("#userHH").text(data.data.nickname);
                $("#tel").text(data.data.phone);
                $("#hImg").attr('src',config.img_url + data.data.avatar);
                $("#hhImg").attr('src',config.img_url + data.data.avatar);
                $('#createTime').text(data.data.create_time);
                $('#lastTime').text(data.data.token_create_time);
            }
            else {
                alert(data.error);
            }
        }
    });

    if (window.location.hash == '#recordlist'){
        load_profiles();
    }
}


$(function () {
    $(".panel-group").on("click", "button", function(){
        window.location.hash = event.target.id; //设置锚点
        loadInner();
    });

    $(".panel-group").on("click", "button", function(){
        window.location.hash = event.target.id; //设置锚点
        loadInner();
    });

    $("#recordlist").on("click",function () {
        window.location.hash = event.target.id; //设置锚点
        loadInner();
        load_profiles();
    });

    loadInner();
});

function load_profiles() {
    $.ajax({
        url:"http://bieke.cf:8080/ma/zxy/api/userprofile",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: 0,
            token:checktoken()
        },
        success: function (data) {
            if(data.succ == 1){
                var user = data.data;
                // console.log(user);
                // console.log(111);
                var htmlNodes = '';
                $('#blist').empty();

                for(var i in user) {
                    htmlNodes += '<button class="btn btn-default eborder profile_buttons" value="' + user[i].id + '"> ' + user[i].name + ' </button>';
                }
                $('#blist').append(htmlNodes);
                $(".profile_buttons").on("click",function () {
                    if (document.getElementById("caseTable") == null){
                        $("#list-info").empty().append('<table id="caseTable"></table>');
                        init();
                    }
                    $('#caseTable').bootstrapTable('refresh',{url:config.base_url + "medicalrecord?profile_id=" + $(this).val() +"&token="+checktoken() + "&record_id=0"});
                });
            }
            else {
                alert(data.error);
            }

        }

    });
}

// $("#CasePanel").on("click",function () {
//     $.ajax({
//         url:"http://bieke.cf:8080/ma/zxy/api/userprofile",
//         type: 'get',
//         dataType: 'json',
//         data: {
//             profile_id: 0,
//             token:checktoken()
//         },
//         success: function (data) {
//             if(data.succ == 1){
//                 var user = data.data;
//                 var htmlNodes = '';
//                 $('#userList').empty();
//
//                 for(var i in user) {
//                     htmlNodes += '<li class="list-group-item"><button class="menu-item-left" id="recordlist" value="' + user[i].id + '"><span class="glyphicon glyphicon-triangle-right"></span>'+user[i].name +'</button></li>';
//                 }
//                 $('#userList').append(htmlNodes);
//             }
//             else {
//                 alert(data.error);
//             }
//
//         }
//
//     });
// });
// $("#recordlist").on("click",function () { //病历管理
//
// });
