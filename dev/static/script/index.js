$(function() {
	var index = {
		init: function() {
			index.bind();

			index.getNews();
		},
		bind: function() {
			index.bannerBind();
		},
		bannerBind: function() {
			var indexBanner = $('.index-banner'),
				indexSwiper = indexBanner.find('.swiper-wrapper'),
				indexSwiperSlide = indexSwiper.find('.swiper-slide'),
				slideLen = indexSwiperSlide.length,
				indexArrow = indexBanner.find('.arrow-bar'),
				indexArrowLeft = indexArrow.find('.arrow-left'),
				indexArrowRight = indexArrow.find('.arrow-right'),
				indexPagi = indexBanner.find('.pagination'),
				indexPagiLi = indexPagi.find('ul li');

			indexSwiperSlide.eq(0).addClass('active');
			indexPagiLi.eq(0).addClass('active');
			indexArrow.addClass('active');

			indexArrowRight.on('click', function() {
				var indexSwiperSlideActive = indexSwiper.find('.swiper-slide.active'),
					activeOrder = indexSwiperSlideActive.index(),
					orderNext;

				if(activeOrder == slideLen - 1) {
					orderNext = 0;
				} else {
					orderNext = activeOrder + 1;
				}

				indexSwiperSlide.eq(activeOrder).removeClass('active');
				indexSwiperSlide.eq(orderNext).addClass('active');
				indexPagiLi.eq(activeOrder).removeClass('active');
				indexPagiLi.eq(orderNext).addClass('active');
			});

			indexArrowLeft.on('click', function() {
				var indexSwiperSlideActive = indexSwiper.find('.swiper-slide.active'),
					activeOrder = indexSwiperSlideActive.index(),
					orderBefore;

				if(activeOrder == 0) {
					orderBefore = slideLen - 1;
				} else {
					orderBefore = activeOrder - 1;
				}

				indexSwiperSlide.eq(activeOrder).removeClass('active');
				indexSwiperSlide.eq(orderBefore).addClass('active');
				indexPagiLi.eq(activeOrder).removeClass('active');
				indexPagiLi.eq(orderBefore).addClass('active');
			});
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

					$('.index-news ul').html(str);
		        },
		        error: function(a) {
		        	$('.index-news').hide();
		        }
		    });
		}
	};

	index.init();
});