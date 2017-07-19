
$(function() {

	var _win = $(window),
		_winH = _win.height();


	var hcf = {
		init: function() {
			hcf.bind();

			hcf.checkAni(0);
		},
		bind: function() {
			hcf.windowScrollBind();
		},
		windowScrollBind: function() {
			_win.on('scroll', function() {
				var _scrollH = _win.scrollTop();

				hcf.checkAni(_scrollH);

				if($('.c-intro-two').length > 0) {
					hcf.cBind(_scrollH);
				}

				if($('.join-intro-eight').length > 0) {
					hcf.joinBind(_scrollH);
				}
			});
		},
		checkAni: function(_scrollH) {
			var aniObj = $('[data-animation *= "active"]');

			aniObj.each(function() {
				var _this = $(this),
					aniClass = _this.attr('data-animation');
					_offsetTop = _this.offset().top;

				if(_this.hasClass(aniClass)) {
					return;
				} else {
					if(_winH + _scrollH > _offsetTop) {
						
						_this.addClass(aniClass);
					}
				}
			});
		},
		cBind: function(_scrollH) {
			var cObj = $('.c-intro-two ul'),
				_cOffsetTop = cObj.offset().top,
				cObjItem = cObj.find('li');

			if(cObj.hasClass('active')) {
				return;
			} else {
				if(_winH + _scrollH > _cOffsetTop) {
					cObj.addClass('active');

					var cXF = setTimeout(function() {
						for(var i = 0; i < cObjItem.length; i++) {
							var obj = cObjItem.eq(i).find('.icon').radialIndicator({
								radius: 34,
						        barWidth: 3,
						        barColor: '#e19c10',
						        initValue: 0,
						        minValue: 0,
						        maxValue: 360,
						        roundCorner: true,
						        percentage: false,
						        displayNumber: false
						    }).data('radialIndicator');

						    obj.animate(90 * (i + 1));
						}
					}, 500);
				}
			}
		},
		joinBind: function(_scrollH) {
			var lineObj = $('.join-intro-eight .time-line .line'),
				_lineOffsetTop = lineObj.offset().top,
				lineObjItem = lineObj.find('li');

			if(lineObj.hasClass('active')) {
				return;
			} else {
				if(_winH + _scrollH > _lineOffsetTop) {
					lineObj.addClass('active');
					lineObj.parent().find('.text').addClass('active');

					var lineXF = setTimeout(function() {
						for(var i = 0; i < lineObjItem.length; i++) {
							var obj = lineObjItem.eq(i).find('.icon').radialIndicator({
								radius: 36,
						        barWidth: 3,
						        barColor: '#e19c10',
						        barBgColor: 'rgba(255,255,255,.1)',
						        initValue: 0,
						        minValue: 0,
						        maxValue: 360,
						        roundCorner: true,
						        percentage: false,
						        displayNumber: false
						    }).data('radialIndicator');

						    obj.animate(60 * (i + 1));
						}
					}, 500);
				}
			}
		}
	};

	hcf.init();

});