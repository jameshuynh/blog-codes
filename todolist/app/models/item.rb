class Item < ApplicationRecord
  after_create_commit do
     ItemCreationEventBroadcastJob.perform_later(self)
  end
end
