class BooksController < ApplicationController
  def download
    AvailableDownloadBroadcastJob.perform_later(params[:uuid])
    render json: { result: :ok }
  end
end
