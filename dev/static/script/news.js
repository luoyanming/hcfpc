$(function() {

	var cp,
		pageSize = 9;

	var news = {
		init: function() {
			cp = news.getQueryString('p');

			news.getNews(cp, pageSize);
		},
		getNews: function(cpage, pSize) {
			$.ajax({
		        type: "get",
		        url: mDomain + '/pcWeb/getMediaReportList.shtml',
		        data: {
		            pageNo: cpage,
		            pageSize: pSize
		        },
		        dataType: "jsonp",
		        jsonp: "callback",
		        success: function(data) {
	            	// console.log(data);

	            	var str = '';
	            	for(var i = 0; i < data.list.length; i++) {
	            		str += '<li>';
						str += '<a href="'+ data.list[i].linkUrl +'" class="link" target="_blank">';
						str += '<div class="imgbox">';
						str += '<img src="'+ data.list[i].imagePath +'">';
						str += '</div>';
						str += '<div class="news-box">';
						str += '<div class="title">'+ data.list[i].title +'</div>';
						str += '<div class="desc">'+ data.list[i].reportContent +'</div>';
						str += '</div>';
						str += '<div class="info">';
						str += '<div class="date">'+ data.list[i].reportDateFormat +'</div>';
						str += '<div class="resource">媒体来源：'+ data.list[i].mediaSource +'</div>';
						str += '</div>';
						str += '</a>';
						str += '</li>';
	            	}

					$('.news-list ul').html(str);

					news.createPagination(data.curPage, data.totalPage);
		        },
		        error: function(a) {
		        	$('.news-list').hide();
		        }
		    });
		},
		createPagination: function(cpage, tpage) {
			var pagePagi = $('.page-pagi'),
				str = '';
			
			str += '<a href="./news.html?p=1" class="pagi-first">首页</a>';

			if(tpage < 6) {
				for(var i = 1; i < tpage + 1; i++) {
					if(cpage == i) {
						str += '<a href="./news.html?p='+ i +'" class="active">'+ i +'</a>';
					} else {
						str += '<a href="./news.html?p='+ i +'">'+ i +'</a>';
					}
				}
			} else {
				if(cpage < 4) {
					for(var i = 1; i < 6; i++) {
						if(cpage == i) {
							str += '<a href="./news.html?p='+ i +'" class="active">'+ i +'</a>';
						} else {
							str += '<a href="./news.html?p='+ i +'">'+ i +'</a>';
						}
					}
				} else if(cpage < tpage - 2) {
					str += '<a href="./news.html?p='+ (cpage-2) +'">'+ (cpage-2) +'</a>';
					str += '<a href="./news.html?p='+ (cpage-1) +'">'+ (cpage-1) +'</a>';
					str += '<a href="./news.html?p='+ cpage +'" class="active">'+ cpage +'</a>';
					str += '<a href="./news.html?p='+ (cpage+1) +'">'+ (cpage+1) +'</a>';
					str += '<a href="./news.html?p='+ (cpage+2) +'">'+ (cpage+2) +'</a>';
				} else if(tpage - 3 < cpage < tpage + 1) {
					str += '<a href="./news.html?p='+ (tpage-4) +'">'+ (tpage-4) +'</a>';
					str += '<a href="./news.html?p='+ (tpage-3) +'">'+ (tpage-3) +'</a>';
					if(cpage == tpage - 2) {
						str += '<a href="./news.html?p='+ (tpage-2) +'" class="active">'+ (tpage-2) +'</a>';
						str += '<a href="./news.html?p='+ (tpage-1) +'">'+ (tpage-1) +'</a>';
						str += '<a href="./news.html?p='+ tpage +'">'+ tpage +'</a>';
					} else if(cpage == tpage - 1) {
						str += '<a href="./news.html?p='+ (tpage-2) +'">'+ (tpage-2) +'</a>';
						str += '<a href="./news.html?p='+ (tpage-1) +'" class="active">'+ (tpage-1) +'</a>';
						str += '<a href="./news.html?p='+ tpage +'">'+ tpage +'</a>';
					} else if(cpage == tpage) {
						str += '<a href="./news.html?p='+ (tpage-2) +'">'+ (tpage-2) +'</a>';
						str += '<a href="./news.html?p='+ (tpage-1) +'">'+ (tpage-1) +'</a>';
						str += '<a href="./news.html?p='+ tpage +'" class="active">'+ tpage +'</a>';
					}
				}
			}

			str += '<a href="./news.html?p='+ tpage +'" class="pagi-end">末页</a>';

			pagePagi.html(str);
		},
		getQueryString: function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
	};

	news.init();
});