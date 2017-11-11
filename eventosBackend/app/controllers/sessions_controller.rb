require 'net/ldap'
class SessionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    # Con LDAP
    # if create_ldap()
    #   if user = User.valid_login?(params[:email], params[:password])
    #     allow_token_to_be_used_only_once_for(user)
    #    send_auth_token_for_valid_login_of(user)
    #   else
    #     render_unauthorized("credenciales")
    #   end
    # else
    #   render_unauthorized("LDAP")
    # end
    # Sin LDAP
    if user = User.valid_login?(params[:email], params[:password])
      allow_token_to_be_used_only_once_for(user)
      send_auth_token_for_valid_login_of(user)
    else
      render_unauthorized("credenciales")
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

  def connect
      ldap = Net::LDAP.new(
        host: '192.168.1.7',
        port: 389,
        auth: {
          method: :simple,
          dn: "cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co",
          password: "admin"
        }
      )
      return ldap.bind
    end

    def create_ldap
      email = params[:email]
      password = params[:password]
      email = email[/\A\w+/].downcase
      if connect()
        ldap = Net::LDAP.new(
          host: '192.168.1.7',
          port: 389,
          auth: {
            method: :simple,
            dn: "cn=" + email + "@unal.edu.co,ou=Games,dc=arqsoft,dc=unal,dc=edu,dc=co",
            password: password
          }
        )
        if ldap.bind
          true
        else
          false
        end
      end
    end

end
