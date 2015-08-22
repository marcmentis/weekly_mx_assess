require 'rails_helper'

RSpec.describe "mx_assessments/index", type: :view do
  before(:each) do
    assign(:mx_assessments, [
      MxAssessment.create!(),
      MxAssessment.create!()
    ])
  end

  it "renders a list of mx_assessments" do
    render
  end
end
