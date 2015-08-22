class Patient < ActiveRecord::Base
	include Jqgridconcern
	has_many :mx_assessments, dependent: :destroy
	
	validates :firstname, presence: true
	validates :lastname, presence: true
	validates :identifier, 
		uniqueness: true,
		presence: true

	scope :in_facility, -> (facility_id) {where('facility = :facility_id',{facility_id: facility_id})}

	def get_jqGrid_obj(params, session_admin3)
		# ActiveRecord relations are lazy loaders and can be chained
	    # Therefore, sequental .where searches IF PARAM not zero will filter with an 'AND' relationship
	    # Database will not be hit (lazy loading) until data needed by app
	   session_admin3 ? (puts "SESSION_ADMIN3: truish") : (puts "SESSION_ADMIN3: false")
	    conditions = Patient.all 
	    conditions = conditions.where("facility = :facility", {facility: params[:facility]}) if params[:facility]!= '-1'
	    conditions = conditions.where("site = :site", {site: params[:site]}) if params[:site]!= '-1'
	    conditions = conditions.where("firstname LIKE ?", ''+params[:firstname]+'%') if params[:firstname]!= ''
	    conditions = conditions.where("lastname LIKE ?", ''+ params[:lastname]+'%') if params[:lastname]!= ''
	    conditions = conditions.where("identifier LIKE ?", ''+params[:identifier]+'%') if params[:identifier]!= ''
	    
	    return jqGrid_obj = create_jqGrid_obj(conditions, params)
	end

end
