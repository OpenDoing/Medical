var rid = getQueryString('rid');
var pid = getQueryString('pid');
var name = decodeURI(getQueryString('uname'));

window.onload = function () {
    casedetail();
    loadimg();
    // init();
};

$("#del").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    showPrompt('', "确定要删除病历吗？删除后无法恢复", "syncs", [{
        "name": "取消", "events": function () {
        }
    }, {
        "name": "确定", "events": function () {
            del();
        }
    }]);
});

function casedetail() {
    $.ajax({
        type: "POST",
        url: config.base_url + "Medicalrecord/",
        data:{
            'token':checktoken(),
            'record_id':rid,
            'profile_id':pid
        },
        success:function (response) {
            // if (response.succ == 1){
                var data = response;

                data.username = name;

                if(data.description === null || data.description === "")
                    data.description = "患者未提交就诊详情";

                new Vue({
                    el: '#case-info',
                    data: data
                });
            // }
            // else
            //     showTips(response.error);

        }
    });
}



function del() {
    $.ajax({
        type: "POST",
        url: config.base_url + "Medicalrecord/delete",
        data:{
            'token':checktoken(),
            'record_id':rid,
            'profile_id':pid
        },
        success:function (response) {
            if (response.succ == 1){
                showTips("删除成功");
                setTimeout(function () {
                    window.location.href = "caselist.html";
                }, 1000);
            }
            else
                showTips(response.error);

        }
    });
}
function loadimg() {
    var a = '<a href="{link}" data-caption="{type}">\n' +
        '    <img src="{thumb}" alt="{type}"></a>';
    var htmls = '';
    $.ajax({
        type: "POST",
        url: config.base_url + "recordimage/",
        data:{
            'token':checktoken(),
            'record_id':rid,
            'profile_id':pid
        },
        success:function (response) {
            if (response.succ === 1) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    data[i].link = config.img_url + data[i].link;
                    var date = data[i].link.split("\\")[0];
                    var name = data[i].link.split("\\")[1];
                    data[i].thumb = date + "/thumb_" + name;
                    htmls += a.replace("{link}",data[i].link)
                        .replace("{thumb}",data[i].thumb)
                        .replace("{type}",data[i].type_id);
                }

                $("#img-list").append(htmls);
                baguetteBox.run('.baguetteBoxOne');

            }
            else
                showTips(response.error);

        }
    });
}
function upload_image() {
    window.location.href = "addimage.html?rid=" + rid + "&pid=" + pid;
}