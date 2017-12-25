window.onload = load_userinfo;
function load_userinfo() {
    var user = JSON.parse(getCookie('user'));
    $("#userHi").text(user.nickname);
    $("#tel").text(user.phone);
    $("#hImg").attr('src',config.img_url + user.avatar);
}