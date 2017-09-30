require 'test_helper'

class AuthenticationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @authentication = authentications(:one)
  end

  test "should get index" do
    get authentications_url, as: :json
    assert_response :success
  end

  test "should create authentication" do
    assert_difference('Authentication.count') do
      post authentications_url, params: { authentication: { password_digest: @authentication.password_digest, token: @authentication.token, user_id: @authentication.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show authentication" do
    get authentication_url(@authentication), as: :json
    assert_response :success
  end

  test "should update authentication" do
    patch authentication_url(@authentication), params: { authentication: { password_digest: @authentication.password_digest, token: @authentication.token, user_id: @authentication.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy authentication" do
    assert_difference('Authentication.count', -1) do
      delete authentication_url(@authentication), as: :json
    end

    assert_response 204
  end
end
