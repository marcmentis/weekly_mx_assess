class MxaTracker2Pdf < Prawn::Document
	def initialize(data)
		super()
		@data = data
		heading
	end

	def heading
		firstname = @data[:pat_demog][:firstname]
		text firstname
	end
end