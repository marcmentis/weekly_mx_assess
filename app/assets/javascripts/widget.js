$(function(){
if ($('body.widgets').length) {

	//Style
		$('#widgetPageWrapper').addClass('pad_3_sides');

	//button
		$('[id^=bt]').button().addClass('reduce_button')
		$('#lastname').addClass('input_field')
				$('#bEdit').click(function(){
					alert('from alert')
				});
	//dates
		$('[id^=dt]').datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: "-100: +10"
		}).addClass('texts').css({'width':'7em'});

	//dialog
		$('[id^=dbx]').hide();
		$('#btModalDialog').click(function(){
			$('#dbxModalDialog').dialog({
				modal: true, 
				buttons: {
			        Ok: function() {
			          $( this ).dialog( "close" );
			        }
		      }
		    });
		});
		$('#btDialogConfirm').click(function(){
			$('#dbxDialogConfirm').dialog({
				resizable: false,
				height:240,
				modal: true,
				buttons: {
					"Delete all items": function(){
						$(this).dialog('close');
					},
					Cancel: function(){
						$(this).dialog('close')
					}
				}
			});
	});

	//select
		$('#sltSelect1').addClass('selects');

	//input-text
		$('#txbText1').addClass('texts').css({'width':'100px'})

	//textarea
		$('#txaTextArea1').addClass('texts').css({'cols':'30','rows':'10'})

	//labels
		$('[id^=lbl]').addClass('labels');

	//form
		$('#fForm1').addClass('form_container');
		$('#btnSubmit').addClass('submit-button').hide();
		// Treat the select specially
		// Use the hidden submit button to submit whole form
			//Use event 'e' to prevent non-ajax submit
		$('#btnSubmit').click(function(e){
			alert('click and nothing else');
			e.preventDefault();
		});

};
});
