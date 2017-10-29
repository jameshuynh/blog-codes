class AvailableDownloadBroadcastJob < ApplicationJob
  queue_as :default

  def perform(uuid)
    csv = DownloadBooks.call
    ActionCable.server.broadcast(
      "downloads_channel_#{uuid}", csv: csv
    )
  end
end
