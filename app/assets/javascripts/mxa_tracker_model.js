//"Model" for mxa_tracker.js

function MxAw_complex_search1 (user_facility) {
 
 	var aln = $('#slt_MxAW_AllLatestNote').val();
 	var dma = $('#dt_MxAW_meetingAfter').val();
 	var dmb = $('#dt_MxAW_meetingBefore').val();
 	var dda = $('#dt_MxAW_doaAfter').val();
 	var ddb = $('#dt_MxAW_doaBefore').val();
 	var dpa = $('#dt_MxAW_preAfter').val();
 	var dpb = $('#dt_MxAW_preBefore').val();
 	var pid = $('#slt_MxAW_Patient').val();

	var params_string = $('#fMxAWsearch').serialize();
	//Add user_facility to params_string
	params_string = 'facility='+user_facility+'&allLatestNote='+aln+'&dma='+dma+'&dmb='+dmb+'&dda='+dda+'&ddb='+ddb+'&dpa='+dpa+'&dpb='+dpb+'&pid='+pid+'&'+params_string+'' 

	url = '/mxa_tracker_search?'+params_string+''
	MxAW_refreshgrid(url);
}

function MxAw_complex_search_all() {
 	var user_facility = $('#session-facility').val();

 	var aln = $('#slt_MxAW_AllLatestNote').val();
 	var dma = $('#dt_MxAW_meetingAfter').val();
 	var dmb = $('#dt_MxAW_meetingBefore').val();
 	var dda = $('#dt_MxAW_doaAfter').val();
 	var ddb = $('#dt_MxAW_doaBefore').val();
 	var dpa = $('#dt_MxAW_preAfter').val();
 	var dpb = $('#dt_MxAW_preBefore').val();
 	var pid = $('#slt_MxAW_Patient').val();

	var params_string = $('#fMxAWsearch').serialize();
	//Add user_facility to params_string
	params_string = 'facility='+user_facility+'&allLatestNote='+aln+'&dma='+dma+'&dmb='+dmb+'&dda='+dda+'&ddb='+ddb+'&dpa='+dpa+'&dpb='+dpb+'&pid='+pid+'&'+params_string+'' 

	url = '/mxa_tracker_search_all.csv?'+params_string+''
	html = '<a href="'+url+'">CSV</a>'
	url2 = '/mxa_tracker_search_all.pdf?'+params_string+''
	html2 = '<a href="'+url2+'">PDF</a>'
	$('#divForCSV').html(''+html+' '+html2+'')
}

