class ForSelect < ActiveRecord::Base
	include Jqgridconcern
	resourcify

	def get_jqGrid_obj(params, session_admin3)
		conditions = ForSelect.all
	    conditions = conditions.where("facility = :facility", {facility: params[:facility]}) if params[:facility]!= '-1'
	    conditions = conditions.where("code LIKE ?", ''+params[:code]+'%') if params[:code]!= ''
	    conditions = conditions.where("value LIKE ?", ''+params[:value]+'%') if params[:value]!= ''
	    conditions = conditions.where("text LIKE ?", ''+params[:text]+'%') if params[:text]!= ''
	    conditions = conditions.where("grouper LIKE ?", ''+params[:grouper]+'%') if params[:grouper]!= ''
	    conditions = conditions.where("option_order LIKE ?", ''+params[:option_order]+'%') if params[:option_order]!= ''
		return jqGrid_obj = create_jqGrid_obj(conditions, params)
	end
end
