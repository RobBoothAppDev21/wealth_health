class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @users = User.all
  end

  def show
    configuration = Plaid::Configuration.new
    configuration.server_index = Plaid::Configuration::Environment["sandbox"]
    configuration.api_key["PLAID-CLIENT-ID"] = Rails.application.credentials.dig(:plaid, :client_id)
    configuration.api_key["PLAID-SECRET"] = Rails.application.credentials.dig(:plaid, :sandbox_key)
  
    api_client = Plaid::ApiClient.new(
      configuration
    )
  
    client = Plaid::PlaidApi.new(api_client)

    @user = User.find_by_id(params[:id])

    # user = User.find_by!(email: '***')
    client_user_id = @user.id

    # Create the link_token with all of your configurations
    link_token_create_request = Plaid::LinkTokenCreateRequest.new({
      :user => { :client_user_id => client_user_id.to_s },
      :client_name => 'My app',
      :products => %w[auth transactions],
      :country_codes => ['US'],
      :language => 'en'
    })

    link_token_response = client.link_token_create(
      link_token_create_request
    )

    # Pass the result to your client-side app to initialize Link
    #  and retrieve a public_token
    @link_token = link_token_response

    request = Plaid::ItemPublicTokenExchangeRequest.new
    # request.public_token = public_token

    # response = client.item_public_token_exchange(request)
    # access_token = response.access_token
  end
end
