# app/channels/item_channel.rb

class ItemChannel < ApplicationCable::Channel
  def subscribed
    stream_from "items_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create(data)
    # data is like parameters received from front end
    Item.create({ description: data['description'] })
  end
end
