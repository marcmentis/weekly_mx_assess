$(function(){
// $(document).on("ready page:change", function(){ on_opening
if ($('body.patients').length) {


	// STYLING
		//div
		$('#divPatientPageWrapper')
				.addClass('pad_3_sides')
		$('#divPatientPageInnerWrapper')
				.addClass('centered')
				.css({'max-width': '980px'});
		$('#divPatientAsideRt').addClass('form_container')
								.hide();

		$('#PatientAsideRtErrors').addClass('error_explanation')
									.hide();
		//form
		$('#fPatientSearch')
			.addClass('form_container')
			.css({'width': '700px'});

		// Can't use .hide() as wont work with IE 10
		$('#btnSubmit').addClass('move_off_page')
		$('.error_message').hide();


		//button
		//REMOVE id^=b
		$('[id^=b]').button().addClass('reduce_button')
		$('[id^=bt').button().addClass('reduce_button')


		//dates
		$('[id^=dt]')
			.datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				yearRange: "-10: +10" })
			.addClass('texts')
			.css({'width':'7em'});

		//text
		$('#Pat_ID').addClass('display_none')

	// SELECTS
		//selects
		if ($('#session-admin3').val() !== 'true') {
			$('#slt_S_facility, #slt_F_facility').attr("disabled", true);
		};


		// Show appropriate wards in
		$('#slt_S_facility').change(function(){
			var chosen_facility = $('#slt_S_facility').val();
			$('#slt_S_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: chosen_facility, group: true})
		});
		$('#slt_F_facility').change(function(){
			var chosen_facility = $('#slt_F_facility').val();
			$('#slt_F_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: chosen_facility, group: true})
		});

		// Filter when Facility changed
		$('#slt_S_facility').change(function(e){
			complex_search1();
		});

		//Filter when ward changed
		$('#slt_S_ward').change(function(e){
			complex_search1();
		});

		//Search Authoritative source if only number filled out
		$('#txt_Pat_number').change(function(){
			firstname = $('#txt_Pat_firstname').val();
			lastname = $('#txt_Pat_lastname').val();
			if (firstname == '' && lastname == '') {
				alert ('Will search Authoritative source and fill fields if found')
			};
		});



	// BUTTONS
		//Submit complex search on fPatientSearch using hidden submit button
			// $('#btnSubmit').click(function(e){
			$('#fPatientSearch').submit(function(e){
				e.preventDefault();
				complex_search1();
			});
			$('#bPatientBack').click(function(){
				$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').hide();
				clearFields();
			});

		//Submit New/Edit information from input form
			$('#fPatientAsideRt').submit(function(e){		
	 			e.preventDefault();
	 			//VALIDATE that form properly filled out
	 			validation_array = [
	 				['txt_Pat_firstname','','Please enter First Name'],
	 				['txt_Pat_lastname','','Please enter Last Name'],
	 				['txt_Pat_number','','Please enter Number'],
	 				['slt_F_facility','-1','Please choose Facility'],
	 				['slt_F_ward','-1','Please choose Ward'],
	 				['dt_Pat_DOA','','Please choose DOA']
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
						patients_ajax1('/patients/', 'POST');
						break;
					case 'Edit':
						ID = $('#Pat_ID').val();
						patients_ajax1('/patients/'+ID+'', 'PATCH');
						break;
					default:
						alert('submit_id not found');
						return false;
				};
	  			
	  		});

	
	// RUN ON OPENING
	if ($('#session-admin3').val() == 'true') {
		facility = '-1';
		//Make sure 'facility' and ward selects are populated before running 'complex_search1'
		$('#slt_S_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												pat_on_opening(facility);
											}
										})
		$('#slt_F_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												$('#slt_F_ward').mjm_addOptions('ward', {
													firstLine: 'All Wards', 
													facility: facility, 
													group: true
													});
											}
										})

		// $('#slt_S_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: '-1', group: true})
	} else { 
		facility = $('#session-facility').val();
		//Make sure 'facility' and 'ward' selects are populated before running 'complex_search1'
		$('#slt_S_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities',
											complete: function(){
												pat_on_opening(facility);
											}
										});
		$('#slt_F_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												$('slt_F_facility').val(''+facility+'');
												$('#slt_F_ward').mjm_addOptions('ward', {
													firstLine: 'All Wards', 
													facility: facility, 
													group: true,
													complete: function(){
														$('#slt_F_facility').val(facility)
													}
													});

											}
										})
		// $('#slt_S_ward, #slt_F_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: facility, group: true})
	};


};   //if ($('body.patients').length) {
});  // $(function(){
