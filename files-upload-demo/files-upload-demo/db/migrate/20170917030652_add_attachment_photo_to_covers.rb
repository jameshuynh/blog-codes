class AddAttachmentPhotoToCovers < ActiveRecord::Migration[5.1]
  def self.up
    change_table :covers do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :covers, :photo
  end
end
