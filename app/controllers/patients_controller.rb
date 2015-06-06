class PatientsController < ApplicationController
  include JqgridHelper
  before_action :set_patient, only: [:show, :edit, :update, :destroy]
  after_action :create_phi, only: [:create]
  after_action :show_phi, only: [:index, :complex_search, :show]
  after_action :update_phi, only: [:update]
  after_action :destroy_phi, only: [:destroy]

  # GET /patients
  # GET /patients.json
  def index
    # @patients = Patient.all
    # if params[:page] != nil
    #   total_query_count = Patient.all.count     
    #   # Run query and extract just those rows needed
    #   extract = Patient.order("#{params[:sidx]} #{params[:sord]}")
    #                     .limit(params[:rows].to_i)
    #                     .offset((params[:page].to_i - 1) * params[:rows].to_i)
    #   # Create jsGrid object from 'extract' data
    #   @jsGrid_obj = create_jsGrid_obj(extract, params, total_query_count)
    # end

    # respond_to do |format|
    #   format.html
    #   format.json {render json: @jsGrid_obj }
    # end
  end

  def complex_search
    # ActiveRecord relations are lazy loaders and can be chained
    # Therefore, sequental .where searches IF PARAM not zero will filter with an 'AND' relationship
    # Database will not be hit (lazy loading) until data needed by app
    conditions = Patient.all 
    conditions = conditions.where("facility = :facility", {facility: params[:facility]}) if params[:facility]!= '-1'
    conditions = conditions.where("firstname = :firstname", {firstname: params[:firstname]}) if params[:firstname]!= ''
    conditions = conditions.where("lastname = :lastname", {lastname: params[:lastname]}) if params[:lastname]!= ''
    conditions = conditions.where("number = :number", {number: params[:number]}) if params[:number]!= ''
    conditions = conditions.where("ward = :ward", {ward: params[:ward]}) if params[:ward]!= '-1'


    # total_query = Patient.where("facility = :facility", {facility: params[:diagnosis]}
                            # ).where("firstname = :firstname", {firstname: params[:first_name]});
    total_query = conditions
    total_query_count = total_query.count

# Run query and extract just those rows needed
      extract = conditions
                    .order("#{params[:sidx]} #{params[:sord]}")
                    .limit(params[:rows].to_i)
                    .offset((params[:page].to_i - 1) * params[:rows].to_i)
      @jsGrid_obj = create_jsGrid_obj(extract, params, total_query_count)
    respond_to do |format|
      format.html
      format.json {render json: @jsGrid_obj }
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      @patient = Patient.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def patient_params
      params.require(:patient).permit(:firstname, :lastname, :number, :facility, :ward, :doa, :dob, :dod, :updated_by, :facility, :ward)
    end

    def create_phi
      puts "IN CREATE_PHI CONTROLLER"
            # AURORA
    #Accessauditlog.find_by_sql("INSERT INTO AURORA.ACCESSAUDITLOG(ACCESS_DT,ACTION_CD,WORKSTATION_ID)VALUES(TO_DATE('1/14/2015 4:23:42 PM', 'MM/DD/YYYY HH:MI:SS PM'),'LO','10.76.232.152');")
    # aurora = Accessauditlog.where(action_cd: 'LO')
    # aurora1 = Accessauditlog.create(access_dt: DateTime.now, action_cd: 'LO', workstation_id: '10.76.232.152')
    end
    def show_phi
      puts "IN SHOW PHI FROM CONTROLLER authen: #{session[:authen]}"
    end
    def update_phi
      puts "IN UPDATE PHI FROM CONTROLLER"
    end
    def destroy_phi
      puts "IN DESTROY PHI FROM CONTROLLER"
    end
end
