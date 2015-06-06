class RolesController < ApplicationController
  include JqgridHelper
  before_action :set_user, only: [:destroy]

  # GET /roles/
  def all_roles
    @roles = Role.all.order('name')
    respond_to do |format|
      format.json {render json: @roles}
    end
  end

  # GET /roles_users/.json
  def all_users
  	role = Role.find_by(name: params[:name])
  	@role_users = role.users.order('lastname')
  	respond_to do |format|
  		format.json {render json: @role_users}
  	end
  end

  # DELETE /roles/1.json
  def destroy
    @role.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @role = Role.find(params[:id])
    end

end