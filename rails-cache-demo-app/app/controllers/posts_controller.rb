class PostsController < ApplicationController
  def index
    posts = Post.includes(:comments)
    json = Rails.cache.fetch(Post.cache_key(posts)) do
      posts.to_json(include: :comments)
    end

    render json: json
  end
end
