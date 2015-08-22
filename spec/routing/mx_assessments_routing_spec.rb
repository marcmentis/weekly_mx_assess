require "rails_helper"

RSpec.describe MxAssessmentsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/mx_assessments").to route_to("mx_assessments#index")
    end

    it "routes to #new" do
      expect(:get => "/mx_assessments/new").to route_to("mx_assessments#new")
    end

    it "routes to #show" do
      expect(:get => "/mx_assessments/1").to route_to("mx_assessments#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/mx_assessments/1/edit").to route_to("mx_assessments#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/mx_assessments").to route_to("mx_assessments#create")
    end

    it "routes to #update" do
      expect(:put => "/mx_assessments/1").to route_to("mx_assessments#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/mx_assessments/1").to route_to("mx_assessments#destroy", :id => "1")
    end

  end
end
