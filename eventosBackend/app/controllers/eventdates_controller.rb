class EventdatesController < ApiController
  before_action :set_eventdate, only: [:show, :update, :destroy]
  before_action :require_login

  # GET /eventdates
  def index
    @eventdates = Eventdate.all

    render json: @eventdates
  end

  # GET /eventdates/1
  def show
    render json: @eventdate
  end

  # POST /eventdates
  def create
    @eventdate = Eventdate.new(eventdate_params)

    if @eventdate.save
      render json: @eventdate, status: :created, location: @eventdate
    else
      render json: @eventdate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /eventdates/1
  def update
    if @eventdate.update(eventdate_params)
      render json: @eventdate
    else
      render json: @eventdate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /eventdates/1
  def destroy
    @eventdate.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_eventdate
      @eventdate = Eventdate.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def eventdate_params
      params.require(:eventdate).permit(:beginAt, :endAt, :event_id)
    end
end
