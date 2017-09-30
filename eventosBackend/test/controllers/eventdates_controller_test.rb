require 'test_helper'

class EventdatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @eventdate = eventdates(:one)
  end

  test "should get index" do
    get eventdates_url, as: :json
    assert_response :success
  end

  test "should create eventdate" do
    assert_difference('Eventdate.count') do
      post eventdates_url, params: { eventdate: { beginAt: @eventdate.beginAt, endAt: @eventdate.endAt, event_id: @eventdate.event_id } }, as: :json
    end

    assert_response 201
  end

  test "should show eventdate" do
    get eventdate_url(@eventdate), as: :json
    assert_response :success
  end

  test "should update eventdate" do
    patch eventdate_url(@eventdate), params: { eventdate: { beginAt: @eventdate.beginAt, endAt: @eventdate.endAt, event_id: @eventdate.event_id } }, as: :json
    assert_response 200
  end

  test "should destroy eventdate" do
    assert_difference('Eventdate.count', -1) do
      delete eventdate_url(@eventdate), as: :json
    end

    assert_response 204
  end
end
