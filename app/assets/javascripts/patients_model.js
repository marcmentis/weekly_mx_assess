function pat_on_opening (facility) {
	//After populating 'facility' select, make sure 'ward' select populated before
		// running 'complex_search'
	$('#slt_S_facility').val(''+facility+'');
	$('#slt_S_ward').mjm_addOptions('ward', {
							firstLine: 'All Wards', 
							facility: facility, 
							group: true,
							complete: function(){
								complex_search1();		
							}
							});		
};

function complex_search1 (){
	var firstname = $('#ftx_S_Firstname').val();
	var lastname = $('#ftx_S_lastname').val();
	var number = $('#ftx_S_number').val();
	var facility = $('#slt_S_facility').val();
	var ward = $('#slt_S_ward').val();

	// $("#gridGrid").remove();         
	url = '/patients_search?firstname='+firstname+'&lastname='+lastname+'&identifier='+number+'&facility='+facility+'&site='+ward+''
	refreshgrid(url);	
};

function refreshgrid(url){

	// if (url == 'nil') {url = '/patients'};
	if (url == 'nil') {url = "/patients_search?firstname=&lastname=&identifier=&facility=-1&site=-1"}

	
	//Create Table and Div for grid and navigation "pager" 
 	// $("#gridWork").remove();         
	$('#divGrid').html('<table id="divTable" style="background-color:#E0E0E0"></table><div id="divPager"></div>');
	//Define grid
	$("#divTable").jqGrid({
		url: url,
		datatype:"json",
		mtype:"GET",
		colNames:["id","LastName","FirstName","C #","Facility", "Ward"],
		colModel:[
			{name:"id",index:"id",width:55, hidden:true},
			{name:"lastname",index:"lastname",width:150,align:"center",editable:true},
			{name:"firstname",index:"firstname",width:150,align:"center"},
			{name:"identifier",index:"identifier",width:100,align:"center"},
			{name:"facility",index:"facility",width:100,align:"center"},
			{name:"site",index:"site",width:150,align:"center"}
		],
		editurl:"/patient/update",
		pager:"#divPager",
		height:390,
		width: 700,
		altRows: true,
		rowNum:15,
		rowList:[15,25,40],
		sortname:"lastname",
		sortorder:"asc",
		viewrecords:true,
		gridview: true, //increased speed can't use treeGrid, subGrid, afterInsertRow
		// loadonce: true,  //grid load data only once. datatype set to 'local'. Futher manip on client. 'Pager' functions disabled
		caption:"Patients ",

	        loadComplete: function(){
	        	// alert('in loadComplete')
	        },

			onSelectRow:function(id) { 
				// set_id(id);  //set the ID variable
				$('#Pat_ID').val(id);  //set the ID variable
				data_for_params = {patient: {id: id}}

				$.ajax({ 
						  // url: '/inpatient_show',
						  url: '/patients/'+id+'',
						  data: data_for_params,
						  //type: 'POST',
						  type: 'GET',
						  cache: false,
						  dataType: 'json'
					}).done(function(data){
						clearFields();
						$('#bPatientSubmit').attr('value','Edit');
						$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').show();
						$('#id').val(data.id);
						$('#txt_Pat_firstname').val(data.firstname);
						$('#txt_Pat_lastname').val(data.lastname);
						$('#txt_Pat_number').val(data.identifier);
						$('#slt_F_facility').val(data.facility);	
						if ($('#session-admin3').val() == 'true') {
							// IF ADMIN-3 - need to first populate slt_F_ward as table can include any facililty
							$('#slt_F_ward').mjm_addOptions('ward', {
								firstLine: 'All Wards', 
								facility: data.facility,
								complete: function(){
									$('#slt_F_ward').val(data.site);
							}
						});
						}else {
							//If not ADMIN-3, can populate slt_F_ward with session-facility in begining and so
								//just choose the ward here.
							$('#slt_F_ward').val(data.site);	
						};
						// $('#dt_Pat_DOA').val(data.doa)
						$('#dt_Pat_DOA').val(moment(data.doa,"YYYY-MM-DD").format('YYYY-MM-DD'));
						$('#dt_Pat_DOB').val(moment(data.dob, "YYYY-MM-DD").format('YYYY-MM-DD'));
						$('#dt_Pat_DOD').val(moment(data.dod, "YYYY-MM-DD").format('YYYY-MM-DD'));
								  
					}).fail(function(){
						alert('Error in: /inpatient');
					});
			},

			loadError: function (jqXHR, textStatus, errorThrown) {
		        alert('HTTP status code: ' + jqXHR.status + '\n' +
		              'textStatus: ' + textStatus + '\n' +
		              'errorThrown: ' + errorThrown);
		        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		    },


		    //The JASON reader. This defines what the JSON data returned should look 
			    //This is the default. Not needed - only if return does NOT look like this
				// jsonReader: { 
				// 	root: "rows", 
				// 	page: "page", 
				// 	total: "total", 
				// 	records: "records", 
				// 	repeatitems: true, 
				// 	cell: "cell", 
				// 	id: "id",
				// 	userdata: "userdata",
				// 	subgrid: { 
				// 	 root:"rows", 
				// 	 repeatitems: true, 
				// 	 cell:"cell" 
				// 	} 
				// },	

	})
	.navGrid('#divPager', 
		{edit:false,add:false,del:false,search:false,refresh:false}
		// {edit:false,add:false,del:true,search:false,refresh:false}
		// {"del":true}, 
		// {"closeAfterEdit":true,"closeOnEscape":true}, 
		// {}, {}, {}, {}
 	  )
	.navButtonAdd('#divPager', {
		caption: 'New',
		buttonicon: '',
		onClickButton: function(){	
			facility = $('#slt_F_facility').val();
			clearFields();
			$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').show();
			$('#bPatientSubmit').attr('value','New');
		},
		position:'last'
	})
	.navButtonAdd('#divPager', {
		caption: 'Delete',
		buttonicon: '',
		onClickButton: function(){	
			ID = $('#Pat_ID').val(); 
			if (ID.length > 0) {	
				if(confirm("Are you sure you want to delete this patient")){
					patients_ajax1('/patients/'+ID+'', 'DELETE');	
				} else {
					return true;
				};
			};
		},
		position:'last'
	});
};

