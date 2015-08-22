class UsersController < ApplicationController

  before_action :set_user, only: [:show, :edit, :update, :destroy, :user_roles, :add_role, :remove_role]

  # GET /users
  # GET /users.json
  def index
    # @users = User.all
    # if params[:page] != nil
    #   total_query_count = User.all.count     
    #   # Run query and extract just those rows needed
    #   extract = User.order("#{params[:sidx]} #{params[:sord]}")
    #                 .limit(params[:rows].to_i)
    #                 .offset((params[:page].to_i - 1) * params[:rows].to_i)
    #   # Create jqGrid object from 'extract' data
    #   @jqGrid_obj = create_jqGrid_obj(extract, params, total_query_count)
    # end

    # respond_to do |format|
    #   format.html
    #   format.json {render json: @jqGrid_obj }
    # end
  end

  # GET /users_search.json
  def complex_search
    user = User.new
    @jqGrid_obj = user.get_jqGrid_obj(params, session[:admin3])

    respond_to do |format|
      format.html
      format.json {render json: @jqGrid_obj }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { head :no_content}
      else
        format.html { render action: 'new' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  # USER-ROLE RELATIONSHIP
  # GET/users/1.json
  def user_roles
    @user_roles = @user.roles.order('name')
    respond_to do |format|
      format.json {render json: @user_roles }
    end
  end

  # POST /users_add_role/1.json
  def add_role
    role_name = params[:user][:role_name]
    @user.add_role ''+role_name+''
    respond_to do |format|
      format.json {render json: @user}
    end
  end

  # DELETE /users_remove_role/1.json
  def remove_role
    role_name = params[:user][:role_name]
    @user.remove_role ''+role_name+''
    respond_to do |format|
      format.json {render json: @user}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:firstname, :lastname, :authen, :facility, :email, :firstinitial, :middleinitial, :updated_by, :facility)
    end
end
