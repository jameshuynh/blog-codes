Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  get 'books', controller: :books, action: :index
  get 'books/download'
end
