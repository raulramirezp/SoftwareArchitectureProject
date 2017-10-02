class RelationshipsController < ApiController
  before_action :set_relationship, only: [:show, :update, :destroy]
  before_action :require_login

  # GET /relationships
  def index
    @relationships = Relationship.all

    render json: @relationships
  end

  # GET /relationships/1
  def show
    render json: @relationship
  end

  # POST /relationships
  def create
    @relationship = Relationship.new(relationship_params)

    if @relationship.save
      render json: @relationship, status: :created, location: @relationship
    else
      render json: @relationship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /relationships/1
  def update
    if @relationship.update(relationship_params)
      render json: @relationship
    else
      render json: @relationship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /relationships/1
  def destroy
    @relationship.destroy
  end

def invite
  @cu = current_user
  if User.exists?(id: params[:id].to_i)
    @user = User.find(params[:id].to_i)
    @ans = @cu.invite @user
    render json: @ans
  else
    render json: User.find(params[:id].to_i)
  end
end

def acept
  @cu = current_user
  if User.exists?(id: params[:id].to_i)
    @user = User.find(params[:id].to_i)
    @ans = @cu.acept @user
    render json: @ans
  else
    render json: User.find(params[:id].to_i)
  end
end

def decline
  @cu = current_user
  if User.exists?(id: params[:id].to_i)
    @user = User.find(params[:id].to_i)
    @ans = @cu.decline @user
    render json: @ans
  else
    render json: User.find(params[:id].to_i)
  end
end

def requests
  @cu = current_user
  @ans = @cu.requests
  render json: @ans
end

def invited
  @cu = current_user
  @ans = @cu.invited
  render json: @ans
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_relationship
      @relationship = Relationship.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def relationship_params
      params.require(:relationship).permit(:user_id, :invited_id)
    end
end
