class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
end
