window.onload = function () {
    var pid = getQueryString('pid');
    var oid = getQueryString('oid');
    var isdetail = getQueryString('isdetail');
    loadorder(pid,oid,isdetail);
};

function loadorder(pid,oid,flag) {
    $.ajax({
        type: "POST",
        url: config.base_url + "order",
        data:{
            'token':checktoken(),
            'profile_id':pid,
            'order_id':oid
        },
        success: function (response) {
            if (response.succ == 1){
                var data = response.data;

                //订单提交成功
                if (flag == 0){
                    var success_part = $('#succ_change').html();
                    success_part = success_part.replace('{name}',data.username)
                        .replace('{department}',data.department)
                        .replace('{doctor_name}',data.doctorname)
                        .replace('{date}',data.appointment_date)
                        .replace('{range}',data.range);
                    $("#success").append(success_part);
                }
                else {

                }
            }

        }
    });
}