require 'test_helper'

class EvendatesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @evendate = evendates(:one)
  end

  test "should get index" do
    get evendates_url, as: :json
    assert_response :success
  end

  test "should create evendate" do
    assert_difference('Evendate.count') do
      post evendates_url, params: { evendate: { beginat: @evendate.beginat, endat: @evendate.endat, event_id: @evendate.event_id, place: @evendate.place } }, as: :json
    end

    assert_response 201
  end

  test "should show evendate" do
    get evendate_url(@evendate), as: :json
    assert_response :success
  end

  test "should update evendate" do
    patch evendate_url(@evendate), params: { evendate: { beginat: @evendate.beginat, endat: @evendate.endat, event_id: @evendate.event_id, place: @evendate.place } }, as: :json
    assert_response 200
  end

  test "should destroy evendate" do
    assert_difference('Evendate.count', -1) do
      delete evendate_url(@evendate), as: :json
    end

    assert_response 204
  end
end