function MxAW_refreshgrid(url){

	if (url == 'nil') {url = '/mxa_tracker_search/'};
	
	//Create Table and Div for grid and navigation "pager" 
 	// $("#divUserGrid").remove();         
	$('#div_MxAGrid').html('<table id="divTable" style="background-color:#E0E0E0"></table><div id="divPager"></div>');
	//Define grid

	$("#divTable").jqGrid({
		url: url,
		datatype:"json",
		mtype:"GET",
		colNames:["id","Pat_id","FirstName","LastName","C#","Ward","DOA", "Meeting", "Danger", "Drugs", "PsySoc", "Pre", "PreDate"],
		colModel:[
			{name:"id",index:"id",width:55, hidden: true},
			{name: "patient_id",index: "patient_id", width: 55, hidden: true},
			{name:"firstname",index:"firstname",width:125,align:"center"},
			{name:"lastname",index:"lastname",width:125,align:"center"},
			{name:"identifier",index:"identifier",width:100,align:"center"},
			{name:"site",index:"site",width:100,align:"center"},
			{name:"doa",index:"doa",width:120,align:"center", formatter: "date", formatoptions:{newformat: "Y-m-d"}},
			{name:"meeting_date",index:"meeting_date",width:120,align:"center", formatter: "date", formatoptions:{newformat: "Y-m-d"}},
			{name:"danger_yn",index:"danger_yn",width:50,align:"center"},
			{name:"drugs_last_changed",index:"drugs_last_changed",width:100,align:"center"},
			{name:"psychsoc_last_changed",index:"psychsoc_last_changed",width:100,align:"center"},
			{name:"pre_date_yesno",index:"pre_date_yesno",width:50,align:"center"},
			{name:"pre_date",index:"pre_date",width:120,align:"center", formatter: "date", formatoptions:{newformat: "Y-m-d"}}
		],
		editurl:"mxa_tracker_search",
		pager:"#divPager",
		height:390,
		width: 900,
		altRows: true,
		rowNum:15,
		rowList:[15,25,40],
		sortname:"lastname",
		sortorder:"asc",
		viewrecords:true,
		gridview: true, //increased speed can't use treeGrid, subGrid, afterInsertRow
		// loadonce: true,  //grid load data only once. datatype set to 'local'. Futher manip on client. 'Pager' functions disabled
		caption:"BPS Assessments ",

	        loadComplete: function(){
	        	MxAw_complex_search_all();
	        },

			onSelectRow:function(id) { 
				var ret = $("#divTable").jqGrid('getRowData', id);
				//Enter PatientID into hidden text
				$('#txt_MxAW_PatientID').val(ret.patient_id);
				var url = '/mxa_pat_data/';
				var data_for_params = {mx_assessment: {patient_id: ret.patient_id}}
				var pdf_url = '/mxa_pat_data.pdf?mx_assessment[patient_id]='+ret.patient_id+''
				var pdf_html = '<a href="'+pdf_url+'">PDF</a>'

				$.ajax({ 
						  url: url,
						  data: data_for_params,
						  type: 'GET',
						  cache: false,
						  dataType: 'json'
					}).done(function(data){
		
						//Clear the two textareas
						$('[id^=txa_MxAW]').val('');
						//populate past Mx Assessment
						var pat_demog = data.pat_demog;
						var pat_assessments = data.pat_assessments;
						//Pat_demog data				
						var lastname = pat_demog.lastname;
						var firstname = pat_demog.firstname;
						var doa = moment(pat_demog.doa,"YYYY-MM-DD").format('YYYY-MM-DD');
						var name = ''+lastname+' '+firstname+''

						//Identify the patient
						var text = '';
						text += '\nNAME: '+name+'    DOA:  '+doa+''
						// Create the past_mx_text
						
						for (var i=0; i < pat_assessments.length; i++) {
							var data_meeting_date = moment(pat_assessments[i].meeting_date, "YYYY-MM-DD")
							var data_meeting_date_formatted = data_meeting_date.format('YYYY-MM-DD')
							var updated_at = moment(pat_assessments[i].updated_at, "YYYY-MM-DD").format('YYYY-MM-DD');
							var updated_by	= pat_assessments[i].updated_by
							//NOTE: calculate Days in hosp to meeting date - WILL REPLACE
								//WHEN ADD COLUMN "DAYS IN HOSPITAL" to database
							var diff = moment.duration(data_meeting_date.diff(doa));
							var days_in_hosp = Math.floor(diff.asDays());

							var dangerYesNo = pat_assessments[i].danger_yn
							var drugs_last_changed = pat_assessments[i].drugs_last_changed
							var drugs_not_why = pat_assessments[i].drugs_not_why
							var drugs_change_why = pat_assessments[i].drugs_change_why
							var psychsoc_last_changed = pat_assessments[i].psychsoc_last_changed
							var psychsoc_not_why = pat_assessments[i].psychsoc_not_why
							var psychsoc_change_why = pat_assessments[i].psychsoc_change_why
							var pre_date_yesno = pat_assessments[i].pre_date_yesno
							var pre_date_no_why = pat_assessments[i].pre_date_no_why
							var pre_date = moment(pat_assessments[i].pre_date, "YYYY-MM-DD").format('YYYY-MM-DD')

							

							//Create and populate past Mx Assessments
							text += '\n\n________________________________________________'
							text += '\nMEETING DATE:  '+data_meeting_date_formatted+'     DAYS In HOSP: '+days_in_hosp+''
							text += '\nSAVED BY:  '+updated_by+'      ON: '+updated_at+''
							  
							text += '\n\nPATIENT DANGEROUS (SELF/OTHERS) IF IN APPROVED HOUSING:  '+dangerYesNo+''

							if (dangerYesNo == 'Y') {
								text +='\n   MEDS LAST CHANGED: '+drugs_last_changed+'';
									if (drugs_last_changed == '0-8Weeks') {
										text +='\n'+drugs_change_why+'';
									}else if (drugs_last_changed == 'Gt8Weeks') {
										text +='\n'+drugs_not_why+'';
									};
								text +='\n   PSYCHOSOCIAL LAST CHANGED: '+psychsoc_last_changed+'';
									if (psychsoc_last_changed == '0-3Months') {
										text +='\n'+psychsoc_change_why+'';
									}else if (psychsoc_last_changed == 'Gt3Months') {
										text +='\n'+psychsoc_not_why+'';
									};
							}else if (dangerYesNo == 'N') {
								text +='\n   Date set for Pre-Conference Meeting: '+pre_date_yesno+'';
									if (pre_date_yesno == 'Y') {
										text +='\nDate: '+pre_date+'';
									}else if (pre_date_yesno == 'N') {
										text +='\n'+pre_date_no_why+'';
									};
							};

							text +='\n'
						};
						//Enter past assessments into txa_MxAW_pastAssessments
						$('#txa_MxAW_pastAssessments').val(text)
						//Pass text to PDF
						$('#divForPastMxPDF').html(''+pdf_html+'')
												  
					}).fail(function(jqXHR,textStatus,errorThrown){
						alert(''+jqXHR+': '+textStatus+':'+errotThrown+'')
					});
			},

			loadError: function (jqXHR, textStatus, errorThrown) {
		        alert('HTTP status code: ' + jqXHR.status + '\n' +
		              'textStatus: ' + textStatus + '\n' +
		              'errorThrown: ' + errorThrown);
		        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		    },

	})
	.navGrid('#divPager', 
		{edit:false,add:false,del:false,search:false,refresh:false}
		// {edit:false,add:false,del:true,search:false,refresh:false}
		// {"del":true}, 
		// {"closeAfterEdit":true,"closeOnEscape":true}, 
		// {}, {}, {}, {}
 	  )
	.navButtonAdd('#divPager', {
		caption: 'Role',
		buttonicon: '',
		onClickButton: function(){	
			alert('ROle');
			// if(ID == ''){
			// 	alert('Please select User from "Users" table');
			// 	return false;
			// } else {
			// 	get_user_roles(''+ID+'');
			// 	get_all_roles();
			// };			
		},
		position:'last'
	})
	.navButtonAdd('#divPager', {
		caption: 'Delete',
		buttonicon: '',
		onClickButton: function(){
			alert('Delete')
			// roles_clearFields();
			// if(ID == '') {
			// 	swal('Please select User', ' from "Users" table', 'warning');
			// 	// alert('Please select User from "Users" table');
			// 	return false;
			// } else {
			// 	swal({   
			// 			title: "Are you sure?",   
			// 			text: "You will not be able to recover this user!",   
			// 			type: "warning",   
			// 			showCancelButton: true,   
			// 			confirmButtonColor: "#DD6B55",   
			// 			confirmButtonText: "Yes, delete it!",   
			// 			closeOnConfirm: true,
			// 			closeOnCancel: true 
			// 		}, 
			// 		function(){   
			// 			user_ajax1('/users/'+ID+'', 'DELETE');	
			// 			swal
			// 		});
			// };
		},
		position:'last'
	});
};

