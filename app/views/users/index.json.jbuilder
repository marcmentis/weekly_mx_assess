json.array!(@users) do |user|
  json.extract! user, :id, :firstname, :lastname, :authen, :email, :firstinitial, :middleinitial, :updated_by
  json.url user_url(user, format: :json)
end
