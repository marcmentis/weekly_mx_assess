require 'rails_helper'

RSpec.describe User, type: :model do
	# before(:each) do
	# 	@user = FactoryGirl.build(:user)
	# end
	let(:user) {FactoryGirl.create(:user)}

	describe "#has Attributes" do
		it "first name" do
			expect(user.firstname).to eq("Abe")
		end
		it "last name" do
			expect(user.lastname).to eq("Ableson")
		end
		it "authen" do
			expect(user.authen).to eq("pgmdmjm")
		end
		it "facility" do
			expect(user.facility).to eq("0013")
		end
		it "email" do
			expect(user.email).to eq("name@somewhere.com")
		end
		it "first initial" do
			expect(user.firstinitial).to eq("A")
		end
		it "middle initial" do
			expect(user.middleinitial).to eq("B")
		end
		it "updated by" do
			expect(user.updated_by).to eq("James")
		end
	end

end