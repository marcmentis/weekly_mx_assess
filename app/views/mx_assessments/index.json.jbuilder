json.array!(@mx_assessments) do |mx_assessment|
  json.extract! mx_assessment, :id,
  json.url mx_assessment_url(mx_assessment, format: :json)
end


