class MxaTracker2Pdf < Prawn::Document
	def initialize(data)
		super()
		@pat_demog = data[:pat_demog]
		@pat_assessments = data[:pat_assessments]
		heading
		body
	end

	def heading	
		# text "#{font_size.inspect}"	
		text "Past Management Assessments", style: :bold, align: :center
		move_down 20
	end

	def body
		# Variables
			font_size(10)
			span_width = 500
		# Get pat_demog variables

		# firstname = @pat_demog[:firstname]
		# lastname = @pat_demog[:lastname]
		name = ''+@pat_demog[:lastname]+' '+@pat_demog[:firstname]+''
		@pat_demog[:doa].blank? ? doa = "" : doa = @pat_demog[:doa].strftime("%F")
		doa4diff = doa.to_date

		text 'NAME: '+name+'    DOA: '+doa+'', style: :bold

		@pat_assessments.each do |a|
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
				text 'MEDS LAST CHANGED: '+a.drugs_last_changed+''
				if a.drugs_last_changed == '0-8Weeks'
						span(span_width, :position => :center) do
						text ''+a.drugs_change_why+''
					end
				elsif a.drugs_last_changed == 'Gt8Weeks'
					span(span_width, :position => :center) do
						text a.drugs_not_why
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