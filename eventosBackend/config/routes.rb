Rails.application.routes.draw do
  resources :invitations
  resources :participants
  resources :evendates
  resources :events
  resources :users
  resources :authentications
  resources :categories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
