
window.onload = function () {
    /**
     * 家庭成员加载到select框
     */
    var patients = new Vue({
        el: '#selectPatient',
        data: {
            items: {}
        }
    });
    $.ajax({
        url: config.base_url + "userprofile",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: 0,
            token: checktoken()
        },
        success: function (res) {

            if (res.succ === 1) {

                $("#defaultId").val(res.data[0].id);
                patients.items = res.data;

            }
        }
    });

    /**
     * 页面加载完 先把所有的病历显示出来
     */
    // console.log($("#selectPatient").val());
    //  changePatient($("#selectPatient").val());

};


var vm = new Vue({
    el: '#caselist',
    data: {
        items: {}
    }
});

// 查询某人的病历列表
function changePatient(val) {
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