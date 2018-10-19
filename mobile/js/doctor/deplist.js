window.onload = pinyin();

var cityWrapper = document.querySelector('.city-wrapper-hook');
var cityScroller = document.querySelector('.scroller-hook');
var cities = document.querySelector('.cities-hook');
var shortcut = document.querySelector('.shortcut-hook');


var scroll;

var shortcutList = [];
var anchorMap = {};

/**
 * 省市拼音排序
 */
function pySegSort(arr, empty) {
    if(!String.prototype.localeCompare)
        return null;
    var letters = "*ABCDEFGHJKLMNOPQRSTWXYZ".split('');
    var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
    var segs = [];// 存放数据
    var py = [];// 存放首字母
    var res = {};
    var curr;
    $.each(letters, function(i) {
        curr = {
            letter: this,
            data: []
        };
        $.each(arr, function(k, v) {
            if((!zh[i - 1] || zh[i - 1].localeCompare(v.name) <= 0) && v.name.localeCompare(zh[i]) == -1) {
                curr.data.push(this);
            }
        });
        if(empty || curr.data.length) {
            py.push(this);
            segs.push(curr);
            curr.data.sort(function(a, b) {

                return a.name.localeCompare(b.name);
            });
        }
    });
    res["segs"] = segs;
    res["py"] = py;
    return res;
}
function pinyin() {

    $.ajax({
        type: "GET",
        url: config.base_url + "department/sortlist",
        success: function (response) {
            var data = response.data;
            // var str = pySegSort(data);
            init_scroller(data);
            // console.log(str)
        }
    });
}

function todoclist(dep_id) {
    window.location.href = "list.html?dep_id=" + dep_id;
}


function initCities(depdata) {
    var y = 0;
    var titleHeight = 28;
    var itemHeight = 44;

    var lists = '';
    var en = '<ul>';

    for(var key in depdata){
        var name = key;
        lists += '<div class="title">'+name+'</div>';
        lists += '<ul>';
        depdata[key].forEach(function(g) {
            lists += '<li onclick="todoclist('+ g.id + ')" class="item" data-name="'+ g.name +'" data-id="'+ g.id +'"><span class="border-1px name">'+ g.name +'</span></li>';
        });
        lists += '</ul>';


        // var name = key.substr(0, 1);
        en += '<li data-anchor="'+name+'" class="item">'+name+'</li>';
        var len = depdata[key].length;
        anchorMap[name] = y;
        y -= titleHeight + len * itemHeight;
    }
    en += '</ul>';

    cities.innerHTML = lists;

    shortcut.innerHTML = en;
    shortcut.style.top = (cityWrapper.clientHeight - shortcut.clientHeight) / 2 + 'px';

    scroll = new window.BScroll(cityWrapper, {
        probeType: 3,
        click: true
    });

    // scroll.on('scroll', function (pos) {
    //   console.log(Math.round(pos.y));
    // });

    scroll.scrollTo(0, 0);
}


//bind Event
function bindEvent() {
    var touch = {};
    var firstTouch;

    shortcut.addEventListener('touchstart', function (e) {

        var anchor = e.target.getAttribute('data-anchor');

        firstTouch = e.touches[0];
        touch.y1 = firstTouch.pageY;
        touch.anchor = anchor;

        scrollTo(anchor);

    });

    shortcut.addEventListener('touchmove', function (e) {

        firstTouch = e.touches[0];
        touch.y2 = firstTouch.pageY;

        var anchorHeight = 16;

        var delta = (touch.y2 - touch.y1) / anchorHeight | 0;

        var anchor = shortcutList[shortcutList.indexOf(touch.anchor) + delta];

        scrollTo(anchor);

        e.preventDefault();
        e.stopPropagation();

    });

    function scrollTo(anchor) {
        var maxScrollY = cityWrapper.clientHeight - cityScroller.clientHeight;

        var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]));

        if (typeof y !== 'undefined') {
            scroll.scrollTo(0, y);
        }
    }
}

function init_scroller(depdata) {
    initCities(depdata);
    bindEvent();
}

