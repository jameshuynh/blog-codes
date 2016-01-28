class Book < ActiveRecord::Base
  has_attached_file :cover, styles: { thumb: "220x310>" }
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/

  before_post_process on: :create do    
    if cover_content_type == 'application/octet-stream'
      mime_type = MIME::Types.type_for(cover_file_name) 
      self.cover_content_type = mime_type.first.to_s if mime_type.first  
    end
  end
end
