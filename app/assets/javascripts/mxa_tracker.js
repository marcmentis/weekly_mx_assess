$(function(){
if ($('body.mxa_tracker').length) {
	//VARIABLES
		var user_facility = $('#session-facility').val();
		var user_id = $('#session-authen').val();
		var user_name = $('#session-username').val();
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
		// $('#div_MxAW_uppercontainer')
		// 	.css({'background-color': 'red'});

		//selects
		$('[id^=slt_]')
			.css({'width': '125px'})

		//forms
		$('#fMxAWsearch').addClass('form_container')
						.css({'width':'60%'});

		//buttons
			$('[id^=bt_]').button().addClass('reduce_button')
			// Can't use .hide() as wont work with IE 10
			$('#bt_MxAW_search_select').addClass('move_off_page')

	//SELECT HANDLERS
	//populate selects
		$('#slt_MxAW_Ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: user_facility, group: true})
		$('#slt_MxAW_danger_yn').mjm_addOptions('YesNo',{firstLine: 'Dangerous?'});
		$('#slt_MxAW_preDateYesNo').mjm_addOptions('YesNo',{firstLine: 'PreDate?'});
		$('#slt_MxAW_drugsChanged').mjm_addOptions('DrugsChanged',{firstLine: 'Drugs Changed'});	
		$('#slt_MxAW_groupChanged').mjm_addOptions('GroupsChanged',{firstLine: 'Group Changed'});
		

	//DATE HANDLERS
		$('[id^=dt]')
			.datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				yearRange: "-10: +10" })
			.addClass('texts')
			.css({'width':'7em'});

	//BUTTON HANLERS
		$('#fMxAWsearch').submit(function(e){		
			e.preventDefault();
			alert(user_facility)
			MxAw_complex_search1(user_facility);
			alert('two')
		});

	//RADIO HANLDERS

	//TEXTAREA HANDLERS

	//Run on open
	MxAW_refreshgrid('nil')
};  // if ($('body.widgets').length) {
}); // $(function(){
