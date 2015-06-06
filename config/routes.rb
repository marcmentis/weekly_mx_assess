Rollify::Application.routes.draw do
  get "static_pages/home"
  resources :patients
  resources :users
  resources :for_selects
  get "widgets" => 'widgets#index'

  get '/patients_search' => 'patients#complex_search', as: :complex_search_patients
  get '/for_selects_options_search' => 'for_selects#options_search', as: :options_search
  get '/for_selects_search' => 'for_selects#complex_search', as: :complex_search_for_selects
  get '/users_search' => 'users#complex_search', as: :complex_search_users
  get '/users_roles/:id' => 'users#user_roles', as: :user_roles
  post '/users_add_role/:id' => 'users#add_role', as: :add_role
  delete '/users_remove_role/:id' => 'users#remove_role', as: :remove_role
  get '/roles' => 'roles#all_roles', as: :all_roles
  get '/roles_users/' => 'roles#all_users', as: :all_users

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
root 'static_pages#home'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
