require 'test_helper'

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "should get statistics" do
    get posts_statistics_url
    assert_response :success
  end

end
