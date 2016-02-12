class ItemsController < ApplicationController
  def index
    @done_items = Item.where(is_done: true)
    @undone_items = Item.where(is_done: false)
  end
end
