window.onload = function () {
    var rid = getQueryString('rid');
    var pid = getQueryString('pid');
    var name = decodeURI(getQueryString('uname'));
    casedetail(rid,pid,name);
    loadimg(rid,pid);
    // init();
};

function casedetail(rid,pid,name) {
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
function loadimg(rid,pid) {
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
