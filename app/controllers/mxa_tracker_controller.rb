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

  # GET /mxa_tracker_search_all/
  def complex_search_all
    mxa = MxAssessment.new
    mxaw = mxa.get_mxaw_tracker(params)
    d = DateTime.now()
    date_id = d.strftime("%F-%H-%M-%S")

    respond_to do |format|
      format.csv {send_data mxa.complex_search_all_to_csv(mxaw), filename: "mxaw-#{Date.today}.csv" } 
      format.pdf do
        pdf = MxaTrackerPdf.new(mxaw)      
        send_data pdf.render, 
                      filename: "mxaw-#{date_id}.pdf",
                      type: "application/pdf",
                      disposition: "attachment"  # inline 
      end
    end
  end

  

  # GET /mxa_tracker_get_reasons/:id
  def get_reasons
    mxassessment = MxAssessment.new
    @reasons = mxassessment.get_mxaw_reasons_from_notes(params)
    d = DateTime.now()
    date_id = d.strftime("%F-%H-%M-%S")

    respond_to do |format|
      format.json {render json: @reasons}
      format.pdf do
        pdf = MxaTracker3Pdf.new(@reasons, params[:reason])
        send_data pdf.render,
                      filename: "reasons-#{date_id}.pdf",
                      type: "application/pdf",
                      disposition: "inline"
      end
    end
  end
end
