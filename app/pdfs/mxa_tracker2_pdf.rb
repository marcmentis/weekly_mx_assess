class MxaTracker2Pdf < Prawn::Document
	def initialize(data)
		super()
		@data = data
		heading
		body
	end

	def heading		
		text "Past Management Assessments"
	end

	def body
		pat_demog = @data[:pat_demog]
		pat_assessments = @data[:pat_assessments]

		firstname = pat_demog[:firstname]
		lastname = pat_demog[:lastname]

		text ''+firstname+', '+lastname+''


		pat_assessments.each do |a|
			danger = a.danger_yn
			drugs_changed = a.drugs_last_changed

		
		text danger
		text drugs_changed
		end
		
	end
end