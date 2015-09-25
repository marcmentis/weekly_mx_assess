$(function(){
if($('body.users').length) {

	//DECLARE VARIABLES
		// var ID = '';
		//   	function set_id(x){ID = x};

	//STYLING
		//wrappers etc.
		$('#divUserPageWrapper').addClass('pad_3_sides');
		// $('#divUserPageInnerWrapper').addClass('centered')
		// 							.css({'width':'75em'});
		$('#divUserPageInnerWrapper').addClass('centered')
									.css({'max-width': '993px'});

		// $('#divUserAsideRt').addClass('float_right form_container')
		// 					.css({'width':'250px'})
		// 					.hide();
		$('#divUserAsideRt').addClass('form_container')
							// .hide();

		$('#UserAsideRtErrors').addClass('error_explanation')
								.hide();
		$('#divUserRwrapper').addClass('pad_3_sides ')
							.css({'margin-top': '1em'})
							.hide();

		//forms
		$('#fUserSearch').addClass('form_container').css({'width':'692px'});
		// $('#fUserR').addClass('form_container')
		// 					.css({'width':'692px'});
		$('#fUserR').addClass('form_container')
					.css({'width': '70%'});

		//button
		$('[id^=b_]').button().addClass('reduce_button')
		// Can't use .hide() as wont work with IE 10
		$('#b_user_select').addClass('move_off_page')

		//dates
		// $('[id^=dt]').datepicker().css({'width':'7em'});

		//selects
		$('#slt_user_R_userRoles').attr({size: "13", multiple: "no"})
								.css({'width':'90%'})

		$('#slt_user_R_allRoles').attr({size: "18", multiple: "no"})
								.css({'width':'90%'})

		$('#slt_user_R_usersWithRoles').attr({size: "18", multiple: "no"})
								.css({'width':'90%'})
		
		//spans
		$('#s_user_R_titleName').css({'font-size': '12px'});


		//Filter when facility changed
		$('#slt_user_S_facility').change(function(){
			user_complex_search1();
		});

		//Get all users for selected role
		$('#slt_user_R_allRoles').change(function(){
			role_name = $('#slt_user_R_allRoles').val();
			url = '/roles_users/';
			type = 'GET'
			get_all_users(role_name, url, type);
		});

	//SELECTS
		if ($('#session-admin3').val() !== 'true'){
			$('#slt_user_S_facility, #slt_user_Rt_facility').attr("disabled", true)
		};
		$('#slt_User_roles').mjm_addOptions('Roles', {firstLine: 'add priv'});

		$('#slt_User_roles').change(function(){
			new_role_name = $('#slt_User_roles').val();
			if (new_role_name == '-1') {
				return true;
			};
			ID = $('#hd_User_userID').val();
			url = '/users_add_role/'+ID+'';
			type = 'POST'
			add_remove_role(new_role_name, ID, url, type);
		});
		

	// BUTTONS
		//Submit complex search on fPatientSearch using hidden submit button
		// $('#btnSubmit').click(function(e){
		$('#fUserSearch').submit(function(e){
			e.preventDefault();
			user_complex_search1();
		});

		//Submit New, Edit, from User Input Form
		$('#fUserAsideRt').submit(function(e){
			e.preventDefault();
			//Validate that form properly filled out
			validation_array = [
				['slt_user_Rt_facility','-1','Please choose Facility'],
				['ftx_user_Rt_firstname','','Please enter First Name'],
				['ftx_user_Rt_lastname','','Please enter Last Name'],
				['ftx_user_Rt_authen','','Please enter Authentication'],
				['ftx_user_Rt_email','','Please enter eMail'],
				['ftx_user_Rt_firstinitial','','Please enter First Initial']
			]

			//Loop through array and remove error messages if corrected       
	 			remove_error_divs_if_corrected(validation_array)
	 			//Loop through array and show error message if '', '-1' etc.
	 			exit = validate_elements(validation_array)
	 			if (exit) {return true};

	 			//Get value of submit button to determine which AJAX call to make
				submit_value = $(this).find('input[type=submit]').attr('value')
				switch(submit_value){
					case 'New':
						user_ajax1('/users', 'POST');
						break;
					case 'Edit':
						ID = $('#hd_User_userID').val();
						user_ajax1('/users/'+ID+'', 'PATCH');
						break;
					default:
						alert('submit_id not found');
						return false;
				};
		});

		$('#b_user_Rt_Back').click(function(){
			$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').hide();
			user_clearFields();
		});

		// $('#b_user_R_addRole').click(function(){
		// 	no_options_selected = $('#slt_user_R_allRoles :selected').length;
		// 	if (no_options_selected != 1) {
		// 		alert('Please select 1 role only from All Roles list')
		// 		return;
		// 	};
		// 	role_name_array = $('#slt_user_R_allRoles').val();
		// 	role_name = role_name_array[0];
		// 	ID = $('#hd_User_userID').val();
		// 	url = '/users_add_role/'+ID+'';
		// 	type = 'POST'
		// 	add_remove_role(role_name, ID, url, type);
		// });

		// $('#b_user_R_newRole').click(function(){
		// 	new_role_name = $('#txt_user_R_newRole').val();
		// 	if (new_role_name == '') {
		// 		alert('Please enter new role in Text box');
		// 		$('#txt_user_R_newRole').focus();
		// 		return true;
		// 	};
		// 	ID = $('#hd_User_userID').val();
		// 	url = '/users_add_role/'+ID+'';
		// 	type = 'POST'
		// 	add_remove_role(new_role_name, ID, url, type);
		// });

		$('#b_user_R_removeRole').click(function(){
			no_options_selected = $('#slt_user_R_userRoles :selected').length;
			if (no_options_selected != 1) {
				alert('Please select 1 role only from Users Roles list')
				return;
			};
			role_name_array = $('#slt_user_R_userRoles').val();
			role_name = role_name_array[0];
			ID = $('#hd_User_userID').val();
			url = '/users_remove_role/'+ID+'';
			type = 'DELETE'
			add_remove_role(role_name, ID, url, type);
		});


	// RUN ON OPENING
	if ($('#session-admin3').val() == 'true') {
		facility = '-1';
	} else { 
		facility = $('#session-facility').val();
	};
	//Make sure 'facility' select is populated before running 'complex_search1'
		$('#slt_user_S_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												$('#slt_user_S_facility').val(''+facility+'');
												user_complex_search1();
											}
										})
		$('#slt_user_Rt_facility').mjm_addOptions('facility',{
					firstLine: 'All Facilities',
					complete: function(){
						$('#slt_user_Rt_facility').val(facility);
					}
				});


};		//if($('#body.users').length) {
});		//$(function(){






	