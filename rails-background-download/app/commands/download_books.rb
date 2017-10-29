require 'csv'
class DownloadBooks
  class << self
    def call
      sleep 10
      CSV.generate do |csv|
        (1..100).each do |_i|
          csv << %w[id title description]
        end
      end
    end
  end
end
