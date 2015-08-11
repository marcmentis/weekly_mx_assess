require 'rails_helper'

RSpec.describe "mx_assessments/show", type: :view do
  before(:each) do
    @mx_assessment = assign(:mx_assessment, MxAssessment.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
