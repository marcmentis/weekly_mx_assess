# Create data for patients
namespace :db do
	desc "Fill database with sample data "
	task populate: :environment do
		100.times do |n|
			firstname = Faker::Name.first_name
			lastname = Faker::Name.last_name
			identifier = Faker::Number.number(7)
			doa = Faker::Business.credit_card_expiry_date
			dod = Faker::Business.credit_card_expiry_date
			dob = Faker::Business.credit_card_expiry_date
			updated_by = Faker::Name.first_name


			Patient.create!(firstname: firstname,
						lastname: lastname,
						identifier: identifier,
						facility: '0013',
						site: '81/101',
						doa: doa,
						dod: dod,
						dob: dob,
						updated_by: updated_by)

		end
		100.times do |n|
			firstname = Faker::Name.first_name
			lastname = Faker::Name.last_name
			identifier = Faker::Number.number(7)
			doa = Faker::Business.credit_card_expiry_date
			dod = Faker::Business.credit_card_expiry_date
			dob = Faker::Business.credit_card_expiry_date
			updated_by = Faker::Name.first_name


			Patient.create!(firstname: firstname,
						lastname: lastname,
						identifier: identifier,
						facility: '0013',
						site: '81/102',
						doa: doa,
						dod: dod,
						dob: dob,
						updated_by: updated_by)
			
		end
		100.times do |n|
			firstname = Faker::Name.first_name
			lastname = Faker::Name.last_name
			identifier = Faker::Number.number(7)
			doa = Faker::Business.credit_card_expiry_date
			dod = Faker::Business.credit_card_expiry_date
			dob = Faker::Business.credit_card_expiry_date
			updated_by = Faker::Name.first_name


			Patient.create!(firstname: firstname,
						lastname: lastname,
						identifier: identifier,
						facility: '0025',
						site: 'E-unit',
						doa: doa,
						dod: dod,
						dob: dob,
						updated_by: updated_by)
			
		end
	end
end