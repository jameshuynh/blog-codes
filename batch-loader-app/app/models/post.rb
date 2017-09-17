class Post < ApplicationRecord
  has_many :comments

  class << self
    def load_comments(post)
      BatchLoader.for(post.id).batch do |comment_ids, batch_loader|
        Comment.where(id: comment_ids).each do |comment|
          batch_loader.load(comment.id, comment)
        end
      end
    end
  end
end
