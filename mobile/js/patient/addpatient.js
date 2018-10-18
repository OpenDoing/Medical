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

function submitData() {
    // console.log(data);
    $.ajax({
        url:  config.base_url + "userprofile/create",
        type: "POST",
        data: {
            'token':checktoken(),
            'name':$('#username').val(),
            'sex':$('#sex_type').val(),
            'birth':$('#birthday').val(),
            'address':$('#relationship_type').val().trim(),
            'phone':$('#mobile').val().trim()
        },
        success: function (res) {
            if (res.succ === 1){
                showTips("添加成功");
                setTimeout(function () {
                    window.location.href = "patientinfo.html";
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

    var mobile = $('#mobile').val().trim();
    if (!mobile) {
        return showTips('手机号码不能为空');
    }
    if (!valid.isMobileNum(mobile)) {
        return showTips('请输入正确手机号码');
    }
    submitData();
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

    $("#sec_mobile").change(function () {
        $("#mobile").val($(this).val());
    });
});