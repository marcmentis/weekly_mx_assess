require 'rails_helper'

RSpec.describe "MxAssessments", type: :request do
  describe "GET /mx_assessments" do
    it "works! (now write some real specs)" do
      get mx_assessments_path
      expect(response).to have_http_status(200)
    end
  end
end
