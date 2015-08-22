require 'rails_helper'

RSpec.describe "mx_assessments/edit", type: :view do
  before(:each) do
    @mx_assessment = assign(:mx_assessment, MxAssessment.create!())
  end

  it "renders the edit mx_assessment form" do
    render

    assert_select "form[action=?][method=?]", mx_assessment_path(@mx_assessment), "post" do
    end
  end
end
