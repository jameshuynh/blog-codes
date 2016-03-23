class PostsController < ApplicationController
  def statistics
    @posts = Post.with_comments_count
  end
end
