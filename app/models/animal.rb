class Animal < ApplicationRecord
  mount_uploader :image, AnimalUploader

  belongs_to :user
end
