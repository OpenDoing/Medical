
//@ 显示错误提示
function showTips(msg){
    return popTips(msg);
}

//@ 显示加载中提示
function showLoading(msg){
    var obj = $(".loading");
    if(msg){
        if($(".loadingtips").length > 0){
            $(".loadingtips").html(msg);
        }else{
            var str = "<div class='loadingtips'>" + msg +"</div>";
            $(".loading").append(str);
        }
        $(".loading").css({"marginTop": obj.height()*-0.5, "marginLeft": obj.width()*-0.5});
    }
    $(".loading").show();
}

//@ 显示加载中提示
function hideLoading(msg){
    $(".loading").hide();
    if($(".loadingtips").length > 0){
        $(".loadingtips").remove();
        $(".loading").css({"marginTop": "-40px", "marginLeft": "-40px"});
    }
}



//@ 显示成功提示
function showSuccess(msg){
    var str = msg ? msg : "操作成功";
    $(".success").find(".success-msg").html(str).end().show();
    $(".loading").hide();
    setTimeout(function(){
        $(".success").hide();
    }, 3000);
}

//@ 显示动作提示
//@ param title 提示标题，默认为空
//@ param msg 提示内容，默认为空
//@ param duration 提示持续时间，默认3秒，若为sync则一直显示
//@ param args 对象数组，有name address events属性，存储按钮字面义和链接
function showPrompt(title, msg, duration, args){
    var title = title ? title : "", msg = msg ? msg : "", duration = duration ? duration : 3000, args;
    var event_0 = args[0].events ? args[0].events : function(){}, event_1 = typeof args[1] != 'undefined' ? args[1].events : function(){};
    function reset(){
        $(".prompt").removeClass("show");
        $(".prompt-box").removeClass("slipin");
        $(".prompt-title, .prompt-msg, .prompt-btn").empty();
        $(".prompt-btn").unbind();
        $(".prompt-btn").removeClass("half");
        $(".prompt-box, .prompt-msg").removeClass("style");
    }
    $(".prompt-title").html(title);
    $(".prompt-msg").html(msg);
    if(args.length > 1){
        $(".prompt-btn").addClass("half");
    }
    if(args.length){
        for(var i = 0; i < args.length; i++){
            var curbtn = $(".prompt-btn").eq(i);
            curbtn.text(args[i].name);
            curbtn.attr("href", args[i].address ? args[i].address : "javascript:void(0);");
            curbtn.one("click", function(){
                var action = $(this).index() ? event_1 : event_0;
                if(typeof action == 'function') action();
                reset();
            });
        }
    }
    $(".prompt").addClass("show");
    $(".prompt-box").addClass("slipin");
    $(".prompt-msg").css({"maxHeight": $(window).height()*0.5+"px"});
    $(".prompt-box").css({"top": ($(window).height() - $(".prompt-box").height())/2+"px"});
    if(duration != "sync" && duration != "syncs"){
        setTimeout(function(){
            reset();
        }, duration);
    }else if(duration == "sync"){
        $(".prompt").one("click", function(){
            reset();
        });
    }
}

function popTips(msg){
    var num = $(".user-tips").length;
    var str = '<div class="user-tips hidden typo_white typo_middle textc pagn mt10 lh_def" data-order="' + num + '"><div class="user-tips-msg pagn inblo">' + msg + '</div></div>';
    $(".user-tips").remove();
    $(".wrap").append(str);
    var curTips = $(".user-tips[data-order='"+num+"']");
    var marginTop = ($(window).height() - curTips.outerHeight()) / 2;
    curTips.css({"top": marginTop+"px"});
    curTips.fadeIn(300);
    setTimeout(function(){
        curTips.fadeOut(500);
    }, 3000);
    return false;
}