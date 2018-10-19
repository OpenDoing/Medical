var p_id;
window.onload = load_userprofile();

// window.onload = function (ev) {
//     var users = new Vue({
//         el: '#user_list',
//         data: {
//             patients: {}
//         }
//     });
//     $.ajax({
//         url: config.base_url + "userprofile",
//         type: 'get',
//         dataType: 'json',
//         data: {
//             profile_id: 0,
//             token:checktoken()
//         },
//         success: function (res) {
//             if (res.succ === 1) {
//
//                 users.patients = res.data;
//
//             }
//
//         }
//
//     });
// };

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
                alert_error(data.error);
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
                example1.items = res.data;
            }

        }
    });

}


$.ajax({
    url: "http://139.196.90.212:8080/ma/zxy/api/order",
    type: 'get',
    dataType: 'json',
    data: {
        profile_id: 28,
        order_id: 0,
        token: 'fe2c6f7e34ed4063f93eac706fbe1ca8'
    },
    success: function (res) {

    }
});