class UsersController < ApiController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :require_login, only: [:search_friend]

  # GET /users
  def index
    @users = User.all
    if params[:search]
      @users = User.search(params[:search])
    else
      @users = User.all        
    end
    # @users.each
    render json: @users
  end

#  def search
#    @users = User.all
#    if params[:search]
#      @users = User.search(params[:search])
#    else
#      @users = User.all        
#    end
#    render json: @users 
#    #@users.each
#  end

  def search_friend
    @cu = current_user
    @usersfriends = []
    @cu.friends.each do |f|
      if (f.name.include? params[:search]) || (f.lastname.include? params[:search]) || (f.email.split("@")[0].include? params[:search]) || (f.nickname.include? params[:search])
        @usersfriends.push(f)
      end
    end
    render json: @usersfriends
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :lastname, :nickname, :birthdate, :email, :search)
    end
end
