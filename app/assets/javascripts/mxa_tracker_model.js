//"Model" for mxa_tracker.js

function MxAw_complex_search1 (user_facility) {
 
	var site = $('#slt_MxAW_Ward').val();
	// var patient_id =('#slt_MxAW_Patient').val();
	// var all_last = $('#slt_MxAW_AllLatestNote').val();
	var danger_yn = $('#slt_MxAW_danger_yn').val();
	var drugs_last_changed = $('#slt_MxAW_drugsChanged').val();


	url = '/mxa_tracker_search?facility='+user_facility+'&site='+site+'&danger_yn='+danger_yn+'&drugs_last_changed='+drugs_last_changed+''
	MxAW_refreshgrid(url);
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
		colNames:["id","pat_id","FirstName","LastName","C#","Ward","DOA", "Meeting", "Danger", "Drugs", "PsySoc", "Pre", "PreDate"],
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
	        	// alert('load complete')
	        	// reset_ID();
	        	// user_clearFields();
	        	// $('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').hide();
	        	// roles_clearFields();
	        },

			onSelectRow:function(id) { 
				alert(id)
				// set_id(id);  //set the ID variable
				// data_for_params = {user: {id: id}}

				// $.ajax({ 
				// 		  url: '/users/'+id+'',
				// 		  data: data_for_params,
				// 		  //type: 'POST',
				// 		  type: 'GET',
				// 		  cache: false,
				// 		  dataType: 'json'
				// 	}).done(function(data){
				// 		user_clearFields();
				// 		roles_clearFields();
				// 		$('#b_user_Rt_Submit').attr('value','Edit');
				// 		$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').show();
				// 		$('#id').val(data.id);
				// 		$('#ftx_user_Rt_firstname').val(data.firstname);
				// 		$('#ftx_user_Rt_lastname').val(data.lastname);
				// 		$('#ftx_user_Rt_authen').val(data.authen);
				// 		$('#ftx_user_Rt_email').val(data.email);
				// 		$('#ftx_user_Rt_firstinitial').val(data.firstinitial);
				// 		$('#ftx_user_Rt_middleinitial').val(data.middleinitial);
				// 		$('#slt_user_Rt_facility').val(data.facility);

												  
					// }).fail(function(jqXHR, textStatus, errorThrown){
					// 	alert('HTTP status code: ' + jqXHR.status + '\n' +
		   //            'textStatus: ' + textStatus + '\n' +
		   //            'errorThrown: ' + errorThrown);
					// 	alert('Error in: /user');
					// });
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