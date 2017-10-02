class ApiController < ActionController::Base
  def require_login
    authenticate_token || render_unauthorized("Access denied")
  end

  def current_user
    @current_user = User.find(request.headers["currentUser"].to_i)
    @current_user ||= User.find(authenticate_token.user_id)
  end

  protected

  def render_unauthorized(message)
    errors = { errors: [ { detail: message } ] }
    render json: errors, status: :unauthorized
  end

  private

  def authenticate_token
    authenticate_with_http_token do |token, options|
      Authentication.includes(:user).find_by(token: token)
    end
  end
end
