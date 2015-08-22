$(function(){
if ($('body.mx_assessments').length) {
	//VARIABLES
		var user_facility = $('#session-facility').val();
		var user_id = $('#session-authen').val();
		var user_name = $('#session-username').val();
		var pat_id = '';
			function set_pat_id(x){pat_id = x};
		var meeting_date = '';
			function set_meeting_date(x){
				meeting_date = moment(x, "YYYY-MM_DD");  // Create a date object
			};
		// var mx_assessment_id = -1;
		// 	function set_mx_assessment_id(x) {mx_assessment_id = x};


		//textareas
		var width1 = '33em'
		var heightS1 = '90';
		var heightL1 = '180';
		var heightEL1 = '360';

	// STYLING
		//divs
		$('#divMxAssessPageWrapper')
			.addClass('pad_3_sides');
		$('#divMxAssessPageInnerWrapper')
			.addClass('centered')
			.css({'max-width': '1300px'})
		$('#divTitle')
			.css({'text-align': 'center',
					'color': '#2e6e9e',
					'font-size': '17px',
					'font-weight': 'bold',
					'text-align': 'center',
					'margin': '0 0 7px 0'});
		$('#grid_MxA_RightContainer, #div_MxA_save_message')
			.hide();
		//REMOVE
		// $('[id^=divDanger]')
		// 	.hide();
		// $('[id^=div_MxA_danger')
		// 	.hide();
		 
			
		//dates
		$('[id^=dt], [id^=date]')
			.datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				yearRange: "-10: +10" })
			.addClass('texts')
			.css({'width':'7em'});


		//selects
		$('#slt_MxA_to_do, #slt_MxA_done')
			.attr({'size': '15',
				'multiple': 'no'})
			.css({'width': '100%'});
		$('#slt_Mxa_drugsChanged, #slt_Mxa_groupChanged')
			.css({'width': '125px'})
		//buttons
		$('[id^=bt]')
			.button()
			.addClass('reduce_button');
		//textareas
		$('[id^=txa]')
			.addClass('text-content left')
			.width('92%')
			.height(heightS1);
			// .css({'white-space': 'pre'});
		$('#txa_MxA_pastAssessments')
			.width('92%') //?? actually recorded as 98%
			.height(heightS1)

		//REMOVE
		// $('[id^=textArea')
		// 	.addClass('text-content left')
		// 	.width('92%')
		// 	.height(heightS1);
		
	//SELECT HANDLERS
		//populate selects
		$('#slt_Mxa_drugsChanged').mjm_addOptions('DrugsChanged',{firstLine: 'Drugs Changed'});	
		$('#slt_Mxa_groupChanged').mjm_addOptions('GroupsChanged',{firstLine: 'Group Changed'});
		$('#slt_MxA_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: user_facility, group: true})
		$('#slt_MxA_danger_yn, #slt_MxA_pre_date_yesno').mjm_addOptions('YesNo',{firstLine: 'Choose Y/N'});

		//Populate TODO and DONE lists
		$('#slt_MxA_ward, #dt_MxA_newDate, #slt_MxA_date_history')
			.change(function(e){
			var id = $(this).attr('id');
			var ward = $('#slt_MxA_ward').val();
			var date = $('#dt_MxA_newDate').val();
			//Setup and Validation
			//When Ward Changed: 
			if (id == 'slt_MxA_ward') {
				// swal(ward)
				popSelectDateHistory();
				$('#dt_MxA_newDate').val('');
				clear_todo_done_selects();
				clear_all_but_todo_done_lists();
			};

			//When newDate is changed: 
			if (id == 'dt_MxA_newDate') {
				//Check ward has been selected
				if ($('#slt_MxA_ward').val() == '-1') {
					swal('Please choose a ward before selecting a date');
					$('#dt_MxA_newDate').val('');				
					return true;
				};
				//Clear date_history
				$('#slt_MxA_date_history').val('');
				//Set meeting_date to new date value
				set_meeting_date($(this).val());
				//Clear todo, done lists and form data
				clear_todo_done_selects();
				clear_all_but_todo_done_lists();				
			};

			//When DateHistory is changed: (i) set new Date ='', (ii)set meeting_date, (iii) clear all but todo lists
			if (id == 'slt_MxA_date_history') {
				$('#dt_MxA_newDate'). val('');
				set_meeting_date($(this).val());
				clear_all_but_todo_done_lists();
			};

			//Populate lists
			popPatientLists();
			//Hide Right container
			$('#grid_MxA_RightContainer').hide();
		});

		//Choose Patient From ToDo or Done lists (Show Form, get pat data, fill past Mx assessments & forms appropriately)
		$('#slt_MxA_to_do, #slt_MxA_done').change(function(){
			var new_pat_id = $(this).val();
			var element_id = $(this).attr('id');

			set_pat_id(new_pat_id);
			//Get Patient data and display new form and past assessments
			get_pat_data(new_pat_id, element_id, meeting_date);
					
		});

		//Expose appropriate divs when danger_yn changed
		$('#slt_MxA_danger_yn').change(function(){
			value = $(this).val();
			$('.error_message').hide();
			if (value == -1) {
				hide_form_divs();
				$('#div_MxA_patient_identification, #div_MxA_dangerQuestion').show();
			}else if (value == 'Y') {
				$('[id^=div_MxA_dangerNo]')
					.hide();
				$('#div_MxA_dangerYes_drug, #div_MxA_dangerYes_group')
					.show();
				$('#div_MxA_dangerYes_drugNo, #div_MxA_dangerYes_groupNo, #div_MxA_dangerYes_drugYes, #div_MxA_dangerYes_groupYes')
					.hide();
			}else if (value == 'N') {
				$('#div_MxA_dangerNo_date').show();
				$('[id^=div_MxA_dangerYes]').hide();
				$('#slt_Mxa_drugsChanged, #slt_Mxa_groupChanged, #slt_MxA_pre_date_yesno').val(-1);
				$('#txa_MxA_drugNoChange, #txa_MxA_drugWhyChange, #txa_MxA_groupNoChange ').val('');
			};
		});

		//Expose appropriate questions for drug changes
		$('#slt_Mxa_drugsChanged').change(function(){
			value = $(this).val();
			$('.error_message').hide();
			// swal(value)
			if(value == -1){
				$('#div_MxA_dangerYes_drugNo, #div_MxA_dangerYes_drugYes').hide();
				$('#txa_MxA_drugNoChange, #txa_MxA_drugWhyChange').val('');
				return true;
			};
			if(value == '0-8Weeks'){
				$('#div_MxA_dangerYes_drugYes').show();
                $('#div_MxA_dangerYes_drugNo').hide();
				$('#txa_MxA_drugNoChange').val('');
				return true;
			};
			if(value == 'Gt8Weeks'){
				$('#div_MxA_dangerYes_drugNo').show();
				$('#div_MxA_dangerYes_drugYes').hide();
				$('#txa_MxA_drugWhyChange').val('');
				return true;
			}
		});	

		//Expose appropriate questions for group changes
		$('#slt_Mxa_groupChanged').change(function(){
			value = $(this).val();
			$('.error_message').hide();
			// swal(value);
			if (value == -1) {
				$('#div_MxA_dangerYes_groupYes, #div_MxA_dangerYes_groupNo').hide();
				$ ('#txa_MxA_groupNoChange, txa_MxA_groupWhyChange').val('');
				return true;
			};
			if (value == '0-3Months') {
				$('#div_MxA_dangerYes_groupNo').hide();
				$('#div_MxA_dangerYes_groupYes').show();
				$ ('#txa_MxA_groupWhyChange').val('');
			};
			if (value == 'Gt3Months') {
				$('#div_MxA_dangerYes_groupYes').hide();
				$('#div_MxA_dangerYes_groupNo').show();
				$ ('#txa_MxA_groupNoChange').val('');
			};
		})

		//Expose appropriate divs when pre_date_yesno changed
		$('#slt_MxA_pre_date_yesno').change(function(){
			value = $(this).val();
			$('.error_message').hide();
			if (value == -1) {
				$('#div_MxA_dangerNo_dateNo, #div_MxA_dangerNo_dateYes').hide();
				$('#dt_MxA_preMeeting, #txa_MxA_PreDateNo').val('');
			}else if (value == 'Y') {
				$('#div_MxA_dangerNo_dateNo').hide();
				$('#div_MxA_dangerNo_dateYes').show();
				$('#dt_MxA_preMeeting').val('');
			}else if (value == 'N') {
				$('#div_MxA_dangerNo_dateYes').hide();
				$('#div_MxA_dangerNo_dateNo').show();
				$('#txa_MxA_PreDateNo').val('');
			};
		});

	//RADIO HANDLERS
	
	//BUTTON HANDLERS
		$('#bt_MxA_save, #bt_MxA_update').click(function(e){
			var element_id = $(this).attr('id');
			var mx_assessment_id = $('#hide_mx_assessment_id').val();

			//VALIDATE THAT FORM PROPERLY FILLED OUT
				//Question Is patient danger answered yes or no
				if ($('#slt_MxA_danger_yn').val()== '-1') {
					// alert('Please answer question: \n"Is patient a danger to self/other..."');
					// $('#slt_MxA_danger_yn').focus();

					$('#div_MxA_dangerQuestion')
						.after('<div class="error_message">Please answer question: "Is patient a danger to self/other...</div>');
					$('#slt_MxA_danger_yn').focus();
					return true;
				};

				//Danger Yes
					//Danger yes and drugs changed not chosen
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_drugsChanged').val() == '-1') {	
						// alert('Please answer question: \n "When was medication ... last changed');
						$('#div_MxA_dangerYes_drug')
							.after('<div class="error_message">Please answer question: "When was medication ... last changed</div>');
						$('#slt_Mxa_drugsChanged').focus();
						return true;
					};

					//Danger yes, Drugs changed 0-8Weeks but reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_drugsChanged').val() == '0-8Weeks'
							&& $('#txa_MxA_drugWhyChange').val() == '') {	
						// alert('Please give reason why drugs were changed');
						$('#txa_MxA_drugWhyChange')
							.after('<div class="error_message">Please give reason why drugs were changed</div>');
						$('#txa_MxA_drugWhyChange').focus();
						return true;
					};

					//Danger yes, Drugs changed Gt8Weeks but reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_drugsChanged').val() == 'Gt8Weeks'
							&& $('#txa_MxA_drugNoChange').val() == '') {	
						// alert('Please give reason why drugs were NOT changed');
						$('#txa_MxA_drugNoChange')
							.after('<div class="error_message">Please give reason why drugs were NOT changed</div>');
						$('#txa_MxA_drugNoChange').focus();
						return true;
					};

					//Danger yes and group/indiv not chosen
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_groupChanged').val() == '-1') {
						// alert('Please answer question: \n "When was group/indiv ... last changed');
						$('#slt_Mxa_groupChanged')
							.after('<div class="error_message">Please answer question: "When was group/indiv ... last changed</div>');
						$('#slt_Mxa_groupChanged').focus();
						return true;
					};

					//Danger yes and group/indiv changed 0-3 months reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_groupChanged').val() == '0-3Months'
							&& $('#txa_MxA_groupWhyChange').val() == '') {
						// alert('Please give reason group/indiv therapy WAS changed');
						$('#txa_MxA_groupWhyChange')
							.after('<div class="error_message">Please give reason group/indiv therapy WAS changed</div>');
						$('#txa_MxA_groupWhyChange').focus();
						return true;
					};

					//Danger yes and group/indiv changed Gt3Months reason not given
					if ($('#slt_MxA_danger_yn').val() == 'Y' 
							&& $('#slt_Mxa_groupChanged').val() == 'Gt3Months'
							&& $('#txa_MxA_groupNoChange').val() == '') {
						// alert('Please give reason group/indiv therapy was NOT changed');
						$('#txa_MxA_groupNoChange')
							.after('<div class="error_message">Please give reason group/indiv therapy was NOT changed</div>');
						$('#txa_MxA_groupNoChange').focus();
						return true;
					};

				//Danger No
					//Danger No and pre-date not chosen
					if ($('#slt_MxA_danger_yn').val() == 'N' 
							&& $('#slt_MxA_pre_date_yesno').val() == '-1') {	
						// alert('Please answer question: \n "Has date been set for Pre-Conference Meeting');
						$('#slt_MxA_pre_date_yesno')
							.after('<div class="error_message">Please answer question: "Has date been set for Pre-Conference Meeting</div>');
						$('#slt_MxA_pre_date_yesno').focus();
						return true;
					};

					//Danger No, pre-date Yes and date not given
					if ($('#slt_MxA_danger_yn').val() == 'N' 
							&& $('#slt_MxA_pre_date_yesno').val() == 'Y'
							&& $('#dt_MxA_preMeeting').val()== '') {	
						// alert('Please enter Date for pre-conference meeting');
						$('#dt_MxA_preMeeting')
							.after('<div class="error_message">Please enter Date for pre-conference meeting</div>');
						$('#dt_MxA_preMeeting').focus();
						return true;
					};
					//Danger No, pre-date No and reason not given
					if ($('#slt_MxA_danger_yn').val() == 'N' 
							&& $('#slt_MxA_pre_date_yesno').val() == 'N'
							&& $('#txa_MxA_PreDateNo').val()== '') {	
						// alert('Please give reason why date for Pre meeting not set');
						$('#txa_MxA_PreDateNo')
								.after('<div class="error_message">Please give reason why date for Pre meeting not set</div>');
						$('#txa_MxA_PreDateNo').focus();
						return true;
					};

			// Create strong parameter for all data in form
			var data_for_params = create_strong_parameter_for_form(pat_id, meeting_date, user_name);

			//Pass strong parameter to save or update
			if (element_id == 'bt_MxA_save') {
				var url = '/mx_assessments/';
				var type = 'POST';				
			} else if (element_id == 'bt_MxA_update') {
				var url = '/mx_assessments/'+mx_assessment_id+'';
				var type = 'PATCH';
			};
			// alert('url: '+url+'');
			// alert('type: '+type+'');
			// alert('data_for_params: '+data_for_params+'');
			create_update_mx_assessment (url, type, data_for_params)
		});

		$('#bt_MxA_back').click(function(){
			clear_all_but_todo_done_lists();
			hide_form_divs();
			$('#grid_MxA_RightContainer, #div_MxA_save_message')
				.hide();
		});

		$('#bt_MxA_delete').click(function(){
			var r = confirm("Are you sure?");
			if (r == true) {
				mx_assessment_id = $('#hide_mx_assessment_id').val();
				delete_form(mx_assessment_id); 
			}else {
				return true;
			};
		});

		//Toggle handlers
		$('#bt_MxA_TogNotes').click(function(){
			element = $('#txa_MxA_pastAssessments');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togDrugWhyChange').click(function(){
			element = $('#txa_MxA_drugWhyChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togDrugNoChange').click(function(){
			element = $('#txa_MxA_drugNoChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togGroupChange').click(function(){
			element = $('#txa_MxA_groupWhyChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togGroupNoChange').click(function(){
			element = $('#txa_MxA_groupNoChange');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxA_togPreDateNo').click(function(){
			element = $('#txa_MxA_PreDateNo');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});

	//TEXTAREA HANDLERS
		// $('txa_MxA_drugWhyChange, #txa_MxA_drugNoChange, #txa_MxA_groupWhyChange, #txa_MxA_groupNoChange, txa_MxA_PreDateNo')
		// .change(function(){
		// 	$('.error_message').hide();
		// });

	//DATE HANDLERS
		$('#dt_MxA_preMeeting').change(function(){
			$('.error_message').hide();
		});
	


};	//if ($('body.mx_assessments').length) {
});  //$(function(){