function get_site_patients_pop_pat_select (site) { 	
		var url = '/patients_site_search'
		var data_for_params = {'site': site}
		$.ajax({
			url: url,
			type: 'GET',
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			patient_select = 'slt_MxAW_Patient';
			populate_site_select(patient_select, data);
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('jqXHR: '+jqXHR+'/n textStatus: '+textStatus+' errorThrown: '+errorThrown+'')
		});
	}

function populate_site_select (slt_name, data) {
	$('#'+slt_name+'').find('option').remove();
		// var html = '';
		var html ='<option value="-1">All Patients</option>';
		for(var i = 0; i < data.length; i++){
			id = data[i].id;
			lastname = data[i].lastname;
			firstname = data[i].firstname;
			identifier = data[i].identifier;
			html += '<option value="'+id+'">' + lastname + ' '+firstname+'</option>'
		}
		$('#'+slt_name+'').append(html);
}

function populate_site_select_on_page_open (slt_name) {
	$('#'+slt_name+'').find('option').remove();
	var html ='<option value="-1">All Patients</option>';
	$('#'+slt_name+'').append(html);
}

function get_reasons_from_note (patient_id, reason) {
	url = '/mxa_tracker_get_reasons/'+patient_id+''
	data_for_params = {'patient_id': patient_id, 'reason': reason}

	$.ajax({
		url: url,
		type: 'GET',
		data: data_for_params,
		cache: false,
		dataType: 'json'
	}).done(function(data){
		//Clear text area
		$('#txa_MxAW_specificAssessments').val('');
		//Pat_demog data				
		var lastname = data[0].lastname;
		var firstname = data[0].firstname;
		var doa = moment(data[0].doa,"YYYY-MM-DD").format('YYYY-MM-DD');
		var name = ''+lastname+' '+firstname+''

		//Identify the patient
		var text = '';
		text += '\nNAME: '+name+'    DOA:  '+doa+''
		// Create the past_mx_text
		for (var i=0; i < data.length; i++) {
			var data_meeting_date = moment(data[i].meeting_date, "YYYY-MM-DD")
			var data_meeting_date_formatted = data_meeting_date.format('YYYY-MM-DD')
			var updated_at = moment(data[i].updated_at, "YYYY-MM-DD").format('YYYY-MM-DD');
			var updated_by	= data[i].updated_by
			//NOTE: calculate Days in hosp to meeting date - WILL REPLACE
				//WHEN ADD COLUMN "DAYS IN HOSPITAL" to database
			var diff = moment.duration(data_meeting_date.diff(doa));
			var days_in_hosp = Math.floor(diff.asDays());

			var dangerYesNo = data[i].danger_yn
			var drugs_last_changed = data[i].drugs_last_changed
			var drugs_not_why = data[i].drugs_not_why
			var drugs_change_why = data[i].drugs_change_why
			var psychsoc_last_changed = data[i].psychsoc_last_changed
			var psychsoc_not_why = data[i].psychsoc_not_why
			var psychsoc_change_why = data[i].psychsoc_change_why
			var pre_date_yesno = data[i].pre_date_yesno
			var pre_date_no_why = data[i].pre_date_no_why

			//Create and populate past Mx Assessments
			text += '\n\n________________________________________________'
			text += '\nMEETING DATE:  '+data_meeting_date_formatted+'     DAYS In HOSP: '+days_in_hosp+''
			text += '\nSAVED BY:  '+updated_by+'      ON: '+updated_at+''
							  
			text += '\n\nPATIENT DANGEROUS (SELF/OTHERS) IF IN APPROVED HOUSING:  '+dangerYesNo+''

			if (dangerYesNo == 'Y') {	
				if (drugs_last_changed == '0-8Weeks' && reason == 'MedChange') {
					text +='\n   MEDS LAST CHANGED: '+drugs_last_changed+'';
					text +='\n'+drugs_change_why+'';
				}else if (drugs_last_changed == 'Gt8Weeks' && reason == 'MedNoChange') {
					text +='\n   MEDS LAST CHANGED: '+drugs_last_changed+'';
					text +='\n'+drugs_not_why+'';
				};
			
				if (psychsoc_last_changed == '0-3Months' && reason == 'GroupChange') {
					text +='\n   PSYCHOSOCIAL LAST CHANGED: '+psychsoc_last_changed+'';
					text +='\n'+psychsoc_change_why+'';
				}else if (psychsoc_last_changed == 'Gt3Months' && reason == 'GroupNoChange') {
					text +='\n   PSYCHOSOCIAL LAST CHANGED: '+psychsoc_last_changed+'';
					text +='\n'+psychsoc_not_why+'';
				};
			}else if (dangerYesNo == 'N') {
				text +='\n   Date set for Pre-Conference Meeting: '+pre_date_yesno+'';
				text +='\n'+pre_date_no_why+'';
			};

			text +='\n'

		};
		//Enter specific reasons into txa_MxAW_specificAssessments
		$('#txa_MxAW_specificAssessments').val(text)


	}).fail(function(jqXHR,textStatus,errorThrown){
		alert('jqXHR: '+jqXHR+'/n textStatus: '+textStatus+' errorThrown: '+errorThrown+'')
	});
	
}
