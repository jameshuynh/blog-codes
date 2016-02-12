class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.text :description
      t.boolean :is_done, default: false

      t.timestamps
    end
  end
end
