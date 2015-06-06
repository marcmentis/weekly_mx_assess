require 'rails_helper'

RSpec.describe Patient, type: :model  do
	let(:patient) {FactoryGirl.build(:patient)}
	# subject {:patient}

	describe "#has Attributes:" do
		it 'first name' do
			expect(patient.firstname).to eq('Abe')
		end
		it "last name" do
			expect(patient.lastname).to eq('Abelson')
		end
		it "number" do
			expect(patient.number).to eq('8789654')
		end
		it "facility" do
			expect(patient.facility).to eq('0013')
		end
		it "ward" do
			expect(patient.ward).to eq('81/101')
		end
	end
	
	describe "#is Invalid:" do
		let(:patient_duplicate) {FactoryGirl.build(:patient)}
		it "without first name" do
			patient.firstname = nil
			expect(patient).to_not be_valid
		end
		it "without last name" do
			patient.lastname = nil
			expect(patient).to_not be_valid
		end
		it "without number" do
			patient.number = nil
			expect(patient).to_not be_valid
		end
		it "if number not unique" do
			patient.save
			# Only number is the same (must be better way)
			patient_duplicate.firstname = "Jane"
			patient_duplicate.lastname = "Doe"
			patient_duplicate.facility = "0011"
			patient_duplicate.ward = "81/102"
			expect(patient_duplicate.save).to be_falsey
		end
	end

	describe "#has scopes:" do
		describe "#to filter by facility" do
			it "returns no patients with non-existent facility" do
				patient.save
				facility_id = '0018'
				expect(Patient.in_facility(facility_id).count).to eq 0
			end	
			it "returns patients with correct facility" do
				patient.save
				facility_id = '0013'
				expect(Patient.in_facility(facility_id).count).to eq 1
			end	
		end
	end

	

end