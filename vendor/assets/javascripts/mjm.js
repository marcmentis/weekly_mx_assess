/*
****   POPULATE SELECT BOX.  ******************
   USE:  $('#SelectID').mjm_addOptions(code, [firstLine], [allValues], [group], [facility], [asynchranous]);
   i.e., $('#fFacility').mjm_addOptions('ward');
   		 $('#fFacility').mjm_addOptions('ward',{firstline: 'All wards', group: true});
   		 Values:
   		 	code:  one of the values in for_selects table
   		 	options:
   		 		firstLine:  'All facilities'  # will print whatever is entered. Value set to '-1'
   		 		allValues: 'All wards'  # will print whatever is entered. 'Value' set to "allValues"
   		 		group: true  # Doesn't matter what is entered. Anything will be converted to 'grouper'
   		 		asynchranous false   # Will be true by default.
   		 		facility: '0013'  # will use whatever is entered - use one of values in for_selects table
*/

(function($){
	$.fn.mjm_addOptions=function(code, option){
		var settings = $.extend({
			firstLine: null,
			allValues: null,
			group: null,
			asynchranous: null,
			facility: null
		},option||{});
		return this.each(function(){
			var element = $(this);
			var html = '';  //declare html
			var firstLine = settings.firstLine;
			var allValues = settings.allValues;
			var group = settings.group;
			var async = settings.asynchranous;
			var facility = settings.facility;

			if (async == null) {
				async = true;
			};
			if (group != null) {
				group = 'grouper'
			};

			data_for_params = {'code': code, 'facility': facility}
			$.ajax({
				url: '/for_selects_search',
				type: 'GET',
				data: data_for_params,
				dataType: 'json',
				async: async
			}).done(function(data){
				//Clear Select of both 'options' and 'optgroup'
				element.find('option').remove();
				element.find('optgroup').remove();
				//Set type of first line in html
				if(firstLine != null){html+='<option value="-1">' + firstLine + '</option>';}
				if(allValues != null){html+='<option value="allValues">All '+allValues+'</option>';}


				if (group != null) {
					//Enter the first Grouping Category ONLY if data exists i.e., .length>0
					if(data.length != 0){
						var grpName = data[0].grouper;
						   html+='<optgroup label="'+grpName+'">';
					} 
					//Loop through all data	and add group when it changes
					for(var i = 0; i < data.length; i++) {
						if (grpName == data[i].grouper){
						  html += '<option value="' + data[i].value + '">' + data[i].text + '</option>';
						}else{
						  grpName = data[i].grouper;
						  html+='<optgroup label="'+grpName+'">';
						  html += '<option value="' + data[i].value + '">' + data[i].text + '</option>';
						}		  
					}

				}else{
					for(var i = 0; i < data.length; i++){
						html += '<option value="'+data[i].value+'">' + data[i].text + '</option>'
					}
				}
				element.append(html);			
			}).fail(function(request,status,errorThrown){
				alert('Error in add_options');
			}); //End of ajax/done/fail

			}); //return this.each(function(){

	};  //$.fn.mjm_addOptions=function(){
})(jQuery);