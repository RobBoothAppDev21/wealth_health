Rails.application.routes.draw do
  root 'public#index'
  
  devise_for :users
  
  match '/users', to: 'users#index', via: 'get'
  match '/users/:id', to: 'users#show', via: 'get', as: 'user'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
