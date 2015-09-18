
function ajax_error1 (header, msg, divname, msec) {
        //Usage:  Insert error list in respons to ajax fail/error (also jqGrid etc.)
            // 'header' - header for error list - describe where it came from
            // 'msg'  - json object (key,value) listing one or more error messages
            // 'divname' - id of div container for error message list. 
                // SSH for div: $('#ForSelectErrors').addClass('error_explanation').hide();
            // 'msec' [OPTIONAL] - length of time error message will be displayed
                // Error remains if omitted
            // EXAMPLE:
            // if (jqXHR.responseText.includes("Pundit::NotAuthorizedError")) {
            //                 msg = {"error": "User not authorized"};                           
            //             } else {
            //                 msg = {'HTTP status code': '' + jqXHR.status + '', 
            //                        'textStatus': '' + textStatus + '', 
            //                       'errorThrown ': '' + errorThrown +''
            //                   };
            //             };
            // ajax_error1('Search Error', msg, 'ForSelectErrors', '3000')
		var newHTML;
        newHTML = '<h3>'+header+'</h3>';	
        newHTML += '<ul>';
    	$.each(msg, function(key, value){
	        	newHTML += '<li>'+ value +'</li>';
	        });
        newHTML += '</ul>';
        $('#'+divname+'').show().html(newHTML)
        // msec is optional. Only execute setTimeout if undefined
        if (typeof msec !== "undefined") {
	        setTimeout(function(){
	        	$('#'+divname+'').html('').hide();
	        }, msec);
        };      	
	};

 //Triple Toggle Function 
        function tripleToggle(element, heightS1, heightL1, heightEL1){
         //Toggle textArea size based on size of textArea
            height = element.height();
            if (height == heightS1){
               element.height(heightL1);
            }else if(height == heightL1){
               element.height(heightEL1);
            }else if(height == heightEL1){
                element.height(heightS1)
            }
     };

// Validate Elements when using .form_container
  //Will show message in div below element
  //Will remove error div on next submit if corrected
  //'validation_array' is an array of arrays
    // contains [<element name>, <element value>, <message>]
  //Usage:
        // validation_array = [
        //   ['txt_Pat_firstname','','Please enter First Name'],
        //   ['txt_Pat_lastname','','Please enter Last Name'],
        //   ['txt_Pat_number','','Please enter Number'],
        //   ['slt_F_facility','-1','Please choose Facility'],
        //   ['slt_F_ward','-1','Please choose Ward'],
        //   ['dt_Pat_DOA','','Please choose DOA']
        // ]

        // //Loop through array and remove error messages if corrected       
        // remove_error_divs_if_corrected(validation_array)
        // //Loop through array and show error message if '', '-1' etc.
        // exit = validate_elements(validation_array)
        // if (exit) {return true};

  function validate_elements (v) {
    for (var i = 0; i < v.length; i++) {
      if ($('#'+v[i][0]+'').val() == ''+v[i][1]+'') {
        $('#'+v[i][0]+'')
          .after('<div class="error_message">'+v[i][2]+'</div>')
          .focus();
          return true;
        };
    };
  };
  
  function remove_error_divs_if_corrected(arr) {
    length = arr.length
    for (var i = 0; i < arr.length; i++) { 
      input = $('#'+arr[i][0]+'').val();
      if (input.length > 0 && input != '-1') {
        $('#'+arr[i][0]+'').nextAll('.error_message').remove();
      };
    };
  };

  


//********************************************************
// TIME LIBRARY
    function getCalendarDate()
                {
                   var months = new Array(13);
                   months[0]  = "January";
                   months[1]  = "February";
                   months[2]  = "March";
                   months[3]  = "April";
                   months[4]  = "May";
                   months[5]  = "June";
                   months[6]  = "July";
                   months[7]  = "August";
                   months[8]  = "September";
                   months[9]  = "October";
                   months[10] = "November";
                   months[11] = "December";
                   var now         = new Date();
                   var monthnumber = now.getMonth();
                   var monthnumber2 = monthnumber+1;
                   var monthday = '';
                   //place 0 before monthnumber if value <10 for mm/dd/yyyy format
                   if(monthnumber2 < 10){
                       monthnumber2='0'+monthnumber2;
                   }
                   var monthname   = months[monthnumber];
                   var monthday    = now.getDate();
                   //place 0 before day if <10 for mm/dd/yyyy format
                   if(monthday <10){
                    monthday='0'+monthday;
                 }
                   var year        = now.getYear();
                   if(year < 2000) { year = year + 1900; }
                   var dateString = monthname +
                                    ' ' +
                                    monthday +
                                    ', ' +
                                    year;
                   var dateStringShort = monthnumber2 + '/'+monthday+'/'+year;  // forcee mm/dd/yyyy format i.e., 01/01/2011
                                          
                   //return dateString;
                     return dateStringShort
                } // function getCalendarDate()
                
    function getCalendarDate2(dateObj)
                {
                   var months = new Array(13);
                   months[0]  = "January";
                   months[1]  = "February";
                   months[2]  = "March";
                   months[3]  = "April";
                   months[4]  = "May";
                   months[5]  = "June";
                   months[6]  = "July";
                   months[7]  = "August";
                   months[8]  = "September";
                   months[9]  = "October";
                   months[10] = "November";
                   months[11] = "December";
                   var now         = dateObj;
                   var monthnumber = now.getMonth();
                   var monthnumber2 = monthnumber+1;
                   var monthday = '';
                   //place 0 before monthnumber if value <10 for mm/dd/yyyy format
                   if(monthnumber2 < 10){
                       monthnumber2='0'+monthnumber2;
                   }
                   var monthname   = months[monthnumber];
                   var monthday    = now.getDate();
                   //place 0 before day if <10 for mm/dd/yyyy format
                   if(monthday <10){
                    monthday='0'+monthday;
                 }
                   var year        = now.getYear();
                   if(year < 2000) { year = year + 1900; }
                   var dateString = monthname +
                                    ' ' +
                                    monthday +
                                    ', ' +
                                    year;
                   var dateStringShort = monthnumber2 + '/'+monthday+'/'+year;  // forcee mm/dd/yyyy format i.e., 01/01/2011
                                          
                   //return dateString;
                     return dateStringShort
                } // function getCalendarDate() 
            
    //To calculate difference between two dates
    function datediff(fromDate,toDate,interval) { 
        /*
        * DateFormat month/day/year hh:mm:ss
        * ex.
        * datediff('01/01/2011 12:00:00','01/01/2011 13:30:00','seconds');
        */
        var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7; 
        fromDate = new Date(fromDate); 
        toDate = new Date(toDate); 
        var timediff = toDate - fromDate; 
        if (isNaN(timediff)) return NaN; 
        switch (interval) { 
            case "years": return toDate.getFullYear() - fromDate.getFullYear(); 
            case "months": return ( 
                ( toDate.getFullYear() * 12 + toDate.getMonth() ) - ( fromDate.getFullYear() * 12 + fromDate.getMonth() ) 
        ); 
        case "weeks" : return Math.floor(timediff / week); 
        case "days" : return Math.floor(timediff / day); 
        case "hours" : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute); 
        case "seconds": return Math.floor(timediff / second); 
        default: return undefined; 
        } 
    } 