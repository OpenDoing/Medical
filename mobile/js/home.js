window.onload = initnews();

function initnews() {
    $.ajax({
        type: "GET",
        url: config.base_url + "util/getnews",
        success: function (rep) {
            var data1 = JSON.parse(rep.msg);
            var data2 = JSON.parse(data1.data);
            var news = data2.newsList;

            for (var i in news){
                news[i].url = "http://mhos.jiankang51.cn/app/article_detail?id=" + news[i].id;
                news[i].img = "background-image:url(http://cms.jiankang51.cn" + news[i].imagePath + ")";

                var unixTimestamp = new Date(news[i].publishTime * 1) ;
                news[i].time = unixTimestamp.toLocaleString();
            }

            new Vue({
                el: '#news-list',
                data: {
                    items: news
                }
            });
        }
    });
}