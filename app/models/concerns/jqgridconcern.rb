module Jqgridconcern
	# extend ActiveSupport::Concern

	def create_jqGrid_obj(active_record_relation, params)

		total_query = active_record_relation
	    total_query_count = total_query.count

		# Run query and extract just those rows needed
	      extract = active_record_relation
	                    .order("#{params[:sidx]} #{params[:sord]}")
	                    .limit(params[:rows].to_i)
	                    .offset((params[:page].to_i - 1) * params[:rows].to_i)
			# total pages needed for all records
			total_pages = (total_query_count/params[:rows].to_f).ceil  
			# Create the 'rows' array containing the actual data (hash of 'id', and 'cell')
			rows = extract.map {|r| rows = {"id" => r.id, "cell" => r} }
			# Create the return json object
			jqGrid_obj = { "total" => total_pages, 
			                "page" => params[:page].to_i, 
			                "records" => total_query_count,
			                "rows" => rows
			              }
			return jqGrid_obj
	end
end