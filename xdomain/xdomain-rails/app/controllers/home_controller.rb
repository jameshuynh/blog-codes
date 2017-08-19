class HomeController < ApplicationController
  def welcome
    render json: { content: 'Welcome to my site' }
  end
end
