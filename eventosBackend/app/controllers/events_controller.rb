class EventsController < ApiController
  before_action :set_event, only: [:show, :update, :destroy]
  before_action :require_login

  def login
    render json: {nombre: "Acceso con login"}
  end

  # GET /events
  def index
    @events = Event.all

    render json: @events
  end

  # GET /events/1
  def show
    render json: @event
  end

  # POST /events
  def create
    # raise params.inspect
    @event = Event.new(name: params[:name], assistants: params[:assistants], category_id: params[:category_id], user_id: params[:user_id], isPrivate: params[:isPrivate], minAge: params[:minAge], place: params[:place])

    if @event.save
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def event_params
      params.require(:event).permit(:name, :assistants, :category_id, :user_id, :isPrivate, :minAge, :place)
    end
end
