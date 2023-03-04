Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]

    resources :servers, only: [:index, :show, :create, :update, :destroy] do
      resources :channels, only: [:index, :create] do
        resources :messages, only: [:index]
      end
    end

    resources :channels, only: [:update, :show, :destroy]
    resources :server_subscriptions, only: [:create, :destroy]
    resources :messages, only: [:show, :create, :update, :destroy]
    resources :friends, only: [:index, :create, :update, :destroy]
  end
  get "*path", to: "static_pages#frontend_index"
end
