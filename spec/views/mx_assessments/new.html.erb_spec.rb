require 'rails_helper'

RSpec.describe "mx_assessments/new", type: :view do
  before(:each) do
    assign(:mx_assessment, MxAssessment.new())
  end

  it "renders new mx_assessment form" do
    render

    assert_select "form[action=?][method=?]", mx_assessments_path, "post" do
    end
  end
end
