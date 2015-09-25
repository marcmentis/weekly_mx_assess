class WidgetsController < ApplicationController
  def index
  	@request = request
    @response = response

    authorize :widget, :index?
  end
end
