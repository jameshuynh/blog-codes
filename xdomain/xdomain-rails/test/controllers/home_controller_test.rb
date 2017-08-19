require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get welcome" do
    get home_welcome_url
    assert_response :success
  end

end
