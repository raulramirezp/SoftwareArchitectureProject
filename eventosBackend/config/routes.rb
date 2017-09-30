Rails.application.routes.draw do
  resources :friendships
  resources :relationships
  resources :eventdates
  resources :users
  resources :categories
  resources :invitations
  resources :participants
  resources :evendates
  resources :events
  resources :authentications
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
