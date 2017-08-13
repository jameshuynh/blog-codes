class Post < ApplicationRecord
  has_many :comments, dependent: :destroy

  after_touch :create_json_cache

  def self.cache_key(posts)
    {
      serializer: 'posts',
      stat_record: posts.maximum(:updated_at)
    }
  end

  private

  def create_json_cache
    CreatePostsJsonCacheJob.perform_later
  end
end
