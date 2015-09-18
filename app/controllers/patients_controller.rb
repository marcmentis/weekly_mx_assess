class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :edit, :update, :destroy]
  after_action :create_phi, only: [:create]
  after_action :show_phi, only: [:complex_search, :show, :patients_site_search]
  after_action :update_phi, only: [:update]
  after_action :destroy_phi, only: [:destroy]
  


  # GET /patients
  # GET /patients.json
  def index
    # puts "IN INDEX ACTION"
    # params = {facility: '-1', site: '-1', firstname: '', lastname: '', identifier: ''}
    # patient = Patient.new
    # @jqGrid_obj = patient.get_jqGrid_obj(params, session[:admin3])

    # respond_to do |format|
    #   format.html
    #   format.json {render json: @jqGrid_obj }
    # end
  end

  # GET /patients_search
  def complex_search

    # Get instance of Patient so can run instance method 'get_jqGrid_obj'
    patient = Patient.new
    @jqGrid_obj = patient.get_jqGrid_obj(params, session[:admin3])
    
    respond_to do |format|
      format.html
      format.json {render json: @jqGrid_obj }
    end
  end

  # GET /patients/1
  # GET /patients/1.json
  def show
  end

  # GET /patients/new
  def new
    @patient = Patient.new
  end

  # GET /patients/1/edit
  def edit
  end

  # POST /patients
  # POST /patients.json
  def create
    @patient = Patient.new(patient_params)

    respond_to do |format|
      if @patient.save
        format.html { redirect_to @patient, notice: 'Patient was successfully created.' }
        format.json { head :no_content}
      else
        format.html { render action: 'new' }
        format.json { render json: @patient.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /patients/1
  # PATCH/PUT /patients/1.json
  def update
    # byebug
    respond_to do |format|
      if @patient.update(patient_params)
        format.html { redirect_to @patient, notice: 'Patient was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @patient.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patients/1
  # DELETE /patients/1.json
  def destroy
    @patient.destroy
    respond_to do |format|
      format.html { redirect_to patients_url }
      format.json { head :no_content }
    end
  end


  # GET /patients_site_search.json
  def patients_site_search

    # Get instance of Patient so can run instance method 'get_jqGrid_obj'
    @patients = Patient.new
    @patients = Patient.select(:id, :firstname, :lastname)
                       .where("site = :site",{site: params[:site]})
                       .order(lastname: :asc)
    respond_to do |format|
      # format.html
      format.json {render json: @patients }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      @patient = Patient.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def patient_params
      params.require(:patient).permit(:firstname, :lastname, :identifier, :facility, :site, :doa, :dob, :dod, :updated_by)
    end

    
    def create_phi
      accessauditlog_entry('I', 6387)
    end
    def show_phi
      accessauditlog_entry('S', 6387)
    end
    def update_phi
      accessauditlog_entry('U', 6387)
    end
    def destroy_phi

      accessauditlog_entry('D', 6387)
    end

end
