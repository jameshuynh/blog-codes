class DownloadChannel < ApplicationCable::Channel
  def subscribed
    stream_from "downloads_channel_#{params[:uuid]}"
  end

  def unsubscribed; end
end
