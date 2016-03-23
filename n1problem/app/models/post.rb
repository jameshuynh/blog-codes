class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  scope :with_comments_count, -> { joins(:comments).select("posts.*, count(comments.id) comments_count").group('posts.id') }

end
