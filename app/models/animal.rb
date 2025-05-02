class Animal < ApplicationRecord
  mount_uploader :image, AnimalUploader
end
