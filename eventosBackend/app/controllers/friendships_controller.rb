class FriendshipsController < ApiController
  before_action :set_friendship, only: [:show, :update, :destroy]
  before_action :require_login

  # GET /friendships
  def index
    @friendships = Friendship.all

    render json: @friendships
  end

  # GET /friendships/1
  def show
    render json: @friendship
  end

  # POST /friendships
  def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      render json: @friendship, status: :created, location: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /friendships/1
  def update
    if @friendship.update(friendship_params)
      render json: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friendships/1
  def destroy
    @friendship.destroy
  end

  def remove
    @cu = current_user
    if User.exists?(id: params[:id].to_i)
      @user = User.find(params[:id].to_i)
      @ans = @cu.remove @user
      render json: @ans
    else
      render json: User.find(params[:id].to_i)
    end
  end

  def friends
    @cu = current_user
    @ans = @cu.friends
    render json: @ans
  end

  def friends_names
    @cu = current_user
    @ans = @cu.friends_names
    render json: @ans
  end

  def friends_of
    @cu = params[:id]
    @ans = @cu.friends_names
    render json: @ans
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def friendship_params
      params.require(:friendship).permit(:user_id, :friend_id)
    end
end
