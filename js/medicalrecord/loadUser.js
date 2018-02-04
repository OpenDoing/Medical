//window.onunload = refresh_userprofile();

function refresh_userprofile() {

    var token = checktoken();

    var profile_id = window.location.hash.split("profile_id=")[1];

    $.ajax({
        type: "POST",
        url: config.base_url + "userprofile",
        data: {
            'token':token,
            'profile_id':profile_id
        },
        success: function (data) {
            if(data.succ == 1){
                $("#id").text(data.data.id);
                $("#name").text(data.data.name);
                $("#birth").text(data.data.birth);
                $("#address").text(data.data.address);
                $("#phone").text(data.data.phone);
                if(data.data.sex === 0)
                    $("#sex").text("女");
                else
                    $("#sex").text("男");
            }
            else {
                alert(data.error);
            }
        }
    });
}

$("#addCase").on("click",function () {
    window.location.hash = "addrecord";
    loadInner();
});


