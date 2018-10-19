var p_id;
window.onload = load_userprofile();

function load_userprofile() {
    $.ajax({
        url: config.base_url + "userprofile",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: 0,
            token:checktoken()
        },
        success: function (data) {
            if(data.succ === 1){
                init_memlist(data.data);
            }
            else {
                showTips(data.error);
            }
        }
    });
}

//加载患者列表
function init_memlist(data) {
    for (var i in data){
        data[i].value = data[i].name;
    }
    new MobileSelect({
        trigger: '#patient-trigger',
        title: '咨询人',
        wheels: [
            {data:data}
        ],
        callback:function(indexArr, data){
            // schedule_id = data[0].id;
            p_id = data[0].id;
            load_orders(data[0].id);
        }
    });
}

var example1 = new Vue({
    el: '#orderinfo',
    data: {
        items: {}
    }
});


function load_orders(id) {
    console.log(id);
    $.ajax({
        url: config.base_url + "order",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: id,
            order_id: 0,
            token: checktoken()
        },
        success: function (res) {
            if (res.succ === 1) {
                console.log(example1.items);
                var data = res.data;
                for(i in data){
                    data[i].time = data[i].appointment_date + " " + data[i].str_time;
                    data[i].href = "detail.html?oid="+ data[i].id + "&pid=" + data[i].profile_id;
                    data[i].photo = config.img_url + data[i].photo;
                }
                example1.items = data;
            }

        }
    });

}