function clearFields(){
	$('#txt_Pat_firstname, #txt_Pat_lastname, #txt_Pat_number, #dt_Pat_DOA, #dt_Pat_DOB, #dt_Pat_DOD')
			.val('');
	$('.error_message').hide();

	$('#PatientAsideRtErrors').html('').hide();
	if ($('#session-admin3').val() == 'true') {
		$('#slt_F_facility').val('-1')
		//ward must have no values
		$('#slt_F_ward').mjm_addOptions('ward', {
							firstLine: 'All Wards', 
							facility: '-1', 
							group: true,
							});
	}else {
		$('#slt_F_ward').val('-1')
	};
};

function patients_ajax1 (url, type) {
	// var firstname = $('#firstname').val();
	// var lastname = $('#lastname').val();
	// var number = $('#number').val();
	// var facility = $('#slt_F_facility').val();
	// var ward = $('#slt_F_ward').val();

	var params_string = $('#fPatientAsideRt').serialize();
	params_string_replace = params_string.replace(/&/g,',')
	params_string_replace = params_string_replace.replace(/%2F/g,'/')
	params_array = params_string_replace.split(',');
	

	var params_hash = {};
	params_hash['updated_by'] = $('#session-username').val();
	//Serialize does NOT generate disabled values
	if ($('#session-admin3').val() !== 'true') {
		params_hash['facility'] = $('#slt_F_facility').val();
	};
	
	for(var i=0, l = params_array.length; i<l; i++){
		string = params_array[i]
		array = string.split('=')
		key = array[0];
		value = array[1]
		params_hash[key] = value;
	}
	//Make strong params
	data_for_params = {patient: params_hash}
	
	// Create strong parameter
	// data_for_params ={patient: {'firstname': firstname, 'lastname': 
	// 				lastname, 'identifier': number, 
	// 		  	    'facility': facility, 'site': ward}}

	$.ajax({
		url: url,
		type: type,
		data: data_for_params,
		cache: false,
		dataType: 'json'
	}).done(function(data){
		// refreshgrid('nil');
		complex_search1();
		clearFields();
		// $('#divPatientAsideRt, #bEdit, #bNew, #bDelete, #bBack').hide();
		$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').hide();

	}).fail(function(jqXHR,textStatus,errorThrown){
		// alert('HTTP status code: ' + jqXHR.status + '\n' +
  //             'textStatus: ' + textStatus + '\n' +
  //             'errorThrown: ' + errorThrown);
  //       alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
        var msg = JSON.parse(jqXHR.responseText)
        var newHTML;
        newHTML = '<h3>Validation Error</h3>';	
        newHTML += '<ul>';        
        $.each(msg, function(key, value){
        	newHTML += '<li>'+ value +'</li>';
        });
        newHTML += '</ul>';
        $('#PatientAsideRtErrors').show().html(newHTML)
	});
};
