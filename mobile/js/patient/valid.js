/*
 * 数据校验
 *
 * Date : 2016-4-11
 */

var valid = function(){
    var reg = {
        // 支持手机号段，
        // 移动号段：134 135 136 137 138 139 147 150 151 152 157 158 159 178 182 183 184 187 188，
        // 联通号段：130 131 132 145 155 156 171 175 176 185 186
        // 电信号段：133 149 153 173 177 180 181 189
        // 虚拟运营商：170
        //'mobile' : /^0?1[3|4|5|7|8][0-9]\d{8}$/,
        'mobile'        : /^0?(^1[3|5|8|9][0-9]|14[5|6|7|8|9]|16[1|2|4|5|6|7]|17[0-8])[0-9]{8}$/,
        'empty'         : /&nbsp;| |<.*?>/g,
        'HMCard'        : /^([A-Z]\d{6,10}(\(\w{1}\))?)$/, //港澳居民来往内地通行证号码验证正则
        'HZCard'        : /^[\da-zA-Z]{1,20}$/, //护照验证正则
        'truenamereg'   : /^[\u2E80-\uFE4F]{2,6}(B|BB)?$|^[\u2E80-\uFE4F]{1,6}(·[\u2E80-\uFE4F]{1,6})(B|BB)?$|^[A-Za-z]{2,18}$/,    // 实名校验规则
        'socialCard'    : /^\d{6,12}$/
    };

    // @return true|false
    var pattern = function(str, mode) {
        return reg.hasOwnProperty(mode) ? reg[mode].test(str) : false;
    }

    return {
        // 手机号码识别
        isMobileNum : function(str) {
            return pattern(str, 'mobile');
        },
        // 身份证号码识别
        isIdCard : function(str) {
            if(JYIDCard.isCard == undefined) {
                return {"code":false,"msg":"缺少身份证识别控件！"};
            } else {
                //return JYIDCard.isCard(str);
                var rel = JYIDCard.isCard(str);
                if(rel.code == false) {
                    return false;
                }
                return true;
            }
        },
        // 港澳居民来往内地通行证号码识别
        isHMCard : function(str) {
            return pattern(str, 'HMCard');
        },
        // 护照校验
        isPassport : function(str) {
            return pattern(str, 'HZCard');
        },
        // 实名校验
        isTrueName : function(str) {
            //return !truenamereg.exec(str);
            return pattern(str, 'truenamereg');
        },
        isEmpty : function(str) {
            return str.replace(reg.empty, '') == '' ? true : false;
        },
        isSocialCard : function(str) {
          return pattern(str, 'socialCard');
        }
    };
}();