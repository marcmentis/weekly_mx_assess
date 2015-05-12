class ForSelectsController < ApplicationController
  before_action :set_for_select, only: [:show, :edit, :update, :destroy]
  before_action :check_session
  # after_action :verify_authorized
  # def pundit_user
  #   current_user
  # end


  # GET /for_selects
  # GET /for_selects.json
  def index
    # byebug
    # reset_session
    # if current_user == 'pgmdmjm'
    # # if session[:authen] == 'pgmdmjm'
    #   flash[:notice] = "Yes: #{session[:authen]}"
    # else
    #   flash[:notice] = 'no current user not known'
    # end

    # authorize ForSelect
    @for_selects = ForSelect.all
  end

  def options_search
    options = ForSelect.all
    options = options.where("code = :code", {code: params[:code]}) if params[:code]!=''
    # options = options.where("grouper = :grouper",{grouper: params[:grouper]}) if params[:grouper]!=''
    options = options.order("option_order")

    @options = options
    respond_to do |format|
      format.html
      format.json {render json: @options }
    end
  end

  # GET /for_selects/1
  # GET /for_selects/1.json
  def show
  end

  # GET /for_selects/new
  def new
    @for_select = ForSelect.new
  end

  # GET /for_selects/1/edit
  def edit
  end

  # POST /for_selects
  # POST /for_selects.json
  def create
    @for_select = ForSelect.new(for_select_params)

    respond_to do |format|
      if @for_select.save
        format.html { redirect_to @for_select, notice: 'For select was successfully created.' }
        format.json { render action: 'show', status: :created, location: @for_select }
      else
        format.html { render action: 'new' }
        format.json { render json: @for_select.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /for_selects/1
  # PATCH/PUT /for_selects/1.json
  def update
    respond_to do |format|
      if @for_select.update(for_select_params)
        format.html { redirect_to @for_select, notice: 'For select was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @for_select.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /for_selects/1
  # DELETE /for_selects/1.json
  def destroy
    @for_select.destroy
    respond_to do |format|
      format.html { redirect_to for_selects_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_for_select
      @for_select = ForSelect.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def for_select_params
      params.require(:for_select).permit(:code, :value, :text, :grouper, :option_order, :facility, :code)
    end
end
