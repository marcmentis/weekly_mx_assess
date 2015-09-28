$(function(){
if ($('body.mxa_tracker').length) {
	//VARIABLES
		var user_facility = $('#session-facility').val();
		var user_id = $('#session-authen').val();
		var user_name = $('#session-username').val();

		//textareas
		var heightS1 = '90';
		var heightL1 = '180';
		var heightEL1 = '360';

	//STYLING
		//divs
		$('#divMxAWPageWrapper')
			.addClass('pad_3_sides');
		$('#divMxAWPageInnerWrapper')
			.addClass('centered')
			.css({'max-width': '1300px'})
		$('#div_MxAWTitle')
			.css({'text-align': 'center',
					'color': '#2e6e9e',
					'font-size': '17px',
					'font-weight': 'bold',
					'margin': '0 0 7px 0'});
		$('#divForCSV, #divForPastMxPDF')
			.css({'display': 'inline-block'})
		// $('#div_MxAW_uppercontainer')
		// 	.css({'background-color': 'red'});

		//selects
		$('[id^=slt_]')
			.css({'width': '125px'})

		//forms
		$('#fMxAWsearch').addClass('form_container')
						.css({'width':'60%'});
		$('#fMxAW_pat_info').addClass('form_container')
						.css({'width': '70%'});

		//texts
		$('#txt_MxAW_PatientID').addClass('hidden');

		//textareas
		$('[id^=txa]')
			.addClass('text-content left')
			.width('92%')
			.height(heightS1);

		//buttons
			$('[id^=bt_]').button().addClass('reduce_button')
			// Can't use .hide() as wont work with IE 10
			$('#bt_MxAW_search_select').addClass('move_off_page')

	//SELECT HANDLERS
	//populate selects
		$('#slt_MxAW_Ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: user_facility, group: true})
		$('#slt_MxAW_AllLatestNote').mjm_addOptions('AllLatest', {firstLine: 'All/LatestNote'})
		$('#slt_MxAW_danger_yn').mjm_addOptions('YesNo',{firstLine: 'Dangerous'});
		$('#slt_MxAW_preDateYesNo').mjm_addOptions('YesNo',{firstLine: 'PreDate Set'});
		$('#slt_MxAW_drugsChanged').mjm_addOptions('DrugsChanged',{firstLine: 'Drugs Changed'});	
		$('#slt_MxAW_groupChanged').mjm_addOptions('GroupsChanged',{firstLine: 'Group Changed'});
		$('#slt_MxAWinfo_ChooseInfo').mjm_addOptions('MxTracker', {firstLine: 'Choose Info'})
	
	//SELECT HANDLERS
		//Populate Patient select when ward is selected
		$('#slt_MxAW_Ward').change(function(){
			var site = $('#slt_MxAW_Ward').val();

			//Get Pat C# and name and populate ward select
			get_site_patients_pop_pat_select(site)
		});	

		//Run complex search when select changes
		// $('#slt_MxAW_danger_yn, #slt_MxAW_drugsChanged')
		$('[id^=slt_MxAW_]').change(function(){
			MxAw_complex_search1(user_facility)
		});

		//Extract specific info from within notes
		$('#slt_MxAWinfo_ChooseInfo').change(function(){
			//Check that patient_id exists i.e., patient chosen
			//Check that select value not -1 - abort if it is

			patient_id = $('#txt_MxAW_PatientID').val();
			reason = $('#slt_MxAWinfo_ChooseInfo').val();

			get_reasons_from_note(patient_id, reason)

		});

	//DATE HANDLERS
		$('[id^=dt]')
			.datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				yearRange: "-10: +10" })
			.addClass('texts')
			.css({'width':'7em'});
		$('[id^=dt]').change(function(){
			MxAw_complex_search1(user_facility);
		});

	//BUTTON HANLERS
		$('#fMxAWsearch').submit(function(e){		
			e.preventDefault();
			MxAw_complex_search1(user_facility);
		});

		//Toggle handlers
		$('#bt_MxAW_TogNotes').click(function(){
			element = $('#txa_MxAW_pastAssessments');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});
		$('#bt_MxAW_TogChoseInfo').click(function(){
			element = $('#txa_MxAW_specificAssessments');
			tripleToggle(element, heightS1, heightL1, heightEL1)
		});

	//RADIO HANLDERS

	//TEXTAREA HANDLERS

	//Run on open
	MxAW_refreshgrid('nil')
	//Populate Patient select on first opening with one line
	populate_site_select_on_page_open ('slt_MxAW_Patient') 
			
};  // if ($('body.widgets').length) {
}); // $(function(){
