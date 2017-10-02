Rails.application.routes.draw do
  # resources :friendships
  # resources :relationships
  resources :eventdates
  resources :users
  resources :categories
  resources :invitations
  resources :participants
  resources :evendates
  resources :events
  resources :authentications

  get 'prueba/index'

    scope :format => true, :constraints => { :format => 'json' } do
      post   "/login"       => "sessions#create"
      delete "/logout"      => "sessions#destroy"
    end

  resources :relationships, only: [] do
    collection do
      get 'invite/:id', to: "relationships#invite"
      get 'acept/:id', to: "relationships#acept"
      get 'decline/:id', to: "relationships#decline"
      get 'requests', to: "relationships#requests"
      get 'invited', to: "relationships#invited"
    end
  end
  resources :friendships, only: [] do
    collection do
      get 'remove/:id', to: "friendships#remove"
      get 'friends', to: "friendships#friends"
      get 'friends_names', to: "friendships#friends_names"
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
