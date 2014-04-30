Ticketie::Application.routes.draw do
  devise_for :users
  root :to => 'home#index'
  
  
  namespace :api do
    devise_for :users
    post 'authenticate_auth_token', :to => 'sessions#authenticate_auth_token', :as => :authenticate_auth_token 
    put 'update_password' , :to => "passwords#update" , :as => :update_password
    get 'search_role' => 'roles#search', :as => :search_role, :method => :get
    get 'search_user' => 'app_users#search', :as => :search_user, :method => :get
    get 'search_job_code' => 'job_codes#search', :as => :search_job_code, :method => :get
    
    resources :app_users
    resources :job_codes 
    resources :employees 
    
    resources :jobs
    resources :drafts
    resources :job_summaries
    
  end
  
  
end
