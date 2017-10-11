class InvitationsController < ApiController
  before_action :set_invitation, only: [:show, :update, :destroy]
  before_action :require_login

  # GET /invitations
  def index
    @invitations = Invitation.all

    render json: @invitations
  end

  # GET /invitations/1
  def show
    render json: @invitation
  end

  # POST /invitations
  def create
    if !Invitation.exists?(user_id: params[:user_id], invited_id: params[:invited_id], event_id: params[:event_id])
      @invitation = Invitation.new(user_id: params[:user_id], invited_id: params[:invited_id], event_id: params[:event_id])

      if @invitation.save
        render json: @invitation, status: :created, location: @invitations
      else
        render json: @invitation.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /invitations/1
  def update
    if @invitation.update(invitation_params)
      render json: @invitation
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /invitations/1
  def destroy
    @invitation.destroy
  end

  def destroy_with_params
    @cu = current_user
    if Invitation.exists?(user_id: @cu.id, invited_id: params[:invited_id], event_id: params[:event_id])
      @inv = Invitation.where(user_id: @cu.id, invited_id: params[:invited_id], event_id: params[:event_id])
      p @inv
      @inv.destroy_all
    end
  end

  def acept
    @cu = current_user
    @ev = Event.find(params[:id].to_i)
    @done = false
    if @cu.follows?(@ev)
      @done = false
    else
      @cu.follow(@ev)
      @r = Invitation.where(invited_id: @cu.id, event_id: @ev.id)
      p @r
      @r.delete_all
      @done = true
    end
    render json: @done
  end

  def decline
    @cu = current_user
    @ev = Event.find(params[:id].to_i)
    @r = Invitation.where(invited_id: @cu.id, event_id: @ev.id)
    @r.delete_all
    true
  end

  def eventRequests
    @cu = current_user
    @inv = Invitation.where(invited_id: @cu.id)
    @ans = []
    @inv.each do |i|
      @ans.push(Event.find(i.event_id))
    end
    render json: @ans
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_invitation
      @invitation = Invitation.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def invitation_params
      params.require(:invitation).permit(:user_id, :invited_id, :event_id)
    end
end
