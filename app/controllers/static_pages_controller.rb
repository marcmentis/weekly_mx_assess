class StaticPagesController < ApplicationController
	  before_action :check_rsa_authorization
  def home
  end
end
