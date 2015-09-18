class MxaTrackerController < ApplicationController
  def index
  	
    authorize :mxa_tracker, :index?
  end

  # GET /mxa_tracker_search/
  def complex_search
  	mxassessment = MxAssessment.new
  	@mxaw_jqGrid_obj = mxassessment.get_mxaw_jqGrid_obj(params)

  	respond_to do |format|
      format.json {render json: @mxaw_jqGrid_obj }
    end
  end

  # GET /mxa_tracker_get_reasons/:id
  def get_reasons
    mxassessment = MxAssessment.new
    @reasons = mxassessment.get_mxaw_reasons_from_notes(params)

    respond_to do |format|
      format.json {render json: @reasons}
    end
  end
end
