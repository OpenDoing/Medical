var phone;

window.onload = function (ev) {
    $.ajax({
        url: config.base_url + "userprofile",
        type: 'get',
        dataType: 'json',
        data: {
            profile_id: getQueryString('id'),
            token: checktoken()
        },
        success: function (res) {
            // if (res.data[0].sex === 1) {
            //     res.data[0].sex = '男';
            // } else {
            //     res.data[0].sex = '女';
            // }
            $("#username").val(res.data[0].name);
            $("#birthday").val(res.data[0].birth);
            // $("#sec_mobile").hide();
            // $("#mobile").removeAttr("type");
            $("#sec_mobile").attr("value",res.data[0].phone);
            $("#mobile").val(res.data[0].phone);
            phone = res.data[0].phone;

            $("#sex_type").val(res.data[0].sex);
            if (res.data[0].sex === 1) {
                $("#sex-val").text('男');
            } else {
                $("#sex-val").text('女');
            }
            $('#relationship_type').val(res.data[0].relation);
            switch (res.data[0].relation){
                case 1:
                    $("#relationship-val").text("本人");
                    break;
                case 2:
                    $("#relationship-val").text("父母");
                    break;
                case 3:
                    $("#relationship-val").text("子女");
                    break;
                case 4:
                    $("#relationship-val").text("夫妻");
                    break;
                case 5:
                    $("#relationship-val").text("亲属");
                    break;
                case 6:
                    $("#relationship-val").text("朋友");
                    break;
                case 7:
                    $("#relationship-val").text("其他");
                    break;
            }

        }
    });
};

//显示隐藏性别日期选择框
function isShowSelect(is_show) {
    if (is_show == true) {
        if (!$("#birthday").parents('.uc-iform-item').hasClass('list_arrow')) {
            $("#birthday").attr('readonly', false).parents('.uc-iform-item').removeClass('pagn').addClass('list_arrow');
        }
    } else {
        if ($("#birthday").parents('.uc-iform-item').hasClass('list_arrow')) {
            $("#birthday").attr('readonly', true).parents('.uc-iform-item').removeClass('list_arrow').addClass('pagn');
        }
    }
}

(function () {
    //设置日期控件的最大时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month = month > 10 ? month : '0' + month;
    $("#birthday").attr('max', year + '-' + month + '-' + day)
})()

function submit() {
    $.ajax({
        url:  config.base_url + "userprofile/update",
        type: "POST",
        data: {
            'token':checktoken(),
            'profile_id':getQueryString('id'),
            'name':$('#username').val(),
            'sex':$("#sex_type").val(),
            'birth':$('#birthday').val(),
            'relation':$('#relationship_type').val(),
            'address':'暂无'
        },
        success: function (res) {
            if (res.succ === 1){
                showTips("修改成功");
                setTimeout(function () {
                    window.location.href = "patientlist.html";
                }, 1000);
            }else{
                showTips(res.error);
            }


        }
    });
}

function submitPhone() {
    $.ajax({
        url:  config.base_url + "userprofile/update_phone",
        type: "POST",
        data: {
            'token':checktoken(),
            'profile_id':getQueryString('id'),
            'name':$('#username').val(),
            'sex':$("#sex_type").val(),
            'birth':$('#birthday').val(),
            'relation':$('#relationship_type').val(),
            'phone':$('#mobile').val().trim(),
            'address':'暂无'
        },
        success: function (res) {
            if (res.succ === 1){
                showTips("修改成功");
                setTimeout(function () {
                    window.location.href = "patientlist.html";
                }, 1000);
            }else{
                showTips(res.error);
            }


        }
    });
}

function submitForm() {
    if ($('#username').get(0)) {
        if (!$.trim($('#username').val())) {
            return showTips('姓名不能为空');
        }
    }

    if ($('#sex_type').get(0)) {
        if ($('#sex_type').val() == '') {
            return showTips('请选择性别');
        }
    }

    if ($('#birthday').get(0)) {
        if (!$('#birthday').val()) {
            return showTips('请选择出生日期');
        }
    }

    // var age = data.birthday ? getAge(data.birthday) : 0;

    var account_relation = $('#relationship_type').val().trim();
    if (!account_relation) {
        return showTips('请选择成员关系');
    }

    if(phone === $('#mobile').val().trim()){
        submit();
    }
    else {
        var mobile = $('#mobile').val().trim();
        if (!mobile) {
            return showTips('手机号码不能为空');
        }
        if (!valid.isMobileNum(mobile)) {
            return showTips('请输入正确手机号码');
        }
        submitPhone();
    }
}

$(function () {

    checkbox();

    $("#submit").click(function () {
        submitForm();
    });

    $(".uc-info-form").on('click', '.show-sex', function () {
        $('#sex-box').show();
    });
    $(".uc-info-form").on('click', '.show-relationship', function () {
        $('#relationship-box').show();
    });
    $('.pop-cancel').click(function () {
        $(this).parents('.pop-mask').hide();
    });
    $('#sex,#relationship').on('click', 'p', function () {
        var _this = $(this),
            _val = _this.attr('data-val'),
            // old_val = $("#card_type").val(),
            _text = _this.text(),
            type = _this.parent('.select-con').attr('id');
        $('#' + type + '-val').html(_text);
        $('#' + type + '-box').hide().find('input').val(_val);
        // $("#sex-val").html(sex_type ? '女' : '男');

    });

    //后退按钮事件处理
    $(".nav-nav-prev").attr('href', 'javascript:void(0);').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        showPrompt('', "确定要放弃此次编辑吗？", "syncs", [{
            "name": "取消", "events": function () {
            }
        }, {
            "name": "确定", "events": function () {
                window.location.href = "patientlist.html";
            }
        }]);
    });
    $("#del").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        showPrompt('', "确定要删除患者资料吗？删除后该患者的所有病历和订单无法恢复！", "syncs", [{
            "name": "取消", "events": function () {
            }
        }, {
            "name": "确定", "events": function () {
                $.ajax({
                    url:  config.base_url + "userprofile/delete",
                    type: "POST",
                    data: {
                        'token':checktoken(),
                        'profile_id':getQueryString('id'),
                    },
                    success: function (res) {
                        if (res.succ === 1){
                            showTips("删除成功");
                            setTimeout(function () {
                                window.location.href = "patientlist.html";
                            }, 1000);
                        }else{
                            showTips(res.error);
                        }


                    }
                });
            }
        }]);
    });

    $("#sec_mobile").change(function () {
        $("#mobile").val($(this).val());
    });
});