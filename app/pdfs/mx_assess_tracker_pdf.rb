class MxAssessTrackerPdf < Prawn::Document
	def initialize(data)
		super()
		@data = data

		heading
		# table(fill_table)
		create_table
		
	end

	def heading
		text "some heading"
	end
	def create_table
		table(fill_table,
				:cell_style => {:size => 10}
			  ) do |t|
			t.cells.border_width = 1
			t.before_rendering_page do |page|
				page.row(0).border_top_width = 3
				page.row(0).border_bottom_width = 2
				page.row(-1).border_bottom_width = 3
				page.column(0).border_left_width = 3
				page.column(-1).border_right_width = 3

				# page.row(0).font_style = :bold
			end
			t.header = true
			t.row(0).font_style = :bold
			t.column(2..10).align = :center
			t.row_colors = ["DDDDDD", "FFFFFF"]
			# t.width = 1000
			
		end
	end
	def fill_table
		 # rows = [["first", "second"],["third", "fourth"]]
		attributes = %w{firstname lastname identifier site doa meeting_date danger_yn drugs_last_changed psychsoc_last_changed pre_date_yesno pre_date}
		rows = []
		rows << attributes
		@data.each do |row|	
			row.doa.blank? ? doa = "" : doa = row.doa.strftime("%F")
			row.meeting_date.blank? ? meeting_date = "" : meeting_date = row.meeting_date.strftime("%F")
			row.pre_date.blank? ? pre_date = "" : pre_date = row.pre_date.strftime("%F")
			rows << [row.firstname, row.lastname, row.identifier, row.site, doa, meeting_date, row.danger_yn, row.drugs_last_changed, row.psychsoc_last_changed, row.pre_date_yesno, pre_date]
			end
		return rows	
	end
end