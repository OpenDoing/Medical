var p_id = getQueryString("pid");
var record_id = getQueryString("rid");
var type_id;

window.onload =  init_imagetype();


//加载图片类型
function init_imagetype() {
    $.ajax({
        type: "GET",
        url: config.base_url + "recordimage/imagetype",
        success: function (data) {
            for(var i in data){
                data[i].value = data[i].type;
            }
            initImage();
            new MobileSelect({
                trigger: '#image-trigger',
                title: '图片类型',
                wheels: [
                    {data:data}
                ],
                callback:function(indexArr, data){
                    // schedule_id = data[0].id;
                    type_id = data[0].id;
                    // load_case(data[0].id);
                }
            });
        }
    });
}


//图片上传
function initImage() {
    $(function() {
        $("#imageFile").fileinput({
            uploadUrl: config.base_url+ "Recordimage/upload" , //上传的地址  ?token="+checktoken()+"&type=doctor
            language: "zh",
            showCaption: false,              //是否显示标题
            uploadAsync: true,
            showBrowse:true,
            showUpload: true,               //是否显示上传按钮
            showRemove: true,               //是否显示移除按钮
            showPreview: true,                //是否显示预览按钮
            allowedFileExtensions: ["jpg", "jpeg","bmp","png"], //接收的文件后缀
            // previewSettings: {
            //     image: {width: "100px", height: "100px"},
            // },
            // uploadExtraData: {  //上传的时候，增加的附加参数
            //     token:checktoken(),
            //     profile_id:profile_id,
            //     record_id:record_id,
            //     type_id:$("#type").val()
            //
            //
            //     // folder: '数据导入文件', guid: $("#AttachGUID").val()
            // },
            uploadExtraData: function(previewId, index) {   //额外参数的关键点
                var obj = {};
                obj.token = checktoken();
                obj.profile_id = p_id;
                obj.record_id = record_id;
                obj.type_id = type_id;

                console.log(obj);
                return obj;
            }
        });
    });
}