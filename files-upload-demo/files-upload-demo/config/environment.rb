# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

class String
  def absolute_url
    "http://localhost:3000#{self}"
  end
end
