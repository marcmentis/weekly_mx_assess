json.array!(@patients) do |patient|
  json.extract! patient, :id, :firstname, :lastname, :identifier, :facility, :site, :doa, :dob, :dod, :updated_by
  json.url patient_url(patient, format: :json)
end
