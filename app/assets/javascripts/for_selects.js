$(function(){
if($('body.for_selects').length) {

	//DECLARE VARIABLES
		var ID = '';
		  	function set_id(x){ID = x};

	//STYLING
		//div
		$('#divForSelectPageWrapper')
				.addClass('pad_3_sides');			
		$('#divForSelectPageInnerWrapper')
				.addClass('centered')
				.css({'max-width':'980px'});
		$('#divForSelectAsideRt').addClass('form_container')
								.hide();
		$('#ForSelectAsideRtErrors').addClass('error_explanation')
									.hide();

		//form
		$('#fForSelectSearch').addClass('form_container')
							.css({'width':'692px'});

		// Can't use .hide() as wont work with IE 10
		$('#b_for_selects_select').addClass('move_off_page')
		$('.error_message').hide();
		


		
		// $('#ForSelectErrors').addClass('error_explanation')
		// 					 .hide();

		
		//button
		$('[id^=b_]').button().addClass('reduce_button')

		//dates
		// $('[id^=dt]').datepicker().css({'width':'7em'});

	//SELECTS
		if ($('#session-admin3').val() !== 'true') {
			$('#slt_for_selects_S_facility, #slt_for_select_Rt_facility')
					.attr("disabled", true);
		};
		//TO DO show appropriate only if Admin2
		// $('#slt_for_selects_S_facility, #slt_for_select_Rt_facility').mjm_addOptions('facility', {firstLine: 'Facilities'})
			
		// $('#slt_for_select_Rt_facility').mjm_addOptions('facility', {firstLine: 'Facilities'})
		//Filter when facility changed
		$('#slt_for_selects_S_facility').change(function(){
			for_select_complex_search1();
		});
	//Submit New/Edit information from input form
		$('#fForSelectAsideRt').submit(function(e){
			e.preventDefault();
			//VALIDATE that form properly filled out
			validation_array = [
 				['slt_for_select_Rt_facility','-1','Please choose Facility'],
 				['ftx_for_select_Rt_code','','Please enter Code'],
 				['ftx_for_select_Rt_value','','Please enter Value'],
 				['ftx_for_select_Rt_text','','Please enter Text'],
 				['ftx_for_select_option_order','','Please enter Order']
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
						for_selects_ajax1('/for_selects', 'POST');
						break;
					case 'Edit':
						for_selects_ajax1('/for_selects/'+ID+'', 'PATCH');
						break;
					default:
						alert('submit_id not found');
						return false;
				};
		});
		//Validate and Submit fPatientAsideRt
		// $('#fForSelectAsideRt').validate({
		// 	rules: {
		// 		ftx_for_select_Rt_code: {
		// 			required: true,
		// 			minlength: 2
		// 		},
		// 		ftx_for_select_Rt_value: {
		// 			required: true,
		// 			minlength: 2
		// 		}
		// 	},
		// 	messages: {
		// 		code: {
		// 			required: "Code is required",
		// 			minlength: "Two characters required"
		// 		},
		// 		value: {
		// 			required: "Value is required",
		// 			minlength: "Two chararcters required"
		// 		}
		// 	},
		// 	submitHandler: function(form){
		// 		//Get value of submit button to determine which AJAX call to make
		// 		submit_value = $(form).find('input[type=submit]').attr('value')
		// 		switch(submit_value){
		// 			case 'New':
		// 				for_selects_ajax1('/for_selects', 'POST');
		// 				break;
		// 			case 'Edit':
		// 				for_selects_ajax1('/for_selects/'+ID+'', 'PATCH');
		// 				break;
		// 			default:
		// 				alert('submit_id not found');
		// 				return false;
		// 		};
				
		// 	}
		// });

	// BUTTONS
		//Submit complex search on fPatientSearch using hidden submit button
		// $('#btnSubmit').click(function(e){
		$('#fForSelectSearch').submit(function(e){
			e.preventDefault();
			for_select_complex_search1();
		});
		$('#b_for_select_Rt_Back').click(function(){
			$('#divForSelectAsideRt, #b_for_select_Rt_Submit, #b_for_select_Rt_Back').hide();
			for_select_clearFields();
		});

	// RUN ON OPENING
	if ($('#session-admin3').val() == 'true') {
		facility = '-1';
	} else { 
		facility = $('#session-facility').val();
	};
	//Make sure 'facility' select is populated before running 'complex_search1'
		$('#slt_for_selects_S_facility').mjm_addOptions('facility', {
											firstLine: 'Facilities', 
											complete: function(){
												$('#slt_for_selects_S_facility').val(''+facility+'');
												for_select_complex_search1();
												// if ($('#session-admin3').val() !== 'true'){
												// 	$('#slt_for_selects_S_facility').attr("disabled", true)
												// };
											}
										});
	//Set value of facility select in form
	$('#slt_for_select_Rt_facility').mjm_addOptions('facility', {
											firstLine: 'Facilities',
											complete: function(){
												$('#slt_for_select_Rt_facility').val(facility)
											}
										});

	//Only want to run 'for_select_complex_search1() after select filled i.e., synchranously'
	// $('#slt_for_selects_S_facility').mjm_addOptions('facility', {firstLine: 'Facilities'})
	// for_select_complex_search1();


	
	
	//*****************************************************
	//FUNCTIONS CALLED FROM ABOVE
	function for_select_refreshgrid(url){

		if (url == 'nil') {url = '/for_selects'};

		
		//Create Table and Div for grid and navigation "pager" 
	 	// $("#gridWork").remove();         
		$('#divGrid_for_selects').html('<table id="divTable" style="background-color:#E0E0E0"></table><div id="divPager"></div>');
		//Define grid
		$("#divTable").jqGrid({
			url: url,
			datatype:"json",
			mtype:"GET",
			colNames:["id","Code","Value","Text","Grouper", "Order", "Facility"],
			colModel:[
				{name:"id",index:"id",width:55, hidden:true},
				{name:"code",index:"code",width:100,align:"center"},
				{name:"value",index:"value",width:100,align:"center"},
				{name:"text",index:"text",width:100,align:"center"},
				{name:"grouper",index:"grouper",width:100,align:"center"},
				{name:"option_order",index:"option_order",width:50,align:"center"},
				{name:"facility",index:"facility",width:100,align:"center"}
			],
			editurl:"/for_select/update",
			pager:"#divPager",
			height:390,
			width: 700,
			altRows: true,
			rowNum:15,
			rowList:[15,25,40],
			sortname:"code",
			sortorder:"asc",
			viewrecords:true,
			gridview: true, //increased speed can't use treeGrid, subGrid, afterInsertRow
			// loadonce: true,  //grid load data only once. datatype set to 'local'. Futher manip on client. 'Pager' functions disabled
			caption:"For Selects ",

		        loadComplete: function(){
		        	// alert('in loadComplete')
		        },

				onSelectRow:function(id) { 
					set_id(id);  //set the ID variable
					data_for_params = {for_select: {id: id}}

					$.ajax({ 
							  // url: '/inpatient_show',
							  url: '/for_selects/'+id+'',
							  data: data_for_params,
							  //type: 'POST',
							  type: 'GET',
							  cache: false,
							  dataType: 'json'
						}).done(function(data){
							for_select_clearFields();
							$('#b_for_select_Rt_Submit').attr('value','Edit');
							$('#divForSelectAsideRt, #b_for_select_Rt_Submit, #b_for_select_Rt_Back').show();
							$('#id').val(data.id);
							$('#ftx_for_select_Rt_code').val(data.code);
							$('#ftx_for_select_Rt_value').val(data.value);
							$('#ftx_for_select_Rt_text').val(data.text);
							$('#ftx_for_select_Rt_grouper').val(data.grouper);
							$('#ftx_for_select_option_order').val(data.option_order);
							$('#slt_for_select_Rt_facility').val(data.facility);

													  
						}).fail(function(){
							alert('Error in: /inpatient');
						});
				},

				loadError: function (jqXHR, textStatus, errorThrown) {				
			        	if (jqXHR.responseText.includes("Pundit::NotAuthorizedError")) {
			        		msg = {"error": "User not authorized"};
					        
			        	} else {
			        		msg = {'HTTP status code': '' + jqXHR.status + '', 
			        		       'textStatus': '' + textStatus + '', 
			        		      'errorThrown ': '' + errorThrown +''
			        		  };
			        	};
			        	ajax_error1('Search Error', msg, 'ForSelectErrors', '3000')
			        // var newHTML;
			        // newHTML = '<h3>Search Error</h3>';	
			        // newHTML += '<ul>';
		        	// $.each(msg, function(key, value){
				       //  	newHTML += '<li>'+ value +'</li>';
				       //  });
			        // newHTML += '</ul>';
			        // $('#ForSelectErrors').show().html(newHTML)
			        // setTimeout(function(){
			        // 	$('#ForSelectErrors').html('').hide();
			        // }, 3000);		
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
				for_select_clearFields();
				// $('#divPatientAsideRt, #bNew, #bBack').show();
				// $('#bDelete, #bEdit').hide();

				$('#divForSelectAsideRt, #b_for_select_Rt_Submit, #b_for_select_Rt_Back')
						.show();
				$('#b_for_select_Rt_Submit').attr('value','New');
				//If admin3 then set facility value to -1
				//Else set it to users facility
			},
			position:'last'
		})
		.navButtonAdd('#divPager', {
			caption: 'Delete',
			buttonicon: '',
			onClickButton: function(){	
				if (ID.length > 0) {	
					if(confirm("Are you sure you want to delete this entry")){
						for_selects_ajax1('/for_selects/'+ID+'', 'DELETE');	
					} else {
						return true;
					};
				};
			},
			position:'last'
		});
	};

	function for_select_clearFields(){
		$('#ftx_for_select_Rt_code, #ftx_for_select_Rt_value, #ftx_for_select_Rt_text, #ftx_for_select_Rt_grouper, #ftx_for_select_option_order').val('');
		$('#ForSelectAsideRtErrors').html('').hide();
		if ($('#session-admin3').val() == 'true') {
			$('#slt_for_select_Rt_facility').val('-1');
		}else{
			facility = $('#session-facility').val();
			$('#slt_for_select_Rt_facility').val(facility);
		};
	 };

	function for_selects_ajax1 (url, type) {
		var code = $('#ftx_for_select_Rt_code').val();
		var value = $('#ftx_for_select_Rt_value').val();
		var text = $('#ftx_for_select_Rt_text').val();
		var grouper = $('#ftx_for_select_Rt_grouper').val();
		var option_order = $('#ftx_for_select_option_order').val();
		var facility = $('#slt_for_select_Rt_facility').val();
		// Create strong parameter
		data_for_params ={for_select: {'code': code, 'value': value, 
						'text': text, 'grouper': grouper, 
						'option_order': option_order,
				  		'facility': facility}}

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			// for_select_refreshgrid('nil');
			for_select_complex_search1();
			for_select_clearFields();
			$('#divForSelectAsideRt, #b_for_select_Rt_Submit, #b_for_select_Rt_Back').hide();

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
	        $('#ForSelectAsideRtErrors').show().html(newHTML)
		});
	};

	function for_select_complex_search1 (){
		var facility = $('#slt_for_selects_S_facility').val();
		var code = $('#ftx_for_selects_S_code').val();
		var value = $('#ftx_for_selects_S_value').val();
		var text = $('#ftx_for_selects_S_text').val();
		var grouper = $('#ftx_for_selects_S_grouper').val();
		var option_order = $('#ftx_for_selects_S_option_order').val();
		// $("#gridGrid").remove();         
		url = '/for_selects_search?facility='+facility+'&code='+code+'&value='+value+'&text='+text+'&grouper='+grouper+'&option_order='+option_order+''
		for_select_refreshgrid(url);	
	};



};
});  //$(function)(){