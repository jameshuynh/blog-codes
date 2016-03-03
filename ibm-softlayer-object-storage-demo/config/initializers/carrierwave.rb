# initializers/carrierwave.rb

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_credentials = {
    provider: :softlayer,
    softlayer_username: ENV['SOFTLAYER_USERNAME'],
    softlayer_api_key: ENV['SOFTLAYER_API_KEY'],
    softlayer_cluster: ENV['SOFTLAYER_CLUSTER']
  }
  config.fog_directory = ENV['SOFTLAYER_CONTAINER']
end
