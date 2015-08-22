$(function(){
if($('body.users').length) {

	//DECLARE VARIABLES
		var ID = '';
		  	function set_id(x){ID = x};

	//STYLING
		//wrappers etc.
		$('#divUserPageWrapper').addClass('pad_3_sides');
		$('#divUserPageInnerWrapper').addClass('centered')
									.css({'width':'75em'});
		$('#divUserAsideRt').addClass('float_right form_container')
							.css({'width':'250px'})
							.hide();
		$('#UserAsideRtErrors').addClass('error_explanation')
								.hide();
		$('#divUserRwrapper').addClass('pad_3_sides ')
							.css({'margin-top': '1em'})
							.hide();

		//forms
		$('#fUserSearch').addClass('form_container').css({'width':'692px'});
		$('#fUserR').addClass('form_container')
							.css({'width':'692px'});

		//button
		$('[id^=b_]').button().addClass('reduce_button')
		// Can't use .hide() as wont work with IE 10
		$('#b_user_select').addClass('move_off_page')

		//dates
		// $('[id^=dt]').datepicker().css({'width':'7em'});

		//selects
		$('#slt_user_R_userRoles').attr({size: "13", multiple: "no"})
								.css({'width':'160px'})

		$('#slt_user_R_allRoles').attr({size: "18", multiple: "no"})
								.css({'width':'160px'})

		$('#slt_user_R_usersWithRoles').attr({size: "18", multiple: "no"})
								.css({'width':'240px'})
		
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

	//FORM VALIDATION, SUBMIT HANDLER
		//Validate and Submit fPatientAsideRt
		$('#fUserAsideRt').validate({
			rules: {
				ftx_user_Rt_firstname: {
					required: true,
					minlength: 2
				},
				ftx_user_Rt_lastname: {
					required: true,
					minlength: 2
				}
			},
			messages: {
				code: {
					required: "FirstName is required",
					minlength: "Two characters required"
				},
				value: {
					required: "LastName is required",
					minlength: "Two chararcters required"
				}
			},
			submitHandler: function(form){
				//Get value of submit button to determine which AJAX call to make
				submit_value = $(form).find('input[type=submit]').attr('value')
				switch(submit_value){
					case 'New':
						user_ajax1('/users', 'POST');
						break;
					case 'Edit':
						user_ajax1('/users/'+ID+'', 'PATCH');
						break;
					default:
						alert('submit_id not found');
						return false;
				};
				
			}
		});

	//SELECTS
		//TO DO show appropriate only if Admin2
		// $('#slt_user_S_facility, #slt_user_Rt_facility').mjm_addOptions('facility', {firstLine: 'Facilities'})
		$('#slt_user_Rt_facility').mjm_addOptions('facility', {firstLine: 'Facilities'})


	// BUTTONS
		//Submit complex search on fPatientSearch using hidden submit button
		// $('#btnSubmit').click(function(e){
		$('#fUserSearch').submit(function(e){
			e.preventDefault();
			user_complex_search1();
		});

		$('#b_user_Rt_Back').click(function(){
			$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').hide();
			user_clearFields();
		});

		$('#b_user_R_addRole').click(function(){
			no_options_selected = $('#slt_user_R_allRoles :selected').length;
			if (no_options_selected != 1) {
				alert('Please select 1 role only from All Roles list')
				return;
			};
			role_name_array = $('#slt_user_R_allRoles').val();
			role_name = role_name_array[0];
			url = '/users_add_role/'+ID+'';
			type = 'POST'
			add_remove_role(role_name, ID, url, type);
		});

		$('#b_user_R_newRole').click(function(){
			new_role_name = $('#txt_user_R_newRole').val();
			if (new_role_name == '') {
				alert('Please enter new role in Text box');
				$('#txt_user_R_newRole').focus();
				return true;
			};
			url = '/users_add_role/'+ID+'';
			type = 'POST'
			add_remove_role(new_role_name, ID, url, type);
		});

		$('#b_user_R_removeRole').click(function(){
			no_options_selected = $('#slt_user_R_userRoles :selected').length;
			if (no_options_selected != 1) {
				alert('Please select 1 role only from Users Roles list')
				return;
			};
			role_name_array = $('#slt_user_R_userRoles').val();
			role_name = role_name_array[0];
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
												if ($('#session-admin3').val() !== 'true'){
													$('#slt_user_S_facility').attr("disabled", true)
												};
											}
										})



	// user_refreshgrid('nil');

	//Only want to run 'user_complex_search1() after select filled i.e., synchranously'
	// $('#slt_user_S_facility').mjm_addOptions('facility', {firstLine: 'Facilities'})
	// user_complex_search1();


	//*****************************************************
	//FUNCTIONS CALLED FROM ABOVE

	function user_refreshgrid(url){

		if (url == 'nil') {url = '/users'};
		
		//Create Table and Div for grid and navigation "pager" 
	 	// $("#divUserGrid").remove();         
		$('#divUserGrid').html('<table id="divTable" style="background-color:#E0E0E0"></table><div id="divPager"></div>');
		//Define grid

		$("#divTable").jqGrid({
			url: url,
			datatype:"json",
			mtype:"GET",
			colNames:["id","FirstName","LastName","Authen","eMail", "Finit", "Minit", "Facility"],
			colModel:[
				{name:"id",index:"id",width:55, hidden:true},
				{name:"firstname",index:"firstname",width:125,align:"center"},
				{name:"lastname",index:"lastname",width:125,align:"center"},
				{name:"authen",index:"authen",width:100,align:"center"},
				{name:"email",index:"email",width:200,align:"center"},
				{name:"firstinitial",index:"firstinitial",width:25,align:"center"},
				{name:"middleinitial",index:"middleinitial",width:25,align:"center"},
				{name:"facility",index:"facility",width:75,align:"center"}
			],
			editurl:"/users",
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
			caption:"Users ",

		        loadComplete: function(){
		        	reset_ID();
		        	user_clearFields();
		        	$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').hide();
		        	roles_clearFields();
		        },

				onSelectRow:function(id) { 
					set_id(id);  //set the ID variable
					data_for_params = {user: {id: id}}

					$.ajax({ 
							  url: '/users/'+id+'',
							  data: data_for_params,
							  //type: 'POST',
							  type: 'GET',
							  cache: false,
							  dataType: 'json'
						}).done(function(data){
							user_clearFields();
							roles_clearFields();
							$('#b_user_Rt_Submit').attr('value','Edit');
							$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').show();
							$('#id').val(data.id);
							$('#ftx_user_Rt_firstname').val(data.firstname);
							$('#ftx_user_Rt_lastname').val(data.lastname);
							$('#ftx_user_Rt_authen').val(data.authen);
							$('#ftx_user_Rt_email').val(data.email);
							$('#ftx_user_Rt_firstinitial').val(data.firstinitial);
							$('#ftx_user_Rt_middleinitial').val(data.middleinitial);
							$('#slt_user_Rt_facility').val(data.facility);

													  
						}).fail(function(jqXHR, textStatus, errorThrown){
							alert('HTTP status code: ' + jqXHR.status + '\n' +
			              'textStatus: ' + textStatus + '\n' +
			              'errorThrown: ' + errorThrown);
							alert('Error in: /user');
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
				reset_ID();	
				user_clearFields();
				roles_clearFields();
				$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').show();
				$('#b_user_Rt_Submit').attr('value','New');
			},
			position:'last'
		})
		.navButtonAdd('#divPager', {
			caption: 'Role',
			buttonicon: '',
			onClickButton: function(){	
				if(ID == ''){
					alert('Please select User from "Users" table');
					return false;
				} else {
					get_user_roles(''+ID+'');
					get_all_roles();
				};			
			},
			position:'last'
		})
		.navButtonAdd('#divPager', {
			caption: 'Delete',
			buttonicon: '',
			onClickButton: function(){
				roles_clearFields();
				if(ID == '') {
					swal('Please select User', ' from "Users" table', 'warning');
					// alert('Please select User from "Users" table');
					return false;
				} else {
					swal({   
							title: "Are you sure?",   
							text: "You will not be able to recover this user!",   
							type: "warning",   
							showCancelButton: true,   
							confirmButtonColor: "#DD6B55",   
							confirmButtonText: "Yes, delete it!",   
							closeOnConfirm: true,
							closeOnCancel: true 
						}, 
						function(){   
							user_ajax1('/users/'+ID+'', 'DELETE');	
							swal
						});
					// if(confirm("Are you sure you want to delete this user")){
					// 	user_ajax1('/users/'+ID+'', 'DELETE');	
					// } else {
					// 	return true;
					// };
				};
			},
			position:'last'
		});
	};

	function user_clearFields(){
		$('#ftx_user_Rt_firstname, #ftx_user_Rt_lastname,\
			#ftx_user_Rt_authen, #ftx_user_Rt_email,\
			#ftx_user_Rt_firstinitial, #ftx_user_Rt_middleinitial,\
			#slt_user_Rt_facility').val('');
		$('#UserAsideRtErrors').html('').hide();
	};

	function roles_clearFields(){
		$('#slt_user_R_userRoles, #slt_user_R_allRoles,\
			#slt_user_R_usersWithRoles').find('option').remove();
		$('#txt_user_R_newRole').val('');
		$('#s_user_R_titleName, #s_user_R_name').text('');
		$('#divUserRwrapper').hide();
	};
	
	function user_complex_search1 (){
		var facility = $('#slt_user_S_facility').val();
		var firstname = $('#ftx_user_S_firstname').val();
		var lastname = $('#ftx_user_S_lastname').val();
		var authen = $('#ftx_user_S_authen').val();
		var email = $('#ftx_user_S_email').val();
		var firstinitial = $('#ftx_user_S_firstinitial').val();
		var middleinitial = $('#ftx_user_S_middleinitial').val();

		// $("#gridGrid").remove();         
		url = '/users_search?facility='+facility+'&firstname='+firstname+'&lastname='+lastname+'&authen='+authen+'&email='+email+'&firstinitial='+firstinitial+'&middleinitial='+middleinitial+''
		user_refreshgrid(url);	
	};

	function user_ajax1 (url, type) {
		var firstname = $('#ftx_user_Rt_firstname').val();
		var lastname = $('#ftx_user_Rt_lastname').val();
		var authen = $('#ftx_user_Rt_authen').val();
		var email = $('#ftx_user_Rt_email').val();
		var firstinitial = $('#ftx_user_Rt_firstinitial').val();
		var middleinitial = $('#ftx_user_Rt_middleinitial').val();
		var facility = $('#slt_user_Rt_facility').val();
		// Create strong parameter
		data_for_params ={user: {'firstname': firstname, 'lastname': lastname, 
						'authen': authen, 'email': email, 
						'firstinitial': firstinitial, 
						'middleinitial': middleinitial,
				  		'facility': facility}}

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			// for_select_refreshgrid('nil');
			user_complex_search1();
			user_clearFields();
			roles_clearFields();
			$('#divUserAsideRt, #b_user_Rt_Submit, #b_user_Rt_Back').hide();

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
	        $('#UserAsideRtErrors').show().html(newHTML)
		});
	};

	function get_all_roles(){
		data_for_params = '';
		url = '/roles';
		type = 'GET'

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			var html = '';
			$('#txt_user_R_newRole').val('');
			$('#slt_user_R_allRoles').find('option').remove();
			if(data.length != 0){
				for(var i = 0; i < data.length; i++){
					html += '<option value="' + data[i].name + '">' + data[i].name + '</option>';
				};
			}; 
			$('#divUserRwrapper').show();
			$('#slt_user_R_allRoles').append(html);
			
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('HTTP status code: ' + jqXHR.status + '\n' +
	              'textStatus: ' + textStatus + '\n' +
	              'errorThrown: ' + errorThrown);
	        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		});
	};

	function get_user_roles(userID){
		var html = '';
		data_for_params ={user: {'id': userID}};
		url = '/users_roles/'+userID+'';
		type = 'GET'

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			$('#slt_user_R_userRoles').find('option').remove();
			var lastname = $('#ftx_user_Rt_lastname').val();
			var firstinitial = $('#ftx_user_Rt_firstinitial').val();
			var firstname = $('#ftx_user_Rt_firstname').val();
			var authen = $('#ftx_user_Rt_authen').val();
			var facility = $('#slt_user_Rt_facility option:selected').text();
			name = firstinitial + '.' + lastname
			name2 = firstname +' '+lastname+' '+authen+' '+facility+''

			$('#s_user_R_name').empty();
			$('#s_user_R_name').text(name);
			$('#s_user_R_titleName').empty();
			$('#s_user_R_titleName').text(name2);

			if(data.length != 0){
				for(var i = 0; i < data.length; i++){
					html += '<option value="' + data[i].name + '">' + data[i].name + '</option>';
				};
			}; 
			$('#divUserRwrapper').show();			
			$('#slt_user_R_userRoles').append(html);
			
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('HTTP status code: ' + jqXHR.status + '\n' +
	              'textStatus: ' + textStatus + '\n' +
	              'errorThrown: ' + errorThrown);
	        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		});		
	};

	function add_remove_role(role_name, user_id, url, type){
		//Rolify calls: 
			//@user.add_role 'role_name'
				// If 'role_name' exists will add it to user
				// If 'role_name' does not exist will (i) add it to user (ii) create new role
			//@user.remove_role 'role_name'
				// Will remove 'role_name' from users_roles table
				// If no more users have that 'role_name' will
					// destroy 'role_name' from 'roles' table
		data_for_params = {user: {id: user_id, role_name: role_name}};

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			get_user_roles(ID);
			get_all_roles();
			
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('HTTP status code: ' + jqXHR.status + '\n' +
	              'textStatus: ' + textStatus + '\n' +
	              'errorThrown: ' + errorThrown);
	        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		});
	};

	function get_all_users(role_name, url, type){		
		data_for_params = {name: role_name};

		$.ajax({
			url: url,
			type: type,
			data: data_for_params,
			cache: false,
			dataType: 'json'
		}).done(function(data){
			var html = '';
			$('#slt_user_R_usersWithRoles').find('option').remove();
			if(data.length != 0){
				for(var i = 0; i < data.length; i++){
					firstinitial = data[i].firstinitial
					lastname = data[i].lastname 
					authen = data[i].authen
					facility = data[i].facility
					name = ''+firstinitial+'. '+lastname+': '+authen+': '+facility+''
					html += '<option value="' + data[i].id + '">' + name + '</option>';
				};
			}; 
			$('#slt_user_R_usersWithRoles').append(html);
			
		}).fail(function(jqXHR,textStatus,errorThrown){
			alert('HTTP status code: ' + jqXHR.status + '\n' +
	              'textStatus: ' + textStatus + '\n' +
	              'errorThrown: ' + errorThrown);
	        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
		});
	};

	function reset_ID(){
		set_id('');
	};

};		//if($('#body.users').length) {
});		//$(function(){






	