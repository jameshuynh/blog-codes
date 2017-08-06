class Project < ApplicationRecord
  validates :name, presence: true
  has_many :tasks, dependent: :destroy
  accepts_nested_attributes_for :tasks, allow_destroy: true
end
