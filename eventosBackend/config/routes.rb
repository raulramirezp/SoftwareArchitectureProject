Rails.application.routes.draw do
  # resources :friendships
  # resources :relationships
  # resources :users
  resources :categories
  # resources :invitations
  resources :participants
  # resources :events
  resources :authentications

  resources :users do
    collection do
      get 'search', to: "users#search"
      get 'searchfriend', to: "users#search_friend"
    end
  end

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
      get 'friends_of', to: "friendship#friends_of"
    end
  end
  resources :invitations, only: [:create, :index] do
    collection do
      get 'acept/:id', to: "invitations#acept"
      get 'decline/:id', to: "invitations#decline"
      get 'eventsrequest', to: "invitations#eventRequests"
      post 'removeinvitation', to: "invitations#destroy_with_params"
    end
  end
  resources :events do
    collection do
      get 'find_coincidences', to: "events#find_coincidences"
      get 'followevents', to: "events#follow_events"
      get 'myevents', to: "events#my_events"
      get ':id/assistants', to: "events#my_assistants"
      get ':id/inviteds', to: "events#inviteds"
      post 'removefromevent', to: "events#remove_from_event"
    end
  end
  post 'esb', to: "webservice#check_operation"
  wash_out :webservice
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
