window.onload = loadinfo();

function loadinfo() {
    load_department();
    inithead();

}

function load_department() {
    var htmls = "";
    $.ajax({
        type: "GET",
        url: config.base_url + "department",
        success: function (data) {
            for(var i in data){
                htmls += '<span class="small">\n' +
                    '<a href="" id="' + data[i].id + '">' + data[i].name + '</a>\n' +
                    '</span>';
            }
            $("#departments").empty().append(htmls);
            //$("#test11").html('111')
        }
    });
}

//初始化表头
function inithead() {
    var table = $('#maintable');
    var htmls = '<tr class="right_nav" style="width: 1002px; position: absolute;">\n' +
        '                        <th width="23%" colspan="2"><i>专家</i></th>\n' +
        '                        <th width="22%"><i>介绍</i></th>\n' +
        '                        <th width="2%"><a class="turn_fl" href="javascript:void(0)"></a></th>';


    var formatDate = function(date){
        var month = (date.getMonth()+1);
        var day = date.getDate();
        var week = ['周日','周一','周二','周三','周四','周五','周六'][date.getDay()];

        return month + '-' + day + '#' + week;
    };

    var addDate= function(date,n){
        date.setDate(date.getDate()+n);
        return date;
    };

    var date = new Date();

    for(var i = 1;i <= 7;i++){
        var d_w = formatDate(addDate(date,1)).split("#");
        htmls += '<th width="7%"><p>' + d_w[0] + '<span>' + d_w[1] +'</span></p></th>'
    }
    htmls += '<th width="3%"><a class="an_fr" href="javascript:void(0);"></a></th></tr>';
    $("#thead").html(htmls);
}