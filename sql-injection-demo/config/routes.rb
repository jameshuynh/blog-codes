Rails.application.routes.draw do
  resources :books do
    collection do
      get :search
    end
  end
end
