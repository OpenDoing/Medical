window.onload = function () {

    var oid = getQueryString('oid');
    var pid = getQueryString('pid');
    orderdetail(oid,pid);
    // init();
};

function orderdetail(oid,pid) {
    $.ajax({
        type: "POST",
        url: config.base_url + "order/",
        data:{
            'token':checktoken(),
            'order_id':oid,
            'profile_id':pid
        },
        success:function (response) {
            if (response.succ == 1){
                var data = response.data;

                data.doc_img = config.img_url + data.photo;
                //data.doc_url = "../doctor/detail.html?doc_id="

                if(data.disease_input === null || data.disease_input === "")
                    data.disease_input = "患者未提交病情描述";

                if(data.advice === null || data.advice === "")
                    data.advice = "医生尚未提交咨询建议";

                new Vue({
                    el: '#order-info',
                    data: data
                });

                //控制按钮可见性
                if (response.data.status === '待支付'){
                    $("#pay").show();
                    $("#cancel").show();
                    $("#live").hide();
                    $("#eva").hide();
                    $("#del").hide();
                    $("#create_case").hide();
                    $("#show_eva").hide();
                }
                if (response.data.status === '待咨询'){
                    $("#pay").hide();
                    $("#cancel").hide();
                    $("#live").show();
                    $("#eva").hide();
                    $("#del").hide();
                    $("#create_case").hide();
                    $("#show_eva").hide();
                }
                if (response.data.status === '咨询中'){
                    $("#pay").hide();
                    $("#cancel").hide();
                    $("#del").hide();
                    $("#eva").hide();
                    //todo:接入直播
                    $("#live").attr('value',response.data.live_link);
                    $("#create_case").hide();
                    $("#show_eva").hide();
                }
                if (response.data.status === '待建议'){
                    $("#pay").hide();
                    $("#cancel").hide();
                    $("#del").hide();
                    $("#eva").hide();
                    $("#live").hide();
                    $("#create_case").hide();
                    $("#show_eva").hide();
                }
                if (response.data.status === '待评价'){
                    $("#pay").hide();
                    $("#cancel").hide();
                    $("#del").hide();
                    $("#eva").show();
                    $("#live").hide();
                    $("#create_case").hide();
                    $("#show_eva").hide();
                }
                if (response.data.status === '已完成'){
                    $("#pay").hide();
                    $("#cancel").hide();
                    $("#del").hide();
                    $("#eva").hide();
                    $("#live").hide();
                    $("#create_case").show();
                    $("#show_eva").show();

                }
                if (response.data.status === '已取消'){
                    $("#pay").hide();
                    $("#cancel").hide();
                    $("#del").show();
                    $("#eva").hide();
                    $("#live").hide();
                    $("#create_case").hide();
                    $("#show_eva").hide();
                }
                if (response.data.status === '已删除'){
                    $("#pay").hide();
                    $("#cancel").hide();
                    $("#del").hide();
                    $("#eva").hide();
                    $("#live").hide();
                    $("#create_case").hide();
                    $("#show_eva").hide();
                }
            }
            else
                showTips(response.error);

        }
    });
}

function cancel_order() {
    showPrompt('', "确定要取消订单吗？", "syncs", [{
        "name": "取消", "events": function () {
        }
    }, {
        "name": "确定", "events": function () {
            showLoading("正在取消订单");
            $.ajax({
                type: "POST",
                url: config.base_url + "order/cancel",
                data: {
                    'token': checktoken(),
                    'profile_id':getQueryString('pid'),
                    'order_id': getQueryString('oid')
                },
                success:function (res) {
                    if (res.succ === 1){
                        showSuccess();
                        setTimeout(function(){
                            window.location.reload();
                        },1500);
                    }
                    else
                        showTips(res.error);
                }
            });
        }
    }]);
}

function del_order() {
    showPrompt('', "确定要删除订单吗？", "syncs", [{
        "name": "取消", "events": function () {
        }
    }, {
        "name": "确定", "events": function () {
            showLoading("正在删除订单");
            $.ajax({
                type: "POST",
                url: config.base_url + "order/delete",
                data: {
                    'token': checktoken(),
                    'profile_id':getQueryString('pid'),
                    'order_id': getQueryString('oid')
                },
                success:function (res) {
                    if (res.succ === 1){
                        showSuccess();
                        setTimeout(function(){
                            window.location.reload();
                        },1500);
                    }
                    else
                        showTips(res.error);
                }
            });
        }
    }]);
}

function create_case() {
    showPrompt('', "确定要生成咨询记录吗？", "syncs", [{
        "name": "取消", "events": function () {
        }
    }, {
        "name": "确定", "events": function () {
            showLoading("正在生成咨询记录");
            $.ajax({
                type: "POST",
                url: config.base_url + "order/createcase",
                data: {
                    'token': checktoken(),
                    'profile_id':getQueryString('pid'),
                    'order_id': getQueryString('oid')
                },
                success:function (res) {
                    if (res.succ === 1){
                        showSuccess();
                    }
                    else
                        showTips(res.error);
                }
            });
        }
    }]);
}