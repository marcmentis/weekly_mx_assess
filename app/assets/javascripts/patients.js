$(function(){
// $(document).on("ready page:change", function(){ 
if ($('body.patients').length) {

	//DECLARE VARIABLES
		var ID = '';
		  	function set_id(x){ID = x};
		

	// STYLING
		$('#divPatientPageWrapper').addClass('pad_3_sides')
		$('#divPatientPageInnerWrapper').addClass('centered')
										.css({'width':'75em'});
		$('#divPatientAsideRt').addClass('float_right form_container')
								.css({'width':'250px'})
								.hide();
		$('#PatientAsideRtErrors').addClass('error_explanation')
									.hide();

		$('#fPatientSearch').addClass('form_container').css({'width':'692px'});
		// Can't use .hide() as wont work with IE 10
		$('#btnSubmit').addClass('move_off_page')


		//button
		$('[id^=b]').button().addClass('reduce_button')
		// $('#lastname').addClass('input_field')

		//dates
		$('[id^=dt]').datepicker().css({'width':'7em'});

	// SELECTS
		// TO DO Show only if Admin2
		// $('#slt_S_facility').mjm_addOptions('facility', {firstLine: 'All Facilities'})
		// Show appropriate wards in
		$('#slt_S_facility').change(function(){
			var chosen_facility = $('#slt_S_facility').val();
			$('#slt_S_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: chosen_facility, group: true})
		});

		// Filter when Facility changed
		$('#slt_S_facility').change(function(e){
			complex_search1();
		});

		//Filter when ward changed
		$('#slt_S_ward').change(function(e){
			complex_search1();
		});


	//FORM VALIDATION, SUBMIT HANDLER
		//Validate and Submit fPatientAsideRt
		$('#fPatientAsideRt').validate({
			rules: {
				firstname: {
					required: true,
					minlength: 2
				},
				lastname: {
					required: true,
					minlength: 4
				}
			},
			messages: {
				firstname: {
					required: "Firstname is required",
					minlength: "Two characters required"
				},
				lastname: {
					required: "Lastname is required",
					minlength: "Four chararcters required"
				}
			},
			submitHandler: function(form){
				//Get value of submit button to determine which AJAX call to make
				submit_value = $(form).find('input[type=submit]').attr('value')
				switch(submit_value){
					case 'New':
						patients_ajax1('/patients', 'POST');
						break;
					case 'Edit':
						patients_ajax1('/patients/'+ID+'', 'PATCH');
						break;
					default:
						alert('submit_id not found');
						return false;
				};
				
			}
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

	
	// RUN ON OPENING
	if ($('#session-admin3').val() == 'true') {
		facility = '-1';
		//Make sure 'facility' and 'ward' selects are populated before running 'complex_search1'
		$('#slt_S_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities', 
											complete: function(){
												on_opening();
											}
										})
		$('#slt_S_ward').mjm_addOptions('ward', {firstLine: 'All Wards', facility: '-1', group: true})
	} else { 
		facility = $('#session-facility').val();
		//Make sure 'facility' and 'ward' selects are populated before running 'complex_search1'
		$('#slt_S_facility').mjm_addOptions('facility', {
											firstLine: 'All Facilities',
											complete: function(){
												on_opening();
											}
										});
	};



	// refreshgrid('nil');
	// complex_search1();
	//*****************************************************
	//FUNCTIONS CALLED FROM ABOVE
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
					set_id(id);  //set the ID variable
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
							$('#firstname').val(data.firstname);
							$('#lastname').val(data.lastname);
							$('#number').val(data.identifier);
							$('#facility').val(data.facility);
							$('#ward').val(data.site);

													  
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
				clearFields();
				// $('#divPatientAsideRt, #bNew, #bBack').show();
				// $('#bDelete, #bEdit').hide();

				$('#divPatientAsideRt, #bPatientSubmit, #bPatientBack').show();
				$('#bPatientSubmit').attr('value','New');
			},
			position:'last'
		})
		.navButtonAdd('#divPager', {
			caption: 'Delete',
			buttonicon: '',
			onClickButton: function(){	
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

	function on_opening () {
		//After populating 'facility' select, make sure 'ward' select populated before
			// running 'complex_search'
		$('#slt_S_facility').val(''+facility+'');
		$('#slt_S_ward').mjm_addOptions('ward', {
								firstLine: 'All Wards', 
								facility: facility, 
								group: true,
								complete: function(){
									complex_search1();
									if ($('#session-admin3').val() !== 'true') {
										$('#slt_S_facility').attr("disabled", true);
									};		
								}
								});
		
	};

	function clearFields(){
		$('#firstname, #lastname, #number, #facility, #ward').val('');
		$('#PatientAsideRtErrors').html('').hide();
	 };

	function patients_ajax1 (url, type) {
		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();
		var number = $('#number').val();
		var facility = $('#facility').val();
		var ward = $('#ward').val();
		// Create strong parameter
		data_for_params ={patient: {'firstname': firstname, 'lastname': 
						lastname, 'identifier': number, 
				  	    'facility': facility, 'site': ward}}

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

};   //if ($('body.patients').length) {
});  // $(function(){
