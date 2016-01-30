class BooksController < ApplicationController
  def index
    @books = Book.page(params[:page] || 1).per(4)
    # ajax request will result in request.xhr? not nil 
    # layout will be true if request is not an ajax request
    render action: :index, layout: request.xhr? == nil 
  end
end
