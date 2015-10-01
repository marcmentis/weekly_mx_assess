class MxaTracker3Pdf < Prawn::Document
	def initialize(data,search)
		super()
		@reasons = data
		@search = search
		heading
		body
	end

	def heading
		text '"'+@search+'"   Info extracted from Past Mx Assessments', style: :bold, align: :center
		move_down 20
	end

	def body
		# Variables
			font_size(10)
			span_width = 500
		# Get patient demographics
		pat1 = @reasons.first
		name = ''+pat1[:lastname]+' '+pat1[:firstname]+''
		pat1[:doa].blank? ? doa = '' : doa = pat1[:doa].strftime("%F")
		doa4diff = doa.to_date

		text 'NAME: '+name+'    DOA: '+doa+'', style: :bold

		@reasons.each do |a|
						# Get variables for current patient assessment
			a.meeting_date.blank? ? meeting_date = "" : meeting_date = a.meeting_date.strftime("%F")
			a.updated_at.blank? ? updated_at = "" : updated_at = a.updated_at.strftime("%F")
			a.pre_date.blank? ? pre_date = "" : pre_date = a.pre_date.strftime("%F")
			# Put days in hosp here
			meeting_date4diff = meeting_date.to_date
			days_in_hosp_integer = (meeting_date4diff - doa4diff).to_i
			days_in_hosp = days_in_hosp_integer.to_s


			


			move_down 10
			stroke_horizontal_rule
			pad_top(5) do
			 	text "MEETING DATE: "+meeting_date+"      DAYS In HOSP: <color rgb='ff0000'>"+days_in_hosp+"</color>", 
			 		inline_format: true
			end
			text "SAVED BY: "+a.updated_by+"   ON: "+updated_at+" "
				

			move_down 5
			text 'PATIENT DANGEROUS (Self/Others) IF IN APPROVED HOUSING: '+a.danger_yn+''

			if a.danger_yn == 'Y'
				if a.drugs_last_changed == '0-8Weeks' && @search == 'MedChange'
					text 'MEDS LAST CHANGED: '+a.drugs_last_changed+''
						span(span_width, :position => :center) do
						text ''+a.drugs_change_why+''
					end
				elsif a.drugs_last_changed == 'Gt8Weeks' && @search == 'MedNoChange'
					text 'MEDS LAST CHANGED: '+a.drugs_last_changed+''
					span(span_width, :position => :center) do
						text a.drugs_not_why
					end
				end

				if a.psychsoc_last_changed == '0-3Months' && @search == 'GroupChange'
					text 'PSYCHOSOCIAL LAST CHANGED: '+a.psychsoc_last_changed+''
						span(span_width, :position => :center) do
						text ''+a.psychsoc_change_why+''
					end
				elsif a.drugs_last_changed == 'Gt8Weeks' && @search == 'GroupNoChange'
					text 'PSYCHOSOCIAL LAST CHANGED: '+a.psychsoc_last_changed+''
					span(span_width, :position => :center) do
						text a.psychsoc_not_why
					end
				end
				
			elsif a.danger_yn == 'N'
				text 'Date set for Pre-Conference Meeting: '+a.pre_date_yesno+''
				if a.pre_date_yesno == 'Y'
					span(span_width, :position => :center) do
						text 'Date: '+pre_date+''
					end
				elsif a.pre_date_yesno == 'N'
					span(span_width, :position => :center) do
						text a.pre_date_no_why
					end
				end
			end
		end
	end
end