class CreatePostsJsonCacheJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    posts = Post.includes(:comments)
    Rails.cache.fetch(Post.cache_key(posts)) do
      posts.to_json(include: :comments)
    end
  end
end
