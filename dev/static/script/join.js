
$(function() {

	var joinBox = $('.join-box'),
		joinForm = joinBox.find('.join-form'),
		joinSucc = joinBox.find('.join-succ'),
		btnSubmit = joinForm.find('.btn-submit'),
		btnSubmitText = btnSubmit.find('p'),
		submitFlag = true;

	var inputCompany = joinForm.find('.input-company'),
		inputArea = joinForm.find('.input-area'),
		inputName = joinForm.find('.input-name'),
		inputMobile = joinForm.find('.input-mobile'),
		inputEmail = joinForm.find('.input-email');

	var inputModel = joinForm.find('.input-model'),
		inputNeed = joinForm.find('.input-need'),
		inputJob = joinForm.find('.input-job');


	var join = {
		init: function() {
			join.bind();
		},
		bind: function() {
			join.formBtnSubmitBind();

			join.modelSelectBind();
		},
		formBtnSubmitBind: function() {

			btnSubmit.on('click', function() {
				if(!submitFlag) {
					return false;
				}

				var valCompany = inputCompany.val(),
					valArea = inputArea.val(),
					valName = inputName.val(),
					valMobile = inputMobile.val(),
					valEmail = inputEmail.val(),
					valModel = inputModel.val(),
					valNeed = inputNeed.val(),
					valJob = inputJob.val();

				if(!join.checkNull(valCompany)) {
					join.showTips(inputCompany);
				} else {
					join.hideTips(inputCompany);
				}

				if(!join.checkNull(valArea)) {
					join.showTips(inputArea);
				} else {
					join.hideTips(inputArea);
				}

				if(!join.checkNull(valName)) {
					join.showTips(inputName);
				} else {
					join.hideTips(inputName);
				}

				if(!join.checkNull(valMobile)) {
					join.showTips(inputMobile);
				} else {
					join.hideTips(inputMobile);
				}

				if(!join.checkNull(valEmail)) {
					join.showTips(inputEmail);
				} else {
					join.hideTips(inputEmail);
				}

				if(joinForm.find('.err-tips.active').length > 0) {
					return false;
				}

				submitFlag = false;
				btnSubmit.addClass('active');
				btnSubmitText.html('正在提交...');

				$.ajax({
			        type: "post",
			        url: mDomain + '/pcWeb/addJoinApply.shtml',
			        data: {
			            companyName: valCompany,
			            contactName: valName,
			            job: valJob,
			            mobile: valMobile,
			            email: valEmail,
			            companyDemand: valNeed,
			            companyAddress: valArea,
			            companyType: valModel
			        },
			        dataType: "jsonp",
			        jsonp: "callback",
			        success: function(data) {
		            	submitFlag = true;
			        	btnSubmit.removeClass('active');
			        	btnSubmitText.html('提交信息');

			            if(data.success) {
			            	joinForm.fadeOut(500);
			            	joinSucc.fadeIn(500);
			            } else {
				        	alert(data.msg + '，请稍后再试!');
			            }
			        },
			        error: function(a) {
			        	submitFlag = true;
			        	btnSubmit.removeClass('active');
			        	btnSubmitText.html('提交信息');
			        	alert('提交失败，请稍后再试！');
			        }
			    });
			});
		},
		showTips: function(obj) {
			obj.parent().parent().find('.err-tips').addClass('active');
		},
		hideTips: function(obj) {
			obj.parent().parent().find('.err-tips').removeClass('active');
		},
		modelSelectBind: function() {
			var selectModel = joinForm.find('.select-modal'),
				selectModelItem = selectModel.find('ul li');

			selectModelItem.on('click', function() {
				var _this = $(this),
					_val = _this.html(),
					_inputVal = inputModel.val();

				if(_val == _inputVal) {
					return false;
				}

				if(_val == '请选择公司类型') {
					inputModel.val('');
				} else {
					inputModel.val(_val);
				}

			});
		},
		checkNull: function(value){
			value = value.trim();

			if(value == '' || value == undefined || value == null){
				return false;
			}else{
				return true;
			}
		}
	};

	join.init();
});