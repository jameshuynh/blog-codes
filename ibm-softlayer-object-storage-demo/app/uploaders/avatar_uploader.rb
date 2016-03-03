# encoding: utf-8

class AvatarUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  # Indicate storage to use Fog
  storage :fog

  # Resize to thumb if file is an image
  version :thumb, if: :image? do
    process resize_to_fill: [128, 128]
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Expiring URL to retrieve file from object storage server
  def expiring_url(expiring_time=60)
    storage = Fog::Storage.new(self.fog_credentials)
    file = storage.directories \
                  .get(self.fog_directory) \
                  .files.get(self.path)
    return file.url(Time.now + expiring_time)
  end

  protected

  def image?(file)
    file.content_type.start_with? 'image'
  end

end
