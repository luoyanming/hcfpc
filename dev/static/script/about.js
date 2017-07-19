$(function() {
	var about = {
		init: function() {
			about.getNews();
		},
		getNews: function() {
			$.ajax({
		        type: "get",
		        url: mDomain + '/pcWeb/getMediaReportList.shtml',
		        data: {
		            pageNo: 1,
		            pageSize: 3
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

					$('.index-news ul').html(str).addClass('active');
		        },
		        error: function(a) {
		        	$('.index-news').hide();
		        }
		    });
		}
	};

	about.init();
});