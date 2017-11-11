class EventsController < ApiController
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :require_login

  def login
    render json: {nombre: "Acceso con login"}
  end

  # GET /events
  def index
    @events = Event.all
    if params[:search]
      @events = Event.search(params[:search])
    elsif params[:advancedSearch]
        #render :json => '{foo: "bar"}'
        @events = Event.advancedSearch(params[:advancedSearch])
    else
        @events = Event.all
    end
    render json: @events
 #   @events = Event.all

#    render json: @events
  end
  def search
    @events = Events.all
    if params[:search]
      @events = Event.search(params[:search])
    end
    render json: @events
  end

  # GET /events/1
  def show
    render json: @event
  end

  # POST /events
  def create
    @cu = current_user
    # raise params.inspect
    @event = Event.new(name: params[:name], assistants: params[:assistants],
      category_id: params[:category_id], user_id: params[:user_id],
      isPrivate: params[:isPrivate], minAge: params[:minAge], place: params[:place],
      beginAt: params[:beginAt], endAt: params[:endAt], ads: params[:ads])

    if @event.save
      @cu.follow @event
      render json: @event, status: :created, location: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /events/1
  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /events/1
  def destroy
    @event.destroy
  end

  def find_coincidences
    @ev = Event.find_coincidences(:name)
    render json: @ev
  end

  def follow_events
    @cu = current_user
    @ans = @cu.following_event
    render json: @ans
  end

  def my_events
    @cu = current_user
    @events = Event.where(user_id: @cu.id)
    render json: @events
  end

  #Revisar! Por quiery n+1
  def my_assistants
    @ev = Event.find(params[:id])
    @ans = []
    @ev.followings.each do |f|
      @ans.push(User.find(f.follower_id))
    end
    render json: @ans
  end

  #Revisar! query n+1
  def inviteds
    # @inv = User.includes(:invitations).where(invitations: {event_id: params[:id]})
    @inv = Invitation.where(event_id: params[:id])
    @ans = []
    @inv.each do |i|
      @ans.push(User.find(i.invited_id))
    end
    render json: @ans
  end

  def remove_from_event
    @us = User.find(params[:user_id])
    @ev = Event.find(params[:event_id])
    if @us.unfollow @ev
      render json: { unfollow: true }
    else
      render json: @us.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def event_params
      params.require(:event).permit(:name, :assistants, :category_id, :user_id, :isPrivate, :minAge, :place, :beginAt, :endAt, :ads)
    end
end
