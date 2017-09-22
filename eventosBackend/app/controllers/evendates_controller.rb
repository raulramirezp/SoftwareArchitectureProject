class EvendatesController < ApplicationController
  before_action :set_evendate, only: [:show, :update, :destroy]

  # GET /evendates
  def index
    @evendates = Evendate.all

    render json: @evendates
  end

  # GET /evendates/1
  def show
    render json: @evendate
  end

  # POST /evendates
  def create
    @evendate = Evendate.new(evendate_params)

    if @evendate.save
      render json: @evendate, status: :created, location: @evendate
    else
      render json: @evendate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /evendates/1
  def update
    if @evendate.update(evendate_params)
      render json: @evendate
    else
      render json: @evendate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /evendates/1
  def destroy
    @evendate.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_evendate
      @evendate = Evendate.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def evendate_params
      params.require(:evendate).permit(:beginat, :endat, :place, :event_id)
    end
end
