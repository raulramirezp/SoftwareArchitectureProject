if [[ $1 == '' ]]; then
  echo 'No hay opcion'
  echo "./customSearch.sh <option> <lda>*"
  echo "  <option> [local, docker, lan]"
  echo "  <ldap>   [ldap] (opcional)"
else
  if [[ $1 == 'local' ]]; then
    cd config
    sed -i '18s/.*/  # host: db/' database.yml
    sed -i '20s/.*/  socket: \/var\/run\/mysqld\/mysqld.sock/' database.yml
    cd ..
  elif [[ $1 == 'docker' ]]; then
    cd config
    sed -i '18s/.*/  host: db/' database.yml
    sed -i '20s/.*/  # socket: \/var\/run\/mysqld\/mysqld.sock/' database.yml
    cd ..
  elif [[ $1 == 'lan' ]]; then
    cd config
    sed -i '18s/.*/  host: db/' database.yml
    sed -i '20s/.*/  # socket: \/var\/run\/mysqld\/mysqld.sock/' database.yml
    cd ..
  fi

  if [[ $2 == 'ldap' ]]; then
    cd app/controllers
    sed -i '7s/.*/    if create_ldap()/' sessions_controller.rb
    sed -i '8s/.*/      if user = User.valid_login?(params[:email], params[:password])/' sessions_controller.rb
    sed -i '9s/.*/        allow_token_to_be_used_only_once_for(user)/' sessions_controller.rb
    sed -i '10s/.*/        send_auth_token_for_valid_login_of(user)/' sessions_controller.rb
    sed -i '11s/.*/      else/' sessions_controller.rb
    sed -i '12s/.*/        render_unauthorized("credenciales")/' sessions_controller.rb
    sed -i '13s/.*/      end/' sessions_controller.rb
    sed -i '14s/.*/    else/' sessions_controller.rb
    sed -i '15s/.*/      render_unauthorized("LDAP")/' sessions_controller.rb
    sed -i '16s/.*/    end/' sessions_controller.rb
    sed -i '18s/.*/    # if user = User.valid_login?(params[:email], params[:password])/' sessions_controller.rb
    sed -i '19s/.*/    #   allow_token_to_be_used_only_once_for(user)/' sessions_controller.rb
    sed -i '20s/.*/    #   send_auth_token_for_valid_login_of(user)/' sessions_controller.rb
    sed -i '21s/.*/    # else/' sessions_controller.rb
    sed -i '22s/.*/    #   render_unauthorized("credenciales")/' sessions_controller.rb
    sed -i '23s/.*/    # end/' sessions_controller.rb
  else
    cd app/controllers
    sed -i '7s/.*/    # if create_ldap()/' sessions_controller.rb
    sed -i '8s/.*/    #   if user = User.valid_login?(params[:email], params[:password])/' sessions_controller.rb
    sed -i '9s/.*/    #     allow_token_to_be_used_only_once_for(user)/' sessions_controller.rb
    sed -i '10s/.*/    #    send_auth_token_for_valid_login_of(user)/' sessions_controller.rb
    sed -i '11s/.*/    #   else/' sessions_controller.rb
    sed -i '12s/.*/    #     render_unauthorized("credenciales")/' sessions_controller.rb
    sed -i '13s/.*/    #   end/' sessions_controller.rb
    sed -i '14s/.*/    # else/' sessions_controller.rb
    sed -i '15s/.*/    #   render_unauthorized("LDAP")/' sessions_controller.rb
    sed -i '16s/.*/    # end/' sessions_controller.rb
    sed -i '18s/.*/    if user = User.valid_login?(params[:email], params[:password])/' sessions_controller.rb
    sed -i '19s/.*/      allow_token_to_be_used_only_once_for(user)/' sessions_controller.rb
    sed -i '20s/.*/      send_auth_token_for_valid_login_of(user)/' sessions_controller.rb
    sed -i '21s/.*/    else/' sessions_controller.rb
    sed -i '22s/.*/      render_unauthorized("credenciales")/' sessions_controller.rb
    sed -i '23s/.*/    end/' sessions_controller.rb
  fi
  cd ../..
  if [[ $1 == 'local' ]]; then
    rails s
  else
    eval $(docker-machine env rancher-events)
    ./start2.sh
  fi
fi
