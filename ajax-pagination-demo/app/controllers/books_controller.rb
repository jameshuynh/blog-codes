class BooksController < ApplicationController
  def index
    @books = Book.page(params[:page] || 1).per(5)
    if request.xhr?
      render action: :index, layout: false
    else
      render action: :index
    end
  end
end
