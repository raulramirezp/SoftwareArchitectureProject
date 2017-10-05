class SessionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    if user = User.valid_login?(params[:email], params[:password])
    	allow_token_to_be_used_only_once_for(user)
    	send_auth_token_for_valid_login_of(user)

    else
      	render_unauthorized("Error with your login or password")
    end
  end

  def destroy
    logout(current_user)
    head :ok
  end

  private

  def send_auth_token_for_valid_login_of(user)
    # render json: { user: user }
   	render json: { id: user.id, name: user.name, lastname: user.lastname,
      nickname: user.nickname, birthdate: user.birthdate, mail: user.email, token: user.authentication.token }
  end

  def allow_token_to_be_used_only_once_for(user)
    user.authentication.regenerate_token
  end

  def logout(user)
    user.authentication.regenerate_token
  end
end
