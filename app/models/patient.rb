class Patient < ActiveRecord::Base
	validates :firstname, presence: true
	validates :lastname, presence: true
	validates :number, 
		uniqueness: true,
		presence: true

	scope :in_facility, -> (facility_id) {where('facility = :facility_id',{facility_id: facility_id})}
end
