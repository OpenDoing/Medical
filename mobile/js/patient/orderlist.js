
window.onload = function (ev) {
    var users = new Vue({
        el: '#user_list',
        data: {
            patients: {}
        }
    });
    $.ajax({
        url: config.base_url + "userprofile",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: 0,
            token:checktoken()
        },
        success: function (res) {
            if (res.succ === 1) {

                users.patients = res.data;

            }

        }

    });
};