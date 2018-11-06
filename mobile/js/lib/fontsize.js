//字体大小自适应
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 32 * (clientWidth / 320) + 'px';
            // document.getElementById("tbanner").style.height = 32 * (clientWidth / 80) + 'px';
            // document.getElementById("banner-img").style.width = 2 * 32 * (clientWidth / 80) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);