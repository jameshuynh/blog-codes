# app/models/chat_message.rb
class ChatMessage < ApplicationRecord
  after_create_commit do
    ChatMessageCreationEventBroadcastJob.perform_later(self)
  end
end
