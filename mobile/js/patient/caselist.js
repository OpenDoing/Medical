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
            load_cases(data[0].id);
        }
    });
}

var vm = new Vue({
    el: '#caselist',
    data: {
        items: {}
    }
});

// 查询某人的病历列表
function load_cases(val) {
    $.ajax({
        url: config.base_url +  "medicalrecord",

        type: 'get',
        dataType: 'json',
        data: {
            profile_id: val,
            token: checktoken(),
            record_id: 0
        },
        success: function (res) {
            if (res.succ === 1) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].type === 1) {
                        res.data[i].type = '线下就诊';
                    } else {
                        res.data[i].type = '线上咨询';
                    }
                }
                vm.items = res.data
            }
        }
    });
}