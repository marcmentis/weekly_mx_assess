class MxAssessmentsController < ApplicationController
  before_action :set_mx_assessment, only: [:show, :edit, :update, :destroy]
  # after_action :verify_authorized

  #GET /mxa_date_history/.json
  def date_history
    # byebug
    @date_history = MxAssessment.select(:meeting_date).distinct.joins(:patient)
                                .where(patients: {facility: session[:facility]})
                                .where(patients: {site: mx_assessment_params[:site]})
                                .order(meeting_date: :desc)
    # byebug
    # Need to convert the ActiveRecord Relation to an array
      # Oracle doesn't present meeting_date as a formatted string
      # Need to format meeting_date (can't do that in the @meeting_date relation)
      # Can do it in an array
    @date_history.to_a.map! {|meeting| meeting.meeting_date.strftime('%F')}
    # @date_history.to_a.map! do |meeting|
    #   unless meeting.meeting_date.blank?
    #     meeting.meeting_date.strftime('%F')
    #     # meeting.meeting_date.strftime('%m/%d/%Y')
    #   end
    # end
    respond_to do |format|
      format.json {render json: @date_history}
    end
  end

  #GET mxa_pat_lists.json
  def patient_lists
    # byebug
    facility = session[:facility]
    @all_lists = MxAssessment.get_pat_lists(mx_assessment_params, facility)

    # authorize MxAssessment
    respond_to do |format|
      format.json {render json: @all_lists}
    end
  end

  #GET mxa_pat_data.json
  def get_pat_data
    # byebug
    # pat_demog = Patient.find(params[:mx_assessment]['id']);
    pat_demog = Patient.find (params[:mx_assessment]['patient_id']);
    # @pat_data = {pat_demog: pat_demog}
    # Convert relation (array) to object
    # pat_demog = pat_demog.first;
    # doa = pat_demog.doa.strftime('%D');

    pat_assessments = MxAssessment.joins(:patient)
                                .where(patient_id: pat_demog)
                                  .order(meeting_date: :desc)

    # @pat_data = {pat_demog: pat_demog, doa: doa, pat_assessments: pat_assessments}
    @pat_data = {pat_demog: pat_demog, pat_assessments: pat_assessments}
  # byebug
    respond_to do |format|
      format.json {render json: @pat_data}
      format.pdf do
        d = DateTime.now()
        date_id = d.strftime("%F-%H-%M-%S")
        pdf = MxaTracker2Pdf.new(@pat_data)
        send_data pdf.render,
                    filename: "PastMxAssess-#{date_id}.pdf",
                    type: "application/pdf",
                    disposition: "inline" # "attachment"
      end
    end
  end

  # GET /mx_assessments
  # GET /mx_assessments.json
  def index
    @mx_assessments = MxAssessment.all
    authorize MxAssessment 
  end

  # GET /mx_assessments/1
  # GET /mx_assessments/1.json
  def show
  end

  # GET /mx_assessments/new
  def new
    @mx_assessment = MxAssessment.new
  end

  # GET /mx_assessments/1/edit
  def edit
  end

  # POST /mx_assessments
  # POST /mx_assessments.json
  def create
    @mx_assessment = MxAssessment.new(mx_assessment_params)
    # byebug

    respond_to do |format|
      if @mx_assessment.save
        # format.html { redirect_to @mx_assessment, notice: 'Mx assessment was successfully created.' }
        # format.json { render action: 'show', status: :created, location: @mx_assessment }
        format.json {head :no_content}
      else
        # format.html { render action: 'new' }
        format.json { render json: @mx_assessment.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mx_assessments/1
  # PATCH/PUT /mx_assessments/1.json
  def update
    respond_to do |format|
      if @mx_assessment.update(mx_assessment_params)
        format.html { redirect_to @mx_assessment, notice: 'Mx assessment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @mx_assessment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mx_assessments/1
  # DELETE /mx_assessments/1.json
  def destroy
    @mx_assessment.destroy
    respond_to do |format|
      format.html { redirect_to mx_assessments_url }
      format.json { head :no_content }
    end
  end


  # TRACKER
  # GET /mxa_tracker
  def tracker
    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mx_assessment
      @mx_assessment = MxAssessment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mx_assessment_params
      # params[:mx_assessment]
      params.require(:mx_assessment).permit(:danger_yn, :drugs_last_changed, 
                                            :drugs_not_why, :drugs_change_why, :psychsoc_last_changed,
                                            :psychsoc_not_why, :psychsoc_change_why, :meeting_date, :patient_id,
                                            :pre_date_yesno, :pre_date_no_why, :pre_date, :updated_by,
                                            :site, :new_date, :date_history)
    end
end
