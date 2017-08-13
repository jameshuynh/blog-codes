class Comment < ApplicationRecord
  belongs_to :post, touch: true
end
