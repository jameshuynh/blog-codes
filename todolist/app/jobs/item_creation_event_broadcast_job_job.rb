# app/jobs/item_creation_job.rb

class ItemCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(item)
    # broadcast to item_channel with the description
    # of the newly created item
    ActionCable.server.broadcast('items_channel', { description: render_description(item) })
  end

  private

  def render_description(item)
    # In Rails 5, renderer has been made public so that we can use
    # ApplicationController.renderer to render a partial
    ApplicationController.renderer.render(partial: 'items/item', locals: { item: item })
  end
end
