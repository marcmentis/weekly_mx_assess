class MxaTrackerController < ApplicationController
  def index
  	
  end

  # GET /mxa_tracker_search/
  def complex_search
  	mxassessment = MxAssessment.new
  	@mxaw_jqGrid_obj = mxassessment.get_mxaw_jqGrid_obj(params)

  	respond_to do |format|
      format.json {render json: @mxaw_jqGrid_obj }
    end
  end
end
